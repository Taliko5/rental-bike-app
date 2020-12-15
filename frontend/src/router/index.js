import Vue from "vue";
import firebase from "firebase";
import db from "../components/firebaseInit";
import "firebase/database";
import "firebase/storage";
import VueRouter from "vue-router";
import ErrorPage from "../components/pages/ErrorPage.vue";
import HomePage from "../components/pages/HomePage.vue";
import SignUpPage from "../components/pages/SignUpPage.vue";
import test from '../components/atoms/generateDatas.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: {
      requiresGest: true
    }
  },
  {
    path: "/signup",
    name: "SignUpPage",
    component: SignUpPage,
    meta: {
      requiresGest: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../components/pages/Dashboard.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dashboard/:id",
    name: "Dashboard",
    component: () => import("../components/pages/Dashboard.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "rent",
        name: "Rent"
      },
      {
        path: "returned",
        name: "Returned"
      }
    ]
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  //check for requiredAuth guard
  if (requiresAuth) {
    //check if NOT LOGGED IN, redirect to the homepage
    if (!currentUser) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
