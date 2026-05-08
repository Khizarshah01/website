import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ResearchSidebar from "../../components/ResearchSidebar";
import {
  FaFlask,
  FaFileAlt,
  FaCertificate,
  FaProjectDiagram,
  FaRocket,
  FaArrowRight,
  FaBrain,
  FaMicrochip,
  FaSolarPanel,
  FaDatabase,
  FaShieldAlt,
  FaNetworkWired,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import apiClient from "../../utils/apiClient";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
    <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  </div>
);

const ResearchOverview = () => {
  const [stats, setStats] = useState(null);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Research & Innovation | SSGMCE";
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, areasRes] = await Promise.all([
        apiClient.get("/research/stats"),
        apiClient.get("/research/areas"),
      ]);
      setStats(statsRes.data);
      setAreas(areasRes.data);
      setError("");
    } catch (error) {
      logUnexpectedError("Error fetching research data:", error);
      setError(getErrorMessage(error, "Failed to load research overview"));
    } finally {
      setLoading(false);
    }
  };

  const iconMap = {
    FaBrain: FaBrain,
    FaMicrochip: FaMicrochip,
    FaSolarPanel: FaSolarPanel,
    FaDatabase: FaDatabase,
    FaShieldAlt: FaShieldAlt,
    FaNetworkWired: FaNetworkWired,
    FaFlask: FaFlask,
  };

  const quickLinks = [
    {
      title: "Publications",
      desc: "Browse research papers",
      icon: FaFileAlt,
      link: "/research/publications",
      color: "blue",
    },
    {
      title: "Patents & IP",
      desc: "Intellectual property",
      icon: FaCertificate,
      link: "/research/patents",
      color: "orange",
    },
    {
      title: "Funded Projects",
      desc: "Ongoing & completed",
      icon: FaProjectDiagram,
      link: "/research/projects",
      color: "blue",
    },
    {
      title: "Innovation Cell",
      desc: "Startups & ideas",
      icon: FaRocket,
      link: "/research/innovation",
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Research & Innovation"
        subtitle="Pioneering Research Excellence and Fostering Innovation at SSGMCE"
        breadcrumbs={[{ label: "Research & Innovation" }]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <ResearchSidebar />
          </div>

          <div className="lg:col-span-9 space-y-10">
            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}
            {/* Hero Stats */}
            <section className="grid md:grid-cols-4 gap-4">
              {loading ? (
                Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-white p-6 rounded-xl animate-pulse"
                    >
                      <div className="h-10 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))
              ) : (
                <>
                  <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6 rounded-2xl shadow-xl">
                    <FaFileAlt className="text-3xl mb-3 text-blue-300" />
                    <p className="text-4xl font-bold">
                      {stats?.publications || 0}+
                    </p>
                    <p className="text-blue-200 text-sm mt-1">Publications</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl">
                    <FaCertificate className="text-3xl mb-3 text-orange-200" />
                    <p className="text-4xl font-bold">
                      {stats?.patents?.total || 0}+
                    </p>
                    <p className="text-orange-100 text-sm mt-1">Patents & IP</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6 rounded-2xl shadow-xl">
                    <FaProjectDiagram className="text-3xl mb-3 text-blue-300" />
                    <p className="text-4xl font-bold">
                      {stats?.projects?.ongoing || 0}
                    </p>
                    <p className="text-blue-200 text-sm mt-1">
                      Ongoing Projects
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-2xl shadow-xl">
                    <FaChartLine className="text-3xl mb-3 text-green-200" />
                    <p className="text-4xl font-bold">
                      ₹{(stats?.totalFunding / 10000000)?.toFixed(1) || 0}Cr
                    </p>
                    <p className="text-green-100 text-sm mt-1">Total Funding</p>
                  </div>
                </>
              )}
            </section>

            {/* Introduction */}
            <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaFlask className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Research Excellence
                  </h2>
                  <p className="text-gray-500">
                    Driving Innovation Through Academic Research
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                SSGMCE is committed to fostering a vibrant research ecosystem
                that encourages innovation, creativity, and knowledge creation.
                Our faculty and students are engaged in cutting-edge research
                across multiple disciplines, contributing to national and
                international knowledge repositories through publications,
                patents, and funded projects.
              </p>
            </section>

            {/* Quick Links */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Explore Research
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {quickLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      to={item.link}
                      className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                              item.color === "blue"
                                ? "bg-blue-100 group-hover:bg-blue-600"
                                : "bg-orange-100 group-hover:bg-orange-500"
                            } transition-colors`}
                          >
                            <Icon
                              className={`text-2xl ${
                                item.color === "blue"
                                  ? "text-blue-600 group-hover:text-white"
                                  : "text-orange-500 group-hover:text-white"
                              } transition-colors`}
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-lg">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                        </div>
                        <FaArrowRight
                          className={`text-xl ${
                            item.color === "blue"
                              ? "text-blue-600"
                              : "text-orange-500"
                          } group-hover:translate-x-1 transition-transform`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Research Areas */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Research Focus Areas
                </h3>
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {areas.map((area, idx) => {
                    const Icon = iconMap[area.icon] || FaFlask;
                    const isBlue = idx % 2 === 0;
                    return (
                      <div
                        key={area._id || idx}
                        className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                      >
                        {/* Glassmorphism overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                            isBlue ? "bg-blue-100" : "bg-orange-100"
                          }`}
                        >
                          <Icon
                            className={`text-xl ${isBlue ? "text-blue-600" : "text-orange-500"}`}
                          />
                        </div>

                        <h4 className="font-bold text-gray-800 mb-2">
                          {area.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {area.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaUsers /> {area.facultyCount || 0} Faculty
                          </span>
                          <span className="flex items-center gap-1">
                            <FaFileAlt /> {area.publicationCount || 0} Papers
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Research Highlights */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-800 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">Research Highlights</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-orange-400 mb-2">4+</p>
                  <p className="text-blue-200">Research Centers</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold text-orange-400 mb-2">50+</p>
                  <p className="text-blue-200">PhD Faculty Members</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold text-orange-400 mb-2">10+</p>
                  <p className="text-blue-200">MoUs with Industry</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Collaborate With Us</h3>
              <p className="text-orange-100 mb-6 max-w-xl mx-auto">
                We welcome research collaborations with industry, academia, and
                government organizations.
              </p>
              <a
                href="mailto:research@ssgmce.ac.in"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
              >
                Contact Research Cell
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchOverview;
