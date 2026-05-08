/**
 * Database Initialization Utility
 * This module handles database initialization tasks when the server starts
 */

const { autoSeedMissingPages } = require("../controllers/pageContentController");

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
    
    // Keep PageContent aligned with seed data while preserving admin edits.
    await autoSeedMissingPages();
    
    console.log("[DB Init] Database initialization completed");
    return true;
  } catch (error) {
    console.error("[DB Init] Initialization error:", error);
    throw error;
  }
}

module.exports = {
  initializeDatabase,
};
