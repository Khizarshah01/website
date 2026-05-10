import axios from "axios";
import API_BASE_URL from "../config/api";
import { clearStoredAuth, purgeLegacyAdminToken } from "./authStorage";

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

const UPLOAD_CATEGORY_VALUES = new Set([
  "about",
  "nirf",
  "academics",
  "admissions",
  "research",
  "facilities",
  "placements",
  "iqac",
  "documents",
  "activities",
  "departments",
  "other",
]);

const normalizeUploadCategory = (value = "") => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
  return UPLOAD_CATEGORY_VALUES.has(normalized) ? normalized : null;
};

const mapPathPrefixToCategory = (prefix = "") => {
  const mapping = {
    about: "about",
    nirf: "nirf",
    academics: "academics",
    admissions: "admissions",
    research: "research",
    facilities: "facilities",
    placements: "placements",
    iqac: "iqac",
    documents: "documents",
    activities: "activities",
    departments: "departments",
    contact: "about",
    news: "about",
    notices: "academics",
    events: "activities",
    gallery: "activities",
    faculty: "departments",
    alumni: "placements",
    recruiters: "placements",
    testimonials: "placements",
  };
  return mapping[prefix] || prefix;
};

const deriveCategoryFromPageId = (pageId = "") => {
  const normalized = String(pageId || "").trim().toLowerCase();
  if (!normalized) return null;
  const prefix = normalized.split("-")[0];
  return normalizeUploadCategory(mapPathPrefixToCategory(prefix));
};

const deriveUploadCategoryFromPath = (pathname = "") => {
  const cleaned = String(pathname || "")
    .split("?")[0]
    .split("#")[0]
    .trim()
    .toLowerCase();
  if (!cleaned) return null;

  const segments = cleaned.split("/").filter(Boolean);
  if (!segments.length) return null;

  if (
    segments[0] === "admin" &&
    segments[1] === "pages" &&
    segments[2] === "editor" &&
    segments[3]
  ) {
    return deriveCategoryFromPageId(segments[3]);
  }

  if (segments[0] === "admin" && segments[1] === "visual" && segments[2]) {
    return deriveCategoryFromPageId(segments[2]);
  }

  if (segments[0] === "admin" && segments[1] === "edit" && segments[2]) {
    return deriveCategoryFromPageId(segments[2]);
  }

  if (segments[0] === "admin" && segments[1]) {
    return normalizeUploadCategory(mapPathPrefixToCategory(segments[1]));
  }

  return normalizeUploadCategory(mapPathPrefixToCategory(segments[0]));
};

// Keep legacy token headers from breaking cookie-based auth, and let the
// browser add multipart boundaries for FormData uploads.
apiClient.interceptors.request.use((config) => {
  purgeLegacyAdminToken();

  if (config.allowBearerAuth !== true) {
    if (typeof config.headers?.delete === "function") {
      config.headers.delete("Authorization");
    } else if (config.headers) {
      delete config.headers.Authorization;
    }
  }

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

  const normalizedUrl = String(config.url || "").toLowerCase();
  const isScopedUploadEndpoint = /\/upload\/(image|file)(?:$|[/?#])/i.test(
    normalizedUrl,
  );

  if (!isScopedUploadEndpoint) {
    return config;
  }

  if (typeof window === "undefined") {
    return config;
  }

  const sourcePath = window.location?.pathname || "";
  const inferredCategory = deriveUploadCategoryFromPath(sourcePath) || "other";

  config.headers = config.headers || {};
  config.headers["X-Upload-Source-Path"] = sourcePath;
  config.headers["X-Upload-Category"] = inferredCategory;
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
