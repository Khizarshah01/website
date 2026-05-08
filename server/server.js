const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { noSqlInjectionGuard } = require("./middleware/nosqlGuard");
const { streamUploadedFile } = require("./controllers/uploadController");

// Load environment variables
dotenv.config();

const app = express();
const { protect, adminOnly } = require("./middleware/authMiddleware");
app.set("trust proxy", 1);
app.set("query parser", "simple");

const allowedOrigins = Array.from(
  new Set(
    [
      process.env.CORS_ORIGIN,
      process.env.CLIENT_URL,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://website-one-sigma-90.vercel.app",
    ]
      .flatMap((value) => String(value || "").split(","))
      .map((value) => value.trim())
      .filter(Boolean),
  ),
);

const isLocalDevOrigin = (origin = "") =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(String(origin || ""));

const securityHeaders = (req, res, next) => {
  const cspDirectives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https:",
    "style-src 'self' 'unsafe-inline' https:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    `connect-src 'self' ${allowedOrigins.join(" ")} https: ws: wss:`,
    "form-action 'self'",
  ];

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Content-Security-Policy", cspDirectives.join("; "));

  next();
};

// Middleware
app.use(securityHeaders);
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        isLocalDevOrigin(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(noSqlInjectionGuard);

// Reserve sensitive prefixes behind admin auth even when no route is mounted.
app.use("/api/debug", protect, adminOnly, (_req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found.",
  });
});

app.use("/api/admin", protect, adminOnly, (_req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found.",
  });
});

// Serve static files from uploads folder
app.get("/uploads/:category/:filename", streamUploadedFile);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: "7d",
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      // Cache static uploads aggressively in browser for faster repeat views.
      res.setHeader("Cache-Control", "public, max-age=604800, immutable");
      if (path.extname(filePath).toLowerCase() === ".pdf") {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
      }
    },
  }),
);

// Import Routes
const newsRoutes = require("./routes/newsRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const pageContentRoutes = require("./routes/pageContentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const researchRoutes = require("./routes/researchRoutes");
const placementRoutes = require("./routes/placementRoutes");
const iqacRoutes = require("./routes/iqacRoutes");
const documentRoutes = require("./routes/documentRoutes");
const nirfRoutes = require("./routes/nirfRoutes");
const convertRoutes = require("./routes/convertRoutes");
const documentDownloadRoutes = require("./routes/documentDownloadRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const { initializeDatabase } = require("./utils/dbInit");

// API Routes
app.use("/api/news", newsRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pages", pageContentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/iqac", iqacRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/document-download", documentDownloadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/nirf", nirfRoutes);
app.use("/api/convert", convertRoutes);

app.use("/api", (_req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

// Health Check
app.get("/", (req, res) => {
  res.json({
    message: "SSGMCE API Server Running",
    status: "Active",
    version: "2.0.0",
    features: ["Auth", "CMS", "File Uploads"],
    timestamp: new Date().toISOString(),
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle multer errors
  if (err.code === "LIMIT_FILE_SIZE") {
    const isDocumentRoute =
      req.path.includes("/upload/file") ||
      req.path.includes("/upload/nirf-pdf");
    return res.status(400).json({
      success: false,
      error: isDocumentRoute
        ? "File too large. Maximum size is 50MB for documents."
        : "File too large. Maximum size is 20MB for images.",
    });
  }

  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      error: err.message || "File upload error",
    });
  }

  if (
    typeof err.message === "string" &&
    err.message.toLowerCase().includes("invalid file type")
  ) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  res.status(500).json({
    success: false,
    error: err.message || "Something went wrong!",
  });
});

// Start Server - Only after MongoDB connection
const PORT = process.env.PORT || 5000;

const mongoConnectOptions = {
  family: 4,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 20,
  minPoolSize: 2,
};

const getMongoConnectionHints = (error) => {
  const hints = [];
  const message = String(error?.message || "");

  if (error?.syscall === "querySrv" || error?.code === "ECONNREFUSED") {
    hints.push(
      "Atlas SRV DNS lookup failed. If this machine/network blocks SRV queries, set MONGODB_DIRECT_URI in server/.env using the standard mongodb://host1,host2,host3/... format from Atlas.",
    );
  }

  if (
    message.includes("IP that isn't whitelisted") ||
    message.includes("not allowed to access this MongoDB Atlas cluster")
  ) {
    hints.push(
      "MongoDB Atlas network access is blocking this machine. Add your current IP in Atlas Network Access, or temporarily allow 0.0.0.0/0 for development.",
    );
  }

  if (!process.env.MONGODB_URI && !process.env.MONGODB_DIRECT_URI) {
    hints.push(
      "No MongoDB URI is configured. Add MONGODB_URI or MONGODB_DIRECT_URI in server/.env.",
    );
  }

  return hints;
};

const connectToMongo = async () => {
  const primaryUri =
    process.env.MONGODB_URI || process.env.MONGODB_DIRECT_URI || "mongodb://localhost:27017/ssgmce";
  const directUri = process.env.MONGODB_DIRECT_URI;
  const mongoConnectStartedAt = Date.now();

  try {
    await mongoose.connect(primaryUri, mongoConnectOptions);
    return {
      uriLabel:
        primaryUri === directUri && directUri ? "MONGODB_DIRECT_URI" : "MONGODB_URI",
      connectMs: Date.now() - mongoConnectStartedAt,
    };
  } catch (error) {
    const shouldTryDirectFallback =
      directUri &&
      primaryUri !== directUri &&
      (error?.syscall === "querySrv" || error?.code === "ECONNREFUSED");

    if (!shouldTryDirectFallback) {
      throw error;
    }

    console.warn(
      "[WARN] MongoDB SRV lookup failed for MONGODB_URI. Retrying with MONGODB_DIRECT_URI...",
    );

    await mongoose.connect(directUri, mongoConnectOptions);
    return {
      uriLabel: "MONGODB_DIRECT_URI",
      connectMs: Date.now() - mongoConnectStartedAt,
    };
  }
};

connectToMongo()
  .then(({ uriLabel, connectMs }) => {
    console.log(
      `[OK] MongoDB Connected Successfully in ${connectMs}ms using ${uriLabel}`,
    );

    // Start server as soon as DB socket is ready.
    app.listen(PORT, () => {
      console.log(`\n[SERVER] Running on port ${PORT}`);
      console.log(`[UPLOADS] http://localhost:${PORT}/uploads`);
      console.log(`[AUTH] http://localhost:${PORT}/api/auth`);
      console.log(`[PAGES] http://localhost:${PORT}/api/pages`);
      console.log(`\n[READY] Server is ready to accept requests!\n`);
    });

    // Run seeding in background so startup is not blocked.
    initializeDatabase()
      .then(() => console.log("[OK] Database initialized"))
      .catch((error) => console.error("[ERROR] DB init error:", error));
  })
  .catch((err) => {
    console.error("[ERROR] MongoDB Connection Error:", err);
    for (const hint of getMongoConnectionHints(err)) {
      console.error(`[HINT] ${hint}`);
    }
    console.error("Server not started. Please check your MongoDB connection.");
    process.exit(1);
  });
