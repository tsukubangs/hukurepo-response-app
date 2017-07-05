import { FETCH_PROBLEMS_START, FETCH_PROBLEMS_FINISH, FETCH_PROBLEMS_ERROR, SELECTED_PROBLEM } from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [FETCH_PROBLEMS_START](state) {
    state.fetchProblemsStatus = {
      isError: false,
      isCompleted: false,
    };
  },
  [FETCH_PROBLEMS_FINISH](state, problems) {
    state.problems = problems;
    state.fetchProblemsStatus = {
      isError: false,
      isCompleted: true,
    };
  },
  [FETCH_PROBLEMS_ERROR](state) {
    state.fetchProblemsStatus = {
      isError: true,
      isCompleted: false,
    };
  },
  [SELECTED_PROBLEM](state, problem) {
    state.selectedProblem = problem;
  },
};
