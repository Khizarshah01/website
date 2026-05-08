import { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import PageHeader from "../../components/PageHeader";
import PlacementSidebar from "../../components/PlacementSidebar";
import { FaChartLine, FaUsers, FaBuilding, FaTrophy, FaDownload } from "react-icons/fa";
import placementStatsPDF from "../../assets/images/placements/3 years Placement Stats.pdf";

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className={`${color} rounded-lg shadow-lg p-5 text-white flex flex-col gap-2`}>
    <Icon className="text-3xl opacity-80" />
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm opacity-90">{label}</div>
  </div>
);

const PlacementStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Placement Statistics | SSGMCE";
    axios
      .get("/api/placements/stats")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setStats(data.slice().sort((a, b) => b.academicYear.localeCompare(a.academicYear)));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const latest = stats[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Placement Statistics" subtitle="Our Placement Track Record" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 flex-shrink-0">
            <div className="sticky top-24">
              <PlacementSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-10">
            {loading ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-ssgmce-orange mx-auto mb-4" />
                <p className="text-gray-500">Loading statistics…</p>
              </div>
            ) : error || stats.length === 0 ? (
              /* Fallback: no live data yet — show PDF download */
              <section>
                <h2 className="text-2xl font-bold text-ssgmce-orange mb-6 pb-2 border-b border-gray-200">
                  Placement Performance
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  SSGMCE has consistently maintained an excellent placement record. Our Training &amp; Placement Cell works tirelessly to bring top-tier companies to campus and prepare students for successful careers.
                </p>
                <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-ssgmce-blue">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Download Detailed Statistics</h3>
                  <p className="text-gray-700 mb-6">Get comprehensive placement data for the last three academic years including department-wise statistics, salary packages, and more.</p>
                  <a
                    href={placementStatsPDF}
                    download="SSGMCE_3_Years_Placement_Statistics.pdf"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    <FaDownload className="text-xl" />
                    Download 3 Years Placement Statistics (PDF)
                  </a>
                </div>
              </section>
            ) : (
              <>
                {/* Latest Year Highlights */}
                {latest && (
                  <section>
                    <h2 className="text-2xl font-bold text-ssgmce-orange mb-2 pb-2 border-b border-gray-200">
                      Placement Performance — {latest.academicYear}
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm">
                      Highlights from our most recent placement season.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <StatCard icon={FaChartLine} value={`${latest.placementPercentage}%`} label="Placement Rate" color="bg-gradient-to-br from-blue-500 to-blue-700" />
                      <StatCard icon={FaTrophy} value={`${latest.highestPackage} LPA`} label="Highest Package" color="bg-gradient-to-br from-green-500 to-green-700" />
                      <StatCard icon={FaUsers} value={latest.totalOffers} label="Total Offers" color="bg-gradient-to-br from-orange-500 to-orange-700" />
                      <StatCard icon={FaBuilding} value={latest.companiesVisited} label="Companies" color="bg-gradient-to-br from-purple-500 to-purple-700" />
                    </div>
                    {latest.averagePackage > 0 && (
                      <p className="text-sm text-gray-500">
                        Average Package: <span className="font-semibold text-gray-700">{latest.averagePackage} LPA</span>
                      </p>
                    )}
                  </section>
                )}

                {/* Year-wise Table */}
                <section>
                  <h2 className="text-2xl font-bold text-ssgmce-blue mb-6 pb-2 border-b border-gray-200">
                    Year-wise Statistics
                  </h2>
                  <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 bg-white">
                    <table className="w-full text-sm">
                      <thead className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white">
                        <tr>
                          {["Academic Year", "Placement %", "Students Placed", "Highest (LPA)", "Average (LPA)", "Companies"].map((h) => (
                            <th key={h} className="px-5 py-4 text-left font-semibold whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {stats.map((s, i) => (
                          <tr key={s._id} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
                            <td className="px-5 py-4 font-bold text-ssgmce-blue">{s.academicYear}</td>
                            <td className="px-5 py-4 font-semibold text-green-600">{s.placementPercentage}%</td>
                            <td className="px-5 py-4">{s.totalOffers}</td>
                            <td className="px-5 py-4 font-semibold">{s.highestPackage} LPA</td>
                            <td className="px-5 py-4">{s.averagePackage} LPA</td>
                            <td className="px-5 py-4">{s.companiesVisited}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Department-wise breakdown for latest year */}
                {latest?.departmentWise?.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-ssgmce-blue mb-6 pb-2 border-b border-gray-200">
                      Department-wise Placed ({latest.academicYear})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {latest.departmentWise.map((dw) => (
                        <div key={dw.department} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                          <div className="text-2xl font-bold text-ssgmce-orange">{dw.placedCount}</div>
                          <div className="text-sm text-gray-600 mt-1">{dw.department}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* PDF Download supplement */}
                <section className="bg-blue-50 rounded-lg p-6 border-l-4 border-ssgmce-blue flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Detailed Statistics PDF</h3>
                    <p className="text-sm text-gray-600">Download the full report with department-wise and company-wise data.</p>
                  </div>
                  <a
                    href={placementStatsPDF}
                    download="SSGMCE_3_Years_Placement_Statistics.pdf"
                    className="flex items-center gap-2 bg-ssgmce-blue text-white px-5 py-2.5 rounded-lg font-medium hover:bg-ssgmce-dark-blue transition-colors whitespace-nowrap shrink-0"
                  >
                    <FaDownload /> Download PDF
                  </a>
                </section>
              </>
            )}

            <section className="bg-blue-50 rounded-lg p-5 border-l-4 border-ssgmce-blue text-sm text-gray-700">
              <p className="font-semibold text-gray-800 mb-1">Note</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Statistics are updated annually after the placement season closes.</li>
                <li>Data includes both on-campus and off-campus placements coordinated by T&amp;P Cell.</li>
                <li>For queries, contact <a href="mailto:placements@ssgmce.ac.in" className="text-ssgmce-blue hover:underline">placements@ssgmce.ac.in</a>.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementStats;
