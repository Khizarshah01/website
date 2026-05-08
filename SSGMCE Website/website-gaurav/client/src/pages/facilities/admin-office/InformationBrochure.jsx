import React from "react";
import AdminOfficePageLayout from "../../../components/AdminOfficePageLayout";
import { FaBook, FaInfoCircle, FaGraduationCap, FaBuilding } from "react-icons/fa";

const InformationBrochure = () => {
  return (
    <AdminOfficePageLayout
      title="Information Brochure"
      pdfLink="/documents/admin-office/Final SSGMCE Brochure2023.pdf"
      pdfTitle="SSGMCE Information Brochure 2023"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaBook className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Institute Information Brochure
            </h2>
            <p className="text-sm text-gray-600">
              Comprehensive guide to SSGMCE Shegaon
            </p>
          </div>
        </div>

        <p className="text-gray-700">
          The SSGMCE Information Brochure provides comprehensive details about the institute,
          including academic programs, facilities, infrastructure, and campus life. This
          brochure serves as an essential guide for prospective students and stakeholders.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <FaGraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Academic Programs</h3>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Information about undergraduate, postgraduate, and doctoral programs
              offered across various engineering and management disciplines.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <FaBuilding className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Infrastructure</h3>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Details about state-of-the-art laboratories, library, hostel facilities,
              sports complex, and other campus amenities.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <FaInfoCircle className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Accreditations</h3>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Information about NAAC, NBA accreditations and various recognitions
              received by the institute.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-100 p-2">
                <FaBook className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Admissions</h3>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Complete information about admission process, eligibility criteria,
              fee structure, and scholarship opportunities.
            </p>
          </div>
        </div>

        <div className="rounded-lg border-l-4 border-ssgmce-blue bg-blue-50 p-4">
          <h4 className="font-semibold text-ssgmce-blue">Note</h4>
          <p className="mt-1 text-sm text-gray-600">
            Download the complete brochure below for detailed information about all
            aspects of the institute. For specific queries, please contact the
            Administrative Office.
          </p>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default InformationBrochure;
