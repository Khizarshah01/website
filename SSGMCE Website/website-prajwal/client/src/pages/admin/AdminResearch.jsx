import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAuth } from "../../hooks/useAuth";
import {
  FaFlask,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaSearch,
  FaBook,
  FaCertificate,
  FaProjectDiagram,
  FaSitemap,
} from "react-icons/fa";

/* ── Research-model dept enum ──────────────────────────────────────── */
const RESEARCH_DEPARTMENTS = [
  "CSE",
  "IT",
  "ENTC",
  "EE",
  "ME",
  "CE",
  "MBA",
  "Applied Sciences",
];

/* User-model → Research-model mapping (for coordinators) */
const USER_TO_RESEARCH_DEPT = {
  CSE: "CSE",
  IT: "IT",
  ENTC: "ENTC",
  ELECTRICAL: "EE",
  MECH: "ME",
  MBA: "MBA",
  ASH: "Applied Sciences",
};

const TABS = [
  { id: "publications", label: "Publications", icon: FaBook },
  { id: "patents", label: "Patents & IP", icon: FaCertificate },
  { id: "projects", label: "Funded Projects", icon: FaProjectDiagram },
  { id: "areas", label: "Research Areas", icon: FaSitemap },
];

/* ── Empty form shapes ─────────────────────────────────────────────── */
const EMPTY_PUBLICATION = {
  title: "",
  authors: "",
  year: new Date().getFullYear(),
  type: "journal",
  publisher: "",
  journalName: "",
  volume: "",
  issue: "",
  pages: "",
  doi: "",
  department: "CSE",
  abstract: "",
  keywords: "",
  pdfUrl: "",
  isPublished: true,
};

const EMPTY_PATENT = {
  title: "",
  inventors: "",
  patentNumber: "",
  applicationNumber: "",
  filingDate: "",
  grantDate: "",
  status: "filed",
  type: "patent",
  department: "CSE",
  description: "",
  category: "",
  isPublished: true,
};

const EMPTY_PROJECT = {
  title: "",
  principalInvestigator: "",
  coPrincipalInvestigators: "",
  fundingAgency: "",
  sanctionNumber: "",
  amount: "",
  startDate: "",
  endDate: "",
  duration: "",
  status: "ongoing",
  department: "CSE",
  description: "",
  isPublished: true,
};

const EMPTY_AREA = {
  name: "",
  description: "",
  icon: "",
  department: "CSE",
  keywords: "",
  isActive: true,
};

/* ═══════════════════════════════════════════════════════════════════ */
const AdminResearch = () => {
  const { isSuperAdmin, isCoordinator, userDepartment } = useAuth();
  const [activeTab, setActiveTab] = useState("publications");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState(
    isCoordinator
      ? USER_TO_RESEARCH_DEPT[userDepartment] || userDepartment
      : ""
  );

  /* The department this coordinator maps to in Research models */
  const coordResearchDept =
    USER_TO_RESEARCH_DEPT[userDepartment] || userDepartment;

  const authHeader = useCallback(
    () => ({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    }),
    []
  );

  /* ── Data fetching ─────────────────────────────────────────────── */
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const params = {};
      if (isCoordinator) {
        params.department = coordResearchDept;
      } else if (filterDept) {
        params.department = filterDept;
      }

      let url = "/api/research/";
      if (activeTab === "publications") url += "publications";
      else if (activeTab === "patents") url += "patents";
      else if (activeTab === "projects") url += "projects";
      else url += "areas";

      const res = await apiClient.get(url, { params, ...authHeader() });

      if (activeTab === "publications") setItems(res.data.publications || []);
      else if (activeTab === "patents") setItems(res.data.patents || []);
      else if (activeTab === "projects") setItems(res.data.projects || []);
      else setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [activeTab, filterDept, isCoordinator, coordResearchDept, authHeader]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  /* ── Form helpers ──────────────────────────────────────────────── */
  const getEmptyForm = () => {
    const dept = isCoordinator ? coordResearchDept : "CSE";
    if (activeTab === "publications")
      return { ...EMPTY_PUBLICATION, department: dept };
    if (activeTab === "patents") return { ...EMPTY_PATENT, department: dept };
    if (activeTab === "projects") return { ...EMPTY_PROJECT, department: dept };
    return { ...EMPTY_AREA, department: dept };
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(getEmptyForm());
    setError("");
    setSuccess("");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForm();
    setSearchTerm("");
  };

  const setField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  /* ── CRUD ───────────────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = { ...formData };

      // Comma-separated → arrays
      if (activeTab === "publications") {
        if (typeof payload.authors === "string")
          payload.authors = payload.authors
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        if (typeof payload.keywords === "string")
          payload.keywords = payload.keywords
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
      }
      if (activeTab === "patents" && typeof payload.inventors === "string")
        payload.inventors = payload.inventors
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      if (
        activeTab === "projects" &&
        typeof payload.coPrincipalInvestigators === "string"
      )
        payload.coPrincipalInvestigators = payload.coPrincipalInvestigators
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      if (activeTab === "areas" && typeof payload.keywords === "string")
        payload.keywords = payload.keywords
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

      /* Coordinator: force department */
      if (isCoordinator) payload.department = coordResearchDept;

      let url = "/api/research/";
      if (activeTab === "publications") url += "publications";
      else if (activeTab === "patents") url += "patents";
      else if (activeTab === "projects") url += "projects";
      else url += "areas";

      if (editingId) {
        await apiClient.put(`${url}/${editingId}`, payload, authHeader());
        setSuccess("Updated successfully");
      } else {
        await apiClient.post(url, payload, authHeader());
        setSuccess("Created successfully");
      }
      fetchItems();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (item) => {
    const data = { ...item };
    // Arrays → comma-separated for editing
    if (activeTab === "publications") {
      data.authors = Array.isArray(data.authors)
        ? data.authors.join(", ")
        : data.authors || "";
      data.keywords = Array.isArray(data.keywords)
        ? data.keywords.join(", ")
        : data.keywords || "";
    }
    if (activeTab === "patents")
      data.inventors = Array.isArray(data.inventors)
        ? data.inventors.join(", ")
        : data.inventors || "";
    if (activeTab === "projects")
      data.coPrincipalInvestigators = Array.isArray(
        data.coPrincipalInvestigators
      )
        ? data.coPrincipalInvestigators.join(", ")
        : data.coPrincipalInvestigators || "";
    if (activeTab === "areas")
      data.keywords = Array.isArray(data.keywords)
        ? data.keywords.join(", ")
        : data.keywords || "";

    // Dates → YYYY-MM-DD
    ["filingDate", "grantDate", "startDate", "endDate"].forEach((f) => {
      if (data[f]) data[f] = data[f].slice(0, 10);
    });

    setFormData(data);
    setEditingId(item._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    setError("");
    try {
      let url = "/api/research/";
      if (activeTab === "publications") url += "publications";
      else if (activeTab === "patents") url += "patents";
      else if (activeTab === "projects") url += "projects";
      else url += "areas";
      await apiClient.delete(`${url}/${id}`, authHeader());
      setSuccess("Deleted successfully");
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  /* ── Search filter ─────────────────────────────────────────────── */
  const filtered = items.filter((item) => {
    const term = searchTerm.toLowerCase();
    if (!term) return true;
    const text =
      (item.title || item.name || "") +
      " " +
      (item.department || "") +
      " " +
      (Array.isArray(item.authors) ? item.authors.join(" ") : "") +
      " " +
      (Array.isArray(item.inventors) ? item.inventors.join(" ") : "") +
      " " +
      (item.principalInvestigator || "");
    return text.toLowerCase().includes(term);
  });

  /* ═══════════════════════════════════════════════════════════════ */
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Research Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {isCoordinator
                ? `Manage research data for the ${userDepartment} department`
                : "Manage research publications, patents, projects & areas"}
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setFormData(getEmptyForm());
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg font-medium"
          >
            <FaPlus /> Add{" "}
            {activeTab === "publications"
              ? "Publication"
              : activeTab === "patents"
              ? "Patent"
              : activeTab === "projects"
              ? "Project"
              : "Area"}
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* ── Tabs ──────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-[#1a1a2e] text-[#003366] shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Icon className="text-sm" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Form ──────────────────────────────────────────────── */}
        {showForm && (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {editingId ? "Edit" : "Add"}{" "}
                {activeTab === "publications"
                  ? "Publication"
                  : activeTab === "patents"
                  ? "Patent / IP"
                  : activeTab === "projects"
                  ? "Funded Project"
                  : "Research Area"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* ── Publication fields ── */}
                {activeTab === "publications" && (
                  <>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title || ""}
                        onChange={(e) => setField("title", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    {renderDeptField()}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Authors * (comma separated)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.authors || ""}
                        onChange={(e) => setField("authors", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Dr. A. Patil, Prof. B. Sharma"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Year *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.year || ""}
                        onChange={(e) =>
                          setField("year", parseInt(e.target.value))
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Type
                      </label>
                      <select
                        value={formData.type || "journal"}
                        onChange={(e) => setField("type", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="journal">Journal</option>
                        <option value="conference">Conference</option>
                        <option value="book">Book</option>
                        <option value="thesis">Thesis</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Publisher
                      </label>
                      <input
                        type="text"
                        value={formData.publisher || ""}
                        onChange={(e) => setField("publisher", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Journal / Conference
                      </label>
                      <input
                        type="text"
                        value={formData.journalName || ""}
                        onChange={(e) =>
                          setField("journalName", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        DOI
                      </label>
                      <input
                        type="text"
                        value={formData.doi || ""}
                        onChange={(e) => setField("doi", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Volume
                      </label>
                      <input
                        type="text"
                        value={formData.volume || ""}
                        onChange={(e) => setField("volume", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pages
                      </label>
                      <input
                        type="text"
                        value={formData.pages || ""}
                        onChange={(e) => setField("pages", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Keywords (comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.keywords || ""}
                        onChange={(e) => setField("keywords", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Machine Learning, AI, IoT"
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Abstract
                      </label>
                      <textarea
                        rows={3}
                        value={formData.abstract || ""}
                        onChange={(e) => setField("abstract", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </>
                )}

                {/* ── Patent fields ── */}
                {activeTab === "patents" && (
                  <>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title || ""}
                        onChange={(e) => setField("title", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    {renderDeptField()}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Inventors * (comma separated)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.inventors || ""}
                        onChange={(e) => setField("inventors", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        IP Type
                      </label>
                      <select
                        value={formData.type || "patent"}
                        onChange={(e) => setField("type", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="patent">Patent</option>
                        <option value="copyright">Copyright</option>
                        <option value="design">Design</option>
                        <option value="trademark">Trademark</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        value={formData.status || "filed"}
                        onChange={(e) => setField("status", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="filed">Filed</option>
                        <option value="published">Published</option>
                        <option value="granted">Granted</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Application No.
                      </label>
                      <input
                        type="text"
                        value={formData.applicationNumber || ""}
                        onChange={(e) =>
                          setField("applicationNumber", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Patent No.
                      </label>
                      <input
                        type="text"
                        value={formData.patentNumber || ""}
                        onChange={(e) =>
                          setField("patentNumber", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Filing Date
                      </label>
                      <input
                        type="date"
                        value={formData.filingDate || ""}
                        onChange={(e) =>
                          setField("filingDate", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Grant Date
                      </label>
                      <input
                        type="date"
                        value={formData.grantDate || ""}
                        onChange={(e) =>
                          setField("grantDate", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={formData.category || ""}
                        onChange={(e) => setField("category", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description || ""}
                        onChange={(e) =>
                          setField("description", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </>
                )}

                {/* ── Project fields ── */}
                {activeTab === "projects" && (
                  <>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title || ""}
                        onChange={(e) => setField("title", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    {renderDeptField()}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Principal Investigator *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.principalInvestigator || ""}
                        onChange={(e) =>
                          setField("principalInvestigator", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Co-PIs (comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.coPrincipalInvestigators || ""}
                        onChange={(e) =>
                          setField("coPrincipalInvestigators", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Funding Agency *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fundingAgency || ""}
                        onChange={(e) =>
                          setField("fundingAgency", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="AICTE, DST, UGC..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.amount || ""}
                        onChange={(e) => setField("amount", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        value={formData.status || "ongoing"}
                        onChange={(e) => setField("status", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="sanctioned">Sanctioned</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate || ""}
                        onChange={(e) =>
                          setField("startDate", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate || ""}
                        onChange={(e) => setField("endDate", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={formData.duration || ""}
                        onChange={(e) => setField("duration", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="3 Years"
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description || ""}
                        onChange={(e) =>
                          setField("description", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </>
                )}

                {/* ── Research Area fields ── */}
                {activeTab === "areas" && (
                  <>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name || ""}
                        onChange={(e) => setField("name", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    {renderDeptField()}
                    <div className="lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.description || ""}
                        onChange={(e) =>
                          setField("description", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Keywords (comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.keywords || ""}
                        onChange={(e) => setField("keywords", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Icon (React Icon name)
                      </label>
                      <input
                        type="text"
                        value={formData.icon || ""}
                        onChange={(e) => setField("icon", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="FaBrain"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Published / Active toggle */}
              {editingId && (
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={
                      activeTab === "areas"
                        ? formData.isActive !== false
                        : formData.isPublished !== false
                    }
                    onChange={(e) =>
                      setField(
                        activeTab === "areas" ? "isActive" : "isPublished",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  {activeTab === "areas" ? "Active" : "Published"}
                </label>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <FaSave /> {editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Filters ───────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          {isSuperAdmin && (
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none min-w-[180px]"
            >
              <option value="">All Departments</option>
              {RESEARCH_DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* ── Table ──────────────────────────────────────────────── */}
        {loading ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaFlask className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              No Data Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm
                ? "No results match your search."
                : 'Click "Add" to create a new entry.'}
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {activeTab === "areas" ? "Name" : "Title"}
                    </th>
                    {activeTab === "publications" && (
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Authors
                      </th>
                    )}
                    {activeTab === "patents" && (
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Inventors
                      </th>
                    )}
                    {activeTab === "projects" && (
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        PI
                      </th>
                    )}
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Department
                    </th>
                    {activeTab === "publications" && (
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Year
                      </th>
                    )}
                    {(activeTab === "patents" ||
                      activeTab === "projects") && (
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    )}
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filtered.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 max-w-xs">
                        <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                          {item.title || item.name}
                        </p>
                        {activeTab === "publications" && item.journalName && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                            {item.journalName}
                          </p>
                        )}
                        {activeTab === "projects" && item.fundingAgency && (
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {item.fundingAgency}
                            {item.amount
                              ? ` — ₹${(item.amount / 100000).toFixed(1)}L`
                              : ""}
                          </p>
                        )}
                      </td>
                      {activeTab === "publications" && (
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm max-w-[200px] truncate">
                          {Array.isArray(item.authors)
                            ? item.authors.join(", ")
                            : ""}
                        </td>
                      )}
                      {activeTab === "patents" && (
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm max-w-[200px] truncate">
                          {Array.isArray(item.inventors)
                            ? item.inventors.join(", ")
                            : ""}
                        </td>
                      )}
                      {activeTab === "projects" && (
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                          {item.principalInvestigator}
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          {item.department || "—"}
                        </span>
                      </td>
                      {activeTab === "publications" && (
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                          {item.year}
                        </td>
                      )}
                      {(activeTab === "patents" ||
                        activeTab === "projects") && (
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              item.status === "granted" ||
                              item.status === "completed"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                : item.status === "ongoing"
                                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      )}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
              Showing {filtered.length}{" "}
              {activeTab === "areas" ? "area" : "item"}
              {filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );

  /** Shared dept field — locked for coordinators, dropdown for SuperAdmin */
  function renderDeptField() {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Department
        </label>
        {isCoordinator ? (
          <input
            type="text"
            readOnly
            value={coordResearchDept}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-not-allowed"
          />
        ) : (
          <select
            value={formData.department || ""}
            onChange={(e) => setField("department", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {RESEARCH_DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }
};

export default AdminResearch;
