import PageHeader from "../../components/PageHeader";
import DocumentsSidebar from "../../components/DocumentsSidebar";

const Financial = () => {
  const auditedReports = [
    {
      serial: 1,
      year: "2024-25",
      url: "/uploads/documents/financial/01_Balance_Sheet_2024-25.pdf",
    },
    {
      serial: 2,
      year: "2023-24",
      url: "/uploads/documents/financial/02_Balance_Sheet_2023-24.pdf",
    },
    {
      serial: 3,
      year: "2022-23",
      url: "/uploads/documents/financial/03_Financial_Statement_2022-23.pdf",
    },
    {
      serial: 4,
      year: "2021-22",
      url: "/uploads/documents/financial/04_Financial_Statement_2021-22.pdf",
    },
    {
      serial: 5,
      year: "2020-21",
      url: "/uploads/documents/financial/05_Financial_Statement_2020-21.pdf",
    },
    {
      serial: 6,
      year: "2019-20",
      url: "/uploads/documents/financial/06_Financial_Statement_2019-20.pdf",
    },
    {
      serial: 7,
      year: "2018-19",
      url: "/uploads/documents/financial/07_Financial_Statement_2018-19.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Financial Statements"
        subtitle="Audited Reports and Financial Disclosures"
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
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-ssgmce-blue mb-3">
                Audited Reports
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Year-wise audited financial reports of SSGMCE, Shegaon demonstrating financial transparency and accountability.
              </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-6 py-4 text-left font-bold text-gray-800 border-r w-16">Serial No.</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-800 border-r">Academic Year/ Session</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-800">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {auditedReports.map((report) => (
                    <tr key={report.serial} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700 border-r font-medium text-center">{report.serial}</td>
                      <td className="px-6 py-4 text-gray-700 border-r">{report.year}</td>
                      <td className="px-6 py-4">
                        <a
                          href={report.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          Click here
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

export default Financial;
