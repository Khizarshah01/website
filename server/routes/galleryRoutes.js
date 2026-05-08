const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getGalleryItems,
  getAdminGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryCategories,
  getAdminGalleryCategories,
  createGalleryCategory,
  updateGalleryCategory,
  deleteGalleryCategory,
} = require("../controllers/galleryController");

router.get("/", getGalleryItems);
router.get("/admin/all", protect, adminOnly, getAdminGalleryItems);
router.get("/categories", getGalleryCategories);
router.get(
  "/categories/admin/all",
  protect,
  adminOnly,
  getAdminGalleryCategories,
);
router.post("/categories", protect, adminOnly, createGalleryCategory);
router.put("/categories/:id", protect, adminOnly, updateGalleryCategory);
router.delete("/categories/:id", protect, adminOnly, deleteGalleryCategory);
router.post("/", protect, adminOnly, createGalleryItem);
router.put("/:id", protect, adminOnly, updateGalleryItem);
router.delete("/:id", protect, adminOnly, deleteGalleryItem);

module.exports = router;
