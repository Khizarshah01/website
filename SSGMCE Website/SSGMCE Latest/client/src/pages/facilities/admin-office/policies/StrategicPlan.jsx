import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaLightbulb, FaUsers, FaChartLine } from "react-icons/fa";

const StrategicPlan = () => {
  return (
    <AdminOfficePageLayout
      title="Strategic Plan & Deployment"
      pdfLink="/documents/admin-office/policies/1_startegic_pan_and _deployment.pdf"
      pdfTitle="Strategic Plan and Deployment Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaLightbulb className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Strategic Plan and Deployment Document
            </h2>
            <p className="text-sm text-gray-600">SSGMCE Shegaon</p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Vision</h3>
          <p className="text-gray-700">
            To achieve excellence in higher education by imparting technical knowledge,
            skills and promote research and innovation to meet the challenges of evolving
            society.
          </p>
        </div>

        {/* Mission Section */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Mission</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              <span>
                To provide a conducive intellectual environment, develop quality technical
                manpower and entrepreneurs through state-of-art teaching-learning process
                and value-added programs.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              <span>
                To transform students into accountable professionals with ethical and moral
                values.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              <span>
                To develop the culture of academics and R&D through industry-institution
                collaboration.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600"></span>
              <span>
                To promote inclusivity, teamwork and life-long learning among stake holders.
              </span>
            </li>
          </ul>
        </div>

        {/* Institute Goals */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Institute Goals</h3>
          <div className="space-y-3">
            {[
              "To impart quality education through innovative teaching-learning practices.",
              "To train students with professional skills in their field of study.",
              "To develop industry-ready techno managers with ethical values.",
              "To develop state of the art ICT infrastructure.",
              "To foster industry institute interaction for enhancing employability and entrepreneurship.",
              "To encourage extra-curricular, co-curricular intellectual and career development activities.",
              "To promote research, consultancy and extension activities and contribute to the socio-economic development.",
            ].map((goal, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ssgmce-blue text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-purple-900">Core Values</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Integrity",
              "Innovation",
              "Inclusivity",
              "Commitment to nation building",
              "Accountability",
              "Excellence",
              "Continuous Improvement",
              "Life-long learning",
            ].map((value, index) => (
              <span
                key={index}
                className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Objectives</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "To impart quality education through innovative teaching-learning practices.",
              "To train students with professional skills in their field of study.",
              "To develop industry-ready techno-managers with ethical values.",
              "To develop state of the art ICT infrastructure.",
              "To foster industry-institute interaction for enhancing employability and entrepreneurship.",
              "To encourage extra-curricular, co-curricular intellectual and career development activities.",
              "To promote research, consultancy and extension activities and contribute to the socio-economic development.",
            ].map((objective, index) => (
              <div
                key={index}
                className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3"
              >
                <FaChartLine className="mt-0.5 h-4 w-4 shrink-0 text-ssgmce-blue" />
                <span className="text-sm text-gray-700">{objective}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default StrategicPlan;
