<template>
  <v-ons-page>
    <custom-toolbar></custom-toolbar>

    <form name="js">
    <textarea id="text-form" class="textarea" rows="5" placeholder="日本語で入力してください" v-model="postComment" name='japanese' v-focus v-resize></textarea>
    <textarea id="text-form" class="textarea" rows="5" placeholder="日→英　ボタンを押すと英語訳が表示されます" name='english' v-resize></textarea>
    </form>

    <div class="bottom-bar" v-if="!this.isIOS">
      <div class="toolbar">
        <div class="toolbar__left ml10">
          <span class="toolbar-button translate-btn" @click="translate"><ons-icon icon="ion-ios-chatboxes" size="25px"></ons-icon> 翻訳</span>
        </div>
        <div class="toolbar__center">
        </div>
        <div class="toolbar__right mr10">
            <span class="toolbar-button post-problem-btn" @click="postResponse"><ons-icon icon="ion-compose" size="25px"></ons-icon> 投稿</span>
        </div>
      </div>
    </div>
    <v-ons-toolbar class="ios-bottom-bar" style="padding-top: 0;" v-else="this.isIOS">
      <div class="left">
        <span class="toolbar-button translate-btn" @click="translate"><ons-icon icon="ion-ios-chatboxes" size="25px"></ons-icon> 翻訳</span>
      </div>
      <div class="center"></div>
      <div class="right">
        <span class="toolbar-button post-problem-btn" @click="postResponse"><ons-icon icon="ion-compose" size="25px"></ons-icon> Post</span>
      </div>
    </v-ons-toolbar>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import { WEB_API_URL, GOOGLE_TRANSLATE_API_KEY } from '../../.env';
import { FETCH_SELECT_PROBLEM_RESPONSES } from '../vuex/mutation-types';

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
  data.append('key', GOOGLE_TRANSLATE_API_KEY);

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
    comment: this.postComment,
  };
  axios.post(`${WEB_API_URL}/v1/problems/${this.selectedProblem.data.id}/responses`, data, config)
    .then(() => {
      ons.notification.alert({
        title: '',
        message: '投稿が完了しました．',
        callback: () => {
          this.FETCH_SELECT_PROBLEM_RESPONSES();
          this.pageStack.pop();
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
  name: 'response-page',
  components: {
    CustomToolbar,
  },
  props: ['pageStack'],
  directives: { focus, resize },
  data() {
    return {
      postComment: '',
    };
  },
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
        return false;
      }
    },
  },
  methods: {
    ...mapActions([
      FETCH_SELECT_PROBLEM_RESPONSES,
    ]),
    postResponse,
    translate,
  },
};
</script>

<style scoped >
 #text-form {
   width: 95%;
   margin: 10px;
   background-color: transparent;
   border: 1;
 }
 #post-btn{
   display: block;
   width: 80px;
   margin-left: auto;
   margin-bottom: 10px;
 }
.bottom-bar{
  position: fixed;
}
.photo {
  width: 100%;
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
