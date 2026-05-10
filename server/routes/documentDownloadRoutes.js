const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const {
  DOCUMENTS_ROOT,
  resolveDocumentPath,
  resolveExistingDocumentPath,
} = require("../utils/documentPathAliases");
const {
  getAuthTokenFromRequest,
  getJwtSecret,
} = require("../utils/authSecurity");
const { isTokenBlacklisted } = require("../utils/tokenBlacklist");

const router = express.Router();
const documentsRoot = path.resolve(DOCUMENTS_ROOT);
const JWT_SECRET = getJwtSecret();
const PUBLIC_PATHS = new Set([
  "departments",
  "academics",
  "research",
  "institution",
]);
const PROTECTED_PATHS = new Set(["admin-office", "internal", "private"]);

const normalizeFirstPathSegment = (requestedPath = "") =>
  String(requestedPath || "")
    .split("/")
    .find(Boolean)
    ?.trim()
    .toLowerCase() || "";

const ensureProtectedPathAccess = (req, res, requestedPath = "") => {
  const firstSegment = normalizeFirstPathSegment(requestedPath);
  const isProtected = PROTECTED_PATHS.has(firstSegment);
  const isPublic = PUBLIC_PATHS.has(firstSegment);

  if (!isProtected || isPublic) {
    return true;
  }

  const token = getAuthTokenFromRequest(req);
  if (!token) {
    res.status(401).json({ error: "Authentication required." });
    return false;
  }

  if (isTokenBlacklisted(token)) {
    res.status(401).json({ error: "Session expired. Please log in again." });
    return false;
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (_error) {
    res.status(403).json({ error: "Invalid or expired token." });
    return false;
  }
};

// Serve document by filename (supports nested paths like institution/administration/file.pdf)
router.get("/download/*", (req, res) => {
  try {
    // Get the filename from params (params[0] contains the * match)
    const filename = req.params[0];

    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    if (!ensureProtectedPathAccess(req, res, filename)) {
      return;
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
    if (!ensureProtectedPathAccess(req, res, category)) {
      return;
    }

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
    if (!ensureProtectedPathAccess(req, res, requestedPath)) {
      return;
    }

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
