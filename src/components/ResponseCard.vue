<template>
  <v-ons-card>
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
  ],
};
</script>

<style scoped>
v-ons-card {
  position: relative;
  display: flex;
  background: rgba(1,168,236,0.1);
  border-radius: 20px;
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
</style>
