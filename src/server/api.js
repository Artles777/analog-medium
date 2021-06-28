import axios from "axios";
import { BASE_ROUTE_API } from "../store/consts/base.js";

const authItc = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("jwtToken")}`;
  return config;
};

export default () =>
  axios.create({
    baseURL: BASE_ROUTE_API,
  });

export const authHost = axios.create({
  baseURL: BASE_ROUTE_API,
});

authHost.interceptors.request.use(authItc);
