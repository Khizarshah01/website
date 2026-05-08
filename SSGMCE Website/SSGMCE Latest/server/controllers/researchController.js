const {
  Publication,
  Patent,
  FundedProject,
  ResearchArea,
  Innovation,
} = require("../models/Research");
const { verifyDocDepartment } = require("../middleware/authMiddleware");
const { toResearchDept } = require("../utils/departmentMap");

// ── Helper ──────────────────────────────────────────────────────────
const isCoordinator = (user) =>
  user && user.role === "Coordinator" && user.department !== "All";

/**
 * For coordinators the checkDepartmentAccess middleware stamps
 * req.body.department with the User-model code (e.g. "ELECTRICAL").
 * Research schemas use a different enum (e.g. "EE").
 * This helper converts it so Mongoose validation passes.
 */
const translateBodyDept = (req) => {
  if (isCoordinator(req.user) && req.body.department) {
    req.body.department = toResearchDept(req.body.department);
  }
};

/**
 * Verify a research document belongs to the coordinator's department.
 * Handles the code mismatch (doc stores "EE", user has "ELECTRICAL").
 */
const verifyResearchDoc = (req, doc) => {
  if (
    req.user.role === "SuperAdmin" ||
    req.user.role === "admin" ||
    req.user.department === "All"
  ) {
    return null;
  }
  const mappedUserDept = toResearchDept(req.user.department);
  if (doc.department === mappedUserDept) return null;
  return `Access denied. You can only manage ${req.user.department} department data.`;
};

// ==================== PUBLICATION CONTROLLERS ====================

// @desc    Get all publications with filters
// @route   GET /api/research/publications
// @access  Public (optionalProtect sets req.user when token present)
const getPublications = async (req, res) => {
  try {
    const { department, year, type, search, page = 1, limit = 10 } = req.query;

    const filter = {};
    // Public visitors only see published
    if (!req.user) filter.isPublished = true;

    // Coordinator → force-filter to their department (mapped code)
    if (isCoordinator(req.user)) {
      filter.department = toResearchDept(req.user.department);
    } else if (department) {
      filter.department = department;
    }

    if (year) filter.year = parseInt(year);
    if (type) filter.type = type;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { authors: { $in: [new RegExp(search, "i")] } },
        { keywords: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const publications = await Publication.find(filter)
      .sort({ year: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Publication.countDocuments(filter);

    res.json({
      publications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single publication
// @route   GET /api/research/publications/:id
// @access  Public
const getPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    res.json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create publication
// @route   POST /api/research/publications
// @access  Private/AdminOrCoordinator
const createPublication = async (req, res) => {
  try {
    translateBodyDept(req);
    const publication = await Publication.create(req.body);
    res.status(201).json(publication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update publication
// @route   PUT /api/research/publications/:id
// @access  Private/AdminOrCoordinator
const updatePublication = async (req, res) => {
  try {
    const existing = await Publication.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Publication not found" });

    const err = verifyResearchDoc(req, existing);
    if (err) return res.status(403).json({ message: err });

    translateBodyDept(req);
    if (isCoordinator(req.user)) req.body.department = toResearchDept(req.user.department);

    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.json(publication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete publication
// @route   DELETE /api/research/publications/:id
// @access  Private/AdminOrCoordinator
const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: "Publication not found" });

    const err = verifyResearchDoc(req, publication);
    if (err) return res.status(403).json({ message: err });

    await Publication.findByIdAndDelete(req.params.id);
    res.json({ message: "Publication deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== PATENT CONTROLLERS ====================

// @desc    Get all patents
// @route   GET /api/research/patents
// @access  Public (optionalProtect sets req.user when token present)
const getPatents = async (req, res) => {
  try {
    const { department, status, type, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (!req.user) filter.isPublished = true;

    if (isCoordinator(req.user)) {
      filter.department = toResearchDept(req.user.department);
    } else if (department) {
      filter.department = department;
    }
    if (status) filter.status = status;
    if (type) filter.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const patents = await Patent.find(filter)
      .sort({ filingDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Patent.countDocuments(filter);

    res.json({
      patents,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create patent
// @route   POST /api/research/patents
// @access  Private/AdminOrCoordinator
const createPatent = async (req, res) => {
  try {
    translateBodyDept(req);
    const patent = await Patent.create(req.body);
    res.status(201).json(patent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update patent
// @route   PUT /api/research/patents/:id
// @access  Private/AdminOrCoordinator
const updatePatent = async (req, res) => {
  try {
    const existing = await Patent.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Patent not found" });

    const err = verifyResearchDoc(req, existing);
    if (err) return res.status(403).json({ message: err });

    translateBodyDept(req);
    if (isCoordinator(req.user)) req.body.department = toResearchDept(req.user.department);

    const patent = await Patent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(patent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete patent
// @route   DELETE /api/research/patents/:id
// @access  Private/AdminOrCoordinator
const deletePatent = async (req, res) => {
  try {
    const patent = await Patent.findById(req.params.id);
    if (!patent) return res.status(404).json({ message: "Patent not found" });

    const err = verifyResearchDoc(req, patent);
    if (err) return res.status(403).json({ message: err });

    await Patent.findByIdAndDelete(req.params.id);
    res.json({ message: "Patent deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== FUNDED PROJECT CONTROLLERS ====================

// @desc    Get all funded projects
// @route   GET /api/research/projects
// @access  Public (optionalProtect sets req.user when token present)
const getFundedProjects = async (req, res) => {
  try {
    const { department, status, agency, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (!req.user) filter.isPublished = true;

    if (isCoordinator(req.user)) {
      filter.department = toResearchDept(req.user.department);
    } else if (department) {
      filter.department = department;
    }
    if (status) filter.status = status;
    if (agency) filter.fundingAgency = { $regex: agency, $options: "i" };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const projects = await FundedProject.find(filter)
      .sort({ startDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await FundedProject.countDocuments(filter);

    res.json({
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create funded project
// @route   POST /api/research/projects
// @access  Private/AdminOrCoordinator
const createFundedProject = async (req, res) => {
  try {
    translateBodyDept(req);
    const project = await FundedProject.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update funded project
// @route   PUT /api/research/projects/:id
// @access  Private/AdminOrCoordinator
const updateFundedProject = async (req, res) => {
  try {
    const existing = await FundedProject.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Project not found" });

    const err = verifyResearchDoc(req, existing);
    if (err) return res.status(403).json({ message: err });

    translateBodyDept(req);
    if (isCoordinator(req.user)) req.body.department = toResearchDept(req.user.department);

    const project = await FundedProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete funded project
// @route   DELETE /api/research/projects/:id
// @access  Private/AdminOrCoordinator
const deleteFundedProject = async (req, res) => {
  try {
    const project = await FundedProject.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const err = verifyResearchDoc(req, project);
    if (err) return res.status(403).json({ message: err });

    await FundedProject.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== RESEARCH AREA CONTROLLERS ====================

// @desc    Get all research areas
// @route   GET /api/research/areas
// @access  Public (optionalProtect sets req.user when token present)
const getResearchAreas = async (req, res) => {
  try {
    const filter = {};
    if (!req.user) filter.isActive = true;

    if (isCoordinator(req.user)) {
      filter.department = toResearchDept(req.user.department);
    } else if (req.query.department) {
      filter.department = req.query.department;
    }

    const areas = await ResearchArea.find(filter).sort({ name: 1 });
    res.json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create research area
// @route   POST /api/research/areas
// @access  Private/AdminOrCoordinator
const createResearchArea = async (req, res) => {
  try {
    translateBodyDept(req);
    const area = await ResearchArea.create(req.body);
    res.status(201).json(area);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update research area
// @route   PUT /api/research/areas/:id
// @access  Private/AdminOrCoordinator
const updateResearchArea = async (req, res) => {
  try {
    const existing = await ResearchArea.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Research area not found" });

    const err = verifyResearchDoc(req, existing);
    if (err) return res.status(403).json({ message: err });

    translateBodyDept(req);
    if (isCoordinator(req.user)) req.body.department = toResearchDept(req.user.department);

    const area = await ResearchArea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(area);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ==================== INNOVATION CONTROLLERS ====================

// @desc    Get all innovations
// @route   GET /api/research/innovations
// @access  Public
const getInnovations = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 10 } = req.query;

    const filter = { isPublished: true };
    if (type) filter.type = type;
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const innovations = await Innovation.find(filter)
      .sort({ year: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Innovation.countDocuments(filter);

    res.json({
      innovations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create innovation
// @route   POST /api/research/innovations
// @access  Private/Admin
const createInnovation = async (req, res) => {
  try {
    const innovation = await Innovation.create(req.body);
    res.status(201).json(innovation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update innovation
// @route   PUT /api/research/innovations/:id
// @access  Private/Admin
const updateInnovation = async (req, res) => {
  try {
    const innovation = await Innovation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!innovation) {
      return res.status(404).json({ message: "Innovation not found" });
    }
    res.json(innovation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete innovation
// @route   DELETE /api/research/innovations/:id
// @access  Private/Admin
const deleteInnovation = async (req, res) => {
  try {
    const innovation = await Innovation.findByIdAndDelete(req.params.id);
    if (!innovation) {
      return res.status(404).json({ message: "Innovation not found" });
    }
    res.json({ message: "Innovation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== STATISTICS ====================

// @desc    Get research statistics
// @route   GET /api/research/stats
// @access  Public
const getResearchStats = async (req, res) => {
  try {
    const [
      publicationsCount,
      patentsCount,
      grantedPatentsCount,
      projectsCount,
      ongoingProjectsCount,
      innovationsCount,
      totalFunding,
    ] = await Promise.all([
      Publication.countDocuments({ isPublished: true }),
      Patent.countDocuments({ isPublished: true }),
      Patent.countDocuments({ isPublished: true, status: "granted" }),
      FundedProject.countDocuments({ isPublished: true }),
      FundedProject.countDocuments({ isPublished: true, status: "ongoing" }),
      Innovation.countDocuments({ isPublished: true }),
      FundedProject.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    res.json({
      publications: publicationsCount,
      patents: {
        total: patentsCount,
        granted: grantedPatentsCount,
      },
      projects: {
        total: projectsCount,
        ongoing: ongoingProjectsCount,
      },
      innovations: innovationsCount,
      totalFunding: totalFunding[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== SEED DATA ====================

// @desc    Seed research data
// @route   POST /api/research/seed
// @access  Private/Admin
const seedResearchData = async (req, res) => {
  try {
    // Sample Publications
    const publicationsData = [
      {
        title:
          "Deep Learning Based Approach for Automated Disease Detection in Crops",
        authors: ["Dr. R. S. Patil", "Prof. A. K. Sharma", "Dr. M. N. Gaikwad"],
        year: 2024,
        type: "journal",
        publisher: "Elsevier",
        journalName: "Computers and Electronics in Agriculture",
        volume: "215",
        pages: "108-121",
        doi: "10.1016/j.compag.2024.108421",
        department: "CSE",
        abstract:
          "This paper presents a novel deep learning framework for automated detection of crop diseases using convolutional neural networks.",
        keywords: ["Deep Learning", "CNN", "Agriculture", "Image Processing"],
        isPublished: true,
      },
      {
        title: "IoT-Based Smart Irrigation System for Precision Agriculture",
        authors: ["Dr. S. B. Somani", "Dr. P. K. Bharne"],
        year: 2024,
        type: "conference",
        publisher: "IEEE",
        journalName: "International Conference on Smart Technologies",
        pages: "45-52",
        doi: "10.1109/ICST.2024.9876543",
        department: "ENTC",
        abstract:
          "Implementation of an IoT-based smart irrigation system for optimal water usage in agriculture.",
        keywords: ["IoT", "Smart Agriculture", "Irrigation", "Sensors"],
        isPublished: true,
      },
      {
        title: "Renewable Energy Integration in Smart Grid Systems",
        authors: ["Dr. V. M. Kulkarni", "Dr. A. B. Patil"],
        year: 2023,
        type: "journal",
        publisher: "Springer",
        journalName: "Sustainable Energy Technologies and Assessments",
        volume: "52",
        pages: "102-115",
        department: "EE",
        abstract:
          "Analysis of renewable energy integration challenges and solutions in modern smart grid infrastructure.",
        keywords: ["Renewable Energy", "Smart Grid", "Power Systems"],
        isPublished: true,
      },
      {
        title: "Machine Learning Algorithms for Network Intrusion Detection",
        authors: ["Dr. N. S. Patil", "Prof. R. K. Deshmukh"],
        year: 2023,
        type: "journal",
        publisher: "Wiley",
        journalName: "Security and Communication Networks",
        volume: "28",
        pages: "1-15",
        department: "IT",
        abstract:
          "Comparative analysis of machine learning algorithms for detecting network intrusions in enterprise environments.",
        keywords: ["Machine Learning", "Cybersecurity", "Intrusion Detection"],
        isPublished: true,
      },
      {
        title: "VLSI Design of Low Power ALU for IoT Applications",
        authors: ["Dr. M. R. Patil", "Dr. S. V. Gaikwad"],
        year: 2024,
        type: "conference",
        publisher: "IEEE",
        journalName: "International Conference on VLSI Design",
        pages: "234-240",
        department: "ENTC",
        abstract:
          "Design and implementation of a low power arithmetic logic unit optimized for IoT edge devices.",
        keywords: ["VLSI", "Low Power", "IoT", "ALU"],
        isPublished: true,
      },
    ];

    // Sample Patents
    const patentsData = [
      {
        title: "Smart Wearable Device for Health Monitoring of Farmers",
        inventors: ["Dr. A. B. Patil", "Dr. R. S. Kulkarni"],
        applicationNumber: "202321012345",
        filingDate: new Date("2023-06-15"),
        status: "published",
        type: "patent",
        department: "ENTC",
        description:
          "A wearable IoT device that monitors vital health parameters of farmers working in agricultural fields.",
        category: "Healthcare IoT",
        isPublished: true,
      },
      {
        title: "AI-Based Traffic Signal Control System",
        inventors: [
          "Dr. S. B. Somani",
          "Dr. M. N. Gaikwad",
          "Dr. P. K. Bharne",
        ],
        patentNumber: "404532",
        applicationNumber: "202221087654",
        filingDate: new Date("2022-03-20"),
        grantDate: new Date("2024-01-15"),
        status: "granted",
        type: "patent",
        department: "CSE",
        description:
          "An intelligent traffic signal control system using AI and machine learning for urban traffic management.",
        category: "Smart City",
        isPublished: true,
      },
      {
        title: "Solar Powered Water Purification System",
        inventors: ["Dr. V. M. Kulkarni", "Dr. A. R. Deshmukh"],
        applicationNumber: "202421098765",
        filingDate: new Date("2024-02-10"),
        status: "filed",
        type: "patent",
        department: "EE",
        description:
          "Portable solar-powered water purification device for rural areas.",
        category: "Renewable Energy",
        isPublished: true,
      },
      {
        title: "Educational Software for Engineering Graphics",
        inventors: ["Prof. R. K. Patil", "Dr. S. M. Gawali"],
        applicationNumber: "SW-2024/12345",
        filingDate: new Date("2024-01-05"),
        status: "granted",
        type: "copyright",
        department: "ME",
        description:
          "Interactive software for teaching engineering graphics and CAD fundamentals.",
        category: "Educational Software",
        isPublished: true,
      },
    ];

    // Sample Funded Projects
    const projectsData = [
      {
        title: "Development of AI-Based Crop Disease Detection System",
        principalInvestigator: "Dr. R. S. Patil",
        coPrincipalInvestigators: ["Dr. A. K. Sharma", "Prof. M. N. Deshmukh"],
        fundingAgency: "AICTE - RPS",
        sanctionNumber: "AICTE/RPS/2023/001234",
        amount: 2500000,
        startDate: new Date("2023-04-01"),
        endDate: new Date("2026-03-31"),
        duration: "3 Years",
        status: "ongoing",
        department: "CSE",
        description:
          "Development of an AI-powered mobile application for early detection of crop diseases to assist farmers.",
        milestones: [
          { title: "Literature Survey & Data Collection", completed: true },
          { title: "Model Development & Training", completed: true },
          { title: "Mobile App Development", completed: false },
          { title: "Field Testing & Validation", completed: false },
        ],
        outcomes: ["2 Research Papers Published", "Patent Filed"],
        isPublished: true,
      },
      {
        title: "Smart Grid Integration of Renewable Energy Sources",
        principalInvestigator: "Dr. V. M. Kulkarni",
        coPrincipalInvestigators: ["Dr. A. B. Patil"],
        fundingAgency: "DST - SERB",
        sanctionNumber: "DST/SERB/2022/00567",
        amount: 3500000,
        startDate: new Date("2022-10-01"),
        endDate: new Date("2025-09-30"),
        duration: "3 Years",
        status: "ongoing",
        department: "EE",
        description:
          "Research on optimal integration strategies for solar and wind energy into existing power grid infrastructure.",
        milestones: [
          { title: "Grid Analysis & Simulation Setup", completed: true },
          { title: "Hardware Prototype Development", completed: true },
          { title: "Testing & Optimization", completed: false },
          { title: "Technology Transfer", completed: false },
        ],
        outcomes: ["3 Journal Publications", "1 Patent Granted"],
        isPublished: true,
      },
      {
        title: "IoT-Based Industrial Automation for MSMEs",
        principalInvestigator: "Dr. S. B. Somani",
        fundingAgency: "Industry - L&T Infotech",
        amount: 1500000,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2025-12-31"),
        duration: "2 Years",
        status: "ongoing",
        department: "ENTC",
        description:
          "Development of affordable IoT solutions for automation in small and medium enterprises.",
        milestones: [
          { title: "Requirement Analysis", completed: true },
          { title: "Sensor Network Design", completed: false },
          { title: "Cloud Platform Development", completed: false },
        ],
        isPublished: true,
      },
      {
        title: "Blockchain-Based Document Verification System",
        principalInvestigator: "Dr. N. S. Patil",
        fundingAgency: "AICTE - MODROB",
        sanctionNumber: "AICTE/MOD/2021/00321",
        amount: 1800000,
        startDate: new Date("2021-06-01"),
        endDate: new Date("2023-05-31"),
        duration: "2 Years",
        status: "completed",
        department: "IT",
        description:
          "Development of a blockchain-based system for secure verification of academic documents.",
        milestones: [
          { title: "System Architecture Design", completed: true },
          { title: "Smart Contract Development", completed: true },
          { title: "Web Interface Development", completed: true },
          { title: "Pilot Implementation", completed: true },
        ],
        outcomes: ["System Deployed in College", "2 Research Papers"],
        isPublished: true,
      },
    ];

    // Sample Research Areas
    const areasData = [
      {
        name: "Artificial Intelligence & Machine Learning",
        description:
          "Research on AI algorithms, deep learning, natural language processing, and computer vision applications.",
        icon: "FaBrain",
        department: "CSE",
        facultyCount: 8,
        publicationCount: 45,
        keywords: ["AI", "ML", "Deep Learning", "NLP", "Computer Vision"],
        isActive: true,
      },
      {
        name: "Internet of Things (IoT)",
        description:
          "Development of smart sensor networks, edge computing, and IoT applications for agriculture and industry.",
        icon: "FaNetworkWired",
        department: "ENTC",
        facultyCount: 6,
        publicationCount: 32,
        keywords: ["IoT", "Sensors", "Edge Computing", "Smart Systems"],
        isActive: true,
      },
      {
        name: "Renewable Energy Systems",
        description:
          "Research on solar, wind energy integration, power electronics, and smart grid technologies.",
        icon: "FaSolarPanel",
        department: "EE",
        facultyCount: 5,
        publicationCount: 28,
        keywords: [
          "Solar Energy",
          "Wind Power",
          "Smart Grid",
          "Power Electronics",
        ],
        isActive: true,
      },
      {
        name: "VLSI & Embedded Systems",
        description:
          "Design of low-power circuits, FPGA-based systems, and embedded applications.",
        icon: "FaMicrochip",
        department: "ENTC",
        facultyCount: 4,
        publicationCount: 22,
        keywords: ["VLSI", "FPGA", "Embedded Systems", "SoC"],
        isActive: true,
      },
      {
        name: "Cybersecurity",
        description:
          "Research on network security, cryptography, intrusion detection, and secure systems.",
        icon: "FaShieldAlt",
        department: "IT",
        facultyCount: 4,
        publicationCount: 18,
        keywords: ["Security", "Cryptography", "Network Security"],
        isActive: true,
      },
      {
        name: "Data Science & Big Data",
        description:
          "Analytics, data mining, visualization, and big data processing technologies.",
        icon: "FaDatabase",
        department: "CSE",
        facultyCount: 6,
        publicationCount: 35,
        keywords: ["Data Science", "Big Data", "Analytics", "Visualization"],
        isActive: true,
      },
    ];

    // Sample Innovations
    const innovationsData = [
      {
        title: "AgriSense - Smart Farming App",
        type: "startup",
        team: ["Rahul Patil", "Sneha Gaikwad", "Amit Deshmukh"],
        mentor: "Dr. R. S. Patil",
        description:
          "Mobile app providing AI-based crop disease detection and farming recommendations to local farmers.",
        year: 2024,
        status: "incubated",
        achievements: [
          "Winner - Smart India Hackathon 2023",
          "AICTE Startup Grant",
        ],
        funding: "₹5 Lakh (AICTE)",
        isPublished: true,
      },
      {
        title: "EduBot - AI Teaching Assistant",
        type: "project",
        team: ["Priya Shah", "Rohan Kumar"],
        mentor: "Dr. M. N. Gaikwad",
        description:
          "AI-powered chatbot for answering student queries and providing learning resources.",
        year: 2024,
        status: "development",
        achievements: ["Best Project - TechFest 2024"],
        isPublished: true,
      },
      {
        title: "WaterSmart - IoT Water Management",
        type: "incubation",
        team: ["Vikram Patil", "Anita Gawande", "Suresh Nair"],
        mentor: "Dr. S. B. Somani",
        description:
          "IoT-based water level monitoring and management system for residential complexes.",
        year: 2023,
        status: "launched",
        achievements: ["Deployed in 3 Housing Societies"],
        funding: "₹2 Lakh (College Grant)",
        isPublished: true,
      },
    ];

    // Clear existing data and insert new
    await Publication.deleteMany({});
    await Patent.deleteMany({});
    await FundedProject.deleteMany({});
    await ResearchArea.deleteMany({});
    await Innovation.deleteMany({});

    await Publication.insertMany(publicationsData);
    await Patent.insertMany(patentsData);
    await FundedProject.insertMany(projectsData);
    await ResearchArea.insertMany(areasData);
    await Innovation.insertMany(innovationsData);

    res.json({
      message: "Research data seeded successfully",
      counts: {
        publications: publicationsData.length,
        patents: patentsData.length,
        projects: projectsData.length,
        areas: areasData.length,
        innovations: innovationsData.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
  // Innovations
  getInnovations,
  createInnovation,
  updateInnovation,
  deleteInnovation,
  // Stats & Seed
  getResearchStats,
  seedResearchData,
};
