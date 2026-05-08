const express = require("express");
const router = express.Router();
const {
  getAllPopupBanners,
  getActiveBanner,
  getPopupBannerById,
  createPopupBanner,
  updatePopupBanner,
  deletePopupBanner,
  togglePopupBannerStatus,
} = require("../controllers/popupBannerController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public route - get active banner
router.get("/active", getActiveBanner);

// Protected routes - admin only
router.get("/", protect, adminOnly, getAllPopupBanners);
router.get("/:id", protect, adminOnly, getPopupBannerById);
router.post("/", protect, adminOnly, createPopupBanner);
router.put("/:id", protect, adminOnly, updatePopupBanner);
router.delete("/:id", protect, adminOnly, deletePopupBanner);
router.patch("/:id/toggle", protect, adminOnly, togglePopupBannerStatus);

module.exports = router;
