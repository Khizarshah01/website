const express = require("express");
const fs = require("fs");
const path = require("path");
const { resolveExistingDocumentPath } = require("../utils/documentPathAliases");

const router = express.Router();
const documentsRoot = path.resolve(__dirname, "../uploads/documents");

// Serve document by filename (supports nested paths like institution/administration/file.pdf)
router.get("/download/*", (req, res) => {
  try {
    // Get the filename from params (params[0] contains the * match)
    const filename = req.params[0];

    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const resolvedDocument = resolveExistingDocumentPath(documentsRoot, filename);
    if (!resolvedDocument) {
      return res.status(400).json({ error: "Invalid document path" });
    }

    const extension = path.extname(resolvedDocument.absolutePath).toLowerCase();
    const isPdf = extension === ".pdf";
    res.setHeader(
      "Content-Type",
      isPdf ? "application/pdf" : "application/octet-stream",
    );
    res.setHeader(
      "Content-Disposition",
      `${isPdf ? "inline" : "attachment"}; filename="${encodeURIComponent(
        path.basename(resolvedDocument.absolutePath),
      )}"`,
    );

    res.sendFile(resolvedDocument.absolutePath);
  } catch (error) {
    console.error("Document download error:", error);
    res.status(500).json({ error: "Failed to download document" });
  }
});

// List documents in a category
router.get("/list/*", (req, res) => {
  try {
    const category = req.params[0] || "";
    const resolvedDocument = resolveExistingDocumentPath(documentsRoot, category);
    if (!resolvedDocument) {
      return res.status(400).json({ error: "Invalid category path" });
    }

    if (!fs.statSync(resolvedDocument.absolutePath).isDirectory()) {
      return res.status(404).json({ error: "Category not found" });
    }

    const files = fs
      .readdirSync(resolvedDocument.absolutePath)
      .filter((file) => file.endsWith(".pdf"));
    res.json({ files, category: resolvedDocument.relativePath });
  } catch (error) {
    console.error("List documents error:", error);
    res.status(500).json({ error: "Failed to list documents" });
  }
});

module.exports = router;
