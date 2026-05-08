const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getAllEvents,
  getAdminEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventCategories,
  getAdminEventCategories,
  createEventCategory,
  updateEventCategory,
  deleteEventCategory,
} = require("../controllers/eventController");

const eventIdParam = "/:id([0-9a-fA-F]{24})";

router.get("/", getAllEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/admin", protect, adminOnly, getAdminEvents);
router.get("/admin/all", protect, adminOnly, getAdminEvents);
router.get("/categories", getEventCategories);
router.get(
  "/categories/admin/all",
  protect,
  adminOnly,
  getAdminEventCategories,
);
router.post("/categories", protect, adminOnly, createEventCategory);
router.put("/categories/:id", protect, adminOnly, updateEventCategory);
router.delete("/categories/:id", protect, adminOnly, deleteEventCategory);
router.get(eventIdParam, getEventById);

router.post("/", protect, adminOnly, createEvent);
router.put(eventIdParam, protect, adminOnly, updateEvent);
router.delete(eventIdParam, protect, adminOnly, deleteEvent);

module.exports = router;
