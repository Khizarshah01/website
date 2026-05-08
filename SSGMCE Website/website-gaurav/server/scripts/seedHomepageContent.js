const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { seedHomepageContent } = require("../utils/seedHomepageContent");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../env") });

const uri =
  process.env.MONGODB_URI ||
  process.env.MONGODB_DIRECT_URI ||
  "mongodb://localhost:27017/ssgmce";

async function run() {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
  });

  await seedHomepageContent();
  await mongoose.disconnect();
  console.log("Homepage news and events seeded.");
}

run().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
