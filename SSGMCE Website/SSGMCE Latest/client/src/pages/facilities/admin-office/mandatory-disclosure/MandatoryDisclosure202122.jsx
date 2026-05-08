import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaFileAlt } from "react-icons/fa";

const MandatoryDisclosure202122 = () => {
  return (
    <AdminOfficePageLayout
      title="Mandatory Disclosure 2021-22"
      pdfLink="/documents/admin-office/mandatory-disclosure/Mandatory Disclosure_2021-22.pdf"
      pdfTitle="Mandatory Disclosure 2021-22"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaFileAlt className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Mandatory Disclosure 2021-22</h2>
            <p className="text-sm text-gray-600">As per AICTE Regulations</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <p className="text-gray-700">
            This document contains comprehensive mandatory disclosure information for
            the academic year 2021-22 as per AICTE regulations.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Contents Include</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Institute Information",
              "Programs Offered",
              "Faculty Details",
              "Infrastructure Details",
              "Fee Structure",
              "Admission Procedure",
              "Placement Details",
              "Contact Information",
            ].map((item, index) => (
              <div key={index} className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default MandatoryDisclosure202122;
