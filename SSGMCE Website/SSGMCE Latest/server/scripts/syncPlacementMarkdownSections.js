/**
 * Migration Script: Add Placement Statistics Markdown Sections
 *
 * This script adds markdown-formatted placement statistics sections
 * to the placements-statistics page for easy editing in the admin panel.
 *
 * Run: node server/scripts/syncPlacementMarkdownSections.js
 */

require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("MONGODB_URI not set in .env");
  process.exit(1);
}

async function syncSections() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✓ Connected to MongoDB\n");

    const db = mongoose.connection.db;
    const collection = db.collection("pagecontents");

    // ─── Check if page exists ───
    let page = await collection.findOne({ pageId: "placements-statistics" });

    if (!page) {
      console.log("  Creating placements-statistics page...\n");
      page = {
        pageId: "placements-statistics",
        pageTitle: "Placement Statistics",
        pageDescription: "SSGMCE Placement Statistics - Year-wise Analysis",
        route: "/placements/statistics",
        category: "placements",
        template: "generic",
        isPublished: true,
        sections: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    // ─── Define new markdown sections ───
    const newSections = [
      {
        sectionId: "stats-intro",
        title: "Placement Overview",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: "## Placement Statistics\n\nAt SSGMCE, we take pride in our strong placement record with consistent performance across all academic years. Our dedicated Training & Placement Cell works tirelessly to connect our talented students with leading companies across India and globally.",
        },
      },
      {
        sectionId: "stats-summary",
        title: "Recent Year Summary (2023-24)",
        type: "markdown",
        order: 2,
        isVisible: true,
        content: {
          text: "| Metric | Value |\n|--------|-------|\n| **Placement Rate** | 88% |\n| **Highest Package** | ₹24.5 LPA |\n| **Average Package** | ₹8.2 LPA |\n| **Total Offers** | 385 |\n| **Companies Visited** | 65+ |",
        },
      },
      {
        sectionId: "stats-department-wise",
        title: "Department-wise Placement (2023-24)",
        type: "markdown",
        order: 3,
        isVisible: true,
        content: {
          text: "| Department | Students Placed |\n|------------|------------------|\n| **Computer Science & Engineering (CSE)** | 105 |\n| **Information Technology (IT)** | 52 |\n| **Mechanical Engineering** | 98 |\n| **Electrical Engineering** | 47 |\n| **Electronics & Telecommunication** | 52 |\n| **Civil Engineering** | 31 |",
        },
      },
      {
        sectionId: "stats-year-wise",
        title: "Year-wise Placement Statistics",
        type: "markdown",
        order: 4,
        isVisible: true,
        content: {
          text: "### Academic Year 2023-24\n- **Placement Rate**: 88%\n- **Highest Package**: ₹24.5 LPA\n- **Average Package**: ₹8.2 LPA\n- **Total Offers**: 385\n- **Companies Visited**: 65\n\n### Academic Year 2022-23\n- **Placement Rate**: 85%\n- **Highest Package**: ₹22.5 LPA\n- **Average Package**: ₹7.8 LPA\n- **Total Offers**: 365\n- **Companies Visited**: 58\n\n### Academic Year 2021-22\n- **Placement Rate**: 82%\n- **Highest Package**: ₹20.0 LPA\n- **Average Package**: ₹7.5 LPA\n- **Total Offers**: 335\n- **Companies Visited**: 50\n\n### Academic Year 2020-21\n- **Placement Rate**: 78%\n- **Highest Package**: ₹18.5 LPA\n- **Average Package**: ₹6.8 LPA\n- **Total Offers**: 298\n- **Companies Visited**: 42\n\n### Academic Year 2019-20\n- **Placement Rate**: 75%\n- **Highest Package**: ₹16.5 LPA\n- **Average Package**: ₹6.2 LPA\n- **Total Offers**: 265\n- **Companies Visited**: 38",
        },
      },
      {
        sectionId: "stats-key-highlights",
        title: "Key Highlights",
        type: "markdown",
        order: 5,
        isVisible: true,
        content: {
          text: "- **Consistent Growth**: Year-on-year improvement in placement statistics\n- **Diverse Opportunities**: Placements in top IT companies, manufacturing, finance, and consulting firms\n- **Global Reach**: International placements in companies like Siemens, TCS, Accenture, and more\n- **Competitive Packages**: Average CTC of ₹8.2 LPA with highest package reaching ₹24.5 LPA\n- **100% Fee Reimbursement**: Students from reserved categories receive full fee support\n- **Internship Integration**: Strong internship programs that often lead to permanent positions",
        },
      },
    ];

    // ─── Update page with new sections ───
    page.sections = newSections;
    page.updatedAt = new Date();

    if (page._id) {
      // Update existing document
      await collection.updateOne(
        { pageId: "placements-statistics" },
        { $set: page },
      );
      console.log(
        "✓ Updated placements-statistics page with markdown sections\n",
      );
    } else {
      // Insert new document
      await collection.insertOne(page);
      console.log(
        "✓ Created placements-statistics page with markdown sections\n",
      );
    }

    // ─── Verify ───
    const updated = await collection.findOne({
      pageId: "placements-statistics",
    });
    console.log("✓ Verification:");
    console.log(`  - Sections count: ${updated.sections.length}`);
    updated.sections.forEach((s) => {
      console.log(`    ✓ ${s.sectionId}: ${s.title} [${s.type}]`);
    });

    console.log(
      "\n✓ Placement statistics markdown sections synced successfully!",
    );
    console.log("   You can now edit these sections in the admin panel.");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("✗ Error syncing sections:", error.message);
    process.exit(1);
  }
}

syncSections();
