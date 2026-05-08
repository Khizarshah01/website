import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAuth } from "../../hooks/useAuth";
import {
  FaUserGraduate,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaSearch,
} from "react-icons/fa";

const ALL_DEPARTMENTS = ["CSE", "IT", "MECH", "ELECTRICAL", "ENTC", "MBA", "ASH"];

const EMPTY_FORM = {
  name: "",
  designation: "",
  department: "CSE",
  qualification: "",
  specialization: "",
  experience: "",
  email: "",
  phone: "",
  image: "",
  isActive: true,
};

const AdminFaculty = () => {
  const { isSuperAdmin, isCoordinator, userDepartment } = useAuth();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterDept, setFilterDept] = useState(
    isCoordinator ? userDepartment : ""
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFaculty();
  }, [filterDept]);

  const authHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const params = {};
      // Coordinators always filter by their department
      if (isCoordinator) {
        params.department = userDepartment;
      } else if (filterDept) {
        params.department = filterDept;
      }
      const res = await apiClient.get("/faculty", { params, ...authHeader() });
      setFaculty(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load faculty");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = { ...formData };
      // Coordinators can only add faculty to their department
      if (isCoordinator) {
        payload.department = userDepartment;
      }

      if (editingId) {
        await apiClient.put(`/faculty/${editingId}`, payload, authHeader());
        setSuccess("Faculty updated successfully");
      } else {
        await apiClient.post("/faculty", payload, authHeader());
        setSuccess("Faculty added successfully");
      }
      fetchFaculty();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed");
    }
  };

  const handleEdit = (f) => {
    setFormData({
      name: f.name || "",
      designation: f.designation || "",
      department: f.department || "CSE",
      qualification: f.qualification || "",
      specialization: f.specialization || "",
      experience: f.experience || "",
      email: f.email || "",
      phone: f.phone || "",
      image: f.image || "",
      isActive: f.isActive !== false,
    });
    setEditingId(f._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this faculty member?")) return;
    setError("");
    try {
      await apiClient.delete(`/faculty/${id}`, authHeader());
      setSuccess("Faculty deleted");
      fetchFaculty();
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed");
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      ...EMPTY_FORM,
      department: isCoordinator ? userDepartment : "CSE",
    });
  };

  // Filter by search term
  const filteredFaculty = faculty.filter(
    (f) =>
      f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Faculty Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {isCoordinator
                ? `Manage ${userDepartment} department faculty`
                : "Manage faculty profiles across all departments"}
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg font-medium"
          >
            <FaPlus /> Add Faculty
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
                {editingId ? "Edit Faculty" : "Add New Faculty"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Professor / HOD / Assistant Prof."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department *
                  </label>
                  {isCoordinator ? (
                    <input
                      type="text"
                      readOnly
                      value={userDepartment}
                      className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    />
                  ) : (
                    <select
                      required
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      {ALL_DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({ ...formData, qualification: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Ph.D, M.Tech, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Machine Learning, VLSI, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="10 years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="faculty@ssgmce.ac.in"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="/uploads/images/faculty.jpg"
                  />
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
                  Active
                </label>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <FaSave /> {editingId ? "Update" : "Add Faculty"}
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, designation, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          {isSuperAdmin && (
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-w-[160px]"
            >
              <option value="">All Departments</option>
              {ALL_DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Faculty Table */}
        {loading ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading faculty...</p>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaUserGraduate className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              No Faculty Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm
                ? "No results match your search."
                : 'Click "Add Faculty" to add faculty members.'}
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredFaculty.map((f) => (
                    <tr key={f._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {f.image &&
                          f.image !== "/images/default-faculty.png" ? (
                            <img
                              src={f.image}
                              alt={f.name}
                              className="w-10 h-10 rounded-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <FaUserGraduate className="text-blue-600 dark:text-blue-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                              {f.name}
                            </p>
                            {f.qualification && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {f.qualification}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {f.designation}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          {f.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                        {f.email || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            f.isActive !== false
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                              : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {f.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(f)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(f._id)}
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
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredFaculty.length} faculty member
              {filteredFaculty.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminFaculty;
