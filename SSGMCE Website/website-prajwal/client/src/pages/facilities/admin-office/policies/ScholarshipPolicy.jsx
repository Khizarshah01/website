import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaGraduationCap, FaCheckCircle } from "react-icons/fa";

const ScholarshipPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Scholarship Policy"
      pdfLink="/documents/admin-office/policies/16_Scholarship Policy.pdf"
      pdfTitle="Scholarship Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-yellow-100 p-3">
            <FaGraduationCap className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Scholarship Policy</h2>
            <p className="text-sm text-gray-600">Financial Support for Deserving Students</p>
          </div>
        </div>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-yellow-900">Objective</h3>
          <p className="text-gray-700">
            To provide financial assistance to deserving students based on merit and
            economic background, ensuring that no student is deprived of quality
            education due to financial constraints.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Types of Scholarships</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Government Scholarships", desc: "State and Central government schemes for various categories" },
              { title: "Merit Scholarships", desc: "For students with outstanding academic performance" },
              { title: "Need-Based Aid", desc: "Financial assistance for economically weaker students" },
              { title: "Sports Scholarships", desc: "For students excelling in sports activities" },
              { title: "Industry Scholarships", desc: "Sponsored by industry partners" },
              { title: "Alumni Scholarships", desc: "Funded by alumni association" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Application Process</h3>
          <div className="space-y-2">
            {[
              "Submit application through online scholarship portal",
              "Provide required documents and certificates",
              "Verification by scholarship committee",
              "Selection based on eligibility criteria",
              "Disbursement of scholarship amount",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default ScholarshipPolicy;
