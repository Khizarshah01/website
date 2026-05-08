// API Configuration for Frontend
// Automatically switches between local and production environments

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const API_BASE_URL = `${baseURL}/api`;

console.log("🔗 Backend URL:", API_BASE_URL);

export default API_BASE_URL;
