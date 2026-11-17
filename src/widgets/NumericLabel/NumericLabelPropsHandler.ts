import { IPropertyHandler, BaseGraphicPropsHandler } from "corvina";

/*
 * Properties shown in the properties panel of the editor. BaseGraphicPropsHandler adds the standard
 * ones of the widget box: position and size, visibility, background, borders, permissions.
 */
export default class NumericLabelPropsHandler extends BaseGraphicPropsHandler {
  value: IPropertyHandler;
  format: IPropertyHandler;
  unit: IPropertyHandler;
  min: IPropertyHandler;
  max: IPropertyHandler;
  valueFontSize: IPropertyHandler;
  valueFontWeight: IPropertyHandler;
  valueFontColor: IPropertyHandler;
  unitFontSize: IPropertyHandler;
  unitFontWeight: IPropertyHandler;
  unitFontColor: IPropertyHandler;
  hAlign: IPropertyHandler;
  vAlign: IPropertyHandler;

  createCustomPropsHandler() {
    super.createCustomPropsHandler();

    this.value = {
      layer: "attributes",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      attachTagPermission: "readwrite",
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
      display: "Min",
      description: "The minimum value of the measurement"
    };

    this.max = {
      layer: "attributes",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      display: "Max",
      description: "The maximum value of the measurement"
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

    this.unitFontSize = {
      layer: "Font",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Unit Font Size",
      description: "The size of the unit font"
    };

    this.unitFontWeight = {
      layer: "Font",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Unit Font Weight",
      description: "The weight of the unit font"
    };

    this.unitFontColor= {
      layer: "Font",
      type: "string",
      propControl: "ColorPropControl",
      readOnly: false,
      attachTag: true,
      supportI18n: false,
      display: "Unit Font Color",
      description: "The color of the unit font"
    };

    this.hAlign = {
      layer: "Font",
      type: "select",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: false,
      display: "Horizontal Alignment",
      description: "Horizontal alignment of the text",
      options: [
        { value: "left", display: "Left" },
        { value: "center", display: "Center" },
        { value: "right", display: "Right" }
      ]
    };

    this.vAlign = {
      layer: "Font",
      type: "select",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: false,
      display: "Vertical Alignment",
      description: "Vertical alignment of the text",
      options: [
        { value: "top", display: "Top" },
        { value: "center", display: "Middle" },
        { value: "bottom", display: "Bottom" }
      ]
    };
  }
}
