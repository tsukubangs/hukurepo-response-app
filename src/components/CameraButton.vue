<template>
    <div class="frame">
        <v-ons-icon icon="ion-ios-camera-outline" size="200px" style="margin: -20px 0; color: #2bb46e;"></v-ons-icon>
        <p>Add Photo</p>
    </div>
</template>

<script>
export default {
  name: 'camera-button',
};
</script>

<style scoped>
.frame {
  border:solid 1px rgba(127, 127, 127, 0.5);
  padding:0 20px;
  border-radius:60px;
  display:inline-block;
}

p {
  margin: 0 0 10px 0;
  font-size: 25px;
  color: #7f7f7f;
}
</style>
