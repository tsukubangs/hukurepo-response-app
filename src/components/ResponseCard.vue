<template>
  <v-ons-card v-bind:class="{ reverce: !isMyResponse }">
    <div class="icon-container">
      aaaa
    </div>
    <div class="content">
      <div class="comment">
        {{ response.comment }}
      </div>
      <div class="date">
        {{ response.created_at }}
      </div>
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
.content {
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 0 10px;
  margin: 5px;
  text-align: left;
}
.comment {
  display: flex;
  /*align-items: center;*/
  /*justify-content: center;*/
  flex-grow: 9;
  word-break: break-all;
  color: #7f7f7f;
}
.date {
  flex-grow: 1;
  text-align: right;
  font-size: x-small;
  color: #aaaaaa;
  margin-top:0.5em;
}
</style>
