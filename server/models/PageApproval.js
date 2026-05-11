const mongoose = require("mongoose");

const pageApprovalSchema = new mongoose.Schema(
  {
    pageId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    pageTitle: {
      type: String,
      default: "",
      trim: true,
    },
    route: {
      type: String,
      default: "",
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    requestedByName: {
      type: String,
      required: true,
      default: "Unknown",
    },
    requestedByRole: {
      type: String,
      required: true,
      default: "Coordinator",
    },
    requestedByDepartment: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    summary: {
      type: String,
      default: "",
    },
    previousData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    proposedData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedByName: {
      type: String,
      default: "",
    },
    reviewNote: {
      type: String,
      default: "",
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

pageApprovalSchema.index({ status: 1, updatedAt: -1 });
pageApprovalSchema.index({ pageId: 1, status: 1 });

module.exports = mongoose.model("PageApproval", pageApprovalSchema);
