import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";
import logo from "../assets/images/common/logo.png";
import aboutNavbarImage from "../assets/images/navbar/about.jpg";
import academicsNavbarImage from "../assets/images/navbar/Academics.JPG";
import admissionsNavbarImage from "../assets/images/navbar/admissions.jpg";
import researchNavbarImage from "../assets/images/navbar/research.jpg";
import facilitiesNavbarImage from "../assets/images/navbar/Facilities.jpeg";
import iqacNavbarImage from "../assets/images/navbar/IQAC.png";
import placementsNavbarImage from "../assets/images/navbar/placements.png";
import nirfNavbarImage from "../assets/images/about/NIRF.png";
import documentsNavbarImage from "../assets/images/navbar/documents.jpg";
import activitiesNavbarImage from "../assets/images/navbar/activities.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const quickLinksLeft = [
    { name: "FRA Fee Structure", to: "/admissions/fees" },
    { name: "Best Practices", to: "/iqac/practices" },
    { name: "SSGMCE Blog", to: "/news" },
    { name: "Grievance Form", to: "/contact" },
  ];

  const quickLinksRight = [
    { name: "Institute Brochure", to: "/admissions/brochure" },
    {
      name: "Academic Calendar",
      to: "/academics/planner",
    },
    {
      name: "Alumni Registration",
      href: "https://alumni.ssgmce.ac.in/",
    },
    {
      name: "ERP Login",
      href: "https://erp.ssgmce.ac.in/login.aspx",
    },
  ];

  const isActive = (path) => location.pathname === path;

  const getFirstDropdownPath = (item) => {
    if (item?.topLevelPath) return item.topLevelPath;
    if (!item?.dropdown?.length) return item?.path || "/";
    const firstItem = item.dropdown[0];
    if (firstItem?.path) return firstItem.path;
    if (firstItem?.subDropdown?.length)
      return firstItem.subDropdown[0]?.path || "/";
    return item?.path || "/";
  };

  const handleTopLevelMenuClick = (item) => {
    navigate(getFirstDropdownPath(item));
    setIsOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const menuItems = [
    {
      name: "About",
      path: "/about",
      megaMenuImage: aboutNavbarImage,
      megaMenuTitle: "About SSGMCE",
      dropdown: [
        { name: "SSGMCE At Glance", path: "/about" },
        { name: "Vision-Mission, Core Values & Goals", path: "/about/vision" },
        { name: "Our Inspiration", path: "/about/inspiration" },
        { name: "Principal Speaks", path: "/about/principal" },
        { name: "Organizational Structure", path: "/about/structure" },
        { name: "Governing Body", path: "/about/governing" },
        { name: "Board of Directors", path: "/about/directors" },
        {
          name: "Various Committees By SGBAU & AICTE",
          path: "/about/committees",
        },
        { name: "Contact us", path: "/contact" },
      ],
    },
    {
      name: "Academics",
      topLevelPath: "/academics/planner",
      megaMenuImage: academicsNavbarImage,
      megaMenuTitle: "Academic Excellence",
      dropdown: [
        {
          name: "Departments",
          path: "/departments",
          isSectionHeader: true,
        },
        {
          name: "Applied Science and Humanities",
          path: "/departments/applied-sciences",
        },
        {
          name: "Computer Science and Engineering",
          path: "/departments/cse",
        },
        {
          name: "Electrical Engineering (Electronics & Power)",
          path: "/departments/electrical",
        },
        {
          name: "Electronics and Telecommunication Engg.",
          path: "/departments/entc",
        },
        { name: "Information Technology", path: "/departments/it" },
        { name: "Mechanical Engineering", path: "/departments/mechanical" },
        {
          name: "Master of Business Administration (MBA)",
          path: "/departments/mba",
        },
        {
          name: "Academic Links",
          path: "/academics/planner",
          isSectionHeader: true,
        },
        { name: "Academics Planner & Calendar", path: "/academics/planner" },
        { name: "Teaching Learning Process", path: "/academics/teaching" },
        {
          name: "Central Time Table Autumn 2025-26",
          path: "/academics/timetable",
        },
        { name: "Rules & Regulation", path: "/academics/rules" },
        { name: "Schemes and Syllabus", path: "/academics/syllabus" },
        { name: "Incentive Marks Scheme", path: "/academics/incentive" },
        {
          name: "Sessional Marks Evaluations scheme",
          path: "/academics/marks",
        },
        { name: "Rubrics", path: "/academics/rubrics" },
        {
          name: "Innovative Practices in teaching & learning",
          path: "/academics/innovative",
        },
        { name: "Notice for students", path: "/academics/notices" },
        { name: "Annual Reports", path: "/academics/reports" },
      ],
    },
    {
      name: "Admissions",
      path: "/admissions",
      megaMenuImage: admissionsNavbarImage,
      megaMenuTitle: "Join SSGMCE",
      dropdown: [
        { name: "Institute Brochure", path: "/admissions/brochure" },
        { name: "Under-Graduate Program (UG)", path: "/admissions/ug" },
        { name: "Post-Graduate Program (PG)", path: "/admissions/pg" },
        {
          name: "Direct Second Year Engineering (DSE)",
          path: "/admissions/dse",
        },
        { name: "MBA Program", path: "/admissions/mba" },
        { name: "Ph. D. Program", path: "/admissions/phd" },
        { name: "Fee Structure", path: "/admissions/fees" },
      ],
    },
    {
      name: "Research & Innovation",
      path: "/research",
      megaMenuImage: researchNavbarImage,
      megaMenuTitle: "Innovation & Research",
      dropdown: [
        { name: "Research and Development Cell (RDC)", path: "/research/rdc" },
        { name: "Research Policy Document", path: "/research/policy" },
        { name: "Center of Excellence", path: "/research/coe" },
        { name: "Publications", path: "/research/publications" },
        { name: "IPR (Patents + Copyrights)", path: "/research/ipr" },
        { name: "UG Projects", path: "/research/ug-projects" },
        { name: "Research Centre for Ph.D. Work", path: "/research/phd" },
        { name: "Collaboration", path: "/research/collaboration" },
        { name: "IIC", path: "/research/iic" },
        { name: "NISP", path: "/research/nisp" },
        { name: "Sabbatical Training", path: "/research/sabbatical" },
      ],
    },
    {
      name: "Facilities",
      path: "/gallery",
      megaMenuImage: facilitiesNavbarImage,
      megaMenuTitle: "World-Class Facilities",
      dropdown: [
        { name: "Administrative Office", path: "/facilities/admin" },
        { name: "Central Library", path: "/facilities/library" },
        { name: "Hostels", path: "/facilities/hostels" },
        { name: "Sports", path: "/facilities/sports" },
        { name: "Other Facilities", path: "/facilities/other" },
        { name: "Central Computing Facility", path: "/facilities/computing" },
      ],
    },
    {
      name: "Placements",
      path: "/placements",
      megaMenuImage: placementsNavbarImage,
      megaMenuTitle: "Career Opportunities",
      dropdown: [
        { name: "Placement Brochure", path: "/placements/brochure" },
        { name: "About Training & Placement Cell", path: "/placements/about" },
        {
          name: "Objectives Rules & Procedures",
          path: "/placements/objectives",
        },
        { name: "T&P Goals", path: "/placements/goals" },
        {
          name: "Training & Placement Cell Coordinators",
          path: "/placements/coordinators",
        },
        {
          name: "Training & Placement Activities",
          path: "/placements/activities",
        },
        { name: "Placement Statistics", path: "/placements/statistics" },
        { name: "Major Recruiters", path: "/placements/recruiters" },
        { name: "Career Guidance Cell", path: "/placements/career" },
        { name: "Internship", path: "/placements/internship" },
        { name: "Contact Us", path: "/contact" },
      ],
    },
    {
      name: "IQAC",
      path: "/iqac",
      megaMenuImage: iqacNavbarImage,
      megaMenuTitle: "Quality Assurance",
      dropdown: [
        { name: "Vision Mission, Quality Policies", path: "/iqac/vision" },
        { name: "Composition & Function", path: "/iqac/composition" },
        { name: "Minutes of Meeting", path: "/iqac/minutes" },
        { name: "Best Practices", path: "/iqac/practices" },
        {
          name: "Institutional Distinctiveness",
          path: "/iqac/distinctiveness",
        },
        { name: "AQAR Reports", path: "/iqac/aqar" },
        { name: "NAAC-SSR 3rd Cycle", path: "/iqac/naac" },
        { name: "Stakeholders Feedback Report", path: "/iqac/feedback" },
        {
          name: "Stakeholders Feedback Analysis and Action Taken Report",
          path: "/iqac/analysis",
        },
        { name: "Student Satisfaction Survey Report", path: "/iqac/survey" },
        {
          name: "Annual Gender Sensitization Action Plan",
          path: "/iqac/gender",
        },
        {
          name: "Measures Initiated for the Promotion of Gender Equity",
          path: "/iqac/equity",
        },
        { name: "e-Content", path: "/iqac/econtent" },
        { name: "e-Content Facility", path: "/iqac/econtent-facility" },
      ],
    },
    {
      name: "NIRF Ranking",
      path: "/nirf",
      megaMenuImage: nirfNavbarImage,
      megaMenuImageFit: "contain",
      megaMenuTitle: "NIRF Rankings",
      dropdown: [
        { name: "NIRF 2025-26", path: "/nirf?year=2025-26" },
        { name: "NIRF 2024-25", path: "/nirf?year=2024-25" },
        { name: "NIRF 2023-24", path: "/nirf?year=2023-24" },
        { name: "NIRF 2022-23", path: "/nirf?year=2022-23" },
        { name: "NIRF 2021-22", path: "/nirf?year=2021-22" },
      ],
    },
    {
      name: "Documents",
      path: "/documents",
      megaMenuImage: documentsNavbarImage,
      megaMenuTitle: "Important Documents",
      dropdown: [
        { name: "Policies and Procedure", path: "/documents/policies" },
        { name: "Mandatory Disclosure", path: "/documents/disclosure" },
        { name: "NAAC", path: "/documents/naac" },
        { name: "NBA", path: "/documents/nba" },
        { name: "ISO", path: "/documents/iso" },
        { name: "NIRF", path: "/documents/nirf" },
        { name: "Sustainable Audit", path: "/documents/audit" },
        { name: "AICTE Approval", path: "/documents/aicte" },
        { name: "Financial Statements", path: "/documents/financial" },
        { name: "News Letters", path: "/documents/newsletter" },
        { name: "e-Tattwadarshi", path: "/documents/tattwadarshi" },
      ],
    },
    {
      name: "Activities",
      path: "/events",
      megaMenuImage: activitiesNavbarImage,
      megaMenuImageFit: "contain",
      megaMenuTitle: "Student Activities",
      dropdown: [
        { name: "INNOVO 2025", path: "/activities/innovo" },
        { name: "Drone Club", path: "/activities/drone" },
        { name: "GDG-SSGMCE", path: "/activities/gdg" },
        { name: "PURSUIT", path: "/activities/pursuit" },
        { name: "Parishkriti", path: "/activities/parishkriti" },
        { name: "Social Media Team", path: "/activities/social" },
        { name: "Cultural Council", path: "/activities/cultural" },
        { name: "IEEE", path: "/activities/ieee" },
        { name: "ISTE", path: "/activities/iste" },
        { name: "E-CELL", path: "/activities/ecell" },
        { name: "SAE", path: "/activities/sae" },
        { name: "Team x-treme", path: "/activities/xtreme" },
        { name: "IEI(MECH)", path: "/activities/iei-mech" },
        { name: "IEI(ELPO)", path: "/activities/iei-elpo" },
        { name: "ACM", path: "/activities/acm" },
        { name: "MESA", path: "/activities/mesa" },
        { name: "ESSA", path: "/activities/essa" },
        { name: "CSESA", path: "/activities/csesa" },
        { name: "Mozilla", path: "/activities/mozilla" },
        { name: "ITSA", path: "/activities/itsa" },
        { name: "NSS", path: "/activities/nss" },
        { name: "UBA", path: "/activities/uba" },
      ],
    },
  ];

  return (
    <>
      <header className="ssgmce-header-shell text-white">
        <div className="ssgmce-header-pattern" />
        <div className="container relative mx-auto px-3 py-3 md:px-4 md:py-4">
          <div className="mb-4 hidden flex-wrap items-center justify-center gap-2 md:flex md:justify-between md:gap-3">
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {quickLinksLeft.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="ssgmce-quick-pill"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
              {quickLinksRight.map((link) =>
                link.href ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="ssgmce-quick-pill"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="ssgmce-quick-pill"
                  >
                    {link.name}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/5 px-3 py-3 backdrop-blur-[2px] md:px-5 md:py-4">
            <div className="flex items-center justify-center gap-3 md:gap-5">
              <span className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/70 to-white/10 lg:block" />
              <img
                src="/favicon.svg"
                alt="SSGMCE Emblem"
                className="h-12 w-24 rounded-xl border border-white/35 bg-white/95 object-contain p-0.5 shadow-lg md:h-14 md:w-28"
                onError={(e) => {
                  e.currentTarget.src = logo;
                }}
              />
              <div className="text-center">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-200 md:text-xs">
                  Shri Gajanan Shikshan Sansthan's
                </p>
                <p className="mt-1 text-base font-semibold tracking-wide text-white/95 md:text-lg">
                  Shri Sant Gajanan Maharaj College of Engineering, Shegaon
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/75 md:text-xs">
                  Autonomous Institute | NAAC Accredited | Estd. 1983
                </p>
              </div>
              <span className="hidden h-px flex-1 bg-gradient-to-l from-transparent via-white/70 to-white/10 lg:block" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Menu - White Background */}
      <nav className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-200">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-[60px] md:min-h-[70px]">
            {/* Logo on Left */}
            <Link to="/" className="flex-shrink-0 py-2 md:py-2.5">
              <img
                src="/favicon.svg"
                alt="SSGMCE Logo"
                className="h-12 md:h-14 lg:h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = logo;
                }}
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-md border border-gray-200 p-2 text-xl text-ssgmce-blue transition-colors hover:bg-gray-50 md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Desktop Menu */}
            <div
              className="hidden min-w-0 md:flex items-center flex-1 justify-end"
              onMouseLeave={() => {
                setActiveDropdown(null);
                setActiveSubDropdown(null);
              }}
            >
              <div className="relative ml-auto w-fit max-w-full">
                <ul className="flex flex-wrap items-center justify-end gap-x-0.5 gap-y-1 lg:gap-x-1">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      onMouseEnter={() =>
                        item.dropdown
                          ? setActiveDropdown(item.name)
                          : setActiveDropdown(null)
                      }
                    >
                      {item.dropdown ? (
                        <button
                          onClick={() => {
                            handleTopLevelMenuClick(item);
                          }}
                          className={`px-2.5 lg:px-3 py-2.5 text-gray-700 font-medium hover:text-ssgmce-blue transition-colors duration-300 flex items-center whitespace-nowrap text-[13px] xl:text-sm ${
                            activeDropdown === item.name
                              ? "text-ssgmce-blue border-b-2 border-ssgmce-orange"
                              : isActive(item.path)
                                ? "text-ssgmce-blue border-b-2 border-ssgmce-blue"
                                : ""
                          }`}
                        >
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          className={`block px-2.5 lg:px-3 py-2.5 text-gray-700 font-medium hover:text-ssgmce-blue transition-colors duration-300 whitespace-nowrap text-[13px] xl:text-sm ${
                            isActive(item.path)
                              ? "text-ssgmce-blue border-b-2 border-ssgmce-blue"
                              : ""
                          }`}
                          onMouseEnter={() => setActiveDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Mega Menu Panel - spans full width of menu tabs */}
                {activeDropdown &&
                  (() => {
                    const activeItem = menuItems.find(
                      (item) => item.name === activeDropdown,
                    );
                    if (!activeItem || !activeItem.dropdown) return null;
                    const allItems = activeItem.dropdown;

                    // Split items into columns
                    const getColumns = (items, colCount) => {
                      const weightedLength = items.reduce(
                        (total, item) =>
                          total + (item.isSectionHeader ? 0.35 : 1),
                        0,
                      );
                      const perCol = Math.ceil(weightedLength / colCount);
                      const cols = [];
                      for (let i = 0; i < colCount; i++) {
                        cols.push([]);
                      }
                      let currentWeight = 0;
                      items.forEach((item) => {
                        const weight = item.isSectionHeader ? 0.35 : 1;
                        const nextIndex = Math.min(
                          colCount - 1,
                          Math.floor(currentWeight / perCol),
                        );
                        cols[nextIndex].push(item);
                        currentWeight += weight;
                      });
                      return cols;
                    };

                    const getMenuLayout = (itemName, itemCount) => {
                      if (itemName === "Academics") {
                        return { colCount: 4, imageWidth: "w-[220px]" };
                      }
                      if (itemName === "Activities") {
                        return { colCount: 4, imageWidth: "hidden" };
                      }
                      return {
                        colCount: itemCount > 18 ? 4 : itemCount > 10 ? 3 : 2,
                        imageWidth: "w-[240px]",
                      };
                    };

                    const { colCount, imageWidth } = getMenuLayout(
                      activeItem.name,
                      allItems.length,
                    );
                    const columns = getColumns(allItems, colCount);
                    const isAcademicsMenu = activeItem.name === "Academics";

                    const getAcademicsGroups = (items) => {
                      const groups = {
                        departments: [],
                        academicLinks: [],
                      };

                      let currentGroup = "departments";
                      items.forEach((entry) => {
                        if (entry.isSectionHeader) {
                          const normalized = (entry.name || "").toLowerCase();
                          if (normalized.includes("academic")) {
                            currentGroup = "academicLinks";
                          } else if (normalized.includes("department")) {
                            currentGroup = "departments";
                          }
                          return;
                        }

                        groups[currentGroup].push(entry);
                      });

                      return groups;
                    };

                    const academicsGroups = isAcademicsMenu
                      ? getAcademicsGroups(allItems)
                      : null;

                    const splitIntoTwoColumns = (items) => {
                      const midpoint = Math.ceil(items.length / 2);
                      return [items.slice(0, midpoint), items.slice(midpoint)];
                    };

                    const academicsLinkColumns = isAcademicsMenu
                      ? splitIntoTwoColumns(academicsGroups.academicLinks)
                      : null;

                    return (
                      <div
                        className={`absolute top-full z-50 w-[min(calc(100vw-9rem),1120px)] pt-2 ${
                          activeItem.name === "Activities"
                            ? "right-0 left-auto"
                            : "left-0"
                        }`}
                      >
                        <div className="relative overflow-hidden rounded-lg bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
                          <div
                            className={`px-5 py-4 lg:px-7 lg:py-5 ${
                              activeItem.name === "Academics" ? "" : ""
                            }`}
                          >
                            <div className="flex min-w-0 items-stretch gap-5">
                              {/* Left Side - Menu Items */}
                              {isAcademicsMenu ? (
                                <div className="grid min-w-0 flex-1 gap-x-8 gap-y-2 lg:grid-cols-3">
                                  <div className="min-w-0">
                                    <div className="mb-2 border-b border-gray-100 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ssgmce-blue">
                                      Departments
                                    </div>
                                    <ul className="space-y-0.5">
                                      {academicsGroups.departments.map(
                                        (subItem, subIndex) => (
                                          <li
                                            key={`dept-${subIndex}`}
                                            className="relative"
                                          >
                                            <Link
                                              to={subItem.path}
                                              onClick={() => {
                                                setActiveDropdown(null);
                                                setActiveSubDropdown(null);
                                              }}
                                              className="block min-w-0 break-words py-1.5 text-[13px] font-medium leading-snug text-gray-700 transition-all hover:text-ssgmce-orange hover:underline xl:text-sm"
                                            >
                                              {subItem.name}
                                            </Link>
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>

                                  <div className="min-w-0">
                                    <div className="mb-2 border-b border-gray-100 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ssgmce-blue">
                                      Academic Links I
                                    </div>
                                    <ul className="space-y-0.5">
                                      {academicsLinkColumns[0].map(
                                        (subItem, subIndex) => (
                                          <li
                                            key={`acad-${subIndex}`}
                                            className="relative"
                                          >
                                            <Link
                                              to={subItem.path}
                                              onClick={() => {
                                                setActiveDropdown(null);
                                                setActiveSubDropdown(null);
                                              }}
                                              className="block min-w-0 break-words py-1.5 text-[13px] font-medium leading-snug text-gray-700 transition-all hover:text-ssgmce-orange hover:underline xl:text-sm"
                                            >
                                              {subItem.name}
                                            </Link>
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>

                                  <div className="min-w-0">
                                    <ul className="space-y-0.5">
                                      {academicsLinkColumns[1].map(
                                        (subItem, subIndex) => (
                                          <li
                                            key={`acad-2-${subIndex}`}
                                            className="relative"
                                          >
                                            <Link
                                              to={subItem.path}
                                              onClick={() => {
                                                setActiveDropdown(null);
                                                setActiveSubDropdown(null);
                                              }}
                                              className="block min-w-0 break-words py-1.5 text-[13px] font-medium leading-snug text-gray-700 transition-all hover:text-ssgmce-orange hover:underline xl:text-sm"
                                            >
                                              {subItem.name}
                                            </Link>
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className={`grid min-w-0 flex-1 gap-x-7 gap-y-2 ${
                                    colCount === 4
                                      ? "lg:grid-cols-4"
                                      : colCount === 3
                                        ? "lg:grid-cols-3"
                                        : "lg:grid-cols-2"
                                  }`}
                                >
                                  {columns.map((col, colIdx) => (
                                    <div
                                      key={`col-${colIdx}`}
                                      className="min-w-0 flex-1"
                                    >
                                      <ul className="space-y-0.5">
                                        {col.map((subItem, subIndex) => (
                                          <li
                                            key={subIndex}
                                            className="relative"
                                          >
                                            {subItem.isSectionHeader ? (
                                              <div className="mb-1 mt-2 border-b border-gray-100 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ssgmce-blue first:mt-0">
                                                {subItem.name}
                                              </div>
                                            ) : (
                                              <Link
                                                to={subItem.path}
                                                onClick={() => {
                                                  setActiveDropdown(null);
                                                  setActiveSubDropdown(null);
                                                }}
                                                className="block min-w-0 break-words py-1.5 text-[13px] font-medium leading-snug text-gray-700 transition-all hover:text-ssgmce-orange hover:underline xl:text-sm"
                                              >
                                                {subItem.name}
                                              </Link>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Right Side - Promotional Image */}
                              {imageWidth !== "hidden" && (
                                <div
                                  className={`hidden ${imageWidth} shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg lg:block`}
                                >
                                  <div className="h-[130px] bg-gray-50">
                                    <img
                                      src={activeItem.megaMenuImage}
                                      alt={activeItem.megaMenuTitle}
                                      className={`h-full w-full object-center ${
                                        activeItem.megaMenuImageFit ===
                                        "contain"
                                          ? "object-contain p-4"
                                          : "object-cover"
                                      }`}
                                    />
                                  </div>
                                  <div className="border-t border-gray-100 p-3">
                                    <h3 className="text-base font-bold leading-tight text-gray-900">
                                      {activeItem.megaMenuTitle}
                                    </h3>
                                    <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                                      Explore our comprehensive offerings
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        navigate(
                                          getFirstDropdownPath(activeItem),
                                        );
                                        setActiveDropdown(null);
                                        setActiveSubDropdown(null);
                                      }}
                                      className="mt-2 w-fit rounded-md bg-ssgmce-orange px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-ssgmce-light-orange hover:shadow-md"
                                    >
                                      Learn More
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            aria-hidden={!isOpen}
            className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
              isOpen
                ? "max-h-[70vh] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
            }`}
          >
            <div className="border-t border-gray-200 bg-white px-1 py-3 overflow-y-auto shadow-lg">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => handleTopLevelMenuClick(item)}
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded flex justify-between items-center font-semibold text-sm"
                        >
                          {item.name}{" "}
                          <FaChevronDown
                            className={`text-[10px] transition-transform ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {activeDropdown === item.name && (
                          <ul className="ml-2 mt-1 space-y-1">
                            {item.dropdown.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                {subItem.isSectionHeader ? (
                                  <div className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ssgmce-blue">
                                    {subItem.name}
                                  </div>
                                ) : subItem.hasSubDropdown ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        setActiveSubDropdown(
                                          activeSubDropdown === subItem.name
                                            ? null
                                            : subItem.name,
                                        )
                                      }
                                      className="w-full text-left px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded flex justify-between items-center text-xs"
                                    >
                                      {subItem.name}{" "}
                                      <FaChevronRight
                                        className={`text-[9px] transition-transform ${
                                          activeSubDropdown === subItem.name
                                            ? "rotate-90"
                                            : ""
                                        }`}
                                      />
                                    </button>
                                    {activeSubDropdown === subItem.name && (
                                      <ul className="ml-2 mt-1 space-y-1">
                                        {subItem.subDropdown.map(
                                          (nestedItem, nestedIndex) => (
                                            <li key={nestedIndex}>
                                              <Link
                                                to={nestedItem.path}
                                                onClick={() => {
                                                  setIsOpen(false);
                                                  setActiveDropdown(null);
                                                  setActiveSubDropdown(null);
                                                }}
                                                className="block px-3 py-1.5 text-gray-500 hover:bg-gray-50 rounded text-xs"
                                              >
                                                {nestedItem.name}
                                              </Link>
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    )}
                                  </>
                                ) : (
                                  <Link
                                    to={subItem.path}
                                    onClick={() => {
                                      setIsOpen(false);
                                      setActiveDropdown(null);
                                      setActiveSubDropdown(null);
                                    }}
                                    className="block px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded text-xs"
                                  >
                                    {subItem.name}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded font-semibold text-sm ${
                          isActive(item.path)
                            ? "bg-ssgmce-blue text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
