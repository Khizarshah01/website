const express = require("express");
const router = express.Router();
const {
  protect,
  adminOnly,
  adminOrCoordinator,
  optionalProtect,
} = require("../middleware/authMiddleware");
const {
  getAllPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  seedAboutPages,
  seedAllNavPages,
  getMenuStructure,
  getEditLogs,
  getPendingApprovals,
  approvePendingChange,
  rejectPendingChange,
  resetPageToVersion,
} = require("../controllers/pageContentController");

// Public routes
router.get("/", getAllPages);
router.get("/menu-structure", getMenuStructure);

// Edit logs & reset (SuperAdmin only) — must come before /:pageId
router.get("/edit-logs", protect, adminOnly, getEditLogs);
router.get("/approvals", protect, adminOnly, getPendingApprovals);
router.post("/approvals/:approvalId/approve", protect, adminOnly, approvePendingChange);
router.post("/approvals/:approvalId/reject", protect, adminOnly, rejectPendingChange);
router.post("/reset/:logId", protect, adminOnly, resetPageToVersion);

router.get("/:pageId", optionalProtect, getPageById);

// Protected routes
router.post("/", protect, adminOnly, createPage);
router.put("/:pageId", protect, adminOrCoordinator, updatePage);

// Admin only routes
router.delete("/:pageId", protect, adminOnly, deletePage);
router.post("/seed", protect, adminOnly, seedAboutPages);
router.post("/seed-all", protect, adminOnly, seedAllNavPages);

module.exports = router;
