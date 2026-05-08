import React from "react";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";
import { FaShieldAlt, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const AntiRaggingPolicy = () => {
  return (
    <AdminOfficePageLayout
      title="Anti-Ragging Policy"
      pdfLink="/documents/admin-office/policies/11_Anti_ragging _policy.pdf"
      pdfTitle="Anti-Ragging Policy Document"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="rounded-lg bg-red-100 p-3">
            <FaShieldAlt className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Anti-Ragging Policy</h2>
            <p className="text-sm text-gray-600">Zero Tolerance Against Ragging</p>
          </div>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="mt-1 h-5 w-5 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Zero Tolerance Policy</h3>
              <p className="mt-1 text-gray-700">
                SSGMCE maintains a strict zero-tolerance policy against ragging as per
                UGC Regulations and AICTE guidelines. Any form of ragging is a punishable
                offense that can lead to expulsion and criminal proceedings.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">What Constitutes Ragging?</h3>
          <div className="space-y-2">
            {[
              "Any conduct that causes physical or psychological harm",
              "Teasing, bullying, or verbal abuse of any kind",
              "Asking students to do any act that causes shame or embarrassment",
              "Any act that affects the mental health and self-confidence",
              "Forcing to consume alcohol, drugs, or prohibited substances",
              "Any form of physical abuse or violence",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Preventive Measures</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Anti-Ragging Committee formation",
              "Anti-Ragging Squad patrolling",
              "Awareness programs and workshops",
              "Online undertaking submission",
              "24x7 Helpline availability",
              "CCTV surveillance on campus",
            ].map((item, index) => (
              <div key={index} className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">Report Ragging</h3>
          <p className="text-gray-700">
            If you witness or experience any form of ragging, please report immediately:
          </p>
          <div className="mt-3 space-y-2">
            <p className="text-sm"><strong>National Helpline:</strong> 1800-180-5522</p>
            <p className="text-sm"><strong>Email:</strong> helpline@antiragging.in</p>
            <p className="text-sm"><strong>Institute Anti-Ragging Cell:</strong> Contact HOD or Principal</p>
          </div>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default AntiRaggingPolicy;
