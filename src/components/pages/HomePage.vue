<template>
  <div id="home-page">
    <div class="sign-in-container container col-11 col-md-5">
      <div class="sign-in_logo_wrapper">
        <div class="logo-wrapper">
          <img src="../../assets/palett-icon.svg" alt="logo" />
        </div>
        <h1>color-picker-bike</h1>
      </div>
      <h3>Sign in</h3>
      <div class="error-message">{{ error }}</div>
      <b-form id="sign-in" @submit.prevent="signIn">
        <TextInput
          :idName="email.id"
          :inputType="email.inputType"
          :label="email.label"
          :value="email.value"
          @input="email.value = $event"
        />
        <TextInput
          :idName="password.id"
          :inputType="password.inputType"
          :label="password.label"
          v-model="password.value"
        />
        <SubmitButtons>Sign in</SubmitButtons>
      </b-form>
      Have an account?
      <router-link to="/signup"> Sign up</router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import SubmitButtons from "../atoms/Submitbuttons";
import TextInput from "../atoms/TextInput";

export default {
  name: "SignUpPage",
  components: {
    SubmitButtons,
    TextInput
  },
  data() {
    return {
      error: "",
      email: {
        id: "sign-in_email",
        value: "",
        inputType: "email",
        label: "email"
      },
      password: {
        id: "sign-in_password",
        value: "",
        inputType: "password",
        label: "password"
      }
    };
  },
  methods: {
    async signIn() {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email.value, this.password.value);
        console.log(user);
        alert(`you are logged in`);
        this.$router.replace({ name: "Dashboard" });
      } catch (err) {
        console.log(err);
        this.error = err.message;
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/page/_home_page";
</style>
