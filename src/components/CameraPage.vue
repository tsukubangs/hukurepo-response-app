<template id="camera-page">
  <v-ons-page>
    <custom-toolbar>Camera Page</custom-toolbar>
    <p style="text-align: center">This is the second page</p>
  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';

export default {
  name: 'camera-page',
  components: {
    CustomToolbar,
  },
};
</script>
