<template id="camera-page">
  <v-ons-page>
    <custom-toolbar>Camera Page</custom-toolbar>
    <p style="text-align: center">This is the second page</p>
    <p style="text-align: center">
      This is the camera open
      <v-ons-button @click="takePictures">Camera</v-ons-button>
    </p>
    <img :src="image" style="width:100%;"/>

    <p style="text-align: center">
      Get an image from a photo album of the device
      <v-ons-button @click="getPhoto">from devise</v-ons-button>
    <img style="display:none;" id="picture" src="" width="150" height="150" />
    </p>

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

// function onDeviceReady() {
//  window.alert('Loading Cordova is completed');
// }

function onSuccess(imageURI) {
  const largeImage = document.getElementById('picture');
  largeImage.style.display = 'block';
  largeImage.src = imageURI;
}

function onFail(message) {
  alert(`An error occured: ${message}`);
}

function getPhoto() {
// Specify the source to get the photos.
  navigator.camera.getPicture(onSuccess, onFail,
    { quality: 50,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM });
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
    getPhoto,
  },
};

</script>
