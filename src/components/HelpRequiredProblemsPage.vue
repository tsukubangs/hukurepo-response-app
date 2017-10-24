<template>
  <v-ons-page :infinite-scroll="loadMore">
    <v-ons-pull-hook :action="loadItem" @changestate="state = $event.state">
      <span v-show="state === 'initial'"> Pull to refresh </span>
      <span v-show="state === 'preaction'"> Release </span>
      <span v-show="state === 'action'"> Loading... </span>
    </v-ons-pull-hook>
    <main class="h100">
      <div class="problems-list"  v-if="this.highPriorityProblems.data.length">
        <span class="underline">すぐに返信が必要な困りごと</span>
        <ul class="card-list">
          <li v-for="problem in highPriorityProblems.data" @click="toDetails(problem)">
            <problem-card :problem="problem" :useUnReadNotification="false" class="w100"></problem-card>
          </li>
        </ul>
      </div>
      <div v-show="highPriorityProblems.loading && !highPriorityProblems.data.length">
        <v-ons-progress-circular indeterminate ></v-ons-progress-circular>
      </div>
      <div class="problems-list"  v-if="this.problemsRequiredResponse.data.length">
        <span class="underline">返信が必要な困りごと</span>
        <ul class="card-list">
          <li v-for="problem in problemsRequiredResponse.data" @click="toDetails(problem)">
            <problem-card :problem="problem" :useUnReadNotification="false" class="w100"></problem-card>
          </li>
        </ul>
      </div>
      <div v-show="problemsRequiredResponse.loading">
        <v-ons-progress-circular indeterminate ></v-ons-progress-circular>
      </div>
      <div v-show="!this.highPriorityProblems.data.length &&
        !this.highPriorityProblems.loading &&
        !this.problemsRequiredResponse.data.length &&
        !this.problemsRequiredResponse.loading">
        <p>返信が必要な困りごとはありません</p>
      </div>
    </main>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProblemCard from './ProblemCard';
import ProblemDetailsPage from './ProblemDetailsPage';
import {
  FETCH_HIGH_PRIORITY_PROBLEMS, FETCH_PROBLEMS_REQUIRED_RESPONSE,
  REFETCH_PROBLEMS_REQUIRED_RESPONSE, SELECT_PROBLEM,
} from '../vuex/mutation-types';

export default {
  name: 'help-required-problem-page',
  components: {
    ProblemCard,
  },
  props: ['pageStack'],
  created() {
    this.FETCH_HIGH_PRIORITY_PROBLEMS();
    this.FETCH_PROBLEMS_REQUIRED_RESPONSE({ page: 1 });
  },
  computed: {
    ...mapGetters([
      'highPriorityProblems',
      'problemsRequiredResponse',
    ]),
  },
  methods: {
    ...mapActions([
      FETCH_HIGH_PRIORITY_PROBLEMS,
      FETCH_PROBLEMS_REQUIRED_RESPONSE,
      REFETCH_PROBLEMS_REQUIRED_RESPONSE,
      SELECT_PROBLEM,
    ]),
    toDetails(problem) {
      this.SELECT_PROBLEM(problem);
      this.pageStack.push(ProblemDetailsPage);
    },
    loadMore(done) {
      if (!this.problemsRequiredResponse.loading && !this.problemsRequiredResponse.isFinished) {
        this.FETCH_PROBLEMS_REQUIRED_RESPONSE()
          .then(() => { done(); }).catch(() => { done(); });
      } else {
        done();
      }
    },
    loadItem(done) {
      setTimeout(() => {
        this.FETCH_HIGH_PRIORITY_PROBLEMS();
        this.REFETCH_PROBLEMS_REQUIRED_RESPONSE();
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
.card-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.card-list > li {
  margin: 10px 0;
}
.problems-list {
  text-align: left;
  font-size: 18px;
  margin: 10px 0;
  color: #333;
}
.underline {
  border-bottom: solid 1px;
}
</style>
