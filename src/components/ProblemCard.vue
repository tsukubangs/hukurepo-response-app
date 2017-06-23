<template>
  <v-ons-card>
      <div class="thumbnail">
        <img :src="thumbnailUrl"  v-if="!!thumbnailUrl">
        <img src="../assets/noimage.jpg" v-else>
      </div>
      <div class="content">
          <div class="comment">
              <p>{{problem.comment}}</p>
          </div>
          <div class="date">{{problem.created_at}}</div>
      </div>
  </v-ons-card>
</template>

<script>
import { WEB_API_URL } from '../../.env';

export default {
  name: 'google-map',
  props: [
    'problem',
  ],
  computed: {
    thumbnailUrl() {
      return !this.problem.image_url ? null : WEB_API_URL + this.problem.image_url;
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
}
.date {
  flex-grow: 1;
  text-align: right;
  font-size: x-small;
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
    background: #cdeffc;
    border-radius: 20px;
}
</style>
