import { Link, useLocation } from "react-router-dom";
import { FaGraduationCap, FaChevronRight } from "react-icons/fa";
import { useEdit } from "../contexts/EditContext";
import MobileSidebarToggle from "./MobileSidebarToggle";

const pathToPageId = (path) => path.replace(/^\//, "").replace(/\//g, "-");

const AdmissionsSidebar = () => {
  const location = useLocation();
  const { isEditing } = useEdit();

  const menuItems = [
    { title: "Institute Brochure", path: "/admissions/brochure" },
    { title: "Under-Graduate Program (UG)", path: "/admissions/ug" },
    { title: "Post-Graduate Program (PG)", path: "/admissions/pg" },
    { title: "Direct Second Year Engineering (DSE)", path: "/admissions/dse" },
    { title: "MBA Program", path: "/admissions/mba" },
    { title: "Ph. D. Program", path: "/admissions/phd" },
    { title: "Fee Structure", path: "/admissions/fees" },
    { title: "Admission Process", path: "/admissions/process" },
    { title: "Seat Matrix", path: "/admissions/seat-matrix" },
    { title: "Documents Required", path: "/admissions/documents" },
    { title: "Scholarships", path: "/admissions/scholarships" },
    { title: "FAQs", path: "/admissions/faqs" },
    { title: "Contact Admission Office", path: "/admissions/contact" },
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
      <MobileSidebarToggle title="Admissions" icon={FaGraduationCap}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaGraduationCap className="mr-2" />
            Admissions
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Need Help?</p>
          <p className="text-xs text-ssgmce-blue">Phone: +91-7265-252274</p>
          <p className="text-xs text-ssgmce-blue">Email: admission@ssgmce.ac.in</p>
        </div>
      </div>
    </>
  );
};

export default AdmissionsSidebar;
