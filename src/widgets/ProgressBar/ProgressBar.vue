<template>
  <div :style="widgetStyle">
    <div class="wrapper">
      <div class="bar" :style="barStyle">
        <div class="bar-fill" :style="fillStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: ["wgt"],
  computed: {
    widgetStyle() {
      return { ...this.wgt.getStyles(), backgroundColor: "transparent" };
    },
    value() {
      return Number(this.wgt.getPropertyValue("value")) || 0;
    },
    min() {
      return this.wgt.getPropertyValue("min") == null ? 0 : Number(this.wgt.getPropertyValue("min"));
    },
    max() {
      return this.wgt.getPropertyValue("max") == null ? 100 : Number(this.wgt.getPropertyValue("max"));
    },
    percent() {
      if (this.value <= this.min || this.max < this.min) return 0;
      if (this.value >= this.max) return 100;
      return ((this.value - this.min) / Math.max(this.max - this.min, 1)) * 100;
    },
    barBackColor() {
      return this.wgt.getPropertyValue("barBackColor") || "#e0e0e0";
    },
    barFillColor() {
      return this.wgt.getPropertyValue("barFillColor") || "#1976d2";
    },
    barTransition() {
      return this.wgt.getPropertyValue("barTransition") == null ? 0.5 : Number(this.wgt.getPropertyValue("barTransition"));
    },
    reverse() {
      return !!this.wgt.getPropertyValue("reverse");
    },
    vertical() {
      return this.wgt.getPropertyValue("orientation") === "vertical";
    },
    radius() {
      const w = this.wgt.width || 0;
      const h = this.wgt.height || 0;
      // half the thickness (the shorter side) gives a fully round end
      return Math.min(w, h) / 2;
    },
    barStyle() {
      return {
        backgroundColor: this.barBackColor,
        borderRadius: this.radius + "px",
        width: "100%",
        height: "100%",
        flexDirection: this.vertical ? "column" : "row",
        justifyContent: this.vertical
          ? (this.reverse ? "flex-start" : "flex-end")   // bottom-to-top by default
          : (this.reverse ? "flex-end" : "flex-start")   // left-to-right by default
      };
    },
    fillStyle() {
      const prop = this.vertical ? "height" : "width";
      return {
        background: this.barFillColor,
        [prop]: this.percent + "%",
        [this.vertical ? "width" : "height"]: "100%",
        transition: this.barTransition === 0
          ? "none"
          : `${prop} ${this.barTransition}s cubic-bezier(0.2,0,0,1)`
      }
    }
  }
};
</script>

<style scoped>
.wrapper { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; box-sizing: border-box; position: relative; }
.bar { display: flex; overflow: hidden; position: relative; z-index: 1; }
</style>
