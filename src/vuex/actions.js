import axios from 'axios';
import {
  FETCH_PROBLEMS, REFETCH_PROBLEMS,
  FETCH_PROBLEMS_START, FETCH_PROBLEMS_FINISH, FETCH_PROBLEMS_ERROR,
  FETCH_ALL_PROBLEMS, REFETCH_ALL_PROBLEMS,
  FETCH_ALL_PROBLEMS_START, FETCH_ALL_PROBLEMS_FINISH, FETCH_ALL_PROBLEMS_ERROR,
  SELECT_PROBLEM, FETCH_SELECT_PROBLEM_RESPONSES_START, FETCH_SELECT_PROBLEM_RESPONSES_FINISH,
  FETCH_SELECT_PROBLEM_RESPONSES_ERROR, FETCH_SELECT_PROBLEM_RESPONSES,
  FETCH_MY_RESPONSES_PROBLEMS,
  FETCH_MY_RESPONSES_PROBLEMS_START, FETCH_MY_RESPONSES_PROBLEMS_FINISH,
  FETCH_MY_RESPONSES_PROBLEMS_ERROR, REFETCH_MY_RESPONSES_PROBLEMS,
  FETCH_HIGH_PRIORITY_PROBLEMS, FETCH_HIGH_PRIORITY_PROBLEMS_START,
  FETCH_HIGH_PRIORITY_PROBLEMS_FINISH, FETCH_HIGH_PRIORITY_PROBLEMS_ERROR,
  FETCH_PROBLEMS_REQUIRED_RESPONSE,
  FETCH_PROBLEMS_REQUIRED_RESPONSE_START, FETCH_PROBLEMS_REQUIRED_RESPONSE_FINISH,
  FETCH_PROBLEMS_REQUIRED_RESPONSE_ERROR, REFETCH_PROBLEMS_REQUIRED_RESPONSE,
  SAW_RESPONSES_OF_PROBLEM,
} from './mutation-types';

import { WEB_API_URL } from '../../.env';

export default {
  [FETCH_PROBLEMS]({ commit }) {
    commit(FETCH_PROBLEMS_START);
    const token = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: token },
    };
    axios.get(`${WEB_API_URL}/v1/problems/me`, config)
            .then((response) => {
              commit(FETCH_PROBLEMS_FINISH, response.data);
            }).catch(() => {
              commit(FETCH_PROBLEMS_ERROR);
            });
  },
  [REFETCH_PROBLEMS]({ commit }) {
    const token = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: token },
    };
    axios.get(`${WEB_API_URL}/v1/problems/me`, config)
            .then((response) => {
              commit(REFETCH_PROBLEMS, response.data);
            }).catch(() => {});
  },
  [FETCH_ALL_PROBLEMS]({ commit, state }, option = {}) {
    return new Promise((resolve, reject) => {
      commit(FETCH_ALL_PROBLEMS_START);
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      const queryPage = option.page || state.allProblems.page + 1;
      axios.get(`${WEB_API_URL}/v1/problems/?page=${queryPage}&per=10`, config)
               .then((response) => {
                 commit(FETCH_ALL_PROBLEMS_FINISH, response.data);
                 resolve(response.data);
               }).catch((error) => {
                 commit(FETCH_ALL_PROBLEMS_ERROR);
                 reject(error);
               });
    });
  },
  [REFETCH_ALL_PROBLEMS]({ commit }) {
    return new Promise((resolve, reject) => {
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      axios.get(`${WEB_API_URL}/v1/problems/?page=1&per=10`, config)
               .then((response) => {
                 commit(REFETCH_ALL_PROBLEMS, response.data);
                 resolve(response.data);
               }).catch((error) => {
                 reject(error);
               });
    });
  },
  [SELECT_PROBLEM]({ commit }, problem) {
    commit(SELECT_PROBLEM, problem);
    const token = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: token },
    };
    commit(FETCH_SELECT_PROBLEM_RESPONSES_START);
    axios.get(`${WEB_API_URL}/v1/problems/${problem.id}/responses`, config)
      .then((response) => {
        commit(FETCH_SELECT_PROBLEM_RESPONSES_FINISH, response.data);
      })
      .catch((error) => {
        commit(FETCH_SELECT_PROBLEM_RESPONSES_ERROR);
        console.log(error);
      });
  },
  [FETCH_SELECT_PROBLEM_RESPONSES]({ commit, state }) {
    return new Promise((resolve, reject) => {
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      commit(FETCH_SELECT_PROBLEM_RESPONSES_START);
      const problemId = state.selectedProblem.data.id;
      axios.get(`${WEB_API_URL}/v1/problems/${problemId}/responses`, config)
        .then((response) => {
          commit(FETCH_SELECT_PROBLEM_RESPONSES_FINISH, response.data);
          resolve();
        })
        .catch((error) => {
          commit(FETCH_SELECT_PROBLEM_RESPONSES_ERROR);
          console.log(error);
          reject(error);
        });
    });
  },
  [FETCH_MY_RESPONSES_PROBLEMS]({ commit, state }, option = {}) {
    return new Promise((resolve, reject) => {
      commit(FETCH_MY_RESPONSES_PROBLEMS_START);
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      const queryPage = option.page || state.allProblems.page + 1;
      axios.get(`${WEB_API_URL}/v1/problems/responded/?page=${queryPage}&per=10`, config)
               .then((response) => {
                 commit(FETCH_MY_RESPONSES_PROBLEMS_FINISH, response.data);
                 resolve(response.data);
               }).catch((error) => {
                 commit(FETCH_MY_RESPONSES_PROBLEMS_ERROR);
                 reject(error);
               });
    });
  },
  [REFETCH_MY_RESPONSES_PROBLEMS]({ commit }) {
    return new Promise((resolve, reject) => {
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      axios.get(`${WEB_API_URL}/v1/problems/responded/?page=1&per=10`, config)
               .then((response) => {
                 commit(REFETCH_MY_RESPONSES_PROBLEMS, response.data);
                 resolve(response.data);
               }).catch((error) => {
                 reject(error);
               });
    });
  },
  [FETCH_HIGH_PRIORITY_PROBLEMS]({ commit }) {
    return new Promise((resolve, reject) => {
      commit(FETCH_HIGH_PRIORITY_PROBLEMS_START);
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      // apiが完成したらurlを直す
      axios.get(`${WEB_API_URL}/v1/problems/?page=1&per=10`, config)
               .then((response) => {
                 commit(FETCH_HIGH_PRIORITY_PROBLEMS_FINISH, response.data);
                 resolve(response.data);
               }).catch((error) => {
                 commit(FETCH_HIGH_PRIORITY_PROBLEMS_ERROR);
                 reject(error);
               });
    });
  },
  [FETCH_PROBLEMS_REQUIRED_RESPONSE]({ commit, state }, option = {}) {
    return new Promise((resolve, reject) => {
      commit(FETCH_PROBLEMS_REQUIRED_RESPONSE_START);
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      const queryPage = option.page || state.allProblems.page + 1;
      // apiが完成したらurlを直す
      axios.get(`${WEB_API_URL}/v1/problems/?page=${queryPage}&per=10`, config)
               .then((response) => {
                 commit(FETCH_PROBLEMS_REQUIRED_RESPONSE_FINISH, response.data);
                 resolve(response.data);
               }).catch((error) => {
                 commit(FETCH_PROBLEMS_REQUIRED_RESPONSE_ERROR);
                 reject(error);
               });
    });
  },
  [REFETCH_PROBLEMS_REQUIRED_RESPONSE]({ commit }) {
    return new Promise((resolve, reject) => {
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      // apiが完成したらurlを直す
      axios.get(`${WEB_API_URL}/v1/problems/?page=1&per=10`, config)
               .then((response) => {
                 commit(REFETCH_MY_RESPONSES_PROBLEMS, response.data);
                 resolve(response.data);
               }).catch((error) => {
                 reject(error);
               });
    });
  },
  [SAW_RESPONSES_OF_PROBLEM]({ commit }, problem) {
    const token = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: token },
    };
    axios.put(`${WEB_API_URL}/v1/problems/${problem.id}/responses/seen`, {}, config)
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
    commit(SAW_RESPONSES_OF_PROBLEM, problem);
  },
};
