import axios from "axios";
import { LoginRequest } from "../types/requests";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: "Bearer " + token,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response.status === 401) {
      if (localStorage.getItem("token")) localStorage.removeItem("token");
    }
  }
);

export const api = {
  login: async ({ email, password }: LoginRequest) => {
    try {
      const response = await axios.post("/Authorization/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (err) {
      alert(err);
    }
  },

  getClassrooms: async () => {
    try {
      const response = await axios.get("/classroom");
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
};
