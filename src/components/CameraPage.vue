<template id="camera-page">
  <v-ons-page>
    <custom-toolbar :back-label="'Top Page'">Camera Page</custom-toolbar>
    <p style="text-align: center">This is the second page</p>
  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';

export default {
  name: 'top-page',
  components: {
    CustomToolbar,
  },
};
</script>
