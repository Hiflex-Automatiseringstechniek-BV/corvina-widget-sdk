import { BaseGallery } from "corvina";
import GaugePropsHandler from "./GaugeCardPropsHandler";
import { widgetType } from "./defs";

class GaugeCardGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new GaugePropsHandler();
  }

  // State of a widget added to the dashboard from the gallery
  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "GaugeCard",
      "class": "GaugeCard",
      "value": 25,
      "format": "#.##",
      "label": "kW",
      "min": 0,
      "max": 100,
      "startAngle": -135,
      "stopAngle": 135,
      "reverse": false,
      "arcFillColor": "#1976d2",
      "arcFillWidth": 20,
      "arcBackColor": "#e0e0e0",
      "arcBackWidth": 20,
      "arcTransition": 0.5,
      "arcEndType": "round",
      "icon": "electric_bolt",
      "iconShow": false,
      "iconSize": 35,
      "iconColor": "#969696",
      "valueFontSize": 35,
      "valueFontWeight": 500,
      "valueFontColor": "#969696",
      "labelFontSize": 25,
      "labelFontWeight": 400,
      "labelFontColor": "#969696",
      "cardColor": "#ffffff",
      "cardRadius": 15,
      "width": 220,
      "height": 220,
      "x": 0,
      "y": 0,
      "cx": 110,
      "cy": 110,
    }
  }

}

export const gaugeCardGallery = new GaugeCardGallery();
