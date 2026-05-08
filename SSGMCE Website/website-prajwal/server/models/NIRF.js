const mongoose = require("mongoose");

const nirfSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["engineering", "overall", "management", "innovation"],
      default: "engineering",
    },
    rank: {
      type: Number,
      default: null,
    },
    overallScore: {
      type: Number,
      default: 0,
    },
    parameters: {
      tlr: { type: Number, default: 0 }, // Teaching, Learning & Resources
      rp: { type: Number, default: 0 }, // Research & Professional Practice
      go: { type: Number, default: 0 }, // Graduation Outcomes
      oi: { type: Number, default: 0 }, // Outreach & Inclusivity
      pr: { type: Number, default: 0 }, // Perception
    },
    reportUrl: {
      type: String,
      default: "",
    },
    submissionDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
nirfSchema.index({ year: -1, category: 1 });

module.exports = mongoose.model("NIRF", nirfSchema);
