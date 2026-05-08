import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaChevronRight, FaAward } from "react-icons/fa";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";

const approvalsList = [
  {
    title: "EOA Three Year Approval 2024-25",
    path: "/facilities/admin-office/aicte-approvals/eoa-three-year-2024-25",
    description: "Extension of Approval for three years (2024-27)",
    highlight: true
  },
  {
    title: "EOA Report 2023-24",
    path: "/facilities/admin-office/aicte-approvals/eoa-2023-24",
    description: "Extension of Approval for academic year 2023-24",
    highlight: false
  },
  {
    title: "AICTE Approvals 1992-2022-23",
    path: "/facilities/admin-office/aicte-approvals/approvals-1992-2022",
    description: "Historical record of all AICTE approvals from establishment",
    highlight: false
  },
  {
    title: "EOA 2010-11 to 2021-22",
    path: "/facilities/admin-office/aicte-approvals/eoa-2010-2021",
    description: "Extension of Approval records for 12 academic years",
    highlight: false
  },
];

const AICTEApprovalsIndex = () => {
  return (
    <AdminOfficePageLayout title="AICTE Approvals">
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-2">
              <FaAward className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                AICTE Approvals & EOA Letters
              </h2>
              <p className="text-sm text-gray-600">
                All India Council for Technical Education
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            SSGM College of Engineering, Shegaon has been consistently approved by AICTE since its establishment.
            Access all approval letters and Extension of Approval (EOA) documents below.
          </p>
        </div>

        <div className="space-y-4">
          {approvalsList.map((approval, index) => (
            <Link
              key={index}
              to={approval.path}
              className={`group flex items-center gap-4 rounded-lg border p-5 transition-all hover:shadow-md ${
                approval.highlight
                  ? "border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 hover:border-orange-400"
                  : "border-gray-200 bg-white hover:border-ssgmce-blue"
              }`}
            >
              <div className={`rounded-full p-3 transition-colors ${
                approval.highlight
                  ? "bg-orange-100"
                  : "bg-green-100 group-hover:bg-green-200"
              }`}>
                <FaCheckCircle className={`h-6 w-6 ${
                  approval.highlight ? "text-orange-600" : "text-green-600"
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold ${
                    approval.highlight ? "text-orange-800" : "text-gray-900 group-hover:text-ssgmce-blue"
                  }`}>
                    {approval.title}
                  </h3>
                  {approval.highlight && (
                    <span className="rounded-full bg-orange-600 px-2 py-0.5 text-xs font-medium text-white">
                      Latest
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {approval.description}
                </p>
              </div>
              <FaChevronRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                approval.highlight ? "text-orange-400" : "text-gray-400 group-hover:text-ssgmce-blue"
              }`} />
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-green-50 border border-green-200 p-5">
          <div className="flex items-start gap-3">
            <FaCheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">AICTE Approved Institution</h4>
              <p className="mt-1 text-sm text-green-700">
                SSGMCE Shegaon is an AICTE approved institution established in 1992.
                The college has been consistently receiving Extension of Approval (EOA) from AICTE
                for all its undergraduate and postgraduate programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default AICTEApprovalsIndex;
