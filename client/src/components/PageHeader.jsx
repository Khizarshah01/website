import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import defaultHeaderBackground from "../assets/images/navbar/about.jpg";
import academicsHeaderBackground from "../assets/images/navbar/Academics.JPG";
import activitiesHeaderBackground from "../assets/images/navbar/activities.png";
import admissionsHeaderBackground from "../assets/images/navbar/admissions.jpg";
import documentsHeaderBackground from "../assets/images/navbar/documents.jpg";
import facilitiesHeaderBackground from "../assets/images/home/Main-Gate.jpeg";
import iqacHeaderBackground from "../assets/images/navbar/IQAC.png";
import nirfHeaderBackground from "../assets/images/navbar/nirf.png";
import placementsHeaderBackground from "../assets/images/navbar/placements.png";
import researchHeaderBackground from "../assets/images/navbar/research.jpg";
import cseHeaderBackground from "../assets/images/departments/cse/Cse banner.png";
import itHeaderBackground from "../assets/images/departments/it/IT banner.png";
import mechanicalHeaderBackground from "../assets/images/departments/mechanical/Mechnical banner.png";
import electricalHeaderBackground from "../assets/images/departments/electrical/Electrical Banner.png";
import electronicsHeaderBackground from "../assets/images/departments/electronics/Electronics Banner.png";
import appliedSciencesHeaderBackground from "../assets/images/departments/applied-sciences/banner.png";
import mbaHeaderBackground from "../assets/images/departments/mba/MBA banner.png";

const HEADER_IMAGE_RULES = [
  { test: /computer science|cse|software/i, image: cseHeaderBackground },
  { test: /information technology|\bit\b/i, image: itHeaderBackground },
  { test: /mechanical/i, image: mechanicalHeaderBackground },
  { test: /electrical/i, image: electricalHeaderBackground },
  { test: /electronics|entc|entertainment and communication|telecommunication/i, image: electronicsHeaderBackground },
  { test: /applied sciences|science|basic sciences|ash/i, image: appliedSciencesHeaderBackground },
  { test: /mba|management/i, image: mbaHeaderBackground },
  { test: /academics?|course|syllabus|timetable|planner|teaching|rules|marks|rubrics|notice/i, image: academicsHeaderBackground },
  { test: /activity|event|chapter|nss|ieee|iste|mesa|essa|csesa|itsa|cultural|innovo/i, image: activitiesHeaderBackground },
  { test: /admission|fee structure|fees|brochure|seat matrix|documents required|scholarship|faq/i, image: admissionsHeaderBackground },
  { test: /document|naac|nba|iso|mandatory|aicte|policy|financial|newsletter|tattwadarshi/i, image: documentsHeaderBackground },
  { test: /facility|facilities|library|hostel|sports|computing|laborator/i, image: facilitiesHeaderBackground },
  { test: /iqac|quality|feedback|aqar|naac-ssr|gender|equity|e-content/i, image: iqacHeaderBackground },
  { test: /nirf|ranking/i, image: nirfHeaderBackground },
  { test: /placement|recruiter|alumni|internship|career|training/i, image: placementsHeaderBackground },
  { test: /research|innovation|patent|publication|ipr|project|phd|coe|collaboration/i, image: researchHeaderBackground },
];

const pickHeaderBackground = (title = "") => {
  const normalizedTitle = String(title || "").toLowerCase();
  const match = HEADER_IMAGE_RULES.find((rule) => rule.test.test(normalizedTitle));
  return match?.image || defaultHeaderBackground;
};

/* ═══════════════════════════════════════════════════════════════
   Breadcrumb mapping – path segment → human‑readable label
   ═══════════════════════════════════════════════════════════════ */
const SEGMENT_LABELS = {
  /* Top-level sections */
  about: "About",
  academics: "Academics",
  admissions: "Admissions",
  research: "Research & Innovation",
  facilities: "Facilities",
  placements: "Placements",
  iqac: "IQAC",
  nirf: "NIRF Ranking",
  documents: "Documents",
  departments: "Departments",
  activities: "Activities",
  events: "Events",
  gallery: "Gallery",
  contact: "Contact",
  news: "News",
  faculty: "Faculty",

  /* About sub-pages */
  vision: "Vision-Mission, Core Values & Goals",
  inspiration: "Our Inspiration",
  principal: "Principal Speaks",
  structure: "Organizational Structure",
  governing: "Governing Body",
  directors: "Board of Directors",
  "aicte-committees": "Various Committees By AICTE",
  "sgbau-committees": "Various Committees By SGBAU",

  /* Academics sub-pages */
  planner: "Academic Planner & Calendar",
  teaching: "Teaching Learning Process",
  timetable: "Central Time Table",
  rules: "Rules & Regulation",
  syllabus: "Schemes and Syllabus",
  incentive: "Incentive Marks Scheme",
  marks: "Sessional Marks Evaluation",
  rubrics: "Rubrics",
  innovative: "Innovative Practices",
  notices: "Notice for Students",
  reports: "Annual Reports",

  /* Admissions sub-pages */
  brochure: "Institute Brochure",
  ug: "Under-Graduate Program (UG)",
  pg: "Post-Graduate Program (PG)",
  dse: "Direct Second Year (DSE)",
  mba: "MBA Program",
  phd: "Ph.D. Program",
  fees: "Fee Structure",
  "fee-refund-policy": "Fee Refund Policy",

  /* Research sub-pages */
  rdc: "Research & Development Cell",
  policy: "Research Policy Document",
  coe: "Center of Excellence",
  publications: "Publications",
  ipr: "IPR (Patents + Copyrights)",
  "ug-projects": "UG Projects",
  collaboration: "Collaboration",
  iic: "IIC",
  nisp: "NISP",
  sabbatical: "Sabbatical Training",

  /* Facilities sub-pages */
  admin: "Administrative Office",
  library: "Central Library",
  hostels: "Hostels",
  sports: "Sports",
  other: "Other Facilities",
  computing: "Central Computing Facility",

  /* Placements sub-pages */
  objectives: "Objectives Rules & Procedures",
  goals: "T&P Goals",
  coordinators: "T&P Cell Coordinators",
  statistics: "Placement Statistics",
  recruiters: "Major Recruiters",
  career: "Career Guidance Cell",
  internship: "Internship",

  /* IQAC sub-pages */
  composition: "Composition & Function",
  minutes: "Minutes of Meeting",
  practices: "Best Practices",
  distinctiveness: "Institutional Distinctiveness",
  aqar: "AQAR Reports",
  naac: "NAAC-SSR 3rd Cycle",
  feedback: "Stakeholders Feedback Report",
  analysis: "Feedback Analysis & Action Taken",
  survey: "Student Satisfaction Survey",
  gender: "Annual Gender Sensitization",
  equity: "Promotion of Gender Equity",
  econtent: "e-Content",
  "econtent-facility": "e-Content Facility",

  /* Documents sub-pages */
  policies: "Policies and Procedure",
  mandatory: "Mandatory Disclosure",
  nba: "NBA",
  iso: "ISO",
  audit: "Sustainable Audit",
  aicte: "AICTE Approval",
  financial: "Financial Statements",
  newsletter: "News Letters",
  tattwadarshi: "e-Tattwadarshi",

  /* Department slugs */
  cse: "Computer Science & Engineering",
  electrical: "Electrical Engineering",
  entc: "Electronics & Telecommunication",
  it: "Information Technology",
  mechanical: "Mechanical Engineering",
  "applied-sciences": "Applied Science & Humanities",

  /* Activities sub-pages */
  csesa: "CSESA",
  innovo: "INNOVO 2025",
  drone: "Drone Club",
  gdg: "GDG-SSGMCE",
  pursuit: "PURSUIT",
  parishkriti: "Parishkriti",
  social: "Social Media Team",
  cultural: "Cultural Council",
  ieee: "IEEE",
  iste: "ISTE",
  ecell: "E-CELL",
  sae: "SAE",
  xtreme: "Team x-treme",
  "iei-mech": "IEI (MECH)",
  "iei-elpo": "IEI (ELPO)",
  acm: "ACM",
  mesa: "MESA",
  essa: "ESSA",
  mozilla: "Mozilla",
  itsa: "ITSA",
  nss: "NSS",
  uba: "UBA",

  /* Facilities deep sub-pages */
  "library-about": "About Library",
  "library-rules": "Rules",
  "library-hours": "Working Hours",
  "library-services": "Services",
  "library-facilities": "Facilities",
  "library-nptel": "NPTEL",
  "library-coursera": "Coursera",
  "library-books": "Books",
  "library-staff": "Staff",
  "hostel-policy": "Policy",
  "hostel-committee": "Committee",
  "hostel-brochure": "Brochure",
  "hostel-fees": "Fees",
  "sports-about": "About",
  "sports-council": "Council",
  "sports-indoor": "Indoor",
  "sports-outdoor": "Outdoor",
  "sports-achievements": "Achievements",
  "sports-statistics": "Statistics",
  "sports-staff": "Staff",
};

/* Build the first ancestor path for a segment */
const FIRST_PATHS = {
  about: "/about",
  academics: "/academics/planner",
  admissions: "/admissions",
  research: "/research/rdc",
  facilities: "/facilities/admin",
  placements: "/placements",
  iqac: "/iqac/vision",
  nirf: "/nirf",
  documents: "/documents",
  departments: "/departments",
  activities: "/activities/csesa",
};

/**
 * Build breadcrumb items from the current pathname and page title.
 * Returns an array of { label, path } objects.
 */
function buildBreadcrumbs(pathname, pageTitle) {
  const cleaned = pathname.replace(/\/+$/, "") || "/";
  if (cleaned === "/" || cleaned === "") return [];

  const segments = cleaned.split("/").filter(Boolean);
  if (segments.length === 0) return [];

  const crumbs = [{ label: "Home", path: "/" }];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const builtPath = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;

    // Try compound key first (e.g. "library-about" for /facilities/library/about)
    let label;
    if (i > 0) {
      const compoundKey = segments[i - 1] + "-" + seg;
      label = SEGMENT_LABELS[compoundKey];
    }
    if (!label) {
      label = SEGMENT_LABELS[seg];
    }
    if (!label) {
      // Fallback: capitalize the slug
      label = seg
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }

    // For the last segment, use the page title if available (more specific)
    if (isLast && pageTitle) {
      label = pageTitle;
    }

    // Use FIRST_PATHS for top-level sections that are just parent containers
    const linkPath =
      !isLast && i === 0 && FIRST_PATHS[seg] ? FIRST_PATHS[seg] : builtPath;

    crumbs.push({ label, path: linkPath, isLast });
  }

  // Deduplicate: if the last two crumbs share the same label, merge them
  if (crumbs.length >= 3) {
    const last = crumbs[crumbs.length - 1];
    const prev = crumbs[crumbs.length - 2];
    if (last.label.toLowerCase() === prev.label.toLowerCase()) {
      crumbs.splice(crumbs.length - 2, 1);
      crumbs[crumbs.length - 1].isLast = true;
    }
  }

  return crumbs;
}

/* ═══════════════════════════════════════════════════════════════ */

const PageHeader = ({ title, subtitle, backgroundImage }) => {
  const location = useLocation();
  const resolvedBackgroundImage = backgroundImage || pickHeaderBackground(title);

  const breadcrumbs = useMemo(
    () => buildBreadcrumbs(location.pathname, title),
    [location.pathname, title]
  );

  return (
    <div
      className="relative overflow-hidden py-16 text-center text-white md:py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.82), rgba(30, 58, 138, 0.82)), url(${resolvedBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-ssgmce-dark-blue/75 via-transparent to-ssgmce-dark-blue/75" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb navigation */}
        {breadcrumbs.length > 0 && (
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="breadcrumb-item">
                  {idx > 0 && (
                    <span className="breadcrumb-sep" aria-hidden="true">/</span>
                  )}
                  {crumb.isLast ? (
                    <span className="breadcrumb-current" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link to={crumb.path} className="breadcrumb-link">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="text-2xl font-bold mb-3 text-shadow md:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="text-base md:text-lg text-ssgmce-light-blue">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
