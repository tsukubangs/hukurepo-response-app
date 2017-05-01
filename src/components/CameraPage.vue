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
    <p>lat:{{latitude}}</p>
    <p>lng:{{longitude}}</p>
    <p>address:{{address}}</p>
    <img style="display:none;" id="picture" src="" width="80%" />
    <google-map :latitude="latitude" :longitude="longitude"></google-map>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import GoogleMap from './GoogleMap';

function onFail(message) {
  ons.notification.alert({
    title: '',
    message: `An error occured: ${message}`,
  });
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
    GoogleMap,
  },
  data() {
    return {
      image: '',
      latitude: '',
      longitude: '',
      address: '',
      mapPosition: { lat: 10, lng: 10 },
    };
  },
  methods: {
    takePhoto,
    getPhoto,
    updateStyle() {
      this.centerPosition = {
        lat: Number(this.latitude),
        lng: Number(this.longitude),
      };
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(
    (position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          latlng: `${this.latitude},${this.longitude}`,
          sensor: false,
          language: 'en',
        },
      }).then((response) => {
        const data = response.data;
        this.address = data.results[0].formatted_address;
      }).catch((error) => {
        ons.notification.alert({
          title: '',
          message: error,
        });
      });
    },
    () => {
      ons.notification.alert({
        title: '',
        message: "can't get your position",
      });
    });
  },
};

</script>
