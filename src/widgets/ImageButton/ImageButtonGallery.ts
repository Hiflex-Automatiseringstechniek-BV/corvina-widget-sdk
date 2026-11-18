import { BaseGallery } from "corvina";
import ImageButtonPropsHandler from "./ImageButtonPropsHandler";
import { widgetType } from "./defs";

class ImageButtonGallery extends BaseGallery {

  constructor() {
    super();
    this.propsHandler = new ImageButtonPropsHandler();
  }

  // State of a widget added to the dashboard from the gallery
  getDefaultConfiguration() {
    return {
      "type": widgetType,
      "id": "ImageButton",
      "class": "ImageButton",
      "images": { "off": null, "on": null },
      "value": 0,
      "fit": "contain",
      "showPermissions": true,
      "usePermissions": false,
      "enabledForGroups": [],
      "visibleForGroups": [],
      "width": 120,
      "height": 120,
      "x": 0,
      "y": 0,
      "cx": 60,
      "cy": 60,
    }
  }

}

export const imageButtonGallery = new ImageButtonGallery();