import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaCertificate } from "react-icons/fa";

const EOA202324 = () => {
  return (
    <AdminOfficePageLayout
      title="EOA Report 2023-24"
      pdfLink="/documents/admin-office/aicte-approvals/EOA-Report-2023-24.PDF"
      pdfTitle="EOA Report 2023-24"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-green-100 p-3">
            <FaCertificate className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">EOA Report 2023-24</h2>
            <p className="text-sm text-gray-600">Extension of Approval from AICTE</p>
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">About This Document</h3>
          <p className="text-gray-700">
            This document contains the Extension of Approval (EOA) report from AICTE
            for the academic year 2023-24, confirming the institute's approval status
            and program-wise intake.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Document Details</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Program-wise approval details
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Intake sanctioned for each program
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Compliance status
            </li>
          </ul>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default EOA202324;
