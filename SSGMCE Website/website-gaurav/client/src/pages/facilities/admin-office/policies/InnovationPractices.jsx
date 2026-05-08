import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaLightbulb, FaCheckCircle } from "react-icons/fa";

const InnovationPractices = () => {
  return (
    <AdminOfficePageLayout
      title="Innovation Practices"
      pdfLink="/documents/admin-office/policies/3_Innovation Practices-updated.pdf"
      pdfTitle="Innovation Practices Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaLightbulb className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Innovation Practices</h2>
            <p className="text-sm text-gray-600">Fostering Innovation and Creativity</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To foster a culture of innovation and creativity among students and faculty,
            encouraging them to develop innovative solutions for real-world problems and
            contribute to technological advancement.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Innovation Initiatives</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Innovation Cell", desc: "Dedicated cell to promote innovative thinking" },
              { title: "IIC (Institution Innovation Council)", desc: "MoE's initiative for innovation ecosystem" },
              { title: "Startup Incubation", desc: "Support for student and faculty startups" },
              { title: "Hackathons & Competitions", desc: "Regular innovation challenges and contests" },
              { title: "Industry Collaboration", desc: "Partnership with industry for real projects" },
              { title: "Research Projects", desc: "Funded research and development initiatives" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Key Focus Areas</h3>
          <div className="space-y-2">
            {[
              "Encouraging creative thinking and problem-solving skills",
              "Providing resources and infrastructure for innovation",
              "Mentorship programs for innovative projects",
              "IPR (Intellectual Property Rights) awareness and filing support",
              "Industry-sponsored projects and internships",
              "Recognition and rewards for innovative achievements",
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

export default InnovationPractices;
