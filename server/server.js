const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { noSqlInjectionGuard } = require("./middleware/nosqlGuard");
const { streamUploadedFile } = require("./controllers/uploadController");
const { resolveExistingDocumentPath } = require("./utils/documentPathAliases");
const {
  getAuthCookieOptions,
  getJwtSecret,
} = require("./utils/authSecurity");

// Load environment variables. When started from server/, use server/.env if it
// exists, then fall back to the project root .env without overriding values.
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
getJwtSecret();

const app = express();
const { protect, adminOnly } = require("./middleware/authMiddleware");
app.set("trust proxy", 1);
app.set("query parser", "simple");

// Force HTTPS in production when behind reverse proxies/load balancers.
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    return next();
  });
}

// Explicit HSTS header for production HTTPS responses.
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }
  return next();
});

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

const isAllowedBrowserOrigin = (origin = "") => {
  if (!origin) return true;
  return allowedOrigins.includes(origin) || isLocalDevOrigin(origin);
};

const csrfOriginGuard = (req, res, next) => {
  if (!req.path.startsWith("/api/")) return next();
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();

  const origin = String(req.headers.origin || "").trim();
  const referer = String(req.headers.referer || "").trim();

  if (origin && !isAllowedBrowserOrigin(origin)) {
    return res.status(403).json({
      success: false,
      message: "Request origin is not allowed.",
    });
  }

  if (!origin && referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (!isAllowedBrowserOrigin(refererOrigin)) {
        return res.status(403).json({
          success: false,
          message: "Request origin is not allowed.",
        });
      }
    } catch {
      return res.status(403).json({
        success: false,
        message: "Invalid request origin.",
      });
    }
  }

  return next();
};

// ===== SECURITY: Rate Limiting =====
const isProductionEnv = process.env.NODE_ENV === "production";

if (!process.env.NODE_ENV) {
  console.warn(
    "[WARN] NODE_ENV is not set. Treating server as development; production limits are relaxed but still enabled.",
  );
}

// Authentication rate limiter - prevent brute force attacks
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max: isProductionEnv ? 20 : 100,
  message: { error: "Too many auth attempts. Please try again later." },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => req.method === "GET",
});

// General API rate limiter - protect against DoS
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max: isProductionEnv ? 500 : 2000,
  message: { error: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === "GET",
});

// Upload rate limiter - prevent abuse of file upload endpoint
const uploadRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: isProductionEnv ? 100 : 300,
  message: {
    error: "Upload limit reached. Please wait before uploading more files.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const securityHeaders = (req, res, next) => {
  const authCookieOptions = getAuthCookieOptions(req);
  const scriptSrc =
    process.env.NODE_ENV === "production"
      ? "script-src 'self'"
      : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";
  const cspDirectives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https:",
    "style-src 'self' 'unsafe-inline' https:",
    scriptSrc,
    `connect-src 'self' ${allowedOrigins.join(" ")} ${
      authCookieOptions.secure ? "https:" : "http:"
    } ws: wss:`,
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
  if (authCookieOptions.secure || req.secure) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }

  next();
};

// Middleware
app.use(securityHeaders);
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
); // Keep Helmet defaults without emitting a second CSP header.
app.use(csrfOriginGuard);
app.use("/api/", apiRateLimiter); // Apply general API rate limiting only to API routes
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedBrowserOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Upload-Category",
      "X-Upload-Source-Path",
    ],
  }),
);
const jsonBodyParser = express.json({ limit: "10mb", strict: false });
app.use((req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (contentType.toLowerCase().includes("multipart/form-data")) {
    return next();
  }

  return jsonBodyParser(req, res, (err) => {
    if (err) {
      return next(err);
    }
    if (req.body === null) {
      req.body = {};
    }
    return next();
  });
});
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(noSqlInjectionGuard);
app.use("/upload/", uploadRateLimiter);

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

const documentsRoot = path.join(__dirname, "uploads", "documents");

app.use("/uploads/documents", (req, res, next) => {
  const requestedPath = String(req.path || "").replace(/^\/+/, "");
  const resolvedDocument = resolveExistingDocumentPath(
    documentsRoot,
    requestedPath,
  );

  if (!resolvedDocument?.usedLegacyAlias) {
    return next();
  }

  const extension = path.extname(resolvedDocument.absolutePath).toLowerCase();
  if (extension === ".pdf") {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
  }
  res.setHeader("Cache-Control", "public, max-age=604800, immutable");
  return res.sendFile(resolvedDocument.absolutePath);
});

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

// Serve uploaded GridFS/disk files after document paths get first chance.
// Supports nested filenames like /uploads/documents/iqac/file.pdf.
app.get("/uploads/:category/:filename(*)", streamUploadedFile);

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
app.use("/api/auth/", authRateLimiter); // Apply stricter rate limiting to auth endpoints
app.use("/api/auth", authRoutes);
app.use("/api/pages", pageContentRoutes);
app.use("/api/upload/", uploadRateLimiter); // Apply stricter rate limiting to upload endpoints
app.use("/api/upload", uploadRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/iqac", iqacRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/documents", documentDownloadRoutes);
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
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      error: "Invalid request body. Expected JSON.",
    });
  }

  if (process.env.NODE_ENV === "production") {
    console.error(err.message);
  } else {
    console.error(err.stack || err);
  }

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
    (err.message.toLowerCase().includes("invalid file type") ||
      err.message.toLowerCase().includes("only "))
  ) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: "Validation failed. Please review the submitted data.",
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: "Invalid request parameter.",
    });
  }

  const requestLabel = `${req.method} ${req.originalUrl}`;
  console.error(`[ERROR] ${requestLabel}`, err);

  res.status(500).json({
    success: false,
    error: "Something went wrong. Please try again later.",
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
    process.env.MONGODB_DIRECT_URI ||
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/ssgmce";
  const directUri = process.env.MONGODB_DIRECT_URI;
  const mongoConnectStartedAt = Date.now();

  try {
    await mongoose.connect(primaryUri, mongoConnectOptions);
    return {
      uriLabel:
        primaryUri === directUri && directUri
          ? "MONGODB_DIRECT_URI"
          : "MONGODB_URI",
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
      .then((initialized) => {
        if (initialized) {
          console.log("[OK] Database initialized");
        }
      })
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
