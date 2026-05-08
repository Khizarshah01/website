import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import apiClient from "../../utils/apiClient";
import GenericPage from "../../components/GenericPage";
import { useDepartmentData } from "../../hooks/useDepartmentData";
import EditableText from "../../components/admin/EditableText";
import EditableImage from "../../components/admin/EditableImage";
import MarkdownEditor from "../../components/admin/MarkdownEditor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mbaBanner from "../../assets/images/departments/mba/MBA banner.png";
import {
  defaultFaculty as MBA_DEFAULT_FACULTY,
  defaultPrideToppers,
  defaultPrideAlumni,
  mbaPrideToppersToMarkdown,
  mbaPrideAlumniToMarkdown,
  defaultActivities,
  defaultNewsletters,
  defaultAchievements,
  defaultMbaPatents,
  defaultMbaPublications,
  defaultMbaConferences,
  defaultMbaBooks,
  defaultMbaCopyrights,
  defaultOverviewTableBE,
  defaultOverviewTableME,
  defaultOverviewTablePhD,
  defaultVision,
  defaultMission,
  defaultPeo,
  defaultPo,
} from "../../data/mbaDefaults";
import { getPathWithTab, getRequestedTab } from "../../utils/navigation";
import { defaultPlacements } from "../../data/mbaPlacements";
import { AnimatePresence, motion } from "framer-motion";
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
  FaIdCard,
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
  FaExternalLinkAlt,
  FaBook,
  FaUpload,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

// Import HOD photo
import hodPhoto from "../../assets/images/departments/mba/HOD_MBA.png";

// Import Faculty Photos
import pmkPhoto from "../../assets/images/departments/mba/faculty/PMK.jpg";
import lbdPhoto from "../../assets/images/departments/mba/faculty/LBDeshmukh.jpg";
import madPhoto from "../../assets/images/departments/mba/faculty/MADande.jpg";
import ssmPhoto from "../../assets/images/departments/mba/faculty/SSMishra.jpg";
import vvpPhoto from "../../assets/images/departments/mba/faculty/VVPatil.jpg";
import wzsPhoto from "../../assets/images/departments/mba/faculty/WZSuliya.jpg";
import bhPhoto from "../../assets/images/departments/mba/faculty/BilalHusain.jpg";
import absPhoto from "../../assets/images/departments/mba/faculty/AdeshSolanke.jpg";
import upPhoto from "../../assets/images/departments/mba/faculty/UdayPatil.jpg";
import mmPhoto from "../../assets/images/departments/mba/faculty/MohiniModak.jpg";

// Photo map for resolving MBA faculty photo string references
const mbaPhotoMap = {
  PMK: pmkPhoto,
  LBD: lbdPhoto,
  MAD: madPhoto,
  SMM: ssmPhoto,
  VVP: vvpPhoto,
  WZS: wzsPhoto,
  BH: bhPhoto,
  ABS: absPhoto,
  UP: upPhoto,
  MMM: mmPhoto,
};

// Resolve MBA faculty photos from string references to actual imports
const resolvedMbaFaculty = MBA_DEFAULT_FACULTY.map((f) => ({
  ...f,
  photo: mbaPhotoMap[f.photo] || f.photo,
}));

// ---- MBA Pride Markdown helpers ----
function mbaParsePrideSections(markdown = "") {
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

const mbaPrideTableComponents = {
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

function MbaPrideMdView({ markdown = "" }) {
  const sections = mbaParsePrideSections(markdown);
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
              components={mbaPrideTableComponents}
            >
              {sec.body}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
// ---- End MBA Pride Markdown helpers ----

const defaultMbaIndustrialVisits = [
  {
    sn: "01",
    title: "Industrial Tour to KALASH SEEDS, Jalna",
    date: "January 2025",
    report:
      "/uploads/documents/mba/industrial-visits/mba_iv_kalash_seeds_jan2025.pdf",
  },
  {
    sn: "02",
    title: "Experiential Study Visit to Reliance Trends, Shegaon",
    date: "January 2025",
    report:
      "/uploads/documents/mba/industrial-visits/mba_iv_reliance_trends_jan2025.pdf",
  },
  {
    sn: "03",
    title: "Experiential Study Visit to Peter England, Shegaon",
    date: "January 2025",
    report:
      "/uploads/documents/mba/industrial-visits/mba_iv_peter_england_jan2025.pdf",
  },
  {
    sn: "04",
    title:
      "Visit to AAVISHKAR Social, Cultural and Specially Abled Organization, Shegaon",
    date: "December 2024",
    report: "/uploads/documents/mba/industrial-visits/mba_iv_aavishkar_dec2024.pdf",
  },
  {
    sn: "05",
    title: "Visit to Brahmakumari, Shegaon",
    date: "November 2024",
    report:
      "/uploads/documents/mba/industrial-visits/mba_iv_brahmakumari_nov2024.pdf",
  },
  {
    sn: "06",
    title:
      "Industrial Tour to Mahatma Gandhi Institute for Rural Industrialization (MGIRI), Wardha",
    date: "--",
    report: "/uploads/documents/mba/industrial-visits/mba_iv_mgiri_wardha.pdf",
  },
  {
    sn: "07",
    title: "Industrial Tour to Super Thermal Power, Chandrapur and Anandwan, Warora",
    date: "04/02/2019 to 05/02/2019",
    report:
      "/uploads/documents/mba/industrial-visits/mba_iv_chandrapur_warora_feb2019.pdf",
  },
  {
    sn: "08",
    title:
      "Industrial Visit to Jain Irrigation and Gandhi Research Foundation, Jalgaon",
    date: "22/10/2018",
    report:
      "/uploads/documents/mba/industrial-visits/mba_iv_jain_irrigation_jalgaon_2018.pdf",
  },
  {
    sn: "09",
    title: "Industrial Tour to Adani Port Special Economic Zone, Mundra, Kutch, Gujarat",
    date: "15/03/2017 to 18/03/2017",
    report: "",
  },
];

const mbaExtractMarkdownLinkHref = (value = "") => {
  const match = String(value || "").match(/\[.*?\]\((.*?)\)/);
  return match?.[1]?.trim?.() || "";
};

const mbaParseMarkdownTableRow = (line = "") =>
  String(line || "")
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const mbaIndustrialVisitsToMarkdown = (visits = []) => {
  const lines = [
    "## Industry Interaction and Tours",
    "",
    "| Visit / Tour Details | Date | Report |",
    "|----------------------|------|--------|",
  ];

  if (!visits.length) {
    lines.push("| No visits added yet. | - | - |");
    return lines.join("\n");
  }

  visits.forEach((visit) => {
    const reportCell = visit?.report ? `[View Report](${visit.report})` : "-";
    lines.push(
      `| ${visit?.title || "-"} | ${visit?.date || "-"} | ${reportCell} |`,
    );
  });

  return lines.join("\n");
};

const parseMbaIndustrialVisitsMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];

  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );

  return dataLines
    .map((line) => mbaParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 3)
    .map((cells) => ({
      title: cells[0] || "",
      date: cells[1] || "",
      report: mbaExtractMarkdownLinkHref(cells.slice(2).join(" | ")),
    }))
    .filter((visit) => visit.title || visit.date || visit.report);
};

const createMbaIndustrialVisitId = () =>
  `mba-industrial-visit-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getMbaIndustrialVisitSignature = (visit = {}) =>
  JSON.stringify({
    title: String(visit?.title || "").trim().toLowerCase(),
    date: String(visit?.date || "").trim().toLowerCase(),
  });

const defaultMbaMous = [
  { no: "1.", org: "Bajaj Finance Limited and Bajaj Finserv Limited", date: "16-June-2025", report: "/uploads/documents/mba_mous/MOU_Bajaj_Finance_2025.pdf" },
  { no: "2.", org: "Kalash Seeds Pvt. Ltd., Mantha Road, Jalna, M.S.", date: "04-Jan-2025", report: "/uploads/documents/mba_mous/MOU_Kalash_Seeds_2025.pdf" },
  { no: "3.", org: "Saturday Club Global Trust â€” Co-operation in Research and Education", date: "12-Jan-2024", report: "/uploads/documents/mba_mous/MOU_Saturday_Club_Global_Trust_2024.pdf" },
  { no: "4.", org: "Circular Angel Pvt Ltd., Mumbai â€” Research, Education and Real-time Consultancy", date: "13-Jan-2024", report: "/uploads/documents/mba_mous/MOU_Circular_Angel_2024.pdf" },
  { no: "5.", org: "Leben Life Sciences, Akola", date: "17-Feb-2023", report: "/uploads/documents/mba_mous/MOU_Leben_Life_Sciences_2023.pdf" },
  { no: "6.", org: "Lyceum of the Philippines University â€” Laguna", date: "14-July-2022", report: "/uploads/documents/mba_mous/MOU_LPU_Laguna_Philippines_2022.pdf" },
];

const mbaMousToMarkdown = (mous = []) => {
  const lines = ["## MoUs", "", "| Name of the Organization | MOU Signing Date | MOU Copy / Report |", "|--------------------------|------------------|-------------------|"];
  if (!mous.length) return [...lines, "| No MoUs added yet. | - | - |"].join("\n");
  mous.forEach((mou) => lines.push(`| ${mou?.org || "-"} | ${mou?.date || "-"} | ${mou?.report ? `[View Document](${mou.report})` : "-"} |`));
  return lines.join("\n");
};

const parseMbaMousMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return dataLines.map((line) => mbaParseMarkdownTableRow(line)).filter((cells) => cells.length >= 3).map((cells) => ({ org: cells[0] || "", date: cells[1] || "", report: mbaExtractMarkdownLinkHref(cells.slice(2).join(" | ")) })).filter((mou) => mou.org || mou.date || mou.report);
};

const createMbaMouId = () =>
  `mba-mou-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getMbaMouSignature = (mou = {}) =>
  JSON.stringify({ org: String(mou?.org || "").trim().toLowerCase(), date: String(mou?.date || "").trim().toLowerCase() });

const defaultMbaRankings = [
  {
    year: "2025",
    survey:
      "Indian Institutional Ranking Framework (IIRF) Top MBA Colleges in India 2025",
    linkLabel: "more details",
    linkUrl:
      "/uploads/documents/mba_ranking/IIRF_Best_B-School_Ranking_2025.pdf",
    ranking:
      "Ranked 47th in the State, 111th Rank among all Private B-schools in India",
  },
  {
    year: "2024",
    survey:
      "Indian Institutional Ranking Framework (IIRF) Top MBA Colleges in India 2024",
    linkLabel: "more details",
    linkUrl:
      "/uploads/documents/mba_ranking/IIRF_Best_B-School_Ranking_2024.pdf",
    ranking:
      "Ranked 35th in the State, 108th Rank among all Private B-schools in India",
  },
  {
    year: "2023",
    survey:
      "Indian Institutional Ranking Framework (IIRF) Top MBA Colleges in India 2023 - Survey conducted during September-October 2022",
    linkLabel: "more details",
    linkUrl:
      "/uploads/documents/mba_ranking/IIRF_Best_B-School_Ranking_2023.pdf",
    ranking:
      "Ranked 30th in the West Zone, 108th Rank among all Private B-schools in India",
  },
  {
    year: "2022",
    survey: "Fortune India Best B-School Ranking, August-September 2022",
    linkLabel: "more details",
    linkUrl:
      "/uploads/documents/mba_ranking/Fortune_India_Best_B-School_Ranking_2022.pdf",
    ranking:
      "Only institute from Vidarbha, Maharashtra appearing in the Fortune India Best B-School Ranking 2022",
  },
  {
    year: "2022",
    survey:
      "Business School Rankings by Business today published as on 29th Oct 2022",
    linkLabel: "more details",
    linkUrl: "https://www.businesstoday.in/bt-schools",
    ranking: "Ranked among Top 100 B-school in India in Living as well as ROI",
  },
  {
    year: "2021",
    survey: "SSGMCE ranking in DATA QUEST T- School Employability Ranking 2021",
    linkLabel: "more details",
    linkUrl:
      "/uploads/documents/mba_ranking/DataQuest_T-School_Ranking_2021.pdf",
    ranking:
      "Rank-73 : Private Sector\nRank - 81 : Government and private institutes",
  },
  {
    year: "2018",
    survey:
      "Outlook-Drshti Survey 2018 ranks DBA&R at 86th amongst Indias Top 100 Management Schools",
    linkLabel: "Click here for Details",
    linkUrl: "/uploads/documents/mba_ranking/Outlook_Drshti_Survey_2018.pdf",
    ranking: "Ranked 86th",
  },
  {
    year: "2018",
    survey: "Business Today ranks Shegaon MBA amongst top 100 B-Schools in India",
    linkLabel: "Click here for Details",
    linkUrl: "/uploads/documents/mba_ranking/Business_Today_Ranking_2018.pdf",
    ranking: "Ranked 80th",
  },
  {
    year: "2017",
    survey:
      "HONOURED AS MANAGEMENT COLLEGE OF THE YEAR 2017 -Program Efficacy by Higher Education Review Magazine, Nov. 2017",
    linkLabel: "Click here for Details",
    linkUrl:
      "/uploads/documents/mba_ranking/Higher_Education_Review_2017.pdf",
    ranking: "",
  },
  {
    year: "2017",
    survey:
      "Business Today-MDRA ranks DBA&R, SSGMCE, Shegaon amongst Best B-Schools of India",
    linkLabel: "Click here for Details",
    linkUrl: "/uploads/documents/mba_ranking/BT_MDRA_Ranking_2017.pdf",
    ranking: "Ranked at 146th position",
  },
  {
    year: "2017",
    survey:
      "DBA&R, Shegaon amongst India's Top 100 B-Schools for fourth consecutive year - Outlook-Drshti Survey 2017",
    linkLabel: "Click here for Details",
    linkUrl: "#",
    ranking:
      "Ranked at 92nd place amongst all the top business schools of our country.",
  },
];

const defaultMbaAccreditations = [
  {
    id: "mba-acc-2022",
    year: "2022",
    recognition: "Program Accreditation by NBA, New Delhi",
    effectivePeriod: "Sept. 2013 for three years",
    score: "771 out of 1000",
  },
  {
    id: "mba-acc-2013",
    year: "2013",
    recognition: "Program Accreditation by NBA, New Delhi",
    effectivePeriod: "Sept. 2013 for three years",
    score: "771 out of 1000",
  },
  {
    id: "mba-acc-2010",
    year: "2010",
    recognition: "Institutional Accreditation by NAAC, Bengaluru",
    effectivePeriod: "Oct. 2010 for five years",
    score: "B+ Grade",
  },
  {
    id: "mba-acc-2007",
    year: "2007",
    recognition: "Program Accreditation by NBA, New Delhi",
    effectivePeriod: "May 2007 for three years",
    score: "748 out of 1000 (B Grade)",
  },
  {
    id: "mba-acc-2003",
    year: "2003",
    recognition: "Institutional Accreditation by NAAC, Bengaluru",
    effectivePeriod: "Nov. 2003 for five years",
    score: "B+ Grade",
  },
  {
    id: "mba-acc-2002-teqip",
    year: "2002",
    recognition:
      "Selected as Network Institution under TEQIP, MHRD, Govt. of India",
    effectivePeriod: "March 2002 to Feb. 2007",
    score: "First Phase of TEQIP",
  },
  {
    id: "mba-acc-2002-nba",
    year: "2002",
    recognition: "Program Accreditation by NBA, New Delhi",
    effectivePeriod: "May 2002 for three years",
    score: "-",
  },
  {
    id: "mba-acc-2002-iso",
    year: "2002",
    recognition: "ISO 9001:2000 Certified",
    effectivePeriod: "March 2002 to Feb. 2005",
    score: "JAS-ANZ",
  },
  {
    id: "mba-acc-2000",
    year: "2000",
    recognition: "UGC Recognition under Section 12B",
    effectivePeriod: "Nov. 2000",
    score: "College Recognition",
  },
  {
    id: "mba-acc-1994-affiliation",
    year: "1994",
    recognition: "Affiliation to Sant Gadge Baba Amravati University",
    effectivePeriod: "August 1994",
    score: "Permanent Affiliation",
  },
  {
    id: "mba-acc-1994-aicte",
    year: "1994",
    recognition: "AICTE, New Delhi Approval",
    effectivePeriod: "w.e.f. 31.3.1994",
    score: "First Approval",
  },
  {
    id: "mba-acc-1989",
    year: "1989",
    recognition: "UGC Recognition Section 2f",
    effectivePeriod: "Feb. 1989",
    score: "College Recognition",
  },
];

const defaultMbaMdpCepFdpPrograms = [
  {
    id: "mba-mdp-1",
    title: "Management Development Program on Financial Management",
    coordinator: "Prof. S. M. Mishra",
    participants: "20",
  },
  {
    id: "mba-mdp-2",
    title: "Business Skill Development Program",
    coordinator: "Prof. P. M. Kuchar",
    participants: "25",
  },
  {
    id: "mba-mdp-3",
    title: "Entrepreneurship Development Program",
    coordinator: "Prof. L.B. Deshmukh",
    participants: "25",
  },
  {
    id: "mba-mdp-4",
    title: "Industrial Motivation Campaign",
    coordinator: "Prof. M. L. Herode",
    participants: "120",
  },
];

const defaultMbaFdpPrograms = [
  {
    id: "mba-fdp-1",
    title: "Case Development and Analysis in Management Education",
    coordinator: "Prof. M. L. Herode",
    participants: "26",
  },
];

const defaultMbaWorkshopPrograms = [
  {
    id: "mba-workshop-1",
    title: "Workshop on Microsoft Excel",
    coordinator: "Dr. Bilal T. Husain",
    participants: "17 students cleared",
    report:
      "/uploads/documents/mba_workshops/workshops_Workshop_on_Microsoft_Excel.pdf",
  },
  {
    id: "mba-workshop-2",
    title: "Accelerated Training and Development Program (ALDP)",
    coordinator: "Prof. Wechansing Suliya",
    participants: "36 students participated",
    report:
      "/uploads/documents/mba_workshops/workshops_Accelerated_training_and_development_program(ALDP).pdf",
  },
  {
    id: "mba-workshop-3",
    title:
      "International Workshop on Business Analytics by DBAR, SSGMCE-Shegaon and Lyceum of the Philippines University - Laguna",
    coordinator: "Dr. Bilal T. Husain",
    participants: "54 students participated",
    report:
      "/uploads/documents/mba_workshops/workshops_International_Workshop_on_Business_Analytics_by_DBAR,_SSGMCE-Shegaon_and_Lyceum_of_the_Philippines_University-_Laguna.pdf",
  },
  {
    id: "mba-workshop-4",
    title: "Workshop on Holistic Management",
    coordinator: "Dr. Mayur A. Dande",
    participants: "58 students participated",
    report:
      "/uploads/documents/mba_workshops/workshops_Workshop_on_Holistic_Management.pdf",
  },
  {
    id: "mba-workshop-5",
    title: "A Session on Digital Marketing",
    coordinator:
      "Mr. Subhash Gore, Secretary, Saturday Club Global Trust, Akola Chapter",
    participants: "MBA Department students participated",
    report:
      "/uploads/documents/mba_workshops/workshops_A_SESSION_ON_DIGITAL_MARKETING.pdf",
  },
  {
    id: "mba-workshop-6",
    title: "A Session on Website Creation and Creative Social Media Use",
    coordinator:
      "Mr. Subhash Gore, Saturday Club Global Trust, Akola Chapter; Mrs. Mohini Modak, Founder, Webmasterkey, Akola",
    participants: "MBA Department students participated",
    report:
      "/uploads/documents/mba_workshops/workshops_A_SESSION_ON_WEBSITE_CREATION_AND_CREATIVE_SOCIAL_MEDIA_USE.pdf",
  },
];

const defaultMbaConsultancyByYear = {
  "2018 - 2019": [
    {
      org: "Securities Exchange Board Of India, Mumbai",
      faculty: 'Dr. H. M. Jha "Bidyarthi"',
      remarks: "Financial Awareness Workshop",
    },
    {
      org: "Kalash Seeds, Jalna",
      faculty: "Prof. M.A. Dande",
      remarks: "Assistance in Sales Promotion",
    },
    {
      org: "Yadav Academy",
      faculty: "Prof. M.A. Dande",
      remarks: "Career Counselling",
    },
    {
      org: "Saraswati College, Shegaon",
      faculty:
        "Dr. P.V. Bokad, Dr. L.B. Deshmukh, Prof. S.M. Mishra, Prof. V.V. Patil, Prof. W.Z. Suliya",
      remarks: "Regular Classes Of BBA",
    },
    {
      org: "Nutan Udyog, Shegaon",
      faculty:
        'Dr. H. M. Jha "Bidyarthi", Prof. M.A. Dande, Prof. V.V. Patil',
      remarks: "Marketing Assistance",
    },
    {
      org: "Rathi Cycles, Khamgaon",
      faculty: "Prof. S.M. Mishra, Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
    {
      org: "Kunal Electronics, Khamgaon",
      faculty: "Prof. S.M. Mishra, Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
    {
      org: "Gurudev Motor Driving School, Shegaon",
      faculty: "Prof. S.M. Mishra, Prof. M.A. Dande, Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
    {
      org: "Reliance Jio, Shegaon",
      faculty: "Prof. S.M. Mishra, Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
  ],
  "2017 - 2018": [
    {
      org: "Securities Exchange Board Of India, Mumbai",
      faculty: 'Dr. H. M. Jha "Bidyarthi"',
      remarks: "Financial Awareness Workshop",
    },
    {
      org: "Kalash Seeds, Jalna",
      faculty:
        'Dr. H. M. Jha "Bidyarthi", Prof. M.A. Dande, Prof. S.M. Mishra, Prof. P.M. Kuchar',
      remarks: "Assistance in Sales Promotion",
    },
    {
      org: "Yadav Academy",
      faculty: "Prof. M.A. Dande",
      remarks: "Career Counselling",
    },
    {
      org: "Saraswati College, Shegaon",
      faculty:
        "Dr. P.V. Bokad, Dr. L.B. Deshmukh, Prof. S.M. Mishra, Prof. V.V. Patil, Prof. W.Z. Suliya",
      remarks: "Regular Classes Of BBA",
    },
    {
      org: "Nutan Udyog, Shegaon",
      faculty:
        'Dr. H. M. Jha "Bidyarthi", Prof. M.A. Dande, Prof. V.V. Patil',
      remarks: "Marketing Assistance",
    },
    {
      org: "Mandar Sports, Shegaon",
      faculty: "Prof. S.M. Mishra, Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
    {
      org: "Sarda's Career Point",
      faculty: "Prof. S.M. Mishra, Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
    {
      org: "Maggi Corner, Shegaon",
      faculty: "Prof. S.M. Mishra, Prof. M.A. Dande, Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
    {
      org: "Hot Chips, Shegaon",
      faculty: "Prof. V.V. Patil, Prof. W.Z. Suliya",
      remarks: "Marketing Assistance",
    },
    {
      org: "Kanchan Electronics, Akola",
      faculty: "Prof. V.V. Patil, Prof. W.Z. Suliya",
      remarks: "Marketing Assistance",
    },
    {
      org: "Singar Sadan, Khamgaon",
      faculty: "Prof. W.Z. Suliya",
      remarks: "Marketing Assistance",
    },
    {
      org: "Bappa Dabeli, Akola",
      faculty: "Prof. V.V. Patil, Prof. W.Z. Suliya, Prof. M.A. Dande",
      remarks: "Marketing Assistance",
    },
    {
      org: "Indira Co. Op. Society, Shegaon",
      faculty: "Prof. S.M. Mishra, Prof. M.A. Dande, Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
    {
      org: "Hend Suzuki",
      faculty: "Prof. S.M. Mishra, Prof. M.A. Dande, Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
    {
      org: "IPL Auction",
      faculty: "Prof. S.M. Mishra, Prof. M.A. Dande, Prof. P.M. Kuchar",
      remarks: "Event Management",
    },
  ],
  "2016 - 2017": [
    {
      org: "Securities Exchange Board of India, Mumbai",
      faculty: 'Dr. H. M. Jha "Bidyarthi"',
      remarks: "Post TDS, 15 FE Workshops conducted",
    },
    {
      org: "Consumer Guidance Society of India, Mumbai",
      faculty: 'Dr. H. M. Jha "Bidyarthi", Prof. S. M. Mishra',
      remarks: "Consumer Awareness Workshop conducted",
    },
    {
      org: "SNG Packaging Pvt. Ltd., Khamgaon",
      faculty: "Dr. P. V. Bokad and Prof. W. Z. Suliya",
      remarks: "HR Consultancy",
    },
    {
      org: "M. M. Industries, Akola",
      faculty:
        "Prof. M. A. Dande, Prof. P. M. Kuchar and Prof. S. M. Mishra",
      remarks: "HR Consultancy",
    },
    {
      org: "Web Master Key, Akola (Subhash Gore)",
      faculty: "Prof. M. A. Dande",
      remarks: "Summer Internship by students (03)",
    },
    {
      org: "Saraswati College, Shegaon",
      faculty:
        "Prof. L. B. Deshmukh, Prof. S. M. Mishra and Prof. V. V. Patil",
      remarks: "Regular classes of BBA",
    },
    {
      org: "Saraswati College, Shegaon",
      faculty:
        "Prof. M. A. Dande, Prof. P. M. Kuchar and Prof. S. M. Mishra",
      remarks: "MBA Coaching classes",
    },
    {
      org: "Reliance Jio, Shegaon",
      faculty: "Prof. S. M. Mishra",
      remarks: "Summer Internship by students (03)",
    },
    {
      org: "TNS India (Mrs. Usha Ingole)",
      faculty: "Prof. M. A. Dande",
      remarks: "Logo and Product launch consultancy",
    },
    {
      org: "Internshala",
      faculty: "Prof. M. A. Dande",
      remarks: "Content writing, Career counseling talk, Nursery consultancy",
    },
  ],
  "2015 - 2016": [
    {
      org: "Securities Exchange Board Of India, Mumbai",
      faculty: 'Dr. H. M. Jha "Bidyarthi"',
      remarks: "Financial Awareness Workshop",
    },
    {
      org: "Kalash Seeds, Jalna",
      faculty:
        'Dr. H. M. Jha "Bidyarthi", Prof. M.A. Dande, Dr. P.V. Bokad, Prof. V.V. Patil',
      remarks: "Assistance in Sales Promotion",
    },
    {
      org: "Bajaj Finserv",
      faculty: "Prof. S.M. Mishra",
      remarks: "Summer Internship Projects",
    },
    {
      org: "Reliance Jio",
      faculty: "Prof. S.M. Mishra",
      remarks: "Summer Internship Projects",
    },
    {
      org: "Havells - Jagadamba Services And Care",
      faculty:
        'Dr. H. M. Jha "Bidyarthi", Prof. M.A. Dande, Prof. V.V. Patil',
      remarks: "Marketing Assistance",
    },
    {
      org: "Buldana Urban Co Op Cr So, Shegaon",
      faculty: "Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
    {
      org: "KFC",
      faculty:
        'Dr. H. M. Jha "Bidyarthi", Prof. M.A. Dande, Prof. P.M. Kuchar',
      remarks: "Marketing Assistance",
    },
    {
      org: "Hend Suzuki",
      faculty:
        'Dr. H. M. Jha "Bidyarthi", Prof. M.A. Dande, Prof. P.M. Kuchar',
      remarks: "Marketing Assistance",
    },
    {
      org: "KTM Bikes, Akola",
      faculty: "Prof. S.M. Mishra, Prof. P.M. Kuchar",
      remarks: "Marketing Assistance",
    },
    {
      org: "Sakshi Constructions, Shegaon",
      faculty: "Dr. L.B. Deshmukh, Prof. W.Z. Suliya",
      remarks: "Marketing Assistance",
    },
    {
      org: "Nutan Udyog, Shegaon",
      faculty: "Dr. L.B. Deshmukh, Prof. W.Z. Suliya",
      remarks: "Marketing Assistance",
    },
    {
      org: "ACC Cement",
      faculty: "Prof. V. V. Patil, Prof. W.Z. Suliya",
      remarks: "Marketing Assistance",
    },
  ],
};

const defaultMbaCorporateLeaderSpeaksBySession = {
  "Session 2024-25": [
    {
      speaker: "Mrs. Sudha Murthy Ji",
      topic: "A Philanthropist Speaks on Lessons from Life",
      report:
        "/uploads/documents/mba_corporate_leader_speaks/Session_2024-25_Mrs._Sudha_Murthy_Ji.pdf",
    },
    {
      speaker:
        "Mr. Chirag Lasod, Jain Exports, Neemuch, M.P.; Mr. Rajesh Jadhav, Founder, Surya Consumer Products, MIDC, Buldana; Mr. Soham Belokar, District Officer, PMSA Udyog, Buldana",
      topic: "Guest Talk",
      report:
        "/uploads/documents/mba_corporate_leader_speaks/Session_2024-25_Mr._Chirag_Lasod,_Jain_Exports,_Neemuch,_M._P._Mr._Rajesh_Jadhav,_founder,_Surya_Consumer_Products,_MIDC.pdf",
    },
  ],
  "Session 2020-22": [
    {
      speaker:
        "Mr. Shrikant P. Naphade, Head, Procurement and Contract Management, Tata Power",
      topic: "Work life - An enquiry",
      report: "",
    },
    {
      speaker:
        "Mr. Gaurav Date, Training Manager, Maharashtra EBSCO India",
      topic: "Expanding Horizons with true knowledge",
      report: "",
    },
    {
      speaker:
        "Mr. Amol Sawant, Founder - Nisarg Katta, Member, Tiger Cell, Joint Secretary, Satpuda Foundation",
      topic: "The Nature and Us",
      report: "",
    },
    {
      speaker: "Mrs. Mohini Modak, Founder - Webmasterkey, Akola",
      topic: "Digital Marketing",
      report: "",
    },
    {
      speaker:
        "Mr. K. K. Dave, Dean Academics, Pacific University, Rajasthan",
      topic: "Leadership",
      report: "",
    },
    {
      speaker:
        "Dr. Devesh Kumar Sharma, Senior Vice President, Credit Suisse, Geneva, Switzerland",
      topic: "COVID 19 - India and future",
      report: "",
    },
    {
      speaker:
        "D. Chandramohan Swamy, National Head - Operations, WardWiz India Solutions Pvt. Ltd., Pune",
      topic: "Winning skills to succeed in corporate world",
      report: "",
    },
    {
      speaker:
        "Dr. Ajay Trivedi, Principal and Dean, Dept of Commerce, Parul University, Vadodara, Gujarat",
      topic: "New Perspectives of Management",
      report: "",
    },
  ],
  "Session 2018-2020": [
    {
      speaker:
        "Mr. Subhash Gore, Secretary, Saturday Club Global Trust, Akola Chapter",
      topic: "Opportunities in the digital world",
      report: "",
    },
    {
      speaker:
        "Dr. Ajay Trivedi, Professor and Dean, Faculty of Commerce, Parul University, Baroda, Gujarat",
      topic: 'Webinar on "New Perspectives of Management"',
      report: "",
    },
    {
      speaker:
        "Mr. Prasanna Dharmadhikari, Chembond Chemicals Ltd., Mumbai",
      topic:
        "Opportunities in HR, Skills required for HR personnel and the advanced HR software",
      report: "",
    },
    {
      speaker: "Mr. Prasanna Dharmadhikari, ChemBond, Mumbai",
      topic: "Career Avenues and Emerging trends in HR",
      report: "",
    },
    {
      speaker:
        "Mr. Vaibhav Nichit, Talent Acquisition Partner, HDFC, Nagpur",
      topic: "Pre-requisite for a good job",
      report: "",
    },
    {
      speaker: "Mr. Hemand Sharma, VNURT, Bengaluru",
      topic: "VNURT Role for project and platform to MBA (Motivation for job)",
      report: "",
    },
    {
      speaker: "Mr. Swapnil Meshram, Capgemini, Pune",
      topic: "Latest Trends / Additional Important",
      report: "",
    },
    {
      speaker: "Mr. Prasad Khanzode, Professor, LTM, Wani",
      topic: "Motivation within you",
      report: "",
    },
    {
      speaker: "Mr. Kurien Daniel, Regional Vice President, ISTD",
      topic: "Pre-requisites at workplace in current Era",
      report: "",
    },
    {
      speaker:
        "Mr. Vinod Dubey, Branch Head, SBI Life Insurance, Khamgaon",
      topic: "Career Opportunities - Seminar with SBI Life Insurance",
      report: "",
    },
    {
      speaker: "Mr. Rajiv Jawale, HR Manager, Kalash Seeds, Jalna",
      topic: "Perception about ways of a successful career",
      report: "",
    },
    {
      speaker:
        "Mr. Subhash Gore, Saturday Club Global Trust, Akola Chapter",
      topic: "Entrepreneurship - Prerequisite",
      report: "",
    },
    {
      speaker: "Mr. Shekhar Rajguru, JPM - Jio Reliance, Shegaon",
      topic: "Marketing and Distribution",
      report: "",
    },
    {
      speaker: "Miss Sweta Sharma, Radio Jockey, Radio Orange, Nagpur",
      topic: "Distinguished career opportunities for management aspirant",
      report: "",
    },
    {
      speaker: "Mr. Swapnil Meshram, Capgemini Technology Services, Pune",
      topic: "Fresher's enquiry - A thorough enquiry",
      report: "",
    },
    {
      speaker: "Mrs. Sudha Murthy, Chairperson, Infosys Foundation",
      topic: '"A Philanthropist Speaks - Lessons from Life"',
      report: "",
    },
    {
      speaker:
        "Mr. Shekhar Rajguru, General Manager, Reliance Jio Centre, Shegaon",
      topic: "General Management",
      report: "",
    },
    {
      speaker: "Mr. Mayur Kalore, Cybernetix, Jaipur, Rajasthan",
      topic: "Pre-requisites for entering corporate world",
      report: "",
    },
    {
      speaker: "Mr. Rajiv Pande, GSM, Reliance Jio Centre Khamgaon",
      topic: "Career growth and Motivation",
      report: "",
    },
  ],
  "Session 2016-17": [
    {
      speaker:
        "Mr. Shekhar Rajguru, General Manager, Reliance Jio Centre, Shegaon",
      topic: "Expectations of Corporate from fresher",
      report: "",
    },
    {
      speaker:
        "Mr. Porasnath Singh, Project Manager, Reliance Jio Centre, Shegaon",
      topic: "Opportunities in Telecom industry for MBA students",
      report: "",
    },
    {
      speaker:
        "Mr. Piyush Nagda, CEO & Cofounder, Talking Asset Eduventure Pvt. Ltd., Thane",
      topic:
        "Emerging trends in capital market & career opportunities; Sales as a career choice; Investor awareness programme",
      report: "",
    },
    {
      speaker: "Mr. Nikhil Nair, NSE, Mumbai",
      topic: "Career opportunities in Finance",
      report: "",
    },
    {
      speaker:
        "Mr. Subhash Gore, G.K. Intelligent Systems Pvt. Ltd., Saturday Club Global Trust, Akola",
      topic: "Digital Marketing - I",
      report: "",
    },
    {
      speaker:
        "Ms. Mohini Modak, Training Division, Webmaster Key, Akola",
      topic: "Digital Marketing - II",
      report: "",
    },
    {
      speaker:
        "Swami Tanmayanandji, Secretary, Vivekanand Sewashram, Ambikapur, Chhattisgarh",
      topic: "Bhagwad Gita for the Youth; Karmayoga",
      report: "",
    },
    {
      speaker:
        "Swami Tanmayanandji, Secretary, Vivekanand Sewashram, Ambikapur, Chhattisgarh",
      topic: 'Ancient Indian Education System; "Bhaj Govindam" & Q/A',
      report: "",
    },
    {
      speaker:
        "Mr. Uday Patil, Business Head, Bajaj Finserve Ltd., Pune",
      topic: "General Management & Motivation - I",
      report: "",
    },
    {
      speaker:
        "Mr. Pankaj Yadav, HR Manager, Bajaj Finserve Ltd., Pune",
      topic: "General Management & Motivation - II",
      report: "",
    },
    {
      speaker:
        "Mr. Nitin Wankhade, V.P. - Client Services, Value Momentum Pvt. Ltd., Hyderabad",
      topic:
        "Opportunities for MBA in IT & building broad skills for professional development",
      report: "",
    },
    {
      speaker: "Mr. Uday Sampat, Marketing & Sales Manager, Nashik",
      topic: "Leaders & Managers",
      report: "",
    },
    {
      speaker:
        "Mr. Mayur Kalore, Assist. Sales Manager, Cybernetix, Gujarat",
      topic: "Motivation and expectation of corporate world",
      report: "",
    },
    {
      speaker:
        "Mr. Vivek Dahake, Head Process Development, Essel Propack Ltd., Thane",
      topic: "Project management and Strategic management",
      report: "",
    },
    {
      speaker: "Ms. Dipika Kolhe",
      topic: "How to face Interview?",
      report: "",
    },
    {
      speaker:
        "Mr. Ravindra Adhau, Sr. Credit Analyst, John Deere Finance, Pune",
      topic: "Inside you!",
      report: "",
    },
    {
      speaker: "Mr. Rajiv Jawale, Proprietor, BeBraaand, Jalna",
      topic:
        "Branding Concepts; Need of single roof of branding (Umbrella)",
      report: "",
    },
    {
      speaker:
        "Mr. Samadhan Damdhar, Marketing Manager, BeBraaand, Jalna",
      topic: "Promotional means and their uses",
      report: "",
    },
  ],
};

const createMbaRankingId = () =>
  `mba-ranking-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getMbaRankingSignature = (item = {}) =>
  JSON.stringify({
    year: String(item?.year || "").trim().toLowerCase(),
    survey: String(item?.survey || "").trim().toLowerCase(),
  });

const createMbaAccreditationId = () =>
  `mba-accreditation-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getMbaAccreditationSignature = (item = {}) =>
  JSON.stringify({
    year: String(item?.year || "").trim().toLowerCase(),
    recognition: String(item?.recognition || "").trim().toLowerCase(),
  });

const createMbaWorkshopSectionId = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getMbaProgramSignature = (item = {}) =>
  JSON.stringify({
    title: String(item?.title || "").trim().toLowerCase(),
    coordinator: String(item?.coordinator || "").trim().toLowerCase(),
  });

const mbaEscapeMarkdownTableCell = (value = "") =>
  String(value || "").replace(/\|/g, "\\|").trim();

const mbaExtractMarkdownLinkText = (value = "") => {
  const match = String(value || "").match(/\[(.*?)\]\((.*?)\)/);
  if (match?.[1]) return match[1].trim();
  const cleaned = String(value || "").trim();
  return cleaned === "-" ? "" : cleaned;
};

const mbaRankingsToMarkdown = (items = []) => {
  const lines = [
    "| Year | Name of Survey | Link | Ranking / Grade |",
    "|------|----------------|------|------------------|",
  ];

  if (!items.length) {
    lines.push("| - | No ranking data added yet. | - | - |");
    return lines.join("\n");
  }

  items.forEach((item) => {
    const linkCell = item?.linkUrl
      ? `[${item?.linkLabel || "more details"}](${item.linkUrl})`
      : mbaEscapeMarkdownTableCell(item?.linkLabel || "-") || "-";

    lines.push(
      `| ${mbaEscapeMarkdownTableCell(item?.year || "-")} | ${mbaEscapeMarkdownTableCell(item?.survey || "-")} | ${linkCell} | ${mbaEscapeMarkdownTableCell(item?.ranking || "-")} |`,
    );
  });

  return lines.join("\n");
};

const mbaAccreditationsToMarkdown = (items = []) => {
  const lines = [
    "| Year | Recognition | Effective Period | Score / Grade |",
    "|------|-------------|------------------|---------------|",
  ];

  if (!items.length) {
    lines.push("| - | No recognitions added yet. | - | - |");
    return lines.join("\n");
  }

  items.forEach((item) => {
    lines.push(
      `| ${mbaEscapeMarkdownTableCell(item?.year || "-")} | ${mbaEscapeMarkdownTableCell(item?.recognition || "-")} | ${mbaEscapeMarkdownTableCell(item?.effectivePeriod || "-")} | ${mbaEscapeMarkdownTableCell(item?.score || "-")} |`,
    );
  });

  return lines.join("\n");
};

const mbaThreeColumnProgramsToMarkdown = (items = []) => {
  const lines = [
    "| Title of the Program | Faculty Coordinator | No. of Beneficiaries / Participants |",
    "|----------------------|---------------------|-------------------------------------|",
  ];

  if (!items.length) {
    lines.push("| No entries added yet. | - | - |");
    return lines.join("\n");
  }

  items.forEach((item) => {
    lines.push(
      `| ${mbaEscapeMarkdownTableCell(item?.title || "-")} | ${mbaEscapeMarkdownTableCell(item?.coordinator || "-")} | ${mbaEscapeMarkdownTableCell(item?.participants || "-")} |`,
    );
  });

  return lines.join("\n");
};

const mbaWorkshopProgramsToMarkdown = (items = []) => {
  const lines = [
    "| Title of the Workshop | Faculty Coordinator | No. of Participants | Report |",
    "|-----------------------|---------------------|---------------------|--------|",
  ];

  if (!items.length) {
    lines.push("| No workshops added yet. | - | - | - |");
    return lines.join("\n");
  }

  items.forEach((item) => {
    const reportCell = item?.report
      ? `[View Report](${item.report})`
      : mbaEscapeMarkdownTableCell(item?.reportLabel || "-") || "-";

    lines.push(
      `| ${mbaEscapeMarkdownTableCell(item?.title || "-")} | ${mbaEscapeMarkdownTableCell(item?.coordinator || "-")} | ${mbaEscapeMarkdownTableCell(item?.participants || "-")} | ${reportCell} |`,
    );
  });

  return lines.join("\n");
};

const parseMbaRankingsMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];

  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );

  return dataLines
    .map((line) => mbaParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 4)
    .map((cells) => {
      const linkCell = cells[2] || "";
      return {
        year: cells[0] || "",
        survey: cells[1] || "",
        linkLabel: mbaExtractMarkdownLinkText(linkCell) || "more details",
        linkUrl: mbaExtractMarkdownLinkHref(linkCell),
        ranking: cells.slice(3).join(" | ") || "",
      };
    })
    .filter(
      (item) => item.year || item.survey || item.linkLabel || item.linkUrl || item.ranking,
    );
};

const parseMbaAccreditationsMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];

  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );

  return dataLines
    .map((line) => mbaParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 4)
    .map((cells) => ({
      year: cells[0] || "",
      recognition: cells[1] || "",
      effectivePeriod: cells[2] || "",
      score: cells.slice(3).join(" | ") || "",
    }))
    .filter(
      (item) =>
        item.year || item.recognition || item.effectivePeriod || item.score,
    );
};

const parseMbaThreeColumnProgramsMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];

  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );

  return dataLines
    .map((line) => mbaParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 3)
    .map((cells) => ({
      title: cells[0] || "",
      coordinator: cells[1] || "",
      participants: cells.slice(2).join(" | ") || "",
    }))
    .filter((item) => item.title || item.coordinator || item.participants);
};

const parseMbaWorkshopProgramsMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];

  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );

  return dataLines
    .map((line) => mbaParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 4)
    .map((cells) => ({
      title: cells[0] || "",
      coordinator: cells[1] || "",
      participants: cells[2] || "",
      report: mbaExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
    }))
    .filter(
      (item) => item.title || item.coordinator || item.participants || item.report,
    );
};

const mbaConsultancyToMarkdown = (entries = []) => {
  const lines = [
    "| Consulting Organization | Consultant Faculty | Remarks |",
    "|-------------------------|--------------------|---------|",
  ];

  if (!entries.length) {
    lines.push("| No consultancy entries added yet. | - | - |");
    return lines.join("\n");
  }

  entries.forEach((entry) => {
    lines.push(
      `| ${mbaEscapeMarkdownTableCell(entry?.org || "-")} | ${mbaEscapeMarkdownTableCell(entry?.faculty || "-")} | ${mbaEscapeMarkdownTableCell(entry?.remarks || "-")} |`,
    );
  });

  return lines.join("\n");
};

const parseMbaConsultancyMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];

  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );

  return dataLines
    .map((line) => mbaParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 3)
    .map((cells) => ({
      org: cells[0] || "",
      faculty: cells[1] || "",
      remarks: cells.slice(2).join(" | ") || "",
    }))
    .filter((entry) => entry.org || entry.faculty || entry.remarks);
};

const mbaCorporateLeaderSpeaksToMarkdown = (entries = []) => {
  const lines = [
    "| Name of Speaker | Topic | Report |",
    "|-----------------|-------|--------|",
  ];

  if (!entries.length) {
    lines.push("| No speaker entries added yet. | - | - |");
    return lines.join("\n");
  }

  entries.forEach((entry) => {
    const reportCell = entry?.report ? `[View Report](${entry.report})` : "-";
    lines.push(
      `| ${mbaEscapeMarkdownTableCell(entry?.speaker || "-")} | ${mbaEscapeMarkdownTableCell(entry?.topic || "-")} | ${reportCell} |`,
    );
  });

  return lines.join("\n");
};

const parseMbaCorporateLeaderSpeaksMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];

  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );

  return dataLines
    .map((line) => mbaParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 3)
    .map((cells) => ({
      speaker: cells[0] || "",
      topic: cells[1] || "",
      report: mbaExtractMarkdownLinkHref(cells.slice(2).join(" | ")),
    }))
    .filter((entry) => entry.speaker || entry.topic || entry.report);
};

const defaultCourseMaterials = [
  {
    year: "First Year",
    title: "MBA First Year",
    link: "https://ssgmceacin-my.sharepoint.com/:f:/g/personal/mba_cm_ssgmce_ac_in/EtQmSLd-WshPjxPKL1cvLyABm9hqbiQjpe7e0j5hS6sDfg",
  },
  {
    year: "Second Year",
    title: "MBA Second Year",
    link: "https://ssgmceacin-my.sharepoint.com/:f:/g/personal/mba_cm_ssgmce_ac_in/EgrxHhZnLptLkLMLcR7cCvABRb0lRgjh3P4N1XmfO1dE_w",
  },
];

const defaultMbaProjects = {
  "2023-24": [
    {
      no: 1,
      title:
        "A study on work life balance among working women of Maharashtra Police in Buldhana District",
    },
    {
      no: 2,
      title:
        "A study of impact of social media in knowledge development of farmers",
    },
    {
      no: 3,
      title:
        "A Study of Socio Economic Impact of Road Traffic Congestion in Nandura",
    },
    {
      no: 4,
      title:
        "A Study Of Employee Motivation In Select Banks in Sangrampur region",
    },
    {
      no: 5,
      title:
        "A study of Recruitment and Selection process in HDFC Bank Shegaon",
    },
    {
      no: 6,
      title:
        "A Study on effective role of Human Resource Management in Vikamshi Fabrics Pvt. Ltd.",
    },
    {
      no: 7,
      title:
        "A Study of Implications on Employees Performance and Organizational Productivity wrt Work",
    },
    {
      no: 8,
      title:
        "A study of customer satisfaction in banking industry with special reference to private sector banks in Buldhana district",
    },
    {
      no: 9,
      title: "DIMENSIONS OF WORK FROM HOME CULTURE - A STUDY",
    },
    {
      no: 10,
      title:
        "A study on motivational strategies and their effectiveness on employees productivity in private financial institutions in Akola region.",
    },
    {
      no: 11,
      title:
        "Impact of Social Media on Youth's Social Life and Buying Behaviour - A Study of Khamgaon Region",
    },
    {
      no: 12,
      title:
        "Systematic Study on Attrition of workers of Unorganized Sector in Khamgaon Region",
    },
    {
      no: 13,
      title:
        "A comparative study on job satisfaction of teachers between Government and Private sector in Akola region",
    },
    {
      no: 14,
      title:
        "A study on changing pattern of demand for E-Banking services in Shegaon",
    },
    {
      no: 15,
      title:
        "A STUDY ON STRESS MANAGEMENT TECHNIQUES FOR LABOURS WITH REFERENCE TO PARAS THERMAL POWER STATION",
    },
    {
      no: 16,
      title:
        "Comparative analysis of key players in dairy industry - A study of Khamgaon region",
    },
    {
      no: 17,
      title:
        "A Study of Customer Satisfaction towards Fastrack Watches in Akola Region",
    },
    {
      no: 18,
      title:
        "A study of potential of housewives to establish small scale businesses",
    },
    {
      no: 19,
      title:
        "Prospect of financial inclusion of rural customers - A study of Lanjud village",
    },
    {
      no: 20,
      title:
        "A Study of Self-Help Groups & Women's Empowerment in Rural Area - A Case of Akola",
    },
    {
      no: 21,
      title:
        "A study on effectiveness of competency mapping process on employee's development at Jadhao Gear Amravati",
    },
    {
      no: 22,
      title:
        "A STUDY ON FACTORS INFLUENCING THE INVESTMENT BEHAVIOR OF STUDENTS PURSUING HIGHER EDUCATION IN AMRAVATI.",
    },
    {
      no: 23,
      title: "A Study and design of training programs for employees in SBI, Akot",
    },
    {
      no: 24,
      title:
        "AN ANALYSIS OF BUYING DECISION FOR ELECTRIC TWO WHEELER - A STUDY OF SHEGAON-KHAMGAON REGION",
    },
    {
      no: 25,
      title:
        "A Comparative Study of Customer Perception Regarding Housing Loan Schemes of Public and Private Sector Banks",
    },
    {
      no: 26,
      title:
        "A study of grievance management system with special reference to SBI customers in Shegaon",
    },
    {
      no: 27,
      title:
        "IMPACT OF STRESS ON EMPLOYEES BEHAVIOR IN ORGANIZATION - A STUDY OF KHAMGAON REGION",
    },
    {
      no: 28,
      title:
        "A study and design of Employee Engagement In HUL Company Khamgaon",
    },
    {
      no: 29,
      title: "Perception About Mobile Banking- A Study of Buldhana Region",
    },
    {
      no: 30,
      title:
        "A STUDY ON INVESTMENT PATTERN OF INVESTORS IN GOLD WITH SPECIAL REFERENCE TO MIDDLE CLASS PEOPLE IN BULDHANA REGION",
    },
    {
      no: 31,
      title: "STUDY ON GST AND ITS IMPACT ON MNC MANUFACTURING INDUSTRY",
    },
    {
      no: 32,
      title: "INDIA POST PAYMENT BANK PROBLEM AND PROSPECT IN AKOLA REGION",
    },
    {
      no: 33,
      title:
        "A Study On The Consumer Behaviour Towards Domestic Water Purifiers In Akola Region",
    },
    {
      no: 34,
      title:
        "A study of Training & development Policies in Indorama synthetics Pvt. Ltd. Buttibori, Nagpur",
    },
    {
      no: 35,
      title:
        "A COMPARATIVE STUDY OF SELECT INSURANCE COMPANIES & THEIR PRODUCTS IN BULDHANA REGION.",
    },
    {
      no: 36,
      title:
        "COMPARATIVE ANALYSIS OF FINANCIAL PERFORMANCE OF SELECT PUBLIC SECTOR AND PRIVATE SECTOR BANKS FROM 2017-2022",
    },
    {
      no: 37,
      title:
        "A STUDY ON UNDERSTANDING CUSTOMER SATISFACTION LEVEL REGARDING E-MONEY IN KARANJA REGION",
    },
    {
      no: 38,
      title:
        "Customer Preference towards Ice Creams - A study in Malkapur region with respect to Havmor and Top-n-Town",
    },
    {
      no: 39,
      title:
        "Exploring the factors influencing career choice and motivation of student in the transition phase of education",
    },
    {
      no: 40,
      title:
        "A STUDY ON UNDERSTANDING CUSTOMER SATISFACTION LEVEL REGARDING E-MONEY IN KARANJA REGION",
    },
    {
      no: 41,
      title: "A Study of Insurance as a vehicle of saving in Buldhana District",
    },
    {
      no: 42,
      title:
        "SERVQUAL: An Analytical Study of Public and Private Hospitals in Buldhana District",
    },
    {
      no: 43,
      title:
        "A study of financial analysis with reference to Visaka Industries Ltd. Mauda, Nagpur for a period of 2019 to 2022.",
    },
    {
      no: 44,
      title:
        "A STUDY OF MARKETING STRATEGY OF MAHARAJA MASALA UDOYG IN BULDHANA DISTRICT",
    },
    {
      no: 45,
      title:
        "A STUDY OF DEALERS AND DISTRIBUTION OF AGRO- BUSINESS MARKETING IN MALKAPUR REGION",
    },
    {
      no: 46,
      title:
        "A STUDY INCLINATION OF STAKEHOLDERS TOWARDS EQUITY BASED MUTUAL FUND IN AKOLA REGION",
    },
    {
      no: 47,
      title: "A study on demand of Paver Blocks in Shegaon region",
    },
    {
      no: 48,
      title: "A Study on the Customer Perception towards Electric Bike In Buldhana District",
    },
    {
      no: 49,
      title: "A STUDY OF VARIOUS BANK APPS AND ALLIED CUSTOMER SATISFACTION",
    },
    {
      no: 50,
      title: "A STUDY OF BRAND SWITCHING IN CASE OF SMARTPHONE",
    },
    {
      no: 51,
      title:
        "COMPETITIVE ANALYSIS OF ORGANAIZATION INVOLVED IN NETWORKING SERVICES",
    },
    {
      no: 52,
      title:
        "A comparative study of satisfaction on Asian and Indigo paint in Shegaon region",
    },
    {
      no: 53,
      title:
        "Adoptability of Digital Marketing by the Retailers in Shegaon Region - A Study",
    },
    {
      no: 54,
      title:
        "A STUDY ON THE FACTORS INFLUENCING DECISIONS OF THE INVESTORS TO INVEST IN SIP IN BULDHANA REGION",
    },
  ],
};

const MBA = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() =>
    getRequestedTab(location, "overview")
  );
  const [vmTab, setVmTab] = useState("vision");
  const [poTab, setPoTab] = useState("peo");
  const [showAllPos, setShowAllPos] = useState(false);
  const [expandedSemester, setExpandedSemester] = useState(null);
  const [researchTab, setResearchTab] = useState("toppers");
  const [projectYear, setProjectYear] = useState("2023-24");
  const [showAddUgProjectYear, setShowAddUgProjectYear] = useState(false);
  const [newUgProjectYear, setNewUgProjectYear] = useState("");
  const [ugProjectYearError, setUgProjectYearError] = useState("");
  const [researchYear, setResearchYear] = useState("2023-24");
  const [placementYear, setPlacementYear] = useState(null);
  const [showAddPlacementYear, setShowAddPlacementYear] = useState(false);
  const [newPlacementYear, setNewPlacementYear] = useState("");
  const [placementYearError, setPlacementYearError] = useState("");
  const [showAddConsultancyYear, setShowAddConsultancyYear] = useState(false);
  const [newConsultancyYear, setNewConsultancyYear] = useState("");
  const [consultancyYearError, setConsultancyYearError] = useState("");
  const [showAddLeaderSession, setShowAddLeaderSession] = useState(false);
  const [newLeaderSession, setNewLeaderSession] = useState("");
  const [leaderSessionError, setLeaderSessionError] = useState("");
  const [showAddResearchYear, setShowAddResearchYear] = useState(false);
  const [newResearchYear, setNewResearchYear] = useState("");
  const [researchYearError, setResearchYearError] = useState("");
  const [prideTab, setPrideTab] = useState("toppers");
  const [activitiesVisible, setActivitiesVisible] = useState(6);
  const [lightboxActivity, setLightboxActivity] = useState(null);
  const [achievementTab, setAchievementTab] = useState("faculty");
  const [certificateLightbox, setCertificateLightbox] = useState(null);
  const [patentSubTab, setPatentSubTab] = useState("patents");

  // State for Curriculum (Scheme & Syllabus) management
  const [selectedCurriculumItems, setSelectedCurriculumItems] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [newsletterUploading, setNewsletterUploading] = useState({});
  const [newsletterUploadErrors, setNewsletterUploadErrors] = useState({});
  const [achievementUploading, setAchievementUploading] = useState({});
  const [achievementUploadErrors, setAchievementUploadErrors] = useState({});
  const [achievementUploadSuccess, setAchievementUploadSuccess] = useState({});
  const [industrialVisitReportUploading, setIndustrialVisitReportUploading] =
    useState({});
  const [industrialVisitReportErrors, setIndustrialVisitReportErrors] =
    useState({});
  const [mouReportUploading, setMouReportUploading] = useState({});
  const [mouReportErrors, setMouReportErrors] = useState({});
  const [rankingLinkUploading, setRankingLinkUploading] = useState({});
  const [rankingLinkErrors, setRankingLinkErrors] = useState({});
  const [workshopReportUploading, setWorkshopReportUploading] = useState({});
  const [workshopReportErrors, setWorkshopReportErrors] = useState({});
  const [leaderReportUploading, setLeaderReportUploading] = useState({});
  const [leaderReportErrors, setLeaderReportErrors] = useState({});
  const [researchReportUploading, setResearchReportUploading] = useState({});
  const [researchReportErrors, setResearchReportErrors] = useState({});
  const [shouldScrollToNewCourseMaterial, setShouldScrollToNewCourseMaterial] =
    useState(false);
  const [expandedFacultyEditorIndex, setExpandedFacultyEditorIndex] =
    useState(null);

  useEffect(() => {
    const requestedTab = getRequestedTab(location, "overview");

    setActiveTab((currentTab) =>
      currentTab === requestedTab ? currentTab : requestedTab
    );
  }, [location.search]);
  const latestCourseMaterialRef = useRef(null);

  const defaultResearchYears = [
    "2024-25",
    "2023-24",
    "2022-23",
    "2021-22",
    "2020-21",
    "2019-20",
  ];

  // Load department data (works in both edit and public view modes)
  const {
    data: activeData,
    loading: dataLoading,
    isEditing,
    updateData,
    removeData,
    t,
  } = useDepartmentData("departments-mba");

  // Helper for array updates
  const updateField = (path, value) => {
    updateData(path, value);
  };

  const getMbaIndustrialVisits = () =>
    JSON.parse(JSON.stringify(t("industrialVisits.items", defaultMbaIndustrialVisits))).map(
      (visit) => ({
        ...visit,
        id: String(visit?.id || createMbaIndustrialVisitId()),
      }),
    );

  const getMbaIndustrialVisitsMarkdown = (visits = getMbaIndustrialVisits()) =>
    mbaIndustrialVisitsToMarkdown(visits);

  const persistMbaIndustrialVisits = (visits) => {
    const normalizedVisits = (Array.isArray(visits) ? visits : []).map((visit) => ({
      id: String(visit?.id || createMbaIndustrialVisitId()).trim(),
      title: String(visit?.title || "").trim(),
      date: String(visit?.date || "").trim(),
      report: String(visit?.report || "").trim(),
    }));

    updateData("industrialVisits.items", normalizedVisits);
    updateData("industrialVisits.markdown", mbaIndustrialVisitsToMarkdown(normalizedVisits));
  };

  const handleMbaIndustrialVisitsMarkdownSave = (markdown) => {
    const parsed = parseMbaIndustrialVisitsMarkdown(markdown);
    const existingVisits = getMbaIndustrialVisits();
    const signaturePool = new Map();
    existingVisits.forEach((visit) => {
      const signature = getMbaIndustrialVisitSignature(visit);
      const matches = signaturePool.get(signature) || [];
      matches.push(visit);
      signaturePool.set(signature, matches);
    });
    const usedIds = new Set();
    const mergedVisits = parsed.map((visit, index) => {
      const signature = getMbaIndustrialVisitSignature(visit);
      let match = (signaturePool.get(signature) || []).find(
        (item) => !usedIds.has(item.id),
      );

      if (!match) {
        const fallback = existingVisits[index];
        if (fallback && !usedIds.has(fallback.id)) {
          match = fallback;
        }
      }

      if (match?.id) usedIds.add(match.id);

      return {
        id: match?.id || createMbaIndustrialVisitId(),
        title: visit.title,
        date: visit.date,
        report: visit.report || match?.report || "",
      };
    });
    persistMbaIndustrialVisits(mergedVisits);
  };

  const addMbaIndustrialVisitRowOnTop = () => {
    const visits = getMbaIndustrialVisits();
    persistMbaIndustrialVisits([
      {
        id: createMbaIndustrialVisitId(),
        title: "New visit / tour details",
        date: "Add date",
        report: "",
      },
      ...visits,
    ]);
  };

  const uploadMbaIndustrialVisitReport = async (visitId, file) => {
    if (!file) return;

    const uploadKey = `mba-industrial-visit-${visitId}`;
    setIndustrialVisitReportUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setIndustrialVisitReportErrors((prev) => ({ ...prev, [uploadKey]: "" }));

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

      if (!response.data.fileUrl) {
        throw new Error("Upload did not return a file URL.");
      }

      const visits = getMbaIndustrialVisits();
      persistMbaIndustrialVisits(
        visits.map((visit) =>
          visit.id === visitId
            ? {
                ...visit,
                report: response.data.fileUrl,
              }
            : visit,
        ),
      );
    } catch (error) {
      console.error("MBA industrial visit report upload failed:", error);
      setIndustrialVisitReportErrors((prev) => ({
        ...prev,
        [uploadKey]:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Upload failed",
      }));
    } finally {
      setIndustrialVisitReportUploading((prev) => ({
        ...prev,
        [uploadKey]: false,
      }));
    }
  };

  const getMbaMous = () =>
    JSON.parse(JSON.stringify(t("mous.items", defaultMbaMous))).map((mou) => ({
      ...mou,
      id: String(mou?.id || createMbaMouId()),
    }));

  const getMbaMousMarkdown = (mous = getMbaMous()) => mbaMousToMarkdown(mous);

  const persistMbaMous = (mous) => {
    const normalizedMous = (Array.isArray(mous) ? mous : []).map((mou) => ({
      id: String(mou?.id || createMbaMouId()).trim(),
      org: String(mou?.org || "").trim(),
      date: String(mou?.date || "").trim(),
      report: String(mou?.report || "").trim(),
    }));

    updateData("mous.items", normalizedMous);
    updateData("mous.markdown", mbaMousToMarkdown(normalizedMous));
  };

  const handleMbaMousMarkdownSave = (markdown) => {
    const parsed = parseMbaMousMarkdown(markdown);
    const existingMous = getMbaMous();
    const signaturePool = new Map();

    existingMous.forEach((mou) => {
      const signature = getMbaMouSignature(mou);
      const matches = signaturePool.get(signature) || [];
      matches.push(mou);
      signaturePool.set(signature, matches);
    });

    const usedIds = new Set();
    const mergedMous = parsed.map((mou, index) => {
      const signature = getMbaMouSignature(mou);
      let match = (signaturePool.get(signature) || []).find(
        (item) => !usedIds.has(item.id),
      );

      if (!match) {
        const fallback = existingMous[index];
        if (fallback && !usedIds.has(fallback.id)) {
          match = fallback;
        }
      }

      if (match?.id) usedIds.add(match.id);

      return {
        id: match?.id || createMbaMouId(),
        org: mou.org,
        date: mou.date,
        report: mou.report || match?.report || "",
      };
    });

    persistMbaMous(mergedMous);
  };

  const addMbaMouRowOnTop = () => {
    const mous = getMbaMous();
    persistMbaMous([
      {
        id: createMbaMouId(),
        org: "New organization name",
        date: "Add signing date",
        report: "",
      },
      ...mous,
    ]);
  };

  const uploadMbaMouReport = async (mouId, file) => {
    if (!file) return;

    const uploadKey = `mba-mou-${mouId}`;
    setMouReportUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setMouReportErrors((prev) => ({ ...prev, [uploadKey]: "" }));

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

      if (!response.data.fileUrl) {
        throw new Error("Upload did not return a file URL.");
      }

      const mous = getMbaMous();
      persistMbaMous(
        mous.map((mou) =>
          mou.id === mouId
            ? {
                ...mou,
                report: response.data.fileUrl,
              }
            : mou,
        ),
      );
    } catch (error) {
      console.error("MBA MoU upload failed:", error);
      setMouReportErrors((prev) => ({
        ...prev,
        [uploadKey]:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Upload failed",
      }));
    } finally {
      setMouReportUploading((prev) => ({
        ...prev,
        [uploadKey]: false,
      }));
    }
  };

  const getMbaRankings = () =>
    JSON.parse(JSON.stringify(t("ranking.items", defaultMbaRankings))).map((item) => ({
      ...item,
      id: String(item?.id || createMbaRankingId()),
      linkLabel: String(item?.linkLabel || item?.link || "more details"),
      linkUrl: String(item?.linkUrl || ""),
    }));

  const getMbaRankingsMarkdown = (items = getMbaRankings()) =>
    String(t("ranking.markdown", mbaRankingsToMarkdown(items)) || "").trim() ||
    mbaRankingsToMarkdown(items);

  const persistMbaRankings = (items) => {
    const normalizedItems = (Array.isArray(items) ? items : []).map((item) => ({
      id: String(item?.id || createMbaRankingId()).trim(),
      year: String(item?.year || "").trim(),
      survey: String(item?.survey || "").trim(),
      linkLabel: String(item?.linkLabel || "more details").trim() || "more details",
      linkUrl: String(item?.linkUrl || "").trim(),
      ranking: String(item?.ranking || "").trim(),
    }));

    updateData("ranking.items", normalizedItems);
    updateData("ranking.markdown", mbaRankingsToMarkdown(normalizedItems));
  };

  const handleMbaRankingMarkdownSave = (markdown) => {
    const parsed = parseMbaRankingsMarkdown(markdown);
    const existingItems = getMbaRankings();
    const signaturePool = new Map();

    existingItems.forEach((item) => {
      const signature = getMbaRankingSignature(item);
      const matches = signaturePool.get(signature) || [];
      matches.push(item);
      signaturePool.set(signature, matches);
    });

    const usedIds = new Set();
    const mergedItems = parsed.map((item, index) => {
      const signature = getMbaRankingSignature(item);
      let match = (signaturePool.get(signature) || []).find(
        (candidate) => !usedIds.has(candidate.id),
      );

      if (!match) {
        const fallback = existingItems[index];
        if (fallback && !usedIds.has(fallback.id)) {
          match = fallback;
        }
      }

      if (match?.id) usedIds.add(match.id);

      return {
        id: match?.id || createMbaRankingId(),
        year: item.year,
        survey: item.survey,
        linkLabel: item.linkLabel || match?.linkLabel || "more details",
        linkUrl: item.linkUrl || match?.linkUrl || "",
        ranking: item.ranking,
      };
    });

    persistMbaRankings(mergedItems);
  };

  const addMbaRankingRowOnTop = () => {
    const items = getMbaRankings();
    persistMbaRankings([
      {
        id: createMbaRankingId(),
        year: "Add year",
        survey: "New survey title",
        linkLabel: "more details",
        linkUrl: "",
        ranking: "Add ranking / grade",
      },
      ...items,
    ]);
  };

  const getMbaAccreditations = () =>
    JSON.parse(
      JSON.stringify(t("accreditations.items", defaultMbaAccreditations)),
    ).map((item) => ({
      ...item,
      id: String(item?.id || createMbaAccreditationId()),
    }));

  const getMbaAccreditationsMarkdown = (items = getMbaAccreditations()) =>
    String(
      t("accreditations.markdown", mbaAccreditationsToMarkdown(items)) || "",
    ).trim() || mbaAccreditationsToMarkdown(items);

  const persistMbaAccreditations = (items) => {
    const normalizedItems = (Array.isArray(items) ? items : []).map((item) => ({
      id: String(item?.id || createMbaAccreditationId()).trim(),
      year: String(item?.year || "").trim(),
      recognition: String(item?.recognition || "").trim(),
      effectivePeriod: String(item?.effectivePeriod || "").trim(),
      score: String(item?.score || "").trim(),
    }));

    updateData("accreditations.items", normalizedItems);
    updateData(
      "accreditations.markdown",
      mbaAccreditationsToMarkdown(normalizedItems),
    );
  };

  const handleMbaAccreditationsMarkdownSave = (markdown) => {
    const parsed = parseMbaAccreditationsMarkdown(markdown);
    const existingItems = getMbaAccreditations();
    const signaturePool = new Map();

    existingItems.forEach((item) => {
      const signature = getMbaAccreditationSignature(item);
      const matches = signaturePool.get(signature) || [];
      matches.push(item);
      signaturePool.set(signature, matches);
    });

    const usedIds = new Set();
    const mergedItems = parsed.map((item, index) => {
      const signature = getMbaAccreditationSignature(item);
      let match = (signaturePool.get(signature) || []).find(
        (candidate) => !usedIds.has(candidate.id),
      );

      if (!match) {
        const fallback = existingItems[index];
        if (fallback && !usedIds.has(fallback.id)) {
          match = fallback;
        }
      }

      if (match?.id) usedIds.add(match.id);

      return {
        id: match?.id || createMbaAccreditationId(),
        year: item.year,
        recognition: item.recognition,
        effectivePeriod: item.effectivePeriod,
        score: item.score,
      };
    });

    persistMbaAccreditations(mergedItems);
  };

  const addMbaAccreditationRowOnTop = () => {
    const items = getMbaAccreditations();
    persistMbaAccreditations([
      {
        id: createMbaAccreditationId(),
        year: "Add year",
        recognition: "New recognition",
        effectivePeriod: "Add effective period",
        score: "Add score / grade",
      },
      ...items,
    ]);
  };

  const updateMbaAccreditationRow = (accreditationId, field, value) => {
    const items = getMbaAccreditations();
    persistMbaAccreditations(
      items.map((item) =>
        item.id === accreditationId ? { ...item, [field]: value } : item,
      ),
    );
  };

  const deleteMbaAccreditationRow = (accreditationId) => {
    const items = getMbaAccreditations();
    persistMbaAccreditations(
      items.filter((item) => item.id !== accreditationId),
    );
  };

  const renderMbaTableCellMarkdown = (value, extraClassName = "") => (
    <div
      className={`prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-ol:my-0 prose-strong:text-inherit prose-a:text-ssgmce-blue prose-a:no-underline hover:prose-a:underline ${extraClassName}`.trim()}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {String(value || "")}
      </ReactMarkdown>
    </div>
  );

  const getMbaMdpPrograms = () =>
    JSON.parse(
      JSON.stringify(t("workshops.mdpItems", defaultMbaMdpCepFdpPrograms)),
    ).map((item) => ({
      ...item,
      id: String(item?.id || createMbaWorkshopSectionId("mba-mdp")),
    }));

  const getMbaMdpMarkdown = (items = getMbaMdpPrograms()) =>
    String(
      t("workshops.mdpMarkdown", mbaThreeColumnProgramsToMarkdown(items)) || "",
    ).trim() || mbaThreeColumnProgramsToMarkdown(items);

  const persistMbaMdpPrograms = (items) => {
    const normalizedItems = (Array.isArray(items) ? items : []).map((item) => ({
      id: String(item?.id || createMbaWorkshopSectionId("mba-mdp")).trim(),
      title: String(item?.title || "").trim(),
      coordinator: String(item?.coordinator || "").trim(),
      participants: String(item?.participants || "").trim(),
    }));

    updateData("workshops.mdpItems", normalizedItems);
    updateData(
      "workshops.mdpMarkdown",
      mbaThreeColumnProgramsToMarkdown(normalizedItems),
    );
  };

  const handleMbaMdpMarkdownSave = (markdown) => {
    const parsed = parseMbaThreeColumnProgramsMarkdown(markdown);
    const existingItems = getMbaMdpPrograms();
    const signaturePool = new Map();

    existingItems.forEach((item) => {
      const signature = getMbaProgramSignature(item);
      const matches = signaturePool.get(signature) || [];
      matches.push(item);
      signaturePool.set(signature, matches);
    });

    const usedIds = new Set();
    const mergedItems = parsed.map((item, index) => {
      const signature = getMbaProgramSignature(item);
      let match = (signaturePool.get(signature) || []).find(
        (candidate) => !usedIds.has(candidate.id),
      );

      if (!match) {
        const fallback = existingItems[index];
        if (fallback && !usedIds.has(fallback.id)) {
          match = fallback;
        }
      }

      if (match?.id) usedIds.add(match.id);

      return {
        id: match?.id || createMbaWorkshopSectionId("mba-mdp"),
        title: item.title,
        coordinator: item.coordinator,
        participants: item.participants,
      };
    });

    persistMbaMdpPrograms(mergedItems);
  };

  const addMbaMdpRowOnTop = () => {
    persistMbaMdpPrograms([
      {
        id: createMbaWorkshopSectionId("mba-mdp"),
        title: "New program title",
        coordinator: "Add faculty coordinator",
        participants: "Add participants / beneficiaries",
      },
      ...getMbaMdpPrograms(),
    ]);
  };

  const getMbaFdpPrograms = () =>
    JSON.parse(
      JSON.stringify(t("workshops.fdpItems", defaultMbaFdpPrograms)),
    ).map((item) => ({
      ...item,
      id: String(item?.id || createMbaWorkshopSectionId("mba-fdp")),
    }));

  const getMbaFdpMarkdown = (items = getMbaFdpPrograms()) =>
    String(
      t("workshops.fdpMarkdown", mbaThreeColumnProgramsToMarkdown(items)) || "",
    ).trim() || mbaThreeColumnProgramsToMarkdown(items);

  const persistMbaFdpPrograms = (items) => {
    const normalizedItems = (Array.isArray(items) ? items : []).map((item) => ({
      id: String(item?.id || createMbaWorkshopSectionId("mba-fdp")).trim(),
      title: String(item?.title || "").trim(),
      coordinator: String(item?.coordinator || "").trim(),
      participants: String(item?.participants || "").trim(),
    }));

    updateData("workshops.fdpItems", normalizedItems);
    updateData(
      "workshops.fdpMarkdown",
      mbaThreeColumnProgramsToMarkdown(normalizedItems),
    );
  };

  const handleMbaFdpMarkdownSave = (markdown) => {
    const parsed = parseMbaThreeColumnProgramsMarkdown(markdown);
    const existingItems = getMbaFdpPrograms();
    const signaturePool = new Map();

    existingItems.forEach((item) => {
      const signature = getMbaProgramSignature(item);
      const matches = signaturePool.get(signature) || [];
      matches.push(item);
      signaturePool.set(signature, matches);
    });

    const usedIds = new Set();
    const mergedItems = parsed.map((item, index) => {
      const signature = getMbaProgramSignature(item);
      let match = (signaturePool.get(signature) || []).find(
        (candidate) => !usedIds.has(candidate.id),
      );

      if (!match) {
        const fallback = existingItems[index];
        if (fallback && !usedIds.has(fallback.id)) {
          match = fallback;
        }
      }

      if (match?.id) usedIds.add(match.id);

      return {
        id: match?.id || createMbaWorkshopSectionId("mba-fdp"),
        title: item.title,
        coordinator: item.coordinator,
        participants: item.participants,
      };
    });

    persistMbaFdpPrograms(mergedItems);
  };

  const addMbaFdpRowOnTop = () => {
    persistMbaFdpPrograms([
      {
        id: createMbaWorkshopSectionId("mba-fdp"),
        title: "New FDP title",
        coordinator: "Add faculty coordinator",
        participants: "Add participants",
      },
      ...getMbaFdpPrograms(),
    ]);
  };

  const getMbaWorkshopPrograms = () =>
    JSON.parse(
      JSON.stringify(
        t("workshops.workshopItems", defaultMbaWorkshopPrograms),
      ),
    ).map((item) => ({
      ...item,
      id: String(item?.id || createMbaWorkshopSectionId("mba-workshop")),
    }));

  const getMbaWorkshopMarkdown = (items = getMbaWorkshopPrograms()) =>
    String(
      t(
        "workshops.workshopMarkdown",
        mbaWorkshopProgramsToMarkdown(items),
      ) || "",
    ).trim() || mbaWorkshopProgramsToMarkdown(items);

  const persistMbaWorkshopPrograms = (items) => {
    const normalizedItems = (Array.isArray(items) ? items : []).map((item) => ({
      id: String(item?.id || createMbaWorkshopSectionId("mba-workshop")).trim(),
      title: String(item?.title || "").trim(),
      coordinator: String(item?.coordinator || "").trim(),
      participants: String(item?.participants || "").trim(),
      report: String(item?.report || "").trim(),
    }));

    updateData("workshops.workshopItems", normalizedItems);
    updateData(
      "workshops.workshopMarkdown",
      mbaWorkshopProgramsToMarkdown(normalizedItems),
    );
  };

  const handleMbaWorkshopMarkdownSave = (markdown) => {
    const parsed = parseMbaWorkshopProgramsMarkdown(markdown);
    const existingItems = getMbaWorkshopPrograms();
    const signaturePool = new Map();

    existingItems.forEach((item) => {
      const signature = getMbaProgramSignature(item);
      const matches = signaturePool.get(signature) || [];
      matches.push(item);
      signaturePool.set(signature, matches);
    });

    const usedIds = new Set();
    const mergedItems = parsed.map((item, index) => {
      const signature = getMbaProgramSignature(item);
      let match = (signaturePool.get(signature) || []).find(
        (candidate) => !usedIds.has(candidate.id),
      );

      if (!match) {
        const fallback = existingItems[index];
        if (fallback && !usedIds.has(fallback.id)) {
          match = fallback;
        }
      }

      if (match?.id) usedIds.add(match.id);

      return {
        id: match?.id || createMbaWorkshopSectionId("mba-workshop"),
        title: item.title,
        coordinator: item.coordinator,
        participants: item.participants,
        report: item.report || match?.report || "",
      };
    });

    persistMbaWorkshopPrograms(mergedItems);
  };

  const addMbaWorkshopRowOnTop = () => {
    persistMbaWorkshopPrograms([
      {
        id: createMbaWorkshopSectionId("mba-workshop"),
        title: "New workshop title",
        coordinator: "Add faculty coordinator",
        participants: "Add participants",
        report: "",
      },
      ...getMbaWorkshopPrograms(),
    ]);
  };

  const uploadMbaWorkshopReport = async (workshopId, file) => {
    if (!file || !workshopId) return;

    const uploadKey = `mba-workshop-${workshopId}`;
    setWorkshopReportUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setWorkshopReportErrors((prev) => ({ ...prev, [uploadKey]: "" }));

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

      if (!response.data.fileUrl) {
        throw new Error("Upload did not return a file URL.");
      }

      persistMbaWorkshopPrograms(
        getMbaWorkshopPrograms().map((item) =>
          item.id === workshopId
            ? {
                ...item,
                report: response.data.fileUrl,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("MBA workshop report upload failed:", error);
      setWorkshopReportErrors((prev) => ({
        ...prev,
        [uploadKey]:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Upload failed",
      }));
    } finally {
      setWorkshopReportUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const defaultConsultancyYears = Object.keys(defaultMbaConsultancyByYear);

  const getMbaConsultancyYears = () => {
    const storedYears = Array.isArray(t("consultancy.years", null))
      ? t("consultancy.years", [])
      : [];
    const markdownByYear = t("consultancy.markdownByYear", {});
    const recordYears = Object.keys(
      markdownByYear && typeof markdownByYear === "object" ? markdownByYear : {},
    );

    return [...new Set([...storedYears, ...recordYears, ...defaultConsultancyYears])];
  };

  const getMbaConsultancyMarkdownByYear = () => {
    const storedMarkdown = t("consultancy.markdownByYear", {});
    const normalizedStored =
      storedMarkdown && typeof storedMarkdown === "object" ? storedMarkdown : {};

    const defaults = Object.fromEntries(
      defaultConsultancyYears.map((year) => [
        year,
        mbaConsultancyToMarkdown(defaultMbaConsultancyByYear[year] || []),
      ]),
    );

    return {
      ...defaults,
      ...normalizedStored,
    };
  };

  const persistMbaConsultancyMarkdownByYear = (markdownByYear, years) => {
    const normalizedYears = Array.isArray(years) ? years : getMbaConsultancyYears();
    updateData("consultancy.years", normalizedYears);
    updateData("consultancy.markdownByYear", markdownByYear);
  };

  const handleMbaConsultancyMarkdownSave = (year, markdown) => {
    const markdownByYear = getMbaConsultancyMarkdownByYear();
    persistMbaConsultancyMarkdownByYear(
      {
        ...markdownByYear,
        [year]: markdown,
      },
      getMbaConsultancyYears(),
    );
  };

  const addMbaConsultancyYear = () => {
    const normalizedYear = String(newConsultancyYear || "").trim();

    if (!normalizedYear) {
      setConsultancyYearError("Enter a consultancy year label.");
      return;
    }

    const years = getMbaConsultancyYears();
    if (years.includes(normalizedYear)) {
      setConsultancyYearError("That consultancy year already exists.");
      return;
    }

    const nextYears = [normalizedYear, ...years];
    const markdownByYear = getMbaConsultancyMarkdownByYear();

    persistMbaConsultancyMarkdownByYear(
      {
        ...markdownByYear,
        [normalizedYear]: mbaConsultancyToMarkdown([]),
      },
      nextYears,
    );

    setNewConsultancyYear("");
    setConsultancyYearError("");
    setShowAddConsultancyYear(false);
  };

  const defaultLeaderSessions = Object.keys(defaultMbaCorporateLeaderSpeaksBySession);

  const getMbaLeaderSessions = () => {
    const storedSessions = Array.isArray(t("leaderSpeaks.sessions", null))
      ? t("leaderSpeaks.sessions", [])
      : [];
    const markdownBySession = t("leaderSpeaks.markdownBySession", {});
    const recordSessions = Object.keys(
      markdownBySession && typeof markdownBySession === "object"
        ? markdownBySession
        : {},
    );

    return [...new Set([...storedSessions, ...recordSessions, ...defaultLeaderSessions])];
  };

  const getMbaLeaderMarkdownBySession = () => {
    const storedMarkdown = t("leaderSpeaks.markdownBySession", {});
    const normalizedStored =
      storedMarkdown && typeof storedMarkdown === "object" ? storedMarkdown : {};

    const defaults = Object.fromEntries(
      defaultLeaderSessions.map((session) => [
        session,
        mbaCorporateLeaderSpeaksToMarkdown(
          defaultMbaCorporateLeaderSpeaksBySession[session] || [],
        ),
      ]),
    );

    return {
      ...defaults,
      ...normalizedStored,
    };
  };

  const persistMbaLeaderMarkdownBySession = (markdownBySession, sessions) => {
    const normalizedSessions = Array.isArray(sessions)
      ? sessions
      : getMbaLeaderSessions();
    updateData("leaderSpeaks.sessions", normalizedSessions);
    updateData("leaderSpeaks.markdownBySession", markdownBySession);
  };

  const handleMbaLeaderMarkdownSave = (session, markdown) => {
    const markdownBySession = getMbaLeaderMarkdownBySession();
    persistMbaLeaderMarkdownBySession(
      {
        ...markdownBySession,
        [session]: markdown,
      },
      getMbaLeaderSessions(),
    );
  };

  const addMbaLeaderSession = () => {
    const normalizedSession = String(newLeaderSession || "").trim();

    if (!normalizedSession) {
      setLeaderSessionError("Enter a session label.");
      return;
    }

    const sessions = getMbaLeaderSessions();
    if (sessions.includes(normalizedSession)) {
      setLeaderSessionError("That session already exists.");
      return;
    }

    const nextSessions = [normalizedSession, ...sessions];
    const markdownBySession = getMbaLeaderMarkdownBySession();

    persistMbaLeaderMarkdownBySession(
      {
        ...markdownBySession,
        [normalizedSession]: mbaCorporateLeaderSpeaksToMarkdown([]),
      },
      nextSessions,
    );

    setNewLeaderSession("");
    setLeaderSessionError("");
    setShowAddLeaderSession(false);
  };

  const uploadMbaLeaderReport = async (session, entryIndex, file) => {
    if (!file || !session) return;

    const uploadKey = `mba-leader-${session}-${entryIndex}`;
    setLeaderReportUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setLeaderReportErrors((prev) => ({ ...prev, [uploadKey]: "" }));

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

      if (!response.data.fileUrl) {
        throw new Error("Upload did not return a file URL.");
      }

      const markdownBySession = getMbaLeaderMarkdownBySession();
      const entries = parseMbaCorporateLeaderSpeaksMarkdown(
        markdownBySession[session] || "",
      );
      const nextEntries = entries.map((entry, idx) =>
        idx === entryIndex ? { ...entry, report: response.data.fileUrl } : entry,
      );

      persistMbaLeaderMarkdownBySession(
        {
          ...markdownBySession,
          [session]: mbaCorporateLeaderSpeaksToMarkdown(nextEntries),
        },
        getMbaLeaderSessions(),
      );
    } catch (error) {
      console.error("MBA corporate leader report upload failed:", error);
      setLeaderReportErrors((prev) => ({
        ...prev,
        [uploadKey]:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Upload failed",
      }));
    } finally {
      setLeaderReportUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const updateMbaRankingRow = (rankingId, field, value) => {
    const items = getMbaRankings();
    persistMbaRankings(
      items.map((item) =>
        item.id === rankingId ? { ...item, [field]: value } : item,
      ),
    );
  };

  const deleteMbaRankingRow = (rankingId) => {
    const items = getMbaRankings();
    persistMbaRankings(items.filter((item) => item.id !== rankingId));
  };

  const uploadMbaRankingLinkFile = async (rankingId, file) => {
    if (!file) return;

    const uploadKey = `mba-ranking-${rankingId}`;
    setRankingLinkUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setRankingLinkErrors((prev) => ({ ...prev, [uploadKey]: "" }));

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

      if (!response.data.fileUrl) {
        throw new Error("Upload did not return a file URL.");
      }

      const items = getMbaRankings();
      persistMbaRankings(
        items.map((item) =>
          item.id === rankingId
            ? {
                ...item,
                linkUrl: response.data.fileUrl,
                linkLabel: item.linkLabel || "more details",
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("MBA ranking link upload failed:", error);
      setRankingLinkErrors((prev) => ({
        ...prev,
        [uploadKey]:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Upload failed",
      }));
    } finally {
      setRankingLinkUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const academicYearPattern = /^\d{4}-\d{2}$/;
  const defaultPlacementYearOrder = defaultPlacements.summary.map(
    ({ year }) => year,
  );
  const placementRecordsByYear = defaultPlacements.details;

  const isAcademicYearKey = (value) =>
    typeof value === "string" && academicYearPattern.test(value.trim());

  const compareAcademicYearsDesc = (a, b) => {
    const aStart = Number(String(a).slice(0, 4));
    const bStart = Number(String(b).slice(0, 4));
    return bStart - aStart;
  };

  const normalizePlacementYears = (years) => {
    const uniqueYears = [];

    years.forEach((year) => {
      const normalizedYear = String(year || "").trim();
      if (!isAcademicYearKey(normalizedYear)) return;
      if (!uniqueYears.includes(normalizedYear)) {
        uniqueYears.push(normalizedYear);
      }
    });

    return uniqueYears;
  };

  const isValidAcademicYear = (value) => {
    const normalizedYear = String(value || "").trim();
    if (!isAcademicYearKey(normalizedYear)) return false;

    const [startYear, endSuffix] = normalizedYear.split("-");
    return String(Number(startYear) + 1).slice(-2) === endSuffix;
  };

  const parseUgProjectsTableRow = (line = "") =>
    String(line || "")
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const mbaProjectsToMarkdown = (projectsByYear = {}, preferredYears = []) => {
    const yearOrder = [
      ...preferredYears,
      ...Object.keys(projectsByYear || {}).filter(
        (year) => !preferredYears.includes(year),
      ),
    ];

    return yearOrder
      .filter(Boolean)
      .map((year) => {
        const projects = Array.isArray(projectsByYear?.[year])
          ? projectsByYear[year]
          : [];
        const header = [
          `## ${year}`,
          "",
          "| Group No. | Project Title |",
          "|-----------|---------------|",
        ];

        if (!projects.length) {
          return [...header, "| - | No projects added yet. |"].join("\n");
        }

        const rows = projects.map(
          (project) => `| ${project?.no || "-"} | ${project?.title || "-"} |`,
        );
        return [...header, ...rows].join("\n");
      })
      .join("\n\n");
  };

const parseMbaProjectsMarkdown = (markdown = "", fallbackYear = "2023-24") => {
    const text = String(markdown || "").trim();
    if (!text) {
      return { years: [fallbackYear], records: { [fallbackYear]: [] } };
    }

    const headingMatches = [...text.matchAll(/^##\s+(.+)$/gm)];
    const sections =
      headingMatches.length > 0
        ? headingMatches.map((match, index) => {
            const start = match.index ?? 0;
            const end =
              index + 1 < headingMatches.length
                ? headingMatches[index + 1].index
                : text.length;
            return { year: match[1].trim(), body: text.slice(start, end) };
          })
        : [{ year: fallbackYear, body: text }];

    const years = [];
    const records = {};

    sections.forEach(({ year, body }) => {
      const normalizedYear = year || fallbackYear;
      const lines = String(body || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const tableLines = lines.filter((line) => line.startsWith("|"));
      const dataLines = tableLines.filter(
        (line, index) =>
          index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
      );

      records[normalizedYear] = dataLines
        .map((line) => parseUgProjectsTableRow(line))
        .filter((cells) => cells.length >= 2)
        .map((cells) => ({
          no: cells[0] || "",
          title: cells[1] || "",
        }))
        .filter((project) => project.no || project.title);

      if (!years.includes(normalizedYear)) years.push(normalizedYear);
    });

  return { years, records };
};

const mbaExtractMarkdownLinkHref = (value = "") => {
  const text = String(value || "").trim();
  if (!text) return "";

  const markdownMatch = text.match(/\[[^\]]*\]\(([^)]+)\)/);
  if (markdownMatch?.[1]) return markdownMatch[1].trim();

  if (/^https?:\/\//i.test(text)) return text;

  return "";
};

const mbaParseMarkdownTableRow = (line = "") =>
  String(line || "")
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const mbaPatentsToMarkdown = (items = [], year = "2023-24") => {
  const lines = [
    `## ${year}`,
    "",
    "| Title of Invention | Status | Application No. | Inventors | Link |",
    "|--------------------|--------|-----------------|-----------|------|",
  ];

  if (!items.length) {
    lines.push(
      "| Add invention title | Published | Add application no. | Add inventors | - |",
    );
    return lines.join("\n");
  }

  items.forEach((item) => {
    const linkCell = item?.link ? `[Open](${item.link})` : "-";
    lines.push(
      `| ${item?.title || "-"} | ${item?.status || "-"} | ${item?.id || "-"} | ${item?.inventors || "-"} | ${linkCell} |`,
    );
  });

  return lines.join("\n");
};

const parseMbaPatentsMarkdown = (markdown = "", fallbackYear = "2023-24") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };

  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(
        line,
      ),
  );

  return {
    year,
    items: dataLines
      .map((line) => mbaParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 5)
      .map((cells) => ({
        title: cells[0] || "",
        status: cells[1] || "",
        id: cells[2] || "",
        inventors: cells[3] || "",
        link: mbaExtractMarkdownLinkHref(cells.slice(4).join(" | ")),
      }))
      .filter(
        (item) =>
          item.title || item.status || item.id || item.inventors || item.link,
      ),
  };
};

const mbaPublicationsToMarkdown = (items = [], year = "2023-24") => {
  const lines = [
    `## ${year}`,
    "",
    "| Title of Paper | Authors | Journal Details | Link |",
    "|----------------|---------|-----------------|------|",
  ];

  if (!items.length) {
    lines.push("| Add paper title | Add authors | Add journal details | - |");
    return lines.join("\n");
  }

  items.forEach((item) => {
    const linkCell = item?.link ? `[View](${item.link})` : "-";
    lines.push(
      `| ${item?.title || "-"} | ${item?.authors || "-"} | ${item?.journal || "-"} | ${linkCell} |`,
    );
  });

  return lines.join("\n");
};

const parseMbaPublicationsMarkdown = (
  markdown = "",
  fallbackYear = "2023-24",
) => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };

  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );

  return {
    year,
    items: dataLines
      .map((line) => mbaParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        title: cells[0] || "",
        authors: cells[1] || "",
        journal: cells[2] || "",
        link: mbaExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.title || item.authors || item.journal || item.link),
  };
};

const mbaConferencesToMarkdown = (items = [], year = "2023-24") => {
  const lines = [
    `## ${year}`,
    "",
    "| Title of Paper | Authors | Conference Details | Link |",
    "|----------------|---------|--------------------|------|",
  ];

  if (!items.length) {
    lines.push("| Add paper title | Add authors | Add conference details | - |");
    return lines.join("\n");
  }

  items.forEach((item) => {
    const linkCell = item?.link ? `[View](${item.link})` : "-";
    lines.push(
      `| ${item?.title || "-"} | ${item?.authors || "-"} | ${item?.journal || "-"} | ${linkCell} |`,
    );
  });

  return lines.join("\n");
};

const parseMbaConferencesMarkdown = (
  markdown = "",
  fallbackYear = "2023-24",
) => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };

  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );

  return {
    year,
    items: dataLines
      .map((line) => mbaParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        title: cells[0] || "",
        authors: cells[1] || "",
        journal: cells[2] || "",
        link: mbaExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.title || item.authors || item.journal || item.link),
  };
};

const mbaCopyrightsToMarkdown = (items = [], year = "2023-24") => {
  const lines = [
    `## ${year}`,
    "",
    "| Name of Faculty | Title of Work | Status | Link |",
    "|-----------------|---------------|--------|------|",
  ];

  if (!items.length) {
    lines.push("| Add faculty name | Add title of work | Published | - |");
    return lines.join("\n");
  }

  items.forEach((item) => {
    const linkCell = item?.link ? `[Open](${item.link})` : "-";
    lines.push(
      `| ${item?.name || "-"} | ${item?.title || "-"} | ${item?.status || "-"} | ${linkCell} |`,
    );
  });

  return lines.join("\n");
};

const parseMbaCopyrightsMarkdown = (
  markdown = "",
  fallbackYear = "2023-24",
) => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };

  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );

  return {
    year,
    items: dataLines
      .map((line) => mbaParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        name: cells[0] || "",
        title: cells[1] || "",
        status: cells[2] || "",
        link: mbaExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.name || item.title || item.status || item.link),
  };
};

const mbaBooksToMarkdown = (items = [], year = "2023-24") => {
  const lines = [
    `## ${year}`,
    "",
    "| Author(s) | Co-Authors | Title | Publisher | ISBN | Link |",
    "|-----------|------------|-------|-----------|------|------|",
  ];

  if (!items.length) {
    lines.push("| Add author names | - | Add title | Add publisher | Add ISBN | - |");
    return lines.join("\n");
  }

  items.forEach((item) => {
    const linkCell = item?.link ? `[Open](${item.link})` : "-";
    lines.push(
      `| ${item?.name || "-"} | ${item?.coAuthors || "-"} | ${item?.title || "-"} | ${item?.details || "-"} | ${item?.isbn || "-"} | ${linkCell} |`,
    );
  });

  return lines.join("\n");
};

const parseMbaBooksMarkdown = (markdown = "", fallbackYear = "2023-24") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };

  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 &&
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(
        line,
      ),
  );

  return {
    year,
    items: dataLines
      .map((line) => mbaParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 6)
      .map((cells) => ({
        name: cells[0] || "",
        coAuthors: cells[1] || "",
        title: cells[2] || "",
        details: cells[3] || "",
        isbn: cells[4] || "",
        link: mbaExtractMarkdownLinkHref(cells.slice(5).join(" | ")),
      }))
      .filter(
        (item) =>
          item.name ||
          item.coAuthors ||
          item.title ||
          item.details ||
          item.isbn ||
          item.link,
      ),
  };
};

const MBA_RESEARCH_DEFAULTS = {
  patents: defaultMbaPatents,
  publications: defaultMbaPublications,
  conferences: defaultMbaConferences,
  books: defaultMbaBooks,
  copyrights: defaultMbaCopyrights,
};

const MBA_RESEARCH_TO_MARKDOWN = {
  patents: mbaPatentsToMarkdown,
  publications: mbaPublicationsToMarkdown,
  conferences: mbaConferencesToMarkdown,
  books: mbaBooksToMarkdown,
  copyrights: mbaCopyrightsToMarkdown,
};

const MBA_RESEARCH_FROM_MARKDOWN = {
  patents: parseMbaPatentsMarkdown,
  publications: parseMbaPublicationsMarkdown,
  conferences: parseMbaConferencesMarkdown,
  books: parseMbaBooksMarkdown,
  copyrights: parseMbaCopyrightsMarkdown,
};

const MBA_RESEARCH_TEMPLATE_URLS = {
  patents: "/uploads/documents/pride_templates/mba_patents_template.docx",
  publications:
    "/uploads/documents/pride_templates/mba_publications_template.docx",
  conferences:
    "/uploads/documents/pride_templates/mba_conferences_template.docx",
  books: "/uploads/documents/pride_templates/mba_books_template.docx",
  copyrights:
    "/uploads/documents/pride_templates/mba_copyrights_template.docx",
};

  const getProjectRecords = () =>
    JSON.parse(JSON.stringify(t("ugPgProjects", defaultMbaProjects)));

  const getProjectYears = () => {
    const storedYears = Array.isArray(t("ugPgProjectYears", null))
      ? t("ugPgProjectYears", [])
      : [];
    const recordYears = Object.keys(getProjectRecords() || {});
    return [...new Set([...storedYears, ...recordYears])]
      .filter(Boolean)
      .sort(compareAcademicYearsDesc);
  };

  const getProjectMarkdownByYear = () =>
    JSON.parse(JSON.stringify(t("ugPgProjectsMarkdownByYear", {})));

  const persistProjects = (records, years = getProjectYears()) => {
    const orderedYears = [...new Set([...years, ...Object.keys(records || {})])]
      .filter(Boolean)
      .sort(compareAcademicYearsDesc);

    const normalizedRecords = orderedYears.reduce((acc, year) => {
      acc[year] = Array.isArray(records?.[year])
        ? records[year].map((project) => ({
            no: String(project?.no || "").trim(),
            title: String(project?.title || "").trim(),
          }))
        : [];
      return acc;
    }, {});

    const existingMarkdownByYear = getProjectMarkdownByYear();
    const markdownByYear = orderedYears.reduce((acc, year) => {
      acc[year] =
        existingMarkdownByYear?.[year] ||
        mbaProjectsToMarkdown({ [year]: normalizedRecords[year] || [] }, [year]);
      return acc;
    }, {});

    updateData("ugPgProjects", normalizedRecords);
    updateData("ugPgProjectYears", orderedYears);
    updateData("ugPgProjectsMarkdownByYear", markdownByYear);
  };

  const handleProjectMarkdownSave = (markdown) => {
    const parsed = parseMbaProjectsMarkdown(markdown, projectYear);
    const mergedRecords = {
      ...getProjectRecords(),
      [projectYear]: parsed.records[projectYear] || [],
    };
    persistProjects(mergedRecords, getProjectYears());
    updateData(`ugPgProjectsMarkdownByYear.${projectYear}`, markdown);
  };

  const handleAddProjectYear = () => {
    const normalizedYear = newUgProjectYear.trim();
    const projectYears = getProjectYears();

    if (!isValidAcademicYear(normalizedYear)) {
      setUgProjectYearError("Enter a valid academic year like 2025-26.");
      return;
    }

    if (projectYears.includes(normalizedYear)) {
      setUgProjectYearError("That academic year already exists.");
      return;
    }

    const dataObj = getProjectRecords();
    dataObj[normalizedYear] = [];
    persistProjects(dataObj, [normalizedYear, ...projectYears]);
    updateData(
      `ugPgProjectsMarkdownByYear.${normalizedYear}`,
      mbaProjectsToMarkdown({ [normalizedYear]: [] }, [normalizedYear]),
    );
    setProjectYear(normalizedYear);
    setNewUgProjectYear("");
    setUgProjectYearError("");
    setShowAddUgProjectYear(false);
  };

  const getMbaResearchItems = (section, year = researchYear) =>
    JSON.parse(
      JSON.stringify(
        t(`research.${section}.${year}`, MBA_RESEARCH_DEFAULTS[section]?.[year] || []),
      ),
    );

  const getMbaResearchMarkdownValue = (section, year = researchYear) => {
    const storedMarkdown = t(`researchMarkdown.${section}.${year}`, null);
    if (typeof storedMarkdown === "string" && storedMarkdown.trim()) {
      return storedMarkdown;
    }

    return MBA_RESEARCH_TO_MARKDOWN[section](
      getMbaResearchItems(section, year),
      year,
    );
  };

  const getMbaResearchYears = () => {
    const configuredYears = Array.isArray(t("researchYears", null))
      ? t("researchYears", [])
      : [];
    const storedResearch = t("research", {});
    const storedResearchMarkdown = t("researchMarkdown", {});

    const discoveredYears = Object.keys(MBA_RESEARCH_DEFAULTS).flatMap(
      (section) => [
        ...Object.keys(MBA_RESEARCH_DEFAULTS[section] || {}),
        ...Object.keys(
          storedResearch?.[section] && typeof storedResearch[section] === "object"
            ? storedResearch[section]
            : {},
        ),
        ...Object.keys(
          storedResearchMarkdown?.[section] &&
            typeof storedResearchMarkdown[section] === "object"
            ? storedResearchMarkdown[section]
            : {},
        ),
      ],
    );

    const years = normalizePlacementYears([
      ...defaultResearchYears,
      ...configuredYears,
      ...discoveredYears,
    ]).sort(compareAcademicYearsDesc);

    return years.length ? years : [...defaultResearchYears];
  };

  const persistMbaResearchSection = (section, items, year = researchYear) => {
    const normalizedItems = Array.isArray(items) ? items : [];
    updateData(`research.${section}.${year}`, normalizedItems);
    updateData(
      `researchMarkdown.${section}.${year}`,
      MBA_RESEARCH_TO_MARKDOWN[section](normalizedItems, year),
    );
  };

  const createEmptyMbaResearchMarkdown = (section, year) =>
    MBA_RESEARCH_TO_MARKDOWN[section]([], year);

  const handleMbaResearchMarkdownSave = (markdown) => {
    const parser = MBA_RESEARCH_FROM_MARKDOWN[patentSubTab];
    const parsed = parser(markdown, researchYear);
    persistMbaResearchSection(patentSubTab, parsed.items || [], researchYear);
  };

  const addMbaResearchRowOnTop = (section = patentSubTab) => {
    const researchItems = getMbaResearchItems(section, researchYear);
    const blankRows = {
      patents: {
        title: "Add invention title",
        status: "Published",
        id: "Add application no.",
        inventors: "Add inventors",
        link: "",
      },
      publications: {
        title: "Add paper title",
        authors: "Add authors",
        journal: "Add journal details",
        link: "",
      },
      conferences: {
        title: "Add paper title",
        authors: "Add authors",
        journal: "Add conference details",
        link: "",
      },
      copyrights: {
        name: "Add faculty name",
        title: "Add title of work",
        status: "Published",
        link: "",
      },
      books: {
        name: "Add author names",
        coAuthors: "",
        title: "Add title",
        details: "Add publisher",
        isbn: "Add ISBN",
        link: "",
      },
    };

    persistMbaResearchSection(
      section,
      [blankRows[section] || {}, ...researchItems],
      researchYear,
    );
  };

  const mbaResearchYears = getMbaResearchYears();
  const selectedResearchItems = getMbaResearchItems(patentSubTab, researchYear);
  const selectedResearchMarkdown = getMbaResearchMarkdownValue(
    patentSubTab,
    researchYear,
  );

  useEffect(() => {
    if (!mbaResearchYears.length) return;
    if (!mbaResearchYears.includes(researchYear)) {
      setResearchYear(mbaResearchYears[0]);
    }
  }, [researchYear, mbaResearchYears]);

  const handleAddResearchYear = () => {
    const normalizedYear = newResearchYear.trim();

    if (!isValidAcademicYear(normalizedYear)) {
      setResearchYearError("Enter a valid academic year like 2025-26.");
      return;
    }

    if (mbaResearchYears.includes(normalizedYear)) {
      setResearchYearError("That academic year already exists.");
      return;
    }

    Object.keys(MBA_RESEARCH_DEFAULTS).forEach((section) => {
      updateData(`research.${section}.${normalizedYear}`, []);
      updateData(
        `researchMarkdown.${section}.${normalizedYear}`,
        createEmptyMbaResearchMarkdown(section, normalizedYear),
      );
    });

    updateData("researchYears", [normalizedYear, ...mbaResearchYears]);
    setResearchYear(normalizedYear);
    setNewResearchYear("");
    setResearchYearError("");
    setShowAddResearchYear(false);
  };

  const getMbaResearchReportUrl = (year) =>
    String(
      t(
        `researchReports.${year}`,
        `/uploads/documents/mba_publications/MBA_publication_${year}.pdf`,
      ) || "",
    ).trim();

  const uploadMbaResearchReport = async (year, file) => {
    if (!file || !year) return;

    const uploadKey = `mba-research-report-${year}`;
    setResearchReportUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setResearchReportErrors((prev) => ({ ...prev, [uploadKey]: "" }));

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

      if (!response.data.fileUrl) {
        throw new Error("Upload did not return a file URL.");
      }

      updateData(`researchReports.${year}`, response.data.fileUrl);
    } catch (error) {
      console.error("MBA research report upload failed:", error);
      setResearchReportErrors((prev) => ({
        ...prev,
        [uploadKey]:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Upload failed",
      }));
    } finally {
      setResearchReportUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const storedPlacementYears = Array.isArray(t("placements.years", null))
    ? t("placements.years", [])
    : [];
  const storedPlacementDetails = t("placements.details", {});
  const storedPlacementMarkdown = t("placements.markdown", {});
  const storedPlacementObject = t("placements", {});

  const discoveredPlacementYears = normalizePlacementYears([
    ...Object.keys(
      storedPlacementDetails && typeof storedPlacementDetails === "object"
        ? storedPlacementDetails
        : {},
    ),
    ...Object.keys(
      storedPlacementMarkdown && typeof storedPlacementMarkdown === "object"
        ? storedPlacementMarkdown
        : {},
    ),
    ...Object.keys(
      storedPlacementObject && typeof storedPlacementObject === "object"
        ? Object.fromEntries(
            Object.entries(storedPlacementObject).filter(
              ([key]) => !["years", "details", "markdown"].includes(key),
            ),
          )
        : {},
    ),
  ]).sort(compareAcademicYearsDesc);

  const placementYearOrder = (() => {
    const baseYears =
      storedPlacementYears.length > 0
        ? normalizePlacementYears(storedPlacementYears)
        : [...defaultPlacementYearOrder];
    const extraYears = discoveredPlacementYears.filter(
      (year) => !baseYears.includes(year),
    );

    return normalizePlacementYears([...baseYears, ...extraYears]).sort(
      compareAcademicYearsDesc,
    );
  })();

  const currentPlacementYear = placementYearOrder[0] || null;

  const handleAddPlacementYear = () => {
    const normalizedYear = newPlacementYear.trim();

    if (!isValidAcademicYear(normalizedYear)) {
      setPlacementYearError("Enter a valid academic year like 2025-26.");
      return;
    }

    if (placementYearOrder.includes(normalizedYear)) {
      setPlacementYearError("That academic year already exists.");
      return;
    }

    const nextYears = normalizePlacementYears([
      normalizedYear,
      ...placementYearOrder,
    ]).sort(compareAcademicYearsDesc);

    updateData("placements.years", nextYears);
    updateData(`placements.details.${normalizedYear}`, "");
    setNewPlacementYear("");
    setPlacementYearError("");
    setShowAddPlacementYear(false);
  };

  const handleDeletePlacementYear = (year) => {
    if (!window.confirm(`Delete placement statistics for ${year}?`)) {
      return;
    }

    const remainingYears = placementYearOrder.filter(
      (placementEntryYear) => placementEntryYear !== year,
    );

    updateData("placements.years", remainingYears);
    removeData(`placements.details.${year}`);
    removeData(`placements.markdown.${year}`);
    removeData(`placements.${year}`);

    if (placementYear === year) {
      setPlacementYear(null);
    }
  };

  const getPlacementMarkdown = (year) => {
    const records = placementRecordsByYear[year] || [];
    const header = `## Placement Record - ${year}`;
    const intro =
      year === currentPlacementYear
        ? "*Placements still in progress for the current academic year.*\n\n"
        : "";
    const rows = records.map(
      (student, index) =>
        `| ${index + 1} | ${student.name} | ${student.company} | ${student.ctc} |`,
    );

    const table = [
      "| Sr. No. | Name of Student | Company Name | CTC |",
      "|--------|----------------|--------------|-----|",
      ...rows,
    ].join("\n");

    return [header, "", intro, table].join("\n");
  };

  const getStoredPlacementValue = (year) => {
    const candidates = [
      `placements.details.${year}`,
      `placements.${year}`,
      `placements.markdown.${year}`,
    ];

    for (const path of candidates) {
      const value = t(path, null);
      if (value !== null && value !== undefined) {
        if (typeof value === "string" && value.trim() === "") continue;
        return value;
      }
    }

    const placements = t("placements", null);
    if (placements && typeof placements === "object" && placements[year]) {
      return placements[year];
    }

    return null;
  };

  const placementRecordsToMarkdown = (year, records) => {
    const header = `## Placement Record - ${year}`;
    const intro =
      year === currentPlacementYear
        ? "*Placements still in progress for the current academic year.*\n\n"
        : "";
    const rows = records.map(
      (student, index) =>
        `| ${index + 1} | ${student.name} | ${student.company} | ${student.ctc} |`,
    );

    const table = [
      "| Sr. No. | Name of Student | Company Name | CTC |",
      "|--------|----------------|--------------|-----|",
      ...rows,
    ].join("\n");

    return [header, "", intro, table].join("\n");
  };

  const getCurrentPlacementMarkdown = () => {
    if (!placementYear) return "";

    const stored = getStoredPlacementValue(placementYear);

    if (typeof stored === "string" && stored.trim()) return stored;
    if (Array.isArray(stored) && stored.length > 0) {
      return placementRecordsToMarkdown(placementYear, stored);
    }

    return getPlacementMarkdown(placementYear);
  };

  const getPlacementCount = (year) => {
    const stored = getStoredPlacementValue(year);

    if (Array.isArray(stored)) return stored.length;

    if (typeof stored === "string" && stored.trim()) {
      const lines = stored.split("\n").map((line) => line.trim());
      const tableStart = lines.findIndex((line) => line.startsWith("| Sr. No."));
      if (tableStart !== -1) {
        return lines
          .slice(tableStart + 2)
          .filter((line) => line.startsWith("|")).length;
      }
    }

    return placementRecordsByYear[year]?.length || 0;
  };

  const placementSummary = placementYearOrder.map((year) => ({
    year,
    count: `${getPlacementCount(year)}${year === currentPlacementYear ? "*" : ""}`,
    id: year,
  }));

  const renderPlacementDetails = () => {
    const markdown = getCurrentPlacementMarkdown();

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setPlacementYear(null)}
            className="flex items-center text-gray-600 hover:text-ssgmce-blue font-medium transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-sm group-hover:bg-blue-100">
              <FaAngleRight className="transform rotate-180" />
            </span>
            Back to Statistics
          </button>
          <div className="text-right">
            <h3 className="text-xl font-bold text-gray-800">
              Placement Record
            </h3>
            <p className="text-sm text-ssgmce-blue font-bold">
              Session: {placementYear}
            </p>
          </div>
        </div>

        {isEditing ? (
          <MarkdownEditor
            value={markdown}
            onSave={(value) =>
              updateData(`placements.details.${placementYear}`, value)
            }
            showDocImport
            docTemplateUrl="/uploads/documents/pride_templates/cse_placement_details_template.docx"
            docTemplateLabel="Download Placement Template"
            placeholder="Paste or import placement data (Markdown) here..."
          />
        ) : (
          <MbaPrideMdView markdown={markdown} />
        )}
      </div>
    );
  };

  // Activity helper
  const updateActivity = (idx, field, value) => {
    const storedActivitiesMarkdown = t("activitiesMarkdown", "");
    const parsedActivities = parseMbaActivitiesMarkdown(
      storedActivitiesMarkdown,
    );
    const sourceActivities = (
      parsedActivities.length
        ? parsedActivities
        : t("activities", defaultMbaActivityCards)
    ).map(normalizeMbaActivity);

    if (!sourceActivities[idx]) return;

    const nextActivities = sourceActivities.map((activity, activityIndex) =>
      activityIndex === idx
        ? normalizeMbaActivity({
            ...activity,
            [field]: value,
          })
        : activity,
    );

    updateData("activities", nextActivities);
    updateData("activitiesMarkdown", mbaActivitiesToMarkdown(nextActivities));
  };

  // Newsletter helper
  const updateNewsletter = (type, index, field, value) => {
    if (type === "latest") {
      const latest = JSON.parse(
        JSON.stringify(t("newsletters_latest", defaultNewsletters.latest)),
      );
      latest[field] = value;
      updateData("newsletters_latest", latest);
    } else {
      const archives = JSON.parse(
        JSON.stringify(t("newsletters_archives", defaultNewsletters.archives)),
      );
      archives[index][field] = value;
      updateData("newsletters_archives", archives);
    }
  };

  const getStoredMbaValue = (key) =>
    activeData?.[key] ?? activeData?.templateData?.[key];

  const latestNewsletterData =
    getStoredMbaValue("newsletters_latest") || defaultNewsletters.latest;
  const newsletterArchivesData =
    getStoredMbaValue("newsletters_archives") ||
    defaultNewsletters.archives ||
    [];

  const createEmptyLatestNewsletter = () => ({
    title: "New Newsletter",
    description: "",
    link: "",
    fileName: "",
    date: "",
    term: "",
  });

  const createArchiveFromLatest = (latest) => ({
    date: latest?.date || "",
    vol: latest?.title || "New Newsletter",
    term: latest?.term || "",
    link: latest?.link || "",
    fileName: latest?.fileName || "",
  });

  const createLatestFromArchive = (archive) => ({
    title: archive?.vol || "New Newsletter",
    description: "",
    link: archive?.link || "",
    fileName: archive?.fileName || "",
    date: archive?.date || "",
    term: archive?.term || "",
  });

  const getNewsletterFileName = (link, fileName) => {
    if (fileName) return fileName;
    if (!link) return "No file uploaded";

    const lastSegment = String(link).split("/").pop() || "";
    return decodeURIComponent(lastSegment);
  };

  const getDeletableUploadPath = (link) => {
    if (typeof link !== "string" || !link.startsWith("/uploads/")) return null;
    if (link.includes("..")) return null;
    if (!link.startsWith("/uploads/documents/")) return null;
    return link;
  };

  const deleteNewsletterFileIfNeeded = async (link) => {
    const deletablePath = getDeletableUploadPath(link);
    if (!deletablePath) return;

    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      await apiClient.delete("/upload/file", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          path: deletablePath,
        },
      });
    } catch (error) {
      console.error("Newsletter file delete skipped:", error);
    }
  };

  const addNewsletter = () => {
    const currentLatest = JSON.parse(
      JSON.stringify(latestNewsletterData || defaultNewsletters.latest),
    );
    const currentArchives = JSON.parse(
      JSON.stringify(newsletterArchivesData || defaultNewsletters.archives),
    );

    const nextArchives = currentLatest?.title
      ? [createArchiveFromLatest(currentLatest), ...currentArchives]
      : currentArchives;

    updateData("newsletters_latest", createEmptyLatestNewsletter());
    updateData("newsletters_archives", nextArchives);
  };

  const deleteNewsletter = async (type, index) => {
    if (type === "latest") {
      const currentLatest = JSON.parse(
        JSON.stringify(latestNewsletterData || defaultNewsletters.latest),
      );
      const currentArchives = JSON.parse(
        JSON.stringify(newsletterArchivesData || defaultNewsletters.archives),
      );

      await deleteNewsletterFileIfNeeded(currentLatest?.link);

      if (currentArchives.length > 0) {
        const [nextLatest, ...remainingArchives] = currentArchives;
        updateData("newsletters_latest", createLatestFromArchive(nextLatest));
        updateData("newsletters_archives", remainingArchives);
      } else {
        updateData("newsletters_latest", createEmptyLatestNewsletter());
        updateData("newsletters_archives", []);
      }
      return;
    }

    const currentArchives = JSON.parse(
      JSON.stringify(newsletterArchivesData || defaultNewsletters.archives),
    );
    const archiveToDelete = currentArchives[index];

    await deleteNewsletterFileIfNeeded(archiveToDelete?.link);

    updateData(
      "newsletters_archives",
      currentArchives.filter((_, archiveIndex) => archiveIndex !== index),
    );
  };

  const uploadNewsletterFile = async (type, index, file) => {
    if (!file) return;

    const uploadKey = `${type}-${index}`;
    setNewsletterUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setNewsletterUploadErrors((prev) => ({ ...prev, [uploadKey]: "" }));

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

      if (!response.data.fileUrl) {
        throw new Error("Upload did not return a file URL.");
      }

      if (type === "latest") {
        const latest = JSON.parse(
          JSON.stringify(latestNewsletterData || defaultNewsletters.latest),
        );
        updateData("newsletters_latest", {
          ...latest,
          link: response.data.fileUrl,
          fileName: response.data.originalName || file.name,
        });
      } else {
        const archives = JSON.parse(
          JSON.stringify(newsletterArchivesData || defaultNewsletters.archives),
        );
        archives[index] = {
          ...archives[index],
          link: response.data.fileUrl,
          fileName: response.data.originalName || file.name,
        };
        updateData("newsletters_archives", archives);
      }
    } catch (error) {
      console.error("Newsletter upload failed:", error);
      setNewsletterUploadErrors((prev) => ({
        ...prev,
        [uploadKey]:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Upload failed",
      }));
    } finally {
      setNewsletterUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const handleNewsletterFileChange = (type, index, event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file for the newsletter.");
      return;
    }

    uploadNewsletterFile(type, index, file);
  };

  const getCourseMaterials = () =>
    JSON.parse(JSON.stringify(t("courseMaterials", defaultCourseMaterials)));

  const updateCourseMaterial = (index, field, value) => {
    const items = getCourseMaterials();
    if (!items[index]) return;
    items[index] = { ...items[index], [field]: value };
    updateData("courseMaterials", items);
  };

  const addCourseMaterial = () => {
    updateData("courseMaterials", [
      ...getCourseMaterials(),
      { year: "New Year", title: "New Semester", link: "#" },
    ]);
    setShouldScrollToNewCourseMaterial(true);
  };

  const deleteCourseMaterial = (index) => {
    updateData(
      "courseMaterials",
      getCourseMaterials().filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const courseMaterialItems = t("courseMaterials", defaultCourseMaterials) || [];

  useEffect(() => {
    if (
      !shouldScrollToNewCourseMaterial ||
      !isEditing ||
      activeTab !== "course-material"
    ) {
      return;
    }

    if (latestCourseMaterialRef.current) {
      latestCourseMaterialRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setShouldScrollToNewCourseMaterial(false);
    }
  }, [
    shouldScrollToNewCourseMaterial,
    isEditing,
    activeTab,
    courseMaterialItems.length,
  ]);

  const getAchievementItems = (section) =>
    JSON.parse(
      JSON.stringify(t(`achievements.${section}`, defaultAchievements[section] || [])),
    );

  const achievementsToMarkdown = (section, items = []) =>
    items
      .map((item, index) => {
        const title = item?.achievement || `Achievement ${index + 1}`;
        const name = item?.name || "Name";
        const category = item?.category || "Category";
        const description = String(item?.description || "").trim();
        const image = String(item?.image || "").trim();

        return [
          `### ${title}`,
          "",
          `- **Name:** ${name}`,
          `- **Category:** ${category}`,
          ...(image ? [`- **Certificate:** [View File](${image})`] : []),
          "",
          description || "Add achievement description.",
        ].join("\n");
      })
      .join("\n\n---\n\n");

  const persistAchievementItems = (section, items) => {
    updateData(`achievements.${section}`, items);
    updateData(
      `achievementsMarkdown.${section}`,
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
        achievement: "New Achievement",
        description: "Add achievement description.",
        category: "Recognition",
        image: "",
      },
      ...items,
    ];
    persistAchievementItems(section, nextItems);
  };

  const getAchievementDeletableUploadPath = (link) => {
    if (typeof link !== "string" || !link.startsWith("/uploads/")) return null;
    if (link.includes("..")) return null;
    return link;
  };

  const deleteAchievementFileIfNeeded = async (link) => {
    const deletablePath = getAchievementDeletableUploadPath(link);
    if (!deletablePath) return;

    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      await apiClient.delete("/upload/file", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          path: deletablePath,
        },
      });
    } catch (error) {
      console.error("Achievement file delete skipped:", error);
    }
  };

  const deleteAchievement = async (section, index) => {
    const items = getAchievementItems(section);
    const itemToDelete = items[index];

    await deleteAchievementFileIfNeeded(itemToDelete?.image);

    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
    persistAchievementItems(section, nextItems);

    const uploadKey = `${section}-${index}`;
    setAchievementUploadErrors((prev) => ({ ...prev, [uploadKey]: "" }));
    setAchievementUploadSuccess((prev) => ({ ...prev, [uploadKey]: "" }));
  };

  const getAchievementFileName = (link) => {
    if (!link) return "No file uploaded";
    const lastSegment = String(link).split("/").pop() || "";
    return decodeURIComponent(lastSegment);
  };

  const uploadAchievementFile = async (section, index, file) => {
    if (!file) return;

    const uploadKey = `${section}-${index}`;
    setAchievementUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setAchievementUploadErrors((prev) => ({ ...prev, [uploadKey]: "" }));
    setAchievementUploadSuccess((prev) => ({ ...prev, [uploadKey]: "" }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("adminToken");
      const response = await apiClient.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.fileUrl) {
        throw new Error("Upload did not return a file URL.");
      }

      const items = getAchievementItems(section);
      if (!items[index]) return;

      items[index] = {
        ...items[index],
        image: response.data.fileUrl,
      };
      persistAchievementItems(section, items);
      setAchievementUploadSuccess((prev) => ({
        ...prev,
        [uploadKey]: "Uploaded successfully",
      }));
    } catch (error) {
      console.error("Achievement upload failed:", error);
      setAchievementUploadErrors((prev) => ({
        ...prev,
        [uploadKey]:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Upload failed",
      }));
    } finally {
      setAchievementUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const handleAchievementFileChange = (section, index, event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    uploadAchievementFile(section, index, file);
  };

  const legacyActivities = (
    t("activities", defaultMbaActivityCards) || defaultMbaActivityCards
  ).map(normalizeMbaActivity);
  const storedActivitiesMarkdown = t("activitiesMarkdown", "");
  const parsedActivities = parseMbaActivitiesMarkdown(storedActivitiesMarkdown);
  const activitiesData = parsedActivities.length
    ? parsedActivities
    : legacyActivities;

  const updateActivityList = (updater) => {
    const nextActivities = updater(
      activitiesData.map((activity) => normalizeMbaActivity(activity)),
    );
    updateData("activities", nextActivities);
    updateData("activitiesMarkdown", mbaActivitiesToMarkdown(nextActivities));
  };

  const addActivityCard = () => {
    updateActivityList((items) => [
      {
        title: "New Curricular Activity",
        date: "Add activity date",
        participants: "Add participant details",
        organizer: "MBA Department, SSGMCE",
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

  const mbaActivityMarkdownComponents = {
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
      return <p className="text-gray-400 italic leading-relaxed">{emptyText}</p>;
    }

    return (
      <div className="prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-ol:my-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={mbaActivityMarkdownComponents}
        >
          {trimmedValue}
        </ReactMarkdown>
      </div>
    );
  };

  // Pride section helper functions
  const updatePrideToppers = (yearIdx, recordIdx, field, val) => {
    const newData = JSON.parse(
      JSON.stringify(t("pride.toppers", defaultPrideToppers)),
    );
    newData[yearIdx].records[recordIdx][field] = val;
    updateData("pride.toppers", newData);
  };

  const updateOverviewTable = (path, defaultArr, rowIdx, cellIdx, val) => {
    const newData = JSON.parse(JSON.stringify(t(path, defaultArr)));
    newData[rowIdx][cellIdx] = val;
    updateData(path, newData);
  };

  // Default curriculum items for Scheme & Syllabus
  const DEFAULT_CURRICULUM_MBA = [
    { label: "Scheme", link: "#", fileName: null, fileUrl: null },
    {
      label: "Syllabus First Year (1st & 2nd Sem)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Syllabus Second Year (3rd Sem)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Syllabus Second Year (4th Sem)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
  ];

  const DEFAULT_CURRICULUM_PHD = [
    {
      label: "Scheme and Syllabus Ph.D.",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
  ];

  // Curriculum management functions
  const updateCurriculumItem = (section, index, field, value) => {
    const key = `templateData.curriculum.${section}`;
    const defaults =
      section === "mba" ? DEFAULT_CURRICULUM_MBA : DEFAULT_CURRICULUM_PHD;
    const items = JSON.parse(JSON.stringify(t(key, defaults)));
    items[index] = { ...items[index], [field]: value };
    updateField(key, items);
  };

  const addCurriculumItem = (section) => {
    const key = `templateData.curriculum.${section}`;
    const defaults =
      section === "mba" ? DEFAULT_CURRICULUM_MBA : DEFAULT_CURRICULUM_PHD;
    const items = JSON.parse(JSON.stringify(t(key, defaults)));
    items.push({
      label: "New Syllabus Item",
      link: "#",
      fileName: null,
      fileUrl: null,
    });
    updateField(key, items);
  };

  const uploadCurriculumFile = async (section, index, file) => {
    if (!file) return;
    const uploadKey = `${section}-${index}`;
    setUploadingFiles((prev) => ({ ...prev, [uploadKey]: true }));
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
      if (response.data.fileUrl) {
        const key = `templateData.curriculum.${section}`;
        const defaults =
          section === "mba" ? DEFAULT_CURRICULUM_MBA : DEFAULT_CURRICULUM_PHD;
        const items = JSON.parse(JSON.stringify(t(key, defaults)));
        items[index] = {
          ...items[index],
          fileUrl: response.data.fileUrl,
          fileName: response.data.originalName,
          link: response.data.fileUrl,
        };
        updateField(key, items);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const handleCurriculumFileChange = (section, index, event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      uploadCurriculumFile(section, index, file);
    } else {
      alert("Please select a PDF file.");
    }
  };

  const removeCurriculumItem = (section, index) => {
    const key = `templateData.curriculum.${section}`;
    const defaults =
      section === "mba" ? DEFAULT_CURRICULUM_MBA : DEFAULT_CURRICULUM_PHD;
    const items = JSON.parse(JSON.stringify(t(key, defaults)));
    items.splice(index, 1);
    updateField(key, items);
    setSelectedCurriculumItems(
      selectedCurriculumItems.filter((i) => i !== `${section}-${index}`),
    );
  };

  const toggleCurriculumSelection = (section, index) => {
    const key = `${section}-${index}`;
    if (selectedCurriculumItems.includes(key)) {
      setSelectedCurriculumItems(
        selectedCurriculumItems.filter((i) => i !== key),
      );
    } else {
      setSelectedCurriculumItems([...selectedCurriculumItems, key]);
    }
  };

  const deleteSelectedCurriculumItems = (section) => {
    const key = `templateData.curriculum.${section}`;
    const defaults =
      section === "mba" ? DEFAULT_CURRICULUM_MBA : DEFAULT_CURRICULUM_PHD;
    const items = JSON.parse(JSON.stringify(t(key, defaults)));
    const sectionSelected = selectedCurriculumItems
      .filter((k) => k.startsWith(`${section}-`))
      .map((k) => parseInt(k.split("-")[1]));
    const newItems = items.filter((_, i) => !sectionSelected.includes(i));
    updateField(key, newItems);
    setSelectedCurriculumItems(
      selectedCurriculumItems.filter((k) => !k.startsWith(`${section}-`)),
    );
  };

  const academicsLinks = [
    { id: "overview", label: "Department Overview" },
    { id: "hod", label: "Words from HOD" },
    { id: "vision-mission", label: "Vision, Mission, PEO & PO" },
    { id: "course-outcomes", label: "Course Outcomes" },
    { id: "curriculum", label: "Scheme and Syllabus" },
    { id: "ranking", label: "Business School Ranking" },
    { id: "pride", label: "Pride of the Department" },
    { id: "achievements", label: "Achievements and Awards" },
    { id: "newsletter", label: "Newsletter" },
    { id: "accreditations", label: "Recognitions and Accreditations" },
    { id: "placements", label: "Placement Statistics" },
    { id: "activities", label: "Curricular Activities" },
    { id: "projects", label: "UG/PG Projects (Dissertation)" },
    { id: "course-material", label: "Course Material" },
    { id: "faculty", label: "Faculty Members" },
  ];

  const industryLinks = [
    { id: "mous", label: "MoUs" },
    { id: "industrial-visits", label: "Industry Interaction and Tours" },
    { id: "guest-lectures", label: "Corporate Leader Speak's" },
    { id: "workshops", label: "MDP's, FDP's and Workshop" },
    { id: "consultancy", label: "Consultancy" },
    { id: "patents", label: "Patent & Publication" },
  ];

  // Faculty data - use resolved defaults with photos
  const facultyData = resolvedMbaFaculty.map((f) => ({
    ...f,
    designation: f.role,
    specialization: f.area ? f.area.join(", ") : "",
  }));

  const updateFacultyMember = (index, field, value) => {
    const faculty = JSON.parse(
      JSON.stringify(t("templateData.faculty", facultyData)),
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

  const content = {
    overview: (
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-orange-500 inline-block pb-2 w-fit">
              Department Overview
            </h3>

            <div className="prose max-w-none text-gray-600 leading-relaxed text-justify text-lg space-y-4">
              <div>
                <EditableText
                  value={t(
                    "templateData.overview.para1",
                    "The Department of Business Administration and Research was established as the first Post-Graduate Department of Shri Sant Gajanan Maharaj College of Engineering in the year 1994 to impart two year full time Post-Graduate Degree Course of Master of Business Administration (M.B.A.) with prior approval from All India Council for Technical Education, New Delhi and affiliation to Sant Gadge Baba Amravati University, Amravati, Maharashtra to meet the need for management education in rural India.",
                  )}
                  onSave={(val) =>
                    updateField("templateData.overview.para1", val)
                  }
                  multiline={true}
                  className="w-full"
                />
              </div>
              <div>
                <EditableText
                  value={t(
                    "templateData.overview.para2",
                    "The Department has made its dent in the management education of the region causing shift of the traditionally run annual pattern MBA to semester pattern. The qualitative attitude and students' centric approach coupled with industrial collaboration paid dividends to the department and its stakeholders.",
                  )}
                  onSave={(val) =>
                    updateField("templateData.overview.para2", val)
                  }
                  multiline={true}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section - Minimalistic */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              Courses @ Department
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                    Course Details
                  </th>
                  {isEditing && (
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-600 border border-gray-200 w-32">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* MBA */}
                <tr className="bg-white">
                  <td
                    colSpan={isEditing ? 3 : 2}
                    className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <EditableText
                        value={t(
                          "templateData.overview.headerBE",
                          "Master of Business Administration",
                        )}
                        onSave={(v) =>
                          updateField("templateData.overview.headerBE", v)
                        }
                      />
                      {isEditing && (
                        <button
                          onClick={() => {
                            const current = t(
                              "overview.tableBE",
                              defaultOverviewTableBE,
                            );
                            updateData("overview.tableBE", [
                              ...current,
                              ["New Field", "New Value"],
                            ]);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs ml-2"
                        >
                          + Add Row
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {t("overview.tableBE", defaultOverviewTableBE).map(
                  ([label, val], i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-sm font-bold text-gray-500 w-1/3 border border-gray-200 bg-gray-50/30">
                        <EditableText
                          value={label}
                          onSave={(v) =>
                            updateOverviewTable(
                              "overview.tableBE",
                              defaultOverviewTableBE,
                              i,
                              0,
                              v,
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 font-medium border border-gray-200">
                        <EditableText
                          value={val}
                          onSave={(v) =>
                            updateOverviewTable(
                              "overview.tableBE",
                              defaultOverviewTableBE,
                              i,
                              1,
                              v,
                            )
                          }
                          multiline
                        />
                      </td>
                      {isEditing && (
                        <td className="px-6 py-3 text-center border border-gray-200">
                          <button
                            onClick={() => {
                              const updated = t(
                                "overview.tableBE",
                                defaultOverviewTableBE,
                              ).filter((_, idx) => idx !== i);
                              updateData("overview.tableBE", updated);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
                            title="Delete row"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ),
                )}

                <tr className="bg-white">
                  <td
                    colSpan={isEditing ? 3 : 2}
                    className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200 mt-4"
                  >
                    <div className="flex justify-between items-center">
                      <EditableText
                        value={t(
                          "templateData.overview.headerME",
                          "Master of Engineering",
                        )}
                        onSave={(v) =>
                          updateField("templateData.overview.headerME", v)
                        }
                      />
                      {isEditing && (
                        <button
                          onClick={() => {
                            const current = t(
                              "overview.tableME",
                              defaultOverviewTableME,
                            );
                            updateData("overview.tableME", [
                              ...current,
                              ["New Field", "New Value"],
                            ]);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs ml-2"
                        >
                          + Add Row
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {t("overview.tableME", defaultOverviewTableME).map(
                  ([label, val], i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-sm font-bold text-gray-500 w-1/3 border border-gray-200 bg-gray-50/30">
                        <EditableText
                          value={label}
                          onSave={(v) =>
                            updateOverviewTable(
                              "overview.tableME",
                              defaultOverviewTableME,
                              i,
                              0,
                              v,
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 font-medium border border-gray-200">
                        <EditableText
                          value={val}
                          onSave={(v) =>
                            updateOverviewTable(
                              "overview.tableME",
                              defaultOverviewTableME,
                              i,
                              1,
                              v,
                            )
                          }
                          multiline
                        />
                      </td>
                      {isEditing && (
                        <td className="px-6 py-3 text-center border border-gray-200">
                          <button
                            onClick={() => {
                              const updated = t(
                                "overview.tableME",
                                defaultOverviewTableME,
                              ).filter((_, idx) => idx !== i);
                              updateData("overview.tableME", updated);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
                            title="Delete row"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ),
                )}

                {/* PhD */}
                <tr className="bg-white">
                  <td
                    colSpan={isEditing ? 3 : 2}
                    className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <EditableText
                        value={t(
                          "templateData.overview.headerPhD",
                          "Ph. D in Business Management and Research",
                        )}
                        onSave={(v) =>
                          updateField("templateData.overview.headerPhD", v)
                        }
                      />
                      {isEditing && (
                        <button
                          onClick={() => {
                            const current = t(
                              "overview.tablePhD",
                              defaultOverviewTablePhD,
                            );
                            updateData("overview.tablePhD", [
                              ...current,
                              ["New Field", "New Value"],
                            ]);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs ml-2"
                        >
                          + Add Row
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {t("overview.tablePhD", defaultOverviewTablePhD).map(
                  ([label, val], i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-sm font-bold text-gray-500 w-1/3 border border-gray-200 bg-gray-50/30">
                        <EditableText
                          value={label}
                          onSave={(v) =>
                            updateOverviewTable(
                              "overview.tablePhD",
                              defaultOverviewTablePhD,
                              i,
                              0,
                              v,
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 font-medium border border-gray-200">
                        <EditableText
                          value={val}
                          onSave={(v) =>
                            updateOverviewTable(
                              "overview.tablePhD",
                              defaultOverviewTablePhD,
                              i,
                              1,
                              v,
                            )
                          }
                          multiline
                        />
                      </td>
                      {isEditing && (
                        <td className="px-6 py-3 text-center border border-gray-200">
                          <button
                            onClick={() => {
                              const updated = t(
                                "overview.tablePhD",
                                defaultOverviewTablePhD,
                              ).filter((_, idx) => idx !== i);
                              updateData("overview.tablePhD", updated);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
                            title="Delete row"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="text-ssgmce-blue font-medium">
              <EditableText
                value={t("hodName", "Dr. P. M. Kuchar")}
                onSave={(v) => updateField("hodName", v)}
                placeholder="Click to edit HOD name..."
              />
            </div>
            <div className="text-sm text-gray-500">
              <EditableText
                value={t(
                  "overview.footerDesignation",
                  "Head, Department of Business Administration and Research (MBA)",
                )}
                onSave={(v) => updateField("overview.footerDesignation", v)}
                placeholder="Click to edit designation..."
              />
            </div>
          </div>
        </div>
      </div>
    ),

    "vision-mission": (
      <div className="space-y-10">
        {/* Top Section: Vision & Mission Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 bg-gray-50/50">
            {["vision", "mission"].map((tab) => (
              <button
                key={tab}
                onClick={() => setVmTab(tab)}
                className={`px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all relative ${
                  vmTab === tab
                    ? "text-ssgmce-blue bg-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
                {vmTab === tab && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-ssgmce-blue"></div>
                )}
              </button>
            ))}
          </div>
          <div className="p-8 min-h-[160px] flex items-center w-full">
            {vmTab === "vision" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 w-full"
              >
                {(Array.isArray(t("vision")) ? t("vision") : defaultVision).map(
                  (item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-1 text-ssgmce-orange text-2xl flex-shrink-0">
                        ➤
                      </div>
                      <div className="text-lg text-gray-700 leading-relaxed font-medium flex-1">
                        <MarkdownEditor
                          value={item}
                          onSave={(val) => {
                            const current = Array.isArray(t("vision"))
                              ? [...t("vision")]
                              : [...defaultVision];
                            current[i] = val;
                            updateField("vision", current);
                          }}
                          placeholder="Click to edit vision item..."
                          className="w-full"
                        />
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => {
                            const arr = (
                              Array.isArray(t("vision"))
                                ? t("vision")
                                : defaultVision
                            ).filter((_, idx) => idx !== i);
                            updateField("vision", arr);
                          }}
                          className="flex-shrink-0 mt-1 text-red-400 hover:text-red-600 text-sm font-bold px-2"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ),
                )}
                {isEditing && (
                  <button
                    onClick={() => {
                      const arr = [
                        ...(Array.isArray(t("vision"))
                          ? t("vision")
                          : defaultVision),
                        "New vision statement.",
                      ];
                      updateField("vision", arr);
                    }}
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium"
                  >
                    + Add Vision Item
                  </button>
                )}
              </motion.div>
            )}
            {vmTab === "mission" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 w-full"
              >
                {t("mission", defaultMission).map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 text-ssgmce-orange text-xl">➤</div>
                    <div className="text-gray-700 w-full">
                      <MarkdownEditor
                        value={item}
                        onSave={(val) => {
                          const current = [...t("mission", defaultMission)];
                          current[i] = val;
                          updateField("mission", current);
                        }}
                        placeholder="Click to edit mission item..."
                        className="w-full"
                      />
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const arr = t("mission", defaultMission).filter(
                            (_, idx) => idx !== i,
                          );
                          updateField("mission", arr);
                        }}
                        className="flex-shrink-0 mt-1 text-red-400 hover:text-red-600 text-sm font-bold px-2"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => {
                      updateField("mission", [
                        ...t("mission", defaultMission),
                        "New mission statement.",
                      ]);
                    }}
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium"
                  >
                    + Add Mission Item
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Section: PEO, PO Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50">
            {[
              { id: "peo", label: "Program Educational Objectives" },
              { id: "po", label: "Program Outcomes" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPoTab(tab.id)}
                className={`px-6 py-4 font-bold text-sm transition-all relative whitespace-nowrap ${
                  poTab === tab.id
                    ? "text-white bg-[#003366]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {poTab === "peo" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {t("peo", defaultPeo).map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 text-ssgmce-orange text-xl">➤</div>
                    <div className="text-gray-700 leading-relaxed font-medium w-full">
                      <MarkdownEditor
                        value={item}
                        onSave={(val) => {
                          const updated = [...t("peo", defaultPeo)];
                          updated[i] = val;
                          updateField("peo", updated);
                        }}
                        placeholder="Click to edit PEO item..."
                        className="w-full"
                      />
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const arr = t("peo", defaultPeo).filter(
                            (_, idx) => idx !== i,
                          );
                          updateField("peo", arr);
                        }}
                        className="flex-shrink-0 mt-1 text-red-400 hover:text-red-600 text-sm font-bold px-2"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => {
                      updateField("peo", [
                        ...t("peo", defaultPeo),
                        "New program educational objective.",
                      ]);
                    }}
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium"
                  >
                    + Add PEO Item
                  </button>
                )}
              </motion.div>
            )}

            {poTab === "po" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {t("po", defaultPo)
                    .slice(0, showAllPos ? undefined : 4)
                    .map((po, i) => (
                      <div
                        key={i}
                        className="text-gray-700 leading-relaxed text-sm"
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-1">
                            <strong className="text-gray-900 block mb-1 text-base">
                              <EditableText
                                value={po.t}
                                onSave={(val) => {
                                  const updated = JSON.parse(
                                    JSON.stringify(t("po", defaultPo)),
                                  );
                                  updated[i].t = val;
                                  updateField("po", updated);
                                }}
                              />
                              :
                            </strong>
                            <MarkdownEditor
                              value={po.d}
                              onSave={(val) => {
                                const updated = JSON.parse(
                                  JSON.stringify(t("po", defaultPo)),
                                );
                                updated[i].d = val;
                                updateField("po", updated);
                              }}
                              placeholder="Click to edit PO description..."
                              className="w-full"
                            />
                          </div>
                          {isEditing && (
                            <button
                              onClick={() => {
                                const arr = t("po", defaultPo).filter(
                                  (_, idx) => idx !== i,
                                );
                                updateField("po", arr);
                              }}
                              className="flex-shrink-0 mt-1 text-red-400 hover:text-red-600 text-sm font-bold px-2"
                              title="Remove item"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                <button
                  onClick={() => setShowAllPos(!showAllPos)}
                  className="text-ssgmce-blue hover:text-ssgmce-orange font-medium text-sm transition-colors"
                >
                  {showAllPos
                    ? "Read Less ▲"
                    : `Read More ▼ (${t("po", defaultPo).length - 4} more)`}
                </button>
                {isEditing && (
                  <button
                    onClick={() => {
                      updateField("po", [
                        ...t("po", defaultPo),
                        {
                          t: "New PO Title",
                          d: "New program outcome description.",
                        },
                      ]);
                    }}
                    className="ml-4 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium"
                  >
                    + Add PO Item
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    ),

    hod: (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Profile Section - Horizontal Layout */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-ssgmce-blue to-ssgmce-orange rounded-2xl blur opacity-25"></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white group w-72 md:w-80 lg:w-96">
                  <EditableImage
                    src={t("hod.photo", hodPhoto)}
                    onSave={(url) => updateField("hod.photo", url)}
                    alt="Dr. P. M. Kuchar - HOD MBA"
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                <EditableText
                  value={t("hod.name", "Dr. P. M. Kuchar")}
                  onSave={(v) => updateField("hod.name", v)}
                  placeholder="Click to edit HOD name..."
                />
              </h3>
              <div className="text-ssgmce-blue font-bold text-sm mt-1 uppercase tracking-wide">
                <EditableText
                  value={t("hod.role", "Head of Department")}
                  onSave={(v) => updateField("hod.role", v)}
                  placeholder="Click to edit role..."
                />
              </div>
              <p className="text-gray-600 text-sm mt-1">
                <EditableText
                  value={t(
                    "hod.departmentTitle",
                    "Business Administration and Research (MBA)",
                  )}
                  onSave={(v) => updateField("hod.departmentTitle", v)}
                  placeholder="Click to edit department title..."
                />
              </p>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaEnvelope className="mr-2 text-ssgmce-orange" />
                  <span>
                    <EditableText
                      value={t("hod.email", "pmkuchar@ssgmce.ac.in")}
                      onSave={(v) => updateField("hod.email", v)}
                      placeholder="Click to edit email..."
                    />
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-ssgmce-blue">
                  <EditableText
                    value={t("hod.badge1", "Ph.D")}
                    onSave={(v) => updateField("hod.badge1", v)}
                    placeholder="Badge 1..."
                  />
                </span>
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-ssgmce-blue">
                  <EditableText
                    value={t("hod.badge2", "MBA")}
                    onSave={(v) => updateField("hod.badge2", v)}
                    placeholder="Badge 2..."
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Section - Below Photo */}
        <div className="p-8 md:p-10 relative bg-white">
          <FaQuoteLeft className="absolute top-8 right-8 text-6xl text-blue-50 -z-0" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800">
                <EditableText
                  value={t("hod.messageTitle", "Message from the HOD")}
                  onSave={(v) => updateField("hod.messageTitle", v)}
                  placeholder="Click to edit title..."
                />
              </h3>
              <div className="h-1 w-20 bg-ssgmce-orange mt-2 rounded-full mx-auto"></div>
            </div>

            <div className="space-y-4 text-gray-700 text-base leading-relaxed text-justify">
              <MarkdownEditor
                value={t(
                  "hod.message",
                  "Dear Friends,\n\nThe Department of Business Administration and Research was established as the **first Post-Graduate Department** of Shri Sant Gajanan Maharaj College of Engineering in the year **1994** to impart two year full time Post-Graduate Degree Course of Master of Business Administration (**M.B.A.**) with prior approval from **All India Council for Technical Education, New Delhi** and affiliation to **Sant Gadge Baba Amravati University, Amravati, Maharashtra** to meet the need for management education in rural India.\n\nThe Department made its dent in the management education of the region causing **shift** of the traditionally run **annual pattern MBA** of the affiliating university to **semester pattern** and then went on to its individual run for quality management education with distinction for others in the region to imbibe. The qualitative attitude and students' centric approach coupled with industrial collaboration paid dividends to the department and its stakeholders which came in form of **NBA Accreditations** (first in 2002, second in 2007 and third time accreditation in 2013), **NAAC Accreditations** (first in 2002 and second in 2010), **ISO Certification**, **Business India Best B-Schools Ranking** (continuously since 2010), ranking amongst **India's top 100 B-Schools** by **Career Outlook Survey** continuously since 2015.\n\n**Management College of the Year Award** by **Higher Education Review Magazine** continuously for two years in 2016 and 2017, **Dewang Mehta Education Leadership Award 2015 and 2016**, ranking under **Excellent Placement Category** by **Go-Education Survey** and rankings by similar other national surveys including one by **Business Today** etc. **Gold Medal awards** to its students for their consistent performance in university examinations, their satisfactory placements in India and abroad and above all some of the outstanding entrepreneurial ventures established by our alumni.\n\nThe march is on which has begun in small way through international exposures to our students from CEOs (like Dr. Vikram Pandit of **Citibank, USA** and Mr. Pradeep Andhare of **FOTONS Ltd., China**) and academicians (like Prof. Rajiv Lall of **Harvard Business School, USA**) and internalization of academic excellence parameters like research and publications, academic visits abroad, MoUs, intense industry-interaction, host of co-curricular activities and so on and so forth.\n\n*Wishing you all a successful and fulfilling academic journey ahead.*",
                )}
                onSave={(v) => updateField("hod.message", v)}
                placeholder="Click to edit HOD message (Markdown supported)..."
                className="w-full"
              />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
              <div>
                <div className="font-dancing text-2xl text-ssgmce-blue">
                  <EditableText
                    value={t("hod.name", "Dr. P. M. Kuchar")}
                    onSave={(v) => updateField("hod.name", v)}
                    placeholder="Click to edit HOD name..."
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <EditableText
                    value={t(
                      "hod.role",
                      "Head, Department of Business Administration and Research (MBA)",
                    )}
                    onSave={(v) => updateField("hod.role", v)}
                    placeholder="Click to edit designation..."
                  />
                </div>
              </div>
              <div className="text-right text-sm text-gray-400">
                <EditableText
                  value={t(
                    "hod.collegeName",
                    "Shri Sant Gajanan Maharaj\nCollege of Engineering, Shegaon",
                  )}
                  onSave={(v) => updateField("hod.collegeName", v)}
                  placeholder="Click to edit college name..."
                  multiline
                  richText={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    faculty: (
      <div className="space-y-10">
        <div className="text-center border-b border-gray-200 pb-6 mb-8">
          <h3 className="text-3xl font-bold text-gray-900">Our Faculty</h3>
          <p className="text-gray-500 mt-2">
            Department of Business Administration and Research (MBA)
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {t("templateData.faculty", facultyData).map((fac, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex ${
                isEditing && expandedFacultyEditorIndex === i ? "lg:col-span-2" : ""
              }`}
            >
              {/* Image Area - Fixed Width */}
              <div className="w-32 sm:w-40 bg-gray-50 flex-shrink-0 relative overflow-hidden border-r border-gray-100">
                {fac.photo ? (
                  <EditableImage
                    src={fac.photo}
                    onSave={(val) => updateFacultyMember(i, "photo", val)}
                    alt={fac.name || "Faculty"}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaUserTie className="text-5xl text-gray-300" />
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-5 flex-1 flex flex-col justify-center">
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-ssgmce-blue transition-colors">
                  <Link
                    to={`/faculty/${fac.id}`}
                    state={{ from: getPathWithTab(location, "faculty") }}
                    className="hover:underline"
                  >
                    <EditableText
                      value={fac.name}
                      onSave={(val) => updateFacultyMember(i, "name", val)}
                    />
                  </Link>
                </h4>
                <p className="text-ssgmce-blue font-medium text-sm mb-3 uppercase tracking-wide text-[11px]">
                  <EditableText
                    value={fac.designation}
                    onSave={(val) => updateFacultyMember(i, "designation", val)}
                  />
                </p>

                {/* Compact Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  {fac.specialization && (
                    <p className="line-clamp-2 text-xs">
                      <span className="font-bold text-gray-700">Area: </span>
                      <EditableText
                        value={fac.specialization}
                        onSave={(val) =>
                          updateFacultyMember(i, "specialization", val)
                        }
                      />
                    </p>
                  )}

                  <div className="pt-2 flex flex-col gap-1">
                    {fac.email && (
                      <span className="flex items-center hover:text-ssgmce-blue transition-colors truncate text-xs">
                        <FaEnvelope className="mr-2 text-gray-400" />
                        <EditableText
                          value={fac.email}
                          onSave={(val) => updateFacultyMember(i, "email", val)}
                        />
                      </span>
                    )}
                    {fac.phone && (
                      <span className="flex items-center text-xs">
                        <FaPhone className="mr-2 text-gray-400" />
                        <EditableText
                          value={fac.phone}
                          onSave={(val) => updateFacultyMember(i, "phone", val)}
                        />
                      </span>
                    )}
                  </div>

                  {resolveVidwanUrl(fac) && (
                    <a
                      href={resolveVidwanUrl(fac)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[10px] font-bold text-emerald-600 mt-2 hover:underline uppercase tracking-wide"
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
                                updateFacultyMember(i, "id", createFacultySlug(val))
                              }
                            />
                          </div>
                          <div>
                            <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">
                              Vidwan ID
                            </div>
                            <EditableText
                              value={fac.vidwanId || ""}
                              onSave={(val) => updateFacultyMember(i, "vidwanId", val)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">
                              Vidwan Link
                            </div>
                            <EditableText
                              value={fac.vidwanLink || ""}
                              onSave={(val) => updateFacultyMember(i, "vidwanLink", val)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">
                              Designation
                            </div>
                            <EditableText
                              value={fac.designation || fac.role || ""}
                              onSave={(val) => {
                                updateFacultyMember(i, "designation", val);
                                updateFacultyMember(i, "role", val);
                              }}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">
                              Specialization
                            </div>
                            <EditableText
                              value={fac.specialization || ""}
                              onSave={(val) => {
                                updateFacultyMember(i, "specialization", val);
                                updateFacultyMember(
                                  i,
                                  "area",
                                  splitFacultyMultiline(
                                    val.split(",").join("\n"),
                                  ),
                                );
                              }}
                              multiline
                              richText={false}
                            />
                          </div>
                          {[
                            ["qualification", "Qualification", false],
                            ["experience", "Experience", false],
                            ["scholarIds", "Scholar IDs", false],
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
          {isEditing && (
            <button
              type="button"
              onClick={() =>
                updateField("templateData.faculty", [
                  ...t("templateData.faculty", facultyData),
                  {
                    id: `new-faculty-${Date.now()}`,
                    name: "New Faculty Member",
                    designation: "Assistant Professor",
                    role: "Assistant Professor",
                    specialization: "Add specialization",
                    area: ["Add specialization"],
                    email: "newfaculty@ssgmce.ac.in",
                    phone: "+91XXXXXXXXXX",
                    photo: "",
                    vidwanId: "",
                    vidwanLink: "",
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
                    department: "mba",
                  },
                ])
              }
              className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
            >
              + Add Faculty
            </button>
          )}
        </div>
      </div>
    ),

    "course-outcomes": (() => {
      const defaultSections = [
        {
          id: "mba-sem1",
          label: "M.B.A. Semester-I",
          content: `### 101 Managerial Economics

After successfully completing the course, students will be able to:

1. Develop a fundamental understanding of supply, demand, buyer surplus, seller's surplus, and elasticities.
2. Understand competitive markets and economic efficiency.
3. Use firm and industry cost analysis for production and strategic decisions.
4. Distinguish between different market structures and different business strategies.

### 102 Legal and Business Environment

After successfully completing the course, students will be able to:

1. Identify and evaluate the complexities of business environment and their impact on the business.
2. Analyze the relationships between Government and business and understand the political, economic, legal and social policies of the country.
3. Analyze current economic conditions in developing emerging markets, and evaluate present and future opportunities.
4. Understand the Industrial functioning and strategies to overcome challenges in competitive markets.

### 103 Financial Reporting, Statement and Analysis

After successfully completing the course, students will be able to:

1. Understand the basic concepts of accounting and also able to know the difference between accounting, financial accounting, management accounting and Cost accounting.
2. Prepare financial statements and also able to make decisions with the help of various financial analysis tools.
3. Acquainting the knowledge regarding various cost accounting concepts with analytical skills for its application in managerial decision making.
4. Able to present the financial results and position of a company relative to its industry by developing skills for interpretation to adopt for financial reporting purposes.

### 104 Indian Ethos and Business Ethics

After successfully completing the course, students will be able to:

1. Students will be acquainted with the fundamentals of Indian ethos and its relevance in the practical aspects.
2. Students will comprehend the allied root reasons and nature of ethical issues.
3. Aspirants will endeavor to find remedies for ethical issues being faced by organizations, employees, managers and policy makers.
4. Students will reflect a personality well equipped by values and spread the same at workplaces in future.

### 105 Organizational Behaviour

After successfully completing the course, students will be able to:

1. Aware the students regarding human interaction in an organization.
2. Finding what forces enhancing it for setting better results in attending the business goals.
3. Formulate approaches to reorient individual, team, managerial and leadership behavior in order to achieve organizational goals.
4. Able to analyze the behavior of individuals and groups in organizations in terms of the key factors that influence organizational behavior and demonstrate skills required for working in groups.

### 106 Computer Application for Business

After successfully completing the course, students will be able to:

1. Students will possess a comprehensive understanding of Management Information Systems, encompassing information concepts, subsystems, and the development phases of MIS.
2. Develop the basic understanding and describe various aspects of IT, including telecommunication and networks, data management systems, and IT-enabled services.
3. Students will be able to explain the decision-making process and the role of Information Systems in supporting decision-making phases, including the construction of Decision Support Systems.
4. Students will be able to understand the management issues associated with MIS, including information security and control, quality assurance, ethical and social dimensions, intellectual property rights, and the challenges of managing global information systems.

### 107 Business Statistics and Analytics for Decision Making

After successfully completing the course, students will be able to:

1. Develop an understanding of Business Statistics and Analytics and its managerial applications in the real business world.
2. Make the student familiar with statistical techniques in Business Decision Making.
3. Expand the knowledge of inferential statistics for developing criteria for decision making.
4. Understanding of basic and advance quantitative models in management decision making.`,
        },
        {
          id: "mba-sem2",
          label: "M.B.A. Semester-II",
          content: `### 201 Business Communication

After successfully completing the course, students will be able to:

1. Demonstrate students to verbal and non-verbal communication ability to solve workplace communication issues.
2. Create and deliver effective business presentations, using appropriate tools.
3. Draft effective business correspondence with brevity and clarity.
4. Develop the students for job market.

### 202 Marketing Management

After successfully completing the course, students will be able to:

1. Develop an understanding of the underlying concept, theories and strategies involved in the marketing of product and services.
2. Capable to apply the three steps of target marketing: market segmentation, target marketing, and market positioning.
3. Able to evaluate different distribution channel options and their suitability for the company's product.
4. Develop a suitable promotion mix (advertising, sales promotion, public relations, personal selling, and direct marketing etc.) for the product.

### 203 Corporate Finance

After successfully completing the course, students will be able to:

1. Aware of the basic concepts related to financial management, various techniques and tools to manage finance function.
2. Gaining the knowledge of principles and concepts used in financial decision making and familiarizing the students with the valuation of firm.
3. Able to find out the best course of action among several financial options with the technique of capital budgeting and restructuring.
4. Assessing the impact of corporate investment decisions in financing of working capital needs and the long term capital needs of the business organization.

### 204 Research Methodology

After successfully completing the course, students will be able to:

1. Understand the basics of marketing research, literature review and research design.
2. Understand the different tools and techniques of measurement, scaling and data collection.
3. Understand sampling, sample design and descriptive statistics.
4. Acquire an ability to conduct hypothesis testing.

### 205 Production and Operation Management

After successfully completing the course, students will be able to:

1. Equip students with process of planning, organizing and controlling activities of production.
2. Educate them on resources system used for transforming raw materials into value added products.
3. Explain the students various dimensions of production planning and control and their inter-linkages with forecasting.
4. Students can measure performance related to productivity and will be able to conduct basic industrial engineering study on men and machines.

### 206 Human Resource Management

After successfully completing the course, students will be able to:

1. Judge Human Resource Management scenario and practices for acquisition of manpower in India.
2. Implement Human Resource Development practices for development of human resources.
3. Judge their role according to problems and situations in human resource department.
4. Implement training methods and practices on employee development.
5. Project human resource management policies for any organization.

### 207 Entrepreneurship Development

After successfully completing the course, students will be able to:

1. Explore entrepreneurial path and acquaint them with the essential knowledge of starting new ventures.
2. Students will learn tools and techniques for generating, testing and developing innovative startup ideas into successful enterprise.`,
        },
        {
          id: "mba-sem3",
          label: "M.B.A. Semester-III",
          content: `### Common Subjects

### 301 International Business Environment

After successfully completing the course, students will be able to:

1. Get acquainted with the fundamentals of International trade and business.
2. Analyse and evaluate International marketing environment and the export procedures.
3. Analyse and evaluate Global logistics and Supply chain environment.
4. Analyse and evaluate International financial environments and working of institutions.

### 3101 Investment Analysis and Portfolio Management

After successfully completing the course, students will be able to:

1. Understand and get insights into investment analysis for investment decision making.
2. Acquire knowledge and skills on Technical and Fundamental analysis.
3. Understand concept of Equity valuation.
4. Learn the concept of Portfolio management along with different theories.

### 3102 Indian Financial System and Financial Markets

After successfully completing the course, students will be able to:

1. Understand the role, function, components and regulation of the financial system in reference to the macro economy.
2. Identify the existence of regulatory authority and development of Banking and non-banking financial institutions.
3. Know the instruments, participants, structure and operation of various financial market working in India.
4. Assess the important role of development banks in the Indian financial system and create strategies to promote financial inclusion.

### 3103 Financial Derivatives and Risk Management

After successfully completing the course, students will be able to:

1. Describe and explain the fundamental features of a range of key financial derivatives instruments.
2. Solve problems requiring pricing derivative instruments and hedge market risk based on numerical data and current market trends.
3. Acquire ability to selection of various options strategies and able to determine option prices with Binomial and Black Scholes models.
4. Estimate the value of interest rate and foreign exchange swaps; Be able to understand the structure of commodity market.

### 3104 Behavioral Finance

After successfully completing the course, students will be able to:

1. Explain and demonstrate using empirical data the challenges to the efficient market hypothesis.
2. Explain the nature and forecast the consequences of key behavioural biases of investors.
3. Demonstrate the effect of Emotional Factors and Social Forces on investment.
4. Explain the psychological factors influencing decision-making.

### 3201 Retail Management

After successfully completing the course, students will be able to:

1. Acquaintance budding managers with knowledge of planning, designing, implementation and assessment of retail strategies based on consumer needs and prevailing trends.
2. Understands evolution of retail industry, strategies and apply in retail sector.
3. Understand characteristics of retail trading area, factors of site locations, information system requirements and techniques of customer retention.
4. Understand the role of ICT in retail management in today's market scenario.

### 3202 Consumer Behavior

After successfully completing the course, students will be able to:

1. Understand consumer behavior in totality and its application in marketing.
2. Understand marketing decisions and its interlink with consumer behavior.
3. Recognize social, technological, implications of marketing actions on consumer behavior.
4. Design Models and analyse latest trends which influence consumer behavior.

### 3203 Brand Management

After successfully completing the course, students will be able to:

1. Train students to manage product, and building brand equity in the market of an organization.
2. Give students an insight of managing brand over multiple categories, over time and across multiple market segments.
3. Gain knowledge and skills in brand architecture and brand engagement.
4. Build strategies for launching product across markets.

### 3204 Sales and Distribution Management

After successfully completing the course, students will be able to:

1. Learner understand importance of SDM in marketing functional and its interlinks with other functional areas.
2. Had knowledge and understand the diverse variables affecting sales and distribution functions and various plans of distribution.
3. Develop expertise in designing and effectively managing company's sales and distributions operations.
4. Understand fundamentals of distribution channels, logistics and supply chain management.

### 3301 Talent Acquisition and Development

After successfully completing the course, students will be able to:

1. Students will be able to understand and explain talent acquisition process and retain talent.
2. Students will be able to understand the interplay between various aspects of talent acquisition retention and development of talent.
3. Students will be able to analyse the need assessment of training and its methods.
4. Student will be able to learn to design training programme and also can explore issues and possible solutions for evaluating training.

### 3302 Employee Relations

After successfully completing the course, students will be able to:

1. Elaborate the IR perspective in detail.
2. Illustrate the role of trade union in the industrial setup.
3. Comprehend the causes and impact of industrial disputes.
4. Understand importance and process of developing and maintaining harmonious relationships between the management and all level of employees.

### 3303 Performance Management System

After successfully completing the course, students will be able to:

1. Explain the concept of performance management, challenges of performance management and different advantages of implementing well-designed performance management systems.
2. Understand that performance management is an on-going process composed of several sub-processes, such as performance planning, execution, assessment, and review.
3. Analyze different methods and approaches to performance measurement and also can identify some of the common challenges, problems with the performance appraisal process.
4. Design a performance management system and also can develop key skills involved in effective performance management and employee development.

### 3304 Compensation and Benefit Management

After successfully completing the course, students will be able to:

1. Students will be able to design rational and contemporary compensation systems in modern organization and analyse different types of rewarding procedures of employees on the basis of performance.
2. Students will be able to analyse, integrate, and apply the knowledge to solve compensation and reward related problems in organization. Students will be able to justify the existing pay structure to employees.
3. Students can hold the knowledge of the different softwares used for compensation management in this technological era.
4. Students will be able to summarize the important provisions of social security legislation in reference to Employee State Insurance Act 1948, Payment of Gratuity Act 1982, and Employee's Provident Fund Act 1952.`,
        },
        {
          id: "mba-sem4",
          label: "M.B.A. Semester-IV",
          content: `### Common Subjects

### 401 Strategic Management

After successfully completing the course, students will be able to:

1. Understand the fundamental aspects of strategy, strategic management process and its intents.
2. Analyse the importance of environmental and competitive analysis for formulating Corporate strategy.
3. Categorize different level of Corporate strategies and its alternatives in strategy formulation.
4. Apply the strategic alternative and implement & control in corporate setting.

### 4101 Managing Banks and Financial Institutions

After successfully completing the course, students will be able to:

1. Understand functioning of banking industry and able to know about the various financial services provided by banks.
2. Aware about significance of modern banking products and schemes.
3. Learn about the important concepts like investment banking and wealth management along with practical approach.
4. Understand the technology driven banking system like e-banking, electronic fund transfer and electronic payment system.

### 4102 Financial Markets and Financial Services

After successfully completing the course, students will be able to:

1. Identify the functions of financial markets and institutions and examine their impact on financial system of a country.
2. Describe the framework of Forex markets and mechanism of exchange rate determination.
3. Analyse the salient features of various financial products, services and instruments.
4. Acquire knowledge of modern financial services and familiarize with Fintech and Digital currency.

### 4103 Project Appraisal and Finance

After successfully completing the course, students will be able to:

1. Acquire the knowledge of Project Management and able to prepare Detail project report.
2. Gain the knowledge about different sources of financing and financial appraisal technique.
3. Understanding the concept of Corporate restructuring, Mergers and Acquisitions.
4. Analyse various types of Project risk and preparation of project report.

### 4104 Working Capital Management

After successfully completing the course, students will be able to:

1. Evaluate Working Capital effectiveness of a company based on its operating and cash conversion cycles, and compare the company's effectiveness with that of peer companies.
2. Identify and evaluate the necessary tools to use in managing a company's net daily cash position.
3. Estimate a company's management of accounts receivable policy, inventory, and accounts payable over time and compared to peer companies.
4. Evaluate the choices of short-term funding available to a company and recommend a financing method.

### 4201 Digital Marketing

After successfully completing the course, students will be able to:

1. To familiarize aspirants with fundamental of digital Marketing.
2. Implement a process of planning of social media or digital marketing activities.
3. Use tools and techniques to manage digital and social media marketing programs.
4. Design social media programs that directly support business and marketing goals.

### 4202 Integrated Marketing Communication

After successfully completing the course, students will be able to:

1. To recognise the significance of IC in the contemporary times and understand fundamentals thereof.
2. To comprehend the advertising media related attributes thoroughly and modern media platforms.
3. To enable aspirants to design the advertising body copy and campaign.
4. To contribute to advertising arena with a due consideration for ethical and social aspects.

### 4203 Sales Promotion Management

After successfully completing the course, students will be able to:

1. Learn sales promotion techniques for consumer, trade, company and sales force.
2. Develop sales promotion campaign, establishing its objectives, tools and program.
3. Understand its roles and purpose to serve in overall marketing communication, assessing effectiveness of tools used in promotion, know modern day tools of promotion.

### 4204 Service Marketing

After successfully completing the course, students will be able to:

1. Have a greater understanding of services marketing, specialties of how it dominates the business landscape.
2. Acquaintance with major elements needed to improve marketing of services and adding value to the customers perception.
3. Appraise the nature and development of strategies of marketing of services.
4. Handling customers complaints and insight to service recovery management.

### 4301 Legal Framework Governing Human Relations

After successfully completing the course, students will be able to:

1. Students will gain a basic understanding of objectives and importance of laws relating to industrial disputes and management of trade union and the role of trade unions in changing environment.
2. Understanding of various factors responsible for growth and development of labour laws.
3. Student will be able to summarize the important provisions of Wage Legislations, in reference to Payment of Wages Act 1936, Minimum Wages Act 1948 & Payment of Bonus Act 1965.
4. Students will be able to understand the laws related to working conditions in factories.

### 4302 Organizational Change and Intervention Strategies

After successfully completing the course, students will be able to:

1. Students will be able to understand theories and models that form the foundation of disciplines as well as the OD diagnostic process.
2. Students will be able to understand the ethics of OD professional and also can recognise ethical principles in organisational development.
3. Students will comprehend the main approaches of change and will be equipped with knowledge and skills required for effective change and organisational development.
4. Students will be able to apply various OD interventions and can develop a working knowledge of all aspects of OD intervention process.

### 4303 Team Dynamics at Work

After successfully completing the course, students will be able to:

1. Students will be able to justify formation and development of teams and can explain the dynamics of Team & Team Building and different learning methodologies in team decision-making.
2. Student will be able to justify the applicability of various theories of Motivation, T-group sensitivity training and Johari Window and also able to justify the Conflict resolution strategy.
3. Student will be able to understand the development of team and can discover orientation through FIRO-B.
4. Students will be able to determine the importance of Interpersonal Communication and can increase their self-awareness and strengthen ability to better understand others.

### 4304 International Human Resource Management

After successfully completing the course, students will be able to:

1. Recognize, outline, and illustrate the enduring global contexts of International HRM understanding and key skills required by HR professionals working in an international context with multinational organizations.
2. Demonstrate, appraise the implications of IHRM in the Host Country Context and managing alliances and joint venture.
3. Differentiate the Context of Cross-border Alliances, prepare staffing international operations for sustained global growth, recruiting and selecting staff for international assignments, interpret and analyze the International Industrial Relation issues and performance management.
4. Evaluate, interpret issues of international training, development and also can able to comprehend HRM practices in different countries.

### 4401 Data Analytics with R

After successfully completing the course, students will be able to:

1. Demonstrate skill in data management.
2. Understand the basic concept of R programming.
3. Demonstrate skills in data visualization.
4. Describe their proficiency in business statistical analysis of data.

### 4402 Data Mining for Business Decisions

After successfully completing the course, students will be able to:

1. Realize Data Mining (DM) principles and techniques.
2. Analyse large sets of data to gain useful business understanding.
3. Interpret business applications of data mining.
4. Demonstrate skills in new trends of Data Mining in relevant business fields.

### 4403 Marketing Analytics

After successfully completing the course, students will be able to:

1. Develop the skill in marketing analytics.
2. Predict the market scenario for effective marketing decision.
3. Analyze the customer behavior for strategy formation.
4. Assess the advertising effect to form adequate retailing policies.

### 4404 Financial Credit Risk Analytics

After successfully completing the course, students will be able to:

1. Understand about various types of financial credit.
2. Interpret the credit risk and its rating.
3. Inspect the risk to frame effective management and governance policies.
4. Demonstrate skill of credit analysis.`,
        },
      ];

      const sections = t("courseOutcomes.sections", defaultSections);

      const updateSections = (updated) =>
        updateField("courseOutcomes.sections", updated);

      const insertSection = (afterIdx) => {
        const newSec = {
          id: `custom-${Date.now()}`,
          label: "New Semester",
          content: "",
        };
        const updated = [...sections];
        updated.splice(afterIdx + 1, 0, newSec);
        updateSections(updated);
      };

      const removeSection = (idx) => {
        updateSections(sections.filter((_, i) => i !== idx));
      };

      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Course Outcomes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive course outcomes for all semesters of M.B.A. (Master
              of Business Administration)
            </p>
          </div>

          {/* Course Outcomes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#003366] px-6 py-4 text-center">
              <h3 className="text-xl font-bold text-white">
                M.B.A. - Course Outcomes
              </h3>
            </div>
            <div className="p-6 space-y-1">
              {isEditing && (
                <button
                  onClick={() => insertSection(-1)}
                  className="w-full py-1.5 mb-2 border-2 border-dashed border-green-300 text-green-600 hover:border-green-500 hover:bg-green-50 rounded-lg text-sm font-medium transition-colors"
                >
                  + Insert at Beginning
                </button>
              )}
              {sections.map((semester, idx) => (
                <React.Fragment key={semester.id}>
                  <div className="border-b border-gray-200 pb-2">
                    <button
                      onClick={() =>
                        setExpandedSemester(
                          expandedSemester === semester.id ? null : semester.id,
                        )
                      }
                      className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-700 text-left">
                        {isEditing ? (
                          <EditableText
                            value={semester.label}
                            onSave={(val) => {
                              const updated = [...sections];
                              updated[idx] = { ...updated[idx], label: val };
                              updateSections(updated);
                            }}
                          />
                        ) : (
                          semester.label
                        )}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        {isEditing && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                window.confirm(
                                  `Delete "${semester.label}"? This cannot be undone.`,
                                )
                              ) {
                                removeSection(idx);
                              }
                            }}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        )}
                        <span className="px-4 py-1 bg-ssgmce-blue text-white text-sm rounded hover:bg-ssgmce-dark-blue transition-colors">
                          {expandedSemester === semester.id ? "Hide" : "View"}
                        </span>
                      </div>
                    </button>
                    <AnimatePresence>
                      {expandedSemester === semester.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 py-4 bg-gray-50">
                            <MarkdownEditor
                              value={semester.content}
                              onSave={(val) => {
                                const updated = [...sections];
                                updated[idx] = {
                                  ...updated[idx],
                                  content: val,
                                };
                                updateSections(updated);
                              }}
                              placeholder={`Click to edit ${semester.label} course outcomes (Markdown supported)...`}
                              className="w-full"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => insertSection(idx)}
                      className="w-full py-1 border-2 border-dashed border-green-300 text-green-600 hover:border-green-500 hover:bg-green-50 rounded-lg text-xs font-medium transition-colors"
                    >
                      + Insert After
                    </button>
                  )}
                </React.Fragment>
              ))}
              {isEditing && (
                <div className="pt-2">
                  <button
                    onClick={() => insertSection(sections.length - 1)}
                    className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    + Add New Semester
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    })(),
    ranking: (
      <div className="space-y-8">
        {(() => {
          const rankingItems = getMbaRankings();
          const rankingMarkdown = getMbaRankingsMarkdown(rankingItems);

          return (
            <>
              <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-500 inline-block pb-2">
                Business School Ranking
              </h3>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 p-4">
                  <h4 className="text-base font-semibold text-gray-700 text-center">
                    Ranking by different independent national level best B-Schools
                    Surveys
                  </h4>
                </div>

                {isEditing && (
                  <div className="border-b border-gray-200 bg-white px-4 py-3">
                    <button
                      type="button"
                      onClick={addMbaRankingRowOnTop}
                      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                    >
                      <FaPlus className="text-xs" />
                      Add To Top Of Table
                    </button>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                          Year
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                          Name of Survey
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                          Link
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                          Ranking / Grade
                        </th>
                        {isEditing && (
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                            Actions
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rankingItems.map((item) => {
                        const uploadKey = `mba-ranking-${item.id}`;
                        const isUploading = Boolean(rankingLinkUploading[uploadKey]);
                        const uploadError = rankingLinkErrors[uploadKey];
                        const isExternalLink = /^https?:\/\//i.test(item.linkUrl);

                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200 font-medium align-top">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={item.year}
                                  onChange={(e) =>
                                    updateMbaRankingRow(item.id, "year", e.target.value)
                                  }
                                  className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ssgmce-blue focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                              ) : (
                                item.year
                              )}
                            </td>
                            <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200 align-top">
                              {isEditing ? (
                                <textarea
                                  value={item.survey}
                                  onChange={(e) =>
                                    updateMbaRankingRow(item.id, "survey", e.target.value)
                                  }
                                  rows={3}
                                  className="w-full min-w-[280px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ssgmce-blue focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                              ) : (
                                item.survey
                              )}
                            </td>
                            <td className="px-6 py-3 text-sm border border-gray-200 align-top">
                              {isEditing ? (
                                <div className="space-y-3 min-w-[220px]">
                                  <input
                                    type="text"
                                    value={item.linkLabel}
                                    onChange={(e) =>
                                      updateMbaRankingRow(
                                        item.id,
                                        "linkLabel",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Link text"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ssgmce-blue focus:outline-none focus:ring-2 focus:ring-blue-100"
                                  />
                                  <input
                                    type="text"
                                    value={item.linkUrl}
                                    onChange={(e) =>
                                      updateMbaRankingRow(
                                        item.id,
                                        "linkUrl",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Paste URL or upload file"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ssgmce-blue focus:outline-none focus:ring-2 focus:ring-blue-100"
                                  />
                                  <div className="flex flex-wrap items-center gap-2">
                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-ssgmce-blue transition hover:bg-blue-100">
                                      <FaUpload className="text-xs" />
                                      {isUploading ? "Uploading..." : "Upload Link File"}
                                      <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            uploadMbaRankingLinkFile(item.id, file);
                                          }
                                          e.target.value = "";
                                        }}
                                      />
                                    </label>
                                    {item.linkUrl ? (
                                      <a
                                        href={item.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-medium text-ssgmce-blue underline underline-offset-2"
                                      >
                                        Preview Link
                                        <FaExternalLinkAlt className="text-[10px]" />
                                      </a>
                                    ) : null}
                                  </div>
                                  {uploadError ? (
                                    <p className="text-xs text-red-600">{uploadError}</p>
                                  ) : null}
                                </div>
                              ) : item.linkUrl ? (
                                <a
                                  href={item.linkUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-ssgmce-blue hover:text-ssgmce-orange hover:underline font-medium"
                                >
                                  {item.linkLabel || "more details"}
                                  {isExternalLink && (
                                    <FaExternalLinkAlt className="text-xs" />
                                  )}
                                </a>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200 whitespace-pre-line align-top">
                              {isEditing ? (
                                <textarea
                                  value={item.ranking}
                                  onChange={(e) =>
                                    updateMbaRankingRow(item.id, "ranking", e.target.value)
                                  }
                                  rows={4}
                                  className="w-full min-w-[260px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ssgmce-blue focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                              ) : (
                                item.ranking
                              )}
                            </td>
                            {isEditing && (
                              <td className="px-6 py-3 text-sm border border-gray-200 align-top">
                                <button
                                  type="button"
                                  onClick={() => deleteMbaRankingRow(item.id)}
                                  className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                                >
                                  <FaTrash className="text-xs" />
                                  Delete
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {isEditing && (
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-gray-800">
                      Edit Ranking Table in Markdown
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      This markdown stays synced with the ranking table above, while
                      the public page keeps the same table structure.
                    </p>
                  </div>
                  <MarkdownEditor
                    value={rankingMarkdown}
                    onSave={handleMbaRankingMarkdownSave}
                    placeholder="Business school ranking table (GFM Markdown)..."
                  />
                </div>
              )}
            </>
          );
        })()}
      </div>
    ),

    curriculum: (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
            Scheme and Syllabus
          </h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* MBA Section */}
          <div className="grid md:grid-cols-12 border-b border-gray-200">
            <div className="md:col-span-4 bg-gray-50/50 p-6 flex items-center border-r border-gray-100">
              <div className="flex items-center gap-3 w-full">
                <h4 className="font-bold text-lg text-gray-800">
                  M.B.A. (Master of Business Administration)
                </h4>
              </div>
            </div>
            <div className="md:col-span-8 p-6">
              {isEditing && (
                <div className="flex gap-2 mb-4 justify-end">
                  {selectedCurriculumItems.filter((k) => k.startsWith("mba-"))
                    .length > 0 && (
                    <button
                      onClick={() => deleteSelectedCurriculumItems("mba")}
                      className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-semibold"
                    >
                      <FaTrash /> Delete Selected (
                      {
                        selectedCurriculumItems.filter((k) =>
                          k.startsWith("mba-"),
                        ).length
                      }
                      )
                    </button>
                  )}
                  <button
                    onClick={() => addCurriculumItem("mba")}
                    className="flex items-center gap-2 px-3 py-1.5 bg-ssgmce-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold"
                  >
                    <FaPlus /> Add Item
                  </button>
                </div>
              )}
              <ul className="space-y-4">
                {t("templateData.curriculum.mba", DEFAULT_CURRICULUM_MBA).map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      {isEditing && (
                        <input
                          type="checkbox"
                          checked={selectedCurriculumItems.includes(`mba-${i}`)}
                          onChange={() => toggleCurriculumSelection("mba", i)}
                          className="mt-2 w-4 h-4 rounded border-gray-300"
                        />
                      )}
                      <span className="w-2 h-2 rounded-full bg-ssgmce-orange mt-2 block group-hover:bg-ssgmce-blue transition-colors"></span>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-2">
                        <span className="text-gray-700 text-sm font-medium flex-1">
                          <EditableText
                            value={item.label}
                            onSave={(val) =>
                              updateCurriculumItem("mba", i, "label", val)
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
                                      "mba",
                                      i,
                                      "link",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Link URL or use upload"
                                  className={`text-xs px-2 py-1 border rounded w-40 ${
                                    item.fileUrl
                                      ? "border-green-400 bg-green-50"
                                      : "border-gray-300"
                                  }`}
                                />
                                {item.fileName && (
                                  <span
                                    className="text-xs text-green-700 bg-green-100 border border-green-300 rounded px-1.5 py-0.5 truncate max-w-[160px] font-medium"
                                    title={item.fileName}
                                  >
                                    ✅ {item.fileName}
                                  </span>
                                )}
                              </div>
                              <div className="relative">
                                <input
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) =>
                                    handleCurriculumFileChange("mba", i, e)
                                  }
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  id={`file-upload-mba-${i}`}
                                />
                                <label
                                  htmlFor={`file-upload-mba-${i}`}
                                  className={`flex items-center gap-1 px-2 py-1 text-xs rounded cursor-pointer transition-colors ${
                                    uploadingFiles[`mba-${i}`]
                                      ? "bg-gray-300 text-gray-500"
                                      : item.fileUrl
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                  }`}
                                  title={
                                    item.fileUrl
                                      ? "Re-upload PDF"
                                      : "Upload PDF"
                                  }
                                >
                                  {uploadingFiles[`mba-${i}`] ? (
                                    "Uploading..."
                                  ) : (
                                    <>
                                      <FaUpload />{" "}
                                      {item.fileUrl ? "Re-upload" : "PDF"}
                                    </>
                                  )}
                                </label>
                              </div>
                              <button
                                onClick={() => removeCurriculumItem("mba", i)}
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
                  ),
                )}
              </ul>
            </div>
          </div>

          {/* PhD Section */}
          <div className="grid md:grid-cols-12 bg-gray-50/30">
            <div className="md:col-span-4 bg-gray-50/50 p-6 flex items-center border-r border-gray-100">
              <div className="flex items-center gap-3 w-full">
                <h4 className="font-bold text-lg text-gray-800">
                  Ph.D. (Business Management and Research)
                </h4>
              </div>
            </div>
            <div className="md:col-span-8 p-6">
              {isEditing && (
                <div className="flex gap-2 mb-4 justify-end">
                  {selectedCurriculumItems.filter((k) => k.startsWith("phd-"))
                    .length > 0 && (
                    <button
                      onClick={() => deleteSelectedCurriculumItems("phd")}
                      className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-semibold"
                    >
                      <FaTrash /> Delete Selected (
                      {
                        selectedCurriculumItems.filter((k) =>
                          k.startsWith("phd-"),
                        ).length
                      }
                      )
                    </button>
                  )}
                  <button
                    onClick={() => addCurriculumItem("phd")}
                    className="flex items-center gap-2 px-3 py-1.5 bg-ssgmce-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold"
                  >
                    <FaPlus /> Add Item
                  </button>
                </div>
              )}
              <ul className="space-y-4">
                {t("templateData.curriculum.phd", DEFAULT_CURRICULUM_PHD).map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      {isEditing && (
                        <input
                          type="checkbox"
                          checked={selectedCurriculumItems.includes(`phd-${i}`)}
                          onChange={() => toggleCurriculumSelection("phd", i)}
                          className="mt-2 w-4 h-4 rounded border-gray-300"
                        />
                      )}
                      <span className="w-2 h-2 rounded-full bg-ssgmce-orange mt-2 block group-hover:bg-ssgmce-blue transition-colors"></span>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-2">
                        <span className="text-gray-700 text-sm font-medium flex-1">
                          <EditableText
                            value={item.label}
                            onSave={(val) =>
                              updateCurriculumItem("phd", i, "label", val)
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
                                      "phd",
                                      i,
                                      "link",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Link URL or use upload"
                                  className={`text-xs px-2 py-1 border rounded w-40 ${
                                    item.fileUrl
                                      ? "border-green-400 bg-green-50"
                                      : "border-gray-300"
                                  }`}
                                />
                                {item.fileName && (
                                  <span
                                    className="text-xs text-green-700 bg-green-100 border border-green-300 rounded px-1.5 py-0.5 truncate max-w-[160px] font-medium"
                                    title={item.fileName}
                                  >
                                    ✅ {item.fileName}
                                  </span>
                                )}
                              </div>
                              <div className="relative">
                                <input
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) =>
                                    handleCurriculumFileChange("phd", i, e)
                                  }
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  id={`file-upload-phd-${i}`}
                                />
                                <label
                                  htmlFor={`file-upload-phd-${i}`}
                                  className={`flex items-center gap-1 px-2 py-1 text-xs rounded cursor-pointer transition-colors ${
                                    uploadingFiles[`phd-${i}`]
                                      ? "bg-gray-300 text-gray-500"
                                      : item.fileUrl
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                  }`}
                                  title={
                                    item.fileUrl
                                      ? "Re-upload PDF"
                                      : "Upload PDF"
                                  }
                                >
                                  {uploadingFiles[`phd-${i}`] ? (
                                    "Uploading..."
                                  ) : (
                                    <>
                                      <FaUpload />{" "}
                                      {item.fileUrl ? "Re-upload" : "PDF"}
                                    </>
                                  )}
                                </label>
                              </div>
                              <button
                                onClick={() => removeCurriculumItem("phd", i)}
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
                  ),
                )}
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

          {/* Tabs for different sections */}
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setPrideTab("toppers")}
              className={`px-6 py-3 font-semibold transition-colors ${
                prideTab === "toppers"
                  ? "border-b-4 border-ssgmce-orange text-ssgmce-blue"
                  : "text-gray-600 hover:text-ssgmce-blue"
              }`}
            >
              University Toppers
            </button>
            <button
              onClick={() => setPrideTab("alumni")}
              className={`px-6 py-3 font-semibold transition-colors ${
                prideTab === "alumni"
                  ? "border-b-4 border-ssgmce-orange text-ssgmce-blue"
                  : "text-gray-600 hover:text-ssgmce-blue"
              }`}
            >
              Top Alumnis of Department
            </button>
          </div>

          {/* University Toppers */}
          {prideTab === "toppers" &&
            (() => {
              const md = t(
                "pride.toppersMarkdown",
                mbaPrideToppersToMarkdown(
                  t("pride.toppers", defaultPrideToppers),
                ),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.toppersMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/mba_toppers_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <MbaPrideMdView markdown={md} />
              );
            })()}

          {/* Top Alumni */}
          {prideTab === "alumni" &&
            (() => {
              const md = t(
                "pride.alumniMarkdown",
                mbaPrideAlumniToMarkdown(
                  t("pride.alumni", defaultPrideAlumni),
                  t("pride.alumniTitle", "Top Alumnis of Department"),
                ),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.alumniMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/mba_alumni_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <MbaPrideMdView markdown={md} />
              );
            })()}
        </motion.div>
      </div>
    ),

    achievements: (() => {
      const facultyAchievements = t(
        "achievements.faculty",
        defaultAchievements.faculty || [],
      );
      const studentAchievements = t(
        "achievements.students",
        defaultAchievements.students || [],
      );

      const handleViewCertificate = (item) => {
        if (!item.image) return;
        const isPdf = item.image.toLowerCase().endsWith(".pdf");
        if (isPdf) {
          window.open(item.image, "_blank");
        } else {
          setCertificateLightbox(item);
        }
      };

      return (
        <div className="space-y-8">
          {/* Certificate Lightbox Modal */}
          <AnimatePresence>
            {certificateLightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={() => setCertificateLightbox(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-[#003366] px-6 py-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {certificateLightbox.name}
                      </h3>
                      <p className="text-blue-200 text-sm">
                        {certificateLightbox.achievement}
                      </p>
                    </div>
                    <button
                      onClick={() => setCertificateLightbox(null)}
                      className="text-white hover:text-orange-300 transition-colors"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-center bg-gray-50 max-h-[75vh] overflow-auto">
                    <img
                      src={certificateLightbox.image}
                      alt={certificateLightbox.achievement}
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-[70vh] object-contain rounded-lg"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Achievements & Awards
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
            <p className="text-gray-600 mt-3">
              Master of Business Administration (MBA)
            </p>
          </div>

          {/* Tab Menu: Faculty | Student toggle */}
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
                <FaChalkboardTeacher className="text-lg" />
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
                <FaUserGraduate className="text-lg" />
                Student Achievements
              </button>
            </div>
          </div>

          {/* Faculty Achievements */}
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
              {facultyAchievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-[#003366] px-6 py-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <FaTrophy className="mr-3 text-yellow-300" />
                      <EditableText
                        value={item.name}
                        onSave={(val) =>
                          updateAchievementItem("faculty", index, "name", val)
                        }
                      />
                    </h3>
                    <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white/15 text-blue-100 border border-white/20">
                      <EditableText
                        value={item.category}
                        onSave={(val) =>
                          updateAchievementItem(
                            "faculty",
                            index,
                            "category",
                            val,
                          )
                        }
                      />
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#003366] mb-2">
                          <EditableText
                            value={item.achievement}
                            onSave={(val) =>
                              updateAchievementItem(
                                "faculty",
                                index,
                                "achievement",
                                val,
                              )
                            }
                          />
                        </h4>
                        <div className="text-gray-700 text-sm leading-relaxed">
                          <MarkdownEditor
                            value={item.description}
                            onSave={(val) =>
                              updateAchievementItem(
                                "faculty",
                                index,
                                "description",
                                val,
                              )
                            }
                            placeholder="Add achievement description in Markdown..."
                            className="w-full"
                          />
                        </div>
                      </div>
                      {isEditing ? (
                        <div className="flex min-w-[190px] flex-col items-end gap-2">
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#003366] to-[#004d99] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:from-[#004d99] hover:to-[#0066cc] hover:shadow-lg">
                            <FaUpload className="text-yellow-300" />
                            {achievementUploading[`faculty-${index}`]
                              ? "Uploading..."
                              : "Upload Certificate"}
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              className="hidden"
                              disabled={achievementUploading[`faculty-${index}`]}
                              onChange={(event) =>
                                handleAchievementFileChange(
                                  "faculty",
                                  index,
                                  event,
                                )
                              }
                            />
                          </label>
                          {item.image && (
                            <a
                              href={item.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-right text-xs font-medium text-ssgmce-blue underline underline-offset-2"
                            >
                              {getAchievementFileName(item.image)}
                            </a>
                          )}
                          {achievementUploadErrors[`faculty-${index}`] && (
                            <span className="text-right text-[11px] text-red-500">
                              {achievementUploadErrors[`faculty-${index}`]}
                            </span>
                          )}
                          {achievementUploadSuccess[`faculty-${index}`] && (
                            <span className="rounded-full bg-green-50 px-3 py-1 text-right text-[11px] font-semibold text-green-700">
                              {achievementUploadSuccess[`faculty-${index}`]}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteAchievement("faculty", index)}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            <FaTrash className="text-xs" />
                            Delete
                          </button>
                        </div>
                      ) : (
                        item.image && (
                          <button
                            onClick={() => handleViewCertificate(item)}
                            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#003366] to-[#004d99] text-white text-xs font-semibold rounded-lg hover:from-[#004d99] hover:to-[#0066cc] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            <FaAward className="text-yellow-300" />
                            View Certificate
                          </button>
                        )
                      )}
                    </div>
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

          {/* Student Achievements */}
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
              {studentAchievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-[#003366] px-6 py-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <FaAward className="mr-3 text-yellow-300" />
                      <EditableText
                        value={item.name}
                        onSave={(val) =>
                          updateAchievementItem("students", index, "name", val)
                        }
                      />
                    </h3>
                    <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white/15 text-blue-100 border border-white/20">
                      <EditableText
                        value={item.category}
                        onSave={(val) =>
                          updateAchievementItem(
                            "students",
                            index,
                            "category",
                            val,
                          )
                        }
                      />
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#003366] mb-2">
                          <EditableText
                            value={item.achievement}
                            onSave={(val) =>
                              updateAchievementItem(
                                "students",
                                index,
                                "achievement",
                                val,
                              )
                            }
                          />
                        </h4>
                        <div className="text-gray-700 text-sm leading-relaxed">
                          <MarkdownEditor
                            value={item.description}
                            onSave={(val) =>
                              updateAchievementItem(
                                "students",
                                index,
                                "description",
                                val,
                              )
                            }
                            placeholder="Add achievement description in Markdown..."
                            className="w-full"
                          />
                        </div>
                      </div>
                      {isEditing ? (
                        <div className="flex min-w-[190px] flex-col items-end gap-2">
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#003366] to-[#004d99] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:from-[#004d99] hover:to-[#0066cc] hover:shadow-lg">
                            <FaUpload className="text-yellow-300" />
                            {achievementUploading[`students-${index}`]
                              ? "Uploading..."
                              : "Upload Certificate"}
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              className="hidden"
                              disabled={achievementUploading[`students-${index}`]}
                              onChange={(event) =>
                                handleAchievementFileChange(
                                  "students",
                                  index,
                                  event,
                                )
                              }
                            />
                          </label>
                          {item.image && (
                            <a
                              href={item.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-right text-xs font-medium text-ssgmce-blue underline underline-offset-2"
                            >
                              {getAchievementFileName(item.image)}
                            </a>
                          )}
                          {achievementUploadErrors[`students-${index}`] && (
                            <span className="text-right text-[11px] text-red-500">
                              {achievementUploadErrors[`students-${index}`]}
                            </span>
                          )}
                          {achievementUploadSuccess[`students-${index}`] && (
                            <span className="rounded-full bg-green-50 px-3 py-1 text-right text-[11px] font-semibold text-green-700">
                              {achievementUploadSuccess[`students-${index}`]}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteAchievement("students", index)}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            <FaTrash className="text-xs" />
                            Delete
                          </button>
                        </div>
                      ) : (
                        item.image && (
                          <button
                            onClick={() => handleViewCertificate(item)}
                            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#003366] to-[#004d99] text-white text-xs font-semibold rounded-lg hover:from-[#004d99] hover:to-[#0066cc] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            <FaAward className="text-yellow-300" />
                            View Certificate
                          </button>
                        )
                      )}
                    </div>
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

    accreditations: (
      (() => {
        const accreditationItems = getMbaAccreditations();
        const accreditationMarkdown = getMbaAccreditationsMarkdown(
          accreditationItems,
        );

        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
              Recognitions and Accreditations
            </h3>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        Year
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        Recognition
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        Effective Period
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        Score / Grade
                      </th>
                      {isEditing && (
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {accreditationItems.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-ssgmce-blue font-semibold align-top">
                          {isEditing ? (
                            <input
                              type="text"
                              value={item.year}
                              onChange={(e) =>
                                updateMbaAccreditationRow(
                                  item.id,
                                  "year",
                                  e.target.value,
                                )
                              }
                              className="w-full min-w-[110px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ssgmce-blue focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                          ) : (
                            renderMbaTableCellMarkdown(item.year)
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium align-top">
                          {isEditing ? (
                            <textarea
                              value={item.recognition}
                              onChange={(e) =>
                                updateMbaAccreditationRow(
                                  item.id,
                                  "recognition",
                                  e.target.value,
                                )
                              }
                              rows={3}
                              className="w-full min-w-[280px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ssgmce-blue focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                          ) : (
                            renderMbaTableCellMarkdown(item.recognition)
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 align-top">
                          {isEditing ? (
                            <textarea
                              value={item.effectivePeriod}
                              onChange={(e) =>
                                updateMbaAccreditationRow(
                                  item.id,
                                  "effectivePeriod",
                                  e.target.value,
                                )
                              }
                              rows={3}
                              className="w-full min-w-[220px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ssgmce-blue focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                          ) : (
                            renderMbaTableCellMarkdown(item.effectivePeriod)
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 align-top">
                          {isEditing ? (
                            <textarea
                              value={item.score}
                              onChange={(e) =>
                                updateMbaAccreditationRow(
                                  item.id,
                                  "score",
                                  e.target.value,
                                )
                              }
                              rows={3}
                              className="w-full min-w-[180px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ssgmce-blue focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                          ) : (
                            renderMbaTableCellMarkdown(item.score)
                          )}
                        </td>
                        {isEditing && (
                          <td className="px-6 py-4 text-sm align-top">
                            <button
                              type="button"
                              onClick={() => deleteMbaAccreditationRow(item.id)}
                              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                            >
                              <FaTrash className="text-xs" />
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {isEditing && (
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">
                      Edit Recognitions Table in Markdown
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      This markdown stays synced with the table above, while the
                      public page keeps the same table structure.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addMbaAccreditationRowOnTop}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ssgmce-blue text-white font-semibold hover:bg-ssgmce-dark-blue transition-colors"
                  >
                    <FaPlus />
                    Add New Row On Top
                  </button>
                </div>
                <MarkdownEditor
                  value={accreditationMarkdown}
                  onSave={handleMbaAccreditationsMarkdownSave}
                  placeholder="Recognitions and accreditations table (GFM Markdown)..."
                />
              </div>
            )}
          </div>
        );
      })()
    ),

    placements: (
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {!placementYear ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Placement Statistics
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Year-wise breakdown of student placements
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {isEditing && (
                    <button
                      onClick={() => {
                        setPlacementYearError("");
                        setNewPlacementYear("");
                        setShowAddPlacementYear(true);
                      }}
                      className="flex items-center gap-2 bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                    >
                      <FaPlus /> Add Year
                    </button>
                  )}
                  <FaChartLine className="text-4xl text-blue-100" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider border-b border-gray-200">
                      <th className="px-6 py-4 font-bold text-center w-20">
                        Sr. No.
                      </th>
                      <th className="px-6 py-4 font-bold text-center">
                        Placement Record for Session
                      </th>
                      <th className="px-6 py-4 font-bold text-center">
                        No. of Students Placed
                      </th>
                      <th className="px-6 py-4 font-bold text-center">
                        Details Report
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {placementSummary.map((row, index) => (
                      <tr
                        key={row.id}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-center font-mono text-gray-400">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-gray-700">
                          {row.year}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-ssgmce-blue text-lg">
                          {row.count}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setPlacementYear(row.id)}
                              className="text-ssgmce-blue hover:text-ssgmce-orange font-medium text-xs border border-gray-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all"
                            >
                              View Details
                            </button>
                            {isEditing && (
                              <button
                                onClick={() => handleDeletePlacementYear(row.id)}
                                className="text-red-600 hover:text-red-700 font-medium text-xs border border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-full transition-all"
                                title={`Delete ${row.year}`}
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 text-xs text-gray-400 text-center bg-gray-50 border-t border-gray-100">
                * Placements still in progress for the current academic year.
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {renderPlacementDetails()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ),

    newsletter: (
      <div className="space-y-8">
        {/* Newsletter Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-50 text-ssgmce-blue rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm">
            <FaBullseye />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            <EditableText
              value={t("newsletterTitle", "Department Newsletters")}
              onSave={(val) => updateData("newsletterTitle", val)}
            />
          </h3>
          <div className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            <EditableText
              value={t(
                "newsletterDescription",
                "Stay updated with the latest happenings, student achievements, faculty contributions, and department events through our periodic newsletters.",
              )}
              onSave={(val) => updateData("newsletterDescription", val)}
              multiline
            />
          </div>
        </div>

        {/* Newsletter Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-wide">Newsletter</h3>
              <p className="text-sm text-gray-300 mt-1">
                Department of Master of Business Administration (MBA)
              </p>
            </div>
            <div className="flex items-center gap-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={addNewsletter}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <FaPlus className="text-xs" />
                  Add Newsletter
                </button>
              )}
              <FaDownload className="text-4xl text-blue-200 opacity-40" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider border-b border-gray-200">
                  <th className="px-6 py-4 font-bold text-center w-20">
                    Sr. No.
                  </th>
                  <th className="px-6 py-4 font-bold">Publishing Date</th>
                  <th className="px-6 py-4 font-bold text-center">
                    More Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {/* Latest Issue Row */}
                <tr className="hover:bg-blue-50/30 transition-colors bg-blue-50/10">
                  <td className="px-6 py-4 text-center font-mono text-gray-400">
                    1
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full">
                        Latest
                      </span>
                      <span className="font-bold text-gray-800">
                        <EditableText
                          value={
                            latestNewsletterData.title ||
                            "Newsletter Spring Semester July - December 2025"
                          }
                          onSave={(val) =>
                            updateNewsletter("latest", 0, "title", val)
                          }
                        />
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {isEditing ? (
                      <div className="flex flex-col items-center gap-2">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-blue-50 px-4 py-2 text-xs font-medium text-ssgmce-blue transition-all hover:border-blue-400 hover:bg-blue-100">
                          <FaUpload className="text-xs" />
                          {newsletterUploading["latest-0"]
                            ? "Uploading..."
                            : "Upload PDF"}
                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            disabled={newsletterUploading["latest-0"]}
                            onChange={(event) =>
                              handleNewsletterFileChange("latest", 0, event)
                            }
                          />
                        </label>
                        {latestNewsletterData.link && (
                          <a
                            href={latestNewsletterData.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-ssgmce-blue underline underline-offset-2"
                          >
                            {getNewsletterFileName(
                              latestNewsletterData.link,
                              latestNewsletterData.fileName || "",
                            )}
                          </a>
                        )}
                        {newsletterUploadErrors["latest-0"] && (
                          <span className="text-center text-[11px] text-red-500">
                            {newsletterUploadErrors["latest-0"]}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteNewsletter("latest", 0)}
                          className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                        >
                          <FaTrash className="text-xs" />
                          Delete
                        </button>
                      </div>
                    ) : (
                      <a
                        href={latestNewsletterData.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-ssgmce-blue hover:text-ssgmce-orange font-medium text-xs border border-gray-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all"
                      >
                        <FaDownload className="text-xs" /> Click for Details
                      </a>
                    )}
                  </td>
                </tr>

                {/* Archive Rows */}
                {newsletterArchivesData.map((issue, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 text-center font-mono text-gray-400">
                      {i + 2}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-700">
                        <EditableText
                          value={issue.vol}
                          onSave={(val) =>
                            updateNewsletter("archives", i, "vol", val)
                          }
                        />
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isEditing ? (
                        <div className="flex flex-col items-center gap-2">
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-blue-50 px-4 py-2 text-xs font-medium text-ssgmce-blue transition-all hover:border-blue-400 hover:bg-blue-100">
                            <FaUpload className="text-xs" />
                            {newsletterUploading[`archives-${i}`]
                              ? "Uploading..."
                              : "Upload PDF"}
                            <input
                              type="file"
                              accept="application/pdf"
                              className="hidden"
                              disabled={newsletterUploading[`archives-${i}`]}
                              onChange={(event) =>
                                handleNewsletterFileChange("archives", i, event)
                              }
                            />
                          </label>
                          {issue.link && (
                            <a
                              href={issue.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-ssgmce-blue underline underline-offset-2"
                            >
                              {getNewsletterFileName(issue.link, issue.fileName)}
                            </a>
                          )}
                          {newsletterUploadErrors[`archives-${i}`] && (
                            <span className="text-center text-[11px] text-red-500">
                              {newsletterUploadErrors[`archives-${i}`]}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteNewsletter("archives", i)}
                            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                          >
                            <FaTrash className="text-xs" />
                            Delete
                          </button>
                        </div>
                      ) : (
                        <a
                          href={issue.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-ssgmce-blue hover:text-ssgmce-orange font-medium text-xs border border-gray-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all"
                        >
                          <FaDownload className="text-xs" /> Click for Details
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-xs text-gray-400 text-center bg-gray-50 border-t border-gray-100">
            Click on "Click for Details" to view/download the newsletter PDF.
          </div>
        </motion.div>
      </div>
    ),

    projects: (
      <div className="space-y-8">
        {(() => {
          const projectYears = getProjectYears();
          const projectRecords = getProjectRecords();
          const projectMarkdownByYear = getProjectMarkdownByYear();
          const currentProjects = Array.isArray(projectRecords?.[projectYear])
            ? projectRecords[projectYear]
            : [];
          const selectedProjectsMarkdown =
            projectMarkdownByYear?.[projectYear] ||
            mbaProjectsToMarkdown({ [projectYear]: currentProjects }, [projectYear]);

          return (
            <>
              <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
                UG/PG Projects (Dissertation)
              </h3>

              <div className="flex flex-wrap gap-2 items-center">
                {projectYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setProjectYear(year)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      projectYear === year
                        ? "bg-ssgmce-blue text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {year}
                  </button>
                ))}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setNewUgProjectYear("");
                      setUgProjectYearError("");
                      setShowAddUgProjectYear(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-ssgmce-blue to-blue-700 px-4 py-2 text-xs font-semibold text-white transition-all hover:shadow-lg"
                  >
                    <FaPlus className="text-xs" />
                    Add Session
                  </button>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 w-24">
                          Group No.
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                          Project Title
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentProjects.map((project, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-ssgmce-blue font-semibold text-center">
                            {project.no || i + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {project.title}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {isEditing && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-gray-800">
                        Edit {projectYear} in Markdown
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Import a DOCX or edit this session in markdown. Saving
                        here updates the UG/PG Projects table above without
                        changing the current frontend layout.
                      </p>
                    </div>
                    <MarkdownEditor
                      key={projectYear}
                      value={selectedProjectsMarkdown}
                      onSave={handleProjectMarkdownSave}
                      showDocImport
                      docTemplateUrl="/uploads/documents/pride_templates/mba_projects_template.docx"
                      docTemplateLabel="Download Projects Template"
                      placeholder={`UG/PG projects for ${projectYear} (GFM Markdown)...`}
                    />
                  </div>
                </div>
              )}

              <AnimatePresence>
                {showAddUgProjectYear && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowAddUgProjectYear(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                          <FaPlus className="text-ssgmce-blue" /> Add Project Session
                        </h3>
                        <button
                          onClick={() => {
                            setUgProjectYearError("");
                            setShowAddUgProjectYear(false);
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <FaTimes className="text-xl" />
                        </button>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Academic Year <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., 2025-26"
                            value={newUgProjectYear}
                            onChange={(e) => {
                              setNewUgProjectYear(e.target.value);
                              if (ugProjectYearError) setUgProjectYearError("");
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Enter the academic year in format YYYY-YY.
                          </p>
                          {ugProjectYearError ? (
                            <p className="text-xs text-red-600 mt-2">
                              {ugProjectYearError}
                            </p>
                          ) : null}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-800">
                            <strong>Note:</strong> After adding the session, you
                            will get an empty markdown editor with the same
                            table structure and DOCX import support for that
                            session.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setUgProjectYearError("");
                            setShowAddUgProjectYear(false);
                          }}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddProjectYear}
                          disabled={!newUgProjectYear.trim()}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <FaPlus /> Add Session
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          );
        })()}
      </div>
    ),

    "course-material": (
      <div className="space-y-8">
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
                Department of Business Administration and Research (MBA)
              </p>
            </div>
            <div className="flex items-center gap-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={addCourseMaterial}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <FaPlus className="text-xs" />
                  Add Course Material
                </button>
              )}
              <FaChalkboardTeacher className="text-4xl text-orange-200 opacity-40" />
            </div>
          </div>

          {isEditing ? (
            <div className="divide-y divide-gray-100">
              {courseMaterialItems.length > 0 ? (
                courseMaterialItems.map((material, i) => (
                  <div
                    key={i}
                    ref={
                      i === courseMaterialItems.length - 1
                        ? latestCourseMaterialRef
                        : null
                    }
                    className="p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 flex-1 gap-4">
                        <div className="w-10 flex-shrink-0 pt-2 text-center font-mono text-sm text-gray-400">
                          {i + 1}
                        </div>
                        <div className="min-w-0 flex-1 space-y-4">
                          <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
                              Year / Class
                            </label>
                            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                              <EditableText
                                value={material.title}
                                onSave={(val) =>
                                  updateCourseMaterial(i, "title", val)
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
                              OneDrive Link
                            </label>
                            <textarea
                              value={material.link || ""}
                              onChange={(event) =>
                                updateCourseMaterial(
                                  i,
                                  "link",
                                  event.target.value,
                                )
                              }
                              rows={3}
                              placeholder="Paste the OneDrive share link here..."
                              className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteCourseMaterial(i)}
                        className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                      >
                        <FaTrash className="text-xs" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center text-gray-400">
                  No course materials added yet.
                </div>
              )}
            </div>
          ) : (
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
                  {courseMaterialItems.map((material, i) => (
                    <tr
                      key={i}
                      className="hover:bg-orange-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-center font-mono text-gray-400">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-800 block">
                          {material.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <a
                          href={material.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-ssgmce-orange hover:text-orange-700 font-medium text-xs border border-gray-200 hover:border-orange-400 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-full transition-all"
                        >
                          <FaDownload className="text-xs" /> Access OneDrive
                        </a>
                      </td>
                    </tr>
                  ))}
                  {courseMaterialItems.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-12 text-center text-gray-400"
                      >
                        No course materials available yet. Use the admin editor
                        to add materials.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className="p-4 text-xs text-gray-400 text-center bg-gray-50 border-t border-gray-100">
            Click on "Access OneDrive" to view and download course materials
            from the respective year's shared folder.
          </div>
        </motion.div>
      </div>
    ),

    specializations: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border-l-4 border-ssgmce-orange">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Specializations Offered
          </h2>
          <p className="text-gray-600">Choose your area of expertise</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: "Financial Management",
              icon: "ðŸ’°",
              desc: "Focus on financial analysis, investment management, and corporate finance",
            },
            {
              name: "Marketing Management",
              icon: "ðŸ“Š",
              desc: "Learn brand management, digital marketing, and consumer behavior",
            },
            {
              name: "Human Resource Management",
              icon: "ðŸ‘¥",
              desc: "Specialize in talent management, organizational behavior, and HR analytics",
            },
            {
              name: "Business Analytics",
              icon: "ðŸ“ˆ",
              desc: "Master data analytics, business intelligence, and decision science",
            },
          ].map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-ssgmce-orange"
            >
              <div className="flex items-center mb-3">
                <span className="text-4xl mr-4">{spec.icon}</span>
                <h3 className="text-xl font-bold text-gray-800">{spec.name}</h3>
              </div>
              <p className="text-gray-600">{spec.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),

    activities: (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
            <EditableText
              value={t("activitiesTitle", "Curricular Activities")}
              onSave={(val) => updateData("activitiesTitle", val)}
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
          {activitiesData.slice(0, activitiesVisible).map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.35 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative"
            >
              {isEditing && (
                <button
                  onClick={() => deleteActivityCard(idx)}
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
                    if (!isEditing) {
                      setLightboxActivity(idx);
                    }
                  }}
                >
                  {isEditing ? (
                    <EditableImage
                      src={activity.image}
                      onSave={(url) => updateActivity(idx, "image", url)}
                      alt={activity.title}
                      className="w-full h-48 sm:h-full object-contain bg-gray-50"
                      placeholder="Click to add activity poster"
                    />
                  ) : activity.image ? (
                    <img
                      src={getLocalMbaActivityImageUrl(activity.image)}
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
                          onSave={(val) => updateActivity(idx, "date", val)}
                        />
                      ) : (
                        activity.date || "Date to be updated"
                      )}
                    </span>

                    <div className="text-lg sm:text-xl font-bold text-gray-800 leading-snug tracking-tight">
                      {isEditing ? (
                        <EditableText
                          value={activity.title}
                          onSave={(val) => updateActivity(idx, "title", val)}
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
                              updateActivity(idx, "participants", val)
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
                              updateActivity(idx, "organizer", val)
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
                                updateActivity(idx, "resource", val)
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

        {/* Show More / Show Less */}
        {activitiesData.length > 6 && (
          <div className="text-center pt-2">
            <button
              onClick={() =>
                setActivitiesVisible((prev) =>
                  prev >= activitiesData.length ? 6 : prev + 6,
                )
              }
              className="px-8 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
            >
              {activitiesVisible >= activitiesData.length
                ? "Show Less"
                : `Show More (${activitiesData.length - activitiesVisible} remaining)`}
            </button>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxActivity !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxActivity(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 z-10"
                  onClick={() => setLightboxActivity(null)}
                >
                  <FaTimes />
                </button>

                <img
                  src={getLocalMbaActivityImageUrl(
                    activitiesData[lightboxActivity]?.image,
                  )}
                  alt={activitiesData[lightboxActivity]?.title}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />

                <div className="text-white text-center mt-3 text-sm">
                  {activitiesData[lightboxActivity]?.title}
                </div>

                {/* Nav arrows */}
                {lightboxActivity > 0 && (
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/40 rounded-full p-2 hover:bg-black/60"
                    onClick={() =>
                      setLightboxActivity((p) => Math.max(0, p - 1))
                    }
                  >
                    <FaChevronLeft />
                  </button>
                )}
                {lightboxActivity < activitiesData.length - 1 && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/40 rounded-full p-2 hover:bg-black/60"
                    onClick={() =>
                      setLightboxActivity((p) =>
                        Math.min(activitiesData.length - 1, p + 1),
                      )
                    }
                  >
                    <FaChevronRight />
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ),

    "industrial-visits": (
      <div className="space-y-8">
        {(() => {
          const industrialVisits = getMbaIndustrialVisits();
          const industrialVisitsMarkdown =
            getMbaIndustrialVisitsMarkdown(industrialVisits);

          return (
            <>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  <FaIndustry className="inline-block mr-2 text-ssgmce-blue" />
                  Industry Interaction and Tours
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Industrial tours organized by the department for students of MBA
                  first and final years along with faculty members to provide
                  practical exposure to business operations and management practices.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-ssgmce-blue text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold whitespace-nowrap">
                          S.N.
                        </th>
                        <th className="px-6 py-4 text-left font-bold">
                          Visit / Tour Details
                        </th>
                        <th className="px-6 py-4 text-left font-bold whitespace-nowrap">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left font-bold whitespace-nowrap">
                          Report
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {industrialVisits.map((visit, idx) => (
                        <tr key={visit.id || idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {String(idx + 1).padStart(2, "0")}
                          </td>
                          <td className="px-6 py-4 text-gray-700">{visit.title}</td>
                          <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                            {visit.date}
                          </td>
                          <td className="px-6 py-4">
                            {visit.report ? (
                              <a
                                href={visit.report}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-ssgmce-blue hover:text-ssgmce-orange font-semibold text-xs"
                              >
                                <FaFileAlt className="text-xs" />
                                View Report
                              </a>
                            ) : (
                              <span className="text-gray-400 text-xs">--</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {isEditing && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">
                            Edit Industry Interaction and Tours in Markdown
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Serial numbers are automatic now. Add a new blank row on top, then edit only the actual visit details.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={addMbaIndustrialVisitRowOnTop}
                          className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                        >
                          <FaPlus className="text-xs" />
                          Add New Row On Top
                        </button>
                      </div>
                    </div>
                    <MarkdownEditor
                      value={industrialVisitsMarkdown}
                      onSave={handleMbaIndustrialVisitsMarkdownSave}
                      placeholder="Industry interaction and tours table without serial-number column (GFM Markdown)..."
                    />
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-gray-800">
                        Optional Detailed Reports
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload a detailed report only for the visit rows that need one.
                      </p>
                    </div>
                    <div className="space-y-3">
                      {industrialVisits.map((visit, idx) => {
                        const uploadKey = `mba-industrial-visit-${visit.id}`;
                        return (
                          <div
                            key={visit.id || idx}
                            className="rounded-lg border border-gray-200 p-4"
                          >
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {idx + 1}. {visit.title || "Visit / Tour"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {visit.date || "Date not set"}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                {visit.report ? (
                                  <a
                                    href={visit.report}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-ssgmce-blue hover:text-ssgmce-orange"
                                  >
                                    <FaFileAlt className="text-xs" />
                                    Current Report
                                  </a>
                                ) : (
                                  <span className="text-xs text-gray-400">
                                    No report uploaded
                                  </span>
                                )}
                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-ssgmce-blue px-3 py-2 text-xs font-semibold text-white hover:bg-ssgmce-dark-blue">
                                  <FaUpload className="text-xs" />
                                  {industrialVisitReportUploading[uploadKey]
                                    ? "Uploading..."
                                    : "Upload Report"}
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    disabled={industrialVisitReportUploading[uploadKey]}
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        uploadMbaIndustrialVisitReport(visit.id, file);
                                      }
                                      e.target.value = "";
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                            {industrialVisitReportErrors[uploadKey] ? (
                              <p className="mt-2 text-xs text-red-600">
                                {industrialVisitReportErrors[uploadKey]}
                              </p>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>
    ),

    "guest-lectures": (() => {
      const leaderSessions = getMbaLeaderSessions();
      const leaderMarkdownBySession = getMbaLeaderMarkdownBySession();

      return (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-500 inline-block pb-2">
              Corporate Leader Speak&apos;s
            </h3>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setNewLeaderSession("");
                  setLeaderSessionError("");
                  setShowAddLeaderSession(true);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-ssgmce-blue px-4 py-2 text-sm font-bold text-white transition-all hover:bg-ssgmce-orange"
              >
                <FaPlus className="text-xs" />
                Add Session Year
              </button>
            )}
          </div>

          {leaderSessions.map((session) => {
            const markdown =
              leaderMarkdownBySession[session] ||
              mbaCorporateLeaderSpeaksToMarkdown([]);
            const entries = parseMbaCorporateLeaderSpeaksMarkdown(markdown);

            return (
              <div
                key={session}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3">
                  <h4 className="text-white font-bold text-lg">{session}</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200 w-12">
                          Sr.
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                          Name of Speaker
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                          Topic
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200 w-28">
                          Report
                        </th>
                        {isEditing && (
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200 w-44">
                            Actions
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {entries.map((entry, eIdx) => (
                        <tr
                          key={`${session}-${eIdx}`}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200 font-medium text-center">
                            {eIdx + 1}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                            {renderMbaTableCellMarkdown(entry.speaker)}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                            {renderMbaTableCellMarkdown(entry.topic)}
                          </td>
                          <td className="px-6 py-3 text-sm border border-gray-200 text-center">
                            {entry.report ? (
                              <a
                                href={entry.report}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-ssgmce-blue hover:text-ssgmce-orange hover:underline font-medium text-xs"
                              >
                                <FaFileAlt className="text-xs" />
                                View
                              </a>
                            ) : (
                              <span className="text-gray-400 text-xs">--</span>
                            )}
                          </td>
                          {isEditing && (
                            <td className="px-6 py-3 text-sm border border-gray-200 align-top">
                              {(() => {
                                const uploadKey = `mba-leader-${session}-${eIdx}`;
                                const isUploading = Boolean(
                                  leaderReportUploading[uploadKey],
                                );
                                const uploadError =
                                  leaderReportErrors[uploadKey] || "";

                                return (
                                  <div className="space-y-2 min-w-[150px]">
                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100">
                                      <FaUpload className="text-xs" />
                                      {isUploading
                                        ? "Uploading..."
                                        : "Upload Report"}
                                      <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        disabled={isUploading}
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            uploadMbaLeaderReport(
                                              session,
                                              eIdx,
                                              file,
                                            );
                                          }
                                          e.target.value = "";
                                        }}
                                      />
                                    </label>
                                    {uploadError ? (
                                      <p className="text-xs text-red-600">
                                        {uploadError}
                                      </p>
                                    ) : null}
                                  </div>
                                );
                              })()}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {isEditing && (
                  <div className="border-t border-gray-200 bg-white p-5">
                    <div className="mb-4">
                      <h4 className="text-base font-bold text-gray-800">
                        Edit {session} in Markdown
                      </h4>
                      <p className="text-sm text-gray-500">
                        This section is markdown-only in admin while the public
                        table layout stays unchanged. Use the upload button on
                        each row to attach that entry&apos;s report.
                      </p>
                    </div>
                    <MarkdownEditor
                      value={markdown}
                      onSave={(value) =>
                        handleMbaLeaderMarkdownSave(session, value)
                      }
                      showDocImport
                      showTemplateDownload={false}
                      importHelpText="Import a DOCX to append the whole session table into this markdown editor, then review and save."
                      placeholder={`Corporate Leader Speak table for ${session} (GFM Markdown)...`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    })(),

    mous: (
      <div className="space-y-8">
        {(() => {
          const mous = getMbaMous();
          const mousMarkdown = getMbaMousMarkdown(mous);

          return (
            <>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">MoUs</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Strategic partnerships with industry leaders and academic
                  institutions to enhance learning outcomes and provide
                  students with real-world exposure.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-ssgmce-blue text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold whitespace-nowrap">
                          Sr. No.
                        </th>
                        <th className="px-6 py-4 text-left font-bold">
                          Name of the Organization
                        </th>
                        <th className="px-6 py-4 text-left font-bold whitespace-nowrap">
                          MOU Signing Date
                        </th>
                        <th className="px-6 py-4 text-left font-bold whitespace-nowrap">
                          MOU Copy / Report
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mous.map((mou, idx) => (
                        <tr
                          key={mou.id || idx}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {idx + 1}.
                          </td>
                          <td className="px-6 py-4 text-gray-700">
                            {mou.org}
                          </td>
                          <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                            {mou.date}
                          </td>
                          <td className="px-6 py-4">
                            {mou.report ? (
                              <a
                                href={mou.report}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-ssgmce-blue hover:text-ssgmce-orange font-semibold text-sm transition-colors"
                              >
                                <FaFileAlt className="mr-1.5" />
                                View Document
                              </a>
                            ) : (
                              <span className="text-gray-400 text-xs">--</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {isEditing && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">
                            Edit MoUs in Markdown
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Serial numbers are automatic now. Add a new blank
                            row on top, then edit only the actual MoU details.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={addMbaMouRowOnTop}
                          className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                        >
                          <FaPlus className="text-xs" />
                          Add New Row On Top
                        </button>
                      </div>
                    </div>
                    <MarkdownEditor
                      value={mousMarkdown}
                      onSave={handleMbaMousMarkdownSave}
                      placeholder="MoUs table without serial-number column (GFM Markdown)..."
                    />
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-gray-800">
                        Upload MoU PDF / Report
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload the PDF only for the row you want to attach a
                        document to.
                      </p>
                    </div>
                    <div className="space-y-3">
                      {mous.map((mou, idx) => {
                        const uploadKey = `mba-mou-${mou.id}`;
                        return (
                          <div
                            key={mou.id || idx}
                            className="rounded-lg border border-gray-200 p-4"
                          >
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {idx + 1}. {mou.org || "MoU"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {mou.date || "Signing date not set"}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                {mou.report ? (
                                  <a
                                    href={mou.report}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-ssgmce-blue hover:text-ssgmce-orange"
                                  >
                                    <FaFileAlt className="text-xs" />
                                    Current Document
                                  </a>
                                ) : (
                                  <span className="text-xs text-gray-400">
                                    No document uploaded
                                  </span>
                                )}
                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-ssgmce-blue px-3 py-2 text-xs font-semibold text-white hover:bg-ssgmce-dark-blue">
                                  <FaUpload className="text-xs" />
                                  {mouReportUploading[uploadKey]
                                    ? "Uploading..."
                                    : "Upload PDF"}
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    disabled={mouReportUploading[uploadKey]}
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        uploadMbaMouReport(mou.id, file);
                                      }
                                      e.target.value = "";
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                            {mouReportErrors[uploadKey] ? (
                              <p className="mt-2 text-xs text-red-600">
                                {mouReportErrors[uploadKey]}
                              </p>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>
    ),

    workshops: (() => {
      const mdpItems = getMbaMdpPrograms();
      const fdpItems = getMbaFdpPrograms();
      const workshopItems = getMbaWorkshopPrograms();
      const mdpMarkdown = getMbaMdpMarkdown(mdpItems);
      const fdpMarkdown = getMbaFdpMarkdown(fdpItems);
      const workshopMarkdown = getMbaWorkshopMarkdown(workshopItems);

      return (
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-500 inline-block pb-2">
            MDP&apos;s, FDP&apos;s and Workshop
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            SEBI sponsored Financial Education Workshops conducted by Dr. H. M.
            Jha "Bidyarthi", a SEBI (Securities Exchange Board of India)
            empanelled Resource Person during current year
          </p>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3">
              <h4 className="text-white font-bold text-lg">
                MDP&apos;s, CEP&apos;s and FDP&apos;s
              </h4>
              <p className="text-orange-100 text-xs mt-1">
                Programs conducted under the auspices of MSME DI Nagpur
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                      Title of the Program
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                      Faculty Coordinator
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                      No. of Beneficiaries
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mdpItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                        {renderMbaTableCellMarkdown(item.title)}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                        {renderMbaTableCellMarkdown(item.coordinator)}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200 text-center">
                        {renderMbaTableCellMarkdown(item.participants)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isEditing && (
              <div className="border-t border-gray-200 bg-white p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-gray-800">
                      Edit MDP / CEP / FDP Table in Markdown
                    </h4>
                    <p className="text-sm text-gray-500">
                      The public table layout stays the same.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addMbaMdpRowOnTop}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ssgmce-blue text-white font-semibold hover:bg-ssgmce-dark-blue transition-colors"
                  >
                    <FaPlus />
                    Add New Row On Top
                  </button>
                </div>
                <MarkdownEditor
                  value={mdpMarkdown}
                  onSave={handleMbaMdpMarkdownSave}
                  placeholder="MDP / CEP / FDP table (GFM Markdown)..."
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3">
              <h4 className="text-white font-bold text-lg">
                Faculty Development Program (FDP)
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                      Title of the Program
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                      Faculty Coordinator
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                      No. of Participants
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fdpItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                        {renderMbaTableCellMarkdown(item.title)}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                        {renderMbaTableCellMarkdown(item.coordinator)}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200 text-center">
                        {renderMbaTableCellMarkdown(item.participants)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isEditing && (
              <div className="border-t border-gray-200 bg-white p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-gray-800">
                      Edit FDP Table in Markdown
                    </h4>
                    <p className="text-sm text-gray-500">
                      The public table layout stays the same.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addMbaFdpRowOnTop}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ssgmce-blue text-white font-semibold hover:bg-ssgmce-dark-blue transition-colors"
                  >
                    <FaPlus />
                    Add New Row On Top
                  </button>
                </div>
                <MarkdownEditor
                  value={fdpMarkdown}
                  onSave={handleMbaFdpMarkdownSave}
                  placeholder="FDP table (GFM Markdown)..."
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-3">
              <h4 className="text-white font-bold text-lg">Workshops</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200 w-12">
                      Sr.
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                      Title of the Workshop
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                      Faculty Coordinator
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                      No. of Participants
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200 w-28">
                      Report
                    </th>
                    {isEditing && (
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200 w-44">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workshopItems.map((item, i) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200 font-medium text-center">
                        {i + 1}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                        {renderMbaTableCellMarkdown(item.title)}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                        {renderMbaTableCellMarkdown(item.coordinator)}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                        {renderMbaTableCellMarkdown(item.participants)}
                      </td>
                      <td className="px-6 py-3 text-sm border border-gray-200 text-center">
                        {item.report ? (
                          <a
                            href={item.report}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-ssgmce-blue hover:text-ssgmce-orange hover:underline font-medium text-xs"
                          >
                            <FaFileAlt className="text-xs" />
                            View
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs">--</span>
                        )}
                      </td>
                      {isEditing && (
                        <td className="px-6 py-3 text-sm border border-gray-200 align-top">
                          {(() => {
                            const uploadKey = `mba-workshop-${item.id}`;
                            const isUploading = Boolean(
                              workshopReportUploading[uploadKey],
                            );
                            const uploadError =
                              workshopReportErrors[uploadKey] || "";

                            return (
                              <div className="space-y-2 min-w-[150px]">
                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100">
                                  <FaUpload className="text-xs" />
                                  {isUploading ? "Uploading..." : "Upload PDF"}
                                  <input
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    disabled={isUploading}
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        uploadMbaWorkshopReport(item.id, file);
                                      }
                                      e.target.value = "";
                                    }}
                                  />
                                </label>
                                {uploadError ? (
                                  <p className="text-xs text-red-600">
                                    {uploadError}
                                  </p>
                                ) : null}
                              </div>
                            );
                          })()}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isEditing && (
              <div className="border-t border-gray-200 bg-white p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-gray-800">
                      Edit Workshops Table in Markdown
                    </h4>
                    <p className="text-sm text-gray-500">
                      Use the upload button on each workshop row to attach that
                      entry&apos;s PDF report while keeping this markdown synced.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addMbaWorkshopRowOnTop}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ssgmce-blue text-white font-semibold hover:bg-ssgmce-dark-blue transition-colors"
                  >
                    <FaPlus />
                    Add New Row On Top
                  </button>
                </div>
                <MarkdownEditor
                  value={workshopMarkdown}
                  onSave={handleMbaWorkshopMarkdownSave}
                  placeholder="Workshop table (GFM Markdown)..."
                />
              </div>
            )}
          </div>
        </div>
      );
    })(),

    consultancy: (() => {
      const consultancyYears = getMbaConsultancyYears();
      const consultancyMarkdownByYear = getMbaConsultancyMarkdownByYear();

      return (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-500 inline-block pb-2">
              Consultancy
            </h3>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setNewConsultancyYear("");
                  setConsultancyYearError("");
                  setShowAddConsultancyYear(true);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-ssgmce-blue px-4 py-2 text-sm font-bold text-white transition-all hover:bg-ssgmce-orange"
              >
                <FaPlus className="text-xs" />
                Add New Consultancy Year
              </button>
            )}
          </div>

          {consultancyYears.map((year) => {
            const markdown = consultancyMarkdownByYear[year] || mbaConsultancyToMarkdown([]);
            const entries = parseMbaConsultancyMarkdown(markdown);

            return (
              <div
                key={year}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3">
                  <h4 className="text-white font-bold text-lg">
                    Consultancy {year}
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200 w-12">
                          Sr.
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                          Consulting Organization
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                          Consultant Faculty
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {entries.map((entry, eIdx) => (
                        <tr
                          key={`${year}-${eIdx}`}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200 font-medium text-center">
                            {eIdx + 1}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200 font-medium">
                            {renderMbaTableCellMarkdown(entry.org)}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                            {renderMbaTableCellMarkdown(entry.faculty)}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-700 border border-gray-200">
                            {renderMbaTableCellMarkdown(entry.remarks)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {isEditing && (
                  <div className="border-t border-gray-200 bg-white p-5">
                    <div className="mb-4">
                      <h4 className="text-base font-bold text-gray-800">
                        Edit Consultancy {year} in Markdown
                      </h4>
                      <p className="text-sm text-gray-500">
                        This table is markdown-only in admin while the public
                        table layout stays unchanged.
                      </p>
                    </div>
                    <MarkdownEditor
                      value={markdown}
                      onSave={(value) =>
                        handleMbaConsultancyMarkdownSave(year, value)
                      }
                      placeholder="Consultancy table (GFM Markdown)..."
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    })(),

    patents: (
      <div className="space-y-8">
        <div className="flex flex-wrap space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
          {[
            "patents",
            "publications",
            "conferences",
            "books",
            "copyrights",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setPatentSubTab(tab)}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-all capitalize ${patentSubTab === tab ? "bg-white text-ssgmce-blue shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab === "patents"
                ? "Patents"
                : tab === "publications"
                  ? "Publications"
                  : tab === "conferences"
                    ? "Conferences"
                    : tab === "books"
                      ? "Books"
                      : "Copyrights"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {patentSubTab === "patents" ? (
            <motion.div
              key="patents"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center mb-2 md:mb-0">
                  <FaLightbulb className="text-yellow-500 mr-2" />
                  Patents Granted & Published
                </h3>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {mbaResearchYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setResearchYear(year)}
                      className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                        researchYear === year
                          ? "bg-ssgmce-blue text-white shadow-md"
                          : "bg-white text-gray-500 hover:text-ssgmce-blue border border-gray-200"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewResearchYear("");
                        setResearchYearError("");
                        setShowAddResearchYear(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-ssgmce-blue px-4 py-1 text-xs font-bold whitespace-nowrap text-white transition-all hover:bg-ssgmce-orange"
                    >
                      <FaPlus className="text-[10px]" />
                      Add Session
                    </button>
                  )}
                </div>
              </div>
              {selectedResearchItems.length === 0 ? (
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
                  <p className="text-gray-500 text-sm">
                    No patents recorded for {researchYear}.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 font-black tracking-wider w-12 text-center">
                            #
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider w-1/3">
                            Title of Invention
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider text-right">
                            Application No.
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider text-right">
                            Inventors
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedResearchItems.map(
                          (pat, i) => (
                            <tr
                              key={i}
                              className="hover:bg-green-50/30 transition-colors group"
                            >
                              <td className="px-6 py-4 text-center font-mono text-xs text-gray-400 group-hover:text-green-600">
                                {i + 1}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-800">
                                {pat.title}
                                <span
                                  className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${pat.status === "Granted" || pat.status === "Copyright Awarded" ? "bg-green-100 text-green-700" : pat.status === "Registered" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}
                                >
                                  {pat.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-mono text-xs text-gray-500 whitespace-nowrap text-right">
                                {pat.link ? (
                                  <a
                                    href={pat.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ssgmce-blue hover:text-ssgmce-dark-blue underline underline-offset-2"
                                  >
                                    {pat.id}
                                  </a>
                                ) : (
                                  pat.id
                                )}
                              </td>
                              <td className="px-6 py-4 text-gray-500 italic text-right">
                                {pat.inventors}
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          ) : patentSubTab === "publications" ? (
            <motion.div
              key="publications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center mb-2 md:mb-0">
                  <FaChartLine className="text-ssgmce-orange mr-2" />
                  Research Publications (Journals)
                </h3>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {mbaResearchYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setResearchYear(year)}
                      className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                        researchYear === year
                          ? "bg-ssgmce-blue text-white shadow-md"
                          : "bg-white text-gray-500 hover:text-ssgmce-blue border border-gray-200"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewResearchYear("");
                        setResearchYearError("");
                        setShowAddResearchYear(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-ssgmce-blue px-4 py-1 text-xs font-bold whitespace-nowrap text-white transition-all hover:bg-ssgmce-orange"
                    >
                      <FaPlus className="text-[10px]" />
                      Add Session
                    </button>
                  )}
                </div>
              </div>
              {selectedResearchItems.length === 0 ? (
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
                  <p className="text-gray-500 text-sm">
                    No publications recorded for {researchYear}.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 font-black tracking-wider w-12 text-center">
                            #
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Title of Paper
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Authors
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Journal Details
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider text-right">
                            Link
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedResearchItems.map(
                          (pub, i) => (
                            <tr
                              key={i}
                              className="hover:bg-indigo-50/30 transition-colors"
                            >
                              <td className="px-6 py-4 text-center font-mono text-xs text-gray-400">
                                {i + 1}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-800">
                                {pub.title}
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                {pub.authors}
                              </td>
                              <td className="px-6 py-4 text-gray-500 italic text-xs">
                                {pub.journal}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {pub.link ? (
                                  <a
                                    href={pub.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-ssgmce-blue hover:text-ssgmce-dark-blue font-bold px-3 py-1 bg-blue-50 rounded-lg transition-colors border border-blue-100"
                                  >
                                    View{" "}
                                    <FaExternalLinkAlt className="ml-2 text-[10px]" />
                                  </a>
                                ) : (
                                  <span className="text-gray-400 text-xs">
                                    -
                                  </span>
                                )}
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          ) : patentSubTab === "conferences" ? (
            <motion.div
              key="conferences"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center mb-2 md:mb-0">
                  <FaChalkboardTeacher className="text-indigo-500 mr-2" />
                  Conference Publications
                </h3>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {mbaResearchYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setResearchYear(year)}
                      className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                        researchYear === year
                          ? "bg-ssgmce-blue text-white shadow-md"
                          : "bg-white text-gray-500 hover:text-ssgmce-blue border border-gray-200"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewResearchYear("");
                        setResearchYearError("");
                        setShowAddResearchYear(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-ssgmce-blue px-4 py-1 text-xs font-bold whitespace-nowrap text-white transition-all hover:bg-ssgmce-orange"
                    >
                      <FaPlus className="text-[10px]" />
                      Add Session
                    </button>
                  )}
                </div>
              </div>
              {selectedResearchItems.length === 0 ? (
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
                  <p className="text-gray-500 text-sm">
                    No conference publications recorded for {researchYear}.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 font-black tracking-wider w-12 text-center">
                            #
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Title of Paper
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Authors
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Conference Details
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider text-right">
                            Link
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedResearchItems.map(
                          (conf, i) => (
                            <tr
                              key={i}
                              className="hover:bg-indigo-50/30 transition-colors"
                            >
                              <td className="px-6 py-4 text-center font-mono text-xs text-gray-400">
                                {i + 1}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-800">
                                {conf.title}
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                {conf.authors}
                              </td>
                              <td className="px-6 py-4 text-gray-500 italic text-xs">
                                {conf.journal}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {conf.link ? (
                                  <a
                                    href={conf.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-ssgmce-blue hover:text-ssgmce-dark-blue font-bold px-3 py-1 bg-blue-50 rounded-lg transition-colors border border-blue-100"
                                  >
                                    View{" "}
                                    <FaExternalLinkAlt className="ml-2 text-[10px]" />
                                  </a>
                                ) : (
                                  <span className="text-gray-400 text-xs">
                                    -
                                  </span>
                                )}
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          ) : patentSubTab === "copyrights" ? (
            <motion.div
              key="copyrights"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center mb-2 md:mb-0">
                  <FaAward className="text-purple-500 mr-2" />
                  Copyrights
                </h3>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {mbaResearchYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setResearchYear(year)}
                      className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                        researchYear === year
                          ? "bg-ssgmce-blue text-white shadow-md"
                          : "bg-white text-gray-500 hover:text-ssgmce-blue border border-gray-200"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewResearchYear("");
                        setResearchYearError("");
                        setShowAddResearchYear(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-ssgmce-blue px-4 py-1 text-xs font-bold whitespace-nowrap text-white transition-all hover:bg-ssgmce-orange"
                    >
                      <FaPlus className="text-[10px]" />
                      Add Session
                    </button>
                  )}
                </div>
              </div>
              {selectedResearchItems.length === 0 ? (
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
                  <p className="text-gray-500 text-sm">
                    No copyrights recorded for {researchYear}.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 font-black tracking-wider w-12 text-center">
                            #
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Name of Faculty
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Title of Work
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider text-right">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedResearchItems.map(
                          (cr, i) => (
                            <tr
                              key={i}
                              className="hover:bg-purple-50/30 transition-colors"
                            >
                              <td className="px-6 py-4 text-center font-mono text-xs text-gray-400">
                                {i + 1}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-800">
                                {cr.name}
                              </td>
                              <td className="px-6 py-4 text-gray-700">
                                {cr.link ? (
                                  <a
                                    href={cr.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ssgmce-blue hover:text-ssgmce-dark-blue underline underline-offset-2"
                                  >
                                    {cr.title}
                                  </a>
                                ) : (
                                  cr.title
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-700">
                                  {cr.status}
                                </span>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          ) : patentSubTab === "books" ? (
            <motion.div
              key="books"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center mb-2 md:mb-0">
                  <FaBook className="text-teal-500 mr-2" />
                  Books / Book Chapters Published
                </h3>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {mbaResearchYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setResearchYear(year)}
                      className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                        researchYear === year
                          ? "bg-ssgmce-blue text-white shadow-md"
                          : "bg-white text-gray-500 hover:text-ssgmce-blue border border-gray-200"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewResearchYear("");
                        setResearchYearError("");
                        setShowAddResearchYear(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-ssgmce-blue px-4 py-1 text-xs font-bold whitespace-nowrap text-white transition-all hover:bg-ssgmce-orange"
                    >
                      <FaPlus className="text-[10px]" />
                      Add Session
                    </button>
                  )}
                </div>
              </div>
              {selectedResearchItems.length === 0 ? (
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
                  <p className="text-gray-500 text-sm">
                    No books published for {researchYear}.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 font-black tracking-wider w-12 text-center">
                            #
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Author(s)
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider">
                            Publisher
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider text-right">
                            ISBN
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedResearchItems.map(
                          (book, i) => (
                            <tr
                              key={i}
                              className="hover:bg-teal-50/30 transition-colors"
                            >
                              <td className="px-6 py-4 text-center font-mono text-xs text-gray-400">
                                {i + 1}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-800">
                                {book.name}
                                {book.coAuthors ? `, ${book.coAuthors}` : ""}
                              </td>
                              <td className="px-6 py-4 text-gray-700">
                                {book.link ? (
                                  <a
                                    href={book.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ssgmce-blue hover:text-ssgmce-dark-blue underline underline-offset-2"
                                  >
                                    {book.title}
                                  </a>
                                ) : (
                                  book.title
                                )}
                              </td>
                              <td className="px-6 py-4 text-gray-500 italic text-xs">
                                {book.details}
                              </td>
                              <td className="px-6 py-4 font-mono text-xs text-gray-500 text-right">
                                {book.isbn}
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
        {isEditing && (
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">
                      Edit {researchYear} {patentSubTab} in Markdown
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Keep the public table layout as it is while editing this
                      session through markdown, DOCX import, and the matching
                      template.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addMbaResearchRowOnTop()}
                    className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                  >
                    <FaPlus className="text-xs" />
                    Add New Row On Top
                  </button>
                </div>
              </div>
              <MarkdownEditor
                key={`${patentSubTab}-${researchYear}`}
                value={selectedResearchMarkdown}
                onSave={handleMbaResearchMarkdownSave}
                showDocImport
                docTemplateUrl={MBA_RESEARCH_TEMPLATE_URLS[patentSubTab]}
                docTemplateLabel="Download Template"
                placeholder={`${patentSubTab} table for ${researchYear} (GFM Markdown)...`}
              />
            </div>
          </div>
        )}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="text-sm font-bold text-ssgmce-blue mb-2 flex items-center">
            <FaDownload className="mr-2" /> Year-wise Detailed Reports (PDF)
          </h4>
          <div className="flex flex-wrap gap-2">
            {mbaResearchYears.map((year) => (
              <a
                key={year}
                href={getMbaResearchReportUrl(year)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 text-xs font-bold bg-white text-ssgmce-blue rounded-lg border border-blue-200 hover:bg-ssgmce-blue hover:text-white transition-all"
              >
                <FaFileAlt className="mr-1.5" /> {year}
              </a>
            ))}
          </div>
        </div>
        {isEditing && (
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-800">
                Upload Year-wise Detailed Reports
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Upload one detailed report PDF per academic year. The public
                download strip above will use these saved files.
              </p>
            </div>
            <div className="space-y-3">
              {mbaResearchYears.map((year) => {
                const uploadKey = `mba-research-report-${year}`;
                const reportUrl = getMbaResearchReportUrl(year);
                return (
                  <div
                    key={`research-report-${year}`}
                    className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {year}
                      </p>
                      {reportUrl ? (
                        <a
                          href={reportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-2 text-xs font-medium text-ssgmce-blue underline underline-offset-2"
                        >
                          <FaFileAlt className="text-xs" />
                          Current Detailed Report
                        </a>
                      ) : (
                        <p className="mt-1 text-xs text-gray-400">
                          No detailed report uploaded
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-2 md:items-end">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#003366] to-[#004d99] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:from-[#004d99] hover:to-[#0066cc] hover:shadow-lg">
                        <FaUpload className="text-yellow-300" />
                        {researchReportUploading[uploadKey]
                          ? "Uploading..."
                          : "Upload Report"}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          disabled={researchReportUploading[uploadKey]}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            event.target.value = "";
                            if (file) {
                              uploadMbaResearchReport(year, file);
                            }
                          }}
                        />
                      </label>
                      {researchReportErrors[uploadKey] ? (
                        <span className="text-right text-[11px] text-red-500">
                          {researchReportErrors[uploadKey]}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
      title="Master of Business Administration (MBA)"
      backgroundImage={mbaBanner}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:gap-12">
        {/* Sidebar Navigation (Left Side) */}
        <div className="lg:w-1/4 order-1 lg:order-1">
          <div className="space-y-4 pb-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2 lg:space-y-6 lg:pb-4 scrollbar-thin scrollbar-thumb-ssgmce-blue scrollbar-track-gray-100">
            {/* Academics Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <FaUniversity className="text-ssgmce-orange mr-2" /> Academics
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {academicsLinks.map((link) => (
                  <SidebarLink key={link.id} {...link} />
                ))}
              </div>
            </div>

            {/* Industry Interaction Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-ssgmce-orange to-orange-600 p-4">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <FaIndustry className="text-white mr-2" /> Industry Relation
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {industryLinks.map((link) => (
                  <SidebarLink key={link.id} {...link} />
                ))}
              </div>
            </div>
          </div>
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

        <AnimatePresence>
          {showAddPlacementYear && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => {
                setPlacementYearError("");
                setShowAddPlacementYear(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaPlus className="text-ssgmce-blue" /> Add New Academic
                    Year
                  </h3>
                  <button
                    onClick={() => {
                      setPlacementYearError("");
                      setShowAddPlacementYear(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Academic Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 2025-26"
                      value={newPlacementYear}
                      onChange={(e) => {
                        setNewPlacementYear(e.target.value);
                        if (placementYearError) {
                          setPlacementYearError("");
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the academic year in format YYYY-YY (e.g., 2025-26)
                    </p>
                    {placementYearError ? (
                      <p className="text-xs text-red-600 mt-2">
                        {placementYearError}
                      </p>
                    ) : null}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> After adding the year, you can
                      click "View Details" to edit the placement records for
                      this academic year.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setPlacementYearError("");
                      setShowAddPlacementYear(false);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPlacementYear}
                    disabled={!newPlacementYear.trim()}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaPlus /> Add Year
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAddConsultancyYear && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => {
                setConsultancyYearError("");
                setShowAddConsultancyYear(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaPlus className="text-ssgmce-blue" /> Add Consultancy Year
                  </h3>
                  <button
                    onClick={() => {
                      setConsultancyYearError("");
                      setShowAddConsultancyYear(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Consultancy Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 2025 - 2026"
                      value={newConsultancyYear}
                      onChange={(e) => {
                        setNewConsultancyYear(e.target.value);
                        if (consultancyYearError) {
                          setConsultancyYearError("");
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use the same year label style shown in the consultancy
                      section, for example `2018 - 2019`.
                    </p>
                    {consultancyYearError ? (
                      <p className="text-xs text-red-600 mt-2">
                        {consultancyYearError}
                      </p>
                    ) : null}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> The new consultancy year will be
                      added at the top with an empty markdown table.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setConsultancyYearError("");
                      setShowAddConsultancyYear(false);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addMbaConsultancyYear}
                    disabled={!newConsultancyYear.trim()}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaPlus /> Add Year
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAddLeaderSession && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => {
                setLeaderSessionError("");
                setShowAddLeaderSession(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaPlus className="text-ssgmce-blue" /> Add Session Year
                  </h3>
                  <button
                    onClick={() => {
                      setLeaderSessionError("");
                      setShowAddLeaderSession(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Session Label <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Session 2025-26"
                      value={newLeaderSession}
                      onChange={(e) => {
                        setNewLeaderSession(e.target.value);
                        if (leaderSessionError) {
                          setLeaderSessionError("");
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use the same label style already shown in the Corporate
                      Leader Speak&apos;s section.
                    </p>
                    {leaderSessionError ? (
                      <p className="text-xs text-red-600 mt-2">
                        {leaderSessionError}
                      </p>
                    ) : null}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> The new session will be added at
                      the top with an empty markdown table.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setLeaderSessionError("");
                      setShowAddLeaderSession(false);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addMbaLeaderSession}
                    disabled={!newLeaderSession.trim()}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaPlus /> Add Session
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAddResearchYear && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => {
                setResearchYearError("");
                setShowAddResearchYear(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaPlus className="text-ssgmce-blue" /> Add Research
                    Session
                  </h3>
                  <button
                    onClick={() => {
                      setResearchYearError("");
                      setShowAddResearchYear(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Academic Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 2025-26"
                      value={newResearchYear}
                      onChange={(e) => {
                        setNewResearchYear(e.target.value);
                        if (researchYearError) {
                          setResearchYearError("");
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the academic year in format YYYY-YY.
                    </p>
                    {researchYearError ? (
                      <p className="text-xs text-red-600 mt-2">
                        {researchYearError}
                      </p>
                    ) : null}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> The new session will be created for
                      patents, publications, conferences, books, and
                      copyrights with an empty markdown table plus DOCX import
                      and template download support.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setResearchYearError("");
                      setShowAddResearchYear(false);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddResearchYear}
                    disabled={!newResearchYear.trim()}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaPlus /> Add Session
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GenericPage>
  );
};

const MBA_ACTIVITY_REMOTE_IMAGE_PREFIX =
  "https://www.ssgmce.ac.in/images/mba_faculty/";

const getLocalMbaActivityImageUrl = (imageUrl = "") => {
  const normalizedUrl = String(imageUrl || "").trim();
  if (!normalizedUrl) return "";

  if (
    normalizedUrl
      .toLowerCase()
      .startsWith(MBA_ACTIVITY_REMOTE_IMAGE_PREFIX.toLowerCase())
  ) {
    const fileName = normalizedUrl.split("/").pop()?.split("?")[0] || "";
    return fileName ? `/uploads/images/mba/activities/${fileName}` : normalizedUrl;
  }

  return normalizedUrl;
};

const normalizeMbaActivity = (activity = {}) => ({
  title: String(activity.title || "").trim(),
  date: String(activity.date || "").trim(),
  participants: String(activity.participants || "").trim(),
  organizer: String(activity.organizer || "").trim(),
  resource: String(activity.resource || "").trim(),
  image: getLocalMbaActivityImageUrl(activity.image),
});

const defaultMbaActivityCards = defaultActivities.map(normalizeMbaActivity);

const formatMbaActivityMarkdownField = (label, value, includeEmpty = false) => {
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

const mbaActivitiesToMarkdown = (activities = []) =>
  activities
    .map((activity) => normalizeMbaActivity(activity))
    .filter((activity) => activity.title)
    .map((activity) =>
      [
        `## ${activity.title}`,
        formatMbaActivityMarkdownField("Date", activity.date, true),
        formatMbaActivityMarkdownField(
          "Participants",
          activity.participants,
          true,
        ),
        formatMbaActivityMarkdownField(
          "Organized by",
          activity.organizer,
          true,
        ),
        formatMbaActivityMarkdownField(
          "Resource Person",
          activity.resource,
          true,
        ),
        formatMbaActivityMarkdownField("Image", activity.image, true),
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

const parseMbaActivitiesMarkdown = (markdown = "") => {
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
          const labelKey = {
            date: "date",
            participants: "participants",
            "organized by": "organizer",
            "resource person": "resource",
            image: "image",
          }[rawLabel.toLowerCase()];

          activeField = labelKey || null;
          if (activeField) {
            fieldMap[activeField].push(rawValue.trim());
          }
          return;
        }

        if (activeField) {
          fieldMap[activeField].push(trimmedLine);
        }
      });

      return normalizeMbaActivity({
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

export default MBA;
