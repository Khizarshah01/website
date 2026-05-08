/**
 * Seed Script: Populate Placement Statistics
 *
 * This script adds sample placement statistics data to the database
 * that can be displayed on the placements-statistics page.
 *
 * Run: node server/scripts/seedPlacementStatistics.js
 */

require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("MONGODB_URI not set in .env");
  process.exit(1);
}

// Sample Placement Statistics Data
const placementStats = [
  {
    academicYear: "2023-24",
    placementPercentage: 88,
    highestPackage: 24.5,
    averagePackage: 8.2,
    totalOffers: 385,
    companiesVisited: 65,
    departmentWise: [
      { department: "CSE", placedCount: 105 },
      { department: "IT", placedCount: 52 },
      { department: "MECH", placedCount: 98 },
      { department: "ELEC", placedCount: 47 },
      { department: "ENTC", placedCount: 52 },
      { department: "CIVIL", placedCount: 31 },
    ],
  },
  {
    academicYear: "2022-23",
    placementPercentage: 85,
    highestPackage: 22.5,
    averagePackage: 7.8,
    totalOffers: 365,
    companiesVisited: 58,
    departmentWise: [
      { department: "CSE", placedCount: 98 },
      { department: "IT", placedCount: 48 },
      { department: "MECH", placedCount: 88 },
      { department: "ELEC", placedCount: 42 },
      { department: "ENTC", placedCount: 48 },
      { department: "CIVIL", placedCount: 28 },
    ],
  },
  {
    academicYear: "2021-22",
    placementPercentage: 82,
    highestPackage: 20.0,
    averagePackage: 7.5,
    totalOffers: 335,
    companiesVisited: 50,
    departmentWise: [
      { department: "CSE", placedCount: 92 },
      { department: "IT", placedCount: 45 },
      { department: "MECH", placedCount: 82 },
      { department: "ELEC", placedCount: 38 },
      { department: "ENTC", placedCount: 42 },
      { department: "CIVIL", placedCount: 24 },
    ],
  },
  {
    academicYear: "2020-21",
    placementPercentage: 78,
    highestPackage: 18.5,
    averagePackage: 6.8,
    totalOffers: 298,
    companiesVisited: 42,
    departmentWise: [
      { department: "CSE", placedCount: 82 },
      { department: "IT", placedCount: 40 },
      { department: "MECH", placedCount: 75 },
      { department: "ELEC", placedCount: 35 },
      { department: "ENTC", placedCount: 38 },
      { department: "CIVIL", placedCount: 20 },
    ],
  },
  {
    academicYear: "2019-20",
    placementPercentage: 75,
    highestPackage: 16.5,
    averagePackage: 6.2,
    totalOffers: 265,
    companiesVisited: 38,
    departmentWise: [
      { department: "CSE", placedCount: 70 },
      { department: "IT", placedCount: 35 },
      { department: "MECH", placedCount: 68 },
      { department: "ELEC", placedCount: 30 },
      { department: "ENTC", placedCount: 32 },
      { department: "CIVIL", placedCount: 18 },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✓ Connected to MongoDB\n");

    const db = mongoose.connection.db;
    const collection = db.collection("placementstats");

    // Clear existing data
    await collection.deleteMany({});
    console.log("✓ Cleared existing placement statistics\n");

    // Insert new data
    const result = await collection.insertMany(placementStats);
    console.log(
      `✓ Inserted ${result.insertedIds.length} placement statistics records:\n`,
    );

    for (const stat of placementStats) {
      console.log(
        `  📊 ${stat.academicYear}: ${stat.placementPercentage}% placement | ${stat.totalOffers} total offers`,
      );
    }

    console.log("\n✓ Placement statistics seeded successfully!");
    console.log("   You can now view them in the placement admin panel.");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("✗ Error seeding data:", error.message);
    process.exit(1);
  }
}

seed();
