import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  FaHistory,
  FaUndo,
  FaUser,
  FaSearch,
  FaFilter,
  FaCheck,
  FaEdit,
  FaSignInAlt,
} from "react-icons/fa";

const AdminEditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPage, setFilterPage] = useState("");
  const [resettingId, setResettingId] = useState(null);

  const authHeader = useCallback(
    () => ({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    }),
    []
  );

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const params = {};
      if (filterPage) params.pageId = filterPage;
      const res = await apiClient.get("/pages/edit-logs", {
        params,
        ...authHeader(),
      });
      setLogs(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load edit logs");
    } finally {
      setLoading(false);
    }
  }, [filterPage, authHeader]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleReset = async (logId, pageId, timestamp) => {
    const confirmMsg = `Are you sure you want to reset "${pageId}" to its state before this edit?\n\nThis will revert all changes made in this edit. The current state will be saved so you can undo this reset too.`;
    if (!confirm(confirmMsg)) return;

    setResettingId(logId);
    setError("");
    setSuccess("");
    try {
      const res = await apiClient.post(
        `/pages/reset/${logId}`,
        {},
        authHeader()
      );
      setSuccess(res.data.message || "Page reset successfully");
      fetchLogs(); // Refresh logs to show the reset entry
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setResettingId(null);
    }
  };

  // Client-side search
  const filtered = logs.filter((log) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (log.userName || "").toLowerCase().includes(term) ||
      (log.pageId || "").toLowerCase().includes(term) ||
      (log.pageTitle || "").toLowerCase().includes(term) ||
      (log.userDepartment || "").toLowerCase().includes(term) ||
      (log.summary || "").toLowerCase().includes(term)
    );
  });

  // Unique page IDs for filter dropdown
  const uniquePages = [...new Set(logs.map((l) => l.pageId))].sort();

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const timeAgo = (dateStr) => {
    const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return formatTime(dateStr);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            <FaHistory className="inline-block mr-3 text-[#003366]" />
            Activity Log
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track all page edits made by coordinators and admins. Reset any edit
            if something goes wrong.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
            <FaCheck /> {success}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by user, page, department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <select
              value={filterPage}
              onChange={(e) => setFilterPage(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-w-[220px]"
            >
              <option value="">All Pages</option>
              {uniquePages.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Log Entries */}
        {loading ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading activity logs...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaHistory className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              No Activity Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Edit logs will appear here when coordinators or admins make
              changes.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((log) => (
              <div
                key={log._id}
                className={`bg-white dark:bg-[#1a1a2e] rounded-xl border shadow-sm overflow-hidden transition-all ${
                  log.action === "reset"
                    ? "border-orange-200"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-start gap-4 p-5">
                  {/* Avatar */}
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                      log.action === "reset"
                        ? "bg-orange-100 dark:bg-orange-900/30"
                        : log.action === "login"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : log.userRole === "Coordinator"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {log.action === "reset" ? (
                      <FaUndo
                        className="text-orange-600 dark:text-orange-400"
                        title="Reset action"
                      />
                    ) : log.action === "login" ? (
                      <FaSignInAlt
                        className="text-green-600 dark:text-green-400"
                        title="Login"
                      />
                    ) : (
                      <FaUser
                        className={
                          log.userRole === "Coordinator"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400"
                        }
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {log.userName}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          log.userRole === "Coordinator"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {log.userRole}
                      </span>
                      {log.userDepartment && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          {log.userDepartment}
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          log.action === "reset"
                            ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                            : log.action === "login"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        }`}
                      >
                        {log.action === "reset" ? "RESET" : log.action === "login" ? "LOGIN" : "EDIT"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {log.action === "reset" ? (
                        <>
                          Reset{" "}
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {log.pageTitle || log.pageId}
                          </span>{" "}
                          to a previous version
                        </>
                      ) : log.action === "login" ? (
                        <>
                          Logged in to the admin panel
                        </>
                      ) : (
                        <>
                          Edited{" "}
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {log.pageTitle || log.pageId}
                          </span>
                        </>
                      )}
                    </p>

                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {formatTime(log.createdAt)} · {timeAgo(log.createdAt)}
                    </p>
                  </div>

                  {/* Reset Button */}
                  {log.action === "edit" && (
                    <button
                      onClick={() =>
                        handleReset(log._id, log.pageId, log.createdAt)
                      }
                      disabled={resettingId === log._id}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors disabled:opacity-50 flex-shrink-0"
                      title="Revert page to the state before this edit"
                    >
                      <FaUndo className="text-xs" />
                      {resettingId === log._id ? "Resetting..." : "Reset"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {!loading && filtered.length > 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Showing {filtered.length} log{filtered.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEditLogs;
