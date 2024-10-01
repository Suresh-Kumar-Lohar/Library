import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:8022/api",
});

// Automatically add Authorization header using interceptors
customFetch.interceptors.request.use(
  (config) => {
    let data = localStorage.getItem("user");
    data = JSON.parse(data)
    if (data?.token) {
      config.headers.Authorization = data.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customFetch;
