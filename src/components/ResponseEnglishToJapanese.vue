<template id="camera-page">
  <v-ons-page>
    <custom-toolbar></custom-toolbar>

    <form name="js">
    <textarea id="text-form" class="textarea" rows="5" placeholder="日本語で入力してください" v-model="postComment" name='japanese' v-focus v-resize></textarea>
    <textarea id="text-form" class="textarea" rows="5" placeholder="英語訳" name='english' v-resize></textarea>
    </form>

    <div class="bottom-bar" v-if="!this.isIOS">
      <div class="toolbar">
        <div class="toolbar__left ml10">
          <span class="toolbar-button translate-btn" @click="translate"><ons-icon icon="ion-ios-chatboxes" size="25px"></ons-icon> 翻訳</span>
        </div>
        <div class="toolbar__center">
        </div>
        <div class="toolbar__right mr10">
            <span class="toolbar-button post-problem-btn" v-bind:disabled="!this.postEnabled" @click="postResponse"><ons-icon icon="ion-compose" size="25px"></ons-icon> 投稿</span>
        </div>
      </div>
    </div>
    <v-ons-toolbar class="ios-bottom-bar" style="padding-top: 0;" v-else="this.isIOS">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right">
          <span class="toolbar-button post-problem-btn" v-bind:disabled="!this.postEnabled" @click="postResponse"><ons-icon icon="ion-compose" size="25px"></ons-icon> Post</span>
      </div>
    </v-ons-toolbar>
  </v-ons-page>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import { WEB_API_URL } from '../../.env';

const focus = {
  inserted(el) {
    el.focus();
  },
};

const resize = {
  update(el) {
    const textForm = el;
    if (textForm.scrollHeight > textForm.offsetHeight) {
      textForm.rows += 1;
    }
  },
};

function translate() {
  const data = new FormData();
  data.append('q', this.postComment);
  data.append('source', 'ja');
  data.append('target', 'en');
  data.append('format', 'text');
  data.append('key', 'AIzaSyBd54mecQxdiv86eOurTfvMhSVwIGBAF0w');

  axios.post('https://translation.googleapis.com/language/translate/v2', data)
      .then((response) => {
        console.log(`翻訳後:${response.data.data.translations[0].translatedText}`);
        document.js.english.value = response.data.data.translations[0].translatedText;
      }).catch((error) => {
        this.isPosting = false;
        console.log(error);
        ons.notification.alert({
          title: '',
          message: '翻訳に失敗しました',
        });
      });
}

function postResponse() {
  const token = window.localStorage.getItem('access_token');
  const config = {
    headers: { Authorization: token },
  };
  const data = {
    comment: document.js.english.value,
  };
  axios.post(`${WEB_API_URL}v1/problems/${this.selectedProblem.id}/responses`, data, config)
  .then(() => {
    ons.notification.alert({
      title: '',
      message: '投稿が完了しました．',
      callback: () => {
        // post後にトップページに戻る
        this.pageStack.splice(1, this.pageStack.length - 1);
      },
    });
  }).catch((error) => {
    console.log(error);
    ons.notification.alert({
      title: '',
      message: '投稿に失敗しました',
    });
    this.isPosting = false;
  });
}

export default {
  name: 'camera-page',
  components: {
    CustomToolbar,
  },
  props: ['pageStack'],
  directives: { focus, resize },
  computed: {
    ...mapGetters([
      'selectedProblem',
    ]),
    hasImageData() {
      return this.imageData !== '';
    },
    isIOS() {
      /* eslint-disable no-undef */
      try {
        return device.platform === 'iOS';
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    postEnabled() {
      return !this.isPosting && (this.postComment !== '' || this.imageData !== '');
    },
  },
  methods: {
    postResponse,
    translate,
  },
};

</script>

<style scoped >
 #text-form {
   width: 100%;
   margin: 10px 0;
   background-color: transparent;
   border: 1;
 }
 #post-btn{
   display: block;
   width: 80px;
   margin-left: auto;
   margin-bottom: 10px;
 }
.trim-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.bottom-bar{
  position: fixed;
}
.photo {
  width: 100%;
}
.photo-block {
  position: relative;
}
.cancel-button {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  padding: 0 6px;
}
.bottom-bar {
  border-top: solid 1px rgba(127, 127, 127, 0.5);
}
.bottom-bar > .toolbar {
  background-color: #fff;
}
.ios-bottom-bar {
  background-color: #fff;
  border-top: solid 1px rgba(127, 127, 127, 0.5);
  top: auto;
  bottom: 0;
}
.post-problem-btn {
  background-color: #01a8ec;
  color: #fff;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 15px;
}
.translate-btn {
  background-color: #01a8ec;
  color: #fff;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 15px;
}
.mr10 {
  margin-right: 10px;
}

.ml10 {
  margin-left: 10px;
}
</style>
