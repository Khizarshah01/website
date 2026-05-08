import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  ACADEMICS_PAGE_LABEL_BY_ROUTE,
  ACADEMICS_PAGE_ORDER_BY_ROUTE,
  isAcademicsWebsiteRoute,
} from "../../constants/academicsPages";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";
import {
  FaSearch,
  FaChevronRight,
  FaChevronDown,
  FaBook,
  FaHome,
  FaTrophy,
  FaCogs,
  FaLaptop,
  FaIdCard,
} from "react-icons/fa";

const CATEGORY_ORDER = [
  "about",
  "nirf",
  "academics",
  "admissions",
  "research",
  "facilities",
  "placements",
  "iqac",
  "documents",
  "activities",
  "departments",
];

const CATEGORY_COLORS = {
  about: "#3b82f6",
  nirf: "#e11d48",
  academics: "#06b6d4",
  admissions: "#a855f7",
  research: "#ec4899",
  facilities: "#10b981",
  placements: "#f97316",
  iqac: "#6366f1",
  documents: "#64748b",
  activities: "#8b5cf6",
  departments: "#f59e0b",
};

const NAVBAR_ROUTE_ORDER = {
  about: [
    "/about",
    "/about/vision",
    "/about/inspiration",
    "/about/principal",
    "/about/structure",
    "/about/governing",
    "/about/directors",
    "/about/committees",
    "/contact",
  ],
  academics: [
    "/academics/planner",
    "/academics/teaching",
    "/academics/timetable",
    "/academics/rules",
    "/academics/syllabus",
    "/academics/incentive",
    "/academics/marks",
    "/academics/rubrics",
    "/academics/innovative",
    "/academics/notices",
    "/academics/reports",
  ],
  admissions: [
    "/admissions/brochure",
    "/admissions/ug",
    "/admissions/pg",
    "/admissions/dse",
    "/admissions/mba",
    "/admissions/phd",
    "/admissions/fees",
  ],
  research: [
    "/research/rdc",
    "/research/policy",
    "/research/coe",
    "/research/publications",
    "/research/ipr",
    "/research/ug-projects",
    "/research/phd",
    "/research/collaboration",
    "/research/iic",
    "/research/nisp",
    "/research/sabbatical",
  ],
  facilities: [
    "/facilities/admin",
    "/facilities/library",
    "/facilities/hostels",
    "/facilities/sports",
    "/facilities/other",
    "/facilities/computing",
  ],
  placements: [
    "/placements/brochure",
    "/placements/about",
    "/placements/objectives",
    "/placements/goals",
    "/placements/coordinators",
    "/placements/activities",
    "/placements/statistics",
    "/placements/recruiters",
    "/placements/career",
    "/placements/internship",
    "/contact",
  ],
  iqac: [
    "/iqac/vision",
    "/iqac/composition",
    "/iqac/minutes",
    "/iqac/practices",
    "/iqac/distinctiveness",
    "/iqac/aqar",
    "/iqac/naac",
    "/iqac/feedback",
    "/iqac/analysis",
    "/iqac/survey",
    "/iqac/gender",
    "/iqac/equity",
    "/iqac/econtent",
    "/iqac/econtent-facility",
  ],
  documents: [
    "/documents/policies",
    "/documents/disclosure",
    "/documents/naac",
    "/documents/nba",
    "/documents/iso",
    "/documents/nirf",
    "/documents/audit",
    "/documents/aicte",
    "/documents/financial",
    "/documents/newsletter",
    "/documents/tattwadarshi",
  ],
  activities: [
    "/activities/innovo",
    "/activities/drone",
    "/activities/gdg",
    "/activities/pursuit",
    "/activities/parishkriti",
    "/activities/social",
    "/activities/cultural",
    "/activities/ieee",
    "/activities/iste",
    "/activities/ecell",
    "/activities/sae",
    "/activities/xtreme",
    "/activities/iei-mech",
    "/activities/iei-elpo",
    "/activities/acm",
    "/activities/mesa",
    "/activities/essa",
    "/activities/csesa",
    "/activities/mozilla",
    "/activities/itsa",
    "/activities/nss",
    "/activities/uba",
  ],
  departments: [
    "/departments/applied-sciences",
    "/departments/cse",
    "/departments/electrical",
    "/departments/entc",
    "/departments/it",
    "/departments/mechanical",
    "/departments/mba",
  ],
};

const normalizeRoute = (route = "") =>
  String(route || "")
    .trim()
    .toLowerCase()
    .replace(/\/+$/, "");

const ADMIN_OFFICE_PAGE_PREFIX = "facilities-admin-office-";
const ADMIN_OFFICE_ROUTE_PREFIX = "/facilities/admin-office/";
const isAdminOfficePageId = (pageId = "") =>
  String(pageId || "").startsWith(ADMIN_OFFICE_PAGE_PREFIX);

// Valid top-level department pageIds — orphan sub-pages should be excluded
const VALID_DEPT_PAGEIDS = new Set([
  "departments-cse",
  "departments-it",
  "departments-entc",
  "departments-electrical",
  "departments-mechanical",
  "departments-mba",
  "departments-applied-sciences",
]);

const isLegacyAcademicsPage = (page) =>
  (page.category || "").toLowerCase() === "academics" &&
  !isAcademicsWebsiteRoute(page.route);

// Valid admissions pageIds — only these 13 pages should appear in admissions
const VALID_ADMISSIONS_PAGEIDS = new Set([
  "admissions-brochure",
  "admissions-ug",
  "admissions-pg",
  "admissions-dse",
  "admissions-mba",
  "admissions-phd",
  "admissions-fees",
  "admissions-process",
  "admissions-seat-matrix",
  "admissions-documents",
  "admissions-scholarships",
  "admissions-faqs",
  "admissions-contact",
]);

// Valid facilities pageIds — only these should appear in the admin panel
const VALID_FACILITIES_PAGEIDS = new Set([
  "facilities-administrative-office",
  "facilities-computing",
  "facilities-hostel-accommodation",
  "facilities-hostel-admission",
  "facilities-hostel-aicte",
  "facilities-hostel-anti-ragging",
  "facilities-hostel-brochure",
  "facilities-hostel-committee",
  "facilities-hostel-feedback",
  "facilities-hostel-fees",
  "facilities-hostel-minutes",
  "facilities-hostel-notices",
  "facilities-hostel-policy",
  "facilities-hostel-posters",
  "facilities-hostel-reports",
  "facilities-hostels",
  "facilities-library",
  "facilities-library-about",
  "facilities-library-books",
  "facilities-library-coursera",
  "facilities-library-facilities",
  "facilities-library-hours",
  "facilities-library-nptel",
  "facilities-library-nptel-faculty",
  "facilities-library-nptel-students",
  "facilities-library-rules",
  "facilities-library-services",
  "facilities-library-staff",
  "facilities-other",
  "facilities-sports",
  "facilities-sports-about",
  "facilities-sports-achievements",
  "facilities-sports-council",
  "facilities-sports-indoor",
  "facilities-sports-outdoor",
  "facilities-sports-staff",
  "facilities-sports-statistics",
]);

// Facilities hierarchy for admin page list (same order as frontend sidebar)
const FACILITIES_NESTED = [
  {
    label: "Central Library",
    icon: FaBook,
    parentId: "facilities-library",
    children: [
      "facilities-library-about",
      "facilities-library-rules",
      "facilities-library-hours",
      "facilities-library-services",
      "facilities-library-facilities",
      "facilities-library-nptel",
      "facilities-library-nptel-faculty",
      "facilities-library-nptel-students",
      "facilities-library-coursera",
      "facilities-library-books",
      "facilities-library-staff",
    ],
  },
  {
    label: "Hostel",
    icon: FaHome,
    parentId: "facilities-hostels",
    children: [
      "facilities-hostel-policy",
      "facilities-hostel-committee",
      "facilities-hostel-brochure",
      "facilities-hostel-anti-ragging",
      "facilities-hostel-minutes",
      "facilities-hostel-reports",
      "facilities-hostel-posters",
      "facilities-hostel-aicte",
      "facilities-hostel-notices",
      "facilities-hostel-fees",
      "facilities-hostel-accommodation",
      "facilities-hostel-admission",
      "facilities-hostel-feedback",
    ],
  },
  {
    label: "Sports",
    icon: FaTrophy,
    parentId: "facilities-sports",
    children: [
      "facilities-sports-about",
      "facilities-sports-council",
      "facilities-sports-indoor",
      "facilities-sports-outdoor",
      "facilities-sports-achievements",
      "facilities-sports-statistics",
      "facilities-sports-staff",
    ],
  },
  {
    label: "Other Facilities",
    icon: FaCogs,
    parentId: "facilities-other",
    children: [],
  },
  {
    label: "Central Computing Facility",
    icon: FaLaptop,
    parentId: "facilities-computing",
    children: [],
  },
  {
    label: "Administrative Office",
    icon: FaIdCard,
    parentId: "facilities-administrative-office",
    children: [],
  },
];

const AdminPages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || "all",
  );
  const [expanded, setExpanded] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleCategory = (cat) =>
    setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }));
  const toggleGroup = (key) =>
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
    setCategoryFilter(searchParams.get("category") || "all");
  }, [searchParams]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);
    if (searchTerm) {
      nextParams.set("q", searchTerm);
    } else {
      nextParams.delete("q");
    }

    if (categoryFilter && categoryFilter !== "all") {
      nextParams.set("category", categoryFilter);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams, { replace: true });
  }, [searchTerm, categoryFilter]);

  const fetchPages = async () => {
    try {
      const res = await apiClient.get("/pages");
      if (res.data.success) {
        setPages(res.data.data || []);
        setError("");
      }
    } catch (err) {
      logUnexpectedError("Error fetching pages:", err);
      setError(getErrorMessage(err, "Failed to load pages"));
    } finally {
      setLoading(false);
    }
  };

  const visiblePages = pages.filter((page) => {
    if (isLegacyAcademicsPage(page)) {
      return false;
    }
    if (
      page.category === "departments" &&
      !VALID_DEPT_PAGEIDS.has(page.pageId)
    ) {
      return false;
    }
    if (
      page.category === "admissions" &&
      !VALID_ADMISSIONS_PAGEIDS.has(page.pageId)
    ) {
      return false;
    }
    if (
      page.category === "facilities" &&
      !VALID_FACILITIES_PAGEIDS.has(page.pageId) &&
      !isAdminOfficePageId(page.pageId)
    ) {
      return false;
    }
    return true;
  });

  const categories = [
    "all",
    ...new Set(visiblePages.map((p) => p.category || "Uncategorized")),
  ].sort((a, b) => {
    const normalize = (value) => String(value || "").toLowerCase();
    const aKey = normalize(a);
    const bKey = normalize(b);
    if (aKey === "all") return -1;
    if (bKey === "all") return 1;
    const ai = CATEGORY_ORDER.indexOf(aKey);
    const bi = CATEGORY_ORDER.indexOf(bKey);
    if (ai !== -1 || bi !== -1) {
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    }
    return aKey.localeCompare(bKey);
  });

  const filteredPages = visiblePages.filter((page) => {
    const normalizedCategory = (page.category || "").toLowerCase();
    const effectiveTitle =
      normalizedCategory === "academics"
        ? ACADEMICS_PAGE_LABEL_BY_ROUTE[page.route] || page.pageTitle
        : page.pageTitle;
    const matchesSearch =
      effectiveTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      normalizedCategory.includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || page.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const groupedPages = filteredPages.reduce((acc, page) => {
    const cat = page.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(page);
    return acc;
  }, {});

  const sortPagesByNavbarOrder = (category, categoryPages) => {
    if (String(category || "").toLowerCase() === "academics") {
      return [...categoryPages].sort(
        (a, b) =>
          (ACADEMICS_PAGE_ORDER_BY_ROUTE[a.route] ?? Number.MAX_SAFE_INTEGER) -
          (ACADEMICS_PAGE_ORDER_BY_ROUTE[b.route] ?? Number.MAX_SAFE_INTEGER),
      );
    }

    const routeOrder = NAVBAR_ROUTE_ORDER[String(category || "").toLowerCase()] || [];
    const routeIndex = new Map(
      routeOrder.map((route, index) => [normalizeRoute(route), index]),
    );

    const sorted = [...categoryPages].sort((a, b) => {
      const aRouteIndex = routeIndex.has(normalizeRoute(a?.route))
        ? routeIndex.get(normalizeRoute(a?.route))
        : Number.MAX_SAFE_INTEGER;
      const bRouteIndex = routeIndex.has(normalizeRoute(b?.route))
        ? routeIndex.get(normalizeRoute(b?.route))
        : Number.MAX_SAFE_INTEGER;
      if (aRouteIndex !== bRouteIndex) return aRouteIndex - bRouteIndex;

      const aNavOrder = Number.isFinite(a?.navOrder)
        ? a.navOrder
        : Number.MAX_SAFE_INTEGER;
      const bNavOrder = Number.isFinite(b?.navOrder)
        ? b.navOrder
        : Number.MAX_SAFE_INTEGER;
      if (aNavOrder !== bNavOrder) return aNavOrder - bNavOrder;

      const aMenuOrder = Number.isFinite(Number(a?.menuOrder))
        ? Number(a.menuOrder)
        : Number.MAX_SAFE_INTEGER;
      const bMenuOrder = Number.isFinite(Number(b?.menuOrder))
        ? Number(b.menuOrder)
        : Number.MAX_SAFE_INTEGER;
      if (aMenuOrder !== bMenuOrder) return aMenuOrder - bMenuOrder;

      return String(a?.pageTitle || "").localeCompare(
        String(b?.pageTitle || ""),
      );
    });

    const deduped = [];
    const seenRoutes = new Set();
    sorted.forEach((page) => {
      const routeKey = normalizeRoute(page?.route);
      if (routeKey && seenRoutes.has(routeKey)) return;
      if (routeKey) seenRoutes.add(routeKey);
      deduped.push(page);
    });

    return deduped;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-400 dark:text-gray-500 animate-pulse">
            Loading pages...
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : null}
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Pages
            </h1>
            <p className="text-base text-gray-400 dark:text-gray-500 mt-0.5">
              {filteredPages.length} of {visiblePages.length} pages
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 text-base rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 w-52 focus:w-64 transition-all focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-base rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none appearance-none pr-7"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200/80 dark:border-gray-800 overflow-hidden">
          {Object.entries(groupedPages)
            .sort(([a], [b]) => {
              const ai = CATEGORY_ORDER.indexOf(a.toLowerCase());
              const bi = CATEGORY_ORDER.indexOf(b.toLowerCase());
              return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
            })
            .map(([category, categoryPages], idx) => {
              const color =
                CATEGORY_COLORS[category.toLowerCase()] || "#6b7280";
              const isOpen = expanded[category];
              const orderedPages = sortPagesByNavbarOrder(category, categoryPages);
              const midpoint = Math.ceil(orderedPages.length / 2);
              const leftColumnPages = orderedPages.slice(0, midpoint);
              const rightColumnPages = orderedPages.slice(midpoint);
              return (
                <div key={category}>
                  {/* Category Row */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${idx > 0 ? "border-t border-gray-100 dark:border-gray-800" : ""}`}
                  >
                    {isOpen ? (
                      <FaChevronDown className="text-xs text-gray-400 dark:text-gray-500" />
                    ) : (
                      <FaChevronRight className="text-xs text-gray-400 dark:text-gray-500" />
                    )}
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-base font-semibold text-gray-600 dark:text-gray-300 capitalize tracking-wide">
                      {category}
                    </span>
                    <span className="text-sm text-gray-400 dark:text-gray-500 ml-1">
                      {orderedPages.length}
                    </span>
                  </button>

                  {/* Pages */}
                  {isOpen && category === "facilities" && (
                    <div className="border-t border-gray-100 dark:border-gray-800/60">
                      {(() => {
                        const pageMap = new Map(orderedPages.map((p) => [p.pageId, p]));
                        const term = searchTerm.toLowerCase();

                        return FACILITIES_NESTED.map((group) => {
                          const Icon = group.icon;
                          const parentPage = pageMap.get(group.parentId);
                          const childPages =
                            group.parentId === "facilities-administrative-office"
                              ? orderedPages
                                  .filter(
                                    (page) =>
                                      isAdminOfficePageId(page.pageId) &&
                                      normalizeRoute(page.route).startsWith(
                                        ADMIN_OFFICE_ROUTE_PREFIX,
                                      ),
                                  )
                                  .sort((a, b) => {
                                    const routeA = normalizeRoute(a.route);
                                    const routeB = normalizeRoute(b.route);
                                    return routeA.localeCompare(routeB);
                                  })
                              : group.children
                                  .map((id) => pageMap.get(id))
                                  .filter(Boolean);

                          if (term) {
                            const groupMatches =
                              group.label.toLowerCase().includes(term) ||
                              parentPage?.pageTitle?.toLowerCase().includes(term);
                            const matchingChildren = childPages.filter((p) =>
                              p.pageTitle.toLowerCase().includes(term),
                            );
                            if (!groupMatches && matchingChildren.length === 0) {
                              return null;
                            }
                          }

                          const groupOpen = expandedGroups[group.parentId];
                          const hasChildren = childPages.length > 0;

                          return (
                            <div key={group.parentId}>
                              <div className="flex items-center border-b border-gray-100 dark:border-gray-800/40">
                                {hasChildren ? (
                                  <button
                                    onClick={() => toggleGroup(group.parentId)}
                                    className="flex items-center gap-2 pl-8 pr-2 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors flex-shrink-0"
                                  >
                                    {groupOpen ? (
                                      <FaChevronDown className="text-[10px]" />
                                    ) : (
                                      <FaChevronRight className="text-[10px]" />
                                    )}
                                    <Icon className="text-sm text-emerald-600 dark:text-emerald-400" />
                                  </button>
                                ) : (
                                  <span className="flex items-center gap-2 pl-8 pr-2 py-2 flex-shrink-0">
                                    <span className="w-[10px]" />
                                    <Icon className="text-sm text-emerald-600 dark:text-emerald-400" />
                                  </span>
                                )}
                                <Link
                                  to={`/admin/visual/${group.parentId}`}
                                  className="flex-1 flex items-center py-2 pr-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                                >
                                  <span className="flex-1 text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {group.label}
                                  </span>
                                  {hasChildren && (
                                    <span className="text-xs text-gray-400 dark:text-gray-500 mr-2">
                                      {childPages.length}
                                    </span>
                                  )}
                                  <FaChevronRight className="text-[10px] text-gray-200 dark:text-gray-700 group-hover:text-blue-400 flex-shrink-0 transition-colors" />
                                </Link>
                              </div>

                              {hasChildren && groupOpen && (
                                <div className="bg-gray-50/50 dark:bg-gray-900/20 grid grid-cols-2 gap-x-0">
                                  {childPages.map((page) => {
                                    if (
                                      term &&
                                      !page.pageTitle.toLowerCase().includes(term) &&
                                      !group.label.toLowerCase().includes(term)
                                    ) {
                                      return null;
                                    }

                                    return (
                                      <Link
                                        key={page.pageId}
                                        to={`/admin/visual/${page.pageId}`}
                                        className="flex items-center px-4 py-1.5 pl-[4.5rem] border-b border-gray-100/70 dark:border-gray-800/30 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                                      >
                                        <span className="flex-1 text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                          {page.pageTitle}
                                        </span>
                                        <FaChevronRight className="text-[9px] text-gray-200 dark:text-gray-700 group-hover:text-blue-400 ml-2 flex-shrink-0 transition-colors" />
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  )}

                  {isOpen && category !== "facilities" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-100 dark:border-gray-800/60">
                      <div>
                        {leftColumnPages.map((page) => (
                          <Link
                            key={page.pageId}
                            to={`/admin/visual/${page.pageId}`}
                            className="flex items-center px-4 py-2 pl-11 border-b border-gray-50 dark:border-gray-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                          >
                            <span className="flex-1 text-base text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                              {category.toLowerCase() === "academics"
                                ? ACADEMICS_PAGE_LABEL_BY_ROUTE[page.route] || page.pageTitle
                                : page.pageTitle}
                            </span>
                            <FaChevronRight className="text-[10px] text-gray-200 dark:text-gray-700 group-hover:text-blue-400 ml-2 flex-shrink-0 transition-colors" />
                          </Link>
                        ))}
                      </div>
                      <div className="md:border-l md:border-gray-100 dark:md:border-gray-800/60">
                        {rightColumnPages.map((page) => (
                          <Link
                            key={page.pageId}
                            to={`/admin/visual/${page.pageId}`}
                            className="flex items-center px-4 py-2 pl-11 border-b border-gray-50 dark:border-gray-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                          >
                            <span className="flex-1 text-base text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                              {category.toLowerCase() === "academics"
                                ? ACADEMICS_PAGE_LABEL_BY_ROUTE[page.route] || page.pageTitle
                                : page.pageTitle}
                            </span>
                            <FaChevronRight className="text-[10px] text-gray-200 dark:text-gray-700 group-hover:text-blue-400 ml-2 flex-shrink-0 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          {Object.keys(groupedPages).length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-400 dark:text-gray-500">
                No pages match your search
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPages;
