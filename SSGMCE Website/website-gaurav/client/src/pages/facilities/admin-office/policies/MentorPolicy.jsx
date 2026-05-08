import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaUserFriends, FaCheckCircle } from "react-icons/fa";

const MentorPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Mentor Policy"
      pdfLink="/documents/admin-office/policies/6_Mentor Policy.pdf"
      pdfTitle="Mentor Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaUserFriends className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Mentor Policy</h2>
            <p className="text-sm text-gray-600">Student Mentoring System</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To provide personalized guidance and support to students through a structured
            mentoring system that addresses academic, personal, and career development needs.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Mentoring Framework</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Academic Guidance", desc: "Help with course selection, study strategies, and academic performance" },
              { title: "Personal Development", desc: "Support for personal growth, time management, and stress handling" },
              { title: "Career Counseling", desc: "Guidance on career options, higher studies, and job preparation" },
              { title: "Regular Meetings", desc: "Scheduled mentor-mentee interactions throughout the semester" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Mentor Responsibilities</h3>
          <div className="space-y-2">
            {[
              "Maintain regular communication with assigned mentees",
              "Monitor academic progress and attendance",
              "Identify and address student concerns early",
              "Provide guidance for overall development",
              "Maintain confidentiality of student information",
              "Coordinate with parents/guardians when necessary",
              "Document mentoring sessions and outcomes",
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

export default MentorPolicy;
