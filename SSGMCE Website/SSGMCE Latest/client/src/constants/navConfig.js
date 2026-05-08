/**
 * ============================================================
 *  SINGLE SOURCE OF TRUTH
 *  ─ Navbar mega-dropdowns  &  Admin Dashboard category cards
 * ============================================================
 *
 *  Every parent section is defined once here.
 *  • Navbar.jsx   imports  NAV_MENU_ITEMS
 *  • AdminDashboard.jsx  imports  DASHBOARD_SECTIONS
 *
 *  `id` must match the PageContent.category enum value so that
 *  the dashboard can count pages with:
 *      allPages.filter(p => p.category === section.id).length
 */

import {
  FaClipboardList,
  FaBriefcase,
  FaBook,
  FaBuilding,
  FaUserGraduate,
  FaUniversity,
  FaFlask,
  FaRunning,
  FaInfoCircle,
  FaFolderOpen,
} from "react-icons/fa";

// ──────────────────────────────────────────────────────────────
//  SECTION DEFINITIONS
//  Each object represents one top-level website section.
// ──────────────────────────────────────────────────────────────
const SECTIONS = [
  // ─── About ────────────────────────────────────────────────
  {
    id: "about",
    label: "About",
    icon: FaInfoCircle,
    color: "#334155",
    navPath: "/about",
    megaDropdown: [
      {
        title: "Institution",
        items: [
          { name: "SSGMCE At Glance", path: "/about" },
          { name: "Vision-Mission, Core Values & Goals", path: "/about/vision" },
          { name: "Our Inspiration", path: "/about/inspiration" },
          { name: "Organizational Structure", path: "/about/structure" },
        ],
      },
      {
        title: "Leadership & Governance",
        items: [
          { name: "Principal Speaks", path: "/about/principal" },
          { name: "Governing Body", path: "/about/governing" },
          { name: "Board of Directors", path: "/about/directors" },
          { name: "Various Committees By SGBAU & AICTE", path: "/about/committees" },
          { name: "Contact us", path: "/contact" },
        ],
      },
    ],
  },

  // ─── Academics ────────────────────────────────────────────
  {
    id: "academics",
    label: "Academics",
    icon: FaBook,
    color: "#2563EB",
    megaDropdown: [
      {
        title: "Departments",
        items: [
          { name: "Applied Sciences and Humanities", path: "/departments/applied-sciences" },
          { name: "Computer Science and Engineering", path: "/departments/cse" },
          { name: "Electrical Engineering (Electronics & Power)", path: "/departments/electrical" },
          { name: "Electronics and Telecommunication Engg.", path: "/departments/entc" },
          { name: "Information Technology", path: "/departments/it" },
          { name: "Mechanical Engineering", path: "/departments/mechanical" },
          { name: "Master of Business Administration(MBA)", path: "/departments/mba" },
        ],
      },
      {
        title: "Academic Resources",
        items: [
          { name: "Academics Planner & Calendar", path: "/academics/planner" },
          { name: "Teaching Learning Process", path: "/academics/teaching" },
          { name: "Central Time Table Autumn 2025-26", path: "/academics/timetable" },
          { name: "Rules & Regulation", path: "/academics/rules" },
          { name: "Schemes and Syllabus", path: "/academics/syllabus" },
        ],
      },
      {
        title: "Assessment & Evaluation",
        items: [
          { name: "Incentive Marks Scheme", path: "/academics/incentive" },
          { name: "Sessional Marks Evaluations scheme", path: "/academics/marks" },
          { name: "Rubrics", path: "/academics/rubrics" },
          { name: "Innovative Practices in teaching & learning", path: "/academics/innovative" },
        ],
      },
      {
        title: "Student Resources",
        items: [
          { name: "Notice for students", path: "/academics/notices" },
          { name: "Annual Reports", path: "/academics/reports" },
        ],
      },
    ],
  },

  // ─── Admissions ───────────────────────────────────────────
  {
    id: "admissions",
    label: "Admissions",
    icon: FaUserGraduate,
    color: "#7C3AED",
    navPath: "/admissions",
    megaDropdown: [
      {
        title: "Programs",
        items: [
          { name: "Under-Graduate Program (UG)", path: "/admissions/ug" },
          { name: "Post-Graduate Program (PG)", path: "/admissions/pg" },
          { name: "Direct Second Year Engineering (DSE)", path: "/admissions/dse" },
          { name: "MBA Program", path: "/admissions/mba" },
          { name: "Ph. D. Program", path: "/admissions/phd" },
        ],
      },
      {
        title: "Information",
        items: [
          { name: "Institute Brochure", path: "/admissions/brochure" },
          { name: "Fee Structure", path: "/admissions/fees" },
        ],
      },
    ],
  },

  // ─── Research & Innovation ────────────────────────────────
  {
    id: "research",
    label: "Research & Innovation",
    icon: FaFlask,
    color: "#0891B2",
    navPath: "/research",
    megaDropdown: [
      {
        title: "Research",
        items: [
          { name: "Research and Development Cell (RDC)", path: "/research/rdc" },
          { name: "Research Policy Document", path: "/research/policy" },
          { name: "Center of Excellence", path: "/research/coe" },
          { name: "Research Centre for Ph.D. Work", path: "/research/phd" },
        ],
      },
      {
        title: "Output & Publications",
        items: [
          { name: "Publications", path: "/research/publications" },
          { name: "IPR (Patents + Copyrights)", path: "/research/ipr" },
          { name: "UG Projects", path: "/research/ug-projects" },
        ],
      },
      {
        title: "Innovation & Collaboration",
        items: [
          { name: "Collaboration", path: "/research/collaboration" },
          { name: "IIC", path: "/research/iic" },
          { name: "NISP", path: "/research/nisp" },
          { name: "Sabbatical Training", path: "/research/sabbatical" },
        ],
      },
    ],
  },

  // ─── Facilities ───────────────────────────────────────────
  {
    id: "facilities",
    label: "Facilities",
    icon: FaBuilding,
    color: "#059669",
    navPath: "/facilities",
    megaDropdown: [
      {
        title: "Campus Facilities",
        items: [
          { name: "Administrative Office", path: "/facilities/administrative-office" },
          { name: "Central Library", path: "/facilities/library" },
          { name: "Central Computing Facility", path: "/facilities/computing" },
        ],
      },
      {
        title: "Student Life",
        items: [
          { name: "Hostels", path: "/facilities/hostels" },
          { name: "Sports", path: "/facilities/sports" },
          { name: "Other Facilities", path: "/facilities/other" },
        ],
      },
    ],
  },

  // ─── Placements ───────────────────────────────────────────
  {
    id: "placements",
    label: "Placements",
    icon: FaBriefcase,
    color: "#FF9900",
    navPath: "/placements",
    megaDropdown: [
      {
        title: "T&P Cell",
        items: [
          { name: "About Training & Placement Cell", path: "/placements/about" },
          { name: "Objectives Rules & Procedures", path: "/placements/objectives" },
          { name: "T&P Goals", path: "/placements/goals" },
          { name: "T&P Cell Coordinators", path: "/placements/coordinators" },
          { name: "Training & Placement Activities", path: "/placements/activities" },
        ],
      },
      {
        title: "Statistics & Recruiters",
        items: [
          { name: "Placement Overview", path: "/placements" },
          { name: "Placement Brochure", path: "/placements/brochure" },
          { name: "Placement Statistics", path: "/placements/statistics" },
          { name: "Major Recruiters", path: "/placements/recruiters" },
        ],
      },
      {
        title: "Career Support",
        items: [
          { name: "Career Guidance Cell", path: "/placements/career" },
          { name: "Internship", path: "/placements/internship" },
          { name: "Contact Us", path: "/contact" },
        ],
      },
    ],
  },

  // ─── IQAC ─────────────────────────────────────────────────
  {
    id: "iqac",
    label: "IQAC",
    icon: FaClipboardList,
    color: "#003366",
    navPath: "/iqac",
    megaDropdown: [
      {
        title: "About IQAC",
        items: [
          { name: "Vision Mission, Quality Policies", path: "/iqac/vision" },
          { name: "Composition & Function", path: "/iqac/composition" },
          { name: "Minutes of Meeting", path: "/iqac/minutes" },
          { name: "Best Practices", path: "/iqac/practices" },
          { name: "Institutional Distinctiveness", path: "/iqac/distinctiveness" },
        ],
      },
      {
        title: "Reports & Accreditation",
        items: [
          { name: "AQAR Reports", path: "/iqac/aqar" },
          { name: "NAAC-SSR 3rd Cycle", path: "/iqac/naac" },
          { name: "e-Content", path: "/iqac/econtent" },
          { name: "e-Content Facility", path: "/iqac/econtent-facility" },
        ],
      },
      {
        title: "Feedback & Surveys",
        items: [
          { name: "Stakeholders Feedback Report", path: "/iqac/feedback" },
          { name: "Feedback Analysis & Action Taken Report", path: "/iqac/analysis" },
          { name: "Student Satisfaction Survey Report", path: "/iqac/survey" },
        ],
      },
      {
        title: "Gender & Equity",
        items: [
          { name: "Annual Gender Sensitization Action Plan", path: "/iqac/gender" },
          { name: "Promotion of Gender Equity", path: "/iqac/equity" },
        ],
      },
    ],
  },

  // ─── Documents ────────────────────────────────────────────
  {
    id: "documents",
    label: "Documents",
    icon: FaFolderOpen,
    color: "#B45309",
    navPath: "/documents",
    megaDropdown: [
      {
        title: "Accreditation & Approval",
        items: [
          { name: "NAAC", path: "/documents/naac" },
          { name: "NBA", path: "/documents/nba" },
          { name: "ISO", path: "/documents/iso" },
          { name: "NIRF", path: "/documents/nirf" },
          { name: "AICTE Approval", path: "/documents/aicte" },
        ],
      },
      {
        title: "Institutional Documents",
        items: [
          { name: "Policies and Procedure", path: "/documents/policies" },
          { name: "Mandatory Disclosure", path: "/documents/mandatory" },
          { name: "Sustainable Audit", path: "/documents/audit" },
          { name: "Financial Statements", path: "/documents/financial" },
        ],
      },
      {
        title: "Publications",
        items: [
          { name: "News Letters", path: "/documents/newsletter" },
          { name: "e-Tattwadarshi", path: "/documents/tattwadarshi" },
        ],
      },
    ],
  },

  // ─── Activities ───────────────────────────────────────────
  {
    id: "activities",
    label: "Activities",
    icon: FaRunning,
    color: "#D97706",
    navPath: "/events",
    megaDropdown: [
      {
        title: "Central Activities",
        items: [
          { name: "IEEE", path: "/activities/ieee" },
          { name: "ISTE", path: "/activities/iste" },
          { name: "UBA", path: "/activities/uba" },
          { name: "NSS", path: "/activities/nss" },
          { name: "PURSUIT", path: "/activities/pursuit" },
          { name: "Parishkriti", path: "/activities/parishkriti" },
        ],
      },
      {
        title: "Departmental Activities",
        items: [
          { name: "MESA", path: "/activities/mesa" },
          { name: "ESSA", path: "/activities/essa" },
          { name: "CSESA", path: "/activities/csesa" },
          { name: "ITSA", path: "/activities/itsa" },
          { name: "Social Media Team", path: "/activities/social" },
          { name: "Cultural Council", path: "/activities/cultural" },
        ],
      },
      {
        title: "Student Activities",
        items: [
          { name: "INNOVO 2025", path: "/activities/innovo" },
          { name: "Drone Club", path: "/activities/drone" },
          { name: "GDG-SSGMCE", path: "/activities/gdg" },
          { name: "E-CELL", path: "/activities/ecell" },
          { name: "Team x-treme", path: "/activities/xtreme" },
          { name: "Mozilla", path: "/activities/mozilla" },
        ],
      },
      {
        title: "Student Chapter",
        items: [
          { name: "ACM", path: "/activities/acm" },
          { name: "IEI(MECH)", path: "/activities/iei-mech" },
          { name: "IEI(ELPO)", path: "/activities/iei-elpo" },
          { name: "SAE", path: "/activities/sae" },
        ],
      },
    ],
  },

  // ─── Departments ──────────────────────────────────────────
  // (No navbar mega-dropdown — kept for dashboard card only)
  {
    id: "departments",
    label: "Departments",
    icon: FaUniversity,
    color: "#DC2626",
    showInNav: false,
  },
];

// ──────────────────────────────────────────────────────────────
//  STANDALONE NAV LINKS (no mega-dropdown, no dashboard card)
// ──────────────────────────────────────────────────────────────
const STANDALONE_NAV_LINKS = [
  { name: "NIRF Ranking", path: "/documents/nirf" },
];

// ══════════════════════════════════════════════════════════════
//  DERIVED EXPORTS
// ══════════════════════════════════════════════════════════════

/**
 * NAV_MENU_ITEMS  –  consumed by Navbar.jsx
 *
 * Produces the menuItems array that the Navbar expects:
 *   { name, path?, megaDropdown? }
 *
 * Sections with `showInNav: false` are excluded.
 * Standalone links (like NIRF Ranking) are appended at their
 * original position (right before Documents).
 */
export const NAV_MENU_ITEMS = (() => {
  const items = [];

  for (const section of SECTIONS) {
    // Skip sections explicitly hidden from nav
    if (section.showInNav === false) continue;

    items.push({
      name: section.label,
      path: section.navPath,
      megaDropdown: section.megaDropdown,
    });

    // Insert standalone links after IQAC (original position)
    if (section.id === "iqac") {
      STANDALONE_NAV_LINKS.forEach((link) => items.push(link));
    }
  }

  return items;
})();

/**
 * DASHBOARD_SECTIONS  –  consumed by AdminDashboard.jsx
 *
 * Only sections whose `id` matches a PageContent.category enum value.
 *   { id, label, icon, color }
 *
 * The dashboard uses:
 *   count = allPages.filter(p => p.category === section.id).length
 */
export const DASHBOARD_SECTIONS = SECTIONS.map((s) => ({
  id: s.id,
  label: s.label,
  icon: s.icon,
  color: s.color,
}));

/**
 * Full SECTIONS array (if any other component needs everything)
 */
export default SECTIONS;
