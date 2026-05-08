import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFlask } from "react-icons/fa";
import { useEdit } from "../contexts/EditContext";
import MobileSidebarToggle from "./MobileSidebarToggle";

const links = [
  { name: "RD Cell", path: "/research/rdc" },
  { name: "Research Policy", path: "/research/policy" },
  { name: "Centre of Excellence", path: "/research/coe" },
  { name: "Ph.D. Centre", path: "/research/phd" },
  { name: "Publications", path: "/research/publications" },
  { name: "IPR (Patents & Copyrights)", path: "/research/ipr" },
  { name: "UG Projects", path: "/research/ug-projects" },
  { name: "Collaboration", path: "/research/collaboration" },
  { name: "IIC", path: "/research/iic" },
  { name: "NISP", path: "/research/nisp" },
  { name: "Sabbatical Training", path: "/research/sabbatical" },
];

const pathToPageId = (path) => path.replace(/^\//, "").replace(/\//g, "-");

const ResearchSidebar = ({ sections }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isEditing } = useEdit();

  const handleScroll = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);

    if (!element) return;

    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const handleLinkClick = (event, path) => {
    if (!isEditing) return;
    event.preventDefault();
    navigate(`/admin/visual/${pathToPageId(path)}`);
  };

  const navContent = (
    <ul className="space-y-1">
      {links.map((link) => {
        const editorPath = `/admin/visual/${pathToPageId(link.path)}`;
        const isActive =
          location.pathname === link.path ||
          (isEditing && location.pathname === editorPath);

        return (
          <li key={link.path}>
            <Link
              to={isEditing ? editorPath : link.path}
              onClick={(event) => handleLinkClick(event, link.path)}
              className={`block px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-ssgmce-blue text-white shadow-md transform translate-x-1"
                  : "text-gray-600 hover:bg-gray-50 hover:text-ssgmce-blue"
              }`}
            >
              {link.name}
            </Link>

            {isActive && sections && sections.length > 0 && (
              <ul className="mt-1 mb-2 ml-4 pl-3 border-l-2 border-blue-200 space-y-1">
                {sections
                  .filter((section) => section.title && section.title !== "Intro")
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <li key={section.sectionId}>
                      <a
                        href={`#${section.sectionId}`}
                        onClick={(event) =>
                          handleScroll(event, section.sectionId)
                        }
                        className="block px-3 py-1.5 text-xs text-gray-500 hover:text-ssgmce-blue hover:bg-blue-50 rounded transition-colors"
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
  );

  return (
    <>
      <MobileSidebarToggle title="Research Links" icon={FaFlask}>
        {navContent}
      </MobileSidebarToggle>
      <div className="hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:block">
      <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center">
        <span className="w-1.5 h-6 bg-ssgmce-orange rounded-full mr-2"></span>
        <FaFlask className="text-ssgmce-blue mr-2" />
        Research & Innovation
      </h3>
      {navContent}
    </div>
    </>
  );
};

export default ResearchSidebar;
