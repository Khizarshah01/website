import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ADMIN_ROUTE_PREFIX } from "../../config/adminAccess";

/**
 * RoleGuard – Role-Based Access Control wrapper for admin routes.
 *
 * Props
 * ─────────────────────────────────────────────────────────
 * @param {string[]}  allowedRoles       - Roles that may access this route.
 *                                         e.g. ["SuperAdmin", "admin", "Coordinator"]
 * @param {string[]}  [allowedDepartments] - (optional) restrict to specific departments.
 *                                           Only relevant when a Coordinator accesses a
 *                                           department-scoped route.  Pass the department
 *                                           code(s) allowed, or omit to skip this check.
 * @param {string}    [deptParam]         - (optional) URL-param name that holds the
 *                                           department the route targets (e.g. "dept").
 *                                           Used together with allowedDepartments for
 *                                           dynamic route matching like /admin/faculty/:dept
 * @param {ReactNode} children
 *
 * Behaviour
 * ─────────────────────────────────────────────────────────
 * 1. Normalises the user's role to lowercase for comparison.
 * 2. If the role is not in allowedRoles → redirect to dashboard.
 * 3. If allowedDepartments is set AND the user is a Coordinator,
 *    check that user.department is included → else redirect.
 */
const RoleGuard = ({ allowedRoles, allowedDepartments, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={`${ADMIN_ROUTE_PREFIX}/login`} replace />;
  }

  // Normalise for comparison — route definitions can use "superadmin" or "SuperAdmin"
  const userRole = (user.role || "").toLowerCase();
  const normalisedAllowed = (allowedRoles || []).map((r) => r.toLowerCase());

  if (!normalisedAllowed.includes(userRole)) {
    // Role not permitted → back to dashboard
    return <Navigate to={ADMIN_ROUTE_PREFIX} replace />;
  }

  // Department-level gate (only enforced for Coordinators)
  if (
    allowedDepartments &&
    userRole === "coordinator" &&
    user.department !== "All"
  ) {
    const normalisedDepts = allowedDepartments.map((d) => d.toUpperCase());
    if (!normalisedDepts.includes((user.department || "").toUpperCase())) {
      return <Navigate to={ADMIN_ROUTE_PREFIX} replace />;
    }
  }

  return children;
};

export default RoleGuard;
