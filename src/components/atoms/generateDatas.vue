<template>
  <div><save-buttons @click="sendDataToDB"> add files to the DB</save-buttons></div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import db from "../firebaseInit";
import "firebase/database";
import "firebase/storage";
import SaveButtons from "./SaveButtons";
export default {
  name: "genarateDates",
  components: {
    SaveButtons
  },
  data() {
    return {
      markers: [],
      colorsList: []
    };
  },
  mounted() {
    axios //color name api https://www.npmjs.com/package/color-name-list?activeTab=readme
      .get("https://unpkg.com/color-name-list@7.24.0/dist/colornames.bestof.json")
      .then(response => {
        let lists = response.data;
        // to get different index so that not only capital A oe B's name on the list
        for (let i = 0; i < 10; i++) {
          this.colorsList.push(lists[i].name);
        }
        for (let i = 500; i < 520; i++) {
          this.colorsList.push(lists[i].name);
        }
        for (let i = 704; i < 710; i++) {
          this.colorsList.push(lists[i].name);
        }
        for (let i = 1507; i < 1510; i++) {
          this.colorsList.push(lists[i].name);
        }
        for (let i = 1802; i < 1820; i++) {
          this.colorsList.push(lists[i].name);
        }
        for (let i = 1950; i < 1960; i++) {
          this.colorsList.push(lists[i].name);
        }
        for (let i = 1987; i < 2020; i++) {
          this.colorsList.push(lists[i].name);
        }
        for (let i = 2021; i < 2041; i++) {
          this.colorsList.push(lists[i].name);
        }
      });
    // api city bike  https://citybik.es/
    axios.get("http://api.citybik.es//v2/networks/nextbike-berlin").then(response => {
      let lists = response.data.network.stations;
      for (let i = 0; i < 100; i++) {
        const data = {
          lat: lists[i].latitude,
          lng: lists[i].longitude,
          bikeName: this.colorsList[i],
          renitng_user_email: "",
          rented: false
        };
        this.markers.push(data);
      }
      console.log(this.markers);
    });
  },
  methods: {
    async sendDataToDB() {
      try {
        let n = 0;
        while (n < 70) {
          n++;
          const data = {
            lat: this.markers[n].lat,
            lng: this.markers[n].lng,
            bike_namne: this.markers[n].bikeName,
            renitng_user_email: "",
            rented: false
          };
          const list = await db.collection("bicycle").add(data);
        }

      } catch (err) {
        console.log("err by sending data to db:", err);
      }
    }
  }
};
</script>
