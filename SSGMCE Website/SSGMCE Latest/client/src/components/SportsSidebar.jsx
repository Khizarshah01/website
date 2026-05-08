import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTrophy, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import { useEdit } from "../contexts/EditContext";
import { buildReturnState } from "../utils/navigation";
import MobileSidebarToggle from "./MobileSidebarToggle";

const pathToPageId = (path) => path.replace(/^\//, "").replace(/\//g, "-");

const SportsSidebar = () => {
  const location = useLocation();
  const { isEditing } = useEdit();
  const facilitiesRootPath = "/facilities";
  const facilitiesRootPageId = pathToPageId(facilitiesRootPath);
  const backToFacilities = isEditing
    ? `/admin/visual/${facilitiesRootPageId}`
    : facilitiesRootPath;

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
                state={isEditing ? buildReturnState(location) : undefined}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm leading-snug transition-colors ${
                  isActive
                    ? "bg-ssgmce-blue/10 font-semibold text-ssgmce-blue"
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
        <div className="mb-3">
          <Link
            to={backToFacilities}
            state={isEditing ? buildReturnState(location) : undefined}
            className="inline-flex items-center gap-1.5 rounded-md bg-ssgmce-blue/10 px-2.5 py-1 text-xs font-medium text-ssgmce-blue transition-colors hover:bg-ssgmce-blue/15"
          >
            <FaArrowLeft className="text-[10px]" />
            Back to Facilities
          </Link>
        </div>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <Link
            to={backToFacilities}
            state={isEditing ? buildReturnState(location) : undefined}
            className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-white/20 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-white/30"
          >
            <FaArrowLeft className="text-[10px]" />
            Back to Facilities
          </Link>
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
