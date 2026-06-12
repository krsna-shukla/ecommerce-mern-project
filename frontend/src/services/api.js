import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-mern-project-dimt.onrender.com/api",
});

export default API;
