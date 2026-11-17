import { IPropertyHandler, BaseGraphicPropsHandler } from "corvina";

/*
 * Properties shown in the properties panel of the editor. BaseGraphicPropsHandler adds the standard
 * ones of the widget box: position and size, visibility, background, borders, permissions.
 */
export default class ProgressBarPropsHandler extends BaseGraphicPropsHandler {
  value: IPropertyHandler;
  min: IPropertyHandler;
  max: IPropertyHandler;
  reverse: IPropertyHandler;
  orientation: IPropertyHandler;
  barFillColor: IPropertyHandler;
  barBackColor: IPropertyHandler;
  barTransition: IPropertyHandler;

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

    this.orientation = {
      layer: "Configure",
      type: "select",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      supportI18n: true,
      display: "Bar orientation ",
      description: "The orientation of fill",
      options: [
        { value: "horizontal", display: "Horizontal" },
        { value: "vertical", display: "Vertical" }
      ]
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

    this.bgColor.showConditions = { type: "never" };
    this.bgColor.hideConditions = {};
  }

}
