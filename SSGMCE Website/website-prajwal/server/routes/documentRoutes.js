const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getAllDocuments,
  getDocumentsByCategory,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  incrementDownload,
  getAllDocumentsAdmin,
  seedDocuments,
  getCategoryStats,
} = require("../controllers/documentController");

// Public routes
router.get("/", getAllDocuments);
router.get("/stats", getCategoryStats);
router.get("/category/:category", getDocumentsByCategory);
router.get("/:id", getDocumentById);
router.post("/:id/download", incrementDownload);

// Admin routes (protected)
router.get("/admin/all", protect, adminOnly, getAllDocumentsAdmin);
router.post("/admin/create", protect, adminOnly, createDocument);
router.post("/admin/seed", protect, adminOnly, seedDocuments);
router.put("/admin/:id", protect, adminOnly, updateDocument);
router.delete("/admin/:id", protect, adminOnly, deleteDocument);

module.exports = router;
