<template>
  <div class="ib-images">
    <div v-if="storageEnabled === false" class="ib-message">{{ i18n.t( "storageDisabled" ) }}</div>
    <!-- Same markup and classes as the select fields of the properties panel (Vuetify), so they look the same -->
    <div v-for="slot in slots" :key="slot" class="prop-control ib-field" :data-qa="'prop-control-images-' + slot">
      <div style="display: flex; width: 100%; align-content: stretch;">
        <div class="v-input prop-input-select v-input--hide-details v-input--is-label-active v-input--is-dirty v-input--dense theme--light v-text-field v-text-field--is-booted v-select">
          <div class="v-input__control">
            <div class="v-input__slot ib-slot" role="button" @click="choose( slot )">
              <div class="v-select__slot">
                <label class="v-label v-label--active theme--light" style="left: 0px; right: auto; position: absolute;">{{ i18n.t( slot ) }}</label>
                <div class="v-select__selections">
                  <img v-if="thumbnail( slot )" class="ib-thumb" :src="thumbnail( slot )" :alt="slot">
                  <span v-else-if="images[ slot ]" class="ib-thumb"></span>
                  <div class="v-select__selection v-select__selection--comma">{{ images[ slot ] ? images[ slot ].title : i18n.t( "default" ) }}</div>
                  <input spellcheck="false" readonly="readonly" type="text" autocomplete="off" tabindex="-1">
                </div>
                <div class="v-input__append-inner ib-actions">
                  <button type="button" class="ib-action" :disabled="busy || storageEnabled === false" @click.stop="choose( slot )">
                    {{ busy && current == slot ? i18n.t( "uploading" ) : ( images[ slot ] ? i18n.t( "replace" ) : i18n.t( "choose" ) ) }}
                  </button>
                  <button type="button" class="ib-clear" :title="i18n.t( 'remove' )" :disabled="busy || !images[ slot ]" @click.stop="remove( slot )">&#10005;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input ref="file" class="ib-file" type="file" :accept="accept" @change="onFileSelected">
    <div v-if="message" class="ib-message">{{ message }}</div>
  </div>
</template>

<script>
import { projectStore, useCorvinaI18n } from "corvina";
import { normalizeImages } from "./defs";
import { defaultImage } from "./defaultImages";
import { IMAGE_TYPES, MAX_IMAGE_SIZE, isAssetStorageEnabled } from "./imageAssets";

const i18n = useCorvinaI18n({
  "en-US": {
    "off": "Off image", "on": "On image", "default": "Default image", "choose": "Choose", "replace": "Replace", "remove": "Remove", "uploading": "Uploading...",
    "storageDisabled": "The asset storage is not enabled for this organization: images cannot be uploaded.",
    "rejected": "Not added: use PNG, JPEG, GIF, WebP or SVG up to {size} MB", "failed": "Upload failed"
  },
  "it-IT": {
    "off": "Immagine spenta", "on": "Immagine accesa", "default": "Immagine predefinita", "choose": "Scegli", "replace": "Sostituisci", "remove": "Rimuovi", "uploading": "Caricamento...",
    "storageDisabled": "Lo storage degli asset non è abilitato per questa organizzazione: non è possibile caricare immagini.",
    "rejected": "Non aggiunta: usa PNG, JPEG, GIF, WebP o SVG fino a {size} MB", "failed": "Caricamento non riuscito"
  }
});

/*
 * Editor of the `images` property of ImageButton: one image for each state (off, on). The upload is
 * done by the widget (uploadImage); removing writes a new object with setWidgetValue (recorded for
 * undo, saves the dashboard). Plain promises and no object spread: Babel would need @babel/runtime.
 */
export default {
  name: "ImageButtonImagesPropControl",
  props: [ "wgt", "propName", "prop", "display" ],
  data: function() {
    return {
      i18n: i18n,
      slots: [ "off", "on" ],
      accept: IMAGE_TYPES.join( "," ),
      storageEnabled: null,
      busy: false,
      current: "",
      message: ""
    };
  },
  computed: {
    images() {
      return normalizeImages( this.prop );
    },
    sources() {
      return this.wgt.imageSources || {};
    }
  },
  mounted() {
    isAssetStorageEnabled().then( enabled => { this.storageEnabled = enabled; } );
  },
  methods: {
    thumbnail( slot ) {
      const image = this.images[ slot ];
      return image ? this.sources[ image.asset ] : defaultImage( slot );
    },
    choose( slot ) {
      this.current = slot;
      this.$refs.file.click();
    },
    onFileSelected( event ) {
      const file = ( event.target.files || [] )[ 0 ];
      event.target.value = "";  // the same file can be chosen again
      if ( file ) this.upload( this.current, file );
    },
    upload( slot, file ) {
      this.message = "";
      this.busy = true;
      return isAssetStorageEnabled()
        .then( enabled => {
          this.storageEnabled = enabled;
          if ( !enabled ) return "";
          return this.wgt.uploadImage( slot, file );
        } )
        .then( error => {
          if ( error == "rejected" ) this.message = i18n.t( "rejected", { size: MAX_IMAGE_SIZE / ( 1024 * 1024 ) } );
          else if ( error ) this.message = i18n.t( error );
        } )
        .finally( () => { this.busy = false; } );
    },
    // The image leaves the button: its file stays in the storage (undo can bring it back)
    remove( slot ) {
      const images = { off: this.images.off, on: this.images.on };
      images[ slot ] = null;
      projectStore.setWidgetValue( { wgtId: this.wgt.id, prop: this.propName, value: images, record: true } );
    }
  }
};
</script>

<style scoped>
/* Only what the Vuetify classes do not give: thumbnail, the buttons at the end of the field */
.ib-images { display: flex; flex-direction: column; gap: 8px; }
.ib-slot { cursor: pointer; }
.ib-thumb { width: 32px; height: 24px; object-fit: contain; border-radius: 2px; background: rgba(127, 127, 127, .2); flex: none; margin-right: 8px; align-self: center; }
.ib-actions { display: flex; align-items: center; gap: 2px; margin-top: 0; align-self: center; }
.ib-action { padding: 0 6px; height: 24px; border: none; border-radius: 4px; background: transparent; color: var(--v-primary-base, #1976d2); font: inherit; font-size: 12px; font-weight: 500; letter-spacing: .5px; text-transform: uppercase; cursor: pointer; }
.ib-action:hover:not(:disabled) { background: rgba(127, 127, 127, .15); }
.ib-clear { width: 22px; height: 22px; padding: 0; border: none; background: transparent; color: inherit; opacity: .6; cursor: pointer; }
.ib-clear:hover:not(:disabled) { opacity: 1; }
.ib-action:disabled, .ib-clear:disabled { opacity: .35; cursor: default; }
.ib-file { display: none; }
.ib-message { color: #d32f2f; font-size: 12px; }
</style>
