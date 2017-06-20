<template id="camera-page">
  <v-ons-page>
    <custom-toolbar>Camera Page</custom-toolbar>

    <textarea id="text-form" class="textarea" row="5" placeholder="text area" v-model="postComment" name='description' ></textarea>

    <div class="cover">
      <div class="box">
        <img class="" id="picture" src="../assets/no-image.png" />
      </div>
      <div class="box">
        <google-map :latitude="latitude" :longitude="longitude" :isError="isMapError"></google-map>
      </div>
    </div>

    <p>lat:{{latitude}}</p>
    <p>lng:{{longitude}}</p>
    <p>address:{{address}}</p>
    <div class="bottom-bar">
      <div class="toolbar">
        <div class="toolbar__left">
          <span class="toolbar-button" @click="getPhoto"><ons-icon icon="ion-folder" size="30px"></ons-icon></span>
          <span class="toolbar-button" @click="takePhoto"><ons-icon icon="ion-camera" size="30px"></ons-icon></span>
        </div>
        <div class="toolbar__center">
        </div>
        <div class="toolbar__right">
          <span class="toolbar-button toolbar-button--outline" @click="postProblem"><ons-icon icon="ion-compose" size="25px"></ons-icon> Post</span>
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
import { WEB_API_URL } from '../../.env';

// 引数はbase64形式の文字列
function toBlob(base64) {
  const bin = atob(base64.replace(/^.*,/, ''));
  const buffer = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) {
    buffer[i] = bin.charCodeAt(i);
  }
    // Blobを作成
  try {
    const blob = new Blob([buffer.buffer], {
      type: 'image/jpeg',
    });
    return blob;
  } catch (e) {
    return false;
  }
}

function onFail(message) {
  console.log(message);
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
  const data = new FormData();
  data.append('problem[comment]', this.postComment);
  data.append('problem[latitude]', this.latitude);
  data.append('problem[longitude]', this.longitude);

  const checkImage = document.getElementsByClassName('picture-box');
  if (checkImage.length > 0) {
    const dataURL = document.getElementById('picture').src;
    console.log(dataURL);
    const head = 'data:image/jpeg;base64,';
    const blob = toBlob(dataURL.substr(head.length));
    data.append('problem[image]', blob, 'blob.jpg');
  }

  const token = window.localStorage.getItem('access_token');
  const config = {
    headers: { Authorization: token },
  };
  axios.post(`${WEB_API_URL}/v1/problems`, data, config)
      .then((response) => {
        console.log(response);
        ons.notification.alert({
          title: '',
          message: 'Post has been completed.',
          callback: () => {
            // post後にトップページに戻る
            this.pageStack.splice(1, this.pageStack.length - 1);
          },
        });
      }).catch((error) => {
        console.log(error);
        ons.notification.alert({
          title: '',
          message: 'Sorry, posting failed...',
        });
      });
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
      isMapError: false,
      postComment: '',
    };
  },
  methods: {
    takePhoto,
    getPhoto,
    postProblem,
    onSuccess,
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
      this.isMapError = true;
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
