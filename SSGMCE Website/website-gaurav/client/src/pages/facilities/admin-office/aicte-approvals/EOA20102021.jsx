import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaCertificate } from "react-icons/fa";

const EOA20102021 = () => {
  return (
    <AdminOfficePageLayout
      title="EOA 2010-11 to 2021-22"
      pdfLink="/documents/admin-office/aicte-approvals/EOA_2010-11 to 2021-22.pdf"
      pdfTitle="EOA Reports 2010-11 to 2021-22"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-green-100 p-3">
            <FaCertificate className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">EOA 2010-11 to 2021-22</h2>
            <p className="text-sm text-gray-600">Extension of Approval Records</p>
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">About This Document</h3>
          <p className="text-gray-700">
            This document contains the consolidated Extension of Approval (EOA) records
            from AICTE for the period 2010-11 to 2021-22, covering 12 years of continuous
            approval history.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Document Contents</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              12 years of EOA records (2010-2022)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Year-wise program approvals
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              Intake variations over the years
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              New program additions
            </li>
          </ul>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default EOA20102021;
