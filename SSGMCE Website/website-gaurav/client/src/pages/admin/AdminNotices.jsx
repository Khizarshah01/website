import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import apiClient from "../../utils/apiClient";
import {
  FaBullhorn,
  FaEdit,
  FaPlus,
  FaSave,
  FaTimes,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";

const CATEGORIES = ["Announcement", "Admission", "Examination", "Result", "General"];
const PRIORITIES = ["High", "Medium", "Low"];

const emptyForm = () => ({
  title: "",
  description: "",
  category: "General",
  fileUrl: "",
  priority: "Medium",
  isActive: true,
  publishDate: new Date().toISOString().slice(0, 10),
});

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm());
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const authHeader = () => {
    const token = localStorage.getItem("adminToken");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/notices");
      setNotices(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      logUnexpectedError("Error loading notices:", err);
      setError(getErrorMessage(err, "Failed to load notices"));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm());
    setEditingId(null);
    setShowForm(false);
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
      if (!fileUrl) throw new Error("Upload URL missing");
      setFormData((prev) => ({ ...prev, fileUrl }));
    } catch (err) {
      setError(getErrorMessage(err, "Failed to upload file"));
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
      description: formData.description.trim(),
      publishDate: formData.publishDate ? new Date(formData.publishDate) : new Date(),
    };

    try {
      if (editingId) {
        await apiClient.put(`/notices/${editingId}`, payload, authHeader());
        setSuccess("Notice updated.");
      } else {
        await apiClient.post("/notices", payload, authHeader());
        setSuccess("Notice created.");
      }
      await fetchNotices();
      resetForm();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save notice"));
    }
  };

  const handleEdit = (notice) => {
    setFormData({
      title: notice.title || "",
      description: notice.description || "",
      category: notice.category || "General",
      fileUrl: notice.fileUrl || "",
      priority: notice.priority || "Medium",
      isActive: notice.isActive !== false,
      publishDate: notice.publishDate
        ? new Date(notice.publishDate).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    });
    setEditingId(notice._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notice?")) return;
    try {
      await apiClient.delete(`/notices/${id}`, authHeader());
      setSuccess("Notice deleted.");
      await fetchNotices();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete notice"));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Notices Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage announcements and notices
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors shadow-lg font-medium"
          >
            <FaPlus /> Add Notice
          </button>
        </div>

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

        {showForm ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {editingId ? "Edit Notice" : "Create Notice"}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-sm font-semibold mb-1.5">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, priority: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  >
                    {PRIORITIES.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Publish Date</label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, publishDate: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-[1fr_auto] gap-3 items-end">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Attachment URL</label>
                  <input
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

              <div className="flex items-center gap-2">
                <input
                  id="isActiveNotice"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                />
                <label htmlFor="isActiveNotice" className="text-sm">
                  Active
                </label>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm font-medium"
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
            <div className="p-12 text-center text-gray-500">Loading notices...</div>
          ) : notices.length === 0 ? (
            <div className="p-12 text-center">
              <FaBullhorn className="text-5xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notices found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">Title</th>
                    <th className="px-5 py-3 text-left font-semibold">Category</th>
                    <th className="px-5 py-3 text-left font-semibold">Priority</th>
                    <th className="px-5 py-3 text-left font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {notices.map((notice) => (
                    <tr key={notice._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{notice.title}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{notice.description}</p>
                      </td>
                      <td className="px-5 py-4">{notice.category}</td>
                      <td className="px-5 py-4">{notice.priority}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${notice.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}
                        >
                          {notice.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(notice)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(notice._id)}
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
      </div>
    </AdminLayout>
  );
};

export default AdminNotices;
