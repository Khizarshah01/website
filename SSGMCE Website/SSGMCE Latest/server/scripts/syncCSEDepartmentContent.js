/**
 * Migration Script: Sync CSE Department Markdown Content
 *
 * This script updates the canonical CSE department page and removes the
 * legacy duplicate CSE page that used the same route.
 *
 * Run: node scripts/syncCSEDepartmentContent.js
 */

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;
const CANONICAL_PAGE_ID = "departments-cse";
const LEGACY_PAGE_ID = "cse-overview";
const CSE_ROUTE = "/departments/cse";

if (!MONGO_URI) {
  console.error("MONGODB_URI not set in server/.env");
  process.exit(1);
}

const newSections = [
  {
    sectionId: "cse-overview",
    title: "Department Overview",
    type: "markdown",
    order: 1,
    isVisible: true,
    content: {
      text: "## Computer Science & Engineering (CSE)\n\nThe Computer Science & Engineering (CSE) Department at SSGMCE is one of the premier departments, established to develop skilled professionals in computing and software technologies. With a faculty of experienced educators and researchers, we provide comprehensive education combining theoretical knowledge with practical hands-on experience.",
    },
  },
  {
    sectionId: "cse-vision",
    title: "Vision & Mission",
    type: "markdown",
    order: 2,
    isVisible: true,
    content: {
      text: "### Vision\nTo produce globally competent computer science professionals who contribute significantly to technological advancement and societal development through innovation, research, and ethical practices.\n\n### Mission\n- To impart quality education in emerging areas of computer science and engineering\n- To develop problem-solving skills and foster innovation among students\n- To promote interdisciplinary research and industry collaboration\n- To cultivate ethical values and social responsibility in our students\n- To prepare graduates for successful careers and higher studies",
    },
  },
  {
    sectionId: "cse-programs",
    title: "Academic Programs",
    type: "markdown",
    order: 3,
    isVisible: true,
    content: {
      text: "| Program | Duration | Intake | Type |\n|---------|----------|--------|------|\n| **B.E. Computer Science & Engineering** | 4 Years | 120 | UG |\n| **M.Tech. Computer Science (Data Science)** | 2 Years | 25 | PG |\n| **Ph.D. Programs** | 3-5 Years | Limited | Research |",
    },
  },
  {
    sectionId: "cse-specializations",
    title: "Specialization Areas",
    type: "markdown",
    order: 4,
    isVisible: true,
    content: {
      text: "- **Artificial Intelligence & Machine Learning**\n- **Data Science & Analytics**\n- **Cloud Computing & DevOps**\n- **Web Technologies & Full Stack Development**\n- **Cybersecurity & Information Security**\n- **IoT & Embedded Systems**\n- **Database Management Systems**\n- **Software Engineering & Quality Assurance**",
    },
  },
  {
    sectionId: "cse-facilities",
    title: "Laboratory Facilities",
    type: "markdown",
    order: 5,
    isVisible: true,
    content: {
      text: "The department is equipped with state-of-the-art facilities including:\n\n- **Programming Labs**: 6 labs with 300+ computers running latest OS and development tools\n- **AI/ML Lab**: Specialized facility with GPU-enabled systems for advanced computation\n- **Database Lab**: Advanced database management system tools and platforms\n- **Networking Lab**: Network simulators (Cisco Packet Tracer, GNS3) and real networking equipment\n- **Web Development Lab**: Full-stack development environment with cloud platform access\n- **Seminar Hall**: 200-seater auditorium for technical talks and seminars\n- **Open Innovation Lab**: Maker space for student projects and innovation initiatives",
    },
  },
  {
    sectionId: "cse-placements",
    title: "Placement Statistics (CSE)",
    type: "markdown",
    order: 6,
    isVisible: true,
    content: {
      text: "### Year-wise Placement Performance\n\n| Academic Year | Placement Rate | Avg. Package | Highest Package | Students Placed |\n|---|---|---|---|---|\n| **2023-24** | 92% | Rs. 9.5 LPA | Rs. 28 LPA | 105 |\n| **2022-23** | 90% | Rs. 8.8 LPA | Rs. 25 LPA | 98 |\n| **2021-22** | 88% | Rs. 8.2 LPA | Rs. 22 LPA | 92 |\n| **2020-21** | 85% | Rs. 7.5 LPA | Rs. 20 LPA | 82 |",
    },
  },
  {
    sectionId: "cse-faculty",
    title: "Faculty Expertise",
    type: "markdown",
    order: 7,
    isVisible: true,
    content: {
      text: "Our faculty comprises experienced educators with Ph.D. qualifications and industry expertise in:\n\n- **Prof. Dr. [Name]** - AI/Machine Learning, Research Publications: 25+\n- **Prof. Dr. [Name]** - Database Systems, Patents: 3\n- **Prof. [Name]** - Web Technologies, Industry Experience: 15 years\n- **Prof. [Name]** - Cybersecurity, Industry Certifications: CISSP, CEH\n- **Prof. [Name]** - Cloud Computing, AWS/Azure Certified\n\nAll faculty members are actively involved in research, industry collaboration, and student mentorship.",
    },
  },
  {
    sectionId: "cse-clubs",
    title: "Student Activities & Clubs",
    type: "markdown",
    order: 8,
    isVisible: true,
    content: {
      text: "- **Coding Club**: Competitive programming and algorithmic problem-solving\n- **AI/ML Club**: Hands-on projects in artificial intelligence and machine learning\n- **Web Dev Club**: Full-stack development and modern web technologies\n- **Open Source Club**: Contributing to open-source projects and collaborative development\n- **SAE Club**: Software project development and entrepreneurship\n- **Tech Fest Committee**: Organizing annual tech festival with 500+ participants\n- **Innovation Council**: Student-led innovation projects and startup incubation",
    },
  },
  {
    sectionId: "cse-achievements",
    title: "Departmental Achievements",
    type: "markdown",
    order: 9,
    isVisible: true,
    content: {
      text: "### Recognition & Accreditations\n- **NBA Accreditation**: B.E. CSE program accredited by National Board of Accreditation\n- **NAAC A+ Rating**: Department contributes to college's NAAC A+ accreditation\n- **Research Excellence**: 50+ research publications in international journals (2023-24)\n- **Patent Filings**: 8 patents filed by faculty and students\n- **Student Awards**: National and state-level coding competition winners\n- **Industry Partnerships**: Collaborations with TCS, Microsoft, Google, Amazon",
    },
  },
  {
    sectionId: "cse-industry-partners",
    title: "Major Recruiters",
    type: "markdown",
    order: 10,
    isVisible: true,
    content: {
      text: "CSE students are regularly recruited by leading organizations:\n\n**IT & Software Services**: TCS, Infosys, Accenture, Wipro, Cognizant, Deloitte\n\n**Product Companies**: Microsoft, Google, Amazon, Apple, Adobe\n\n**Consulting**: McKinsey, BCG, EY, Deloitte\n\n**Finance & Banking**: HDFC, ICICI, Axis Bank, JP Morgan\n\n**Startups**: Internships and placements with promising startup ecosystems",
    },
  },
  {
    sectionId: "cse-contact",
    title: "Department Contact",
    type: "markdown",
    order: 11,
    isVisible: true,
    content: {
      text: "**Department of Computer Science & Engineering**\n\nShri Sant Gajanan Maharaj College of Engineering, Shegaon\n\n**Head of Department**: [HOD Name], [Email], [Phone]\n\n**Department Office**: Block A, 1st Floor\n\n**Office Hours**: Monday - Friday, 10:00 AM - 5:00 PM\n\n**Contact Email**: cse@ssgmce.ac.in\n\n**Department Phone**: [Phone Number]\n\nFor admissions queries, placements, or general information, feel free to contact us.",
    },
  },
];

async function syncContent() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.\n");

    const db = mongoose.connection.db;
    const collection = db.collection("pagecontents");

    let page = await collection.findOne({ pageId: CANONICAL_PAGE_ID });
    const legacyPage = await collection.findOne({ pageId: LEGACY_PAGE_ID });

    if (!page) {
      console.log("Creating canonical CSE department page.\n");
      page = {
        pageId: CANONICAL_PAGE_ID,
        pageTitle: "Computer Science & Engineering",
        pageDescription: "CSE Department - SSGMCE Shegaon",
        route: CSE_ROUTE,
        category: "departments",
        template: "department",
        isPublished: true,
        templateData: {},
        sections: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    page.pageId = CANONICAL_PAGE_ID;
    page.pageTitle = page.pageTitle || "Computer Science & Engineering";
    page.pageDescription = page.pageDescription || "CSE Department - SSGMCE Shegaon";
    page.route = CSE_ROUTE;
    page.category = "departments";
    page.template = page.template || "department";
    page.isPublished = page.isPublished !== false;
    page.sections = newSections;
    page.updatedAt = new Date();

    if (page._id) {
      await collection.updateOne({ pageId: CANONICAL_PAGE_ID }, { $set: page });
      console.log("Updated canonical CSE department page.\n");
    } else {
      await collection.insertOne(page);
      console.log("Created canonical CSE department page.\n");
    }

    if (legacyPage) {
      await collection.deleteOne({ pageId: LEGACY_PAGE_ID });
      console.log("Removed legacy duplicate CSE page.\n");
    }

    const updated = await collection.findOne({ pageId: CANONICAL_PAGE_ID });
    const duplicateStillExists = await collection.findOne({ pageId: LEGACY_PAGE_ID });

    console.log("Verification:");
    console.log(`  - Canonical pageId: ${updated.pageId}`);
    console.log(`  - Route: ${updated.route}`);
    console.log(`  - Sections count: ${updated.sections.length}`);
    console.log(`  - Legacy duplicate removed: ${duplicateStillExists ? "no" : "yes"}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error syncing CSE content:", error.message);
    process.exit(1);
  }
}

syncContent();
