<template id="top-page">
  <v-ons-page>
    <custom-toolbar>Top Page</custom-toolbar>
    <p style="text-align: center">
      This is the first page
      <v-ons-button @click="push">POST</v-ons-button>
    </p>
    <p>{{email}}</p>
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
  data() {
    return {
      email: '',
    };
  },
  created() {
    const token = window.localStorage.getItem('access_token');
    console.log(token);
    const config = {
      headers: { Authorization: token },
    };
    axios.get(`${WEB_API_URL}/v1/users`, config)
          .then((response) => {
            console.log(response);
            this.email = response.data[0].email;
          }).catch(() => {
            ons.notification.alert({
              title: 'failed',
              message: 'Sorry, Pleas Sign in again.',
            });
          });
  },
  methods: {
    push() {
      this.pageStack.push(CameraPage);
    },
  },
  props: ['pageStack'],
};
</script>
