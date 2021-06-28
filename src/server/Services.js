import api, { authHost } from "./api.js";
import {
  POSTS_ROUTE,
  LOGIN_ROUTE,
  ADD_POST_ROUTE,
} from "../store/consts/routes.js";
import jwtDecode from "jwt-decode";

export default {
  getPosts(page) {
    return api().get(POSTS_ROUTE, { params: { _page: page } });
  },

  getUsers() {
    return api().get("/users");
  },

  async getPost(id) {
    return api().get(POSTS_ROUTE + id);
  },

  async login({ login, password }) {
    const { data, status } = await api().post(LOGIN_ROUTE, { login, password });
    if (status === 203) {
      return data;
    }
    localStorage.setItem("jwtToken", data.jwtToken);
    return jwtDecode(data.jwtToken);
  },

  findUser({ login }) {
    return api().get(`/users?login=${login}`);
  },

  createUser({ login, password, role }) {
    return api().post("/users", { login, password, role });
  },

  async registration({ login, password, role }) {
    const { data } = await api().post("/registration", {
      login,
      password,
      role,
    });
    localStorage.setItem("jwtToken", data.jwtToken);
    return jwtDecode(data.jwtToken);
  },

  async authCheck() {
    const { data } = await authHost.get("/auth");
    localStorage.setItem("jwtToken", data.jwtToken);
    return jwtDecode(data.jwtToken);
  },

  async updateClaps(id, claps) {
    return await api().patch(`/posts/${id}`, { claps });
  },

  async deletePost(id) {
    return await api().delete(`/posts/${id}`);
  },

  async createPost({ title, description, claps, createdAt, updateAt, userId }) {
    return await api().post("/posts", {
      title,
      description,
      claps,
      createdAt,
      updateAt,
      userId,
    });
  },

  async addPost({ title, description }) {
    const { id } = jwtDecode(localStorage.getItem("jwtToken"));
    return await api().post(ADD_POST_ROUTE, { title, description, userId: id });
  },

  async updatePost(id, data) {
    return await api().patch(POSTS_ROUTE + id, { ...data });
  },
};
