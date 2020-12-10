import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import * as VueGoogleMaps from "vue2-google-maps";
import MarkerClusterer from "js-marker-clusterer";
import App from "./App.vue";
import router from "./router";
import GmapCluster from "gmap-vue/dist/components/cluster";
import axios from 'axios';
import firebase from 'firebase/app';


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

const firebaseConfig = {
  apiKey: "AIzaSyCfgKpals2Iz4zFTSZBXZ2G2K5xAXpq9YY",
  authDomain: "sharering-bike-app.firebaseapp.com",
  projectId: "sharering-bike-app",
  storageBucket: "sharering-bike-app.appspot.com",
  messagingSenderId: "976141908215",
  appId: "1:976141908215:web:724c186b6f4f27b1ca3bf2",
  measurementId: "G-PGNMZ1DDKQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
