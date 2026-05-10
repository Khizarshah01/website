const ADMIN_USER_KEY = "adminUser";
const LEGACY_TOKEN_KEY = "adminToken";

const safeStorage = {
  getSessionItem(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (_error) {
      return null;
    }
  },
  setSessionItem(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (_error) {
      // Ignore storage write failures in restricted browser contexts.
    }
  },
  removeSessionItem(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch (_error) {
      // Ignore storage write failures in restricted browser contexts.
    }
  },
  removeLocalItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (_error) {
      // Ignore storage write failures in restricted browser contexts.
    }
  },
};

export const getStoredAdminUser = () => {
  const rawValue = safeStorage.getSessionItem(ADMIN_USER_KEY);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue);
  } catch (_error) {
    safeStorage.removeSessionItem(ADMIN_USER_KEY);
    return null;
  }
};

export const setStoredAdminUser = (user) => {
  if (!user) {
    safeStorage.removeSessionItem(ADMIN_USER_KEY);
    return;
  }

  safeStorage.setSessionItem(ADMIN_USER_KEY, JSON.stringify(user));
};

export const clearStoredAuth = () => {
  safeStorage.removeSessionItem(ADMIN_USER_KEY);
  safeStorage.removeLocalItem(ADMIN_USER_KEY);
  safeStorage.removeLocalItem(LEGACY_TOKEN_KEY);
};
