import Vue from "vue";
import Vuex from "vuex";
import { LOGIN_ROUTE } from "./consts/routes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAuth: false,
    user: {},
  },
  mutations: {
    changeRoute(state, route) {
      state.isLogin = route === LOGIN_ROUTE;
    },

    authUser(state, value) {
      state.isAuth = value;
    },

    pushUser(state, data) {
      state.user = data;
    },
  },
  actions: {
    changeRoute({ commit }, route) {
      commit("changeRoute", route);
    },

    updateUser({ commit }, data) {
      commit("pushUser", data);
    },
  },
  modules: {},
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    },

    getIsAuth(state) {
      return state.isAuth;
    },

    getUser(state) {
      return state.user;
    },
  },
});
