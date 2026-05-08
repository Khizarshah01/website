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
import {
  defaultFaculty as MECH_DEFAULTS,
  defaultPrideGate,
  defaultPrideToppersBE,
  defaultPrideAlumni,
  mechPrideGateToMarkdown,
  mechPrideToppersToMarkdown,
  mechPrideAlumniToMarkdown,
  defaultMechStudentProjects,
  mechStudentProjectsToMarkdown,
  defaultActivities,
  defaultNewsletters,
  defaultAchievements,
  defaultInnovativePractices,
  mechInnovativePracticesToMarkdown,
  mechMarkdownToInnovativePractices,
  defaultMechPatents,
  defaultMechPublications,
  defaultMechCopyrights,
  defaultMechInstitutePatents,
  defaultLearningResources,
  defaultNBAResources,
  defaultOverviewTableBE,
  defaultOverviewTableME,
  defaultOverviewTablePhD,
  defaultVision,
  defaultMission,
  defaultPeo,
  defaultPso,
  defaultPo,
} from "../../data/mechanicalDefaults";
import { getPathWithTab, getRequestedTab } from "../../utils/navigation";
import { defaultPlacements } from "../../data/mechPlacements";
import { defaultMechInternships } from "../../data/mechInternships";
import mechanicalBanner from "../../assets/images/departments/mechanical/Mechnical banner.png";

// Industrial Visit Photos
import ivSanjeevVertex2024 from "../../assets/images/departments/mechanical/industrial-visits/sanjeev_vertex_sambhajinagar_2024.jpeg";
import ivTooltech2023 from "../../assets/images/departments/mechanical/industrial-visits/tooltech_sambhajinagar_2023.jpeg";
import ivParasThermal2022 from "../../assets/images/departments/mechanical/industrial-visits/paras_thermal_2022.jpg";
import ivHindustanHardy2020 from "../../assets/images/departments/mechanical/industrial-visits/hindustan_hardy_nashik_2020.jpg";
import ivBosch2020 from "../../assets/images/departments/mechanical/industrial-visits/bosch_nashik_2020.jpg";
import ivGreavesCotton2019 from "../../assets/images/departments/mechanical/industrial-visits/greaves_cotton_aurangabad_2019.jpg";
import ivAutoexpo2018 from "../../assets/images/departments/mechanical/industrial-visits/autoexpo_aurangabad_2018.jpeg";
import ivYantra2019 from "../../assets/images/departments/mechanical/industrial-visits/yantra_aurangabad_2019.jpg";
import ivVinodrai2018 from "../../assets/images/departments/mechanical/industrial-visits/vinodrai_aurangabad_2018.jpg";
import ivSiemens2018 from "../../assets/images/departments/mechanical/industrial-visits/siemens_aurangabad_2018.jpeg";
import ivFlowtech2018 from "../../assets/images/departments/mechanical/industrial-visits/flowtech_aurangabad_2018.jpeg";
import ivGreavesCotton2018 from "../../assets/images/departments/mechanical/industrial-visits/greaves_cotton_aurangabad_2018.jpeg";

import {
  FaLaptopCode,
  FaBullseye,
  FaUserTie,
  FaFlask,
  FaAward,
  FaAngleRight,
  FaIndustry,
  FaUniversity,
  FaQuoteLeft,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaTrophy,
  FaChartLine,
  FaLightbulb,
  FaProjectDiagram,
  FaCalendarAlt,
  FaDownload,
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaImages,
  FaSearchPlus,
  FaMapMarkerAlt,
  FaFileAlt,
  FaUpload,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// HOD Photo
import hodPhoto from "../../assets/images/departments/mechanical/HOD_MECH.jpg";

// Faculty Photos
import SPT from "../../assets/images/departments/mechanical/faculty/SPT.jpg";
import VKThute from "../../assets/images/departments/mechanical/faculty/VKThute.jpg";
import JGKhan from "../../assets/images/departments/mechanical/faculty/Dr_JGKhan.jpg";
import MBB from "../../assets/images/departments/mechanical/faculty/MBB.jpg";
import CVPatil from "../../assets/images/departments/mechanical/faculty/CVPatil.jpg";
import ASB from "../../assets/images/departments/mechanical/faculty/ASB.jpg";
import NBBorkar from "../../assets/images/departments/mechanical/faculty/NBBorkar.jpg";
import NHK from "../../assets/images/departments/mechanical/faculty/NHK.jpeg";
import SQSyed from "../../assets/images/departments/mechanical/faculty/SQSyed.jpg";
import PTPatokar from "../../assets/images/departments/mechanical/faculty/PTPatokar.jpg";
import KVC from "../../assets/images/departments/mechanical/faculty/KVC.jpg";
import PiyushDalke from "../../assets/images/departments/mechanical/faculty/PiyushDalke.jpg";
import KRDudhe from "../../assets/images/departments/mechanical/faculty/KRDhudhe.jpg";
import SPJ from "../../assets/images/departments/mechanical/faculty/SPJ.jpg";
import GSWahile from "../../assets/images/departments/mechanical/faculty/ASB.jpg"; // Using placeholder
import VTMhaske from "../../assets/images/departments/mechanical/faculty/VTMhaske.jpg";
import ParagJadhav from "../../assets/images/departments/mechanical/faculty/Parag Jadhav.png";

// Photo map for resolving mechanical faculty photo string references
const mechPhotoMap = {
  SPT,
  VKT: VKThute,
  JGK: JGKhan,
  MBB,
  CVP: CVPatil,
  ASB,
  NBB: NBBorkar,
  NHK,
  SQS: SQSyed,
  PTP: PTPatokar,
  KVC,
  PD: PiyushDalke,
  KRD: KRDudhe,
  SPJ,
  GSW: GSWahile,
  VTM: VTMhaske,
  PJ: ParagJadhav,
};

const normalizeMechYoutubeEmbedUrl = (value = "") => {
  const raw = String(value || "").trim();
  if (!raw) return "";

  if (/youtube-nocookie\.com\/embed\//i.test(raw)) {
    return raw;
  }

  if (/youtube\.com\/embed\//i.test(raw)) {
    return raw.replace("youtube.com/embed/", "youtube-nocookie.com/embed/");
  }

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    let videoId = "";

    if (host === "youtu.be") {
      videoId = url.pathname.replace(/\//g, "").trim();
    } else if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com"
    ) {
      if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v") || "";
      } else if (url.pathname.startsWith("/embed/")) {
        videoId = url.pathname.split("/embed/")[1] || "";
      } else if (url.pathname.startsWith("/shorts/")) {
        videoId = url.pathname.split("/shorts/")[1] || "";
      }
    }

    videoId = videoId.split(/[?&/]/)[0].trim();
    if (!videoId) return raw;

    const listId = url.searchParams.get("list");
    return `https://www.youtube-nocookie.com/embed/${videoId}${listId ? `?list=${listId}` : ""}`;
  } catch {
    return raw;
  }
};

// Resolve mechanical faculty photos from string references to actual imports
const resolvedMechFaculty = MECH_DEFAULTS.map((f) => ({
  ...f,
  photo: mechPhotoMap[f.photo] || f.photo,
}));

// Staff Photos
import GRJodh from "../../assets/images/departments/mechanical/Staff/Gopal Jodh.jpg";
import SDDeshmukh from "../../assets/images/departments/mechanical/Staff/SDD.jpg";
import GAWayzode from "../../assets/images/departments/mechanical/Staff/GAW.jpg";
import ROBedre from "../../assets/images/departments/mechanical/Staff/ROB.jpg";
import PMDeshmukh from "../../assets/images/departments/mechanical/Staff/P M Deshmukh.jpeg";
import NDKamavisdar from "../../assets/images/departments/mechanical/Staff/NDK.jpg";
import GDIngle from "../../assets/images/departments/mechanical/Staff/GDI.jpg";
import VHAkhare from "../../assets/images/departments/mechanical/Staff/VHA.jpg";
import VSBharate from "../../assets/images/departments/mechanical/Staff/VSB.jpg";
import OSBhalerao from "../../assets/images/departments/mechanical/Staff/OSBhalerao.jpeg";
import DBWadode from "../../assets/images/departments/mechanical/Staff/DBW.jpg";
import PMDandwate from "../../assets/images/departments/mechanical/Staff/PMDandwate.jpg";
import MRDhoke from "../../assets/images/departments/mechanical/Staff/MRDhoke.jpg";
import VSBharsakale from "../../assets/images/departments/mechanical/Staff/VSBharsakale.jpg";
import MPRajurkar from "../../assets/images/departments/mechanical/Staff/MPRajurkar.jpg";
import VSDhage from "../../assets/images/departments/mechanical/Staff/VSDhage.jpg";
import RJOimbe from "../../assets/images/departments/mechanical/Staff/RJOimbe.jpg";
import VRRahate from "../../assets/images/departments/mechanical/Staff/VRRahate.jpg";
import BSSonone from "../../assets/images/departments/mechanical/Staff/BSSonone.jpg";
import GRPayghan from "../../assets/images/departments/mechanical/Staff/GRPayghan.jpg";
import AADhage from "../../assets/images/departments/mechanical/Staff/AADhage.jpg";
import RNPachade from "../../assets/images/departments/mechanical/Staff/RNPachade.jpg";

const MECH_DEFAULT_FACULTY = resolvedMechFaculty;
const MECH_DEFAULT_DEPARTMENT_STAFF = [
  { name: "Mr. G. R. Jodh", role: "Office Assistant", photo: GRJodh },
  { name: "Mr. S. D. Deshmukh", role: "Lab Assistant", photo: SDDeshmukh },
  { name: "Mr. G. A. Wayzode", role: "Lab Assistant", photo: GAWayzode },
  { name: "Mr. R. O. Bedre", role: "Lab Assistant", photo: ROBedre },
  { name: "Mr. P. M. Deshmukh", role: "Lab Assistant", photo: PMDeshmukh },
  { name: "Mr. N. D. Kamavisdar", role: "Lab Assistant", photo: NDKamavisdar },
  { name: "Mr. G. D. Ingle", role: "Lab Attendant", photo: GDIngle },
  { name: "Mr. V. H. Akhare", role: "Lab Attendant", photo: VHAkhare },
  { name: "Mr. V. S. Bharate", role: "Lab Attendant", photo: VSBharate },
  { name: "Mr. O. S. Bhalerao", role: "Peon", photo: OSBhalerao },
  { name: "Mr. D. B. Wadode", role: "Peon", photo: DBWadode },
];
const MECH_DEFAULT_WORKSHOP_STAFF = [
  {
    name: "Mr. Purushottam M. Dandwate",
    role: "Lab Assistant (SGTR)",
    photo: PMDandwate,
  },
  {
    name: "Mr. Mahesh R. Dhoke",
    role: "Attendant (Foundry & Smithy Shop)",
    photo: MRDhoke,
  },
  {
    name: "Mr. Vijaykumar S. Bharsakle",
    role: "Lab Assistant (Machine Shop SGTR)",
    photo: VSBharsakale,
  },
  {
    name: "Mr. Murlidhar P. Rajurkar",
    role: "Carpenter (Carpentry)",
    photo: MPRajurkar,
  },
  {
    name: "Mr. Vasudev S. Dhage",
    role: "Attendant (Carpentry)",
    photo: VSDhage,
  },
  {
    name: "Mr. Rajesh J. Oimbe",
    role: "Lab Assistant (Machine Shop)",
    photo: RJOimbe,
  },
  {
    name: "Mr. Vitthal R. Rahate",
    role: "Attendant (Welding Shop)",
    photo: VRRahate,
  },
  {
    name: "Mr. Balkrishna S. Sonone",
    role: "Attendant (Machine Shop)",
    photo: BSSonone,
  },
  {
    name: "Mr. Ganesh R. Payghan",
    role: "Lab Assistant (Fitting Shop)",
    photo: GRPayghan,
  },
  {
    name: "Mr. Amol A. Dhage",
    role: "Attendant (SGTR)",
    photo: AADhage,
  },
  {
    name: "Mr. Ramdas N. Pachade",
    role: "Attendant (SGTR)",
    photo: RNPachade,
  },
];

// ---- Mechanical Pride Markdown helpers ----
function mechParsePrideSections(markdown = "") {
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

const mechPrideTableComponents = {
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

function MechPrideMdView({ markdown = "" }) {
  const sections = mechParsePrideSections(markdown);
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
              components={mechPrideTableComponents}
            >
              {sec.body}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
// ---- End Mechanical Pride Markdown helpers ----

const defaultMechIndustrialVisits = [
  {
    sn: "01",
    industries: [
      "Sanjeev Techno Product & Vertex Engineering, Sambhaji Nagar and Nashik",
    ],
    class: "--",
    date: "28/03/2024",
    students: "--",
    report: "",
  },
  {
    sn: "02",
    industries: ["ToolTech, Sambhaji Nagar"],
    class: "--",
    date: "05/04/2023",
    students: "--",
    report: "",
  },
  {
    sn: "03",
    industries: ["Paras Thermal Power Plant"],
    class: "--",
    date: "07/04/2022",
    students: "--",
    report: "",
  },
  {
    sn: "04",
    industries: ["Hindustan Hardy Ltd, Nashik"],
    class: "--",
    date: "20/01/2020",
    students: "--",
    report: "",
  },
  {
    sn: "05",
    industries: ["BOSCH, Nashik"],
    class: "--",
    date: "20/01/2020",
    students: "--",
    report: "",
  },
  {
    sn: "06",
    industries: ["Greaves Cotton, Aurangabad"],
    class: "--",
    date: "2018-19",
    students: "--",
    report: "",
  },
  {
    sn: "07",
    industries: ["AutoExpo 2018, Aurangabad"],
    class: "--",
    date: "2018",
    students: "--",
    report: "",
  },
  {
    sn: "08",
    industries: ["Yantra LLP Division, Aurangabad"],
    class: "--",
    date: "2018-19",
    students: "--",
    report: "",
  },
  {
    sn: "09",
    industries: ["Vinodrai Engineers Ltd, Aurangabad (Faculty Visit)"],
    class: "--",
    date: "2017-18",
    students: "--",
    report: "",
  },
  {
    sn: "10",
    industries: ["Siemens, Aurangabad"],
    class: "--",
    date: "2017-18",
    students: "--",
    report: "",
  },
  {
    sn: "11",
    industries: ["FlowTech, Aurangabad"],
    class: "--",
    date: "2017-18",
    students: "--",
    report: "",
  },
  {
    sn: "12",
    industries: ["Greaves Cotton, Aurangabad"],
    class: "--",
    date: "2017-18",
    students: "--",
    report: "",
  },
];

const defaultMechIndustrialVisitGallery = [
  {
    image: ivSanjeevVertex2024,
    caption:
      "Visit to Sanjeev Techno Product & Vertex Engineering, Sambhaji Nagar and Nashik on 28 March 2024",
    location: "Sambhaji Nagar & Nashik",
    date: "28 March 2024",
  },
  {
    image: ivTooltech2023,
    caption: "Visit to ToolTech, Sambhaji Nagar on 05 April 2023",
    location: "Sambhaji Nagar",
    date: "05 April 2023",
  },
  {
    image: ivParasThermal2022,
    caption: "Visit to Paras Thermal Power Plant on 07 April 2022",
    location: "Paras",
    date: "07 April 2022",
  },
  {
    image: ivHindustanHardy2020,
    caption: "Visit to Hindustan Hardy Ltd, Nashik on 20 January 2020",
    location: "Nashik",
    date: "20 January 2020",
  },
  {
    image: ivBosch2020,
    caption: "Visit to BOSCH, Nashik on 20 January 2020",
    location: "Nashik",
    date: "20 January 2020",
  },
  {
    image: ivGreavesCotton2019,
    caption: "Industry visit at Greaves Cotton, Aurangabad in 2018-19",
    location: "Aurangabad",
    date: "2018-19",
  },
  {
    image: ivAutoexpo2018,
    caption: "Visit to AutoExpo 2018, Aurangabad",
    location: "Aurangabad",
    date: "2018",
  },
  {
    image: ivYantra2019,
    caption: "Industry Visit at Yantra LLP Division, Aurangabad in 2018-19",
    location: "Aurangabad",
    date: "2018-19",
  },
  {
    image: ivVinodrai2018,
    caption: "Faculty Visit at Vinodrai Engineers Ltd, Aurangabad in 2017-18",
    location: "Aurangabad",
    date: "2017-18",
  },
  {
    image: ivSiemens2018,
    caption: "Industry visit at Siemens, Aurangabad in 2017-18",
    location: "Aurangabad",
    date: "2017-18",
  },
  {
    image: ivFlowtech2018,
    caption: "Visit to FlowTech, Aurangabad",
    location: "Aurangabad",
    date: "2017-18",
  },
  {
    image: ivGreavesCotton2018,
    caption: "Industry visit at Greaves Cotton, Aurangabad in 2017-18",
    location: "Aurangabad",
    date: "2017-18",
  },
];

const mechExtractMarkdownLinkHref = (value = "") => {
  const match = String(value || "").match(/\[.*?\]\((.*?)\)/);
  return match?.[1]?.trim?.() || "";
};

const mechParseMarkdownTableRow = (line = "") =>
  String(line || "")
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const mechParseIndustrialVisitIndustries = (value = "") =>
  String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .split(/\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);

const mechIndustrialVisitsToMarkdown = (visits = []) => {
  const lines = [
    "## Industrial Visits",
    "",
    "| Industry / Organization | Class | Date | No. of Students | Detailed Report |",
    "|--------------------------|-------|------|-----------------|-----------------|",
  ];

  if (!visits.length) {
    lines.push("| No visits added yet. | - | - | - | - |");
    return lines.join("\n");
  }

  visits.forEach((visit) => {
    const industries = Array.isArray(visit?.industries)
      ? visit.industries.filter(Boolean).join("<br>")
      : String(visit?.industries || "").trim();
    const reportCell = visit?.report
      ? `[Detailed Report](${visit.report})`
      : "-";

    lines.push(
      `| ${industries || "-"} | ${visit?.class || "-"} | ${visit?.date || "-"} | ${visit?.students || "-"} | ${reportCell} |`,
    );
  });

  return lines.join("\n");
};

const parseMechIndustrialVisitsMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];

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

  return dataLines
    .map((line) => mechParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 5)
    .map((cells) => {
      const offset = cells.length >= 6 ? 1 : 0;
      return {
        industries: mechParseIndustrialVisitIndustries(cells[offset] || ""),
        class: cells[offset + 1] || "",
        date: cells[offset + 2] || "",
        students: cells[offset + 3] || "",
        report: mechExtractMarkdownLinkHref(cells.slice(offset + 4).join(" | ")),
      };
    })
    .filter(
      (visit) =>
        visit.industries.length ||
        visit.class ||
        visit.date ||
        visit.students ||
        visit.report,
    );
};

const createMechIndustrialVisitId = () =>
  `mech-industrial-visit-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getMechIndustrialVisitSignature = (visit = {}) =>
  JSON.stringify({
    industries: (Array.isArray(visit?.industries) ? visit.industries : [])
      .map((item) => String(item || "").trim().toLowerCase())
      .filter(Boolean),
    class: String(visit?.class || "").trim().toLowerCase(),
    date: String(visit?.date || "").trim().toLowerCase(),
    students: String(visit?.students || "").trim().toLowerCase(),
  });

const defaultMechMous = [
  { no: "1.", org: "Joshi Jampala Engineering Pvt. Ltd., Satara", date: "05/03/2025", report: "/uploads/documents/mech_mous/MOU_Joshi_Jampala_2025.pdf" },
  { no: "2.", org: "Endress Hauser, Chat. Sambhajinagar", date: "05/03/2025", report: "/uploads/documents/mech_mous/MOU_Endress_Hauser_2025.pdf" },
  { no: "3.", org: "SW System, Pune", date: "05/03/2025", report: "/uploads/documents/mech_mous/MOU_SW_System_2025.pdf" },
  { no: "4.", org: "Tejas Polymer Engineers, Pune", date: "05/03/2025", report: "/uploads/documents/mech_mous/MOU_Tejas_Polymer_2025.pdf" },
  { no: "5.", org: "Sharv Polyplast Pvt. Ltd., Pune", date: "05/03/2025", report: "/uploads/documents/mech_mous/MOU_Sharv_Polyplast_2025.pdf" },
  { no: "6.", org: 'Krishna Vishwa Vidyapeeth "Deemed to be University", Karad, Maharashtra', date: "16/01/2024", report: "/uploads/documents/mech_mous/MOU_KVV_Karad_2024.pdf" },
  { no: "7.", org: "Endress Hauser, Sambhaji Nagar (Aurangabad)", date: "31/03/2022", report: "/uploads/documents/mech_mous/MOU_Endress_Hauser_2022.pdf" },
  { no: "8.", org: "Tool Tech Toolings Kirdak Auto Com Pvt. Ltd., Sambhaji Nagar (Aurangabad)", date: "27/07/2022", report: "/uploads/documents/mech_mous/MOU_Tool_Tech_Toolings_2022.pdf" },
  { no: "9.", org: "Vinodrai Engg Pvt Ltd., MIDC, Jalna", date: "16/03/2019", report: "/uploads/documents/mech_mous/MOU_Vinodrai_Engg_2019.pdf" },
  { no: "10.", org: "Mechatol Engg Solutions Pvt Ltd., Kothrud, Pune", date: "19/01/2019", report: "/uploads/documents/mech_mous/MOU_Mechatol_Engg_2019.pdf" },
  { no: "11.", org: "Kala Group of Companies, MIDC Chakan, Pune", date: "19/01/2019", report: "/uploads/documents/mech_mous/MOU_Kala_Group_2019.pdf" },
  { no: "12.", org: "Wadhokar Group of Companies, MIDC Chakan, Pune", date: "19/01/2019", report: "/uploads/documents/mech_mous/MOU_Wadhokar_Group_2019.pdf" },
];

const mechMousToMarkdown = (mous = []) => {
  const lines = ["## MoUs", "", "| Name of the Organization | MOU Signing Date | MOU Copy / Report |", "|--------------------------|------------------|-------------------|"];
  if (!mous.length) return [...lines, "| No MoUs added yet. | - | - |"].join("\n");
  mous.forEach((mou) => lines.push(`| ${mou?.org || "-"} | ${mou?.date || "-"} | ${mou?.report ? `[View Document](${mou.report})` : "-"} |`));
  return lines.join("\n");
};

const parseMechMousMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return dataLines.map((line) => mechParseMarkdownTableRow(line)).filter((cells) => cells.length >= 3).map((cells) => ({ org: cells[0] || "", date: cells[1] || "", report: mechExtractMarkdownLinkHref(cells.slice(2).join(" | ")) })).filter((mou) => mou.org || mou.date || mou.report);
};

const createMechMouId = () =>
  `mech-mou-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getMechMouSignature = (mou = {}) =>
  JSON.stringify({ org: String(mou?.org || "").trim().toLowerCase(), date: String(mou?.date || "").trim().toLowerCase() });

const mechPatentsToMarkdown = (items = [], year = "2024-25") => {
  const lines = [
    `## ${year}`,
    "",
    "| Title of Invention | Status | Application No. | Inventors | Link |",
    "|--------------------|--------|-----------------|-----------|------|",
  ];

  if (!items.length) {
    lines.push("| Add invention title | Published | Add application no. | Add inventors | - |");
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

const parseMechPatentsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };

  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));

  return {
    year,
    items: dataLines
      .map((line) => mechParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 5)
      .map((cells) => ({
        title: cells[0] || "",
        status: cells[1] || "",
        id: cells[2] || "",
        inventors: cells[3] || "",
        link: mechExtractMarkdownLinkHref(cells.slice(4).join(" | ")),
      }))
      .filter((item) => item.title || item.status || item.id || item.inventors || item.link),
  };
};

const mechPublicationsToMarkdown = (items = [], year = "2024-25") => {
  const lines = [
    `## ${year}`,
    "",
    "| Title of Paper | Authors | Journal/Conference | Link |",
    "|----------------|---------|--------------------|------|",
  ];

  if (!items.length) {
    lines.push("| Add paper title | Add authors | Add journal or conference | - |");
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

const parseMechPublicationsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };

  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));

  return {
    year,
    items: dataLines
      .map((line) => mechParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        title: cells[0] || "",
        authors: cells[1] || "",
        journal: cells[2] || "",
        link: mechExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.title || item.authors || item.journal || item.link),
  };
};

const mechCopyrightsToMarkdown = (items = [], year = "2024-25") => {
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

const parseMechCopyrightsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };

  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));

  return {
    year,
    items: dataLines
      .map((line) => mechParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        name: cells[0] || "",
        title: cells[1] || "",
        status: cells[2] || "",
        link: mechExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.name || item.title || item.status || item.link),
  };
};

const mechInstitutePatentsToMarkdown = (items = []) => {
  const lines = [
    "| Title of Invention | Application No. / Patent No. | Date of Filing | Status |",
    "|--------------------|------------------------------|----------------|--------|",
  ];

  if (!items.length) {
    lines.push("| Add invention title | Add application no. | Add filing date | Add status |");
    return lines.join("\n");
  }

  items.forEach((item) => {
    lines.push(
      `| ${item?.title || "-"} | ${item?.id || "-"} | ${item?.filingDate || "-"} | ${item?.status || "-"} |`,
    );
  });

  return lines.join("\n");
};

const parseMechInstitutePatentsMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];

  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));

  return dataLines
    .map((line) => mechParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 4)
    .map((cells) => ({
      title: cells[0] || "",
      id: cells[1] || "",
      filingDate: cells[2] || "",
      status: cells[3] || "",
    }))
    .filter((item) => item.title || item.id || item.filingDate || item.status);
};

const MECH_RESEARCH_DEFAULTS = {
  patents: defaultMechPatents,
  publications: defaultMechPublications,
  copyrights: defaultMechCopyrights,
};

const MECH_RESEARCH_TO_MARKDOWN = {
  patents: mechPatentsToMarkdown,
  publications: mechPublicationsToMarkdown,
  copyrights: mechCopyrightsToMarkdown,
};

const MECH_RESEARCH_FROM_MARKDOWN = {
  patents: parseMechPatentsMarkdown,
  publications: parseMechPublicationsMarkdown,
  copyrights: parseMechCopyrightsMarkdown,
};

const MECH_RESEARCH_TEMPLATE_URLS = {
  patents: "/uploads/documents/pride_templates/mechanical_patents_template.docx",
  publications:
    "/uploads/documents/pride_templates/mechanical_publications_template.docx",
  copyrights:
    "/uploads/documents/pride_templates/mechanical_copyrights_template.docx",
  institutePatents:
    "/uploads/documents/pride_templates/mechanical_institute_patents_template.docx",
};

const Mechanical = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() =>
    getRequestedTab(location, "overview")
  );
  const [vmTab, setVmTab] = useState("vision");
  const [poTab, setPoTab] = useState("peo");
  const [expandedSemester, setExpandedSemester] = useState(null);
  const [showAllPos, setShowAllPos] = useState(false);
  const [researchTab, setResearchTab] = useState("patents");
  const [projectYear, setProjectYear] = useState("2024-25");
  const [researchYear, setResearchYear] = useState("2024-25");
  const [placementYear, setPlacementYear] = useState(null);
  const [showAddPlacementYear, setShowAddPlacementYear] = useState(false);
  const [newPlacementYear, setNewPlacementYear] = useState("");
  const [placementYearError, setPlacementYearError] = useState("");
  const [showAddResearchYear, setShowAddResearchYear] = useState(false);
  const [newResearchYear, setNewResearchYear] = useState("");
  const [researchYearError, setResearchYearError] = useState("");
  const [prideTab, setPrideTab] = useState("gate");
  const [activitiesVisible, setActivitiesVisible] = useState(6);
  const [lightboxActivity, setLightboxActivity] = useState(null);
  const [achievementTab, setAchievementTab] = useState("faculty");
  const [certificateLightbox, setCertificateLightbox] = useState(null);
  const [ivLightbox, setIvLightbox] = useState(null);
  const [internshipYear, setInternshipYear] = useState("2023-24");
  const [showAddInternshipYear, setShowAddInternshipYear] = useState(false);
  const [newInternshipYear, setNewInternshipYear] = useState("");
  const [internshipYearError, setInternshipYearError] = useState("");

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
  const [industrialVisitGalleryUploading, setIndustrialVisitGalleryUploading] =
    useState({});
  const [industrialVisitGalleryErrors, setIndustrialVisitGalleryErrors] =
    useState({});
  const [mouReportUploading, setMouReportUploading] = useState({});
  const [mouReportErrors, setMouReportErrors] = useState({});
  const [shouldScrollToNewLearningResource, setShouldScrollToNewLearningResource] =
    useState(false);
  const [expandedFacultyEditorIndex, setExpandedFacultyEditorIndex] =
    useState(null);

  useEffect(() => {
    const requestedTab = getRequestedTab(location, "overview");

    setActiveTab((currentTab) =>
      currentTab === requestedTab ? currentTab : requestedTab
    );
  }, [location.search]);
  const latestLearningResourceRef = useRef(null);
  const [nbaDriveLinkDraft, setNbaDriveLinkDraft] = useState("");
  const [nbaVideoLinkDrafts, setNbaVideoLinkDrafts] = useState({});

  // Load department data (works in both edit and public view modes)
  const {
    data: activeData,
    loading: dataLoading,
    isEditing,
    updateData,
    removeData,
    t,
  } = useDepartmentData("departments-mechanical");

  // Helper for array updates
  const updateField = (path, value) => {
    updateData(path, value);
  };

  const getMechNbaVideos = () =>
    t("nbaResources.videos", defaultNBAResources.videos) || [];

  useEffect(() => {
    setNbaDriveLinkDraft(
      t("nbaResources.driveLink", defaultNBAResources.driveLink) || "",
    );
  }, [activeData]);

  useEffect(() => {
    const nextDrafts = {};
    getMechNbaVideos().forEach((video, index) => {
      nextDrafts[index] = video?.sourceUrl || video?.embedUrl || "";
    });
    setNbaVideoLinkDrafts(nextDrafts);
  }, [activeData]);

  const updateMechNbaVideos = (videos) => {
    updateData("nbaResources.videos", videos);
  };

  const addMechNbaVideo = () => {
    const current = getMechNbaVideos();
    updateMechNbaVideos([
      ...current,
      {
        title: `NBA Resource Video ${current.length + 1}`,
        embedUrl: "",
        sourceUrl: "",
      },
    ]);
  };

  const removeMechNbaVideo = (index) => {
    updateMechNbaVideos(getMechNbaVideos().filter((_, i) => i !== index));
  };

  const updateMechNbaVideo = (index, patch) => {
    updateMechNbaVideos(
      getMechNbaVideos().map((video, i) =>
        i === index ? { ...video, ...patch } : video,
      ),
    );
  };

  const mechInternshipsToMarkdown = (records = [], year = "2023-24") => {
    const lines = [
      `## ${year}`,
      "",
      "| SIS ID | Name of Student | Name of Company | Class | Start Date | End Date | Paid (Y/N) |",
      "|--------|-----------------|-----------------|-------|------------|----------|------------|",
    ];

    if (!records.length) {
      lines.push("| Add SIS ID | Add student name | Add company | Add class | Add start date | Add end date | Add paid status |");
      return lines.join("\n");
    }

    records.forEach((intern) => {
      lines.push(
        `| ${intern?.sis || "-"} | ${intern?.name || "-"} | ${intern?.org || "-"} | ${intern?.class || "-"} | ${intern?.startDate || "-"} | ${intern?.endDate || "-"} | ${intern?.paid || "-"} |`,
      );
    });

    return lines.join("\n");
  };

  const parseMechInternshipsMarkdown = (markdown = "", fallbackYear = "2023-24") => {
    const text = String(markdown || "").trim();
    if (!text) return { year: fallbackYear, records: [] };

    const headingMatch = text.match(/^##\s+(.+)$/m);
    const year = headingMatch?.[1]?.trim() || fallbackYear;
    const tableLines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("|"));

    const dataLines = tableLines.filter(
      (line, index) =>
        index > 1 &&
        !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(
          line,
        ),
    );

    return {
      year,
      records: dataLines
        .map((line) => mechParseMarkdownTableRow(line))
        .filter((cells) => cells.length >= 7)
        .map((cells, index) => ({
          no: String(index + 1),
          sis: cells[0] || "",
          name: cells[1] || "",
          org: cells[2] || "",
          class: cells[3] || "",
          startDate: cells[4] || "",
          endDate: cells[5] || "",
          paid: cells[6] || "",
        }))
        .filter(
          (intern) =>
            intern.sis ||
            intern.name ||
            intern.org ||
            intern.class ||
            intern.startDate ||
            intern.endDate ||
            intern.paid,
        ),
    };
  };

  const getMechIndustrialVisits = () =>
    JSON.parse(JSON.stringify(t("industrialVisits.items", defaultMechIndustrialVisits))).map(
      (visit) => ({
        ...visit,
        id: String(visit?.id || createMechIndustrialVisitId()),
      }),
    );

  const getMechIndustrialVisitsMarkdown = (visits = getMechIndustrialVisits()) =>
    mechIndustrialVisitsToMarkdown(visits);

  const persistMechIndustrialVisits = (visits) => {
    const normalizedVisits = (Array.isArray(visits) ? visits : []).map((visit) => ({
      id: String(visit?.id || createMechIndustrialVisitId()).trim(),
      industries: Array.isArray(visit?.industries)
        ? visit.industries.map((item) => String(item || "").trim()).filter(Boolean)
        : [],
      class: String(visit?.class || "").trim(),
      date: String(visit?.date || "").trim(),
      students: String(visit?.students || "").trim(),
      report: String(visit?.report || "").trim(),
    }));

    updateData("industrialVisits.items", normalizedVisits);
    updateData("industrialVisits.markdown", mechIndustrialVisitsToMarkdown(normalizedVisits));
  };

  const handleMechIndustrialVisitsMarkdownSave = (markdown) => {
    const parsed = parseMechIndustrialVisitsMarkdown(markdown);
    const existingVisits = getMechIndustrialVisits();
    const signaturePool = new Map();
    existingVisits.forEach((visit) => {
      const signature = getMechIndustrialVisitSignature(visit);
      const matches = signaturePool.get(signature) || [];
      matches.push(visit);
      signaturePool.set(signature, matches);
    });
    const usedIds = new Set();
    const mergedVisits = parsed.map((visit, index) => {
      const signature = getMechIndustrialVisitSignature(visit);
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
        id: match?.id || createMechIndustrialVisitId(),
        industries: visit.industries,
        class: visit.class,
        date: visit.date,
        students: visit.students,
        report: visit.report || match?.report || "",
      };
    });
    persistMechIndustrialVisits(mergedVisits);
  };

  const addMechIndustrialVisitRowOnTop = () => {
    const visits = getMechIndustrialVisits();
    persistMechIndustrialVisits([
      {
        id: createMechIndustrialVisitId(),
        industries: ["New Industry / Organization"],
        class: "Add class",
        date: "Add date",
        students: "Add students",
        report: "",
      },
      ...visits,
    ]);
  };

  const getInternshipYears = () => {
    const storedYears = Array.isArray(t("internshipsYears", null))
      ? t("internshipsYears", [])
      : [];
    const recordYears = Object.keys(
      t("internships", defaultMechInternships) || defaultMechInternships,
    ).filter(
      (value) =>
        typeof value === "string" && /^\d{4}-\d{2}$/.test(value.trim()),
    );

    return [...new Set([...storedYears, ...recordYears])]
      .filter(Boolean)
      .sort((a, b) => Number(String(b).slice(0, 4)) - Number(String(a).slice(0, 4)));
  };

  const getInternshipRecords = () =>
    JSON.parse(JSON.stringify(t("internships", defaultMechInternships)));

  const getInternshipMarkdownByYear = () =>
    JSON.parse(JSON.stringify(t("internshipsMarkdownByYear", {})));

  const createEmptyInternshipMarkdown = (year) =>
    mechInternshipsToMarkdown([], year);

  const persistInternships = (records, years = getInternshipYears()) => {
    const orderedYears = [...new Set([...years, ...Object.keys(records || {})])]
      .filter(
        (value) =>
          typeof value === "string" && /^\d{4}-\d{2}$/.test(value.trim()),
      )
      .sort((a, b) => Number(String(b).slice(0, 4)) - Number(String(a).slice(0, 4)));

    const normalizedRecords = orderedYears.reduce((acc, year) => {
      acc[year] = (Array.isArray(records?.[year]) ? records[year] : []).map(
        (intern, index) => ({
          no: String(index + 1),
          sis: String(intern?.sis || "").trim(),
          name: String(intern?.name || "").trim(),
          org: String(intern?.org || "").trim(),
          class: String(intern?.class || "").trim(),
          startDate: String(intern?.startDate || "").trim(),
          endDate: String(intern?.endDate || "").trim(),
          paid: String(intern?.paid || "").trim(),
        }),
      );
      return acc;
    }, {});

    const existingMarkdownByYear = getInternshipMarkdownByYear();
    const markdownByYear = orderedYears.reduce((acc, year) => {
      acc[year] =
        existingMarkdownByYear?.[year] ||
        mechInternshipsToMarkdown(normalizedRecords[year] || [], year);
      return acc;
    }, {});

    updateData("internships", normalizedRecords);
    updateData("internshipsYears", orderedYears);
    updateData("internshipsMarkdownByYear", markdownByYear);
  };

  const internshipYears = getInternshipYears();
  const internshipRecords = getInternshipRecords();
  const internshipMarkdownByYear = getInternshipMarkdownByYear();
  const currentInternships = Array.isArray(internshipRecords?.[internshipYear])
    ? internshipRecords[internshipYear]
    : [];
  const selectedInternshipsMarkdown =
    internshipMarkdownByYear?.[internshipYear] ||
    mechInternshipsToMarkdown(currentInternships, internshipYear);
  const researchYears = getMechResearchYears();
  const selectedResearchItems = getMechResearchItems(researchTab, researchYear);
  const selectedResearchMarkdown = getMechResearchMarkdownValue(
    researchTab,
    researchYear,
  );

  useEffect(() => {
    if (!researchYears.length) return;
    if (!researchYears.includes(researchYear)) {
      setResearchYear(researchYears[0]);
    }
  }, [researchYear, researchYears]);

  useEffect(() => {
    if (!internshipYears.length) return;
    if (!internshipYears.includes(internshipYear)) {
      setInternshipYear(internshipYears[0]);
    }
  }, [internshipYear, internshipYears]);

  const handleInternshipsMarkdownSave = (markdown) => {
    const parsed = parseMechInternshipsMarkdown(markdown, internshipYear);
    const records = {
      ...getInternshipRecords(),
      [internshipYear]: parsed.records || [],
    };
    persistInternships(records, internshipYears);
    updateData(
      `internshipsMarkdownByYear.${internshipYear}`,
      mechInternshipsToMarkdown(parsed.records || [], internshipYear),
    );
  };

  const handleAddResearchYear = () => {
    const normalizedYear = newResearchYear.trim();

    if (!isValidAcademicYear(normalizedYear)) {
      setResearchYearError("Enter a valid academic year like 2025-26.");
      return;
    }

    if (researchYears.includes(normalizedYear)) {
      setResearchYearError("That academic year already exists.");
      return;
    }

    ["patents", "publications", "copyrights"].forEach((section) => {
      updateData(`research.${section}.${normalizedYear}`, []);
      updateData(
        `researchMarkdown.${section}.${normalizedYear}`,
        createEmptyMechResearchMarkdown(section, normalizedYear),
      );
    });

    updateData("researchYears", [normalizedYear, ...researchYears]);
    setResearchYear(normalizedYear);
    setNewResearchYear("");
    setResearchYearError("");
    setShowAddResearchYear(false);
  };

  const handleAddInternshipYear = () => {
    const normalizedYear = newInternshipYear.trim();

    if (!isValidAcademicYear(normalizedYear)) {
      setInternshipYearError("Enter a valid academic year like 2025-26.");
      return;
    }

    if (internshipYears.includes(normalizedYear)) {
      setInternshipYearError("That academic year already exists.");
      return;
    }

    const records = getInternshipRecords();
    records[normalizedYear] = [];
    persistInternships(records, [normalizedYear, ...internshipYears]);
    updateData(
      `internshipsMarkdownByYear.${normalizedYear}`,
      createEmptyInternshipMarkdown(normalizedYear),
    );
    setInternshipYear(normalizedYear);
    setNewInternshipYear("");
    setInternshipYearError("");
    setShowAddInternshipYear(false);
  };

  const uploadMechIndustrialVisitReport = async (visitId, file) => {
    if (!file) return;

    const uploadKey = `mech-industrial-visit-${visitId}`;
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

      const visits = getMechIndustrialVisits();
      persistMechIndustrialVisits(
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
      console.error("Mechanical industrial visit report upload failed:", error);
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

  const getMechIndustrialVisitGallery = () =>
    JSON.parse(
      JSON.stringify(t("industrialVisits.gallery", defaultMechIndustrialVisitGallery)),
    );

  const persistMechIndustrialVisitGallery = (photos) => {
    const normalizedPhotos = (Array.isArray(photos) ? photos : []).map((photo) => ({
      image: String(photo?.image || "").trim(),
      caption: String(photo?.caption || "").trim(),
      location: String(photo?.location || "").trim(),
      date: String(photo?.date || "").trim(),
    }));

    updateData("industrialVisits.gallery", normalizedPhotos);
  };

  const addMechIndustrialVisitPhoto = () => {
    const photos = getMechIndustrialVisitGallery();
    photos.unshift({
      image: "",
      caption: "Add visit photo caption",
      location: "Add location",
      date: "Add date",
    });
    persistMechIndustrialVisitGallery(photos);
  };

  const updateMechIndustrialVisitPhoto = (index, field, value) => {
    const photos = getMechIndustrialVisitGallery();
    photos[index] = {
      ...photos[index],
      [field]: value,
    };
    persistMechIndustrialVisitGallery(photos);
  };

  const deleteMechIndustrialVisitPhoto = (index) => {
    const photos = getMechIndustrialVisitGallery();
    persistMechIndustrialVisitGallery(
      photos.filter((_, photoIndex) => photoIndex !== index),
    );
  };

  const uploadMechIndustrialVisitPhoto = async (index, file) => {
    if (!file) return;

    const uploadKey = `mech-gallery-${index}`;
    setIndustrialVisitGalleryUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setIndustrialVisitGalleryErrors((prev) => ({ ...prev, [uploadKey]: "" }));

    try {
      const formData = new FormData();
      formData.append("image", file);

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

      updateMechIndustrialVisitPhoto(index, "image", response.data.fileUrl);
    } catch (error) {
      console.error("Mechanical industrial visit gallery upload failed:", error);
      setIndustrialVisitGalleryErrors((prev) => ({
        ...prev,
        [uploadKey]:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Upload failed",
      }));
    } finally {
      setIndustrialVisitGalleryUploading((prev) => ({
        ...prev,
        [uploadKey]: false,
      }));
    }
  };

  const getMechMous = () =>
    JSON.parse(JSON.stringify(t("mous.items", defaultMechMous))).map((mou) => ({
      ...mou,
      id: String(mou?.id || createMechMouId()),
    }));

  const getMechMousMarkdown = (mous = getMechMous()) => mechMousToMarkdown(mous);

  const persistMechMous = (mous) => {
    const normalizedMous = (Array.isArray(mous) ? mous : []).map((mou) => ({
      id: String(mou?.id || createMechMouId()).trim(),
      org: String(mou?.org || "").trim(),
      date: String(mou?.date || "").trim(),
      report: String(mou?.report || "").trim(),
    }));
    updateData("mous.items", normalizedMous);
    updateData("mous.markdown", mechMousToMarkdown(normalizedMous));
  };

  const handleMechMousMarkdownSave = (markdown) => {
    const parsed = parseMechMousMarkdown(markdown);
    const existingMous = getMechMous();
    const signaturePool = new Map();
    existingMous.forEach((mou) => {
      const signature = getMechMouSignature(mou);
      const matches = signaturePool.get(signature) || [];
      matches.push(mou);
      signaturePool.set(signature, matches);
    });
    const usedIds = new Set();
    const mergedMous = parsed.map((mou, index) => {
      const signature = getMechMouSignature(mou);
      let match = (signaturePool.get(signature) || []).find((item) => !usedIds.has(item.id));
      if (!match) {
        const fallback = existingMous[index];
        if (fallback && !usedIds.has(fallback.id)) match = fallback;
      }
      if (match?.id) usedIds.add(match.id);
      return { id: match?.id || createMechMouId(), org: mou.org, date: mou.date, report: mou.report || match?.report || "" };
    });
    persistMechMous(mergedMous);
  };

  const addMechMouRowOnTop = () => {
    const mous = getMechMous();
    persistMechMous([{ id: createMechMouId(), org: "New organization", date: "Add signing date", report: "" }, ...mous]);
  };

  const uploadMechMouReport = async (mouId, file) => {
    if (!file) return;
    const uploadKey = `mech-mou-${mouId}`;
    setMouReportUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setMouReportErrors((prev) => ({ ...prev, [uploadKey]: "" }));
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("adminToken");
      const response = await apiClient.post("/upload/file", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      if (response.data.fileUrl) {
        const mous = getMechMous();
        persistMechMous(mous.map((mou) => (mou.id === mouId ? { ...mou, report: response.data.fileUrl } : mou)));
      }
    } catch (error) {
      console.error("Mechanical MOU upload failed:", error);
      setMouReportErrors((prev) => ({ ...prev, [uploadKey]: "Failed to upload report." }));
    } finally {
      setMouReportUploading((prev) => ({ ...prev, [uploadKey]: false }));
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

  const getPlacementMarkdown = (year) => {
    const records = placementRecordsByYear[year] || [];
    return placementRecordsToMarkdown(year, records);
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
        const rows = lines
          .slice(tableStart + 2)
          .filter((line) => line.startsWith("|"));
        return rows.length;
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
          <MechPrideMdView markdown={markdown} />
        )}
      </div>
    );
  };

  const updateFacultyMember = (index, field, value) => {
    const faculty = JSON.parse(
      JSON.stringify(t("templateData.faculty", MECH_DEFAULT_FACULTY)),
    );
    faculty[index] = { ...faculty[index], [field]: value };
    updateField("templateData.faculty", faculty);
  };

  const getStaffGroup = (path, fallback) =>
    JSON.parse(JSON.stringify(t(path, fallback)));

  const updateStaffGroup = (path, fallback, updater) => {
    const current = getStaffGroup(path, fallback);
    const updated = typeof updater === "function" ? updater(current) : updater;
    updateField(path, updated);
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

  // Activity helper
  const updateActivity = (idx, field, value) => {
    const storedActivitiesMarkdown = t("activitiesMarkdown", "");
    const parsedActivities = parseMechanicalActivitiesMarkdown(
      storedActivitiesMarkdown,
    );
    const sourceActivities = (
      parsedActivities.length
        ? parsedActivities
        : t("activities", defaultMechanicalActivityCards)
    ).map(normalizeMechanicalActivity);

    if (!sourceActivities[idx]) return;

    const nextActivities = sourceActivities.map((activity, activityIndex) =>
      activityIndex === idx
        ? normalizeMechanicalActivity({
            ...activity,
            [field]: value,
          })
        : activity,
    );

    updateData("activities", nextActivities);
    updateData(
      "activitiesMarkdown",
      mechanicalActivitiesToMarkdown(nextActivities),
    );
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

  const getStoredMechanicalValue = (key) =>
    activeData?.[key] ?? activeData?.templateData?.[key];

  const latestNewsletterData =
    getStoredMechanicalValue("newsletters_latest") || defaultNewsletters.latest;
  const newsletterArchivesData =
    getStoredMechanicalValue("newsletters_archives") ||
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

  const getLearningResources = () =>
    JSON.parse(JSON.stringify(t("learningResources", defaultLearningResources)));

  const updateLearningResource = (index, field, value) => {
    const items = getLearningResources();
    if (!items[index]) return;
    items[index] = { ...items[index], [field]: value };
    updateData("learningResources", items);
  };

  const addLearningResource = () => {
    updateData("learningResources", [
      ...getLearningResources(),
      {
        year: "New Year",
        title: "New Semester",
        syllabusLink: "#",
        resourceLink: "#",
      },
    ]);
    setShouldScrollToNewLearningResource(true);
  };

  const deleteLearningResource = (index) => {
    updateData(
      "learningResources",
      getLearningResources().filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const learningResourceItems =
    t("learningResources", defaultLearningResources) || [];

  useEffect(() => {
    if (
      !shouldScrollToNewLearningResource ||
      !isEditing ||
      activeTab !== "learning-resources"
    ) {
      return;
    }

    if (latestLearningResourceRef.current) {
      latestLearningResourceRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setShouldScrollToNewLearningResource(false);
    }
  }, [
    shouldScrollToNewLearningResource,
    isEditing,
    activeTab,
    learningResourceItems.length,
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
    t("activities", defaultMechanicalActivityCards) ||
    defaultMechanicalActivityCards
  ).map(normalizeMechanicalActivity);
  const storedActivitiesMarkdown = t("activitiesMarkdown", "");
  const parsedActivities = parseMechanicalActivitiesMarkdown(
    storedActivitiesMarkdown,
  );
  const activitiesData = parsedActivities.length
    ? parsedActivities
    : legacyActivities;

  const updateActivityList = (updater) => {
    const nextActivities = updater(
      activitiesData.map((activity) => normalizeMechanicalActivity(activity)),
    );
    updateData("activities", nextActivities);
    updateData(
      "activitiesMarkdown",
      mechanicalActivitiesToMarkdown(nextActivities),
    );
  };

  const addActivityCard = () => {
    updateActivityList((items) => [
      {
        title: "New Curricular Activity",
        date: "Add activity date",
        participants: "Add participant details",
        organizer: "Mechanical Engineering Department, SSGMCE",
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

  const mechanicalActivityMarkdownComponents = {
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
          components={mechanicalActivityMarkdownComponents}
        >
          {trimmedValue}
        </ReactMarkdown>
      </div>
    );
  };

  // Pride section helper functions
  const updatePrideGate = (yearIdx, studentIdx, cellIdx, val) => {
    const newGate = JSON.parse(
      JSON.stringify(t("pride.gate", defaultPrideGate)),
    );
    newGate[yearIdx].students[studentIdx][cellIdx] = val;
    updateData("pride.gate", newGate);
  };

  const updatePrideToppers = (key, yearIdx, recordIdx, field, val) => {
    const newData = JSON.parse(
      JSON.stringify(t(`pride.toppers.${key}`, defaultPrideToppersBE)),
    );
    newData[yearIdx].records[recordIdx][field] = val;
    updateData(`pride.toppers.${key}`, newData);
  };

  const updateOverviewTable = (path, defaultArr, rowIdx, cellIdx, val) => {
    const newData = JSON.parse(JSON.stringify(t(path, defaultArr)));
    newData[rowIdx][cellIdx] = val;
    updateData(path, newData);
  };

  function getMechResearchItems(section, year = researchYear) {
    return JSON.parse(
      JSON.stringify(
        t(`research.${section}.${year}`, MECH_RESEARCH_DEFAULTS[section]?.[year] || []),
      ),
    );
  }

  function getMechResearchMarkdownByYear(section) {
    return JSON.parse(JSON.stringify(t(`researchMarkdown.${section}`, {})));
  }

  function getMechResearchMarkdownValue(section, year = researchYear) {
    const storedMarkdown = getMechResearchMarkdownByYear(section)?.[year];
    if (storedMarkdown) return storedMarkdown;
    return MECH_RESEARCH_TO_MARKDOWN[section](getMechResearchItems(section, year), year);
  }

  function getMechResearchYears() {
    const storedYears = Array.isArray(t("researchYears", null))
      ? t("researchYears", [])
      : [];
    const defaultYears = Object.values(MECH_RESEARCH_DEFAULTS).flatMap((sectionDefaults) =>
      Object.keys(sectionDefaults || {}),
    );
    const savedYears = Object.keys(t("research.patents", defaultMechPatents) || {})
      .concat(Object.keys(t("research.publications", defaultMechPublications) || {}))
      .concat(Object.keys(t("research.copyrights", defaultMechCopyrights) || {}));

    return [...new Set([...storedYears, ...defaultYears, ...savedYears])]
      .filter((value) => /^\d{4}-\d{2}$/.test(String(value || "").trim()))
      .sort((a, b) => Number(String(b).slice(0, 4)) - Number(String(a).slice(0, 4)));
  }

  const persistMechResearchSection = (section, year, items) => {
    const normalize = {
      patents: (entry) => ({
        title: String(entry?.title || "").trim(),
        status: String(entry?.status || "").trim(),
        id: String(entry?.id || "").trim(),
        inventors: String(entry?.inventors || "").trim(),
        link: String(entry?.link || "").trim(),
      }),
      publications: (entry) => ({
        title: String(entry?.title || "").trim(),
        authors: String(entry?.authors || "").trim(),
        journal: String(entry?.journal || "").trim(),
        link: String(entry?.link || "").trim(),
      }),
      copyrights: (entry) => ({
        name: String(entry?.name || "").trim(),
        title: String(entry?.title || "").trim(),
        status: String(entry?.status || "").trim(),
        link: String(entry?.link || "").trim(),
      }),
    }[section];

    const normalizedItems = (Array.isArray(items) ? items : [])
      .map((item) => normalize(item))
      .filter((item) => Object.values(item).some(Boolean));

    updateData(`research.${section}.${year}`, normalizedItems);
    updateData(
      `researchMarkdown.${section}.${year}`,
      MECH_RESEARCH_TO_MARKDOWN[section](normalizedItems, year),
    );
  };

  const handleMechResearchMarkdownSave = (section, markdown) => {
    const parsed = MECH_RESEARCH_FROM_MARKDOWN[section](markdown, researchYear);
    persistMechResearchSection(section, researchYear, parsed.items || []);
  };

  const addMechResearchRowOnTop = (section) => {
    const items = getMechResearchItems(section, researchYear);
    const emptyRows = {
      patents: {
        title: "New patent title",
        status: "Published",
        id: "Add application no.",
        inventors: "Add inventors",
        link: "",
      },
      publications: {
        title: "New paper title",
        authors: "Add authors",
        journal: "Add journal or conference",
        link: "",
      },
      copyrights: {
        name: "Faculty Name",
        title: "New copyright title",
        status: "Published",
        link: "",
      },
    };

    persistMechResearchSection(section, researchYear, [emptyRows[section], ...items]);
  };

  function createEmptyMechResearchMarkdown(section, year) {
    return MECH_RESEARCH_TO_MARKDOWN[section]([], year);
  }

  const getMechInstitutePatents = () =>
    JSON.parse(
      JSON.stringify(
        t("research.institutePatents.items", defaultMechInstitutePatents),
      ),
    );

  const getMechInstitutePatentsMarkdown = () => {
    const storedMarkdown = t("research.institutePatents.markdown", "");
    if (storedMarkdown) return storedMarkdown;
    return mechInstitutePatentsToMarkdown(getMechInstitutePatents());
  };

  const persistMechInstitutePatents = (items) => {
    const normalizedItems = (Array.isArray(items) ? items : [])
      .map((item) => ({
        title: String(item?.title || "").trim(),
        id: String(item?.id || "").trim(),
        filingDate: String(item?.filingDate || "").trim(),
        status: String(item?.status || "").trim(),
      }))
      .filter((item) => Object.values(item).some(Boolean));

    updateData("research.institutePatents.items", normalizedItems);
    updateData(
      "research.institutePatents.markdown",
      mechInstitutePatentsToMarkdown(normalizedItems),
    );
  };

  const addMechInstitutePatentRowOnTop = () => {
    persistMechInstitutePatents([
      {
        title: "New invention title",
        id: "Add application no.",
        filingDate: "Add filing date",
        status: "Add status",
      },
      ...getMechInstitutePatents(),
    ]);
  };

  useEffect(() => {
    if (activeTab === "student-projects") {
      window.scrollTo(0, 0);
      setProjectYear("2024-25");
    }
  }, [activeTab]);

  // Default curriculum items for Scheme & Syllabus
  const DEFAULT_CURRICULUM_BE = [
    { label: "NEP Scheme", link: "#", fileName: null, fileUrl: null },
    { label: "Scheme", link: "#", fileName: null, fileUrl: null },
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
    {
      label:
        "Syllabus - (Universal Human Values and Ethics) Common for all branches in Engg. & Tech. - Sem. IV (NEP)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label:
        "Syllabus - (Modern Indian Language) Common for all branches in Engg. & Tech. - Sem. IV (NEP)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Syllabus Third Year (5th & 6th Sem)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Syllabus Final Year (7th & 8th Sem)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
  ];

  const DEFAULT_CURRICULUM_ME = [
    {
      label: "Scheme and Syllabus M.E. (1st & 2nd Sem)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
  ];

  // Curriculum management functions
  const updateCurriculumItem = (section, index, field, value) => {
    const key = `templateData.curriculum.${section}`;
    const defaults =
      section === "be" ? DEFAULT_CURRICULUM_BE : DEFAULT_CURRICULUM_ME;
    const items = JSON.parse(JSON.stringify(t(key, defaults)));
    items[index] = { ...items[index], [field]: value };
    updateField(key, items);
  };

  const addCurriculumItem = (section) => {
    const key = `templateData.curriculum.${section}`;
    const defaults =
      section === "be" ? DEFAULT_CURRICULUM_BE : DEFAULT_CURRICULUM_ME;
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
          section === "be" ? DEFAULT_CURRICULUM_BE : DEFAULT_CURRICULUM_ME;
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
      section === "be" ? DEFAULT_CURRICULUM_BE : DEFAULT_CURRICULUM_ME;
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
      section === "be" ? DEFAULT_CURRICULUM_BE : DEFAULT_CURRICULUM_ME;
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

  const defaultLaboratories = [
    {
      name: "CSR Funded Robotics and Automation Laboratory",
      image: "",
      resources:
        "Study of components of a real Robot & its DH Parameters, Demonstration of Robot with 2DOF, 3DOF, 4DOF, etc., Study of Positioning and orientation of Robot arm (Study of Robot Kinematics), To Study Robotic Control on Panasonic TM-1400GIII Industrial Robot Arm.",
    },
    {
      name: "Internal Combustion Engine Lab",
      image: "",
      resources:
        "Performance Analysis & Heat Balance sheet of Single Cylinder Diesel Engine, Performance Analysis &Heat Balance sheet of Multi-Cylinder Petrol Engine, Computerized Performance test for Multi cylinder Petrol Engine, Exhaust Gas analysis and Ignition system demo model",
    },
    {
      name: "Dr. Georg H Endress Laboratory",
      image: "",
      resources:
        "Supported under CSR by Endress Hauser Automation (India) Instrumentation Pvt. Ltd. (A CII MZC representing organization) - Pressure Measurement, Temperature Measurement, Flow rate Measurement, Level Measurement.",
    },
    {
      name: "Mechanics of Material Laboratory",
      image: "",
      resources:
        "Computerized Universal Testing Machine (Measuring range of 0-400kN, Least Count: 0.04KN, Piston Movement: 0.1mm), Vickers/Brinell Hardness Test Rig, Impact Testing Machine (30 Kg), Torsion Testing Machine (50 Kg)",
    },
    {
      name: "Fluid Power Laboratory",
      image: "",
      resources:
        "Pelton Turbine, Francis Turbine, Centrifugal Pump, Reciprocating Pump, Bernoulli's Apparatus",
    },
    {
      name: "Computational Fluid Dynamics Center",
      image: "",
      resources:
        "CFD Software- ANSYS-CFX 10.0, IBM Server - 01 No., IBM Client Systems - 04 Nos.",
    },
    {
      name: "Energy Conversion Laboratory",
      image: "",
      resources:
        "Five Gas Analyzer AVL DIGAS 444: To Check the exhaust emissions like NOX, CO2, CO, O2, HC. Blower Test Rig, Single cylinder 4-stroke Diesel Engine with Brake Test Rig, Single cylinder 4-stroke Petrol Engine with Hydraulic Dynamometer Test Rig, Single Cylinder Petrol Engine with Alternator Test Rig",
    },
    {
      name: "Theory of Machine Laboratory",
      image: "",
      resources:
        "Gyroscope, Balancing Apparatus, Whirling Shaft Apparatus, Vibration Analysis set-up, Four channel FFT Analyzer",
    },
    {
      name: "Heat Transfer Laboratory",
      image: "",
      resources:
        "Heat Exchanger, Stephan Boltzmann apparatus, Critical Heat Flux apparatus, Thermal Conductivity of insulating Powder Apparatus",
    },
    {
      name: "Engineering Mechanics lab",
      image: "",
      resources:
        "Universal Force Table, Parallel force Apparatus, Jib Crane, Differential Axle & Wheel, Single Purchase Winch Crab, Double Purchase Winch Crab, Simple Screw Jack, Worm & Worm Wheel apparatus, Moment of Inertia of Flywheel",
    },
    {
      name: "Refrigeration & Air Conditioning Laboratory",
      image: "",
      resources:
        "Vapour Compression Test Rig, Counter Flow Heat Exchanger, Window Air Conditioning Test Rig, Refrigerant Leak Test Rig",
    },
    {
      name: "Drawing Hall",
      image: "",
      resources:
        "Drawing Table, Drawing Board, Software for Engineering Drawing Animated Solutions, Wooden Solid Models, Display Charts, Templates, etc.",
    },
    {
      name: "CAD/CAM Center",
      image: "",
      resources:
        "Hardware: IBM Think Centre A5 Computer Systems - 21 Nos, UPS 7.5KVA with 12 V Batteries, Printer. Software: UG-NX 3, Solid Edge, Autodesk Inventor Series Pro7.0, CATIA V5 R10, ANSYS 8.1, FEMAP, MSC NASTRAN, Witness, GATE Series",
    },
    {
      name: "Production Technology Laboratory",
      image: "",
      resources:
        "Profile Projector, Universal Interferometer, Autocollimator, Vickers/Brinell Hardness Testing Machine",
    },
    {
      name: "Measurement System Laboratory",
      image: "",
      resources:
        "Pneumatic Comparator, Tool Maker's Microscope, Surface Roughness Tester, Flow measurement Using McLeod gauge",
    },
    {
      name: "Engineering Metallurgy Laboratory",
      image: "",
      resources:
        "Vickers/Brinell Hardness Test Rig, Furnace, Metallurgical Microscope with CCTV attachment",
    },
    {
      name: "Mechatronics Laboratory",
      image: "",
      resources:
        "Pneumatic Training Kit, X-Y Table, Conveyor with sensor, Pneumatic rotary indexing",
    },
    {
      name: "Seminar Hall",
      image: "",
      resources:
        "LCD Projector with Computer, SMART cordless electronic note PAD (giving display directly on LCD screen), 32'' Television Set with VCD/ DVD player, 5.1 Channel Surround Sound Home Theater System, Ergonomically designed cushioned deluxe chairs (60 Nos), Fully Air-conditioned",
    },
    {
      name: "Workshop (Mechanical Engineering)",
      image: "",
      resources:
        "Machine Shop, Advanced Welding Shop, Carpentry & Pattern Making Shop, Fitting & Sheet Metal Shop, Smithy & Foundry Shop",
    },
    {
      name: "Experimental Stress Analysis",
      image: "",
      resources:
        "DIFFUSED LIGHT RESEARCH POLARISCOPE, REFLECTION POLARISCOPE, STRESS FREEZING OVEN, STRAIN GAUGE ROSETTE APPARATUS",
    },
    {
      name: "Energy Park",
      image: "",
      resources:
        "Solar PV Pump, Solar Steam Project, Wind Mill, Aero Generator",
    },
    {
      name: "Research Lab / Internet Facility",
      image: "",
      resources:
        "High-speed internet connectivity, Research workstations, Latest software and tools for research",
    },
    {
      name: "Sant Gajanan Tool Room (SGTR)",
      image: "",
      resources:
        "Advanced manufacturing equipment, CNC machines, Tool design and fabrication facilities",
    },
  ];

  const academicsLinks = [
    { id: "overview", label: "Department Overview" },
    { id: "hod", label: "Words from HOD" },
    { id: "vision-mission", label: "Vision, Mission, PEO & PSO" },
    { id: "course-outcomes", label: "Course Outcomes" },
    { id: "curriculum", label: "Scheme and Syllabus" },
    { id: "laboratories", label: "Infrastructure and Laboratories" },
    { id: "pride", label: "Pride of the Department" },
    { id: "placements", label: "Placement Statistics" },
    { id: "activities", label: "Curricular Activities" },
    { id: "newsletter", label: "Newsletter" },
    { id: "achievements", label: "Achievements" },
    { id: "learning-resources", label: "Learning Resources" },
    { id: "nba-resources", label: "NBA Resource Material" },
    { id: "staff", label: "Staff @ Department" },
    { id: "student-projects", label: "UG Projects" },
    { id: "practices", label: "Innovative Practice" },
    { id: "faculty", label: "Faculty Members" },
  ];

  const industryLinks = [
    { id: "visits", label: "Industrial Visits" },
    { id: "mous", label: "MoUs" },
    { id: "patents", label: "Patent & Publication" },
    { id: "internships", label: "Internship and Training" },
  ];

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
                    "The Department of Mechanical Engineering was established in year 1983. The department offers B.E. in Mechanical Engineering and M.E. in Advanced Manufacturing Systems. The department has approved research center for Ph.D.",
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
                    "The department has well qualified, experienced and dedicated faculty members. The department has well equipped laboratories with latest equipment and software. The department organizes various activities like expert lectures, workshops, industrial visits, etc. for holistic development of students.",
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
                <tr className="bg-white">
                  <td
                    colSpan={isEditing ? 3 : 2}
                    className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <EditableText
                        value={t(
                          "templateData.overview.headerBE",
                          "Bachelor of Engineering",
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

                <tr className="bg-white">
                  <td
                    colSpan={isEditing ? 3 : 2}
                    className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <EditableText
                        value={t(
                          "templateData.overview.headerPhD",
                          "Ph. D in Mechanical Engineering",
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
                value={t("hodName", "Dr. S. P. Trikal")}
                onSave={(v) => updateField("hodName", v)}
                placeholder="Click to edit HOD name..."
              />
            </div>
            <div className="text-sm text-gray-500">
              <EditableText
                value={t(
                  "overview.footerDesignation",
                  "Head, Department of Mechanical Engineering",
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

        {/* Bottom Section: PEO, PO, PSO Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50">
            {[
              { id: "peo", label: "Program Educational Objectives" },
              { id: "po", label: "Program Outcomes" },
              { id: "pso", label: "Program Specific Objectives" },
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

            {poTab === "pso" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {t("pso", defaultPso).map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 text-ssgmce-orange text-xl">➤</div>
                    <div className="w-full">
                      <strong className="text-gray-900 block mb-1 text-base">
                        <EditableText
                          value={item.t}
                          onSave={(val) => {
                            const updated = JSON.parse(
                              JSON.stringify(t("pso", defaultPso)),
                            );
                            updated[i].t = val;
                            updateField("pso", updated);
                          }}
                        />
                      </strong>
                      <MarkdownEditor
                        value={item.d}
                        onSave={(val) => {
                          const updated = JSON.parse(
                            JSON.stringify(t("pso", defaultPso)),
                          );
                          updated[i].d = val;
                          updateField("pso", updated);
                        }}
                        placeholder="Click to edit PSO description..."
                        className="w-full"
                      />
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const arr = t("pso", defaultPso).filter(
                            (_, idx) => idx !== i,
                          );
                          updateField("pso", arr);
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
                      updateField("pso", [
                        ...t("pso", defaultPso),
                        {
                          t: "New PSO Title",
                          d: "New program specific outcome description.",
                        },
                      ]);
                    }}
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium"
                  >
                    + Add PSO Item
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

    "course-outcomes": (() => {
      const defaultBeSections = [
        {
          id: "be-sem3",
          label: "B.E. Semester-III",
          content: `### 3ME01 Engineering Mathematics - III

After successfully completing the course, students will be able to:

1. Apply the knowledge linear differential equation to solve problems.
2. Apply Laplace transform to solve differential equation.
3. Apply the concept of Partial differential equation, probability and statistics.
4. Apply the knowledge of complex analysis.
5. Apply the knowledge of Numerical analysis.
6. Apply the knowledge of vector calculus to solve physical problems.

### 3ME02 Manufacturing Processes

After successfully completing the course, students will be able to:

1. Understand the working principles of basic manufacturing processes.
2. Apply the knowledge of casting processes for the specified working conditions.
3. Analyze the various causes of casting defects to provide remedial action.
4. Apply the knowledge of various forming processes for the given operating conditions.
5. Apply the knowledge of basic and advance welding processes for detection and prevention of welding defects.

### 3ME03 Mechanics of Materials

After successfully completing the course, students will be able to:

1. Determine stresses in uniaxial tension and compression conditions.
2. Draw SFD, BMD and calculate bending stresses in beams.
3. Apply torsion theory to shafts and helical springs.
4. Determine stresses in thin, thick cylinders and thin spherical shells.
5. Calculate strain energy and principal stresses given loading conditions.
6. Determine deflection of beams under various loading conditions.

### 3ME04 Engineering Thermodynamics

After successfully completing the course, students will be able to:

1. Illustrate the basic concept of thermodynamics, thermodynamic systems, work and heat
2. Apply first law of thermodynamics to flow processes.
3. Apply first law of thermodynamics to Non-flow processes.
4. Apply second law of thermodynamics and explain concept of entropy.
5. Explain the properties of steam, work done and heat transfer during various thermodynamic processes.
6. Analyze thermodynamic cycles of various thermal systems.

### 3ME05 Fluid Mechanics

After successfully completing the course, students will be able to:

1. Determine the values of various fluid properties at rest and in motion
2. Apply general governing equations for fluid flow problems
3. Apply the concept of Boundary layer theory for internal and external fluid flow
4. Solve numerical based on force exerted by jet on plate by principle of impulse momentum

### 3ME10 Machine Drawing

After successfully completing the course, students will be able to:

1. Demonstrate the techniques of sectioning and visualizing the objects
2. Understand and sketch the missing views
3. Develop surfaces of objects and apply knowledge during their fabrication
4. Understand the concept of intersection of solid objects
5. Apply the conventions for materials and parts used in industries
6. Prepare the assembly and detail drawings of simple machine components`,
        },
        {
          id: "be-sem4",
          label: "B.E. Semester-IV",
          content: `### 4ME01 Material Science

After successfully completing the course, students will be able to:

1. Illustrate the basic concepts of metallurgy and materials classification in details.
2. Illustrate the Iron-Carbon Equilibrium Diagram of metal materials and application of composites
3. Understand different alloying elements and their effects on properties of steels and different types of alloys and their application
4. Classify different types of cast iron, non-ferrous metal and alloys and their use, properties and applications
5. Explain various principles of heat treatment used in metallurgy
6. Explain various heat treatment processes, powder metallurgy and their industrial applications.

### 4ME02 Energy Conversion - I

After successfully completing the course, students will be able to:

1. Explain the different types of boiler and its mounting and accessories.
2. Analyze the performance of boiler and Chimney.
3. Analyze the performance of condensers.
4. Analyze the performance of steam turbines.
5. Classify different types of the nuclear reactor.
6. Illustrate various renewable energy sources for power generations.

### 4ME03 Manufacturing Technology

After successfully completing the course, students will be able to:

1. Apply the concept of mechanics of metal cutting for various machining processes.
2. Analyze the process parameters for given Lathe operations.
3. Apply the knowledge of drilling, boring and broaching process to solve the related problems.
4. Apply the knowledge of milling and gear manufacturing process to solve the related problems.
5. Apply the concept of grinding process for finishing operations.
6. Identify the various unconventional machining processes.

### 4ME04 Basic Electrical Drives and Control

After successfully completing the course, students will be able to:

1. Explain electric drives and power electronics, including motor heating and cooling.
2. Analyze characteristics of DC and special motors like servo, stepper, and brushless DC
3. Evaluate principles and types of AC motors including single and three-phase induction motors.
4. Apply speed control techniques for AC and DC motors using thyristorized methods.
5. Identify and describe sensors and transducers in mechatronic systems.
6. Select suitable electric drives for various industrial applications.

### 4ME05 Hydraulic and Pneumatic Systems

After successfully completing the course, students will be able to:

1. Analyze different turbines for engineering applications
2. Compare the pumping systems and examine their performance characteristics
3. Identify various principles of compressible fluid flow.
4. Classify different types of hydraulic systems`,
        },
        {
          id: "be-sem5",
          label: "B.E. Semester-V",
          content: `### 5ME01 Heat Transfer

After successfully completing the course, students will be able to:

1. Analyze the thermal systems by applying the fundamental concept of conduction, convection and radiation.
2. Apply the laws of radiations to heat transfer systems
3. Evaluate the heat transfer coefficients for forced and free convection.
4. Analyze the performance of heat exchangers

### 5ME02 Metrology and Quality Control

After successfully completing the course, students will be able to:

1. Understand the concept of inspection, quality control and its importance to industry.
2. Demonstrate the skills of controlling various out of control processes using statistical quality control tools.
3. Understand the importance of improving production and productivity using Various Non Destructive Testing approach.
4. Apply the knowledge of various measurement standards and techniques in the industry to measure various parameters related to metrology.

### 5ME03 Kinematics of Machines

After successfully completing the course, students will be able to:

1. Explain the concept of link, kinematic mechanisms, machines, inversions and their applications.
2. Analyze the mechanisms and machines on the basis of velocity and acceleration.
3. Apply the graphical and analytical methods for analysis and synthesis of mechanisms for the input-output coordination.
4. Explain the working principle and applications of different types of brakes, clutches, dynamometers and gear trains.

### 5ME04 Measurement Systems

After successfully completing the course, students will be able to:

1. Identify types, functional elements of Measurement system and types of input to the measurement system.
2. Use the concepts of general performance characteristics for choosing measuring instrument.
3. Demonstrate process of calibration of instruments.
4. Select and use instrument for various physical quantities.

### 5ME05 Industrial Robotics and Applications

After successfully completing the course, students will be able to:

1. Illustrate Robot's anatomy, joints types, wrist construction, robot standard configurations and their work space.
2. Explain the construction and working of different types of End Effectors.
3. Explain various robot drives, robot motion control and its levels.
4. Explain various methods of teaching and programming the robots.
5. Explain principle of working and applications of different types of robot sensors.
6. Identify a particular type of robot depending on the its application in manufacturing.`,
        },
        {
          id: "be-sem6",
          label: "B.E. Semester-VI",
          content: `### 6ME01 Design of Machine Elements

After successfully completing the course, students will be able to:

1. Apply principles and design considerations used in machine design
2. Design different temporary and permanents joints for static loading
3. Design shafts and couplings for various applications for static loading
4. Design bearings for various applications and IC engine parts
5. Utilize design data books in designing various machine elements
6. Generate geometric model/drawings using dimensions of designed machine elements

### 6ME02 Dynamics of Machines

After successfully completing the course, students will be able to:

1. Apply the concept of static force analysis to kinematic mechanisms.
2. Apply the concept of the dynamic force analysis to kinematic mechanisms.
3. Apply the concept of gyroscopic couple and forces on a dynamic body.
4. Apply the basics of longitudinal vibrations and determine the natural frequency of the vibrating system.
5. Apply the basics of transverse vibrations and calculate the natural frequency of the vibrating system.
6. Evaluate the balancing masses and their orientation for balancing of the rotating and reciprocating masses.

### 6ME03 Control System Engineering

After successfully completing the course, students will be able to:

1. Demonstrate the fundamental concepts of automatic Control, mathematical modeling & determination of the transfer function of control systems using various methods
2. Analyze the time response of various systems & determine the Static error coefficients for different input & type of the systems
3. Evaluate the stability of linear systems using various methods.
4. Design and selection of industrial controller and Understanding of automatic speed controllers for Machine tools, Prime Movers and Steam Generator.

### 6ME04 Non-Conventional Energy Sources

After successfully completing the course, students will be able to:

1. Illustrate basic concept of renewable and non-renewable sources
2. Apply the basic concept of solar energy utilization and storage.
3. Illustrate basics working of photovoltaic panel, fuel cell and geothermal energy
4. Apply the concept of energy from ocean
5. Apply the concept of energy from wind.
6. Demonstrate understanding the concept of bio-mass energy resources.

### 6ME04 Lean Manufacturing

After successfully completing the course, students will be able to:

1. Explain the concept and applications of lean manufacturing
2. Interpret different element of lean manufacturing
3. Interpret different tools of lean manufacturing
4. Apply lean manufacturing in real life situation
5. Identify the barriers in implementation of Lean Manufacturing.
6. Explain the concept of Six Sigma

### 6ME08 Computer Aided Design and Simulation

After successfully completing the course, students will be able to:

1. Understand the concept of CAD.
2. Apply knowledge using CAD modeling for component design
3. Apply the knowledge of geometric transformation.
4. Construct the Mechanical & Manufacturing simulation systems`,
        },
        {
          id: "be-sem7",
          label: "B.E. Semester-VII",
          content: `### 7ME01 Mechatronics

After successfully completing the course, students will be able to:

1. Explain the scope and application of mechatronics, various electromechanical devices and components.
2. Explain the concepts of electronics signal data and data conversion.
3. Explain the working and applications of various electronic devices.
4. Illustrate the working of different control components of Hydraulic and Pneumatic Systems.
5. Construct pneumatic circuits used in mechanical line automation for industrial applications.
6. Construct pneumatic circuits used in mechanical line automation for industrial applications.

### 7ME02 Productivity Techniques

After successfully completing the course, students will be able to:

1. Apply project selection methods to evaluate the feasibility of projects.
2. Use appropriate project management practices, tools and methodologies.
3. Analyze and document project requirements, assumptions and constraints.
4. Apply project time and cost estimates to define project baseline, schedule and budget.
5. Organize and manage critical resources for effective project implementation.
6. Analyze risks in implementing project.

### 7ME03 Industrial Management & Costing

After successfully completing the course, students will be able to:

1. Apply the concepts of Management and Finance for industry.
2. Apply the process of Marketing , Promotions and sales to serve the demands of society.
3. Analyze the concepts of estimation, costing and balance sheet for the industry.
4. Plan for managerial and financial activities for the industry.

### 7ME04 Energy Conversion-II

After successfully completing the course, students will be able to:

1. Analyze the performance of reciprocating compressor.
2. Analyze the performance of rotary compressor.
3. Solve the problems based on refrigeration cycles.
4. Explain different air conditioning system and psychrometric process.
5. Solve the problems based on gas turbines.
6. Explain the working of electric and hybrid vehicles.

### 7ME05 Automobile Engineering

After successfully completing the course, students will be able to:

1. Compare the different types of automobiles and their working
2. Analyze the concepts of fuels supply system and cooling system in automobile
3. Identify the need of different electrical systems in conventional automobile and Electrical Vehicles(E.V)
4. Explain the functioning of Transmission, Suspension, lubrication and control systems in Automobile.

### 7ME05 Computational Fluid Dynamics

After successfully completing the course, students will be able to:

1. Solve the governing partial differential equations of fluid flow and heat transfer problems
2. Construct and solve different mathematical models and computational methods for fluid flows
3. Apply the discretization method to solve fluid flow and heat transfer problems
4. Examine a CFD scheme for the respective fluid flow/transport phenomenon problem
5. Apply verification and validation of numerical model
6. Demonstrate the ability to use modern CFD Software tools

### 7ME09 Seminar

After successfully completing the course, students will be able to:

1. Organize seminar content logically to ensure clarity in objectives and coherence in information flow
2. Demonstrate in-depth understanding of the seminar topic by explaining key concepts with clarity and elaboration.
3. Apply effective presentation and communication techniques to engage the audience professionally.
4. Create clear, and visually appealing presentation materials to enhance understanding
5. Analyse and respond to audience queries with logical reasoning and critical thinking.`,
        },
        {
          id: "be-sem8",
          label: "B.E. Semester-VIII",
          content: `### 8ME01 Operation Research Techniques

After successfully completing the course, students will be able to:

1. Apply graphical and simplex methods to solve Linear Programming (LP) problems.
2. Apply Transportation Models and Assignment Models to determine optimal solutions.
3. Analyze PERT and CPM Network Models to assess project timelines and resource efficiency.
4. Solve waiting line and sequencing models to determine optimal solution.
5. Solve Simulation and Dynamic Programming problems for optimal strategies.
6. Apply replacement models for individual and group policies.

### 8ME02 I.C. Engines

After successfully completing the course, students will be able to:

1. Analyze the various performance parameters of IC engines by using principles of thermodynamics.
2. Compare the major fuel groups for IC engines
3. Explain the normal & Abnormal combustion processes in SI and CI engines
4. Identify relevance of environment and emissions from IC engine

### 8ME03 Production Planning & Control

After successfully completing the course, students will be able to:

1. Understand the importance of production planning and control, its functions and advantages.
2. Apply the skills of calculating for sales forecasts using various forecasting methods.
3. Formulate production order and Production Plan for given batch size
4. Explain concept of machine capacity, loading of machines man machine activity charts.
5. Explain concept of inventory control & various cases of inventory system
6. Apply the modern philosophies of management like CIM, JIT, MRP-I and MRP-II.

### 8ME03 Artificial Intelligence

After successfully completing the course, students will be able to:

1. Illustrate the concept of knowledge and knowledge base.
2. Explain the structure and working of an Expert System.
3. Illustrate the methods of knowledge representation.
4. Explain the design pre-requisites and design procedure of expert system
5. Explain the skills of development of expert system for industrial problems.
6. Illustrate the concept of fuzzy logic and fuzzy engineering.

### 8ME04 Refrigeration & Air Conditioning

After successfully completing the course, students will be able to:

1. Analyze the effect of different parameters on performance of Vapour Compressor Refrigeration System (VCR) with different types of refrigerant.
2. Analyze the elementary treatment of multistage pressure system along with fundamental of cryogenics engineering.
3. Explain various components of refrigeration system and applications including leak detection.
4. Apply the use of psychometric chart in the design of air-conditioning systems.
5. Illustrate the details Classification of air conditioning systems & its its applications.
6. Analyze cooling load for different Air Conditioning System

### 8ME04 Robotics & Industrial Applications

After successfully completing the course, students will be able to:

1. Explain the concept of robotics and its applications.
2. Illustrate robot anatomy and various configurations for different industrial applications.
3. Apply the concept of kinematic analysis of robots.
4. Apply the concept robot programming, its methods and programming languages.

### 8ME07 Project

After successfully completing the course, students will be able to:

1. Analyze relevant literature and define a research problem with well-formulated objectives.
2. Plan and execute the project using appropriate methodologies and systematic work distribution.
3. Demonstrate technical proficiency through structured presentations, demonstrations, and effective communication.
4. Interpret and analyze feedback, refine project implementation, and present meaningful results and conclusions.
5. Exhibit professional ethics, teamwork, and project documentation skills through effective report writing and participation in research dissemination activities.`,
        },
      ];

      const defaultMeSections = [
        {
          id: "me-sem1",
          label: "M.E. Semester-I",
          content: `### 1MMD1 Advanced Manufacturing Processes

After successfully completing the course, students will be able to:

1. Understand the mechanics of metal machining processes.
2. Apply the concept of computer numerical control technology.
3. Understand various metal casting processes.
4. Distinguish the various welding processes.
5. Analyze various metal forming processes.
6. Apply various unconventional machining processes.

### 1MMD2 Advanced Machine Design

After successfully completing the course, students will be able to:

1. Apply failure theories to ductile and brittle materials
2. Apply Stress-Life approach
3. Apply Strain-Life approach
4. Apply LEFM approach
5. Apply fatigue from variable amplitude loading and statistical aspects
6. Apply surface failure approach in mechanical design

### 1MMD3 Computer Aided Design and Engineering

After successfully completing the course, students will be able to:

1. Illustrate concept of CAD/ CAM and CIM.
2. Apply knowledge using CAD modeling for component design.
3. Illustrate the fundamentals of finite element analysis
4. Apply FEA techniques to analyze problems in stress on beams, three dimensional frames, heat transfer and fluid flow.

### 1MMD4 Design for Material Handling Equipments

After successfully completing the course, students will be able to:

1. Selection of a proper material handling system
2. Awareness about the specifications of the elements of a material handling system like ropes, chains, pulleys, sheaves etc. for Hoist.
3. Forces involved with in material handling like load lifting, buckets, belts etc.
4. Types of conveyors and the Safety associated with it.
5. Selection of Drives and Grabbing and Arresting Mechanism Attachments for materials handling

### 1MMD5 Lean Manufacturing

After successfully completing the course, students will be able to:

1. Explain the concept, history and applications of lean manufacturing
2. Interpret different elements of Toyota Production System,
3. Interpret different tools of lean production processes
4. Apply cellular systems for production.
5. Apply the concepts of TPM for quality improvement.
6. Apply the concepts of Lean Manufacturing for sustaining improvements`,
        },
        {
          id: "me-sem2",
          label: "M.E. Semester-II",
          content: `### 2MMD1 Advanced Material Technology

After successfully completing the course, students will be able to:

1. Comprehensive understanding of various advanced materials.
2. Understanding the principles and concepts of internal structure of materials.
3. Applying the knowledge of material properties for various applications.
4. Exploring the advanced manufacturing techniques of various metals and non metals.

### 2MMD2 Rapid Prototyping & Tooling

After successfully completing the course, students will be able to:

1. Aware of role of rapid prototyping in product development process
2. To identify various Rapid Prototyping Processes
3. Analyze the principles of Stereo lithography and Laser sintering process
4. Understand various types of Pre-processing, processing, post-processing errors in Rapid prototyping.
5. To Identify the various types of data formats and software's used in Rapid prototyping
6. To Understand the concept of Reverse engineering

### 2MMD3 Mechatronics in System Design

After successfully completing the course, students will be able to:

1. Understand scope and application of mechatronics with various electromechanical devices and components
2. Understand basics of electronic signals, working, applications of electronic devices like microcontroller, PLC etc.
3. Understand role, working of different control components of hydraulic, pneumatic systems and their Applications
4. Make pneumatic circuits commonly used in mechanical line automation and their industrial applications.
5. Make hydraulic circuits commonly used in mechanical line automation and their industrial applications.
6. Analyze and also make simple but complete mechatronics systems.

### 2MMD4 Experimental Stress Analysis

After successfully completing the course, students will be able to:

1. Apply stress optic law using photo elastic bench
2. Use strain measurement methods
3. Use electrical resistance strain gauge
4. Apply Moire Methods
5. Apply brittle coating methods

### 2MMD5 Computer Assisted Production Management

After successfully completing the course, students will be able to:

1. Explain the fundamental knowledge of Computer Aided Process Planning
2. Explain Computer Assisted Quality Control
3. Explain Capacity Planning
4. Explain the Just in Time and Computer Aided Inventory Control.`,
        },
      ];

      const beSections = t("courseOutcomes.beSections", defaultBeSections);
      const meSections = t("courseOutcomes.meSections", defaultMeSections);

      const updateBeSections = (updated) =>
        updateField("courseOutcomes.beSections", updated);
      const updateMeSections = (updated) =>
        updateField("courseOutcomes.meSections", updated);

      const insertSection = (sections, afterIdx, onUpdate) => {
        const newSec = {
          id: `custom-${Date.now()}`,
          label: "New Semester",
          content: "",
        };
        const updated = [...sections];
        updated.splice(afterIdx + 1, 0, newSec);
        onUpdate(updated);
      };

      const removeSection = (sections, idx, onUpdate) => {
        onUpdate(sections.filter((_, i) => i !== idx));
      };

      const renderSectionList = (sections, onUpdate) => (
        <div className="p-6 space-y-1">
          {isEditing && (
            <button
              onClick={() => insertSection(sections, -1, onUpdate)}
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
                          onUpdate(updated);
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
                            removeSection(sections, idx, onUpdate);
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
                            updated[idx] = { ...updated[idx], content: val };
                            onUpdate(updated);
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
                  onClick={() => insertSection(sections, idx, onUpdate)}
                  className="w-full py-1 border-2 border-dashed border-green-300 text-green-600 hover:border-green-500 hover:bg-green-50 rounded-lg text-xs font-medium transition-colors"
                >
                  + Insert After
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      );

      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Course Outcomes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive course outcomes for all semesters of B.E. Mechanical
              Engineering and M.E. Advanced Manufacturing &amp; Mechanical
              Systems Design
            </p>
          </div>

          {/* B.E. Course Outcomes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#003366] px-6 py-4 text-center">
              <h3 className="text-xl font-bold text-white">
                B.E. Mechanical Engineering - Course Outcomes
              </h3>
            </div>
            {renderSectionList(beSections, updateBeSections)}
            {isEditing && (
              <div className="px-6 pb-4">
                <button
                  onClick={() =>
                    insertSection(
                      beSections,
                      beSections.length - 1,
                      updateBeSections,
                    )
                  }
                  className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  + Add New B.E. Semester
                </button>
              </div>
            )}
          </div>

          {/* M.E. Course Outcomes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#003366] px-6 py-4 text-center">
              <h3 className="text-xl font-bold text-white">
                M.E. Advanced Manufacturing &amp; Mechanical Systems Design -
                Course Outcomes
              </h3>
            </div>
            {renderSectionList(meSections, updateMeSections)}
            {isEditing && (
              <div className="px-6 pb-4">
                <button
                  onClick={() =>
                    insertSection(
                      meSections,
                      meSections.length - 1,
                      updateMeSections,
                    )
                  }
                  className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  + Add New M.E. Semester
                </button>
              </div>
            )}
          </div>
        </div>
      );
    })(),
    curriculum: (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
            Scheme and Syllabus
          </h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* B.E. Section */}
          <div className="grid md:grid-cols-12 border-b border-gray-200">
            <div className="md:col-span-4 bg-gray-50/50 p-6 flex items-center border-r border-gray-100">
              <div className="flex items-center gap-3 w-full">
                <h4 className="font-bold text-lg text-gray-800">
                  B.E. (Mechanical Engineering)
                </h4>
              </div>
            </div>
            <div className="md:col-span-8 p-6">
              {isEditing && (
                <div className="flex gap-2 mb-4 justify-end">
                  {selectedCurriculumItems.filter((k) => k.startsWith("be-"))
                    .length > 0 && (
                    <button
                      onClick={() => deleteSelectedCurriculumItems("be")}
                      className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-semibold"
                    >
                      <FaTrash /> Delete Selected (
                      {
                        selectedCurriculumItems.filter((k) =>
                          k.startsWith("be-"),
                        ).length
                      }
                      )
                    </button>
                  )}
                  <button
                    onClick={() => addCurriculumItem("be")}
                    className="flex items-center gap-2 px-3 py-1.5 bg-ssgmce-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold"
                  >
                    <FaPlus /> Add Item
                  </button>
                </div>
              )}
              <ul className="space-y-4">
                {t("templateData.curriculum.be", DEFAULT_CURRICULUM_BE).map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      {isEditing && (
                        <input
                          type="checkbox"
                          checked={selectedCurriculumItems.includes(`be-${i}`)}
                          onChange={() => toggleCurriculumSelection("be", i)}
                          className="mt-2 w-4 h-4 rounded border-gray-300"
                        />
                      )}
                      <span className="w-2 h-2 rounded-full bg-ssgmce-orange mt-2 block group-hover:bg-ssgmce-blue transition-colors"></span>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-2">
                        <span className="text-gray-700 text-sm font-medium flex-1">
                          <EditableText
                            value={item.label}
                            onSave={(val) =>
                              updateCurriculumItem("be", i, "label", val)
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
                                      "be",
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
                                    handleCurriculumFileChange("be", i, e)
                                  }
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  id={`file-upload-be-${i}`}
                                />
                                <label
                                  htmlFor={`file-upload-be-${i}`}
                                  className={`flex items-center gap-1 px-2 py-1 text-xs rounded cursor-pointer transition-colors ${
                                    uploadingFiles[`be-${i}`]
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
                                  {uploadingFiles[`be-${i}`] ? (
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
                                onClick={() => removeCurriculumItem("be", i)}
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

          {/* M.E. Section */}
          <div className="grid md:grid-cols-12 bg-gray-50/30">
            <div className="md:col-span-4 bg-gray-50/50 p-6 flex items-center border-r border-gray-100">
              <div className="flex items-center gap-3 w-full">
                <h4 className="font-bold text-lg text-gray-800">
                  M.E. (Advanced Manufacturing & Mechanical Systems Design)
                </h4>
              </div>
            </div>
            <div className="md:col-span-8 p-6">
              {isEditing && (
                <div className="flex gap-2 mb-4 justify-end">
                  {selectedCurriculumItems.filter((k) => k.startsWith("me-"))
                    .length > 0 && (
                    <button
                      onClick={() => deleteSelectedCurriculumItems("me")}
                      className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-semibold"
                    >
                      <FaTrash /> Delete Selected (
                      {
                        selectedCurriculumItems.filter((k) =>
                          k.startsWith("me-"),
                        ).length
                      }
                      )
                    </button>
                  )}
                  <button
                    onClick={() => addCurriculumItem("me")}
                    className="flex items-center gap-2 px-3 py-1.5 bg-ssgmce-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold"
                  >
                    <FaPlus /> Add Item
                  </button>
                </div>
              )}
              <ul className="space-y-4">
                {t("templateData.curriculum.me", DEFAULT_CURRICULUM_ME).map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      {isEditing && (
                        <input
                          type="checkbox"
                          checked={selectedCurriculumItems.includes(`me-${i}`)}
                          onChange={() => toggleCurriculumSelection("me", i)}
                          className="mt-2 w-4 h-4 rounded border-gray-300"
                        />
                      )}
                      <span className="w-2 h-2 rounded-full bg-ssgmce-orange mt-2 block group-hover:bg-ssgmce-blue transition-colors"></span>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-2">
                        <span className="text-gray-700 text-sm font-medium flex-1">
                          <EditableText
                            value={item.label}
                            onSave={(val) =>
                              updateCurriculumItem("me", i, "label", val)
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
                                      "me",
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
                                    handleCurriculumFileChange("me", i, e)
                                  }
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  id={`file-upload-me-${i}`}
                                />
                                <label
                                  htmlFor={`file-upload-me-${i}`}
                                  className={`flex items-center gap-1 px-2 py-1 text-xs rounded cursor-pointer transition-colors ${
                                    uploadingFiles[`me-${i}`]
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
                                  {uploadingFiles[`me-${i}`] ? (
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
                                onClick={() => removeCurriculumItem("me", i)}
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

    laboratories: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
          Infrastructure and Laboratories
        </h3>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Lab Entries */}
          {t("laboratories", defaultLaboratories).map((lab, index) => (
            <div
              key={index}
              className="grid md:grid-cols-12 border-b border-gray-200 last:border-b-0 relative"
            >
              {/* Delete Button */}
              {isEditing && (
                <button
                  onClick={() => {
                    const updated = t(
                      "laboratories",
                      defaultLaboratories,
                    ).filter((_, i) => i !== index);
                    updateField("laboratories", updated);
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
                  onSave={(url) => {
                    const updated = [...t("laboratories", defaultLaboratories)];
                    updated[index].image = url;
                    updateField("laboratories", updated);
                  }}
                  className="aspect-video w-full object-cover rounded-lg"
                  placeholder="Click to add image"
                />
                <h4 className="font-bold text-gray-800 text-center mt-4">
                  <EditableText
                    value={lab.name}
                    onSave={(val) => {
                      const updated = [
                        ...t("laboratories", defaultLaboratories),
                      ];
                      updated[index].name = val;
                      updateField("laboratories", updated);
                    }}
                  />
                </h4>
              </div>

              {/* Lab Details Column */}
              <div className="md:col-span-7 p-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-red-600 text-sm mb-2">
                      Lab Resources / Facilities:
                    </h5>
                    {isEditing ? (
                      <MarkdownEditor
                        value={lab.resources}
                        onSave={(val) => {
                          const updated = [
                            ...t("laboratories", defaultLaboratories),
                          ];
                          updated[index].resources = val;
                          updateField("laboratories", updated);
                        }}
                      />
                    ) : (
                      <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {lab.resources}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Lab Button */}
          {isEditing && (
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => {
                  const updated = [
                    ...t("laboratories", defaultLaboratories),
                    {
                      name: "New Laboratory",
                      image: "",
                      resources: "Equipment and facilities details...",
                    },
                  ];
                  updateField("laboratories", updated);
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
              onClick={() => setPrideTab("gate")}
              className={`px-6 py-3 font-semibold transition-colors ${
                prideTab === "gate"
                  ? "border-b-4 border-ssgmce-orange text-ssgmce-blue"
                  : "text-gray-600 hover:text-ssgmce-blue"
              }`}
            >
              GATE Qualified
            </button>
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

          {/* GATE Qualified Students */}
          {prideTab === "gate" &&
            (() => {
              const md = t(
                "pride.gateMarkdown",
                mechPrideGateToMarkdown(t("pride.gate", defaultPrideGate)),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.gateMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/mechanical_gate_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <MechPrideMdView markdown={md} />
              );
            })()}
          {/* University Toppers */}
          {prideTab === "toppers" &&
            (() => {
              const md = t(
                "pride.toppersMarkdown",
                mechPrideToppersToMarkdown({
                  be: t("pride.toppers.be", defaultPrideToppersBE),
                }),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.toppersMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/mechanical_toppers_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <MechPrideMdView markdown={md} />
              );
            })()}

          {/* Top Alumni */}
          {prideTab === "alumni" &&
            (() => {
              const md = t(
                "pride.alumniMarkdown",
                mechPrideAlumniToMarkdown(
                  t("pride.alumni", defaultPrideAlumni),
                  t("pride.alumniTitle", "Top Alumnis of Department"),
                ),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.alumniMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/mechanical_alumni_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <MechPrideMdView markdown={md} />
              );
            })()}
        </motion.div>
      </div>
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
                        Academic Year
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
                    alt="Dr. S. P. Trikal - HOD Mechanical"
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                <EditableText
                  value={t("hod.name", "Dr. S. P. Trikal")}
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
                  value={t("hod.departmentTitle", "Mechanical Engineering")}
                  onSave={(v) => updateField("hod.departmentTitle", v)}
                  placeholder="Click to edit department title..."
                />
              </p>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaEnvelope className="mr-2 text-ssgmce-orange" />
                  <span>
                    <EditableText
                      value={t("hod.email", "hod_mech@ssgmce.ac.in")}
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
                    value={t("hod.badge2", "Manufacturing")}
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
                  "Dear Friends,\n\nThe Mechanical Engineering Department at SSGMCE Shegaon is one of the most reputed departments in terms of facility, faculty, students, and activities. It continues to lead and expand its activities in various directions. The Department is known for the Expertise and State-of-the-art facilities especially in CAD-CAM, Computational Fluid Dynamics (CFD), Manufacturing and Production Technology, Energy Conversion, Computerized I. C. Engines, Mechatronics, Dr. Georg H Endress Lab and also in other core areas. Experimental and computational facilities are being continuously upgraded. Industry interaction has been increased with industrial visits and arranging expert lectures by industry personnel and carrying out the industry sponsored projects for students.\n\nThe students actively involve in various reputed contests of national and international repute like ROBOCON, Tech Fest, and technical competitions in various colleges and also credited number of Winner titles to the department. We have various students chapters like SAE, IEEE, IEI Chapter and ISTE Students' chapters guided by faculty mentors for the overall development of the students.\n\nThe department does conduct guiding sessions and mock tests for students for exams like GATE, GRE etc. The department has been providing an excellent placement to students. The placement cell also facilitates the students for getting training in industries. Good number of Short Term training Programmes (STTP), Workshops and Seminars are also organized for teachers for sharing and updating the technical knowledge.\n\n*Wishing you all a successful and fulfilling academic journey ahead.*",
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
                    value={t("hod.name", "Dr. S. P. Trikal")}
                    onSave={(v) => updateField("hod.name", v)}
                    placeholder="Click to edit HOD name..."
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <EditableText
                    value={t(
                      "hod.role",
                      "Head, Department of Mechanical Engineering",
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
                      src={getLocalMechanicalActivityImageUrl(activity.image)}
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
                  src={getLocalMechanicalActivityImageUrl(
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

        {/* Student Chapters & Clubs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#003366] to-ssgmce-dark-blue px-6 py-4">
            <h4 className="text-xl font-bold text-white">
              Student Chapters & Technical Clubs
            </h4>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: "SAE India",
                  icon: "🏎️",
                  desc: "Society of Automotive Engineers",
                },
                {
                  name: "ISTE Chapter",
                  icon: "🔧",
                  desc: "Indian Society for Technical Education",
                },
                {
                  name: "IEI Chapter",
                  icon: "⚙️",
                  desc: "Institution of Engineers India",
                },
                {
                  name: "IEEE Chapter",
                  icon: "⚡",
                  desc: "Institute of Electrical and Electronics Engineers",
                },
              ].map((club, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="text-3xl mb-2">{club.icon}</div>
                  <h5 className="font-bold text-gray-900 text-sm mb-1">
                    {club.name}
                  </h5>
                  <p className="text-xs text-gray-600">{club.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
            <h2 className="text-3xl font-bold text-gray-900">Achievements</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
            <p className="text-gray-600 mt-3">
              Department of Mechanical Engineering
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
                Department of Mechanical Engineering
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
                            "Newsletter 2025-26 (Autumn)"
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

    "learning-resources": (
      <div className="space-y-8">
        {/* Learning Resources Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-50 text-ssgmce-orange rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm">
            <FaChalkboardTeacher />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            <EditableText
              value={t("learningResources.title", "Learning Resources")}
              onSave={(val) => updateData("learningResources.title", val)}
            />
          </h3>
          <div className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            <EditableText
              value={t(
                "learningResources.description",
                "Access comprehensive learning resources, lecture notes, assignments, and study materials for all semesters.",
              )}
              onSave={(val) => updateData("learningResources.description", val)}
              multiline
            />
          </div>
        </div>

        {/* Learning Resources Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-wide">
                Learning Resources
              </h3>
              <p className="text-sm text-orange-100 mt-1">
                Department of Mechanical Engineering
              </p>
            </div>
            <div className="flex items-center gap-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={addLearningResource}
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
              {learningResourceItems.length > 0 ? (
                learningResourceItems.map((material, i) => (
                  <div
                    key={i}
                    ref={
                      i === learningResourceItems.length - 1
                        ? latestLearningResourceRef
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
                                  updateLearningResource(i, "title", val)
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
                              Syllabus Link
                            </label>
                            <textarea
                              value={material.syllabusLink || ""}
                              onChange={(event) =>
                                updateLearningResource(
                                  i,
                                  "syllabusLink",
                                  event.target.value,
                                )
                              }
                              rows={3}
                              placeholder="Paste the syllabus link here..."
                              className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
                              Resource Link
                            </label>
                            <textarea
                              value={material.resourceLink || ""}
                              onChange={(event) =>
                                updateLearningResource(
                                  i,
                                  "resourceLink",
                                  event.target.value,
                                )
                              }
                              rows={3}
                              placeholder="Paste the shared resource link here..."
                              className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteLearningResource(i)}
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
                    <th className="px-6 py-4 font-bold text-center">Syllabus</th>
                    <th className="px-6 py-4 font-bold text-center">
                      Access Materials
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {learningResourceItems.map((material, i) => (
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
                          href={material.syllabusLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-xs border border-gray-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all"
                        >
                          <FaDownload className="text-xs" /> Syllabus
                        </a>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <a
                          href={material.resourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-ssgmce-orange hover:text-orange-700 font-medium text-xs border border-gray-200 hover:border-orange-400 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-full transition-all"
                        >
                          <FaDownload className="text-xs" /> Access Resources
                        </a>
                      </td>
                    </tr>
                  ))}
                  {learningResourceItems.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
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
            Click on "Access Resources" to view and download learning materials
            from the respective year's shared folder.
          </div>
        </motion.div>
      </div>
    ),

    "nba-resources": (
      <div className="space-y-8">
        {/* NBA Resource Material Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-50 text-ssgmce-orange rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm">
            <FaAward />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            <EditableText
              value={t("nbaResources.title", "NBA Resource Material")}
              onSave={(val) => updateData("nbaResources.title", val)}
            />
          </h3>
          <div className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            <EditableText
              value={t(
                "nbaResources.description",
                "Access NBA accreditation resources, documentation, and informational videos for the Mechanical Engineering department.",
              )}
              onSave={(val) => updateData("nbaResources.description", val)}
              multiline
            />
          </div>
        </div>

        {/* Google Drive Link Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl shadow-md border border-orange-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-ssgmce-orange text-xl">
              <FaFileAlt />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">
                <EditableText
                  value={t(
                    "nbaResources.cardTitle",
                    "NBA Department Details",
                  )}
                  onSave={(val) => updateData("nbaResources.cardTitle", val)}
                />
              </h4>
              <p className="text-sm text-gray-500 mt-0.5">
                <EditableText
                  value={t(
                    "nbaResources.cardDescription",
                    "Complete NBA accreditation documentation and resources",
                  )}
                  onSave={(val) =>
                    updateData("nbaResources.cardDescription", val)
                  }
                  multiline
                />
              </p>
            </div>
          </div>
          <a
            href={t("nbaResources.driveLink", defaultNBAResources.driveLink)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ssgmce-orange hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <FaExternalLinkAlt className="text-sm" />
            <EditableText
              value={t(
                "nbaResources.driveLinkText",
                defaultNBAResources.driveLinkText,
              )}
              onSave={(val) => updateData("nbaResources.driveLinkText", val)}
            />
          </a>
        </motion.div>

        {isEditing && (
          <div className="bg-white border border-orange-200 rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h5 className="text-base font-bold text-gray-800">
                  Replace Top Section Link
                </h5>
                <p className="text-sm text-gray-500">
                  Paste the new NBA details URL for the top button.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateData(
                    "nbaResources.driveLink",
                    nbaDriveLinkDraft.trim() ||
                      defaultNBAResources.driveLink,
                  )
                }
                className="inline-flex items-center gap-2 bg-ssgmce-orange hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <FaExternalLinkAlt className="text-xs" />
                Replace Link
              </button>
            </div>
            <input
              type="url"
              value={nbaDriveLinkDraft}
              onChange={(e) => setNbaDriveLinkDraft(e.target.value)}
              placeholder="Paste Google Drive or other top-section URL"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue focus:border-transparent text-sm"
            />
          </div>
        )}

        {/* NBA Videos Grid */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
            <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-ssgmce-orange rounded-full"></span>
              NBA Resource Videos
            </h4>
            {isEditing && (
              <button
                type="button"
                onClick={addMechNbaVideo}
                className="inline-flex items-center gap-2 bg-ssgmce-blue hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <FaPlus className="text-xs" />
                Add YT Link
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getMechNbaVideos().map(
              (video, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video">
                    {video.embedUrl ? (
                      <iframe
                        src={video.embedUrl}
                        title={video.title || `NBA Video ${i + 1}`}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-center px-6">
                        <p className="text-sm text-gray-500">
                          Add a YouTube link to show the video here.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 space-y-3">
                    <p className="text-sm font-medium text-gray-600">
                      <EditableText
                        value={video.title || `NBA Resource Video ${i + 1}`}
                        onSave={(val) =>
                          updateMechNbaVideo(i, { title: val })
                        }
                      />
                    </p>
                    {isEditing && (
                      <div className="space-y-3">
                        <input
                          type="url"
                          value={nbaVideoLinkDrafts[i] || ""}
                          onChange={(e) =>
                            setNbaVideoLinkDrafts((prev) => ({
                              ...prev,
                              [i]: e.target.value,
                            }))
                          }
                          placeholder="Paste YouTube watch/share/embed link"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue focus:border-transparent text-sm"
                        />
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={() =>
                              updateMechNbaVideo(i, {
                                sourceUrl: (nbaVideoLinkDrafts[i] || "").trim(),
                                embedUrl: normalizeMechYoutubeEmbedUrl(
                                  nbaVideoLinkDrafts[i] || "",
                                ),
                              })
                            }
                            className="inline-flex items-center gap-2 bg-ssgmce-orange hover:bg-orange-700 text-white font-semibold px-3 py-2 rounded-lg transition-colors text-sm"
                          >
                            <FaExternalLinkAlt className="text-xs" />
                            Update YT Link
                          </button>
                          <button
                            type="button"
                            onClick={() => removeMechNbaVideo(i)}
                            className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold px-3 py-2 rounded-lg transition-colors text-sm"
                          >
                            <FaTrash className="text-xs" />
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </div>
    ),

    faculty: (
      <div className="space-y-10">
        <div className="text-center border-b border-gray-200 pb-6 mb-8">
          <h3 className="text-3xl font-bold text-gray-900">Our Faculty</h3>
          <p className="text-gray-500 mt-2">
            Department of Mechanical Engineering
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {t("templateData.faculty", MECH_DEFAULT_FACULTY).map((fac, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex ${
                isEditing && expandedFacultyEditorIndex === i ? "lg:col-span-2" : ""
              }`}
            >
              <div className="w-32 sm:w-40 bg-gray-50 flex-shrink-0 relative flex items-center justify-center border-r border-gray-100">
                {fac.photo ? (
                  <EditableImage
                    src={fac.photo}
                    onSave={(val) => updateFacultyMember(i, "photo", val)}
                    alt={fac.name || "Faculty"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserTie className="text-5xl text-gray-300 transition-transform group-hover:scale-110 duration-500" />
                )}
              </div>

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
                    value={fac.role}
                    onSave={(val) => updateFacultyMember(i, "role", val)}
                  />
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  {fac.area && (
                    <p className="line-clamp-2 text-xs">
                      <span className="font-bold text-gray-700">Area: </span>
                      <EditableText
                        value={
                          Array.isArray(fac.area)
                            ? fac.area.join(", ")
                            : fac.area
                        }
                        onSave={(val) =>
                          updateFacultyMember(
                            i,
                            "area",
                            val
                              .split(",")
                              .map((item) => item.trim())
                              .filter(Boolean),
                          )
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
          {isEditing && (
            <button
              type="button"
              onClick={() =>
                updateField("templateData.faculty", [
                  ...t("templateData.faculty", MECH_DEFAULT_FACULTY),
                  {
                    id: `new-faculty-${Date.now()}`,
                    name: "New Faculty Member",
                    role: "Assistant Professor",
                    area: ["Research Area"],
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
                    department: "mechanical",
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

    staff: (() => {
      const departmentStaff = getStaffGroup(
        "templateData.staff.department",
        MECH_DEFAULT_DEPARTMENT_STAFF,
      );
      const workshopStaff = getStaffGroup(
        "templateData.staff.workshop",
        MECH_DEFAULT_WORKSHOP_STAFF,
      );

      const renderStaffGroup = (
        items,
        path,
        fallback,
        headingDefault,
        emptyRoleDefault,
      ) => (
        <div>
          <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-1 bg-gray-800 rounded-full mr-3"></span>
            <EditableText
              value={t(`${path}Title`, headingDefault)}
              onSave={(val) => updateField(`${path}Title`, val)}
            />
          </h4>
          <div className="grid gap-6 lg:grid-cols-2">
            {items.map((staff, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex relative"
              >
                {isEditing && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStaffGroup(path, fallback, (list) =>
                        list.filter((_, idx) => idx !== i),
                      )
                    }
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md transition-colors z-10"
                    title="Remove staff member"
                  >
                    Remove
                  </button>
                )}

                <div className="w-32 sm:w-40 bg-gray-50 flex-shrink-0 relative flex items-center justify-center border-r border-gray-100">
                  {staff.photo ? (
                    <EditableImage
                      src={staff.photo}
                      onSave={(val) =>
                        updateStaffGroup(path, fallback, (list) => {
                          list[i] = { ...list[i], photo: val };
                          return list;
                        })
                      }
                      alt={staff.name || "Staff"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserTie className="text-5xl text-gray-300 transition-transform group-hover:scale-110 duration-500" />
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-ssgmce-blue transition-colors">
                    <EditableText
                      value={staff.name}
                      onSave={(val) =>
                        updateStaffGroup(path, fallback, (list) => {
                          list[i] = { ...list[i], name: val };
                          return list;
                        })
                      }
                    />
                  </h4>
                  <p className="text-ssgmce-blue font-medium text-sm mb-3 uppercase tracking-wide text-[11px]">
                    <EditableText
                      value={staff.role}
                      onSave={(val) =>
                        updateStaffGroup(path, fallback, (list) => {
                          list[i] = { ...list[i], role: val };
                          return list;
                        })
                      }
                    />
                  </p>
                </div>
              </motion.div>
            ))}
            {isEditing && (
              <button
                type="button"
                onClick={() =>
                  updateStaffGroup(path, fallback, (list) => [
                    ...list,
                    {
                      name: "New Staff Member",
                      role: emptyRoleDefault,
                      photo: "",
                    },
                  ])
                }
                className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
              >
                <FaPlus className="text-xs" />
                Add Staff
              </button>
            )}
          </div>
        </div>
      );

      return (
      <div className="space-y-10">
        <div className="text-center border-b border-gray-200 pb-6 mb-8">
          <h3 className="text-3xl font-bold text-gray-900">
            <EditableText
              value={t("templateData.staff.title", "Staff @ Department")}
              onSave={(val) => updateField("templateData.staff.title", val)}
            />
          </h3>
          <p className="text-gray-500 mt-2">
            <EditableText
              value={t(
                "templateData.staff.subtitle",
                "Department of Mechanical Engineering",
              )}
              onSave={(val) => updateField("templateData.staff.subtitle", val)}
            />
          </p>
        </div>

        {renderStaffGroup(
          departmentStaff,
          "templateData.staff.department",
          MECH_DEFAULT_DEPARTMENT_STAFF,
          "Department Staff",
          "Lab Assistant",
        )}

        {renderStaffGroup(
          workshopStaff,
          "templateData.staff.workshop",
          MECH_DEFAULT_WORKSHOP_STAFF,
          "Workshop Staff",
          "Lab Assistant",
        )}
      </div>
    );
    })(),

    "student-projects": (() => {
      const md = t(
        "studentProjects.markdown",
        mechStudentProjectsToMarkdown(defaultMechStudentProjects),
      );
      return (
        <div className="space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              UG Student Projects
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
            <p className="text-gray-600 mt-3">
              Final Year Projects by Our Students
            </p>
          </div>
          {isEditing ? (
            <MarkdownEditor
              value={md}
              onSave={(v) => updateData("studentProjects.markdown", v)}
              showDocImport
              docTemplateUrl="/uploads/documents/pride_templates/mech_projects_template.docx"
              docTemplateLabel="Download Projects Template"
              placeholder="Student projects tables by year (GFM Markdown)..."
            />
          ) : (
            <MechPrideMdView markdown={md} />
          )}
        </div>
      );
    })(),

    mous: (
      <div className="space-y-8">
        {(() => {
          const mous = getMechMous();
          const mousMarkdown = getMechMousMarkdown(mous);
          return (
            <>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">MoUs</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Strategic partnerships with industry leaders and academic
                  institutions to enhance learning outcomes and provide students with
                  real-world exposure.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-ssgmce-blue text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold whitespace-nowrap">Sr. No.</th>
                        <th className="px-6 py-4 text-left font-bold">Name of the Organization</th>
                        <th className="px-6 py-4 text-left font-bold whitespace-nowrap">MOU Signing Date</th>
                        <th className="px-6 py-4 text-left font-bold whitespace-nowrap">MOU Copy / Report</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mous.map((mou, idx) => (
                        <tr key={mou.id || idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{idx + 1}.</td>
                          <td className="px-6 py-4 text-gray-700">{mou.org}</td>
                          <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{mou.date}</td>
                          <td className="px-6 py-4">
                            {mou.report ? (
                              <a href={mou.report} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-ssgmce-blue hover:text-ssgmce-orange font-semibold text-sm transition-colors">
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
                          <h4 className="text-lg font-bold text-gray-800">Edit MoUs in Markdown</h4>
                          <p className="text-sm text-gray-500 mt-1">Serial numbers are automatic now. Add a new blank row on top, then edit only the actual MoU details.</p>
                        </div>
                        <button type="button" onClick={addMechMouRowOnTop} className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange">
                          <FaPlus className="text-xs" />
                          Add New Row On Top
                        </button>
                      </div>
                    </div>
                    <MarkdownEditor value={mousMarkdown} onSave={handleMechMousMarkdownSave} placeholder="MoUs table without serial-number column (GFM Markdown)..." />
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-gray-800">Upload MoU PDF / Report</h4>
                      <p className="text-sm text-gray-500 mt-1">Upload the PDF only for the row you want to attach a document to.</p>
                    </div>
                    <div className="space-y-3">
                      {mous.map((mou, idx) => {
                        const uploadKey = `mech-mou-${mou.id}`;
                        return (
                          <div key={mou.id || idx} className="rounded-lg border border-gray-200 p-4">
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{idx + 1}. {mou.org || "MoU"}</p>
                                <p className="text-xs text-gray-500">{mou.date || "Signing date not set"}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                {mou.report ? (
                                  <a href={mou.report} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-ssgmce-blue hover:text-ssgmce-orange">
                                    <FaFileAlt className="text-xs" />
                                    Current Document
                                  </a>
                                ) : (
                                  <span className="text-xs text-gray-400">No document uploaded</span>
                                )}
                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-ssgmce-blue px-3 py-2 text-xs font-semibold text-white hover:bg-ssgmce-dark-blue">
                                  <FaUpload className="text-xs" />
                                  {mouReportUploading[uploadKey] ? "Uploading..." : "Upload PDF"}
                                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" disabled={mouReportUploading[uploadKey]} onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) uploadMechMouReport(mou.id, file);
                                    e.target.value = "";
                                  }} />
                                </label>
                              </div>
                            </div>
                            {mouReportErrors[uploadKey] ? <p className="mt-2 text-xs text-red-600">{mouReportErrors[uploadKey]}</p> : null}
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
    practices: (
      <div className="space-y-8">
        <div className="max-w-3xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            Innovative Practice
          </h3>
        </div>

        {/* Innovative Practice Editor/View */}
        {(() => {
          // Get markdown if it exists, otherwise generate from default practices
          const storedMarkdown =
            t("templateData.innovativePractices.markdown", null) ||
            t("innovativePractices.markdown", null);
          const storedPractices =
            t("templateData.innovativePractices.items", null) ||
            t("innovativePractices", null);
          const defaultPractices = Array.isArray(storedPractices)
            ? storedPractices
            : defaultInnovativePractices;
          const md =
            storedMarkdown || mechInnovativePracticesToMarkdown(defaultPractices);

          // Prefer saved CMS data and only fall back to bundled defaults
          // when neither markdown nor stored structured data is available.
          const parsedPractices = mechMarkdownToInnovativePractices(md);
          const practices =
            parsedPractices && parsedPractices.length > 0
              ? parsedPractices
              : defaultPractices;
          
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isEditing ? (
                <>
                  <div className="mb-4 flex justify-end">
                    <button
                      onClick={() => {
                        const nextPractices = [
                          {
                            sn: "01",
                            faculty: "Add faculty name",
                            subject: "Add subject",
                            practice: "Add innovative practice",
                            link: "",
                          },
                          ...practices,
                        ].map((item, index) => ({
                          ...item,
                          sn: String(index + 1).padStart(2, "0"),
                        }));
                        const nextMarkdown =
                          mechInnovativePracticesToMarkdown(nextPractices);
                        updateData(
                          "templateData.innovativePractices.markdown",
                          nextMarkdown,
                        );
                        updateData(
                          "templateData.innovativePractices.items",
                          nextPractices,
                        );
                        updateData("innovativePractices.markdown", nextMarkdown);
                        updateData("innovativePractices", nextPractices);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                    >
                      <FaPlus className="text-xs" />
                      Add to Top
                    </button>
                  </div>
                  <MarkdownEditor
                    value={md}
                    onSave={(v) => {
                      const parsed = mechMarkdownToInnovativePractices(v);
                      updateData("templateData.innovativePractices.markdown", v);
                      updateData("templateData.innovativePractices.items", parsed);
                      updateData("innovativePractices.markdown", v);
                      updateData("innovativePractices", parsed);
                    }}
                    showDocImport
                    docTemplateUrl="/uploads/documents/innovative_practice_templates/mechanical_template.docx"
                    docTemplateLabel="Download Template"
                    placeholder="Innovative Practices table (GFM Markdown)..."
                  />
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead
                        style={{ backgroundColor: "#003366" }}
                        className="text-white"
                      >
                        <tr>
                          <th className="px-6 py-4 text-center font-semibold whitespace-nowrap text-sm">
                            S.N.
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-sm">
                            Name of The Faculty
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-sm">
                            Subject
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-sm">
                            Innovative Practice
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-sm">
                            Link
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {practices.map((item, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-center font-medium text-gray-900">
                              {item.sn}
                            </td>
                            <td
                              className="px-6 py-4 text-center whitespace-nowrap"
                              style={{ color: "#003366" }}
                            >
                              <span className="font-medium">{item.faculty}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              {item.subject}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              {item.practice}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {item.link && (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                >
                                  <FaExternalLinkAlt className="text-xs" />
                                  Link
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })()}
      </div>
    ),

    visits: (() => {
      const industrialVisitPhotos = getMechIndustrialVisitGallery();
      const industrialVisitTable = getMechIndustrialVisits();
      const industrialVisitsMarkdown = getMechIndustrialVisitsMarkdown(
        industrialVisitTable,
      );

      return (
        <div className="space-y-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              Industrial Visits
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hands-on exposure to industry practices, technologies, and work
              culture through structured visits to leading manufacturing and
              engineering organizations.
            </p>
          </div>

          {/* Photo Gallery Section */}
          <div className="space-y-6">
            {!isEditing && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <FaImages className="text-2xl text-ssgmce-blue" />
                  <h4 className="text-xl font-bold text-gray-800">Visit Gallery</h4>
                  <span className="text-sm font-medium text-ssgmce-blue bg-blue-50 px-3 py-1 rounded-full">
                    {industrialVisitPhotos.length} Photos
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {industrialVisitPhotos.map((photo, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4 }}
                      className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setIvLightbox(idx)}
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                        <img
                          src={photo.image}
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <FaSearchPlus className="absolute top-3 right-3 text-white text-lg drop-shadow" />
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                          {photo.caption}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-red-400" />
                            {photo.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-blue-400" />
                            {photo.date}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {isEditing && (
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h5 className="text-lg font-bold text-gray-800">
                      Manage Visit Gallery
                    </h5>
                    <p className="text-sm text-gray-500 mt-1">
                      Add new visit photos and update the caption, location, and date for each gallery item.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addMechIndustrialVisitPhoto}
                    className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                  >
                    <FaPlus className="text-xs" />
                    Add Photo
                  </button>
                </div>

                <div className="space-y-4">
                  {industrialVisitPhotos.map((photo, idx) => {
                    const uploadKey = `mech-gallery-${idx}`;
                    return (
                      <div
                        key={`gallery-editor-${idx}`}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row">
                          <div className="w-full lg:w-56 space-y-3">
                            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-white border border-gray-200">
                              {photo.image ? (
                                <img
                                  src={photo.image}
                                  alt={photo.caption || `Visit photo ${idx + 1}`}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                  No image selected
                                </div>
                              )}
                            </div>
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#003366] to-[#004d99] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:from-[#004d99] hover:to-[#0066cc] hover:shadow-lg">
                              <FaUpload className="text-yellow-300" />
                              {industrialVisitGalleryUploading[uploadKey]
                                ? "Uploading..."
                                : "Upload Photo"}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={industrialVisitGalleryUploading[uploadKey]}
                                onChange={(event) => {
                                  const file = event.target.files?.[0];
                                  event.target.value = "";
                                  if (file) uploadMechIndustrialVisitPhoto(idx, file);
                                }}
                              />
                            </label>
                            {industrialVisitGalleryErrors[uploadKey] && (
                              <p className="text-xs text-red-500">
                                {industrialVisitGalleryErrors[uploadKey]}
                              </p>
                            )}
                          </div>

                          <div className="flex-1 space-y-3">
                            <div>
                              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
                                Caption
                              </label>
                              <textarea
                                value={photo.caption || ""}
                                onChange={(event) =>
                                  updateMechIndustrialVisitPhoto(
                                    idx,
                                    "caption",
                                    event.target.value,
                                  )
                                }
                                rows={3}
                                className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                              />
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                              <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
                                  Location
                                </label>
                                <input
                                  type="text"
                                  value={photo.location || ""}
                                  onChange={(event) =>
                                    updateMechIndustrialVisitPhoto(
                                      idx,
                                      "location",
                                      event.target.value,
                                    )
                                  }
                                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                              </div>
                              <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
                                  Date
                                </label>
                                <input
                                  type="text"
                                  value={photo.date || ""}
                                  onChange={(event) =>
                                    updateMechIndustrialVisitPhoto(
                                      idx,
                                      "date",
                                      event.target.value,
                                    )
                                  }
                                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex lg:w-32 lg:justify-end">
                            <button
                              type="button"
                              onClick={() => deleteMechIndustrialVisitPhoto(idx)}
                              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                            >
                              <FaTrash className="text-xs" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {!isEditing && ivLightbox !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
                onClick={() => setIvLightbox(null)}
              >
                <button
                  className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl z-10"
                  onClick={() => setIvLightbox(null)}
                >
                  <FaTimes />
                </button>

                {/* Previous */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 flex items-center justify-center transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIvLightbox((prev) =>
                      prev === 0 ? industrialVisitPhotos.length - 1 : prev - 1,
                    );
                  }}
                >
                  <FaChevronLeft />
                </button>

                {/* Image */}
                <motion.div
                  key={ivLightbox}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="max-w-5xl max-h-[85vh] flex flex-col items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={industrialVisitPhotos[ivLightbox].image}
                    alt={industrialVisitPhotos[ivLightbox].caption}
                    className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
                  />
                  <div className="mt-4 text-center max-w-2xl">
                    <p className="text-white/90 text-sm leading-relaxed">
                      {industrialVisitPhotos[ivLightbox].caption}
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-2 text-white/60 text-xs">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-red-400" />
                        {industrialVisitPhotos[ivLightbox].location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-blue-400" />
                        {industrialVisitPhotos[ivLightbox].date}
                      </span>
                      <span className="text-white/40">
                        {ivLightbox + 1} / {industrialVisitPhotos.length}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Next */}
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 flex items-center justify-center transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIvLightbox((prev) =>
                      prev === industrialVisitPhotos.length - 1 ? 0 : prev + 1,
                    );
                  }}
                >
                  <FaChevronRight />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <FaIndustry className="text-2xl text-ssgmce-blue" />
              <h4 className="text-xl font-bold text-gray-800">Visit Details</h4>
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
                        Name of Industry Visited
                      </th>
                      <th className="px-6 py-4 text-left font-bold">Class</th>
                      <th className="px-6 py-4 text-left font-bold whitespace-nowrap">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left font-bold whitespace-nowrap">
                        No of Students
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {industrialVisitTable.map((visit, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {String(idx + 1).padStart(2, "0")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {(visit.industries || []).map((ind, i) => (
                              <div key={i} className="text-gray-700">
                                {ind}
                              </div>
                            ))}
                            {visit.report ? (
                              <a
                                href={visit.report}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-ssgmce-blue hover:text-ssgmce-orange font-semibold text-xs mt-2"
                              >
                                <FaFileAlt className="text-xs" />
                                Detailed Report
                              </a>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {visit.class}
                        </td>
                        <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                          {visit.date}
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-center font-medium">
                          {visit.students}
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
                          Edit Industrial Visits in Markdown
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Serial numbers are automatic now. Add a new blank row on top, then edit only the actual visit details.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={addMechIndustrialVisitRowOnTop}
                        className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                      >
                        <FaPlus className="text-xs" />
                        Add New Row On Top
                      </button>
                    </div>
                  </div>
                  <MarkdownEditor
                    value={industrialVisitsMarkdown}
                    onSave={handleMechIndustrialVisitsMarkdownSave}
                    placeholder="Industrial visits table without serial-number column (GFM Markdown)..."
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
                    {industrialVisitTable.map((visit, idx) => {
                      const uploadKey = `mech-industrial-visit-${visit.id}`;
                      return (
                        <div
                          key={visit.id || idx}
                          className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800">
                              {idx + 1}. {(visit.industries || []).join(", ")}
                            </p>
                            <p className="text-xs text-gray-500">
                              {visit.class} | {visit.date}
                            </p>
                            {visit.report ? (
                              <a
                                href={visit.report}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-ssgmce-blue underline underline-offset-2"
                              >
                                <FaFileAlt className="text-xs" />
                                View uploaded report
                              </a>
                            ) : (
                              <p className="mt-2 text-xs text-gray-400">
                                No report uploaded
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-start gap-2 md:items-end">
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#003366] to-[#004d99] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:from-[#004d99] hover:to-[#0066cc] hover:shadow-lg">
                              <FaUpload className="text-yellow-300" />
                              {industrialVisitReportUploading[uploadKey]
                                ? "Uploading..."
                                : "Upload Report"}
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png"
                                className="hidden"
                                disabled={industrialVisitReportUploading[uploadKey]}
                                onChange={(event) => {
                                  const file = event.target.files?.[0];
                                  event.target.value = "";
                                  if (file) {
                                    uploadMechIndustrialVisitReport(visit.id, file);
                                  }
                                }}
                              />
                            </label>
                            {industrialVisitReportErrors[uploadKey] && (
                              <span className="text-right text-[11px] text-red-500">
                                {industrialVisitReportErrors[uploadKey]}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    })(),
    patents: (
      <div className="space-y-8">
        <div className="flex flex-wrap space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
          {["patents", "publications", "copyrights"].map((tab) => (
            <button
              key={tab}
              onClick={() => setResearchTab(tab)}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-all capitalize ${researchTab === tab ? "bg-white text-ssgmce-blue shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab === "copyrights"
                ? "Copyrights"
                : tab === "patents"
                  ? "Patents"
                  : "Publications"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {researchTab === "patents" ? (
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
                  <EditableText
                    value={t("patentsTitle", "Patents Granted & Published")}
                    onSave={(val) => updateData("patentsTitle", val)}
                  />
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                    {researchYears.map((year) => (
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
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewResearchYear("");
                        setResearchYearError("");
                        setShowAddResearchYear(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-ssgmce-dark-blue transition-colors"
                    >
                      <FaPlus />
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
                        {selectedResearchItems.map((pat, i) => (
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
                                className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${pat.status === "Given" || pat.status === "Granted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                              >
                                {pat.status === "Given" ? "Granted" : pat.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs text-gray-500 whitespace-nowrap text-right">
                              {pat.link ? (
                                <a
                                  href={pat.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-ssgmce-blue hover:text-ssgmce-dark-blue underline"
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {isEditing && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-gray-800">
                        Edit Patents Table in Markdown
                      </h4>
                      <p className="text-sm text-gray-500">
                        Add patent links in the last column to make application numbers clickable.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addMechResearchRowOnTop("patents")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ssgmce-blue text-white font-semibold hover:bg-ssgmce-dark-blue transition-colors"
                    >
                      <FaPlus />
                      Add New Row On Top
                    </button>
                  </div>
                  <MarkdownEditor
                    value={selectedResearchMarkdown}
                    onSave={(value) => handleMechResearchMarkdownSave("patents", value)}
                    placeholder="Edit patents table in markdown..."
                    showDocImport
                    docTemplateUrl={MECH_RESEARCH_TEMPLATE_URLS.patents}
                  />
                </div>
              )}

              {/* Institute-Level Patents */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FaLightbulb className="text-orange-500 mr-2" />
                  Institute-Level Patent Applications
                </h4>
                {isEditing ? (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="text-base font-bold text-gray-800">
                          Edit Institute-Level Patents in Markdown
                        </h4>
                        <p className="text-sm text-gray-500">
                          This section uses only a markdown table in admin while keeping the public table layout unchanged.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={addMechInstitutePatentRowOnTop}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ssgmce-blue text-white font-semibold hover:bg-ssgmce-dark-blue transition-colors"
                      >
                        <FaPlus />
                        Add New Row On Top
                      </button>
                    </div>
                    <MarkdownEditor
                      value={getMechInstitutePatentsMarkdown()}
                      onSave={(value) =>
                        persistMechInstitutePatents(
                          parseMechInstitutePatentsMarkdown(value),
                        )
                      }
                      placeholder="Edit institute-level patents table in markdown..."
                      showDocImport
                      docTemplateUrl={MECH_RESEARCH_TEMPLATE_URLS.institutePatents}
                    />
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
                              Title of Invention
                            </th>
                            <th className="px-6 py-4 font-black tracking-wider text-right">
                              Application No. / Patent No.
                            </th>
                            <th className="px-6 py-4 font-black tracking-wider text-right">
                              Date of Filing
                            </th>
                            <th className="px-6 py-4 font-black tracking-wider text-right">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {getMechInstitutePatents().map((pat, i) => (
                            <tr
                              key={i}
                              className="hover:bg-green-50/30 transition-colors group"
                            >
                              <td className="px-6 py-4 text-center font-mono text-xs text-gray-400 group-hover:text-green-600">
                                {i + 1}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-800">
                                {pat.title}
                              </td>
                              <td className="px-6 py-4 font-mono text-xs text-gray-500 whitespace-nowrap text-right">
                                {pat.id}
                              </td>
                              <td className="px-6 py-4 text-xs text-gray-500 text-right">
                                {pat.filingDate}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${String(pat.status || "").toLowerCase().includes("granted") ? "bg-green-100 text-green-700" : String(pat.status || "").toLowerCase().includes("published") ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}
                                >
                                  {pat.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : researchTab === "publications" ? (
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
                  <EditableText
                    value={t("publicationsTitle", "Research Publications")}
                    onSave={(val) => updateData("publicationsTitle", val)}
                  />
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="mr-4 flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                    {researchYears.map((year) => (
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
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewResearchYear("");
                        setResearchYearError("");
                        setShowAddResearchYear(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-ssgmce-dark-blue transition-colors"
                    >
                      <FaPlus />
                      Add Session
                    </button>
                  )}
                </div>
              </div>

              {/* Detail Report PDF Link */}
              <div className="flex items-center gap-3 mb-2">
                <a
                  href={`/uploads/documents/mech_publications/MECH_publication_${researchYear}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-ssgmce-blue font-bold rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-sm"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  View Full Detail Report PDF ({researchYear})
                </a>
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
                            Journal/Conference
                          </th>
                          <th className="px-6 py-4 font-black tracking-wider text-right">
                            Link
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedResearchItems.map((pub, i) => (
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
                                <div className="flex flex-col items-end gap-1">
                                  <a
                                    href={pub.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-ssgmce-blue hover:text-ssgmce-dark-blue font-bold px-3 py-1 bg-blue-50 rounded-lg transition-colors border border-blue-100"
                                  >
                                    View{" "}
                                    <FaExternalLinkAlt className="ml-2 text-[10px]" />
                                  </a>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-xs">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {isEditing && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-gray-800">
                        Edit Publications Table in Markdown
                      </h4>
                      <p className="text-sm text-gray-500">
                        Add publication URLs in the last column to keep the public View button working.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addMechResearchRowOnTop("publications")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ssgmce-blue text-white font-semibold hover:bg-ssgmce-dark-blue transition-colors"
                    >
                      <FaPlus />
                      Add New Row On Top
                    </button>
                  </div>
                  <MarkdownEditor
                    value={selectedResearchMarkdown}
                    onSave={(value) => handleMechResearchMarkdownSave("publications", value)}
                    placeholder="Edit publications table in markdown..."
                    showDocImport
                    docTemplateUrl={MECH_RESEARCH_TEMPLATE_URLS.publications}
                  />
                </div>
              )}
            </motion.div>
          ) : researchTab === "copyrights" ? (
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
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                    {researchYears.map((year) => (
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
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewResearchYear("");
                        setResearchYearError("");
                        setShowAddResearchYear(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-ssgmce-dark-blue transition-colors"
                    >
                      <FaPlus />
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
                        {selectedResearchItems.map((cr, i) => (
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
                                    className="text-ssgmce-blue hover:text-ssgmce-dark-blue underline"
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
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {isEditing && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-gray-800">
                        Edit Copyrights Table in Markdown
                      </h4>
                      <p className="text-sm text-gray-500">
                        Add optional links in the last column if a copyright entry should open a document or page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addMechResearchRowOnTop("copyrights")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ssgmce-blue text-white font-semibold hover:bg-ssgmce-dark-blue transition-colors"
                    >
                      <FaPlus />
                      Add New Row On Top
                    </button>
                  </div>
                  <MarkdownEditor
                    value={selectedResearchMarkdown}
                    onSave={(value) => handleMechResearchMarkdownSave("copyrights", value)}
                    placeholder="Edit copyrights table in markdown..."
                    showDocImport
                    docTemplateUrl={MECH_RESEARCH_TEMPLATE_URLS.copyrights}
                  />
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    ),

    internships: (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-3">
            <EditableText
              value={t("internshipsTitle", "Internship and Training Record")}
              onSave={(val) => updateField("internshipsTitle", val)}
            />
          </h3>
          <div className="text-gray-600 max-w-2xl mx-auto">
            <EditableText
              value={t(
                "internshipsSubtitle",
                "Comprehensive internship and industrial training records providing students with hands-on industry experience and professional development.",
              )}
              onSave={(val) => updateField("internshipsSubtitle", val)}
              multiline
            />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex bg-gray-100 rounded-lg p-1 shadow-sm">
              {internshipYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setInternshipYear(year)}
                  className={`px-6 py-2 text-sm font-bold rounded-md transition-all ${
                    internshipYear === year
                      ? "bg-white text-ssgmce-blue shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Session: {year}
                </button>
              ))}
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setNewInternshipYear("");
                  setInternshipYearError("");
                  setShowAddInternshipYear(true);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-ssgmce-blue to-blue-700 px-4 py-2 text-xs font-semibold text-white transition-all hover:shadow-lg"
              >
                <FaPlus className="text-xs" />
                Add Session
              </button>
            )}
          </div>
        </div>

        {!isEditing && (
          <>
            <div className="flex justify-center mb-4">
              <a
                href={
                  internshipYear === "2023-24"
                    ? "/uploads/documents/mech_internships/Mech_Internship_2023-24.pdf"
                    : "/uploads/documents/mech_internships/Mech_Internship_2022-23.pdf"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ssgmce-blue text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium text-sm"
              >
                <FaDownload className="text-sm" />
                Download Detail Report ({internshipYear})
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-ssgmce-blue text-white">
                    <tr>
                      <th className="px-3 py-4 text-left font-bold whitespace-nowrap">
                        Sr. No.
                      </th>
                      <th className="px-3 py-4 text-left font-bold whitespace-nowrap">
                        SIS ID
                      </th>
                      <th className="px-3 py-4 text-left font-bold">
                        Name of Student
                      </th>
                      <th className="px-3 py-4 text-left font-bold">
                        Name of Company
                      </th>
                      <th className="px-3 py-4 text-left font-bold">Class</th>
                      <th className="px-3 py-4 text-left font-bold whitespace-nowrap">
                        Start Date
                      </th>
                      <th className="px-3 py-4 text-left font-bold whitespace-nowrap">
                        End Date
                      </th>
                      <th className="px-3 py-4 text-left font-bold whitespace-nowrap">
                        Paid (Y/N)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentInternships.map((intern, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-3 font-medium text-gray-900">
                          {idx + 1}
                        </td>
                        <td className="px-3 py-3 text-gray-700">{intern.sis}</td>
                        <td className="px-3 py-3 text-gray-700">{intern.name}</td>
                        <td className="px-3 py-3 text-gray-700 text-xs">
                          {intern.org}
                        </td>
                        <td className="px-3 py-3 text-gray-700 text-center whitespace-nowrap">
                          {intern.class}
                        </td>
                        <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                          {intern.startDate}
                        </td>
                        <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                          {intern.endDate}
                        </td>
                        <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                          {intern.paid}
                        </td>
                      </tr>
                    ))}
                    {currentInternships.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-6 py-12 text-center text-gray-400"
                        >
                          No internship records added for {internshipYear} yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
              Total Records: {currentInternships.length} students
            </div>
          </>
        )}

        {isEditing && (
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <h4 className="text-lg font-bold text-gray-800">
                  Edit {internshipYear} in Markdown
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Import a DOCX or edit this session in markdown. Saving here
                  updates the Internship and Training table without changing the
                  public layout.
                </p>
              </div>
              <MarkdownEditor
                key={internshipYear}
                value={selectedInternshipsMarkdown}
                onSave={handleInternshipsMarkdownSave}
                showDocImport
                docTemplateUrl="/uploads/documents/pride_templates/mechanical_internships_template.docx"
                docTemplateLabel="Download Internship Template"
                placeholder={`Internship records for ${internshipYear} (GFM Markdown)...`}
              />
            </div>
          </div>
        )}

        <AnimatePresence>
          {showAddInternshipYear && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddInternshipYear(false)}
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
                    <FaPlus className="text-ssgmce-blue" /> Add Internship
                    Session
                  </h3>
                  <button
                    onClick={() => {
                      setInternshipYearError("");
                      setShowAddInternshipYear(false);
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
                      value={newInternshipYear}
                      onChange={(e) => {
                        setNewInternshipYear(e.target.value);
                        if (internshipYearError) setInternshipYearError("");
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the academic year in format YYYY-YY.
                    </p>
                    {internshipYearError ? (
                      <p className="text-xs text-red-600 mt-2">
                        {internshipYearError}
                      </p>
                    ) : null}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> After adding the session, you will
                      get an empty markdown editor with the same Internship and
                      Training table structure, plus DOCX import and template
                      download support for that session.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setInternshipYearError("");
                      setShowAddInternshipYear(false);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddInternshipYear}
                    disabled={!newInternshipYear.trim()}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaPlus /> Add Session
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
          {showAddResearchYear && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
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
                    <FaPlus className="text-ssgmce-blue" /> Add Research Session
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
                        if (researchYearError) setResearchYearError("");
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the academic year in format YYYY-YY (e.g., 2025-26)
                    </p>
                    {researchYearError ? (
                      <p className="text-xs text-red-600 mt-2">
                        {researchYearError}
                      </p>
                    ) : null}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This will create a new empty year for Mechanical patents, publications, and copyrights with markdown, DOCX import, and template download support.
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
    ),
  };

  const renderContent = () => {
    const activeLabel =
      academicsLinks.find((l) => l.id === activeTab)?.label ||
      industryLinks.find((l) => l.id === activeTab)?.label;

    return (
      content[activeTab] || (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="w-24 h-24 bg-blue-50 text-ssgmce-orange rounded-full flex items-center justify-center mb-6 relative">
            <FaLaptopCode className="text-4xl relative z-10" />
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
          </div>

          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Coming Soon
          </span>

          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {activeLabel}
          </h3>

          <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            We are currently crafting this section to provide you with
            comprehensive insights. This content is in the pipeline and will be
            available shortly.
          </p>

          <button
            onClick={() => setActiveTab("overview")}
            className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-sm shadow-lg shadow-gray-200"
          >
            Back to Overview
          </button>
        </div>
      )
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
          className={`w-2 h-2 rounded-full mr-3 transition- all duration-300 ${activeTab === id ? "bg-white shadow-md" : "bg-gray-400 group-hover:bg-ssgmce-orange group-hover:shadow-sm"}`}
        ></span>
        {label}
      </span>
      {activeTab === id && <FaAngleRight className="opacity-90 text-white" />}
    </button>
  );

  return (
    <GenericPage
      title="Mechanical Engineering"
      backgroundImage={mechanicalBanner}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:gap-12">
        <div className="lg:w-1/4 order-1 lg:order-1">
          <div className="space-y-4 pb-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2 lg:space-y-6 lg:pb-4 scrollbar-thin scrollbar-thumb-ssgmce-blue scrollbar-track-gray-100">
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
          {showAddResearchYear && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
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
                    <FaPlus className="text-ssgmce-blue" /> Add Research Session
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
                        if (researchYearError) setResearchYearError("");
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the academic year in format YYYY-YY (e.g., 2025-26)
                    </p>
                    {researchYearError ? (
                      <p className="text-xs text-red-600 mt-2">
                        {researchYearError}
                      </p>
                    ) : null}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This will create a new empty year for Mechanical patents, publications, and copyrights with markdown, DOCX import, and template download support.
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

const MECHANICAL_ACTIVITY_REMOTE_IMAGE_PREFIX =
  "https://www.ssgmce.ac.in/images/mech_faculty/";

const getLocalMechanicalActivityImageUrl = (imageUrl = "") => {
  const normalizedUrl = String(imageUrl || "").trim();
  if (!normalizedUrl) return "";

  if (
    normalizedUrl
      .toLowerCase()
      .startsWith(MECHANICAL_ACTIVITY_REMOTE_IMAGE_PREFIX.toLowerCase())
  ) {
    const fileName = normalizedUrl.split("/").pop()?.split("?")[0] || "";
    return fileName
      ? `/uploads/images/mechanical/activities/${fileName}`
      : normalizedUrl;
  }

  return normalizedUrl;
};

const normalizeMechanicalActivity = (activity = {}) => ({
  title: String(activity.title || "").trim(),
  date: String(activity.date || "").trim(),
  participants: String(activity.participants || "").trim(),
  organizer: String(activity.organizer || "").trim(),
  resource: String(activity.resource || "").trim(),
  image: getLocalMechanicalActivityImageUrl(activity.image),
});

const defaultMechanicalActivityCards =
  defaultActivities.map(normalizeMechanicalActivity);

const formatMechanicalActivityMarkdownField = (
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

const mechanicalActivitiesToMarkdown = (activities = []) =>
  activities
    .map((activity) => normalizeMechanicalActivity(activity))
    .filter((activity) => activity.title)
    .map((activity) =>
      [
        `## ${activity.title}`,
        formatMechanicalActivityMarkdownField("Date", activity.date, true),
        formatMechanicalActivityMarkdownField(
          "Participants",
          activity.participants,
          true,
        ),
        formatMechanicalActivityMarkdownField(
          "Organized by",
          activity.organizer,
          true,
        ),
        formatMechanicalActivityMarkdownField(
          "Resource Person",
          activity.resource,
          true,
        ),
        formatMechanicalActivityMarkdownField("Image", activity.image, true),
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

const parseMechanicalActivitiesMarkdown = (markdown = "") => {
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

      return normalizeMechanicalActivity({
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

export default Mechanical;
