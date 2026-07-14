import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-anz2.onrender.com",
});

export default API;
