import React, { useEffect, useRef, useState } from "react";
import { useParams, Navigate, useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import { EditProvider } from "../../contexts/EditContext";
import { useTheme } from "../../contexts/ThemeContext";
import GenericContentPage from "../../components/GenericContentPage";
import AdminToolbar from "../../components/admin/AdminToolbar";
import { FaSpinner, FaPlus } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { ADMIN_ROUTE_PREFIX } from "../../config/adminAccess";
import Electrical from "../../pages/departments/Electrical";
import CSE from "../../pages/departments/CSE";
import Mechanical from "../../pages/departments/Mechanical";
import EnTC from "../../pages/departments/EnTC";
import IT from "../../pages/departments/IT";
import MBA from "../../pages/departments/MBA";
import AppliedSciences from "../../pages/departments/AppliedSciences";
import NIRFRankingPage from "../../pages/NIRFRanking";
import { goBackOrFallback } from "../../utils/navigation";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";

// Map User-model department codes → the pageId the coordinator owns
const DEPT_TO_PAGEID = {
  CSE: "departments-cse",
  IT: "departments-it",
  MECH: "departments-mechanical",
  ELECTRICAL: "departments-electrical",
  ENTC: "departments-entc",
  MBA: "departments-mba",
  ASH: "departments-applied-sciences",
};

// Valid top-level department pageIds — sub-pages must NOT be created as standalone
const VALID_DEPT_PAGEIDS = new Set([
  "departments-cse",
  "departments-it",
  "departments-entc",
  "departments-electrical",
  "departments-mechanical",
  "departments-mba",
  "departments-applied-sciences",
]);

/** Derive a human-readable title and category from a pageId slug */
const derivePageMeta = (pageId) => {
  const parts = pageId.split("-");
  let category = parts[0]; // e.g. "placements", "iqac"
  // If it looks like a department sub-page but isn't a known top-level dept, recategorize as 'other'
  if (category === "departments" && !VALID_DEPT_PAGEIDS.has(pageId)) {
    category = "other";
  }
  const titleWords = parts
    .slice(1)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  const pageTitle = titleWords.join(" ") || pageId;
  // Build a route: placements-about → /placements/about
  const route = "/" + parts.join("/");
  return { pageTitle, category, route };
};

const VisualPageEditor = () => {
  const { pageId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isCoordinator, userDepartment } = useAuth();
  const { theme, setTheme } = useTheme();
  const prevThemeRef = useRef(theme);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [creating, setCreating] = useState(false);

  // Force light theme while editing; restore previous theme on exit
  useEffect(() => {
    prevThemeRef.current = theme;
    if (theme !== "light") setTheme("light");
    return () => {
      if (prevThemeRef.current !== "light") setTheme(prevThemeRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Coordinators may only edit their own department page
  if (isCoordinator && userDepartment !== "All") {
    const allowed = DEPT_TO_PAGEID[userDepartment];
    if (!allowed || pageId !== allowed) {
      return <Navigate to={ADMIN_ROUTE_PREFIX} replace />;
    }
  }

  if (pageId?.startsWith("academics-")) {
    return (
      <Navigate
        to={`/admin/academics?pageId=${pageId}`}
        state={location.state}
        replace
      />
    );
  }

  useEffect(() => {
    const fetchPageData = async () => {
      if (!pageId) return;

      setLoading(true);
      setPageNotFound(false);
      setError(null);
      try {
        const res = await apiClient.get(`/pages/${pageId}`);
        if (res.data.success) {
          setInitialData(res.data.data);
        } else {
          setError(res.data.message || "Page not found");
          setPageNotFound(true);
        }
      } catch (err) {
        logUnexpectedError("Error fetching page for editor:", err);
        if (err.response?.status === 404) {
          setPageNotFound(true);
        }
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [pageId]);

  /** Admin creates a brand-new empty page in the DB */
  const handleCreatePage = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("You must be logged in as admin to create a page.");
      return;
    }
    setCreating(true);
    try {
      const { pageTitle, category, route } = derivePageMeta(pageId);
      const res = await apiClient.post(
        "/api/pages",
        {
          pageId,
          pageTitle,
          pageDescription: "",
          route,
          category,
          sections: [],
          template: "generic",
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.data.success) {
        setInitialData(res.data.data);
        setError(null);
        setPageNotFound(false);
      } else {
        setError(res.data.message || "Failed to create page.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (error || pageNotFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            {pageNotFound ? "Page Not Found in Database" : "Error"}
          </h2>
          <p className="text-gray-600 mb-6">
            {pageNotFound
              ? `The page "${pageId}" does not exist yet. You can create it now as an empty page and start adding content.`
              : error}
          </p>
          {pageNotFound && (
            <button
              onClick={handleCreatePage}
              disabled={creating}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 mb-4 font-medium shadow"
            >
              {creating ? <FaSpinner className="animate-spin" /> : <FaPlus />}
              {creating ? "Creating…" : "Create This Page"}
            </button>
          )}
          <div>
            <a href="/admin" className="text-blue-600 hover:underline text-sm">
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (pageId === "nirf-ranking") {
      return <NIRFRankingPage />;
    }
    if (initialData?.template === "department") {
      switch (initialData?.pageId) {
        case "departments-electrical":
          return <Electrical />;
        case "departments-cse":
          return <CSE />;
        case "departments-mechanical":
          return <Mechanical />;
        case "departments-entc":
          return <EnTC />;
        case "departments-it":
          return <IT />;
        case "departments-mba":
          return <MBA />;
        case "departments-applied-sciences":
          return <AppliedSciences />;
        default:
          return <GenericContentPage pageId={pageId} />;
      }
    }
    return <GenericContentPage pageId={pageId} />;
  };

  return (
    <EditProvider initialData={initialData} pageId={pageId}>
      {/* 
        We render the toolbar OUTSIDE the content flow so it overlays.
        This preserves the exact CSS of the page.
      */}
      <AdminToolbar title={initialData?.pageTitle} />

      <div className="pb-20">
        {" "}
        {/* Add padding at bottom so toolbar doesn't cover footer */}
        {renderContent()}
      </div>
    </EditProvider>
  );
};

export default VisualPageEditor;
