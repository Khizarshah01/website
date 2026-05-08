import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaComments, FaCheckCircle } from "react-icons/fa";

const GrievanceRedressalPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Grievance Redressal Policy"
      pdfLink="/documents/admin-office/policies/14_Grievance-Redressal_policy.pdf"
      pdfTitle="Grievance Redressal Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaComments className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Grievance Redressal Policy</h2>
            <p className="text-sm text-gray-600">Fair and Transparent Resolution</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To provide a transparent, fair, and timely mechanism for addressing grievances
            of students, faculty, and staff, ensuring justice and maintaining a harmonious
            institutional environment.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Grievance Categories</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Academic Grievances", desc: "Related to examinations, results, marks, etc." },
              { title: "Administrative Grievances", desc: "Related to admissions, fees, certificates" },
              { title: "Infrastructure Grievances", desc: "Related to facilities and amenities" },
              { title: "Disciplinary Grievances", desc: "Related to conduct and discipline matters" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Redressal Process</h3>
          <div className="space-y-3">
            {[
              "Submit grievance through online portal or in writing",
              "Acknowledgment within 3 working days",
              "Investigation and hearing by concerned committee",
              "Resolution within 15 working days",
              "Appeal mechanism if not satisfied with resolution",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ssgmce-blue text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Key Features</h3>
          <div className="space-y-2">
            {[
              "Confidentiality of complainant maintained",
              "No victimization of complainant",
              "Fair and impartial hearing",
              "Timely resolution of grievances",
              "Regular monitoring by IQAC",
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

export default GrievanceRedressalPolicy;
