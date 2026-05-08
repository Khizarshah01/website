import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaTrash,
  FaPlus,
  FaImage,
  FaLink,
  FaCalendar,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const AdminPopupBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    isActive: false,
    priority: 0,
    startDate: "",
    endDate: "",
    displayFrequency: "once-per-session",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await apiClient.get("/popup-banners");
      if (response.data.success) {
        setBanners(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const response = await apiClient.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (response.data.success) {
        const imageUrl = response.data.url;
        setFormData((prev) => ({ ...prev, imageUrl }));
        setImagePreview(imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing banner
        const response = await apiClient.put(`/popup-banners/${editingId}`, formData);
        if (response.data.success) {
          alert("Banner updated successfully!");
        }
      } else {
        // Create new banner
        const response = await apiClient.post("/popup-banners", formData);
        if (response.data.success) {
          alert("Banner created successfully!");
        }
      }

      resetForm();
      fetchBanners();
    } catch (error) {
      console.error("Error saving banner:", error);
      alert("Failed to save banner");
    }
  };

  const handleEdit = (banner) => {
    setEditingId(banner._id);
    setFormData({
      title: banner.title,
      description: banner.description || "",
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl || "",
      isActive: banner.isActive,
      priority: banner.priority,
      startDate: banner.startDate ? banner.startDate.split("T")[0] : "",
      endDate: banner.endDate ? banner.endDate.split("T")[0] : "",
      displayFrequency: banner.displayFrequency,
    });
    setImagePreview(banner.imageUrl);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      const response = await apiClient.delete(`/popup-banners/${id}`);
      if (response.data.success) {
        alert("Banner deleted successfully!");
        fetchBanners();
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("Failed to delete banner");
    }
  };

  const toggleActive = async (id) => {
    try {
      const response = await apiClient.patch(`/popup-banners/${id}/toggle`);
      if (response.data.success) {
        fetchBanners();
      }
    } catch (error) {
      console.error("Error toggling banner:", error);
      alert("Failed to toggle banner status");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      linkUrl: "",
      isActive: false,
      priority: 0,
      startDate: "",
      endDate: "",
      displayFrequency: "once-per-session",
    });
    setImagePreview("");
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500 dark:text-gray-400 animate-pulse text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Popup Banner Manager</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage home page popup announcements</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#004080] transition-colors"
          >
            <FaPlus /> Add New Banner
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-[#1a1a2e] border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {editingId ? "Edit Banner" : "Create New Banner"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Banner Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Banner Image *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-[#003366] transition-colors">
                      <FaImage className="text-gray-400 dark:text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {uploading ? "Uploading..." : "Choose Image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Link URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FaLink className="inline mr-2" />
                    Link URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
                  />
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <FaCalendar className="inline mr-2" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <FaCalendar className="inline mr-2" />
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
                    />
                  </div>
                </div>

                {/* Display Frequency */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Display Frequency
                  </label>
                  <select
                    value={formData.displayFrequency}
                    onChange={(e) => setFormData({ ...formData, displayFrequency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
                  >
                    <option value="always">Always (Every Page Load)</option>
                    <option value="once-per-session">Once Per Session</option>
                    <option value="once-per-day">Once Per Day</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Priority (Higher = Shows First)
                  </label>
                  <input
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
                  />
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 text-[#003366] border-gray-300 dark:border-gray-600 rounded focus:ring-[#003366]"
                  />
                  <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Set as Active Banner
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={!formData.title || !formData.imageUrl || uploading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#003366] text-white rounded-lg hover:bg-[#004080] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaSave /> {editingId ? "Update Banner" : "Create Banner"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Banners List */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">All Banners</h2>
          </div>

          {banners.length === 0 ? (
            <div className="text-center py-12">
              <FaEye className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No popup banners yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#004080] transition-colors"
              >
                <FaPlus /> Create First Banner
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {banners.map((banner) => (
                <div key={banner._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex gap-4">
                    {/* Banner Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Banner Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{banner.title}</h3>
                          {banner.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{banner.description}</p>
                          )}
                          {banner.linkUrl && (
                            <a
                              href={banner.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#003366] hover:underline mt-2 inline-block"
                            >
                              <FaLink className="inline mr-1" />
                              {banner.linkUrl}
                            </a>
                          )}
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                            <span>Priority: {banner.priority}</span>
                            <span>Frequency: {banner.displayFrequency}</span>
                            {banner.startDate && (
                              <span>
                                Start: {new Date(banner.startDate).toLocaleDateString()}
                              </span>
                            )}
                            {banner.endDate && (
                              <span>End: {new Date(banner.endDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {banner.isActive ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">
                              <FaEye /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-xs font-semibold">
                              <FaEyeSlash /> Inactive
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => toggleActive(banner._id)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            banner.isActive
                              ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                        >
                          {banner.isActive ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleEdit(banner)}
                          className="px-3 py-1.5 bg-[#FF9900] text-white rounded-lg text-sm font-medium hover:bg-[#FF8800] transition-colors"
                        >
                          <FaEdit className="inline mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(banner._id)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                          <FaTrash className="inline mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPopupBanner;
