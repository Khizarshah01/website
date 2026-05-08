import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import apiClient from "../../utils/apiClient";
import {
  FaClipboardList,
  FaEdit,
  FaLink,
  FaPlus,
  FaSave,
  FaTimes,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";

const IQAC_CATEGORIES = [
  "AQAR",
  "Minutes",
  "NAAC",
  "NBA",
  "Best Practices",
  "Feedback",
  "Survey",
  "Gender",
  "E-Content",
  "Other",
];

const FILE_TYPES = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "image",
  "other",
];

const emptyForm = () => ({
  title: "",
  category: "Other",
  academicYear: "",
  fileUrl: "",
  fileType: "pdf",
  fileSize: "",
  description: "",
  isPublished: true,
});

const AdminIQAC = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm());
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
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
      const res = await apiClient.get("/iqac/admin/documents", authHeader());
      if (res.data?.success) {
        setDocuments(res.data.data || []);
      } else {
        setDocuments([]);
      }
      setError("");
    } catch (err) {
      logUnexpectedError("Error loading IQAC docs:", err);
      setError(getErrorMessage(err, "Failed to load IQAC documents"));
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
      if (!fileUrl) throw new Error("Upload URL missing");

      const ext = (file.name.split(".").pop() || "other").toLowerCase();
      setFormData((prev) => ({
        ...prev,
        fileUrl,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileType: FILE_TYPES.includes(ext) ? ext : "other",
      }));
      setUploadedFileName(file.name);
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
      academicYear: formData.academicYear.trim(),
      description: formData.description.trim(),
    };

    try {
      if (editingId) {
        await apiClient.put(`/iqac/documents/${editingId}`, payload, authHeader());
        setSuccess("IQAC document updated.");
      } else {
        await apiClient.post("/iqac/documents", payload, authHeader());
        setSuccess("IQAC document created.");
      }
      await fetchDocuments();
      resetForm();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save IQAC document"));
    }
  };

  const handleEdit = (doc) => {
    setFormData({
      title: doc.title || "",
      category: doc.category || "Other",
      academicYear: doc.academicYear || "",
      fileUrl: doc.fileUrl || "",
      fileType: doc.fileType || "pdf",
      fileSize: doc.fileSize || "",
      description: doc.description || "",
      isPublished: doc.isPublished !== false,
    });
    setUploadedFileName(doc.fileUrl ? doc.fileUrl.split("/").pop() : "");
    setEditingId(doc._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this IQAC document?")) return;
    try {
      await apiClient.delete(`/iqac/documents/${id}`, authHeader());
      setSuccess("IQAC document deleted.");
      await fetchDocuments();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete IQAC document"));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              IQAC Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage IQAC documents and data</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-lg font-medium"
          >
            <FaPlus /> Add Document
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
                {editingId ? "Edit IQAC Document" : "Create IQAC Document"}
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
                    {IQAC_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Academic Year</label>
                  <input
                    value={formData.academicYear}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, academicYear: e.target.value }))
                    }
                    placeholder="e.g. 2025-26"
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  />
                </div>
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

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">File Size</label>
                  <input
                    value={formData.fileSize}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fileSize: e.target.value }))
                    }
                    placeholder="e.g. 1.8 MB"
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
                  />
                </div>
                <div className="flex items-center gap-2 mt-8">
                  <input
                    id="isPublishedIqac"
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))
                    }
                  />
                  <label htmlFor="isPublishedIqac" className="text-sm">
                    Published
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium"
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
            <div className="p-12 text-center text-gray-500">Loading IQAC documents...</div>
          ) : documents.length === 0 ? (
            <div className="p-12 text-center">
              <FaClipboardList className="text-5xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No IQAC documents found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">Title</th>
                    <th className="px-5 py-3 text-left font-semibold">Category</th>
                    <th className="px-5 py-3 text-left font-semibold">Academic Year</th>
                    <th className="px-5 py-3 text-left font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {documents.map((doc) => (
                    <tr key={doc._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{doc.title}</p>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                        >
                          <FaLink /> Open file
                        </a>
                      </td>
                      <td className="px-5 py-4">{doc.category}</td>
                      <td className="px-5 py-4">{doc.academicYear || "-"}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${doc.isPublished ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}
                        >
                          {doc.isPublished ? "Published" : "Hidden"}
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
      </div>
    </AdminLayout>
  );
};

export default AdminIQAC;
