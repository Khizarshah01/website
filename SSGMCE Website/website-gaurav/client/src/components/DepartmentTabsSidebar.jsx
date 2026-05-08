import React from "react";
import { FaBuilding, FaChevronRight, FaIndustry, FaUniversity } from "react-icons/fa";
import MobileSidebarToggle from "./MobileSidebarToggle";

const SidebarGroup = ({
  title,
  links,
  activeTab,
  onTabChange,
  icon: Icon,
  renderLabel,
}) => {
  if (!Array.isArray(links) || links.length === 0) return null;

  return (
    <li>
      <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </p>
      <ul className="space-y-1">
        {links.map((link, index) => {
          const isActive = activeTab === link.id;
          const labelNode = renderLabel ? renderLabel(link, index) : link.label;
          return (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => onTabChange(link.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium leading-snug transition-colors ${
                  isActive
                    ? "bg-ssgmce-blue/10 font-semibold text-ssgmce-blue"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isActive ? "bg-ssgmce-blue" : "bg-gray-300"
                    }`}
                  />
                  <span className="whitespace-normal">{labelNode}</span>
                </span>
                <FaChevronRight
                  className={`shrink-0 text-[10px] ${
                    isActive ? "text-ssgmce-blue" : "text-gray-400"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
      {Icon ? (
        <div className="pointer-events-none hidden">
          <Icon />
        </div>
      ) : null}
    </li>
  );
};

const DepartmentTabsSidebar = ({
  title = "Department",
  activeTab,
  onTabChange,
  academicsLinks = [],
  industryLinks = [],
  academicsTitle = "Academics",
  industryTitle = "Industry Relation",
  renderAcademicsLabel,
  renderIndustryLabel,
}) => {
  const navContent = (
    <nav>
      <ul className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <SidebarGroup
          title={academicsTitle}
          links={academicsLinks}
          activeTab={activeTab}
          onTabChange={onTabChange}
          icon={FaUniversity}
          renderLabel={renderAcademicsLabel}
        />

        <SidebarGroup
          title={industryTitle}
          links={industryLinks}
          activeTab={activeTab}
          onTabChange={onTabChange}
          icon={FaIndustry}
          renderLabel={renderIndustryLabel}
        />
      </ul>
    </nav>
  );

  return (
    <>
      <MobileSidebarToggle title={title} icon={FaBuilding}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaBuilding className="mr-2" /> {title}
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Need Help?</p>
          <p className="text-xs text-ssgmce-blue">+91-7265-252274</p>
          <p className="text-xs text-ssgmce-blue">info@ssgmce.ac.in</p>
        </div>
      </div>
    </>
  );
};

export default DepartmentTabsSidebar;
