<template>
  <div class="save-button" @click="handleClick">
    <b-button :variant="color" pill>
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
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>
