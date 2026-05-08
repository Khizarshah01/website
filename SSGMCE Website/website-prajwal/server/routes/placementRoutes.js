const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getPlacementData,
  getStats,
  createStat,
  updateStat,
  deleteStat,
  getRecruiters,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  seedPlacementData,
} = require("../controllers/placementController");

// Public Data
router.get("/public", getPlacementData);

// Stats
router.get("/stats", getStats);
router.post("/stats", protect, adminOnly, createStat);
router.put("/stats/:id", protect, adminOnly, updateStat);
router.delete("/stats/:id", protect, adminOnly, deleteStat);

// Recruiters
router.get("/recruiters", getRecruiters);
router.post("/recruiters", protect, adminOnly, createRecruiter);
router.put("/recruiters/:id", protect, adminOnly, updateRecruiter);
router.delete("/recruiters/:id", protect, adminOnly, deleteRecruiter);

// Testimonials
router.get("/testimonials", getTestimonials);
router.post("/testimonials", protect, adminOnly, createTestimonial);
router.put("/testimonials/:id", protect, adminOnly, updateTestimonial);
router.delete("/testimonials/:id", protect, adminOnly, deleteTestimonial);

// Seed
router.post("/seed", protect, adminOnly, seedPlacementData);

module.exports = router;
