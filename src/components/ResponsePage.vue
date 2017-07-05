<template lang="html">
  <v-ons-page>
    <custom-toolbar>Response Page</custom-toolbar>
      <p>this is a response page</p>
      <p>{{ selectedProblem }}</p>
      <p>{{ responses }}</p>
  </v-ons-page>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
// import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import { WEB_API_URL } from '../../.env';
// import { FETCH_PROBLEMS } from '../vuex/mutation-types';
export default {
  name: 'response-page',
  components: {
    CustomToolbar,
  },
  data() {
    return {
      responses: '',
    };
  },
  computed: {
    ...mapGetters([
      'selectedProblem',
    ]),
  },
  created() {
    const token = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: token },
    };
    axios.get(`${WEB_API_URL}/v1/problems/${this.selectedProblem.id}/responses`, config)
      .then((response) => {
        console.log(response);
        this.responses = (response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  props: ['pageStack'],
};
</script>

<style lang="css">
</style>
