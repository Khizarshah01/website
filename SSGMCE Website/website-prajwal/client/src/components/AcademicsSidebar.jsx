import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGraduationCap, FaChevronRight } from "react-icons/fa";
import {
  ACADEMICS_PAGE_LINKS,
  academicsPathToPageId,
} from "../constants/academicsPages";
import { useEdit } from "../contexts/EditContext";
import MobileSidebarToggle from "./MobileSidebarToggle";

const AcademicsSidebar = () => {
  const location = useLocation();
  const { isEditing } = useEdit();

  const navContent = (
    <nav>
      <ul className="space-y-1.5">
        {ACADEMICS_PAGE_LINKS.map((link) => {
          const pageId = academicsPathToPageId(link.path);
          const to = isEditing
            ? `/admin/academics?pageId=${pageId}`
            : link.path;
          const isActive =
            location.pathname === link.path ||
            (isEditing &&
              location.pathname === "/admin/academics" &&
              new URLSearchParams(location.search).get("pageId") === pageId);
          return (
            <li key={link.path}>
              <Link
                to={to}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm leading-snug transition-colors ${
                  isActive
                    ? "border-l-2 border-ssgmce-saffron bg-ssgmce-saffron/10 font-semibold text-ssgmce-blue"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="whitespace-normal">{link.label}</span>
                <FaChevronRight className="shrink-0 text-[10px]" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      <MobileSidebarToggle title="Academics" icon={FaGraduationCap}>
        {navContent}
      </MobileSidebarToggle>
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
      <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
        <h3 className="flex items-center text-lg font-bold text-white">
          <FaGraduationCap className="mr-2" />
          Academics
        </h3>
      </div>
      <div className="p-3">
        {navContent}
      </div>
    </div>
    </>
  );
};

export default AcademicsSidebar;
