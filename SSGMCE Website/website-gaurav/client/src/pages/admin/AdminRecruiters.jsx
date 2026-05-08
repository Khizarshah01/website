import React, { useEffect, useRef, useState } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import { resolveUploadedAssetUrl } from "../../utils/uploadUrls";
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
  showOnHome: true,
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
      const uploadedUrl = res.data?.fileUrl || res.data?.url || "";
      if (!uploadedUrl) {
        throw new Error("Upload response did not include a file URL.");
      }
      setFormData((f) => ({ ...f, logoUrl: uploadedUrl }));
    } catch {
      setError("Logo upload failed. Ensure the file is an image under 20MB.");
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
      const payload = {
        ...formData,
        order: Number(formData.order),
      };

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
      setError(err.response?.data?.error || err.response?.data?.message || "Operation failed.");
    }
  };

  const handleEdit = (recruiter) => {
    setFormData({
      name: recruiter.name || "",
      logoUrl: recruiter.logoUrl || "",
      category: recruiter.category || "MNC",
      website: recruiter.website || "",
      order: recruiter.order ?? 0,
      showOnHome: recruiter.showOnHome !== false,
    });
    setEditingId(recruiter._id);
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
      setError(err.response?.data?.error || err.response?.data?.message || "Delete failed.");
      setDeleteConfirm(null);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm());
    setEditingId(null);
    setShowForm(false);
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const filtered = filterCategory === "All"
    ? recruiters
    : recruiters.filter((recruiter) => recruiter.category === filterCategory);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Recruiters</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Manage recruiting companies, their logos, and homepage slider visibility.
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 font-medium text-white shadow-lg transition-colors hover:bg-cyan-700"
          >
            <FaPlus /> Add Recruiter
          </button>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300">
            {success}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                filterCategory === category
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {category}
              {category !== "All" && (
                <span className="ml-1 opacity-70">
                  ({recruiters.filter((recruiter) => recruiter.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-[#1a1a2e]">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-cyan-500" />
            <p className="text-gray-500 dark:text-gray-400">Loading recruiters...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-[#1a1a2e]">
            <FaBuilding className="mx-auto mb-4 text-6xl text-gray-300 dark:text-gray-600" />
            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
              {recruiters.length === 0 ? "No Recruiters Yet" : `No ${filterCategory} Recruiters`}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {recruiters.length === 0
                ? 'Click "Add Recruiter" to add the first recruiter.'
                : "Try a different category filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filtered
              .slice()
              .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
              .map((recruiter) => (
                <div
                  key={recruiter._id}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-[#1a1a2e]"
                >
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                    {recruiter.logoUrl ? (
                      <img
                        src={resolveUploadedAssetUrl(recruiter.logoUrl)}
                        alt={recruiter.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <FaBuilding className="text-2xl text-gray-300 dark:text-gray-600" />
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-semibold leading-tight text-gray-800 dark:text-gray-200">
                      {recruiter.name}
                    </p>
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[recruiter.category] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                      {recruiter.category}
                    </span>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        recruiter.showOnHome !== false
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {recruiter.showOnHome !== false ? "Homepage" : "Placements Only"}
                    </span>
                  </div>

                  {recruiter.website && (
                    <a
                      href={recruiter.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-cyan-600 hover:underline dark:text-cyan-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt className="text-xs" /> Visit
                    </a>
                  )}

                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => handleEdit(recruiter)}
                      className="rounded-lg p-1.5 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      title="Edit"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(recruiter._id)}
                      className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-[#1a1a2e]">
            <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {editingId ? "Edit Recruiter" : "Add Recruiter"}
              </h2>
              <button
                onClick={resetForm}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Company Logo *
                </label>
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50">
                    {formData.logoUrl ? (
                      <img
                        src={resolveUploadedAssetUrl(formData.logoUrl)}
                        alt="Logo preview"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <FaBuilding className="text-2xl text-gray-300 dark:text-gray-600" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                          fileInputRef.current.click();
                        }
                      }}
                      disabled={uploading}
                      className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      {uploading ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-cyan-500" />
                      ) : (
                        <FaUpload />
                      )}
                      {uploading ? "Uploading..." : "Upload Logo"}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        handleLogoUpload(selectedFile);
                        e.target.value = "";
                      }}
                    />
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Or paste a URL below (JPG, PNG, SVG - max 20MB)
                    </p>
                    <input
                      type="text"
                      inputMode="url"
                      placeholder="https://... or /uploads/images/..."
                      value={formData.logoUrl}
                      onChange={(e) => setFormData((f) => ({ ...f, logoUrl: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Company Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tata Consultancy Services"
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((f) => ({ ...f, category: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.order}
                    onChange={(e) => setFormData((f) => ({ ...f, order: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://company.com"
                  value={formData.website}
                  onChange={(e) => setFormData((f) => ({ ...f, website: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                />
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/40">
                <input
                  type="checkbox"
                  checked={formData.showOnHome}
                  onChange={(e) => setFormData((f) => ({ ...f, showOnHome: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Show in homepage recruiter slider
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Turn this off if you want the recruiter listed only on the placements page.
                  </p>
                </div>
              </label>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-2 dark:border-gray-800">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 px-5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-700 disabled:opacity-50"
                >
                  <FaSave /> {editingId ? "Save Changes" : "Add Recruiter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1a1a2e]">
            <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-200">Remove this recruiter?</h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              This will permanently delete the recruiter and their logo reference. This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
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

export default AdminRecruiters;
