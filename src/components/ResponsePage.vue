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
      <v-ons-list modifier="noborder">
        <v-ons-list-item modifier="nodivider">
          <response-card :response="selectedProblem" :is-my-response="true" class="w100">
            <photo-thumbnail :thumbnailUrl="selectedProblemThumbnailImage" v-if="!!selectedProblem.image_url" class="thumbnail" @click.native="photoModalVisible = true"></photo-thumbnail>
          </response-card>
        </v-ons-list-item>
        <v-ons-list-item v-for="response in responses" modifier="nodivider">
          <response-card :response="response" :is-my-response="selectedProblem.user_id == response.user_id" class="w100">
          </response-card>
        </v-ons-list-item>
      </v-ons-list>
    </main>
    <v-ons-fab position="bottom right" id="postButton" :style="{ backgroundColor: '#01a8ec', width: '70px', height: '70px'}">
      <span class="fab__icon" style="line-height:0;">
        <v-ons-icon icon="ion-ios-chatbubble" :style="{fontSize: '50px'}"></v-ons-icon>
        <span style="font-size: 15px;">Reply</span>
      </span>
    </v-ons-fab>
    <v-ons-modal :visible="photoModalVisible" @click="photoModalVisible = false">
      <img :src="selectedProblemImage" class="modal-image"/>
    </v-ons-modal>
  </v-ons-page>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import ResponseCard from './ResponseCard';
import PhotoThumbnail from './PhotoThumbnail';
import { WEB_API_URL } from '../../.env';

export default {
  name: 'response-page',
  components: {
    CustomToolbar,
    ResponseCard,
    PhotoThumbnail,
  },
  data() {
    return {
      responses: '',
      state: 'initial',
      replyComment: '',
      isPosting: false,
      photoModalVisible: false,
    };
  },
  computed: {
    ...mapGetters([
      'selectedProblem',
    ]),
    selectedProblemImage() {
      return WEB_API_URL + this.selectedProblem.image_url;
    },
    selectedProblemThumbnailImage() {
      return WEB_API_URL + this.selectedProblem.thumbnail_url;
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
.w100{
  width: 100%;
}
main {
  padding: 5px 5px 44px;
  box-sizing: border-box;
}
.bottom-bar {
  position: fixed;
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
.toolbar-ios {
  width: auto;
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
.thumbnail {
  width: 100px;
}
.modal-image {
  width: 100%;
  object-fit: contain;
}
</style>
