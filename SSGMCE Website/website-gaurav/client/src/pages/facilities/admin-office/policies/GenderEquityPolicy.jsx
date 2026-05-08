import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaBalanceScale, FaCheckCircle } from "react-icons/fa";

const GenderEquityPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Gender Equity Policy"
      pdfLink="/documents/admin-office/policies/13_Gender Equity Policy.pdf"
      pdfTitle="Gender Equity Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-pink-100 p-3">
            <FaBalanceScale className="h-6 w-6 text-pink-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gender Equity Policy</h2>
            <p className="text-sm text-gray-600">Equal Opportunities for All</p>
          </div>
        </div>

        <div className="rounded-lg border border-pink-200 bg-pink-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-pink-900">Vision</h3>
          <p className="text-gray-700">
            To create an inclusive and equitable environment where all individuals,
            regardless of gender, have equal access to opportunities, resources,
            and support for their academic and professional development.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Key Initiatives</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Equal Access", desc: "Equal opportunities in admissions, placements, and activities" },
              { title: "Women's Cell", desc: "Dedicated cell for addressing women's issues and welfare" },
              { title: "Safety Measures", desc: "Enhanced security and safety provisions on campus" },
              { title: "Mentoring Programs", desc: "Special mentoring for women students and faculty" },
              { title: "Awareness Programs", desc: "Regular workshops on gender sensitization" },
              { title: "Support Services", desc: "Counseling and support for gender-related concerns" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Facilities for Women</h3>
          <div className="space-y-2">
            {[
              "Separate hostel with proper security measures",
              "Common room and rest area for women",
              "Sanitary napkin vending machines",
              "CCTV surveillance in common areas",
              "Women counselor for guidance",
              "Self-defense training programs",
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

export default GenderEquityPolicy;
