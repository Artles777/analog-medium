<template>
  <form @submit.prevent="addPostHandler" class="mt-4 container mx-auto add p-6">
    <b-field label="Название поста" label-position="on-border">
      <b-input maxlength="100" v-model="title"></b-input>
    </b-field>
    <b-field label="Описание" label-position="on-border">
      <b-input maxlength="2000" type="textarea" v-model="description"></b-input>
    </b-field>
    <button class="button is-primary is-outlined" type="submit">
      Создать пост
    </button>
  </form>
</template>

<script>
import Services from "../server/Services";

export default {
  name: "AddPost",
  data() {
    return {
      title: "",
      description: "",
    };
  },

  methods: {
    async addPostHandler() {
      await Services.addPost({
        title: this.title,
        description: this.description,
      }).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped>
.add {
  width: 40rem;
  border: 1px solid #7957d5;
  border-radius: 0.25rem;
}
</style>
