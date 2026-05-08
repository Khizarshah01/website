const mongoose = require("mongoose");

const loginAttemptSchema = new mongoose.Schema(
  {
    scope: {
      type: String,
      enum: ["ip", "email"],
      required: true,
      index: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

loginAttemptSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
loginAttemptSchema.index({ scope: 1, value: 1, createdAt: -1 });

module.exports = mongoose.model("LoginAttempt", loginAttemptSchema);
