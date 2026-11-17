import { IPropertyHandler, BaseGraphicPropsHandler } from "corvina";

/*
 * Properties shown in the properties panel of the editor. BaseGraphicPropsHandler adds the standard
 * ones of the widget box: position and size, visibility, background, borders, permissions.
 */
export default class GaugeCardPropsHandler extends BaseGraphicPropsHandler {
  value: IPropertyHandler;
  format: IPropertyHandler;
  label: IPropertyHandler;
  min: IPropertyHandler;
  max: IPropertyHandler;
  startAngle: IPropertyHandler;
  stopAngle: IPropertyHandler;
  reverse: IPropertyHandler;
  arcFillColor: IPropertyHandler;
  arcFillWidth: IPropertyHandler;
  arcBackColor: IPropertyHandler;
  arcBackWidth: IPropertyHandler;
  arcTransition: IPropertyHandler;
  arcEndType: IPropertyHandler;
  icon: IPropertyHandler;
  iconShow: IPropertyHandler;
  iconSize: IPropertyHandler;
  iconColor: IPropertyHandler;
  valueFontSize: IPropertyHandler;
  valueFontWeight: IPropertyHandler;
  valueFontColor: IPropertyHandler;
  labelFontSize: IPropertyHandler;
  labelFontWeight: IPropertyHandler;
  labelFontColor: IPropertyHandler;
  cardColor: IPropertyHandler;
  cardRadius: IPropertyHandler;

  createCustomPropsHandler() {
    super.createCustomPropsHandler();

    this.value = {
      layer: "attributes",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Value",
      description: "The measurement value"
    };

    this.format = {
      layer: "attributes",
      type: "string",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: false,
      display: "Numeric Format",
      description: "The numeric format"
    };

    this.label = {
      layer: "attributes",
      type: "string",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: true,
      display: "Label",
      description: "The label of the measurement"
    };

    this.min = {
      layer: "attributes",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Min",
      description: "The minimum value of the measurement"
    };

    this.max = {
      layer: "attributes",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Max",
      description: "The maximum value of the measurement"
    };

    this.startAngle = {
      layer: "Configure",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Start Angle",
      description: "The start angle of the arc",
      propControlOptions: { min: -360, max: 360 }
    };

    this.stopAngle = {
      layer: "Configure",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Stop Angle",
      description: "The stop angle of the arc",
      propControlOptions: { min: -360, max: 360 }
    };

    this.reverse = {
      layer: "Configure",
      type: "boolean",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Reverse",
      description: "Fill arc from right to left"
    };

    this.arcFillColor = {
      layer: "Configure",
      type: "string",
      propControl: "ColorPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Arc Fill Color",
      description: "The fill color of the bar"
    };

    this.arcFillWidth = {
      layer: "Configure",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Arc Fill Width",
      description: "The width of the arc fill",
      propControlOptions: { min: 5, max: 50 }
    };

    this.arcBackColor = {
      layer: "Configure",
      type: "string",
      propControl: "ColorPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Arc Background Color",
      description: "The arc background color"
    };

    this.arcBackWidth = {
      layer: "Configure",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Arc Back Width",
      description: "The width of the arc background",
      propControlOptions: { min: 5, max: 50 }
    };

    this.arcTransition = {
      layer: "Configure",
      type: "select",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: true,
      display: "Arc Animation Speed",
      description: "The speed of the arc animation",
      options: [
        { value: 0, display: "Off" },
        { value: 0.25, display: "Fast" },
        { value: 0.5, display: "Medium" },
        { value: 1, display: "Slow" }
      ]
    };

    this.arcEndType = {
      layer: "Configure",
      type: "select",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: true,
      display: "Arc End Type",
      description: "The end type of the arc",
      options: [
        { value: "round", display: "Round" },
        { value: "butt", display: "Square" }
      ]
    };

    this.icon = {
      layer: "Icon",
      type: "select-icon",
      propControl: "IconPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: false,
      display: "Icon",
      description: "Icon"
    };

    this.iconShow = {
      layer: "Icon",
      type: "boolean",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: false,
      display: "Show Icon",
      description: "Show Icon"
    };

    this.iconSize = {
      layer: "Icon",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Icon Size",
      description: "The size of the icon"
    };

    this.iconColor= {
      layer: "Icon",
      type: "string",
      propControl: "ColorPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Icon Color",
      description: "The color of the icon"
    };

    this.valueFontSize = {
      layer: "Font",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Value Font Size",
      description: "The size of the value font"
    };

    this.valueFontWeight = {
      layer: "Font",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Value Font Weight",
      description: "The weight of the value font"
    };

    this.valueFontColor= {
      layer: "Font",
      type: "string",
      propControl: "ColorPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Value Font Color",
      description: "The color of the value font"
    };

    this.labelFontSize = {
      layer: "Font",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Label Font Size",
      description: "The size of the label font"
    };

    this.labelFontWeight = {
      layer: "Font",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Label Font Weight",
      description: "The weight of the label font"
    };

    this.labelFontColor= {
      layer: "Font",
      type: "string",
      propControl: "ColorPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Label Font Color",
      description: "The color of the label font"
    };

    this.cardColor= {
      layer: "Card",
      type: "string",
      propControl: "ColorPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Card Color",
      description: "The color of the card"
    };

    this.cardRadius = {
      layer: "Card",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Card Corner Radius",
      description: "The corner radius of the card"
    };

    this.bgColor.showConditions = { type: "never" };
    this.bgColor.hideConditions = {};
  }
}
