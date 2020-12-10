<template>
  <div class="save-button">
    <b-button :variant="color" pill :callback="callback">
      <slot></slot>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "SaveButtons",
  props: {
    color: {
      type: String,
      require: false,
      default: "primary"
    }
  },
  methods: {
    onClick(e) {
      if (typeof this.callback === "function") {
        const result = this.callback(e);
        if (result !== undefined) {
          return result;
        }
        return true;
      }
      return false;
    }
  }
};
</script>
