/*
 * Syncs the Research & Innovation pages in MongoDB to the generated
 * Markdown-backed content used by the new editable flow.
 *
 * It updates only when a page is:
 * - missing
 * - empty
 * - still using legacy non-markdown sections
 * - still showing the default "Welcome to ..." placeholder text
 *
 * Run:
 *   node server/scripts/syncResearchMarkdownContent.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const PageContent = require("../models/PageContent");
const allNavPages = require("../data/allNavPages");
const {
  researchMarkdownPages,
  RESEARCH_MARKDOWN_PAGE_IDS,
} = require("../data/researchMarkdownContent");

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("MONGODB_URI not set in server/.env");
  process.exit(1);
}

const researchSeedPages = allNavPages.filter((page) =>
  RESEARCH_MARKDOWN_PAGE_IDS.includes(page.pageId),
);

const hasMarkdownSections = (page) =>
  Array.isArray(page?.sections) &&
  page.sections.some((section) => section.type === "markdown");

const isPlaceholderPage = (page) => {
  if (!Array.isArray(page?.sections) || page.sections.length === 0) return false;

  return page.sections.some((section) => {
    const text = String(section?.content?.text || "").trim();
    return (
      text.startsWith("Welcome to the ") &&
      text.includes("This content can be edited from the admin panel.")
    );
  });
};

const shouldReplace = (page) => {
  if (!page) return true;
  if (!Array.isArray(page.sections) || page.sections.length === 0) return true;
  if (isPlaceholderPage(page)) return true;
  if (!hasMarkdownSections(page)) return true;
  return false;
};

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const seedPage of researchSeedPages) {
    const existing = await PageContent.findOne({ pageId: seedPage.pageId });

    if (!shouldReplace(existing)) {
      skipped += 1;
      console.log(`SKIP    ${seedPage.pageId}`);
      continue;
    }

    const payload = {
      pageTitle: seedPage.pageTitle,
      pageDescription: seedPage.pageDescription,
      route: seedPage.route,
      category: seedPage.category,
      template: seedPage.template,
      isPublished: seedPage.isPublished,
      sections: researchMarkdownPages[seedPage.pageId],
      updatedAt: new Date(),
    };

    if (!existing) {
      await PageContent.create({
        pageId: seedPage.pageId,
        ...payload,
      });
      created += 1;
      console.log(`CREATE   ${seedPage.pageId}`);
      continue;
    }

    await PageContent.updateOne({ _id: existing._id }, { $set: payload });
    updated += 1;
    console.log(`UPDATE   ${seedPage.pageId}`);
  }

  console.log(`Done. ${created} created, ${updated} updated, ${skipped} skipped.`);
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error("Fatal:", error);
  process.exit(1);
});
