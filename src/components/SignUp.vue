<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">ユーザ登録</div>
      <div class="right"><v-ons-toolbar-button class="white-btn login-btn" modifier="outline" @click="toLogin">ログイン
    </v-ons-toolbar-button></div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-header>
          Email
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input class="width100" placeholder="Email" v-model="email" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-if="this.emailIsInputted && !validation.emailRequired">
        <div class="right">
          Emailを入力してください
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-else-if="this.emailIsInputted && !validation.emailFormat">
        <div class="right">
          無効な email アドレスです
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
          パスワード
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input class="width100" placeholder="パスワード" type="password" v-model="password" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-if="this.passwordIsInputted && !validation.passwordRequired">
        <div class="right">
          パスワードを入力してください
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-else-if="this.passwordIsInputted && !validation.passwordLength">
        <div class="right">
          パスワードの6から29文字の長さが必要です
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
          確認パスワード
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input class="width100" placeholder="確認パスワード" type="password" v-model="confirmPassword" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-if="this.confirmPasswordIsInputted && !validation.confirmPasswordMatch">
        <div class="right">
          パスワードが一致しません
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        性別
      </v-ons-list-header>
      <v-ons-list-item v-for="(gender, $index) in genders" tappable>
        <label class="left">
          <v-ons-radio :input-id="'radio-' + $index" :value="gender" v-model="selectedGender"></v-ons-radio>
        </label>
        <label :for="'radio-' + $index" class="center">{{ gender==="male"?"男性":"女性" }}</label>
      </v-ons-list-item>
      <v-ons-list-header>
        年代
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-select class="width100" v-model="selectedAge">
            <option v-for="age in ages" :value="age">{{ age.slice(1) }}</option>
          </v-ons-select>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        居住国
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-select class="width100" v-model="selectedCountryOfResidence">
            <option v-for="Country in countries" :value="Country.name">{{ Country.name }}</option>
          </v-ons-select>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <section style="margin: 16px">
      <v-ons-button modifier="large" v-bind:disabled="!this.signUpIsPermitted" @click="confirmDialogVisible = true">確認</v-ons-button>
    </section>
    <v-ons-alert-dialog modifier="rowfooter" title="以下の情報で登録しますか？" :visible.sync="confirmDialogVisible">
      Email: {{this.email}}<br />
      性別: {{this.selectedGender==="male"?"男性":"女性"}}<br />
      年代: {{this.selectedAge.slice(1)}}<br />
      居住国: {{this.selectedCountryOfResidence}}

      <template slot="footer">
        <button class="alert-dialog-button" @click="confirmDialogVisible = false">編集</button>
        <button class="alert-dialog-button" @click="postSignUp">ユーザ登録</button>
      </template>
    </v-ons-alert-dialog>
    <ons-progress-bar indeterminate  v-show="this.signUpPosting === true"></ons-progress-bar>
    <ons-progress-bar indeterminate  v-show="this.signUpPosting === true"></ons-progress-bar>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import countries from '../assets/countries';
import ages from '../assets/ages';
import router from '../router';
import { WEB_API_URL } from '../../.env';
import { USER_ROLE } from '../constants';

const emailRegExp = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/;
const passwordMinLength = 6;
const passwordMaxLength = 29;

function postSignUp() {
  const data = {
    email: this.email,
    password: this.password,
    gender: this.selectedGender,
    country_of_residence: this.selectedCountryOfResidence,
    age: this.selectedAge.split('-')[0].slice(1),
    role: USER_ROLE,
  };
  this.confirmDialogVisible = false;
  this.signUpPosting = true;
  axios.post(`${WEB_API_URL}/v1/users`, data)
        .then((response) => {
          window.localStorage.setItem('access_token', response.data.access_token);
          this.signUpPosting = false;
          ons.notification.alert({
            title: 'ユーザ登録が完了しました',
            message: '外国人から送られてくる困りごとを解決しましょう！',
            callback: () => {
              router.push('/');
            },
          });
        }).catch((error) => {
          let title;
          let message;
          if (!error.response) {
            title = '接続エラー';
            message = 'サーバーに接続できません';
          } else if (error.response.status === 422) {
            title = 'Emailエラー';
            message = 'このEmailアドレスは既に登録されています';
          }
          ons.notification.alert({
            title,
            message,
          });
          this.signUpPosting = false;
        });
}

export default {
  name: 'sign-up',
  data() {
    return {
      selectedGender: 'male',
      genders: ['male', 'female'],
      countries,
      selectedCountryOfResidence: 'Japan',
      ages,
      selectedAge: 'a20-29',
      email: '',
      password: '',
      confirmPassword: '',
      emailIsInputted: false,
      passwordIsInputted: false,
      confirmPasswordIsInputted: false,
      confirmDialogVisible: false,
      signUpPosting: false,
    };
  },
  computed: {
    validation() {
      return {
        emailRequired: this.email !== '',
        emailFormat: emailRegExp.test(this.email),
        passwordRequired: this.password !== '',
        passwordLength: passwordMinLength <= this.password.length
                        && this.password.length <= passwordMaxLength,
        confirmPasswordMatch: this.confirmPassword === this.password,
      };
    },
    signUpIsPermitted() {
      return this.validation.emailRequired && this.validation.emailFormat
             && this.validation.passwordRequired && this.validation.passwordLength
             && this.validation.confirmPasswordMatch && !this.signUpPosting;
    },
  },
  methods: {
    toLogin() {
      router.push('login');
    },
    postSignUp,
  },
  created() {
    this.$watch('email', () => {
      if (!this.emailIsInputted) {
        this.emailIsInputted = true;
      }
    });
    this.$watch('password', () => {
      if (!this.passwordIsInputted) {
        this.passwordIsInputted = true;
      }
    });
    this.$watch('confirmPassword', () => {
      if (!this.confirmPasswordIsInputted) {
        this.confirmPasswordIsInputted = true;
      }
    });
  },
};
</script>

<style>
.width100 {
  width: 100%;
}
.text-input__container > input {
  width: 100%;
}
.select-input {
  color: #1f1f21;
}
.error-message {
  color: red;
  font-size: 13px;
}
.white-btn {
  color: #fff;
  border-color: #fff;
}
.login-btn {
  font-size: small;
  margin-right: 5px;
}
</style>
