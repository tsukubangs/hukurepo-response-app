<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button></v-ons-back-button>
      </div>
      <div class="center">詳細</div>
      <div class="right">
        <v-ons-toolbar-button v-if="isJapanese==true" class="toolbar-button post-problem-btn" @click="translate">
          英語原文
        </v-ons-toolbar-button>
        <v-ons-toolbar-button v-else class="toolbar-button post-problem-btn" @click="translate">
          日本語文
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

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
          <response-card :response="selectedProblem.data" :is-my-response="true" :isJapanese="isJapanese" class="w100">
            <photo-thumbnail :thumbnailUrl="selectedProblemThumbnailImage" v-if="!!selectedProblem.data.image_url" class="thumbnail" @click.native="photoModalVisible = true"></photo-thumbnail>
            <google-map :latitude="selectedProblem.data.latitude" :longitude="selectedProblem.data.longitude" v-if="selectedProblem.data.longitude && selectedProblem.data.latitude" class="thumbnail"></google-map>
          </response-card>
        </v-ons-list-item>
        <v-ons-list-item v-for="response in responses.data" modifier="nodivider">
          <response-card :response="response" :is-my-response="true" :is-japanese="isJapanese" class="w100">
          </response-card>
        </v-ons-list-item>
      </v-ons-list>
      <v-ons-progress-circular indeterminate v-show="responses.loading"></v-ons-progress-circular>
    </main>
    <v-ons-fab position="bottom right" id="postButton" :style="{ backgroundColor: '#2bb46e', width: '70px', height: '70px'}" @click="toResponse()">
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
import { mapActions, mapGetters } from 'vuex';
import ResponsePage from './ResponsePage';
import CustomToolbar from './CustomToolbar';
import ResponseCard from './ResponseCard';
import PhotoThumbnail from './PhotoThumbnail';
import GoogleMap from './GoogleMap';
import { WEB_API_URL } from '../../.env';
import { FETCH_SELECT_PROBLEM_RESPONSES } from '../vuex/mutation-types';

function translate() {
  console.log('translate');
  this.isJapanese = !this.isJapanese;
}

export default {
  name: 'problem-details-page',
  components: {
    CustomToolbar,
    ResponseCard,
    PhotoThumbnail,
    GoogleMap,
  },
  data() {
    return {
      state: 'initial',
      replyComment: '',
      isPosting: false,
      photoModalVisible: false,
      isJapanese: true,
    };
  },
  computed: {
    ...mapGetters([
      'selectedProblem',
    ]),
    selectedProblemImage() {
      return WEB_API_URL + this.selectedProblem.data.image_url;
    },
    selectedProblemThumbnailImage() {
      return WEB_API_URL + this.selectedProblem.data.thumbnail_url;
    },
    responses() {
      return this.selectedProblem.responses;
    },
  },
  methods: {
    translate,
    ...mapActions([
      FETCH_SELECT_PROBLEM_RESPONSES,
    ]),

    loadItem(done) {
      this.FETCH_SELECT_PROBLEM_RESPONSES()
        .then(() => { done(); })
        .catch((error) => {
          console.log(error);
          done();
        });
    },
    toResponse() {
      this.pageStack.push(ResponsePage);
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
  background-color: #FFF;
  color: #2bb46e;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 15px;
  /*margin: auto 8px;*/
  border-radius: 15px;
}
.thumbnail {
  display: inline-block;
  height: 150px;
  width: 200px;
}
.modal-image {
  width: 100%;
  object-fit: contain;
}
</style>
