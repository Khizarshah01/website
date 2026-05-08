import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaGlobe, FaCheckCircle } from "react-icons/fa";

const EnvironmentPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Environment Policy"
      pdfLink="/documents/admin-office/policies/23_Environment policy.pdf"
      pdfTitle="Environment Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-green-100 p-3">
            <FaGlobe className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Environment Policy</h2>
            <p className="text-sm text-gray-600">Environmental Stewardship</p>
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Commitment</h3>
          <p className="text-gray-700">
            SSGMCE is committed to environmental protection and sustainability. We strive
            to minimize our environmental footprint and instill environmental consciousness
            in our students and staff.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Environmental Initiatives</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Air Quality", desc: "Measures to maintain clean air on campus" },
              { title: "Water Conservation", desc: "Efficient water usage and recycling" },
              { title: "Biodiversity", desc: "Preservation of flora and fauna" },
              { title: "Noise Control", desc: "Maintaining peaceful environment" },
              { title: "Carbon Footprint", desc: "Reducing greenhouse gas emissions" },
              { title: "Awareness Programs", desc: "Environmental education activities" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Action Plan</h3>
          <div className="space-y-2">
            {[
              "Conduct regular environmental audits",
              "Organize tree plantation drives",
              "Celebrate environment-related days",
              "Implement waste reduction strategies",
              "Promote use of renewable energy",
              "Engage students in environmental projects",
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

export default EnvironmentPolicy;
