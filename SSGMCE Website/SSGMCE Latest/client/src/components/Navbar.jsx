import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import logo from "../assets/images/common/logo.png";
import aboutNavbarImage from "../assets/images/navbar/about.jpg";
import academicsNavbarImage from "../assets/images/navbar/Academics.JPG";
import admissionsNavbarImage from "../assets/images/navbar/admissions.jpg";
import researchNavbarImage from "../assets/images/navbar/research.jpg";
import facilitiesNavbarImage from "../assets/images/navbar/Facilities.jpeg";
import iqacNavbarImage from "../assets/images/navbar/IQAC.png";
import placementsNavbarImage from "../assets/images/navbar/placements.png";
import nirfNavbarImage from "../assets/images/navbar/nirf.png";
import documentsNavbarImage from "../assets/images/navbar/documents.jpg";
import activitiesNavbarImage from "../assets/images/navbar/activities.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const subDropdownTimeout = useRef(null);
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
          hasSubDropdown: true,
          subDropdown: [
            {
              name: "Applied Sciences and Humanities",
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
          ],
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
              className="hidden md:flex items-center flex-1 justify-end"
              onMouseLeave={() => {
                setActiveDropdown(null);
                setActiveSubDropdown(null);
              }}
            >
              <div className="relative">
                <ul className="flex items-center gap-0.5 lg:gap-1">
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
                            navigate(getFirstDropdownPath(item));
                            setActiveDropdown(null);
                            setActiveSubDropdown(null);
                          }}
                          className={`px-2.5 lg:px-3 py-2.5 text-gray-700 font-medium hover:text-ssgmce-blue transition-colors duration-300 flex items-center whitespace-nowrap text-sm lg:text-base ${
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
                          className={`block px-2.5 lg:px-3 py-2.5 text-gray-700 font-medium hover:text-ssgmce-blue transition-colors duration-300 whitespace-nowrap text-sm lg:text-base ${
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

                    // All items go into columns (including sub-dropdown items like Departments)
                    const allItems = activeItem.dropdown;

                    // Split items into columns
                    const getColumns = (items, colCount) => {
                      const perCol = Math.ceil(items.length / colCount);
                      const cols = [];
                      for (let i = 0; i < colCount; i++) {
                        cols.push(items.slice(i * perCol, (i + 1) * perCol));
                      }
                      return cols;
                    };

                    const colCount =
                      allItems.length > 16 ? 3 : allItems.length > 8 ? 2 : 2;
                    const columns = getColumns(allItems, colCount);

                    return (
                      <div className="absolute left-0 right-0 top-full pt-3 z-50">
                        <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.12)] relative">
                          <div className="px-8 py-8">
                            <div className="flex min-w-0 items-stretch gap-8">
                              {/* Left Side - Menu Items */}
                              <div className="flex min-w-0 flex-1 gap-8">
                                {columns.map((col, colIdx) => (
                                  <div
                                    key={`col-${colIdx}`}
                                    className="min-w-0 flex-1"
                                  >
                                    <ul className="space-y-1.5">
                                      {col.map((subItem, subIndex) => (
                                        <li key={subIndex} className="relative">
                                          {subItem.hasSubDropdown ? (
                                            <div
                                              onMouseEnter={() => {
                                                clearTimeout(
                                                  subDropdownTimeout.current,
                                                );
                                                setActiveSubDropdown(
                                                  subItem.name,
                                                );
                                              }}
                                              onMouseLeave={() => {
                                                subDropdownTimeout.current =
                                                  setTimeout(
                                                    () =>
                                                      setActiveSubDropdown(
                                                        null,
                                                      ),
                                                    150,
                                                  );
                                              }}
                                            >
                                              <button className="w-full flex items-center justify-between py-1.5 text-gray-700 hover:text-ssgmce-orange transition-all text-base font-medium group">
                                                {subItem.name}
                                                <FaChevronRight className="text-[10px] text-gray-400 group-hover:text-ssgmce-orange transition-colors" />
                                              </button>
                                            </div>
                                          ) : (
                                            <Link
                                              to={subItem.path}
                                              onClick={() => {
                                                setActiveDropdown(null);
                                                setActiveSubDropdown(null);
                                              }}
                                              className="block py-1.5 text-gray-700 hover:text-ssgmce-orange hover:underline transition-all text-base font-medium"
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

                              {/* Right Side - Promotional Image */}
                              <div className="relative h-[300px] w-[280px] overflow-hidden rounded-lg shadow-lg shrink-0 lg:w-[320px] xl:w-[350px]">
                                <img
                                  src={activeItem.megaMenuImage}
                                  alt={activeItem.megaMenuTitle}
                                  className="h-full w-full object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                                  <h3 className="text-white text-2xl font-bold mb-2">
                                    {activeItem.megaMenuTitle}
                                  </h3>
                                  <p className="text-white/90 text-sm mb-4">
                                    Explore our comprehensive offerings
                                  </p>
                                  <button className="bg-ssgmce-orange hover:bg-ssgmce-light-orange text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-all hover:shadow-lg w-fit">
                                    Learn More
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Sub-dropdown panel - anchored to mega menu container */}
                          {(() => {
                            const subItem = activeItem.dropdown.find(
                              (item) =>
                                item.hasSubDropdown &&
                                item.name === activeSubDropdown,
                            );
                            if (!subItem) return null;
                            return (
                              <div
                                className="absolute right-full top-0 bottom-0 pr-2 z-50"
                                onMouseEnter={() => {
                                  clearTimeout(subDropdownTimeout.current);
                                  setActiveSubDropdown(subItem.name);
                                }}
                                onMouseLeave={() => {
                                  subDropdownTimeout.current = setTimeout(
                                    () => setActiveSubDropdown(null),
                                    150,
                                  );
                                }}
                              >
                                <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.12)] h-full py-6 px-6 min-w-[300px] flex flex-col justify-center">
                                  <ul className="flex flex-col justify-between h-full">
                                    {subItem.subDropdown.map(
                                      (nestedItem, nestedIndex) => (
                                        <li key={nestedIndex}>
                                          <Link
                                            to={nestedItem.path}
                                            onClick={() => {
                                              setActiveDropdown(null);
                                              setActiveSubDropdown(null);
                                            }}
                                            className="block py-1.5 text-gray-600 hover:text-ssgmce-orange hover:underline transition-all text-base"
                                          >
                                            {nestedItem.name}
                                          </Link>
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </div>
                              </div>
                            );
                          })()}
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
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === item.name ? null : item.name,
                            )
                          }
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
                                {subItem.hasSubDropdown ? (
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
