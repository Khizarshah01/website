import { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import DocumentsSidebar from "../../components/DocumentsSidebar";
import { FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";

// Static NIRF data - PDFs downloaded from https://www.ssgmce.ac.in/IQAC_NIRF.php
const nirfData = [
  {
    year: "2022-23",
    reports: [
      { category: "Overall Ranking", url: "/uploads/documents/nirf/NIRF_2022-23_Overall.pdf" },
      { category: "Engineering Ranking", url: "/uploads/documents/nirf/NIRF_2022-23_Engineering.pdf" },
      { category: "Management Ranking", url: "/uploads/documents/nirf/NIRF_2022-23_Management.pdf" },
    ],
  },
  {
    year: "2021-22",
    reports: [
      { category: "Overall Ranking", url: null },
      { category: "Engineering Ranking", url: "/uploads/documents/nirf/NIRF_2021-22_Engineering.pdf" },
      { category: "Management Ranking", url: null },
    ],
  },
  {
    year: "2020-21",
    reports: [
      { category: "Overall Ranking", url: null },
      { category: "Engineering Ranking", url: null },
      { category: "Management Ranking", url: null },
    ],
  },
];

const NIRF = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "NIRF Rankings | SSGMCE";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="NIRF Rankings"
        subtitle="National Institutional Ranking Framework"
        backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <DocumentsSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            {/* About NIRF */}
            <div id="nirf-about" className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">About NIRF</h2>
              <p className="text-gray-600 leading-relaxed">
                The National Institutional Ranking Framework (NIRF) was approved by the MHRD and launched on 29th September 2015.
                This framework outlines a methodology to rank institutions across the country based on parameters such as
                Teaching, Learning & Resources, Research and Professional Practice, Graduation Outcomes, Outreach and Inclusivity,
                and Perception.
              </p>
            </div>

            {/* NIRF Report Heading */}
            <div id="nirf-rankings" className="flex items-center gap-3">
              <FaCalendarAlt className="text-2xl text-ssgmce-orange" />
              <h2 className="text-2xl font-bold text-gray-800">Data Submitted To NIRF</h2>
            </div>

            {/* Year-wise NIRF Reports - 3-column layout matching original site */}
            <div className="grid md:grid-cols-3 gap-8">
              {nirfData.map((yearData) => (
                <div key={yearData.year} className="text-center">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">NIRF {yearData.year}</h3>
                  <div className="flex flex-col items-center gap-3">
                    {yearData.reports.map((report) =>
                      report.url ? (
                        <a
                          key={report.category}
                          href={report.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-56 px-5 py-3 bg-[#4a8db7] text-white text-sm font-medium rounded shadow hover:bg-[#3a7da7] transition-colors text-center"
                        >
                          {report.category}
                        </a>
                      ) : (
                        <span
                          key={report.category}
                          className="w-56 px-5 py-3 bg-[#4a8db7] text-white text-sm font-medium rounded shadow opacity-60 cursor-not-allowed text-center"
                        >
                          {report.category}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* External NIRF Link */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaExternalLinkAlt className="text-ssgmce-blue" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Visit the official NIRF portal for detailed rankings</p>
                <a
                  href="https://www.nirfindia.org/Home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ssgmce-blue font-semibold hover:underline"
                >
                  www.nirfindia.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NIRF;
