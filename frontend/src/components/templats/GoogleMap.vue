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
          <!-- avaiable bike -->
          <img
            v-if="!m.renting"
            class="img"
            src="@/assets/img/icons/marker_red.svg"
            @click="toggleInfoWindow(m, index)"
          />
          <!-- another user uses the bike -->
          <img
            v-if="m.renting && m.renitng_user_email !== userInfo.email"
            class="img"
            src="@/assets/img/icons/marker_gray.svg"
            @click="toggleInfoWindow(m, index)"
          />
          <!-- the bike user using -->
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
        <!-- info findow content-->
        <!-- another user uses the bike -->
        <div
          class="info-window-style"
          v-if="bikeIsRenting && userInfo.email !== renitng_user_email"
        >
          another user renting bike
        </div>
        <!-- while user is renting a bike show anoher bike -->
        <div
          class="info-window-style"
          v-if="!bikeIsRenting && userInfo.rentingBike && userInfo.email !== renitng_user_email"
        >
          you can not rent another bike before returning the current bike
        </div>
        <!-- avaiable bike -->
        <div class="info-window-style" v-if="!bikeIsRenting && !userInfo.rentingBike">
          <div v-html="chosenBikeName"></div>
          <SaveButtons @click="rentBike">RENT BIKE?</SaveButtons>
        </div>
        <!-- while user is renting a bike show anoher bike -->
        <div
          class="info-window-style"
          v-if="bikeIsRenting && userInfo.rentingBike && userInfo.email === renitng_user_email"
        >
          <div v-html="userInfo.bikeName"></div>
          you are now renting this bike
          <SaveButtons @click="returnBike">RETURN BIKE</SaveButtons>
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
      userInfo: { email: "", rentingBike: false, bikeId: "", startTime: "", bikeName: "" },
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
      currentMarkerIdx: null,
      infoWinOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  created() {
    // initialize marker's array
    this.markers.splice(0);
    //getting bicycle data from firebase
    db.collection("bicycle")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data().renitng_user_email);
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

    // getting user and renting_list data
    const user = firebase.auth().currentUser;
    const RentingList = db
      .collection("renting_list")
      .where("user_email", "==", user.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
          if (doc.data()) {
            const data = {
              email: doc.data().user_email,
              rentingBike: true,
              bikeName: doc.data().bike_name,
              bikeId: doc.data().bicycle_id,
              startTime: doc.data().start_time,
              bikeLocationLat: doc.data().lat,
              bikeLocationLng: doc.data().lng
            };
            this.userInfo = data;
            //if user email is not in the renting_list
            // making user info wwith rentingbike:false, user email
          } else if (!rentingData) {
            const data = {
              email: user.email,
              rentingBike: false
            };
            this.userInfo = data;
          } else {
            console.log("no user info");
          }
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

    //if user email is on the renting_list
    //  making user info wwith rentingbike:true,bike ID, email
  },
  methods: {
    // looking for identified id and not renting and change InfoWindowIsOpen to open infowindow
    toggleInfoWindow(clickedMarker, index) {
      this.infoWinPos = clickedMarker.location;
      this.bikeIsRenting = clickedMarker.renting;
      this.chosenBikeName = clickedMarker.bikeName;
      this.renitng_user_email = clickedMarker.renitng_user_email;
      if (this.currentMarkerIdx === index) {
        this.chosenBikeId = clickedMarker.id;
        this.infoWinIsOpen = !this.infoWinIsOpen;
      } else {
        this.currentMarkerIdx = index;
        this.infoWinIsOpen = true;
      }
    },
    //update the bike's rent infos rented:true retuned:false (defaut, renred:flase, returned:true)
    async updateRentedBikeInfo() {
      try {
        //getting current user
        const user = await firebase.auth().currentUser;
        const data = db.collection("bicycle").doc(this.chosenBikeId);
        await data
          .update({
            renitng_user_email: user.email,
            rented: true
          })
          .then(bike => {
            console.log("update bike's Info:", bike);
            this.$router.go({ path: "/dashboard/renting", force: true });
          });
      } catch (error) {
        console.log("error by ubdationg bike info:", error);
      }
    },
    async updateReturnedBikeInfo() {
      try {
        const data = db.collection("bicycle").doc(this.userInfo.bikeId);
        await data
          .update({
            rented: false,
            renitng_user_email: ""
          })
          .then(bike => {
            console.log("update bike's Info:", bike);
            this.initializeUserInfo();
            this.$router.go({ path: "/dashboard/returned", force: true });
          });
      } catch (error) {
        console.log("error by ubdationg bike info:", error);
      }
    },
    initializeUserInfo() {
      const user = firebase.auth().currentUser;
      const data = {
        email: user.email,
        rentingBike: false,
        bikeName: "",
        bikeId: "",
        startTime: ""
      };
      this.userInfo = data;
    },
    async addRentingBikeList() {
      try {
        //getting current user
        const user = await firebase.auth().currentUser;
        //chosen bike's path
        const bike = db.doc(`id/${this.chosenBikeId}`);
        // creating a data to add 'renting_list'
        const data = {
          user_email: user.email,
          bicycle_id: bike.id,
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
    //
    async deleteRentingBikeList() {
      const user = await firebase.auth().currentUser;
      const RentingList = await db
        .collection("renting_list")
        .where("user_email", "==", user.email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            console.log("successs delete!");
          });
        })
        .catch(function(error) {
          console.log("Error delete bilinlist: ", error);
        });
    },
    async addHistory() {
      try {
        //getting current user, bike, and rentinglist
        const user = await firebase.auth().currentUser;
        const rentingList = db.collection("renting_list").doc(`bicycle_id/${this.userInfo.bikeId}`);
        const bike = db.doc(`id/${this.userInfo.bikeId}`);
        // creating a data for adding 'history'
        const data = {
          user_email: user.email,
          bicycle_id: bike.id,
          bike_name: bike.name,
          start_lat: rentingList.lat,
          start_lng: rentingList.lng,
          start_time: this.userInfo.startTime,
          end_time: firebase.firestore.FieldValue.serverTimestamp()
        };
        // add a new data to the 'history' in DB
        const list = await db.collection("history").add(data);
        console.log(list, "add a history succsess!");
      } catch (error) {
        console.error("Error by adding history: ", error);
      }
    },
    rentBike() {
      this.addRentingBikeList();
      this.updateRentedBikeInfo();
    },
    returnBike() {
      this.addHistory();
      this.deleteRentingBikeList();
      this.updateReturnedBikeInfo();
      console.log("returned!");
    }
  }
};
</script>
<style lang="scss" scoped>
.img {
  width: 40px;
}
</style>
