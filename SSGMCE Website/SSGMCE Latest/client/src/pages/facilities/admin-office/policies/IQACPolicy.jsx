import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaChartLine, FaCheckCircle } from "react-icons/fa";

const IQACPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="IQAC Policy"
      pdfLink="/documents/admin-office/policies/8_IQAC Policy.pdf"
      pdfTitle="IQAC Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaChartLine className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">IQAC Policy</h2>
            <p className="text-sm text-gray-600">Internal Quality Assurance Cell</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Vision</h3>
          <p className="text-gray-700">
            To promote quality culture in the institute by continuously evaluating and
            improving the academic and administrative processes.
          </p>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Mission</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              To develop a quality system for conscious, consistent, and catalytic improvement
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              To promote measures for institutional functioning towards quality enhancement
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              To channelize efforts for academic excellence through stakeholder participation
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">IQAC Objectives</h3>
          <div className="space-y-3">
            {[
              "Development and application of quality benchmarks",
              "Parameters for various academic and administrative activities",
              "Facilitating creation of a learner-centric environment",
              "Documentation of programs and activities for quality improvement",
              "Acting as a nodal agency for coordinating quality-related activities",
              "Preparation and submission of Annual Quality Assurance Report (AQAR)",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-ssgmce-blue" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-purple-200 bg-purple-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-purple-900">Key Functions</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Quality policy implementation",
              "Academic audit coordination",
              "Feedback analysis and action",
              "Best practices documentation",
              "Accreditation preparation",
              "Stakeholder meetings",
            ].map((item, index) => (
              <div key={index} className="rounded-md bg-white p-2 text-sm text-gray-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default IQACPolicy;
