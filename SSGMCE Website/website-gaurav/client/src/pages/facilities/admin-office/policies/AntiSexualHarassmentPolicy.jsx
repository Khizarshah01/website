import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaUserShield, FaCheckCircle } from "react-icons/fa";

const AntiSexualHarassmentPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Anti-Sexual Harassment Policy"
      pdfLink="/documents/admin-office/policies/12_Anti_sexual_harassment _policy.pdf"
      pdfTitle="Anti-Sexual Harassment Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-purple-100 p-3">
            <FaUserShield className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Anti-Sexual Harassment Policy</h2>
            <p className="text-sm text-gray-600">Safe and Respectful Environment</p>
          </div>
        </div>

        <div className="rounded-lg border border-purple-200 bg-purple-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-purple-900">Policy Statement</h3>
          <p className="text-gray-700">
            SSGMCE is committed to providing a safe, secure, and respectful environment
            free from sexual harassment for all students, faculty, and staff. This policy
            is in accordance with the Sexual Harassment of Women at Workplace Act, 2013
            and UGC regulations.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Internal Complaints Committee (ICC)
          </h3>
          <p className="text-gray-700 mb-3">
            The institute has constituted an Internal Complaints Committee to address
            complaints of sexual harassment:
          </p>
          <div className="space-y-2">
            {[
              "Headed by a senior woman employee",
              "Includes members from different departments",
              "External member from NGO/Women's organization",
              "Ensures fair and impartial investigation",
              "Maintains confidentiality of proceedings",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Complaint Redressal Process</h3>
          <div className="space-y-3">
            {[
              "Submit written complaint to ICC within 3 months of incident",
              "ICC conducts inquiry within 90 days",
              "Both parties given opportunity to present their case",
              "Recommendation submitted to competent authority",
              "Action taken based on findings",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default AntiSexualHarassmentPolicy;
