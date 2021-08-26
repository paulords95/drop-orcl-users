import axios from "axios";

const api = axios.create({
  baseURL: "http://qcolweb01.quimtia.net.br:5000",
});

export default api;
