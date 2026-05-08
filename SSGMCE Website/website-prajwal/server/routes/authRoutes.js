const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updatePassword,
  verifyGate,
  getCoordinators,
  createCoordinator,
  updateCoordinator,
  deleteCoordinator,
} = require("../controllers/authController");
const { protect, superAdminOnly } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/verify-gate", verifyGate);

// Protected routes
router.get("/me", protect, getMe);
router.put("/password", protect, updatePassword);

// Coordinator management (SuperAdmin only)
router.get("/coordinators", protect, superAdminOnly, getCoordinators);
router.post("/coordinators", protect, superAdminOnly, createCoordinator);
router.put("/coordinators/:id", protect, superAdminOnly, updateCoordinator);
router.delete("/coordinators/:id", protect, superAdminOnly, deleteCoordinator);

module.exports = router;
