#!/usr/bin/env node

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

const syncAdminUser = async () => {
  try {
    const adminEmail = normalizeEmail(
      process.env.ADMIN_EMAIL || "webteam@ssgmce.ac.in",
    );
    const adminPassword = String(process.env.ADMIN_PASSWORD || "Gaj*1234").trim();
    const adminName = String(process.env.ADMIN_NAME || "Web Team").trim();

    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/ssgmce",
    );
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
