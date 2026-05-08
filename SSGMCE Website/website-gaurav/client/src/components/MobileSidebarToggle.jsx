import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const MobileSidebarToggle = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="mb-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 text-base font-semibold text-gray-800">
          {Icon ? <Icon className="text-sm text-ssgmce-blue" /> : null}
          {title}
        </span>
        <FaChevronDown
          className={`text-xs text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen ? <div className="border-t border-gray-100 p-3">{children}</div> : null}
    </div>
  );
};

export default MobileSidebarToggle;
