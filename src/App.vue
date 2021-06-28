<template>
  <div id="app" ref="app" :closable="false">
    <div v-if="!loading.isActive">
      <navbar-menu />
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarMenu from "./components/NavbarMenu";
import Services from "./server/Services";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "App",
  components: { NavbarMenu },
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    $route(to) {
      if (to.path === "/") return;
      this.$store.dispatch("changeRoute", to.path);
    },
  },
  methods: {
    ...mapActions(["updateUser", "updateRole"]),
    ...mapMutations(["authUser"]),

    open() {
      this.loading = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.app.$el,
      });
    },
  },
  async mounted() {
    this.open();
    await Services.authCheck()
      .then((data) => {
        this.updateUser(data);
        this.authUser(true);
      })
      .finally(() => this.loading.close());
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
