<template>
  <div :style="widgetStyle" @click="startEdit">
    <div class="numericlabel-wrapper" :style="alignStyle">
    <div v-if="editing" class="numericlabel-edit" @click.stop @mousedown.stop>
      <div v-if="error" class="numericlabel-error" :style="inputStyle">{{ error }}</div>
      <input ref="input" class="numericlabel-input"
            :style="[valueStyle, inputStyle]"
            type="number" step="any" v-model="draft" :disabled="!canWrite()"
            @input="error = ''" @keydown.enter.prevent="commit" @keydown.esc.prevent="cancel"
            @blur="blurCommit" />
    </div>
    <span v-else class="numericlabel-value numericlabel-editable">
      <span :style="valueStyle">{{ valueString }}</span>
      <span :style="unitStyle">{{ unit }}</span>
    </span>
      </div>
  </div>
</template>

<script>
import { useCorvinaI18n } from "corvina";

const i18n = useCorvinaI18n({
  "en-US": { "invalidInput": "Invalid input", "minimum": "Minimum", "maximum": "Maximum" },
  "it-IT": { "invalidInput": "Input non valido", "minimum": "Minimo", "maximum": "Massimo" },
  "de-DE": { "invalidInput": "Ungültige Eingabe", "minimum": "Minimum", "maximum": "Maximum" }
});

export default {
  name: "NumericLabel",
  props: ["wgt"],
  data: function() {
    return { editing: false, draft: "", error: "", i18n: i18n  };
  },

  computed: {
    // Position, size, borders and background of the widget box
    widgetStyle() {
      return this.wgt.getStyles();
    },
    value() {
      return Number( this.wgt.getPropertyValue( "value" ) ) || 0;
    },
    format() {
      return this.wgt.getPropertyValue( "format" ) || "#.##";
    },
    valueString() {
      return formatNumber(this.value, this.format);
    },
    unit() {
      return this.wgt.getPropertyValue( "unit" ) || "";
    },
    min() {
      const raw = this.wgt.getPropertyValue("min");
      const n = raw === null || raw === undefined || raw === "" ? NaN : Number(raw);
      return Number.isFinite(n) ? n : null;
    },
    max() {
      const raw = this.wgt.getPropertyValue("max");
      const n = raw === null || raw === undefined || raw === "" ? NaN : Number(raw);
      return Number.isFinite(n) ? n : null;
    },
    valueFontSize() {
      return this.wgt.getPropertyValue("valueFontSize") == null ? 35 : Number(this.wgt.getPropertyValue("valueFontSize"));
    },
    valueFontWeight() {
      return this.wgt.getPropertyValue("valueFontWeight") == null ? 500 : Number(this.wgt.getPropertyValue("valueFontWeight"));
    },
    valueFontColor() {
      return this.wgt.getPropertyValue( "valueFontColor" ) || "#969696";
    },
    unitFontSize() {
      return this.wgt.getPropertyValue("unitFontSize") == null ? 25 : Number(this.wgt.getPropertyValue("unitFontSize"));
    },
    unitFontWeight() {
      return this.wgt.getPropertyValue("unitFontWeight") == null ? 400 : Number(this.wgt.getPropertyValue("unitFontWeight"));
    },
    unitFontColor() {
      return this.wgt.getPropertyValue( "unitFontColor" ) || "#969696";
    },
    valueStyle() {
      return { fontSize: this.valueFontSize + "px", fontWeight: this.valueFontWeight, color: this.valueFontColor };
    },
    unitStyle() {
      return { fontSize: this.unitFontSize + "px", fontWeight: this.unitFontWeight, color: this.unitFontColor };
    },
    alignStyle() {
      const h = { left: "flex-start", center: "center", right: "flex-end" };
      const v = { top: "flex-start", center: "center", bottom: "flex-end" };
      return {
        justifyContent: h[this.wgt.getPropertyValue("hAlign")] || "center",
        alignItems: v[this.wgt.getPropertyValue("vAlign")] || "center"
      };
    },
    inputStyle() {
      const a = this.wgt.getPropertyValue("hAlign");
      return { textAlign: a === "left" ? "left" : a === "right" ? "right" : "center" };
    }
  },
  methods: {
    canWrite() {
      const w = this.wgt;
      if (!w.hasDatalinkAttachedtoProp("value")) return false;
      const dl = w.getDatalinkFromProperty("value");
      const p = dl && dl.permission;
      return p === "read/write" || p === "write";
    },
    startEdit() {
      if (this.wgt.disabled.v) return;
      if (!this.canWrite()) return;
      if (this.wgt.inEditor) return; // Important to disable editing in Dashboard Editor
      if (this.editing) return;
        this.draft = String(this.value);
        this.editing = true;
        this.$nextTick(() => {
          const el = this.$refs.input;
          if (el) { el.focus(); el.select(); }
        });
    },
    commit() {
      if (!this.editing) return;
        const n = Number(this.draft);
        if (this.draft === "" || !Number.isFinite(n)) {
          this.error = this.i18n.t("invalidInput");
          return;
        }
        if (this.min !== null && n < this.min) {
          this.error = this.i18n.t("minimum") + ": " + this.min;
          return;
        }
        if (this.max !== null && n > this.max) {
          this.error = this.i18n.t("maximum") + ": " + this.max;
          return;
        }
        this.error = "";
        this.editing = false;
        this.writeValue(n);
    },
    cancel() {
      this.error = "";
      this.editing = false;
    },
    writeValue(n) {
      this.wgt.setPropertyValue({ prop: "value", value: n });
    },
    blurCommit() {
      this.commit();
      if (this.error) this.cancel();
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
.numericlabel-wrapper { display: flex; flex-direction: row; width: 100%; height: 100%; box-sizing: border-box; }
.numericlabel-value { display: flex; align-items: baseline; gap: 4px; white-space: nowrap; }
.numericlabel-input { width: 100%; box-sizing: border-box; background: transparent; border: none; border-bottom: 1px solid currentColor; outline: none; font-family: inherit; }
.numericlabel-edit { display: flex; flex-direction: column; width: 100%; }
.numericlabel-error { align-self: flex-start; background: #d32f2f; color: #ffffff; font-size: 12px; line-height: 1.2; padding: 2px 6px; margin-bottom: 4px; border-radius: 4px; box-sizing: border-box; }
</style>
