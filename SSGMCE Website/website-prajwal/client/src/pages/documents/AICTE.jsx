import { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import DocumentsSidebar from "../../components/DocumentsSidebar";
import { FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";

// Data from https://www.ssgmce.ac.in/AICTE_Approvals.php
const aicteApprovals = [
  { serial: 1, session: "2024-25 To 2026-27", url: "/uploads/documents/aicte/EOA_2024-25_to_2026-27.pdf" },
  { serial: 2, session: "2023-24", url: "/uploads/documents/aicte/EOA_2023-24.pdf" },
  { serial: 3, session: "2022-23", url: "/uploads/documents/aicte/AICTE_Approvals_1992_to_2022-23.pdf" },
  { serial: 4, session: "2010-22", url: "/uploads/documents/aicte/EOA_2010-11_to_2021-22.pdf" },
];

const AICTE = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "AICTE Approvals | SSGMCE";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="AICTE Approvals"
        subtitle="All India Council for Technical Education"
        backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <DocumentsSidebar />
          </div>

          <div className="lg:col-span-9 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">About AICTE Approval</h2>
              <p className="text-gray-600 leading-relaxed">
                SSGMCE, Shegaon is approved by the All India Council for Technical Education (AICTE), New Delhi
                for offering technical education programs in Engineering and Management. The Extension of Approval (EOA)
                is renewed periodically to confirm the institute's compliance with AICTE norms and standards.
              </p>
            </div>

            {/* Approvals Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white px-6 py-4">
                <h3 className="text-lg font-bold">AICTE Approvals</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Serial No.</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Academic Year / Session</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {aicteApprovals.map((item) => (
                      <tr key={item.serial} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-center text-gray-700 font-medium">{item.serial}</td>
                        <td className="px-6 py-4 font-bold text-gray-800">{item.session}</td>
                        <td className="px-6 py-4 text-center">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all text-sm font-medium"
                          >
                            <FaFilePdf />
                            View PDF
                            <FaExternalLinkAlt className="text-xs" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICTE;
