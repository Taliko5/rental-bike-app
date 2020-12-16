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
      default: "outline-success"
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/components/atoms/_save-buttons';
</style>
