<template>
  <div>
    Sign up
    <div class="error-message" v-if="error">{{ error.message }}</div>
    <b-form id="sign-up" @submit.prevent="createUser">
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
      <SubmitButtons>Sign up</SubmitButtons>
    </b-form>
    link to<router-link to="/home"> Sign in</router-link>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import moduleName from "firebase/auth";
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
        id: "sign-up_email",
        value: "",
        inputType: "email",
        label: "email"
      },
      password: {
        id: "sign-up_password",
        value: "",
        inputType: "password",
        label: "password"
      }
    };
  },
  methods: {
    async createUser() {
      try {
        const newUser = firebase
          .auth()
          .createUserWithEmailAndPassword(this.email.value, this.passwor.value);
        console.log(user);
        this.$router.replace({ name: "dashboard" });
        concole.log();
        alert("submitted");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
