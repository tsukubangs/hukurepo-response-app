<template id="camera-page">
  <v-ons-page>
    <custom-toolbar>Camera Page</custom-toolbar>

    <textarea id="text-form" class="textarea" row="5" placeholder="text area" v-model="postComment" name='description' ></textarea>

    <div class="cover">
      <div class="box">
        <img class="" id="picture" src="../assets/no-image.png" />
      </div>
      <div class="box">
        <img class="map-here" src="../assets/no-image.png" />
      </div>
    </div>

    <p>lat:{{latitude}}</p>
    <p>lng:{{longitude}}</p>
    <p>address:{{address}}</p>

    <div class="bottom-bar">
      <div class="toolbar">
        <div class="toolbar__left">
          <span class="toolbar-button toolbar-button--outline" @click="getPhoto">Devise</span>
          <span class="toolbar-button toolbar-button--outline" @click="takePhoto">Camera</span>
        </div>
        <div class="toolbar__center">
        </div>
        <div class="toolbar__right">
          <span class="toolbar-button toolbar-button--outline" @click="postProblem">Post</span>
        </div>
      </div>
    </div>

  </v-ons-page>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';

function onFail(message) {
  ons.notification.alert({
    title: '',
    message: `An error occured: ${message}`,
  });
}

function onSuccess(imageData) {
  const largeImage = document.getElementById('picture');
  largeImage.style.display = 'block';
  largeImage.classList.add('picture-box');
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

<style scoped >
 #text-form {
   width: 90%;
   height: 150px;
   margin-bottom: 10px;
   margin-top: 10px;
 }
 #post-btn{
   display: block;
   width: 80px;
   margin-left: auto;
   margin-bottom: 10px;
 }
 #picture{
   max-height: 150px;
   max-width: 100%;
 }
.cover {
   display: table;
   margin: auto;
   width: 90%;
}
.box {
   display: table-cell;
   width: 50%;
   height: 150px;
}
.picture-box {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.bottom-bar{
  position: fixed;
}
</style>
