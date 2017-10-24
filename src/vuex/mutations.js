import {
  FETCH_PROBLEMS_START, FETCH_PROBLEMS_FINISH, FETCH_PROBLEMS_ERROR,
  REFETCH_PROBLEMS,
  FETCH_ALL_PROBLEMS_START, FETCH_ALL_PROBLEMS_FINISH, FETCH_ALL_PROBLEMS_ERROR,
  REFETCH_ALL_PROBLEMS,
  SELECT_PROBLEM, FETCH_SELECT_PROBLEM_RESPONSES_START, FETCH_SELECT_PROBLEM_RESPONSES_FINISH,
  FETCH_SELECT_PROBLEM_RESPONSES_ERROR,
  FETCH_MY_RESPONSES_PROBLEMS_START, FETCH_MY_RESPONSES_PROBLEMS_FINISH,
  FETCH_MY_RESPONSES_PROBLEMS_ERROR, REFETCH_MY_RESPONSES_PROBLEMS,
  FETCH_HIGH_PRIORITY_PROBLEMS_START,
  FETCH_HIGH_PRIORITY_PROBLEMS_FINISH, FETCH_HIGH_PRIORITY_PROBLEMS_ERROR,
  FETCH_PROBLEMS_REQUIRED_RESPONSE_START, FETCH_PROBLEMS_REQUIRED_RESPONSE_FINISH,
  FETCH_PROBLEMS_REQUIRED_RESPONSE_ERROR, REFETCH_PROBLEMS_REQUIRED_RESPONSE,
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
    state.allProblems.isError = false;
    state.allProblems.loading = true;
  },
  [FETCH_ALL_PROBLEMS_FINISH](state, allProblemsData) {
    state.allProblems.data = state.allProblems.data.concat(allProblemsData);
    state.allProblems.page += 1;
    state.allProblems.isError = false;
    state.allProblems.loading = false;
    state.allProblems.isFinished = allProblemsData.isFinished;
  },
  [FETCH_ALL_PROBLEMS_ERROR](state) {
    state.allProblems.isError = true;
    state.allProblems.loading = false;
  },
  [REFETCH_ALL_PROBLEMS](state, allProblemsData) {
    state.allProblems.data = allProblemsData;
    state.allProblems.isError = false;
    state.allProblems.loading = false;
    state.allProblems.page = 1;
    state.allProblems.isFinished = allProblemsData.isFinished;
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
  [FETCH_MY_RESPONSES_PROBLEMS_START](state) {
    state.myResponsesProblems.isError = false;
    state.myResponsesProblems.loading = true;
  },
  [FETCH_MY_RESPONSES_PROBLEMS_FINISH](state, problems) {
    state.myResponsesProblems.data = state.myResponsesProblems.data.concat(problems);
    state.myResponsesProblems.page += 1;
    state.myResponsesProblems.isError = false;
    state.myResponsesProblems.loading = false;
    state.myResponsesProblems.isFinished = problems.isFinished;
  },
  [FETCH_MY_RESPONSES_PROBLEMS_ERROR](state) {
    state.myResponsesProblems.isError = true;
    state.myResponsesProblems.loading = false;
  },
  [REFETCH_MY_RESPONSES_PROBLEMS](state, allProblemsData) {
    state.myResponsesProblems.data = allProblemsData;
    state.myResponsesProblems.isError = false;
    state.myResponsesProblems.loading = false;
    state.myResponsesProblems.page = 1;
    state.myResponsesProblems.isFinished = false;
  },
  [FETCH_HIGH_PRIORITY_PROBLEMS_START](state) {
    state.highPriorityProblems.isError = false;
    state.highPriorityProblems.loading = true;
  },
  [FETCH_HIGH_PRIORITY_PROBLEMS_FINISH](state, allProblemsData) {
    state.highPriorityProblems.data = allProblemsData;
    state.highPriorityProblems.isError = false;
    state.highPriorityProblems.loading = false;
  },
  [FETCH_HIGH_PRIORITY_PROBLEMS_ERROR](state) {
    state.highPriorityProblems.isError = true;
    state.highPriorityProblems.loading = false;
  },
  [FETCH_PROBLEMS_REQUIRED_RESPONSE_START](state) {
    state.problemsRequiredResponse.isError = false;
    state.problemsRequiredResponse.loading = true;
  },
  [FETCH_PROBLEMS_REQUIRED_RESPONSE_FINISH](state, problems) {
    state.problemsRequiredResponse.data =
        state.problemsRequiredResponse.data.concat(problems);
    state.problemsRequiredResponse.page += 1;
    state.problemsRequiredResponse.isError = false;
    state.problemsRequiredResponse.loading = false;
    state.problemsRequiredResponse.isFinished = problems.isFinished;
  },
  [FETCH_PROBLEMS_REQUIRED_RESPONSE_ERROR](state) {
    state.problemsRequiredResponse.isError = true;
    state.problemsRequiredResponse.loading = false;
  },
  [REFETCH_PROBLEMS_REQUIRED_RESPONSE](state, problems) {
    state.problemsRequiredResponse.data = problems;
    state.problemsRequiredResponse.isError = false;
    state.problemsRequiredResponse.loading = false;
    state.problemsRequiredResponse.page = 1;
    state.problemsRequiredResponse.isFinished = false;
  },
  [SAW_RESPONSES_OF_PROBLEM](state, problem) {
    const problemsNumber = state.problems.indexOf(problem);
    state.problems[problemsNumber].responses_seen = true;
  },
};
