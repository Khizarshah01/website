import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaHandHoldingUsd, FaCheckCircle } from "react-icons/fa";

const FinancialAssistancePolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Financial Assistance Policy"
      pdfLink="/documents/admin-office/policies/18_Financial Assistant Policy-SSJ.pdf"
      pdfTitle="Financial Assistance Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-green-100 p-3">
            <FaHandHoldingUsd className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Financial Assistance Policy</h2>
            <p className="text-sm text-gray-600">Support for Needy Students</p>
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Objective</h3>
          <p className="text-gray-700">
            To provide financial assistance to students who face genuine financial
            difficulties, ensuring they can complete their education without undue
            financial burden.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Types of Assistance</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Fee Concession", desc: "Partial or full waiver of tuition fees" },
              { title: "Installment Facility", desc: "Payment of fees in installments" },
              { title: "Education Loan Assistance", desc: "Help in obtaining bank loans" },
              { title: "Emergency Fund", desc: "For sudden financial emergencies" },
              { title: "Book Bank Facility", desc: "Free textbooks for needy students" },
              { title: "Earn While Learn", desc: "Part-time work opportunities on campus" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Eligibility Criteria</h3>
          <div className="space-y-2">
            {[
              "Family income below specified threshold",
              "Good academic standing (minimum attendance and grades)",
              "No disciplinary issues",
              "Submission of required income certificates",
              "Recommendation from concerned authority",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default FinancialAssistancePolicy;
