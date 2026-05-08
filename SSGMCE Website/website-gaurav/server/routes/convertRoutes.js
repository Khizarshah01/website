const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  docUpload,
  convertDocument,
} = require("../controllers/convertController");

// Custom lightweight auth for document conversion
const lightweightAuth = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please login.",
      });
    }

    // Just verify the JWT signature without checking user in DB
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "ssgmce-admin-secret-key-2024",
    );
    req.user = decoded; // Simplified user object
    next();
  } catch (error) {
    console.error("[convertRoutes] Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// POST /api/convert/document — Upload a PDF or DOCX and receive Markdown
router.post(
  "/document",
  lightweightAuth,
  docUpload.single("document"),
  convertDocument,
);

module.exports = router;
