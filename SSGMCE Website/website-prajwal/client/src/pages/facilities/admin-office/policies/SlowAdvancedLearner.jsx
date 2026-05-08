import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaUserGraduate, FaCheckCircle } from "react-icons/fa";

const SlowAdvancedLearner = () => {
  return (
    <AdminOfficePageLayout
      title="Slow & Advanced Learner Policy"
      pdfLink="/documents/admin-office/policies/7_Slow -Advanced -Learner-Policy-website-.pdf"
      pdfTitle="Slow and Advanced Learner Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaUserGraduate className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Slow & Advanced Learner Policy</h2>
            <p className="text-sm text-gray-600">Differentiated Learning Support</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To identify slow and advanced learners and provide appropriate support and
            challenges to ensure optimal learning outcomes for all students.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-5">
            <h3 className="mb-3 text-lg font-semibold text-orange-900">For Slow Learners</h3>
            <div className="space-y-2">
              {[
                "Remedial classes and extra tutorials",
                "Simplified learning materials",
                "Peer tutoring programs",
                "Additional practice sessions",
                "One-on-one mentoring support",
                "Bridge courses for weak subjects",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-5">
            <h3 className="mb-3 text-lg font-semibold text-green-900">For Advanced Learners</h3>
            <div className="space-y-2">
              {[
                "Advanced study materials and resources",
                "Research project opportunities",
                "Competitive exam preparation",
                "Honor courses and certifications",
                "Industry internship placements",
                "Paper publication guidance",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Identification Criteria</h3>
          <p className="text-gray-700">
            Students are categorized based on their academic performance, including:
          </p>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-ssgmce-blue"></span>
              Previous semester results and CGPA
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-ssgmce-blue"></span>
              Class test and assignment performance
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-ssgmce-blue"></span>
              Faculty observations and feedback
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-ssgmce-blue"></span>
              Aptitude and skill assessments
            </li>
          </ul>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default SlowAdvancedLearner;
