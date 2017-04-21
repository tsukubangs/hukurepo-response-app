<template id="camera-page">
  <v-ons-page>
    <custom-toolbar>Camera Page</custom-toolbar>
    <v-ons-button id="post-btn" @click="postProblem">Post</v-ons-button>

    <textarea id="text-form" class="textarea" row="5" placeholder="text area" v-model="postComment" name='description' ></textarea>
    <img style="display:none;" id="picture" src="" width="80%" />
    <p style="text-align: center">
      <v-ons-button @click="getPhoto">Devise</v-ons-button>
      <v-ons-button @click="takePhoto">Camera</v-ons-button>
    </p>

    <p>lat:{{latitude}}</p>
    <p>lng:{{longitude}}</p>
    <p>address:{{address}}</p>

  </v-ons-page>
</template>

<script>
import axios from 'axios';
import CustomToolbar from './CustomToolbar';

function onFail(message) {
  alert(`An error occured: ${message}`);
}

function onSuccess(imageData) {
  const largeImage = document.getElementById('picture');
  largeImage.style.display = 'block';
  const head = 'data:image/jpeg;base64,';
  largeImage.src = head + imageData;
}

function takePhoto() {
  navigator.camera.getPicture(onSuccess, onFail,
    { quality: 50,
      destinationType: navigator.camera.DestinationType.DATA_URL,
      sourceType: navigator.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
    },
  );
}

function getPhoto() {
// Specify the source to get the photos.
  navigator.camera.getPicture(onSuccess, onFail,
    { quality: 50,
      destinationType: navigator.camera.DestinationType.DATA_URL,
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
 #text-form {
   width: 90%;
   height: 150px;
   margin-bottom: 10px;
 }
 #post-btn{
   display: block;
   width: 80px;
   margin-left: auto;
   margin-bottom: 10px;
 }
 #picture{
   width: 90%;
   display: block;
   margin-left: auto;
   margin-right: auto;
 }
</style>
