import { FETCH_PROBLEMS_START, FETCH_PROBLEMS_FINISH, FETCH_PROBLEMS_ERROR } from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [FETCH_PROBLEMS_START](state) {
    state.fetchProblemsStatus = {
      isError: false,
      idCompleted: false,
    };
  },
  [FETCH_PROBLEMS_FINISH](state, problems) {
    state.problems = problems;
    state.fetchProblemsStatus = {
      isError: false,
      idCompleted: true,
    };
  },
  [FETCH_PROBLEMS_ERROR](state) {
    state.fetchProblemsStatus = {
      isError: true,
      idCompleted: false,
    };
  },

};
