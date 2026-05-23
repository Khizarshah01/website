const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const mongoConnectOptions = {
  family: 4,
  serverSelectionTimeoutMS: 5000,
};

const getMongoCandidates = () => {
  const directUri = String(process.env.MONGODB_DIRECT_URI || "").trim();
  const primaryUri = String(process.env.MONGODB_URI || "").trim();
  return [directUri, primaryUri].filter(Boolean);
};

const exportAdmins = async () => {
  try {
    const mongoCandidates = getMongoCandidates();
    let connected = false;
    for (const candidate of mongoCandidates) {
      try {
        await mongoose.connect(candidate, mongoConnectOptions);
        connected = true;
        break;
      } catch (error) {}
    }

    if (!connected) throw new Error("Failed to connect to MongoDB");

    const emails = [
      "admin.cse@ssgmce.ac.in",
      "admin.it@ssgmce.ac.in",
      "admin.mech@ssgmce.ac.in",
      "admin.electrical@ssgmce.ac.in",
      "admin.entc@ssgmce.ac.in",
      "admin.mba@ssgmce.ac.in",
      "admin.ash@ssgmce.ac.in"
    ];

    const users = await User.find({ email: { $in: emails } }).select("+password").lean();
    
    // We need to format it so Compass/mongoimport likes it. Often just JSON array is fine.
    fs.writeFileSync(path.resolve(__dirname, "..", "department_admins.json"), JSON.stringify(users, null, 2));
    console.log("Successfully exported " + users.length + " users to department_admins.json");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

exportAdmins();
