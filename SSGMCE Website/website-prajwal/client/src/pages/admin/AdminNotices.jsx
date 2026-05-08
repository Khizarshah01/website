import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { FaBullhorn, FaPlus } from "react-icons/fa";

const AdminNotices = () => {
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
          <button className="flex items-center gap-2 px-5 py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors shadow-lg font-medium">
            <FaPlus /> Add Notice
          </button>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <FaBullhorn className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Notices Management
          </h3>
          <p className="text-gray-500 dark:text-gray-400">This feature is under development.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotices;
