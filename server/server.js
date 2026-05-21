const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { noSqlInjectionGuard } = require("./middleware/nosqlGuard");
const { streamUploadedFile } = require("./controllers/uploadController");
const { resolveExistingDocumentPath } = require("./utils/documentPathAliases");
const { getAuthCookieOptions, getJwtSecret } = require("./utils/authSecurity");

// ─── ENV ──────────────────────────────────────────────────────────────────────
// Load server/.env first, then fall back to the project-root .env without
// overriding already-set values.
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
getJwtSecret();

// ─── APP SETUP ────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);
app.set("query parser", "simple");

if (!process.env.NODE_ENV) {
  console.warn(
    "[WARN] NODE_ENV is not set. Treating server as development; " +
      "production limits are relaxed but still enabled.",
  );
}
const isProductionEnv = process.env.NODE_ENV === "production";

// ─── CLIENT BUILD HELPERS ────────────────────────────────────────────────────
const clientBuildCandidates = [
  path.resolve(__dirname, "..", "client", "dist"),
  path.resolve(__dirname, "..", "client", "build"),
];

const getClientBuildPaths = () => {
  try {
    const clientBuildPath = clientBuildCandidates.find((p) =>
      fs.existsSync(path.join(p, "index.html")),
    );
    if (!clientBuildPath) return null;
    return {
      clientBuildPath,
      clientIndexPath: path.join(clientBuildPath, "index.html"),
    };
  } catch {
    return null;
  }
};

const { protect, adminOnly } = require("./middleware/authMiddleware");

// ─── CORS / ORIGIN HELPERS ───────────────────────────────────────────────────
// Build the explicit allow-list from env vars + well-known dev origins.
// SERVER_IP and SERVER_URL let you add the machine's LAN/public IP at deploy
// time, e.g.  SERVER_IP=10.0.3.10  or  SERVER_URL=http://10.0.3.10
const allowedOrigins = Array.from(
  new Set(
    [
      process.env.CORS_ORIGIN,
      process.env.CLIENT_URL,
      process.env.SERVER_URL,
      // Build http/https variants from a bare SERVER_IP env var.
      process.env.SERVER_IP
        ? `http://${process.env.SERVER_IP}`
        : null,
      process.env.SERVER_IP
        ? `http://${process.env.SERVER_IP}:${PORT}`
        : null,
      process.env.SERVER_IP
        ? `https://${process.env.SERVER_IP}`
        : null,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ]
      .flatMap((v) => String(v || "").split(","))
      .map((v) => v.trim())
      .filter(Boolean),
  ),
);

// Matches localhost, 127.0.0.1, and any private-network IP address so that
// LAN deployments (e.g. http://10.0.3.10:5000) are allowed without having to
// enumerate every possible port in the allow-list.
const isPrivateNetworkOrigin = (origin = "") => {
  const o = String(origin || "");
  // localhost / loopback
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(o)) return true;
  // RFC-1918 private ranges: 10.x.x.x / 172.16-31.x.x / 192.168.x.x
  if (
    /^https?:\/\/(10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+|192\.168\.\d+\.\d+)(:\d+)?$/i.test(
      o,
    )
  )
    return true;
  return false;
};

const isAllowedBrowserOrigin = (origin = "") => {
  if (!origin) return true; // same-origin / non-browser requests have no Origin header
  return allowedOrigins.includes(origin) || isPrivateNetworkOrigin(origin);
};

// ─── CSRF ORIGIN GUARD ───────────────────────────────────────────────────────
// Reject state-mutating API calls whose Origin/Referer is not in the allow-list.
const csrfOriginGuard = (req, res, next) => {
  if (!req.path.startsWith("/api/")) return next();
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();

  const origin = String(req.headers.origin || "").trim();
  const referer = String(req.headers.referer || "").trim();

  if (origin && !isAllowedBrowserOrigin(origin)) {
    return res
      .status(403)
      .json({ success: false, message: "Request origin is not allowed." });
  }

  if (!origin && referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (!isAllowedBrowserOrigin(refererOrigin)) {
        return res
          .status(403)
          .json({ success: false, message: "Request origin is not allowed." });
      }
    } catch {
      return res
        .status(403)
        .json({ success: false, message: "Invalid request origin." });
    }
  }

  return next();
};

// ─── RATE LIMITERS ───────────────────────────────────────────────────────────
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProductionEnv ? 20 : 100,
  message: { error: "Too many auth attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === "GET",
});

const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProductionEnv ? 500 : 2000,
  message: { error: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === "GET",
});

const uploadRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: isProductionEnv ? 100 : 300,
  message: {
    error: "Upload limit reached. Please wait before uploading more files.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── SECURITY HEADERS ────────────────────────────────────────────────────────
const securityHeaders = (req, res, next) => {
  const authCookieOptions = getAuthCookieOptions(req);
  const scriptSrc =
    process.env.NODE_ENV === "production"
      ? "script-src 'self'"
      : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

  // Build connect-src: always include self + every configured origin so the
  // browser can reach the API even when served from an IP address.
  const connectSrcExtras = [
    ...allowedOrigins,
    authCookieOptions.secure ? "https:" : "http:",
    "ws:",
    "wss:",
  ].join(" ");

  const cspDirectives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https:",
    "style-src 'self' 'unsafe-inline' https:",
    scriptSrc,
    `connect-src 'self' ${connectSrcExtras}`,
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

  return next();
};


// ─── MIDDLEWARE STACK ─────────────────────────────────────────────────────────
app.use(securityHeaders);
app.use(helmet({ contentSecurityPolicy: false })); // Helmet defaults; we emit our own CSP above.
app.use(csrfOriginGuard);
app.use("/api/", apiRateLimiter);
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedBrowserOrigin(origin)) return callback(null, true);
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

// Parse JSON bodies; skip multipart (multer handles those).
const jsonBodyParser = express.json({ limit: "10mb", strict: false });
app.use((req, res, next) => {
  const ct = req.headers["content-type"] || "";
  if (ct.toLowerCase().includes("multipart/form-data")) return next();
  return jsonBodyParser(req, res, (err) => {
    if (err) return next(err);
    if (req.body === null) req.body = {};
    return next();
  });
});
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(noSqlInjectionGuard);
app.use("/upload/", uploadRateLimiter);

// ─── STATIC FILES ─────────────────────────────────────────────────────────────
// Serve the built frontend assets BEFORE any API or dynamic routes so that
// requests for /assets/index-xxxx.js etc. resolve immediately.
const clientBuildPaths = getClientBuildPaths();

if (clientBuildPaths) {
  app.use(
    express.static(clientBuildPaths.clientBuildPath, {
      index: false, // Don't auto-serve index.html here; the SPA catch-all does it.
      maxAge: isProductionEnv ? "7d" : 0,
      etag: true,
    }),
  );
}

// ─── DOCUMENT / UPLOAD STATIC ROUTES ─────────────────────────────────────────
const documentsRoot = path.join(__dirname, "uploads", "documents");

app.use("/uploads/documents", (req, res, next) => {
  const requestedPath = String(req.path || "").replace(/^\/+/, "");
  const resolvedDocument = resolveExistingDocumentPath(
    documentsRoot,
    requestedPath,
  );

  if (!resolvedDocument?.usedLegacyAlias) return next();

  const ext = path.extname(resolvedDocument.absolutePath).toLowerCase();
  if (ext === ".pdf") {
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
      res.setHeader("Cache-Control", "public, max-age=604800, immutable");
      if (path.extname(filePath).toLowerCase() === ".pdf") {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
      }
    },
  }),
);

// GridFS / disk streaming (supports nested paths like /uploads/documents/iqac/file.pdf).
app.get("/uploads/:category/:filename(*)", streamUploadedFile);

// ─── GUARD SENSITIVE ADMIN PREFIXES ───────────────────────────────────────────
app.use("/api/debug", protect, adminOnly, (_req, res) =>
  res.status(404).json({ success: false, message: "Endpoint not found." }),
);
app.use("/api/admin", protect, adminOnly, (_req, res) =>
  res.status(404).json({ success: false, message: "Endpoint not found." }),
);


// ─── IMPORT ROUTES ────────────────────────────────────────────────────────────
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
const popupBannerRoutes = require("./routes/popupBannerRoutes");
const { initializeDatabase } = require("./utils/dbInit");

// ─── API ROUTES ───────────────────────────────────────────────────────────────
app.use("/api/news", newsRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth/", authRateLimiter); // Stricter limiter on auth endpoints
app.use("/api/auth", authRoutes);
app.use("/api/pages", pageContentRoutes);
app.use("/api/upload/", uploadRateLimiter); // Stricter limiter on upload endpoints
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
app.use("/api/popup-banners", popupBannerRoutes);

app.get("/api/health", (_req, res) =>
  res.json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
  }),
);

// 404 for any unknown /api/* route
app.use("/api", (_req, res) =>
  res.status(404).json({ success: false, message: "API endpoint not found." }),
);

// ─── SPA CATCH-ALL ────────────────────────────────────────────────────────────
// Serve index.html for every non-API, non-upload route so that React Router
// works on hard refreshes.  Must come AFTER all API routes.
if (clientBuildPaths) {
  app.get(/^\/(?!api\/|uploads\/).*/, (_req, res) =>
    res.sendFile(clientBuildPaths.clientIndexPath),
  );
}

// Root health-check / fallback
app.get("/", (req, res) => {
  if (clientBuildPaths) return res.sendFile(clientBuildPaths.clientIndexPath);
  res.json({
    message: "SSGMCE API Server Running",
    status: "Active",
    version: "2.0.0",
    features: ["Auth", "CMS", "File Uploads"],
    timestamp: new Date().toISOString(),
  });
});

// ─── ERROR HANDLER ────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ success: false, error: "Invalid request body. Expected JSON." });
  }

  if (isProductionEnv) {
    console.error(err.message);
  } else {
    console.error(err.stack || err);
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    const isDocRoute =
      req.path.includes("/upload/file") ||
      req.path.includes("/upload/nirf-pdf");
    return res.status(400).json({
      success: false,
      error: isDocRoute
        ? "File too large. Maximum size is 300MB for documents."
        : "File too large. Maximum size is 300MB for images.",
    });
  }

  if (err.name === "MulterError") {
    return res
      .status(400)
      .json({ success: false, error: err.message || "File upload error" });
  }

  if (
    typeof err.message === "string" &&
    (err.message.toLowerCase().includes("invalid file type") ||
      err.message.toLowerCase().includes("only "))
  ) {
    return res.status(400).json({ success: false, error: err.message });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: "Validation failed. Please review the submitted data.",
    });
  }

  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ success: false, error: "Invalid request parameter." });
  }

  console.error(`[ERROR] ${req.method} ${req.originalUrl}`, err);
  res.status(500).json({
    success: false,
    error: "Something went wrong. Please try again later.",
  });
});


// ─── DATABASE & SERVER START ──────────────────────────────────────────────────
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
      "Atlas SRV DNS lookup failed. Set MONGODB_DIRECT_URI in server/.env using the " +
        "standard mongodb://host1,host2,host3/... format from Atlas.",
    );
  }

  if (
    message.includes("IP that isn't whitelisted") ||
    message.includes("not allowed to access this MongoDB Atlas cluster")
  ) {
    hints.push(
      "MongoDB Atlas network access is blocking this machine. Add your IP in Atlas " +
        "Network Access, or allow 0.0.0.0/0 for development.",
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
  const startedAt = Date.now();

  try {
    await mongoose.connect(primaryUri, mongoConnectOptions);
    return {
      uriLabel:
        primaryUri === directUri && directUri
          ? "MONGODB_DIRECT_URI"
          : "MONGODB_URI",
      connectMs: Date.now() - startedAt,
    };
  } catch (error) {
    // If the primary URI (Atlas SRV) fails with a DNS/connection error and we
    // have a direct URI to try, fall back automatically.
    const shouldFallback =
      directUri &&
      primaryUri !== directUri &&
      (error?.syscall === "querySrv" || error?.code === "ECONNREFUSED");

    if (!shouldFallback) throw error;

    console.warn(
      "[WARN] MongoDB SRV lookup failed for MONGODB_URI. Retrying with MONGODB_DIRECT_URI...",
    );
    await mongoose.connect(directUri, mongoConnectOptions);
    return {
      uriLabel: "MONGODB_DIRECT_URI",
      connectMs: Date.now() - startedAt,
    };
  }
};

connectToMongo()
  .then(({ uriLabel, connectMs }) => {
    console.log(`[OK] MongoDB connected in ${connectMs}ms using ${uriLabel}`);

    app.listen(PORT, () => {
      const ip = process.env.SERVER_IP || "localhost";
      console.log(`\n[SERVER] Running on port ${PORT}`);
      console.log(`[ACCESS] http://${ip}:${PORT}`);
      console.log(`[UPLOADS] http://${ip}:${PORT}/uploads`);
      console.log(`[AUTH]    http://${ip}:${PORT}/api/auth`);
      console.log(`[HEALTH]  http://${ip}:${PORT}/api/health`);
      console.log(`\n[READY] Server is ready to accept requests!\n`);
    });

    // Run DB seeding in the background so startup is not blocked.
    initializeDatabase()
      .then((initialized) => {
        if (initialized) console.log("[OK] Database initialized");
      })
      .catch((err) => console.error("[ERROR] DB init error:", err));
  })
  .catch((err) => {
    console.error("[ERROR] MongoDB connection failed:", err);
    for (const hint of getMongoConnectionHints(err)) {
      console.error(`[HINT] ${hint}`);
    }
    console.error("Server not started. Please check your MongoDB connection.");
    process.exit(1);
  });
