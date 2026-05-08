const mongoose = require("mongoose");

const iqacNewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    priority: {
      type: Number,
      default: 0, // Higher = more important
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date, // Optional expiry date
    },
  },
  {
    timestamps: true,
  },
);

// Index for active news sorted by priority
iqacNewsSchema.index({ isActive: 1, priority: -1, createdAt: -1 });

module.exports = mongoose.model("IQACNews", iqacNewsSchema);
