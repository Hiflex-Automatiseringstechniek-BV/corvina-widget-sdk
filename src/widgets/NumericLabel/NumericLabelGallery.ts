import { BaseGallery } from "corvina";
import NumericLabelPropsHandler from "./NumericLabelPropsHandler";
import { widgetType } from "./defs";

class NumericLabelGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new NumericLabelPropsHandler();
  }

  // State of a widget added to the dashboard from the gallery
  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "NumericLabel",
      "class": "NumericLabel",
      "value": 25,
      "format": "#.##",
      "unit": "°C",
      "min": 0,
      "max": 100,
      "valueFontSize": 35,
      "valueFontWeight": 500,
      "valueFontColor": "#969696",
      "unitFontSize": 25,
      "unitFontWeight": 400,
      "unitFontColor": "#969696",
      "hAlign": "center",
      "vAlign": "center",
      "showPermissions": true,
      "usePermissions": false,
      "enabledForGroups": [],
      "visibleForGroups": [],
      "width": 220,
      "height": 140,
      "x": 0,
      "y": 0,
      "cx": 110,
      "cy": 70,
    }
  }

}

export const numericLabelGallery = new NumericLabelGallery();
