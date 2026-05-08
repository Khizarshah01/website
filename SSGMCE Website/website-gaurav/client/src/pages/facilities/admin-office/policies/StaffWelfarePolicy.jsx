import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaUsers, FaCheckCircle } from "react-icons/fa";

const StaffWelfarePolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Staff Welfare Policy"
      pdfLink="/documents/admin-office/policies/17_Staff Welfare Policy.pdf"
      pdfTitle="Staff Welfare Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaUsers className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Staff Welfare Policy</h2>
            <p className="text-sm text-gray-600">Employee Well-being and Development</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To promote the well-being, professional growth, and job satisfaction of all
            staff members through comprehensive welfare measures and supportive work
            environment.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Welfare Measures</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Health Insurance", desc: "Medical coverage for staff and dependents" },
              { title: "Leave Benefits", desc: "Various types of leave as per rules" },
              { title: "Professional Development", desc: "Training, workshops, and FDPs" },
              { title: "Research Support", desc: "Funding for research and publications" },
              { title: "Housing Facility", desc: "Quarters for eligible staff" },
              { title: "Transport Facility", desc: "Staff bus service" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Additional Benefits</h3>
          <div className="space-y-2">
            {[
              "Provident Fund and Gratuity",
              "Festival advances and bonuses",
              "Children's education support",
              "Recreation and sports facilities",
              "Canteen and refreshment facilities",
              "Staff credit cooperative society",
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

export default StaffWelfarePolicy;
