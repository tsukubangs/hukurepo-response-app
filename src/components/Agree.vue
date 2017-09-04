<template>
  <v-ons-page>
    <div id="agreement" style="margin: 8%">
      <h2>Agreement</h2>
        <p>This application is a research entitled “Problem finding and solving for foreign visitors using a smartphone application,” which includes the summary and methods of study, necessity of human subjects’ participation, possible risks and safety issues associated with participation in the study, measures to prevent anticipated harm, and protection of personal information?along with a video recording.<br></p>

        <p>I understand that I will not be penalized in any way if I do not consent to participate in the study, and I am free to withdraw my consent at any time without any penalty. I also understand that I am free to withdraw my consent for any data that I provide for use in this study at any time before the date specified below, even after completion of the study and experiments (if applicable). <br></p>

        <p>I agree to participate in the research study with the above understanding.</p>

        <h3 class="blue">Do you agree to the above consent form?</h3>
  </div>
    <div id="button">
      <p style="margin:20px;">
        <ons-button style="margin-right: 10%;" modifier="light" @click="toInit()">N O</ons-button>
        <ons-button modifier="cta" @click="toSignUp()">YES</ons-button>
      </p>
    </div>

  </v-ons-page>
</template>

<script>
import router from '../router';
import CustomToolbar from './CustomToolbar';

export default {
  name: 'agree-page',
  components: {
    CustomToolbar,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    toSignUp() {
      router.push('sign-up');
    },
    toInit() {
      router.push('init');
    },
  },
};
</script>

<style scoped>

#button {
text-align:center;
margin: 10px;
}

ons-dialog:not([modifier='material']) p {
  margin-left: 10px;
  margin-right: 10px;
}

input {
  width: 100%;
}

div.button {
text-align:center;
}
div.button input {
margin: 0px 20px;
}

.button--outline {
  background-color: white;
  color: #01a8ec;
}

h3.blue {
  color: #01a8ec;
}

</style>
