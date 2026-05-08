const mongoose = require("mongoose");

// Nested section schema for tabs (recursive reference handled separately)
const nestedSectionSchema = new mongoose.Schema(
  {
    sectionId: { type: String, required: true },
    title: { type: String, default: "" },
    type: { type: String, required: true },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: true },
);

// Tab schema for tabbed content
const tabSchema = new mongoose.Schema(
  {
    tabId: { type: String, required: true },
    label: { type: String, required: true },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    sections: [nestedSectionSchema],
  },
  { _id: true },
);

// Faculty member schema
const facultyMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, default: "" },
    qualification: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    photo: { type: String, default: "" },
    specialization: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

// Gallery image schema
const galleryImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, default: "" },
    alt: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

// Accordion item schema
const accordionItemSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isExpanded: { type: Boolean, default: false },
  },
  { _id: true },
);

// Flexible section schema for different content types
const sectionSchema = new mongoose.Schema(
  {
    sectionId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: [
        "text",
        "richtext",
        "markdown",
        "list",
        "image",
        "stats",
        "timeline",
        "cards",
        "table",
        "quote",
        // New section types
        "tabs", // Tabbed content sections
        "accordion", // Collapsible sections
        "faculty", // Faculty profile cards
        "gallery", // Image gallery
        "video", // Embedded videos (YouTube, Vimeo, upload)
        "pdf", // PDF document embed/link
        "sidebar", // Sidebar navigation config
        "hod", // HOD message with photo
        "link", // External/internal link button
        // IQAC section types
        "iqac-stats", // Horizontal compact stats with divider
        "meeting-records", // Year-wise meeting accordion with PDF links
        "year-reports", // Year-wise report accordion with criteria
        "naac-criteria", // Criterion accordion with QlM/QnM indicators
        "video-gallery", // YouTube video grid with category filter
        "document-grid", // Document link cards grid
        "process-steps", // Numbered process steps
        "info-cards", // Titled info/feature cards
      ],
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    // Flexible content object — uses Mixed to support all section types
    // (text, richtext, markdown, stats, cards, accordion, IQAC types, etc.)
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: true },
);

const pageContentSchema = new mongoose.Schema(
  {
    pageId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    pageTitle: {
      type: String,
      required: true,
      trim: true,
    },
    pageDescription: {
      type: String,
      default: "",
    },
    route: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "about",
        "academics",
        "facilities",
        "admissions",
        "research",
        "placements",
        "iqac",
        "nirf",
        "documents",
        "activities",
        "departments",
        "other",
      ],
      default: "about",
    },
    // Menu Management Fields
    parentMenu: {
      type: String,
      enum: [
        "none",
        "about",
        "academics",
        "facilities",
        "admissions",
        "research",
        "placements",
        "student-corner",
        "iqac",
      ],
      default: "none",
      comment: "Defines which dropdown menu this page appears under",
    },
    menuLabel: {
      type: String,
      default: "",
      comment: "Custom label for menu display (defaults to pageTitle if empty)",
    },
    menuOrder: {
      type: Number,
      default: 0,
      comment: "Order within the parent menu (lower numbers appear first)",
    },
    showInMenu: {
      type: Boolean,
      default: true,
      comment: "Whether this page should appear in the navigation menu",
    },
    template: {
      type: String,
      enum: ["generic", "department", "home"],
      default: "generic",
    },
    templateData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    sections: [sectionSchema],
    isPublished: {
      type: Boolean,
      default: true,
    },
    lastEditedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

// Index for faster queries
pageContentSchema.index({ pageId: 1 });
pageContentSchema.index({ category: 1 });
pageContentSchema.index({ parentMenu: 1, menuOrder: 1 });

module.exports = mongoose.model("PageContent", pageContentSchema);
