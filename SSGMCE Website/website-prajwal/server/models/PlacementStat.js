const mongoose = require("mongoose");

const PlacementStatSchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      required: true,
      unique: true, // e.g., "2023-24"
    },
    placementPercentage: {
      type: Number,
      required: true,
    },
    highestPackage: {
      type: Number, // in LPA
      required: true,
    },
    averagePackage: {
      type: Number, // in LPA
      required: true,
    },
    totalOffers: {
      type: Number,
      required: true,
    },
    companiesVisited: {
      type: Number,
      required: true,
    },
    departmentWise: [
      {
        department: String, // e.g., CSE, IT
        placedCount: Number,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("PlacementStat", PlacementStatSchema);
