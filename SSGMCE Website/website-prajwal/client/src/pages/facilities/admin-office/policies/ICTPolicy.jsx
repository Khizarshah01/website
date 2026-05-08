import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaLaptop, FaCheckCircle } from "react-icons/fa";

const ICTPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="ICT Policy"
      pdfLink="/documents/admin-office/policies/20_ICT Policy.pdf"
      pdfTitle="ICT Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaLaptop className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">ICT Policy</h2>
            <p className="text-sm text-gray-600">Information and Communication Technology</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To establish guidelines for effective use of ICT infrastructure in teaching,
            learning, research, and administration while ensuring security and ethical use.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">ICT Infrastructure</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Computer Labs", desc: "Well-equipped labs for students and faculty" },
              { title: "High-Speed Internet", desc: "WiFi connectivity across campus" },
              { title: "LMS Platform", desc: "Learning Management System for e-learning" },
              { title: "Digital Library", desc: "Access to e-resources and databases" },
              { title: "Smart Classrooms", desc: "ICT-enabled teaching facilities" },
              { title: "Server Infrastructure", desc: "Centralized data management" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Usage Guidelines</h3>
          <div className="space-y-2">
            {[
              "Use ICT resources for academic and official purposes only",
              "Maintain confidentiality of login credentials",
              "Report security incidents immediately",
              "Follow data backup and recovery procedures",
              "Adhere to software licensing compliance",
              "Respect intellectual property rights online",
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

export default ICTPolicy;
