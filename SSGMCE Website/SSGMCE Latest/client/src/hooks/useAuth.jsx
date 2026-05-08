import { useState, useEffect, createContext, useContext } from "react";
import apiClient from "../utils/apiClient";

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const savedUser = localStorage.getItem("adminUser");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await apiClient.post(`/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { token, ...userData } = response.data.data;

        // Save to localStorage
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUser", JSON.stringify(userData));

        // Set axios default header
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setUser(userData);
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Register function (for first user / admin)
  const register = async (name, email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await apiClient.post(`/auth/register`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        const { token, ...userData } = response.data.data;

        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUser", JSON.stringify(userData));
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setUser(userData);
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // Role helpers
  const ADMIN_ROLES = ["admin", "SuperAdmin"];
  const ALL_ROLES = ["admin", "SuperAdmin", "Coordinator"];
  const isSuperAdmin = ADMIN_ROLES.includes(user?.role);
  const isCoordinator = user?.role === "Coordinator";
  const isAdmin = ALL_ROLES.includes(user?.role); // any authenticated admin-panel user
  const userDepartment = user?.department || "All";

  // Get auth token
  const getToken = () => localStorage.getItem("adminToken");

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAdmin,
        isSuperAdmin,
        isCoordinator,
        userDepartment,
        getToken,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
