<template>
  <div>
    userHome google map hehe
    <GmapMap
      :center="{ lat: 52.516389, lng: 13.3775 }"
      :zoom="17"
      map-type-id="terrain"
      style="width: 100%; height: 100vh"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.location"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
      <gmap-info-window
        :key="m.id"
        v-for="m in markers"
        :position="m.location"
        :opened="true"
        :options="{
          pixelOffset: {
            width: 0,
            height: -35
          }
        }"
      >
        <div class="info-window-style">
          <div>{{ m.content }}</div>
          <SaveButtons>RENT BIKE?</SaveButtons>
        </div>
      </gmap-info-window>
    </GmapMap>
  </div>
</template>

<script>
import SaveButtons from "../atoms/SaveButtons.vue";
export default {
  name: "UserTopPage",
  components: {
    SaveButtons
  },
  data() {
    return {
      markers: [
        { id: "01", location: { lat: 52.516389, lng: 13.3775 }, content: "bundesland hehe" },
        { id: "02", location: { lat: 52.516589, lng: 13.3275 }, content: "TU hehe" }
      ]
    };
  }
};
</script>
