const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    batch: {
      type: String, // e.g., 2024
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String, // Student photo
    },
    message: {
      type: String,
      required: true,
    },
    designation: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
