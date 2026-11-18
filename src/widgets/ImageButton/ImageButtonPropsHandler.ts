import { IPropertyHandler, BaseGraphicPropsHandler } from "corvina";

export default class ImageButtonPropsHandler extends BaseGraphicPropsHandler {  
  value: IPropertyHandler;
  images: IPropertyHandler;
  fit: IPropertyHandler;

  createCustomPropsHandler() {
    super.createCustomPropsHandler();

    this.value = {
      layer: "attributes",
      type: "numeric",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: true, // accepts datalinks: the click writes the linked tag
      attachTagPermission: "readwrite",
      display: "Value",
      description: "0 shows the off image, any other number the on image"
    };

    this.images = {
      layer: "attributes",
      type: "object",
      propControl: "ImageButtonImagesPropControl", // custom control, registered in main.ts
      attachTag: false,
      display: "Images",
      description: "the image of the button when the value is 0 (off) and when it is not 0 (on)"
    };

    this.fit = {
      layer: "Style",
      type: "select",
      propControl: "InputPropControl",
      attachTag: false,
      options: [
        { value: "contain", display: "Contain" },
        { value: "cover", display: "Cover" },
        { value: "fill", display: "Fill" }
      ],
      display: "Image fit",
      description: "how the image fills the button: whole image (contain), cropped (cover) or stretched (fill)"
    };
  }

}
