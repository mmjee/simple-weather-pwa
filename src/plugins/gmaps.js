import Vue from 'vue'
import * as GMapVue from 'gmap-vue'

Vue.use(GMapVue, {
  load: {
    key: process.env.VUE_APP_GMAPS_KEY
  }
})
