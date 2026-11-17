import { BaseGraphicWgt, Value } from "corvina";
import { widgetType } from "./defs";

/*
 * A widget rendered by a Vue 2 component (GaugeCard.vue), registered with the `component` field.
 * The class holds the properties of the widget, the component draws them.
 */
export default class GaugeCard extends BaseGraphicWgt {
  value: Value<number>;
  format: Value<string>;
  label: Value<string>;
  min: Value<number>;
  max: Value<number>;
  startAngle: Value<number>;
  stopAngle: Value<number>;
  reverse: Value<boolean>;
  arcFillColor: Value<string>;
  arcFillWidth: Value<number>;
  arcBackColor: Value<string>;
  arcBackWidth: Value<number>;
  arcTransition: Value<number>;
  arcEndType: Value<string>;
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
    this.value = new Value( args.initState.value ?? 50 );
    this.format = new Value( args.initState.format ?? "#.##" );
    this.label = new Value( args.initState.label ?? "kW" );
    this.min = new Value( args.initState.min ?? 0 );
    this.max = new Value( args.initState.max ?? 100 );
    this.startAngle = new Value( args.initState.startAngle ?? -135 );
    this.stopAngle = new Value( args.initState.stopAngle ?? 135 );
    this.reverse = new Value( args.initState.reverse ?? false );
    this.arcFillColor = new Value( args.initState.arcFillColor ?? "#1976d2" );
    this.arcFillWidth = new Value( args.initState.arcFillWidth ?? 20 );
    this.arcBackColor = new Value( args.initState.arcBackColor ?? "#e0e0e0" );
    this.arcBackWidth = new Value( args.initState.arcBackWidth ?? 20 );
    this.arcTransition = new Value( args.initState.arcTransition ?? 0.5 );
    this.arcEndType = new Value( args.initState.arcEndType ?? "round");
    this.icon = new Value( args.initState.icon ?? "electric_bolt");
    this.iconShow = new Value( args.initState.iconShow ?? false);
    this.iconSize = new Value( args.initState.iconSize ?? 32);
    this.iconColor = new Value( args.initState.iconColor ?? "#969696");
    this.valueFontSize = new Value( args.initState.valueFontSize ?? 35 );
    this.valueFontWeight = new Value( args.initState.valueFontWeight ?? 500 );
    this.valueFontColor = new Value( args.initState.valueFontColor ?? "#969696" );
    this.labelFontSize = new Value( args.initState.labelFontSize ?? 25 );
    this.labelFontWeight = new Value( args.initState.labelFontWeight ?? 400 );
    this.labelFontColor = new Value( args.initState.labelFontColor ?? "#969696" );
    this.cardColor = new Value( args.initState.cardColor ?? "#ffffff" );
    this.cardRadius = new Value( args.initState.cardRadius ?? 15 );
  }

  serialize() {
    let serializedWgt = super.serialize();
    serializedWgt.value = this.value.v;
    serializedWgt.format = this.format.v;
    serializedWgt.label = this.label.v;
    serializedWgt.min = this.min.v;
    serializedWgt.max = this.max.v;
    serializedWgt.startAngle = this.startAngle.v;
    serializedWgt.stopAngle = this.stopAngle.v;
    serializedWgt.reverse = this.reverse.v;
    serializedWgt.arcFillColor = this.arcFillColor.v;
    serializedWgt.arcFillWidth = this.arcFillWidth.v;
    serializedWgt.arcBackColor = this.arcBackColor.v;
    serializedWgt.arcBackWidth = this.arcBackWidth.v;
    serializedWgt.arcTransition = this.arcTransition.v;
    serializedWgt.arcEndType = this.arcEndType.v;
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
