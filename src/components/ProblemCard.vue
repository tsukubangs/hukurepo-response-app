<template>
  <v-ons-card>
      <div class="thumbnail">
      </div>
      <div class="content">
          <div class="comment">
              aaaaa
          </div>
          <div class="date">aaa</div>
      </div>
  </v-ons-card>
</template>

<script>
export default {
  name: 'google-map',
  props: [
    'problem',
  ],
};
</script>

<style>
v-ons-card {
  display: flex;
}
.thumbnail {
  background-color: red;
  flex-grow: 5;
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
  flex-grow: 6;
}
.comment {
  flex-grow: 9
}
.date {
  flex-grow: 1
}
</style>
