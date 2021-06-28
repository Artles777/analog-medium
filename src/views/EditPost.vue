<template>
  <form
    @submit.prevent="editPostHandler"
    class="mt-4 container mx-auto edit p-6"
  >
    <b-field label="Название поста" label-position="on-border">
      <b-input maxlength="100" v-model="title"></b-input>
    </b-field>
    <b-field label="Описание" label-position="on-border">
      <b-input maxlength="2000" type="textarea" v-model="description"></b-input>
    </b-field>
    <button class="button is-primary is-outlined" type="submit">
      Изменить пост
    </button>
  </form>
</template>

<script>
import Services from "../server/Services";

export default {
  name: "editPost",
  data() {
    return {
      title: "",
      description: "",
    };
  },

  methods: {
    async editPostHandler() {
      await Services.updatePost(this.$route.params.id, {
        title: this.title,
        description: this.description,
        updateAt: new Date(),
      }).then(() => {
        this.$router.push("/");
      });
    },
  },

  async created() {
    const { data } = await Services.getPost(this.$route.params.id);
    this.title = data.title;
    this.description = data.description;
  },
};
</script>

<style scoped>
.edit {
  width: 60rem;
}
</style>
