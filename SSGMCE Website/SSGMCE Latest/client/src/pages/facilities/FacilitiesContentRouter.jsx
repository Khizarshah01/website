import { Navigate, useLocation } from "react-router-dom";
import GenericContentPage from "../../components/GenericContentPage";

const FACILITIES_PAGE_MAP = {
  "/facilities/library": "facilities-library",
  "/facilities/library/about": "facilities-library-about",
  "/facilities/library/books": "facilities-library-books",
  "/facilities/library/book-details": "facilities-library-books",
  "/facilities/library/coursera": "facilities-library-coursera",
  "/facilities/library/facilities": "facilities-library-facilities",
  "/facilities/library/rules": "facilities-library-rules",
  "/facilities/library/services": "facilities-library-services",
  "/facilities/library/staff": "facilities-library-staff",
  "/facilities/library/nptel": "facilities-library-nptel",
  "/facilities/library/nptel-faculty": "facilities-library-nptel-faculty",
  "/facilities/library/nptel-students": "facilities-library-nptel-students",
  "/facilities/library/hours": "facilities-library-hours",
  "/facilities/hostels": "facilities-hostels",
  "/facilities/hostel": "facilities-hostels",
  "/facilities/hostel/aicte": "facilities-hostel-aicte",
  "/facilities/hostel/aicte-letters": "facilities-hostel-aicte",
  "/facilities/hostel/anti-ragging": "facilities-hostel-anti-ragging",
  "/facilities/hostel/anti-ragging-committee": "facilities-hostel-anti-ragging",
  "/facilities/hostel/notices": "facilities-hostel-notices",
  "/facilities/hostel/anti-ragging-notices": "facilities-hostel-notices",
  "/facilities/hostel/posters": "facilities-hostel-posters",
  "/facilities/hostel/anti-ragging-posters": "facilities-hostel-posters",
  "/facilities/hostel/reports": "facilities-hostel-reports",
  "/facilities/hostel/anti-ragging-reports": "facilities-hostel-reports",
  "/facilities/hostel/accommodation": "facilities-hostel-accommodation",
  "/facilities/hostel/admission": "facilities-hostel-admission",
  "/facilities/hostel/admission-form": "facilities-hostel-admission",
  "/facilities/hostel/brochure": "facilities-hostel-brochure",
  "/facilities/hostel/committee": "facilities-hostel-committee",
  "/facilities/hostel/fees": "facilities-hostel-fees",
  "/facilities/hostel/fee-structure": "facilities-hostel-fees",
  "/facilities/hostel/feedback": "facilities-hostel-feedback",
  "/facilities/hostel/policy": "facilities-hostel-policy",
  "/facilities/hostel/minutes": "facilities-hostel-minutes",
  "/facilities/sports": "facilities-sports",
  "/facilities/sports/about": "facilities-sports-about",
  "/facilities/sports/indoor": "facilities-sports-indoor",
  "/facilities/sports/outdoor": "facilities-sports-outdoor",
  "/facilities/sports/staff": "facilities-sports-staff",
  "/facilities/sports/statistics": "facilities-sports-statistics",
  "/facilities/sports/achievements": "facilities-sports-achievements",
  "/facilities/sports/council": "facilities-sports-council",
  "/facilities/other": "facilities-other",
  "/facilities/other/transportation": "facilities-other-transportation",
  "/facilities/other/medical": "facilities-other-medical",
  "/facilities/other/dining": "facilities-other-dining",
  "/facilities/other/services": "facilities-other-services",
  "/facilities/computing": "facilities-computing",
  "/facilities/computing/labs": "facilities-computing-labs",
  "/facilities/computing/software": "facilities-computing-software",
  "/facilities/computing/network": "facilities-computing-network",
  "/facilities/computing/support": "facilities-computing-support",
};

const normalizePath = (pathname) => {
  if (!pathname) {
    return "/";
  }

  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
};

const FacilitiesContentRouter = () => {
  const { pathname } = useLocation();
  const normalizedPath = normalizePath(pathname);
  const pageId = FACILITIES_PAGE_MAP[normalizedPath];

  if (!pageId) {
    return <Navigate to="/404" replace />;
  }

  return <GenericContentPage pageId={pageId} />;
};

export default FacilitiesContentRouter;
