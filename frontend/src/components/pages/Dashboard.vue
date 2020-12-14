<template>
  <div class="dashboard">
    <b-icon class="menu-icon" icon="three-dots" font-scale="3" v-b-toggle.sidebar-1></b-icon>
    <SideMenu></SideMenu>
    <GoogleMap></GoogleMap>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

import GoogleMap from "../templats/GoogleMap";
import SideMenu from "../organisms/SideMenu";
export default {
  name: "Dashboard",
  components: {
    GoogleMap,
    SideMenu,
  },
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  }
};
</script>
