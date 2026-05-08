import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUsers, FaTrophy, FaBuilding, FaArrowRight, FaClock, FaMapMarkerAlt, FaMicroscope, FaHandshake, FaCheckCircle, FaPlus, FaMinus, FaQuoteLeft, FaExternalLinkAlt } from 'react-icons/fa';
import StatCard from '../components/StatCard';
import NewsCard from '../components/NewsCard';
import NewsTicker from '../components/NewsTicker';
import useFetch from '../hooks/useFetch';
import apiClient from '../utils/apiClient';
import { resolveUploadedAssetUrl } from '../utils/uploadUrls';
import { HOME_LEADERSHIP } from '../data/homeLeadership';
import droneVideo from '../assets/images/home/drone shot.mp4';
import mainGateImg from '../assets/images/home/Main-Gate.avif';
import coCurricularImg from '../assets/images/about/vidyavibhag.jpeg';
import extraCurricularImg from '../assets/images/about/Library.jpeg';
import volunteerImg from '../assets/images/departments/it/industrial-visits/valuemomentum_pune_2025.png';
import sportsImg from '../assets/images/departments/electrical/industrial-visits/tata_power_shahad_2024.png';
import alumniWaghImg from '../assets/images/home/Alumni/Abhay_Wagh.jpg';
import alumniKaulImg from '../assets/images/home/Alumni/Umesh_Kaul.jpg';
import alumniWankhedeImg from '../assets/images/home/Alumni/Nitin-Wankhede.png';
import alumniDeuskarImg from '../assets/images/home/Alumni/Ashutosh_Deuskar.jpg';

const Home = () => {
  const { data: newsData } = useFetch('/api/news');
  const [activeCorner, setActiveCorner] = useState('co-curricular');
  const [recruiters, setRecruiters] = useState([]);
  const [alumniHighlights, setAlumniHighlights] = useState([]);

  // Fallback data from official SSGMCE website
  const staticNews = [
    { _id: '1', title: 'SWAYAM/NPTEL Registration Open for Quantum Computing Courses', date: '2026-01-24', description: 'Registration open for courses on Quantum Computing and Quantum Technology via SWAYAM/NPTEL portal.', category: 'Academic' },
    { _id: '2', title: 'International Conference ICICGR 2026 by E&TC Dept', date: '2025-11-13', description: 'International Conference on Innovations in Communication, Geoscience and Robotics scheduled for 24-25 April 2026.', category: 'Events' },
    { _id: '3', title: 'TCS Accredits SSGMCE as Top Priority College', date: '2025-07-09', description: 'Tata Consultancy Services officially accredited SSGMCE as a Top Priority College for campus placements.', category: 'Placements' },
    { _id: '4', title: 'Gold Medal at Khelo India Games', date: '2025-07-03', description: 'Jayashri Shetye (Electrical Engg) won gold at Khelo India Games held at Diu & Daman.', category: 'Achievement' },
    { _id: '5', title: 'Drone Club Wins First Prize at SPARK 2025', date: '2025-04-17', description: 'Students secured First Prize at National Level SPARK 2025 competition in drone technology.', category: 'Achievement' },
    { _id: '6', title: 'NAAC Accreditation Received', date: '2024-12-21', description: 'SSGMCE successfully receives NAAC accreditation in the 3rd cycle. Congratulations to all stakeholders.', category: 'Accreditation' },
  ];

  const newsItems = (newsData && newsData.length > 0) ? newsData : staticNews;

  const accreditations = [
    { label: 'AICTE', desc: 'Approved' },
    { label: 'NAAC', desc: 'Accredited' },
    { label: 'NBA', desc: 'Accredited' },
    { label: 'ISO 9001:2015', desc: 'Certified' },
    { label: 'NIRF', desc: 'Ranked' },
    { label: 'AAA', desc: 'Careers360' },
  ];

  const studentCornerItems = [
    {
      id: 'co-curricular',
      title: 'Co-Curricular Activities',
      image: coCurricularImg,
      text: 'Co-curricular activities are designed to improve social skills, intellectual growth, moral values, and personality development among students.',
    },
    {
      id: 'extra-curricular',
      title: 'Extra-Curricular Activities',
      image: extraCurricularImg,
      text: 'Students actively participate in seminars, internships, industrial visits, student publications, and technical projects outside regular classroom sessions.',
    },
    {
      id: 'volunteer',
      title: 'Volunteer Work',
      image: volunteerImg,
      text: 'NSS and outreach activities encourage students to contribute to society through community work, awareness drives, and social responsibility initiatives.',
    },
    {
      id: 'sports',
      title: 'Sports Club',
      image: sportsImg,
      text: 'SSGMCE offers indoor and outdoor sports facilities that help students build discipline, fitness, leadership qualities, and team spirit.',
    },
  ];

  const fallbackAlumni = [
    {
      id: 'wagh',
      organization: 'DTE, Mumbai',
      name: 'Mr. Abhay Wagh',
      role: 'Director',
      image: alumniWaghImg,
      department: 'Computer Science and Engineering',
      profileUrl: '',
      quote: '',
    },
    {
      id: 'kaul',
      organization: 'IBM',
      name: 'Mr. Umesh Kaul',
      role: 'Executive Architect / Consultant',
      image: alumniKaulImg,
      department: 'Computer Science and Engineering',
      profileUrl: '',
      quote: '',
    },
    {
      id: 'wankhede',
      organization: 'Value Momentum, Hyderabad',
      name: 'Mr. Nitin Wankhede',
      role: 'Vice President - Client Services',
      image: alumniWankhedeImg,
      department: 'Information Technology',
      profileUrl: '',
      quote: '',
    },
    {
      id: 'deuskar',
      organization: 'VDA Infosolutions',
      name: 'Mr. Ashutosh Deuskar',
      role: 'Director',
      image: alumniDeuskarImg,
      department: 'Computer Science and Engineering',
      profileUrl: '',
      quote: '',
    },
  ];

  const activeStudentCorner =
    studentCornerItems.find((item) => item.id === activeCorner) || studentCornerItems[0];
  const fallbackRecruiters = [
    { id: 'tcs', name: 'TCS' },
    { id: 'infosys', name: 'Infosys' },
    { id: 'wipro', name: 'Wipro' },
    { id: 'tech-mahindra', name: 'Tech Mahindra' },
    { id: 'cognizant', name: 'Cognizant' },
    { id: 'capgemini', name: 'Capgemini' },
  ];
  const homepageRecruiters = recruiters.length > 0 ? recruiters : fallbackRecruiters;
  const marqueeRecruiters = homepageRecruiters.length > 0
    ? [...homepageRecruiters, ...homepageRecruiters]
    : [];
  const homepageAlumni = alumniHighlights.length > 0 ? alumniHighlights : fallbackAlumni;
  const marqueeAlumni = homepageAlumni.length > 0
    ? [...homepageAlumni, ...homepageAlumni]
    : [];

  useEffect(() => {
    apiClient
      .get("/placements/recruiters")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : response.data.data || [];
        setRecruiters(
          data
            .filter((recruiter) => recruiter.showOnHome !== false)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name)),
        );
      })
      .catch(() => {
        setRecruiters([]);
      });

    apiClient
      .get("/placements/alumni")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : response.data.data || [];
        setAlumniHighlights(
          data
            .filter((alumni) => alumni.showOnHome !== false)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name)),
        );
      })
      .catch(() => {
        setAlumniHighlights([]);
      });
  }, []);

  return (
    <div className="animation-fade-in font-sans bg-white">

      {/* Hero Section */}
      <section className="relative h-[320px] sm:h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
        <video
          src={droneVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-14 left-0 right-0 z-20 px-4 text-center text-white sm:bottom-24 md:bottom-32">
          <h2 className="mb-3 text-2xl font-bold tracking-wide drop-shadow-lg sm:text-3xl md:mb-4 md:text-5xl">सर्वे भवन्तु सुखिनः</h2>
          <p className="mx-auto max-w-2xl text-sm font-light drop-shadow-md opacity-90 sm:text-base md:text-xl">Bestowed by the blessings of Shri Sant Gajanan Maharaj</p>
        </div>
      </section>

      {/* News Ticker */}
      <NewsTicker items={newsItems} />

      {/* Accreditations Bar */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-ssgmce-blue/[0.03] via-white to-ssgmce-orange/[0.03] border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 md:gap-4">
            {accreditations.map((item) => (
              <div key={item.label} className="flex min-h-[104px] flex-col items-center justify-center rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md md:px-5 md:py-4">
                <FaCheckCircle className="text-ssgmce-accent text-base mb-1.5" />
                <span className="text-sm md:text-base font-bold text-gray-800 leading-tight">{item.label}</span>
                <span className="text-xs text-ssgmce-muted mt-0.5">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 md:py-20 bg-ssgmce-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What We <span className="text-ssgmce-blue">Offer</span></h2>
            <p className="text-ssgmce-muted mt-3 max-w-xl mx-auto">AICTE approved, NAAC accredited, and NBA accredited programs since 1983</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Academic Excellence */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8">
              <div className="w-14 h-14 bg-ssgmce-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-ssgmce-blue/15 transition-colors">
                <FaMicroscope className="text-ssgmce-blue text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Academic Excellence</h3>
              <p className="text-ssgmce-muted leading-relaxed mb-6">
                B.E., M.E., MBA and Ph.D. programs across 7 departments affiliated to SGBAU, Amravati with NAAC and NBA accreditation.
              </p>
              <Link to="/departments/applied-sciences" className="inline-flex items-center text-ssgmce-blue font-semibold hover:text-ssgmce-orange transition-colors text-sm group-hover:gap-2 gap-1">
                Explore Programs <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Student Life */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8">
              <div className="w-14 h-14 bg-ssgmce-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-ssgmce-orange/15 transition-colors">
                <FaUsers className="text-ssgmce-orange text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Student Life</h3>
              <p className="text-ssgmce-muted leading-relaxed mb-6">
                IEEE, ISTE, ACM chapters, GDG club, Drone Club, E-Cell, NSS, NCC and cultural festivals like Pursuit and Parishkriti.
              </p>
              <Link to="/gallery" className="inline-flex items-center text-ssgmce-blue font-semibold hover:text-ssgmce-orange transition-colors text-sm group-hover:gap-2 gap-1">
                View Gallery <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Placements */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8">
              <div className="w-14 h-14 bg-ssgmce-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-ssgmce-accent/15 transition-colors">
                <FaHandshake className="text-ssgmce-accent text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Placements</h3>
              <p className="text-ssgmce-muted leading-relaxed mb-6">
                TCS Top Priority College with 35+ recruiters including Infosys, Wipro, Cognizant, Capgemini and more visiting annually.
              </p>
              <Link to="/placements/brochure" className="inline-flex items-center text-ssgmce-blue font-semibold hover:text-ssgmce-orange transition-colors text-sm group-hover:gap-2 gap-1">
                Placement Stats <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white via-ssgmce-blue/[0.02] to-ssgmce-orange/[0.03]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={mainGateImg}
                  alt="SSGMCE Main Gate"
                  className="h-[280px] w-full rounded-2xl object-cover shadow-lg sm:h-[340px] lg:h-[380px]"
                />
                <div className="absolute -bottom-4 right-4 z-20 hidden rounded-xl border-l-4 border-ssgmce-blue bg-white px-5 py-4 shadow-lg sm:block">
                    <p className="text-3xl font-bold text-ssgmce-orange mb-0.5">41+</p>
                    <p className="text-ssgmce-muted text-xs font-semibold uppercase tracking-wide">Years of Excellence</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-5">
              <p className="text-ssgmce-orange font-semibold uppercase tracking-widest text-xs">Est. 1983 &middot; Shegaon</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Empowering Minds, <br/> <span className="text-ssgmce-blue">Enriching Lives.</span>
              </h2>
              <p className="text-ssgmce-muted leading-relaxed">
                Established in 1983 by Shri Gajanan Shikshan Sanstha under Shri Sant Gajanan Maharaj Temple Trust, SSGMCE is one of the premier engineering institutes in Maharashtra, re-modeled into a smart, green and clean campus.
              </p>
              <p className="text-ssgmce-muted leading-relaxed">
                Approved by AICTE New Delhi, affiliated to SGBAU Amravati, accredited by NAAC and NBA, and ISO 9001:2015 certified. Rated AAA by Careers360 among the best engineering institutes in India.
              </p>
              <div className="pt-2">
                 <Link to="/about" className="inline-flex items-center gap-2 bg-ssgmce-blue text-white px-7 py-3 rounded-lg shadow-sm hover:bg-ssgmce-dark-blue transition-colors font-medium text-sm">
                    Read More About Us <FaArrowRight className="text-xs" />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-ssgmce-blue/[0.04] via-ssgmce-surface to-ssgmce-blue/[0.04] border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">SSGMCE in <span className="text-ssgmce-blue">Numbers</span></h2>
            <p className="text-ssgmce-muted mt-3">41 years of academic excellence and holistic development</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 max-w-4xl mx-auto">
            <StatCard icon={FaBuilding} number="7" label="Departments" />
            <StatCard icon={FaUsers} number="3000+" label="Students" />
            <StatCard icon={FaGraduationCap} number="150+" label="Faculty Members" />
            <StatCard icon={FaTrophy} number="12000+" label="Alumni Network" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
              Leadership Desk
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Faculty <span className="text-ssgmce-blue">Members</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
              Key academic leaders of SSGMCE, including the Principal and all Heads of Department, presented with verified details and direct access to the institute&apos;s official social channels.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {HOME_LEADERSHIP.map((member) => (
              <article
                key={member.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[4/3.55] overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className="min-h-[170px] bg-white px-4 py-4">
                  <div className="mb-3 h-1.5 w-10 rounded-full bg-gray-200" />
                  <h3 className="text-[1.2rem] font-bold leading-tight text-gray-900">{member.name}</h3>
                  <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ssgmce-blue">
                    {member.designation}
                  </p>
                  <p className="mt-1.5 text-[0.96rem] leading-relaxed text-gray-700">
                    {member.department}
                  </p>
                  {member.email && (
                    <p className="mt-2.5 text-[12px] text-gray-500 break-all">{member.email}</p>
                  )}
                </div>

              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 rounded-full border border-ssgmce-blue px-6 py-3 text-sm font-semibold text-ssgmce-blue transition-colors hover:bg-ssgmce-blue hover:text-white"
            >
              Explore Faculty Directory <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-16 md:py-20 bg-gradient-to-bl from-white via-ssgmce-orange/[0.02] to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 max-w-6xl mx-auto">

            {/* Latest News */}
            <div>
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Latest <span className="text-ssgmce-blue">News</span></h2>
                    <div className="w-12 h-0.5 bg-ssgmce-orange mt-3 rounded-full"></div>
                 </div>
                 <Link to="/news" className="text-sm font-medium text-ssgmce-blue hover:text-ssgmce-orange transition-colors">View All &rarr;</Link>
              </div>
              <div className="space-y-3">
                {newsItems.slice(0, 4).map((item) => (
                    <NewsCard
                      key={item._id}
                      title={item.title}
                      date={item.date}
                      description={item.description}
                      category={item.category || 'General'}
                    />
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Upcoming <span className="text-ssgmce-orange">Events</span></h2>
                    <div className="w-12 h-0.5 bg-ssgmce-blue mt-3 rounded-full"></div>
                 </div>
                 <Link to="/events" className="text-sm font-medium text-ssgmce-blue hover:text-ssgmce-orange transition-colors">Calendar &rarr;</Link>
              </div>
              <div className="bg-ssgmce-surface rounded-xl p-6 border border-gray-100">
                  {/* Event Item 1 */}
                  <div className="flex gap-4 mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                      <div className="text-center min-w-[56px] bg-white rounded-lg py-2.5 px-3 shadow-sm border border-gray-100">
                          <div className="text-xl font-bold text-ssgmce-blue leading-tight">24</div>
                          <div className="text-[10px] uppercase font-semibold text-ssgmce-muted">APR</div>
                      </div>
                      <div>
                          <h4 className="font-semibold text-gray-800 hover:text-ssgmce-blue transition-colors cursor-pointer mb-1.5 text-sm">ICICGR 2026 — International Conference</h4>
                          <div className="flex items-center text-xs text-ssgmce-muted">
                             <FaClock className="mr-1.5" size={10} /> 09:00 AM
                             <FaMapMarkerAlt className="ml-3 mr-1.5" size={10} /> E&TC Department
                          </div>
                          <p className="text-[10px] text-ssgmce-muted mt-1">Innovations in Communication, Geoscience and Robotics</p>
                      </div>
                  </div>
                  {/* Event Item 2 */}
                  <div className="flex gap-4 mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                      <div className="text-center min-w-[56px] bg-white rounded-lg py-2.5 px-3 shadow-sm border border-gray-100">
                          <div className="text-xl font-bold text-ssgmce-blue leading-tight">--</div>
                          <div className="text-[10px] uppercase font-semibold text-ssgmce-muted">2026</div>
                      </div>
                      <div>
                          <h4 className="font-semibold text-gray-800 hover:text-ssgmce-blue transition-colors cursor-pointer mb-1.5 text-sm">Pursuit 2026 — Technical Festival</h4>
                          <div className="flex items-center text-xs text-ssgmce-muted">
                             <FaMapMarkerAlt className="mr-1.5" size={10} /> SSGMCE Campus
                          </div>
                          <p className="text-[10px] text-ssgmce-muted mt-1">Annual technical fest with competitions and workshops</p>
                      </div>
                  </div>
                  {/* Event Item 3 */}
                  <div className="flex gap-4 mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                      <div className="text-center min-w-[56px] bg-white rounded-lg py-2.5 px-3 shadow-sm border border-gray-100">
                          <div className="text-xl font-bold text-ssgmce-blue leading-tight">--</div>
                          <div className="text-[10px] uppercase font-semibold text-ssgmce-muted">2026</div>
                      </div>
                      <div>
                          <h4 className="font-semibold text-gray-800 hover:text-ssgmce-blue transition-colors cursor-pointer mb-1.5 text-sm">Parishkriti 2026 — Cultural Festival</h4>
                          <div className="flex items-center text-xs text-ssgmce-muted">
                             <FaMapMarkerAlt className="mr-1.5" size={10} /> SSGMCE Campus
                          </div>
                          <p className="text-[10px] text-ssgmce-muted mt-1">Annual cultural celebration with performances and events</p>
                      </div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gradient-to-b from-[#fbfcfe] via-white to-[#f8f9fc] py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
            <div className="flex h-full flex-col">
              <div className="mb-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                  Campus Life
                </p>
                <h3 className="text-[2rem] font-bold text-slate-900 md:text-[2.05rem]">
                  Student&apos;s <span className="text-rose-400">Corner</span>
                </h3>
                <div className="mt-2 h-1 w-12 rounded-full bg-amber-300" />
              </div>

              <div className="flex flex-1 flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.22)] backdrop-blur-sm">
                <div className="space-y-2.5">
                  {studentCornerItems.map((item) => {
                    const isActive = item.id === activeCorner;

                    return (
                      <div key={item.id} className="overflow-hidden rounded-[1.05rem] border border-slate-200/80 bg-white">
                        <button
                          type="button"
                          onClick={() => setActiveCorner(item.id)}
                          className={`flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors ${
                            isActive ? 'bg-[#2f5f8d] text-white' : 'bg-[#f8fafc] text-[#2f5f8d] hover:bg-[#f1f5f9]'
                          }`}
                        >
                          {isActive ? <FaMinus className="text-[10px]" /> : <FaPlus className="text-[10px]" />}
                          <span className="text-[0.98rem] font-semibold leading-tight">{item.title}</span>
                        </button>

                        {isActive && (
                          <div className="grid grid-cols-[88px,1fr] gap-3 bg-[#fcfdff] p-3 md:grid-cols-[104px,1fr]">
                            <img
                              src={activeStudentCorner.image}
                              alt={activeStudentCorner.title}
                              className="h-[74px] w-full rounded-md object-cover"
                            />
                            <p className="text-[0.89rem] leading-relaxed text-slate-600">
                              {activeStudentCorner.text}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col">
              <div className="mb-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                  Notable Alumni
                </p>
                <h3 className="text-[2rem] font-bold text-slate-900 md:text-[2.05rem]">
                  Prestigious <span className="text-rose-400">Alumni</span>
                </h3>
                <div className="mt-2 h-1 w-12 rounded-full bg-amber-300" />
              </div>

              <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.22)] backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-y-3 left-3 z-10 w-12 rounded-l-[20px] bg-gradient-to-r from-white via-white/92 to-transparent md:w-16" />
                <div className="pointer-events-none absolute inset-y-3 right-3 z-10 w-12 rounded-r-[20px] bg-gradient-to-l from-[#f7f9fc] via-[#f7f9fc]/92 to-transparent md:w-16" />

                <div className="flex h-full flex-col rounded-[20px] border border-slate-100 bg-gradient-to-b from-[#fdfefe] to-[#f7f9fc] px-4 py-5 md:px-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {String(homepageAlumni.length).padStart(2, '0')} featured
                    </div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                      Managed from admin alumni section
                    </p>
                  </div>

                  <div className="overflow-hidden">
                    <div
                      className="flex w-max items-stretch gap-4"
                      style={{ animation: "recruiterMarquee 32s linear infinite" }}
                    >
                      {marqueeAlumni.map((alumni, index) => {
                        const imageUrl = resolveUploadedAssetUrl(alumni.imageUrl || alumni.image);
                        const itemKey = alumni._id || alumni.id || `${alumni.name}-${index}`;

                        return (
                          <article
                            key={itemKey}
                            className="flex w-[260px] shrink-0 flex-col rounded-[24px] border border-slate-200/80 bg-white px-5 py-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md md:w-[300px]"
                          >
                            <FaQuoteLeft className="mx-auto mb-4 text-[1.8rem] text-slate-200" />
                            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white bg-white shadow-[0_10px_24px_-18px_rgba(15,23,42,0.4)] md:h-28 md:w-28">
                              <img
                                src={imageUrl}
                                alt={alumni.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                              {alumni.organization}
                            </p>
                            <h4 className="mt-3 text-[1.3rem] font-bold leading-tight text-slate-900">
                              {alumni.name}
                            </h4>
                            <p className="mt-1.5 text-sm font-semibold text-amber-500">{alumni.role}</p>
                            {(alumni.department || alumni.batch) && (
                              <p className="mt-2 text-sm text-slate-500">
                                {[alumni.department, alumni.batch].filter(Boolean).join(" | ")}
                              </p>
                            )}
                            {alumni.quote && (
                              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500">
                                {alumni.quote}
                              </p>
                            )}
                            {alumni.profileUrl && (
                              <a
                                href={alumni.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-ssgmce-blue transition-colors hover:text-ssgmce-orange"
                              >
                                View Profile <FaExternalLinkAlt className="text-xs" />
                              </a>
                            )}
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiters Section */}
      <section className="overflow-hidden border-t border-gray-100 bg-[linear-gradient(180deg,#fbfcff_0%,#f6f8fb_100%)] py-14">
        <style>{`
          @keyframes recruiterMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-ssgmce-muted">
            Our Esteemed Recruiters
          </p>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Trusted by leading recruiters across technology, consulting and core sectors
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ssgmce-muted">
            TCS Top Priority College with 35+ companies visiting the campus. Manage the complete logo list directly from the admin recruiter section.
          </p>

          <div className="relative mt-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fbfcff] via-[#fbfcff]/92 to-transparent md:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f6f8fb] via-[#f6f8fb]/92 to-transparent md:w-24" />

            <div className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/90 px-3 py-5 shadow-[0_22px_60px_-38px_rgba(15,23,42,0.28)] backdrop-blur-sm md:px-5">
              <div
                className="flex w-max items-center gap-4 md:gap-6"
                style={{ animation: "recruiterMarquee 28s linear infinite" }}
              >
                {marqueeRecruiters.map((recruiter, index) => {
                  const logoUrl = resolveUploadedAssetUrl(recruiter.logoUrl);
                  const itemKey = recruiter._id || recruiter.id || `${recruiter.name}-${index}`;
                  const cardContent = (
                    <div className="group flex h-[88px] w-[170px] shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ssgmce-blue/30 hover:shadow-md md:h-[96px] md:w-[196px]">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={recruiter.name}
                          className="max-h-11 w-full object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100 md:max-h-12"
                        />
                      ) : (
                        <span className="text-center text-base font-bold text-slate-400 transition-colors duration-300 group-hover:text-ssgmce-blue">
                          {recruiter.name}
                        </span>
                      )}
                    </div>
                  );

                  if (recruiter.website) {
                    return (
                      <a
                        key={itemKey}
                        href={recruiter.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={recruiter.name}
                      >
                        {cardContent}
                      </a>
                    );
                  }

                  return (
                    <div key={itemKey} aria-label={recruiter.name}>
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
