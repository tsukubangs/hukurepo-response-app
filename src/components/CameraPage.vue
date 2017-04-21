<template id="camera-page">
  <v-ons-page>
    <custom-toolbar>Camera Page</custom-toolbar>
    <p style="text-align: center">This is the second page</p>
    <p style="text-align: center">
      This is the camera open
      <v-ons-button @click="takePhoto">Camera</v-ons-button>
    </p>
    <p style="text-align: center">
      Get an image from a photo album of the device
      <v-ons-button @click="getPhoto">from devise</v-ons-button>
    </p>
    <img style="display:none;" id="picture" src="" width="80%" />

  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';

function onFail(message) {
  alert(`An error occured: ${message}`);
}

function onSuccess(imageURI) {
  const largeImage = document.getElementById('picture');
  largeImage.style.display = 'block';
  largeImage.src = imageURI;
}

function takePhoto() {
  navigator.camera.getPicture(onSuccess, onFail,
    { quality: 50,
      correctOrientation: true,
    },
  );
}

function getPhoto() {
// Specify the source to get the photos.
  navigator.camera.getPicture(onSuccess, onFail,
    { quality: 50,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true,
    },
  );
}

export default {
  name: 'camera-page',
  components: {
    CustomToolbar,
  },
  methods: {
    takePhoto,
    getPhoto,
  },
};

</script>
