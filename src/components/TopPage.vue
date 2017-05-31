<template id="top-page">
  <v-ons-page>
    <custom-toolbar>Top Page</custom-toolbar>
    <p style="text-align: center">
      This is the first page
      <v-ons-button @click="push">POST</v-ons-button>
    </p>
    <ons-button @click="getUser()">get user info</ons-button>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import CameraPage from './CameraPage';
import { WEB_API_URL } from '../../.env';

export default {
  name: 'top-page',
  components: {
    CustomToolbar,
  },
  methods: {
    push() {
      this.pageStack.push(CameraPage);
    },
    getUser() {
      const token = window.localStorage.getItem('access_token');
      console.log(token);
      const config = {
        headers: { Authorization: token },
      };
      axios.get(`${WEB_API_URL}/v1/users`, config)
          .then((response) => {
            console.log(response);
          }).catch(() => {
            ons.notification.alert({
              title: 'failed',
              message: 'Sorry, Pleas Sign in again.',
            });
          });
    },
  },
  props: ['pageStack'],
};
</script>
