const mongoose = require("mongoose");

const iqacDocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "AQAR",
        "Minutes",
        "NAAC",
        "NBA",
        "Best Practices",
        "Feedback",
        "Survey",
        "Gender",
        "E-Content",
        "Other",
      ],
      default: "Other",
    },
    academicYear: {
      type: String,
      trim: true, // e.g., "2023-24"
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      default: "pdf",
      enum: [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "image",
        "other",
      ],
    },
    fileSize: {
      type: String, // e.g., "2.5 MB"
    },
    description: {
      type: String,
      trim: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for filtering and sorting
iqacDocumentSchema.index({ category: 1, academicYear: -1 });
iqacDocumentSchema.index({ isPublished: 1 });

module.exports = mongoose.model("IQACDocument", iqacDocumentSchema);
