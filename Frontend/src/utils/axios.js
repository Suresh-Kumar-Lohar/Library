import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:8022/api"
});

export default customFetch;