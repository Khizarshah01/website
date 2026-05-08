/**
 * convertAdmissionsToMarkdown.js
 *
 * Converts all `table`, `list`, and `timeline` sections in admissions-*
 * pages to `markdown` type so they are fully editable in the admin panel.
 *
 * Run: node server/scripts/convertAdmissionsToMarkdown.js
 */

require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("MONGODB_URI not set in .env");
  process.exit(1);
}

// ─── Converters ───────────────────────────────────────────────────────────────

function tableToMarkdown(content) {
  const { headers, rows } = content;
  if (!headers || !rows) return "";
  const sep = headers.map(() => "---");
  const lines = [
    "| " + headers.join(" | ") + " |",
    "| " + sep.join(" | ") + " |",
    ...rows.map((row) => "| " + row.join(" | ") + " |"),
  ];
  return lines.join("\n");
}

function listToMarkdown(content) {
  const { items } = content;
  if (!items) return "";
  return items.map((item) => `- ${item}`).join("\n");
}

function timelineToMarkdown(content) {
  const { events } = content;
  if (!events) return "";
  return events
    .map((e) => {
      let md = `### ${e.year}${e.title ? " — " + e.title : ""}`;
      if (e.description) md += `\n\n${e.description}`;
      return md;
    })
    .join("\n\n---\n\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB\n");

  const col = mongoose.connection.db.collection("pagecontents");
  const pages = await col
    .find({ pageId: /^admissions-/ })
    .project({ pageId: 1, sections: 1 })
    .toArray();

  let totalConverted = 0;

  for (const page of pages) {
    const sections = page.sections || [];
    let changed = false;

    const updated = sections.map((section) => {
      const type = section.type;

      if (type === "table") {
        const text = tableToMarkdown(section.content || {});
        console.log(`  [table→markdown] ${page.pageId} / ${section.sectionId}`);
        changed = true;
        totalConverted++;
        return { ...section, type: "markdown", content: { text } };
      }

      if (type === "list") {
        const text = listToMarkdown(section.content || {});
        console.log(`  [list→markdown]  ${page.pageId} / ${section.sectionId}`);
        changed = true;
        totalConverted++;
        return { ...section, type: "markdown", content: { text } };
      }

      if (type === "timeline") {
        const text = timelineToMarkdown(section.content || {});
        console.log(
          `  [timeline→markdown] ${page.pageId} / ${section.sectionId}`,
        );
        changed = true;
        totalConverted++;
        return { ...section, type: "markdown", content: { text } };
      }

      return section; // no change
    });

    if (changed) {
      await col.updateOne(
        { _id: page._id },
        { $set: { sections: updated, updatedAt: new Date() } },
      );
      console.log(`✅ Updated: ${page.pageId}\n`);
    }
  }

  console.log(`─────────────────────────────────────────`);
  console.log(`Done. ${totalConverted} section(s) converted to markdown.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
