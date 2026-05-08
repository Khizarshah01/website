const Event = require("../models/Event");
const EventCategory = require("../models/EventCategory");

const DEFAULT_CATEGORIES = [
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
  "Seminar",
  "Conference",
  "Other",
];
const FALLBACK_CATEGORY = "Other";

const normalizeCategoryName = (value = "") => {
  const name = String(value || "").trim();
  return name || FALLBACK_CATEGORY;
};

const parseDateInput = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
};

const normalizeEventPayload = (payload = {}) => ({
  title: String(payload.title || "").trim(),
  description: String(payload.description || "").trim(),
  eventDate: parseDateInput(payload.eventDate),
  endDate: parseDateInput(payload.endDate),
  location: String(payload.location || "SSGMCE Campus").trim() || "SSGMCE Campus",
  organizer: String(payload.organizer || "").trim(),
  category: normalizeCategoryName(payload.category),
  image: String(payload.image || "").trim(),
  registrationLink: String(payload.registrationLink || "").trim(),
  isActive: payload.isActive !== false,
});

const normalizeCategoryPayload = (payload = {}) => ({
  name: String(payload.name || "").trim(),
  order: Number.isFinite(Number(payload.order)) ? Number(payload.order) : 0,
  isActive: payload.isActive !== false,
});

const escapeRegExp = (value = "") =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const ensureFallbackCategory = async () => {
  const normalizedName = FALLBACK_CATEGORY.toLowerCase();
  return EventCategory.findOneAndUpdate(
    { normalizedName },
    {
      $setOnInsert: {
        name: FALLBACK_CATEGORY,
        order: DEFAULT_CATEGORIES.indexOf(FALLBACK_CATEGORY),
        isActive: true,
      },
    },
    { new: true, upsert: true },
  );
};

const ensureInitialCategories = async () => {
  const count = await EventCategory.countDocuments();
  if (count === 0) {
    const docs = DEFAULT_CATEGORIES.map((name, index) => ({
      name,
      normalizedName: name.toLowerCase(),
      order: index,
      isActive: true,
    }));
    await EventCategory.insertMany(docs, { ordered: false }).catch(() => null);
  }
  await ensureFallbackCategory();
};

const ensureCategoryExists = async (name) => {
  const normalizedName = String(name || "")
    .trim()
    .toLowerCase();

  if (!normalizedName) {
    return ensureFallbackCategory();
  }

  const existing = await EventCategory.findOne({ normalizedName });
  if (existing) return existing;

  const nextOrder = await EventCategory.countDocuments();
  return EventCategory.create({
    name: String(name).trim(),
    normalizedName,
    order: nextOrder,
    isActive: true,
  });
};

const validateEventPayload = (payload) => {
  if (!payload.title || !payload.description) {
    return "Title and description are required.";
  }
  if (payload.eventDate === undefined) {
    return "Event date is required.";
  }
  if (payload.eventDate === null) {
    return "Event date is invalid.";
  }
  if (payload.endDate === null) {
    return "End date is invalid.";
  }
  if (payload.endDate && payload.endDate < payload.eventDate) {
    return "End date must be after start date.";
  }
  return "";
};

// @desc    Get all active events (public)
// @route   GET /api/events
// @access  Public
const getAllEvents = async (_req, res) => {
  try {
    await ensureInitialCategories();
    const events = await Event.find({ isActive: true }).sort({
      eventDate: -1,
      createdAt: -1,
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.message });
  }
};

// @desc    Get all events for admin
// @route   GET /api/events/admin/all
// @access  Private/Admin
const getAdminEvents = async (_req, res) => {
  try {
    await ensureInitialCategories();
    const events = await Event.find({}).sort({
      eventDate: -1,
      createdAt: -1,
    });
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get upcoming events
// @route   GET /api/events/upcoming
// @access  Public
const getUpcomingEvents = async (_req, res) => {
  try {
    await ensureInitialCategories();
    const events = await Event.find({
      isActive: true,
      eventDate: { $gte: new Date() },
    })
      .sort({ eventDate: 1 })
      .limit(10);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.message });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.message });
  }
};

// @desc    Create event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
  try {
    const payload = normalizeEventPayload(req.body);
    const validationError = validateEventPayload(payload);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const category = await ensureCategoryExists(payload.category);
    payload.category = category?.name || FALLBACK_CATEGORY;

    const event = await Event.create(payload);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message, error: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
  try {
    const payload = normalizeEventPayload(req.body);
    const validationError = validateEventPayload(payload);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const category = await ensureCategoryExists(payload.category);
    payload.category = category?.name || FALLBACK_CATEGORY;

    const event = await Event.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message, error: error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.message });
  }
};

// @desc    Get active event categories (public)
// @route   GET /api/events/categories
// @access  Public
const getEventCategories = async (_req, res) => {
  try {
    await ensureInitialCategories();
    const categories = await EventCategory.find({ isActive: true }).sort({
      order: 1,
      createdAt: 1,
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all event categories for admin
// @route   GET /api/events/categories/admin/all
// @access  Private/Admin
const getAdminEventCategories = async (_req, res) => {
  try {
    await ensureInitialCategories();
    const categories = await EventCategory.find({}).sort({
      order: 1,
      createdAt: 1,
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create event category
// @route   POST /api/events/categories
// @access  Private/Admin
const createEventCategory = async (req, res) => {
  try {
    const payload = normalizeCategoryPayload(req.body);
    if (!payload.name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const normalizedName = payload.name.toLowerCase();
    const exists = await EventCategory.findOne({ normalizedName });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists.",
      });
    }

    const category = await EventCategory.create({
      ...payload,
      normalizedName,
    });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update event category
// @route   PUT /api/events/categories/:id
// @access  Private/Admin
const updateEventCategory = async (req, res) => {
  try {
    const payload = normalizeCategoryPayload(req.body);
    if (!payload.name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const category = await EventCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    const previousName = category.name;
    const normalizedName = payload.name.toLowerCase();

    const duplicate = await EventCategory.findOne({
      _id: { $ne: category._id },
      normalizedName,
    });
    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Category already exists.",
      });
    }

    category.name = payload.name;
    category.normalizedName = normalizedName;
    category.order = payload.order;
    category.isActive = payload.isActive;
    await category.save();

    if (previousName !== category.name) {
      await Event.updateMany(
        { category: new RegExp(`^${escapeRegExp(previousName)}$`, "i") },
        { $set: { category: category.name } },
      );
    }

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete event category
// @route   DELETE /api/events/categories/:id
// @access  Private/Admin
const deleteEventCategory = async (req, res) => {
  try {
    const category = await EventCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    if (category.normalizedName === FALLBACK_CATEGORY.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: `The "${FALLBACK_CATEGORY}" category cannot be deleted.`,
      });
    }

    const fallback = await ensureFallbackCategory();

    await Event.updateMany(
      { category: new RegExp(`^${escapeRegExp(category.name)}$`, "i") },
      { $set: { category: fallback.name } },
    );
    await category.deleteOne();

    res.json({
      success: true,
      message: `Category deleted. Related events moved to "${fallback.name}".`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
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
};
