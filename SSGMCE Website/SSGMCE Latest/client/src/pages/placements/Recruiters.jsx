import { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import PageHeader from "../../components/PageHeader";
import PlacementSidebar from "../../components/PlacementSidebar";
import { FaDownload, FaBuilding, FaGlobe, FaExternalLinkAlt } from "react-icons/fa";
import recruitersPDF from "../../assets/images/placements/OUR RECRUITERS.pdf";

const CATEGORY_COLORS = {
  MNC: "bg-blue-100 text-blue-700 border-blue-200",
  "Product Based": "bg-purple-100 text-purple-700 border-purple-200",
  "Service Based": "bg-cyan-100 text-cyan-700 border-cyan-200",
  Core: "bg-orange-100 text-orange-700 border-orange-200",
  "Start-up": "bg-green-100 text-green-700 border-green-200",
  Other: "bg-gray-100 text-gray-700 border-gray-200",
};

const CATEGORY_ORDER = ["MNC", "Product Based", "Service Based", "Core", "Start-up", "Other"];

const Recruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Major Recruiters | SSGMCE";
    axios
      .get("/api/placements/recruiters")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setRecruiters(data.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Group recruiters by category
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = recruiters.filter((r) => r.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});
  const otherItems = recruiters.filter((r) => !CATEGORY_ORDER.includes(r.category));
  if (otherItems.length > 0) grouped["Other"] = [...(grouped["Other"] || []), ...otherItems];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Major Recruiters" subtitle="Our Esteemed Industry Partners" />

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
                <p className="text-gray-500">Loading recruiters…</p>
              </div>
            ) : error || recruiters.length === 0 ? (
              /* Fallback: show PDF + category overview */
              <>
                <section>
                  <h2 className="text-2xl font-bold text-ssgmce-orange mb-6 pb-2 border-b border-gray-200">
                    Our Recruiting Partners
                  </h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    SSGMCE has established strong partnerships with leading companies across various sectors. Our Training &amp; Placement Cell consistently brings top-tier organizations to campus, offering excellent career opportunities to our students.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "IT & Software", desc: "Leading tech companies and startups", color: "from-blue-500 to-blue-700" },
                      { label: "Core Engineering", desc: "Manufacturing & infrastructure", color: "from-orange-500 to-orange-700" },
                      { label: "MNCs", desc: "Global multinational corporations", color: "from-green-500 to-green-700" },
                      { label: "Emerging Tech", desc: "AI, IoT, Cloud & Analytics", color: "from-purple-500 to-purple-700" },
                    ].map((c) => (
                      <div key={c.label} className={`bg-gradient-to-br ${c.color} rounded-lg p-5 text-white text-center`}>
                        <FaBuilding className="text-3xl mb-2 mx-auto opacity-80" />
                        <h3 className="font-semibold mb-1 text-sm">{c.label}</h3>
                        <p className="text-xs opacity-85">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-ssgmce-blue">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Recruiters List</h3>
                    <p className="text-gray-700 mb-6">Download the comprehensive list of our recruiting partners.</p>
                    <a href={recruitersPDF} download="SSGMCE_Our_Recruiters.pdf" className="inline-flex items-center gap-3 bg-gradient-to-r from-ssgmce-orange to-orange-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                      <FaDownload className="text-xl" /> Download Recruiters List (PDF)
                    </a>
                  </div>
                </section>
              </>
            ) : (
              /* Live data from DB */
              <>
                <section>
                  <h2 className="text-2xl font-bold text-ssgmce-orange mb-4 pb-2 border-b border-gray-200">
                    Our Recruiting Partners
                  </h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    SSGMCE has established strong partnerships with leading companies across various sectors. Our Training &amp; Placement Cell consistently brings top-tier organizations to campus, offering excellent career opportunities to our students.
                  </p>

                  {Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="mb-10">
                      <div className="flex items-center gap-3 mb-5">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${CATEGORY_COLORS[category] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                          {category}
                        </span>
                        <span className="text-gray-400 text-sm">{items.length} company{items.length !== 1 ? "ies" : "y"}</span>
                        <div className="flex-1 border-t border-gray-200" />
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                        {items.map((r) => (
                          <div
                            key={r._id}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                          >
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
                              {r.logoUrl ? (
                                <img src={r.logoUrl} alt={r.name} className="w-full h-full object-contain" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling?.classList.remove("hidden"); }} />
                              ) : null}
                              <FaBuilding className={`text-xl text-gray-300 ${r.logoUrl ? "hidden" : ""}`} />
                            </div>
                            <p className="text-xs font-semibold text-gray-700 text-center leading-tight">{r.name}</p>
                            {r.website && (
                              <a href={r.website} target="_blank" rel="noopener noreferrer" className="text-xs text-ssgmce-blue hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <FaExternalLinkAlt className="text-xs" /> Visit
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* PDF Download supplement */}
                  <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-ssgmce-blue flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">Download Recruiters PDF</p>
                      <p className="text-sm text-gray-600">Full list with logos and company details.</p>
                    </div>
                    <a href={recruitersPDF} download="SSGMCE_Our_Recruiters.pdf" className="flex items-center gap-2 bg-ssgmce-orange text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-700 transition-colors whitespace-nowrap shrink-0">
                      <FaDownload /> Download PDF
                    </a>
                  </div>
                </section>
              </>
            )}

            {/* Why Choose Section */}
            <section>
              <h2 className="text-2xl font-bold text-ssgmce-blue mb-6 pb-2 border-b border-gray-200">
                Why Companies Choose SSGMCE Students
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { title: "Strong Technical Foundation", body: "Our students are well-versed in core engineering concepts and latest technologies, making them job-ready from day one.", accent: "border-ssgmce-orange" },
                  { title: "Industry-Ready Skills", body: "Comprehensive training programs ensure students possess both technical expertise and soft skills required in the industry.", accent: "border-ssgmce-blue" },
                  { title: "Practical Exposure", body: "Internships, industrial visits, and project work provide hands-on experience with real-world applications.", accent: "border-ssgmce-blue" },
                  { title: "Professional Attitude", body: "Ethics, discipline, and professional work culture are integral parts of our education system.", accent: "border-ssgmce-orange" },
                ].map((c) => (
                  <div key={c.title} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${c.accent}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Info */}
            <section className="bg-blue-50 rounded-lg p-6 border-l-4 border-ssgmce-blue">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FaGlobe className="text-ssgmce-blue" /> For Recruiters
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                We welcome companies interested in recruiting our talented students. For campus recruitment, placement brochure, or any queries:
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><strong>Email:</strong> <a href="mailto:placements@ssgmce.ac.in" className="text-ssgmce-blue hover:underline">placements@ssgmce.ac.in</a></p>
                <p><strong>Phone:</strong> <a href="tel:9422926420" className="text-ssgmce-blue hover:underline">+91 9422926420</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruiters;
