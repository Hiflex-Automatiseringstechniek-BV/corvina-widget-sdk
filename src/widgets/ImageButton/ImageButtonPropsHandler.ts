import { IPropertyHandler, BaseGraphicPropsHandler } from "corvina";

export default class ImageButtonPropsHandler extends BaseGraphicPropsHandler {
  images: IPropertyHandler;
  value: IPropertyHandler;
  fit: IPropertyHandler;

  createCustomPropsHandler() {
    super.createCustomPropsHandler();

    this.images = {
      layer: "attributes",
      type: "object",
      propControl: "ImageButtonImagesPropControl", // custom control, registered in main.ts
      attachTag: false,
      display: "Images",
      description: "the image of the button when the value is 0 (off) and when it is not 0 (on)"
    };

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

      this.usePermissions = {
      layer: "Permissions",
      type: "boolean",
      propControl: "InputPropControl",
      readOnly: false,
      attachTag: false,
      display: "Enable user permissions",
      description: "limit the widget to the user groups below"
    };

    this.visibleForGroups = {
      layer: "Permissions",
      type: "object",
      propControl: "GroupsListPropControl",
      attachTag: false,
      display: "Visible for groups",
      description: "the user groups that see the widget"
    };

    this.enabledForGroups = {
      layer: "Permissions",
      type: "object",
      propControl: "GroupsListPropControl",
      attachTag: false,
      display: "Enabled for groups",
      description: "the user groups that can use the widget"
    };
  }

}
