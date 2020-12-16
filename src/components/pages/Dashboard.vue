<template>
  <div class="dashboard">
    <div class="menu-icon">
      <b-icon icon="three-dots" font-scale="3" v-b-toggle.sidebar-1></b-icon>
    </div>
    <SideMenu></SideMenu>
    <GoogleMap></GoogleMap>
  </div>
</template>

<script>
import firebase from "firebase";
import GoogleMap from "../templats/GoogleMap";
import SideMenu from "../organisms/SideMenu";
export default {
  name: "Dashboard",
  components: {
    GoogleMap,
    SideMenu
  },
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/page/_dashboard";
</style>
