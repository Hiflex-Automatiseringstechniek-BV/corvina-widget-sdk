declare var adjustPath;
import { registerWidget, registerPropControl } from "corvina";
import manifest from "./manifest.json";

// BarCard: Vue 2 component (classic SDK widget) (created by corvina-sdk create widget vue)
import BarCard from "./widgets/BarCard/BarCard";
import BarCardVue from "./widgets/BarCard/BarCard.vue";
import { barCardGallery } from "./widgets/BarCard/BarCardGallery";
import { widgetType as BarCardType } from "./widgets/BarCard/defs";
registerWidget({
  type: BarCardType,  // The value is Hiflex.BarCard
  class: BarCard,
  component: BarCardVue,
  gfx: barCardGallery.getDefaultConfiguration,
  props: barCardGallery.getPropsHandler(),
  icon: adjustPath( require( "./resources/images/barcard.svg" ) ),
  category: "Hiflex",
  displayName: "Bar Card",
  // What the widget shows and what its properties are for: the Corvina AI assistant reads it
  description: "A Card widget with a horizontal progressbar, a label for description and a numeric value with units"
}, manifest);

// Gauge: Vue 2 component (classic SDK widget) (created by corvina-sdk create widget vue)
import GaugeCard from "./widgets/GaugeCard/GaugeCard";
import GaugeCardVue from "./widgets/GaugeCard/GaugeCard.vue";
import { gaugeCardGallery } from "./widgets/GaugeCard/GaugeCardGallery";
import { widgetType as GaugeCardType } from "./widgets/GaugeCard/defs";
registerWidget({
  type: GaugeCardType,  // The value is Hiflex.Gauge
  class: GaugeCard,
  component: GaugeCardVue,
  gfx: gaugeCardGallery.getDefaultConfiguration,
  props: gaugeCardGallery.getPropsHandler(),
  icon: adjustPath( require( "./resources/images/gaugecard.svg" ) ),
  category: "Hiflex"
}, manifest);

// TrendCard: Vue 2 component (classic SDK widget) (created by corvina-sdk create widget vue)
import TrendCard from "./widgets/TrendCard/TrendCard";
import TrendCardVue from "./widgets/TrendCard/TrendCard.vue";
import { trendCardGallery } from "./widgets/TrendCard/TrendCardGallery";
import { widgetType as TrendCardType } from "./widgets/TrendCard/defs";
registerWidget({
  type: TrendCardType,  // The value is Hiflex.TrendCard
  class: TrendCard,
  component: TrendCardVue,
  gfx: trendCardGallery.getDefaultConfiguration,
  props: trendCardGallery.getPropsHandler(),
  icon: adjustPath( require( "./resources/images/trendcard.svg" ) ),
  category: "Hiflex"
}, manifest);

// ProgressBar: Vue 2 component (classic SDK widget) (created by corvina-sdk create widget vue)
import ProgressBar from "./widgets/ProgressBar/ProgressBar";
import ProgressBarVue from "./widgets/ProgressBar/ProgressBar.vue";
import { progressBarGallery } from "./widgets/ProgressBar/ProgressBarGallery";
import { widgetType as ProgressBarType } from "./widgets/ProgressBar/defs";
registerWidget({
  type: ProgressBarType,  // The value is Hiflex.ProgressBar
  class: ProgressBar,
  component: ProgressBarVue,
  gfx: progressBarGallery.getDefaultConfiguration,
  props: progressBarGallery.getPropsHandler(),
               icon: adjustPath( require( "./resources/images/progressbar.svg" ) ),
               category: "Hiflex"
}, manifest);

// NumericLabel: Vue 2 component (classic SDK widget) (created by corvina-sdk create widget vue)
import NumericLabel from "./widgets/NumericLabel/NumericLabel";
import NumericLabelVue from "./widgets/NumericLabel/NumericLabel.vue";
import { numericLabelGallery } from "./widgets/NumericLabel/NumericLabelGallery";
import { widgetType as NumericLabelType } from "./widgets/NumericLabel/defs";
registerWidget({
  type: NumericLabelType,  // The value is Hiflex.NumericLabel
  class: NumericLabel,
  component: NumericLabelVue,
  gfx: numericLabelGallery.getDefaultConfiguration,
  props: numericLabelGallery.getPropsHandler(),
               icon: adjustPath( require( "./resources/images/numericlabel.svg" ) ),
               category: "Hiflex"
}, manifest);

// ImageGallery: Vue 2 component (classic SDK widget) (created by corvina-sdk create widget vue)
/*import ImageGallery from "./widgets/ImageGallery/ImageGallery";
import ImageGalleryVue from "./widgets/ImageGallery/ImageGallery.vue";
import ImageGalleryImagesPropControl from "./widgets/ImageGallery/ImageGalleryImagesPropControl.vue";
import { imageGalleryGallery } from "./widgets/ImageGallery/ImageGalleryGallery";
import { widgetType as ImageGalleryType } from "./widgets/ImageGallery/defs";
registerPropControl( ImageGalleryImagesPropControl );
registerWidget({
  type: ImageGalleryType,  // The value is Hiflex.ImageGallery
  class: ImageGallery,
  component: ImageGalleryVue,
  gfx: imageGalleryGallery.getDefaultConfiguration,
  props: imageGalleryGallery.getPropsHandler(),
               icon: adjustPath( require( "./resources/images/corvina-widget1.png" ) ),
               category: "Hiflex"
}, manifest);*/

import ImageButton from "./widgets/ImageButton/ImageButton";
import ImageButtonVue from "./widgets/ImageButton/ImageButton.vue";
import ImageButtonImagesPropControl from "./widgets/ImageButton/ImageButtonImagesPropControl.vue";
import { imageButtonGallery } from "./widgets/ImageButton/ImageButtonGallery";
import { widgetType as ImageButtonType } from "./widgets/ImageButton/defs";

registerPropControl( ImageButtonImagesPropControl );
registerWidget({
  type: ImageButtonType,  // The value is Hiflex.ImageButton
  class: ImageButton,
  component: ImageButtonVue,
  gfx: imageButtonGallery.getDefaultConfiguration,
  props: imageButtonGallery.getPropsHandler(),
  icon: adjustPath( require( "./resources/images/imagebutton.svg" ) ),
  category: "Hiflex"
}, manifest);