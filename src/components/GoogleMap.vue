<template>
  <div v-if="isError">
    error
  </div>
  <div v-else-if="!hasLatlng">
    <ons-progress-circular indeterminate></ons-progress-circular>
  </div>
  <gmap-map :center="position" :zoom="17" v-else>
    <gmap-marker v-for="m in markers" :position="m.position" :clickable="false" :draggable="false"></gmap-marker>
  </gmap-map>
</template>

<script>
export default {
  name: 'google-map',
  props: [
    'latitude',
    'longitude',
    'isError',
  ],
  computed: {
    position() {
      return { lat: Number(this.latitude), lng: Number(this.longitude) };
    },
    markers() {
      return [{ position: { lat: Number(this.latitude), lng: Number(this.longitude) } }];
    },
    hasLatlng() {
      return this.latitude !== '' && this.longitude !== '';
    },
  },
};
</script>

<style scoped >
  ons-progress-circular {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
