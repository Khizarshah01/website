/**
 * cleanupStaleFacilitiesPages.js
 *
 * One-time script to remove stale/orphan facilities pages from the database.
 * Only pages whose pageId is NOT in the valid set from allNavPages.js will be
 * removed. This fixes the issue of blank duplicate pages appearing in the
 * admin panel.
 *
 * Usage:
 *   cd server && node scripts/cleanupStaleFacilitiesPages.js          # dry-run
 *   cd server && node scripts/cleanupStaleFacilitiesPages.js --apply  # actually delete
 */

require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const PageContent = require("../models/PageContent");
const allNavPages = require("../data/allNavPages");

const DRY_RUN = !process.argv.includes("--apply");

async function cleanup() {
  await connectDB();

  console.log(
    DRY_RUN
      ? "\n🔍 DRY RUN — no changes will be made.\n"
      : "\n⚡ APPLYING — stale pages will be deleted.\n",
  );

  // Build the set of valid facilities pageIds from allNavPages
  const validIds = new Set(
    allNavPages
      .filter((p) => p.category === "facilities")
      .map((p) => p.pageId),
  );

  console.log(`Valid facilities pageIds (${validIds.size}):`);
  for (const id of [...validIds].sort()) {
    console.log(`  ✅ ${id}`);
  }

  // Find all facilities pages in the DB
  const dbPages = await PageContent.find({
    $or: [
      { category: "facilities" },
      { pageId: { $regex: /^facilities-/ } },
    ],
  }).select("pageId pageTitle sections");

  console.log(`\nFacilities pages in database: ${dbPages.length}`);

  const stalePages = dbPages.filter((p) => !validIds.has(p.pageId));

  if (stalePages.length === 0) {
    console.log("\n✅ No stale facilities pages found. Database is clean.\n");
    await mongoose.disconnect();
    process.exit(0);
  }

  console.log(`\n❌ Stale pages to remove (${stalePages.length}):`);
  for (const page of stalePages) {
    const sectionCount = page.sections?.length || 0;
    const hasContent = sectionCount > 0;
    console.log(
      `  🗑️  ${page.pageId} — "${page.pageTitle}" (${sectionCount} section(s), ${hasContent ? "HAS CONTENT" : "blank"})`,
    );
  }

  if (!DRY_RUN) {
    for (const page of stalePages) {
      await PageContent.deleteOne({ pageId: page.pageId });
      console.log(`  Deleted: ${page.pageId}`);
    }
    console.log(`\n✅ Removed ${stalePages.length} stale page(s).\n`);
  } else {
    console.log(
      `\nRe-run with --apply to actually delete these ${stalePages.length} page(s).\n`,
    );
  }

  await mongoose.disconnect();
}

cleanup().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
