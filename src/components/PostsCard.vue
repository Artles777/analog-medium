<template>
  <section class="post is-flex is-flex-direction-column p-3 mt-4">
    <div class="content">
      <h3>{{ title }}</h3>
      <p>
        {{ text }}
      </p>
    </div>
    <div class="card-footer columns m-0 is-justify-content-flex-end pt-2">
      <p class="column">{{ dateCreated }}</p>
      <template v-if="isUser.role === ROLE_WRITER && isAuth">
        <div class="buttons">
          <b-button
            type="is-primary"
            icon-left="hands-clapping"
            icon-pack="fa"
            @click="incrementClaps"
          >
            {{ claps }}
          </b-button>
        </div>
      </template>
      <template v-if="isUser.role === ROLE_READER && isAuth">
        <router-link
          tag="button"
          :to="/edit/ + id"
          class="button is-one-fifth is-bordered is-rounded"
        >
          Изменить
        </router-link>
        <button
          class="
            is-one-fifth
            button
            is-bordered is-rounded
            has-background-danger has-text-white
            ml-5
          "
          @click="deletePost"
        >
          Удалить
        </button>
      </template>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { ROLE_READER, ROLE_WRITER } from "../store/consts/roles";
export default {
  name: "PostsCard",
  data() {
    return {
      ROLE_WRITER,
      ROLE_READER,
    };
  },
  props: {
    title: {
      type: String,
      isRequired: true,
    },
    text: String,
    claps: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: String,
      isRequired: true,
      default: new Date(),
    },
    updateAt: {
      type: String,
      isRequired: true,
      default: new Date(),
    },
    userId: {
      type: Number,
      isRequired: true,
    },
    id: {
      type: Number,
      isRequired: true,
    },
  },

  computed: {
    ...mapGetters({
      isAuth: "getIsAuth",
      isUser: "getUser",
    }),

    dateCreated() {
      const currentDate = new Date(this.updateAt);
      const today = new Date();
      const days = String(
        Math.round((today - currentDate) / (60 * 60 * 24 * 1000))
      );
      if (days === "0") {
        return "Сегодня";
      } else if (days === "1") {
        return "Вчера";
      }
      if (days.match(/\d(?=\D*$)/)[0] === "1") {
        return `${days} день назад`;
      } else if (
        days.match(/\d(?=\D*$)/)[0] >= "2" &&
        days.match(/\d(?=\D*$)/)[0] < "5"
      ) {
        return `${days} дня назад`;
      } else {
        return `${days} дней назад`;
      }
    },
  },

  methods: {
    incrementClaps() {
      this.$emit("incrementClaps", this.id);
    },

    deletePost() {
      this.$emit("deletePost", this.id);
    },
  },
};
</script>

<style scoped>
.content {
  margin-bottom: 0 !important;
}
.post {
  width: 40rem;
  border: 1px solid #cccccc;
  border-radius: 0.25rem;
}
</style>
