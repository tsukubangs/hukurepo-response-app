<template id="top-page">
  <v-ons-page>
    <custom-toolbar><div class="title"><img class="title-icon" src="../assets/s_logo.png" /></div></custom-toolbar>
    <v-ons-tabbar :tabs="tabs" :visible="true" :index="0"></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';
import AllProblemsPage from './AllProblemsPage';
import HelpRequiredProblemsPage from './HelpRequiredProblemsPage';
import MyResposesPage from './MyResponsesPage';
import notification from '../function/notification';

export default {
  name: 'top-page',
  components: {
    CustomToolbar,
    AllProblemsPage,
    HelpRequiredProblemsPage,
  },
  created() {
    notification.initialize(this);
  },
  data() {
    return {
      state: 'initial',
      tabs: [
        {
          icon: 'ion-reply',
          page: HelpRequiredProblemsPage,
          props: {
            pageStack: this.pageStack,
          },
        },
        {
          icon: 'ion-ios-person',
          page: MyResposesPage,
          props: {
            pageStack: this.pageStack,
          },
        },
        {
          icon: 'ion-ios-people-outline',
          page: AllProblemsPage,
          props: {
            pageStack: this.pageStack,
          },
        },
      ],
    };
  },
  props: ['pageStack'],
};
</script>

<style scoped>
.title {
  height: 100%;
  box-sizing: border-box;
  padding: 3px 0;
}
.title-icon {
  height: 100%;
}
</style>
