import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaLeaf, FaCheckCircle } from "react-icons/fa";

const GreenCampusPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Green Campus Policy"
      pdfLink="/documents/admin-office/policies/21_Green_campus-policy-rev.pdf"
      pdfTitle="Green Campus Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-green-100 p-3">
            <FaLeaf className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Green Campus Policy</h2>
            <p className="text-sm text-gray-600">Sustainable and Eco-Friendly Campus</p>
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Vision</h3>
          <p className="text-gray-700">
            To create an environmentally sustainable campus that minimizes ecological
            footprint while providing a healthy and inspiring learning environment.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Green Initiatives</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Solar Energy", desc: "Solar panels for renewable energy generation" },
              { title: "Rainwater Harvesting", desc: "Collection and conservation of rainwater" },
              { title: "Waste Management", desc: "Segregation and recycling of waste" },
              { title: "Green Cover", desc: "Extensive tree plantation and landscaping" },
              { title: "Plastic-Free Campus", desc: "Ban on single-use plastics" },
              { title: "E-Waste Management", desc: "Proper disposal of electronic waste" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Campus Features</h3>
          <div className="space-y-2">
            {[
              "Pedestrian-friendly pathways and bicycle tracks",
              "Energy-efficient LED lighting throughout campus",
              "Green buildings with natural ventilation",
              "Organic farming and herbal garden",
              "Vermicomposting facility for organic waste",
              "Environmental awareness programs",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default GreenCampusPolicy;
