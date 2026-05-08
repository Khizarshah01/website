import PageHeader from "../../components/PageHeader";
import DocumentsSidebar from "../../components/DocumentsSidebar";

const NAAC = () => {
  const cycles = [
    {
      validity: "20-12-2024 to 19-12-2029",
      report: {
        title: "Peer Team Report -2024",
        url: "/uploads/documents/naac/09_NAAC_Peer_Team_Report_2024_v2.pdf",
      },
      certificate: {
        title: "NAAC CERTIFICATE -2024",
        url: "/uploads/documents/naac/08_NAAC_Certificate_A_Plus_2024.pdf",
      },
    },
    {
      validity: "28-03-2010 to 27-03-2015 Second Cycle",
      report: {
        title: "Peer Team Report -2010",
        url: "/uploads/documents/naac/11_NAAC_Peer_Team_Report_2010.pdf",
      },
      certificate: {
        title: "NAAC CERTIFICATE -2010",
        url: "/uploads/documents/naac/10_NAAC_Certificate_2010.pdf",
      },
    },
    {
      validity: "21-03-2003 to 20-03-2008 First Cycle",
      report: {
        title: "Peer Team Report -2003",
        url: "/uploads/documents/naac/13_NAAC_Peer_Team_Report_2003.pdf",
      },
      certificate: {
        title: "NAAC CERTIFICATE -2003",
        url: "/uploads/documents/naac/12_NAAC_Certificate_2003.pdf",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="NAAC Accreditation"
        subtitle="National Assessment and Accreditation Council"
        backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <DocumentsSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Header Info */}
            <div id="naac-status" className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-ssgmce-blue mb-3">
                NAAC ACCREDITATION STATUS
              </h2>
              <p className="text-gray-600 leading-relaxed">
                SSGMCE, Shegaon has been accredited by NAAC with <strong>A+ Grade (CGPA 3.26)</strong> in the 3rd cycle of accreditation.
              </p>
            </div>

            {/* Table */}
            <div id="naac-cycles" className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-6 py-4 text-left font-bold text-gray-800 border-r">Period of Validity</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-800 border-r">Report</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-800">Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {cycles.map((cycle, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700 border-r">{cycle.validity}</td>
                      <td className="px-6 py-4 border-r">
                        <a
                          href={cycle.report.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          {cycle.report.title}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={cycle.certificate.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          {cycle.certificate.title}
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
  );
};

export default NAAC;
