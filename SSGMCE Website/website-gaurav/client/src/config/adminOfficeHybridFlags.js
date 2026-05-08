const ENABLED_ADMIN_OFFICE_DB_ROUTES = new Set([
  // Add routes here after verifying DB parity for that specific page.
  // Example: "/facilities/admin-office/policies"
]);

export const isAdminOfficeDbEnabled = (route = "") =>
  ENABLED_ADMIN_OFFICE_DB_ROUTES.has(String(route || ""));
