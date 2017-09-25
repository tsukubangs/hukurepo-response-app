<template>
  <div v-bind:class="{ reverce: !isMyResponse }" class="response-card">
    <div class="icon-container">
      <div class="tsukuba-icon right-justified" v-if="!isMyResponse">
        <img src="../assets/s_logo.png" />
      </div>
      <img src="../assets/response_icon.png" v-else />
    </div>
      <div class="content">
        <p class="break-word" v-html="activateLinkComment"></p>
        <p class="date">{{ this.updatedTime }}</p>
        <slot></slot>
      </div>
      <!-- <div class="content" v-else>
        日本語
        <p class="break-word" v-html="activateLinkCommentJapanese"></p>
        <p class="date">{{ this.updatedTime }}</p>
        <slot></slot>
      </div> -->
  </div>
</template>

<script>
import autolinker from 'autolinker';
import formatDateTime from '../function/formatDateTime';

export default {
  name: 'response-card',
  props: [
    'response',
    'isMyResponse',
    'isJapanese',
  ],
  computed: {
    updatedTime() {
      return formatDateTime(this.response.updated_at);
    },
    activateLinkComment() {
      if (!this.isJapanese) {
        return autolinker.link(this.response.comment, { truncate: { length: 32, location: 'smart' } });
      }
      return autolinker.link(this.response.japanese_comment, { truncate: { length: 32, location: 'smart' } });
    },
  },
};
</script>

<style scoped>
.response-card {
  position: relative;
  display: flex;
  flex-direction: row;
}
.reverce {
  flex-direction: row-reverse;
}
.icon-container {
  padding-top: 5px;
  width: 60px;
}
.icon-container > * {
  height: 50px;
  width: 50px;
}
.tsukuba-icon {
  background-color: #2bb46e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right-justified {
  margin-left: auto;
}
.tsukuba-icon > img {
  display: inline-block;
  height: unset;
  width: 30px;
}
.content {
  width: 220px;
  color: #7f7f7f;
}
.comment {
  margin-top: 5px;
}
.date {
  font-size: x-small;
  color: #aaaaaa;
}
.break-word {
  word-wrap: break-word;
}
</style>
