import React from "react";
import { Link } from "react-router-dom";
import { FaFileInvoiceDollar, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";

const statementsList = [
  { title: "Balance Sheet 2024-25", path: "/facilities/admin-office/financial-statements/2024-25", year: "2024-25", isCurrent: true },
  { title: "Balance Sheet 2023-24", path: "/facilities/admin-office/financial-statements/2023-24", year: "2023-24", isCurrent: false },
  { title: "Financial Statement 2022-23", path: "/facilities/admin-office/financial-statements/2022-23", year: "2022-23", isCurrent: false },
  { title: "Financial Statement 2021-22", path: "/facilities/admin-office/financial-statements/2021-22", year: "2021-22", isCurrent: false },
  { title: "Financial Statement 2020-21", path: "/facilities/admin-office/financial-statements/2020-21", year: "2020-21", isCurrent: false },
  { title: "Financial Statement 2019-20", path: "/facilities/admin-office/financial-statements/2019-20", year: "2019-20", isCurrent: false },
  { title: "Financial Statement 2018-19", path: "/facilities/admin-office/financial-statements/2018-19", year: "2018-19", isCurrent: false },
];

const FinancialStatementsIndex = () => {
  return (
    <AdminOfficePageLayout title="Financial Statements">
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-100 p-2">
              <FaFileInvoiceDollar className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Financial Statements & Balance Sheets
              </h2>
              <p className="text-sm text-gray-600">
                Audited financial documents
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            Access audited financial statements and balance sheets for transparency
            and accountability. These documents are available as per AICTE and UGC guidelines.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {statementsList.map((statement, index) => (
            <Link
              key={index}
              to={statement.path}
              className={`group flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-md ${
                statement.isCurrent
                  ? "border-emerald-300 bg-emerald-50 hover:border-emerald-400 sm:col-span-2"
                  : "border-gray-200 bg-white hover:border-ssgmce-blue"
              }`}
            >
              <div className={`rounded-lg p-2.5 transition-colors ${
                statement.isCurrent
                  ? "bg-emerald-100"
                  : "bg-gray-100 group-hover:bg-ssgmce-blue"
              }`}>
                <FaFileInvoiceDollar className={`h-5 w-5 transition-colors ${
                  statement.isCurrent
                    ? "text-emerald-600"
                    : "text-gray-500 group-hover:text-white"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold ${
                    statement.isCurrent ? "text-emerald-800" : "text-gray-900 group-hover:text-ssgmce-blue"
                  }`}>
                    {statement.title}
                  </h3>
                  {statement.isCurrent && (
                    <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white">
                      Latest
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <FaCalendarAlt className="h-3 w-3" />
                  <span>Financial Year {statement.year}</span>
                </div>
              </div>
              <FaChevronRight className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${
                statement.isCurrent ? "text-emerald-400" : "text-gray-400 group-hover:text-ssgmce-blue"
              }`} />
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-blue-50 border border-blue-200 p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> All financial statements are audited by certified chartered accountants
            and are published as per regulatory requirements for transparency.
          </p>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default FinancialStatementsIndex;
