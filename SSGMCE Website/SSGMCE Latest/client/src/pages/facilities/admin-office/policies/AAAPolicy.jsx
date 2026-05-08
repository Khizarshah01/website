import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaHandshake, FaCheckCircle } from "react-icons/fa";

const AAAPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="AAA Policy"
      pdfLink="/documents/admin-office/policies/9_AAA Policy.pdf"
      pdfTitle="Academic and Administrative Audit Policy"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaHandshake className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AAA Policy</h2>
            <p className="text-sm text-gray-600">Academic and Administrative Audit</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To conduct systematic evaluation of academic and administrative processes
            to ensure quality, accountability, and continuous improvement in institutional
            functioning.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Audit Areas</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h4 className="font-semibold text-gray-900">Academic Audit</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Curriculum implementation</li>
                <li>• Teaching-learning processes</li>
                <li>• Assessment and evaluation</li>
                <li>• Research activities</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h4 className="font-semibold text-gray-900">Administrative Audit</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Governance and leadership</li>
                <li>• Resource management</li>
                <li>• Student support services</li>
                <li>• Infrastructure utilization</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Audit Process</h3>
          <div className="space-y-2">
            {[
              "Formation of internal and external audit committees",
              "Pre-audit preparation and documentation",
              "Audit visits and verification",
              "Exit meetings and feedback",
              "Audit report preparation",
              "Action taken report and follow-up",
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

export default AAAPolicy;
