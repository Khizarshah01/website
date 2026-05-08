import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaFileInvoiceDollar } from "react-icons/fa";

const FinancialStatement202425 = () => {
  return (
    <AdminOfficePageLayout
      title="Balance Sheet 2024-25"
      pdfLink="/documents/admin-office/financial-statements/BALANCE SHEET 2024-25.pdf"
      pdfTitle="Balance Sheet 2024-25"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-blue-100 p-3">
            <FaFileInvoiceDollar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Balance Sheet 2024-25</h2>
            <p className="text-sm text-gray-600">Audited Financial Statement</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">About This Document</h3>
          <p className="text-gray-700">
            This document contains the audited balance sheet of SSGMCE for the financial
            year 2024-25, providing a comprehensive view of the institute's financial
            position and health.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Financial Statement Includes</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600"></span>
              Balance Sheet as on March 31, 2025
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600"></span>
              Income and Expenditure Account
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600"></span>
              Schedules and Notes to Accounts
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600"></span>
              Auditor's Report
            </li>
          </ul>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default FinancialStatement202425;
