declare var adjustPath;

/*
 * The images shown when the user has not chosen one: bundled with the widget, like its icon.
 * To use other defaults, replace the two files in src/resources/images (keep the names, or change
 * them here and in the `resources.images` list of src/manifest.json).
 */
const offImage = require( "../../resources/images/toggle_off_cross.svg" );
const onImage = require( "../../resources/images/toggle_on_check.svg" );

export function defaultImage( slot: "off" | "on" ): string {
  return adjustPath( slot == "off" ? offImage : onImage );
}
