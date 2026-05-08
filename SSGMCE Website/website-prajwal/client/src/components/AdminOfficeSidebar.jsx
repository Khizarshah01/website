import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBuilding, FaChevronRight, FaArrowLeft } from "react-icons/fa";

const AdminOfficeSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Services Offered by College",
      path: "/facilities/admin-office/services-college",
    },
    {
      title: "Services Offered by University",
      path: "/facilities/admin-office/services-university",
    },
    {
      title: "Information Brochure",
      path: "/facilities/admin-office/brochure",
    },
    {
      title: "Policies & Procedures",
      path: "/facilities/admin-office/policies",
    },
    {
      title: "Mandatory Disclosure",
      path: "/facilities/admin-office/mandatory-disclosure",
    },
    {
      title: "AICTE Approvals",
      path: "/facilities/admin-office/aicte-approvals",
    },
    {
      title: "Financial Statements",
      path: "/facilities/admin-office/financial-statements",
    },
    {
      title: "Fee Proposal A.Y. 2026-27",
      path: "/facilities/admin-office/fee-proposal",
    },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  const renderMenuItem = (item, index) => (
    <li key={index}>
      <Link
        to={item.path}
        className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm leading-snug transition-colors ${
          isActive(item.path)
            ? "border-l-2 border-ssgmce-orange bg-orange-50 font-semibold text-ssgmce-blue"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="whitespace-normal">{item.title}</span>
        <FaChevronRight className="shrink-0 text-[10px] text-gray-400" />
      </Link>
    </li>
  );

  return (
    <div className="sticky top-24 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
        <Link
          to="/facilities"
          className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-white/20 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-white/30"
        >
          <FaArrowLeft className="text-[10px]" />
          Back to Facilities
        </Link>
        <h3 className="flex items-center text-lg font-bold text-white">
          <FaBuilding className="mr-2" /> Administrative Office
        </h3>
      </div>

      <div className="p-3">
        <nav>
          <ul className="max-h-[500px] space-y-1.5 overflow-y-auto">
            {menuItems.map(renderMenuItem)}
          </ul>
        </nav>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <p className="mb-1 text-xs font-semibold text-gray-500">
          Administrative Office
        </p>
        <p className="text-xs text-ssgmce-blue">📧 admin@ssgmce.ac.in</p>
        <p className="text-xs text-ssgmce-blue">📞 07152-241602</p>
      </div>
    </div>
  );
};

export default AdminOfficeSidebar;
