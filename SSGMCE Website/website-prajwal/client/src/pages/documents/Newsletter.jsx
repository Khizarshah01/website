import PageHeader from "../../components/PageHeader";
import DocumentsSidebar from "../../components/DocumentsSidebar";

const Newsletter = () => {
  const newsletters = [
    {
      serial: 1,
      year: "2026",
      url: "/uploads/documents/newsletter/08_Newsletter_2026.pdf",
    },
    {
      serial: 2,
      year: "2025",
      url: "/uploads/documents/newsletter/07_Newsletter_2025.pdf",
    },
    {
      serial: 3,
      year: "2024",
      url: "/uploads/documents/newsletter/06_Newsletter_2024.pdf",
    },
    {
      serial: 4,
      year: "2023",
      url: "/uploads/documents/newsletter/05_Newsletter_2023.pdf",
    },
    {
      serial: 5,
      year: "2022",
      url: "/uploads/documents/newsletter/04_Newsletter_2022.pdf",
    },
    {
      serial: 6,
      year: "2021",
      url: "/uploads/documents/newsletter/03_Newsletter_2021.pdf",
    },
    {
      serial: 7,
      year: "2020",
      url: "/uploads/documents/newsletter/02_Newsletter_2020.pdf",
    },
    {
      serial: 8,
      year: "2019",
      url: "/uploads/documents/newsletter/01_Newsletter_2019.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Newsletters"
        subtitle="Annual College Publications"
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
                Newsletters
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Annual newsletters showcasing institution's achievements, events, and highlights from each academic year.
              </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-6 py-4 text-left font-bold text-gray-800 border-r w-20">Serial No.</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-800 border-r">Year</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-800">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletters.map((newsletter) => (
                    <tr key={newsletter.serial} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700 border-r font-medium text-center">{newsletter.serial}</td>
                      <td className="px-6 py-4 text-gray-700 border-r">{newsletter.year}</td>
                      <td className="px-6 py-4">
                        <a
                          href={newsletter.url}
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

export default Newsletter;
