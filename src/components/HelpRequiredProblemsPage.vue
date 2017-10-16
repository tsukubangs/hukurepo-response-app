<template>
  <v-ons-page>
    <main class="h100">
      <div class="problems-list"  v-if="this.highPriorityProblems.data">
        <span class="underline">すぐに返信が必要な困りごと</span>
        <ul class="card-list">
          <li v-for="problem in highPriorityProblems.data" @click="toDetails(problem)">
            <problem-card :problem="problem" :useUnReadNotification="false" class="w100"></problem-card>
          </li>
        </ul>
      </div>
      <v-ons-progress-circular indeterminate v-show="highPriorityProblems.loading"></v-ons-progress-circular>
    </main>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProblemCard from './ProblemCard';
import ProblemDetailsPage from './ProblemDetailsPage';
import { FETCH_HIGH_PRIORITY_PROBLEMS, SELECT_PROBLEM } from '../vuex/mutation-types';

export default {
  name: 'help-required-problem-page',
  components: {
    ProblemCard,
  },
  props: ['pageStack'],
  created() {
    this.FETCH_HIGH_PRIORITY_PROBLEMS();
  },
  computed: {
    ...mapGetters([
      'highPriorityProblems',
    ]),
  },
  methods: {
    ...mapActions([
      FETCH_HIGH_PRIORITY_PROBLEMS,
      SELECT_PROBLEM,
    ]),
    toDetails(problem) {
      this.SELECT_PROBLEM(problem);
      this.pageStack.push(ProblemDetailsPage);
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
