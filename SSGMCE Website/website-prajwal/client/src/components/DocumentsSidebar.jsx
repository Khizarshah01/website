import React from "react";
import { Link, useLocation } from "react-router-dom";
import MobileSidebarToggle from "./MobileSidebarToggle";

const links = [
  {
    path: "/documents/policies",
    label: "Policies and Procedure",
  },
  {
    path: "/documents/disclosure",
    label: "Mandatory Disclosure",
  },
  {
    path: "/documents/naac",
    label: "NAAC",
    subsections: [
      { id: "naac-status", title: "Accreditation Status" },
      { id: "naac-cycles", title: "Accreditation Cycles" },
    ],
  },
  {
    path: "/documents/nba",
    label: "NBA",
    subsections: [
      { id: "nba-status", title: "Accreditation Status" },
      { id: "nba-table", title: "Accreditation Details" },
    ],
  },
  { path: "/documents/iso", label: "ISO" },
  {
    path: "/documents/nirf",
    label: "NIRF",
    subsections: [
      { id: "nirf-about", title: "About NIRF" },
      { id: "nirf-rankings", title: "Rankings" },
    ],
  },
  {
    path: "/documents/audit",
    label: "Sustainable Audit",
    subsections: [
      { id: "audit-about", title: "About" },
      { id: "audit-energy", title: "Energy Audit" },
      { id: "audit-environmental", title: "Environmental Audit" },
      { id: "audit-green", title: "Green Audit" },
    ],
  },
  { path: "/documents/aicte", label: "AICTE Approval" },
  { path: "/documents/financial", label: "Financial Statements" },
  { path: "/documents/newsletter", label: "News Letters" },
  { path: "/documents/tattwadarshi", label: "e-Tattwadarshi" },
];

const DocumentsSidebar = () => {
  const location = useLocation();

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navContent = (
    <ul className="space-y-1">
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-ssgmce-blue text-white shadow-md transform translate-x-1"
                  : "text-gray-600 hover:bg-gray-50 hover:text-ssgmce-blue"
              }`}
            >
              {link.label}
            </Link>

            {isActive && link.subsections && link.subsections.length > 0 && (
              <ul className="mt-1 mb-2 ml-4 pl-3 border-l-2 border-blue-200 space-y-1">
                {link.subsections.map((sub) => (
                  <li key={sub.id}>
                    <a
                      href={`#${sub.id}`}
                      onClick={(e) => handleScroll(e, sub.id)}
                      className="block px-3 py-1.5 text-xs text-gray-500 hover:text-ssgmce-blue hover:bg-blue-50 rounded transition-colors"
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <MobileSidebarToggle title="Documents">
        {navContent}
      </MobileSidebarToggle>
      <aside className="hidden h-fit lg:block lg:sticky lg:top-36 lg:self-start lg:w-72">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center">
          <span className="w-1.5 h-6 bg-ssgmce-orange rounded-full mr-2"></span>
          Quick Links
        </h3>
        {navContent}
      </div>
      </aside>
    </>
  );
};

export default DocumentsSidebar;
