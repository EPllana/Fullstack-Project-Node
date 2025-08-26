// src/services/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.100.110:3000/api",
  });
  

export default api;
