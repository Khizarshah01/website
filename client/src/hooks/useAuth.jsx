import { useState, useEffect, createContext, useContext } from "react";
import apiClient from "../utils/apiClient";
import {
  clearStoredAuth,
  getStoredAdminUser,
  purgeLegacyAdminToken,
  setStoredAdminUser,
} from "../utils/authStorage";

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from the HTTP-only cookie session and cached user profile.
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      purgeLegacyAdminToken();
      const savedUser = getStoredAdminUser();
      if (savedUser && isMounted) {
        setUser(savedUser);
      }

      try {
        const response = await apiClient.get(`/auth/me`, {
          skipAuthRedirect: true,
        });
        if (isMounted && response.data?.success) {
          setUser(response.data.data);
          setStoredAdminUser(response.data.data);
        }
      } catch (_error) {
        if (isMounted) {
          clearStoredAuth();
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
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
        const { token: _token, ...userData } = response.data.data;

        setStoredAdminUser(userData);
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
        const { token: _token, ...userData } = response.data.data;

        setStoredAdminUser(userData);
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
  const logout = async () => {
    try {
      await apiClient.post(`/auth/logout`, {}, { skipAuthRedirect: true });
    } catch (_error) {
      // Clear local auth state even if the cookie is already expired server-side.
    }
    clearStoredAuth();
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
  const getToken = () => null;

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
