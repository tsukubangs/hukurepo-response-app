<template id="top-page">
  <v-ons-page>
    <custom-toolbar>Top Page</custom-toolbar>
    <div class="h100 pt5">
        <div class="centering h100" v-if="!fetchProblemsStatus.isCompleted">
            <v-ons-progress-circular indeterminate ></v-ons-progress-circular>
        </div>
        <p style="text-align: center" v-else>
          This is the first page
          <v-ons-button @click="push">POST</v-ons-button>
        </p>
    </div>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import CameraPage from './CameraPage';
import { FETCH_PROBLEMS } from '../vuex/mutation-types';

export default {
  name: 'top-page',
  components: {
    CustomToolbar,
  },
  created() {
    this.$store.watch(state => state.fetchProblemsStatus.isError, (isError) => {
      if (isError) {
        ons.notification.alert({
          title: 'Can\'t connect to server',
          message: 'Try again?',
          callback: this.FETCH_PROBLEMS,
        });
      }
    });

    this.FETCH_PROBLEMS();
  },
  computed: {
    ...mapGetters([
      'problems',
      'fetchProblemsStatus',
    ]),
  },
  methods: {
    ...mapActions([
      FETCH_PROBLEMS,
    ]),
    push() {
      this.pageStack.push(CameraPage);
    },
  },
  props: ['pageStack'],
};
</script>

<style scoped>
.h100 {
  height:100%;
}
.pt5 {
  padding-top: 5px;
  box-sizing: border-box;
}
.centering {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
