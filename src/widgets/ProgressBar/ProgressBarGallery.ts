import { BaseGallery } from "corvina";
import ProgressBarPropsHandler from "./ProgressBarPropsHandler";
import { widgetType } from "./defs";

class ProgressBarGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new ProgressBarPropsHandler();
  }

  // State of a widget added to the dashboard from the gallery
  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "ProgressBar",
      "class": "ProgressBar",
      "value": 25,
      "min": 0,
      "max": 100,
      "reverse": false,
      "orientation": "horizontal",
      "barFillColor": "#1976d2",
      "barBackColor": "#e0e0e0",
      "barTransition": 0.5,
      "width": 220,
      "height": 140,
      "x": 0,
      "y": 0,
      "cx": 110,
      "cy": 70,
    }
  }

}

export const progressBarGallery = new ProgressBarGallery();
