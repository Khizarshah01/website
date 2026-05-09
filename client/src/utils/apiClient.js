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
