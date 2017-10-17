<template>
  <v-ons-page :infinite-scroll="loadMore">
    <main class="h100">
      <div class="problems-list"  v-if="this.highPriorityProblems.data.length">
        <span class="underline">すぐに返信が必要な困りごと</span>
        <ul class="card-list">
          <li v-for="problem in highPriorityProblems.data" @click="toDetails(problem)">
            <problem-card :problem="problem" :useUnReadNotification="false" class="w100"></problem-card>
          </li>
        </ul>
      </div>
      <v-ons-progress-circular indeterminate v-show="highPriorityProblems.loading"></v-ons-progress-circular>
      <div class="problems-list"  v-if="this.problemsRequiredResponse.data.length">
        <span class="underline">返信が必要な困りごと</span>
        <ul class="card-list">
          <li v-for="problem in problemsRequiredResponse.data" @click="toDetails(problem)">
            <problem-card :problem="problem" :useUnReadNotification="false" class="w100"></problem-card>
          </li>
        </ul>
      </div>
      <v-ons-progress-circular indeterminate v-show="problemsRequiredResponse.loading"></v-ons-progress-circular>
      <div v-show="!this.highPriorityProblems.data.length && !this.problemsRequiredResponse.data.length">
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
      if (!this.problemsRequiredResponse.loading) {
        this.FETCH_PROBLEMS_REQUIRED_RESPONSE()
          .then(() => { done(); }).catch(() => { done(); });
      }
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
