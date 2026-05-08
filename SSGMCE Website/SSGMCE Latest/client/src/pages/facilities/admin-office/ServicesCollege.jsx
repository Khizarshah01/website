import React from "react";
import AdminOfficePageLayout from "../../../components/AdminOfficePageLayout";
import { FaCheckCircle, FaUniversity } from "react-icons/fa";

const ServicesCollege = () => {
  const services = [
    "Railway Concession",
    "Bonafide Certificate",
    "Leaving Certificate",
    "Duplicate Marksheet",
    "Provisional Certificate",
    "Transcript Certificate",
    "Verification of Marks",
    "Student Insurance",
    "Migration Certificate",
    "Student I Card",
    "Confirmation of admission letter",
    "Letter for Passport",
    "Condonation",
    "Refund Fees",
    "Fees Letter",
    "Verification of Degree Certificate (UG and PG)",
    "Verification of Student Migration Certificate",
    "Character Certificate",
    "Income Certificate",
    "No Objection Certificate through Government",
    "AICTE Letter",
    "Direct Second year Admission",
    "Conversion Certificate",
    "Name Change Certificate",
    "Continuation of admission letter or discontinuation letter",
    "Medium of Instruction Certificate",
    "Admission withdrawal application",
    "Scholarship",
  ];

  return (
    <AdminOfficePageLayout
      title="Services Offered by College"
      pdfLink="/documents/admin-office/Services offered by the College.pdf"
      pdfTitle="Services Offered by College - Official Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaUniversity className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Shri Sant Gajanan Maharaj College of Engineering, Shegaon
            </h2>
            <p className="text-sm text-gray-600">Administrative Office Services</p>
          </div>
        </div>

        <p className="text-gray-700">
          The Administrative Office provides various services to students, alumni, and other
          stakeholders. Below is a comprehensive list of services offered by the college:
        </p>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Available Services</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-2 rounded-md bg-white p-3 shadow-sm"
              >
                <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span className="text-sm text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border-l-4 border-ssgmce-blue bg-blue-50 p-4">
          <h4 className="font-semibold text-ssgmce-blue">Contact Information</h4>
          <p className="mt-1 text-sm text-gray-600">
            For availing any of the above services, please contact the Administrative Office
            during working hours (Monday - Saturday: 9:00 AM - 5:00 PM).
          </p>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default ServicesCollege;
