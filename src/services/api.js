import axios from "axios";

const api = axios.create({
  baseURL: "http://qcolweb01.quimtia.net.br:5001",
});

export default api;
