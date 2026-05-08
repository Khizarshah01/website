import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaBolt, FaCheckCircle } from "react-icons/fa";

const EnergyConservation = () => {
  return (
    <AdminOfficePageLayout
      title="Energy Conservation"
      pdfLink="/documents/admin-office/policies/22_Energy conservation.pdf"
      pdfTitle="Energy Conservation Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-yellow-100 p-3">
            <FaBolt className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Energy Conservation</h2>
            <p className="text-sm text-gray-600">Efficient Energy Management</p>
          </div>
        </div>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-yellow-900">Objective</h3>
          <p className="text-gray-700">
            To promote efficient use of energy resources, reduce energy consumption,
            and minimize the environmental impact of institutional operations.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Energy Conservation Measures</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "LED Lighting", desc: "Energy-efficient lighting across campus" },
              { title: "Solar Power", desc: "Rooftop solar installations" },
              { title: "Smart Meters", desc: "Monitoring and tracking energy usage" },
              { title: "Efficient Equipment", desc: "Star-rated electrical appliances" },
              { title: "Natural Lighting", desc: "Maximizing use of daylight" },
              { title: "Timers & Sensors", desc: "Automated control of lights and ACs" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Guidelines</h3>
          <div className="space-y-2">
            {[
              "Switch off lights and fans when leaving rooms",
              "Use natural light and ventilation where possible",
              "Set air conditioners at optimal temperature (24-25°C)",
              "Report any electrical faults or wastage",
              "Participate in energy conservation drives",
              "Regular maintenance of electrical equipment",
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

export default EnergyConservation;
