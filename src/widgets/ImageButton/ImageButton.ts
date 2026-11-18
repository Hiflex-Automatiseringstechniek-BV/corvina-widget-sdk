import { BaseGraphicWgt, Value, projectStore } from "corvina";
import { widgetType, ASSETS_PROPERTY, ButtonImages, ImageItem, Slot, normalizeImages, listImages, toBoolean } from "./defs";
import { IMAGE_TYPES, MAX_IMAGE_SIZE, createAssetName, loadImageAsset, readAsDataURL, uploadImageAsset, withSaveGuard } from "./imageAssets";

/*
 * A button with two images, rendered by ImageButton.vue: `off` is shown when `value` is 0,
 * `on` when it is not 0. `value` accepts a read/write datalink, so a click writes the tag.
 *
 * Like the ImageGallery example, the widget saves only the names of the assets (`images`),
 * never their content; mapAssets and the dashboard manifest keep the references.
 */
export default class ImageButton extends BaseGraphicWgt {
  images: ButtonImages;
  value: Value<number>;
  fit: string;
  // Images ready to be shown (data URLs) by asset name: runtime state, never saved
  imageSources: { [asset: string]: string };

  constructor( args ) {
    super( args );
    this.type = widgetType;
    const state = args.initState;
    this.images = normalizeImages( state.images );
    this.value = new Value( state.value ?? 0 );
    this.fit = state.fit ?? "contain";
    this.imageSources = {};
  }

  isInteractive() {
    return !projectStore.getInEditor && !this.getPropertyValue( "disabled" );
  }

  /*
   * The operator may change `value` unless its datalink is read only ("readonly"): then the value
   * belongs to the tag or the formula, and a click must not change it. Without a datalink the value
   * is the local one of the widget, which other widgets can read: writing is allowed.
   */
  canWrite(): boolean {
    try {
      if ( !this.hasDatalinkAttachedtoProp( "value" ) ) return true;
      const datalink = this.getDatalinkFromProperty( "value" );
      const permission = datalink && datalink.permission;
      return permission === "read/write" || permission === "write";
    } catch ( e ) {
      // Never break the rendering of the widget for this check
      console.error( `ImageButton ${this.id}: cannot read the datalink permission`, e );
      return true;
    }
  }

  // Operator: writes `value` (and its tag, when the datalink is read/write)
  setPressed( pressed: boolean ) {
    if ( !this.isInteractive() || !this.canWrite() ) return;
    this.setPropertyValue( { prop: "value", value: pressed ? 1 : 0 } );
  }

  // Every click inverts the value
  click() {
    this.setPressed( !toBoolean( this.getPropertyValue( "value" ) ) );
  }

  setImageSource( asset: string, source: string ) {
    // A new object: Vue 2 does not see the keys added to an observed one
    this.imageSources = { ...this.imageSources, [ asset ]: source };
  }

  /*
   * Editor: uploads one image file to the asset storage of the dashboard and puts it in the slot
   * (`off` or `on`) with a single change (one undo step, one save of the dashboard).
   * Returns an error key for the property control, or "" when done.
   */
  async uploadImage( slot: Slot, file: File ): Promise<string> {
    if ( IMAGE_TYPES.indexOf( file.type ) < 0 || file.size > MAX_IMAGE_SIZE ) return "rejected";
    let error = "";
    await withSaveGuard( async () => {
      const asset = createAssetName( this.id, file );
      try {
        const [ stored, source ] = await Promise.all( [ uploadImageAsset( asset, file ), readAsDataURL( file ) ] );
        if ( !stored ) throw new Error( "no upload URL" );
        // Shown at once from the local file, without downloading it again
        this.setImageSource( asset, source );
        const item: ImageItem = { asset, title: file.name.replace( /\.[^.]*$/, "" ), type: file.type };
        const images = { off: this.images.off, on: this.images.on };
        images[ slot ] = item;
        projectStore.setWidgetValue( { wgtId: this.id, prop: "images", value: images, record: true } );
      } catch ( e ) {
        console.error( `ImageButton ${this.id}: upload of ${file.name} failed`, e );
        error = "failed";
      }
    } );
    return error;
  }

  setPropertyValue( { prop, value, ts }: { prop: string, value: any, ts?: number } ) {
    if ( prop == "images" ) {
      // From the properties panel, undo and redo: the assets follow the images
      const images = normalizeImages( value instanceof Value ? value.unwrap() : value );
      super.setPropertyValue( { prop, value: images, ts } );
      this.syncAssets( images );
      return;
    }
    super.setPropertyValue( { prop, value, ts } );
  }

  // Called by initAssets when the widget is created, if mapAssets is not empty (BaseWgt)
  loadAssetsFromStorage(): Promise<void> {
    const dashboard = this.getProject().getDashboard();
    const owners: { [asset: string]: string } = {};
    for ( const asset of this.mapAssets.get( ASSETS_PROPERTY ) ?? [] ) owners[ asset.name ] = asset.dashboardId;
    const loads = listImages( this.images )
      .filter( image => !this.imageSources[ image.asset ] )
      .map( image => loadImageAsset( dashboard, image.asset, owners[ image.asset ], image.type )
        .then( source => this.setImageSource( image.asset, source ) )
        .catch( e => console.error( `ImageButton ${this.id}: cannot load ${image.asset}`, e ) ) );
    return Promise.all( loads ).then( () => undefined );
  }

  // Widget pasted, added or restored by undo: its assets get one more reference in the manifest
  protected updateAssetsReferenceCounter(): void {
    const dashboard = this.getProject().getDashboard();
    for ( const asset of this.mapAssets.get( ASSETS_PROPERTY ) ?? [] ) dashboard.addAsset( asset.name );
  }

  /*
   * Aligns mapAssets and the references of the manifest to the images: a replaced or removed image
   * releases its reference, a new one takes one. The stored files are never deleted (undo).
   */
  private syncAssets( images: ButtonImages ) {
    const dashboard = this.preview ? null : this.getProject()?.getDashboard();
    if ( !dashboard ) return;
    const current = this.mapAssets.get( ASSETS_PROPERTY ) ?? [];
    const wanted = listImages( images ).map( image => image.asset );
    for ( const asset of current ) {
      if ( wanted.indexOf( asset.name ) < 0 ) dashboard.removeAsset( asset.name );
    }
    // In a composed widget the assets belong to its dashboard: the instances fetch them from there
    const owner = dashboard.type == "WIDGET" ? dashboard.id : null;
    const next = wanted.map( name => {
      const known = current.filter( asset => asset.name == name )[ 0 ];
      if ( known ) return known;
      dashboard.addAsset( name );
      return { name, dashboardId: owner };
    } );
    if ( next.length ) this.mapAssets.set( ASSETS_PROPERTY, next );
    else this.mapAssets.delete( ASSETS_PROPERTY );
    // Images back with undo, not downloaded yet
    if ( wanted.some( name => !this.imageSources[ name ] ) ) this.loadAssetsFromStorage();
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.images = {
      off: this.images.off ? { ...this.images.off } : null,
      on: this.images.on ? { ...this.images.on } : null
    };
    serializedWgt.value = this.value.v;
    serializedWgt.fit = this.fit;
    return serializedWgt;
  }
}
