<template>
  <v-ons-card v-bind:class="{ unread: isUnSeen }">
      <v-ons-icon icon="fa-exclamation-circle" class="unread-icon" size="32px" v-show="isUnSeen"></v-ons-icon>
      <div class="thumbnail">
        <img :src="thumbnailUrl"  v-if="!!thumbnailUrl">
        <img src="../assets/noimage.jpg" v-else>
      </div>
      <div class="content">
          <div class="comment">
              <p class="limit-comment">{{problem.comment}}</p>
          </div>
          <div class="date">{{this.updatedTime}}</div>
      </div>
  </v-ons-card>
</template>

<script>
import $ from 'jquery';
import 'trunk8/trunk8';
import { WEB_API_URL } from '../../.env';
import formatDateTime from '../function/formatDateTime';

export default {
  name: 'problem-card',
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
    updatedTime() {
      return formatDateTime(this.problem.updated_at);
    },
  },
};
</script>

<style scoped>
v-ons-card {
  position: relative;
  display: flex;
}
.thumbnail {
  position: relative;
  width: 40%;
}
.thumbnail:before {
    content: "";
    display: block;
    padding-top: 100%;
}
.thumbnail > * {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
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
img {
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
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
