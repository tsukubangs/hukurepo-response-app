<template>
  <v-ons-page>
    <div id="login-form">
      <p><ons-input id="username" modifier="underbar" placeholder="Username" float></ons-input></p>
      <p><ons-input id="password" modifier="underbar" type="password" placeholder="Password" float></ons-input></p>
      <p style="margin-top: 30px;">
        <ons-button @click="login()">Login</ons-button>
      </p>
    </div>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'login-page',
  methods: {
    login() {
      const data = {
        email: '',
        password: '',
      };
      axios.post('', data)
          .then(() => {
            router.push('/');
          }).catch(() => {
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
