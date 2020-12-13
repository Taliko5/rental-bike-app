<template>
  <div>
    Sign up
    <div class="error-message">{{ error }}</div>
    <b-form id="sign-up" @submit.prevent="signUp">
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
import firebase from "firebase";
import moduleName from "firebase/auth";
import SubmitButtons from "../atoms/Submitbuttons";
import TextInput from "../atoms/TextInput";

export default {
  name: "UPage",
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
    async addExtraInfoToNewUser() {
      try {
        let name, email;
        //get current user's info
        const user = await firebase.auth().currentUser;
        if (user != null) {
          email = user.email;
        }
        //and update with new infos
        user.updateProfile({
          email: user.email,
          renting_bike: false,
          returned: true
        });
        console.log("add info success", user);
      } catch (err) {
        console.log(err);
      }
    },
    async signUp() {
      try {
        const newUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email.value, this.password.value);
        console.log(newUser);
        alert(`you are Sign Up`);
        this.$router.replace({ name: "Dashboard" });
      } catch (err) {
        console.log(err);
        this.error = err.message;
      }
    }
  }
};
</script>
