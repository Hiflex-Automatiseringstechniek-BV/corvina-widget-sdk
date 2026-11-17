declare var adjustPath;
import { registerWidget } from "corvina";
import manifest from "./manifest.json";

// Add widgets with: yarn corvina-sdk create widget <tech> <Name>

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
  category: "Hiflex"
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
