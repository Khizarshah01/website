import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import PageHeader from "../components/PageHeader";
import {
  FaTrophy,
  FaBriefcase,
  FaChartLine,
  FaHandshake,
  FaQuoteLeft,
  FaUserCircle,
} from "react-icons/fa";

const Placements = () => {
  const [liveStats, setLiveStats] = useState([]);
  const [liveRecruiters, setLiveRecruiters] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Hardcoded fallbacks (shown when DB is empty)
  const fallbackStats = [
    {
      year: "2023-24",
      placed: "215",
      companies: "45",
      highest: "12.5 LPA",
      average: "4.2 LPA",
    },
    {
      year: "2022-23",
      placed: "198",
      companies: "42",
      highest: "11.0 LPA",
      average: "4.0 LPA",
    },
    {
      year: "2021-22",
      placed: "185",
      companies: "38",
      highest: "10.5 LPA",
      average: "3.8 LPA",
    },
  ];
  const fallbackRecruiters = [
    "TCS",
    "Infosys",
    "Wipro",
    "Cognizant",
    "Tech Mahindra",
    "Capgemini",
    "L&T",
    "Persistent Systems",
    "Hexaware",
    "Accenture",
    "IBM",
    "Oracle",
    "Microsoft",
    "Amazon",
  ];

  useEffect(() => {
    apiClient
      .get("/api/placements/stats")
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : r.data.data || [];
        setLiveStats(
          data.sort((a, b) => b.academicYear.localeCompare(a.academicYear)),
        );
      })
      .catch(() => {});

    apiClient
      .get("/api/placements/recruiters")
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : r.data.data || [];
        setLiveRecruiters(
          data.sort(
            (a, b) => a.order - b.order || a.name.localeCompare(b.name),
          ),
        );
      })
      .catch(() => {});

    apiClient
      .get("/api/placements/testimonials")
      .then((r) => {
        setTestimonials(Array.isArray(r.data) ? r.data : r.data.data || []);
      })
      .catch(() => {});
  }, []);

  const stats = liveStats.length > 0 ? liveStats : null;
  const latest = stats?.[0];

  return (
    <div className="animation-fade-in">
      <PageHeader
        title="Placements & Training"
        subtitle="Building Careers, Shaping Futures"
      />

      {/* Placement Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">
            Placement Statistics
          </h2>

          {/* Current Year Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: FaBriefcase,
                number: latest ? `${latest.totalOffers}+` : "215+",
                label: "Students Placed",
                color: "bg-ssgmce-blue",
              },
              {
                icon: FaTrophy,
                number: latest ? `${latest.placementPercentage}%` : "85%",
                label: "Placement Rate",
                color: "bg-ssgmce-orange",
              },
              {
                icon: FaChartLine,
                number: latest ? `${latest.highestPackage} LPA` : "12.5 LPA",
                label: "Highest Package",
                color: "bg-ssgmce-dark-blue",
              },
              {
                icon: FaHandshake,
                number: latest ? `${latest.companiesVisited}+` : "45+",
                label: "Companies Visited",
                color: "bg-green-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300`}
              >
                <stat.icon className="text-4xl mb-3 mx-auto block" />
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Year-wise Stats */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Academic Year</th>
                  <th className="px-6 py-4 text-center">Students Placed</th>
                  <th className="px-6 py-4 text-center">Companies Visited</th>
                  <th className="px-6 py-4 text-center">Highest Package</th>
                  <th className="px-6 py-4 text-center">Average Package</th>
                </tr>
              </thead>
              <tbody>
                {(stats ?? fallbackStats).map((s, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-semibold text-ssgmce-blue">
                      {s.academicYear || s.year}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {s.totalOffers || s.placed}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {s.companiesVisited || s.companies}
                    </td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">
                      {s.highestPackage ? `${s.highestPackage} LPA` : s.highest}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold">
                      {s.averagePackage ? `${s.averagePackage} LPA` : s.average}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">
            Our Top Recruiters
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {liveRecruiters.length > 0
              ? liveRecruiters.slice(0, 14).map((r) => (
                  <div
                    key={r._id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-2"
                  >
                    {r.logoUrl ? (
                      <img
                        src={r.logoUrl}
                        alt={r.name}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : null}
                    <span className="font-bold text-ssgmce-blue text-center text-sm">
                      {r.name}
                    </span>
                  </div>
                ))
              : fallbackRecruiters.map((company, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-center"
                  >
                    <span className="font-bold text-ssgmce-blue">
                      {company}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-4">
              Student Success Stories
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Hear from our alumni about their placement experiences and the
              role SSGMCE played in shaping their careers.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t._id}
                  className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-ssgmce-orange flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <FaQuoteLeft className="text-ssgmce-orange text-2xl opacity-60" />
                  <p className="text-gray-600 italic text-sm leading-relaxed flex-1">
                    {t.message}
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                      {t.photoUrl ? (
                        <img
                          src={t.photoUrl}
                          alt={t.studentName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <FaUserCircle className="text-2xl text-gray-300" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">
                        {t.studentName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t.department} · Batch {t.batch}
                      </p>
                      <p className="text-xs text-ssgmce-orange font-medium">
                        {t.designation
                          ? `${t.designation} @ ${t.company}`
                          : t.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Training & Development */}
      <section
        className={`py-16 ${testimonials.length > 0 ? "bg-gray-50" : ""}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">
            Training & Development
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Aptitude Training",
                desc: "Regular aptitude and reasoning training sessions to prepare students for campus interviews",
                icon: "📊",
              },
              {
                title: "Technical Skills",
                desc: "Workshops on latest technologies and programming languages to enhance technical skills",
                icon: "💻",
              },
              {
                title: "Communication Skills",
                desc: "Soft skills and communication training to improve personality and confidence",
                icon: "🗣️",
              },
              {
                title: "Mock Interviews",
                desc: "Regular mock interview sessions conducted by industry experts and alumni",
                icon: "🎤",
              },
              {
                title: "Industry Visits",
                desc: "Organized industrial visits to give practical exposure to students",
                icon: "🏭",
              },
              {
                title: "Internships",
                desc: "Assistance in securing internships in reputed companies for hands-on experience",
                icon: "💼",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-ssgmce-orange hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-ssgmce-blue mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">
            Placement Process
          </h2>
          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Pre-Placement Training",
                desc: "Students undergo comprehensive training in aptitude, technical, and soft skills",
              },
              {
                step: "2",
                title: "Resume Building",
                desc: "Guidance for creating professional resumes highlighting skills and achievements",
              },
              {
                step: "3",
                title: "Company Registration",
                desc: "Companies register through our placement portal and schedule campus drives",
              },
              {
                step: "4",
                title: "Pre-Placement Talks",
                desc: "Companies conduct presentations about their organization and job profiles",
              },
              {
                step: "5",
                title: "Written Test & GD",
                desc: "Eligible students appear for written tests and group discussions",
              },
              {
                step: "6",
                title: "Personal Interview",
                desc: "Final round of technical and HR interviews conducted by company representatives",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 mb-6 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-ssgmce-orange to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 bg-white p-5 rounded-lg shadow-md border-l-4 border-ssgmce-blue">
                  <h4 className="text-lg font-bold text-ssgmce-blue mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Placement Cell */}
      <section className="py-16 bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Placement Cell</h2>
          <p className="text-xl mb-8 text-ssgmce-light-blue max-w-3xl mx-auto">
            For campus recruitment opportunities and placement related queries,
            please contact our Training & Placement Office
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg">
              <p className="font-bold text-lg mb-1">Email</p>
              <p className="text-ssgmce-light-blue">placement@ssgmce.ac.in</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg">
              <p className="font-bold text-lg mb-1">Phone</p>
              <p className="text-ssgmce-light-blue">+91-7265-252278</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Placements;
