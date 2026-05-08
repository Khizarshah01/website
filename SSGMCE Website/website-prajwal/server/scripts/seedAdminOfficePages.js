require("dotenv").config();
const mongoose = require("mongoose");
const PageContent = require("../models/PageContent");
const { adminOfficePages } = require("../data/adminOfficePages");

const MONGO_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/ssgmce";

async function seedAdminOfficePages() {
  const shouldOverwrite = process.argv.includes("--overwrite");
  await mongoose.connect(MONGO_URI);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const page of adminOfficePages) {
    const existing = await PageContent.findOne({ pageId: page.pageId }).lean();

    if (existing) {
      if (!shouldOverwrite) {
        skipped += 1;
        continue;
      }

      await PageContent.updateOne(
        { pageId: page.pageId },
        {
          $set: {
            route: page.route,
            pageTitle: page.pageTitle,
            pageDescription: page.pageDescription,
            category: page.category,
            template: page.template,
            isPublished: page.isPublished,
            parentMenu: page.parentMenu,
            menuLabel: page.menuLabel,
            menuOrder: page.menuOrder,
            showInMenu: page.showInMenu,
            sections: page.sections,
          },
        },
      );
      updated += 1;
    } else {
      await PageContent.create(page);
      created += 1;
    }
  }

  return {
    total: adminOfficePages.length,
    created,
    updated,
    skipped,
    shouldOverwrite,
  };
}

seedAdminOfficePages()
  .then(({ total, created, updated, skipped, shouldOverwrite }) => {
    console.log(
      `Admin office pages seeded: total=${total}, created=${created}, updated=${updated}, skipped=${skipped}, overwrite=${shouldOverwrite}`,
    );
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to seed admin office pages", error);
    process.exit(1);
  });
