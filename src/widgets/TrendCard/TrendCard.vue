<template>
  <div :style="widgetStyle">
    <div class="wrapper" :style="{  padding: padding + 'px'}">
      <svg class="card" viewBox="0 0 200 200" preserveAspectRatio="none">
        <rect x="0" y="0" width="200" height="200" :rx="cardRx" :ry="cardRy" :fill="cardColor" />
      </svg>
      <div class="text" :style="valueFontStyle">
        <span class="value">
          <span class="v">{{ valueString }}</span>
          <span class="u">{{ unit }}</span>
        </span>
        <span class="descr" :style="labelFontStyle">{{ label }}</span>
      </div>
      <i v-if="iconShow && !isEccIcon" class="cardIcon material-icons" :style="{ color: iconColor, fontSize: iconSize + 'px' }" >{{ icon }}</i>
      <i v-else-if="iconShow" class="cardIcon ecc" :class="icon" :style="{ color: iconColor, fontSize: iconSize + 'px' }" ></i>
      <div class="cardGraphBox" :style="{ '--card-radius': cardRadius + 'px' }">
        <svg class="cardGraph" viewBox="0 0 400 200" preserveAspectRatio="none">
          <defs>
            <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" :stop-color="graphColor" stop-opacity="1" />
              <stop offset="75%" :stop-color="graphColor" stop-opacity="0.75" />
              <stop offset="100%" :stop-color="graphColor" stop-opacity="0.5" />
            </linearGradient>
          </defs>
          <!-- Area fill -->
          <path :d="areaPath" :fill="`url(#${gradientId})`" />
          <!-- Curved line -->
          <path :d="linePath" fill="none" :stroke="graphColor" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
let uid = 0;

export default {
  name: "TrendCard",
  props: ["wgt"],
  data: function() {
    return {
        listData: [],
        gradientId: `areaGradient-${uid++}`,
        lastKnown: null
    }
  },

  computed: {
    // Position, size, borders and background of the widget box
    widgetStyle() {
      return { ...this.wgt.getStyles(), backgroundColor: "transparent" };
    },
    datalinks(){
      return this.wgt.datalinks;
    },
    values() {
      return this.listData.map(s => Number(s.v)).filter(v => !isNaN(v));
    },
    value() {
      if (this.lastKnown !== null) return this.lastKnown;
      return this.values.length ? this.values[this.values.length - 1] : null;
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
    label() {
      return this.wgt.getPropertyValue( "label" );
      return this.tagName;
    },
    startDate(){
      return this.wgt.getPropertyValue( "from" ).toLocaleTimeString();
    },
    endDate(){
      return this.wgt.getPropertyValue( "to" ).toLocaleTimeString();
    },
    empty(){
      return this.listData.length == 0;
    },
    graphColor() {
      return this.wgt.getPropertyValue("graphColor") || "#1976d2";
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
      return this.wgt.getPropertyValue("iconSize") == null ? 32 : Number(this.wgt.getPropertyValue("iconSize"));
    },
    iconColor() {
      return this.wgt.getPropertyValue( "iconColor" ) || "#969696";
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
    valueFontStyle() {
      return { fontSize: this.valueFontSize + 'px', fontWeight: this.valueFontWeight, color: this.valueFontColor };
    },
    labelFontSize(){
      return this.wgt.getPropertyValue("labelFontSize") == null ? 25 : Number(this.wgt.getPropertyValue("labelFontSize"));
    },
    labelFontWeight(){
      return this.wgt.getPropertyValue("labelFontWeight") == null ? 500 : Number(this.wgt.getPropertyValue("labelFontWeight"));
    },
    labelFontColor() {
      return this.wgt.getPropertyValue( "labelFontColor" ) || "#e0e0e0";
    },
    labelFontStyle() {
      return { fontSize: this.labelFontSize + 'px', fontWeight: this.labelFontWeight, color: this.labelFontColor };
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
    graphValues() {
      if (this.values.length >= 2) return this.values;
      const single = this.values.length === 1 ? this.values[0] : this.lastKnown;
      return single === null || single === undefined ? [] : [single, single];
    },
    graphPoints() {
      const values = this.graphValues;
      if (values.length < 2) return [];

      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = (max - min) || 1;

      return values.map((value, index) => ({
        x: (index / (values.length - 1)) * 400,
        // flat data (including the single-value case): draw in the middle of the area
        y: max === min ? 110 : 195 - ((value - min) / range) * 175
      }));
    },
    // Bézier segments only (no leading "M")
    curve() {
      const pts = this.graphPoints;
      let d = "";
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const mx = p0.x + (p1.x - p0.x) / 2;
        d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
      }
      return d;
    },
    linePath() {
      const pts = this.graphPoints;
      if (pts.length < 2) return "";
      return `M ${pts[0].x} ${pts[0].y}${this.curve}`;
    },
    areaPath() {
      const pts = this.graphPoints;
      if (pts.length < 2) return "";
      const last = pts[pts.length - 1];
      return `M ${pts[0].x} 200 L ${pts[0].x} ${pts[0].y}${this.curve} L ${last.x} 200 Z`;
    }
  },

  watch: {
    datalinks: function () {
      this.wgt.fetchData();
      this.loadLastKnown();
    }
  },

  methods: {
    draw ( data ) {
      this.listData = data
        .slice()
        .sort((a, b) => new Date(a.ts) - new Date(b.ts))
        .map(s => ({ ts: new Date(s.ts).toISOString(), v: s.v }));
    },
    async loadLastKnown() {
      const seq = ++this._lastSeq;                  // ignore answers that arrive out of order
      const v = await this.wgt.fetchLastKnown();
      if (seq === this._lastSeq && v !== null) this.lastKnown = v;
    }
  },

  mounted: async function() {
    this._lastSeq = 0;
    this.wgt.onDataUpdate( ( data ) => {
      this.draw( data );
      this.loadLastKnown();
     } );
    this.wgt.fetchData();
  },
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
    minimumIntegerDigits: Math.max((intPart.match(/0/g) || []).length, 1),
    minimumFractionDigits: (fracPart.match(/0/g) || []).length,
    maximumFractionDigits: Math.min((fracPart.match(/[#0]/g) || []).length, 20),
    useGrouping: intPart.indexOf(",") >= 0
  }).format(v);
}
</script>

<style scoped>
.wrapper { display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between; gap: 8px; width: 100%; height: 100%; box-sizing: border-box; position: relative;}
.card { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
.text { display: flex; flex-direction: column;  align-items: flex-start; gap: 4px;  flex: 1; min-width: 0; position: relative; z-index: 1;}
.value .u { margin-left: 4px; }
.cardIcon { position: relative;  z-index: 1; flex-shrink: 0; align-self: flex-start;  pointer-events: none;}
.cardGraphBox { position: absolute; left: 0; right: 0; bottom: 0; height: 70%; z-index: 0; overflow: hidden; border-radius: 0 0 var(--card-radius, 15px) var(--card-radius, 15px); pointer-events: none;}
.cardGraph { display: block; width: 100%; height: 100%; }
</style>
