const express = require("express");
const router = express.Router();
const {
  protect,
  optionalProtect,
  adminOnly,
  adminOrCoordinator,
  checkDepartmentAccess,
} = require("../middleware/authMiddleware");
const {
  // Publications
  getPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
  // Patents
  getPatents,
  createPatent,
  updatePatent,
  deletePatent,
  // Funded Projects
  getFundedProjects,
  createFundedProject,
  updateFundedProject,
  deleteFundedProject,
  // Research Areas
  getResearchAreas,
  createResearchArea,
  updateResearchArea,
  // Innovations  (no department field → SuperAdmin only)
  getInnovations,
  createInnovation,
  updateInnovation,
  deleteInnovation,
  // Stats & Seed
  getResearchStats,
  seedResearchData,
} = require("../controllers/researchController");

const deptCheck = checkDepartmentAccess({ bodyField: "department", autoAssign: true });

// Statistics
router.get("/stats", getResearchStats);

// Seed data (SuperAdmin only)
router.post("/seed", protect, adminOnly, seedResearchData);

// ── Publications (dept-scoped → Coordinator + SuperAdmin) ──
router
  .route("/publications")
  .get(optionalProtect, getPublications)
  .post(protect, adminOrCoordinator, deptCheck, createPublication);

router
  .route("/publications/:id")
  .get(getPublication)
  .put(protect, adminOrCoordinator, deptCheck, updatePublication)
  .delete(protect, adminOrCoordinator, deletePublication);

// ── Patents (dept-scoped → Coordinator + SuperAdmin) ──
router
  .route("/patents")
  .get(optionalProtect, getPatents)
  .post(protect, adminOrCoordinator, deptCheck, createPatent);

router
  .route("/patents/:id")
  .put(protect, adminOrCoordinator, deptCheck, updatePatent)
  .delete(protect, adminOrCoordinator, deletePatent);

// ── Funded Projects (dept-scoped → Coordinator + SuperAdmin) ──
router
  .route("/projects")
  .get(optionalProtect, getFundedProjects)
  .post(protect, adminOrCoordinator, deptCheck, createFundedProject);

router
  .route("/projects/:id")
  .put(protect, adminOrCoordinator, deptCheck, updateFundedProject)
  .delete(protect, adminOrCoordinator, deleteFundedProject);

// ── Research Areas (dept-scoped → Coordinator + SuperAdmin) ──
router
  .route("/areas")
  .get(optionalProtect, getResearchAreas)
  .post(protect, adminOrCoordinator, deptCheck, createResearchArea);

router
  .route("/areas/:id")
  .put(protect, adminOrCoordinator, deptCheck, updateResearchArea);

// ── Innovations (NO department field → SuperAdmin only) ──
router
  .route("/innovations")
  .get(getInnovations)
  .post(protect, adminOnly, createInnovation);

router
  .route("/innovations/:id")
  .put(protect, adminOnly, updateInnovation)
  .delete(protect, adminOnly, deleteInnovation);

module.exports = router;
