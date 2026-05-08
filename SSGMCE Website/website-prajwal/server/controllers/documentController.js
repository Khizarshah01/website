const Document = require("../models/Document");

// @desc    Get all active documents
// @route   GET /api/documents
// @access  Public
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ isActive: true }).sort({
      category: 1,
      order: 1,
      uploadDate: -1,
    });
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get category statistics
// @route   GET /api/documents/stats
// @access  Public
const getCategoryStats = async (req, res) => {
  try {
    const stats = await Document.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get documents by category
// @route   GET /api/documents/category/:category
// @access  Public
const getDocumentsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const documents = await Document.find({
      category: category,
      isActive: true,
    }).sort({ order: 1, uploadDate: -1 });
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single document
// @route   GET /api/documents/:id
// @access  Public
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Increment download count
// @route   POST /api/documents/:id/download
// @access  Public
const incrementDownload = async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true },
    );
    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all documents (admin)
// @route   GET /api/documents/admin/all
// @access  Private/Admin
const getAllDocumentsAdmin = async (req, res) => {
  try {
    const documents = await Document.find().sort({
      category: 1,
      order: 1,
    });
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new document
// @route   POST /api/documents/admin/create
// @access  Private/Admin
const createDocument = async (req, res) => {
  try {
    const document = await Document.create(req.body);
    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update document
// @route   PUT /api/documents/admin/:id
// @access  Private/Admin
const updateDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete document
// @route   DELETE /api/documents/admin/:id
// @access  Private/Admin
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }
    res.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Seed sample documents
// @route   POST /api/documents/admin/seed
// @access  Private/Admin
const seedDocuments = async (req, res) => {
  try {
    const sampleDocuments = [
      {
        title: "AICTE Approval Letter 2023-24",
        category: "aicte",
        year: "2023-24",
        fileUrl: "/uploads/documents/aicte-2023-24.pdf",
        fileType: "pdf",
        fileSize: "2.5 MB",
        order: 1,
      },
      {
        title: "NAAC Certificate",
        category: "naac",
        year: "2023",
        fileUrl: "/uploads/documents/naac-cert.pdf",
        fileType: "pdf",
        fileSize: "1.2 MB",
        order: 1,
      },
      {
        title: "NBA Accreditation - CSE",
        category: "nba",
        year: "2022",
        fileUrl: "/uploads/documents/nba-cse.pdf",
        fileType: "pdf",
        fileSize: "3.1 MB",
        order: 1,
      },
    ];

    for (const doc of sampleDocuments) {
      await Document.findOneAndUpdate({ title: doc.title }, doc, {
        upsert: true,
        new: true,
      });
    }

    res.json({
      success: true,
      message: "Sample documents seeded successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllDocuments,
  getDocumentsByCategory,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  incrementDownload,
  getAllDocumentsAdmin,
  seedDocuments,
  getCategoryStats,
};
