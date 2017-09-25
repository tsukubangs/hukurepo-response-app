import axios from 'axios';
import {
  FETCH_PROBLEMS, REFETCH_PROBLEMS,
  FETCH_PROBLEMS_START, FETCH_PROBLEMS_FINISH, FETCH_PROBLEMS_ERROR,
  FETCH_ALL_PROBLEMS, REFETCH_ALL_PROBLEMS,
  FETCH_ALL_PROBLEMS_START, FETCH_ALL_PROBLEMS_FINISH, FETCH_ALL_PROBLEMS_ERROR,
  SELECT_PROBLEM, FETCH_SELECT_PROBLEM_RESPONSES_START, FETCH_SELECT_PROBLEM_RESPONSES_FINISH,
  FETCH_SELECT_PROBLEM_RESPONSES_ERROR, FETCH_SELECT_PROBLEM_RESPONSES,
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
  [FETCH_ALL_PROBLEMS]({ commit }) {
    commit(FETCH_ALL_PROBLEMS_START);
    const token = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: token },
    };
    axios.get(`${WEB_API_URL}/v1/problems/?page=1&per=10&sort=responded`, config)
            .then((response) => {
              commit(FETCH_ALL_PROBLEMS_FINISH, response.data);
            }).catch(() => {
              commit(FETCH_ALL_PROBLEMS_ERROR);
            });
  },
  [REFETCH_ALL_PROBLEMS]({ commit }) {
    const token = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: token },
    };
    axios.get(`${WEB_API_URL}/v1/problems/?page=1&per=10&sort=responded`, config)
            .then((response) => {
              commit(REFETCH_ALL_PROBLEMS, response.data);
            }).catch(() => {});
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
    const token = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: token },
    };
    commit(FETCH_SELECT_PROBLEM_RESPONSES_START);
    const problemId = state.selectedProblem.data.id;
    axios.get(`${WEB_API_URL}/v1/problems/${problemId}/responses`, config)
      .then((response) => {
        commit(FETCH_SELECT_PROBLEM_RESPONSES_FINISH, response.data);
      })
      .catch((error) => {
        commit(FETCH_SELECT_PROBLEM_RESPONSES_ERROR);
        console.log(error);
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
