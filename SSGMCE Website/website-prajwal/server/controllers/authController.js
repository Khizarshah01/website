const User = require("../models/User");
const EditLog = require("../models/EditLog");
const { generateToken } = require("../middleware/authMiddleware");

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
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to verify admin gate",
    });
  }
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public (first user) or SuperAdmin only
const register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Check if this is the first user (make them SuperAdmin)
    const userCount = await User.countDocuments();
    const isFirstUser = userCount === 0;

    const userRole = isFirstUser ? "SuperAdmin" : role || "Coordinator";
    const userDept = isFirstUser ? "All" : department || "All";

    // Only SuperAdmin can create users after the first one
    if (!isFirstUser && (!req.user || (req.user.role !== "SuperAdmin" && req.user.role !== "admin"))) {
      return res.status(403).json({
        success: false,
        message: "Only Super Admin can create new users",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: userRole,
      department: userDept,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        token,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error registering user",
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Contact administrator.",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

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
      console.error("Login log failed:", logErr.message);
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error logging in",
    });
  }
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

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
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a coordinator
// @route   POST /api/auth/coordinators
// @access  SuperAdmin
const createCoordinator = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    if (!name || !email || !password || !department) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and department are required",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "Coordinator",
      department,
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a coordinator
// @route   PUT /api/auth/coordinators/:id
// @access  SuperAdmin
const updateCoordinator = async (req, res) => {
  try {
    const { name, email, department, isActive, password } = req.body;
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (department) update.department = department;
    if (typeof isActive === "boolean") update.isActive = isActive;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
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
    if (password && password.length >= 6) {
      user.password = password;
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a coordinator
// @route   DELETE /api/auth/coordinators/:id
// @access  SuperAdmin
const deleteCoordinator = async (req, res) => {
  try {
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
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updatePassword,
  verifyGate,
  getCoordinators,
  createCoordinator,
  updateCoordinator,
  deleteCoordinator,
};
