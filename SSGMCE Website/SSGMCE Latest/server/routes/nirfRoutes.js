const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getAllNIRF,
  getNIRFByYear,
  getLatestNIRF,
  getComparison,
  createNIRF,
  updateNIRF,
  deleteNIRF,
  getAllNIRFAdmin,
  seedNIRF,
} = require("../controllers/nirfController");

// Public routes
router.get("/", getAllNIRF);
router.get("/latest", getLatestNIRF);
router.get("/comparison", getComparison);
router.get("/year/:year", getNIRFByYear);

// Admin routes (protected)
router.get("/admin/all", protect, adminOnly, getAllNIRFAdmin);
router.post("/admin/create", protect, adminOnly, createNIRF);
router.post("/admin/seed", protect, adminOnly, seedNIRF);
router.put("/admin/:id", protect, adminOnly, updateNIRF);
router.delete("/admin/:id", protect, adminOnly, deleteNIRF);

module.exports = router;
