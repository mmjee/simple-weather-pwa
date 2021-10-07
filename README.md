# simple-weather-pwa

A simple weather app (PWA) using Google Maps and OpenWeatherMap. Navigate to any region you want using the map on the left, and check out the weather of that region.

Saves your last set region locally, and will display that region when you open it again :)

## How to prepare for deployment

It requires two environment variables: `VUE_APP_GMAPS_KEY` and `VUE_APP_OWM_KEY` containing the Google Maps API key and the OpenWeatherMap API key respectively.

Save them in the `.env` file like so:

```dotenv
VUE_APP_GMAPS_KEY=<PUT YOUR GMAPS KEY HERE>
VUE_APP_OWM_KEY=<PUT YOUR OWM KEY HERE>
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
