<template>
  <gmap-map :center="position" :zoom="17">
    <gmap-marker v-for="m in markers" :position="m.position" :clickable="false" :draggable="false"></gmap-marker>
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
