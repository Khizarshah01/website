import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  FaUniversity,
  FaExternalLinkAlt,
  FaYoutube,
  FaImage,
  FaClock,
  FaPalette,
} from "react-icons/fa";
import { ADMIN_ROUTE_PREFIX } from "../../config/adminAccess";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await apiClient.get("/pages", {
          params: { category: "departments" },
        });
        if (res.data?.success) {
          setDepartments(res.data.data || []);
          setError("");
        }
      } catch (error) {
        logUnexpectedError("Failed to load department pages:", error);
        setError(getErrorMessage(error, "Failed to load department pages"));
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : null}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Departments Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Use the visual editor to update department content with full rich
            text formatting capabilities. Edit every word on department pages
            with professional formatting tools.
          </p>

          {/* Quick Info */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800">
              <FaPalette className="text-purple-500" /> Rich text editor
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800">
              <FaYoutube className="text-red-500" /> YouTube links
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800">
              <FaImage className="text-blue-500" /> Faculty photos
            </span>
          </div>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center text-gray-500 dark:text-gray-400">
            Loading department pages...
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {departments.map((dept) => (
              <Link
                key={dept.pageId}
                to={`${ADMIN_ROUTE_PREFIX}/visual/${dept.pageId}`}
                className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 transition-colors">
                      {dept.pageTitle}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                      {dept.route}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <FaUniversity />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
                  <span className="flex items-center gap-1">
                    <FaClock />
                    {formatDate(dept.updatedAt)}
                  </span>
                  <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
                    Open Editor <FaExternalLinkAlt className="text-[10px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDepartments;
