import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaCertificate } from "react-icons/fa";

const AICTEApprovals19922022 = () => {
  return (
    <AdminOfficePageLayout
      title="AICTE Approvals 1992-2022-23"
      pdfLink="/documents/admin-office/aicte-approvals/AICTE APPROVALS 1992 TO 2022-23.pdf"
      pdfTitle="AICTE Approvals 1992 to 2022-23"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-green-100 p-3">
            <FaCertificate className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AICTE Approvals 1992-2022-23</h2>
            <p className="text-sm text-gray-600">Historical Approval Records</p>
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">About This Document</h3>
          <p className="text-gray-700">
            This comprehensive document contains the complete history of AICTE approvals
            received by SSGMCE from its establishment in 1992 till 2022-23. It showcases
            the institute's continuous compliance with AICTE norms over three decades.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Coverage</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              30+ years of AICTE approval history
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Year-wise approval letters
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Program additions and intake changes
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Compliance records
            </li>
          </ul>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default AICTEApprovals19922022;
