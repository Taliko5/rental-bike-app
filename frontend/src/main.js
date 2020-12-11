import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
//google map
import * as VueGoogleMaps from "vue2-google-maps";
import MarkerClusterer from "js-marker-clusterer";
import GmapCluster from "gmap-vue/dist/components/cluster";
import App from "./App.vue";
import router from "./router";
import axios from 'axios';

//bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
Vue.use(MarkerClusterer);
Vue.component("cluster", GmapCluster);
Vue.prototype.$axios = axios;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDlMQGzgDMRY7lQbJM3QFjueKJNWklkoBA",
    libraries: "places" // This is required if you use the Autocomplete plugin
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
