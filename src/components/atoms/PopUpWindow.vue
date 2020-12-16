<template>
  <div class="pop-up-window">
    <b-card>
      <div class="card-icon">
        <slot name="card-icon"></slot>
      </div>
      <b-card-text>
        <div class="card-text">
          <slot name="text"></slot>
        </div>
      </b-card-text>
        <div class="card-button">
        <slot name="button"></slot>
         </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PopUpWindow"
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/components/atoms/_pop_up_window";
</style>
