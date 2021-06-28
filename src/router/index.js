import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import {
  ADD_POST_ROUTE,
  EDIT_POST_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
} from "../store/consts/routes";
import {
  ADD_POST_NAME,
  EDIT_POST_NAME,
  LOGIN_NAME,
  MAIN_NAME,
  REGISTRATION_NAME,
} from "../store/consts/names";
import jwtDecode from "jwt-decode";

Vue.use(VueRouter);

const routes = [
  {
    path: MAIN_ROUTE,
    name: MAIN_NAME,
    component: Posts,
  },
  {
    path: LOGIN_ROUTE,
    name: LOGIN_NAME,
    component: () => import("../views/AuthPage"),
  },
  {
    path: REGISTRATION_ROUTE,
    name: REGISTRATION_NAME,
    component: () => import("../views/AuthPage"),
  },
  {
    path: ADD_POST_ROUTE,
    name: ADD_POST_NAME,
    component: () => import("../views/AddPost"),
  },
  {
    path: EDIT_POST_ROUTE,
    name: EDIT_POST_NAME,
    component: () => import("../views/EditPost"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("jwtToken");
  if (to.path === LOGIN_ROUTE && token) {
    next(MAIN_ROUTE);
  } else if (to.path === ADD_POST_ROUTE && jwtDecode(token).role !== "reader") {
    next(MAIN_ROUTE);
  } else if (
    to.path === EDIT_POST_ROUTE &&
    jwtDecode(token).role !== "reader"
  ) {
    next(MAIN_ROUTE);
  } else {
    next();
  }
});

export default router;
