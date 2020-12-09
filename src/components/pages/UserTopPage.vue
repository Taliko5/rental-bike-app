<template>
  <div class="user-top-page">
    <div class="logout-wrapper">log out</div>
    <GmapMap
      :center="{ lat: 52.516389, lng: 13.3775 }"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 50%; height: 60vh"
      :options="{
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      }"
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
            class="img"
            src="@/assets/img/icons/marker_red.svg"
            v-if="!m.renting"
            @click="openInfoWindow(m)"
          />
          <img
            class="img"
            src="@/assets/img/icons/marker_black.svg"
            v-if="m.renting"
            @click="openInfoWindow(m)"
          />
        </gmap-custom-marker>
      </cluster>
      <GmapInfoWindow
        @closeclick="updateiwOpen(m)"
        :key="m.id"
        v-for="m in markers"
        :position="m.location"
        :opened="m.InfoWindowIsOpen"
        :options="{
          pixelOffset: {
            width: 0,
            height: -35
          }
        }"
      >
        <div class="info-window-style" v-if="!m.renting">
          <div>{{ m.content }}</div>
          <SaveButtons>RENT BIKE?</SaveButtons>
        </div>
      </GmapInfoWindow>
    </GmapMap>
  </div>
</template>

<script>
import SaveButtons from "../atoms/SaveButtons.vue";
import GmapCustomMarker from "vue2-gmap-custom-marker";
export default {
  name: "UserTopPage",
  components: {
    SaveButtons,
    "gmap-custom-marker": GmapCustomMarker
  },
  data() {
    return {
      //demo marker list
      markers: [
        {
          id: "01",
          location: { lat: 52.516389, lng: 13.3775 },
          content: "bundesland hehe",
          renting: false,
          InfoWindowIsOpen: false
        },
        {
          id: "02",
          location: { lat: 52.516589, lng: 13.3275 },
          content: "TU hehe",
          renting: false,
          InfoWindowIsOpen: false
        },
        {
          id: "03",
          location: { lat: 52.516489, lng: 13.3575 },
          content: "TU hehe",
          renting: true,
          InfoWindowIsOpen: false
        }
      ]
    };
  },
  methods: {
    // looking for identified id and not renting and change InfoWindowIsOpen to open infowindow
    openInfoWindow(clickedaMrker) {
      return this.markers.map(m => {
        m.id === clickedaMrker.id && clickedaMrker.renting === false
          ? (m.InfoWindowIsOpen = true)
          : (m.InfoWindowIsOpen = false);
      });
    },
    // when infWindow closes InfoWindowIsOpen changes false
    updateiwOpen(m) {
      m.InfoWindowIsOpen = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.img {
  width: 40px;
}
</style>
