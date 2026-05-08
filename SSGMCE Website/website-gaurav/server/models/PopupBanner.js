const mongoose = require("mongoose");

const popupBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    linkUrl: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      default: 0,
      comment: "Higher priority banners are shown first",
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    displayFrequency: {
      type: String,
      enum: ["always", "once-per-session", "once-per-day"],
      default: "once-per-session",
    },
  },
  {
    timestamps: true,
  }
);

// Method to check if banner should be displayed
popupBannerSchema.methods.shouldDisplay = function () {
  const now = new Date();
  
  // Check if active
  if (!this.isActive) return false;
  
  // Check date range
  if (this.startDate && now < this.startDate) return false;
  if (this.endDate && now > this.endDate) return false;
  
  return true;
};

// Static method to get active banner
popupBannerSchema.statics.getActiveBanner = async function () {
  const now = new Date();
  
  return await this.findOne({
    isActive: true,
    $or: [
      { startDate: null, endDate: null },
      { startDate: { $lte: now }, endDate: { $gte: now } },
      { startDate: { $lte: now }, endDate: null },
      { startDate: null, endDate: { $gte: now } },
    ],
  })
    .sort({ priority: -1, createdAt: -1 })
    .limit(1);
};

module.exports = mongoose.model("PopupBanner", popupBannerSchema);
