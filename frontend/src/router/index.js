import Vue from "vue";
import VueRouter from "vue-router";
import ErrorPage from "../components/pages/ErrorPage.vue";
import HomePage from "../components/pages/HomePage.vue";
import SignUpPage from "../components/pages/SignUpPage.vue";
import Dashboard from "../components/pages/Dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage
  },
  {
    path: "/signup",
    name: "SignUpPage",
    component: SignUpPage
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "*",
    name: "Error",
    component: ErrorPage
  }
];

const router = new VueRouter({
  routes
});

export default router;
