import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import { useSearchParams } from "react-router-dom";
import { FaEdit, FaFileAlt, FaSpinner } from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminToolbar from "../../components/admin/AdminToolbar";
import { EditProvider } from "../../contexts/EditContext";
import { ACADEMICS_EDITABLE_PAGES } from "../../constants/academicsPages";
import AcademicPlanner from "../academics/AcademicPlanner";
import AnnualReports from "../academics/AnnualReports";
import IncentiveMarks from "../academics/IncentiveMarks";
import InnovativePractices from "../academics/InnovativePractices";
import Rubrics from "../academics/Rubrics";
import RulesRegulations from "../academics/RulesRegulations";
import SessionalMarks from "../academics/SessionalMarks";
import StudentNotices from "../academics/StudentNotices";
import Syllabus from "../academics/Syllabus";
import TeachingLearning from "../academics/TeachingLearning";
import TimeTable from "../academics/TimeTable";

const ACADEMICS_PAGE_COMPONENTS = {
  "academics-planner": AcademicPlanner,
  "academics-reports": AnnualReports,
  "academics-incentive": IncentiveMarks,
  "academics-innovative": InnovativePractices,
  "academics-rubrics": Rubrics,
  "academics-rules": RulesRegulations,
  "academics-marks": SessionalMarks,
  "academics-notices": StudentNotices,
  "academics-syllabus": Syllabus,
  "academics-teaching": TeachingLearning,
  "academics-timetable": TimeTable,
};

const AdminAcademics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingPage, setEditingPage] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  const findPageMeta = (pageId) =>
    ACADEMICS_EDITABLE_PAGES.find((page) => page.pageId === pageId);

  const fetchPageData = async (pageId) => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/pages/${pageId}`);
      if (res.data.success) {
        setPageData(res.data.data);
        return;
      }
      throw new Error("Page not found");
    } catch (err) {
      if (err?.response?.status === 404 || err?.message === "Page not found") {
        const meta = findPageMeta(pageId);
        try {
          const created = await apiClient.post(
            "/api/pages",
            {
              pageId,
              pageTitle: meta?.label ?? pageId,
              pageDescription: meta?.label ?? pageId,
              route:
                meta?.path ?? `/academics/${pageId.replace("academics-", "")}`,
              category: "academics",
              template: "generic",
              isPublished: true,
              sections: [
                {
                  sectionId: "main-content",
                  title: "",
                  type: "markdown",
                  order: 0,
                  isVisible: true,
                  content: { text: "" },
                },
              ],
            },
            authHeader(),
          );
          setPageData(created.data?.data ?? null);
        } catch {
          setPageData(null);
        }
      } else {
        setPageData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const openPageEditor = (pageId) => {
    if (!findPageMeta(pageId)) return;
    setEditingPage(pageId);
    setSearchParams({ pageId });
    fetchPageData(pageId);
  };

  useEffect(() => {
    const pageId = searchParams.get("pageId");
    if (!pageId || editingPage === pageId || !findPageMeta(pageId)) return;
    openPageEditor(pageId);
  }, [searchParams, editingPage]);

  if (editingPage) {
    const pageMeta = findPageMeta(editingPage);
    const PageComponent = ACADEMICS_PAGE_COMPONENTS[editingPage];

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-orange-500 mx-auto mb-4" />
            <p className="text-gray-500">Loading page content...</p>
          </div>
        </div>
      );
    }

    return (
      <EditProvider key={editingPage} pageId={editingPage} initialData={pageData ?? {}}>
        <div className="pb-20">{PageComponent ? <PageComponent /> : null}</div>
        <AdminToolbar
          title={pageMeta?.label ?? editingPage}
          fallbackPath="/admin/academics"
        />
      </EditProvider>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Academics Content
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage all academic pages in one unified location.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quick Page Selector
          </label>
          <select
            onChange={(e) => e.target.value && openPageEditor(e.target.value)}
            defaultValue=""
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#1a1a2e] dark:text-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Choose a page to edit...</option>
            {ACADEMICS_EDITABLE_PAGES.map((page) => (
              <option key={page.pageId} value={page.pageId}>
                {page.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              All Academics Pages
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Click any page below to edit its content.
            </p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {ACADEMICS_EDITABLE_PAGES.map((page) => (
              <button
                key={page.pageId}
                onClick={() => openPageEditor(page.pageId)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FaFileAlt className="text-gray-400 dark:text-gray-500 group-hover:text-orange-500 transition-colors" />
                  <div>
                    <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {page.label}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                        {page.pageId}
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400">
                        EDITABLE
                      </span>
                    </div>
                  </div>
                </div>
                <FaEdit className="text-gray-300 dark:text-gray-600 group-hover:text-orange-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAcademics;
