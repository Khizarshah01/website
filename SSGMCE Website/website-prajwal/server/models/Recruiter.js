const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String, // URL to image
      required: true,
    },
    category: {
      type: String,
      enum: [
        "MNC",
        "Product Based",
        "Service Based",
        "Core",
        "Start-up",
        "Other",
      ],
      default: "MNC",
    },
    website: String,
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Recruiter", RecruiterSchema);
