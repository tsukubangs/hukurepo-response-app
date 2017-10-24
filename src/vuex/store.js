import Vuex from 'vuex';
import Vue from 'vue';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    problems: [],
    fetchProblemsStatus: {
      isError: false,
      isCompleted: false,
    },
    allProblems: {
      data: [],
      page: 0,
      loading: false,
      isError: false,
      isFinished: false,
    },
    selectedProblem: {
      data: null,
      responses: {
        data: [],
        loading: false,
        isError: false,
      },
    },
    myResponsesProblems: {
      data: [],
      page: 0,
      loading: false,
      isError: false,
      isFinished: false,
    },
    highPriorityProblems: {
      data: [],
      loading: false,
      isError: false,
    },
    problemsRequiredResponse: {
      data: [],
      page: 0,
      loading: false,
      isError: false,
      isFinished: false,
    },
  },
  getters: {
    problems: state => state.problems,
    fetchProblemsStatus: state => state.fetchProblemsStatus,
    allProblems: state => state.allProblems,
    fetchAllProblemsStatus: state => state.fetchAllProblemsStatus,
    selectedProblem: state => state.selectedProblem,
    myResponsesProblems: state => state.myResponsesProblems,
    highPriorityProblems: state => state.highPriorityProblems,
    problemsRequiredResponse: state => state.problemsRequiredResponse,
  },
  actions,
  mutations,
});
