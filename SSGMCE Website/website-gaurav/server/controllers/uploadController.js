const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  normalizeCategory,
  uploadBufferToGridFS,
  findLatestFileByName,
  listFilesByCategory,
  deleteFilesByName,
  getBucket,
} = require("../utils/gridfsStorage");

const IMAGE_MAX_SIZE_BYTES = 20 * 1024 * 1024;
const DOCUMENT_MAX_SIZE_BYTES = 50 * 1024 * 1024;

const resolveUploadPath = (relativePath = "") => {
  const sanitizedRelativePath = String(relativePath || "")
    .replace(/^\/+/, "")
    .replace(/^uploads[\\/]/, "uploads/");

  if (!sanitizedRelativePath.startsWith("uploads/")) {
    return null;
  }

  const resolvedPath = path.resolve(sanitizedRelativePath);
  const uploadsRoot = path.resolve("./uploads");

  if (!resolvedPath.startsWith(uploadsRoot)) {
    return null;
  }

  return resolvedPath;
};

const createStoredFilename = (prefix, originalname) => {
  const safePrefix =
    String(prefix || "file")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "") || "file";
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return `${safePrefix}-${uniqueSuffix}${path.extname(originalname || "")}`;
};

// File filter - accepts images and PDFs
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and PDF files are allowed!"), false);
  }
};

// Multer upload instance (images + PDFs)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: {
    fileSize: IMAGE_MAX_SIZE_BYTES,
  },
});

// --- Document / file upload ---
const documentFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv",
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "File type not allowed. Supported: PDF, Word, Excel, PowerPoint, TXT, CSV.",
      ),
      false,
    );
  }
};

const documentUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: documentFilter,
  limits: {
    fileSize: DOCUMENT_MAX_SIZE_BYTES,
  },
});

// Upload single image handler
const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const filename = createStoredFilename("upload", req.file.originalname);
    await uploadBufferToGridFS({
      buffer: req.file.buffer,
      filename,
      contentType: req.file.mimetype,
      category: "images",
      originalName: req.file.originalname,
    });

    const fileUrl = `/uploads/images/${filename}`;
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: fileUrl,
      fileUrl: fileUrl,
      filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "File upload failed",
        error: error.message,
      });
  }
};

// Get uploaded files
const getUploadedFiles = async (req, res) => {
  try {
    const diskFiles = fs.existsSync("./uploads/images")
      ? fs.readdirSync("./uploads/images").map((file) => ({
          filename: file,
          url: `/uploads/images/${file}`,
          uploadedAt: fs.statSync(path.join("./uploads/images", file)).mtime,
        }))
      : [];

    const gridFsFiles = (await listFilesByCategory("images")).map((file) => ({
      filename: file.filename,
      url: `/uploads/images/${file.filename}`,
      uploadedAt: file.uploadDate,
    }));

    const files = Array.from(
      new Map(
        [...gridFsFiles, ...diskFiles].map((file) => [file.filename, file]),
      ).values(),
    ).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    res.json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch files", error: error.message });
  }
};

// Upload single document handler
const uploadSingleDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const filename = createStoredFilename("document", req.file.originalname);
    await uploadBufferToGridFS({
      buffer: req.file.buffer,
      filename,
      contentType: req.file.mimetype,
      category: "documents",
      originalName: req.file.originalname,
    });

    const fileUrl = `/uploads/documents/${filename}`;
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: fileUrl,
      fileUrl: fileUrl,
      filename,
      originalName: req.file.originalname,
    });
  } catch (error) {
    console.error("Document upload error:", error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
};

// Delete file
const deleteFile = async (req, res) => {
  try {
    const requestedPath =
      req.query.path || path.join("uploads/images", req.params.filename || "");
    const filePath = resolveUploadPath(requestedPath);
    const normalizedRequest = String(requestedPath || "")
      .replace(/\\/g, "/")
      .replace(/^\/+/, "");
    const pathParts = normalizedRequest.split("/");
    const category = normalizeCategory(pathParts[1]);
    const filename = pathParts.slice(2).join("/");

    let deletedCount = 0;

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      deletedCount += 1;
    }

    if (category && filename) {
      deletedCount += await deleteFilesByName(filename, category);
    }

    if (deletedCount === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res
      .status(500)
      .json({ message: "Failed to delete file", error: error.message });
  }
};

const nirfUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
  limits: { fileSize: DOCUMENT_MAX_SIZE_BYTES },
});

const uploadNirfPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const filename = `nirf-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(req.file.originalname)}`;
    await uploadBufferToGridFS({
      buffer: req.file.buffer,
      filename,
      contentType: req.file.mimetype,
      category: "nirf",
      originalName: req.file.originalname,
    });
    const fileUrl = `/uploads/nirf/${filename}`;
    res.status(200).json({
      success: true,
      message: "PDF uploaded successfully",
      url: fileUrl,
      fileUrl,
      filename,
    });
  } catch (error) {
    console.error("NIRF PDF upload error:", error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
};

const streamUploadedFile = async (req, res, next) => {
  try {
    const category = normalizeCategory(req.params.category);
    const filename = req.params.filename;

    if (!category || !filename) {
      return next();
    }

    const localFilePath = resolveUploadPath(
      path.join("uploads", category, filename),
    );
    if (localFilePath && fs.existsSync(localFilePath)) {
      if (path.extname(localFilePath).toLowerCase() === ".pdf") {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
      }
      res.setHeader("Cache-Control", "public, max-age=604800, immutable");
      return res.sendFile(localFilePath);
    }

    const fileDoc = await findLatestFileByName(filename, category);
    if (!fileDoc) {
      return next();
    }

    res.setHeader("Cache-Control", "public, max-age=604800, immutable");
    if (fileDoc.contentType) {
      res.setHeader("Content-Type", fileDoc.contentType);
    }
    if (fileDoc.metadata?.originalName) {
      const disposition = category === "images" ? "inline" : "inline";
      res.setHeader(
        "Content-Disposition",
        `${disposition}; filename="${encodeURIComponent(fileDoc.metadata.originalName)}"`,
      );
    }

    const downloadStream = getBucket().openDownloadStream(fileDoc._id);
    downloadStream.on("error", next);
    downloadStream.pipe(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  uploadSingleImage,
  documentUpload,
  uploadSingleDocument,
  getUploadedFiles,
  deleteFile,
  nirfUpload,
  uploadNirfPdf,
  streamUploadedFile,
};
