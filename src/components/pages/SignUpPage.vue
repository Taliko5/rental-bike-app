<template>
  <div>
    Sign up

    <b-form id="sign-up">
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
  }
};
</script>
