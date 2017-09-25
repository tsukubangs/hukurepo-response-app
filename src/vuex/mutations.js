import {
  FETCH_PROBLEMS_START, FETCH_PROBLEMS_FINISH, FETCH_PROBLEMS_ERROR,
  REFETCH_PROBLEMS,
  FETCH_ALL_PROBLEMS_START, FETCH_ALL_PROBLEMS_FINISH, FETCH_ALL_PROBLEMS_ERROR,
  REFETCH_ALL_PROBLEMS,
  SELECT_PROBLEM, FETCH_SELECT_PROBLEM_RESPONSES_START, FETCH_SELECT_PROBLEM_RESPONSES_FINISH,
  FETCH_SELECT_PROBLEM_RESPONSES_ERROR,
  SAW_RESPONSES_OF_PROBLEM,
} from './mutation-types';

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
  [REFETCH_PROBLEMS](state, problems) {
    state.problems = problems;
  },
  [FETCH_ALL_PROBLEMS_START](state) {
    state.fetchAllProblemsStatus = {
      isError: false,
      isCompleted: false,
    };
  },
  [FETCH_ALL_PROBLEMS_FINISH](state, allProblems) {
    state.allProblems = allProblems;
    state.fetchAllProblemsStatus = {
      isError: false,
      isCompleted: true,
    };
  },
  [FETCH_ALL_PROBLEMS_ERROR](state) {
    state.fetchAllProblemsStatus = {
      isError: true,
      isCompleted: false,
    };
  },
  [REFETCH_ALL_PROBLEMS](state, allProblems) {
    state.allProblems = allProblems;
  },
  [SELECT_PROBLEM](state, problem) {
    state.selectedProblem.data = problem;
  },
  [FETCH_SELECT_PROBLEM_RESPONSES_START](state) {
    state.selectedProblem.responses.loading = true;
    state.selectedProblem.responses.isError = false;
  },
  [FETCH_SELECT_PROBLEM_RESPONSES_FINISH](state, responses) {
    state.selectedProblem.responses.data = responses;
    state.selectedProblem.responses.loading = false;
    state.selectedProblem.responses.isError = false;
  },
  [FETCH_SELECT_PROBLEM_RESPONSES_ERROR](state) {
    state.selectedProblem.responses.loading = false;
    state.selectedProblem.responses.isError = true;
  },
  [SAW_RESPONSES_OF_PROBLEM](state, problem) {
    const problemsNumber = state.problems.indexOf(problem);
    state.problems[problemsNumber].responses_seen = true;
  },
};
