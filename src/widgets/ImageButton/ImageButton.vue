<template>
  <div :style="widgetStyle">
    <div class="image-button" :class="{ interactive: interactive }" role="button" :aria-pressed="pressed ? 'true' : 'false'"
      @click="wgt.click()">
      <img v-if="source" class="image" :src="source" draggable="false" :style="{ objectFit: fit }">
      <span v-else class="placeholder">{{ placeholder }}</span>
    </div>
  </div>
</template>

<script>
import { useCorvinaI18n } from "corvina";
import { toBoolean } from "./defs";
import { defaultImage } from "./defaultImages";

const i18n = useCorvinaI18n({
  "en-US": { "loading": "Loading..." },
  "it-IT": { "loading": "Caricamento..." }
});

export default {
  name: "ImageButton",
  props: ["wgt"],
  computed: {
    // Position, size, borders and background of the widget box
    widgetStyle() {
      return this.wgt.getStyles();
    },
    pressed() {
      return toBoolean( this.wgt.getPropertyValue( "value" ) );
    },
    images() {
      return this.wgt.getPropertyValue( "images" ) || {};
    },
    // Each state has its own image: the one chosen by the user, or the default one
    custom() {
      return this.pressed ? this.images.on : this.images.off;
    },
    source() {
      if ( this.custom ) return this.wgt.imageSources[ this.custom.asset ] || "";
      return defaultImage( this.pressed ? "on" : "off" );
    },
    placeholder() {
      return i18n.t( "loading" );
    },
    fit() {
      return this.wgt.getPropertyValue( "fit" ) || "contain";
    },
    interactive() {
      return this.wgt.isInteractive() && this.wgt.canWrite();
    }
  }
};
</script>

<style scoped>
.image-button { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; user-select: none; -webkit-user-select: none; }
.image-button.interactive { cursor: pointer; }
.image { width: 100%; height: 100%; display: block; pointer-events: none; }
.placeholder { padding: 8px; text-align: center; font-size: 13px; opacity: .6; }
</style>
