<template>
  <b-form id="registration">
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
    <SubmitButtons>Registration</SubmitButtons>
  </b-form>
</template>

<script>
import SubmitButtons from "../atoms/Submitbuttons";
import TextInput from "../atoms/TextInput";

export default {
  name: "SubmitForm",
  components: {
    SubmitButtons,
    TextInput
  },
  data() {
    return {
      email: {
        id: "registration_email",
        value: "",
        inputType: "email",
        label: "email"
      },
      password: {
        id: "registration_password",
        value: "",
        inputType: "password",
        label: "password"
      }
    };
  }
};
</script>
