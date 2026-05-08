import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaFileInvoiceDollar } from "react-icons/fa";

const FinancialStatement201819 = () => {
  return (
    <AdminOfficePageLayout
      title="Financial Statement 2018-19"
      pdfLink="/documents/admin-office/financial-statements/College Financial Statement 2018-19.pdf"
      pdfTitle="Financial Statement 2018-19"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-blue-100 p-3">
            <FaFileInvoiceDollar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Financial Statement 2018-19</h2>
            <p className="text-sm text-gray-600">Audited Financial Statement</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <p className="text-gray-700">
            Audited financial statement for the financial year 2018-19.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Financial Statement Includes</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600"></span>
              Balance Sheet
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600"></span>
              Income and Expenditure Account
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

export default FinancialStatement201819;
