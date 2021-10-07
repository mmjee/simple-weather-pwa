<template>
  <v-row no-gutters>
    <v-col md="6">
      <!-- one way data binding because two-way binding actually doesn't work for google maps -->
      <gmap-map
        :center="mapCenter"
        @center_changed="updateCenter"
        :zoom="16"
      />
    </v-col>
    <v-col md="6" v-if="weatherData != null">
      <v-card elevation="2">
        <v-card-title>
          Weather in {{ weatherData.name }}, {{ weatherData.sys.country }}
        </v-card-title>
        <v-card-text>
          <p class="text-h5">
            <span class="mr-2"><v-icon>{{ mdiWeatherSunsetUp }}</v-icon>Sunrise &mdash; {{ weatherData.essentials.sunriseTime }}</span>
            <span><v-icon>{{ mdiWeatherSunsetDown }}</v-icon>Sunset &mdash; {{ weatherData.essentials.sunsetTime }}</span>
          </p>
          <v-card outlined class="my-2">
            <v-card-title>
              Essentials
            </v-card-title>
            <v-card-text class="text-h5">
              <p>Temperature: {{ weatherData.main.temp }}&#176;F (Actually feels like {{ weatherData.main.feels_like}}&#176;F)</p>
              <p>Temperature Range (in your region): {{ weatherData.main.temp_min }}&#176;F&mdash;{{ weatherData.main.temp_max }}&#176;F</p>
              <p>Pressure: {{ weatherData.main.pressure }}hPa</p>
              <p>Humidity: {{ weatherData.main.humidity }}%</p>
            </v-card-text>
          </v-card>
          <v-row>
            <v-col sm="6" v-if="weatherData.wind.speed !== 0">
              <v-card outlined>
                <v-card-title>
                  Wind
                </v-card-title>
                <v-card-text class="text-h5">
                  {{ weatherData.wind.speed}}mph at {{ weatherData.wind.deg }}&#176; with a gust of {{ weatherData.wind.gust }}mph
                </v-card-text>
              </v-card>
            </v-col>
            <v-col sm="6">
              <v-card outlined>
                <v-card-title>
                  Weather
                </v-card-title>
                <v-card-text class="text-h5">
                  <p v-for="(weatherObj, weatherCounter) in weatherData.weather" :key="weatherCounter">
                    {{ titleCase(weatherObj.description) }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import _cloneDeep from 'lodash-es/cloneDeep'
import _debounce from 'lodash-es/debounce'
import _startCase from 'lodash-es/startCase'
import { mdiWeatherSunsetUp, mdiWeatherSunsetDown } from '@mdi/js'
import { fromUnixTime, format } from 'date-fns'

import * as OWMAPI from '@/tools/owm-api'

const LS_KEYS = {
  LAST_MAP_CENTER: 'LAST_MAP_CENTER'
}

function formatTime (unixTime) {
  return format(fromUnixTime(unixTime), 'hh:mm:ss aaa')
}

export default {
  name: 'MainPage',
  data () {
    let savedMapCenter = window.localStorage.getItem(LS_KEYS.LAST_MAP_CENTER)

    if (savedMapCenter == null) {
      savedMapCenter = {
        // Intersection of Park Street & Chowringhee Road, the default value
        lat: 22.555298159666155,
        lng: 88.3500465050129
      }
    } else {
      savedMapCenter = JSON.parse(savedMapCenter)
    }

    return {
      mapCenter: _cloneDeep(savedMapCenter),
      lastMapCenter: _cloneDeep(savedMapCenter),

      weatherData: null,
      processedInfo: null,
      mdiWeatherSunsetDown,
      mdiWeatherSunsetUp
    }
  },
  methods: {
    updateCenter (pl) {
      this.lastMapCenter = {
        lat: pl.lat(),
        lng: pl.lng()
      }
    },

    titleCase (txt) {
      return _startCase(txt.toLowerCase())
    },

    async getOWMData () {
      const weatherData = await OWMAPI.getWeatherByLatLong(this.lastMapCenter.lat, this.lastMapCenter.lng)
      this.weatherData = {
        ...weatherData,
        essentials: {
          sunsetTime: formatTime(weatherData.sys.sunset),
          sunriseTime: formatTime(weatherData.sys.sunrise)
        }
      }
    },

    updateData: _debounce(function () {
      this.getOWMData()
      window.localStorage.setItem(LS_KEYS.LAST_MAP_CENTER, JSON.stringify(this.lastMapCenter))
    }, 500)
  },

  mounted () {
    this.updateData()
  },
  watch: {
    lastMapCenter: {
      deep: true,
      handler: 'updateData'
    }
  }
}
</script>

<style>
.vue-map {
  min-height: calc(100vh - 48px);
}
</style>
