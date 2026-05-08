const IQACMember = require("../models/IQACMember");
const IQACDocument = require("../models/IQACDocument");
const IQACNews = require("../models/IQACNews");

// ==================== MEMBERS ====================

// Get all active members
const getMembers = async (req, res) => {
  try {
    const members = await IQACMember.find({ isActive: true }).sort({
      order: 1,
      role: 1,
    });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all members (admin)
const getAllMembers = async (req, res) => {
  try {
    const members = await IQACMember.find().sort({ order: 1 });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a member
const addMember = async (req, res) => {
  try {
    const member = new IQACMember(req.body);
    await member.save();
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a member
const updateMember = async (req, res) => {
  try {
    const member = await IQACMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a member
const deleteMember = async (req, res) => {
  try {
    const member = await IQACMember.findByIdAndDelete(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    res.json({ success: true, message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== DOCUMENTS ====================

// Get documents by category
const getDocuments = async (req, res) => {
  try {
    const { category } = req.params;
    const query = { isPublished: true };
    if (category && category !== "all") query.category = category;

    const documents = await IQACDocument.find(query).sort({
      academicYear: -1,
      createdAt: -1,
    });
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all documents (admin)
const getAllDocuments = async (req, res) => {
  try {
    const documents = await IQACDocument.find().sort({
      category: 1,
      academicYear: -1,
    });
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a document
const addDocument = async (req, res) => {
  try {
    const document = new IQACDocument(req.body);
    await document.save();
    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a document
const updateDocument = async (req, res) => {
  try {
    const document = await IQACDocument.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!document)
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a document
const deleteDocument = async (req, res) => {
  try {
    const document = await IQACDocument.findByIdAndDelete(req.params.id);
    if (!document)
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    res.json({ success: true, message: "Document deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== NEWS ====================

// Get active news
const getNews = async (req, res) => {
  try {
    const now = new Date();
    const news = await IQACNews.find({
      isActive: true,
      $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }],
    })
      .sort({ priority: -1, createdAt: -1 })
      .limit(10);
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all news (admin)
const getAllNews = async (req, res) => {
  try {
    const news = await IQACNews.find().sort({ createdAt: -1 });
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add news
const addNews = async (req, res) => {
  try {
    const news = new IQACNews(req.body);
    await news.save();
    res.status(201).json({ success: true, data: news });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update news
const updateNews = async (req, res) => {
  try {
    const news = await IQACNews.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!news)
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete news
const deleteNews = async (req, res) => {
  try {
    const news = await IQACNews.findByIdAndDelete(req.params.id);
    if (!news)
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    res.json({ success: true, message: "News deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== SEED DATA ====================

const seedIQACData = async (req, res) => {
  try {
    // Seed Members
    const membersData = [
      {
        name: "Dr. S. B. Somani",
        designation: "Principal",
        role: "Chairperson",
        department: "Administration",
        order: 1,
      },
      {
        name: "Dr. A. S. Sayyad",
        designation: "IQAC Coordinator",
        role: "Coordinator",
        department: "Computer Science",
        order: 2,
      },
      {
        name: "Dr. R. M. Autee",
        designation: "Professor",
        role: "Faculty",
        department: "Electronics & Telecommunication",
        order: 3,
      },
      {
        name: "Dr. S. S. Khandare",
        designation: "Professor",
        role: "Faculty",
        department: "Mechanical Engineering",
        order: 4,
      },
      {
        name: "Dr. A. P. Thakare",
        designation: "Professor",
        role: "Faculty",
        department: "Electrical Engineering",
        order: 5,
      },
      {
        name: "Dr. P. R. Deshmukh",
        designation: "Professor",
        role: "Faculty",
        department: "Information Technology",
        order: 6,
      },
      {
        name: "Shri. R. K. Patil",
        designation: "Registrar",
        role: "Administrative",
        department: "Administration",
        order: 7,
      },
      {
        name: "Shri. S. M. Ingole",
        designation: "Account Officer",
        role: "Administrative",
        department: "Accounts",
        order: 8,
      },
      {
        name: "Industry Representative",
        designation: "External Expert",
        role: "External",
        department: "Industry",
        order: 9,
      },
      {
        name: "Alumni Representative",
        designation: "Alumni Member",
        role: "Alumni",
        department: "Alumni Association",
        order: 10,
      },
    ];

    for (const member of membersData) {
      await IQACMember.findOneAndUpdate({ name: member.name }, member, {
        upsert: true,
        new: true,
      });
    }

    // Seed Documents
    const documentsData = [
      {
        title: "AQAR 2023-24",
        category: "AQAR",
        academicYear: "2023-24",
        fileUrl: "/uploads/iqac/aqar-2023-24.pdf",
        fileType: "pdf",
      },
      {
        title: "AQAR 2022-23",
        category: "AQAR",
        academicYear: "2022-23",
        fileUrl: "/uploads/iqac/aqar-2022-23.pdf",
        fileType: "pdf",
      },
      {
        title: "AQAR 2021-22",
        category: "AQAR",
        academicYear: "2021-22",
        fileUrl: "/uploads/iqac/aqar-2021-22.pdf",
        fileType: "pdf",
      },
      {
        title: "AQAR 2020-21",
        category: "AQAR",
        academicYear: "2020-21",
        fileUrl: "/uploads/iqac/aqar-2020-21.pdf",
        fileType: "pdf",
      },
      {
        title: "Minutes of Meeting - January 2024",
        category: "Minutes",
        academicYear: "2023-24",
        fileUrl: "/uploads/iqac/mom-jan-2024.pdf",
        fileType: "pdf",
      },
      {
        title: "Minutes of Meeting - August 2023",
        category: "Minutes",
        academicYear: "2023-24",
        fileUrl: "/uploads/iqac/mom-aug-2023.pdf",
        fileType: "pdf",
      },
      {
        title: "NAAC SSR 3rd Cycle",
        category: "NAAC",
        academicYear: "2023-24",
        fileUrl: "/uploads/iqac/naac-ssr-3rd.pdf",
        fileType: "pdf",
        description: "Self Study Report for NAAC 3rd Cycle",
      },
      {
        title: "NAAC Certificate",
        category: "NAAC",
        academicYear: "2018-19",
        fileUrl: "/uploads/iqac/naac-certificate.pdf",
        fileType: "pdf",
        description: "NAAC Accreditation Certificate - A Grade",
      },
      {
        title: "NBA Accreditation - CSE",
        category: "NBA",
        academicYear: "2022-23",
        fileUrl: "/uploads/iqac/nba-cse.pdf",
        fileType: "pdf",
      },
      {
        title: "NBA Accreditation - ENTC",
        category: "NBA",
        academicYear: "2022-23",
        fileUrl: "/uploads/iqac/nba-entc.pdf",
        fileType: "pdf",
      },
      {
        title: "Best Practices 2023-24",
        category: "Best Practices",
        academicYear: "2023-24",
        fileUrl: "/uploads/iqac/best-practices-2023-24.pdf",
        fileType: "pdf",
      },
      {
        title: "Stakeholder Feedback Report",
        category: "Feedback",
        academicYear: "2023-24",
        fileUrl: "/uploads/iqac/feedback-2023-24.pdf",
        fileType: "pdf",
      },
      {
        title: "Student Satisfaction Survey",
        category: "Survey",
        academicYear: "2023-24",
        fileUrl: "/uploads/iqac/survey-2023-24.pdf",
        fileType: "pdf",
      },
      {
        title: "Gender Sensitization Plan",
        category: "Gender",
        academicYear: "2023-24",
        fileUrl: "/uploads/iqac/gender-plan-2023-24.pdf",
        fileType: "pdf",
      },
    ];

    for (const doc of documentsData) {
      await IQACDocument.findOneAndUpdate({ title: doc.title }, doc, {
        upsert: true,
        new: true,
      });
    }

    // Seed News
    const newsData = [
      {
        title: "NAAC Peer Team Visit Scheduled",
        content: "NAAC peer team visit scheduled for March 2024.",
        priority: 10,
        isActive: true,
      },
      {
        title: "AQAR 2023-24 Submitted",
        content: "Annual Quality Assurance Report submitted successfully.",
        priority: 5,
        isActive: true,
      },
      {
        title: "IQAC Meeting Notice",
        content: "Next IQAC meeting scheduled for 15th February 2024.",
        priority: 3,
        isActive: true,
      },
    ];

    for (const news of newsData) {
      await IQACNews.findOneAndUpdate({ title: news.title }, news, {
        upsert: true,
        new: true,
      });
    }

    res.json({ success: true, message: "IQAC data seeded successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  // Members
  getMembers,
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
  // Documents
  getDocuments,
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  // News
  getNews,
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
  // Seed
  seedIQACData,
};
