<template>
  <v-ons-card v-bind:class="{ unread: isUnSeen }">
      <v-ons-icon icon="fa-exclamation-circle" class="unread-icon" size="32px" v-show="isUnSeen"></v-ons-icon>
      <photo-thumbnail :thumbnailUrl="thumbnailUrl" class="photo-thumbnail"></photo-thumbnail>
      <div class="content">
          <div class="comment">
              <p class="limit-comment">{{problem.comment}}</p>
          </div>
          <div class="date">{{problem.created_at}}</div>
      </div>
  </v-ons-card>
</template>

<script>
import $ from 'jquery';
import 'trunk8/trunk8';
import { WEB_API_URL } from '../../.env';
import PhotoThumbnail from './PhotoThumbnail';

export default {
  name: 'problem-card',
  components: {
    PhotoThumbnail,
  },
  props: [
    'problem',
  ],
  mounted() {
    $('.limit-comment').trunk8({
      lines: 2,
    });
  },
  computed: {
    thumbnailUrl() {
      return !this.problem.image_url ? null : WEB_API_URL + this.problem.image_url;
    },
    isUnSeen() {
      return !this.problem.responses_seen;
    },
  },
};
</script>

<style scoped>
v-ons-card {
  position: relative;
  display: flex;
}
.content {
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 0 10px;
  text-align: left;
}
.comment {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 9;
  color: #7f7f7f;
}
.photo-thumbnail {
  width: 40%;
  border-radius: 20px;
  overflow: hidden;
}
.date {
  flex-grow: 1;
  text-align: right;
  font-size: x-small;
  color: #aaaaaa;
}
.cover {
  width: 100%;
  height: 100%;
}
p {
  padding: 0.5em 0;
  margin: 0;
  font-size: initial;
}
v-ons-card {
  background: rgba(1,168,236,0.1);
  border-radius: 20px;
}
.unread {
  background: rgba(244,177,131,0.1);
}
.unread-icon {
  position: absolute;
  top: 3px;
  right: 3px;
  color: rgb(1, 168, 236);
}
</style>
