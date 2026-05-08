const express = require("express");
const router = express.Router();
const { protect, adminOnly, adminOrCoordinator } = require("../middleware/authMiddleware");
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
  resetPageToVersion,
} = require("../controllers/pageContentController");

// Public routes
router.get("/", getAllPages);
router.get("/menu-structure", getMenuStructure);

// Edit logs & reset (SuperAdmin only) — must come before /:pageId
router.get("/edit-logs", protect, adminOnly, getEditLogs);
router.post("/reset/:logId", protect, adminOnly, resetPageToVersion);

router.get("/:pageId", getPageById);

// Protected routes
router.post("/", protect, adminOnly, createPage);
router.put("/:pageId", protect, adminOrCoordinator, updatePage);

// Admin only routes
router.delete("/:pageId", protect, adminOnly, deletePage);
router.post("/seed", protect, adminOnly, seedAboutPages);
router.post("/seed-all", protect, adminOnly, seedAllNavPages);

module.exports = router;
