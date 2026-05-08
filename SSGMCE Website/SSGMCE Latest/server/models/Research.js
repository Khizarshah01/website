const mongoose = require("mongoose");

// Publication Schema
const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    year: { type: Number, required: true },
    type: {
      type: String,
      enum: ["journal", "conference", "book", "thesis"],
      default: "journal",
    },
    publisher: String,
    journalName: String,
    volume: String,
    issue: String,
    pages: String,
    doi: String,
    department: {
      type: String,
      enum: ["CSE", "IT", "ENTC", "EE", "ME", "CE", "MBA", "Applied Sciences"],
      required: true,
    },
    abstract: String,
    keywords: [String],
    pdfUrl: String,
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Patent/IP Schema
const patentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    inventors: [{ type: String, required: true }],
    patentNumber: String,
    applicationNumber: String,
    filingDate: Date,
    grantDate: Date,
    status: {
      type: String,
      enum: ["filed", "published", "granted", "pending"],
      default: "filed",
    },
    type: {
      type: String,
      enum: ["patent", "copyright", "design", "trademark"],
      default: "patent",
    },
    department: {
      type: String,
      enum: ["CSE", "IT", "ENTC", "EE", "ME", "CE", "MBA", "Applied Sciences"],
    },
    description: String,
    category: String,
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Funded Project Schema
const fundedProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    principalInvestigator: { type: String, required: true },
    coPrincipalInvestigators: [String],
    fundingAgency: { type: String, required: true },
    sanctionNumber: String,
    amount: Number,
    startDate: Date,
    endDate: Date,
    duration: String,
    status: {
      type: String,
      enum: ["ongoing", "completed", "sanctioned"],
      default: "ongoing",
    },
    department: {
      type: String,
      enum: ["CSE", "IT", "ENTC", "EE", "ME", "CE", "MBA", "Applied Sciences"],
    },
    description: String,
    milestones: [
      {
        title: String,
        description: String,
        targetDate: Date,
        completed: { type: Boolean, default: false },
      },
    ],
    outcomes: [String],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Research Area Schema
const researchAreaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    icon: String,
    department: String,
    facultyCount: Number,
    publicationCount: Number,
    keywords: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Innovation/Startup Schema
const innovationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["startup", "project", "idea", "incubation"],
      default: "project",
    },
    team: [String],
    mentor: String,
    description: String,
    year: Number,
    status: {
      type: String,
      enum: ["ideation", "development", "launched", "incubated"],
      default: "ideation",
    },
    achievements: [String],
    funding: String,
    imageUrl: String,
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Publication = mongoose.model("Publication", publicationSchema);
const Patent = mongoose.model("Patent", patentSchema);
const FundedProject = mongoose.model("FundedProject", fundedProjectSchema);
const ResearchArea = mongoose.model("ResearchArea", researchAreaSchema);
const Innovation = mongoose.model("Innovation", innovationSchema);

module.exports = {
  Publication,
  Patent,
  FundedProject,
  ResearchArea,
  Innovation,
};
