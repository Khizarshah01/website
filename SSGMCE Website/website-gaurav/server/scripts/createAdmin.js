#!/usr/bin/env node

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("./models/User");

// Load env variables
dotenv.config({ path: path.join(__dirname, ".env") });

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/ssgmce",
    );
    console.log("✓ Connected to MongoDB");

    // Check if admin user already exists
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (adminExists) {
      console.log("✓ Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: process.env.ADMIN_NAME || "Admin",
      email: process.env.ADMIN_EMAIL || "admin@ssgmce.com",
      password: process.env.ADMIN_PASSWORD || "password123",
      role: "SuperAdmin",
      department: "All",
    });

    console.log("✓ Admin user created successfully!");
    console.log("  Email:", admin.email);
    console.log("  Role:", admin.role);

    process.exit(0);
  } catch (error) {
    console.error("✗ Error creating admin user:", error.message);
    process.exit(1);
  }
};

createAdminUser();
