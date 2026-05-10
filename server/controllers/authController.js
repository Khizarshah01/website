const User = require("../models/User");
const mongoose = require("mongoose");
const EditLog = require("../models/EditLog");
const { generateToken } = require("../middleware/authMiddleware");
const {
  registerLoginFailure,
  clearLoginFailures,
} = require("../middleware/authRateLimit");
const {
  clearAuthCookie,
  getAuthTokenFromRequest,
  setAuthCookie,
} = require("../utils/authSecurity");
const { blacklistToken } = require("../utils/tokenBlacklist");
const { validatePassword } = require("../utils/passwordPolicy");

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const MIN_PASSWORD_LENGTH = 8;

const normalizeEmail = (value) => {
  if (!isNonEmptyString(value)) return "";
  return value.trim().toLowerCase();
};

const normalizeName = (value) => (isNonEmptyString(value) ? value.trim() : "");

const normalizeDepartment = (value) =>
  isNonEmptyString(value) ? value.trim().toUpperCase() : "";

const normalizeRole = (value) => {
  const role = String(value || "").trim();
  if (role === "admin") return "SuperAdmin";
  return role || "Coordinator";
};

const isStrongEnoughPassword = (value) =>
  isNonEmptyString(value) && value.trim().length >= MIN_PASSWORD_LENGTH;

const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;

const getLockRecord = (email = "") => loginAttempts.get(normalizeEmail(email));

const isAccountLocked = (email = "") => {
  const key = normalizeEmail(email);
  if (!key) return false;
  const record = getLockRecord(key);
  if (!record) return false;

  if (record.attempts >= MAX_ATTEMPTS) {
    if (Date.now() - record.firstAttempt < LOCKOUT_DURATION) {
      return true;
    }
    loginAttempts.delete(key);
  }

  return false;
};

const recordFailedAttempt = (email = "") => {
  const key = normalizeEmail(email);
  if (!key) return;

  const current = getLockRecord(key) || {
    attempts: 0,
    firstAttempt: Date.now(),
  };

  if (Date.now() - current.firstAttempt >= LOCKOUT_DURATION) {
    current.attempts = 0;
    current.firstAttempt = Date.now();
  }

  current.attempts += 1;
  loginAttempts.set(key, current);
};

const clearAttempts = (email = "") => {
  const key = normalizeEmail(email);
  if (!key) return;
  loginAttempts.delete(key);
};

const sendUnexpectedError = (res, fallbackMessage) => {
  return res.status(500).json({
    success: false,
    message: fallbackMessage,
  });
};

const isStorageQuotaError = (error) =>
  error?.code === 8000 ||
  error?.codeName === "AtlasError" ||
  String(error?.message || "").toLowerCase().includes("space quota");

const isGateValid = (accessKey) => {
  const gateToken = String(process.env.ADMIN_GATE_TOKEN || "").trim();
  if (!gateToken) return true;
  return String(accessKey || "").trim() === gateToken;
};

// @desc    Verify admin secret gate key
// @route   POST /api/auth/verify-gate
// @access  Public
const verifyGate = async (req, res) => {
  try {
    const { accessKey } = req.body || {};
    const gateEnabled = Boolean(String(process.env.ADMIN_GATE_TOKEN || "").trim());

    if (accessKey !== undefined && typeof accessKey !== "string") {
      return res.status(400).json({
        success: false,
        gateEnabled,
        message: "Access key must be a string",
      });
    }

    if (isGateValid(accessKey)) {
      return res.json({
        success: true,
        gateEnabled,
        message: "Access granted",
      });
    }

    return res.status(401).json({
      success: false,
      gateEnabled,
      message: "Invalid admin access key",
    });
  } catch (error) {
    return sendUnexpectedError(res, "Failed to verify admin gate");
  }
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public (first user) or SuperAdmin only
const register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    const normalizedName = normalizeName(name);
    const normalizedEmail = normalizeEmail(email);
    const normalizedDepartment = normalizeDepartment(department);

    if (!normalizedName || !normalizedEmail || !isStrongEnoughPassword(password)) {
      return res.status(400).json({
        success: false,
        message: `Name, email and password are required. Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.errors.join(" "),
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Check if this is the first user (make them SuperAdmin)
    const userCount = await User.countDocuments();
    const isFirstUser = userCount === 0;

    const userRole = isFirstUser ? "SuperAdmin" : normalizeRole(role);
    const userDept = isFirstUser ? "All" : normalizedDepartment || "All";

    // Only SuperAdmin can create users after the first one
    if (!isFirstUser && (!req.user || (req.user.role !== "SuperAdmin" && req.user.role !== "admin"))) {
      return res.status(403).json({
        success: false,
        message: "Only Super Admin can create new users",
      });
    }

    // Create user
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: password.trim(),
      role: userRole,
      department: userDept,
    });

    // Generate token
    const token = generateToken(user._id);
    setAuthCookie(req, res, token);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return sendUnexpectedError(res, "Error registering user");
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    // Validate input
    if (!normalizedEmail || !isNonEmptyString(password)) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    if (isAccountLocked(normalizedEmail)) {
      return res.status(429).json({
        success: false,
        message:
          "Account temporarily locked due to too many failed attempts. Try again in 15 minutes.",
      });
    }

    // Find user and include password
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      recordFailedAttempt(normalizedEmail);
      try {
        await registerLoginFailure(req, normalizedEmail);
      } catch (rateLimitError) {
        console.error("Login failure tracking failed:", rateLimitError.message);
      }
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if account is active
    if (!user.isActive) {
      recordFailedAttempt(normalizedEmail);
      try {
        await registerLoginFailure(req, normalizedEmail);
      } catch (rateLimitError) {
        console.error("Login failure tracking failed:", rateLimitError.message);
      }
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Contact administrator.",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      recordFailedAttempt(normalizedEmail);
      try {
        await registerLoginFailure(req, normalizedEmail);
      } catch (rateLimitError) {
        console.error("Login failure tracking failed:", rateLimitError.message);
      }
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Non-essential login bookkeeping should not block sign-in when Atlas is
    // temporarily unable to accept writes (for example storage quota reached).
    try {
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });
    } catch (writeError) {
      if (!isStorageQuotaError(writeError)) {
        throw writeError;
      }
    }

    clearAttempts(normalizedEmail);
    try {
      await clearLoginFailures(req, normalizedEmail);
    } catch (clearError) {
      if (!isStorageQuotaError(clearError)) {
        console.error("Login failure cleanup skipped:", clearError.message);
      }
    }

    // Log the login event (non-blocking)
    try {
      await EditLog.create({
        user: user._id,
        userName: user.name || user.email,
        userRole: user.role,
        userDepartment: user.department || "",
        pageId: "system",
        pageTitle: "System",
        action: "login",
        summary: `${user.role} ${user.name || user.email} (${user.department || "All"}) logged in`,
      });
    } catch (logErr) {
      if (!isStorageQuotaError(logErr)) {
        console.error("Login log failed:", logErr.message);
      }
    }

    // Generate token
    const token = generateToken(user._id);
    setAuthCookie(req, res, token);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return sendUnexpectedError(res, "Error logging in");
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logout = async (req, res) => {
  const token = getAuthTokenFromRequest(req);
  if (token) {
    blacklistToken(token);
  }
  clearAuthCookie(req, res);
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return sendUnexpectedError(res, "Failed to fetch current user");
  }
};

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (
      !isNonEmptyString(currentPassword) ||
      !isStrongEnoughPassword(newPassword)
    ) {
      return res.status(400).json({
        success: false,
        message: `Current password is required and the new password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      });
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.errors.join(" "),
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword.trim();
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return sendUnexpectedError(res, "Failed to update password");
  }
};

// ─── Coordinator Management (SuperAdmin only) ───

// @desc    Get all coordinators
// @route   GET /api/auth/coordinators
// @access  SuperAdmin
const getCoordinators = async (req, res) => {
  try {
    const users = await User.find().select("-__v").sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    return sendUnexpectedError(res, "Failed to fetch coordinators");
  }
};

// @desc    Create a coordinator
// @route   POST /api/auth/coordinators
// @access  SuperAdmin
const createCoordinator = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    const normalizedName = normalizeName(name);
    const normalizedEmail = normalizeEmail(email);
    const normalizedDepartment = normalizeDepartment(department);

    if (
      !normalizedName ||
      !normalizedEmail ||
      !isStrongEnoughPassword(password) ||
      !normalizedDepartment
    ) {
      return res.status(400).json({
        success: false,
        message: `Name, email, password and department are required. Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.errors.join(" "),
      });
    }

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: password.trim(),
      role: "Coordinator",
      department: normalizedDepartment,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Create coordinator error:", error);
    return sendUnexpectedError(res, "Failed to create coordinator");
  }
};

// @desc    Update a coordinator
// @route   PUT /api/auth/coordinators/:id
// @access  SuperAdmin
const updateCoordinator = async (req, res) => {
  try {
    const { name, email, department, isActive, password } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid user id" });
    }

    const update = {};
    if (name !== undefined) {
      const normalizedName = normalizeName(name);
      if (!normalizedName) {
        return res.status(400).json({ success: false, message: "Name must be a non-empty string" });
      }
      update.name = normalizedName;
    }
    if (email !== undefined) {
      const normalizedEmail = normalizeEmail(email);
      if (!normalizedEmail) {
        return res.status(400).json({ success: false, message: "Email must be a non-empty string" });
      }
      update.email = normalizedEmail;
    }
    if (department !== undefined) {
      const normalizedDepartment = normalizeDepartment(department);
      if (!normalizedDepartment) {
        return res.status(400).json({ success: false, message: "Department must be a non-empty string" });
      }
      update.department = normalizedDepartment;
    }
    if (typeof isActive === "boolean") update.isActive = isActive;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (update.email) {
      const existingUser = await User.findOne({
        email: update.email,
        _id: { $ne: user._id },
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        });
      }
    }

    // Don't let SuperAdmin demote themselves
    if (
      user.role === "SuperAdmin" &&
      req.user._id.toString() === user._id.toString()
    ) {
      delete update.isActive; // can't deactivate yourself
    }

    Object.assign(user, update);

    // If password provided, update it (triggers pre-save hook for hashing)
    if (password !== undefined) {
      if (!isStrongEnoughPassword(password)) {
        return res.status(400).json({ success: false, message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
      }
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        return res.status(400).json({
          success: false,
          message: passwordValidation.errors.join(" "),
        });
      }
      user.password = password.trim();
    }

    await user.save();

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    return sendUnexpectedError(res, "Failed to update coordinator");
  }
};

// @desc    Delete a coordinator
// @route   DELETE /api/auth/coordinators/:id
// @access  SuperAdmin
const deleteCoordinator = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid user id" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Prevent deleting yourself
    if (req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return sendUnexpectedError(res, "Failed to delete user");
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  updatePassword,
  verifyGate,
  getCoordinators,
  createCoordinator,
  updateCoordinator,
  deleteCoordinator,
  isAccountLocked,
  recordFailedAttempt,
  clearAttempts,
};
