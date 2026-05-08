const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  // Members
  getMembers,
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
  // Documents
  getDocuments,
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  // News
  getNews,
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
  // Seed
  seedIQACData,
} = require("../controllers/iqacController");

// ==================== PUBLIC ROUTES ====================

// Members
router.get("/members", getMembers);

// Documents
router.get("/documents/:category", getDocuments);

// News
router.get("/news", getNews);

// ==================== ADMIN ROUTES ====================

// Members (Admin)
router.get("/admin/members", protect, adminOnly, getAllMembers);
router.post("/members", protect, adminOnly, addMember);
router.put("/members/:id", protect, adminOnly, updateMember);
router.delete("/members/:id", protect, adminOnly, deleteMember);

// Documents (Admin)
router.get("/admin/documents", protect, adminOnly, getAllDocuments);
router.post("/documents", protect, adminOnly, addDocument);
router.put("/documents/:id", protect, adminOnly, updateDocument);
router.delete("/documents/:id", protect, adminOnly, deleteDocument);

// News (Admin)
router.get("/admin/news", protect, adminOnly, getAllNews);
router.post("/news", protect, adminOnly, addNews);
router.put("/news/:id", protect, adminOnly, updateNews);
router.delete("/news/:id", protect, adminOnly, deleteNews);

// Seed Data (Admin)
router.post("/seed", protect, adminOnly, seedIQACData);

module.exports = router;
