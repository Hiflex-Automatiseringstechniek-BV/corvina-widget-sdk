import { IPropertyHandler, BaseGraphicPropsHandler } from "corvina";

/*
 * Properties shown in the properties panel of the editor. BaseGraphicPropsHandler adds the standard
 * ones of the widget box: position and size, visibility, background, borders, permissions.
 */
export default class BarCardPropsHandler extends BaseGraphicPropsHandler {
  value: IPropertyHandler;
  format: IPropertyHandler;
  unit: IPropertyHandler;
  min: IPropertyHandler;
  max: IPropertyHandler;
  description: IPropertyHandler;
  reverse: IPropertyHandler;
  barFillColor: IPropertyHandler;
  barBackColor: IPropertyHandler;
  barHeight: IPropertyHandler;
  barTransition: IPropertyHandler;
  fontSize: IPropertyHandler;
  fontWeight: IPropertyHandler;
  fontColor: IPropertyHandler;
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

    this.unit = {
      layer: "attributes",
      type: "string",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Unit",
      description: "The unit of the measurement"
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

    this.description = {
      layer: "attributes",
      type: "string",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: true, // translatable property
      display: "Description",
      description: "The description of the measurement"
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

    this.barFillColor = {
      layer: "Configure",
      type: "string",
      propControl: "ColorPropControl",
      readOnly: false,
      attachTag: true,
      display: "Bar Fill Color",
      description: "The fill color of the bar"
    };

    this.barBackColor = {
      layer: "Configure",
      type: "string",
      propControl: "ColorPropControl",
      readOnly: false,
      attachTag: true,
      display: "Bar Background Color",
      description: "The background color of the bar"
    };

    this.barHeight = {
      layer: "Configure",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      display: "Bar Height",
      description: "The bar height"
    };

    this.barTransition = {
      layer: "Configure",
      type: "select",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: true,
      display: "Bar Animation Speed",
      description: "The speed of the bar animation",
      options: [
        { value: 0, display: "Off" },
        { value: 0.25, display: "Fast" },
        { value: 0.5, display: "Medium" },
        { value: 1, display: "Slow" }
      ]
    };

    this.fontSize = {
      layer: "Font",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      display: "Font Size",
      description: "The size of the font"
    };

    this.fontWeight = {
      layer: "Font",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      display: "Font Weight",
      description: "The weight of the font"
    };

    this.fontColor= {
      layer: "Font",
      type: "string",
      propControl: "ColorPropControl",
      readOnly: false,
      attachTag: true,
      display: "Font Color",
      description: "The color of the font"
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
