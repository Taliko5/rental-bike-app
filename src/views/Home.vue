<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <SaveButtons>hello button</SaveButtons>
    <Submitbuttons>submit</Submitbuttons>
    <TextInput />
    <SubmitForm />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import SaveButtons from "../components/atoms/SaveButtons";
import Submitbuttons from "../components/atoms/Submitbuttons.vue";
import TextInput from "../components/atoms/TextInput.vue";
import SubmitForm from "../components/organisms/SubmitForm.vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
    SaveButtons,
    Submitbuttons,
    TextInput,
    SubmitForm
  }
};
</script>
