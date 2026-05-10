const express = require("express");
const fs = require("fs");
const path = require("path");
const {
  DOCUMENTS_ROOT,
  resolveDocumentPath,
  resolveExistingDocumentPath,
} = require("../utils/documentPathAliases");

const router = express.Router();
const documentsRoot = path.resolve(DOCUMENTS_ROOT);

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

// Serve structured documents by nested path, with legacy aliases as fallback.
// Example: GET /api/documents/departments/cse/syllabus/file.pdf
router.get("/*", (req, res) => {
  try {
    const requestedPath = req.params[0] || "";
    const safePath = path
      .normalize(requestedPath)
      .replace(/^(\.\.(\/|\\|$))+/, "");
    const resolvedPath = resolveDocumentPath(safePath);

    if (!resolvedPath) {
      return res.status(404).json({ error: "Document not found." });
    }

    const stat = fs.statSync(resolvedPath);
    if (!stat.isFile()) {
      return res.status(400).json({ error: "Requested path is not a file." });
    }

    return res.sendFile(resolvedPath);
  } catch (error) {
    console.error("Structured document route error:", error);
    return res.status(500).json({ error: "Failed to serve document." });
  }
});

module.exports = router;
