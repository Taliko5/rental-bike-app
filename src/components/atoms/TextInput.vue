<template>
  <div class="text-input">
    <b-form-group :label="label" :label-for="idName" :description="description">
      <b-form-input
        required
        placeholder=""
        :type="inputType"
        :id="idName"
        :name="idName"
        @input="updateValue"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    label: {
      type: String
    },
    description: {
      type: String
    },
    idName: {
      type: String
    },
    inputType: {
      type: String
    },
    value: {
      type: String
    }
  },
  methods: {
    updateValue(e) {
      //implementing an event during input
      this.$emit("input", e);
    }
  }
};
</script>
