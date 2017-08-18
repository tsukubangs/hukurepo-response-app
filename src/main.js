// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import ons from 'onsenui';

import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import * as VueGoogleMaps from 'vue2-google-maps';

import './style.css';

import router from './router';
import App from './App';
import { GOOGLE_MAP_API } from '../.env';
import store from './vuex/store';

Vue.use(VueOnsen);
ons.forcePlatformStyling('ios');

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAP_API,
    language: 'en',
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

const app = {
// Application Constructor
  initialize() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

// deviceready Event Handler
//
// Bind any cordova events here. Common events are:
// 'pause', 'resume', etc.
  onDeviceReady() {
    this.initPushNotification();

    /* global FCMPlugin */
    FCMPlugin.onNotification(
      (data) => {
        if (data.wasTapped) {
          // Notification was received on device tray and tapped by the user.
          alert(JSON.stringify(data));
        } else {
          // Notification was received in foreground. Maybe the user needs to be notified.
          alert(JSON.stringify(data));
        }
      },
      (msg) => {
        console.log(`onNotification callback successfully registered: ${msg}`);
      },
      (err) => {
        console.log(`Error registering onNotification callback: ${err}`);
      },
    );
  },

  /* eslint-disable no-undef */
  initPushNotification() {
    /* global FCMPlugin */
    FCMPlugin.getToken(
      (token) => {
        console.log(token);
    // ここにトークンを送るAPIの処理を書く
      },
      (err) => {
        console.log(`error retrieving token: ${err}`);
      },
    );
  },
};

app.initialize();
