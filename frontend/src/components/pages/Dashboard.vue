<template>
  <div class="dashboard">
    <button class="logout-wrapper" @click="logOut">log out</button>
    <GoogleMap></GoogleMap>
  </div>
</template>

<script>
import firebase from "firebase";
import GoogleMap from "../templats/GoogleMap";
export default {
  name: "Dashboard",
  components: {
    GoogleMap
  },
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
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
<style lang="scss" scoped></style>
