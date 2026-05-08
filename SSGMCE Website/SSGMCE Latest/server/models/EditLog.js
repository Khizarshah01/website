const mongoose = require("mongoose");

const editLogSchema = new mongoose.Schema(
  {
    // Who made the edit
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    userDepartment: { type: String, default: "" },

    // What was edited
    pageId: { type: String, required: true },
    pageTitle: { type: String, default: "" },

    // The action performed
    action: {
      type: String,
      enum: ["edit", "reset", "login", "logout"],
      default: "edit",
    },

    // Snapshot of the page data BEFORE this edit (for reset/revert)
    previousData: { type: mongoose.Schema.Types.Mixed },

    // Brief summary of what changed (optional)
    summary: { type: String, default: "" },
  },
  { timestamps: true }
);

// Index for efficient queries
editLogSchema.index({ pageId: 1, createdAt: -1 });
editLogSchema.index({ user: 1, createdAt: -1 });
editLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model("EditLog", editLogSchema);
