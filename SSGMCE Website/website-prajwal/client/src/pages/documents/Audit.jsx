import { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import DocumentsSidebar from "../../components/DocumentsSidebar";
import { FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";

const auditCategories = [
  {
    id: "audit-energy",
    title: "Energy Audit",
    reports: [
      { label: "Energy Audit 2023-24", url: "/uploads/documents/audit/Energy_Audit_2023-24.pdf" },
    ],
  },
  {
    id: "audit-environmental",
    title: "Environmental Audit",
    reports: [
      { label: "Environmental Audit 2023-24", url: "/uploads/documents/audit/Environmental_Audit_2023-24.pdf" },
    ],
  },
  {
    id: "audit-green",
    title: "Green Audit",
    reports: [
      { label: "Green Audit 2023-24", url: "/uploads/documents/audit/Green_Audit_2023-24.pdf" },
    ],
  },
];

const Audit = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Sustainable Audit | SSGMCE";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Sustainable Audit"
        subtitle="Energy, Environmental & Green Audit Reports"
        backgroundImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <DocumentsSidebar />
          </div>

          <div className="lg:col-span-9 space-y-8">
            {/* About */}
            <div id="audit-about" className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">About Sustainable Audit</h2>
              <p className="text-gray-600 leading-relaxed">
                SSGMCE conducts regular sustainability audits covering energy consumption, environmental impact, and green campus initiatives.
                These audits assess the institute's commitment to sustainable development and provide actionable recommendations.
              </p>
            </div>

            {/* Audit Categories */}
            <div className="grid md:grid-cols-3 gap-6">
              {auditCategories.map((category) => (
                <div key={category.title} id={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white px-5 py-4">
                    <h3 className="text-lg font-bold">{category.title}</h3>
                  </div>
                  <div className="p-5 space-y-3">
                    {category.reports.map((report) => (
                      <a
                        key={report.label}
                        href={report.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-ssgmce-blue hover:bg-blue-50 transition-all group"
                      >
                        <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                          <FaFilePdf className="text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-ssgmce-blue transition-colors truncate">
                            {report.label}
                          </p>
                          <p className="text-xs text-gray-500">PDF Report</p>
                        </div>
                        <FaExternalLinkAlt className="text-gray-400 group-hover:text-ssgmce-blue text-xs flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audit;
