import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTrophy, FaChevronRight } from "react-icons/fa";
import { useEdit } from "../contexts/EditContext";
import MobileSidebarToggle from "./MobileSidebarToggle";

const pathToPageId = (path) => path.replace(/^\//, "").replace(/\//g, "-");

const SportsSidebar = () => {
  const location = useLocation();
  const { isEditing } = useEdit();

  const menuItems = [
    { title: "About Sport Department", path: "/facilities/sports/about" },
    { title: "Sports Council", path: "/facilities/sports/council" },
    { title: "Indoor Sport Facility", path: "/facilities/sports/indoor" },
    { title: "Outdoor Sport Facility", path: "/facilities/sports/outdoor" },
    { title: "Sports Achievement", path: "/facilities/sports/achievements" },
    { title: "Sport Statistics", path: "/facilities/sports/statistics" },
    { title: "Sport Staff & Contact", path: "/facilities/sports/staff" },
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
      <MobileSidebarToggle title="Sports" icon={FaTrophy}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaTrophy className="mr-2" /> Sports
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Sports Office</p>
          <p className="text-xs text-ssgmce-blue">sports@ssgmce.ac.in</p>
          <p className="text-xs text-ssgmce-blue">Ext: 105</p>
        </div>
      </div>
    </>
  );
};

export default SportsSidebar;
