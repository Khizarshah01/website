import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaTools, FaCheckCircle } from "react-icons/fa";

const MaintenancePolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Maintenance Policy"
      pdfLink="/documents/admin-office/policies/15_Maintenance Policy.pdf"
      pdfTitle="Maintenance Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaTools className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Maintenance Policy</h2>
            <p className="text-sm text-gray-600">Infrastructure and Equipment Upkeep</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To ensure proper maintenance and upkeep of all institutional infrastructure,
            equipment, and facilities to provide a conducive learning environment and
            maximize the lifespan of assets.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Maintenance Areas</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Buildings & Civil Work", desc: "Classrooms, labs, hostels, and common areas" },
              { title: "Electrical Systems", desc: "Power supply, lighting, and electrical equipment" },
              { title: "IT Infrastructure", desc: "Computers, networks, and software systems" },
              { title: "Laboratory Equipment", desc: "Scientific and technical equipment" },
              { title: "HVAC Systems", desc: "Air conditioning and ventilation" },
              { title: "Plumbing & Sanitation", desc: "Water supply and sanitary facilities" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Maintenance Types</h3>
          <div className="space-y-2">
            {[
              "Preventive Maintenance: Scheduled maintenance to prevent failures",
              "Corrective Maintenance: Repairs after breakdown or malfunction",
              "Predictive Maintenance: Based on condition monitoring",
              "Emergency Maintenance: Immediate response to critical issues",
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

export default MaintenancePolicy;
