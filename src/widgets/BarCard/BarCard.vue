<template>
  <div :style="widgetStyle">
    <div class="container" :style="{ fontSize: fontSize + 'px', fontWeight: fontWeight, color: fontColor, padding: padding + 'px'}">
      <svg class="card" viewBox="0 0 200 200" preserveAspectRatio="none">
        <rect x="0" y="0" width="200" height="200" :rx="cardRx" :ry="cardRy" :fill="cardColor" />
      </svg>
      <div class="text" :class="{ compact: compact }">
        <span class="descr">{{ description }}</span>
        <span class="value">
          <span class="v">{{ valueString }}</span>
          <span class="u">{{ unit }}</span>
        </span>
      </div>
      <div class="bar" :style="{ backgroundColor: barBackColor, height: barHeight + 'px', borderRadius: (barHeight / 2) + 'px', justifyContent: reverse ? 'flex-end' : 'flex-start' }">
        <div class="bar-fill" :style="{ width: percent + '%', background: barFillColor, transition: barTransitionStyle }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BarCard",
  props: ["wgt"],
  data: function() {
    return {
    }
  },

  computed: {
    // Position, size, borders and background of the widget box
    widgetStyle() {
      return { ...this.wgt.getStyles(), backgroundColor: "transparent" };
    },
    description() {
      return this.wgt.getPropertyValue( "description" );
    },
    value() {
      return Number( this.wgt.getPropertyValue( "value" ) ) || 0;
    },
    format(){
      return this.wgt.getPropertyValue( "format" ) || "#.##";
    },
    valueString(){
      return formatNumber(this.value, this.format);
    },
    unit() {
      return this.wgt.getPropertyValue( "unit" );
    },
    min(){
      return this.wgt.getPropertyValue("min") == null ? 0 : Number(this.wgt.getPropertyValue("min"));
    },
    max(){
      return this.wgt.getPropertyValue("max") == null ? 100 : Number(this.wgt.getPropertyValue("max"));
    },
    percent() {
      const range = this.max - this.min;
      if (!(range > 0) || this.value <= this.min) return 0;
      if (this.value >= this.max) return 100;
      return ((this.value - this.min) / range) * 100;
    },
    barBackColor(){
      return this.wgt.getPropertyValue( "barBackColor" ) || "#e0e0e0";
    },
    barFillColor() {
        return this.wgt.getPropertyValue( "barFillColor" ) || "#1976d2";
    },
    barHeight(){
      return this.wgt.getPropertyValue("barHeight") == null ? 20 : Number(this.wgt.getPropertyValue("barHeight"));
    },
    barTransition() {
      return this.wgt.getPropertyValue("barTransition") == null ? 0.5 : Number(this.wgt.getPropertyValue("barTransition"));
    },
    fontSize(){
      return this.wgt.getPropertyValue("fontSize") == null ? 35 : Number(this.wgt.getPropertyValue("fontSize"));
    },
    fontWeight(){
      return this.wgt.getPropertyValue("fontWeight") == null ? 500 : Number(this.wgt.getPropertyValue("fontWeight"));
    },
    fontColor() {
      return this.wgt.getPropertyValue( "fontColor" ) || "#969696";
    },
    padding() {
        return Math.max( 5, Math.min( 40, (this.wgt.width || 0) * 0.05 ) );
    },
    compact() {
      return (this.wgt.width || 0)  < 250;
    },
    cardColor() {
      return this.wgt.getPropertyValue("cardColor") || "#ffffff";
    },
    cardRadius() {
      return this.wgt.getPropertyValue("cardRadius") == null ? 15 : Number(this.wgt.getPropertyValue("cardRadius"));
    },
    cardRx() {
      const width = this.wgt.width || 1;
      return this.cardRadius * 200 / width;
    },
    cardRy() {
    const height = this.wgt.height || 1;
    return this.cardRadius * 200 / height;
    },
    barTransitionStyle() {
      return this.barTransition === 0 ? "none" : `width ${this.barTransition}s cubic-bezier(0.2,0,0,1)`;
    },
    reverse() {
      return !!this.wgt.getPropertyValue("reverse");
    }
  }
};

// Converts a pattern like "#.##", "0.00" into Intl.NumberFormat options.
// "0" = required digit, "#" = optional digit, "," = thousands separator.
function formatNumber(v, pattern) {
  pattern = String(pattern || "").trim();
  if (!/^[#0,]*(\.[#0]*)?$/.test(pattern) || pattern === "") return String(v);
  const parts = pattern.split(".");
  const intPart = parts[0];
  const fracPart = parts[1] || "";
  return new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: Math.min(Math.max((intPart.match(/0/g) || []).length, 1), 21),
    minimumFractionDigits: Math.min((fracPart.match(/0/g) || []).length, 20),
    maximumFractionDigits: Math.min((fracPart.match(/[#0]/g) || []).length, 20),
    useGrouping: intPart.indexOf(",") >= 0
  }).format(v);
}
</script>

<style scoped>
.container { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 100%; box-sizing: border-box; position: relative;}
.card { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
.text {display: flex; justify-content: space-between; align-items: baseline; width: 100%;  position: relative; z-index: 1; }
.text.compact { flex-direction: column; align-items: center; gap: 4px; }
.value .u { margin-left: 4px; }
.bar { display: flex; width: 100%; overflow: hidden; position: relative; z-index: 1; flex-shrink: 0;}
.bar-fill { height: 100%; background: var(--color-primary, #1976d2); }
</style>
