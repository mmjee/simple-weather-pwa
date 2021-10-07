import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import vuetify from './plugins/vuetify'
import '@/plugins/gmaps'

import '@fontsource/roboto/latin.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
