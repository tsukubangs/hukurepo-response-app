<template>
  <v-ons-page>
    <div class="background"></div>
    <main>
      <div id="owl-words">
        <p>ようこそ！外国人から送られてくる困りごとを解決しましょう！</p>
        <img id="owl-icon" src="../../res/hukurepo-icon.png" alt="owl">
        <div id="signup-or-login">
          <p><v-ons-button modifier="outline" @click="toAgree()">サインアップ</v-ons-button></p>
          <p><v-ons-button modifier="quiet" @click="toLogin()">既にアカウントを持っている</v-ons-button></p>
        </div>
      </div>
    </main>
  </v-ons-page>
</template>

<script>
import router from '../router';

export default {
  name: 'init-page',
  methods: {
    toLogin() {
      router.push('login');
    },
    toAgree() {
      router.push('agree');
    },
  },
};
</script>

<style scoped>
main {
    height: 100%;
    display: flex;          /* 2 */
    justify-content: center;/* 3 */
    align-items: center;    /* 4 */
}

#signup-or-login > p {
  margin: 10px 0;
}

#owl-words{
  color: #FFF;
  font-size: x-large;
  width: 100%;
  max-width: 300px;
}

#owl-icon {
  width: 70%;
  max-width: 200px;
}

.background {
  background-color: #2bb46e;
}

.button--outline {
  background-color: white;
  color: #2bb46e;
}

.button--quiet {
  color: white;
}
</style>
