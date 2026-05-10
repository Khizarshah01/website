import axios from "axios";
import API_BASE_URL from "../config/api";
import { clearStoredAuth } from "./authStorage";

/**
 * Centralized Axios Instance
 * Automatically uses correct backend URL (local or production)
 * Handles authentication and common configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Keep legacy token headers from breaking cookie-based auth, and let the
// browser add multipart boundaries for FormData uploads.
apiClient.interceptors.request.use((config) => {
  const authHeader = config.headers?.Authorization;
  if (
    typeof authHeader === "string" &&
    /^Bearer\s+(null|undefined)?\s*$/i.test(authHeader)
  ) {
    if (typeof config.headers.delete === "function") {
      config.headers.delete("Authorization");
    } else {
      delete config.headers.Authorization;
    }
  }

  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    if (typeof config.headers.delete === "function") {
      config.headers.delete("Content-Type");
    } else {
      delete config.headers["Content-Type"];
    }
  }

  return config;
});

// Interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.skipAuthRedirect) {
      clearStoredAuth();
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
