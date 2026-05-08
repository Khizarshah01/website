import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { useEdit } from "../contexts/EditContext";
import MobileSidebarToggle from "./MobileSidebarToggle";

const pathToPageId = (path) => path.replace(/^\//, "").replace(/\//g, "-");

const HostelSidebar = () => {
  const location = useLocation();
  const { isEditing } = useEdit();

  const menuItems = [
    { title: "Hostel Policy, Rule and Code of Conduct", path: "/facilities/hostel/policy" },
    { title: "Hostel Committee", path: "/facilities/hostel/committee" },
    { title: "Hostel Brochure", path: "/facilities/hostel/brochure" },
    { title: "Anti-Ragging Committee", path: "/facilities/hostel/anti-ragging" },
    { title: "Minutes of the Meeting", path: "/facilities/hostel/minutes" },
    { title: "Anti-Ragging Committee Annual Reports", path: "/facilities/hostel/reports" },
    { title: "Anti-Ragging Posters", path: "/facilities/hostel/posters" },
    { title: "AICTE Letters", path: "/facilities/hostel/aicte" },
    { title: "Anti-Ragging Notices", path: "/facilities/hostel/notices" },
    { title: "Hostel Fee Structure", path: "/facilities/hostel/fees" },
    { title: "Hostel Accommodation Provision", path: "/facilities/hostel/accommodation" },
    { title: "Hostel Admission form", path: "/facilities/hostel/admission" },
    { title: "Hostel Feedback form", path: "/facilities/hostel/feedback" },
  ];

  const navContent = (
    <nav>
      <ul className="max-h-[560px] space-y-1.5 overflow-y-auto">
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
      <MobileSidebarToggle title="Hostel" icon={FaHome}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaHome className="mr-2" /> Hostel
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Hostel Office</p>
          <p className="text-xs text-ssgmce-blue">hostel@ssgmce.ac.in</p>
          <p className="text-xs text-ssgmce-blue">Hostel Warden</p>
        </div>
      </div>
    </>
  );
};

export default HostelSidebar;
