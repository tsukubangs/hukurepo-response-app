<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Setting</div>
    </v-ons-toolbar>

    <v-ons-list>
      <v-ons-list-item tappable  @click="toPrivacy()">
        <div class="left">
          <v-ons-icon icon="ion-locked" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          Privacy Policy
        </div>
      </v-ons-list-item>
      <v-ons-list-item tappable>
        <div class="left">
          <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          Icon
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>


<script>
import router from '../router';

export default {
  name: 'setting-page',
  methods: {
    toPrivacy() {
      router.push('privacy');
    },
  },
};
</script>
