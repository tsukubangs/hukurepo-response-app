import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/Index';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Init from '../components/Init';
import Agree from '../components/Agree';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Setting from '../components/Setting';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/init',
      name: 'Init',
      component: Init,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/agree',
      name: 'Agree',
      component: Agree,
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: PrivacyPolicy,
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
    },
  ],
});
