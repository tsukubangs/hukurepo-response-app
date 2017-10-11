<template>
  <v-ons-page :infinite-scroll="loadMore">
    <v-ons-pull-hook :action="loadItem" @changestate="state = $event.state">
      <span v-show="state === 'initial'"> Pull to refresh </span>
      <span v-show="state === 'preaction'"> Release </span>
      <span v-show="state === 'action'"> Loading... </span>
    </v-ons-pull-hook>
    <main class="h100">
      <ul class="card-list" v-if="this.myResponsesProblems.data">
        <li v-for="problem in myResponsesProblems.data" @click="toDetails(problem)">
          <problem-card :problem="problem" :useUnReadNotification="false" class="w100"></problem-card>
        </li>
      </ul>
      <div v-else>
        <p>まだ返信した投稿はありません</p>
      </div>
      <v-ons-progress-circular indeterminate v-show="myResponsesProblems.loading"></v-ons-progress-circular>
    </main>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProblemCard from './ProblemCard';
import ProblemDetailsPage from './ProblemDetailsPage';
import { FETCH_MY_RESPONSES_PROBLEMS, REFETCH_MY_RESPONSES_PROBLEMS, SELECT_PROBLEM } from '../vuex/mutation-types';

export default {
  name: 'my-responses-page',
  components: {
    ProblemCard,
  },
  props: ['pageStack'],
  created() {
    this.FETCH_MY_RESPONSES_PROBLEMS({ page: 1 });
  },
  data() {
    return {
      state: 'initial',
    };
  },
  computed: {
    ...mapGetters([
      'myResponsesProblems',
    ]),
  },
  methods: {
    ...mapActions([
      FETCH_MY_RESPONSES_PROBLEMS,
      REFETCH_MY_RESPONSES_PROBLEMS,
      SELECT_PROBLEM,
    ]),
    toDetails(problem) {
      this.SELECT_PROBLEM(problem);
      this.pageStack.push(ProblemDetailsPage);
    },
    loadItem(done) {
      this.REFETCH_MY_RESPONSES_PROBLEMS()
        .then(() => { done(); }).catch(() => { done(); });
    },
    loadMore(done) {
      if (!this.myResponsesProblems.loading) {
        this.FETCH_MY_RESPONSES_PROBLEMS()
          .then(() => { done(); }).catch(() => { done(); });
      }
    } },
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
}
.card-list > li {
  margin: 10px 0;
}
.w100 {
  width: 100%;
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
