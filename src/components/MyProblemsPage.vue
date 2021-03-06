<template>
  <v-ons-page>
    <v-ons-pull-hook :action="loadItem" @changestate="state = $event.state">
      <span v-show="state === 'initial'"> Pull to refresh </span>
      <span v-show="state === 'preaction'"> Release </span>
      <span v-show="state === 'action'"> Loading... </span>
    </v-ons-pull-hook>
    <main class="h100">
      <div class="centering h100" v-if="!fetchProblemsStatus.isCompleted">
        <v-ons-progress-circular indeterminate ></v-ons-progress-circular>
      </div>
      <ul class="card-list">
        <li v-for="problem in problems" @click="toResponse(problem)">
          <problem-card :problem="problem" :useUnReadNotification="true" class="w100"></problem-card>
        </li>
      </ul>
    </main>
    <v-ons-fab position="bottom right" id="postButton" :style="{ backgroundColor: '#2bb46e'}" :visible="fetchProblemsStatus.isCompleted" @click="push"><v-ons-icon icon="md-edit"></v-ons-icon></v-ons-fab>
    <v-ons-popover cancelable :visible="popoverVisible" :target="target" direction="up" :cover-target="false">
      <p style="text-align: center">Let's push the button to post a problem!</p>
    </v-ons-popover>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ons from 'onsenui';
import ProblemCard from './ProblemCard';
import CameraPage from './CameraPage';
import ResponsePage from './ResponsePage';
import { FETCH_PROBLEMS, REFETCH_PROBLEMS, SELECT_PROBLEM, SAW_RESPONSES_OF_PROBLEM } from '../vuex/mutation-types';

export default {
  name: 'my-problems-page',
  components: {
    ProblemCard,
  },
  props: ['pageStack'],
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
  data() {
    return {
      state: 'initial',
      target: '#postButton',
    };
  },
  computed: {
    ...mapGetters([
      'problems',
      'fetchProblemsStatus',
    ]),
    popoverVisible() {
      return this.problems.length === 0 && this.fetchProblemsStatus.isCompleted;
    },
  },
  methods: {
    ...mapActions([
      FETCH_PROBLEMS,
      REFETCH_PROBLEMS,
      SELECT_PROBLEM,
      SAW_RESPONSES_OF_PROBLEM,
    ]),
    push() {
      this.pageStack.push(CameraPage);
    },
    toResponse(problem) {
      this.SELECT_PROBLEM(problem);
      this.pageStack.push(ResponsePage);
      if (!problem.responses_seen) {
        this.SAW_RESPONSES_OF_PROBLEM(problem);
      }
    },
    loadItem(done) {
      setTimeout(() => {
        this.REFETCH_PROBLEMS();
        done();
      }, 400);
    },
  },
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
.card-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding-bottom: 100px;
}
.card-list > li {
  margin: 10px 0;
}
.w100 {
  width: 100%;
}
</style>
