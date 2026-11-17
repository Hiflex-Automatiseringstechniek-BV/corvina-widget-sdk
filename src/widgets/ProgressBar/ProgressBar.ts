import { BaseGraphicWgt, Value } from "corvina";
import { widgetType } from "./defs";

/*
 * A widget rendered by a Vue 2 component (ProgressBar.vue), registered with the `component` field.
 * The class holds the properties of the widget, the component draws them.
 */
export default class ProgressBar extends BaseGraphicWgt {
  value: Value<number>;
  min: Value<number>;
  max: Value<number>;
  reverse: Value<boolean>;
  orientation: Value<string>;
  barFillColor: Value<string>;
  barBackColor: Value<string>;
  barTransition: Value<number>;

  constructor( args ) {
    super( args );
    this.type = widgetType;
    this.value = new Value( args.initState.value ?? 50 );
    this.min = new Value( args.initState.min ?? 0 );
    this.max = new Value( args.initState.max ?? 100 );
    this.reverse = new Value( args.initState.reverse ?? false );
    this.orientation = new Value( args.initState.orientation ?? "horizontal" );
    this.barFillColor = new Value( args.initState.barFillColor ?? "#1976d2" );
    this.barBackColor = new Value( args.initState.barBackColor ?? "#e0e0e0" );
    this.barTransition = new Value( args.initState.barTransition ?? 0.5 );
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.value = this.value.v;
    serializedWgt.min = this.min.v;
    serializedWgt.max = this.max.v;
    serializedWgt.reverse = this.reverse.v;
    serializedWgt.orientation = this.orientation.v;
    serializedWgt.barFillColor = this.barFillColor.v;
    serializedWgt.barBackColor = this.barBackColor.v;
    serializedWgt.barTransition = this.barTransition.v;
    return serializedWgt;
  }
}
