export const widgetType = "Hiflex.ImageButton";

// Key of the widget assets (BaseWgt.mapAssets) that holds the images of the button
export const ASSETS_PROPERTY = "images";

// One image: `asset` is the name of the object in the asset storage of the dashboard
export interface ImageItem {
  asset: string;
  title: string;
  type: string;
}

// The two images of the button: `off` when the value is 0, `on` when it is not 0
export interface ButtonImages {
  off: ImageItem | null;
  on: ImageItem | null;
}

export type Slot = "off" | "on";

function normalizeItem( item: any ): ImageItem | null {
  if ( !item || typeof item.asset !== "string" || !item.asset ) return null;
  return { asset: item.asset, title: String( item.title ?? "" ), type: String( item.type ?? "" ) };
}

// Saved state or value from undo: keep only well formed items, as new objects
export function normalizeImages( value: any ): ButtonImages {
  return { off: normalizeItem( value && value.off ), on: normalizeItem( value && value.on ) };
}

export function listImages( images: ButtonImages ): ImageItem[] {
  return [ images.off, images.on ].filter( ( item ): item is ImageItem => !!item );
}

// The value is a number (0 off, anything else on). Datalinks do not convert types, so numeric text
// and booleans from a tag are accepted too; null, NaN and empty text count as off.
export function toBoolean( value: any ): boolean {
  if ( typeof value === "boolean" ) return value;
  if ( typeof value === "string" ) {
    const text = value.trim().toLowerCase();
    if ( text === "true" || text === "on" ) return true;
    value = text === "" ? 0 : Number( text );
  }
  const n = Number( value );
  return Number.isFinite( n ) && n !== 0;
}
