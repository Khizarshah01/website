import React from "react";
import AdminOfficePageLayout from "../../../components/AdminOfficePageLayout";
import { FaCheckCircle, FaUniversity } from "react-icons/fa";

const ServicesUniversity = () => {
  const services = [
    "Admission",
    "Enrolment",
    "Semester Fee Payment Receipt",
    "Examination Form",
    "Hall Ticket",
    "Result",
    "Verification",
    "Duplicate Marksheet",
    "Transcript",
    "Provisional Degree Certificate",
    "Degree Certificate (UG and PG)",
    "Migration Certificate",
    "Scholarship",
    "Examination related RTI (if any)",
    "Apply for Reassessment/ Photocopy",
    "Syllabus Copy",
    "Apply for Gold Medal",
    "Exam related Queries",
    "Re-totaling / Recounting application",
    "Eligibility Certificate",
  ];

  return (
    <AdminOfficePageLayout
      title="Services Offered by University"
      pdfLink="/documents/admin-office/Services offered by the University.pdf"
      pdfTitle="Services Offered by University - Official Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaUniversity className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Sant Gadge Baba Amravati University
            </h2>
            <p className="text-sm text-gray-600">University Services Available Through College</p>
          </div>
        </div>

        <p className="text-gray-700">
          The following services are offered by Sant Gadge Baba Amravati University (SGBAU)
          and can be availed through the college's Administrative Office:
        </p>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">University Services</h3>
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

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border-l-4 border-ssgmce-blue bg-blue-50 p-4">
            <h4 className="font-semibold text-ssgmce-blue">University Portal</h4>
            <p className="mt-1 text-sm text-gray-600">
              Most university services can be accessed through the SGBAU online portal at{" "}
              <a
                href="https://www.sgbau.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ssgmce-blue underline hover:text-ssgmce-dark-blue"
              >
                www.sgbau.ac.in
              </a>
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-ssgmce-orange bg-orange-50 p-4">
            <h4 className="font-semibold text-ssgmce-orange">Need Assistance?</h4>
            <p className="mt-1 text-sm text-gray-600">
              For help with university-related services, contact the Administrative Office
              or the Examination Section.
            </p>
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default ServicesUniversity;
