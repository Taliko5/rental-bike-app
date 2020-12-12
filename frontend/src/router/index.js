import Vue from "vue";
import firebase from "firebase";
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
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dashboard/rent",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dashboard/returned",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
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
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  let currentUser = firebase.auth().currentUser;
  //check for requiredAuth guard
  if (requiresAuth) {
//check if NOT LOGGED IN, redirect to the homepage
    if (!currentUser) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    }else {
      next();
    }
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});


export default router;
