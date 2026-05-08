import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GenericPage from "../../components/GenericPage";
import DepartmentTabsSidebar from "../../components/DepartmentTabsSidebar";
import { useDepartmentData } from "../../hooks/useDepartmentData";
import EditableText from "../../components/admin/EditableText";
import EditableImage from "../../components/admin/EditableImage";
import MarkdownEditor from "../../components/admin/MarkdownEditor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveUploadedAssetUrl } from "../../utils/uploadUrls";
import appliedSciencesBanner from "../../assets/images/departments/applied-sciences/banner.png";
import { AnimatePresence, motion } from "framer-motion";
import apiClient from "../../utils/apiClient";
import { getPathWithTab, getRequestedTab } from "../../utils/navigation";
import {
  FaLaptopCode,
  FaBullseye,
  FaUserTie,
  FaAward,
  FaAngleRight,
  FaIndustry,
  FaUniversity,
  FaQuoteLeft,
  FaEnvelope,
  FaPhone,
  FaTrophy,
  FaChartLine,
  FaLightbulb,
  FaProjectDiagram,
  FaCalendarAlt,
  FaDownload,
  FaBook,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaChalkboardTeacher,
  FaPlus,
  FaTrash,
  FaPalette,
  FaUpload,
  FaUsers,
  FaUserGraduate,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Import HOD Photo
import hodPhoto from "../../assets/images/departments/applied-sciences/ASH_HOD_AST.jpg";

// Import Faculty Photos
import astPhoto from "../../assets/images/departments/applied-sciences/faculty/AST.jpg";
import avpPhoto from "../../assets/images/departments/applied-sciences/faculty/AVP.jpeg";
import rmkPhoto from "../../assets/images/departments/applied-sciences/faculty/RMK.jpg";
import nstPhoto from "../../assets/images/departments/applied-sciences/faculty/NST.jpg";
import asaPhoto from "../../assets/images/departments/applied-sciences/faculty/ASA.jpeg";
import hspPhoto from "../../assets/images/departments/applied-sciences/faculty/HSP_new1.jpg";
import kpdPhoto from "../../assets/images/departments/applied-sciences/faculty/KPD.jpg";
import svbPhoto from "../../assets/images/departments/applied-sciences/faculty/SVB.jpg";
import rutikaPhoto from "../../assets/images/departments/applied-sciences/faculty/Rutika_Raut.jpg";
import mspandePhoto from "../../assets/images/departments/applied-sciences/faculty/MSpande.jpg";
import jsgPhoto from "../../assets/images/departments/applied-sciences/faculty/JSG.jpeg";
import glbPhoto from "../../assets/images/departments/applied-sciences/faculty/GLB.jpg";

const APPLIED_DEFAULT_FACULTY = [
  {
    id: "ast",
    name: "Dr. A. S. Tale",
    role: "HOD & Associate Professor",
    area: ["Solid State Physics"],
    email: "astale@ssgmce.ac.in",
    phone: "+91 9960593094",
    photo: astPhoto,
    vidwanId: "499514",
    qualification: "Ph.D., M.Sc",
    experience: "Teaching: 14 Years",
    coursesTaught: ["Engineering Physics"],
    scholarIds:
      "VIDWAN ID: 499514 | Google Scholar: https://scholar.google.com/citations?user=jWp06xsAAAAJ&hl=en",
    membership: [],
    publications: [
      "Effect of Sn2+ Doping on optical properties of thiourea capped ZnS nanoparticles - Chalcogenide Letters (Vol.No.7, Feb 2010)",
      "Effect of Sn doping on structural properties of Cobalt oxide nanoparticles synthesized by sol gel method - IJAEMS",
      "Synthesis by sol gel method and characterization of Co3O4 Nanoparticles - IJREAS (Vol.7, Issue 8, August-2017, pp1-6, Impact Factor: 7.196)",
      "Effect of method of preparation on H2 sensing property of SnO2 nanoparticles (Communicated)",
      "Modified sol-gel method assisted synthesis of SnO2 nanostructures for H2 Gas sensor (Communicated)",
      "Effect of annealing temperature on hydrogen gas sensitivity of nanocrystalline SnO2 thin films (Communicated)",
    ],
    research:
      "Ph.D Topic - Study of Nanoscaled Metal Oxide Based Semiconductor for Hydrogen Sensing (SGBAU/Ph.D/PHY./5324/2012 w.e.f. 15.01.2012). Patents Published: 01 - Exploring Superconducting Devices For Efficient Quantum Information Processing And Storage (Application No.202341069399 A, Publication Date: 24/11/2023). Research papers Published: 10, Poster Presented: 03",
    fdp: "One Week Faculty Development Programs: 12, Workshops Organized: 01, Workshops Attended: 05, Training Attended: 01",
    fellowship: [],
    achievements: [
      "Color coat holder of S.G.B. Amravati University in Cultural Youth Festival in 2006-07",
      "Third rank in state level youth festival conducted by Sports department of Maharashtra State & Amravati Divisional sports office",
      "First rank in Poster competition organized by Vidyarthi Kalyan Vibhag Amravati during session 2005-06",
      "Third rank in Poster competition organized by Pravin Khodke Memorial Trust Amravati on 11th of Feb 2006",
    ],
  },
  {
    id: "avp",
    name: "Mr. A. V. Patil",
    role: "Associate Professor and Registrar",
    area: ["Organic Chemistry", "Environmental Chemistry"],
    email: "avpatil@ssgmce.ac.in",
    phone: "+91 7020904900",
    photo: avpPhoto,
    vidwanId: "499732",
    qualification: "M. Phil., P.G.D.I.P.M., M. Sc.",
    experience: "Teaching: 25 Years, Industry: 2 Years",
    coursesTaught: ["Engineering Chemistry", "Environmental Chemistry"],
    scholarIds: "",
    membership: ["02"],
    publications: ["National Journals: 01", "National Conference: 02"],
    research: "Heterocyclic Chemistry, Environmental Chemistry",
    fdp: "",
    fellowship: [],
    achievements: [],
  },
  {
    id: "rmk",
    name: "Dr. R. M. Kharate",
    role: "Associate Professor",
    area: ["Synthetic Organic Chemistry", "Environmental Chemistry"],
    email: "rmkharate@ssgmce.ac.in",
    phone: "+91 9423445822",
    photo: rmkPhoto,
    vidwanId: "499769",
    qualification: "Ph.D., B.Ed, M.Sc.",
    experience: "Teaching: 17 Years, Research: 08 Years",
    coursesTaught: ["Engineering Chemistry", "Environmental Studies"],
    scholarIds: "VIDWAN ID: 499769",
    membership: [
      "Life Member of The Indian Society for Technical Education (ISTE), from 2004, Membership No. LM 43203",
      "Life Member of Amravati University Chemistry Teachers Association (AUCTA)",
      "Life Member of TREE, Team to Restore Entire Environment",
    ],
    publications: [
      "International Journals: 07",
      "International Conference: 01",
      "National Conference: 03",
    ],
    research: "",
    fdp: "One Week Faculty Development Programs: 05, Workshops Organized: 01, Workshops Attended: 05, Training Attended: 01",
    fellowship: [
      "Award for excellence in teaching in 2012 by parent organization",
    ],
    achievements: [
      "Book Published: Engineering Chemistry, First Edition: Feb. 2016 Published by DnyanPath Publication Amravati, ISBN13: 978-81931863-5-0",
      "Recognized supervisor for Ph.D. (SGBAU) 2023",
    ],
  },
  {
    id: "nst",
    name: "Mr. N. S. Thakare",
    role: "Asst. Professor",
    area: ["Integral Transform"],
    email: "nsthakare@ssgmce.ac.in",
    phone: "+91 9881528424",
    photo: nstPhoto,
    vidwanId: "499693",
    qualification: "M.Phil., M.Sc., B.Ed",
    experience: "Teaching: 25 Years",
    coursesTaught: [
      "Engineering Mathematics I, II, III & IV",
      "Numerical Methods",
      "Optimization Techniques",
      "Statistical Methods",
      "Operation Research",
      "Qualitative Techniques",
    ],
    scholarIds: "VIDWAN ID: 499693",
    membership: [
      "Indian Society for Technical Education (Life Member: LM79534)",
    ],
    publications: [],
    research:
      "Fourier Transform, Wavelet Transform, Fast Fourier Transform, Fast Wavelet Transform, Fuzzy Mathematics",
    fdp: "One Week Faculty Development Programs: 03, Workshops Organized: 01, Workshops Attended: 16, Training Organized: 01, Training Attended: 01",
    fellowship: ["NSS BEST PO - SGBAU, Amravati"],
    achievements: [],
  },
  {
    id: "asa",
    name: "Mr. A. S. Alane",
    role: "Asst. Professor",
    area: ["Chemistry"],
    email: "asalane@ssgmce.ac.in",
    phone: "+91 9503630972",
    photo: asaPhoto,
    vidwanId: "499688",
    qualification: "M.Sc., B.Ed., Ph.D (Pursuing)",
    experience: "Teaching: 15 Years",
    coursesTaught: ["Engineering Chemistry", "Environmental Studies"],
    scholarIds: "VIDWAN ID: 499688",
    membership: [
      "Indian Society for Technical Education (Life Member: LM-79535)",
    ],
    publications: [],
    research: "",
    fdp: "Workshops Attended: 10, Training Attended: 10",
    fellowship: [],
    achievements: [],
  },
  {
    id: "hsp",
    name: "Mrs. H.S. Patil",
    role: "SGBAU Certified Soft Skills Trainer, Assistant Professor (Communication Skills)",
    area: [
      "Anchoring Formal/Informal Event",
      "English Communication Skills",
      "HR & Marketing",
      "IMQC",
    ],
    email: "hspatil@ssgmce.ac.in",
    phone: "+91 7038027303",
    photo: hspPhoto,
    vidwanId: "501085",
    qualification:
      "B.Ed., M.A., M.B.A, PGDECS, Ph.D. (Registered), SGBAU-certified Soft Skills Trainer",
    experience: "Teaching: 14 Years, Industry: 02 Years",
    coursesTaught: [
      "Communication Skills",
      "Industrial Management and Quality Control (IMQC)",
      "Human Resource Development & Marketing Management",
      "Personality Development Courses",
      "Soft Skills",
    ],
    scholarIds: "Vidwan-ID: 501085",
    membership: [],
    publications: [],
    research: "Research Paper published: 01, Research Paper presented: 01",
    fdp: "One Week Faculty Development Programs: 05, Workshops Attended: 05, Training Organized: 01",
    fellowship: [
      "Best Teacher Award (2012, SSGMCE Shegaon)",
      "Sant Gadge Baba Amravati University Certified Soft Skills Trainer (2020)",
      "Achieved Silver & Gold Certificate in NPTEL Soft Skills Courses (8 Courses Completed)",
    ],
    achievements: [
      "TOT (Train The Trainer Workshop By SGBAU, 2019)",
      "Leadscape Scholar Warrior FDP (2021)",
      "AICTE ATAL FDP on Consulting: Building A Vibrant Industry-Academia Ecosystem (2021)",
      "AICTE ATAL FDP on Critical Design Thinking In Engineering (2021)",
      "Completed AICTE approved courses: Effective Technical Writing (Gold), Employment Communication (Silver), Body Language: Key To Professional Success (Gold), Interpersonal Skills (Silver)",
    ],
  },
  {
    id: "kpd",
    name: "Ms. K.P. Deshmukh",
    role: "Asst. Professor",
    area: ["Pure Mathematics"],
    email: "kpdeshmukh@ssgmce.ac.in",
    phone: "+91 8605077173",
    photo: kpdPhoto,
    vidwanId: "499820",
    qualification: "M.Sc., B.Ed",
    experience: "Teaching: 13 Years",
    coursesTaught: [
      "Engineering Mathematics I, II, III",
      "Numerical Methods & Operation Research Techniques",
    ],
    scholarIds: "VIDWAN ID: 499820",
    membership: [],
    publications: [],
    research: "",
    fdp: "One Week Faculty Development Programs: 08, Workshops Attended: 08, Training Attended: 05",
    fellowship: [],
    achievements: [],
  },
  {
    id: "svb",
    name: "Mr. S. V. Bhagat",
    role: "Asst. Professor",
    area: [
      "English Language",
      "English Literature",
      "Soft Skills",
      "Business Communication",
      "Communication Skills",
    ],
    email: "sachinvbhagat@ssgmce.ac.in",
    phone: "+91 9922127385",
    photo: svbPhoto,
    vidwanId: "260276",
    qualification:
      "PhD (Pursuing), M. Phil, M.A. (English), Diploma in Mass Media",
    experience: "Teaching: 11 Years, Research: 2 Years",
    coursesTaught: [
      "Communication Skills",
      "Social Science and Engineering Economics",
      "Professional Ethics",
      "Soft Skills",
    ],
    scholarIds: "Vidwan-ID: 260276",
    membership: [],
    publications: [],
    research: "",
    fdp: "One Week Faculty Development Programs: 08, Workshops Attended: 09, Training Attended: 01",
    fellowship: [
      "NPTEL Topper (5% Category) Technical English for Engineers (2019)",
    ],
    achievements: [
      "Translated 10 Video Lectures of NPTEL, IIT Kharagpur (English to Marathi)",
    ],
  },
  {
    id: "rr",
    name: "Ms. Rutika Raut",
    role: "Asst. Professor",
    area: ["Material Science"],
    email: "rgraut@ssgmce.ac.in",
    phone: "+91 9407347770",
    photo: rutikaPhoto,
    vidwanId: "509196",
    qualification: "M.Sc. (Physics)",
    experience: "Teaching: 02 Years",
    coursesTaught: ["Engineering Physics"],
    scholarIds: "",
    membership: [
      "Member of Institute Management Committee of Govt ITI, Shegaon",
      "Member of Marathwada Association of Small Scale Industries and Agriculture (MASSIA)",
      "Member of Vidharbha Industrial Association",
    ],
    publications: [],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [],
  },
  {
    id: "msp",
    name: "Dr. Mrs. M. S. Pande",
    role: "Asst. Professor",
    area: ["X-Rays", "Solid state Physics"],
    email: "mspande@ssgmce.ac.in",
    phone: "+91 9890850530",
    photo: mspandePhoto,
    vidwanId: "499683",
    qualification: "M. Sc. (Physics), B.Ed., Ph.D.",
    experience: "Teaching: 15 Years, Research: 05 Years",
    coursesTaught: ["Engineering Physics"],
    scholarIds: "VIDWAN ID: 499683",
    membership: [
      "Indian Society for Technical Education (ISTE), from 2012 (Life Member No.: LM 85743)",
    ],
    publications: [
      'M.S. Pande, Dr. V. D. Kapse, "Synthesis of nanosized perovskite type materials CdSnO3 for gas sensor applications", IJRITCC, 4(7) July 2016',
      'M.S. Pande, Dr. V. D. Kapse, "Synthesis of nanosized perovskite type materials CdSnO3 for gas sensor applications", NC-ITSE 16, Mauli Group of Institution',
      'M.S. Pande, Dr. V. D. Kapse, "Synthesis of nanosized perovskite type materials of pure & modified MSnO3 (M=Cd & Zn) for gas sensor applications", ICMBSAT',
    ],
    research: "",
    fdp: "One Week Faculty Development Programs: 04, Workshops Attended: 01, Training Attended: 02",
    fellowship: [
      'Awarded NPTEL Certificate for the course "Newtonian Mechanics with examples" (Aug-Oct 2023, 8 week course)',
    ],
    achievements: [],
  },
  {
    id: "jsg",
    name: "Dr. J. S. Gawande",
    role: "Asst. Professor",
    area: [
      "Differential Equations",
      "Numerical Methods",
      "Partial Differential Equations",
      "Integral Transforms",
    ],
    email: "jsgawande@ssgmce.ac.in",
    phone: "+91 7798378604",
    photo: jsgPhoto,
    vidwanId: "499566",
    qualification: "Ph.D (Mathematics), M.Sc (Mathematics)",
    experience: "Teaching: 09 Years",
    coursesTaught: [
      "Engineering Mathematics I, II, III, IV",
      "Combinatorial Theory",
    ],
    scholarIds: "VIDWAN ID: 499566",
    membership: [],
    publications: [],
    research: "",
    fdp: "One Week Faculty Development Programs: 03, Training Attended: 01",
    fellowship: [
      "Secured first position as a university topper in RTMNU Nagpur University with four Gold Medals",
    ],
    achievements: [],
  },
  {
    id: "glb",
    name: "Mr. G. L. Bayaskar",
    role: "Asst. Professor",
    area: ["Physical Education"],
    email: "glbayaskar@ssgmce.ac.in",
    phone: "",
    photo: glbPhoto,
    vidwanId: "",
    qualification: "M.A., M.P.Ed",
    experience: "",
    coursesTaught: [],
    scholarIds: "",
    membership: [],
    publications: [],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [],
  },
];

const APPLIED_DEFAULT_LABS = [
  {
    name: "Engineering Physics Laboratory",
    image: "",
    resources:
      "Cathode Ray Oscilloscope, Function Generator, Hall effect setup, Newton's Ring apparatus, Laser, Sonometer, Spectrometer, Optical Bench, Polarimeter, Diffraction Grating apparatus, Photo Electric Effect setup, Semiconductor Diode characteristics setup, Zener Diode characteristics setup, Thermistor characteristics setup, Digital Multimeter, Power Supply.",
    facilities:
      "Area: 80 Sq.Mtrs | Systems: 05 PC | Lab Benches: 15 | UPS: 5 KVA",
  },
  {
    name: "Engineering Chemistry Laboratory",
    image: "",
    resources:
      "Digital Oven, Furnace, Redwood Viscometer, Pensky's Martin Flash point apparatus, Freeze, Microwave Oven, pH Meter, Conductivity Meter, Colorimeter, Potentiometer, Burettes, Pipettes, Conical Flasks, Beakers, Measuring Cylinders, Reagent Bottles, Chemical Balances, Hot Plates, Magnetic Stirrers.",
    facilities:
      "Area: 85 Sq.Mtrs | Systems: 05 PC | Lab Benches: 20 | Fume Hood | UPS: 5 KVA",
  },
  {
    name: "Language Laboratory / Communication Skills Lab",
    image: "",
    resources:
      "International Linguaphone Kit, ETNL Software, Lenovo Think Centre Desktop Computer System (30 Nos.), Headphone with microphone (30 Nos.), DVD Writer, Cable Switch J.E. 0064, CISCO LINK Sport Switch, Server System with Teacher Console, LCD Projector, Interactive White Board, Language Learning Software Packages.",
    facilities:
      "Area: 100 Sq.Mtrs | Systems: 30 PC + 1 Server | Seating Capacity: 30 Students | UPS: 10 KVA (Two in number)",
  },
];

const APPLIED_DEFAULT_ACTIVITIES = [
  {
    title: "Expressive Fusion (TED Talk & Story Telling)",
    date: "22nd March 2024",
    participants: "B.E. All Branches Students",
    organizer: "",
    resource: "",
    image: "",
  },
  {
    title: "Industrial Visit\nVinodrai Engineers, Jalna",
    date: "12-14 March 2024",
    participants: "B.E. First Year Students",
    organizer: "",
    resource: "",
    image: "",
  },
  {
    title: "Science Day Celebration",
    date: "28th February 2024",
    participants: "B.E. First Year Students",
    organizer: "",
    resource: "",
    image: "",
  },
  {
    title: "Workshop on Design Thinking and Innovation Design",
    date: "24 February 2024",
    participants: "B.E. First Year Students",
    organizer: "",
    resource: "",
    image: "",
  },
  {
    title: "Online (Zoom) Meeting on Problem Solving and Ideation Workshop",
    date: "Saturday, 28 October 2023",
    participants: "B.E. First Year Students",
    organizer: "",
    resource: "",
    image: "",
  },
  {
    title: "Workshop on ROBOTICS",
    date: "16th September-17th September 2023",
    participants: "B.E. First Year Students",
    organizer: "ASH Dept., SSGMCE, Shegaon",
    resource: "",
    image: "",
  },
  {
    title: "Elocution Competition One Nation, One Election",
    date: "Saturday, 9th September 2023",
    participants: "B.E. First Year Students",
    organizer: "ASH Dept., SSGMCE, Shegaon",
    resource: "",
    image: "",
  },
  {
    title: "Student Induction & Orientation Program",
    date: "7th August-25th August 2023",
    participants: "B.E. First Year Students\nVenue: New Auditorium",
    organizer: "ASH Dept., SSGMCE, Shegaon",
    resource: "",
    image: "",
  },
];

const APPLIED_DEFAULT_ACHIEVEMENTS = {
  faculty: [
    {
      name: "Dr. A. S. Tale",
      subtitle: "",
      description: `- Became Fab Graduate (Diploma Hands on Digital Fabrication) 2021 MIT BOSTON (VIGYAN ASHRAM)
- Awarded with Doctor of Philosophy (Ph.D) Notification No.56/2021
- Completed Refresher course National Education Policy and its Implementation held during 12th Feb to 24th Feb 2024 and obtain grade A+
- Published Patent on Exploring Superconducting Devices for Efficient Quantum Information Processing and Storage (Application No.202341069399 A, Publication Date: 24/11/2023)
- Published A text book of Nano science & Technology (ISBN 978-81-971218-5-2)
- Published a paper in Journal of Electrical Systems (Q4) journal. (J. Electrical Systems 20-11s (2024): 3658-3666)
- Published a Copy right for SMART AZOLA MULTIPLIER SYSTEM on 30/12/2025 (LD-28448/2025-CO)`,
    },
    {
      name: "Dr. Rajesh M Kharate",
      subtitle: "",
      description: `- Associate Professor recognized as SUPERVISOR FOR Ph.D. Thursday, the 28th September, 2023, No. 153 / 2023
- Invited as Resource Person-CAREER COUNSELLNG organized by Dastur Ratanji, Khamgaon, What after 10th, 12th and Graduation on 22.07.2023 at Tilak Smarak Mahila Mandal Sabhagruha, Khamgaon
- CAREER COUNSELLNG organised by Dastur Ratanji Library in association with Tilak Smarak Mahila Mandal, Khamgaon on 30.06.2024 at Tilak Smarak Mahila Mandal Sabhagruha, Khamgaon`,
    },
    {
      name: "Prof. N. S. Thakare",
      subtitle: "",
      description:
        "- Recognized as Best P.O.- NSS, SGBAU, Amravati, M.S., India",
    },
    {
      name: "Prof. A. S. Alane",
      subtitle: "",
      description:
        "- Registered for Ph.D. (Registration at SGBAU Amravati no.3172/2024)",
    },
    {
      name: "Dr. M. S. Pande",
      subtitle: "",
      description: `- Published A text book of Research Innovative Basket (National Education Policy 2020, ISBN:978-81-970810-4-0)
- Recognized as Reviewer for publication in Journal of Condensed Matter`,
    },
    {
      name: "Dr. Manisha Sandeep Pande",
      subtitle: "",
      description: `- Completed the NEP 2020 Orientation & Sensitization Programme under the Malaviya Mission Teacher Training Programme (MM-TTP) of the University Grants Commission (UGC) jointly Organized by UGC-Malaviya Mission Teacher Training Centre, Sant Gadge Baba Amravati University, Amravati, and SSGMCE, Shegaon (Maharashtra) from 24th February, 2025 to 05th March, 2025 and obtained grade A+
- Book Chapter: Study of magnesium doped zinc cobaltite thick film for resistive type H2S gas detection. RESEARCH INNOVATIVE BASKET (Volume 2) ISBN:978-81-970810-4-0`,
    },
    {
      name: "Prof. H. S. Patil",
      subtitle: "",
      description: `- Published a book-LITERATURE MEETS LIBRARIES
- Published a book chapter on title Enhancing Communicative Competence through English Language Laboratories: A Study of Undergraduate Learners in Amravati
- Completed PGCTE from EFLU, Hyderabad in Aug.2025
- Delivered Guest Lectures on Soft Skills for FINAL year Students at various institutions: Shripad Krushna Kolhatkar College (Jalgaon Jamod), Shivaji College, Rajshri Shahu College of Pharmacy (Buldhana), Dr.R.N.Lahoti College of Pharmacy (Sultanpur), Sanmati Engineering College (Washim), P.Laddad (Buldhana)`,
    },
    {
      name: "Prof. K. P. Deshmukh",
      subtitle: "",
      description: "- Registered for Ph.D",
    },
    {
      name: "Prof. S. V. Bhagat",
      subtitle: "",
      description: `- Completed Refresher course National Education Policy and its Implementation held during 12th Feb to 24th Feb 2024 and obtain grade A+
- Submitted Ph.D thesis in December 2025`,
    },
  ],
  students: [
    {
      name: "Mr. Vinit S. Atkare",
      subtitle: "First Year Mechanical Engineering",
      description:
        "- Won third place at AVISHKAR 2024 for his project on Non-contact Glucose Detection Using Optical and Analytical Techniques",
    },
    {
      name: "Miss. Sakshi Rajankar, Miss. Tanushri Kharche, Miss. Vaishnavi Tale",
      subtitle: "First Year",
      description:
        "- Won first rank in Cyber Security Bootcamp organized by ACM, SSGMCE, Shegaon",
    },
    {
      name: "Rajveer Singh",
      subtitle: "First Year",
      description: `- Emerged winner in RumbleReel organized by Institute of Technology, Management and Research, Nashik
- Emerged winner in Project Xpo 2K25 organised by V. B. Kolte College of Engineering, Malkapur
- Secured first position in hackathon 5.0 (Online) organized by Amity University Online (Team Achievement)`,
    },
  ],
};

// ---- ASH Pride default data ----
const defaultAshPrideToppers = [
  {
    sn: "01",
    name: "ARYAN S. RAJ",
    branch: "CSE",
    year: "2017-18",
    percentage: "85.67",
  },
  {
    sn: "02",
    name: "KU. TANUJA GIRIDHAR PARASKAR",
    branch: "CSE",
    year: "2018-19",
    percentage: "83.91",
  },
  {
    sn: "03",
    name: "KU. GAURI NARENDRA SAWARKAR",
    branch: "IT",
    year: "2019-20",
    percentage: "83.08",
  },
  {
    sn: "04",
    name: "RAGHAVENDRA RAJENDRA LOKARE",
    branch: "MECH",
    year: "2020-21",
    percentage: "95.75",
  },
  {
    sn: "05",
    name: "KU SHAMLI SHARAD TITIRMARE",
    branch: "MECH",
    year: "2021-22",
    percentage: "90.41",
  },
  {
    sn: "06",
    name: "KU. NEHA PRAKASH JOSHI",
    branch: "EXTC",
    year: "2022-23",
    percentage: "83.66",
  },
];

function ashPrideToppersToMarkdown(toppers = []) {
  if (!toppers || toppers.length === 0) return "";
  let md = "## B.E. First Year College Toppers\n\n";
  md += "| SN | Name of Student | Branch | Academic Year | Percentage |\n";
  md += "| --- | --- | --- | --- | --- |\n";
  for (const t of toppers) {
    md += `| ${t.sn} | ${t.name} | ${t.branch} | ${t.year} | ${t.percentage} |\n`;
  }
  return md;
}

function ashParsePrideSections(markdown = "") {
  const sections = [];
  const parts = markdown.split(/^(?=## )/m);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const firstNewline = trimmed.indexOf("\n");
    const title =
      firstNewline === -1
        ? trimmed.replace(/^## /, "")
        : trimmed.slice(3, firstNewline).trim();
    const body =
      firstNewline === -1 ? "" : trimmed.slice(firstNewline + 1).trim();
    sections.push({ title, body });
  }
  return sections;
}

const ashPrideTableComponents = {
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
  tbody: ({ children }) => (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  ),
  tr: ({ children }) => <tr className="hover:bg-gray-50">{children}</tr>,
  th: ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-6 py-4 text-sm text-gray-900">{children}</td>
  ),
};

function AshPrideMdView({ markdown = "" }) {
  const sections = ashParsePrideSections(markdown);
  if (sections.length === 0) {
    return (
      <div className="text-center text-gray-400 italic py-8">
        No data available yet.
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {sections.map((sec, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white px-6 py-4">
            <h4 className="text-xl font-bold">{sec.title}</h4>
          </div>
          <div className="px-2 py-2">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={ashPrideTableComponents}
            >
              {sec.body}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
// ---- End ASH Pride helpers ----

const normalizeAshActivity = (activity = {}) => ({
  title: String(activity.title || "").trim(),
  date: String(activity.date || "").trim(),
  participants: String(
    activity.participants || activity.beneficiary || "",
  ).trim(),
  organizer: String(activity.organizer || "").trim(),
  resource: String(activity.resource || "").trim(),
  image: String(activity.image || "").trim(),
});

const defaultAshActivityCards =
  APPLIED_DEFAULT_ACTIVITIES.map(normalizeAshActivity);

const getRenderedAshActivityImage = (activity = {}) =>
  resolveUploadedAssetUrl(String(activity?.image || "").trim());

const formatAshActivityMarkdownField = (
  label,
  value,
  includeEmpty = false,
) => {
  const lines = String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length && !includeEmpty) return "";

  return [
    `- ${label}: ${lines[0] || ""}`,
    ...lines.slice(1).map((line) => `  ${line}`),
  ].join("\n");
};

const ashActivitiesToMarkdown = (activities = []) =>
  activities
    .map((activity) => normalizeAshActivity(activity))
    .filter((activity) => activity.title)
    .map((activity) =>
      [
        `## ${activity.title}`,
        formatAshActivityMarkdownField("Date", activity.date, true),
        formatAshActivityMarkdownField(
          "Participants",
          activity.participants,
          true,
        ),
        formatAshActivityMarkdownField("Organized by", activity.organizer, true),
        formatAshActivityMarkdownField("Resource Person", activity.resource, true),
        formatAshActivityMarkdownField("Image", activity.image, true),
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

const parseAshActivitiesMarkdown = (markdown = "") => {
  if (typeof markdown !== "string" || !markdown.trim()) return [];

  return markdown
    .split(/^(?=## )/m)
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section) => {
      const lines = section.split("\n");
      const titleLine = lines.shift() || "";
      const title = titleLine.replace(/^##\s+/, "").trim();
      const fieldMap = {
        date: [],
        participants: [],
        organizer: [],
        resource: [],
        image: [],
      };
      let activeField = null;

      lines.forEach((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        const fieldMatch = trimmedLine.match(
          /^-\s*(Date|Participants|Organized by|Resource Person|Image)\s*:\s*(.*)$/i,
        );

        if (fieldMatch) {
          const [, rawLabel, rawValue] = fieldMatch;
          activeField =
            {
              date: "date",
              participants: "participants",
              "organized by": "organizer",
              "resource person": "resource",
              image: "image",
            }[rawLabel.toLowerCase()] || null;

          if (activeField) fieldMap[activeField].push(rawValue.trim());
          return;
        }

        if (activeField) fieldMap[activeField].push(trimmedLine);
      });

      return normalizeAshActivity({
        title,
        date: fieldMap.date.join("\n").trim(),
        participants: fieldMap.participants.join("\n").trim(),
        organizer: fieldMap.organizer.join("\n").trim(),
        resource: fieldMap.resource.join("\n").trim(),
        image: fieldMap.image.join("\n").trim(),
      });
    })
    .filter((activity) => activity.title);
};

const AppliedSciences = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() =>
    getRequestedTab(location, "overview"),
  );
  const [vmTab, setVmTab] = useState("vision");
  const [poTab, setPoTab] = useState("peo");
  const [showAllPos, setShowAllPos] = useState(false);
  const [researchTab, setResearchTab] = useState("projects");
  const [projectYear, setProjectYear] = useState("2023-24");
  const [achievementTab, setAchievementTab] = useState("faculty");
  const [activitiesVisible, setActivitiesVisible] = useState(6);
  const [lightboxActivity, setLightboxActivity] = useState(null);
  const [expandedFacultyEditorIndex, setExpandedFacultyEditorIndex] =
    useState(null);

  useEffect(() => {
    const requestedTab = getRequestedTab(location, "overview");

    setActiveTab((currentTab) =>
      currentTab === requestedTab ? currentTab : requestedTab,
    );
  }, [location.search]);

  useEffect(() => {
    if (activeTab === "activities") {
      setActivitiesVisible(6);
      setLightboxActivity(null);
    }
  }, [activeTab]);

  // Load department data (works in both edit and public view modes)
  const {
    data: activeData,
    loading: dataLoading,
    isEditing,
    updateData,
    t,
  } = useDepartmentData("departments-applied-sciences");

  // Helper for array updates
  const updateField = (path, value) => {
    updateData(path, value);
  };

  const updateArrayString = (key, defaultArr, index, value) => {
    const arr = [...t(key, defaultArr)];
    arr[index] = value;
    updateData(key, arr);
  };

  const legacyActivities = (
    t("templateData.activities", defaultAshActivityCards) ||
    defaultAshActivityCards
  ).map(normalizeAshActivity);
  const storedActivitiesMarkdown = t("templateData.activitiesMarkdown", "");
  const parsedActivities = parseAshActivitiesMarkdown(
    storedActivitiesMarkdown,
  );
  const activitiesData = parsedActivities.length
    ? parsedActivities
    : legacyActivities;

  const updateActivityList = (updater) => {
    const nextActivities = updater(
      activitiesData.map((activity) => normalizeAshActivity(activity)),
    );
    updateField("templateData.activities", nextActivities);
    updateField(
      "templateData.activitiesMarkdown",
      ashActivitiesToMarkdown(nextActivities),
    );
  };

  const updateActivity = (index, field, value) => {
    if (!activitiesData[index]) return;
    updateActivityList((items) =>
      items.map((activity, activityIndex) =>
        activityIndex === index
          ? normalizeAshActivity({ ...activity, [field]: value })
          : activity,
      ),
    );
  };

  const addActivityCard = () => {
    updateActivityList((items) => [
      {
        title: "New Department Activity",
        date: "Add activity date",
        participants: "Add participant details",
        organizer: "Add organizer details",
        resource: "",
        image: "",
      },
      ...items,
    ]);
  };

  const deleteActivityCard = (index) => {
    updateActivityList((items) =>
      items.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const activityMarkdownComponents = {
    p: ({ node, ...props }) => (
      <p className="text-gray-700 leading-relaxed" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-5 space-y-1 text-gray-700" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-5 space-y-1 text-gray-700" {...props} />
    ),
    li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-gray-800" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a
        className="text-ssgmce-blue hover:text-ssgmce-orange underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
  };

  const renderActivityMarkdown = (value, emptyText = "Not specified") => {
    const trimmedValue = String(value || "").trim();
    if (!trimmedValue) {
      return (
        <p className="text-gray-400 italic leading-relaxed">{emptyText}</p>
      );
    }

    return (
      <div className="prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-ol:my-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={activityMarkdownComponents}
        >
          {trimmedValue}
        </ReactMarkdown>
      </div>
    );
  };

  const defaultCourseMaterials = [
    {
      year: "First Year",
      title: "First Year B.E. (Semester I & II)",
      link: "https://drive.google.com/drive/folders/1az9OFTOJ_Z1eKyPPo-a_s_Wd0N53_lZa",
    },
  ];

  const updateFacultyMember = (index, field, value) => {
    const faculty = JSON.parse(
      JSON.stringify(t("templateData.faculty", APPLIED_DEFAULT_FACULTY)),
    );
    faculty[index] = { ...faculty[index], [field]: value };
    updateField("templateData.faculty", faculty);
  };

  const splitFacultyMultiline = (value = "") =>
    String(value || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const createFacultySlug = (value = "") =>
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "faculty-member";

  const resolveVidwanUrl = (facultyMember) =>
    facultyMember?.vidwanLink?.trim?.() ||
    (facultyMember?.vidwanId
      ? `https://vidwan.inflibnet.ac.in/profile/${facultyMember.vidwanId}`
      : "");

  const getAchievementItems = (section) =>
    JSON.parse(
      JSON.stringify(
        t(
          `templateData.achievements.${section}`,
          APPLIED_DEFAULT_ACHIEVEMENTS[section] || [],
        ),
      ),
    );

  const achievementsToMarkdown = (section, items = []) =>
    items
      .map((item, index) => {
        const title = item?.name || `${section} Achievement ${index + 1}`;
        const subtitle = String(item?.subtitle || "").trim();
        const description = String(item?.description || "").trim();

        return [
          `### ${title}`,
          ...(subtitle ? [``, `- **Details:** ${subtitle}`] : []),
          "",
          description || "Add achievement details.",
        ].join("\n");
      })
      .join("\n\n---\n\n");

  const persistAchievementItems = (section, items) => {
    updateField(`templateData.achievements.${section}`, items);
    updateField(
      `templateData.achievementsMarkdown.${section}`,
      achievementsToMarkdown(section, items),
    );
  };

  const updateAchievementItem = (section, index, field, value) => {
    const items = getAchievementItems(section);
    if (!items[index]) return;
    items[index] = { ...items[index], [field]: value };
    persistAchievementItems(section, items);
  };

  const addAchievement = (section) => {
    const items = getAchievementItems(section);
    const nextItems = [
      {
        name: section === "faculty" ? "Faculty Name" : "Student Name",
        subtitle: section === "faculty" ? "" : "Student Details",
        description: "- Add achievement details.",
      },
      ...items,
    ];
    persistAchievementItems(section, nextItems);
  };

  const deleteAchievement = (section, index) => {
    const items = getAchievementItems(section);
    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
    persistAchievementItems(section, nextItems);
  };

  const achievementMarkdownComponents = {
    p: ({ node, ...props }) => (
      <p className="text-gray-700 text-sm leading-relaxed" {...props} />
    ),
    ul: ({ node, ...props }) => <ul className="space-y-3" {...props} />,
    li: ({ node, children, ...props }) => (
      <li className="flex items-start group" {...props}>
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-500 mt-2 mr-4 group-hover:bg-orange-600 transition-colors"></div>
        <div className="flex-1">{children}</div>
      </li>
    ),
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-gray-800" {...props} />
    ),
  };

  const renderAchievementMarkdown = (value) => {
    const trimmedValue = String(value || "").trim();
    if (!trimmedValue) {
      return (
        <p className="text-gray-400 italic text-sm">No details added yet.</p>
      );
    }

    return (
      <div className="prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-li:my-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={achievementMarkdownComponents}
        >
          {trimmedValue}
        </ReactMarkdown>
      </div>
    );
  };

  // Default subject categories
  const DEFAULT_SUBJECT_CATEGORIES = [
    {
      title: "Mathematics",
      borderColor: "#FF6B35",
      titleColor: "#004E89",
      bulletColor: "#FF6B35",
      subjects: [
        "Engineering Mathematics I-IV",
        "Numerical Methods",
        "Statistical Methods",
        "Operation Research",
      ],
    },
    {
      title: "Physics",
      borderColor: "#22C55E",
      titleColor: "#15803D",
      bulletColor: "#22C55E",
      subjects: ["Engineering Physics (Theory)", "Applied Physics Practical"],
    },
    {
      title: "Chemistry",
      borderColor: "#A855F7",
      titleColor: "#7E22CE",
      bulletColor: "#A855F7",
      subjects: [
        "Engineering Chemistry (Theory)",
        "Applied Chemistry Practical",
      ],
    },
    {
      title: "Humanities",
      borderColor: "#F97316",
      titleColor: "#C2410C",
      bulletColor: "#F97316",
      subjects: [
        "Communication Skill",
        "Principles of Management",
        "Social Science and Economics",
      ],
    },
  ];

  // Subject category management functions
  const updateSubjectCategory = (index, field, value) => {
    const categories = JSON.parse(
      JSON.stringify(
        t("templateData.subjects.categories", DEFAULT_SUBJECT_CATEGORIES),
      ),
    );
    categories[index] = { ...categories[index], [field]: value };
    updateField("templateData.subjects.categories", categories);
  };

  const updateSubjectInCategory = (categoryIndex, subjectIndex, value) => {
    const categories = JSON.parse(
      JSON.stringify(
        t("templateData.subjects.categories", DEFAULT_SUBJECT_CATEGORIES),
      ),
    );
    categories[categoryIndex].subjects[subjectIndex] = value;
    updateField("templateData.subjects.categories", categories);
  };

  const addSubjectCategory = () => {
    const categories = JSON.parse(
      JSON.stringify(
        t("templateData.subjects.categories", DEFAULT_SUBJECT_CATEGORIES),
      ),
    );
    categories.push({
      title: "New Subject Category",
      borderColor: "#3B82F6",
      titleColor: "#1E40AF",
      bulletColor: "#3B82F6",
      subjects: ["New Subject"],
    });
    updateField("templateData.subjects.categories", categories);
  };

  const removeSubjectCategory = (index) => {
    const categories = JSON.parse(
      JSON.stringify(
        t("templateData.subjects.categories", DEFAULT_SUBJECT_CATEGORIES),
      ),
    );
    categories.splice(index, 1);
    updateField("templateData.subjects.categories", categories);
  };

  const addSubjectToCategory = (categoryIndex) => {
    const categories = JSON.parse(
      JSON.stringify(
        t("templateData.subjects.categories", DEFAULT_SUBJECT_CATEGORIES),
      ),
    );
    categories[categoryIndex].subjects.push("New Subject");
    updateField("templateData.subjects.categories", categories);
  };

  const removeSubjectFromCategory = (categoryIndex, subjectIndex) => {
    const categories = JSON.parse(
      JSON.stringify(
        t("templateData.subjects.categories", DEFAULT_SUBJECT_CATEGORIES),
      ),
    );
    categories[categoryIndex].subjects.splice(subjectIndex, 1);
    updateField("templateData.subjects.categories", categories);
  };

  // Default curriculum items
  const DEFAULT_CURRICULUM_ITEMS = [
    { label: "NEP Scheme", link: "#", fileName: null, fileUrl: null },
    {
      label: "Syllabus of ASH (1st Sem - 2nd Sem)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label:
        "Syllabus of ASH (1st Sem - 2nd Sem) Notification No. 148 of 2024 (Extra Ordinary)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Engineering Mathematics - I Syllabus",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Engineering Mathematics - II Syllabus",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Engineering Physics Syllabus",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Engineering Chemistry Syllabus",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Communication Skills Syllabus",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
  ];

  // Curriculum management state and functions
  const [selectedCurriculumItems, setSelectedCurriculumItems] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState({});

  const updateCurriculumItem = (index, field, value) => {
    const items = JSON.parse(
      JSON.stringify(
        t("templateData.curriculum.items", DEFAULT_CURRICULUM_ITEMS),
      ),
    );
    items[index] = { ...items[index], [field]: value };
    updateField("templateData.curriculum.items", items);
  };

  const addCurriculumItem = () => {
    const items = JSON.parse(
      JSON.stringify(
        t("templateData.curriculum.items", DEFAULT_CURRICULUM_ITEMS),
      ),
    );
    items.push({
      label: "New Syllabus Item",
      link: "#",
      fileName: null,
      fileUrl: null,
    });
    updateField("templateData.curriculum.items", items);
  };

  const uploadCurriculumFile = async (index, file) => {
    if (!file) return;

    setUploadingFiles((prev) => ({ ...prev, [index]: true }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("adminToken");
      const response = await apiClient.post("/upload/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const uploadedUrl = response.data.fileUrl || response.data.url;
      const uploadedName = response.data.originalName || file.name;

      if (response.data.success && uploadedUrl) {
        updateCurriculumItem(index, "fileUrl", uploadedUrl);
        updateCurriculumItem(index, "fileName", uploadedName);
        updateCurriculumItem(index, "link", uploadedUrl);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      uploadCurriculumFile(index, file);
    } else {
      alert("Please select a PDF file.");
    }
  };

  const removeCurriculumItem = (index) => {
    const items = JSON.parse(
      JSON.stringify(
        t("templateData.curriculum.items", DEFAULT_CURRICULUM_ITEMS),
      ),
    );
    items.splice(index, 1);
    updateField("templateData.curriculum.items", items);
    setSelectedCurriculumItems(
      selectedCurriculumItems.filter((i) => i !== index),
    );
  };

  const toggleCurriculumSelection = (index) => {
    if (selectedCurriculumItems.includes(index)) {
      setSelectedCurriculumItems(
        selectedCurriculumItems.filter((i) => i !== index),
      );
    } else {
      setSelectedCurriculumItems([...selectedCurriculumItems, index]);
    }
  };

  const toggleAllCurriculumItems = () => {
    const items = t("templateData.curriculum.items", DEFAULT_CURRICULUM_ITEMS);
    if (selectedCurriculumItems.length === items.length) {
      setSelectedCurriculumItems([]);
    } else {
      setSelectedCurriculumItems(items.map((_, i) => i));
    }
  };

  const deleteSelectedCurriculumItems = () => {
    const items = JSON.parse(
      JSON.stringify(
        t("templateData.curriculum.items", DEFAULT_CURRICULUM_ITEMS),
      ),
    );
    const newItems = items.filter(
      (_, i) => !selectedCurriculumItems.includes(i),
    );
    updateField("templateData.curriculum.items", newItems);
    setSelectedCurriculumItems([]);
  };

  const [researchYear, setResearchYear] = useState("2023-24");
  const [placementYear, setPlacementYear] = useState("2023-24");
  const [expandedSemester, setExpandedSemester] = useState(null);

  const academicsLinks = [
    { id: "overview", label: "Department Overview" },
    { id: "hod", label: "Words from HOD" },
    { id: "subjects", label: "Subject Taught @ Department" },
    { id: "curriculum", label: "Scheme and Syllabus" },
    { id: "laboratories", label: "Infrastructure and Labs" },
    { id: "activities", label: "Activities @ Department" },
    { id: "achievements", label: "Achievements" },
    { id: "pride", label: "Pride of the Department" },
    { id: "orientation", label: "Student Orientation and Induction Program" },
    { id: "course-material", label: "Course Material" },
    { id: "course-outcome", label: "Course Outcome" },
    { id: "faculty", label: "Faculty Members" },
  ];

  const industryLinks = [
    { id: "workshops", label: "Workshops & Seminars" },
    { id: "collaborations", label: "Research Collaborations" },
    { id: "publications", label: "Publications" },
    { id: "outreach", label: "Community Outreach" },
  ];

  const content = {
    overview: (
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-orange-500 inline-block pb-2 w-fit">
              Department Overview
            </h3>

            <div className="prose max-w-none text-gray-700 leading-relaxed text-justify space-y-5">
              <MarkdownEditor
                value={t(
                  "templateData.overview.content",
                  `Applied Science is a bridge that connects Pure Sciences with the engineering world. The mission of the department is to generate human resource of excellent quality, with high professional competency in interdisciplinary research encompassing mathematics, chemistry, and physics for the national needs.

Department of Applied Science consists of Engineering Mathematics, Engineering Physics, Engineering Chemistry, and Humanities & Communication Skills, which are part of post-graduate/under-graduate and started functioning since academic year 1983-84.

Department of Applied Science consists of **Engineering Mathematics**, **Engineering Physics**, **Engineering Chemistry**, and **Humanities & Communication Skills**, which are part of post-graduate/under-graduate and started functioning since academic year **1983-84**. All the above subjects are compulsory. Mathematics is the backbone of all Engineering Sciences. Hence a lot of attention is given on Mathematics in engineering education. Engineering Mathematics is for first, second, third year and master of engineering curriculum whereas Engineering Physics and Engineering Chemistry are only for first year engineering and Humanities & Communication skills are for third year engineering. The department has three well equipped laboratories namely **Physics**, **Chemistry** and **Communication Skill**. The department is having **Four Ph.D.**, **Six M. Phil.** and Three faculties are pursuing their Ph.D., while one of the faculty has submitted Ph.D. Thesis. The departments having **two Professors**, **three Associate Professors** and **seven Assistant Professors**.

The department has its own monitoring system namely **Counselors Teacher Scheme** which looks after the attendance, academic performance and other extracurricular activities of students are monitored regularly and the reports are sent to the parents from time to time. In addition to university final examinations, unit tests, Teacher Evaluation components are conducted. Different types of competitions, guest lectures, sports and cultural programs are organized. Experienced and qualified faculties take a lot of efforts relentlessly which gives excellent results. The result of the students has gained first positions in the university.

Keeping in view the recent developments in Science and the present needs in Industries, the curriculum of Engineering Chemistry, Physics has been revised so that the Engineers/ Technicians may have a better knowledge of basis Sciences, especially regarding the application of the subject in various fields of Industries. An emphasis, in this direction, has been made in the curriculum, a good knowledge of Engineering Chemistry and Engineering Physics is therefore a necessity for the success of engineers majoring in various disciplines. These sciences foster technology, which is why all technical educational institutions have chemistry in all their courses. These subjects are taught in the First Year of Engineering to all the branches.

The phenomenal progress of technology in the twentieth century has brought dramatically changes in human lifestyles especially with reference to housing, personal comforts, transportation and health care. The technology, which has thus enhanced the quality of human life, is based on scientific research, primarily in chemistry. The need for sustainable development is a key to the future of mankind. Continuing the problems of pollution, loss of forest, solid waste disposal, degradation of environment, issues of economic productivity and national security, and warning about global warming, the depletion of ozone layer and loss of biodiversity have made everyone aware of environmental issues. Recognizing the significance of the Environmental Studies, this subject has introduced at the Second Year Degree Courses in all the faculties. Genuine endeavor is required to minimize the gaps by intellectual and material inputs. The success of this course will depend on the initiative and drive of the teachers and the receptive students.

---

**Dr. A. S. Tate,**\
Head, Dept. of Applied Sciences and Humanities

*Shri Sant Gajanan Maharaj*\
*College of Engineering, Shegaon*`,
                )}
                onSave={(val) =>
                  updateField("templateData.overview.content", val)
                }
                placeholder="Click to edit department overview content (Markdown supported)..."
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    ),

    "vision-mission": (
      <div className="space-y-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setVmTab("vision")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              vmTab === "vision"
                ? "bg-ssgmce-blue text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <FaBullseye className="text-xs" />
              <span>Vision</span>
            </span>
          </button>
          <button
            onClick={() => setVmTab("mission")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              vmTab === "mission"
                ? "bg-ssgmce-blue text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <FaAward className="text-xs" />
              <span>Mission</span>
            </span>
          </button>
          <button
            onClick={() => setVmTab("peo-po")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              vmTab === "peo-po"
                ? "bg-ssgmce-blue text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            PEO & PO
          </button>
        </div>

        <AnimatePresence mode="wait">
          {vmTab === "vision" && (
            <motion.div
              key="vision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border-l-4 border-ssgmce-orange"
            >
              <div className="flex items-start w-full">
                <FaBullseye className="text-4xl text-ssgmce-orange mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    <EditableText
                      value={t("visionTitle", "Our Vision")}
                      onSave={(val) => updateField("visionTitle", val)}
                    />
                  </h3>
                  <div className="text-gray-700 leading-relaxed text-lg">
                    <EditableText
                      value={t(
                        "vision",
                        "To provide a strong foundation in basic sciences and humanities, nurturing well-rounded engineering professionals with scientific temper and ethical values.",
                      )}
                      onSave={(val) => updateField("vision", val)}
                      multiline
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {vmTab === "mission" && (
            <motion.div
              key="mission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-lg border-l-4 border-orange-600"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4 inline-flex items-center gap-2">
                <FaAward className="text-orange-600" />
                <span>Our Mission</span>
              </h3>
              <ul className="space-y-3">
                {[
                  "Impart quality education in basic sciences, mathematics, and humanities",
                  "Develop scientific thinking and analytical skills in students",
                  "Foster effective communication and soft skills for professional growth",
                  "Promote ethical values and social responsibility",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaAngleRight className="text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {vmTab === "peo-po" && (
            <motion.div
              key="peo-po"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setPoTab("peo")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    poTab === "peo"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Program Educational Objectives (PEO)
                </button>
                <button
                  onClick={() => setPoTab("po")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    poTab === "po"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Program Outcomes (PO)
                </button>
              </div>

              {poTab === "peo" && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Program Educational Objectives
                  </h4>
                  <p className="text-gray-600 mb-4 italic">
                    Content will be updated soon.
                  </p>
                </div>
              )}

              {poTab === "po" && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Program Outcomes
                  </h4>
                  <p className="text-gray-600 mb-4 italic">
                    Content will be updated soon.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ),

    hod: (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Words from HOD
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-w-5xl mx-auto">
          {/* Profile Section - Horizontal Layout */}
          <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-ssgmce-blue to-ssgmce-orange rounded-2xl blur opacity-25"></div>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white group w-72 md:w-80 lg:w-96">
                    <EditableImage
                      src={t("templateData.hod.photo", hodPhoto)}
                      onSave={(url) =>
                        updateField("templateData.hod.photo", url)
                      }
                      alt="HOD Applied Sciences"
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  <EditableText
                    value={t("templateData.hod.name", "Dr. A. S. Tate")}
                    onSave={(val) => updateField("templateData.hod.name", val)}
                  />
                </h3>
                <p className="text-ssgmce-blue font-bold text-sm mt-1 uppercase tracking-wide">
                  <EditableText
                    value={t(
                      "templateData.hod.designation",
                      "Head of Department",
                    )}
                    onSave={(val) =>
                      updateField("templateData.hod.designation", val)
                    }
                  />
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  <EditableText
                    value={t(
                      "templateData.hod.department",
                      "Applied Sciences and Humanities",
                    )}
                    onSave={(val) =>
                      updateField("templateData.hod.department", val)
                    }
                  />
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-ssgmce-orange" />
                    <EditableText
                      value={t("templateData.hod.email", "astale@ssgmce.ac.in")}
                      onSave={(val) =>
                        updateField("templateData.hod.email", val)
                      }
                    />
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-ssgmce-orange" />
                    <EditableText
                      value={t("templateData.hod.phone", "+91 9960593094")}
                      onSave={(val) =>
                        updateField("templateData.hod.phone", val)
                      }
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-ssgmce-blue rounded-full text-xs font-bold">
                    <EditableText
                      value={t(
                        "templateData.hod.specialization",
                        "Solid State Physics",
                      )}
                      onSave={(val) =>
                        updateField("templateData.hod.specialization", val)
                      }
                    />
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-ssgmce-blue rounded-full text-xs font-bold">
                    <EditableText
                      value={t(
                        "templateData.hod.qualification",
                        "Associate Professor",
                      )}
                      onSave={(val) =>
                        updateField("templateData.hod.qualification", val)
                      }
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="p-8 md:p-10">
            <div className="relative">
              <FaQuoteLeft className="absolute -top-2 right-0 text-4xl text-blue-100" />

              <div className="space-y-4 text-gray-700 leading-relaxed max-w-5xl mx-auto">
                <MarkdownEditor
                  value={t(
                    "templateData.hod.message",
                    `Department of Applied Science consists of **Engineering Mathematics, Engineering Physics, Engineering Chemistry, and Humanities & Communication Skills**, which are part of engineering undergraduate courses and started functioning since academic year 1983-84. All the above subjects are compulsory. Mathematics is the backbone of all Engineering Sciences.

Hence a lot of attention is given on Mathematics in engineering education. **Engineering Mathematics** is for first, second, third year and master of engineering curriculum whereas **Engineering Physics** and **Engineering Chemistry** are only for first year engineering and **Humanities & Communication skills** are for third year engineering.

The department has three well equipped laboratories namely **Physics, Chemistry and Communication Skill**. The department is having **Four Ph.D., Six M. Phil.** and **Three faculties are pursuing their Ph.D.**, while one of the faculty has submitted Ph.D. Thesis. The departments have **two Professors, three Associate Professors and seven Assistant Professors**.`,
                  )}
                  onSave={(val) => updateField("templateData.hod.message", val)}
                  placeholder="Click to edit HOD message (Markdown supported)..."
                  className="w-full"
                />
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    <EditableText
                      value={t(
                        "templateData.hod.signatureName",
                        "Dr. A. S. Tate",
                      )}
                      onSave={(val) =>
                        updateField("templateData.hod.signatureName", val)
                      }
                    />
                  </p>
                  <p className="text-sm text-gray-600">
                    <EditableText
                      value={t(
                        "templateData.hod.signatureTitle",
                        "Head, Dept. of Applied Sciences and Engineering",
                      )}
                      onSave={(val) =>
                        updateField("templateData.hod.signatureTitle", val)
                      }
                    />
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 italic">
                    <EditableText
                      value={t(
                        "templateData.hod.collegeNameLine1",
                        "Shri Sant Gajanan Maharaj",
                      )}
                      onSave={(val) =>
                        updateField("templateData.hod.collegeNameLine1", val)
                      }
                    />
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    <EditableText
                      value={t(
                        "templateData.hod.collegeNameLine2",
                        "College of Engineering, Shegaon",
                      )}
                      onSave={(val) =>
                        updateField("templateData.hod.collegeNameLine2", val)
                      }
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    laboratories: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
          Infrastructure and Laboratories
        </h3>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Lab Entries */}
          {t("templateData.laboratories", APPLIED_DEFAULT_LABS).map(
            (lab, index) => (
              <div
                key={index}
                className="grid md:grid-cols-12 border-b border-gray-200 last:border-b-0 relative"
              >
                {/* Delete Button */}
                {isEditing && (
                  <button
                    onClick={() => {
                      const updated = t(
                        "templateData.laboratories",
                        APPLIED_DEFAULT_LABS,
                      ).filter((_, i) => i !== index);
                      updateField("templateData.laboratories", updated);
                    }}
                    className="absolute top-2 right-2 z-10 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md hover:bg-red-600 transition-colors"
                    title="Delete laboratory"
                  >
                    Delete Lab
                  </button>
                )}

                {/* Lab Photo Column */}
                <div className="md:col-span-5 bg-gray-50 p-6 border-r border-gray-100">
                  <EditableImage
                    src={lab.image || ""}
                    fallbackSrc={APPLIED_DEFAULT_LABS[index]?.image || ""}
                    onSave={(url) => {
                      const updated = [
                        ...t("templateData.laboratories", APPLIED_DEFAULT_LABS),
                      ];
                      updated[index].image = url;
                      updateField("templateData.laboratories", updated);
                    }}
                    className="aspect-video w-full object-cover rounded-lg"
                    placeholder="Click to add image"
                  />
                  <h4 className="font-bold text-gray-800 text-center mt-4">
                    <EditableText
                      value={lab.name}
                      onSave={(val) => {
                        const updated = [
                          ...t(
                            "templateData.laboratories",
                            APPLIED_DEFAULT_LABS,
                          ),
                        ];
                        updated[index].name = val;
                        updateField("templateData.laboratories", updated);
                      }}
                    />
                  </h4>
                </div>

                {/* Lab Details Column */}
                <div className="md:col-span-7 p-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-red-600 text-sm mb-2">
                        Lab Equipment / Resources:
                      </h5>
                      {isEditing ? (
                        <MarkdownEditor
                          value={lab.resources}
                          onSave={(val) => {
                            const updated = [
                              ...t(
                                "templateData.laboratories",
                                APPLIED_DEFAULT_LABS,
                              ),
                            ];
                            updated[index].resources = val;
                            updateField("templateData.laboratories", updated);
                          }}
                        />
                      ) : (
                        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                          {lab.resources}
                        </div>
                      )}
                    </div>
                    {(lab.facilities || isEditing) && (
                      <div>
                        <h5 className="font-semibold text-red-600 text-sm mb-2">
                          Facilities / Infrastructure:
                        </h5>
                        {isEditing ? (
                          <MarkdownEditor
                            value={lab.facilities || "Additional facilities..."}
                            onSave={(val) => {
                              const updated = [
                                ...t(
                                  "templateData.laboratories",
                                  APPLIED_DEFAULT_LABS,
                                ),
                              ];
                              updated[index].facilities = val;
                              updateField("templateData.laboratories", updated);
                            }}
                          />
                        ) : (
                          <div className="text-gray-700 text-sm leading-relaxed">
                            {lab.facilities}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ),
          )}

          {/* Add New Lab Button */}
          {isEditing && (
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => {
                  const updated = [
                    ...t("templateData.laboratories", APPLIED_DEFAULT_LABS),
                    {
                      name: "New Laboratory",
                      image: "",
                      resources: "Lab equipment and resources details...",
                      facilities: "Facilities and infrastructure details...",
                    },
                  ];
                  updateField("templateData.laboratories", updated);
                }}
                className="w-full py-3 px-4 bg-ssgmce-blue text-white rounded-lg hover:bg-ssgmce-dark-blue transition-colors font-medium"
              >
                + Add New Laboratory
              </button>
            </div>
          )}
        </div>
      </div>
    ),

    faculty: (
      <div className="space-y-10">
        <div className="text-center border-b border-gray-200 pb-6 mb-8">
          <h3 className="text-3xl font-bold text-gray-900">
            <EditableText
              value={t("facultyTitle", "Our Faculty")}
              onSave={(val) => updateField("facultyTitle", val)}
            />
          </h3>
          <div className="text-gray-500 mt-2">
            <EditableText
              value={t(
                "facultySubtitle",
                "Department of Applied Sciences and Humanities",
              )}
              onSave={(val) => updateField("facultySubtitle", val)}
            />
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {t("templateData.faculty", APPLIED_DEFAULT_FACULTY).map((fac, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300  flex relative ${
                isEditing && expandedFacultyEditorIndex === i
                  ? "lg:col-span-2"
                  : ""
              }`}
            >
              {/* Delete Button */}
              {isEditing && (
                <button
                  onClick={() => {
                    const updated = t(
                      "templateData.faculty",
                      APPLIED_DEFAULT_FACULTY,
                    ).filter((_, idx) => idx !== i);
                    updateField("templateData.faculty", updated);
                  }}
                  className="absolute top-2 right-2 z-10 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md hover:bg-red-600 transition-colors"
                  title="Remove faculty member"
                >
                  Remove
                </button>
              )}

              {/* Image Area - Fixed Width */}
              <div className="w-32 sm:w-40 bg-gray-50 flex-shrink-0 relative overflow-hidden border-r border-gray-100">
                {fac.photo ? (
                  <EditableImage
                    src={fac.photo}
                    onSave={(url) => {
                      const updated = [
                        ...t("templateData.faculty", APPLIED_DEFAULT_FACULTY),
                      ];
                      updated[i].photo = url;
                      updateField("templateData.faculty", updated);
                    }}
                    alt={fac.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      if (isEditing) {
                        const url = prompt("Enter faculty photo URL:");
                        if (url) {
                          const updated = [
                            ...t(
                              "templateData.faculty",
                              APPLIED_DEFAULT_FACULTY,
                            ),
                          ];
                          updated[i].photo = url;
                          updateField("templateData.faculty", updated);
                        }
                      }
                    }}
                  >
                    <FaUserTie className="text-5xl text-gray-300" />
                    {isEditing && (
                      <span className="absolute bottom-2 text-xs text-gray-500">
                        Click to add
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-5 flex-1 flex flex-col justify-center">
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-ssgmce-blue transition-colors">
                  {isEditing ? (
                    <EditableText
                      value={fac.name}
                      onSave={(val) => {
                        const updated = [
                          ...t("templateData.faculty", APPLIED_DEFAULT_FACULTY),
                        ];
                        updated[i].name = val;
                        updateField("templateData.faculty", updated);
                      }}
                    />
                  ) : (
                    <Link
                      to={`/faculty/${fac.id}`}
                      state={{ from: getPathWithTab(location, "faculty") }}
                      className="hover:text-ssgmce-blue hover:underline transition-colors cursor-pointer"
                    >
                      {fac.name}
                    </Link>
                  )}
                </h4>
                <div className="text-ssgmce-blue font-medium text-sm mb-3 uppercase tracking-wide text-[11px]">
                  <EditableText
                    value={fac.role}
                    onSave={(val) => {
                      const updated = [
                        ...t("templateData.faculty", APPLIED_DEFAULT_FACULTY),
                      ];
                      updated[i].role = val;
                      updateField("templateData.faculty", updated);
                    }}
                  />
                </div>

                {/* Compact Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  {(fac.area || isEditing) && (
                    <div className="line-clamp-2 text-xs">
                      <span className="font-bold text-gray-700">
                        <EditableText
                          value={t("facultyAreaLabel", "Area: ")}
                          onSave={(val) => updateField("facultyAreaLabel", val)}
                        />
                      </span>
                      <EditableText
                        value={
                          Array.isArray(fac.area)
                            ? fac.area.join(", ")
                            : fac.area || "Research areas..."
                        }
                        onSave={(val) => {
                          const updated = [
                            ...t(
                              "templateData.faculty",
                              APPLIED_DEFAULT_FACULTY,
                            ),
                          ];
                          updated[i].area = val.split(",").map((s) => s.trim());
                          updateField("templateData.faculty", updated);
                        }}
                      />
                    </div>
                  )}

                  <div className="pt-2 flex flex-col gap-1">
                    {(fac.email || isEditing) && (
                      <div className="flex items-center hover:text-ssgmce-blue transition-colors truncate text-xs">
                        <FaEnvelope className="mr-2 text-gray-400 flex-shrink-0" />{" "}
                        <EditableText
                          value={fac.email || "email@ssgmce.ac.in"}
                          onSave={(val) => {
                            const updated = [
                              ...t(
                                "templateData.faculty",
                                APPLIED_DEFAULT_FACULTY,
                              ),
                            ];
                            updated[i].email = val;
                            updateField("templateData.faculty", updated);
                          }}
                        />
                      </div>
                    )}
                    {(fac.email2 || isEditing) && (
                      <div className="flex items-center hover:text-ssgmce-blue transition-colors truncate text-xs">
                        <FaEnvelope className="mr-2 text-gray-400 flex-shrink-0" />{" "}
                        <EditableText
                          value={fac.email2 || "secondary@ssgmce.ac.in"}
                          onSave={(val) => {
                            const updated = [
                              ...t(
                                "templateData.faculty",
                                APPLIED_DEFAULT_FACULTY,
                              ),
                            ];
                            updated[i].email2 = val;
                            updateField("templateData.faculty", updated);
                          }}
                        />
                      </div>
                    )}
                    {(fac.phone || isEditing) && (
                      <span className="flex items-center text-xs">
                        <FaPhone className="mr-2 text-gray-400 flex-shrink-0" />{" "}
                        <EditableText
                          value={fac.phone || "+91XXXXXXXXXX"}
                          onSave={(val) => {
                            const updated = [
                              ...t(
                                "templateData.faculty",
                                APPLIED_DEFAULT_FACULTY,
                              ),
                            ];
                            updated[i].phone = val;
                            updateField("templateData.faculty", updated);
                          }}
                        />
                      </span>
                    )}
                  </div>

                  {resolveVidwanUrl(fac) && (
                    <a
                      href={resolveVidwanUrl(fac)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[10px] font-bold text-emerald-600 mt-1 hover:underline uppercase tracking-wide"
                    >
                      Vidwan Profile <FaAngleRight className="ml-1" />
                    </a>
                  )}
                  <Link
                    to={`/faculty/${fac.id}`}
                    state={{ from: getPathWithTab(location, "faculty") }}
                    className="inline-flex items-center text-[10px] font-bold text-ssgmce-blue mt-1 hover:underline uppercase tracking-wide"
                  >
                    View Profile <FaAngleRight className="ml-1" />
                  </Link>
                </div>

                {isEditing && (
                  <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedFacultyEditorIndex((current) =>
                          current === i ? null : i,
                        )
                      }
                      className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ssgmce-blue transition hover:bg-blue-100"
                    >
                      {expandedFacultyEditorIndex === i
                        ? "Hide Detailed Editor"
                        : "Edit Detailed Profile"}
                    </button>
                    {expandedFacultyEditorIndex === i && (
                      <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-3">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-700 mb-2">
                          Detailed Profile Editor
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">
                              Profile ID
                            </div>
                            <EditableText
                              value={fac.id || createFacultySlug(fac.name)}
                              onSave={(val) =>
                                updateFacultyMember(
                                  i,
                                  "id",
                                  createFacultySlug(val),
                                )
                              }
                            />
                          </div>
                          <div>
                            <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">
                              Vidwan ID
                            </div>
                            <EditableText
                              value={fac.vidwanId || ""}
                              onSave={(val) =>
                                updateFacultyMember(i, "vidwanId", val)
                              }
                            />
                          </div>
                          {[
                            ["qualification", "Qualification", false],
                            ["experience", "Experience", false],
                            ["scholarIds", "Scholar IDs", false],
                            ["area", "Research Areas", true],
                            ["coursesTaught", "Courses Taught", true],
                            ["membership", "Membership", true],
                            ["publications", "Publications", true],
                            ["research", "Research & Development", false],
                            ["fdp", "FDP / STTP / Workshops", false],
                            ["fellowship", "Fellowship / Awards", true],
                            ["achievements", "Other Achievements", true],
                          ].map(([field, label, isList]) => (
                            <div key={field} className="md:col-span-2">
                              <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">
                                {label}
                              </div>
                              <EditableText
                                value={
                                  isList
                                    ? (fac[field] || []).join("\n")
                                    : fac[field] || ""
                                }
                                onSave={(val) =>
                                  updateFacultyMember(
                                    i,
                                    field,
                                    isList ? splitFacultyMultiline(val) : val,
                                  )
                                }
                                multiline
                                richText={false}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add New Faculty Button */}
        {isEditing && (
          <div className="mt-6">
            <button
              onClick={() => {
                const updated = [
                  ...t("templateData.faculty", APPLIED_DEFAULT_FACULTY),
                  {
                    id: `new-faculty-${Date.now()}`,
                    name: "New Faculty Member",
                    role: "Assistant Professor",
                    area: ["Research Area"],
                    email: "newfaculty@ssgmce.ac.in",
                    phone: "+91XXXXXXXXXX",
                    photo: "",
                    vidwanId: "",
                    qualification: "Add qualification details",
                    experience: "Add teaching / industry experience",
                    coursesTaught: ["Add course"],
                    scholarIds: "",
                    membership: ["Add membership"],
                    publications: ["Add publication"],
                    research: "Add research details",
                    fdp: "",
                    fellowship: ["Add fellowship / award"],
                    achievements: ["Add achievement"],
                  },
                ];
                updateField("templateData.faculty", updated);
              }}
              className="w-full py-3 px-4 bg-ssgmce-blue text-white rounded-lg hover:bg-ssgmce-dark-blue transition-colors font-medium"
            >
              + Add New Faculty Member
            </button>
          </div>
        )}
      </div>
    ),

    subjects: (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Subject Taught @ Department
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 md:p-10">
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
              <p className="text-lg text-justify">
                <EditableText
                  value={t(
                    "templateData.subjects.intro1",
                    "The department is involved in teaching subjects of **Applied Sciences** and **Humanities** to under graduate level. It has started in **1983**. In this department applied physics and applied chemistry practical are conducted to make students more perfect in basic sciences, which helps them in further studies.",
                  )}
                  onSave={(val) =>
                    updateField("templateData.subjects.intro1", val)
                  }
                  multiline={true}
                />
              </p>

              <p className="text-lg text-justify">
                <EditableText
                  value={t(
                    "templateData.subjects.intro2",
                    "Besides teaching the subjects like **Engineering Physics**, **Engineering Chemistry**, **Engineering Mathematics-I**, **Engineering Mathematics-II**, **Engineering Mathematics-III**, **Engineering Mathematics-IV**, **Numerical Methods**, **Statistical Methods**, **Operation Research**, **Communication Skill**, **Principles of Management**, **Social Science and Economics** — the department is concerned with the overall development of the newly admitted students in BE first year.",
                  )}
                  onSave={(val) =>
                    updateField("templateData.subjects.intro2", val)
                  }
                  multiline={true}
                />
              </p>
            </div>
          </div>

          {/* Subject Categories */}
          <div className="p-8 md:p-10 bg-gray-50 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              {t(
                "templateData.subjects.categories",
                DEFAULT_SUBJECT_CATEGORIES,
              ).map((category, catIndex) => (
                <div key={catIndex} className="space-y-6">
                  <div
                    className="bg-white p-6 rounded-lg shadow-sm border-l-4 relative"
                    style={{ borderLeftColor: category.borderColor }}
                  >
                    {isEditing && (
                      <div className="absolute top-2 right-2 flex gap-2">
                        <div className="relative group/colors">
                          <button
                            className="text-gray-500 hover:text-gray-700 p-2 rounded hover:bg-gray-50 transition-colors"
                            title="Change Colors"
                          >
                            <FaPalette className="text-sm" />
                          </button>
                          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 opacity-0 invisible group-hover/colors:opacity-100 group-hover/colors:visible transition-all min-w-[200px]">
                            <div className="space-y-3">
                              <div>
                                <label className="text-xs font-semibold text-gray-600 block mb-1">
                                  Border Color
                                </label>
                                <input
                                  type="color"
                                  value={category.borderColor}
                                  onChange={(e) =>
                                    updateSubjectCategory(
                                      catIndex,
                                      "borderColor",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full h-8 rounded cursor-pointer"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-gray-600 block mb-1">
                                  Title Color
                                </label>
                                <input
                                  type="color"
                                  value={category.titleColor}
                                  onChange={(e) =>
                                    updateSubjectCategory(
                                      catIndex,
                                      "titleColor",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full h-8 rounded cursor-pointer"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-gray-600 block mb-1">
                                  Bullet Color
                                </label>
                                <input
                                  type="color"
                                  value={category.bulletColor}
                                  onChange={(e) =>
                                    updateSubjectCategory(
                                      catIndex,
                                      "bulletColor",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full h-8 rounded cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeSubjectCategory(catIndex)}
                          className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                          title="Remove Category"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    )}
                    <h3
                      className="text-xl font-bold mb-4 flex items-center"
                      style={{ color: category.titleColor }}
                    >
                      <FaLightbulb className="mr-3" />
                      <EditableText
                        value={category.title}
                        onSave={(val) =>
                          updateSubjectCategory(catIndex, "title", val)
                        }
                      />
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      {category.subjects.map((subject, subIndex) => (
                        <li key={subIndex} className="flex items-start group">
                          <span
                            className="mr-2 mt-1"
                            style={{ color: category.bulletColor }}
                          >
                            •
                          </span>
                          <span className="flex-1">
                            <EditableText
                              value={subject}
                              onSave={(val) =>
                                updateSubjectInCategory(catIndex, subIndex, val)
                              }
                            />
                          </span>
                          {isEditing && (
                            <button
                              onClick={() =>
                                removeSubjectFromCategory(catIndex, subIndex)
                              }
                              className="ml-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove Subject"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                    {isEditing && (
                      <button
                        onClick={() => addSubjectToCategory(catIndex)}
                        className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold"
                      >
                        <FaPlus /> Add Subject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="mt-8 text-center">
                <button
                  onClick={addSubjectCategory}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-ssgmce-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                >
                  <FaPlus /> Add Subject Category
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ),

    curriculum: (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
            Scheme and Syllabus
          </h3>
          {isEditing && (
            <div className="flex gap-2">
              {selectedCurriculumItems.length > 0 && (
                <button
                  onClick={deleteSelectedCurriculumItems}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                >
                  <FaTrash /> Delete Selected ({selectedCurriculumItems.length})
                </button>
              )}
              <button
                onClick={addCurriculumItem}
                className="flex items-center gap-2 px-4 py-2 bg-ssgmce-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
              >
                <FaPlus /> Add Item
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Applied Sciences Section */}
          <div className="grid md:grid-cols-12 border-b border-gray-200">
            <div className="md:col-span-4 bg-gray-50/50 p-6 flex items-center border-r border-gray-100">
              <div className="flex items-center gap-3 w-full">
                {isEditing && (
                  <input
                    type="checkbox"
                    checked={
                      selectedCurriculumItems.length ===
                      t(
                        "templateData.curriculum.items",
                        DEFAULT_CURRICULUM_ITEMS,
                      ).length
                    }
                    onChange={toggleAllCurriculumItems}
                    className="w-4 h-4 rounded border-gray-300"
                    title="Select All"
                  />
                )}
                <h4 className="font-bold text-lg text-gray-800">
                  Applied Sciences and Humanities
                </h4>
              </div>
            </div>
            <div className="md:col-span-8 p-6">
              <ul className="space-y-4">
                {t(
                  "templateData.curriculum.items",
                  DEFAULT_CURRICULUM_ITEMS,
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    {isEditing && (
                      <input
                        type="checkbox"
                        checked={selectedCurriculumItems.includes(i)}
                        onChange={() => toggleCurriculumSelection(i)}
                        className="mt-2 w-4 h-4 rounded border-gray-300"
                      />
                    )}
                    <span className="w-2 h-2 rounded-full bg-ssgmce-orange mt-2 block group-hover:bg-ssgmce-blue transition-colors"></span>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-2">
                      <span className="text-gray-700 text-sm font-medium flex-1">
                        <EditableText
                          value={item.label}
                          onSave={(val) =>
                            updateCurriculumItem(i, "label", val)
                          }
                        />
                      </span>
                      <div className="flex items-center gap-2">
                        {isEditing && (
                          <>
                            <div className="flex flex-col gap-1">
                              <input
                                type="text"
                                value={item.link || ""}
                                onChange={(e) =>
                                  updateCurriculumItem(
                                    i,
                                    "link",
                                    e.target.value,
                                  )
                                }
                                placeholder="Link URL or use upload"
                                className="text-xs px-2 py-1 border border-gray-300 rounded w-40"
                              />
                              {item.fileName && (
                                <span className="text-xs text-green-600">
                                  📎 {item.fileName}
                                </span>
                              )}
                            </div>
                            <div className="relative">
                              <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => handleFileChange(i, e)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id={`file-upload-${i}`}
                              />
                              <label
                                htmlFor={`file-upload-${i}`}
                                className={`flex items-center gap-1 px-2 py-1 text-xs rounded cursor-pointer transition-colors ${
                                  uploadingFiles[i]
                                    ? "bg-gray-300 text-gray-500"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                }`}
                                title="Upload PDF"
                              >
                                {uploadingFiles[i] ? (
                                  "Uploading..."
                                ) : (
                                  <>
                                    <FaUpload /> PDF
                                  </>
                                )}
                              </label>
                            </div>
                            <button
                              onClick={() => removeCurriculumItem(i)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Delete Item"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </>
                        )}
                        {!isEditing && (
                          <a
                            href={item.fileUrl || item.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-ssgmce-blue hover:text-ssgmce-orange hover:underline uppercase tracking-wide shrink-0"
                            onClick={(e) => {
                              if (
                                !item.fileUrl &&
                                (!item.link || item.link === "#")
                              ) {
                                e.preventDefault();
                                alert("No file available for download.");
                              }
                            }}
                          >
                            Download
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),

    pride: (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <FaTrophy className="text-4xl text-yellow-500" />
            <h3 className="text-3xl font-bold text-gray-800">
              Pride of the Department
            </h3>
          </div>
          <p className="text-gray-600 mb-6">B.E. First Year College Toppers</p>

          {(() => {
            const md = t(
              "pride.toppersMarkdown",
              ashPrideToppersToMarkdown(
                t("pride.toppers", defaultAshPrideToppers),
              ),
            );
            return isEditing ? (
              <MarkdownEditor
                value={md}
                onSave={(v) => updateData("pride.toppersMarkdown", v)}
                showDocImport
                docTemplateUrl="/uploads/documents/pride_templates/ash_toppers_template.docx"
                docTemplateLabel="Download Template"
              />
            ) : (
              <AshPrideMdView markdown={md} />
            );
          })()}
        </motion.div>
      </div>
    ),

    orientation: (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Student Orientation and Induction Program
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
        </div>

        {/* Program Years List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {[
              {
                year: "2025-26",
                label: "Student Orientation and Induction program 2025-26",
                isNew: true,
              },
              {
                year: "2024-25",
                label: "Student Orientation and Induction program 2024-25",
                isNew: false,
              },
              {
                year: "2023-24",
                label: "Student Orientation and Induction program 2023-24",
                isNew: false,
              },
              {
                year: "2022-23",
                label: "Student Orientation and Induction program 2022-23",
                isNew: false,
              },
            ].map((program, index) => (
              <div
                key={index}
                className="p-5 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {program.isNew && (
                      <span className="bg-ssgmce-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                        New
                      </span>
                    )}
                    <span className="text-gray-700 font-medium group-hover:text-ssgmce-blue transition-colors">
                      {program.label}
                    </span>
                  </div>
                  <button className="text-ssgmce-blue hover:text-ssgmce-orange font-semibold text-sm hover:underline transition-colors">
                    Detail Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Program Highlights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Inauguration Ceremony",
                desc: "Traditional lamp lighting ceremony",
              },
              {
                title: "Welcome Address",
                desc: "Faculty and administration welcoming students",
              },
              {
                title: "Student Assembly",
                desc: "First-year students attending orientation",
              },
              {
                title: "Interactive Session",
                desc: "Students engaging in group activities",
              },
            ].map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 group hover:shadow-xl transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 via-blue-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-ssgmce-blue opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="text-center z-10">
                    <FaUniversity className="text-6xl text-blue-300 mx-auto mb-3 group-hover:text-blue-400 transition-colors" />
                    <p className="text-sm text-gray-500 font-semibold px-4">
                      {photo.title}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-gray-50">
                  <p className="text-sm text-gray-600 text-center">
                    {photo.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Program Details Info Box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-gray-200">
          <div className="flex items-start">
            <FaLightbulb className="text-4xl text-ssgmce-blue mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                About the Program
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Student Orientation and Induction Program is designed to
                help first-year students transition smoothly into their
                engineering education journey. The program familiarizes students
                with the academic environment, facilities, and resources
                available at SSGMCE.
              </p>
              <ul className="space-y-2">
                {[
                  "Introduction to college infrastructure and facilities",
                  "Academic curriculum and examination pattern",
                  "Student support services and mentorship",
                  "Extra-curricular activities and student chapters",
                  "Career guidance and placement opportunities",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <FaAngleRight className="text-ssgmce-blue mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),

    "course-material": (
      <div className="space-y-8">
        {/* Course Material Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-50 text-ssgmce-orange rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm">
            <FaChalkboardTeacher />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            <EditableText
              value={t("courseMaterial.title", "Course Material")}
              onSave={(val) => updateData("courseMaterial.title", val)}
            />
          </h3>
          <div className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            <EditableText
              value={t(
                "courseMaterial.description",
                "Access comprehensive course materials, lecture notes, assignments, and study resources for all semesters.",
              )}
              onSave={(val) => updateData("courseMaterial.description", val)}
              multiline
            />
          </div>
        </div>

        {/* Course Material Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-wide">
                Course Material
              </h3>
              <p className="text-sm text-orange-100 mt-1">
                Department of Applied Sciences & Humanities
              </p>
            </div>
            <FaChalkboardTeacher className="text-4xl text-orange-200 opacity-40" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider border-b border-gray-200">
                  <th className="px-6 py-4 font-bold text-center w-20">
                    Sr. No.
                  </th>
                  <th className="px-6 py-4 font-bold">Year / Class</th>
                  <th className="px-6 py-4 font-bold text-center">
                    Access Materials
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {(t("courseMaterials", defaultCourseMaterials) || []).map(
                  (material, i) => (
                    <tr
                      key={i}
                      className="hover:bg-orange-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-center font-mono text-gray-400">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-800">
                          <EditableText
                            value={material.title}
                            onSave={(val) =>
                              updateArrayString(
                                "courseMaterials",
                                defaultCourseMaterials,
                                i,
                                { ...material, title: val },
                              )
                            }
                          />
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <a
                          href={material.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-ssgmce-orange hover:text-orange-700 font-medium text-xs border border-gray-200 hover:border-orange-400 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-full transition-all"
                        >
                          <FaDownload className="text-xs" /> Access Drive
                        </a>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-xs text-gray-400 text-center bg-gray-50 border-t border-gray-100">
            Click on "Access Drive" to view and download course materials from
            the respective year's shared folder.
          </div>
        </motion.div>
      </div>
    ),

    "course-outcome": (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Course Outcomes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive course outcomes for all semesters of B.E. Applied
            Sciences & Humanities
          </p>
        </div>

        {/* B.E. Course Outcomes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#003366] px-6 py-4 text-center">
            <h3 className="text-xl font-bold text-white">
              B.E. Applied Sciences & Humanities - Course Outcomes
            </h3>
          </div>

          <div className="p-6 space-y-2">
            {/* B.E. Semester I (CSE, IT, ELPO) */}
            <div className="border-b border-gray-200 pb-2">
              <button
                onClick={() =>
                  setExpandedSemester(
                    expandedSemester === "be-sem1" ? null : "be-sem1",
                  )
                }
                className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700">
                  B.E. Semester-I (CSE, IT, ELPO)
                </span>
                <span className="px-4 py-1 bg-ssgmce-blue text-white text-sm rounded hover:bg-ssgmce-dark-blue transition-colors">
                  {expandedSemester === "be-sem1" ? "Hide" : "View"}
                </span>
              </button>
              <AnimatePresence>
                {expandedSemester === "be-sem1" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-4 bg-gray-50">
                      <MarkdownEditor
                        value={t(
                          "templateData.courseOutcomes.sem1",
                          `### 1A1 - Engineering Mathematics-I\n\nAfter successfully completing the course, the students will be able to:\n\n1. Understand to find n th order derivative of functions, Roll's Theorem, expand the function in a power series and evaluate indeterminate forms.\n2. Find partial derivatives and Obtain maxima and minima of a function under constraint by Lagrange's method\n3. Find powers and roots of complex numbers using De Moivre's Theorem, separate the complex quantity in real & imaginary parts, and find logarithms of complex numbers\n4. Solve ordinary differential equations of first order and first degree by various methods and application of these methods to solve real life fields.\n5. Solve ordinary differential equations of first order and higher degree by various methods and applications of Electrical circuits and orthogonal Trajectory.\n6. Understand the concept of Convergence of Sequence and series.\n\n### 1A2 - Engineering Physics\n\nAfter successfully completing the course, the students will be able to:\n\n1. To apply the knowledge of solid state devices such as semiconductor diode, Zener diode & LED in various electronic applications.\n2. To apply the knowledge of Quantum Mechanics in Engineering fields.\n3. To apply the principles of electron Ballistics to demonstrate the functioning of CRO & Mass Spectrograph.\n4. To apply the principles of geometrical optics such as interference & diffraction in various Engineering fields.\n5. To apply the principles of fiber optics & LASER & fundamentals of acoustics, ultrasonics, & fluid dynamics in various domains of Engineering.\n\n### 1A3 - Engineering Mechanics\n\nAfter successfully completing the course, the students will be able to:\n\n1. Apply composition and resolution of forces and principles of statics to analyze system of rigid bodies and simple structures.\n2. Calculate frictional forces for simple contact, wedges and belt friction.\n3. Locate centroid and calculate moment of inertia.\n4. Calculate various kinematic quantities.\n5. Solve the problems using different kinetic equations related to direct and interconnected particles.\n6. Apply principle of conservation of momentum and laws of impact.\n\n### 1A4 - Computer Programming\n\nAfter successfully completing the course, the students will be able to:\n\n1. Explain fundamental concepts of computer and computing.\n2. Test and execute the programs and correct syntax and logical errors.\n3. Demonstrate various concepts of operators, expressions to solve real life problems.\n4. Demonstrate various concepts of control structure to solve complex problems\n5. Use arrays, strings and structures to formulate algorithms and programs.\n6. Demonstrate various concepts of functions, pointers and file handling mechanism.\n\n### 1A5 - Communication Skills\n\nAfter successfully completing the course, the students will be able to:\n\n1. Understand the importance of communication at the workplace and use grammatically correct sentences in oral and written communication.\n2. Enhance vocabulary and learn the basics of business correspondence to effectively write letters, proposals, reports and newsletters\n3. Learn the right kind of pronunciation with proper stress, intonation and pauses during the conversation.\n4. Learn the basics of public speaking, group discussions, presentations and interviews to showcase the better performance in personal and professional life.\n5. Learn the planning, management and execution of seminars, conferences and group activities and hone the leadership, managerial skills and team spirit.\n6. Communicate effectively and ethically in multi-cultural environment and adapt to the changes time to time.`,
                        )}
                        onSave={(val) =>
                          updateField("templateData.courseOutcomes.sem1", val)
                        }
                        placeholder="Click to edit Semester I (CSE, IT, ELPO) course outcomes (Markdown supported)..."
                        className="w-full"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* B.E. Semester II (EXTC/MECH) */}
            <div className="border-b border-gray-200 pb-2">
              <button
                onClick={() =>
                  setExpandedSemester(
                    expandedSemester === "be-sem2" ? null : "be-sem2",
                  )
                }
                className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700">
                  B.E. Semester-II (EXTC/MECH)
                </span>
                <span className="px-4 py-1 bg-ssgmce-blue text-white text-sm rounded hover:bg-ssgmce-dark-blue transition-colors">
                  {expandedSemester === "be-sem2" ? "Hide" : "View"}
                </span>
              </button>
              <AnimatePresence>
                {expandedSemester === "be-sem2" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-4 bg-gray-50">
                      <MarkdownEditor
                        value={t(
                          "templateData.courseOutcomes.sem2",
                          `### 1A1 - Engineering Mathematics-I\n\nAfter successfully completing the course, the students will be able to:\n\n1. Understand to find n th order derivative of functions, Roll's Theorem, expand the function in a power series and evaluate indeterminate forms.\n2. Find partial derivatives and Obtain maxima and minima of a function under constraint by using Lagrange's method\n3. Find powers and roots of complex numbers using De Moivre's Theorem, separate the complex quantity in real & imaginary parts, and find logarithms of complex numbers\n4. Solve ordinary differential equations of first order and first degree by various methods and apply these methods to solve problems in engineering fields.\n5. Solve ordinary differential equations of first order and higher degree by various methods and applications of Electrical circuits and orthogonal Trajectory.\n6. Understand the concept of Convergence of Sequence and series.\n\n### 1A2 - Engineering Physics\n\nAfter successfully completing the course, the students will be able to:\n\n1. To apply the knowledge of solid state devices such as semiconductor diode, Zener diode & LED in various electronic applications.\n2. To apply the knowledge of Quantum Mechanics in Engineering fields.\n3. To apply the principles of electron Ballistics to demonstrate the functioning of CRO & Mass Spectrograph.\n4. To apply the principles of geometrical optics such as interference & diffraction in various Engineering fields.\n5. To apply the principles of fiber optics & LASER & fundamentals of acoustics, ultrasonics, & fluid dynamics in various domains of Engineering.\n\n### 1A3 - Engineering Mechanics\n\nAfter successfully completing the course, the students will be able to:\n\n1. Apply composition and resolution of forces and principles of statics to analyze system of rigid bodies and simple structures.\n2. Calculate frictional forces for simple contact, wedges and belt friction.\n3. Locate centroid and calculate moment of inertia.\n4. Calculate various kinematic quantities.\n5. Solve the problems using different kinetic equations related to direct and interconnected particles.\n6. Apply principle of conservation of momentum and laws of impact.\n\n### 1A4 - Computer Programming\n\nAfter successfully completing the course, the students will be able to:\n\n1. Explain fundamental concepts of computer and computing.\n2. Test and execute the programs and correct syntax and logical errors.\n3. Demonstrate various concepts of operators, expressions to solve real life problems.\n4. Demonstrate various concepts of control structure to solve complex problems\n5. Use arrays, strings and structures to formulate algorithms and programs.\n6. Demonstrate various concepts of functions, pointers and file handling mechanism.\n\n### 1A5 - Workshop\n\nAfter successfully completing the course, the students will be able to:\n\n1. Apply various forging operations for the completion of given component\n2. Apply various fitting operations for the completion of given component\n3. Apply various thread manufacturing processes operations for the completion of given component\n4. Apply various sheet metal processes operations for the completion of given component\n5. Apply various welding techniques to fabricate the parts\n6. Apply various carpentry operations for the completion of given component\n\n---\n\n**CSE, IT, ELPO**\n\n### 1B1 - Engineering Mathematics-II\n\nAfter successfully completing the course, the students will be able to:\n\n1. Solve the inverse of matrix by various methods, solutions of simultaneous equation, and Eigen values & Eigen vectors of a matrix\n2. Use the tool of Fourier expansion for learning advance engineering Mathematics\n3. Solve integrals by Gamma & Beta function, Reduction Formulae\n4. Use new techniques of DUIS to evaluate integrals\n5. Solve the numerical on double integrals\n6. Solve Triple integrals and their uses to find the volume of Triple integrals, mean value and RMS values\n\n### 1B2 - Engineering Chemistry\n\nAfter successfully completing the course, the students will be able to:\n\n1. Apply the knowledge of chemistry in softening processes, its quality parameters for the use of water in industry.\n2. Identify various types of corrosion and methods to protect the metallic structure from corrosive environment and understanding of the energy storage system (battery)\n3. Apply the knowledge of useful engineering materials such as cement and lubricant based on their properties.\n4. Apply the knowledge about the properties of chemical fuels for the generation of power\n5. Apply the knowledge of various polymeric material w.r.t synthesis, properties and applications\n6. Identify various phases of material at different thermodynamic variables and analysis of materials by using advance analytical techniques.\n\n### 1B3 - Electrical Engineering\n\nAfter successfully completing the course, the students will be able to:\n\n1. Analyze the electric and magnetic circuits.\n2. Analyze single phase & three phase AC circuits.\n3. Understand the operating principles & Characteristics of electrical machines.\n4. Elaborate the construction and working of various measuring instruments and earthing.\n\n### 1B4 - Engineering Graphics\n\nAfter successfully completing the course, the students will be able to:\n\n1. Prepare the engineering drawings.\n2. Apply the concepts of the projections and sectional views of three Dimensional objects.\n3. Analyse the orthographic and isometric views of three dimensional objects.\n4. Explain the engineering drawings and represent engineering systems.\n\n### 1B5 - Communication Skills\n\nAfter successfully completing the course, the students will be able to:\n\n1. Understand the importance of communication at the workplace and use grammatically correct sentences in oral and written communication.\n2. Enhance vocabulary and learn the basics of business correspondence to effectively write letters, proposals, reports and newsletters\n3. Learn the right kind of pronunciation with proper stress, intonation and pauses during the conversation.\n4. Learn the basics of public speaking, group discussions, presentations and interviews`,
                        )}
                        onSave={(val) =>
                          updateField("templateData.courseOutcomes.sem2", val)
                        }
                        placeholder="Click to edit Semester II (EXTC/MECH) course outcomes (Markdown supported)..."
                        className="w-full"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    ),

    achievements: (() => {
      const facultyAchievements = getAchievementItems("faculty");
      const studentAchievements = getAchievementItems("students");

      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Achievements</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
            <p className="text-gray-600 mt-3">2021-22 To 2025-26</p>
          </div>

          {/* Tab Menu */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setAchievementTab("faculty")}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  achievementTab === "faculty"
                    ? "bg-[#003366] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <FaUserTie className="text-lg" />
                Faculty Achievements
              </button>
              <button
                onClick={() => setAchievementTab("student")}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  achievementTab === "student"
                    ? "bg-[#003366] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <FaAward className="text-lg" />
                Student Achievements
              </button>
            </div>
          </div>

          {/* Faculty Achievements Tab Content */}
          {achievementTab === "faculty" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => addAchievement("faculty")}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-ssgmce-blue to-blue-700 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
                  >
                    <FaPlus className="text-xs" />
                    Add Faculty Achievement
                  </button>
                </div>
              )}
              {facultyAchievements.map((person, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Header with Name */}
                  <div className="bg-[#003366] px-6 py-4 flex items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <FaTrophy className="mr-3 text-yellow-300" />
                      <EditableText
                        value={person.name}
                        onSave={(val) =>
                          updateAchievementItem("faculty", index, "name", val)
                        }
                      />
                    </h3>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => deleteAchievement("faculty", index)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        <FaTrash className="text-xs" />
                        Delete
                      </button>
                    )}
                  </div>

                  {/* Achievement Items */}
                  <div className="p-6">
                    {isEditing ? (
                      <MarkdownEditor
                        value={person.description}
                        onSave={(val) =>
                          updateAchievementItem(
                            "faculty",
                            index,
                            "description",
                            val,
                          )
                        }
                        placeholder="Add faculty achievement details in Markdown..."
                        className="w-full"
                      />
                    ) : (
                      renderAchievementMarkdown(person.description)
                    )}
                  </div>
                </motion.div>
              ))}
              {facultyAchievements.length === 0 && (
                <p className="text-center text-gray-400 py-8 text-sm">
                  No faculty achievements recorded yet.
                </p>
              )}
            </motion.div>
          )}

          {/* Student Achievements Tab Content */}
          {achievementTab === "student" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => addAchievement("students")}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-ssgmce-blue to-blue-700 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
                  >
                    <FaPlus className="text-xs" />
                    Add Student Achievement
                  </button>
                </div>
              )}
              {studentAchievements.map((student, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Header with Name */}
                  <div className="bg-[#003366] px-6 py-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <FaAward className="mr-3 text-yellow-300" />
                        <EditableText
                          value={student.name}
                          onSave={(val) =>
                            updateAchievementItem(
                              "students",
                              index,
                              "name",
                              val,
                            )
                          }
                        />
                      </h3>
                      <p className="text-blue-200 text-sm mt-1 ml-8">
                        <EditableText
                          value={student.subtitle}
                          onSave={(val) =>
                            updateAchievementItem(
                              "students",
                              index,
                              "subtitle",
                              val,
                            )
                          }
                        />
                      </p>
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => deleteAchievement("students", index)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        <FaTrash className="text-xs" />
                        Delete
                      </button>
                    )}
                  </div>

                  {/* Achievement Items */}
                  <div className="p-6">
                    {isEditing ? (
                      <MarkdownEditor
                        value={student.description}
                        onSave={(val) =>
                          updateAchievementItem(
                            "students",
                            index,
                            "description",
                            val,
                          )
                        }
                        placeholder="Add student achievement details in Markdown..."
                        className="w-full"
                      />
                    ) : (
                      renderAchievementMarkdown(student.description)
                    )}
                  </div>
                </motion.div>
              ))}
              {studentAchievements.length === 0 && (
                <p className="text-center text-gray-400 py-8 text-sm">
                  No student achievements recorded yet.
                </p>
              )}
            </motion.div>
          )}
        </div>
      );
    })(),

    activities: (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
            <EditableText
              value={t("templateData.activitiesTitle", "Activities @ Department")}
              onSave={(val) => updateField("templateData.activitiesTitle", val)}
            />
          </h3>
          <span className="hidden sm:inline-block text-sm text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full">
            {activitiesData.length} Activities
          </span>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              onClick={addActivityCard}
              className="px-5 py-2.5 bg-ssgmce-blue text-white rounded-lg hover:bg-ssgmce-dark-blue transition-colors font-medium shadow-sm"
            >
              + Add New Activity
            </button>
          </div>
        )}

        {/* Activity List */}
        <div className="space-y-5">
          {activitiesData.slice(0, activitiesVisible).map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.35 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative"
            >
              {isEditing && (
                <button
                  onClick={() => deleteActivityCard(index)}
                  className="absolute top-3 right-3 z-10 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md hover:bg-red-600 transition-colors"
                  title="Delete activity"
                >
                  Delete Activity
                </button>
              )}

              <div className="flex flex-col sm:flex-row">
                <div
                  className={`sm:w-72 flex-shrink-0 ${isEditing ? "" : "cursor-pointer"}`}
                  onClick={() => {
                    if (!isEditing) setLightboxActivity(index);
                  }}
                >
                  {isEditing ? (
                    <EditableImage
                      src={activity.image}
                      fallbackSrc={defaultAshActivityCards[index]?.image || ""}
                      onSave={(url) => updateActivity(index, "image", url)}
                      alt={activity.title}
                      className="w-full h-48 sm:h-full object-contain bg-gray-50"
                      placeholder="Click to add activity poster"
                    />
                  ) : activity.image ? (
                    <img
                      src={getRenderedAshActivityImage(activity)}
                      alt={activity.title}
                      className="w-full h-48 sm:h-full object-contain bg-gray-50"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-full flex items-center justify-center bg-gray-50">
                      <FaCalendarAlt className="text-4xl text-gray-300" />
                    </div>
                  )}
                </div>

                <div className="flex-1 p-5 sm:p-6">
                  <div className="mb-4">
                    <span className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded mb-3">
                      {isEditing ? (
                        <EditableText
                          value={activity.date}
                          onSave={(val) => updateActivity(index, "date", val)}
                        />
                      ) : (
                        activity.date || "Date to be updated"
                      )}
                    </span>

                    <div className="text-lg sm:text-xl font-bold text-gray-800 leading-snug tracking-tight">
                      {isEditing ? (
                        <EditableText
                          value={activity.title}
                          onSave={(val) => updateActivity(index, "title", val)}
                          multiline
                          className="w-full"
                        />
                      ) : (
                        activity.title
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex items-start gap-2.5">
                      <FaUsers className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 w-full">
                        <p className="font-semibold text-gray-800 mb-2">
                          Participants
                        </p>
                        {isEditing ? (
                          <MarkdownEditor
                            value={activity.participants}
                            onSave={(val) =>
                              updateActivity(index, "participants", val)
                            }
                            placeholder="Add participant details..."
                          />
                        ) : (
                          renderActivityMarkdown(activity.participants)
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <FaUserGraduate className="text-orange-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 w-full">
                        <p className="font-semibold text-gray-800 mb-2">
                          Organized by
                        </p>
                        {isEditing ? (
                          <MarkdownEditor
                            value={activity.organizer}
                            onSave={(val) =>
                              updateActivity(index, "organizer", val)
                            }
                            placeholder="Add organizer details..."
                          />
                        ) : (
                          renderActivityMarkdown(activity.organizer)
                        )}
                      </div>
                    </div>

                    {(activity.resource || isEditing) && (
                      <div className="flex items-start gap-2.5">
                        <FaChalkboardTeacher className="text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 w-full">
                          <p className="font-semibold text-gray-800 mb-2">
                            Resource Person
                          </p>
                          {isEditing ? (
                            <MarkdownEditor
                              value={activity.resource}
                              onSave={(val) =>
                                updateActivity(index, "resource", val)
                              }
                              placeholder="Add resource person details..."
                            />
                          ) : (
                            renderActivityMarkdown(
                              activity.resource,
                              "Not specified",
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More / Show Less */}
        {activitiesData.length > 6 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() =>
                setActivitiesVisible((prev) =>
                  prev >= activitiesData.length
                    ? 6
                    : Math.min(prev + 6, activitiesData.length),
                )
              }
              className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 text-sm"
            >
              {activitiesVisible >= activitiesData.length
                ? "Show Less"
                : `Load More (${activitiesData.length - activitiesVisible} more)`}
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxActivity !== null &&
            (() => {
              const activity = activitiesData[lightboxActivity];
              if (!activity) return null;
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                  onClick={() => setLightboxActivity(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
                      <span className="text-sm text-gray-500">
                        {lightboxActivity + 1} / {activitiesData.length}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            setLightboxActivity((prev) =>
                              prev > 0 ? prev - 1 : activitiesData.length - 1,
                            )
                          }
                          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <FaChevronLeft className="text-gray-500 text-sm" />
                        </button>
                        <button
                          onClick={() =>
                            setLightboxActivity((prev) =>
                              prev < activitiesData.length - 1 ? prev + 1 : 0,
                            )
                          }
                          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <FaChevronRight className="text-gray-500 text-sm" />
                        </button>
                        <button
                          onClick={() => setLightboxActivity(null)}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors ml-1"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>

                    {activity.image ? (
                      <div className="bg-gray-100">
                        <img
                          src={getRenderedAshActivityImage(activity)}
                          alt={activity.title}
                          className="w-full max-h-[50vh] object-contain mx-auto"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gray-50 flex items-center justify-center">
                        <FaCalendarAlt className="text-5xl text-gray-300" />
                      </div>
                    )}

                    <div className="p-6 space-y-4 overflow-y-auto max-h-[35vh]">
                      <div>
                        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded mb-2">
                          {activity.date}
                        </span>
                        <h3 className="text-xl font-bold text-gray-800 leading-snug">
                          {activity.title}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2.5 p-3 bg-blue-50 rounded-lg">
                          <FaUsers className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-blue-600 uppercase">
                              Participants
                            </p>
                            <div className="mt-1">
                              {renderActivityMarkdown(activity.participants)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 bg-orange-50 rounded-lg">
                          <FaUserGraduate className="text-orange-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-orange-600 uppercase">
                              Organized by
                            </p>
                            <div className="mt-1">
                              {renderActivityMarkdown(activity.organizer)}
                            </div>
                          </div>
                        </div>
                        {activity.resource && (
                          <div className="flex items-start gap-2.5 p-3 bg-green-50 rounded-lg sm:col-span-2">
                            <FaChalkboardTeacher className="text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-green-600 uppercase">
                                Resource Person
                              </p>
                              <div className="mt-1">
                                {renderActivityMarkdown(activity.resource)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })()}
        </AnimatePresence>
      </div>
    ),
  };

  const renderContent = () => {
    if (content[activeTab]) {
      return content[activeTab];
    }
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
        <div className="flex items-center mb-3">
          <FaLightbulb className="text-3xl text-yellow-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-800">Coming Soon</h3>
        </div>
        <p className="text-gray-600">
          This section is under development and will be updated soon with
          comprehensive information.
        </p>
      </div>
    );
  };

  const SidebarLink = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`relative w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between group overflow-hidden
        ${
          activeTab === id
            ? "bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white shadow-lg border-l-4 border-ssgmce-orange"
            : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 hover:text-ssgmce-blue hover:shadow-md hover:scale-[1.02]"
        }`}
    >
      <span className="flex items-center relative z-10">
        <span
          className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${activeTab === id ? "bg-white shadow-md" : "bg-gray-400 group-hover:bg-ssgmce-orange group-hover:shadow-sm"}`}
        ></span>
        {label}
      </span>
      {activeTab === id && <FaAngleRight className="opacity-90 text-white" />}
    </button>
  );

  return (
    <GenericPage
      title="Applied Sciences and Humanities"
      backgroundImage={appliedSciencesBanner}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:gap-12">
        <div className="order-1 lg:order-1 lg:w-1/4">
          <DepartmentTabsSidebar
            title="Applied Sciences"
            activeTab={activeTab}
            onTabChange={setActiveTab}
            academicsLinks={academicsLinks}
            industryLinks={industryLinks}
            industryTitle="Academic Activities"
          />
        </div>

        {/* Main Content Area (Right Side) */}
        <div className="lg:w-3/4 order-2 lg:order-2 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </GenericPage>
  );
};

export { APPLIED_DEFAULT_FACULTY };
export default AppliedSciences;
