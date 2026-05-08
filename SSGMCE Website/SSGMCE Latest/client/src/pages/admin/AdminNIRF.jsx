import React, { useEffect, useRef, useState } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  FaGraduationCap,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaFilePdf,
  FaUpload,
  FaExternalLinkAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const CATEGORIES = ["engineering", "overall", "management", "innovation"];
const CATEGORY_LABEL = {
  engineering: "Engineering",
  overall: "Overall",
  management: "Management",
  innovation: "Innovation",
};
const CATEGORY_COLORS = {
  engineering:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  overall:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  management:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  innovation:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
};

const emptyForm = () => ({
  year: "",
  category: "engineering",
  rank: "",
  overallScore: "",
  reportUrl: "",
  isActive: true,
});

const AdminNIRF = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm());
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/nirf/admin/all", authHeader());
      setEntries(res.data.data || []);
    } catch {
      setError("Failed to load NIRF entries.");
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("pdf", file);
      const res = await apiClient.post("/upload/nirf-pdf", fd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData((f) => ({ ...f, reportUrl: res.data.fileUrl }));
      setUploadedFileName(file.name);
    } catch (err) {
      setError(err.response?.data?.message || "PDF upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!formData.year.trim()) {
      setError("Year is required.");
      return;
    }
    try {
      const payload = {
        year: formData.year.trim(),
        category: formData.category,
        rank: formData.rank !== "" ? Number(formData.rank) : null,
        overallScore:
          formData.overallScore !== "" ? Number(formData.overallScore) : 0,
        reportUrl: formData.reportUrl,
        isActive: formData.isActive,
      };
      if (editingId) {
        await apiClient.put(`/nirf/admin/${editingId}`, payload, authHeader());
        setSuccess("Entry updated successfully.");
      } else {
        await apiClient.post("/nirf/admin/create", payload, authHeader());
        setSuccess("Entry added successfully.");
      }
      fetchEntries();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed.");
    }
  };

  const handleEdit = (entry) => {
    setFormData({
      year: entry.year || "",
      category: entry.category || "engineering",
      rank: entry.rank ?? "",
      overallScore: entry.overallScore ?? "",
      reportUrl: entry.reportUrl || "",
      isActive: entry.isActive !== false,
    });
    setUploadedFileName(
      entry.reportUrl ? entry.reportUrl.split("/").pop() : "",
    );
    setEditingId(entry._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/nirf/admin/${id}`, authHeader());
      setSuccess("Entry deleted.");
      setDeleteConfirm(null);
      fetchEntries();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed.");
      setDeleteConfirm(null);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm());
    setEditingId(null);
    setShowForm(false);
    setUploadedFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Group entries by year for display
  const groupedByYear = entries.reduce((acc, entry) => {
    if (!acc[entry.year]) acc[entry.year] = [];
    acc[entry.year].push(entry);
    return acc;
  }, {});
  const sortedYears = Object.keys(groupedByYear).sort((a, b) =>
    b.localeCompare(a),
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              NIRF Documents
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage NIRF ranking PDF documents by year and category
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-lg font-medium"
          >
            <FaPlus /> Add Entry
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Entries grouped by year */}
        {loading ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading entries…</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaGraduationCap className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              No NIRF Entries
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Click "Add Entry" to upload your first NIRF document.
            </p>
          </div>
        ) : (
          sortedYears.map((year) => (
            <div
              key={year}
              className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <FaGraduationCap className="text-rose-500" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  NIRF {year}
                </h2>
                <span className="text-xs text-gray-400">
                  ({groupedByYear[year].length}{" "}
                  {groupedByYear[year].length === 1 ? "entry" : "entries"})
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-100 dark:border-gray-800">
                    <tr>
                      {[
                        "Category",
                        "Rank",
                        "Score",
                        "PDF Document",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {groupedByYear[year]
                      .slice()
                      .sort(
                        (a, b) =>
                          CATEGORIES.indexOf(a.category) -
                          CATEGORIES.indexOf(b.category),
                      )
                      .map((entry) => (
                        <tr
                          key={entry._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                        >
                          <td className="px-5 py-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[entry.category] || "bg-gray-100 text-gray-600"}`}
                            >
                              {CATEGORY_LABEL[entry.category] || entry.category}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-semibold text-gray-700 dark:text-gray-300">
                            {entry.rank ?? (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                            {entry.overallScore ? (
                              entry.overallScore.toFixed(2)
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            {entry.reportUrl ? (
                              <a
                                href={entry.reportUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:underline font-medium"
                              >
                                <FaFilePdf />
                                View PDF
                                <FaExternalLinkAlt className="text-xs" />
                              </a>
                            ) : (
                              <span className="text-gray-400 italic text-xs">
                                No PDF
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            {entry.isActive ? (
                              <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-semibold">
                                <FaToggleOn className="text-base" /> Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-gray-400 text-xs font-semibold">
                                <FaToggleOff className="text-base" /> Inactive
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleEdit(entry)}
                                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(entry._id)}
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
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {editingId ? "Edit NIRF Entry" : "Add NIRF Entry"}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, year: e.target.value }))
                  }
                  placeholder="e.g. 2025-26"
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, category: e.target.value }))
                  }
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {CATEGORY_LABEL[c]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rank & Score */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Rank{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.rank}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, rank: e.target.value }))
                    }
                    placeholder="e.g. 150"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Overall Score{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.overallScore}
                    onChange={(e) =>
                      setFormData((f) => ({
                        ...f,
                        overallScore: e.target.value,
                      }))
                    }
                    placeholder="e.g. 42.58"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  NIRF PDF Document
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-rose-400 transition-colors text-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                  />
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2 text-rose-500">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-rose-500" />
                      <span className="text-sm">Uploading…</span>
                    </div>
                  ) : uploadedFileName ? (
                    <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                      <FaFilePdf className="text-lg" />
                      <span className="text-sm font-medium truncate max-w-xs">
                        {uploadedFileName}
                      </span>
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      <FaUpload className="text-2xl mx-auto mb-1" />
                      <p className="text-sm">Click to upload PDF</p>
                      <p className="text-xs mt-0.5">Max 20MB</p>
                    </div>
                  )}
                </div>
                {formData.reportUrl && !uploading && (
                  <a
                    href={formData.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline mt-1.5"
                  >
                    <FaExternalLinkAlt /> View current PDF
                  </a>
                )}
              </div>

              {/* Active toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((f) => ({ ...f, isActive: !f.isActive }))
                  }
                  className={`text-2xl transition-colors ${formData.isActive ? "text-green-500" : "text-gray-400"}`}
                >
                  {formData.isActive ? <FaToggleOn /> : <FaToggleOff />}
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {formData.isActive
                    ? "Active (visible on public page)"
                    : "Inactive (hidden from public page)"}
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex items-center gap-2 px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-60 transition-colors font-medium text-sm"
                >
                  <FaSave /> {editingId ? "Save Changes" : "Add Entry"}
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
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
              Delete this entry?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              This will permanently remove this NIRF entry. The uploaded PDF
              file will remain on the server.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminNIRF;
