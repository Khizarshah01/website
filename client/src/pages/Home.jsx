import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUsers, FaTrophy, FaBuilding, FaArrowRight, FaClock, FaMapMarkerAlt, FaMicroscope, FaHandshake, FaPlus, FaMinus, FaQuoteLeft, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';
import StatCard from '../components/StatCard';
import NewsCard from '../components/NewsCard';
import NewsTicker from '../components/NewsTicker';
import useFetch from '../hooks/useFetch';
import apiClient from '../utils/apiClient';
import { resolveUploadedAssetUrl } from '../utils/uploadUrls';
import { HOME_LEADERSHIP } from '../data/homeLeadership';
import droneVideo from '../assets/images/home/drone shot.mp4';
import mainGateImg from '../assets/images/home/Main-Gate.jpeg';
import campusViewImg from '../assets/images/home/Campus-View.avif';
import coCurricularImg from '../assets/images/about/vidyavibhag.jpeg';
import extraCurricularImg from '../assets/images/about/Library.jpeg';
import electronicsLabImg from '../assets/images/departments/electronics/labs/Electronics_and_devices_circuit_lab.jpg';
import aicteLogo from '../assets/images/about/AICTE.png';
import aaPlusLogo from '../assets/images/about/AA+.png';
import naacLogo from '../assets/images/about/NAAC.png';
import nbaLogo from '../assets/images/about/NBA.png';
import nirfLogo from '../assets/images/about/NIRF.png';
import isoLogo from '../assets/images/about/ISO.png';
import volunteerImg from '../assets/images/departments/it/industrial-visits/valuemomentum_pune_2025.png';
import sportsImg from '../assets/images/departments/electrical/industrial-visits/tata_power_shahad_2024.png';
import alumniWaghImg from '../assets/images/home/Alumni/Abhay_Wagh.jpg';
import alumniKaulImg from '../assets/images/home/Alumni/Umesh_Kaul.jpg';
import alumniWankhedeImg from '../assets/images/home/Alumni/Nitin-Wankhede.png';
import alumniDeuskarImg from '../assets/images/home/Alumni/Ashutosh_Deuskar.jpg';

const Home = () => {
  const { data: newsData, error: newsError } = useFetch('/news');
  const { data: upcomingEventsData, error: upcomingEventsError } = useFetch('/events/upcoming');
  const { data: allEventsData, error: allEventsError } = useFetch('/events');
  const [activeCorner, setActiveCorner] = useState('co-curricular');
  const [homeConfig, setHomeConfig] = useState({});
  const [resolvedHeroVideoSrc, setResolvedHeroVideoSrc] = useState(droneVideo);
  const [recruiters, setRecruiters] = useState([]);
  const [alumniHighlights, setAlumniHighlights] = useState([]);
  const [isLeadershipPaused, setIsLeadershipPaused] = useState(false);
  const [leadershipAnimationKey, setLeadershipAnimationKey] = useState(0);
  const leadershipSectionRef = useRef(null);
  const leadershipCarouselRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    apiClient
      .get('/pages/home')
      .then((response) => {
        const pageData = response?.data?.data;
        const sections = Array.isArray(pageData?.sections) ? pageData.sections : [];
        const homeConfigSection = sections.find((section) => section?.sectionId === 'home-config');
        const sectionConfig = homeConfigSection?.content?.config || homeConfigSection?.content || {};

        if (isMounted && sectionConfig && typeof sectionConfig === 'object') {
          setHomeConfig(sectionConfig);
        }
      })
      .catch(() => {
        if (isMounted) setHomeConfig({});
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Fallback data from official SSGMCE website
  const staticNews = [
    { _id: '1', title: 'SWAYAM/NPTEL Registration Open for Quantum Computing Courses', date: '2026-01-24', description: 'Registration open for courses on Quantum Computing and Quantum Technology via SWAYAM/NPTEL portal.', category: 'Academic' },
    { _id: '2', title: 'International Conference ICICGR 2026 by E&TC Dept', date: '2025-11-13', description: 'International Conference on Innovations in Communication, Geoscience and Robotics scheduled for 24-25 April 2026.', category: 'Events' },
    { _id: '3', title: 'TCS Accredits SSGMCE as Top Priority College', date: '2025-07-09', description: 'Tata Consultancy Services officially accredited SSGMCE as a Top Priority College for campus placements.', category: 'Placements' },
    { _id: '4', title: 'Gold Medal at Khelo India Games', date: '2025-07-03', description: 'Jayashri Shetye (Electrical Engg) won gold at Khelo India Games held at Diu & Daman.', category: 'Achievement' },
    { _id: '5', title: 'Drone Club Wins First Prize at SPARK 2025', date: '2025-04-17', description: 'Students secured First Prize at National Level SPARK 2025 competition in drone technology.', category: 'Achievement' },
    { _id: '6', title: 'NAAC Accreditation Received', date: '2024-12-21', description: 'SSGMCE successfully receives NAAC accreditation in the 3rd cycle. Congratulations to all stakeholders.', category: 'Accreditation' },
  ];

  const staticUpcomingEvents = [
    {
      _id: 'fallback-icicgr',
      title: 'ICICGR 2026 - International Conference',
      eventDate: '2026-04-24T09:00:00',
      location: 'E&TC Department',
      description: 'Innovations in Communication, Geoscience and Robotics',
    },
    {
      _id: 'fallback-pursuit',
      title: 'Pursuit 2026 - Technical Festival',
      eventDate: '2026-01-01',
      location: 'SSGMCE Campus',
      description: 'Annual technical fest with competitions and workshops',
    },
    {
      _id: 'fallback-parishkriti',
      title: 'Parishkriti 2026 - Cultural Festival',
      eventDate: '2026-01-01',
      location: 'SSGMCE Campus',
      description: 'Annual cultural celebration with performances and events',
    },
  ];

  const liveNewsItems = Array.isArray(newsData) ? newsData : [];
  const liveUpcomingEvents = Array.isArray(upcomingEventsData) ? upcomingEventsData : [];
  const liveAllEvents = Array.isArray(allEventsData) ? allEventsData : [];
  const newsItems = liveNewsItems.length > 0 ? liveNewsItems : newsError ? staticNews : [];
  const upcomingEvents =
    liveUpcomingEvents.length > 0
      ? liveUpcomingEvents
      : liveAllEvents.length > 0
        ? liveAllEvents
        : upcomingEventsError || allEventsError
        ? staticUpcomingEvents
        : [];

  const defaultAccreditations = [
    { label: 'AICTE', desc: 'Approved', logo: aicteLogo, logoAlt: 'AICTE logo' },
    { label: 'NAAC A+', desc: 'Accredited', logo: naacLogo, logoAlt: 'NAAC A+ logo' },
    { label: 'NBA', desc: 'Accredited', logo: nbaLogo, logoAlt: 'NBA logo' },
    { label: 'ISO 9001:2015', desc: 'Certified', logo: isoLogo, logoAlt: 'ISO logo' },
    { label: 'NIRF', desc: 'Ranked', logo: nirfLogo, logoAlt: 'NIRF logo' },
    { label: 'AAA', desc: 'Careers360', logo: aaPlusLogo, logoAlt: 'AA+ logo' },
  ];

  const defaultStudentCornerItems = [
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

  const fallbackRecruiters = [
    {
      id: 'infosys',
      name: 'Infosys',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
      website: 'https://www.infosys.com',
    },
    {
      id: 'wipro',
      name: 'Wipro',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg',
      website: 'https://www.wipro.com',
    },
    {
      id: 'capgemini',
      name: 'Capgemini',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg',
      website: 'https://www.capgemini.com',
    },
  ];
  const normalizeRecruiterName = (name = '') =>
    String(name || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
  const isBundlerOnlyAssetPath = (value = '') =>
    String(value || '').trim().startsWith('/src/');
  const accreditationLogoByLabel = {
    AICTE: aicteLogo,
    'NAAC A+': naacLogo,
    NBA: nbaLogo,
    'ISO 9001:2015': isoLogo,
    NIRF: nirfLogo,
    AAA: aaPlusLogo,
  };

  const heroConfig = homeConfig?.hero || {};
  const accreditations = Array.isArray(homeConfig?.accreditations?.items)
    ? homeConfig.accreditations.items.map((item) => ({
        label: item?.label || '',
        desc: item?.desc || '',
        logo: isBundlerOnlyAssetPath(item?.logoUrl || item?.logo)
          ? accreditationLogoByLabel[item?.label] || ''
          : resolveUploadedAssetUrl(item?.logoUrl || item?.logo || ''),
        logoAlt: item?.logoAlt || `${item?.label || 'Accreditation'} logo`,
      }))
    : defaultAccreditations;
  const studentCornerItems = Array.isArray(homeConfig?.studentCorner?.items)
    ? homeConfig.studentCorner.items.map((item, index) => ({
        id: item?.id || `student-corner-${index + 1}`,
        title: item?.title || '',
        image: isBundlerOnlyAssetPath(item?.imageUrl || item?.image)
          ? defaultStudentCornerItems[index]?.image || ''
          : resolveUploadedAssetUrl(item?.imageUrl || item?.image || ''),
        text: item?.text || '',
      }))
    : defaultStudentCornerItems;
  const activeStudentCorner =
    studentCornerItems.find((item) => item.id === activeCorner) || studentCornerItems[0];

  const recruiterDefaultsByName = fallbackRecruiters.reduce((acc, recruiter) => {
    acc[normalizeRecruiterName(recruiter.name)] = recruiter;
    return acc;
  }, {});

  const mergedRecruiters =
    recruiters.length > 0
      ? [
          ...recruiters.map((recruiter) => {
            const normalizedName = normalizeRecruiterName(recruiter.name);
            const brandDefaults = recruiterDefaultsByName[normalizedName];

            if (!brandDefaults) {
              return recruiter;
            }

            return {
              ...brandDefaults,
              ...recruiter,
              logoUrl: recruiter.logoUrl || recruiter.logo || brandDefaults.logoUrl,
              website: recruiter.website || brandDefaults.website,
            };
          }),
          ...fallbackRecruiters.filter(
            (recruiter) =>
              !recruiters.some(
                (liveRecruiter) =>
                  normalizeRecruiterName(liveRecruiter.name) ===
                  normalizeRecruiterName(recruiter.name),
              ),
          ),
        ]
      : fallbackRecruiters;

  const homepageRecruiters = mergedRecruiters;
  const marqueeRecruiters = homepageRecruiters.length > 0
    ? [...homepageRecruiters, ...homepageRecruiters]
    : [];
  const homepageAlumni = alumniHighlights.length > 0 ? alumniHighlights : fallbackAlumni;
  const marqueeAlumni = homepageAlumni.length > 0
    ? [...homepageAlumni, ...homepageAlumni]
    : [];
  const homepageLeadership = Array.isArray(homeConfig?.leadershipCards) && homeConfig.leadershipCards.length > 0
    ? homeConfig.leadershipCards.map((member, index) => ({
        id: member?.id || `leadership-${index + 1}`,
        name: member?.name || '',
        designation: member?.designation || '',
        department: member?.department || '',
        email: member?.email || '',
        image: isBundlerOnlyAssetPath(member?.imageUrl || member?.image)
          ? HOME_LEADERSHIP[index]?.image || ''
          : resolveUploadedAssetUrl(member?.imageUrl || member?.image || ''),
        accentClass: member?.accentClass || "bg-gray-200",
        link: member?.link || "/faculty",
      }))
    : HOME_LEADERSHIP;
  const marqueeLeadership = homepageLeadership.length > 0
    ? [...homepageLeadership, ...homepageLeadership]
    : [];
  const coreStrengthsConfig = homeConfig?.coreStrengths || {};
  const coreStrengthItems = Array.isArray(coreStrengthsConfig?.items) && coreStrengthsConfig.items.length > 0
    ? coreStrengthsConfig.items
    : [
        {
          kicker: "Academics",
          title: "Academic Excellence",
          text: "B.E., M.E., MBA and Ph.D. programs across 7 departments affiliated to SGBAU, Amravati with NAAC and NBA accreditation.",
          link: "/academics",
          linkLabel: "Explore Programs",
        },
        {
          kicker: "Campus",
          title: "Student Life",
          text: "IEEE, ISTE, ACM chapters, GDG club, Drone Club, E-Cell, NSS, NCC and cultural festivals like Pursuit and Parishkriti.",
          link: "/gallery",
          linkLabel: "View Gallery",
        },
        {
          kicker: "Outcomes",
          title: "Placements",
          text: "TCS Top Priority College with 35+ recruiters including Infosys, Wipro, Cognizant, Capgemini and more visiting annually.",
          link: "/placements/brochure",
          linkLabel: "Placement Stats",
        },
      ];
  const welcomeConfig = homeConfig?.welcome || {};
  const whyChooseConfig = homeConfig?.whyChooseUs || {};
  const whyChooseItems = Array.isArray(whyChooseConfig?.items) && whyChooseConfig.items.length > 0
    ? whyChooseConfig.items
    : [
        {
          title: "Best Labs",
          text: "State-of-the-art laboratories help students build practical knowledge through experimentation, projects and applied engineering work.",
          imageUrl: electronicsLabImg,
          link: "/facilities/computing",
        },
        {
          title: "Best Teachers",
          text: "Faculty mentorship strengthens communication, teamwork, time management and problem-solving alongside core academics.",
          imageUrl: campusViewImg,
          link: "/faculty",
        },
        {
          title: "Best Library",
          text: "The fully automated and digitalised library functions as an excellent information center for students, faculty and researchers.",
          imageUrl: extraCurricularImg,
          link: "h",
        },
      ];
  const statsConfig = homeConfig?.stats || {};
  const statsItems = Array.isArray(statsConfig?.items) && statsConfig.items.length > 0
    ? statsConfig.items
    : [
        { number: "7", label: "Departments" },
        { number: "3000+", label: "Students" },
        { number: "150+", label: "Faculty Members" },
        { number: "12000+", label: "Alumni Network" },
      ];
  const leadershipConfig = homeConfig?.leadership || {};
  const newsEventsConfig = homeConfig?.newsEvents || {};
  const studentCornerConfig = homeConfig?.studentCorner || {};
  const alumniConfig = homeConfig?.alumni || {};
  const recruitersConfig = homeConfig?.recruiters || {};

  const resolveHomeAsset = (candidate, fallback) => {
    if (isBundlerOnlyAssetPath(candidate)) return fallback;
    return resolveUploadedAssetUrl(candidate) || fallback;
  };
  const heroVideoSrc = resolveHomeAsset(heroConfig?.videoUrl, droneVideo);
  const welcomeHomeImageSrc = resolveHomeAsset(
    welcomeConfig?.homePageImageUrl || welcomeConfig?.mainImageUrl,
    mainGateImg,
  );
  const newsItemsToShow = Number.isFinite(Number(newsEventsConfig?.newsCount))
    ? Math.max(1, Number(newsEventsConfig.newsCount))
    : 4;
  const eventsToShow = Number.isFinite(Number(newsEventsConfig?.eventsCount))
    ? Math.max(1, Number(newsEventsConfig.eventsCount))
    : 3;
  const scrollLeadership = (direction) => {
    if (!leadershipCarouselRef.current) {
      return;
    }

    setIsLeadershipPaused(true);
    leadershipCarouselRef.current.scrollBy({
      left: direction * 280,
      behavior: 'smooth',
    });
  };
  const openAcademicsMenu = () => {
    window.dispatchEvent(new CustomEvent('open-academics-menu'));
  };

  useEffect(() => {
    const currentSection = leadershipSectionRef.current;

    if (!currentSection) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (leadershipCarouselRef.current) {
            leadershipCarouselRef.current.scrollLeft = 0;
          }
          setIsLeadershipPaused(false);
          setLeadershipAnimationKey((key) => key + 1);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setResolvedHeroVideoSrc(heroVideoSrc || droneVideo);
  }, [heroVideoSrc]);

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
          src={resolvedHeroVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={() => {
            setResolvedHeroVideoSrc(droneVideo);
          }}
        />
        <div className="absolute bottom-14 left-0 right-0 z-20 px-4 text-center text-white sm:bottom-24 md:bottom-32">
          <h2 className="mb-3 text-2xl font-bold tracking-wide drop-shadow-lg sm:text-3xl md:mb-4 md:text-5xl">
            {heroConfig?.heading || 'सर्वे भवन्तु सुखिनः'}
          </h2>
          <p className="mx-auto max-w-2xl text-sm font-light drop-shadow-md opacity-90 sm:text-base md:text-xl">
            {heroConfig?.subheading || 'Bestowed by the blessings of Shri Sant Gajanan Maharaj'}
          </p>
        </div>
      </section>

      {/* News Ticker */}
      <NewsTicker items={newsItems} />

      {/* Accreditations Bar */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-ssgmce-blue/[0.03] via-white to-ssgmce-orange/[0.03] border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 md:gap-4">
            {accreditations.map((item) => (
              <div key={item.label} className="flex min-h-[124px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:min-h-[132px] md:px-5 md:py-5">
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={item.logoAlt}
                    className="mb-3 h-10 w-auto object-contain md:h-11"
                    loading="lazy"
                  />
                ) : null}
                <span className="text-sm md:text-base font-bold text-gray-800 leading-tight">{item.label}</span>
                <span className="text-xs text-ssgmce-muted mt-0.5">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fb_100%)] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ssgmce-blue/70">
              {coreStrengthsConfig?.badge || 'Core Strengths'}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-[2.2rem]">
              {coreStrengthsConfig?.heading || 'What We Offer'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-[0.95rem]">
              {coreStrengthsConfig?.description || 'AICTE approved, NAAC accredited, and NBA accredited programs backed by a disciplined campus culture, strong student ecosystem, and placement-driven outcomes.'}
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
            {coreStrengthItems.slice(0, 3).map((item, index) => {
              const variants = [
                {
                  strip: "bg-ssgmce-blue/70",
                  chip: "bg-ssgmce-blue/8",
                  chipHover: "group-hover:bg-ssgmce-blue/12",
                  icon: FaGraduationCap,
                  iconClass: "text-ssgmce-blue",
                  borderHover: "hover:border-ssgmce-blue/25",
                },
                {
                  strip: "bg-ssgmce-orange/75",
                  chip: "bg-orange-50",
                  chipHover: "group-hover:bg-ssgmce-orange/12",
                  icon: FaBuilding,
                  iconClass: "text-ssgmce-orange",
                  borderHover: "hover:border-ssgmce-orange/30",
                },
                {
                  strip: "bg-ssgmce-accent/70",
                  chip: "bg-teal-50",
                  chipHover: "group-hover:bg-ssgmce-accent/12",
                  icon: FaTrophy,
                  iconClass: "text-ssgmce-accent",
                  borderHover: "hover:border-ssgmce-accent/30",
                },
              ];
              const variant = variants[index] || variants[0];
              const Icon = variant.icon;
              return (
                <div
                  key={`${item?.title || 'core-strength'}-${index}`}
                  className={`group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_42px_-34px_rgba(15,23,42,0.32)] transition-all duration-300 hover:-translate-y-0.5 ${variant.borderHover} hover:shadow-[0_22px_48px_-34px_rgba(15,23,42,0.38)]`}
                >
                  <div className={`absolute inset-y-5 left-0 w-1 rounded-r-full ${variant.strip}`} />
                  <div className="mb-5 flex items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${variant.chip} transition-colors ${variant.chipHover}`}>
                      <Icon className={`text-lg ${variant.iconClass}`} />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {item?.kicker || ''}
                    </p>
                  </div>
                  <h3 className="mb-3 text-[1.25rem] font-bold leading-tight text-slate-900 md:text-[1.35rem]">
                    {item?.title || ''}
                  </h3>
                  <p className="mb-5 text-sm leading-6 text-slate-600">
                    {item?.text || ''}
                  </p>
                  {(item?.linkLabel || '').toLowerCase() === 'explore programs' ? (
                    <button
                      type="button"
                      onClick={openAcademicsMenu}
                      className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-ssgmce-blue transition-colors hover:text-ssgmce-orange"
                    >
                      {item?.linkLabel || 'Explore'} <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <Link to={item?.link || '#'} className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-ssgmce-blue transition-colors hover:text-ssgmce-orange">
                      {item?.linkLabel || 'Explore'} <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-10 bg-gradient-to-br from-white via-ssgmce-blue/[0.02] to-ssgmce-orange/[0.03] md:py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[0.8fr,1.2fr] lg:items-center">
            <div>
              <img
                src={welcomeHomeImageSrc}
                alt={welcomeConfig?.homePageImageAlt || "SSGMCE campus"}
                className="h-[250px] w-full rounded-xl border border-slate-200 object-cover shadow-[0_18px_48px_-34px_rgba(15,23,42,0.35)] sm:h-[300px] md:h-[340px]"
              />
            </div>

            <div className="space-y-4">
              <p className="inline-flex rounded-full bg-ssgmce-orange/10 px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.14em] text-ssgmce-orange">
                {welcomeConfig?.badge || 'Welcome to SSGMCE'}
              </p>
              <h2 className="max-w-3xl text-[1.9rem] font-bold leading-tight text-slate-900 md:text-[2.35rem]">
                {welcomeConfig?.heading || 'A purposeful engineering campus with a proven academic legacy.'}
              </h2>
              <p className="text-base leading-7 text-slate-600">
                {welcomeConfig?.para1 || 'Shri Sant Gajanan Maharaj College of Engineering, Shegaon is one of the premier engineering institutes in Maharashtra, established in 1983 by Shri Gajanan Shikshan Sanstha, Shegaon.'}
              </p>
              <p className="text-base leading-7 text-slate-600">
                {welcomeConfig?.para2 || 'The institute is affiliated to Sant Gadge Baba Amravati University, Amravati, recognized by AICTE, New Delhi and approved by DTE, Maharashtra State, Mumbai.'}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <p className="text-sm font-bold text-slate-900">{welcomeConfig?.historyTitle || 'Brief History'}</p>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-slate-500">
                    {welcomeConfig?.historyText || 'The Government of Maharashtra entrusted the Sansthan to start an engineering college in 1983.'}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <p className="text-sm font-bold text-slate-900">{welcomeConfig?.growthTitle || 'Accredited Growth'}</p>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-slate-500">
                    {welcomeConfig?.growthText || 'AICTE approved, NAAC accredited, NBA accredited programs with a strong academic culture.'}
                  </p>
                </div>
              </div>
              <Link to={welcomeConfig?.ctaLink || '/about'} className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-ssgmce-dark-blue">
                {welcomeConfig?.ctaLabel || 'Read More About Us'} <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="border-y border-slate-100 bg-white py-12 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-4xl text-center">
            <p className="inline-flex rounded-full bg-ssgmce-blue/8 px-5 py-2 text-lg font-bold text-ssgmce-blue md:text-2xl">
              {whyChooseConfig?.badge || 'Why to Choose Us'}
            </p>
            <h2 className="mt-2 text-[2rem] font-bold leading-tight text-slate-900 md:text-[2.65rem]">
              {whyChooseConfig?.heading || 'Built for practical learning and academic confidence.'}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-600 md:text-[1.05rem]">
              {whyChooseConfig?.description || 'The SSGMCE experience blends strong laboratories, committed faculty mentorship, and knowledge infrastructure that supports repeated, hands-on learning.'}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {whyChooseItems.slice(0, 3).map((item, index) => {
              const fallbackImages = [electronicsLabImg, campusViewImg, extraCurricularImg];
              const resolvedImage = resolveHomeAsset(item?.imageUrl || item?.image, fallbackImages[index] || campusViewImg);
              const styleVariants = [
                { icon: FaMicroscope, color: "text-ssgmce-blue", chip: "bg-ssgmce-blue/8" },
                { icon: FaChalkboardTeacher, color: "text-ssgmce-orange", chip: "bg-orange-50" },
                { icon: FaBookOpen, color: "text-ssgmce-accent", chip: "bg-teal-50" },
              ];
              const variant = styleVariants[index] || styleVariants[0];
              const Icon = variant.icon;

              return (
                <Link
                  key={`${item?.title || 'why-choose'}-${index}`}
                  to={item?.link || '#'}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_42px_-34px_rgba(15,23,42,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:border-ssgmce-blue/25 hover:shadow-[0_24px_52px_-34px_rgba(15,23,42,0.42)]"
                >
                  <div className="relative h-40 overflow-hidden bg-slate-100">
                    <img
                      src={resolvedImage}
                      alt={item?.title || 'Highlight'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                    <div className={`absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg ${variant.chip} bg-white/92 backdrop-blur-sm`}>
                      <Icon className={`text-base ${variant.color}`} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[1.22rem] font-bold text-slate-900">{item?.title || ''}</h3>
                    <p className="mt-2 text-[0.98rem] leading-7 text-slate-600">{item?.text || ''}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-ssgmce-blue">
                      Explore <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-ssgmce-blue/[0.04] via-ssgmce-surface to-ssgmce-blue/[0.04] border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {statsConfig?.heading || 'SSGMCE in Numbers'}
            </h2>
            <p className="text-ssgmce-muted mt-3">{statsConfig?.description || '41 years of academic excellence and holistic development'}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 max-w-4xl mx-auto">
            {statsItems.slice(0, 4).map((item, index) => {
              const iconSet = [FaBuilding, FaUsers, FaGraduationCap, FaTrophy];
              const Icon = iconSet[index] || FaBuilding;
              return (
                <StatCard
                  key={`${item?.label || 'stat'}-${index}`}
                  icon={Icon}
                  number={item?.number || item?.value || '--'}
                  label={item?.label || ''}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section ref={leadershipSectionRef} className="py-12 md:py-14 bg-gradient-to-b from-white via-gray-50 to-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
              {leadershipConfig?.eyebrow || 'Leadership Desk'}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              {leadershipConfig?.heading || 'Faculty Members'}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
              {leadershipConfig?.description || "Key academic leaders of SSGMCE, including the Principal and all Heads of Department, presented with verified details and direct access to the institute's official social channels."}
            </p>
          </div>

          <div
            className="relative mx-auto mt-9 max-w-6xl overflow-hidden"
            onMouseEnter={() => setIsLeadershipPaused(true)}
            onMouseLeave={() => setIsLeadershipPaused(false)}
            onFocus={() => setIsLeadershipPaused(true)}
            onBlur={() => setIsLeadershipPaused(false)}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/90 to-transparent md:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/90 to-transparent md:w-20" />

            <button
              type="button"
              aria-label="Previous faculty member"
              onClick={() => scrollLeadership(-1)}
              className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md transition-colors hover:bg-ssgmce-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-ssgmce-blue/30"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              type="button"
              aria-label="Next faculty member"
              onClick={() => scrollLeadership(1)}
              className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md transition-colors hover:bg-ssgmce-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-ssgmce-blue/30"
            >
              <FaChevronRight className="text-sm" />
            </button>

            <div
              ref={leadershipCarouselRef}
              className="overflow-x-auto overflow-y-hidden rounded-[24px] border border-slate-200/80 bg-white/90 px-3 py-4 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.32)] backdrop-blur-sm [scrollbar-width:none] md:px-5 [&::-webkit-scrollbar]:hidden"
            >
              <div
                key={leadershipAnimationKey}
                className="flex w-max items-stretch gap-4"
                style={{
                  animation: "recruiterMarquee 38s linear infinite",
                  animationPlayState: isLeadershipPaused ? "paused" : "running",
                }}
              >
                {marqueeLeadership.map((member, index) => (
                  <Link
                    key={`${member.id}-${index}`}
                    to={member.link || "/faculty"}
                    className="group block w-[220px] shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ssgmce-blue/30 hover:shadow-lg sm:w-[240px] lg:w-[260px]"
                  >
                    <div className="aspect-[4/3.15] overflow-hidden bg-gray-100">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-h-[145px] bg-white px-3.5 py-3.5">
                      <div className={`mb-2.5 h-1.5 w-10 rounded-full ${member.accentClass || "bg-gray-200"}`} />
                      <h3 className="text-[1.02rem] font-bold leading-tight text-gray-900 md:text-[1.08rem]">
                        {member.name}
                      </h3>
                      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-ssgmce-blue">
                        {member.designation}
                      </p>
                      <p className="mt-1 text-[0.82rem] leading-relaxed text-gray-700">
                        {member.department}
                      </p>
                      {member.email && (
                        <p className="mt-1.5 text-[11px] text-gray-500 break-all">{member.email}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to={leadershipConfig?.ctaLink || '/faculty'}
              className="inline-flex items-center gap-2 rounded-full border border-ssgmce-blue px-6 py-3 text-sm font-semibold text-ssgmce-blue transition-colors hover:bg-ssgmce-blue hover:text-white"
            >
              {leadershipConfig?.ctaLabel || 'Explore Faculty Directory'} <FaArrowRight className="text-[10px]" />
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
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{newsEventsConfig?.newsTitle || 'Latest News'}</h2>
                    <div className="w-12 h-0.5 bg-ssgmce-orange mt-3 rounded-full"></div>
                 </div>
                 <Link to={newsEventsConfig?.newsLink || '/news'} className="text-sm font-medium text-ssgmce-blue hover:text-ssgmce-orange transition-colors">
                   {newsEventsConfig?.newsLinkLabel || 'View All'} &rarr;
                 </Link>
              </div>
              <div className="space-y-3">
                {newsItems.slice(0, newsItemsToShow).map((item) => (
                    <NewsCard
                      key={item._id}
                      title={item.title}
                      date={item.publishDate || item.date || item.createdAt}
                      description={item.description}
                      category={item.category || 'General'}
                    />
                ))}
                {newsItems.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-white p-6 text-sm text-ssgmce-muted">
                    No active news found. Add news from Admin &gt; News & Updates.
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{newsEventsConfig?.eventsTitle || 'Upcoming Events'}</h2>
                    <div className="w-12 h-0.5 bg-ssgmce-blue mt-3 rounded-full"></div>
                 </div>
                 <Link to={newsEventsConfig?.eventsLink || '/events'} className="text-sm font-medium text-ssgmce-blue hover:text-ssgmce-orange transition-colors">
                   {newsEventsConfig?.eventsLinkLabel || 'Calendar'} &rarr;
                 </Link>
              </div>
              <div className="bg-ssgmce-surface rounded-xl p-6 border border-gray-100">
                {upcomingEvents.slice(0, eventsToShow).map((event) => {
                  const eventDate = event.eventDate ? new Date(event.eventDate) : null;
                  const hasValidDate = eventDate && !Number.isNaN(eventDate.getTime());
                  const day = hasValidDate
                    ? eventDate.toLocaleDateString('en-IN', { day: '2-digit' })
                    : '--';
                  const month = hasValidDate
                    ? eventDate.toLocaleDateString('en-IN', { month: 'short' })
                    : 'Date';
                  const time = hasValidDate
                    ? eventDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                    : '';

                  return (
                    <div key={event._id || event.title} className="flex gap-4 mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                      <div className="text-center min-w-[56px] bg-white rounded-lg py-2.5 px-3 shadow-sm border border-gray-100">
                        <div className="text-xl font-bold text-ssgmce-blue leading-tight">{day}</div>
                        <div className="text-[10px] uppercase font-semibold text-ssgmce-muted">{month}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 hover:text-ssgmce-blue transition-colors cursor-pointer mb-1.5 text-sm">
                          {event.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ssgmce-muted">
                          {time && (
                            <span className="inline-flex items-center">
                              <FaClock className="mr-1.5" size={10} /> {time}
                            </span>
                          )}
                          <span className="inline-flex items-center">
                            <FaMapMarkerAlt className="mr-1.5" size={10} /> {event.location || 'SSGMCE Campus'}
                          </span>
                        </div>
                        <p className="text-[10px] text-ssgmce-muted mt-1">{event.description}</p>
                      </div>
                    </div>
                  );
                })}
                {upcomingEvents.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-white p-6 text-sm text-ssgmce-muted">
                    No upcoming events found. Add events from Admin &gt; Events.
                  </div>
                )}
                  {/* Event Item 1 */}
                  <div className="hidden gap-4 mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
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
                  <div className="hidden gap-4 mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
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
                  <div className="hidden gap-4 mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
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

      <section className="border-y border-gray-100 bg-gradient-to-b from-[#fbfcfe] via-white to-[#f8f9fc] py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-stretch">
            <div className="flex h-full flex-col">
              <div className="mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                  {studentCornerConfig?.eyebrow || 'Campus Life'}
                </p>
                <h3 className="text-[1.55rem] font-bold text-slate-900 md:text-[1.75rem]">
                  {studentCornerConfig?.heading || "Student's Corner"}
                </h3>
                <div className="mt-1.5 h-0.5 w-10 rounded-full bg-amber-300" />
              </div>

              <div className="flex flex-1 flex-col rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-[0_16px_38px_-34px_rgba(15,23,42,0.22)] backdrop-blur-sm">
                <div className="space-y-2">
                  {studentCornerItems.map((item) => {
                    const isActive = item.id === activeCorner;

                    return (
                      <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
                        <button
                          type="button"
                          onClick={() => setActiveCorner(item.id)}
                          className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors ${
                            isActive ? 'bg-[#2f5f8d] text-white' : 'bg-[#f8fafc] text-[#2f5f8d] hover:bg-[#f1f5f9]'
                          }`}
                        >
                          {isActive ? <FaMinus className="text-[10px]" /> : <FaPlus className="text-[10px]" />}
                          <span className="text-[0.9rem] font-semibold leading-tight">{item.title}</span>
                        </button>

                        {isActive && (
                          <div className="grid grid-cols-[76px,1fr] gap-3 bg-[#fcfdff] p-3 md:grid-cols-[92px,1fr]">
                            <img
                              src={resolveHomeAsset(activeStudentCorner.image, coCurricularImg)}
                              alt={activeStudentCorner.title}
                              className="h-[62px] w-full rounded-md object-cover md:h-[68px]"
                            />
                            <p className="text-[0.82rem] leading-relaxed text-slate-600">
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
              <div className="mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                  {alumniConfig?.eyebrow || 'Notable Alumni'}
                </p>
                <h3 className="text-[1.55rem] font-bold text-slate-900 md:text-[1.75rem]">
                  {alumniConfig?.heading || 'Prestigious Alumni'}
                </h3>
                <div className="mt-1.5 h-0.5 w-10 rounded-full bg-amber-300" />
              </div>

              <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-[0_16px_38px_-34px_rgba(15,23,42,0.22)] backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-y-3 left-3 z-10 w-10 rounded-l-xl bg-gradient-to-r from-white via-white/92 to-transparent md:w-14" />
                <div className="pointer-events-none absolute inset-y-3 right-3 z-10 w-10 rounded-r-xl bg-gradient-to-l from-[#f7f9fc] via-[#f7f9fc]/92 to-transparent md:w-14" />

                <div className="flex h-full flex-col rounded-xl border border-slate-100 bg-gradient-to-b from-[#fdfefe] to-[#f7f9fc] px-3.5 py-4 md:px-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {String(homepageAlumni.length).padStart(2, '0')} featured
                    </div>
                    <p className="hidden text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:block">
                      Managed from admin alumni section
                    </p>
                  </div>

                  <div className="overflow-hidden">
                    <div
                      className="flex w-max items-stretch gap-3"
                      style={{ animation: "recruiterMarquee 32s linear infinite" }}
                    >
                      {marqueeAlumni.map((alumni, index) => {
                        const imageUrl = resolveUploadedAssetUrl(alumni.imageUrl || alumni.image);
                        const itemKey = alumni._id || alumni.id || `${alumni.name}-${index}`;

                        return (
                          <article
                            key={itemKey}
                            className="flex w-[220px] shrink-0 flex-col rounded-xl border border-slate-200/80 bg-white px-4 py-4 text-center shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md md:w-[250px]"
                          >
                            <FaQuoteLeft className="mx-auto mb-3 text-xl text-slate-200" />
                            <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white bg-white shadow-[0_10px_24px_-18px_rgba(15,23,42,0.4)] md:h-24 md:w-24">
                              <img
                                src={imageUrl}
                                alt={alumni.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                              {alumni.organization}
                            </p>
                            <h4 className="mt-2 text-[1.05rem] font-bold leading-tight text-slate-900">
                              {alumni.name}
                            </h4>
                            <p className="mt-1 text-[0.82rem] font-semibold text-amber-500">{alumni.role}</p>
                            {(alumni.department || alumni.batch) && (
                              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-slate-500">
                                {[alumni.department, alumni.batch].filter(Boolean).join(" | ")}
                              </p>
                            )}
                            {alumni.quote && (
                              <p className="mt-2 line-clamp-3 text-[0.8rem] leading-relaxed text-slate-500">
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
            {recruitersConfig?.eyebrow || 'Our Esteemed Recruiters'}
          </p>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            {recruitersConfig?.heading || 'Trusted by leading recruiters across technology, consulting and core sectors'}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ssgmce-muted">
            {recruitersConfig?.description || 'TCS Top Priority College with 35+ companies visiting the campus. Manage the complete logo list directly from the admin recruiter section.'}
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
                  const logoUrl = resolveUploadedAssetUrl(recruiter.logoUrl || recruiter.logo);
                  const itemKey = recruiter._id || recruiter.id || `${recruiter.name}-${index}`;
                  const cardContent = (
                    <div className="group flex h-[88px] w-[176px] shrink-0 flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ssgmce-blue/30 hover:shadow-md md:h-[96px] md:w-[214px]">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={recruiter.name}
                          className="max-h-9 max-w-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100 md:max-h-10"
                          onError={(event) => {
                            event.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}
                      <span className="mt-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 transition-colors duration-300 group-hover:text-ssgmce-blue">
                        {recruiter.name}
                      </span>
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
