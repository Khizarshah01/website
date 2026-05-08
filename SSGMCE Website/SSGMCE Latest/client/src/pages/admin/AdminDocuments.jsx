import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import apiClient from "../../utils/apiClient";
import MarkdownEditor from "../../components/admin/MarkdownEditor";
import {
  FaArrowLeft,
  FaEdit,
  FaFileImage,
  FaFileAlt,
  FaLink,
  FaPlus,
  FaSave,
  FaSearch,
  FaTimes,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";

const DOCUMENT_CATEGORIES = [
  "aicte",
  "naac",
  "nba",
  "nirf",
  "policies",
  "audit",
  "newsletter",
  "mandatory",
  "iso",
  "financial",
  "tattwadarshi",
  "student-forms",
  "university",
  "other",
];

const FILE_TYPES = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "zip",
  "jpg",
  "png",
  "other",
];

const DOCUMENT_CONTENT_PAGES = [
  {
    pageId: "documents-policies",
    label: "Policies & Procedures",
    route: "/documents/policies",
    title: "Policies and Procedure",
    description: "Institutional Policies",
  },
  {
    pageId: "documents-mandatory",
    label: "Mandatory Disclosure",
    route: "/documents/disclosure",
    title: "Mandatory Disclosure",
    description: "Mandatory Disclosure",
  },
  {
    pageId: "documents-naac",
    label: "NAAC",
    route: "/documents/naac",
    title: "NAAC",
    description: "NAAC Documents",
  },
  {
    pageId: "documents-nba",
    label: "NBA",
    route: "/documents/nba",
    title: "NBA",
    description: "NBA Documents",
  },
  {
    pageId: "documents-iso",
    label: "ISO",
    route: "/documents/iso",
    title: "ISO",
    description: "ISO Certification",
  },
  {
    pageId: "documents-nirf",
    label: "NIRF",
    route: "/documents/nirf",
    title: "NIRF",
    description: "NIRF Ranking Data",
  },
  {
    pageId: "documents-audit",
    label: "Sustainable Audit",
    route: "/documents/audit",
    title: "Sustainable Audit",
    description: "Sustainable Audit",
  },
  {
    pageId: "documents-aicte",
    label: "AICTE Approvals",
    route: "/documents/aicte",
    title: "AICTE Approval",
    description: "AICTE Approval Letters",
  },
  {
    pageId: "documents-financial",
    label: "Financial Statements",
    route: "/documents/financial",
    title: "Financial Statements",
    description: "Financial Statements",
  },
  {
    pageId: "documents-newsletter",
    label: "Newsletters",
    route: "/documents/newsletter",
    title: "News Letters",
    description: "Newsletters",
  },
  {
    pageId: "documents-tattwadarshi",
    label: "e-Tattwadarshi",
    route: "/documents/tattwadarshi",
    title: "e-Tattwadarshi",
    description: "e-Tattwadarshi Magazine",
  },
  {
    pageId: "documents-student-forms",
    label: "Student Forms",
    route: "/documents/student-forms",
    title: "Student Forms",
    description: "Downloadable Student Forms",
  },
];

const extractMarkdownFromSections = (sections = []) =>
  sections
    .filter((section) => section?.isVisible !== false)
    .sort((a, b) => (a?.order || 0) - (b?.order || 0))
    .map((section) => {
      if (section?.type === "markdown") {
        if (typeof section.content === "string") return section.content;
        return section.content?.markdown || "";
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n")
    .trim();

const buildDefaultMarkdown = (label, description) =>
  [
    `### ${label}`,
    "",
    description || "Update this page content from admin.",
    "",
    "| Sr. No. | Document | Link |",
    "| --- | --- | --- |",
    "| 1 | Sample Document | [View](https://example.com) |",
  ]
    .join("\n")
    .trim();

const emptyForm = () => ({
  title: "",
  category: "other",
  subcategory: "",
  description: "",
  fileUrl: "",
  fileSize: "",
  fileType: "pdf",
  year: "",
  isActive: true,
  order: 0,
});

const AdminDocuments = () => {
  const [activeTab, setActiveTab] = useState("documents");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm());
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [editingPage, setEditingPage] = useState(null);
  const [pageMarkdown, setPageMarkdown] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const [pageSaving, setPageSaving] = useState(false);
  const [pageError, setPageError] = useState("");
  const [pageSuccess, setPageSuccess] = useState("");
  const [pageData, setPageData] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/documents/admin/all", authHeader());
      if (res.data?.success) {
        setDocuments(res.data.data || []);
      } else {
        setDocuments([]);
      }
      setError("");
    } catch (err) {
      logUnexpectedError("Error loading documents:", err);
      setError(getErrorMessage(err, "Failed to load documents"));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm());
    setEditingId(null);
    setShowForm(false);
    setUploadedFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await apiClient.post("/upload/file", fd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const fileUrl = res.data?.fileUrl || res.data?.url;
      if (!fileUrl) {
        throw new Error("Upload succeeded but file URL is missing.");
      }
      const ext = (file.name.split(".").pop() || "other").toLowerCase();
      setFormData((prev) => ({
        ...prev,
        fileUrl,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileType: FILE_TYPES.includes(ext) ? ext : "other",
      }));
      setUploadedFileName(file.name);
    } catch (err) {
      setError(getErrorMessage(err, "File upload failed"));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      ...formData,
      title: formData.title.trim(),
      subcategory: formData.subcategory.trim(),
      description: formData.description.trim(),
      year: formData.year.trim(),
      order: Number(formData.order || 0),
    };

    try {
      if (editingId) {
        await apiClient.put(`/documents/admin/${editingId}`, payload, authHeader());
        setSuccess("Document updated successfully.");
      } else {
        await apiClient.post("/documents/admin/create", payload, authHeader());
        setSuccess("Document created successfully.");
      }
      await fetchDocuments();
      resetForm();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save document"));
    }
  };

  const handleEdit = (doc) => {
    setFormData({
      title: doc.title || "",
      category: doc.category || "other",
      subcategory: doc.subcategory || "",
      description: doc.description || "",
      fileUrl: doc.fileUrl || "",
      fileSize: doc.fileSize || "",
      fileType: doc.fileType || "pdf",
      year: doc.year || "",
      isActive: doc.isActive !== false,
      order: doc.order ?? 0,
    });
    setUploadedFileName(doc.fileUrl ? doc.fileUrl.split("/").pop() : "");
    setEditingId(doc._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await apiClient.delete(`/documents/admin/${id}`, authHeader());
      setSuccess("Document deleted successfully.");
      await fetchDocuments();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete document"));
    }
  };

  const handleSeed = async () => {
    if (!window.confirm("Seed sample documents into the database?")) return;
    try {
      setSeeding(true);
      setError("");
      setSuccess("");
      const res = await apiClient.post("/documents/admin/seed", {}, authHeader());
      setSuccess(res.data?.message || "Sample documents seeded successfully.");
      await fetchDocuments();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to seed documents"));
    } finally {
      setSeeding(false);
    }
  };

  const closePageEditor = () => {
    setEditingPage(null);
    setPageMarkdown("");
    setPageError("");
    setPageSuccess("");
    setPageData(null);
  };

  const ensurePageExists = async (pageConfig) => {
    try {
      const res = await apiClient.get(`/pages/${pageConfig.pageId}`);
      if (res.data?.success) return res.data.data;
    } catch (err) {
      if (err?.response?.status !== 404) {
        throw err;
      }
    }

    const createRes = await apiClient.post(
      "/pages",
      {
        pageId: pageConfig.pageId,
        pageTitle: pageConfig.title,
        pageDescription: pageConfig.description,
        route: pageConfig.route,
        category: "documents",
        template: "generic",
        isPublished: true,
        sections: [
          {
            sectionId: "main-content",
            title: "",
            type: "markdown",
            order: 0,
            isVisible: true,
            content: {
              markdown: buildDefaultMarkdown(pageConfig.label, pageConfig.description),
            },
          },
        ],
      },
      authHeader(),
    );

    if (createRes.data?.success) {
      return createRes.data.data;
    }

    throw new Error("Unable to initialize page content");
  };

  const openPageEditor = async (pageConfig) => {
    setPageLoading(true);
    setPageError("");
    setPageSuccess("");
    setEditingPage(pageConfig.pageId);

    try {
      const data = await ensurePageExists(pageConfig);
      setPageData(data);
      const existingMarkdown = extractMarkdownFromSections(data.sections || []);
      setPageMarkdown(
        existingMarkdown ||
          buildDefaultMarkdown(pageConfig.label, pageConfig.description),
      );
    } catch (err) {
      setPageError(getErrorMessage(err, "Failed to load page content"));
    } finally {
      setPageLoading(false);
    }
  };

  const savePageContent = async (nextMarkdown) => {
    if (!editingPage || !pageData) return;

    const markdownToSave = (nextMarkdown ?? pageMarkdown ?? "").trim();

    setPageSaving(true);
    setPageError("");
    setPageSuccess("");

    try {
      await apiClient.put(
        `/pages/${editingPage}`,
        {
          sections: [
            {
              sectionId: "main-content",
              title: "",
              type: "markdown",
              order: 0,
              isVisible: true,
              content: { markdown: markdownToSave },
            },
          ],
        },
        authHeader(),
      );
      setPageMarkdown(markdownToSave);
      setPageSuccess("Page content saved successfully.");
      setTimeout(() => setPageSuccess(""), 3000);
    } catch (err) {
      setPageError(getErrorMessage(err, "Failed to save page content"));
    } finally {
      setPageSaving(false);
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory =
      categoryFilter === "all" || doc.category === categoryFilter;
    if (!matchesCategory) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      doc.title?.toLowerCase().includes(q) ||
      doc.description?.toLowerCase().includes(q) ||
      doc.subcategory?.toLowerCase().includes(q) ||
      doc.year?.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Documents Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage documents and markdown content pages
            </p>
          </div>
          {activeTab === "documents" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-black disabled:opacity-60 transition-colors text-sm font-medium"
              >
                {seeding ? "Seeding..." : "Seed Sample"}
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg font-medium"
              >
                <FaPlus /> Add Document
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800/60 rounded-xl p-1 w-fit">
          <button
            onClick={() => {
              setActiveTab("documents");
              closePageEditor();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "documents"
                ? "bg-white dark:bg-[#1a1a2e] text-red-600 dark:text-red-400 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FaFileImage /> Files
          </button>
          <button
            onClick={() => {
              setActiveTab("content");
              setShowForm(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "content"
                ? "bg-white dark:bg-[#1a1a2e] text-red-600 dark:text-red-400 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FaFileAlt /> Content Pages
          </button>
        </div>

        {activeTab === "documents" ? (
          <>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/40 dark:bg-green-950/30 dark:text-green-300">
            {success}
          </div>
        ) : null}

        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, year, subcategory"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
            >
              <option value="all">All Categories</option>
              {DOCUMENT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showForm ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {editingId ? "Edit Document" : "Create Document"}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Title</label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  >
                    {DOCUMENT_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Subcategory</label>
                  <input
                    value={formData.subcategory}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, subcategory: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Year</label>
                  <input
                    value={formData.year}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, year: e.target.value }))
                    }
                    placeholder="e.g. 2025-26"
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">File Type</label>
                  <select
                    value={formData.fileType}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fileType: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  >
                    {FILE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">File Size</label>
                  <input
                    value={formData.fileSize}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fileSize: e.target.value }))
                    }
                    placeholder="e.g. 2.3 MB"
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, order: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-[1fr_auto] gap-3 items-end">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">File URL</label>
                  <input
                    required
                    value={formData.fileUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fileUrl: e.target.value }))
                    }
                    placeholder="/uploads/documents/..."
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  />
                </div>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer text-sm font-medium">
                  <FaUpload /> {uploading ? "Uploading..." : "Upload File"}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleUpload}
                  />
                </label>
              </div>

              {uploadedFileName ? (
                <p className="text-xs text-gray-500">Uploaded: {uploadedFileName}</p>
              ) : null}

              <div className="flex items-center gap-2">
                <input
                  id="isActiveDocument"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                />
                <label htmlFor="isActiveDocument" className="text-sm">
                  Active
                </label>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
                >
                  <FaSave /> {editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : null}

        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading documents...</div>
          ) : filteredDocuments.length === 0 ? (
            <div className="p-12 text-center">
              <FaFileImage className="text-5xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No documents found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">Document</th>
                    <th className="px-5 py-3 text-left font-semibold">Category</th>
                    <th className="px-5 py-3 text-left font-semibold">Year</th>
                    <th className="px-5 py-3 text-left font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{doc.title}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{doc.description || "No description"}</p>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                        >
                          <FaLink /> Open file
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{doc.year || "-"}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${doc.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}
                        >
                          {doc.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(doc)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(doc._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </>
        ) : null}

        {activeTab === "content" ? (
          <>
            {!editingPage ? (
              <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Document Content Pages
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Select a page to edit markdown content shown above the table.
                  </p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {DOCUMENT_CONTENT_PAGES.map((page) => (
                    <button
                      key={page.pageId}
                      onClick={() => openPageEditor(page)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FaFileAlt className="text-gray-400 dark:text-gray-500 group-hover:text-red-500 transition-colors" />
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            {page.label}
                          </span>
                          <span className="block text-xs text-gray-400 dark:text-gray-500 font-mono">
                            {page.pageId}
                          </span>
                        </div>
                      </div>
                      <FaEdit className="text-gray-300 dark:text-gray-600 group-hover:text-red-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={closePageEditor}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="Back to page list"
                  >
                    <FaArrowLeft />
                  </button>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {DOCUMENT_CONTENT_PAGES.find((page) => page.pageId === editingPage)
                        ?.label || editingPage}
                    </h2>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                      {editingPage}
                    </span>
                  </div>
                </div>

                {pageError ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                    {pageError}
                  </div>
                ) : null}
                {pageSuccess ? (
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/40 dark:bg-green-950/30 dark:text-green-300">
                    {pageSuccess}
                  </div>
                ) : null}

                {pageLoading ? (
                  <div className="p-12 text-center text-gray-500">Loading page content...</div>
                ) : (
                  <div className="h-[calc(100vh-280px)] min-h-[500px]">
                    <MarkdownEditor
                      value={pageMarkdown}
                      onSave={savePageContent}
                      placeholder="Click to edit document page content..."
                    />
                  </div>
                )}

                {pageSaving ? (
                  <p className="text-xs text-gray-500">Saving content...</p>
                ) : null}
              </div>
            )}
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default AdminDocuments;
