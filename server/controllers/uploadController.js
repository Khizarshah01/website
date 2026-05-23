const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const {
  normalizeCategory,
  uploadFileToGridFS,
  findLatestFileByName,
  listFilesByCategory,
  deleteFilesByName,
  getBucket,
} = require("../utils/gridfsStorage");

const UPLOAD_TEMP_DIR = path.resolve(__dirname, "..", "uploads", ".tmp");
const UPLOAD_MAX_IMAGE_MB = Number(process.env.UPLOAD_MAX_IMAGE_MB || 100);
const UPLOAD_MAX_DOCUMENT_MB = Number(process.env.UPLOAD_MAX_DOCUMENT_MB || 250);
const UPLOAD_MAX_VIDEO_MB = Number(process.env.UPLOAD_MAX_VIDEO_MB || 1024);
const IMAGE_MAX_SIZE_BYTES = Math.max(UPLOAD_MAX_IMAGE_MB, 1) * 1024 * 1024;
const DOCUMENT_MAX_SIZE_BYTES =
  Math.max(UPLOAD_MAX_DOCUMENT_MB, 1) * 1024 * 1024;
const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const ALLOWED_IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".jfif",
  ".png",
  ".webp",
  ".gif",
]);
const ALLOWED_VIDEO_MIME_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/ogg",
]);
const ALLOWED_VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".ogg"]);
const DOCUMENT_MIME_TO_EXTENSIONS = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  "text/plain": [".txt"],
  "text/csv": [".csv"],
};
const UPLOAD_SCOPE_VALUES = new Set([
  "about",
  "nirf",
  "academics",
  "admissions",
  "research",
  "facilities",
  "placements",
  "iqac",
  "documents",
  "activities",
  "departments",
  "other",
]);
const PATH_PREFIX_TO_SCOPE = {
  about: "about",
  nirf: "nirf",
  academics: "academics",
  admissions: "admissions",
  research: "research",
  facilities: "facilities",
  placements: "placements",
  iqac: "iqac",
  documents: "documents",
  activities: "activities",
  departments: "departments",
  contact: "about",
  news: "about",
  notices: "academics",
  events: "activities",
  gallery: "activities",
  faculty: "departments",
  alumni: "placements",
  recruiters: "placements",
  testimonials: "placements",
};

const shouldFallbackToLocalStorage = (error) =>
  error?.code === 8000 ||
  error?.codeName === "AtlasError" ||
  String(error?.message || "").toLowerCase().includes("space quota");

fs.mkdirSync(UPLOAD_TEMP_DIR, { recursive: true });

const ensureLocalUploadDirectory = (category, filename) => {
  const uploadDir = path.resolve(
    __dirname,
    "..",
    "uploads",
    category,
    path.dirname(filename),
  );
  fs.mkdirSync(uploadDir, { recursive: true });
  return path.join(uploadDir, path.basename(filename));
};

const moveTempFileToLocalUploads = async ({ sourcePath, filename, category }) => {
  const normalizedCategory = normalizeCategory(category);
  if (!normalizedCategory) {
    throw new Error("Invalid upload category.");
  }

  const sanitizedFilename = sanitizeStoredFilename(filename);
  if (!sanitizedFilename) {
    throw new Error("Invalid upload filename.");
  }

  const filePath = ensureLocalUploadDirectory(
    normalizedCategory,
    sanitizedFilename,
  );
  try {
    await fs.promises.rename(sourcePath, filePath);
  } catch (error) {
    if (error?.code !== "EXDEV") {
      throw error;
    }

    await fs.promises.copyFile(sourcePath, filePath);
    await fs.promises.unlink(sourcePath);
  }
};

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

const sanitizeOriginalName = (originalname = "") => {
  const baseName = path.basename(String(originalname || ""));
  const extension = path.extname(baseName);
  const nameWithoutExtension = path.basename(baseName, extension);
  const safeBaseName =
    nameWithoutExtension.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80) || "file";
  const safeExtension = extension.toLowerCase().replace(/[^a-z0-9.]/g, "");

  return `${safeBaseName}${safeExtension}`;
};

const normalizeUploadScope = (value = "") => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
  return UPLOAD_SCOPE_VALUES.has(normalized) ? normalized : null;
};

const deriveScopeFromPageId = (pageId = "") => {
  const normalizedPageId = String(pageId || "").trim().toLowerCase();
  if (!normalizedPageId) return null;
  const prefix = normalizedPageId.split("-")[0];
  return normalizeUploadScope(PATH_PREFIX_TO_SCOPE[prefix] || prefix);
};

const deriveScopeFromPath = (pathname = "") => {
  const cleanedPath = String(pathname || "")
    .split("?")[0]
    .split("#")[0]
    .trim()
    .toLowerCase();
  if (!cleanedPath) return null;

  const segments = cleanedPath.split("/").filter(Boolean);
  if (!segments.length) return null;

  if (
    segments[0] === "admin" &&
    segments[1] === "pages" &&
    segments[2] === "editor" &&
    segments[3]
  ) {
    return deriveScopeFromPageId(segments[3]);
  }

  if (segments[0] === "admin" && segments[1] === "visual" && segments[2]) {
    return deriveScopeFromPageId(segments[2]);
  }

  if (segments[0] === "admin" && segments[1] === "edit" && segments[2]) {
    return deriveScopeFromPageId(segments[2]);
  }

  if (segments[0] === "admin" && segments[1]) {
    return normalizeUploadScope(PATH_PREFIX_TO_SCOPE[segments[1]] || segments[1]);
  }

  return normalizeUploadScope(PATH_PREFIX_TO_SCOPE[segments[0]] || segments[0]);
};

const deriveScopeFromReferer = (referer = "") => {
  if (!referer) return null;
  try {
    const parsed = new URL(referer);
    return deriveScopeFromPath(parsed.pathname);
  } catch {
    return null;
  }
};

const resolveUploadScope = (req) => {
  return (
    normalizeUploadScope(req.body?.uploadCategory) ||
    normalizeUploadScope(req.body?.uploadScope) ||
    normalizeUploadScope(req.headers["x-upload-category"]) ||
    deriveScopeFromPageId(req.body?.pageId) ||
    deriveScopeFromPath(req.headers["x-upload-source-path"]) ||
    deriveScopeFromReferer(req.headers.referer) ||
    "other"
  );
};

const sanitizeStoredFilename = (filename = "") => {
  const normalized = String(filename || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");
  if (!normalized || normalized.includes("..")) return "";
  return normalized;
};

const buildScopedFilename = (scope, prefix, originalname) => {
  const normalizedScope = normalizeUploadScope(scope) || "other";
  const storedFilename = createStoredFilename(prefix, originalname);
  return `${normalizedScope}/${storedFilename}`;
};

const createStoredFilename = (prefix, originalname) => {
  const safePrefix =
    String(prefix || "file")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "") || "file";
  const uniqueSuffix = crypto.randomBytes(16).toString("hex");
  return `${safePrefix}-${uniqueSuffix}${path.extname(
    sanitizeOriginalName(originalname),
  )}`;
};

const createTempFilename = (originalname = "") => {
  const extension = path.extname(sanitizeOriginalName(originalname));
  return `tmp-${crypto.randomBytes(16).toString("hex")}${extension}`;
};

const getExtension = (file = {}) =>
  path.extname(sanitizeOriginalName(file.originalname || "")).toLowerCase();

const readFileSignature = async (filePath, length = 16) => {
  const handle = await fs.promises.open(filePath, "r");
  try {
    const buffer = Buffer.alloc(length);
    const { bytesRead } = await handle.read(buffer, 0, length, 0);
    return buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
};

const imageLooksValid = (buffer = Buffer.alloc(0), mimeType = "") => {
  if (!Buffer.isBuffer(buffer) || buffer.length < 4) {
    return false;
  }

  if (
    mimeType === "image/jpeg" &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return true;
  }

  if (
    mimeType === "image/png" &&
    buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    )
  ) {
    return true;
  }

  if (
    mimeType === "image/gif" &&
    ["GIF87a", "GIF89a"].includes(buffer.subarray(0, 6).toString("ascii"))
  ) {
    return true;
  }

  if (
    mimeType === "image/webp" &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return true;
  }

  return false;
};

const fileLooksLikePdf = (buffer = Buffer.alloc(0)) =>
  Buffer.isBuffer(buffer) && buffer.subarray(0, 5).toString("ascii") === "%PDF-";

const validateUploadedFile = async (file, mode) => {
  const extension = getExtension(file);
  const signature = await readFileSignature(file.path);

  if (mode === "image") {
    if (
      !ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype) ||
      !ALLOWED_IMAGE_EXTENSIONS.has(extension)
    ) {
      throw new Error("Only JPG/JPEG/JFIF, PNG, WEBP, and GIF image files are allowed.");
    }

    if (!imageLooksValid(signature, file.mimetype)) {
      throw new Error("Uploaded image content does not match the file type.");
    }
    return;
  }

  const allowedExtensions = DOCUMENT_MIME_TO_EXTENSIONS[file.mimetype] || [];
  if (!allowedExtensions.includes(extension)) {
    throw new Error("Invalid file type. The file extension does not match the uploaded document type.");
  }

  if (file.mimetype === "application/pdf" && !fileLooksLikePdf(signature)) {
    throw new Error("Uploaded PDF content does not match the file type.");
  }
};

const sendUploadError = (res, error, fallbackMessage) => {
  const isValidationError =
    typeof error?.message === "string" &&
    (error.message.includes("allowed") ||
      error.message.includes("does not match") ||
      error.message.includes("Invalid file type"));

  return res.status(isValidationError ? 400 : 500).json({
    success: false,
    message: isValidationError ? error.message : fallbackMessage,
  });
};

// File filter - accepts images only
const fileFilter = (req, file, cb) => {
  const extension = getExtension(file);
  if (
    ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype) &&
    ALLOWED_IMAGE_EXTENSIONS.has(extension)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPG/JPEG/JFIF, PNG, WEBP, and GIF image files are allowed."),
      false,
    );
  }
};

const tempStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_TEMP_DIR),
  filename: (_req, file, cb) => cb(null, createTempFilename(file.originalname)),
});

const createUploadHandler = ({ fileFilter, maxBytes }) =>
  multer({
    storage: tempStorage,
    fileFilter,
    limits: {
      fileSize: maxBytes,
      files: 1,
    },
  });

// Multer upload instance (images + PDFs)
const upload = createUploadHandler({
  fileFilter,
  maxBytes: IMAGE_MAX_SIZE_BYTES,
});

// Multer upload instance (videos)
const videoUpload = createUploadHandler({
  fileFilter: (req, file, cb) => {
    const extension = getExtension(file);
    if (ALLOWED_VIDEO_MIME_TYPES.has(file.mimetype) && ALLOWED_VIDEO_EXTENSIONS.has(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Only MP4, WEBM and OGG video files are allowed."), false);
    }
  },
  maxBytes: Math.max(UPLOAD_MAX_VIDEO_MB, 1) * 1024 * 1024,
});

// --- Document / file upload ---
const documentFilter = (req, file, cb) => {
  const extension = getExtension(file);
  const allowedExtensions = DOCUMENT_MIME_TO_EXTENSIONS[file.mimetype] || [];
  if (allowedExtensions.includes(extension)) {
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

const documentUpload = createUploadHandler({
  fileFilter: documentFilter,
  maxBytes: DOCUMENT_MAX_SIZE_BYTES,
});

const cleanupTempUpload = async (filePath) => {
  if (!filePath) return;
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    if (error?.code !== "ENOENT") {
      console.warn("[UPLOAD] Failed to remove temporary upload:", error);
    }
  }
};

// Upload single image handler
const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    await validateUploadedFile(req.file, "image");
    const originalName = sanitizeOriginalName(req.file.originalname);
    const scope = resolveUploadScope(req);
    const filename = buildScopedFilename(scope, "upload", originalName);
    try {
      await uploadFileToGridFS({
        filePath: req.file.path,
        filename,
        contentType: req.file.mimetype,
        category: "images",
        originalName,
        scope,
      });
    } catch (storageError) {
      if (!shouldFallbackToLocalStorage(storageError)) {
        throw storageError;
      }

      console.warn(
        "[UPLOAD] GridFS unavailable or over quota. Falling back to local disk storage for image upload.",
      );
      await moveTempFileToLocalUploads({
        sourcePath: req.file.path,
        filename,
        category: "images",
      });
    }

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
    return sendUploadError(res, error, "File upload failed");
  } finally {
    await cleanupTempUpload(req.file?.path);
  }
};

// Upload single video handler
const uploadSingleVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const extension = getExtension(req.file);
    if (!ALLOWED_VIDEO_EXTENSIONS.has(extension) || !ALLOWED_VIDEO_MIME_TYPES.has(req.file.mimetype)) {
      throw new Error("Only MP4, WEBM and OGG video files are allowed.");
    }

    const originalName = sanitizeOriginalName(req.file.originalname);
    const scope = resolveUploadScope(req);
    const filename = buildScopedFilename(scope, "upload", originalName);
    try {
      await uploadFileToGridFS({
        filePath: req.file.path,
        filename,
        contentType: req.file.mimetype,
        category: "videos",
        originalName,
        scope,
      });
    } catch (storageError) {
      if (!shouldFallbackToLocalStorage(storageError)) {
        throw storageError;
      }

      console.warn(
        "[UPLOAD] GridFS unavailable or over quota. Falling back to local disk storage for video upload.",
      );
      await moveTempFileToLocalUploads({
        sourcePath: req.file.path,
        filename,
        category: "videos",
      });
    }

    const fileUrl = `/uploads/videos/${filename}`;
    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      url: fileUrl,
      fileUrl: fileUrl,
      filename,
    });
  } catch (error) {
    console.error("Video upload error:", error);
    return sendUploadError(res, error, "Video upload failed");
  } finally {
    await cleanupTempUpload(req.file?.path);
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
    res.status(500).json({ message: "Failed to fetch files" });
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

    await validateUploadedFile(req.file, "document");
    const originalName = sanitizeOriginalName(req.file.originalname);
    const scope = resolveUploadScope(req);
    const filename = buildScopedFilename(scope, "document", originalName);
    try {
      await uploadFileToGridFS({
        filePath: req.file.path,
        filename,
        contentType: req.file.mimetype,
        category: "documents",
        originalName,
        scope,
      });
    } catch (storageError) {
      if (!shouldFallbackToLocalStorage(storageError)) {
        throw storageError;
      }

      console.warn(
        "[UPLOAD] GridFS unavailable or over quota. Falling back to local disk storage for document upload.",
      );
      await moveTempFileToLocalUploads({
        sourcePath: req.file.path,
        filename,
        category: "documents",
      });
    }

    const fileUrl = `/uploads/documents/${filename}`;
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: fileUrl,
      fileUrl: fileUrl,
      filename,
      originalName,
    });
  } catch (error) {
    console.error("Document upload error:", error);
    return sendUploadError(res, error, "File upload failed");
  } finally {
    await cleanupTempUpload(req.file?.path);
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
    res.status(500).json({ message: "Failed to delete file" });
  }
};

const nirfUpload = multer({
  storage: tempStorage,
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
    await validateUploadedFile(req.file, "document");
    const originalName = sanitizeOriginalName(req.file.originalname);
    const filename = createStoredFilename("nirf", originalName);
    try {
      await uploadFileToGridFS({
        filePath: req.file.path,
        filename,
        contentType: req.file.mimetype,
        category: "nirf",
        originalName,
      });
    } catch (storageError) {
      if (!shouldFallbackToLocalStorage(storageError)) {
        throw storageError;
      }

      console.warn(
        "[UPLOAD] GridFS unavailable or over quota. Falling back to local disk storage for NIRF upload.",
      );
      await moveTempFileToLocalUploads({
        sourcePath: req.file.path,
        filename,
        category: "nirf",
      });
    }
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
    return sendUploadError(res, error, "File upload failed");
  } finally {
    await cleanupTempUpload(req.file?.path);
  }
};

const streamUploadedFile = async (req, res, next) => {
  try {
    const category = normalizeCategory(req.params.category);
    const filename = sanitizeStoredFilename(req.params.filename);

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
      const disposition =
        category === "images" || fileDoc.contentType === "application/pdf"
          ? "inline"
          : "attachment";
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
  videoUpload,
  uploadSingleVideo,
};

