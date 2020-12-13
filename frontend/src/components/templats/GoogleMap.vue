<template>
  <div class="google-map-wrapper">
    <GmapMap
      :center="center"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 50%; height: 60vh"
      :options="gmapMapOptions"
    >
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.location"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      /> -->
      <cluster>
        <gmap-custom-marker :key="index" v-for="(m, index) in markers" :marker="m.location">
          <!-- if the bike is rented by another user change maker color -->
          <img
            v-if="!m.renting"
            class="img"
            src="@/assets/img/icons/marker_red.svg"
            @click="toggleInfoWindow(m, index)"
          />
          <img
            v-if="m.renting && m.renitng_user_email !== userInfo.email"
            class="img"
            src="@/assets/img/icons/marker_black.svg"
            @click="toggleInfoWindow(m, index)"
          />
          <img
            v-if="m.renting && m.renitng_user_email === userInfo.email"
            class="img"
            src="@/assets/img/icons/marker_white.svg"
            @click="toggleInfoWindow(m, index)"
          />
        </gmap-custom-marker>
      </cluster>
      <GmapInfoWindow
        :position="infoWinPos"
        :opened="infoWinIsOpen"
        @closeclick="infoWinIsOpen = false"
        :options="infoWinOptions"
      >
        <div class="info-window-style" v-if="!bikeIsRenting">
          <div v-html="chosenBikeName"></div>
          <SaveButtons @click="rentingBike">RENT BIKE?</SaveButtons>
        </div>
        <div class="info-window-style" v-if="bikeIsRenting">
          another user renting bike
        </div>
      </GmapInfoWindow>
    </GmapMap>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../firebaseInit";
import "firebase/database";
import "firebase/storage";
import SaveButtons from "../atoms/SaveButtons.vue";
import GmapCustomMarker from "vue2-gmap-custom-marker";
export default {
  name: "GoogleMap",
  components: {
    SaveButtons,
    "gmap-custom-marker": GmapCustomMarker
  },
  data() {
    return {
      userInfo: {},
      markers: [],
      //TODO demo marker list. next the center will be user's location point
      center: { lat: 52.516389, lng: 13.3775 },
      gmapMapOptions: {
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      },
      infoWinIsOpen: false,
      infoWinPos: {
        lat: 0,
        lng: 0
      },
      chosenBikeId: "",
      chosenBikeName: "",
      bikeIsRenting: false,
      userIsRentingBike: false,
      currentMarkerIdx: null,
      infoWinOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  // beforeRouteEnter (to, from, next) {
  //   db.collection('renting_list').where('user_email', '==', this.userInfo.Email).get().then(querySnapshot => {

  //   })
  // },
  created() {
    //getting bicycle data from firebase
    db.collection("bicycle")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            bikeName: doc.data().name,
            location: { lat: doc.data().lat, lng: doc.data().lng },
            renting: doc.data().rented,
            renitng_user_email: doc.data().renitng_user_email
          };
          this.markers.push(data);
        });
      });

    const user = firebase.auth().currentUser;
    if (user) {
      console.log(user.email);
      const data = {
        email: user.email
      };
      this.userInfo = data;
    } else {
      console.log("no user info");
    }
  },
  methods: {
    // looking for identified id and not renting and change InfoWindowIsOpen to open infowindow
    toggleInfoWindow(clickedMarker, index) {
      this.infoWinPos = clickedMarker.location;
      if (this.currentMarkerIdx === index) {
        this.chosenBikeId = clickedMarker.id;
        this.bikeIsRenting = clickedMarker.renting;
        this.chosenBikeName = clickedMarker.bikeName;
        this.infoWinIsOpen = !this.infoWinIsOpen;
      } else {
        this.infoWinIsOpen = true;
        this.currentMarkerIdx = index;
      }
    },
    //update the bike's rent infos rented:true retuned:false (defaut, renred:flase, returned:true)
    async updateRentedBikeInfo() {
      try {
        const data = db.collection("bicycle").doc(this.chosenBikeId);
        await data
          .update({
            rented: true,
            retuned: false,
            renitng_user_email: this.userInfo.email
          })
          .then(bike => {
            console.log("update bike's Info:", bike);
          });
      } catch (error) {
        console.log("error by ubdationg bike info:", error);
      }
    },
    async addRentingBikeList() {
      try {
        //getting current user
        const user = await firebase.auth().currentUser;
        // const bike = await firestore().collection("users").doc(`id/${this.bike.id}`);
        //chosen bike's path
        const bike = db.doc(`id/${this.chosenBikeId}`);
        // adding data
        const data = {
          user_email: user.email,
          bicycle_id: bike,
          bike_name: this.chosenBikeName,
          lat: this.infoWinPos.lat,
          lng: this.infoWinPos.lng,
          start_time: firebase.firestore.FieldValue.serverTimestamp()
        };
        // add a new data to the 'renting_list' in DB
        const list = await db.collection("renting_list").add(data);
        console.log(list, " add a rent list succsess!");
      } catch (error) {
        console.error("Error by adding renting_bike list: ", error);
      }
    },
    changemarkerInfo() {
      db.collection("bicycle")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              bikeName: doc.data().name,
              location: { lat: doc.data().lat, lng: doc.data().lng },
              renting: doc.data().rented,
              renitng_user_email: doc.data().renitng_user_email
            };
            this.markerss.splice(0).push(data);
          });
        });
    },

    rentingBike() {
      this.addRentingBikeList();
      this.updateRentedBikeInfo();
      this.changemarkerInfo();
      this.$router.replace("/dashboard/renting");
    }
  }
};
</script>
<style lang="scss" scoped>
.img {
  width: 40px;
}
</style>
// { // id: "01", // chosenBikeName: "mike", // location: { lat: 52.516389, lng: 13.3775 }, //
content: "bundesland hehe", // renting: false // }, // { // id: "02", // chosenBikeName: "Neko", //
location: { lat: 52.516589, lng: 13.3275 }, // content: "TU hehe", // renting: false // }, // { //
id: "03", // chosenBikeName: "Inu", // location: { lat: 52.516489, lng: 13.3575 }, // content: "TU
hehe", // renting: true // }
