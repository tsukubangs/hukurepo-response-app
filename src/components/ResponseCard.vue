<template>
  <v-ons-card v-bind:class="{ reverce: !isMyResponse }">
    <div class="icon-container">
      aaaa
    </div>
    <div class="content">
      <p>{{ response.comment }}</p>
      <p class="date">{{ response.created_at }}</p>
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
  width: 120px;
}
.content {
  width: 100%;
  color: #7f7f7f;
}
.date {
  text-align: right;
  font-size: x-small;
  color: #aaaaaa;
  margin: 0;
}
</style>
