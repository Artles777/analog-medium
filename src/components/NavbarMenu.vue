<template>
  <b-navbar class="container">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h2 class="is-size-2">Medium</h2>
      </b-navbar-item>
    </template>

    <template #end v-if="!isAuth">
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link to="/registration" class="button is-primary">
            <strong>Зарегистрироваться</strong>
          </router-link>
          <router-link to="/login" class="button is-light">Войти</router-link>
        </div>
      </b-navbar-item>
    </template>
    <template #end v-else>
      <div class="buttons">
        <p class="has-text-grey mb-2 mr-3">{{ user.login }}</p>
        <b-button type="is-primary" outlined @click="logoutUser"
          >Выйти</b-button
        >
      </div>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { ADD_POST_NAME, EDIT_POST_NAME } from "../store/consts/names";

export default {
  name: "NavbarMenu",
  computed: {
    ...mapGetters({
      isAuth: "getIsAuth",
      user: "getUser",
    }),
  },

  methods: {
    ...mapMutations(["authUser"]),

    logoutUser() {
      localStorage.removeItem("jwtToken");
      this.authUser(false);
      if (
        this.$route.name === ADD_POST_NAME ||
        this.$route.name === EDIT_POST_NAME
      ) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped></style>
