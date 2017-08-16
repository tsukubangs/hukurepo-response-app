# ngs-ichikawa

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install
cordova platform add android

# serve with hot reload at localhost:8080
npm run dev

# build for android & run
npm run android

# build for production with minification
npm run build

# build for hybrid
npm run build:hybrid

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## build

### android

```
cordova platform add android
npm run android
```

Please reinstall chalk when an error message "Error: Cannot find module 'chalk'" appears.

```
npm install --save chalk
```

## Plugins
### cordova
- to use camera
` cordova plugin add cordova-plugin-camera `

- for geolocation
` cordova plugin add cordova-plugin-geolocation `

- for keyboard
` cordova plugin add cordova-plugin-keyboard `

- for device
` cordova plugin add cordova-plugin-device `

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
