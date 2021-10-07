import axios from 'axios'

function clampCoord (val, max) {
  const mult = val > max ? -1 : 1
  return mult * (val % max)
}

// TODO create a OWMError class and throw that when erroring
export async function getWeatherByLatLong (lat, lng) {
  const { data } = await axios.request({
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
      lat: (clampCoord(lat, 90)).toString(),
      lon: (clampCoord(lng, 180)).toString(),
      units: 'imperial',
      appid: process.env.VUE_APP_OWM_KEY
    }
  })

  return data
}
