<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Sign up</div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-header>
          Email
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="Email" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
          Password
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="Password" type="password" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
          Confirm Password
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="Confirm Password" type="password" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        Gender
      </v-ons-list-header>
      <v-ons-list-item v-for="(gender, $index) in genders" tappable>
        <label class="left">
          <v-ons-input type="radio" :input-id="'radio-' + $index" :value="gender" v-ons-model="selectedGender"></v-ons-input>
        </label>
        <label :for="'radio-' + $index" class="center">{{ gender }}</label>
      </v-ons-list-item>
      <v-ons-list-header>
        Nationality
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-select class="form-select" v-ons-model="selectedNationality">
            <option v-for="Nationality in countries" :value="Nationality.name">{{ Nationality.name }}</option>
          </v-ons-select>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import countries from '../assets/countries';

export default {
  name: 'sign-up',
  data() {
    return {
      selectedGender: 'male',
      genders: ['male', 'female'],
      countries,
      selectedNationality: 'Japan',
    };
  },
};
</script>

<style>
.form-select {
  width: 100%;
}
.select-input {
  color: #1f1f21;
}
</style>
