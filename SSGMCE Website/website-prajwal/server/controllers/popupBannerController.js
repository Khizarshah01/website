const PopupBanner = require("../models/PopupBanner");

// Get all popup banners
const getAllPopupBanners = async (req, res) => {
  try {
    const banners = await PopupBanner.find().sort({ priority: -1, createdAt: -1 });
    res.json({ success: true, data: banners });
  } catch (error) {
    console.error("Error fetching popup banners:", error);
    res.status(500).json({ success: false, message: "Failed to fetch popup banners" });
  }
};

// Get active banner (for frontend display)
const getActiveBanner = async (req, res) => {
  try {
    const banner = await PopupBanner.getActiveBanner();
    
    if (!banner) {
      return res.json({ success: true, data: null });
    }
    
    res.json({ success: true, data: banner });
  } catch (error) {
    console.error("Error fetching active banner:", error);
    res.status(500).json({ success: false, message: "Failed to fetch active banner" });
  }
};

// Get popup banner by ID
const getPopupBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await PopupBanner.findById(id);

    if (!banner) {
      return res.status(404).json({ success: false, message: "Popup banner not found" });
    }

    res.json({ success: true, data: banner });
  } catch (error) {
    console.error("Error fetching popup banner:", error);
    res.status(500).json({ success: false, message: "Failed to fetch popup banner" });
  }
};

// Create new popup banner
const createPopupBanner = async (req, res) => {
  try {
    const bannerData = req.body;
    
    // If this banner is set to active, deactivate all other banners
    if (bannerData.isActive) {
      await PopupBanner.updateMany({}, { isActive: false });
    }
    
    const newBanner = new PopupBanner(bannerData);
    await newBanner.save();

    res.status(201).json({
      success: true,
      message: "Popup banner created successfully",
      data: newBanner,
    });
  } catch (error) {
    console.error("Error creating popup banner:", error);
    res.status(500).json({ success: false, message: "Failed to create popup banner" });
  }
};

// Update popup banner
const updatePopupBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // If this banner is being set to active, deactivate all other banners
    if (updateData.isActive) {
      await PopupBanner.updateMany({ _id: { $ne: id } }, { isActive: false });
    }

    const updatedBanner = await PopupBanner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBanner) {
      return res.status(404).json({ success: false, message: "Popup banner not found" });
    }

    res.json({
      success: true,
      message: "Popup banner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    console.error("Error updating popup banner:", error);
    res.status(500).json({ success: false, message: "Failed to update popup banner" });
  }
};

// Delete popup banner
const deletePopupBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBanner = await PopupBanner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({ success: false, message: "Popup banner not found" });
    }

    res.json({ success: true, message: "Popup banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting popup banner:", error);
    res.status(500).json({ success: false, message: "Failed to delete popup banner" });
  }
};

// Toggle isActive status
const togglePopupBannerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await PopupBanner.findById(id);

    if (!banner) {
      return res.status(404).json({ success: false, message: "Popup banner not found" });
    }

    // If activating this banner, deactivate all others
    if (!banner.isActive) {
      await PopupBanner.updateMany({ _id: { $ne: id } }, { isActive: false });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    res.json({
      success: true,
      message: `Popup banner ${banner.isActive ? "activated" : "deactivated"} successfully`,
      data: banner,
    });
  } catch (error) {
    console.error("Error toggling popup banner status:", error);
    res.status(500).json({ success: false, message: "Failed to toggle popup banner status" });
  }
};

module.exports = {
  getAllPopupBanners,
  getActiveBanner,
  getPopupBannerById,
  createPopupBanner,
  updatePopupBanner,
  deletePopupBanner,
  togglePopupBannerStatus,
};
