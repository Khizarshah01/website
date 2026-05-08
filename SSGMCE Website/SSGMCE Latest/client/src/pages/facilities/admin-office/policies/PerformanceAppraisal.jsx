import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaChartBar, FaCheckCircle } from "react-icons/fa";

const PerformanceAppraisal = () => {
  return (
    <AdminOfficePageLayout
      title="Performance Appraisal"
      pdfLink="/documents/admin-office/policies/19_Performance appraisal.pdf"
      pdfTitle="Performance Appraisal Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaChartBar className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Performance Appraisal</h2>
            <p className="text-sm text-gray-600">Faculty and Staff Evaluation System</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To establish a fair and transparent performance evaluation system that
            recognizes and rewards excellence while identifying areas for improvement
            and professional development.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Evaluation Parameters</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Teaching Performance", desc: "Quality of teaching and student feedback" },
              { title: "Research Contribution", desc: "Publications, projects, patents, etc." },
              { title: "Administrative Duties", desc: "Contribution to institutional activities" },
              { title: "Professional Development", desc: "Training, certifications, higher studies" },
              { title: "Student Mentoring", desc: "Guidance and support to students" },
              { title: "Extension Activities", desc: "Community engagement and outreach" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Appraisal Process</h3>
          <div className="space-y-2">
            {[
              "Self-appraisal by faculty/staff",
              "Review by reporting authority",
              "Verification of claimed achievements",
              "Final assessment by appraisal committee",
              "Feedback and development plan discussion",
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

export default PerformanceAppraisal;
