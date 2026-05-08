import React, { useEffect, useRef, useState } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaUpload,
  FaExternalLinkAlt,
  FaBuilding,
} from "react-icons/fa";

const CATEGORIES = ["MNC", "Product Based", "Service Based", "Core", "Start-up", "Other"];

const CATEGORY_COLORS = {
  MNC: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  "Product Based": "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  "Service Based": "bg-cyan-100 text-cyan-700",
  Core: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  "Start-up": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  Other: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
};

const emptyForm = () => ({
  name: "",
  logoUrl: "",
  category: "MNC",
  website: "",
  order: 0,
});

const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm());
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/placements/recruiters");
      setRecruiters(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch {
      setError("Failed to load recruiters.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (file) => {
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    try {
      setUploading(true);
      setError("");
      const res = await apiClient.post("/upload/image", fd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData((f) => ({ ...f, logoUrl: res.data.fileUrl }));
    } catch {
      setError("Logo upload failed. Ensure the file is an image under 5MB.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!formData.logoUrl) {
      setError("Please upload or enter a logo URL.");
      return;
    }
    try {
      const payload = { ...formData, order: Number(formData.order) };
      if (editingId) {
        await apiClient.put(`/placements/recruiters/${editingId}`, payload, authHeader());
        setSuccess("Recruiter updated successfully.");
      } else {
        await apiClient.post("/placements/recruiters", payload, authHeader());
        setSuccess("Recruiter added successfully.");
      }
      fetchRecruiters();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed.");
    }
  };

  const handleEdit = (r) => {
    setFormData({
      name: r.name || "",
      logoUrl: r.logoUrl || "",
      category: r.category || "MNC",
      website: r.website || "",
      order: r.order ?? 0,
    });
    setEditingId(r._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/placements/recruiters/${id}`, authHeader());
      setSuccess("Recruiter deleted.");
      setDeleteConfirm(null);
      fetchRecruiters();
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed.");
      setDeleteConfirm(null);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm());
    setEditingId(null);
    setShowForm(false);
    setUploading(false);
  };

  const filtered = filterCategory === "All"
    ? recruiters
    : recruiters.filter((r) => r.category === filterCategory);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Recruiters</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage recruiting companies and their logos</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors shadow-lg font-medium"
          >
            <FaPlus /> Add Recruiter
          </button>
        </div>

        {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">{error}</div>}
        {success && <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-sm">{success}</div>}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filterCategory === cat
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1 opacity-70">
                  ({recruiters.filter((r) => r.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        {loading ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading recruiters…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaBuilding className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {recruiters.length === 0 ? "No Recruiters Yet" : `No ${filterCategory} Recruiters`}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {recruiters.length === 0
                ? 'Click "Add Recruiter" to add the first recruiter.'
                : "Try a different category filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered
              .slice()
              .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
              .map((r) => (
                <div
                  key={r._id}
                  className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow group"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center border border-gray-100 dark:border-gray-800">
                    {r.logoUrl ? (
                      <img
                        src={r.logoUrl}
                        alt={r.name}
                        className="w-full h-full object-contain"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      <FaBuilding className="text-2xl text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">{r.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${CATEGORY_COLORS[r.category] || "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>
                      {r.category}
                    </span>
                  </div>
                  {r.website && (
                    <a
                      href={r.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt className="text-xs" /> Visit
                    </a>
                  )}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(r)}
                      className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(r._id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {editingId ? "Edit Recruiter" : "Add Recruiter"}
              </h2>
              <button onClick={resetForm} className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm">{error}</div>}

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Company Logo *</label>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 overflow-hidden shrink-0">
                    {formData.logoUrl ? (
                      <img src={formData.logoUrl} alt="Logo preview" className="w-full h-full object-contain" />
                    ) : (
                      <FaBuilding className="text-2xl text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {uploading ? (
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-cyan-500" />
                      ) : (
                        <FaUpload />
                      )}
                      {uploading ? "Uploading…" : "Upload Logo"}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleLogoUpload(e.target.files[0])}
                    />
                    <p className="text-xs text-gray-400 dark:text-gray-500">Or paste a URL below (JPG, PNG, SVG — max 5MB)</p>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.logoUrl}
                      onChange={(e) => setFormData((f) => ({ ...f, logoUrl: e.target.value }))}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Company Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Tata Consultancy Services"
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((f) => ({ ...f, category: e.target.value }))}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.order}
                    onChange={(e) => setFormData((f) => ({ ...f, order: e.target.value }))}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Website URL</label>
                <input
                  type="url"
                  placeholder="https://company.com"
                  value={formData.website}
                  onChange={(e) => setFormData((f) => ({ ...f, website: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={resetForm} className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={uploading} className="flex items-center gap-2 px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium text-sm disabled:opacity-50">
                  <FaSave /> {editingId ? "Save Changes" : "Add Recruiter"}
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
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Remove this recruiter?</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">This will permanently delete the recruiter and their logo reference. This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminRecruiters;
