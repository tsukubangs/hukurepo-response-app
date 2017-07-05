<template id="top-page">
  <v-ons-page>
    <custom-toolbar><div class="title"><img class="title-icon" src="../assets/s_logo.png" /></div></custom-toolbar>
    <main class="h100">
        <div class="centering h100" v-if="!fetchProblemsStatus.isCompleted">
            <v-ons-progress-circular indeterminate ></v-ons-progress-circular>
        </div>
        <ul class="card-list">
            <li v-for="problem in problems" @click="toResponse(problem)">
                <problem-card :problem="problem" class="card"></problem-card>
            </li>
        </ul>
    </main>
    <v-ons-fab position="bottom right" :style="{ backgroundColor: '#01a8ec'}" :visible="fetchProblemsStatus.isCompleted" @click="push"><v-ons-icon icon="md-edit"></v-ons-icon></v-ons-fab>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import CameraPage from './CameraPage';
import ProblemCard from './ProblemCard';
import ResponsePage from './ResponsePage';
import { FETCH_PROBLEMS, SELECTE_PROBLEM } from '../vuex/mutation-types';

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
      SELECTE_PROBLEM,
    ]),
    push() {
      this.pageStack.push(CameraPage);
    },
    toResponse(problem) {
      // this.postProblem = problem;
      console.log(problem.id);
      // this.$store.dispatch(SELECTE_PROBLEM, problem);
      this.SELECTE_PROBLEM(problem);
      this.pageStack.push(ResponsePage);
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
}
.card-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding-bottom: 100px;
}
.card-list > li {
  margin: 10px 0;
}
.title {
  height: 100%;
  box-sizing: border-box;
  padding: 3px 0;
}
.title-icon {
  height: 100%;
}
</style>
