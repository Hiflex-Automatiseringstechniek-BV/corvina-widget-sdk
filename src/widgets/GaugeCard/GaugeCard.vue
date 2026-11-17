<template>
    <div class="container" :style="widgetStyle">
        <svg class="card" viewBox="0 0 200 200" preserveAspectRatio="none">
          <rect x="0" y="0" width="200" height="200" :rx="cardRx" :ry="cardRy" :fill="cardColor"/>
        </svg>
        <svg class="gauge" viewBox="0 0 200 200"  preserveAspectRatio="xMidYMid meet" :style="{ padding: padding + 'px' }">
          <path :d="gaugePath" fill="none" :stroke="arcBackColor" :stroke-width="arcBackWidth" :stroke-linecap="arcEndType" />
          <path :d="gaugePath" fill="none" :stroke="arcFillColor" :stroke-width="arcFillWidth" :stroke-linecap="arcEndType" :stroke-dasharray="strokeDashArray" :stroke-dashoffset="strokeDashOffset" :style="arcTransitionStyle"/>
          <text  x="100"  :y="valueY"  text-anchor="middle"  dominant-baseline="middle"  :style="{ fontSize: valueFontSize + 'px', fontWeight: valueFontWeight, fill: valueFontColor }">{{ valueString }}</text>
          <text  x="100"  :y="labelY"  text-anchor="middle"  dominant-baseline="middle"  :style="{ fontSize: labelFontSize + 'px', fontWeight: labelFontWeight, fill: labelFontColor }">{{ label }}</text>
          <foreignObject v-if="iconShow" x="0" :y="65 - iconSize / 2" width="200" :height="iconSize" style="pointer-events: none;">
            <div class="icon-box">
              <i v-if="!isEccIcon" class="material-icons" :style="iconStyle">{{ icon }}</i>
              <i v-else class="ecc" :class="icon" :style="iconStyle"></i>
            </div>
          </foreignObject>
        </svg>
    </div>
</template>

<script>
export default {
  name: "GaugeCard",
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
    value() {
      return Number( this.wgt.getPropertyValue( "value" ) ) || 0;
    },
    format(){
      return this.wgt.getPropertyValue( "format" ) || "#.##";
    },
    label(){
      return this.wgt.getPropertyValue( "label" ) || "";
    },
    min(){
      return this.wgt.getPropertyValue("min") == null ? 0 : Number(this.wgt.getPropertyValue("min"));
    },
    max(){
      return this.wgt.getPropertyValue("max") == null ? 100 : Number(this.wgt.getPropertyValue("max"));
    },
    startAngle(){
      return this.wgt.getPropertyValue("startAngle") == null ? -135 : Number(this.wgt.getPropertyValue("startAngle"));
    },
    stopAngle(){
      return this.wgt.getPropertyValue("stopAngle") == null ? 135 : Number(this.wgt.getPropertyValue("stopAngle"));
    },
    effectiveStopAngle() {
      // a full 360° arc has identical start and end points and would not render
      return (this.stopAngle - this.startAngle) >= 360
        ? this.startAngle + 359.99
        : this.stopAngle;
    },
    reverse(){
      return  this.wgt.getPropertyValue( "reverse" ) ? 1 : -1;
    },
    arcFillColor() {
        return this.wgt.getPropertyValue( "arcFillColor" ) || "#1976d2";
    },
    arcFillWidth(){
      return this.wgt.getPropertyValue("arcFillWidth") == null ? 20 : Number(this.wgt.getPropertyValue("arcFillWidth"));
    },
    arcBackColor(){
      return this.wgt.getPropertyValue( "arcBackColor" ) || "#e0e0e0";
    },
    arcBackWidth(){
      return this.wgt.getPropertyValue("arcBackWidth") == null ? 20 : Number(this.wgt.getPropertyValue("arcBackWidth"));
    },
    arcTransition(){
      return this.wgt.getPropertyValue("arcTransition") == null ? 0.5 : Number(this.wgt.getPropertyValue("arcTransition"));
    },
    arcEndType(){
      return this.wgt.getPropertyValue("arcEndType") == null ? "round" : this.wgt.getPropertyValue("arcEndType");
    },
    icon() {
      return this.wgt.getPropertyValue( "icon" ) || "";
    },
    isEccIcon() {
      return this.icon.startsWith("ecc-");
    },
    iconShow() {
      return  this.wgt.getPropertyValue( "iconShow" ) ;
    },
    iconSize(){
      return this.wgt.getPropertyValue("iconSize") == null ? 35 : Number(this.wgt.getPropertyValue("iconSize"));
    },
    iconColor() {
      return this.wgt.getPropertyValue( "iconColor" ) || "#969696";
    },
    iconStyle() {
      return { color: this.iconColor, fontSize: this.iconSize + "px", lineHeight: 1 };
    },
    valueFontSize(){
      return this.wgt.getPropertyValue("valueFontSize") == null ? 35 : Number(this.wgt.getPropertyValue("valueFontSize"));
    },
    valueFontWeight(){
      return this.wgt.getPropertyValue("valueFontWeight") == null ? 500 : Number(this.wgt.getPropertyValue("valueFontWeight"));
    },
    valueFontColor() {
      return this.wgt.getPropertyValue( "valueFontColor" ) || "#969696";
    },
    labelFontSize(){
      return this.wgt.getPropertyValue("labelFontSize") == null ? 25 : Number(this.wgt.getPropertyValue("labelFontSize"));
    },
    labelFontWeight(){
      return this.wgt.getPropertyValue("labelFontWeight") == null ? 400 : Number(this.wgt.getPropertyValue("labelFontWeight"));
    },
    labelFontColor() {
      return this.wgt.getPropertyValue( "labelFontColor" ) || "#969696";
    },
    cardColor() {
      return this.wgt.getPropertyValue( "cardColor" ) || "#ffffff";
    },
    cardRadius(){
      return this.wgt.getPropertyValue("cardRadius") == null ? 15 : Number(this.wgt.getPropertyValue("cardRadius"));
    },
    percent() {
      const range = this.max - this.min;
      if (!(range > 0) || this.value <= this.min) return 0;
      if (this.value >= this.max) return 100;
      return ((this.value - this.min) / range) * 100;
    },
    valueString() {
      return formatNumber(this.value, this.format);
    },
    gaugePath() {
      return describeArc( 100, 100, this.radius, this.startAngle, this.effectiveStopAngle );
    },
    arcLength() {
      const angle = Math.abs( this.effectiveStopAngle - this.startAngle );
      return (angle / 360) * (2 * Math.PI * this.radius)
    },
    strokeDashArray() {
      return this.arcLength;
    },
    strokeDashOffset() {
      return this.arcLength * ( this.percent / 100 - 1 ) * this.reverse;
    },
    padding() {
      const m = Math.min(this.wgt.width || 0, this.wgt.height || 0);
      return Math.max(4, Math.min(40, m * 0.03));
    },
    radius() {
      const stroke = Math.max(this.arcFillWidth, this.arcBackWidth);
      return (100 - stroke / 2) - 2;
    },
    cardRx() {
      const width = this.wgt.width || 1;
      return this.cardRadius * 200 / width;
    },
    cardRy() {
      const height = this.wgt.height || 1;
      return this.cardRadius * 200 / height;
    },
    arcTransitionStyle() {
      return { transition: this.arcTransition === 0 ? "none" : `stroke-dashoffset ${this.arcTransition}s cubic-bezier(0.2,0,0,1)` };
    },
    valueY() {
      return this.textBlockTop + this.valueFontSize / 2;
    },
    labelY() {
      const gap = 4; // space between value and label
      return this.textBlockTop + this.valueFontSize + gap + this.labelFontSize / 2;
    },
    textBlockTop() {
      // Center the whole value+label block vertically in the gauge,
      // shifted down a bit when the icon is shown above it.
      const gap = 4;
      const blockHeight = this.valueFontSize + gap + this.labelFontSize;
      const centerY = this.iconShow ? 120 : 100;
      return centerY - blockHeight / 2;
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

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

function describeArc(centerX, centerY, radius, startAngle, endAngle) {
  const start = polarToCartesian(centerX, centerY, radius, startAngle)
  const end = polarToCartesian(centerX, centerY, radius, endAngle)
  const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0
  return [ 'M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y ].join(' ')
}
</script>

<style scoped>
.container {  width: 100%;  height: 100%;  position: relative;  box-sizing: border-box;}
.card { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0;}
.gauge {  position: absolute; inset: 0; width: 100%;  height: 100%;  display: block;  overflow: visible;  z-index: 1; box-sizing: border-box; }
.icon-box { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
</style>
