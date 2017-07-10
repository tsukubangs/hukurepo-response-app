<template>
  <v-ons-page>
    <custom-toolbar>Response Page</custom-toolbar>

    <v-ons-pull-hook
      :action="loadItem"
      @changestate="state = $event.state"
    >
      <span v-show="state === 'initial'"> Pull to refresh </span>
      <span v-show="state === 'preaction'"> Release </span>
      <span v-show="state === 'action'"> Loading... </span>
    </v-ons-pull-hook>

    <main>
      <ul class="card-list">
        <li>
          <response-card :response="selectedProblem" class="card card-right"></response-card>
        </li>
        <li v-for="response in responses">
          <response-card :response="response" class="card"></response-card>
        </li>
      </ul>
    </main>
    <div class="bottom-bar" v-if="!this.isIOS">
      <div class="toolbar">
        <textarea id="text-form" class="textarea bottom-bar-textarea" rows="1" placeholder="Reply message" v-model="replyComment" name='description' v-focus v-resize></textarea>
        <div class="toolbar__right">
          <span class="toolbar-button post-problem-btn" v-bind:disabled="!this.postEnabled" @click="postResponse">Send</span>
        </div>
      </div>
    </div>
    <v-ons-toolbar class="ios-bottom-bar" style="padding-top: 0;" v-else="this.isIOS">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right">
      </div>
    </v-ons-toolbar>
  </v-ons-page>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import ResponseCard from './ResponseCard';
import { WEB_API_URL } from '../../.env';
// import { FETCH_PROBLEMS } from '../vuex/mutation-types';
export default {
  name: 'response-page',
  components: {
    CustomToolbar,
    ResponseCard,
  },
  data() {
    return {
      responses: '',
      state: 'initial',
      replyComment: '',
    };
  },
  computed: {
    ...mapGetters([
      'selectedProblem',
    ]),
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
      return this.replyComment !== '';
    },
  },
  created() {
    this.getResponse();
  },
  methods: {
    loadItem(done) {
      setTimeout(() => {
        this.getResponse();
        done();
      }, 400);
    },
    getResponse() {
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      axios.get(`${WEB_API_URL}/v1/problems/${this.selectedProblem.id}/responses`, config)
      .then((response) => {
        console.log(response);
        this.responses = response.data;
      })
      .catch((error) => {
        console.log(error);
        ons.notification.alert({
          title: 'Can\'t connect to server',
          message: 'Try again?',
          callback: this.getResponse,
        });
      });
    },
  },
  props: ['pageStack'],
};
</script>

<style scoped>
.h100 {
  height:100%;
}
main {
  padding: 5px;
  box-sizing: border-box;
}
.card {
  width: 80%;
}
.card-right {
  margin-left: auto;
}
.card-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding-bottom: 100px;
}
.card-list > li {
  margin: 10px 0;
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
.bottom-bar-textarea {
  padding-top: 12px;
  width: 100%;
  background-color: transparent;
  border-color: transparent;
}
.post-problem-btn {
  background-color: #01a8ec;
  color: #fff;
  padding-left: 15px;
  padding-right: 15px;
  margin: auto 8px;
  border-radius: 15px;
}
</style>
