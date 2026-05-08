/**
 * Admin Access Configuration
 *
 * Central configuration for admin routing and access control
 */

// Admin route prefix - base path for all admin routes
export const ADMIN_ROUTE_PREFIX = "/admin";

// Admin gate/login path - where users are redirected when not authenticated
export const ADMIN_GATE_PATH = "/admin/login";

// Session storage key for admin entry verification
const ADMIN_ENTRY_VERIFIED_KEY = "adminEntryVerified";

/**
 * Clear the admin entry verification flag from session storage
 * Called during logout to ensure proper re-authentication
 */
export const clearAdminEntryVerified = () => {
  sessionStorage.removeItem(ADMIN_ENTRY_VERIFIED_KEY);
  localStorage.removeItem(ADMIN_ENTRY_VERIFIED_KEY);
};

/**
 * Set admin entry as verified
 */
export const setAdminEntryVerified = () => {
  sessionStorage.setItem(ADMIN_ENTRY_VERIFIED_KEY, "true");
};

/**
 * Check if admin entry is verified
 */
export const isAdminEntryVerified = () => {
  return sessionStorage.getItem(ADMIN_ENTRY_VERIFIED_KEY) === "true";
};
