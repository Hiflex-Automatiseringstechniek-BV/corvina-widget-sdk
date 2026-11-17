import { BaseWgt, BaseGraphicWgt, Value, DataValue, IDataLinkConstructorArgs, DataLink } from "corvina";
import { widgetType } from "./defs";

export default class TrendCard extends BaseGraphicWgt {
  private tagReference: Value<string>;
  private tagName: string;
  private dataSerie: DataValue[];
  private sourceDatalink : DataLink;
  private from: Value<Date>;
  private to: Value<Date>;
  private dataUpdateCallback: Function; // to resolve vue.js reactivity issue on array or object
  format: Value<string>;
  unit: Value<string>;
  label: Value<string>;
  graphColor: Value<string>;
  icon: Value<string>;
  iconShow: Value<boolean>;
  iconSize: Value<number>;
  iconColor: Value<string>;
  valueFontSize: Value<number>;
  valueFontWeight: Value<number>;
  valueFontColor: Value<string>;
  labelFontSize: Value<number>;
  labelFontWeight: Value<number>;
  labelFontColor: Value<string>;
  cardColor: Value<string>;
  cardRadius: Value<number>;

  constructor( args ) {
    super( args );
    this.type = widgetType;
    this.from = args.initState.from ? new Value( new Date( args.initState.from )) : new Value(new Date());
    this.to = args.initState.to ? new Value( new Date( args.initState.to )) : new Value(new Date( Date.now() + 5000 ));
    this.tagReference = new Value( args.initState.source );
    this.format = new Value(args.initState.format ?? "#.#");
    this.unit = new Value(args.initState.unit ?? "%");
    this.label = new Value(args.initState.label ?? "Description");
    this.graphColor = new Value( args.initState.graphColor ?? "#1976d2" );
    this.icon = new Value( args.initState.icon ?? "trending_up");
    this.iconShow = new Value( args.initState.iconShow ?? true);
    this.iconSize = new Value( args.initState.iconSize ?? 32);
    this.iconColor = new Value( args.initState.iconColor ?? "#969696");
    this.valueFontSize = new Value( args.initState.valueFontSize ?? 35 );
    this.valueFontWeight = new Value( args.initState.valueFontWeight ?? 500 );
    this.valueFontColor = new Value( args.initState.valueFontColor ?? "#969696" );
    this.labelFontSize = new Value( args.initState.labelFontSize ?? 25 );
    this.labelFontWeight = new Value( args.initState.labelFontWeight ?? 400 );
    this.labelFontColor = new Value( args.initState.labelFontColor ?? "#969696" );
    this.cardColor = new Value( args.initState.cardColor ?? "#ffffff" );
    this.cardRadius = new Value( args.initState.cardRadius ?? 25 );
  }

  // This function is called every time a widget is dropped from gallery to dashboard
  public loadDefaultConfiguration(): void
  {
    // We load default to datalink to global DataWindow
    const dataWindow = this.getProject().getWidget( "DataWindow" );
    this.connectWidgetProperties(
      dataWindow,
      new Map( [
        ["from", { name: "startDate", permission: "read/write" } ],
        ["to", { name: "endDate", permission: "read/write" } ]
      ] )
    );
  }

  // Time (ms) of a date property, or NaN when it holds something that is not a date
  private timeOf( prop: Value<Date> ): number
  {
    return new Date( Value.unwrap<any>( prop ) ).getTime();
  }

  // Historical data of the time window; without arguments the from/to properties are used
  public async fetchData( from?: number, to?: number ): Promise<void>
  {
    from = from ?? this.timeOf( this.from );
    to   = to   ?? this.timeOf( this.to );

    // An empty, invalid or inverted end means "up to now"
    if ( !Number.isFinite( to ) || to <= 0 || to <= from ) to = Date.now();
    if ( !Number.isFinite( from ) || from <= 0 ) from = to - 3600 * 1000;   // fallback: last hour

    if ( !this.sourceDatalink || !this.tagName ) {
      this.dataSerie = [];
    } else {
      try {
        this.dataSerie = await this.sourceDatalink.fetchHistoricalData({ from, to });
      } catch ( e ) {
        console.error( "TrendCard: history fetch failed", e );
        this.dataSerie = [];
      }
    }
    this.dataUpdateCallback && this.dataUpdateCallback( this.dataSerie );
  }

  // Last known value of the tag: limit=1 with only a "to" returns the newest sample before it
  public async fetchLastKnown( to: number = Date.now() ): Promise<number | null>
  {
    if ( !this.sourceDatalink ) return null;
    try {
      const data = await this.sourceDatalink.fetchHistoricalData({
        to,
        maxSamples: 1          // becomes limit=1 in the URL
      } as any);               // `from` is required by the typings, but we want no `since`
      if ( !data || !data.length ) return null;
      const last = data.reduce( ( a, b ) => ( b.ts > a.ts ? b : a ) );   // newest, whatever the order
      const n = Number( last.v );
      return isNaN( n ) ? null : n;
    } catch ( e ) {
      console.error( "TrendCard: last known value fetch failed", e );
      return null;
    }
  }

  // Function used to resolve a vue.js reactivity issue on array or object
  public onDataUpdate( callback: ( data: DataValue[] ) => void )
  {
    this.dataUpdateCallback = callback;
  }

  // Override BaseGraphicWgt::setPropertyValue
  public setPropertyValue( { prop, value } )
  {
    super.setPropertyValue( { prop, value } );
    switch ( prop )
    {
      case "from":
      case "to":
        this.fetchData();      // reads and validates from/to itself
        break;
    }
  }

  // Override BaseGraphicWgt::addDatalink
  public addDatalink( dataLink: IDataLinkConstructorArgs )
  {
    const newDatalink = super.addDatalink( dataLink );
    switch( dataLink.tgtProp )
    {
      case "tagReference":
        this.sourceDatalink = newDatalink;
        this.tagName = dataLink.srcProp;
        this.fetchData();      // load the history as soon as the tag is linked
        break;
    }
    return newDatalink;
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.tagReference = this.tagReference.resolve();
    serializedWgt.from = this.timeOf( this.from );
    serializedWgt.to = this.timeOf( this.to );
    serializedWgt.tagName = this.tagName;
    serializedWgt.format = this.format.v;
    serializedWgt.unit = this.unit.v;
    serializedWgt.label = this.label.v;
    serializedWgt.graphColor = this.graphColor.v;
    serializedWgt.icon = this.icon.v;
    serializedWgt.iconShow = this.iconShow.v;
    serializedWgt.iconSize = this.iconSize.v;
    serializedWgt.iconColor = this.iconColor.v;
    serializedWgt.valueFontSize = this.valueFontSize.v;
    serializedWgt.valueFontWeight = this.valueFontWeight.v;
    serializedWgt.valueFontColor = this.valueFontColor.v;
    serializedWgt.labelFontSize = this.labelFontSize.v;
    serializedWgt.labelFontWeight = this.labelFontWeight.v;
    serializedWgt.labelFontColor = this.labelFontColor.v;
    serializedWgt.cardColor = this.cardColor.v;
    serializedWgt.cardRadius = this.cardRadius.v;
    return serializedWgt;
  }
}
