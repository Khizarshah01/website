#!/usr/bin/env node

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

// Match server boot behavior: load server/.env first, then project-root .env.
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

const mongoConnectOptions = {
  family: 4,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 5,
  minPoolSize: 1,
};

const getMongoCandidates = () => {
  const directUri = String(process.env.MONGODB_DIRECT_URI || "").trim();
  const primaryUri = String(process.env.MONGODB_URI || "").trim();
  const legacyUri = String(process.env.MONGO_URI || "").trim();
  const localUri = "mongodb://localhost:27017/ssgmce";

  return [directUri, primaryUri, legacyUri, localUri].filter(Boolean);
};

const syncAdminUser = async () => {
  try {
    const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);
    const adminPassword = String(process.env.ADMIN_PASSWORD || "").trim();
    const adminName = String(process.env.ADMIN_NAME || "Web Team").trim();
    const mongoCandidates = getMongoCandidates();
    const mongoUri = mongoCandidates[0] || "";

    if (!adminEmail) {
      throw new Error("ADMIN_EMAIL is required.");
    }

    if (!adminPassword) {
      throw new Error("ADMIN_PASSWORD is required.");
    }

    if (!mongoUri) {
      throw new Error(
        "MONGODB_DIRECT_URI, MONGODB_URI, or a local MongoDB instance is required.",
      );
    }

    let connected = false;
    let lastError = null;
    for (const candidate of mongoCandidates) {
      try {
        await mongoose.connect(candidate, mongoConnectOptions);
        connected = true;
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!connected) {
      throw lastError || new Error("Failed to connect to MongoDB");
    }
    console.log("Connected to MongoDB");

    let adminUser = await User.findOne({ email: adminEmail }).select("+password");

    if (!adminUser) {
      adminUser = await User.findOne({ role: "SuperAdmin" })
        .sort({ createdAt: 1 })
        .select("+password");
    }

    if (adminUser) {
      adminUser.name = adminName;
      adminUser.email = adminEmail;
      adminUser.password = adminPassword;
      adminUser.role = "SuperAdmin";
      adminUser.department = "All";
      adminUser.isActive = true;
      await adminUser.save();

      console.log("Admin user updated successfully");
      console.log("Email:", adminUser.email);
      console.log("Role:", adminUser.role);
      process.exit(0);
    }

    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "SuperAdmin",
      department: "All",
    });

    console.log("Admin user created successfully");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    process.exit(0);
  } catch (error) {
    console.error("Error syncing admin user:", error.message);
    process.exit(1);
  }
};

syncAdminUser();
