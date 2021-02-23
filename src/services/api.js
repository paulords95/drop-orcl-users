import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.2.52",
});

export default api;
