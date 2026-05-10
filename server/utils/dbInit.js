/**
 * Database Initialization Utility
 * This module handles database initialization tasks when the server starts
 */

const { autoSeedMissingPages } = require("../controllers/pageContentController");
const { seedHomepageContent } = require("./seedHomepageContent");

const shouldAutoSeed = () =>
  String(process.env.ADMIN_AUTO_SEED || "true").trim().toLowerCase() === "true";

const isStorageQuotaError = (error) =>
  error?.code === 8000 ||
  error?.codeName === "AtlasError" ||
  String(error?.message || "").toLowerCase().includes("space quota");

/**
 * Initialize database - performs any necessary setup tasks
 * Can be extended to:
 * - Create indexes
 * - Seed initial data
 * - Run migrations
 * - Verify collections
 */
async function initializeDatabase() {
  try {
    // Add any database initialization logic here
    console.log("[DB Init] Database initialization started...");

    if (!shouldAutoSeed()) {
      console.log("[DB Init] Auto-seed disabled. Skipping startup writes.");
      return true;
    }

    // Keep PageContent aligned with seed data while preserving admin edits.
    await autoSeedMissingPages();
    await seedHomepageContent();

    console.log("[DB Init] Database initialization completed");
    return true;
  } catch (error) {
    if (isStorageQuotaError(error)) {
      return false;
    }
    console.error("[DB Init] Initialization error:", error);
    throw error;
  }
}

module.exports = {
  initializeDatabase,
};
