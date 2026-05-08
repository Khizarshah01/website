import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaGavel, FaCheckCircle } from "react-icons/fa";

const CodeOfConduct = () => {
  return (
    <AdminOfficePageLayout
      title="Code of Conduct"
      pdfLink="/documents/admin-office/policies/4 Code of Conduct.pdf"
      pdfTitle="Code of Conduct Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaGavel className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Code of Conduct</h2>
            <p className="text-sm text-gray-600">Standards of Behavior and Ethics</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Purpose</h3>
          <p className="text-gray-700">
            This code establishes standards of professional and ethical behavior for
            all stakeholders to maintain a respectful, safe, and productive academic
            environment.
          </p>
        </div>

        {/* Code for Different Groups */}
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Code of Conduct for Faculty</h3>
            <div className="space-y-2">
              {[
                "Maintain professional competence and integrity",
                "Respect students and colleagues",
                "Be punctual and regular in duties",
                "Maintain confidentiality of student records",
                "Avoid discrimination of any kind",
                "Engage in continuous professional development",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Code of Conduct for Students</h3>
            <div className="space-y-2">
              {[
                "Maintain academic integrity and honesty",
                "Respect faculty, staff, and fellow students",
                "Follow dress code and maintain discipline",
                "Attend classes regularly and punctually",
                "Protect institutional property",
                "Participate positively in campus activities",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Code of Conduct for Administration</h3>
            <div className="space-y-2">
              {[
                "Ensure transparent and fair administration",
                "Implement policies consistently",
                "Maintain professional relationships",
                "Handle grievances promptly and fairly",
                "Promote institutional values and culture",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default CodeOfConduct;
