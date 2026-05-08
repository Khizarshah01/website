import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLaptop, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import { useEdit } from "../contexts/EditContext";
import { buildReturnState } from "../utils/navigation";

/** Convert a public path to a pageId slug: /facilities/computing/labs -> facilities-computing-labs */
const pathToPageId = (path) => path.replace(/^\//, "").replace(/\//g, "-");

const ComputingSidebar = () => {
  const location = useLocation();
  const { isEditing } = useEdit();
  const facilitiesRootPath = "/facilities";
  const facilitiesRootPageId = pathToPageId(facilitiesRootPath);
  const backToFacilities = isEditing
    ? `/admin/visual/${facilitiesRootPageId}`
    : facilitiesRootPath;

  const menuItems = [
    { title: "Computer Labs", path: "/facilities/computing/labs" },
    { title: "Software & Tools", path: "/facilities/computing/software" },
    { title: "Network Infrastructure", path: "/facilities/computing/network" },
    { title: "Support & Policies", path: "/facilities/computing/support" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24">
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
          <FaLaptop className="mr-2" /> Computing Facility
        </h3>
      </div>

      <div className="p-3">
        <nav>
          <ul className="space-y-1.5">
            {menuItems.map((item, index) => {
              const pageId = pathToPageId(item.path);
              const to = isEditing ? `/admin/visual/${pageId}` : item.path;
              const isActive =
                location.pathname === item.path ||
                (isEditing && location.pathname === `/admin/visual/${pageId}`);

              return (
                <li key={index}>
                  <Link
                    to={to}
                    state={isEditing ? buildReturnState(location) : undefined}
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
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <p className="mb-1 text-xs font-semibold text-gray-500">Computing Cell</p>
        <p className="text-xs text-ssgmce-blue">computing@ssgmce.ac.in</p>
      </div>
    </div>
  );
};

export default ComputingSidebar;
