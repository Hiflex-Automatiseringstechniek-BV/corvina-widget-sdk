import { IPropertyHandler, BaseGraphicPropsHandler } from "corvina";

/*
 * Properties shown in the properties panel of the editor. BaseGraphicPropsHandler adds the standard
 * ones of the widget box: position and size, visibility, background, borders, permissions.
 */
export default class TrendCardPropsHandler extends BaseGraphicPropsHandler {
  tagReference: IPropertyHandler;
  from: IPropertyHandler;
  to: IPropertyHandler;
  format: IPropertyHandler;
  label: IPropertyHandler;
  graphColor: IPropertyHandler;
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

      this.tagReference = {
        layer: "attributes",
        type: "datasource",
        propControl: "InputPropControl",
        readOnly: false,
        attachTag: true,
        display: "Tag",
        description: "Tag connection"
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

      this.graphColor = {
        layer: "Configure",
        type: "string",
        propControl: "ColorPropControl",
        readOnly: false,
        attachTag: true,
        supportI18n: false,
        display: "Graph Color",
        description: "The color of the graph"
      };

      this.from = {
        layer: "Configure",
        type: "datetime",
        propControl: "CombinedDateTimePropControl",
        readOnly: false,
        attachTag: false,
        display: "Start interval",
        description: "Start of time window"
      };

      this.to = {
        layer: "Configure",
        type: "datetime",
        propControl: "CombinedDateTimePropControl",
        readOnly: false,
        attachTag: false,
        display: "End interval",
        description: "End of time window"
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
