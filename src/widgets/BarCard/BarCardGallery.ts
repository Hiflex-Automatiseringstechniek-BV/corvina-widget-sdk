import { BaseGallery } from "corvina";
import BarCardPropsHandler from "./BarCardPropsHandler";
import { widgetType } from "./defs";

class BarCardGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new BarCardPropsHandler();
  }

  // State of a widget added to the dashboard from the gallery
  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "BarCard",
      "class": "BarCard",
      "value": 25,
      "format": "#.##",
      "unit": "°C",
      "min": 0,
      "max": 100,
      "description": "Description",
      "reverse": false,
      "barFillColor": "#1976d2",
      "barBackColor": "#e0e0e0",
      "barTransition": 0.5,
      "barHeight": 20,
      "fontSize": 35,
      "fontWeight": 500,
      "fontColor": "#969696",
      "cardColor": "#ffffff",
      "cardRadius": 15,
      "width": 220,
      "height": 140,
      "x": 0,
      "y": 0,
      "cx": 110,
      "cy": 70,
    }
  }

}

export const barCardGallery = new BarCardGallery();
