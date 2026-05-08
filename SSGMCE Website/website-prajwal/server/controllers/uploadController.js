const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsRoot = path.join(__dirname, "..", "uploads");

const resolveUploadPath = (relativePath = "") => {
  const sanitizedRelativePath = String(relativePath || "")
    .replace(/^\/+/, "")
    .replace(/^uploads[\\/]/, "uploads/");

  if (!sanitizedRelativePath.startsWith("uploads/")) {
    return null;
  }

  const resolvedPath = path.resolve(__dirname, "..", sanitizedRelativePath);
  const resolvedUploadsRoot = path.resolve(uploadsRoot);

  if (!resolvedPath.startsWith(resolvedUploadsRoot)) {
    return null;
  }

  return resolvedPath;
};

const ensureUploadDir = (...segments) => {
  const uploadDir = path.join(uploadsRoot, ...segments);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ensureUploadDir("images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

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
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit (increased for PDFs)
  },
});

// --- Document / file upload ---
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ensureUploadDir("documents"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

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
  storage: documentStorage,
  fileFilter: documentFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB limit
  },
});

// Upload single image handler
const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `/uploads/images/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl: fileUrl,
      url: fileUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
};

// Get uploaded files
const getUploadedFiles = async (req, res) => {
  try {
    const uploadDir = path.join(uploadsRoot, "images");

    if (!fs.existsSync(uploadDir)) {
      return res.json({ files: [] });
    }

    const files = fs.readdirSync(uploadDir).map((file) => ({
      filename: file,
      url: `/uploads/images/${file}`,
      uploadedAt: fs.statSync(path.join(uploadDir, file)).mtime,
    }));

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
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `/uploads/documents/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl: fileUrl,
      url: fileUrl,
      filename: req.file.filename,
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
    const requestedPath = req.query.path || path.join("uploads/images", req.params.filename || "");
    const filePath = resolveUploadPath(requestedPath);

    if (!filePath) {
      return res.status(400).json({ message: "Invalid file path" });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    fs.unlinkSync(filePath);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res
      .status(500)
      .json({ message: "Failed to delete file", error: error.message });
  }
};

// NIRF PDF upload
const nirfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ensureUploadDir("nirf"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "nirf-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const nirfUpload = multer({
  storage: nirfStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
  limits: { fileSize: 20 * 1024 * 1024 },
});

const uploadNirfPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const fileUrl = `/uploads/nirf/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: "PDF uploaded successfully",
      fileUrl,
      url: fileUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("NIRF PDF upload error:", error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
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
};
