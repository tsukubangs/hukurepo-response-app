<template>
  <v-ons-page>
    <div id="login-form">
      <p><ons-input id="username" modifier="underbar" placeholder="Username" v-model="email" float></ons-input></p>
      <p><ons-input id="password" modifier="underbar" type="password" placeholder="Password" v-model="password" float></ons-input></p>
      <p style="margin-top: 30px;">
        <ons-button @click="login()">Login</ons-button>
      </p>
    </div>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import router from '../router';
import { WEB_API_URL } from '../../.env';

export default {
  name: 'login-page',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      axios.post(`${WEB_API_URL}/v1/login`, data)
          .then((response) => {
            console.log(response);
            router.push('/');
          }).catch(() => {
            ons.notification.alert({
              title: 'Login failed',
              message: 'Sorry, your password or email was incorrect.',
            });
          });
    },
  },
};
</script>

<style>
#login-form {
  background-color: #FFF;
  width: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
