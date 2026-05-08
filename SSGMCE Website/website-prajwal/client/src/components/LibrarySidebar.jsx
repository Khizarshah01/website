import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBook, FaChevronRight } from "react-icons/fa";
import { useEdit } from "../contexts/EditContext";
import MobileSidebarToggle from "./MobileSidebarToggle";

const pathToPageId = (path) => path.replace(/^\//, "").replace(/\//g, "-");

const LibrarySidebar = () => {
  const location = useLocation();
  const { isEditing } = useEdit();

  const menuItems = [
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
  ];

  const navContent = (
    <nav>
      <ul className="space-y-1.5">
        {menuItems.map((item) => {
          const pageId = pathToPageId(item.path);
          const to = isEditing ? `/admin/visual/${pageId}` : item.path;
          const isActive =
            location.pathname === item.path ||
            (isEditing && location.pathname === `/admin/visual/${pageId}`);

          return (
            <li key={item.path}>
              <Link
                to={to}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm leading-snug transition-colors ${
                  isActive
                    ? "border-l-2 border-ssgmce-orange bg-orange-50 font-semibold text-ssgmce-blue"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="whitespace-normal">{item.title}</span>
                <FaChevronRight className="shrink-0 text-[10px] text-gray-400" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      <MobileSidebarToggle title="Library" icon={FaBook}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaBook className="mr-2" /> Library
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Library Contact</p>
          <p className="text-xs text-ssgmce-blue">library@ssgmce.ac.in</p>
          <p className="text-xs text-ssgmce-blue">8:30 AM - 5:30 PM</p>
        </div>
      </div>
    </>
  );
};

export default LibrarySidebar;
