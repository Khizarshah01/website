// API Configuration for Frontend
// Supports both:
// - local dev proxy mode (default => /api)
// - explicit backend host mode via VITE_BACKEND_URL
const normalizeBackendBase = (value = "") => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return raw.replace(/\/+$/g, "").replace(/\/api$/i, "");
};

const configuredBackendBase = normalizeBackendBase(
  import.meta.env.VITE_BACKEND_URL,
);
const API_BASE_URL = configuredBackendBase
  ? `${configuredBackendBase}/api`
  : "/api";

export default API_BASE_URL;
