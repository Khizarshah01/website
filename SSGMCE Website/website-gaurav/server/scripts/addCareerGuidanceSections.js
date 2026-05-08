/**
 * Migration Script: Add Activity Report Section to Career Guidance Page
 *
 * This script adds an Activity Report section to the placements-career page
 * that displays career guidance cell activities data in table format.
 *
 * Run: node scripts/addCareerGuidanceSections.js
 */

const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

// Parse env file manually
const envPath = path.resolve(__dirname, "../.env");
const envContent = fs.readFileSync(envPath, "utf-8");
const envLines = envContent.split("\n");

const envVars = {};
envLines.forEach((line) => {
  if (line.trim() && !line.startsWith("#")) {
    const [key, ...valueParts] = line.split("=");
    envVars[key.trim()] = valueParts.join("=").trim();
  }
});

const MONGO_URI = envVars.MONGODB_URI;
if (!MONGO_URI) {
  console.error("MONGODB_URI not set in .env");
  process.exit(1);
}

async function addSections() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✓ Connected to MongoDB\n");

    const db = mongoose.connection.db;
    const collection = db.collection("pagecontents");

    // ─── Check if page exists ───
    let page = await collection.findOne({ pageId: "placements-career" });

    if (!page) {
      console.log("  Creating placements-career page...\n");
      page = {
        pageId: "placements-career",
        pageTitle: "Career Guidance Cell",
        pageDescription: "Career Guidance Cell - SSGMCE",
        route: "/placements/career",
        category: "placements",
        template: "generic",
        isPublished: true,
        sections: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    // ─── Get current max order ───
    const maxOrder =
      page.sections?.length > 0
        ? Math.max(...page.sections.map((s) => s.order || 0))
        : 0;

    // ─── Define new section ───
    const newSection = {
      sectionId: "activity-report",
      title: "Activity Report",
      type: "markdown",
      order: maxOrder + 1,
      isVisible: true,
      content: {
        text: `| Sr.No | Academic Year | No. of Activities | No. of Beneficiary | Detail Report |
|-------|---------------|--------------------|-------------------|-----------------|
| 1 | 2023-24 | 08 | 1762 | Click for Details Report |
| 2 | 2022-23 | 29 | 3416 | Click for Details Report |
| 3 | 2021-22 | 04 | 457 | Click for Details Report |
| 4 | 2020-21 | 08 | 954 | Click for Details Report |
| 5 | 2019-20 | 04 | 933 | Click for Details Report |
| 6 | 2018-19 | 10 | 773 | Click for Details Report |`,
      },
    };

    // ─── Update page with new section ───
    page.sections = page.sections || [];
    page.sections.push(newSection);
    page.updatedAt = new Date();

    if (page._id) {
      // Update existing document
      await collection.updateOne(
        { pageId: "placements-career" },
        { $set: page },
      );
      console.log("✓ Updated placements-career page with Activity Report section\n");
    } else {
      // Insert new document
      await collection.insertOne(page);
      console.log(
        "✓ Created placements-career page with Activity Report section\n",
      );
    }

    // ─── Verify ───
    const updated = await collection.findOne({
      pageId: "placements-career",
    });
    console.log("✓ Verification:");
    console.log(`  - Page ID: ${updated.pageId}`);
    console.log(`  - Total sections: ${updated.sections.length}`);
    updated.sections.forEach((s) => {
      console.log(`    ✓ ${s.sectionId}: ${s.title} [${s.type}]`);
    });

    console.log(
      "\n✓ Career Guidance page section added successfully!",
    );
    console.log("   You can now edit this section in the admin panel.");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("✗ Error adding sections:", error.message);
    process.exit(1);
  }
}

addSections();
