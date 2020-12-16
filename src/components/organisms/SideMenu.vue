<template>
  <div>
    <b-sidebar id="sidebar-1" shadow>
      <div class="sidebar-menu">
        <p>history(coming soon...)</p>
        <p>setting(coming soon..)</p>
        <p class="logout-wrapper" @click="logOut">log out</p>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../firebaseInit";
import "firebase/database";
import "firebase/storage";
export default {
  name: "SideMenu",
  methods: {
    async logOut() {
      try {
        const user = await firebase.auth().signOut();
        console.log("logout", user);
        alert(`you are logged out`);
        this.$router.replace({ name: "HomePage" });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/components/organisms/_siede_menu";
</style>
