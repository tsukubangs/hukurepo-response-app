<template id="camera-page">
  <v-ons-page>
    <custom-toolbar>Camera Page</custom-toolbar>
    <p style="text-align: center">This is the second page</p>

    <form id="text-form">
      <textarea v-model="postComment" name='description'  placeholder="text here..."></textarea>
      <p style="text-align: center">
        <v-ons-button @click="takePhoto">Camera</v-ons-button>
        <v-ons-button @click="getPhoto">Devise</v-ons-button>
      </p>
      <v-ons-button @click="postProblem">Post</v-ons-button>
    </form>

    <p>lat:{{latitude}}</p>
    <p>lng:{{longitude}}</p>
    <p>address:{{address}}</p>
    <img style="display:none;" id="picture" src="" width="80%" />

  </v-ons-page>
</template>

<script>
import axios from 'axios';
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

function postProblem() {
  console.log(this.postComment);
}

export default {
  name: 'camera-page',
  components: {
    CustomToolbar,
  },
  data() {
    return {
      image: '',
      latitude: '',
      longitude: '',
      address: '',
      postComment: '',
    };
  },
  methods: {
    takePhoto,
    getPhoto,
    postProblem,
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
        alert(error);
      });
    },
    () => {
      alert("can't get your position");
    });
  },
};

</script>

<style scoped >
  .text-form{
  }
</style>
