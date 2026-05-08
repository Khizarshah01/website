import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import { useEdit } from "../contexts/EditContext";
import MobileSidebarToggle from "./MobileSidebarToggle";
import { DOCUMENT_SECTIONS } from "../data/documentsCatalog";

const adminLinks = [
  { pageId: "documents-policies", label: "Policies and Procedure" },
  { pageId: "documents-mandatory", label: "Mandatory Disclosure" },
  { pageId: "documents-naac", label: "NAAC" },
  { pageId: "documents-nba", label: "NBA" },
  { pageId: "documents-iso", label: "ISO" },
  { pageId: "documents-nirf", label: "NIRF" },
  { pageId: "documents-audit", label: "Sustainable Audit" },
  { pageId: "documents-aicte", label: "AICTE Approval" },
  { pageId: "documents-financial", label: "Financial Statements" },
  { pageId: "documents-newsletter", label: "News Letters" },
  { pageId: "documents-tattwadarshi", label: "e-Tattwadarshi" },
];

const pathToPageId = (path) => path.replace(/^\//, "").replace(/\//g, "-");

const filteredDocumentLinks = DOCUMENT_SECTIONS
  .filter((section) => section.id !== "office")
  .map((section) => ({
    name: section.label,
    path: `/documents/${section.id}`,
  }));

const DocumentsSidebar = ({ sections }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isEditing } = useEdit();
  const isAdminEditor =
    location.pathname.startsWith("/admin/pages/editor/") ||
    location.pathname.startsWith("/admin/visual/");

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

  const handleLinkClick = (e, path) => {
    if (isEditing) {
      e.preventDefault();
      navigate(`/admin/visual/${pathToPageId(path)}`);
    }
  };

  const publicNavContent = (
    <nav>
      <ul className="space-y-1">
        {filteredDocumentLinks.map((link) => {
          const isActive =
            location.pathname === link.path ||
            (isEditing &&
              location.pathname === `/admin/visual/${pathToPageId(link.path)}`);

          return (
            <li key={link.path}>
              <Link
                to={isEditing ? `/admin/visual/${pathToPageId(link.path)}` : link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-ssgmce-blue/10 font-semibold text-ssgmce-blue"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>

              {isActive && sections && sections.length > 0 && (
                <ul className="mt-1 mb-2 ml-4 space-y-1 border-l-2 border-blue-200 pl-3">
                  {sections.map((section) => (
                    <li key={section.sectionId}>
                      <a
                        href={`#${section.sectionId}`}
                        onClick={(e) => handleScroll(e, section.sectionId)}
                        className="block rounded px-3 py-1.5 text-xs text-gray-500 transition-colors hover:bg-blue-50 hover:text-ssgmce-blue"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const adminNavContent = (
    <div className="space-y-1">
      {adminLinks.map((link) => {
        const targetPath = `/admin/visual/${link.pageId}`;
        const isActive = location.pathname === targetPath;

        return (
          <Link
            key={link.pageId}
            to={targetPath}
            className={`block rounded-xl px-4 py-2.5 text-sm transition ${
              isActive
                ? "bg-ssgmce-blue/10 font-semibold text-ssgmce-blue"
                : "text-slate-700 hover:bg-slate-100 hover:text-ssgmce-blue"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );

  const navContent = isAdminEditor ? adminNavContent : publicNavContent;

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
