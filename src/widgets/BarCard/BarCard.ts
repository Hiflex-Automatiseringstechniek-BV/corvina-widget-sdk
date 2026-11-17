import { BaseGraphicWgt, Value } from "corvina";
import { widgetType } from "./defs";

/*
 * A widget rendered by a Vue 2 component (BarCard.vue), registered with the `component` field.
 * The class holds the properties of the widget, the component draws them.
 */
export default class BarCard extends BaseGraphicWgt {
  value: Value<number>;
  format: Value<string>;
  unit: Value<string>;
  min: Value<number>;
  max: Value<number>;
  description: Value<string>;
  reverse: Value<boolean>;
  barFillColor: Value<string>;
  barBackColor: Value<string>;
  barHeight: Value<number>;
  barTransition: Value<number>;
  fontSize: Value<number>;
  fontWeight: Value<number>;
  fontColor: Value<string>;
  cardColor: Value<string>;
  cardRadius: Value<number>;

  constructor( args ) {
    super( args );
    this.type = widgetType;
    this.value = new Value( args.initState.value ?? 50 );
    this.format = new Value( args.initState.format ?? "#.##");
    this.unit = new Value( args.initState.unit ?? "C" );
    this.min = new Value( args.initState.min ?? 0 );
    this.max = new Value( args.initState.max ?? 100 );
    this.description = new Value( args.initState.description ?? "Description" );
    this.reverse = new Value( args.initState.reverse ?? false );
    this.barFillColor = new Value( args.initState.barFillColor ?? "#1976d2" );
    this.barBackColor = new Value( args.initState.barBackColor ?? "#e0e0e0" );
    this.barHeight = new Value( args.initState.barHeight ?? 20);
    this.barTransition = new Value( args.initState.barTransition ?? 0.5 );
    this.fontSize = new Value( args.initState.fontSize ?? 50 );
    this.fontWeight = new Value( args.initState.fontWeight ?? 50 );
    this.fontColor  = new Value( args.initState.fontColor ?? "#969696" );
    this.cardColor = new Value( args.initState.cardColor ?? "#ffffff" );
    this.cardRadius = new Value( args.initState.cardRadius ?? 10 );
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.value = this.value.v;
    serializedWgt.format = this.format.v;
    serializedWgt.unit = this.unit.v;
    serializedWgt.min = this.min.v;
    serializedWgt.max = this.max.v;
    serializedWgt.description = this.description.v;
    serializedWgt.reverse = this.reverse.v;
    serializedWgt.barFillColor = this.barFillColor.v;
    serializedWgt.barBackColor = this.barBackColor.v;
    serializedWgt.barHeight = this.barHeight.v;
    serializedWgt.barTransition = this.barTransition.v;
    serializedWgt.fontSize = this.fontSize.v;
    serializedWgt.fontWeight = this.fontWeight.v;
    serializedWgt.fontColor = this.fontColor.v;
    serializedWgt.cardColor = this.cardColor.v;
    serializedWgt.cardRadius = this.cardRadius.v;
    return serializedWgt;
  }
}
