import React, { useEffect, useRef, useState } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  FaQuoteLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaUpload,
  FaUserCircle,
} from "react-icons/fa";

const DEPARTMENTS = ["CSE", "IT", "MECH", "ELECTRICAL", "ENTC", "MBA", "ASH"];

const emptyForm = () => ({
  studentName: "",
  batch: "",
  department: "CSE",
  company: "",
  designation: "",
  message: "",
  photoUrl: "",
});

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
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
    fetchTestimonials();
  }, []);

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/placements/testimonials");
      setTestimonials(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch {
      setError("Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (file) => {
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
      setFormData((f) => ({ ...f, photoUrl: res.data.fileUrl }));
    } catch {
      setError("Photo upload failed. Ensure the file is an image under 5MB.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (editingId) {
        await apiClient.put(`/placements/testimonials/${editingId}`, formData, authHeader());
        setSuccess("Testimonial updated successfully.");
      } else {
        await apiClient.post("/placements/testimonials", formData, authHeader());
        setSuccess("Testimonial added successfully.");
      }
      fetchTestimonials();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed.");
    }
  };

  const handleEdit = (t) => {
    setFormData({
      studentName: t.studentName || "",
      batch: t.batch || "",
      department: t.department || "CSE",
      company: t.company || "",
      designation: t.designation || "",
      message: t.message || "",
      photoUrl: t.photoUrl || "",
    });
    setEditingId(t._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/placements/testimonials/${id}`, authHeader());
      setSuccess("Testimonial deleted.");
      setDeleteConfirm(null);
      fetchTestimonials();
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Student Testimonials</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage placement success stories from students</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg font-medium"
          >
            <FaPlus /> Add Testimonial
          </button>
        </div>

        {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">{error}</div>}
        {success && <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-sm">{success}</div>}

        {/* Cards */}
        {loading ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading testimonials…</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaQuoteLeft className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No Testimonials Yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Click "Add Testimonial" to add the first student success story.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t._id} className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow group">
                {/* Student Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700">
                    {t.photoUrl ? (
                      <img src={t.photoUrl} alt={t.studentName} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                    ) : (
                      <FaUserCircle className="text-3xl text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{t.studentName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.department} · Batch {t.batch}</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{t.designation ? `${t.designation} @ ${t.company}` : t.company}</p>
                  </div>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed line-clamp-3">
                  <FaQuoteLeft className="inline mr-1 text-indigo-300 text-xs" />
                  {t.message}
                </p>

                {/* Actions */}
                <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
                  <button onClick={() => handleEdit(t)} className="flex items-center gap-1 px-3 py-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-xs font-medium">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => setDeleteConfirm(t._id)} className="flex items-center gap-1 px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-xs font-medium">
                    <FaTrash /> Delete
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
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button onClick={resetForm} className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm">{error}</div>}

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Student Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 overflow-hidden shrink-0">
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <FaUserCircle className="text-3xl text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {uploading ? (
                        <span className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-indigo-500" />
                      ) : (
                        <FaUpload className="text-xs" />
                      )}
                      {uploading ? "Uploading…" : "Upload Photo"}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e.target.files[0])}
                    />
                    <input
                      type="url"
                      placeholder="or paste a photo URL"
                      value={formData.photoUrl}
                      onChange={(e) => setFormData((f) => ({ ...f, photoUrl: e.target.value }))}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Student Name *</label>
                  <input type="text" placeholder="Rahul Sharma" value={formData.studentName} onChange={(e) => setFormData((f) => ({ ...f, studentName: e.target.value }))} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Batch *</label>
                  <input type="text" placeholder="2024" value={formData.batch} onChange={(e) => setFormData((f) => ({ ...f, batch: e.target.value }))} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Department *</label>
                  <select value={formData.department} onChange={(e) => setFormData((f) => ({ ...f, department: e.target.value }))} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none">
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Company *</label>
                  <input type="text" placeholder="Infosys" value={formData.company} onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Designation</label>
                <input type="text" placeholder="Software Engineer" value={formData.designation} onChange={(e) => setFormData((f) => ({ ...f, designation: e.target.value }))} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Testimonial Message *</label>
                <textarea rows={4} placeholder="Share the student's experience and words of advice..." value={formData.message} onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none" required />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={resetForm} className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">Cancel</button>
                <button type="submit" disabled={uploading} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm disabled:opacity-50">
                  <FaSave /> {editingId ? "Save Changes" : "Add Testimonial"}
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
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Delete this testimonial?</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">This will permanently remove this student's testimonial. This cannot be undone.</p>
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

export default AdminTestimonials;
