#!/usr/bin/env node

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

const syncAdminUser = async () => {
  try {
    const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);
    const adminPassword = String(process.env.ADMIN_PASSWORD || "").trim();
    const adminName = String(process.env.ADMIN_NAME || "Web Team").trim();
    const mongoUri = String(
      process.env.MONGODB_URI || process.env.MONGODB_DIRECT_URI || "",
    ).trim();

    if (!adminEmail) {
      throw new Error("ADMIN_EMAIL is required.");
    }

    if (!adminPassword) {
      throw new Error("ADMIN_PASSWORD is required.");
    }

    if (!mongoUri) {
      throw new Error("MONGODB_URI or MONGODB_DIRECT_URI is required.");
    }

    await mongoose.connect(mongoUri);
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
