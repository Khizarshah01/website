import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBuilding,
  FaBook,
  FaHome,
  FaTrophy,
  FaCogs,
  FaLaptop,
  FaIdCard,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { useEdit } from "../contexts/EditContext";
import MobileSidebarToggle from "./MobileSidebarToggle";

const pathToPageId = (path) => path.replace(/^\//, "").replace(/\//g, "-");

const menuItems = [
  {
    title: "Central Library",
    path: "/facilities/library",
    icon: FaBook,
    children: [
      { title: "About Library", path: "/facilities/library/about" },
      { title: "Library Rules", path: "/facilities/library/rules" },
      { title: "Working Hours", path: "/facilities/library/hours" },
      { title: "Library Services", path: "/facilities/library/services" },
      { title: "Library Facilities", path: "/facilities/library/facilities" },
      { title: "NPTEL", path: "/facilities/library/nptel" },
      { title: "NPTEL- Faculty Achievers", path: "/facilities/library/nptel-faculty" },
      { title: "NPTEL- Student Achievers", path: "/facilities/library/nptel-students" },
      { title: "Coursera@SSGMCE", path: "/facilities/library/coursera" },
      { title: "Book Details", path: "/facilities/library/books" },
      { title: "Library Staff", path: "/facilities/library/staff" },
    ],
  },
  {
    title: "Hostel",
    path: "/facilities/hostels",
    icon: FaHome,
    children: [
      { title: "Policy, Rules & Code of Conduct", path: "/facilities/hostel/policy" },
      { title: "Hostel Committee", path: "/facilities/hostel/committee" },
      { title: "Hostel Brochure", path: "/facilities/hostel/brochure" },
      { title: "Anti-Ragging Committee", path: "/facilities/hostel/anti-ragging" },
      { title: "Minutes of the Meeting", path: "/facilities/hostel/minutes" },
      { title: "Anti-Ragging Annual Reports", path: "/facilities/hostel/reports" },
      { title: "Anti-Ragging Posters", path: "/facilities/hostel/posters" },
      { title: "AICTE Letters", path: "/facilities/hostel/aicte" },
      { title: "Anti-Ragging Notices", path: "/facilities/hostel/notices" },
      { title: "Hostel Fee Structure", path: "/facilities/hostel/fees" },
      { title: "Accommodation Provision", path: "/facilities/hostel/accommodation" },
      { title: "Hostel Admission Form", path: "/facilities/hostel/admission" },
      { title: "Hostel Feedback Form", path: "/facilities/hostel/feedback" },
    ],
  },
  {
    title: "Sports",
    path: "/facilities/sports",
    icon: FaTrophy,
    children: [
      { title: "About Sport Department", path: "/facilities/sports/about" },
      { title: "Sports Council", path: "/facilities/sports/council" },
      { title: "Indoor Sport Facility", path: "/facilities/sports/indoor" },
      { title: "Outdoor Sport Facility", path: "/facilities/sports/outdoor" },
      { title: "Sports Achievement", path: "/facilities/sports/achievements" },
      { title: "Sport Statistics", path: "/facilities/sports/statistics" },
      { title: "Sport Staff & Contact", path: "/facilities/sports/staff" },
    ],
  },
  {
    title: "Other Facilities",
    path: "/facilities/other",
    icon: FaCogs,
    children: [
      { title: "Transportation", path: "/facilities/other/transportation" },
      { title: "Medical Center", path: "/facilities/other/medical" },
      { title: "Dining & Cafeteria", path: "/facilities/other/dining" },
      { title: "Other Services", path: "/facilities/other/services" },
    ],
  },
  {
    title: "Central Computing Facility",
    path: "/facilities/computing",
    icon: FaLaptop,
    children: [
      { title: "Computer Labs", path: "/facilities/computing/labs" },
      { title: "Software & Tools", path: "/facilities/computing/software" },
      { title: "Network Infrastructure", path: "/facilities/computing/network" },
      { title: "Support & Policies", path: "/facilities/computing/support" },
    ],
  },
  {
    title: "Administrative Office",
    path: "/facilities/administrative-office",
    icon: FaIdCard,
    children: [
      { title: "Services by College", path: "/facilities/admin-office/services-college" },
      { title: "Services by University", path: "/facilities/admin-office/services-university" },
      { title: "Information Brochure", path: "/facilities/admin-office/brochure" },
      { title: "Policies & Procedures", path: "/facilities/admin-office/policies" },
      { title: "Mandatory Disclosure", path: "/facilities/admin-office/mandatory-disclosure" },
      { title: "AICTE Approvals", path: "/facilities/admin-office/aicte-approvals" },
      { title: "Financial Statements", path: "/facilities/admin-office/financial-statements" },
      { title: "Fee Proposal A.Y. 2026-27", path: "/facilities/admin-office/fee-proposal" },
    ],
  },
];

const FacilitiesSidebar = ({ sections }) => {
  const location = useLocation();
  const { isEditing } = useEdit();
  const pathname = location.pathname;

  const getActiveGroup = () => {
    for (const item of menuItems) {
      if (!item.children) continue;
      const childMatch = item.children.some((child) => {
        const childPageId = pathToPageId(child.path);
        return (
          pathname === child.path ||
          (isEditing && pathname === `/admin/visual/${childPageId}`)
        );
      });

      if (childMatch) return item.path;

      const parentPageId = pathToPageId(item.path);
      if (
        pathname === item.path ||
        (isEditing && pathname === `/admin/visual/${parentPageId}`)
      ) {
        return item.path;
      }
    }

    return null;
  };

  const [expandedGroup, setExpandedGroup] = useState(getActiveGroup);

  useEffect(() => {
    const active = getActiveGroup();
    if (active) setExpandedGroup(active);
  }, [pathname, isEditing]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleScroll = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const resolveLink = (path) => {
    const pageId = pathToPageId(path);
    return isEditing ? `/admin/visual/${pageId}` : path;
  };

  const isPathActive = (path) => {
    const pageId = pathToPageId(path);
    return pathname === path || (isEditing && pathname === `/admin/visual/${pageId}`);
  };

  const navContent = (
    <nav>
      <ul className="max-h-[65vh] space-y-1 overflow-y-auto pr-1">
        {menuItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedGroup === item.path;
          const isParentActive = isPathActive(item.path);
          const Icon = item.icon;
          const isGroupActive =
            isParentActive ||
            (hasChildren && item.children.some((child) => isPathActive(child.path)));

          return (
            <li key={item.path}>
              <div className="flex items-center">
                <Link
                  to={resolveLink(item.path)}
                  className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium leading-snug transition-colors ${
                    isGroupActive
                      ? "bg-ssgmce-blue/10 font-semibold text-ssgmce-blue"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`shrink-0 text-xs ${
                      isGroupActive ? "text-ssgmce-blue" : "text-gray-400"
                    }`}
                  />
                  <span className="whitespace-normal">{item.title}</span>
                </Link>

                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setExpandedGroup(isExpanded ? null : item.path)}
                    className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    <FaChevronDown
                      className={`text-[10px] transition-transform duration-200 ${
                        isExpanded ? "" : "-rotate-90"
                      }`}
                    />
                  </button>
                ) : (
                  <FaChevronRight className="mr-3 shrink-0 text-[10px] text-gray-400" />
                )}
              </div>

              {hasChildren && isExpanded ? (
                <ul className="mt-1 mb-2 ml-4 space-y-0.5 border-l-2 border-blue-200 pl-3">
                  {item.children.map((child) => {
                    const isChildActive = isPathActive(child.path);
                    return (
                      <li key={child.path}>
                        <Link
                          to={resolveLink(child.path)}
                          className={`block rounded-md px-3 py-1.5 text-xs leading-snug transition-all duration-200 ${
                            isChildActive
                              ? "bg-ssgmce-blue text-white font-semibold shadow-sm"
                              : "text-gray-500 hover:bg-blue-50 hover:text-ssgmce-blue"
                          }`}
                        >
                          {child.title}
                        </Link>

                        {isChildActive && sections && sections.length > 0 ? (
                          <ul className="mt-1 mb-1 ml-3 space-y-0.5 border-l border-gray-200 pl-2">
                            {sections
                              .filter((section) => section.title && section.title !== "Intro")
                              .sort((a, b) => a.order - b.order)
                              .map((section) => (
                                <li key={section.sectionId}>
                                  <a
                                    href={`#${section.sectionId}`}
                                    onClick={(event) => handleScroll(event, section.sectionId)}
                                    className="block rounded px-2 py-1 text-[11px] text-gray-400 transition-colors hover:bg-blue-50/50 hover:text-ssgmce-blue"
                                  >
                                    {section.title}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              {!hasChildren && isParentActive && sections && sections.length > 0 ? (
                <ul className="mt-1 mb-2 ml-4 space-y-0.5 border-l-2 border-blue-200 pl-3">
                  {sections
                    .filter((section) => section.title && section.title !== "Intro")
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <li key={section.sectionId}>
                        <a
                          href={`#${section.sectionId}`}
                          onClick={(event) => handleScroll(event, section.sectionId)}
                          className="block rounded px-3 py-1.5 text-xs text-gray-500 transition-colors hover:bg-blue-50 hover:text-ssgmce-blue"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      <MobileSidebarToggle title="Facilities" icon={FaBuilding}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaBuilding className="mr-2" /> Facilities
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Need Help?</p>
          <p className="text-xs text-ssgmce-blue">+91-7265-252274</p>
          <p className="text-xs text-ssgmce-blue">info@ssgmce.ac.in</p>
        </div>
      </div>
    </>
  );
};

export default FacilitiesSidebar;
