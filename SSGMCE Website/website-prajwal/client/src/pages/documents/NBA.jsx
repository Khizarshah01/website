import PageHeader from "../../components/PageHeader";
import DocumentsSidebar from "../../components/DocumentsSidebar";

const NBA = () => {
  const accreditations = [
    {
      programs: "B.E. Computer Science & Engineering, B.E. Electrical & Power Engineering, B.E. Mechanical Engineering, B.E. Electronics & Telecommunication Engg.",
      validity: "2022-2023 to 2024-2025 i.e., upto 30/06/2025",
      ugPg: "UG",
      status: "Current Accreditation",
      links: [
        { text: "Accreditation Letter", url: "/uploads/documents/nba/01_NBA_Accreditation_2022-2025.pdf" },
      ],
    },
    {
      programs: "B.E. Computer Science & Engineering, B.E. Electrical & Power Engineering, B.E. Mechanical Engineering, B.E. Electronics & Telecommunication Engg.",
      validity: "2019-2020 to 2021-2022",
      ugPg: "UG",
      status: "Accreditation Letter",
      links: [
        { text: "Accreditation Letter", url: "/uploads/documents/nba/02_NBA_Accreditation_2019-2022.pdf" },
      ],
    },
    {
      programs: "Master of Business Administration (M.B.A.)",
      validity: "24-04-2002 to 23-04-2005, 04-05-2007 to 03-05-2010, 18-09-2013 to 17-09-2016",
      ugPg: "PG",
      status: "Accredited 3 Times by NBA & re-accreditation process is going on",
      links: [
        { text: "Accreditation Letter 2002-2005", url: "/uploads/documents/nba/05_NBA_MBA_Accreditation_2002-2005.pdf" },
        { text: "Accreditation Letter 2007-2010", url: "/uploads/documents/nba/04_NBA_MBA_Accreditation_2007-2010.pdf" },
        { text: "Accreditation Letter 2013-2016", url: "/uploads/documents/nba/03_NBA_MBA_Accreditation_2013-2016.pdf" },
      ],
    },
    {
      programs: "M.E. Digital Electronics",
      validity: "19-07-2008 to 18-07-2011",
      ugPg: "PG",
      status: "Accredited Once by NBA & re-accreditation process is going on",
      links: [
        { text: "Accreditation Letter 2008-2011", url: "/uploads/documents/nba/06_NBA_Digital_Electronics_2008-2011.pdf" },
      ],
    },
    {
      programs: "B.E. Information Technology",
      validity: "19-07-2008 to 18-07-2011",
      ugPg: "UG",
      status: "Accredited Once by NBA & re-accreditation process is going on",
      links: [
        { text: "Accreditation Letter 2008-2011", url: "/uploads/documents/nba/07_NBA_IT_Accreditation_2008-2011.pdf" },
      ],
    },
    {
      programs: "B.E. Computer Science & Engineering",
      validity: "24-04-2002 to 23-04-2005, 04-05-2007 to 03-05-2010, 05-08-2013 to 04-08-2015",
      ugPg: "UG",
      status: "Accreditation Letter",
      links: [
        { text: "Accreditation Letter 2002-2005", url: "/uploads/documents/nba/10_NBA_CSE_Accreditation_2002-2005.pdf" },
        { text: "Accreditation Letter 2007-2010", url: "/uploads/documents/nba/09_NBA_CSE_Accreditation_2007-2010.pdf" },
        { text: "Accreditation Letter 2013-2015", url: "/uploads/documents/nba/08_NBA_CSE_Accreditation_2013-2015.pdf" },
      ],
    },
    {
      programs: "B.E. Electrical Engineering, B.E. Electronics & Telecommunication Engg., B.E. Mechanical Engineering.",
      validity: "01-04-2001 to 31-03-2004, 20-07-2005 to 19-07-2008, 05-05-2009 to 04-05-2012, 18-09-2013 to 17-09-2015",
      ugPg: "UG",
      status: "Accreditation Letter",
      links: [
        { text: "Accreditation Letter 2001-2004", url: "/uploads/documents/nba/11_NBA_Electrical_2001-2004_EXTC_ELPO_CSE_MECH.pdf" },
        { text: "Accreditation Letter 2005-2008", url: "/uploads/documents/nba/12_NBA_Electrical_2005-2008_MECH_EXTC_ELPO.pdf" },
        { text: "Accreditation Letter 2009-2012", url: "/uploads/documents/nba/13_NBA_Electrical_2009-2012_EXTC_ELPO_MECH.pdf" },
        { text: "Accreditation Letter 2013-2015", url: "/uploads/documents/nba/14_NBA_Electrical_2013-2015_ELPO_EXTC_MECH.pdf" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="NBA Accreditation"
        subtitle="National Board of Accreditation"
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
            <div id="nba-status" className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-ssgmce-blue mb-3">
                NBA ACCREDITATION STATUS
              </h2>
              <p className="text-gray-600 leading-relaxed">
                SSGMCE, Shegaon is NBA accredited for multiple engineering and management programs. Programs are accredited based on NBA's quality criteria and continuous improvement standards.
              </p>
            </div>

            {/* Table */}
            <div id="nba-table" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="px-4 py-3 text-left font-bold text-gray-800 border-r">Program(s)</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-800 border-r">Period of Validity</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-800 border-r">UG/PG</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-800 border-r">Status</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-800">Documents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accreditations.map((acc, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-700 border-r">{acc.programs}</td>
                        <td className="px-4 py-3 text-gray-700 border-r text-xs">{acc.validity}</td>
                        <td className="px-4 py-3 text-gray-700 border-r font-medium">{acc.ugPg}</td>
                        <td className="px-4 py-3 text-gray-700 border-r">{acc.status}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {acc.links.map((link, linkIdx) => (
                              <a
                                key={linkIdx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline text-xs"
                              >
                                {link.text}
                              </a>
                            ))}
                          </div>
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

export default NBA;
