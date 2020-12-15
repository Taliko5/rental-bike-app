<template>
  <div class="pop-up-window">
    <b-card>
      <div class="card-icon">
        <slot name="card-icon"></slot>
      </div>
      <b-card-text>
        <slot name="text"></slot>
      </b-card-text>
      <b-card-text>
        <slot name="button"></slot>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PopUpWindow"
};
</script>
