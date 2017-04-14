<template id="camera-page">
  <v-ons-page>
    <custom-toolbar>Camera Page</custom-toolbar>
    <p style="text-align: center">This is the second page</p>
    <p style="text-align: center">
      This is the camera open
      <v-ons-button @click="takePictures">camera</v-ons-button>
    </p>
  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';

function cameraSuccess() {
  // const img = document.getElementById('image');
  // img.src = 'data:image/jpeg;base64,' + image;
  alert('Succes!');
}

function cameraError() {
  alert('Failed!:');
}

function takePictures() {
  navigator.camera.getPicture(cameraSuccess, cameraError, { quality: 80 });
}

export default {
  name: 'camera-page',
  components: {
    CustomToolbar,
  },
  methods: {
    takePictures,
  },
};

</script>
