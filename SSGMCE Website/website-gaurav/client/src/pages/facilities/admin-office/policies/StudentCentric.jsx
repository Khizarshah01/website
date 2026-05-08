import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaUserGraduate, FaCheckCircle } from "react-icons/fa";

const StudentCentric = () => {
  return (
    <AdminOfficePageLayout
      title="Student-Centric Methods"
      pdfLink="/documents/admin-office/policies/4_2.3.1 Student-centric.pdf"
      pdfTitle="Student-Centric Methods Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaUserGraduate className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Student-Centric Methods</h2>
            <p className="text-sm text-gray-600">Experiential and Participative Learning</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To implement student-centric learning approaches that actively engage students
            in the learning process, promote critical thinking, and develop practical skills
            for professional success.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Learning Approaches</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Experiential Learning", desc: "Learning through hands-on experiences and practical application" },
              { title: "Participative Learning", desc: "Active student involvement in discussions and activities" },
              { title: "Problem Solving", desc: "Case studies and real-world problem-solving exercises" },
              { title: "Project-Based Learning", desc: "Learning through meaningful project work" },
              { title: "Collaborative Learning", desc: "Group activities fostering teamwork" },
              { title: "Self-Directed Learning", desc: "Encouraging independent learning and research" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Implementation Strategies</h3>
          <div className="space-y-2">
            {[
              "Interactive lectures with multimedia presentations",
              "Laboratory sessions with hands-on experiments",
              "Industry visits and field trips",
              "Seminars and workshops by experts",
              "Mini-projects and major projects",
              "Internships and industrial training",
              "Use of ICT tools and e-learning platforms",
              "Peer learning and mentoring programs",
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

export default StudentCentric;
