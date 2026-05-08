/**
 * Migration Script: Convert richtext sections to markdown for facility pages.
 *
 * This script finds all PageContent documents whose pageId starts with "facilities-"
 * and converts any sections with type "richtext" to type "markdown", converting
 * the HTML content to Markdown using Turndown.
 *
 * Usage:
 *   cd server && node scripts/migrateRichtextToMarkdown.js
 *
 * Options:
 *   --dry-run   Show what would change without saving (default)
 *   --apply     Actually save the changes to MongoDB
 */

const mongoose = require("mongoose");
const TurndownService = require("turndown");
const { gfm } = require("turndown-plugin-gfm");
const connectDB = require("../config/db");
const PageContent = require("../models/PageContent");

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.use(gfm);

const DRY_RUN = !process.argv.includes("--apply");

async function migrate() {
  await connectDB();

  console.log(DRY_RUN ? "\n🔍 DRY RUN — no changes will be saved.\n" : "\n⚡ APPLYING changes to database.\n");

  const pages = await PageContent.find({
    pageId: { $regex: /^facilities-/ },
  });

  console.log(`Found ${pages.length} facility page(s) in DB.\n`);

  let totalConverted = 0;

  for (const page of pages) {
    let changed = false;

    for (const section of page.sections) {
      if (section.type === "richtext" && section.content?.text) {
        const html = section.content.text;
        const md = turndown.turndown(html);

        console.log(`  [${page.pageId}] Section "${section.sectionId}" (${section.title})`);
        console.log(`    HTML length: ${html.length} → MD length: ${md.length}`);

        if (!DRY_RUN) {
          section.type = "markdown";
          section.content.text = md;
        }

        changed = true;
        totalConverted++;
      }
    }

    if (changed && !DRY_RUN) {
      await page.save();
      console.log(`  ✅ Saved ${page.pageId}\n`);
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Total richtext sections found: ${totalConverted}`);
  if (DRY_RUN) {
    console.log("Run with --apply to save changes.");
  } else {
    console.log("All changes saved successfully.");
  }

  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
