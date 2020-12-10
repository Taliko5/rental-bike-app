<template>
  <div class="dashboard">
    <div class="logout-wrapper">log out</div>
    <GoogleMap></GoogleMap>
  </div>
</template>

<script>
import GoogleMap from "../templats/GoogleMap";
export default {
  name: "Dashboard",
  components: {
    GoogleMap
  }
};
</script>
<style lang="scss" scoped></style>
