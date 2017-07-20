import axios from 'axios';
import { FETCH_PROBLEMS, FETCH_PROBLEMS_START, FETCH_PROBLEMS_FINISH, FETCH_PROBLEMS_ERROR, REFETCH_PROBLEMS, SELECT_PROBLEM, SAW_RESPONSES_OF_PROBLEM } from './mutation-types';
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
  [SELECT_PROBLEM]({ commit }, problem) {
    commit(SELECT_PROBLEM, problem);
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
