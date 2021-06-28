<template>
  <div
    class="
      posts
      container
      is-align-items-center is-flex is-flex-direction-column
      mt-3
    "
  >
    <router-link
      v-if="isUser.role === ROLE_READER && isAuth"
      to="/add"
      tag="button"
      class="mb-4 p-3 is-primary button"
    >
      Добавить пост
    </router-link>
    <posts-card
      v-for="post of posts"
      :key="post.id"
      :title="post.title"
      :text="post.description"
      :claps="post.claps"
      :createdAt="post.createdAt"
      :updateAt="post.updateAt"
      :userId="post.userId"
      :id="post.id"
      @incrementClaps="incrementClaps"
      @deletePost="deletePost"
    />
    <pagination-page
      v-if="countPosts > 10"
      @checkPage="checkPage"
      :total="countPosts"
      :page="page"
    />
  </div>
</template>

<script>
import PostsCard from "../components/PostsCard";
import Services from "../server/Services";
import PaginationPage from "../components/PaginationPage";
import { mapGetters } from "vuex";
import { ROLE_READER } from "../store/consts/roles";
export default {
  name: "Home",
  data() {
    return {
      ROLE_READER,
      posts: [],
      limit: 10,
      page: 1,
      countPosts: 0,
    };
  },
  components: {
    PaginationPage,
    PostsCard,
  },

  computed: {
    ...mapGetters({
      isAuth: "getIsAuth",
      isUser: "getUser",
    }),
  },

  methods: {
    incrementClaps(id) {
      const post = this.posts.find((el) => el.id === id);
      Services.updateClaps(id, ++post.claps);
    },

    async deletePost(id) {
      await Services.deletePost(id);
      this.posts = this.posts.filter((post) => post.id !== id);
      await this.getCountPosts(this.page);
    },

    async getAllPosts(page) {
      const { data, headers } = await Services.getPosts(page);
      this.posts = data;
      this.countPosts = +headers["x-total-count"];
    },

    async getCountPosts(page) {
      const { headers } = await Services.getPosts(page);
      this.countPosts = +headers["x-total-count"];
    },

    checkPage(page) {
      this.page = page;
      this.getAllPosts(this.page);
    },
  },

  watch: {
    async posts(value) {
      if (!value.length) {
        this.page -= 1;
        await this.getAllPosts(this.page);
      }
    },
  },

  async created() {
    await this.getAllPosts(this.page);
  },
};
</script>
