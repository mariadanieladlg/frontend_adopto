import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005", // BACKEND PORT
  headers: {
    "Content-Type": "application/json",
  },
});

// ADD JWT TOKEN, IF EXISTS
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // SAVE AS STRING
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
