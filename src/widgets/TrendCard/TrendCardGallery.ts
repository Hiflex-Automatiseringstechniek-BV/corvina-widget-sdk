import { BaseGallery } from "corvina";
import TrendCardPropsHandler from "./TrendCardPropsHandler";
import { widgetType } from "./defs";

class TrendCardGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new TrendCardPropsHandler();
  }

  // State of a widget added to the dashboard from the gallery
  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "TrendCard",
      "class": "TrendCard",
      "format": "#.#",
      "unit": "%",
      "label": "Description",
      "graphColor": "#1976d2",
      "icon": "trending_up",
      "iconShow": true,
      "iconSize": 35,
      "iconColor": "#969696",
      "valueFontSize": 35,
      "valueFontWeight": 500,
      "valueFontColor": "#969696",
      "labelFontSize": 25,
      "labelFontWeight": 400,
      "labelFontColor": "#969696",
      "cardColor": "#ffffff",
      "cardRadius": 25,
      "width": 220,
      "height": 140,
      "x": 0,
      "y": 0,
      "cx": 110,
      "cy": 70,
    }
  }

}

export const trendCardGallery = new TrendCardGallery();
