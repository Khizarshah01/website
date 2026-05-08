const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Document title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "aicte",
        "naac",
        "nba",
        "nirf",
        "policies",
        "audit",
        "newsletter",
        "mandatory",
        "iso",
        "financial",
        "tattwadarshi",
        "student-forms",
        "university",
        "other",
      ],
      default: "other",
    },
    subcategory: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    fileSize: {
      type: String,
      default: "N/A",
    },
    fileType: {
      type: String,
      enum: [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "zip",
        "jpg",
        "png",
        "other",
      ],
      default: "pdf",
    },
    year: {
      type: String,
      trim: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
documentSchema.index({ category: 1, year: -1 });
documentSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Document", documentSchema);
