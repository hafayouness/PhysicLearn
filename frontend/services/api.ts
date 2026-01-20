import axios from "axios";
import { API_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token et logger les requêtes
api.interceptors.request.use(
  (config) => {
    console.log("➡️ API CALL:", config.url);
    console.log("🔐 AUTH HEADER:", config.headers?.Authorization);
    return config;
  },
  (error) => Promise.reject(error),
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const setAuthToken = (token: string | null) => {
  console.log("🟡 setAuthToken appelé avec:", token);

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
