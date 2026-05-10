const express = require("express");
const router = express.Router();
const {
  docUpload,
  convertDocument,
} = require("../controllers/convertController");
const {
  protect,
  adminOrCoordinator,
} = require("../middleware/authMiddleware");

// POST /api/convert/document — Upload a PDF or DOCX and receive Markdown
router.post(
  "/document",
  protect,
  adminOrCoordinator,
  docUpload.single("document"),
  convertDocument,
);

module.exports = router;
