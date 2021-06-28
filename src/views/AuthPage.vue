<template>
  <div
    class="
      container
      is-flex is-flex-direction-column is-align-items-center
      mt-6
    "
  >
    <h2 class="is-size-4">{{ isLogin ? "Авторизация" : "Регистрация" }}</h2>
    <form
      class="login mt-6"
      @submit.prevent="isLogin ? submitLogin() : submitRegistration()"
    >
      <b-field
        label="Email"
        :type="!hasErrorEmail ? 'is-danger' : 'is-success'"
        :message="
          !hasErrorEmail ? 'Вы ввели не корректный email' : 'Корректный email'
        "
      >
        <b-input type="email" v-model="email" maxlength="30" name="login">
        </b-input>
      </b-field>

      <b-field
        label="Password"
        :type="!hasErrorPassword ? 'is-danger' : 'is-success'"
        :message="
          !hasErrorPassword
            ? 'Пароль должен состоять от 6 до 20 цифровых знаков'
            : 'Корректный пароль'
        "
      >
        <b-input
          type="password"
          placeholder="Password reveal input"
          password-reveal
          v-model.number="password"
          name="password"
        >
        </b-input>
      </b-field>

      <div
        class="is-flex is-justify-content-space-between is-align-items-center"
      >
        <div>
          {{ isLogin ? "Нет аккаунта?" : "Есть аккаунта?" }}
          <router-link v-if="isLogin" to="/registration" class="has-text-info">
            Зарегистрируйтесь
          </router-link>
          <router-link v-else to="/login" class="has-text-info">
            Войдите
          </router-link>
        </div>
        <button
          type="submit"
          class="
            has-background-primary
            button
            has-text-white
            is-align-self-flex-end
          "
        >
          {{ isLogin ? "Вход" : "Регистрация" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Services from "../server/Services";
import { mapActions, mapMutations } from "vuex";
import { MAIN_ROUTE } from "../store/consts/routes";
import { ERROR_EMAIL, ERROR_PASSWORD } from "../store/consts/errors";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: null,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },

    hasErrorEmail() {
      const re = new RegExp(
        "^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$",
        "i"
      );
      return re.test(this.email);
    },

    hasErrorPassword() {
      const re = new RegExp("^\\w{6,20}$", "i");
      return re.test(this.password);
    },
  },
  methods: {
    ...mapActions(["updateUser"]),
    ...mapMutations(["authUser"]),

    async submitLogin() {
      if (!this.hasErrorEmail || !this.hasErrorPassword) return;
      const userData = await Services.login({
        login: this.email.toLowerCase(),
        password: this.password,
      });
      if (userData === ERROR_EMAIL) {
        this.alertLoginError();
      } else if (userData === ERROR_PASSWORD) {
        this.alertPasswordError();
      } else {
        this.updateUser(userData);
        this.authUser(true);
        this.$router.push(MAIN_ROUTE);
      }
    },

    async submitRegistration() {
      if (!this.hasErrorEmail || !this.hasErrorPassword) return;
      const userData = await Services.registration({
        login: this.email.toLowerCase(),
        password: this.password,
        role: "writer",
      });
      this.updateUser(userData);
      this.authUser(true);
      this.$router.push(MAIN_ROUTE);
    },

    alertLoginError() {
      this.$buefy.dialog.alert({
        title: "Предупреждение",
        type: "is-danger",
        message: "Не верный email!",
        confirmText: "Понятно",
      });
    },

    alertPasswordError() {
      this.$buefy.dialog.alert({
        title: "Предупреждение",
        type: "is-danger",
        message: "Не верный пароль!",
        confirmText: "Понятно",
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 30rem;
}
</style>
