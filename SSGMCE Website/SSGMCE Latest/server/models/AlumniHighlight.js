const mongoose = require("mongoose");

const AlumniHighlightSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
      default: "",
    },
    batch: {
      type: String,
      trim: true,
      default: "",
    },
    profileUrl: {
      type: String,
      trim: true,
      default: "",
    },
    quote: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    showOnHome: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AlumniHighlight", AlumniHighlightSchema);
