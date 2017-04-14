<template id="top-page">
  <v-ons-page>
    <custom-toolbar>Top Page</custom-toolbar>
    <p style="text-align: center">
      This is the first page
      <v-ons-button @click="push">POST</v-ons-button>
    </p>
  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';
import CameraPage from './CameraPage';

export default {
  name: 'top-page',
  components: {
    CustomToolbar,
  },
  methods: {
    push() {
      this.pageStack.push(CameraPage);
    },
  },
  props: ['pageStack'],
};
</script>
