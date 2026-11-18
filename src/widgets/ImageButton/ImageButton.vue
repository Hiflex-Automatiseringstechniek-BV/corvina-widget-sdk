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

const i18n = useCorvinaI18n({
  "en-US": { "noImages": "No image: choose the images in the properties panel", "loading": "Loading..." },
  "it-IT": { "noImages": "Nessuna immagine: sceglile nel pannello delle proprietà", "loading": "Caricamento..." }
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
    // The image of the state; with only one image chosen it is shown in both states
    current() {
      const images = this.images;
      const wanted = this.pressed ? images.on : images.off;
      return wanted || images.off || images.on || null;
    },
    source() {
      return this.current ? this.wgt.imageSources[ this.current.asset ] : "";
    },
    placeholder() {
      return this.current ? i18n.t( "loading" ) : i18n.t( "noImages" );
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
