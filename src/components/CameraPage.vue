<template id="camera-page">
  <v-ons-page>
    <custom-toolbar>Camera Page</custom-toolbar>
    <p style="text-align: center">This is the second page</p>
    <p style="text-align: center">
      This is the camera open
      <v-ons-button @click="takePictures">Camera</v-ons-button>
    </p>
    <img :src="image" style="width:100%;"/>
  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';

function cameraError() {
  alert('Failed!:');
}

function takePictures() {
  navigator.camera.getPicture((image) => {
    this.image = image;
    alert('Succes!');
  }, cameraError, { quality: 80 });
}

export default {
  name: 'camera-page',
  components: {
    CustomToolbar,
  },
  data() {
    return {
      image: '',
    };
  },
  methods: {
    takePictures,
  },
};

</script>
