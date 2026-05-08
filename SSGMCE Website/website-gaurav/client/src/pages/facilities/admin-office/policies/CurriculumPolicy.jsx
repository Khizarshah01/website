import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaBook, FaCheckCircle } from "react-icons/fa";

const CurriculumPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Curriculum Policy"
      pdfLink="/documents/admin-office/policies/2_Curriculam Policy-updated.pdf"
      pdfTitle="Curriculum Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaBook className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Curriculum Policy</h2>
            <p className="text-sm text-gray-600">SSGMCE Shegaon</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            This policy guides the development, implementation, and continuous improvement
            of curricula to ensure that programs effectively meet the educational objectives
            and prepare students for successful careers.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Key Components</h3>
          <div className="space-y-3">
            {[
              "Curriculum Design aligned with Program Educational Objectives (PEOs)",
              "Course outcomes mapped to Program Outcomes (POs)",
              "Industry-relevant content and skill development",
              "Periodic curriculum review and revision",
              "Integration of emerging technologies and trends",
              "Assessment methods aligned with learning outcomes",
              "Feedback mechanism from stakeholders",
              "Value-added courses and professional development",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <FaCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Implementation</h3>
          <p className="text-gray-700">
            The curriculum is designed and delivered as per the guidelines of Sant Gadge Baba
            Amravati University and AICTE norms. The institute ensures effective implementation
            through:
          </p>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-ssgmce-blue"></span>
              Board of Studies meetings for curriculum design
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-ssgmce-blue"></span>
              Academic Council approval process
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-ssgmce-blue"></span>
              Regular feedback from industry experts
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-ssgmce-blue"></span>
              Continuous assessment and improvement
            </li>
          </ul>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default CurriculumPolicy;
