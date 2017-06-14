<template id="top-page">
  <v-ons-page>
    <custom-toolbar>Top Page</custom-toolbar>
    <p style="text-align: center">
      This is the first page
      <v-ons-button @click="push">POST</v-ons-button>
    </p>
    <p>Log in!</p>
  </v-ons-page>
</template>

<script>
import { mapActions } from 'vuex';
import CustomToolbar from './CustomToolbar';
import CameraPage from './CameraPage';
import { FETCH_PROBLEMS } from '../vuex/mutation-types';

export default {
  name: 'top-page',
  components: {
    CustomToolbar,
  },
  created() {
    this.FETCH_PROBLEMS();
  },
  methods: {
    ...mapActions([
      FETCH_PROBLEMS,
    ]),
    push() {
      this.pageStack.push(CameraPage);
    },
  },
  props: ['pageStack'],
};
</script>
