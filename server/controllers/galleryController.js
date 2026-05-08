const GalleryItem = require("../models/GalleryItem");
const GalleryCategory = require("../models/GalleryCategory");

const DEFAULT_CATEGORIES = [
  "Campus",
  "Events",
  "Labs",
  "Sports",
  "Cultural",
  "Other",
];
const FALLBACK_CATEGORY = "Other";

const normalizeCategoryName = (value = "") => {
  const name = String(value || "").trim();
  return name || FALLBACK_CATEGORY;
};

const normalizeItemPayload = (payload = {}) => ({
  title: String(payload.title || "").trim(),
  category: normalizeCategoryName(payload.category),
  imageUrl: String(payload.imageUrl || "").trim(),
  order: Number.isFinite(Number(payload.order)) ? Number(payload.order) : 0,
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
  return GalleryCategory.findOneAndUpdate(
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
  const count = await GalleryCategory.countDocuments();
  if (count === 0) {
    const docs = DEFAULT_CATEGORIES.map((name, index) => ({
      name,
      normalizedName: name.toLowerCase(),
      order: index,
      isActive: true,
    }));
    await GalleryCategory.insertMany(docs, { ordered: false }).catch(() => null);
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

  const existing = await GalleryCategory.findOne({ normalizedName });
  if (existing) return existing;

  const nextOrder = await GalleryCategory.countDocuments();
  return GalleryCategory.create({
    name: String(name).trim(),
    normalizedName,
    order: nextOrder,
    isActive: true,
  });
};

// @desc    Get active gallery images (public)
// @route   GET /api/gallery
// @access  Public
const getGalleryItems = async (_req, res) => {
  try {
    await ensureInitialCategories();
    const items = await GalleryItem.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all gallery images for admin
// @route   GET /api/gallery/admin/all
// @access  Private/Admin
const getAdminGalleryItems = async (_req, res) => {
  try {
    await ensureInitialCategories();
    const items = await GalleryItem.find({}).sort({
      order: 1,
      createdAt: -1,
    });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create gallery image
// @route   POST /api/gallery
// @access  Private/Admin
const createGalleryItem = async (req, res) => {
  try {
    const payload = normalizeItemPayload(req.body);
    if (!payload.title || !payload.imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Title and image URL are required.",
      });
    }

    const category = await ensureCategoryExists(payload.category);
    payload.category = category?.name || FALLBACK_CATEGORY;

    const item = await GalleryItem.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private/Admin
const updateGalleryItem = async (req, res) => {
  try {
    const payload = normalizeItemPayload(req.body);
    if (!payload.title || !payload.imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Title and image URL are required.",
      });
    }

    const category = await ensureCategoryExists(payload.category);
    payload.category = category?.name || FALLBACK_CATEGORY;

    const item = await GalleryItem.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found." });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found." });
    }
    res.json({ success: true, message: "Gallery item deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get active gallery categories (public)
// @route   GET /api/gallery/categories
// @access  Public
const getGalleryCategories = async (_req, res) => {
  try {
    await ensureInitialCategories();
    const categories = await GalleryCategory.find({ isActive: true }).sort({
      order: 1,
      createdAt: 1,
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all gallery categories for admin
// @route   GET /api/gallery/categories/admin/all
// @access  Private/Admin
const getAdminGalleryCategories = async (_req, res) => {
  try {
    await ensureInitialCategories();
    const categories = await GalleryCategory.find({}).sort({
      order: 1,
      createdAt: 1,
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create gallery category
// @route   POST /api/gallery/categories
// @access  Private/Admin
const createGalleryCategory = async (req, res) => {
  try {
    const payload = normalizeCategoryPayload(req.body);
    if (!payload.name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const normalizedName = payload.name.toLowerCase();
    const exists = await GalleryCategory.findOne({ normalizedName });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists.",
      });
    }

    const category = await GalleryCategory.create({
      ...payload,
      normalizedName,
    });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update gallery category
// @route   PUT /api/gallery/categories/:id
// @access  Private/Admin
const updateGalleryCategory = async (req, res) => {
  try {
    const payload = normalizeCategoryPayload(req.body);
    if (!payload.name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const category = await GalleryCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    const previousName = category.name;
    const normalizedName = payload.name.toLowerCase();

    const duplicate = await GalleryCategory.findOne({
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
      await GalleryItem.updateMany(
        { category: new RegExp(`^${escapeRegExp(previousName)}$`, "i") },
        { $set: { category: category.name } },
      );
    }

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete gallery category
// @route   DELETE /api/gallery/categories/:id
// @access  Private/Admin
const deleteGalleryCategory = async (req, res) => {
  try {
    const category = await GalleryCategory.findById(req.params.id);
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

    await GalleryItem.updateMany(
      { category: new RegExp(`^${escapeRegExp(category.name)}$`, "i") },
      { $set: { category: fallback.name } },
    );
    await category.deleteOne();

    res.json({
      success: true,
      message: `Category deleted. Related images moved to "${fallback.name}".`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
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
};
