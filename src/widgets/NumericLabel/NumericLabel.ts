import { BaseGraphicWgt, Value } from "corvina";
import { widgetType } from "./defs";

/*
 * A widget rendered by a Vue 2 component (NumericLabel.vue), registered with the `component` field.
 * The class holds the properties of the widget, the component draws them.
 */
export default class NumericLabel extends BaseGraphicWgt {
  value: Value<number>;
  format: Value<string>;
  unit: Value<string>;
  min: Value<number>;
  max: Value<number>;
  valueFontSize: Value<number>;
  valueFontWeight: Value<number>;
  valueFontColor: Value<string>;
  unitFontSize: Value<number>;
  unitFontWeight: Value<number>;
  unitFontColor: Value<string>;
  hAlign: Value<string>;
  vAlign: Value<string>;

  constructor( args ) {
    super( args );
    this.type = widgetType;
    this.value = new Value( args.initState.value ?? 50 );
    this.format = new Value( args.initState.format ?? "#.##");
    this.unit = new Value( args.initState.unit ?? "°C" );
    this.min = new Value( args.initState.min ?? 0 );
    this.max = new Value( args.initState.max ?? 100 );
    this.valueFontSize = new Value( args.initState.valueFontSize ?? 35 );
    this.valueFontWeight = new Value( args.initState.valueFontWeight ?? 500 );
    this.valueFontColor = new Value( args.initState.valueFontColor ?? "#969696" );
    this.unitFontSize = new Value( args.initState.unitFontSize ?? 25 );
    this.unitFontWeight = new Value( args.initState.unitFontWeight ?? 400 );
    this.unitFontColor = new Value( args.initState.unitFontColor ?? "#969696" );
    this.hAlign = new Value( args.initState.hAlign ?? "center" );
    this.vAlign = new Value( args.initState.vAlign ?? "center" );
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.value = this.value.v;
    serializedWgt.format = this.format.v;
    serializedWgt.unit = this.unit.v;
    serializedWgt.min = this.min.v;
    serializedWgt.max = this.max.v;
    serializedWgt.valueFontSize = this.valueFontSize.v;
    serializedWgt.valueFontWeight = this.valueFontWeight.v;
    serializedWgt.valueFontColor = this.valueFontColor.v;
    serializedWgt.unitFontSize = this.unitFontSize.v;
    serializedWgt.unitFontWeight = this.unitFontWeight.v;
    serializedWgt.unitFontColor = this.unitFontColor.v;
    serializedWgt.hAlign = this.hAlign.v;
    serializedWgt.vAlign = this.vAlign.v;
    return serializedWgt;
  }
}
