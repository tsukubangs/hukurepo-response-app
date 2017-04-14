<template>
  <div id="app">
    <v-ons-navigator :page-stack="pageStack">
      <component :is="page" v-for="page in pageStack" :page-stack="pageStack"></component>
    </v-ons-navigator>
  </div>
</template>

<script>
import TopPage from './components/TopPage';

export default {
  name: 'app',
  data() {
    return {
      pageStack: [TopPage],
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
