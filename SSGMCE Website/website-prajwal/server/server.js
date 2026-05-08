const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from uploads folder
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
app.use("/api/nirf", nirfRoutes);
app.use("/api/convert", convertRoutes);

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
    return res.status(400).json({
      success: false,
      error: "File too large. Maximum size is 10MB.",
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

// MongoDB Connection
const mongoConnectStartedAt = Date.now();
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ssgmce", {
    family: 4,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 20,
    minPoolSize: 2,
  })
  .then(() => {
    const connectMs = Date.now() - mongoConnectStartedAt;
    console.log(`[OK] MongoDB Connected Successfully in ${connectMs}ms`);

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
    console.error("Server not started. Please check your MongoDB connection.");
    process.exit(1);
  });
