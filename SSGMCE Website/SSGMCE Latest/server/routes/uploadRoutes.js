const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  upload,
  uploadSingleImage,
  documentUpload,
  uploadSingleDocument,
  getUploadedFiles,
  deleteFile,
  nirfUpload,
  uploadNirfPdf,
} = require("../controllers/uploadController");

// Protected routes - admin or coordinator (coordinators need upload for faculty images)
const {
  adminOrCoordinator,
  adminOnly,
} = require("../middleware/authMiddleware");
router.post(
  "/image",
  protect,
  adminOrCoordinator,
  upload.single("image"),
  uploadSingleImage,
);
router.post(
  "/file",
  protect,
  adminOrCoordinator,
  documentUpload.single("file"),
  uploadSingleDocument,
);
router.get("/files", protect, adminOrCoordinator, getUploadedFiles);
router.delete("/files/:filename", protect, adminOrCoordinator, deleteFile);
router.delete("/file", protect, adminOrCoordinator, deleteFile);
router.post(
  "/nirf-pdf",
  protect,
  adminOnly,
  nirfUpload.single("pdf"),
  uploadNirfPdf,
);

module.exports = router;
