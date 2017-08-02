<template>
  <v-ons-card v-bind:class="{ reverce: !isMyResponse }">
    <div class="icon-container">
      <div class="tsukuba-icon right-justified" v-if="!isMyResponse">
        <img src="../assets/s_logo.png" />
      </div>
      <img src="../assets/response_icon.png" v-else />
    </div>
    <div class="content">
      <p class="comment">{{ response.comment }}</p>
      <p class="date">{{ response.created_at }}</p>
      <slot></slot>
    </div>
  </v-ons-card>
</template>

<script>
export default {
  name: 'response-card',
  props: [
    'response',
    'isMyResponse',
  ],
};
</script>

<style scoped>
v-ons-card {
  position: relative;
  display: flex;
  flex-direction: row;
}
.reverce {
  flex-direction: row-reverse;
}
.icon-container {
  padding-top: 5px;
  width: 120px;
}
.icon-container > * {
  height: 50px;
  width: 50px;
}
.tsukuba-icon {
  background-color: #01a8ec;
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
  width: 100%;
  color: #7f7f7f;
}
.comment {
  margin-top: 5px;
}
.date {
  font-size: x-small;
  color: #aaaaaa;
}
</style>
