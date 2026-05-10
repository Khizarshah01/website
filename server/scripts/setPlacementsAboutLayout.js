require("dotenv").config();
const mongoose = require("mongoose");
const PageContent = require("../models/PageContent");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, {
    family: 4,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  const page = await PageContent.findOne({ pageId: "placements-about" });
  if (!page) {
    console.log("placements-about page not found");
    await mongoose.disconnect();
    process.exit(1);
  }

  page.templateData = {
    ...(page.templateData || {}),
    layout: "placements-about-v1",
  };
  page.markModified("templateData");
  await page.save();

  console.log(
    `updated pageId=${page.pageId} templateData.layout=${page.templateData.layout}`,
  );
  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error("failed:", error.message);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore disconnect errors
  }
  process.exit(1);
});
