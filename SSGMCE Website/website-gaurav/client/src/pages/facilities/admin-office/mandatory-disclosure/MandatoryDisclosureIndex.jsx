import React from "react";
import { Link } from "react-router-dom";
import { FaFileAlt, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";

const disclosuresList = [
  { title: "Mandatory Disclosure 2025-26", path: "/facilities/admin-office/mandatory-disclosure/2025-26", year: "2025-26", isCurrent: true },
  { title: "Mandatory Disclosure 2024-25", path: "/facilities/admin-office/mandatory-disclosure/2024-25", year: "2024-25", isCurrent: false },
  { title: "Mandatory Disclosure 2023-24", path: "/facilities/admin-office/mandatory-disclosure/2023-24", year: "2023-24", isCurrent: false },
  { title: "Mandatory Disclosure 2022-23", path: "/facilities/admin-office/mandatory-disclosure/2022-23", year: "2022-23", isCurrent: false },
  { title: "Mandatory Disclosure 2021-22", path: "/facilities/admin-office/mandatory-disclosure/2021-22", year: "2021-22", isCurrent: false },
];

const MandatoryDisclosureIndex = () => {
  return (
    <AdminOfficePageLayout title="Mandatory Disclosure">
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">
            AICTE Mandatory Disclosure
          </h2>
          <p className="mt-2 text-gray-600">
            As per AICTE norms, institutions are required to disclose information for transparency.
            Access year-wise mandatory disclosure documents below.
          </p>
        </div>

        <div className="space-y-3">
          {disclosuresList.map((disclosure, index) => (
            <Link
              key={index}
              to={disclosure.path}
              className={`group flex items-center gap-4 rounded-lg border p-5 transition-all hover:shadow-md ${
                disclosure.isCurrent
                  ? "border-green-300 bg-green-50 hover:border-green-400"
                  : "border-gray-200 bg-white hover:border-ssgmce-blue"
              }`}
            >
              <div className={`rounded-lg p-3 transition-colors ${
                disclosure.isCurrent
                  ? "bg-green-100 group-hover:bg-green-200"
                  : "bg-ssgmce-blue/10 group-hover:bg-ssgmce-blue"
              }`}>
                <FaFileAlt className={`h-6 w-6 transition-colors ${
                  disclosure.isCurrent
                    ? "text-green-600"
                    : "text-ssgmce-blue group-hover:text-white"
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold ${
                    disclosure.isCurrent ? "text-green-800" : "text-gray-900 group-hover:text-ssgmce-blue"
                  }`}>
                    {disclosure.title}
                  </h3>
                  {disclosure.isCurrent && (
                    <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-medium text-white">
                      Current
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <FaCalendarAlt className="h-3 w-3" />
                  <span>Academic Year {disclosure.year}</span>
                </div>
              </div>
              <FaChevronRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                disclosure.isCurrent ? "text-green-400" : "text-gray-400 group-hover:text-ssgmce-blue"
              }`} />
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Mandatory Disclosure as per AICTE guidelines includes information about
            faculty, infrastructure, admission criteria, fee structure, and other essential details required
            for transparency.
          </p>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default MandatoryDisclosureIndex;
