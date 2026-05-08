import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import PlacementMarkdownEditor from "../../components/admin/PlacementMarkdownEditor";
import {
  FaBriefcase,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaChartLine,
  FaFileAlt,
  FaArrowLeft,
} from "react-icons/fa";

const DEPARTMENTS = ["CSE", "IT", "MECH", "ELECTRICAL", "ENTC", "MBA", "ASH"];

const PLACEMENT_PAGES = [
  { pageId: "placements-about", label: "About T&P Cell" },
  { pageId: "placements-objectives", label: "Objectives Rules & Procedures" },
  { pageId: "placements-goals", label: "T&P Goals" },
  { pageId: "placements-coordinators", label: "T&P Cell Coordinators" },
  { pageId: "placements-activities", label: "T&P Activities" },
  { pageId: "placements-brochure", label: "Placement Brochure" },
  { pageId: "placements-statistics", label: "Placement Statistics" },
  { pageId: "placements-recruiters", label: "Major Recruiters" },
  { pageId: "placements-career", label: "Career Guidance Cell" },
  { pageId: "placements-internship", label: "Internship" },
  { pageId: "placements-alumni", label: "Alumni Registration" },
];

const emptyForm = () => ({
  academicYear: "",
  placementPercentage: "",
  highestPackage: "",
  averagePackage: "",
  totalOffers: "",
  companiesVisited: "",
  departmentWise: DEPARTMENTS.map((d) => ({ department: d, placedCount: "" })),
});

const AdminPlacements = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm());
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Content editor state
  const [editingPage, setEditingPage] = useState(null);
  const [pageMarkdown, setPageMarkdown] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const [pageSaving, setPageSaving] = useState(false);
  const [pageError, setPageError] = useState("");
  const [pageSuccess, setPageSuccess] = useState("");
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/placements/stats");
      setStats(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch {
      setError("Failed to load placement statistics.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const payload = {
        academicYear: formData.academicYear,
        placementPercentage: Number(formData.placementPercentage),
        highestPackage: Number(formData.highestPackage),
        averagePackage: Number(formData.averagePackage),
        totalOffers: Number(formData.totalOffers),
        companiesVisited: Number(formData.companiesVisited),
        departmentWise: formData.departmentWise
          .filter((d) => d.placedCount !== "" && Number(d.placedCount) > 0)
          .map((d) => ({ department: d.department, placedCount: Number(d.placedCount) })),
      };
      if (editingId) {
        await apiClient.put(`/placements/stats/${editingId}`, payload, authHeader());
        setSuccess("Statistics updated successfully.");
      } else {
        await apiClient.post("/placements/stats", payload, authHeader());
        setSuccess("Statistics added successfully.");
      }
      fetchStats();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed.");
    }
  };

  const handleEdit = (stat) => {
    setFormData({
      academicYear: stat.academicYear || "",
      placementPercentage: stat.placementPercentage ?? "",
      highestPackage: stat.highestPackage ?? "",
      averagePackage: stat.averagePackage ?? "",
      totalOffers: stat.totalOffers ?? "",
      companiesVisited: stat.companiesVisited ?? "",
      departmentWise: DEPARTMENTS.map((d) => {
        const existing = stat.departmentWise?.find((dw) => dw.department === d);
        return { department: d, placedCount: existing?.placedCount ?? "" };
      }),
    });
    setEditingId(stat._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/placements/stats/${id}`, authHeader());
      setSuccess("Record deleted.");
      setDeleteConfirm(null);
      fetchStats();
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed.");
      setDeleteConfirm(null);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm());
    setEditingId(null);
    setShowForm(false);
  };

  const updateDeptWise = (index, value) => {
    const updated = [...formData.departmentWise];
    updated[index] = { ...updated[index], placedCount: value };
    setFormData((f) => ({ ...f, departmentWise: updated }));
  };

  const field = (key, label, type = "text", props = {}) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      <input
        type={type}
        value={formData[key]}
        onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
        required
        {...props}
      />
    </div>
  );

  // ── Content page editing ─────────────────────────────────────

  const extractMarkdownFromSections = (sections) => {
    if (!sections || !sections.length) return "";
    return sections
      .filter((s) => s.isVisible !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((s) => {
        if (s.type === "markdown" || s.type === "richtext" || s.type === "text") {
          return typeof s.content === "string"
            ? s.content
            : s.content?.markdown || s.content?.text || s.content?.html || "";
        }
        return "";
      })
      .filter(Boolean)
      .join("\n\n");
  };

  const openPageEditor = async (pageId) => {
    setPageError("");
    setPageSuccess("");
    setPageLoading(true);
    setEditingPage(pageId);
    try {
      const res = await apiClient.get(`/pages/${pageId}`);
      if (res.data.success) {
        const data = res.data.data;
        setPageData(data);
        const md = extractMarkdownFromSections(data.sections);
        setPageMarkdown(md);
      } else {
        setPageError("Page not found.");
      }
    } catch {
      setPageError("Failed to load page content.");
    } finally {
      setPageLoading(false);
    }
  };

  const savePageContent = async () => {
    if (!editingPage || !pageData) return;
    setPageSaving(true);
    setPageError("");
    setPageSuccess("");
    try {
      // Build a single markdown section with the full content
      const updatedSections = [
        {
          sectionId: "main-content",
          title: "",
          type: "markdown",
          order: 0,
          isVisible: true,
          content: { markdown: pageMarkdown },
        },
      ];

      await apiClient.put(
        `/pages/${editingPage}`,
        { sections: updatedSections },
        authHeader()
      );
      setPageSuccess("Content saved successfully!");
      setTimeout(() => setPageSuccess(""), 3000);
    } catch (err) {
      setPageError(err.response?.data?.message || "Failed to save content.");
    } finally {
      setPageSaving(false);
    }
  };

  const closePageEditor = () => {
    setEditingPage(null);
    setPageData(null);
    setPageMarkdown("");
    setPageError("");
    setPageSuccess("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Placements</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage statistics &amp; page content</p>
          </div>
          {activeTab === "stats" && (
            <button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg font-medium"
            >
              <FaPlus /> Add Year
            </button>
          )}
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800/60 rounded-xl p-1 w-fit">
          <button
            onClick={() => { setActiveTab("stats"); closePageEditor(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "stats"
                ? "bg-white dark:bg-[#1a1a2e] text-orange-600 dark:text-orange-400 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FaChartLine /> Statistics
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "content"
                ? "bg-white dark:bg-[#1a1a2e] text-orange-600 dark:text-orange-400 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FaFileAlt /> Content Pages
          </button>
        </div>

        {/* ── Statistics Tab ────────────────────────────────── */}
        {activeTab === "stats" && (
          <>
            {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">{error}</div>}
            {success && <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-sm">{success}</div>}

            <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Loading statistics…</p>
                </div>
              ) : stats.length === 0 ? (
                <div className="p-12 text-center">
                  <FaChartLine className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No Statistics Yet</h3>
                  <p className="text-gray-500 dark:text-gray-400">Click &quot;Add Year&quot; to add placement statistics.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        {["Academic Year", "Placement %", "Highest (LPA)", "Average (LPA)", "Total Offers", "Companies"].map((h) => (
                          <th key={h} className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{h}</th>
                        ))}
                        <th className="px-5 py-4 text-right font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {stats
                        .slice()
                        .sort((a, b) => b.academicYear.localeCompare(a.academicYear))
                        .map((stat) => (
                          <tr key={stat._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <td className="px-5 py-4 font-bold text-orange-600 dark:text-orange-400">{stat.academicYear}</td>
                            <td className="px-5 py-4">{stat.placementPercentage}%</td>
                            <td className="px-5 py-4 text-green-600 dark:text-green-400 font-semibold">{stat.highestPackage} LPA</td>
                            <td className="px-5 py-4">{stat.averagePackage} LPA</td>
                            <td className="px-5 py-4">{stat.totalOffers}</td>
                            <td className="px-5 py-4">{stat.companiesVisited}</td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleEdit(stat)}
                                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(stat._id)}
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
              )}
            </div>
          </>
        )}

        {/* ── Content Pages Tab ────────────────────────────── */}
        {activeTab === "content" && (
          <>
            {!editingPage ? (
              /* Page list */
              <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Placement Pages</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Select a page to edit its Markdown content</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {PLACEMENT_PAGES.map((pg) => (
                    <button
                      key={pg.pageId}
                      onClick={() => openPageEditor(pg.pageId)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FaFileAlt className="text-gray-400 dark:text-gray-500 group-hover:text-orange-500 transition-colors" />
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {pg.label}
                          </span>
                          <span className="block text-xs text-gray-400 dark:text-gray-500 font-mono">{pg.pageId}</span>
                        </div>
                      </div>
                      <FaEdit className="text-gray-300 dark:text-gray-600 group-hover:text-orange-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Markdown editor */
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
                      {PLACEMENT_PAGES.find((p) => p.pageId === editingPage)?.label || editingPage}
                    </h2>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{editingPage}</span>
                  </div>
                </div>

                {pageError && (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                    {pageError}
                  </div>
                )}
                {pageSuccess && (
                  <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-sm">
                    {pageSuccess}
                  </div>
                )}

                {pageLoading ? (
                  <div className="p-12 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Loading page content…</p>
                  </div>
                ) : (
                  <div className="h-[calc(100vh-280px)] min-h-[500px]">
                    <PlacementMarkdownEditor
                      value={pageMarkdown}
                      onChange={setPageMarkdown}
                      onSave={savePageContent}
                      saving={pageSaving}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {editingId ? "Edit Statistics" : "Add Placement Statistics"}
              </h2>
              <button onClick={resetForm} className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm">{error}</div>}

              {field("academicYear", "Academic Year *", "text", { placeholder: "e.g. 2024-25" })}

              <div className="grid grid-cols-2 gap-4">
                {field("placementPercentage", "Placement % *", "number", { min: 0, max: 100, step: "0.01", placeholder: "85.5" })}
                {field("totalOffers", "Total Offers *", "number", { min: 0, placeholder: "215" })}
                {field("highestPackage", "Highest Package (LPA) *", "number", { min: 0, step: "0.01", placeholder: "12.5" })}
                {field("averagePackage", "Average Package (LPA) *", "number", { min: 0, step: "0.01", placeholder: "4.2" })}
                <div className="col-span-2">
                  {field("companiesVisited", "Companies Visited *", "number", { min: 0, placeholder: "45" })}
                </div>
              </div>

              {/* Department-wise breakdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Department-wise Placed Count <span className="text-gray-400 dark:text-gray-500 font-normal">(optional)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.departmentWise.map((dw, idx) => (
                    <div key={dw.department} className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 w-20 shrink-0">{dw.department}</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={dw.placedCount}
                        onChange={(e) => updateDeptWise(idx, e.target.value)}
                        className="flex-1 min-w-0 border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={resetForm} className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">
                  Cancel
                </button>
                <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm">
                  <FaSave /> {editingId ? "Save Changes" : "Add Statistics"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Delete this record?</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">This will permanently remove this year&apos;s placement data and cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPlacements;
