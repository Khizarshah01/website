const PlacementStat = require("../models/PlacementStat");
const Recruiter = require("../models/Recruiter");
const Testimonial = require("../models/Testimonial");

// @desc    Get all placement data (public)
// @route   GET /api/placements/public
// @access  Public
const getPlacementData = async (req, res) => {
  try {
    const stats = await PlacementStat.find({}).sort({ academicYear: -1 });
    const recruiters = await Recruiter.find({}).sort({ order: 1 });
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        stats,
        recruiters,
        testimonials,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Stats CRUD ---
const getStats = async (req, res) => {
  try {
    const stats = await PlacementStat.find({}).sort({ academicYear: -1 });
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createStat = async (req, res) => {
  try {
    const stat = await PlacementStat.create(req.body);
    res.status(201).json({ success: true, data: stat });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateStat = async (req, res) => {
  try {
    const stat = await PlacementStat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json({ success: true, data: stat });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteStat = async (req, res) => {
  try {
    await PlacementStat.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Stat deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Recruiters CRUD ---
const getRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find({}).sort({ order: 1 });
    res.json({ success: true, data: recruiters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.create(req.body);
    res.status(201).json({ success: true, data: recruiter });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json({ success: true, data: recruiter });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteRecruiter = async (req, res) => {
  try {
    await Recruiter.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Recruiter deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Testimonials CRUD ---
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Seed Data ---
const seedPlacementData = async (req, res) => {
  try {
    // Clear existing
    await PlacementStat.deleteMany({});
    await Recruiter.deleteMany({});
    await Testimonial.deleteMany({});

    // Seed Stats
    const stats = [
      {
        academicYear: "2023-24",
        placementPercentage: 92,
        highestPackage: 12.5,
        averagePackage: 4.5,
        totalOffers: 450,
        companiesVisited: 65,
        departmentWise: [
          { department: "CSE", placedCount: 120 },
          { department: "IT", placedCount: 60 },
          { department: "ENTC", placedCount: 90 },
          { department: "Electrical", placedCount: 50 },
          { department: "Mechanical", placedCount: 40 },
        ],
      },
      {
        academicYear: "2022-23",
        placementPercentage: 88,
        highestPackage: 10.0,
        averagePackage: 4.2,
        totalOffers: 410,
        companiesVisited: 55,
        departmentWise: [],
      },
      {
        academicYear: "2021-22",
        placementPercentage: 85,
        highestPackage: 9.5,
        averagePackage: 4.0,
        totalOffers: 380,
        companiesVisited: 50,
        departmentWise: [],
      },
    ];
    await PlacementStat.insertMany(stats);

    // Seed Recruiters
    const recruiters = [
      {
        name: "TCS",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
        category: "MNC",
      },
      {
        name: "Infosys",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
        category: "MNC",
      },
      {
        name: "Capgemini",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg",
        category: "MNC",
      },
      {
        name: "Cognizant",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2018.svg",
        category: "MNC",
      },
      {
        name: "Wipro",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
        category: "MNC",
      },
      {
        name: "Accenture",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
        category: "MNC",
      },
      {
        name: "Jio",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Reliance_Jio_Logo_%28October_2015%29.svg",
        category: "Product Based",
      },
      {
        name: "Tech Mahindra",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Tech_Mahindra_New_Logo.svg",
        category: "MNC",
      },
    ];
    await Recruiter.insertMany(recruiters);

    // Seed Testimonials
    const testimonials = [
      {
        studentName: "Aditi Deshmukh",
        batch: "2024",
        department: "CSE",
        company: "TCS Digital",
        message: "The T&P cell provided excellent training and support which helped me crack the interview.",
        designation: "System Engineer",
      },
      {
        studentName: "Rahul Patil",
        batch: "2023",
        department: "IT",
        company: "Infosys",
        message: "Thanks to the mock interviews, I was confident and prepared properly for the placement drive.",
        designation: "Specialist Programmer",
      },
    ];
    await Testimonial.insertMany(testimonials);

    res.json({ success: true, message: "Placement data seeded successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPlacementData,
  getStats,
  createStat,
  updateStat,
  deleteStat,
  getRecruiters,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  seedPlacementData,
};
