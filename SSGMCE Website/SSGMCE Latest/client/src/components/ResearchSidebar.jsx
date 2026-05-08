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
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-ssgmce-blue/10 font-semibold text-ssgmce-blue"
                  : "text-gray-700 hover:bg-gray-100"
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
  );

  return (
    <>
      <MobileSidebarToggle title="Research Links" icon={FaFlask}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaFlask className="mr-2" /> Research & Innovation
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Need Help?</p>
          <p className="text-xs text-ssgmce-blue">+91-7265-252274</p>
          <p className="text-xs text-ssgmce-blue">research@ssgmce.ac.in</p>
        </div>
      </div>
    </>
  );
};

export default ResearchSidebar;
