import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaClipboardList, FaCheckCircle } from "react-icons/fa";

const ExaminationPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Examination Policy"
      pdfLink="/documents/admin-office/policies/5_Exam Policy-rev.pdf"
      pdfTitle="Examination Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaClipboardList className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Examination Policy</h2>
            <p className="text-sm text-gray-600">Assessment and Evaluation Guidelines</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To ensure fair, transparent, and comprehensive assessment of student learning
            outcomes through a well-structured examination system that aligns with academic
            standards and regulatory requirements.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Assessment Components</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h4 className="font-semibold text-gray-900">Theory Courses</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Class Tests (CTs)</li>
                <li>• Teacher Evaluation Component (TEC)</li>
                <li>• End Semester Examination</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h4 className="font-semibold text-gray-900">Practical Courses</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Continuous Assessment</li>
                <li>• Internal Viva</li>
                <li>• End Semester Practical Examination</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h4 className="font-semibold text-gray-900">Project Courses</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Progress Reviews</li>
                <li>• Final Presentation</li>
                <li>• Project Report Evaluation</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h4 className="font-semibold text-gray-900">Seminars</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Presentation Skills</li>
                <li>• Content Quality</li>
                <li>• Q&A Session</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Key Features</h3>
          <div className="space-y-2">
            {[
              "Continuous Internal Evaluation (CIE) throughout the semester",
              "End Semester Examination (ESE) as per university schedule",
              "Transparent evaluation criteria and rubrics",
              "Timely declaration of results",
              "Provision for reassessment and improvement",
              "Academic integrity and anti-malpractice measures",
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

export default ExaminationPolicy;
