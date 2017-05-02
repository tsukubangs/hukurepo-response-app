<template>
  <gmap-map :center="position" :zoom="17" class="gmap-map">
    <gmap-marker v-for="m in markers" :position="m.position" :clickable="true" :draggable="true"></gmap-marker>
  </gmap-map>
</template>

<script>
export default {
  name: 'google-map',
  props: [
    'latitude',
    'longitude',
  ],
  computed: {
    position() {
      return { lat: Number(this.latitude), lng: Number(this.longitude) };
    },
    markers() {
      return [{ position: { lat: Number(this.latitude), lng: Number(this.longitude) } }];
    },
  },
};
</script>

<style scoped >
.gmap-map {
  width: 100%;
  height: 150px;
}
</style>
