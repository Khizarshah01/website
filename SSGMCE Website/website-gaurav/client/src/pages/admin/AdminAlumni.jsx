import React, { useEffect, useRef, useState } from "react";
import {
  FaEdit,
  FaExternalLinkAlt,
  FaPlus,
  FaQuoteLeft,
  FaSave,
  FaTimes,
  FaTrash,
  FaUpload,
  FaUserGraduate,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import apiClient from "../../utils/apiClient";
import { resolveUploadedAssetUrl } from "../../utils/uploadUrls";
import alumniWaghImg from "../../assets/images/home/Alumni/Abhay_Wagh.jpg";
import alumniKaulImg from "../../assets/images/home/Alumni/Umesh_Kaul.jpg";
import alumniWankhedeImg from "../../assets/images/home/Alumni/Nitin-Wankhede.png";
import alumniDeuskarImg from "../../assets/images/home/Alumni/Ashutosh_Deuskar.jpg";

const defaultHomepageAlumni = [
  {
    organization: "DTE, Mumbai",
    name: "Mr. Abhay Wagh",
    role: "Director",
    imageUrl: alumniWaghImg,
    department: "Computer Science and Engineering",
    order: 1,
    showOnHome: true,
  },
  {
    organization: "IBM",
    name: "Mr. Umesh Kaul",
    role: "Executive Architect / Consultant",
    imageUrl: alumniKaulImg,
    department: "Computer Science and Engineering",
    order: 2,
    showOnHome: true,
  },
  {
    organization: "Value Momentum, Hyderabad",
    name: "Mr. Nitin Wankhede",
    role: "Vice President - Client Services",
    imageUrl: alumniWankhedeImg,
    department: "Information Technology",
    order: 3,
    showOnHome: true,
  },
  {
    organization: "VDA Infosolutions",
    name: "Mr. Ashutosh Deuskar",
    role: "Director",
    imageUrl: alumniDeuskarImg,
    department: "Computer Science and Engineering",
    order: 4,
    showOnHome: true,
  },
];

const emptyForm = () => ({
  name: "",
  role: "",
  organization: "",
  imageUrl: "",
  department: "",
  batch: "",
  profileUrl: "",
  quote: "",
  order: 0,
  showOnHome: true,
});

const AdminAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm());
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/placements/alumni");
      setAlumni(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch {
      setError("Failed to load alumni.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
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
      setFormData((current) => ({ ...current, imageUrl: uploadedUrl }));
    } catch {
      setError("Photo upload failed. Please use an image under 20MB.");
    } finally {
      setUploading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.imageUrl) {
      setError("Please upload or enter an alumni photo.");
      return;
    }

    try {
      const payload = {
        ...formData,
        order: Number(formData.order) || 0,
      };

      if (editingId) {
        await apiClient.put(`/placements/alumni/${editingId}`, payload, authHeader());
        setSuccess("Alumni entry updated successfully.");
      } else {
        await apiClient.post("/placements/alumni", payload, authHeader());
        setSuccess("Alumni entry added successfully.");
      }

      fetchAlumni();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Operation failed.");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name || "",
      role: item.role || "",
      organization: item.organization || "",
      imageUrl: item.imageUrl || "",
      department: item.department || "",
      batch: item.batch || "",
      profileUrl: item.profileUrl || "",
      quote: item.quote || "",
      order: item.order ?? 0,
      showOnHome: item.showOnHome !== false,
    });
    setEditingId(item._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/placements/alumni/${id}`, authHeader());
      setSuccess("Alumni entry deleted.");
      setDeleteConfirm(null);
      fetchAlumni();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Delete failed.");
      setDeleteConfirm(null);
    }
  };

  const importDefaultHomepageAlumni = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await Promise.all(
        defaultHomepageAlumni.map((item) =>
          apiClient.post("/placements/alumni", item, authHeader()),
        ),
      );

      setSuccess("Default homepage alumni imported. You can edit them now.");
      await fetchAlumni();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Failed to import default alumni.");
    } finally {
      setLoading(false);
    }
  };

  const sortedAlumni = alumni
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Prestigious Alumni</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Manage homepage alumni cards, photos, and display order.
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 font-medium text-white shadow-lg transition-colors hover:bg-cyan-700"
          >
            <FaPlus /> Add Alumni
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

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-[#1a1a2e]">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-cyan-500" />
            <p className="text-gray-500 dark:text-gray-400">Loading alumni...</p>
          </div>
        ) : sortedAlumni.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-[#1a1a2e]">
            <FaUserGraduate className="mx-auto mb-4 text-6xl text-gray-300 dark:text-gray-600" />
            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">No Alumni Yet</h3>
            <p className="text-gray-500 dark:text-gray-400">
              The homepage is currently using built-in fallback alumni. Import them here to edit from admin.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={importDefaultHomepageAlumni}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-cyan-700"
              >
                <FaUpload /> Import Homepage Alumni
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <FaPlus /> Add Manually
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sortedAlumni.map((item) => (
              <div
                key={item._id}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-[#1a1a2e]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {(item.organization || "SSGMCE").slice(0, 32)}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      item.showOnHome !== false
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {item.showOnHome !== false ? "Homepage" : "Hidden"}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-full border border-slate-200 bg-slate-50 shadow-sm">
                    {item.imageUrl ? (
                      <img
                        src={resolveUploadedAssetUrl(item.imageUrl)}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <FaUserGraduate className="text-2xl" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100">{item.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-amber-500">{item.role}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                      {item.department || item.batch
                        ? [item.department, item.batch].filter(Boolean).join(" | ")
                        : item.organization}
                    </p>
                  </div>
                </div>

                {item.quote && (
                  <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600 dark:bg-gray-800/60 dark:text-gray-300">
                    <FaQuoteLeft className="mb-2 text-slate-300" />
                    {item.quote}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Order {item.order ?? 0}
                  </span>
                  <div className="flex items-center gap-1">
                    {item.profileUrl && (
                      <a
                        href={item.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-cyan-600 transition-colors hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-900/20"
                        title="Open profile"
                      >
                        <FaExternalLinkAlt size={13} />
                      </a>
                    )}
                    <button
                      onClick={() => handleEdit(item)}
                      className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      title="Edit"
                    >
                      <FaEdit size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(item._id)}
                      className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Delete"
                    >
                      <FaTrash size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl dark:bg-[#1a1a2e]">
            <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {editingId ? "Edit Alumni" : "Add Alumni"}
              </h2>
              <button
                onClick={resetForm}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Alumni Photo *
                </label>
                <div className="flex items-start gap-4">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50">
                    {formData.imageUrl ? (
                      <img
                        src={resolveUploadedAssetUrl(formData.imageUrl)}
                        alt="Alumni preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaUserGraduate className="text-3xl text-gray-300 dark:text-gray-600" />
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
                      {uploading ? "Uploading..." : "Upload Photo"}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        handleImageUpload(selectedFile);
                        e.target.value = "";
                      }}
                    />
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      You can upload a photo or paste an image URL/path below.
                    </p>
                    <input
                      type="text"
                      inputMode="url"
                      placeholder="https://... or /uploads/images/..."
                      value={formData.imageUrl}
                      onChange={(e) => setFormData((current) => ({ ...current, imageUrl: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Alumni Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((current) => ({ ...current, name: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Role / Position *
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData((current) => ({ ...current, role: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Organization *
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData((current) => ({ ...current, organization: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={(e) => setFormData((current) => ({ ...current, order: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData((current) => ({ ...current, department: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                    placeholder="e.g. CSE"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Batch
                  </label>
                  <input
                    type="text"
                    value={formData.batch}
                    onChange={(e) => setFormData((current) => ({ ...current, batch: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                    placeholder="e.g. 2004"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Profile URL
                </label>
                <input
                  type="url"
                  value={formData.profileUrl}
                  onChange={(e) => setFormData((current) => ({ ...current, profileUrl: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Short Highlight / Quote
                </label>
                <textarea
                  rows="3"
                  value={formData.quote}
                  onChange={(e) => setFormData((current) => ({ ...current, quote: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  placeholder="Optional one-line achievement or quote."
                />
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/40">
                <input
                  type="checkbox"
                  checked={formData.showOnHome}
                  onChange={(e) => setFormData((current) => ({ ...current, showOnHome: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Show in homepage alumni carousel
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Turn this off if you want to keep the alumni record saved but hidden from the homepage.
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
                  <FaSave /> {editingId ? "Save Changes" : "Add Alumni"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1a1a2e]">
            <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-200">Remove this alumni entry?</h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              This will permanently delete the alumni card and photo reference from the admin panel.
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

export default AdminAlumni;
