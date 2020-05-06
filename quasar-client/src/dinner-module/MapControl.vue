<template>
  <div class="app">
    <div id="mapid" style="width: 300px; height: 300px;"></div>
  </div>
</template>
<script>
import * as L from "leaflet";
import { OPENSTREETMAPS_OSM, LEAFLET_CUSTOM_ICON_OPTIONS } from "../utils/maps";

export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    renderMap: { default: true }
  },

  data: () => ({
    map: {},
    directionSelected: {}
  }),

  computed: {
    //
  },

  watch: {
    //
  },

  mounted() {
    this.map = L.map("mapid").setView([-15.83588, -70.0217], 17);

    if (this.renderMap) {
      this.map.addLayer(OPENSTREETMAPS_OSM);
    }

    this.map.on("click", ({ latlng }) => {
      console.log("thisArgs", latlng);

      this.$emit("clickPosition", latlng);

      if (this.directionSelected.removeFrom) {
        this.directionSelected.setLatLng(latlng);
      } else {
        this.directionSelected = L.marker([latlng.lat, latlng.lng], {
          icon: LEAFLET_CUSTOM_ICON_OPTIONS
        }).addTo(this.map);
      }
    });
  },

  methods: {
    reset() {
      if (this.directionSelected.removeFrom) {
        this.directionSelected.removeFrom(this.map);
        this.directionSelected = {};
      }
    },
    refresh() {
      this.map.invalidateSize();
      L.marker([-15.8366, -70.02341], {
        icon: LEAFLET_CUSTOM_ICON_OPTIONS
      })
        .addTo(this.map)
        .bindPopup("Polleria<br>El Vecino")
        .openPopup();
    }
  }
};
</script>
<style scoped>
.app {
  isolation: isolate;
}
</style>
