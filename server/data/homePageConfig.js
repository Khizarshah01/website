const homePageConfig = {
  hero: {
    videoUrl: "/uploads/home/hero-video.mp4",
    heading: "सर्वे भवन्तु सुखिनः",
    subheading: "Bestowed by the blessings of Shri Sant Gajanan Maharaj",
  },
  accreditations: {
    items: [
      { label: "AICTE", desc: "Approved", logoUrl: "/src/assets/images/about/AICTE.png", logoAlt: "AICTE logo" },
      { label: "NAAC A+", desc: "Accredited", logoUrl: "/src/assets/images/about/NAAC.png", logoAlt: "NAAC A+ logo" },
      { label: "NBA", desc: "Accredited", logoUrl: "/src/assets/images/about/NBA.png", logoAlt: "NBA logo" },
      { label: "ISO 9001:2015", desc: "Certified", logoUrl: "/src/assets/images/about/ISO.png", logoAlt: "ISO logo" },
      { label: "NIRF", desc: "Ranked", logoUrl: "/src/assets/images/about/NIRF.png", logoAlt: "NIRF logo" },
      { label: "AAA", desc: "Careers360", logoUrl: "/src/assets/images/about/AA+.png", logoAlt: "AA+ logo" },
    ],
  },
  coreStrengths: {
    badge: "Core Strengths",
    heading: "What We Offer",
    description:
      "AICTE approved, NAAC accredited, and NBA accredited programs backed by a disciplined campus culture, strong student ecosystem, and placement-driven outcomes.",
    items: [
      {
        kicker: "Academics",
        title: "Academic Excellence",
        text: "B.E., M.E., MBA and Ph.D. programs across 7 departments affiliated to SGBAU, Amravati with NAAC and NBA accreditation.",
        link: "/departments/applied-sciences",
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
    ],
  },
  welcome: {
    badge: "Welcome to SSGMCE",
    heading: "A purposeful engineering campus with a proven academic legacy.",
    para1:
      "Shri Sant Gajanan Maharaj College of Engineering, Shegaon is one of the premier engineering institutes in Maharashtra, established in 1983 by Shri Gajanan Shikshan Sanstha, Shegaon.",
    para2:
      "The institute is affiliated to Sant Gadge Baba Amravati University, Amravati, recognized by AICTE, New Delhi and approved by DTE, Maharashtra State, Mumbai.",
    mainImageUrl: "/src/assets/images/home/Main-Gate.avif",
    sideImageUrl: "/src/assets/images/home/Campus-View.avif",
    establishedYear: "1983",
    establishedLabel: "Established in Shegaon",
    floatingTitle: "Smart & Green Campus",
    floatingText: "Re-modeled as a clean, technology-enabled academic environment.",
    historyTitle: "Brief History",
    historyText:
      "The Government of Maharashtra entrusted the Sansthan to start an engineering college in 1983.",
    growthTitle: "Accredited Growth",
    growthText:
      "AICTE approved, NAAC accredited, NBA accredited programs with a strong academic culture.",
    ctaLabel: "Read More About Us",
    ctaLink: "/about",
  },
  whyChooseUs: {
    badge: "Why to Choose Us",
    heading: "Built for practical learning and academic confidence.",
    description:
      "The SSGMCE experience blends strong laboratories, committed faculty mentorship, and knowledge infrastructure that supports repeated, hands-on learning.",
    items: [
      {
        title: "Best Labs",
        text: "State-of-the-art laboratories help students build practical knowledge through experimentation, projects and applied engineering work.",
        imageUrl: "/src/assets/images/departments/electronics/labs/Electronics_and_devices_circuit_lab.jpg",
        link: "/facilities/computing",
      },
      {
        title: "Best Teachers",
        text: "Faculty mentorship strengthens communication, teamwork, time management and problem-solving alongside core academics.",
        imageUrl: "/src/assets/images/home/Campus-View.avif",
        link: "/faculty",
      },
      {
        title: "Best Library",
        text: "The fully automated and digitalised library functions as an excellent information center for students, faculty and researchers.",
        imageUrl: "/src/assets/images/about/Library.jpeg",
        link: "/facilities/library",
      },
    ],
  },
  stats: {
    heading: "SSGMCE in Numbers",
    description: "41 years of academic excellence and holistic development",
    items: [
      { number: "7", label: "Departments" },
      { number: "3000+", label: "Students" },
      { number: "150+", label: "Faculty Members" },
      { number: "12000+", label: "Alumni Network" },
    ],
  },
  leadership: {
    eyebrow: "Leadership Desk",
    heading: "Faculty Members",
    description:
      "Key academic leaders of SSGMCE, including the Principal and all Heads of Department, presented with verified details and direct access to the institute's official social channels.",
    ctaLabel: "Explore Faculty Directory",
    ctaLink: "/faculty",
  },
  newsEvents: {
    newsTitle: "Latest News",
    newsLinkLabel: "View All",
    newsLink: "/news",
    newsCount: 4,
    eventsTitle: "Upcoming Events",
    eventsLinkLabel: "Calendar",
    eventsLink: "/events",
    eventsCount: 3,
  },
  studentCorner: {
    eyebrow: "Campus Life",
    heading: "Student's Corner",
    items: [
      {
        id: "co-curricular",
        title: "Co-Curricular Activities",
        imageUrl: "/src/assets/images/about/vidyavibhag.jpeg",
        text: "Co-curricular activities are designed to improve social skills, intellectual growth, moral values, and personality development among students.",
      },
      {
        id: "extra-curricular",
        title: "Extra-Curricular Activities",
        imageUrl: "/src/assets/images/about/Library.jpeg",
        text: "Students actively participate in seminars, internships, industrial visits, student publications, and technical projects outside regular classroom sessions.",
      },
      {
        id: "volunteer",
        title: "Volunteer Work",
        imageUrl: "/src/assets/images/departments/it/industrial-visits/valuemomentum_pune_2025.png",
        text: "NSS and outreach activities encourage students to contribute to society through community work, awareness drives, and social responsibility initiatives.",
      },
      {
        id: "sports",
        title: "Sports Club",
        imageUrl: "/src/assets/images/departments/electrical/industrial-visits/tata_power_shahad_2024.png",
        text: "SSGMCE offers indoor and outdoor sports facilities that help students build discipline, fitness, leadership qualities, and team spirit.",
      },
    ],
  },
  alumni: {
    eyebrow: "Notable Alumni",
    heading: "Prestigious Alumni",
  },
  recruiters: {
    eyebrow: "Our Esteemed Recruiters",
    heading: "Trusted by leading recruiters across technology, consulting and core sectors",
    description:
      "TCS Top Priority College with 35+ companies visiting the campus. Manage the complete logo list directly from the admin recruiter section.",
  },
  leadershipCards: [
    {
      id: "principal",
      name: "Dr. S. B. Somani",
      designation: "Principal",
      department: "Shri Sant Gajanan Maharaj College of Engineering",
      email: "principal@ssgmce.ac.in",
      imageUrl: "/src/assets/images/about/principal_c.png",
      accentClass: "bg-amber-500",
      link: "/about/principal",
    },
    {
      id: "ash",
      name: "Dr. A. S. Tale",
      designation: "Associate Professor & Head",
      department: "Department of Applied Science & Humanities",
      email: "astale@ssgmce.ac.in",
      imageUrl: "/src/assets/images/departments/applied-sciences/ASH_HOD_AST.jpg",
      accentClass: "bg-rose-500",
      link: "/departments/applied-sciences",
    },
    {
      id: "cse",
      name: "Dr. J. M. Patil",
      designation: "Associate Professor & Head",
      department: "Department of Computer Science & Engineering",
      email: "jmpatil@ssgmce.ac.in",
      imageUrl: "/src/assets/images/departments/cse/HOD_CSE_JMP.jpg",
      accentClass: "bg-amber-500",
      link: "/departments/cse",
    },
  ],
};

module.exports = {
  homePageConfig,
};
