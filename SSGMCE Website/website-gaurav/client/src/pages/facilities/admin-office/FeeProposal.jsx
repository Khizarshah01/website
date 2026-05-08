import React from "react";
import AdminOfficePageLayout from "../../../components/AdminOfficePageLayout";
import { FaRupeeSign, FaFileAlt, FaCalendarAlt } from "react-icons/fa";

const FeeProposal = () => {
  return (
    <AdminOfficePageLayout
      title="Fee Proposal A.Y. 2026-27"
      pdfLink="/documents/admin-office/ONLINE PROPOSAL FOR APPROVAL OF FEES FOR A.Y. 2026-27.pdf"
      pdfTitle="Online Proposal for Approval of Fees A.Y. 2026-27"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-ssgmce-blue/10 p-3">
            <FaRupeeSign className="h-6 w-6 text-ssgmce-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Online Proposal for Approval of Fees
            </h2>
            <p className="text-sm text-gray-600">Academic Year 2026-27</p>
          </div>
        </div>

        <p className="text-gray-700">
          This document contains the detailed fee proposal submitted to the Fee Regulating
          Authority for approval of fees for the Academic Year 2026-27. The proposal includes
          comprehensive details about tuition fees, development fees, and other applicable
          charges for all programs offered by the institute.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
            <div className="flex items-center gap-3">
              <FaFileAlt className="h-5 w-5 text-ssgmce-blue" />
              <h3 className="font-semibold text-gray-900">Proposal Details</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ssgmce-blue"></span>
                Tuition Fee Structure
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ssgmce-blue"></span>
                Development Fee Components
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ssgmce-blue"></span>
                Laboratory & Equipment Charges
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ssgmce-blue"></span>
                Other Applicable Fees
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Academic Year</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600"></span>
                Year: 2026-27
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600"></span>
                All UG Programs
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600"></span>
                All PG Programs
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600"></span>
                Ph.D. Programs
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border-l-4 border-ssgmce-orange bg-orange-50 p-4">
          <h4 className="font-semibold text-ssgmce-orange">Important Notice</h4>
          <p className="mt-1 text-sm text-gray-600">
            The final approved fee structure may vary based on the decision of the Fee
            Regulating Authority. Students are advised to refer to the official admission
            notices for the final fee structure.
          </p>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default FeeProposal;
