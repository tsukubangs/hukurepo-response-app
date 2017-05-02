<template id="camera-page">
  <v-ons-page>
    <custom-toolbar>Camera Page</custom-toolbar>

    <textarea id="text-form" class="textarea" row="5" placeholder="text area" v-model="postComment" name='description' ></textarea>

    <div class="cover">
      <div class="box">
        <img class="" id="picture" src="../assets/no-image.png" />
      </div>
      <div class="box">
        <google-map :latitude="latitude" :longitude="longitude"></google-map>
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
import GoogleMap from './GoogleMap';

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
  // post後にトップページに戻る
  this.pageStack.splice(1, this.pageStack.length - 1);
}

export default {
  name: 'camera-page',
  components: {
    CustomToolbar,
    GoogleMap,
  },
  props: ['pageStack'],
  data() {
    return {
      latitude: '',
      longitude: '',
      address: '',
      mapPosition: { lat: 10, lng: 10 },
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
.cover {
   display: table;
   margin: auto;
   width: 90%;
}
.box {
   display: table-cell;
   width: 50%;
   position: relative;
   box-sizing: border-box;
   border: transparent 2px solid;
}
.box:before {
    content: "";
    display: block;
    padding-top: 100%;
}
.box > * {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
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
