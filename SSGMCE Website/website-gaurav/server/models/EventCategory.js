const mongoose = require("mongoose");

const EventCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    normalizedName: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

EventCategorySchema.pre("validate", function setNormalizedName(next) {
  this.name = String(this.name || "").trim();
  this.normalizedName = this.name.toLowerCase();
  next();
});

module.exports = mongoose.model("EventCategory", EventCategorySchema);
