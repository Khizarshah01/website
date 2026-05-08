const NIRF = require("../models/NIRF");

// @desc    Get all NIRF data
// @route   GET /api/nirf
// @access  Public
const getAllNIRF = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    const nirfData = await NIRF.find(query).sort({ year: -1 });

    res.json({
      success: true,
      count: nirfData.length,
      data: nirfData,
    });
  } catch (error) {
    console.error("Error fetching NIRF data:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching NIRF data",
    });
  }
};

// @desc    Get NIRF data by year
// @route   GET /api/nirf/year/:year
// @access  Public
const getNIRFByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const { category } = req.query;

    let query = { year, isActive: true };
    if (category) {
      query.category = category;
    }

    const nirfData = await NIRF.findOne(query);

    if (!nirfData) {
      return res.status(404).json({
        success: false,
        message: "NIRF data not found for this year",
      });
    }

    res.json({
      success: true,
      data: nirfData,
    });
  } catch (error) {
    console.error("Error fetching NIRF data:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get latest NIRF data
// @route   GET /api/nirf/latest
// @access  Public
const getLatestNIRF = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    const nirfData = await NIRF.findOne(query).sort({ year: -1 });

    if (!nirfData) {
      return res.status(404).json({
        success: false,
        message: "No NIRF data found",
      });
    }

    res.json({
      success: true,
      data: nirfData,
    });
  } catch (error) {
    console.error("Error fetching latest NIRF data:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get comparison data for chart
// @route   GET /api/nirf/comparison
// @access  Public
const getComparison = async (req, res) => {
  try {
    const { years = 3, category = "engineering" } = req.query;

    const nirfData = await NIRF.find({ category, isActive: true })
      .sort({ year: -1 })
      .limit(parseInt(years));

    res.json({
      success: true,
      data: nirfData.reverse(), // Oldest first for chart
    });
  } catch (error) {
    console.error("Error fetching comparison data:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Create new NIRF entry
// @route   POST /api/nirf/admin/create
// @access  Private (Admin)
const createNIRF = async (req, res) => {
  try {
    const nirfData = await NIRF.create(req.body);

    res.status(201).json({
      success: true,
      data: nirfData,
    });
  } catch (error) {
    console.error("Error creating NIRF entry:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update NIRF entry
// @route   PUT /api/nirf/admin/:id
// @access  Private (Admin)
const updateNIRF = async (req, res) => {
  try {
    const nirfData = await NIRF.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!nirfData) {
      return res.status(404).json({
        success: false,
        message: "NIRF entry not found",
      });
    }

    res.json({
      success: true,
      data: nirfData,
    });
  } catch (error) {
    console.error("Error updating NIRF entry:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete NIRF entry
// @route   DELETE /api/nirf/admin/:id
// @access  Private (Admin)
const deleteNIRF = async (req, res) => {
  try {
    const nirfData = await NIRF.findByIdAndDelete(req.params.id);

    if (!nirfData) {
      return res.status(404).json({
        success: false,
        message: "NIRF entry not found",
      });
    }

    res.json({
      success: true,
      message: "NIRF entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting NIRF entry:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get all NIRF data for admin
// @route   GET /api/nirf/admin/all
// @access  Private (Admin)
const getAllNIRFAdmin = async (req, res) => {
  try {
    const nirfData = await NIRF.find().sort({ year: -1 });

    res.json({
      success: true,
      count: nirfData.length,
      data: nirfData,
    });
  } catch (error) {
    console.error("Error fetching admin NIRF data:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Seed NIRF data
// @route   POST /api/nirf/admin/seed
// @access  Private (Admin)
const seedNIRF = async (req, res) => {
  try {
    const sampleData = [
      {
        year: "2024",
        category: "engineering",
        rank: 150,
        overallScore: 42.58,
        parameters: { tlr: 45.2, rp: 12.35, go: 52.8, oi: 48.65, pr: 5.0 },
        reportUrl: "/uploads/nirf/nirf-2024.pdf",
        submissionDate: new Date("2024-01-15"),
        order: 1,
      },
      {
        year: "2023",
        category: "engineering",
        rank: 180,
        overallScore: 40.25,
        parameters: { tlr: 43.15, rp: 10.2, go: 50.45, oi: 46.8, pr: 4.5 },
        reportUrl: "/uploads/nirf/nirf-2023.pdf",
        submissionDate: new Date("2023-01-20"),
        order: 2,
      },
      {
        year: "2022",
        category: "engineering",
        rank: 195,
        overallScore: 38.9,
        parameters: { tlr: 41.8, rp: 8.5, go: 48.2, oi: 45.3, pr: 4.2 },
        reportUrl: "/uploads/nirf/nirf-2022.pdf",
        submissionDate: new Date("2022-01-18"),
        order: 3,
      },
      {
        year: "2021",
        category: "engineering",
        rank: 210,
        overallScore: 36.5,
        parameters: { tlr: 40.1, rp: 7.2, go: 45.8, oi: 43.5, pr: 3.8 },
        reportUrl: "/uploads/nirf/nirf-2021.pdf",
        submissionDate: new Date("2021-01-15"),
        order: 4,
      },
      {
        year: "2020",
        category: "engineering",
        rank: 225,
        overallScore: 34.2,
        parameters: { tlr: 38.5, rp: 5.8, go: 43.6, oi: 41.2, pr: 3.5 },
        reportUrl: "/uploads/nirf/nirf-2020.pdf",
        submissionDate: new Date("2020-01-20"),
        order: 5,
      },
    ];

    await NIRF.deleteMany({});
    await NIRF.insertMany(sampleData);

    res.json({
      success: true,
      message: `Successfully seeded ${sampleData.length} NIRF entries`,
      count: sampleData.length,
    });
  } catch (error) {
    console.error("Error seeding NIRF data:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllNIRF,
  getNIRFByYear,
  getLatestNIRF,
  getComparison,
  createNIRF,
  updateNIRF,
  deleteNIRF,
  getAllNIRFAdmin,
  seedNIRF,
};
