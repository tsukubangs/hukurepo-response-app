<template>
  <v-ons-card>
      <div class="thumbnail">
          <div></div>
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
export default {
  name: 'google-map',
  props: [
    'problem',
  ],
};
</script>

<style>
v-ons-card {
  position: relative;
  display: flex;
}
.thumbnail {
  position: relative;
  background-color: red;
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
}
.comment {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 9
}
.date {
  flex-grow: 1
}
</style>
