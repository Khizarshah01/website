import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaCertificate } from "react-icons/fa";

const EOAThreeYear202425 = () => {
  return (
    <AdminOfficePageLayout
      title="EOA Three Year Approval 2024-25"
      pdfLink="/documents/admin-office/aicte-approvals/EOA Three Year Approval along with 2024-25 Approval.pdf"
      pdfTitle="EOA Three Year Approval with 2024-25"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-green-100 p-3">
            <FaCertificate className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">EOA Three Year Approval 2024-25</h2>
            <p className="text-sm text-gray-600">Extension of Approval from AICTE</p>
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">About This Document</h3>
          <p className="text-gray-700">
            This document contains the Extension of Approval (EOA) granted by AICTE for
            a period of three years along with the approval for academic year 2024-25.
            The EOA confirms the institute's compliance with AICTE norms and standards.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Key Highlights</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Three-year approval period for institute operations
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Approved intake for all programs
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Compliance with AICTE norms
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Recognition for conducting courses
            </li>
          </ul>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default EOAThreeYear202425;
