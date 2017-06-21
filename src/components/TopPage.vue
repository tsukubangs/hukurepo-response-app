<template id="top-page">
  <v-ons-page>
    <custom-toolbar>Top Page</custom-toolbar>
    <main class="h100">
        <div class="centering h100" v-if="!fetchProblemsStatus.isCompleted">
            <v-ons-progress-circular indeterminate ></v-ons-progress-circular>
        </div>
        <problem-card v-for="problem in problems" :problem="problem" class="card"></problem-card>
        <v-ons-fab position="bottom right" class="post-btn" @click="push"><v-ons-icon icon="md-edit"></v-ons-icon></v-ons-fab>
    </main>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import CameraPage from './CameraPage';
import ProblemCard from './ProblemCard';
import { FETCH_PROBLEMS } from '../vuex/mutation-types';

export default {
  name: 'top-page',
  components: {
    CustomToolbar,
    ProblemCard,
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
main {
  padding: 5px;
  box-sizing: border-box;
}
.centering {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 100%;
  margin: 10px 0;
}
.post-btn {
  position: fixed;
}
</style>
