const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const documentsRoot = path.resolve(__dirname, "../uploads/documents");

const resolveDocumentPath = (unsafeRelativePath = "") => {
  const normalized = String(unsafeRelativePath || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");
  const resolvedPath = path.resolve(documentsRoot, normalized);

  if (!resolvedPath.startsWith(documentsRoot)) {
    return null;
  }

  return resolvedPath;
};

// Serve document by filename (supports nested paths like institution/administration/file.pdf)
router.get("/download/*", (req, res) => {
  try {
    // Get the filename from params (params[0] contains the * match)
    const filename = req.params[0];

    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const filePath = resolveDocumentPath(filename);
    if (!filePath) {
      return res.status(400).json({ error: "Invalid document path" });
    }

    // Verify file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Document not found" });
    }

    const extension = path.extname(filePath).toLowerCase();
    const isPdf = extension === ".pdf";
    res.setHeader(
      "Content-Type",
      isPdf ? "application/pdf" : "application/octet-stream",
    );
    res.setHeader(
      "Content-Disposition",
      `${isPdf ? "inline" : "attachment"}; filename="${encodeURIComponent(
        path.basename(filePath),
      )}"`,
    );

    res.sendFile(filePath);
  } catch (error) {
    console.error("Document download error:", error);
    res.status(500).json({ error: "Failed to download document" });
  }
});

// List documents in a category
router.get("/list/*", (req, res) => {
  try {
    const category = req.params[0] || "";
    const dirPath = resolveDocumentPath(category);

    if (!dirPath) {
      return res.status(400).json({ error: "Invalid category path" });
    }

    if (!fs.existsSync(dirPath)) {
      return res.status(404).json({ error: "Category not found" });
    }

    const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".pdf"));
    res.json({ files, category });
  } catch (error) {
    console.error("List documents error:", error);
    res.status(500).json({ error: "Failed to list documents" });
  }
});

module.exports = router;
