import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAuth } from "../../hooks/useAuth";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserShield,
  FaToggleOn,
  FaToggleOff,
  FaTimes,
  FaSave,
} from "react-icons/fa";

const DEPARTMENTS = ["CSE", "IT", "MECH", "ELECTRICAL", "ENTC", "MBA", "ASH"];

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
  department: "CSE",
  isActive: true,
};

const AdminCoordinators = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const authHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });

  const fetchUsers = async () => {
    try {
      const res = await apiClient.get("/auth/coordinators", authHeader());
      if (res.data.success) setUsers(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        const payload = { ...formData };
        if (!payload.password) delete payload.password; // don't send empty password
        await apiClient.put(
          `/auth/coordinators/${editingId}`,
          payload,
          authHeader()
        );
        setSuccess("User updated successfully");
      } else {
        if (!formData.password || formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          return;
        }
        await apiClient.post("/auth/coordinators", formData, authHeader());
        setSuccess("Coordinator created successfully");
      }
      fetchUsers();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (u) => {
    setFormData({
      name: u.name,
      email: u.email,
      password: "",
      department: u.department || "CSE",
      isActive: u.isActive !== false,
    });
    setEditingId(u._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setError("");
    try {
      await apiClient.delete(`/auth/coordinators/${id}`, authHeader());
      setSuccess("User deleted");
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const toggleActive = async (u) => {
    try {
      await apiClient.put(
        `/auth/coordinators/${u._id}`,
        { isActive: !u.isActive },
        authHeader()
      );
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Toggle failed");
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ ...EMPTY_FORM });
  };

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  const coordinators = users.filter((u) => u.role === "Coordinator");
  const admins = users.filter(
    (u) => u.role === "SuperAdmin" || u.role === "admin"
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Manage Coordinators
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Create and manage department coordinator accounts
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg font-medium"
          >
            <FaPlus /> Add Coordinator
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

        {/* Form */}
        {showForm && (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {editingId ? "Edit User" : "New Coordinator"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="email@ssgmce.ac.in"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password {editingId ? "(leave blank to keep)" : "*"}
                  </label>
                  <input
                    type="password"
                    required={!editingId}
                    minLength={6}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder={editingId ? "••••••" : "Min 6 characters"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department *
                  </label>
                  <select
                    required
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {editingId && (
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="rounded"
                  />
                  Account Active
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

        {/* Loading */}
        {loading ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading users...</p>
          </div>
        ) : (
          <>
            {/* Admins Section */}
            {admins.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Super Admins
                </h2>
                <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {admins.map((a) => (
                        <tr key={a._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                            {a.name}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                            {a.email}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                              {a.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                            {a.department || "All"}
                          </td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                            {formatDate(a.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Coordinators Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Department Coordinators ({coordinators.length})
              </h2>
              {coordinators.length === 0 ? (
                <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                  <FaUserShield className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    No Coordinators Yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Click "Add Coordinator" to create department coordinator
                    accounts.
                  </p>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {coordinators.map((c) => (
                        <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                            {c.name}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                            {c.email}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                              {c.department}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => toggleActive(c)}
                              className={`flex items-center gap-1.5 text-sm font-medium ${
                                c.isActive !== false
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-500"
                              }`}
                            >
                              {c.isActive !== false ? (
                                <>
                                  <FaToggleOn className="text-lg" /> Active
                                </>
                              ) : (
                                <>
                                  <FaToggleOff className="text-lg" /> Inactive
                                </>
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                            {formatDate(c.lastLogin)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEdit(c)}
                                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(c._id)}
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
      </div>
    </AdminLayout>
  );
};

export default AdminCoordinators;
