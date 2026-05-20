#!/usr/bin/env node

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const PageContent = require("../models/PageContent");

// Load env like other scripts
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const uri =
  process.env.MONGODB_DIRECT_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/ssgmce";

async function run() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

  const pageId = "contact-us";

  const existing = await PageContent.findOne({ pageId }).lean();
  if (existing) {
    console.log(`Page '${pageId}' already exists (id=${existing._id}).`);
    await mongoose.disconnect();
    return;
  }

  const payload = {
    pageId,
    pageTitle: "Contact Us",
    pageDescription: "Contact information and location",
    route: "/contact",
    category: "about",
    template: "generic",
    isPublished: true,
    sections: [
      {
        sectionId: "contact-info",
        title: "Contact Information",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `**Shri Sant Gajanan Maharaj College of Engineering (SSGMCE)**\n\nKhamgaon Road, SHEGAON – 444203, Dist. Buldhana (M.S.) INDIA\n\n**Official Phone:** 8669638081 / 8669638082\n**Email:** principal@ssgmce.ac.in, registrar@ssgmce.ac.in\n\nYou can edit this content from the Admin → Pages → Contact Us.`,
        },
      },
    ],
  };

  const created = await PageContent.create(payload);
  console.log(`Created page '${pageId}' with _id=${created._id}`);
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
