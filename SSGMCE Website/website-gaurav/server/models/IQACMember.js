const mongoose = require("mongoose");

const iqacMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: [
        "Chairperson",
        "Coordinator",
        "Faculty",
        "Administrative",
        "External",
        "Student",
        "Alumni",
      ],
      default: "Faculty",
    },
    department: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for sorting
iqacMemberSchema.index({ order: 1, role: 1 });

module.exports = mongoose.model("IQACMember", iqacMemberSchema);
