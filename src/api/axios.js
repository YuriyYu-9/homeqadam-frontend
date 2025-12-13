import axios from "axios";
import { getToken } from "../store/tokenStorage";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

/**
 * 🔐 Authorization interceptor
 */
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * ⬅️ Возвращаем ТОЛЬКО data
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;
