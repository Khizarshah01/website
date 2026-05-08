import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaBookOpen, FaCheckCircle } from "react-icons/fa";

const RulesRegulations = () => {
  return (
    <AdminOfficePageLayout
      title="Rules & Regulations"
      pdfLink="/documents/admin-office/policies/Rules_Regulations.pdf"
      pdfTitle="Rules and Regulations Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaBookOpen className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Rules & Regulations</h2>
            <p className="text-sm text-gray-600">Institutional Guidelines and Norms</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Overview</h3>
          <p className="text-gray-700">
            These rules and regulations govern the academic, administrative, and
            disciplinary aspects of the institute to ensure smooth functioning and
            maintain academic standards.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Academic Rules</h3>
          <div className="space-y-2">
            {[
              "Minimum 75% attendance for eligibility to appear in examination",
              "Submission of assignments and reports within deadlines",
              "Maintaining minimum academic performance standards",
              "Following examination hall discipline",
              "No unfair means during examinations",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">General Rules</h3>
          <div className="space-y-2">
            {[
              "Carry ID card at all times on campus",
              "Follow dress code as prescribed",
              "Park vehicles only in designated areas",
              "Maintain cleanliness on campus",
              "No smoking or consumption of alcohol on campus",
              "Use mobile phones responsibly",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-orange-200 bg-orange-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-orange-900">Disciplinary Actions</h3>
          <p className="text-gray-700">
            Violation of rules may result in disciplinary action including:
          </p>
          <ul className="mt-3 space-y-1 text-sm text-gray-700">
            <li>• Verbal/written warning</li>
            <li>• Fine or penalty</li>
            <li>• Suspension from classes</li>
            <li>• Debarring from examinations</li>
            <li>• Rustication in severe cases</li>
          </ul>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default RulesRegulations;
