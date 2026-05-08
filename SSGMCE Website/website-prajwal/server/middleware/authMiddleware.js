const jwt = require("jsonwebtoken");
const User = require("../models/User");

// JWT Secret - should be in .env file
const JWT_SECRET = process.env.JWT_SECRET || "ssgmce-admin-secret-key-2024";
const JWT_EXPIRES_IN = "7d";

// Optional protect – sets req.user when a valid token is present,
// but does NOT block the request when no token is provided.
// Use on routes that serve both public and authenticated users (e.g. GET /api/faculty).
const optionalProtect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user && user.isActive) {
        req.user = user;
      }
    }
  } catch (_err) {
    // Invalid / expired token – treat as public request
  }
  next();
};

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid token.",
    });
  }
};

// Admin only middleware (accepts both old "admin" role and new "SuperAdmin")
const adminOnly = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "admin" || req.user.role === "SuperAdmin")
  ) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }
};

// SuperAdmin only middleware
const superAdminOnly = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "SuperAdmin" || req.user.role === "admin")
  ) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Super Admin only.",
    });
  }
};

// Allow both SuperAdmin and Coordinator (any authenticated admin-level user)
const adminOrCoordinator = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "admin" ||
      req.user.role === "SuperAdmin" ||
      req.user.role === "Coordinator")
  ) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin or Coordinator required.",
    });
  }
};

/**
 * checkDepartmentAccess – The Guard
 *
 * Must be used AFTER protect and adminOrCoordinator.
 *
 * SuperAdmin  → passes through (full access).
 * Coordinator → checks that the request targets their own department.
 *   • For POST/PUT: verifies req.body.department matches req.user.department
 *   • For GET with query: injects department filter
 *   • For PUT/DELETE by ID: the controller must verify ownership (see helper)
 *
 * @param {Object} options
 * @param {string} options.bodyField - field name in req.body (default "department")
 * @param {boolean} options.autoAssign - auto-set body field to user's dept (default true)
 */
const checkDepartmentAccess = (options = {}) => {
  const { bodyField = "department", autoAssign = true } = options;

  return (req, res, next) => {
    // SuperAdmin / legacy admin → full access
    if (
      req.user.role === "SuperAdmin" ||
      req.user.role === "admin" ||
      req.user.department === "All"
    ) {
      return next();
    }

    const userDept = req.user.department;

    // For GET requests – inject department filter into query
    if (req.method === "GET") {
      req.query.department = userDept;
      return next();
    }

    // For POST/PUT – enforce department
    if (req.body && (req.method === "POST" || req.method === "PUT" || req.method === "PATCH")) {
      if (autoAssign) {
        // Automatically stamp the coordinator's department
        req.body[bodyField] = userDept;
      } else if (req.body[bodyField] && req.body[bodyField] !== userDept) {
        return res.status(403).json({
          success: false,
          message: `Access denied. You can only manage data for the ${userDept} department.`,
        });
      }
    }

    next();
  };
};

/**
 * Helper: verify a DB document belongs to the coordinator's department.
 * Call inside controllers for update/delete by ID operations.
 *
 * Returns null if access is allowed, or an error message string if denied.
 * Usage:  const err = verifyDocDepartment(req, doc); if (err) return res.status(403).json({ error: err });
 */
const verifyDocDepartment = (req, doc, deptField = "department") => {
  if (
    req.user.role === "SuperAdmin" ||
    req.user.role === "admin" ||
    req.user.department === "All"
  ) {
    return null; // access granted
  }
  if (doc[deptField] === req.user.department) {
    return null; // coordinator's department matches
  }
  return `Access denied. You can only manage ${req.user.department} department data.`;
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

module.exports = {
  protect,
  optionalProtect,
  adminOnly,
  superAdminOnly,
  adminOrCoordinator,
  checkDepartmentAccess,
  verifyDocDepartment,
  generateToken,
  JWT_SECRET,
};
