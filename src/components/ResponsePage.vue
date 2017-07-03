<template lang="html">
  <v-ons-page>
    <custom-toolbar>Response Page</custom-toolbar>
      <p>this is a response page</p>
  </v-ons-page>
</template>

<script>
// import { mapActions } from 'vuex';
// import axios from 'axios';
// import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
// import { WEB_API_URL } from '../../.env';
// import { FETCH_PROBLEMS } from '../vuex/mutation-types';
export default {
  name: 'response-page',
  components: {
    CustomToolbar,
  },
  props: ['pageStack'],
};
</script>

<style lang="css">
</style>
