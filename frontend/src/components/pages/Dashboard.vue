<template>
  <div class="user-top-page">
    <div class="logout-wrapper">log out</div>
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
            v-if="m.renting"
            class="img"
            src="@/assets/img/icons/marker_black.svg"
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
          <div v-html="bikeName"></div>
          <SaveButtons>RENT BIKE?</SaveButtons>
        </div>
        <div class="info-window-style" v-if="bikeIsRenting">
          another user renting bike
        </div>
      </GmapInfoWindow>
    </GmapMap>
  </div>
</template>

<script>
import SaveButtons from "../atoms/SaveButtons.vue";
import GmapCustomMarker from "vue2-gmap-custom-marker";
export default {
  name: "Dashboard",
  components: {
    SaveButtons,
    "gmap-custom-marker": GmapCustomMarker
  },
  data() {
    return {
      //demo marker list
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
      bikeName: "",
      bikeIsRenting: false,
      userIsRentingBike: false,
      currentMarkerIdx: null,
      infoWinOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: [
        {
          id: "01",
          bikeName: "mike",
          location: { lat: 52.516389, lng: 13.3775 },
          content: "bundesland hehe",
          renting: false
        },
        {
          id: "02",
          bikeName: "Neko",
          location: { lat: 52.516589, lng: 13.3275 },
          content: "TU hehe",
          renting: false
        },
        {
          id: "03",
          bikeName: "Inu",
          location: { lat: 52.516489, lng: 13.3575 },
          content: "TU hehe",
          renting: true
        }
      ]
    };
  },
  methods: {
    // looking for identified id and not renting and change InfoWindowIsOpen to open infowindow
    toggleInfoWindow(clickedMarker, index) {
      this.infoWinPos = clickedMarker.location;
      if (this.currentMarkerIdx === index) {
        this.bikeIsRenting = clickedMarker.renting;
        this.bikeName = clickedMarker.bikeName;
        this.infoWinIsOpen = !this.infoWinIsOpen;
      } else {
        this.infoWinIsOpen = true;
        this.currentMarkerIdx = index;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.img {
  width: 40px;
}
</style>
