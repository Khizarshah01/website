import PageHeader from "../../components/PageHeader";
import DocumentsSidebar from "../../components/DocumentsSidebar";

const Tattwadarshi = () => {
  const magazines = [
    {
      serial: 1,
      year: "2025",
      url: "/uploads/documents/tattwadarshi/07_Tattwadarshi_2025.pdf",
    },
    {
      serial: 2,
      year: "2024",
      url: "/uploads/documents/tattwadarshi/06_Tattwadarshi_2024.pdf",
    },
    {
      serial: 3,
      year: "2023",
      url: "/uploads/documents/tattwadarshi/05_Tattwadarshi_2023.pdf",
    },
    {
      serial: 4,
      year: "2022",
      url: "/uploads/documents/tattwadarshi/04_Tattwadarshi_2022.pdf",
    },
    {
      serial: 5,
      year: "2021",
      url: "/uploads/documents/tattwadarshi/03_Tattwadarshi_2021.pdf",
    },
    {
      serial: 6,
      year: "2020",
      url: "/uploads/documents/tattwadarshi/02_Tattwadarshi_2020.pdf",
    },
    {
      serial: 7,
      year: "2019",
      url: "/uploads/documents/tattwadarshi/01_Tattwadarshi_2019.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="e-Tattwadarshi"
        subtitle="Technical Magazine"
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
                e-Tattwadarshi
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Tattwadarshi is the technical magazine of SSGMCE featuring research papers, technical articles, innovation reports, and student projects. The magazine received the Second Prize in the Magazine Competition at Sant Gadge Baba Amravati University (SGBAU), Amravati.
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
                  {magazines.map((magazine) => (
                    <tr key={magazine.serial} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700 border-r font-medium text-center">{magazine.serial}</td>
                      <td className="px-6 py-4 text-gray-700 border-r">{magazine.year}</td>
                      <td className="px-6 py-4">
                        <a
                          href={magazine.url}
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

export default Tattwadarshi;
