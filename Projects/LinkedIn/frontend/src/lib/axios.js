import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:9080/api",
  withCredentials: true, // Sends HTTP cookies with requests
});

export default API;
