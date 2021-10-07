<template>
  <v-row>
    <v-col md="6">
      <!-- one way data binding because two-way binding actually doesn't work for google maps -->
      <gmap-map
        :center="mapCenter"
        @center_changed="updateCenter"
        :zoom="12"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MainPage',
  data: () => ({
    mapCenter: {
      // Intersection of Park Street & Chowringhee Road, the default value
      lat: 22.555298159666155,
      lng: 88.3500465050129
    },
    lastMapCenter: {
      lat: 0,
      lng: 0
    }
  }),
  methods: {
    updateCenter (pl) {
      this.lastMapCenter = {
        lat: pl.lat(),
        lng: pl.lng()
      }
    }
  }
}
</script>

<style>
.vue-map {
  min-height: calc(100vh - 48px);
}
</style>
