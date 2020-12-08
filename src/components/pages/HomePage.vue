<template>
  <div>
    sign-in
    <b-form id="sign-in">
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
    link to
    <router-link to="/signup"> Sign up</router-link>
  </div>
</template>

<script>
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
  }
};
</script>
