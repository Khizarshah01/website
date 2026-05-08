import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import MobileSidebarToggle from "./MobileSidebarToggle";

const links = [
  {
    path: "/documents/policies",
    pageId: "documents-policies",
    label: "Policies and Procedure",
  },
  {
    path: "/documents/disclosure",
    pageId: "documents-mandatory",
    label: "Mandatory Disclosure",
  },
  {
    path: "/documents/naac",
    pageId: "documents-naac",
    label: "NAAC",
    subsections: [
      { id: "naac-status", title: "Accreditation Status" },
      { id: "naac-cycles", title: "Accreditation Cycles" },
    ],
  },
  {
    path: "/documents/nba",
    pageId: "documents-nba",
    label: "NBA",
    subsections: [
      { id: "nba-status", title: "Accreditation Status" },
      { id: "nba-table", title: "Accreditation Details" },
    ],
  },
  { path: "/documents/iso", pageId: "documents-iso", label: "ISO" },
  {
    path: "/documents/nirf",
    pageId: "documents-nirf",
    label: "NIRF",
    subsections: [
      { id: "nirf-about", title: "About NIRF" },
      { id: "nirf-rankings", title: "Rankings" },
    ],
  },
  {
    path: "/documents/audit",
    pageId: "documents-audit",
    label: "Sustainable Audit",
    subsections: [
      { id: "audit-about", title: "About" },
      { id: "audit-energy", title: "Energy Audit" },
      { id: "audit-environmental", title: "Environmental Audit" },
      { id: "audit-green", title: "Green Audit" },
    ],
  },
  { path: "/documents/aicte", pageId: "documents-aicte", label: "AICTE Approval" },
  { path: "/documents/financial", pageId: "documents-financial", label: "Financial Statements" },
  { path: "/documents/newsletter", pageId: "documents-newsletter", label: "News Letters" },
  { path: "/documents/tattwadarshi", pageId: "documents-tattwadarshi", label: "e-Tattwadarshi" },
];

const DocumentsSidebar = () => {
  const location = useLocation();
  const { pageId: activeAdminPageId } = useParams();
  const isAdminEditor =
    location.pathname.startsWith("/admin/pages/editor/") ||
    location.pathname.startsWith("/admin/visual/");

  const getAdminBasePath = () =>
    location.pathname.startsWith("/admin/visual/")
      ? "/admin/visual"
      : "/admin/pages/editor";

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
        const targetPath =
          isAdminEditor && link.pageId
            ? `${getAdminBasePath()}/${link.pageId}`
            : link.path;
        const isActive = isAdminEditor
          ? activeAdminPageId === link.pageId
          : location.pathname === link.path;
        return (
          <li key={link.path}>
            <Link
              to={targetPath}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-ssgmce-blue/10 font-semibold text-ssgmce-blue"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>

            {!isAdminEditor && isActive && link.subsections && link.subsections.length > 0 && (
              <ul className="mt-1 mb-2 ml-4 pl-3 border-l-2 border-blue-200 space-y-1">
                {link.subsections.map((sub) => (
                  <li key={sub.id}>
                    <a
                      href={`#${sub.id}`}
                      onClick={(e) => handleScroll(e, sub.id)}
                        className="block rounded px-3 py-1.5 text-xs text-gray-500 transition-colors hover:bg-blue-50 hover:text-ssgmce-blue"
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
      <MobileSidebarToggle title="Documents" icon={FaFileAlt}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaFileAlt className="mr-2" /> Documents
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Need Help?</p>
          <p className="text-xs text-ssgmce-blue">+91-7265-252274</p>
          <p className="text-xs text-ssgmce-blue">documents@ssgmce.ac.in</p>
        </div>
      </div>
    </>
  );
};

export default DocumentsSidebar;
