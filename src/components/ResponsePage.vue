<template>
  <v-ons-page>
    <custom-toolbar>Response Page</custom-toolbar>

    <v-ons-pull-hook
      :action="loadItem"
      @changestate="state = $event.state"
    >
      <span v-show="state === 'initial'"> Pull to refresh </span>
      <span v-show="state === 'preaction'"> Release </span>
      <span v-show="state === 'action'"> Loading... </span>
    </v-ons-pull-hook>

    <main class="h100">
      <ul class="card-list">
        <li>
          <response-card :response="selectedProblem" class="card card-right"></response-card>
        </li>
        <li v-for="response in responses">
          <response-card :response="response" class="card"></response-card>
        </li>
      </ul>
    </main>
  </v-ons-page>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import ResponseCard from './ResponseCard';
import { WEB_API_URL } from '../../.env';
// import { FETCH_PROBLEMS } from '../vuex/mutation-types';
export default {
  name: 'response-page',
  components: {
    CustomToolbar,
    ResponseCard,
  },
  data() {
    return {
      responses: '',
      state: 'initial',
    };
  },
  computed: {
    ...mapGetters([
      'selectedProblem',
    ]),
  },
  created() {
    this.getResponse();
  },
  methods: {
    loadItem(done) {
      setTimeout(() => {
        this.getResponse();
        done();
      }, 400);
    },
    getResponse() {
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      axios.get(`${WEB_API_URL}/v1/problems/${this.selectedProblem.id}/responses`, config)
      .then((response) => {
        console.log(response);
        this.responses = response.data;
      })
      .catch((error) => {
        console.log(error);
        ons.notification.alert({
          title: 'Can\'t connect to server',
          message: 'Try again?',
          callback: this.getResponse,
        });
      });
    },
  },
  props: ['pageStack'],
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
.card {
  width: 80%;
}
.card-right {
  margin-left: auto;
}
.card-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding-bottom: 100px;
}
.card-list > li {
  margin: 10px 0;
}
</style>
