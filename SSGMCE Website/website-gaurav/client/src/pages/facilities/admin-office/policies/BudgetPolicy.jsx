import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaRupeeSign, FaCheckCircle } from "react-icons/fa";

const BudgetPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Budget Policy"
      pdfLink="/documents/admin-office/policies/10_Budget Policy.pdf"
      pdfTitle="Budget Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaRupeeSign className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Budget Policy</h2>
            <p className="text-sm text-gray-600">Financial Planning and Management</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Objective</h3>
          <p className="text-gray-700">
            To ensure efficient allocation and utilization of financial resources for
            achieving institutional goals while maintaining transparency and accountability.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Budget Components</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Academic Budget", desc: "Teaching, research, and academic activities" },
              { title: "Infrastructure Budget", desc: "Maintenance and development of facilities" },
              { title: "Staff Budget", desc: "Salaries, benefits, and development" },
              { title: "Student Welfare", desc: "Scholarships, activities, and support services" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Budget Process</h3>
          <div className="space-y-2">
            {[
              "Annual budget planning and preparation",
              "Department-wise budget allocation",
              "Approval by competent authority",
              "Periodic review and monitoring",
              "Variance analysis and corrective actions",
              "Annual audit and compliance",
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

export default BudgetPolicy;
