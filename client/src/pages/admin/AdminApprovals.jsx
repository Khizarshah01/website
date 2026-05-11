import React, { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import apiClient from "../../utils/apiClient";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";
import {
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaTimes,
  FaUserShield,
} from "react-icons/fa";

const formatDateTime = (value) => {
  if (!value) return "Not available";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getChangedKeys = (before = {}, after = {}) => {
  const keys = new Set([...Object.keys(before || {}), ...Object.keys(after || {})]);
  return [...keys].filter((key) => JSON.stringify(before?.[key]) !== JSON.stringify(after?.[key]));
};

const assessApproval = (approval) => {
  const previousData = approval?.previousData || {};
  const proposedData = approval?.proposedData || {};
  const changedPageFields = ["pageTitle", "pageDescription", "route", "category", "template"].filter(
    (key) => proposedData[key] !== undefined && JSON.stringify(previousData[key]) !== JSON.stringify(proposedData[key]),
  );
  const changedTemplateFields = getChangedKeys(previousData.templateData || {}, proposedData.templateData || {});
  const previousSections = Array.isArray(previousData.sections) ? previousData.sections : [];
  const proposedSections = Array.isArray(proposedData.sections) ? proposedData.sections : [];
  const sectionDelta = Math.abs(previousSections.length - proposedSections.length);

  const notes = [];
  let safe = true;

  if (changedPageFields.includes("route") || changedPageFields.includes("template")) {
    safe = false;
    notes.push("Structure-level settings changed");
  }

  if (sectionDelta > 0) {
    safe = false;
    notes.push("Sections were added or removed");
  }

  if (changedTemplateFields.length >= 6) {
    safe = false;
    notes.push("Large content update detected");
  }

  if (!notes.length && changedTemplateFields.length <= 3 && changedPageFields.length === 0) {
    notes.push("Minor content-only update");
  }

  if (!notes.length) {
    notes.push("Review content once before publishing");
  }

  const summary =
    changedTemplateFields.length > 0
      ? changedTemplateFields.slice(0, 3).join(", ")
      : changedPageFields.length > 0
        ? changedPageFields.join(", ")
        : "content";

  return {
    safe,
    title: safe ? "Safe to approve" : "Needs review",
    note: notes[0],
    summary: `Changed: ${summary}`,
    tone: safe
      ? {
          badge: "bg-gray-100 text-gray-700",
          panel: "border-gray-200 bg-gray-50",
          icon: "text-gray-600",
          title: "text-gray-900",
          text: "text-gray-700",
        }
      : {
          badge: "bg-gray-100 text-gray-700",
          panel: "border-gray-200 bg-gray-50",
          icon: "text-gray-600",
          title: "text-gray-900",
          text: "text-gray-700",
        },
  };
};

const AdminApprovals = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");

  const fetchApprovals = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await apiClient.get("/pages/approvals?status=all&limit=100");
      setApprovals(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      logUnexpectedError("Error fetching approvals:", err);
      setError(getErrorMessage(err, "Failed to load approval requests"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  const handleDecision = async (approvalId, action) => {
    if (!approvalId || !action) return;
    setProcessingId(approvalId);
    try {
      await apiClient.post(`/pages/approvals/${approvalId}/${action}`, {});
      await fetchApprovals();
    } catch (err) {
      setError(getErrorMessage(err, `Failed to ${action} request`));
    } finally {
      setProcessingId("");
    }
  };

  const counts = useMemo(
    () => ({
      pending: approvals.filter((item) => item.status === "pending").length,
      approved: approvals.filter((item) => item.status === "approved").length,
      rejected: approvals.filter((item) => item.status === "rejected").length,
    }),
    [approvals],
  );

  const visibleApprovals = useMemo(
    () =>
      filterStatus === "all"
        ? approvals
        : approvals.filter((item) => item.status === filterStatus),
    [approvals, filterStatus],
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              <FaUserShield className="mr-3 inline-block text-[#003366]" />
              Change Approvals
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Quick approval guidance for coordinator-submitted changes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Pending</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{counts.pending}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Approved</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{counts.approved}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Rejected</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{counts.rejected}</p>
          </div>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-[#1a1a2e]">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" />
            <p className="text-gray-500 dark:text-gray-400">Loading approval requests...</p>
          </div>
        ) : visibleApprovals.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-[#1a1a2e]">
            <FaClock className="mx-auto mb-4 text-5xl text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">No approval requests found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleApprovals.map((approval) => {
              const assessment = assessApproval(approval);
              const SafetyIcon = assessment.safe ? FaCheckCircle : FaExclamationTriangle;

              return (
                <div
                  key={approval._id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1a1a2e]"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {approval.pageTitle || approval.pageId}
                        </h3>
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                          {approval.pageId}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${assessment.tone.badge}`}
                        >
                          {assessment.title}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                        <span>{approval.requestedByName}</span>
                        <span>{approval.requestedByDepartment || "Department"}</span>
                        <span>{formatDateTime(approval.updatedAt)}</span>
                      </div>

                      <div className={`mt-4 rounded-2xl border p-4 ${assessment.tone.panel}`}>
                        <div className="flex items-start gap-3">
                          <SafetyIcon className={`mt-0.5 text-lg ${assessment.tone.icon}`} />
                          <div>
                            <p className={`text-sm font-semibold ${assessment.tone.title}`}>{assessment.title}</p>
                            <p className={`mt-1 text-sm ${assessment.tone.text}`}>{assessment.note}</p>
                            <p className={`mt-2 text-sm ${assessment.tone.text}`}>{assessment.summary}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {approval.status === "pending" ? (
                      <div className="flex shrink-0 gap-3">
                        <button
                          type="button"
                          disabled={processingId === approval._id}
                          onClick={() => handleDecision(approval._id, "approve")}
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                          <FaCheck className="text-xs" />
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={processingId === approval._id}
                          onClick={() => handleDecision(approval._id, "reject")}
                          className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                        >
                          <FaTimes className="text-xs" />
                          Reject
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminApprovals;
