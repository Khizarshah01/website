import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import GenericPage from "../../components/GenericPage";
import { useDepartmentData } from "../../hooks/useDepartmentData";
import EditableText from "../../components/admin/EditableText";
import EditableImage from "../../components/admin/EditableImage";
import MarkdownEditor from "../../components/admin/MarkdownEditor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import electronicsBanner from "../../assets/images/departments/electronics/Electronics Banner.png";
import { AnimatePresence, motion } from "framer-motion";
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
  FaDesktop,
  FaFileAlt,
  FaExternalLinkAlt,
  FaTools,
  FaBook,
  FaStar,
  FaMedal,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
  FaTimes,
  FaPlus,
  FaTrash,
  FaUpload,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Faculty Photos
import DN from "../../assets/images/departments/electronics/faculty/DN.jpg";
import KBK from "../../assets/images/departments/electronics/faculty/KBK.jpg";
import RSD from "../../assets/images/departments/electronics/faculty/RSD.jpg";
import MNT from "../../assets/images/departments/electronics/faculty/MNT.jpg";
import SBP from "../../assets/images/departments/electronics/faculty/SBP.jpg";
import VMU from "../../assets/images/departments/electronics/faculty/VMU.jpg";
import DLB from "../../assets/images/departments/electronics/faculty/DLB.jpg";
import BPH from "../../assets/images/departments/electronics/faculty/BPH.jpg";
import DPT from "../../assets/images/departments/electronics/faculty/DPT.jpg";
import AND from "../../assets/images/departments/electronics/faculty/AND.jpg";
import VKB from "../../assets/images/departments/electronics/faculty/VKB.jpg";
import KTK from "../../assets/images/departments/electronics/faculty/KTK.jpg";
import KSV from "../../assets/images/departments/electronics/faculty/KSV.jpg";
import SPB from "../../assets/images/departments/electronics/faculty/SPB.jpg";
import TPM from "../../assets/images/departments/electronics/faculty/TPM.jpg";
import SGN from "../../assets/images/departments/electronics/faculty/SGN.jpg";
import VSI from "../../assets/images/departments/electronics/faculty/VSI.jpg";
import AAD from "../../assets/images/departments/electronics/faculty/AAD.jpg";
import HBP from "../../assets/images/departments/electronics/faculty/HBP.jpeg";
import RSM from "../../assets/images/departments/electronics/faculty/RSM.jpeg";
import NSD from "../../assets/images/departments/electronics/faculty/NSD.jpeg";
import MBD from "../../assets/images/departments/electronics/faculty/MBD.jpeg";
import SPS from "../../assets/images/departments/electronics/faculty/SPS.jpeg";
import GK from "../../assets/images/departments/electronics/faculty/GK.jpeg";

// Non-Teaching Staff Photos
import VGP from "../../assets/images/departments/electronics/faculty/V.G.Payghan.png";
import MYK from "../../assets/images/departments/electronics/faculty/M.Y. Kashikar.jpg";
import SAA from "../../assets/images/departments/electronics/faculty/S.A.Ahmad.jpg";
import ASA from "../../assets/images/departments/electronics/faculty/A.S.Akotkar.jpg";
import SBS from "../../assets/images/departments/electronics/faculty/S.B.Sonawane.jpg";
import JSK from "../../assets/images/departments/electronics/faculty/JSKolhe.jpg";
import KKT from "../../assets/images/departments/electronics/faculty/K.K.Thakur.jpg";
import GOT from "../../assets/images/departments/electronics/faculty/G.O.Tayade.jpg";
import ALN from "../../assets/images/departments/electronics/faculty/A.L.Nemade.jpg";
import SAR from "../../assets/images/departments/electronics/faculty/A.S. Raut.jpg";
import PBB from "../../assets/images/departments/electronics/faculty/P.B.Bule.jpg";
import KRK from "../../assets/images/departments/electronics/faculty/kr_khatri.jpg";
import DBB from "../../assets/images/departments/electronics/faculty/Suresh Barbdhe.jpeg";
import MUS from "../../assets/images/departments/electronics/faculty/Mohan Sable.png";

import hodPhoto from "../../assets/images/departments/electronics/EXTC_HOD.jpg";

import {
  defaultVision,
  defaultMission,
  defaultPeo,
  defaultPso,
  defaultPo,
  defaultHodMessage,
  defaultLabs,
  defaultPrideToppersBE,
  defaultPrideToppersME,
  defaultPrideAlumni,
  defaultPrideGate,
  entcPrideGateToMarkdown,
  entcPrideToppersToMarkdown,
  entcPrideAlumniToMarkdown,
  entcStudentProjectsToMarkdown,
  defaultActivities,
  defaultStudentProjects,
  defaultFaculty,
  defaultStaff,
  defaultAchievements,
  defaultCourseMaterials,
  defaultInnovativePractices,
  entcInnovativePracticesToMarkdown,
  entcMarkdownToInnovativePractices,
  defaultPlacements,
  defaultOverview,
  defaultNewsletters,
  defaultDepartmentalCommittee,
  defaultServicesExtended,
  defaultUgProjects,
  defaultSchemeAndSyllabus,
  defaultEntcPatents,
  defaultEntcPublications,
  defaultEntcConferences,
  defaultEntcBooks,
  defaultEntcCopyrights,
  defaultInternships,
  defaultMagazines,
} from "../../data/entcDefaults";

// ---- EnTC Pride Markdown helpers ----
function entcParsePrideSections(markdown = "") {
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

const entcPrideTableComponents = {
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

function EntcPrideMdView({ markdown = "" }) {
  const sections = entcParsePrideSections(markdown);
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
              components={entcPrideTableComponents}
            >
              {sec.body}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
// ---- End EnTC Pride Markdown helpers ----

const defaultEntcIndustrialVisits = [
  {
    sn: "01",
    industries: [
      "NSTI Ramanthapur, Hyderabad",
      "ISRO NRSC Outreach Facility, Hyderabad",
      "Wonderla Solar & Water Purification Plant, Hyderabad",
    ],
    report:
      "/uploads/documents/entc/industrial-visits/entc_iv_2025_26_nsti_hyderabad.pdf",
    class: "3U1 & 3U2 (Third Year)",
    date: "18/01/2026 to 26/01/2026",
    students: "91",
  },
  {
    sn: "02",
    industries: [
      "GMRT, Khodad, Pune",
      "Wireless Police Training Centre, Pashan, Pune",
      "BSNL ZTTC (RTTC), Chinchwad, Pune",
    ],
    report:
      "/uploads/documents/entc/industrial-visits/entc_iv_2024_25_pune.pdf",
    class: "4U1 & 4U2 (Final Year)",
    date: "28/02/2025 to 04/03/2025",
    students: "72",
  },
  {
    sn: "03",
    industries: [
      "NSTI Ramanthapur, Hyderabad",
      "ISRO NRSC Outreach Facility, Hyderabad",
      "Wonderla Solar & Water Purification Plant, Hyderabad",
    ],
    report:
      "/uploads/documents/entc/industrial-visits/entc_iv_2024_25_isro.pdf",
    class: "3U1 & 3U2 (Third Year)",
    date: "27/02/2025 to 04/03/2025",
    students: "90",
  },
  {
    sn: "04",
    industries: [
      "NSTI Ramanthapur, Hyderabad",
      "ISRO NRSC Outreach Facility, Hyderabad",
      "Wonderla Solar & Water Purification Plant, Hyderabad",
    ],
    report:
      "/uploads/documents/entc/industrial-visits/entc_iv_2023_24_hyderabad.pdf",
    class: "3U1 & 3U2 (Third Year)",
    date: "25/02/2024 to 04/03/2024",
    students: "108",
  },
  {
    sn: "05",
    industries: ["S A Electronics, Pune", "Vigyan Ashram, Pabal, Pune"],
    report: "/uploads/documents/entc/industrial-visits/entc_iv_2019_20.pdf",
    class: "4U1 & 4U2 (Final Year)",
    date: "02/03/2020 to 06/03/2020",
    students: "49",
  },
  {
    sn: "06",
    industries: [
      "Police Wireless Training Center, Pashan, Pune",
      "Renu Electronics, Baner Road, Pune",
    ],
    report: "/uploads/documents/entc/industrial-visits/entc_iv_2017_18.pdf",
    class: "4U1 & 4U2 (Final Year)",
    date: "15/01/2018 to 18/01/2018",
    students: "114",
  },
];

const buildEntcOverviewTable = (entries = []) =>
  entries.filter(([, value]) => String(value || "").trim());

const defaultOverviewTableBE = buildEntcOverviewTable([
  ["Degree", defaultOverview?.degrees?.be?.degree || "B.E."],
  ["Duration", defaultOverview?.degrees?.be?.duration || "4 Years"],
  ["Intake", defaultOverview?.degrees?.be?.intake || "60"],
  ["Establishment", defaultOverview?.degrees?.be?.establishment || "1983"],
  ["NBA", defaultOverview?.degrees?.be?.nba || ""],
]);

const defaultOverviewTableME = buildEntcOverviewTable([
  ["Degree", defaultOverview?.degrees?.me?.degree || "M.E."],
  ["Duration", defaultOverview?.degrees?.me?.duration || "2 Years"],
  ["Intake", defaultOverview?.degrees?.me?.intake || "18"],
  ["Establishment", defaultOverview?.degrees?.me?.establishment || ""],
  ["NBA", defaultOverview?.degrees?.me?.nba || ""],
]);

const defaultOverviewTablePhD = buildEntcOverviewTable([
  ["Degree", defaultOverview?.degrees?.phd?.degree || "Ph.D."],
  ["Duration", defaultOverview?.degrees?.phd?.duration || "3-5 Years"],
  ["Intake", defaultOverview?.degrees?.phd?.intake || ""],
  ["Establishment", defaultOverview?.degrees?.phd?.establishment || ""],
  ["NBA", defaultOverview?.degrees?.phd?.nba || ""],
]);

const entcExtractMarkdownLinkHref = (value = "") => {
  const match = String(value || "").match(/\[.*?\]\((.*?)\)/);
  return match?.[1]?.trim?.() || "";
};

const entcParseMarkdownTableRow = (line = "") =>
  String(line || "")
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const entcInternshipsToMarkdown = (records = [], year = "2024-25") => {
  const lines = [
    `## ${year}`,
    "",
    "| Name of Student | Class | Name of Company | Duration | Start Date | End Date |",
    "|-----------------|-------|-----------------|----------|------------|----------|",
  ];

  if (!records.length) {
    lines.push("| Add student name | Add class | Add company | Add duration | Add start date | Add end date |");
    return lines.join("\n");
  }

  records.forEach((intern) => {
    lines.push(
      `| ${intern?.name || "-"} | ${intern?.class || "-"} | ${intern?.company || "-"} | ${intern?.duration || "-"} | ${intern?.startDate || "-"} | ${intern?.endDate || "-"} |`,
    );
  });

  return lines.join("\n");
};

const parseEntcInternshipsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
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
      !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(
        line,
      ),
  );

  return {
    year,
    records: dataLines
      .map((line) => entcParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 6)
      .map((cells, index) => ({
        no: String(index + 1),
        name: cells[0] || "",
        class: cells[1] || "",
        company: cells[2] || "",
        duration: cells[3] || "",
        startDate: cells[4] || "",
        endDate: cells[5] || "",
      }))
      .filter(
        (intern) =>
          intern.name ||
          intern.class ||
          intern.company ||
          intern.duration ||
          intern.startDate ||
          intern.endDate,
      ),
  };
};

const entcParseIndustrialVisitIndustries = (value = "") =>
  String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .split(/\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);

const entcIndustrialVisitsToMarkdown = (visits = []) => {
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

const parseEntcIndustrialVisitsMarkdown = (markdown = "") => {
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
    .map((line) => entcParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 5)
    .map((cells) => {
      const offset = cells.length >= 6 ? 1 : 0;
      return {
        industries: entcParseIndustrialVisitIndustries(cells[offset] || ""),
        class: cells[offset + 1] || "",
        date: cells[offset + 2] || "",
        students: cells[offset + 3] || "",
        report: entcExtractMarkdownLinkHref(cells.slice(offset + 4).join(" | ")),
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

const createEntcIndustrialVisitId = () =>
  `entc-industrial-visit-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getEntcIndustrialVisitSignature = (visit = {}) =>
  JSON.stringify({
    industries: (Array.isArray(visit?.industries) ? visit.industries : [])
      .map((item) => String(item || "").trim().toLowerCase())
      .filter(Boolean),
    class: String(visit?.class || "").trim().toLowerCase(),
    date: String(visit?.date || "").trim().toLowerCase(),
    students: String(visit?.students || "").trim().toLowerCase(),
  });

const defaultEntcMous = [
  { no: "1.", org: "ADOLF SOLUTIONS (OPC) PVT. LTD", date: "05-April-2025", report: "/uploads/documents/entc_mous/MOU_Adolf_Solutions_2025.pdf" },
  { no: "2.", org: "DAccess IT Infra Pvt. Ltd., Pune", date: "05-April-2025", report: "/uploads/documents/entc_mous/MOU_DAccess_IT_Infra_2025.pdf" },
  { no: "3.", org: "Iravan Technologies., Pune", date: "05-April-2025", report: "/uploads/documents/entc_mous/MOU_Iravan_Technologies_2025.pdf" },
  { no: "4.", org: "SSG Embedded Solutions, Nagpur", date: "05-April-2025", report: "/uploads/documents/entc_mous/MOU_SSG_Embedded_Solutions_2025.pdf" },
  { no: "5.", org: "Symbiosis Institute of Technology, Pune", date: "15-Sept-2023", report: "/uploads/documents/entc_mous/MOU_Symbiosis_2023.pdf" },
  { no: "6.", org: "S M Technologies Pvt Ltd", date: "16-Apr-2022", report: "/uploads/documents/entc_mous/MOU_SM_Technologies_2022.pdf" },
  { no: "7.", org: "TOR VERGATA University of ROME", date: "11-Feb-2020", report: "/uploads/documents/entc_mous/MOU_Tor_Vergata_Rome_2020.pdf" },
  { no: "8.", org: "ioCare, Pune", date: "07-Feb-2020", report: "/uploads/documents/entc_mous/MOU_ioCare_2020.pdf" },
  { no: "9.", org: "SSGM Electronic Solutions Pvt. Ltd., Akola", date: "16-Sept-2019", report: "/uploads/documents/entc_mous/MOU_SSGM_Electronic_Solutions_2019.pdf" },
  { no: "10.", org: "Green Field Control Systems, Gandhinagar, Gujarat", date: "16-Sept-2019", report: "/uploads/documents/entc_mous/MOU_Green_Field_Control_2019.pdf" },
  { no: "11.", org: "Integral Power Solutions Pvt. Ltd., Nashik", date: "02-Aug-2019", report: "/uploads/documents/entc_mous/MOU_Integral_Power_Solutions_2019.pdf" },
  { no: "12.", org: "Scientech Tech Pvt. Ltd., Indore", date: "Jan-2019", report: "/uploads/documents/entc_mous/MOU_Scientech_2019.pdf" },
  { no: "13.", org: "V-Chip Technology Pvt. Ltd., Pune", date: "10-Aug-2018", report: "/uploads/documents/entc_mous/MOU_VChip_Technology_2018.pdf" },
  { no: "14.", org: "Dr. P.D.K.V., Akola", date: "25-Jul-2018", report: "/uploads/documents/entc_mous/MOU_PDKV_Akola_2018.pdf" },
];

const entcMousToMarkdown = (mous = []) => {
  const lines = ["## MoUs", "", "| Name of the Organization | MOU Signing Date | MOU Copy / Report |", "|--------------------------|------------------|-------------------|"];
  if (!mous.length) return [...lines, "| No MoUs added yet. | - | - |"].join("\n");
  mous.forEach((mou) => lines.push(`| ${mou?.org || "-"} | ${mou?.date || "-"} | ${mou?.report ? `[View Document](${mou.report})` : "-"} |`));
  return lines.join("\n");
};

const parseEntcMousMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return dataLines.map((line) => entcParseMarkdownTableRow(line)).filter((cells) => cells.length >= 3).map((cells) => ({ org: cells[0] || "", date: cells[1] || "", report: entcExtractMarkdownLinkHref(cells.slice(2).join(" | ")) })).filter((mou) => mou.org || mou.date || mou.report);
};

const createEntcMouId = () =>
  `entc-mou-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getEntcMouSignature = (mou = {}) =>
  JSON.stringify({ org: String(mou?.org || "").trim().toLowerCase(), date: String(mou?.date || "").trim().toLowerCase() });

const entcPatentsToMarkdown = (items = [], year = "2024-25") => {
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
    lines.push(
      `| ${item?.title || "-"} | ${item?.status || "-"} | ${item?.id || "-"} | ${item?.inventors || "-"} | ${item?.link ? `[Open](${item.link})` : "-"} |`,
    );
  });
  return lines.join("\n");
};

const parseEntcPatentsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };
  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return {
    year,
    items: dataLines
      .map((line) => entcParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 5)
      .map((cells) => ({
        title: cells[0] || "",
        status: cells[1] || "",
        id: cells[2] || "",
        inventors: cells[3] || "",
        link: entcExtractMarkdownLinkHref(cells.slice(4).join(" | ")),
      }))
      .filter((item) => item.title || item.status || item.id || item.inventors || item.link),
  };
};

const entcPublicationsToMarkdown = (items = [], year = "2024-25") => {
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
    lines.push(
      `| ${item?.title || "-"} | ${item?.authors || "-"} | ${item?.journal || "-"} | ${item?.link ? `[View](${item.link})` : "-"} |`,
    );
  });
  return lines.join("\n");
};

const parseEntcPublicationsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };
  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return {
    year,
    items: dataLines
      .map((line) => entcParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        title: cells[0] || "",
        authors: cells[1] || "",
        journal: cells[2] || "",
        link: entcExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.title || item.authors || item.journal || item.link),
  };
};

const entcConferencesToMarkdown = (items = [], year = "2024-25") => {
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
    lines.push(
      `| ${item?.title || "-"} | ${item?.authors || "-"} | ${item?.journal || "-"} | ${item?.link ? `[View](${item.link})` : "-"} |`,
    );
  });
  return lines.join("\n");
};

const parseEntcConferencesMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };
  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return {
    year,
    items: dataLines
      .map((line) => entcParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        title: cells[0] || "",
        authors: cells[1] || "",
        journal: cells[2] || "",
        link: entcExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.title || item.authors || item.journal || item.link),
  };
};

const entcCopyrightsToMarkdown = (items = [], year = "2024-25") => {
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
    lines.push(
      `| ${item?.name || "-"} | ${item?.title || "-"} | ${item?.status || "-"} | ${item?.link ? `[Open](${item.link})` : "-"} |`,
    );
  });
  return lines.join("\n");
};

const parseEntcCopyrightsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };
  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return {
    year,
    items: dataLines
      .map((line) => entcParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        name: cells[0] || "",
        title: cells[1] || "",
        status: cells[2] || "",
        link: entcExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.name || item.title || item.status || item.link),
  };
};

const entcBooksToMarkdown = (items = [], year = "2024-25") => {
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
    lines.push(
      `| ${item?.name || "-"} | ${item?.coAuthors || "-"} | ${item?.title || "-"} | ${item?.details || "-"} | ${item?.isbn || "-"} | ${item?.link ? `[Open](${item.link})` : "-"} |`,
    );
  });
  return lines.join("\n");
};

const parseEntcBooksMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };
  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return {
    year,
    items: dataLines
      .map((line) => entcParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 6)
      .map((cells) => ({
        name: cells[0] || "",
        coAuthors: cells[1] || "",
        title: cells[2] || "",
        details: cells[3] || "",
        isbn: cells[4] || "",
        link: entcExtractMarkdownLinkHref(cells.slice(5).join(" | ")),
      }))
      .filter((item) => item.name || item.coAuthors || item.title || item.details || item.isbn || item.link),
  };
};

const ENTC_RESEARCH_DEFAULTS = {
  patents: defaultEntcPatents,
  publications: defaultEntcPublications,
  conferences: defaultEntcConferences,
  books: defaultEntcBooks,
  copyrights: defaultEntcCopyrights,
};

const ENTC_RESEARCH_TO_MARKDOWN = {
  patents: entcPatentsToMarkdown,
  publications: entcPublicationsToMarkdown,
  conferences: entcConferencesToMarkdown,
  books: entcBooksToMarkdown,
  copyrights: entcCopyrightsToMarkdown,
};

const ENTC_RESEARCH_FROM_MARKDOWN = {
  patents: parseEntcPatentsMarkdown,
  publications: parseEntcPublicationsMarkdown,
  conferences: parseEntcConferencesMarkdown,
  books: parseEntcBooksMarkdown,
  copyrights: parseEntcCopyrightsMarkdown,
};

const ENTC_RESEARCH_TEMPLATE_URLS = {
  patents: "/uploads/documents/pride_templates/entc_patents_template.docx",
  publications: "/uploads/documents/pride_templates/entc_publications_template.docx",
  conferences: "/uploads/documents/pride_templates/entc_conferences_template.docx",
  books: "/uploads/documents/pride_templates/entc_books_template.docx",
  copyrights: "/uploads/documents/pride_templates/entc_copyrights_template.docx",
};

const EnTC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() =>
    getRequestedTab(location, "overview")
  );
  const [achievementTab, setAchievementTab] = useState("faculty");
  const [certificateLightbox, setCertificateLightbox] = useState(null);
  const [vmTab, setVmTab] = useState("vision");
  const [poTab, setPoTab] = useState("peo");
  const [showAllPos, setShowAllPos] = useState(false);
  const [researchTab, setResearchTab] = useState("projects");
  const [patentSubTab, setPatentSubTab] = useState("patents");
  const [projectYear, setProjectYear] = useState("2024-25");
  const [researchYear, setResearchYear] = useState("2024-25");
  const defaultResearchYears = [
    "2024-25",
    "2023-24",
    "2022-23",
    "2021-22",
    "2020-21",
    "2019-20",
    "2018-19",
  ];
  const [placementYear, setPlacementYear] = useState(null);
  const [showAddPlacementYear, setShowAddPlacementYear] = useState(false);
  const [newPlacementYear, setNewPlacementYear] = useState("");
  const [placementYearError, setPlacementYearError] = useState("");
  const [showAddResearchYear, setShowAddResearchYear] = useState(false);
  const [newResearchYear, setNewResearchYear] = useState("");
  const [researchYearError, setResearchYearError] = useState("");
  const [expandedSemester, setExpandedSemester] = useState(null);
  const [prideTab, setPrideTab] = useState("gate");
  const [ugProjectYear, setUgProjectYear] = useState("2024-25");
  const [showAddUgProjectYear, setShowAddUgProjectYear] = useState(false);
  const [newUgProjectYear, setNewUgProjectYear] = useState("");
  const [ugProjectYearError, setUgProjectYearError] = useState("");
  const [internshipYear, setInternshipYear] = useState("2024-25");
  const [showAddInternshipYear, setShowAddInternshipYear] = useState(false);
  const [newInternshipYear, setNewInternshipYear] = useState("");
  const [internshipYearError, setInternshipYearError] = useState("");
  const [activitiesVisible, setActivitiesVisible] = useState(6);
  const [lightboxActivity, setLightboxActivity] = useState(null);

  // State for Curriculum (Scheme & Syllabus) management
  const [selectedCurriculumItems, setSelectedCurriculumItems] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [newsletterUploading, setNewsletterUploading] = useState({});
  const [newsletterUploadErrors, setNewsletterUploadErrors] = useState({});
  const [magazineUploading, setMagazineUploading] = useState({});
  const [magazineUploadErrors, setMagazineUploadErrors] = useState({});
  const [achievementUploading, setAchievementUploading] = useState({});
  const [achievementUploadErrors, setAchievementUploadErrors] = useState({});
  const [achievementUploadSuccess, setAchievementUploadSuccess] = useState({});
  const [industrialVisitReportUploading, setIndustrialVisitReportUploading] =
    useState({});
  const [industrialVisitReportErrors, setIndustrialVisitReportErrors] =
    useState({});
  const [mouReportUploading, setMouReportUploading] = useState({});
  const [mouReportErrors, setMouReportErrors] = useState({});
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

  // Load department data (works in both edit and public view modes)
  const {
    data: activeData,
    loading: dataLoading,
    isEditing,
    updateData,
    removeData,
    t,
  } = useDepartmentData("departments-entc");

  // Helper for array updates
  const updateField = (path, value) => {
    updateData(path, value);
  };

  const getEntcIndustrialVisits = () =>
    JSON.parse(JSON.stringify(t("industrialVisits.items", defaultEntcIndustrialVisits))).map(
      (visit) => ({
        ...visit,
        id: String(visit?.id || createEntcIndustrialVisitId()),
      }),
    );

  const getEntcIndustrialVisitsMarkdown = (visits = getEntcIndustrialVisits()) =>
    entcIndustrialVisitsToMarkdown(visits);

  const persistEntcIndustrialVisits = (visits) => {
    const normalizedVisits = (Array.isArray(visits) ? visits : []).map((visit) => ({
      id: String(visit?.id || createEntcIndustrialVisitId()).trim(),
      industries: Array.isArray(visit?.industries)
        ? visit.industries.map((item) => String(item || "").trim()).filter(Boolean)
        : [],
      class: String(visit?.class || "").trim(),
      date: String(visit?.date || "").trim(),
      students: String(visit?.students || "").trim(),
      report: String(visit?.report || "").trim(),
    }));

    updateData("industrialVisits.items", normalizedVisits);
    updateData("industrialVisits.markdown", entcIndustrialVisitsToMarkdown(normalizedVisits));
  };

  const handleEntcIndustrialVisitsMarkdownSave = (markdown) => {
    const parsed = parseEntcIndustrialVisitsMarkdown(markdown);
    const existingVisits = getEntcIndustrialVisits();
    const signaturePool = new Map();
    existingVisits.forEach((visit) => {
      const signature = getEntcIndustrialVisitSignature(visit);
      const matches = signaturePool.get(signature) || [];
      matches.push(visit);
      signaturePool.set(signature, matches);
    });
    const usedIds = new Set();
    const mergedVisits = parsed.map((visit, index) => {
      const signature = getEntcIndustrialVisitSignature(visit);
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
        id: match?.id || createEntcIndustrialVisitId(),
        industries: visit.industries,
        class: visit.class,
        date: visit.date,
        students: visit.students,
        report: visit.report || match?.report || "",
      };
    });
    persistEntcIndustrialVisits(mergedVisits);
  };

  const addEntcIndustrialVisitRowOnTop = () => {
    const visits = getEntcIndustrialVisits();
    persistEntcIndustrialVisits([
      {
        id: createEntcIndustrialVisitId(),
        industries: ["New Industry / Organization"],
        class: "Add class",
        date: "Add date",
        students: "Add students",
        report: "",
      },
      ...visits,
    ]);
  };

  const uploadEntcIndustrialVisitReport = async (visitId, file) => {
    if (!file) return;

    const uploadKey = `entc-industrial-visit-${visitId}`;
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

      const visits = getEntcIndustrialVisits();
      persistEntcIndustrialVisits(
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
      console.error("EnTC industrial visit report upload failed:", error);
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

  const getEntcMous = () =>
    JSON.parse(JSON.stringify(t("mous.items", defaultEntcMous))).map((mou) => ({
      ...mou,
      id: String(mou?.id || createEntcMouId()),
    }));

  const getEntcMousMarkdown = (mous = getEntcMous()) => entcMousToMarkdown(mous);

  const persistEntcMous = (mous) => {
    const normalizedMous = (Array.isArray(mous) ? mous : []).map((mou) => ({
      id: String(mou?.id || createEntcMouId()).trim(),
      org: String(mou?.org || "").trim(),
      date: String(mou?.date || "").trim(),
      report: String(mou?.report || "").trim(),
    }));
    updateData("mous.items", normalizedMous);
    updateData("mous.markdown", entcMousToMarkdown(normalizedMous));
  };

  const handleEntcMousMarkdownSave = (markdown) => {
    const parsed = parseEntcMousMarkdown(markdown);
    const existingMous = getEntcMous();
    const signaturePool = new Map();
    existingMous.forEach((mou) => {
      const signature = getEntcMouSignature(mou);
      const matches = signaturePool.get(signature) || [];
      matches.push(mou);
      signaturePool.set(signature, matches);
    });
    const usedIds = new Set();
    const mergedMous = parsed.map((mou, index) => {
      const signature = getEntcMouSignature(mou);
      let match = (signaturePool.get(signature) || []).find((item) => !usedIds.has(item.id));
      if (!match) {
        const fallback = existingMous[index];
        if (fallback && !usedIds.has(fallback.id)) match = fallback;
      }
      if (match?.id) usedIds.add(match.id);
      return { id: match?.id || createEntcMouId(), org: mou.org, date: mou.date, report: mou.report || match?.report || "" };
    });
    persistEntcMous(mergedMous);
  };

  const addEntcMouRowOnTop = () => {
    const mous = getEntcMous();
    persistEntcMous([{ id: createEntcMouId(), org: "New organization", date: "Add signing date", report: "" }, ...mous]);
  };

  const uploadEntcMouReport = async (mouId, file) => {
    if (!file) return;
    const uploadKey = `entc-mou-${mouId}`;
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
        const mous = getEntcMous();
        persistEntcMous(mous.map((mou) => (mou.id === mouId ? { ...mou, report: response.data.fileUrl } : mou)));
      }
    } catch (error) {
      console.error("EnTC MOU upload failed:", error);
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

  const getEntcResearchItems = (section, year = researchYear) =>
    JSON.parse(
      JSON.stringify(
        t(`research.${section}.${year}`, ENTC_RESEARCH_DEFAULTS[section]?.[year] || []),
      ),
    );

  const getEntcResearchMarkdownValue = (section, year = researchYear) => {
    const storedMarkdown = t(`researchMarkdown.${section}.${year}`, null);
    if (typeof storedMarkdown === "string" && storedMarkdown.trim()) return storedMarkdown;
    return ENTC_RESEARCH_TO_MARKDOWN[section](getEntcResearchItems(section, year), year);
  };

  const getEntcResearchYears = () => {
    const configuredYears = Array.isArray(t("researchYears", null))
      ? t("researchYears", [])
      : [];
    const storedResearch = t("research", {});
    const storedResearchMarkdown = t("researchMarkdown", {});
    const discoveredYears = Object.keys(ENTC_RESEARCH_DEFAULTS).flatMap((section) => [
      ...Object.keys(ENTC_RESEARCH_DEFAULTS[section] || {}),
      ...Object.keys(storedResearch?.[section] && typeof storedResearch[section] === "object" ? storedResearch[section] : {}),
      ...Object.keys(storedResearchMarkdown?.[section] && typeof storedResearchMarkdown[section] === "object" ? storedResearchMarkdown[section] : {}),
    ]);
    const years = normalizePlacementYears([
      ...defaultResearchYears,
      ...configuredYears,
      ...discoveredYears,
    ]).sort(compareAcademicYearsDesc);
    return years.length ? years : [...defaultResearchYears];
  };

  const persistEntcResearchSection = (section, items, year = researchYear) => {
    const normalizedItems = Array.isArray(items) ? items : [];
    updateData(`research.${section}.${year}`, normalizedItems);
    updateData(
      `researchMarkdown.${section}.${year}`,
      ENTC_RESEARCH_TO_MARKDOWN[section](normalizedItems, year),
    );
  };

  const createEmptyEntcResearchMarkdown = (section, year) =>
    ENTC_RESEARCH_TO_MARKDOWN[section]([], year);

  const handleEntcResearchMarkdownSave = (markdown) => {
    const parser = ENTC_RESEARCH_FROM_MARKDOWN[patentSubTab];
    const parsed = parser(markdown, researchYear);
    persistEntcResearchSection(patentSubTab, parsed.items || [], researchYear);
  };

  const addEntcResearchRowOnTop = (section = patentSubTab) => {
    const researchItems = getEntcResearchItems(section, researchYear);
    const blankRows = {
      patents: { title: "Add invention title", status: "Published", id: "Add application no.", inventors: "Add inventors", link: "" },
      publications: { title: "Add paper title", authors: "Add authors", journal: "Add journal details", link: "" },
      conferences: { title: "Add paper title", authors: "Add authors", journal: "Add conference details", link: "" },
      copyrights: { name: "Add faculty name", title: "Add title of work", status: "Published", link: "" },
      books: { name: "Add author names", coAuthors: "", title: "Add title", details: "Add publisher", isbn: "Add ISBN", link: "" },
    };
    persistEntcResearchSection(section, [blankRows[section] || {}, ...researchItems], researchYear);
  };

  const researchYears = getEntcResearchYears();
  const selectedResearchItems = getEntcResearchItems(patentSubTab, researchYear);
  const selectedResearchMarkdown = getEntcResearchMarkdownValue(patentSubTab, researchYear);

  useEffect(() => {
    if (!researchYears.length) return;
    if (!researchYears.includes(researchYear)) {
      setResearchYear(researchYears[0]);
    }
  }, [researchYear, researchYears]);

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
    Object.keys(ENTC_RESEARCH_DEFAULTS).forEach((section) => {
      updateData(`research.${section}.${normalizedYear}`, []);
      updateData(`researchMarkdown.${section}.${normalizedYear}`, createEmptyEntcResearchMarkdown(section, normalizedYear));
    });
    updateData("researchYears", [normalizedYear, ...researchYears]);
    setResearchYear(normalizedYear);
    setNewResearchYear("");
    setResearchYearError("");
    setShowAddResearchYear(false);
  };

  const getEntcResearchReportUrl = (year) =>
    String(
      t(
        `researchReports.${year}`,
        `/uploads/documents/entc_publications/ENTC_${year}_Patent_Publication_Data.pdf`,
      ) || "",
    ).trim();

  const uploadEntcResearchReport = async (year, file) => {
    if (!file || !year) return;
    const uploadKey = `entc-research-report-${year}`;
    setResearchReportUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setResearchReportErrors((prev) => ({ ...prev, [uploadKey]: "" }));
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("adminToken");
      const response = await apiClient.post("/upload/file", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      if (!response.data.fileUrl) throw new Error("Upload did not return a file URL.");
      updateData(`researchReports.${year}`, response.data.fileUrl);
    } catch (error) {
      console.error("EnTC research report upload failed:", error);
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

  const parseUgProjectsTableRow = (line = "") =>
    String(line || "")
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const entcUgProjectsToMarkdown = (projectsByYear = {}, preferredYears = []) => {
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
          (project) => `| ${project?.id || "-"} | ${project?.title || "-"} |`,
        );
        return [...header, ...rows].join("\n");
      })
      .join("\n\n");
  };

  const parseEntcUgProjectsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
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
          id: cells[0] || "",
          title: cells[1] || "",
        }))
        .filter((project) => project.id || project.title);

      if (!years.includes(normalizedYear)) years.push(normalizedYear);
    });

    return { years, records };
  };

  const getUgProjectYears = () => {
    const storedYears = Array.isArray(t("ugProjectYears", null))
      ? t("ugProjectYears", [])
      : [];
    const recordYears = Object.keys(t("ugProjects", defaultUgProjects) || {});
    return [...new Set([...storedYears, ...recordYears])]
      .filter(Boolean)
      .sort(compareAcademicYearsDesc);
  };

  const getUgProjectRecords = () =>
    JSON.parse(JSON.stringify(t("ugProjects", defaultUgProjects)));

  const getUgProjectMarkdownByYear = () =>
    JSON.parse(JSON.stringify(t("ugProjectsMarkdownByYear", {})));

  const persistUgProjects = (records, years = getUgProjectYears()) => {
    const orderedYears = [...new Set([...years, ...Object.keys(records || {})])]
      .filter(Boolean)
      .sort(compareAcademicYearsDesc);

    const normalizedRecords = orderedYears.reduce((acc, year) => {
      acc[year] = Array.isArray(records?.[year])
        ? records[year].map((project) => ({
            id: String(project?.id || "").trim(),
            title: String(project?.title || "").trim(),
          }))
        : [];
      return acc;
    }, {});

    const existingMarkdownByYear = getUgProjectMarkdownByYear();
    const markdownByYear = orderedYears.reduce((acc, year) => {
      acc[year] =
        existingMarkdownByYear?.[year] ||
        entcUgProjectsToMarkdown({ [year]: normalizedRecords[year] || [] }, [year]);
      return acc;
    }, {});

    updateData("ugProjects", normalizedRecords);
    updateData("ugProjectYears", orderedYears);
    updateData("ugProjectsMarkdownByYear", markdownByYear);
  };

  const handleUgProjectMarkdownSave = (markdown) => {
    const parsed = parseEntcUgProjectsMarkdown(markdown, ugProjectYear);
    const mergedRecords = {
      ...getUgProjectRecords(),
      [ugProjectYear]: parsed.records[ugProjectYear] || [],
    };
    persistUgProjects(mergedRecords, getUgProjectYears());
    updateData(`ugProjectsMarkdownByYear.${ugProjectYear}`, markdown);
  };

  const handleAddUgProjectYear = () => {
    const normalizedYear = newUgProjectYear.trim();
    const ugProjectYears = getUgProjectYears();

    if (!isValidAcademicYear(normalizedYear)) {
      setUgProjectYearError("Enter a valid academic year like 2025-26.");
      return;
    }
    if (ugProjectYears.includes(normalizedYear)) {
      setUgProjectYearError("That academic year already exists.");
      return;
    }

    const dataObj = getUgProjectRecords();
    dataObj[normalizedYear] = [];
    persistUgProjects(dataObj, [normalizedYear, ...ugProjectYears]);
    updateData(
      `ugProjectsMarkdownByYear.${normalizedYear}`,
      entcUgProjectsToMarkdown({ [normalizedYear]: [] }, [normalizedYear]),
    );
    setUgProjectYear(normalizedYear);
    setNewUgProjectYear("");
    setUgProjectYearError("");
    setShowAddUgProjectYear(false);
  };

  const getInternshipYears = () => {
    const storedYears = Array.isArray(t("internshipsYears", null))
      ? t("internshipsYears", [])
      : [];
    const recordYears = Object.keys(
      t("internships", defaultInternships) || defaultInternships,
    ).filter(isAcademicYearKey);

    return [...new Set([...storedYears, ...recordYears])]
      .filter(Boolean)
      .sort(compareAcademicYearsDesc);
  };

  const getInternshipRecords = () =>
    JSON.parse(JSON.stringify(t("internships", defaultInternships)));

  const getInternshipMarkdownByYear = () =>
    JSON.parse(JSON.stringify(t("internshipsMarkdownByYear", {})));

  const createEmptyInternshipMarkdown = (year) =>
    entcInternshipsToMarkdown([], year);

  const persistInternships = (records, years = getInternshipYears()) => {
    const orderedYears = [...new Set([...years, ...Object.keys(records || {})])]
      .filter(isAcademicYearKey)
      .sort(compareAcademicYearsDesc);

    const normalizedRecords = orderedYears.reduce((acc, year) => {
      acc[year] = (Array.isArray(records?.[year]) ? records[year] : []).map(
        (intern, index) => ({
          no: String(index + 1),
          name: String(intern?.name || "").trim(),
          class: String(intern?.class || "").trim(),
          company: String(intern?.company || "").trim(),
          duration: String(intern?.duration || "").trim(),
          startDate: String(intern?.startDate || "").trim(),
          endDate: String(intern?.endDate || "").trim(),
        }),
      );
      return acc;
    }, {});

    const existingMarkdownByYear = getInternshipMarkdownByYear();
    const markdownByYear = orderedYears.reduce((acc, year) => {
      acc[year] =
        existingMarkdownByYear?.[year] ||
        entcInternshipsToMarkdown(normalizedRecords[year] || [], year);
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
    entcInternshipsToMarkdown(currentInternships, internshipYear);

  useEffect(() => {
    if (!internshipYears.length) return;
    if (!internshipYears.includes(internshipYear)) {
      setInternshipYear(internshipYears[0]);
    }
  }, [internshipYear, internshipYears]);

  const handleInternshipsMarkdownSave = (markdown) => {
    const parsed = parseEntcInternshipsMarkdown(markdown, internshipYear);
    const records = {
      ...getInternshipRecords(),
      [internshipYear]: parsed.records || [],
    };
    persistInternships(records, internshipYears);
    updateData(
      `internshipsMarkdownByYear.${internshipYear}`,
      entcInternshipsToMarkdown(parsed.records || [], internshipYear),
    );
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
    const header = `## Placement Record — ${year}`;
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
    const header = `## Placement Record — ${year}`;
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
            onSave={(value) => updateData(`placements.details.${placementYear}`, value)}
            showDocImport
            docTemplateUrl="/uploads/documents/pride_templates/cse_placement_details_template.docx"
            docTemplateLabel="Download Placement Template"
            placeholder="Paste or import placement data (Markdown) here..."
          />
        ) : (
          <EntcPrideMdView markdown={markdown} />
        )}
      </div>
    );
  };

  // Default curriculum items for Scheme & Syllabus
  const DEFAULT_CURRICULUM_BE = [
    {
      label: "NEP Scheme",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Scheme",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label:
        "Notification letter - Revised Scheme only for open Elective subject",
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
    {
      label:
        "Syllabus - (Universal Human Values and Ethics) Common for all branches - Sem. IV (NEP)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label:
        "Syllabus - (Modern Indian Language) Common for all branches - Sem. IV (NEP)",
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
      label: "Revised Syllabus for Open Elective Third Year (5th & 6th Sem)",
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
    {
      label: "Revised Syllabus for Open Elective Final Year (7th & 8th Sem)",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
  ];

  const DEFAULT_CURRICULUM_ME = [
    {
      label: "Scheme and Syllabus M.E. (Digital Electronics)",
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

  const updateArrayString = (path, defaultArray, index, newValue) => {
    const currentArray = t(path, defaultArray);
    const newArray = [...currentArray];
    newArray[index] = newValue;
    updateData(path, newArray);
  };

  const getCourseMaterials = () =>
    JSON.parse(JSON.stringify(t("courseMaterial", defaultCourseMaterials)));

  const updateCourseMaterial = (index, field, value) => {
    const items = getCourseMaterials();
    if (!items[index]) return;
    items[index] = { ...items[index], [field]: value };
    updateData("courseMaterial", items);
  };

  const addCourseMaterial = () => {
    const items = getCourseMaterials();
    updateData("courseMaterial", [
      ...items,
      {
        year: "New Year",
        title: "New Semester",
        link: "#",
      },
    ]);
    setShouldScrollToNewCourseMaterial(true);
  };

  const deleteCourseMaterial = (index) => {
    const items = getCourseMaterials();
    updateData(
      "courseMaterial",
      items.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const courseMaterialItems = t("courseMaterial", defaultCourseMaterials) || [];

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
    activeTab,
    courseMaterialItems.length,
    isEditing,
    shouldScrollToNewCourseMaterial,
  ]);

  const updateUgProject = (year, index, field, value) => {
    const currentProjects = t(
      `studentProjects.${year}`,
      defaultStudentProjects[year],
    );
    const newProjects = [...currentProjects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    updateData(`studentProjects.${year}`, newProjects);
  };


  const updateNewsletter = (section, index, field, value) => {
    if (section === "latest") {
      updateData(`newsletters.latest.${field}`, value);
    } else {
      const currentArchives = t(
        "newsletters.archives",
        defaultNewsletters.archives,
      );
      const newArchives = [...currentArchives];
      newArchives[index] = { ...newArchives[index], [field]: value };
      updateData("newsletters.archives", newArchives);
    }
  };

  const getStoredEntcValue = (path) => {
    const normalizedPath = String(path || "").replace(/\[(\d+)\]/g, ".$1");
    return normalizedPath.split(".").reduce((current, part) => {
      if (current === undefined || current === null) return undefined;
      return current[part];
    }, activeData);
  };

  const latestNewsletterData =
    getStoredEntcValue("newsletters.latest") || defaultNewsletters.latest;
  const newsletterArchivesData =
    getStoredEntcValue("newsletters.archives") ||
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

    updateData("newsletters.latest", createEmptyLatestNewsletter());
    updateData("newsletters.archives", nextArchives);
  };

  const deleteNewsletter = async (section, index) => {
    if (section === "latest") {
      const currentLatest = JSON.parse(
        JSON.stringify(latestNewsletterData || defaultNewsletters.latest),
      );
      const currentArchives = JSON.parse(
        JSON.stringify(newsletterArchivesData || defaultNewsletters.archives),
      );

      await deleteNewsletterFileIfNeeded(currentLatest?.link);

      if (currentArchives.length > 0) {
        const [nextLatest, ...remainingArchives] = currentArchives;
        updateData("newsletters.latest", createLatestFromArchive(nextLatest));
        updateData("newsletters.archives", remainingArchives);
      } else {
        updateData("newsletters.latest", createEmptyLatestNewsletter());
        updateData("newsletters.archives", []);
      }
      return;
    }

    const currentArchives = JSON.parse(
      JSON.stringify(newsletterArchivesData || defaultNewsletters.archives),
    );
    const archiveToDelete = currentArchives[index];

    await deleteNewsletterFileIfNeeded(archiveToDelete?.link);

    updateData(
      "newsletters.archives",
      currentArchives.filter((_, archiveIndex) => archiveIndex !== index),
    );
  };

  const uploadNewsletterFile = async (section, index, file) => {
    if (!file) return;

    const uploadKey = `${section}-${index}`;
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

      if (section === "latest") {
        const latest = JSON.parse(
          JSON.stringify(latestNewsletterData || defaultNewsletters.latest),
        );
        updateData("newsletters.latest", {
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
        updateData("newsletters.archives", archives);
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

  const handleNewsletterFileChange = (section, index, event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file for the newsletter.");
      return;
    }

    uploadNewsletterFile(section, index, file);
  };

  const updateMagazine = (section, index, field, value) => {
    if (section === "latest") {
      updateData(`magazines.latest.${field}`, value);
    } else {
      const currentArchives = t("magazines.archives", defaultMagazines.archives);
      const newArchives = [...currentArchives];
      newArchives[index] = { ...newArchives[index], [field]: value };
      updateData("magazines.archives", newArchives);
    }
  };

  const latestMagazineData =
    getStoredEntcValue("magazines.latest") || defaultMagazines.latest;
  const magazineArchivesData =
    getStoredEntcValue("magazines.archives") || defaultMagazines.archives || [];

  const createEmptyLatestMagazine = () => ({
    title: "New Magazine",
    description: "",
    link: "",
    sourceUrl: "",
    fileName: "",
  });

  const createMagazineArchiveFromLatest = (latest) => ({
    title: latest?.title || "New Magazine",
    link: latest?.link || "",
    sourceUrl: latest?.sourceUrl || "",
    fileName: latest?.fileName || "",
  });

  const getMagazineFileName = (issue) => {
    if (issue?.fileName) return issue.fileName;

    const rawLink =
      (typeof issue?.link === "string" && issue.link.trim()) ||
      (typeof issue?.sourceUrl === "string" && issue.sourceUrl.trim()) ||
      "";

    if (!rawLink) return "No file uploaded";

    const lastSegment = String(rawLink).split("/").pop() || "";
    return decodeURIComponent(lastSegment);
  };

  const addMagazine = () => {
    const currentLatest = JSON.parse(
      JSON.stringify(latestMagazineData || defaultMagazines.latest),
    );
    const currentArchives = JSON.parse(
      JSON.stringify(magazineArchivesData || defaultMagazines.archives),
    );

    const nextArchives = currentLatest?.title
      ? [createMagazineArchiveFromLatest(currentLatest), ...currentArchives]
      : currentArchives;

    updateData("magazines.latest", createEmptyLatestMagazine());
    updateData("magazines.archives", nextArchives);
  };

  const deleteMagazine = async (section, index) => {
    if (section === "latest") {
      const currentLatest = JSON.parse(
        JSON.stringify(latestMagazineData || defaultMagazines.latest),
      );
      const currentArchives = JSON.parse(
        JSON.stringify(magazineArchivesData || defaultMagazines.archives),
      );

      await deleteNewsletterFileIfNeeded(currentLatest?.link);

      if (currentArchives.length > 0) {
        const [nextLatest, ...remainingArchives] = currentArchives;
        updateData("magazines.latest", {
          title: nextLatest?.title || "New Magazine",
          description: currentLatest?.description || "",
          link: nextLatest?.link || "",
          sourceUrl: nextLatest?.sourceUrl || "",
          fileName: nextLatest?.fileName || "",
        });
        updateData("magazines.archives", remainingArchives);
      } else {
        updateData("magazines.latest", createEmptyLatestMagazine());
        updateData("magazines.archives", []);
      }
      return;
    }

    const currentArchives = JSON.parse(
      JSON.stringify(magazineArchivesData || defaultMagazines.archives),
    );
    const archiveToDelete = currentArchives[index];

    await deleteNewsletterFileIfNeeded(archiveToDelete?.link);

    updateData(
      "magazines.archives",
      currentArchives.filter((_, archiveIndex) => archiveIndex !== index),
    );
  };

  const uploadMagazineFile = async (section, index, file) => {
    if (!file) return;

    const uploadKey = `${section}-${index}`;
    setMagazineUploading((prev) => ({ ...prev, [uploadKey]: true }));
    setMagazineUploadErrors((prev) => ({ ...prev, [uploadKey]: "" }));

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

      if (section === "latest") {
        const latest = JSON.parse(
          JSON.stringify(latestMagazineData || defaultMagazines.latest),
        );
        updateData("magazines.latest", {
          ...latest,
          link: response.data.fileUrl,
          sourceUrl: "",
          fileName: response.data.originalName || file.name,
        });
      } else {
        const archives = JSON.parse(
          JSON.stringify(magazineArchivesData || defaultMagazines.archives),
        );
        archives[index] = {
          ...archives[index],
          link: response.data.fileUrl,
          sourceUrl: "",
          fileName: response.data.originalName || file.name,
        };
        updateData("magazines.archives", archives);
      }
    } catch (error) {
      console.error("Magazine upload failed:", error);
      setMagazineUploadErrors((prev) => ({
        ...prev,
        [uploadKey]:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Upload failed",
      }));
    } finally {
      setMagazineUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const handleMagazineFileChange = (section, index, event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file for the magazine.");
      return;
    }

    uploadMagazineFile(section, index, file);
  };

  const getAchievementItems = (section) =>
    JSON.parse(
      JSON.stringify(
        t(`achievements.${section}`, defaultAchievements[section] || []),
      ),
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

  const updateActivity = (idx, field, value) => {
    const storedActivitiesMarkdown = t("activities.markdown", "");
    const parsedActivities = parseEntcActivitiesMarkdown(
      storedActivitiesMarkdown,
    );
    const sourceActivities = (
      parsedActivities.length
        ? parsedActivities
        : t("activities.list", defaultEntcActivityCards)
    ).map(normalizeEntcActivity);

    if (!sourceActivities[idx]) return;

    const nextActivities = sourceActivities.map((activity, activityIndex) =>
      activityIndex === idx
        ? normalizeEntcActivity({
            ...activity,
            [field]: value,
          })
        : activity,
    );

    updateData("activities.list", nextActivities);
    updateData("activities.markdown", entcActivitiesToMarkdown(nextActivities));
  };

  const legacyActivities = (
    t("activities.list", defaultEntcActivityCards) || defaultEntcActivityCards
  ).map(normalizeEntcActivity);
  const storedActivitiesMarkdown = t("activities.markdown", "");
  const parsedActivities = parseEntcActivitiesMarkdown(storedActivitiesMarkdown);
  const activitiesData = parsedActivities.length
    ? parsedActivities
    : legacyActivities;

  const updateActivityList = (updater) => {
    const nextActivities = updater(
      activitiesData.map((activity) => normalizeEntcActivity(activity)),
    );
    updateData("activities.list", nextActivities);
    updateData("activities.markdown", entcActivitiesToMarkdown(nextActivities));
  };

  const addActivityCard = () => {
    updateActivityList((items) => [
      {
        title: "New Curricular Activity",
        date: "Add activity date",
        participants: "Add participant details",
        organizer: "EXTC Department, SSGMCE",
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

  const entcActivityMarkdownComponents = {
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
          components={entcActivityMarkdownComponents}
        >
          {trimmedValue}
        </ReactMarkdown>
      </div>
    );
  };

  const resolveMagazineHref = (issue) => {
    if (!issue || typeof issue !== "object") return "#";

    const sourceUrl =
      typeof issue.sourceUrl === "string" ? issue.sourceUrl.trim() : "";
    const link = typeof issue.link === "string" ? issue.link.trim() : "";

    // Prefer canonical source URL for magazine PDFs when available.
    if (sourceUrl) return encodeURI(sourceUrl);
    if (link && link !== "#") return link;
    return "#";
  };

  const getFacultyList = () => t("templateData.faculty.list", defaultFaculty);
  const getStaffList = () => t("templateData.staff.list", defaultStaff);

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
      JSON.stringify(
        t(
          `pride.toppers.${key}`,
          key === "be" ? defaultPrideToppersBE : defaultPrideToppersME,
        ),
      ),
    );
    newData[yearIdx].records[recordIdx][field] = val;
    updateData(`pride.toppers.${key}`, newData);
  };

  const updateOverviewTable = (path, defaultArr, rowIdx, cellIdx, val) => {
    const newData = JSON.parse(JSON.stringify(t(path, defaultArr)));
    newData[rowIdx][cellIdx] = val;
    updateData(path, newData);
  };
  const updateFacultyList = (updater) => {
    const current = JSON.parse(JSON.stringify(getFacultyList()));
    const updated = typeof updater === "function" ? updater(current) : updater;
    updateData("templateData.faculty.list", updated);
  };

  const updateStaffList = (updater) => {
    const current = JSON.parse(JSON.stringify(getStaffList()));
    const updated = typeof updater === "function" ? updater(current) : updater;
    updateData("templateData.staff.list", updated);
  };

  const splitFacultyMultiline = (value = "") =>
    String(value || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const createFacultySlug = (value = "") => {
    const slug = String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return slug || "faculty-member";
  };

  const resolveVidwanUrl = (facultyMember) => {
    const directLink =
      typeof facultyMember?.vidwanLink === "string"
        ? facultyMember.vidwanLink.trim()
        : "";
    if (directLink) return directLink;

    const vidwanId =
      typeof facultyMember?.vidwanId === "string"
        ? facultyMember.vidwanId.trim()
        : "";
    return vidwanId
      ? `https://vidwan.inflibnet.ac.in/profile/${vidwanId}`
      : "";
  };

  const academicsLinks = [
    { id: "overview", label: "Department Overview" },
    { id: "hod", label: "Words from HOD" },
    { id: "vision-mission", label: "Vision, Mission, PEO & PSO" },
    { id: "course-outcomes", label: "Course Outcomes" },
    { id: "curriculum", label: "Scheme and Syllabus" },
    { id: "laboratories", label: "Infrastructure and Laboratories" },
    { id: "pride", label: "Pride of the Department" },
    { id: "best-projects", label: "Student's Best Projects" },
    { id: "placements", label: "Placement Statistics" },
    { id: "activities", label: "Co-Curricular Activities" },
    { id: "newsletter", label: "Newsletter" },
    { id: "achievements", label: "Achievements" },
    { id: "committee", label: "Departmental Committee" },
    { id: "services", label: "Services Extended" },
    { id: "projects", label: "UG Projects" },
    { id: "staff", label: "Staff @ Department" },
    { id: "course-material", label: "Course Material" },
    { id: "magazines", label: "Magzines" },
    { id: "practices", label: "Innovative Practice" },
    { id: "faculty", label: "Faculty Members" },
  ];

  const industryLinks = [
    { id: "industrial-visits", label: "Industrial Visits" },
    { id: "mous", label: "MoUs & Collaborations" },
    { id: "patents", label: "Patents & Publications" },
    { id: "internships", label: "Internship Programs" },
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
                    "The Department of Electronics & Telecommunication Engineering was established in 1983. It offers B.E. in Electronics & Telecommunication Engineering and M.E. in Digital Electronics. The department is recognized as a research center for Ph.D. by Sant Gadge Baba Amravati University.",
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
                    "The department aims to produce competent engineers with high ethical values. We focus on academic excellence, technical skills, and overall personality development of students through various curricular and co-curricular activities.",
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

        {/* Courses Section - Table Format like CSE */}
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
                {/* BE */}
                <tr className="bg-white">
                  <td
                    colSpan={isEditing ? 3 : 2}
                    className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <EditableText
                        value={t(
                          "templateData.overview.headerBE",
                          "UG: B.E. Electronics and Telecommunication Engineering",
                        )}
                        onSave={(val) =>
                          updateField("templateData.overview.headerBE", val)
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

                {/* ME */}
                <tr className="bg-white">
                  <td
                    colSpan={isEditing ? 3 : 2}
                    className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200 mt-4"
                  >
                    <div className="flex justify-between items-center">
                      <EditableText
                        value={t(
                          "templateData.overview.headerME",
                          "PG: M.E. Digital Electronics",
                        )}
                        onSave={(val) =>
                          updateField("templateData.overview.headerME", val)
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
                          "Ph.D. in Electronics and Telecommunication Engineering",
                        )}
                        onSave={(val) =>
                          updateField("templateData.overview.headerPhD", val)
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
                value={t("hod.name", "Dr. D. D. Nawgaje")}
                onSave={(v) => updateField("hod.name", v)}
              />
            </div>
            <div className="text-sm text-gray-500">
              <EditableText
                value={t(
                  "hod.designation",
                  "Associate Professor & Head, Dept. of Electronics and Telecommunication Engineering",
                )}
                onSave={(v) => updateField("hod.designation", v)}
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
                            updateData("vision", current);
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
                            updateData("vision", arr);
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
                      updateData("vision", arr);
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
                        onSave={(val) =>
                          updateArrayString("mission", defaultMission, i, val)
                        }
                        placeholder="Click to edit mission item..."
                        className="w-full"
                      />
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const newMission = t(
                            "mission",
                            defaultMission,
                          ).filter((_, idx) => idx !== i);
                          updateData("mission", newMission);
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
                      const newMission = [
                        ...t("mission", defaultMission),
                        "New mission statement.",
                      ];
                      updateData("mission", newMission);
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
                        onSave={(val) =>
                          updateArrayString("peo", defaultPeo, i, val)
                        }
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
                          updateData("peo", arr);
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
                      updateData("peo", [
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
                    <div className="text-gray-700 leading-relaxed font-medium w-full">
                      <MarkdownEditor
                        value={item}
                        onSave={(val) =>
                          updateArrayString("pso", defaultPso, i, val)
                        }
                        placeholder="Click to edit PSO item..."
                        className="w-full"
                      />
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const arr = t("pso", defaultPso).filter(
                            (_, idx) => idx !== i,
                          );
                          updateData("pso", arr);
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
                      updateData("pso", [
                        ...t("pso", defaultPso),
                        "New program specific outcome.",
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
                                  updateData("po", updated);
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
                                updateData("po", updated);
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
                                updateData("po", arr);
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
                      updateData("po", [
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
                  B.E. (Electronics and Telecommunication Engineering)
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
                  M.E. (Digital Electronics)
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
                      src={t("hod.photo", hodPhoto)}
                      onSave={(url) => updateData("hod.photo", url)}
                      alt="HOD EnTC"
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  <EditableText
                    value={t("hod.name", defaultHodMessage.name)}
                    onSave={(val) => updateData("hod.name", val)}
                  />
                </h3>
                <p className="text-ssgmce-blue font-bold text-sm mt-1 uppercase tracking-wide">
                  <EditableText
                    value={t("hod.designation", defaultHodMessage.designation)}
                    onSave={(val) => updateData("hod.designation", val)}
                  />
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  <EditableText
                    value={t("hod.department", defaultHodMessage.department)}
                    onSave={(val) => updateData("hod.department", val)}
                  />
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-ssgmce-orange" />
                    <EditableText
                      value={t("hod.email", defaultHodMessage.email)}
                      onSave={(val) => updateData("hod.email", val)}
                    />
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-ssgmce-orange" />
                    <EditableText
                      value={t("hod.phone", defaultHodMessage.phone)}
                      onSave={(val) => updateData("hod.phone", val)}
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-ssgmce-blue rounded-full text-xs font-bold">
                    <EditableText
                      value={t(
                        "hod.specialization",
                        defaultHodMessage.specialization,
                      )}
                      onSave={(val) => updateData("hod.specialization", val)}
                    />
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-ssgmce-blue rounded-full text-xs font-bold">
                    <EditableText
                      value={t(
                        "hod.qualification",
                        defaultHodMessage.qualification,
                      )}
                      onSave={(val) => updateData("hod.qualification", val)}
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
                    "hod.message",
                    `The Department of Electronics and Telecommunication Engineering is one of the major departments of SSGMCE, Shegaon established in **1983** offering programs: **Under Graduate, Post Graduate and Ph.D.** It is affiliated to Sant Gadge Baba Amravati University, Amravati, recognized by AICTE, New Delhi and approved by DTE, Maharashtra.\n\nThe Undergraduate program of the Department of Electronics and Telecommunication Engineering has the recognition of being accredited **05 times by NBA, AICTE, New Delhi**. The post graduate program was also accredited once by NBA, AICTE, New Delhi. This achievement reflects our commitment to maintaining the highest standards of education and continuous improvement.\n\nAll the laboratories in the department are **well equipped** to run the program specific curriculum prescribed by the University. All laboratories are recognized and approved as research laboratories for Ph.D. work by SGB Amravati University. The department is having **qualified and experienced faculty members** dedicated to imparting quality education and fostering innovation among students.`,
                  )}
                  onSave={(val) => updateData("hod.message", val)}
                  placeholder="Click to edit HOD message (Markdown supported)..."
                  className="w-full"
                />
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    <EditableText
                      value={t(
                        "hod.signatureName",
                        defaultHodMessage.signatureName,
                      )}
                      onSave={(val) => updateData("hod.signatureName", val)}
                    />
                  </p>
                  <p className="text-sm text-gray-600">
                    <EditableText
                      value={t(
                        "hod.signatureTitle",
                        defaultHodMessage.signatureTitle,
                      )}
                      onSave={(val) => updateData("hod.signatureTitle", val)}
                    />
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 italic">
                    <EditableText
                      value={t(
                        "hod.collegeNameLine1",
                        defaultHodMessage.collegeNameLine1,
                      )}
                      onSave={(val) => updateData("hod.collegeNameLine1", val)}
                    />
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    <EditableText
                      value={t(
                        "hod.collegeNameLine2",
                        defaultHodMessage.collegeNameLine2,
                      )}
                      onSave={(val) => updateData("hod.collegeNameLine2", val)}
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
          {t("laboratories", defaultLabs).map((lab, index) => (
            <div
              key={index}
              className="grid md:grid-cols-12 border-b border-gray-200 last:border-b-0 relative"
            >
              {/* Delete Button */}
              {isEditing && (
                <button
                  onClick={() => {
                    const updated = t("laboratories", defaultLabs).filter(
                      (_, i) => i !== index,
                    );
                    updateData("laboratories", updated);
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
                    const updated = [...t("laboratories", defaultLabs)];
                    updated[index].image = url;
                    updateData("laboratories", updated);
                  }}
                  className="aspect-video w-full object-cover rounded-lg"
                  placeholder="Click to add image"
                />
                <h4 className="font-bold text-gray-800 text-center mt-4">
                  <EditableText
                    value={lab.name}
                    onSave={(val) => {
                      const updated = [...t("laboratories", defaultLabs)];
                      updated[index].name = val;
                      updateData("laboratories", updated);
                    }}
                  />
                </h4>
              </div>

              {/* Lab Details Column */}
              <div className="md:col-span-7 p-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-red-600 text-sm mb-2">
                      Computer Systems / Configuration:
                    </h5>
                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                      {isEditing ? (
                        <MarkdownEditor
                          value={lab.resources}
                          onSave={(val) => {
                            const updated = [...t("laboratories", defaultLabs)];
                            updated[index].resources = val;
                            updateData("laboratories", updated);
                          }}
                        />
                      ) : (
                        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                          {lab.resources}
                        </div>
                      )}
                    </div>
                  </div>
                  {(lab.facilities || isEditing) && (
                    <div>
                      <h5 className="font-semibold text-red-600 text-sm mb-2">
                        Other Resources / UPS:
                      </h5>
                      <div className="text-gray-700 text-sm leading-relaxed">
                        {isEditing ? (
                          <MarkdownEditor
                            value={lab.facilities || "Additional facilities..."}
                            onSave={(val) => {
                              const updated = [
                                ...t("laboratories", defaultLabs),
                              ];
                              updated[index].facilities = val;
                              updateData("laboratories", updated);
                            }}
                          />
                        ) : (
                          <div className="text-gray-700 text-sm leading-relaxed">
                            {lab.facilities}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
                    ...t("laboratories", defaultLabs),
                    {
                      name: "New Laboratory",
                      image: "",
                      resources:
                        "Computer systems and configuration details...",
                      facilities: "Other resources and UPS details...",
                    },
                  ];
                  updateData("laboratories", updated);
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

    "course-outcomes": (() => {
      const defaultBeSections = [
        {
          id: "be-sem3",
          label: "B.E. Semester-III",
          content: `### 3ECT01 Engineering Mathematics III

On completion of the course, the students will be able to:

1. Apply Laplace transform to solve differential equation.
2. Apply the knowledge of vector calculus to solve physical problems.
3. Apply the knowledge of complex analysis.
4. Apply the knowledge of Numerical analysis.
5. Apply the concepts of Difference Equations and Partial Differential Equations.
6. Apply the concepts of Difference Equations and Partial Differential Equations.

### 3ETC02 Electronic Devices and Circuits

On completion of the course, the students will be able to:

1. Apply the principles of PN Junction diode and filters (C, L, LC) to design rectifiers, voltage regulators and wave-shaping circuits.
2. Examine the response of wave shaping circuits, including RC filters, Clipping and Clamping circuits for step, pulse, square and sinusoidal
3. Utilise the Characteristics and parameters of BJT, JFET, MOSFET and UJT for switching and amplification applications. 3ETC02.4 Assess the roll of feedback in amplifiers in oscillator circuits using BJT and its impact on the frequency stability and analyze the performance of single stage and multi stage amplifier circuits using BJT for signal.

### 3ETC03 Digital System Design

On completion of the course, the students will be able to:

1. Apply Boolean algebra to simplify logic functions, minimize expressions, perform number system conversions, and execute arithmetic operations.
2. Design combinational and sequential circuits using logic gates, MSI chips, and programmable logic devices
3. Analyze digital logic families based on characteristics such as noise margin, propagation delay, and power dissipation.
4. Implement semiconductor memory architectures and programmable logic devices in digital system design.

### 3ETC04 Electromagnetic Waves

On completion of the course, the students will be able to:

1. Understand the coordinate systems and vector integrals.
2. Derive all four Maxwell's equations for steady and time varying fields and apply them to find boundary conditions.
3. Apply the Maxwell's equations to find the characteristics of Uniform Plane Waves.
4. Apply the Maxwell's equations to derive radiation resistance of Hertzian Dipole, Quarter wave Monopole and Half-wave Dipole antennas.

### 3ETC05 Object Oriented Programming

On completion of the course, the students will be able to:

1. Explain the basics of object-oriented programming concepts such as data types, functions, classes, objects, constructors, inheritance, overloading etc.
2. Design, implement, test, and debug simple programs in C++.
3. Demonstrate how the class mechanism supports encapsulation and information hiding.
4. Discuss the implementation of Java programming concepts

### 3ETC06 Electronic Devices and Circuits Lab

On completion of the course, the students will be able to:

1. Apply the basics of diode and Zener diode to obtain the characteristics and its use as rectifier and voltage regulator
2. Verify and analyze clipper circuit as wave shaping circuits and their responses to various signals.
3. Realise effect of positive and negative feedback theory for circuit as an oscillator and amplifier.
4. Analyze characteristics of JFET and UJT

### 3ETC07 Digital System Design Lab

On completion of the course, the students will be able to:

1. Apply practically the concepts of digital electronics.
2. Apply the operation of various logic gates and their implementation on combinational design using digital IC's.
3. Design and implement various combinational logic circuits.
4. Design and implement various sequential logic circuits.

### 3ETC08 Object Oriented Programming Lab

On completion of the course, the students will be able to:

1. Justify the basics of object-oriented design and the concepts of encapsulation, abstraction, inheritance, and polymorphism
2. Design, implement, test, and debug simple programs in an object-oriented programming language.
3. Describe how the class mechanism supports encapsulation and information hiding
4. Design and test the implementation of C++ and java programming concepts

### 3ETC09 Electronic Workshop Lab

On completion of the course, the students will be able to:

1. Understand measuring devices, types of cables and connectors, diodes, and sensors
2. Apply knowledge of measuring devices to RLC circuits, diodes, transistors, switches, and cables
3. Analyze circuits using simulation software
4. Apply basic knowledge of component to design and hardware implementation Evaluate`,
        },
        {
          id: "be-sem3-nep",
          label: "B.E. Semester-III (NEP)",
          content: `### 3ET200PC Electronic Devices and Circuits

On completion of the course, the students will be able to:

1. Understand the construction, working principles, Characteristics of semiconductor diodes and transistors including PN junction, Zener, LED, Photo diode, BJT, JFET, MOSFET, and UJT.
2. Apply semiconductor devices in circuits such as rectifiers, voltage regulators, clippers, clampers, amplifiers, and oscillators for electronic circuit design.
3. Analyze the performance of various BJT configurations and MOSFET/JFET devices using characteristic curves and small signal parameters.
4. Evaluate the impact of feedback in amplifier design and determine the suitability of different oscillator circuits for given applications based on frequency and stability requirements.

### 3ET201PC Electromagnetic Waves

On completion of the course, the students will be able to:

1. To understand the coordinate systems and vector integrals.
2. To derive all four Maxwell's equations for steady and time varying fields and apply them to find boundary conditions.
3. To apply the Maxwell's equations to find the characteristics of Uniform Plane Waves
4. To apply the Maxwell's equations to derive radiation resistance of Hertzian Dipole, Quarter wave Monopole and Half-wave Dipole antennas.

### 3ET202PC Signals and Systems

On completion of the course, the students will be able to:

1. Apply the continues time signals and systems mathematically and their classification along with the mathematical operations performed on them.
2. Analyze signals and systems in the frequency domain using Fourier series and Fourier transform techniques.
3. Use Laplace transform to analyze continuous-time and discrete-time systems, including system response and stability.
4. Evaluate the spectral characteristics of discrete-time signals and systems using DTFT and its properties.

### 3ET206OE Analog Communication

On completion of the course, the students will be able to:

1. Explain the Fundamentals of Analog Communication.
2. Illustrate the working of AM Generation and Demodulation.
3. Explain the FM Generation and Demodulation.
4. Explain the concept noise in Analog Communication.
5. Illustrate the working of Radio Receivers.
6. Explain the Fundamental concepts of Antenna.

### 3ET207EM Entrepreneurship Development

On completion of the course, the students will be able to:

1. Explain the fundamentals of entrepreneurship and its role in economic development.
2. Apply innovation and design thinking to develop business ideas.
3. Prepare a feasibility study and basic business plan for entrepreneurial ventures. Creating L6 3ME205M 3ME205M.1 Understand the properties, testing and inspection of engineering materials. Understanding L2 Basics of Mechanical Engineering
4. Summarize fundamental techniques and process used in energy conversion systems.
5. Understand various casting techniques and the importance of various metal forming processes.

### 3ME206OE Engineering Materials

On completion of the course, the students will be able to:

1. To illustrate the basic concepts of metallurgy and classification of materials and their applications.
2. To study the various mechanical properties and applications of engineering materials.
3. To explain application and properties of advanced materials like smarts materials, piezoelectric materials, superconducting materials etc.
4. To illustrate the properties and application of various types of steels.
5. To explain features, classification, application of newer class materials like biomaterials, composite materials etc.
6. To illustrate the concept of powder metallurgy and its industrial applications.

### 3CS205MD Foundations of Computing & Programming– III

On completion of the course, the students will be able to:

1. Understand computing systems and problem-solving logic
2. Apply algorithmic thinking to solve simple problems.
3. Implement basic programs using control structures and I/O operations. Applying L3 3EP206OE-I Power Supply System
4. Explain the working of thermal & Hydro-electric power plants.
5. Understand the basics of solar and wind energy and their conversion.
6. Demonstrate the knowledge of various types of substations and distribution systems.
7. Demonstrate the knowledge of electrical wiring installation and earthing system.

### 3IT302OE Cyber Law

On completion of the course, the students will be able to:

1. Apply basic computer and internet concepts to analyze their role in digital business and governance.
2. Apply knowledge of e-payment systems to select suitable methods for secure online transactions.
3. Identify types of cybercrimes and common techniques used by cyber offenders.
4. Categorize cybercrimes and relate them to relevant legal provisions.
5. Apply sections of the IT Act to given cyber law scenarios.
6. Describe ethical and security concerns associated with the use of digital technologies.`,
        },
        {
          id: "be-sem4",
          label: "B.E. Semester-IV",
          content: `### 4ETC01 Analog and Digital Communication

On completion of the course, the students will be able to:

1. Analyze AM (DSB-FC, DSB-SC, SSB-SC) and superheterodyne receivers for power efficiency, bandwidth, and fidelity in analog communication.
2. Apply the concepts of FM generation, demodulation, and comparison of FM and AM system performance.
3. Apply random process statistics and noise analysis to assess noise impact on communication, including FM threshold effects.
4. Utilize pulse modulation (PAM, PWM, PPM) and PCM to digitize analog signals while addressing issues like aliasing, quantization noise, and companding

### 4ETC02 Analog Circuits

On completion of the course, the students will be able to:

1. To understand the basic concepts and parameters of Op-Amp-741, Voltage regulator IC723, timer IC555 and PLL565.
2. To make use of Op-Amp for implementation of linear and non-linear applications.
3. To Analyze various analog circuits using IC741, IC723, IC555 and IC565.
4. To Design of various analog circuits using IC741, IC723, IC555 and IC565.

### 4ETC03 Network Theory

On completion of the course, the students will be able to:

1. Apply Mesh and Node analysis techniques to formulate and solve electrical circuit equations involving resistive, inductive, and capacitive components
2. Utilize appropriate Network Theorems to simplify and analyze electrical circuits for determining voltage, current, and power relationships
3. Construct and analyze oriented graphs of electrical networks using incidence, tie- set, and cut-set matrices to determine network currents and voltages systematically
4. Implement Laplace Transform techniques to solve electrical circuit problems involving initial conditions, transient responses, and steady-state behavior 4ETC03.5 Examine the characteristics of Two-Port networks by determining impedance, admittance, transmission, and hybrid parameters for analyzing interconnected circuits
5. Interpret network functions by evaluating poles and zeros, driving point functions, and transfer functions to predict circuit behavior in time and frequency domains

### 4ETC04 Signals and Systems

On completion of the course, the students will be able to:

1. Demonstarte the continuous-time signals and systems mathematically and illustrate their classification with the mathematical operations performed on them. 4ETC04.2 Analyze the spectral characteristics of continuous-time periodic signals and systems using Fourier series. Apply the spectral characteristics of continuous-time aperiodic signals and systems using Fourier Transform. 4ETC04.3 Apply the Laplace transform for analysis of continuous-time systems. Evaluate the classical Solution of Linear Difference Equations. Apply the discrete-time signals and systems mathematically and analyze their classifications.
2. Evaluate the spectral characteristics of Discrete Time signals and systems using DTFT and its properties Evaluate

### 4ETC05 Values and Ethics

On completion of the course, the students will be able to:

1. Understand Possibilities of better Life through Value education
2. Demostrate the concept of coexitance in life sitution
3. Develop harmony in nature through emphesis on dimensitions of human endeavor
4. Apply the concept of ethical human conduct

### 4ETC06 Analog and Digital Communication Lab

On completion of the course, the students will be able to:

1. Illustrate modulation and demodulation in communication system.
2. Analyze performance characteristics of AM/FM receiver.
3. Analyze the performance of digital communication system.
4. Model communication concepts using simulation software.

### 4ETC07 Analog Circuits Lab

On completion of the course, the students will be able to:

1. Demonstrate linear and nonlinear applications of Op-Amp
2. Design voltage regulators using IC723 and IC317
3. Analyze and design applicationn of timer IC555
4. Study characteristic of PLL using IC565

### 4ETC08 Network Theory Lab

On completion of the course, the students will be able to:

1. Apply knowledge of Mesh and Node analysis for a given network
2. Apply various network theorems to solve networks
3. Apply knowledge of Two Port network to analyze given network.
4. Apply knowledge of Network Functions to analyze given network.

### 4ETC09 Signal and Systems Lab

On completion of the course, the students will be able to:

1. Familiarize with the signal processing functions and verify each function.
2. Generate different types of signals and explore results to draw valid conclusions in Signal Processing.
3. Enable on how to evaluate the signal processing and system design using simulation tools.
4. Analyze signals using different transform methods.`,
        },
        {
          id: "be-sem5",
          label: "B.E. Semester-V",
          content: `### 5ETC01 Microcontroller

On completion of the course, the students will be able to:

1. Understand the architecture of 8085/8051 and advanced RISC processors
2. Analyze the assembly language programming algorithm using Instructions set and addressing modes
3. Develop a skill to write application-oriented algorithms
4. Apply the concepts of microcontroller for interfacing of peripheral devices

### 5ETC02 Control System

On completion of the course, the students will be able to:

1. Develop mathematical models of electrical, mechanical and electromechanical systems.
2. Build transfer functions using block diagrams reduction and signal flow graph.
3. Analyze stability of the LTI system using different techniques.
4. Solve state space models and its response using state variable method

### 5ETC03 Digital Signal Processing

On completion of the course, the students will be able to:

1. Apply the fundamental concepts of discrete-time signals and systems to perform signal operations and convolution
2. Analyze Z-transform properties and utilize them for system characterization and signal processing applications.
3. Implement DFT and FFT techniques for spectral analysis and circular convolution in digital signal processing.
4. Design FIR and IIR digital filters and examine the fundamentals of multirate digital signal processing.

### 5ETC04 Power Electronics (PE-I)

On completion of the course, the students will be able to:

1. Demostrate the characteristics of SCR and working of firing circuits.
2. Summarised Triac /Diac Power devices like Transistor, MOSFET and IGBT and force commutation techniques
3. Identify the AC to DC Phase control rectifiers and dual converters.
4. Identify DC to AC and DC to DC converters.
5. Examine the principle of Cyclo-converter and DC/universal motor Control

### 5ETC05 Fiber Optics Communication (PE-II)

On completion of the course, the students will be able to:

1. Illustrate the principles fiber-optic communication, the components and Losses and dispersion in fiber. Undersatnding
2. Explain the transmission characteristics of optical fiber Undersatnding
3. Express the properties of the optical components in sources.
4. Explain operation of lasers, LEDs, and detectors in fiber Undersatnding
5. Describe the aspects of optical fiber coupler and switches Undersatnding
6. Elaborate WDM and DWDM systems.

### 5ETC06 Microcontroller Lab

On completion of the course, the students will be able to:

1. Desrcibe the internal organization of Microprocessor and Microcontroller
2. Develop programing skill for applications of Microprocessor and Microcontroller
3. Experiment with interfacing of IO devices with Microcontroller
4. Apply the concepts of microcontroller for interfacing of peripheral devices

### 5ETC07 Digital Signal Processing Lab

On completion of the course, the students will be able to:

1. Apply the basic concepts of signal and its sampling for digital signal processing Applying (L3),
2. Apply DFT and IDFT for the analysis of digital signals and systems. Applying (L3),
3. Design FIR, IIR filters for digital signal processing.
4. Understand the basics of Multirate Digital Signal Processing.

### 5ETC08 Power Electronics Lab

On completion of the course, the students will be able to:

1. Understand the various power electronics devices and their characteristics.
2. Analyse the Triggering of SCR techniques.
3. Illlustrate commutation and DC to AC inverter techniques.
4. Understand the operation of AC to DC converters.
5. Know operation of various DC and AC motors and their applications.

### 5ETC09 Electronic Lab based on Instrumentation

On completion of the course, the students will be able to:

1. Select temperature transducers for different ranges of temperature measurement
2. Utilize displacement transducers in various applications
3. Utilize piezoelectric transducers for pressure measurement
4. Utilize strain guage for strain measurement`,
        },
        {
          id: "be-sem6",
          label: "B.E. Semester-VI",
          content: `### 6ETC01 Communication Network

On completion of the course, the students will be able to:

1. Classify types of network devices, OSI and TCP/IP model.layes and their functions.
2. Illustrate basic functions of data link control and media access control protocol.
3. Analyze routing strategies for an IP based network.
4. Compair the concepts of reliable and unreliable transfer protocols in TCP and UDP and Demonstrate application layer Protocols.

### 6ETC02 Computer Architecture

On completion of the course, the students will be able to:

1. Describe the working and the performance parameters of the computers
2. Design efficient ALU operations using processor organization, number formats, and IEEE 754 standards.
3. Analyze micro-operation control unit, hardwired vs. micro-program control unit, and microinstruction execution
4. Apply memory management concepts in system design.
5. Describe I/O organization and parallel processing concepts in system design

### 6ETC03 Satellite Communication

On completion of the course, the students will be able to:

1. Apply satellite communication principles to solve engineering problems
2. Utilize fundamental theories of orbital mechanics and link budget analysis
3. Analyze satellite subsystems, propagation effects, and system performance
4. Explain satellite-based communication VSAT and GPS systems Undersatnding

### 6ETC03 CMOS Design

On completion of the course, the students will be able to:

1. Apply CMOS circuit concepts to analyze transistor operation, inverter behavior, and switching characteristics
2. Construct CMOS layouts and stick diagrams using lambda-based design rules.
3. Analyze CMOS circuit performance parameters, including delay models, power consumption, and interconnect effects.
4. Implement combinational circuit designs using CMOS logic families, transmissions gates, and pass transistor logic.
5. Design sequential circuits such as latches, flip-flops, and memory elements using CMOS technology.
6. Utilize Domino and NORA dynamic logic methods for CMOS circuit implementation.

### 6ETC05 Engineering Economics

On completion of the course, the students will be able to:

1. Demonstrate the application of production theories, cost analysis, and price determination to solve real-world engineering and industrial problems.
2. Analyze depreciation methods, break-even analysis, and banking functions to determine their impact on financial sustainability and engineering projects. 6ETC05.4 Evaluate time value of money concepts, cash flow techniques, and project evaluation methods to analyze financial alternatives and make informed investment decisions.

### 6FEEP06 Energy Audit and Management

On completion of the course, the students will be able to:

1. Discuss energy scenario and it's management.
2. Conduct the energy audit of different systems.
3. Determine the economics of energy conservation
4. Discuss various energy Conservation methods & their case studies
5. Explain fundamentals of Harmonics.

### 6ETC06 Communication Network Lab

On completion of the course, the students will be able to:

1. Categorize different networking devices and topologies
2. Configure computer networks using different devices and topologiesTo construct and configure a network.
3. Implement computer network for sharing various resources
4. Configure Wireless network

### 6ETC07 Electronics Circuit Design Lab

On completion of the course, the students will be able to:

1. Design and verify CMOS layouts for logic gates and sequential circuits using ASIC tools.
2. Analyze timing and performance of CMOS circuits through simulations.
3. Write and simulate Verilog code for combinational circuits like decoders and multiplexers.
4. Write and simulate Verilog code for sequential circuits like flip-flops, counters, and sequence detectors.

### 6ETC08 Python Programming Lab

On completion of the course, the students will be able to:

1. Implement fundamental Python programming concepts to solve problems
2. Apply file handling and string operations to solve real-world problems.
3. Demonstrate proficiency in data manipulation using Python collections
4. Analyze data using Python

### 6ETC09 Mini Project

On completion of the course, the students will be able to:

1. Identify problems based on societal /research needs
2. Apply Knowledge and skill to solve societal problems in a group
3. Develop interpersonal skills to work as member of a group or leader
4. Analyze the impact of solutions in societal and environmental context for sustainable development
5. Conclude project presetnation with results and management principles`,
        },
        {
          id: "be-sem7",
          label: "B.E. Semester-VII",
          content: `### 7ETC01 Cryptography and Network Security

On completion of the course, the students will be able to:

1. Analyze concepts of security and ciphers
2. Interprete the working of encryption and decryption algorithms
3. Apply authentication functions and hash algorithms
4. Understand the concepts of email and transport security

### 7ETC02 Digital Image & Video Processing

On completion of the course, the students will be able to:

1. Analyze and implement digital image processing algorithms. Develop spatial filtering and other filtering techniques for preprocessing of images. 7ETC02.3 Implement the intensity transformations and various image transforms, Fourier transform for image processing in frequency domain and filtering techniques in Fourier Domain.
2. Evaluate the methodologies for image segmentation, Compression and restoration etc. Also design Image processing techniques with practical approach.

### 7ETC03 Project Management and Entrepreneurship

On completion of the course, the students will be able to:

1. Understand basic concept of Project management.
2. Attain the knowledge of cost estimation & working capital.
3. Prepare Cost Sheets, balance sheets and Cash Flow statements.
4. Understand the Entrepreneurial competencies & traits.
5. Discuss the Management skills for Entrepreneurs.
6. Understand Social Entrepreneurship.

### 7ETC04 Mobile Communication and Networks

On completion of the course, the students will be able to:

1. Explain basic concept of Cellular systems and standards
2. Apply knowledge of signal propagation models to predict wireless communication performance in different environments.
3. Implement multiple access techniques in mobile communication and demonstrate advanced knowledge of MIMO through practical applications
4. Describe the concept of rake receiver and Know various Mobile Communication Systems and standards

### 7ETC05 Introduction to MEMS

On completion of the course, the students will be able to:

1. Apply the concepts of MEMS for project, research and academic work.
2. Analyze the miniaturization issues and MEMS Materials
3. Evaluate the principles of solid mechanics in MEMS/NEMS, sensors and actuators
4. Elaborate fabrication modules of MEMS for Electronics, automotive and medical application

### 7ETC06 Cryptography and Network Security LAB

On completion of the course, the students will be able to:

1. To evaluate working of ciphers
2. To analyze encryption and decryption algorithms
3. To experiment with authentication and hash functions
4. To Apply the consepts of nework security

### 7ETC07 Digital Image & Video Processing Lab

On completion of the course, the students will be able to:

1. Demonstarte the image formation and apply the basic operations and histogram equalization on an image.
2. Apply the gray scale image in spatial domain and apply arithmetic and logical operations on gray scale image. 7ETC07.3 Implement the thresholding techniques and frequency domain filtering on the gray scale image. Implement the morphological opearations and edge detection operations on an image.
3. Create a Video from images frames and implement and Video object detection and tracking for an application.

### 7ETC08 Project Management and Entrepreneurship LAB

On completion of the course, the students will be able to:

1. To analyze technical feasibility, Environmental and market feasibility.
2. To interprete quickly about a new industry, technology, market.
3. To apply academic knowledge to the problems faced by entrepreneurial firms in a context of uncertainty, costing and financial statement.
4. To interpret different theories and models of entrepreneurship.

### 7ETC09 Seminar

On completion of the course, the students will be able to:

1. Deliver seminar content logically to ensure clarity in objectives and coherence in information flow.
2. Demonstrate in-depth understanding of the seminar topic by explaining key concepts with clarity and elaboration.
3. Apply effective presentation and communication techniques to engage the audience professionally.
4. Create clear and visually appealing presentation materials to enhance understanding.
5. Analyse and respond to audience queries with logical reasoning and critical thinking.`,
        },
        {
          id: "be-sem8",
          label: "B.E. Semester-VIII",
          content: `### 8ETC01 Embedded Systems

On completion of the course, the students will be able to:

1. Apply the concepts and quality attributes of Embedded Systems
2. Apply the architecture and inbuilt peripherals of AVR Microcontroller to design the application
3. Analyze the programming of AVR Microcontroller in C for various applicattion
4. Apply the concepts of RTOs and debugging in embedded systems application

### 8ETC02 Microwave Theory & Techniques

On completion of the course, the students will be able to:

1. Applying the Operations of Microwave Active, Passive, and Semiconductor Microwave Devices in practical applications.
2. Analyze the Characteristics of Microwave Propagation in Waveguides and Parallel Microstrip Lines
3. Apply the Operations of Microwave Resonators in Practical Applications.
4. Analyze the use of S-parameters for the characterization of microwave devices and evaluate various parameters of a microwave system through measurement.

### 8ETC03 Wireless Sensor Network

On completion of the course, the students will be able to:

1. Demonstrate the basics of Ad-hoc networks and Wireless sensor networks
2. Explain the architecture and placement strategies of Sensors
3. Analyze topology and MAC layer protocols used in wireless sensor network
4. Apply the knowledge for suitable routing protocols based on network and user requirement.
5. Analyze Protocols for congestion and flow control in sensor networks
6. Develop solutions to real world problems using Wireless sensor devices

### 8ETC04 5G-6G Mobile Communication

On completion of the course, the students will be able to:

1. Construct a comparative analysis of LTE and 5G by identifying key technological advancements and designing potential use case applications.
2. Analyze RF front-end technologies, including millimeter wave communication, massive MIMO, and beamforming techniques.
3. Implement different 5G radio access technologies, waveforms, and wireless propagation channel models for various applications. 8ETC04.4 Develop a comparative framework for 5G and 6G architectures by analyzing their key building blocks and designing potential applications for future communication systems.

### 8ETC05 Embedded Systems Lab

On completion of the course, the students will be able to:

1. Design and implement embedded systems using microcontrollers and other embedded components, including hardware and software design.
2. Develope efficient and optimized C++ code for microcontrollers, utilizing peripherals such as GPIO, timers, interrupts
3. Analyze the performance of an embedded system in terms of memory usage, and execution time
4. Design a system with interfacing various sensors, actuators, and communication modules with a microcontroller to build functional embedded systems

### 8ETC06 Microwave Theory & Techniques Lab

On completion of the course, the students will be able to:

1. Analyze the characteristics of microwave transmission lines and components, including microstrip lines, attenuators, power dividers.
2. Evaluate the working principles of advanced microwave network components, such as E-plane, H-plane, Magic Tee, directional couplers, and circulators. Evaluate 8ETC06.4 Apply measurement techniques for microwave parameters, including frequency measurement using slotted lines, power-frequency relationships, and attenuation, to assess system performance.

### 8ETC07 Project

On completion of the course, the students will be able to:

1. Analyze relevant literature and define a research problem with well-formulated objectives.
2. Plan and execute the project using appropriate methodologies and systematic work distribution.
3. Demonstrate technical profiency through structured presentations, demonstrations, and effective communication.
4. Interpret and analyze feedback, refine project implementation and present meaningful results and conclusions.
5. Exhibit professional ethics, teamwork, and project documentation skills through effective report writing and participation in research dissemination activities.`,
        },
      ];

      const defaultMeSections = [
        {
          id: "me-sem1",
          label: "M.E. Semester-I",
          content: `### 1UMEF-1/2UMEP-1- Digital Instrumentation

On completion of the course, the students will be able to:

1. Design and implement the various digital measurement techniques, display and recording systems..
2. Comprehend the knowledge of the concept of digital signal analysis & analyzers.
3. Comprehend the knowledge of smart sensors/digital sensors and smart or automatic test equipment's and reliability.
4. Design and implementation of digital controllers, Programmable Logic controller and its functions.
5. Design of various biomedical instrumentation systems.

### 1UMEF2-Advanced Digital Signal Processing

On completion of the course, the students will be able to:

1. Understand the various analysis techniques of discrete time signals..
2. Analyse the finite impulse and infinite impulse response filters
3. Understand the implementation of sampling rate converters.
4. Develop the various adaptive filtering and two dimension transformation algorithms

### 1UMEF3- Modern Electronic Design Techniques

On completion of the course, the students will be able to:

1. Understand isolation and Design techniques for amplifiers.
2. Design buck, boost, buck-boost their control techniques
3. Understand Communication and Control System Design
4. Understand design of Portable Electronic System
5. Understand design of Electronic System for Production

### 1UMEF4- Digital Communication Technique

On completion of the course, the students will be able to:

1. Understand the fundamental and advanced concepts of digital communication systems including the digital transmission over fading channels.
2. Solve the problems associated with various impairments in digital communication systems.
3. Study and analyse the effects of channel bandwidth and channel noise on transmitted waveform.
4. Design optimum receivers for a given signal-space structure for additive Gaussian channels and assess performance of digital communication receivers for additive Gaussian channels.
5. Analyse the effect of ISI and Equalization in digital communication.
6. Apply the knowledge to analyse the digital communication system with spread spectrum modulation

### 1UMEF5- Embedded System Design

On completion of the course, the students will be able to:

1. Explain architecture of Microcontroller
2. Distinguish real-time embedded systems from other systems.
3. Evaluate the need for real-time operating system
4. Interpret real-time algorithm for task scheduling.
5. Summarize technique used for product enclosure design and development`,
        },
        {
          id: "me-sem2",
          label: "M.E. Semester-II",
          content: `### 2UMEF1- Digital Image Processing

On completion of the course, the students will be able to:

1. Understand and analyze basic terminology of digital image processing, elements of visual perception, image quantization, image types. Zoom operation, Basic gray level Transformations, Histogram Processing, etc
2. Examine and analyze various types of images, intensity transformations, and various spatial domain image transforms. Analyze Arithmetic and logic operations, spatial domain filtering, bit-plane slicing, median filter, color image processing, fundaments, and color image models.
3. Examine and analyze the 2D Fourier transform and other frequency domain transformation and enhancement techniques. Examine and analyze the Image Restoration and Denoising models for image enhancement.
4. Evaluate and apply the methodologies for image segmentation, image Compression, and restoration etc. Analyze the image morphological techniques. Create a term/mini- project for practical applications to image processing.

### 2UMEF2- CMOS VLSI Design

On completion of the course, the students will be able to:

1. Build upon the theoretical, mathematical and physical analysis of digital VLSI circuits, for proper understanding of concept, working and analysis
2. Analyze the various analog integrated circuits
3. Analyse the various RF integrated circuits
4. Understand the various partitioning ,floor planning and placement algorithms in ASIC. 4UMEP1 / 2UMEF3- Parallel Computing

### 2UMEF4- Artificial Intelligent System

On completion of the course, the students will be able to:

1. Develop algorithms for supervised and unsupervised ANN
2. Implement the ANN concepts to solve real life problems
3. Analyze the ANN network.
4. Develop algorithms in fuzzy logic for applications such as pattern recognition
5. Implement the fuzzy logic concepts to solve real life problems.

### 2UMEF5- High Speed Digital System Design

On completion of the course, the students will be able to:

1. Understand fundamentals of transmission line , cross talk estimation and minimization.
2. Aware about non ideal interconnect issues and transmission line losses
3. Understand non ideal return paths , switching losses and different design methodology.
4. Know about the buffer modelling , timing analysis and high speed measurements techniques .`,
        },
      ];

      const beSections = t("courseOutcomes.beSections", defaultBeSections);
      const meSections = t("courseOutcomes.meSections", defaultMeSections);

      const updateBeSections = (updated) =>
        updateField("courseOutcomes.beSections", updated);
      const updateMeSections = (updated) =>
        updateField("courseOutcomes.meSections", updated);

      const insertSection = (sections, afterIdx, onUpdate) => {
        const newSection = {
          id: `custom-${Date.now()}`,
          label: "New Semester",
          content: "",
        };
        const updated = [...sections];
        updated.splice(afterIdx + 1, 0, newSection);
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
              Comprehensive course outcomes for all semesters of B.E.
              Electronics &amp; Telecommunication Engineering and M.E.
              (Electronics)
            </p>
          </div>

          {/* B.E. Course Outcomes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#003366] px-6 py-4 text-center">
              <h3 className="text-xl font-bold text-white">
                B.E. Electronics &amp; Telecommunication Engineering - Course
                Outcomes
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
                M.E. (Electronics) - Course Outcomes
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
                entcPrideGateToMarkdown(t("pride.gate", defaultPrideGate)),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.gateMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/entc_gate_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <EntcPrideMdView markdown={md} />
              );
            })()}

          {/* University Toppers */}
          {prideTab === "toppers" &&
            (() => {
              const md = t(
                "pride.toppersMarkdown",
                entcPrideToppersToMarkdown({
                  be: t("pride.toppers.be", defaultPrideToppersBE),
                  me: t("pride.toppers.me", defaultPrideToppersME),
                }),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.toppersMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/entc_toppers_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <EntcPrideMdView markdown={md} />
              );
            })()}

          {/* Top Alumni */}
          {prideTab === "alumni" &&
            (() => {
              const md = t(
                "pride.alumniMarkdown",
                entcPrideAlumniToMarkdown(
                  t("pride.alumni", defaultPrideAlumni),
                  t("pride.alumniTitle", "Top Alumnis of Department"),
                ),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.alumniMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/entc_alumni_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <EntcPrideMdView markdown={md} />
              );
            })()}
        </motion.div>
      </div>
    ),

    "best-projects": (() => {
      const md = t(
        "studentProjects.markdown",
        entcStudentProjectsToMarkdown(defaultStudentProjects),
      );
      return (
        <div className="space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Student's Best Projects
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
            <p className="text-gray-600 mt-3">
              Award-Winning Projects by Our Students
            </p>
          </div>
          {isEditing ? (
            <MarkdownEditor
              value={md}
              onSave={(v) => updateData("studentProjects.markdown", v)}
              showDocImport
              docTemplateUrl="/uploads/documents/pride_templates/entc_projects_template.docx"
              docTemplateLabel="Download Projects Template"
              placeholder="Student projects tables by year (GFM Markdown)..."
            />
          ) : (
            <EntcPrideMdView markdown={md} />
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
              value={t("activities.title", "Co-Curricular Activities")}
              onSave={(val) => updateField("activities.title", val)}
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
                      src={getLocalEntcActivityImageUrl(activity.image)}
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

        {activitiesData.length > 6 && (
          <div className="text-center pt-2">
            <button
              onClick={() => {
                setActivitiesVisible((prev) =>
                  prev >= activitiesData.length ? 6 : prev + 6,
                );
              }}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
            >
              {activitiesVisible >= activitiesData.length
                ? "Show Less"
                : `Show More (${activitiesData.length - activitiesVisible} remaining)`}
            </button>
          </div>
        )}

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
                  src={
                    getLocalEntcActivityImageUrl(
                      activitiesData[lightboxActivity]?.image,
                    )
                  }
                  alt={activitiesData[lightboxActivity]?.title}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />

                <div className="text-white text-center mt-3 text-sm">
                  {activitiesData[lightboxActivity]?.title}
                </div>

                {lightboxActivity > 0 && (
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/40 rounded-full p-2 hover:bg-black/60"
                    onClick={() =>
                      setLightboxActivity((prev) => Math.max(0, prev - 1))
                    }
                  >
                    <FaChevronLeft />
                  </button>
                )}

                {lightboxActivity < activitiesData.length - 1 && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/40 rounded-full p-2 hover:bg-black/60"
                    onClick={() =>
                      setLightboxActivity((prev) =>
                        Math.min(activitiesData.length - 1, prev + 1),
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
              Department of Electronics &amp; Telecommunication Engineering
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

    faculty: (
      <div className="space-y-10">
        <div className="text-center border-b border-gray-200 pb-6 mb-8">
          <h3 className="text-3xl font-bold text-gray-900">
            <EditableText
              value={t("templateData.faculty.title", "Our Faculty")}
              onSave={(val) => updateField("templateData.faculty.title", val)}
            />
          </h3>
          <p className="text-gray-500 mt-2">
            <EditableText
              value={t(
                "templateData.faculty.subtitle",
                "Department of Electronics & Telecommunication Engineering",
              )}
              onSave={(val) =>
                updateField("templateData.faculty.subtitle", val)
              }
            />
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {getFacultyList().map((fac, i) => {
            const facultyImages = {
              DN,
              KBK,
              RSD,
              MNT,
              SBP,
              VMU,
              DLB,
              BPH,
              DPT,
              AND,
              VKB,
              KTK,
              KSV,
              SPB,
              TPM,
              SGN,
              VSI,
              AAD,
              HBP,
              RSM,
              NSD,
              MBD,
              SPS,
              GK,
            };
            const resolvedPhoto = facultyImages[fac.photo] || fac.photo;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex relative ${
                  isEditing && expandedFacultyEditorIndex === i
                    ? "lg:col-span-2"
                    : ""
                }`}
              >
                {isEditing && (
                  <button
                    onClick={() => {
                      updateFacultyList((list) =>
                        list.filter((_, idx) => idx !== i),
                      );
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md transition-colors z-10"
                    title="Remove faculty member"
                  >
                    Remove
                  </button>
                )}
                {/* Image Area - Fixed Width */}
                <div className="w-32 sm:w-40 bg-gray-50 flex-shrink-0 relative overflow-hidden border-r border-gray-100">
                  {resolvedPhoto ? (
                    <EditableImage
                      src={resolvedPhoto}
                      onSave={(val) =>
                        updateFacultyList((list) => {
                          list[i] = { ...list[i], photo: val };
                          return list;
                        })
                      }
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
                    {fac.id && !fac.isIndustry ? (
                      <Link
                        to={`/faculty/${fac.id}`}
                        state={{ from: getPathWithTab(location, "faculty") }}
                        className="hover:underline"
                      >
                        <EditableText
                          value={fac.name}
                          onSave={(val) =>
                            updateFacultyList((list) => {
                              list[i] = { ...list[i], name: val };
                              return list;
                            })
                          }
                        />
                      </Link>
                    ) : (
                      <EditableText
                        value={fac.name}
                        onSave={(val) =>
                          updateFacultyList((list) => {
                            list[i] = { ...list[i], name: val };
                            return list;
                          })
                        }
                      />
                    )}
                  </h4>
                  <p className="text-ssgmce-blue font-medium text-sm mb-3 uppercase tracking-wide text-[11px]">
                    <EditableText
                      value={fac.role}
                      onSave={(val) =>
                        updateFacultyList((list) => {
                          list[i] = { ...list[i], role: val };
                          return list;
                        })
                      }
                    />
                  </p>

                  {/* Compact Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    {fac.area && (
                      <p className="line-clamp-2 text-xs">
                        <span className="font-bold text-gray-700">Area: </span>
                        <EditableText
                          value={fac.area.join(", ")}
                          onSave={(val) =>
                            updateFacultyList((list) => {
                              list[i] = {
                                ...list[i],
                                area: val
                                  .split(",")
                                  .map((item) => item.trim())
                                  .filter(Boolean),
                              };
                              return list;
                            })
                          }
                        />
                      </p>
                    )}

                    <div className="pt-2 flex flex-col gap-1">
                      {fac.email && (
                        <div className="flex items-center hover:text-ssgmce-blue transition-colors truncate text-xs">
                          <FaEnvelope className="mr-2 text-gray-400" />
                          <EditableText
                            value={fac.email}
                            onSave={(val) =>
                              updateFacultyList((list) => {
                                list[i] = { ...list[i], email: val };
                                return list;
                              })
                            }
                          />
                        </div>
                      )}
                      {fac.phone && (
                        <span className="flex items-center text-xs">
                          <FaPhone className="mr-2 text-gray-400" />
                          <EditableText
                            value={fac.phone}
                            onSave={(val) =>
                              updateFacultyList((list) => {
                                list[i] = { ...list[i], phone: val };
                                return list;
                              })
                            }
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
                    {fac.id && !fac.isIndustry && (
                      <Link
                        to={`/faculty/${fac.id}`}
                        state={{ from: getPathWithTab(location, "faculty") }}
                        className="inline-flex items-center text-[10px] font-bold text-ssgmce-blue mt-1 hover:underline uppercase tracking-wide"
                      >
                        View Profile <FaAngleRight className="ml-1" />
                      </Link>
                    )}
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
                                  updateFacultyList((list) => {
                                    list[i] = {
                                      ...list[i],
                                      id: createFacultySlug(val),
                                    };
                                    return list;
                                  })
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
                                  updateFacultyList((list) => {
                                    list[i] = { ...list[i], vidwanId: val };
                                    return list;
                                  })
                                }
                              />
                            </div>
                            <div className="md:col-span-2">
                              <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">
                                Vidwan Link
                              </div>
                              <EditableText
                                value={fac.vidwanLink || ""}
                                onSave={(val) =>
                                  updateFacultyList((list) => {
                                    list[i] = { ...list[i], vidwanLink: val };
                                    return list;
                                  })
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
                                    updateFacultyList((list) => {
                                      list[i] = {
                                        ...list[i],
                                        [field]: isList
                                          ? splitFacultyMultiline(val)
                                          : val,
                                      };
                                      return list;
                                    })
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
            );
          })}
          {isEditing && (
            <button
              onClick={() => {
                const newMember = {
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
                  department: "entc",
                };
                updateFacultyList((list) => [...list, newMember]);
              }}
              className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
            >
              + Add Faculty
            </button>
          )}
        </div>
      </div>
    ),

    staff: (() => {
      const staffData = getStaffList();
      const staffImages = {
        VGP,
        MYK,
        SAA,
        ASA,
        SBS,
        JSK,
        KKT,
        GOT,
        ALN,
        SAR,
        PBB,
        KRK,
        DBB,
        MUS,
      };

      return (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-ssgmce-orange pl-4">
              <EditableText
                value={t("templateData.staff.title", "Staff @ Department")}
                onSave={(val) => updateData("templateData.staff.title", val)}
              />
            </h3>
            <p className="text-gray-500 text-sm mt-2 pl-5">
              <EditableText
                value={t(
                  "templateData.staff.subtitle",
                  "Non-teaching staff members of the Electronics & Telecommunication Engineering Department.",
                )}
                onSave={(val) =>
                  updateData("templateData.staff.subtitle", val)
                }
              />
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {staffData.map((staff, i) => {
              const resolvedPhoto = staffImages[staff.photo] || staff.photo;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex relative"
                >
                  {isEditing && (
                    <button
                      onClick={() => {
                        updateStaffList((list) =>
                          list.filter((_, idx) => idx !== i),
                        );
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md transition-colors z-10"
                      title="Remove staff member"
                    >
                      Remove
                    </button>
                  )}
                  {/* Image Area */}
                  <div className="w-32 sm:w-40 bg-gray-50 flex-shrink-0 relative overflow-hidden border-r border-gray-100">
                    {resolvedPhoto ? (
                      <EditableImage
                        src={resolvedPhoto}
                        onSave={(val) =>
                          updateStaffList((list) => {
                            list[i] = { ...list[i], photo: val };
                            return list;
                          })
                        }
                        alt={staff.name}
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
                      <EditableText
                        value={staff.name}
                        onSave={(val) =>
                          updateStaffList((list) => {
                            list[i] = { ...list[i], name: val };
                            return list;
                          })
                        }
                      />
                    </h4>
                    <p className="text-ssgmce-blue font-medium text-sm uppercase tracking-wide text-[11px] mt-1">
                      <EditableText
                        value={staff.role}
                        onSave={(val) =>
                          updateStaffList((list) => {
                            list[i] = { ...list[i], role: val };
                            return list;
                          })
                        }
                      />
                    </p>
                  </div>
                </motion.div>
              );
            })}
            {isEditing && (
              <button
                onClick={() => {
                  updateStaffList((list) => [
                    ...list,
                    {
                      name: "New Staff Member",
                      role: "Lab Assistant",
                      photo: "",
                    },
                  ]);
                }}
                className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
              >
                <FaPlus className="text-xs" />
                Add Staff
              </button>
            )}
          </div>
        </div>
      );
    })(),

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
                Department of Electronics & Telecommunication Engineering
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
                              Drive Link
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
                              placeholder="Paste the shared Drive link here..."
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
                          <FaDownload className="text-xs" /> Access Drive
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
            Click on "Access Drive" to view and download course materials from
            the respective year's shared folder.
          </div>
        </motion.div>
      </div>
    ),

    magazines: (
      <div className="space-y-8">
        {/* Magazines Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-50 text-ssgmce-orange rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm">
            <FaBook />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            <EditableText
              value={t("magazines.title", "Department Magazines")}
              onSave={(val) => updateData("magazines.title", val)}
            />
          </h3>
          <div className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            <EditableText
              value={t(
                "magazines.description",
                "Srujjan - the department magazine featuring student creativity, technical articles, achievements, and department highlights.",
              )}
              onSave={(val) => updateData("magazines.description", val)}
              multiline
            />
          </div>
        </div>

        {/* Magazine Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-wide">Magazine</h3>
              <p className="text-sm text-gray-300 mt-1">
                Department of Electronics & Telecommunication Engineering
              </p>
            </div>
            <div className="flex items-center gap-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={addMagazine}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <FaPlus className="text-xs" />
                  Add Magazine
                </button>
              )}
              <FaDownload className="text-4xl text-orange-200 opacity-40" />
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
                <tr className="hover:bg-orange-50/30 transition-colors bg-orange-50/10">
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
                              latestMagazineData.title ||
                              defaultMagazines.latest.title ||
                              "Srujjan Magazine 2024-25"
                            }
                            onSave={(val) =>
                              updateMagazine("latest", 0, "title", val)
                            }
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isEditing ? (
                        <div className="flex flex-col items-center gap-2">
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-orange-50 px-4 py-2 text-xs font-medium text-ssgmce-orange transition-all hover:border-orange-400 hover:bg-orange-100">
                            <FaUpload className="text-xs" />
                            {magazineUploading["latest-0"]
                              ? "Uploading..."
                              : "Upload PDF"}
                            <input
                              type="file"
                              accept="application/pdf"
                              className="hidden"
                              disabled={magazineUploading["latest-0"]}
                              onChange={(event) =>
                                handleMagazineFileChange("latest", 0, event)
                              }
                            />
                          </label>
                          {(latestMagazineData.link ||
                            latestMagazineData.sourceUrl) && (
                            <a
                              href={resolveMagazineHref(latestMagazineData)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-ssgmce-orange underline underline-offset-2"
                            >
                              {getMagazineFileName(latestMagazineData)}
                            </a>
                          )}
                          {magazineUploadErrors["latest-0"] && (
                            <span className="text-center text-[11px] text-red-500">
                              {magazineUploadErrors["latest-0"]}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteMagazine("latest", 0)}
                            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                          >
                            <FaTrash className="text-xs" />
                            Delete
                          </button>
                        </div>
                      ) : (
                        <a
                          href={resolveMagazineHref(latestMagazineData)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-ssgmce-blue hover:text-ssgmce-orange font-medium text-xs border border-gray-200 hover:border-orange-400 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-full transition-all"
                        >
                          <FaDownload className="text-xs" /> Click for Details
                        </a>
                      )}
                    </td>
                  </tr>

                  {/* Archive Rows */}
                {magazineArchivesData.map((issue, i) => (
                    <tr
                      key={i}
                      className="hover:bg-orange-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-center font-mono text-gray-400">
                        {i + 2}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-700">
                          <EditableText
                            value={issue.title}
                            onSave={(val) =>
                              updateMagazine("archives", i, "title", val)
                            }
                          />
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isEditing ? (
                          <div className="flex flex-col items-center gap-2">
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-orange-50 px-4 py-2 text-xs font-medium text-ssgmce-orange transition-all hover:border-orange-400 hover:bg-orange-100">
                              <FaUpload className="text-xs" />
                              {magazineUploading[`archives-${i}`]
                                ? "Uploading..."
                                : "Upload PDF"}
                              <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                disabled={magazineUploading[`archives-${i}`]}
                                onChange={(event) =>
                                  handleMagazineFileChange("archives", i, event)
                                }
                              />
                            </label>
                            {(issue.link || issue.sourceUrl) && (
                              <a
                                href={resolveMagazineHref(issue)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-medium text-ssgmce-orange underline underline-offset-2"
                              >
                                {getMagazineFileName(issue)}
                              </a>
                            )}
                            {magazineUploadErrors[`archives-${i}`] && (
                              <span className="text-center text-[11px] text-red-500">
                                {magazineUploadErrors[`archives-${i}`]}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => deleteMagazine("archives", i)}
                              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                            >
                              <FaTrash className="text-xs" />
                              Delete
                            </button>
                          </div>
                        ) : (
                          <a
                            href={resolveMagazineHref(issue)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-ssgmce-blue hover:text-ssgmce-orange font-medium text-xs border border-gray-200 hover:border-orange-400 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-full transition-all"
                          >
                            <FaDownload className="text-xs" /> Click for Details
                          </a>
                        )}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-xs text-gray-400 text-center bg-gray-50 border-t border-gray-100">
            Click on "Click for Details" to view/download the magazine PDF.
          </div>
        </motion.div>
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
            storedMarkdown ||
            entcInnovativePracticesToMarkdown(defaultPractices);

          // Prefer saved CMS data and only fall back to bundled defaults
          // when neither markdown nor stored structured data is available.
          const parsedPractices = entcMarkdownToInnovativePractices(md);
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
                          entcInnovativePracticesToMarkdown(nextPractices);
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
                      const parsed = entcMarkdownToInnovativePractices(v);
                      updateData("templateData.innovativePractices.markdown", v);
                      updateData("templateData.innovativePractices.items", parsed);
                      updateData("innovativePractices.markdown", v);
                      updateData("innovativePractices", parsed);
                    }}
                    showDocImport
                    docTemplateUrl="/uploads/documents/innovative_practice_templates/entc_template.docx"
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

    newsletter: (
      <div className="space-y-8">
        {/* Newsletter Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-50 text-ssgmce-blue rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm">
            <FaBullseye />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            <EditableText
              value={t("newsletters.title", "Department Newsletters")}
              onSave={(val) => updateData("newsletters.title", val)}
            />
          </h3>
          <div className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            <EditableText
              value={t(
                "newsletters.description",
                "Stay updated with the latest happenings, student achievements, faculty contributions, and department events through our periodic newsletters.",
              )}
              onSave={(val) => updateData("newsletters.description", val)}
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
                Department of Electronics & Telecommunication Engineering
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
                            "News Letter 2024-25 (Volume II)"
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
                          href={issue.link || "#"}
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

    committee: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-ssgmce-orange pl-4">
          <EditableText
            value={t("committeeTitle", "Departmental Committee")}
            onSave={(val) => updateField("committeeTitle", val)}
          />
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t("departmentalCommittee", defaultDepartmentalCommittee).map(
            (item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6 relative"
              >
                {isEditing && (
                  <button
                    onClick={() => {
                      const updated = t(
                        "departmentalCommittee",
                        defaultDepartmentalCommittee,
                      ).filter((_, idx) => idx !== i);
                      updateData("departmentalCommittee", updated);
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                    title="Remove"
                  >
                    ✕
                  </button>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaFileAlt className="text-xl text-ssgmce-blue" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    <EditableText
                      value={item.name}
                      onSave={(val) => {
                        const updated = [
                          ...t(
                            "departmentalCommittee",
                            defaultDepartmentalCommittee,
                          ),
                        ];
                        updated[i] = { ...updated[i], name: val };
                        updateData("departmentalCommittee", updated);
                      }}
                    />
                  </h4>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-ssgmce-blue hover:text-ssgmce-orange transition-colors"
                  >
                    <FaDownload className="text-xs" />
                    Download PDF
                  </a>
                )}
              </div>
            ),
          )}
        </div>

        {isEditing && (
          <button
            onClick={() => {
              const updated = [
                ...t("departmentalCommittee", defaultDepartmentalCommittee),
                { name: "New Committee", link: "" },
              ];
              updateData("departmentalCommittee", updated);
            }}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 cursor-pointer text-center"
          >
            + Add Committee
          </button>
        )}
      </div>
    ),

    services: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-ssgmce-orange pl-4">
          <EditableText
            value={t(
              "servicesTitle",
              "Services Extended to Society / Community",
            )}
            onSave={(val) => updateField("servicesTitle", val)}
          />
        </h3>

        <div className="space-y-6">
          {t("servicesExtended", defaultServicesExtended).map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden relative"
            >
              {isEditing && (
                <button
                  onClick={() => {
                    const updated = t(
                      "servicesExtended",
                      defaultServicesExtended,
                    ).filter((_, idx) => idx !== i);
                    updateData("servicesExtended", updated);
                  }}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs z-10"
                  title="Remove"
                >
                  ✕
                </button>
              )}
              <div className="flex items-stretch">
                <div className="w-2 bg-ssgmce-blue shrink-0"></div>
                <div className="p-6 flex-1">
                  {/* Lab Name */}
                  {(item.lab || isEditing) && (
                    <p className="text-xs font-semibold text-ssgmce-blue uppercase tracking-wider mb-1">
                      <EditableText
                        value={item.lab || "Lab Name"}
                        onSave={(val) => {
                          const updated = [
                            ...t("servicesExtended", defaultServicesExtended),
                          ];
                          updated[i] = { ...updated[i], lab: val };
                          updateData("servicesExtended", updated);
                        }}
                      />
                    </p>
                  )}
                  {/* Facility Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <FaTools className="text-xl text-ssgmce-orange" />
                    <h4 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={item.facility}
                        onSave={(val) => {
                          const updated = [
                            ...t("servicesExtended", defaultServicesExtended),
                          ];
                          updated[i] = { ...updated[i], facility: val };
                          updateData("servicesExtended", updated);
                        }}
                      />
                    </h4>
                  </div>
                  {/* Details */}
                  <p className="text-gray-600 leading-relaxed">
                    <EditableText
                      value={item.details}
                      onSave={(val) => {
                        const updated = [
                          ...t("servicesExtended", defaultServicesExtended),
                        ];
                        updated[i] = { ...updated[i], details: val };
                        updateData("servicesExtended", updated);
                      }}
                      multiline
                    />
                  </p>
                </div>
                {/* Image Area */}
                {(item.image || isEditing) && (
                  <div className="w-40 sm:w-48 flex-shrink-0 bg-gray-50 border-l border-gray-100 flex items-center justify-center">
                    {item.image ? (
                      <EditableImage
                        src={item.image}
                        onSave={(url) => {
                          const updated = [
                            ...t("servicesExtended", defaultServicesExtended),
                          ];
                          updated[i] = { ...updated[i], image: url };
                          updateData("servicesExtended", updated);
                        }}
                        alt={item.facility}
                        className="w-full h-full object-cover"
                      />
                    ) : isEditing ? (
                      <div
                        className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-100 transition-colors w-full h-full"
                        onClick={() => {
                          const url = prompt(
                            "Enter image URL for this service:",
                          );
                          if (url) {
                            const updated = [
                              ...t("servicesExtended", defaultServicesExtended),
                            ];
                            updated[i] = { ...updated[i], image: url };
                            updateData("servicesExtended", updated);
                          }
                        }}
                      >
                        <FaTools className="text-3xl text-gray-300 mb-2" />
                        <span className="text-xs text-gray-400">
                          Click to add image
                        </span>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            onClick={() => {
              const updated = [
                ...t("servicesExtended", defaultServicesExtended),
                {
                  lab: "Lab Name",
                  facility: "New Facility",
                  details: "Description of services",
                  image: "",
                },
              ];
              updateData("servicesExtended", updated);
            }}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 cursor-pointer text-center"
          >
            + Add Service
          </button>
        )}
      </div>
    ),

    projects: (
      <div className="space-y-8">
        {(() => {
          const ugProjectYears = getUgProjectYears();
          const ugProjectRecords = getUgProjectRecords();
          const ugProjectMarkdownByYear = getUgProjectMarkdownByYear();
          const currentUgProjects = Array.isArray(
            ugProjectRecords?.[ugProjectYear],
          )
            ? ugProjectRecords[ugProjectYear]
            : [];
          const selectedUgProjectsMarkdown =
            ugProjectMarkdownByYear?.[ugProjectYear] ||
            entcUgProjectsToMarkdown({ [ugProjectYear]: currentUgProjects }, [
              ugProjectYear,
            ]);

          return (
            <>
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-ssgmce-orange pl-4">
          <EditableText
            value={t("ugProjectsTitle", "UG Projects")}
            onSave={(val) => updateField("ugProjectsTitle", val)}
          />
        </h3>

        {/* Year Tabs */}
        <div className="flex flex-wrap gap-2 items-center">
          {ugProjectYears.map((year) => (
            <button
              key={year}
              onClick={() => setUgProjectYear(year)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                ugProjectYear === year
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

        {/* Project Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white p-4">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <FaBook className="text-ssgmce-orange" />
              UG Projects – {ugProjectYear}
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border border-gray-200 w-16">
                    Sr. No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border border-gray-200">
                    Project Title
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUgProjects.map((project, i) => (
                  <tr
                    key={i}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-500 font-medium border border-gray-200 text-center">
                      {project.id || i + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
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
                  Edit {ugProjectYear} in Markdown
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Import a DOCX or edit this session in markdown. Saving here
                  updates the UG Projects table above without changing the
                  current frontend layout.
                </p>
              </div>
              <MarkdownEditor
                key={ugProjectYear}
                value={selectedUgProjectsMarkdown}
                onSave={handleUgProjectMarkdownSave}
                showDocImport
                docTemplateUrl="/uploads/documents/pride_templates/entc_ug_projects_template.docx"
                docTemplateLabel="Download UG Projects Template"
                placeholder={`UG projects for ${ugProjectYear} (GFM Markdown)...`}
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
                    <FaPlus className="text-ssgmce-blue" /> Add UG Project Session
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
                      <strong>Note:</strong> After adding the session, you will
                      get an empty markdown editor with the same UG Projects
                      table structure and DOCX import support for that session.
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
                    onClick={handleAddUgProjectYear}
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

    "industrial-visits": (
      <div className="space-y-8">
        {(() => {
          const industrialVisits = getEntcIndustrialVisits();
          const industrialVisitsMarkdown =
            getEntcIndustrialVisitsMarkdown(industrialVisits);

          return (
            <>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  <FaIndustry className="inline-block mr-2 text-ssgmce-blue" />
                  Industrial Visits
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  The department regularly organizes industrial visits and training
                  programs to provide students hands-on exposure to industry
                  practices, cutting-edge technologies, and professional work culture.
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
                          Name of Industry / Organization Visited
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
                      {industrialVisits.map((visit, idx) => (
                        <tr key={visit.id || idx} className="hover:bg-gray-50 transition-colors">
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
                          <td className="px-6 py-4 text-gray-700">{visit.class}</td>
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
                          onClick={addEntcIndustrialVisitRowOnTop}
                          className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                        >
                          <FaPlus className="text-xs" />
                          Add New Row On Top
                        </button>
                      </div>
                    </div>
                    <MarkdownEditor
                      value={industrialVisitsMarkdown}
                      onSave={handleEntcIndustrialVisitsMarkdownSave}
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
                      {industrialVisits.map((visit, idx) => {
                        const uploadKey = `entc-industrial-visit-${visit.id}`;
                        return (
                          <div
                            key={visit.id || idx}
                            className="rounded-lg border border-gray-200 p-4"
                          >
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {idx + 1}. {(visit.industries || []).join(", ") || "Industrial Visit"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {visit.class || "Class not set"} | {visit.date || "Date not set"}
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
                                        uploadEntcIndustrialVisitReport(visit.id, file);
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

    mous: (
      <div className="space-y-8">
        {(() => {
          const mous = getEntcMous();
          const mousMarkdown = getEntcMousMarkdown(mous);
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
                        <button type="button" onClick={addEntcMouRowOnTop} className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange">
                          <FaPlus className="text-xs" />
                          Add New Row On Top
                        </button>
                      </div>
                    </div>
                    <MarkdownEditor value={mousMarkdown} onSave={handleEntcMousMarkdownSave} placeholder="MoUs table without serial-number column (GFM Markdown)..." />
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-gray-800">Upload MoU PDF / Report</h4>
                      <p className="text-sm text-gray-500 mt-1">Upload the PDF only for the row you want to attach a document to.</p>
                    </div>
                    <div className="space-y-3">
                      {mous.map((mou, idx) => {
                        const uploadKey = `entc-mou-${mou.id}`;
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
                                    if (file) uploadEntcMouReport(mou.id, file);
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
                                  className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${pat.status === "Granted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                                >
                                  {pat.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-mono text-xs text-gray-500 whitespace-nowrap text-right">
                                {pat.id}
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
                                {cr.title}
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
                                {book.title}
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
                      Keep the public table layout unchanged while editing this
                      session through markdown, DOCX import, and the matching
                      template.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addEntcResearchRowOnTop()}
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
                onSave={handleEntcResearchMarkdownSave}
                showDocImport
                docTemplateUrl={ENTC_RESEARCH_TEMPLATE_URLS[patentSubTab]}
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
            {researchYears.map((year) => (
              <a
                key={year}
                href={getEntcResearchReportUrl(year)}
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
                Upload one detailed report per academic year. The public
                download strip above will use the saved file for that year.
              </p>
            </div>
            <div className="space-y-3">
              {researchYears.map((year) => {
                const uploadKey = `entc-research-report-${year}`;
                const reportUrl = getEntcResearchReportUrl(year);
                return (
                  <div
                    key={`entc-research-report-${year}`}
                    className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{year}</p>
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
                        {researchReportUploading[uploadKey] ? "Uploading..." : "Upload Report"}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          disabled={researchReportUploading[uploadKey]}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            event.target.value = "";
                            if (file) uploadEntcResearchReport(year, file);
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
    internships: (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-3">
            <EditableText
              value={t("internshipsTitle", "Internship Record")}
              onSave={(val) => updateData("internshipsTitle", val)}
            />
          </h3>
          <div className="text-gray-600 max-w-2xl mx-auto">
            <EditableText
              value={t(
                "internshipsSubtitle",
                "Comprehensive internship training providing students with hands-on industry experience and professional development.",
              )}
              onSave={(val) => updateData("internshipsSubtitle", val)}
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
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-ssgmce-blue text-white">
                  <tr>
                    <th className="px-4 py-4 text-left font-bold whitespace-nowrap">
                      Sr. No.
                    </th>
                    <th className="px-4 py-4 text-left font-bold">
                      Name of Student
                    </th>
                    <th className="px-4 py-4 text-left font-bold">Class</th>
                    <th className="px-4 py-4 text-left font-bold">
                      Name of Company
                    </th>
                    {internshipYear === "2024-25" && (
                      <th className="px-4 py-4 text-left font-bold">Duration</th>
                    )}
                    <th className="px-4 py-4 text-left font-bold whitespace-nowrap">
                      Start Date
                    </th>
                    <th className="px-4 py-4 text-left font-bold whitespace-nowrap">
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentInternships.map((intern, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{intern.name}</td>
                      <td className="px-4 py-3 text-gray-700 text-center">
                        {intern.class}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {intern.company}
                      </td>
                      {internshipYear === "2024-25" && (
                        <td className="px-4 py-3 text-gray-700">
                          {intern.duration}
                        </td>
                      )}
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {intern.startDate}
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {intern.endDate}
                      </td>
                    </tr>
                  ))}
                  {currentInternships.length === 0 && (
                    <tr>
                      <td
                        colSpan={internshipYear === "2024-25" ? 7 : 6}
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
                docTemplateUrl="/uploads/documents/pride_templates/entc_internships_template.docx"
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
      title="Electronics & Telecommunication Engg."
      backgroundImage={electronicsBanner}
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
                      Enter the academic year in format YYYY-YY.
                    </p>
                    {researchYearError ? (
                      <p className="text-xs text-red-600 mt-2">{researchYearError}</p>
                    ) : null}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> The new session will be created for
                      patents, publications, conferences, books, and copyrights
                      with an empty markdown table plus DOCX import and template
                      download support.
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

const ENTC_ACTIVITY_REMOTE_IMAGE_PREFIX =
  "https://www.ssgmce.ac.in/images/extc_faculty/";

const getLocalEntcActivityImageUrl = (imageUrl = "") => {
  const normalizedUrl = String(imageUrl || "").trim();
  if (!normalizedUrl) return "";

  if (
    normalizedUrl
      .toLowerCase()
      .startsWith(ENTC_ACTIVITY_REMOTE_IMAGE_PREFIX.toLowerCase())
  ) {
    const fileName = normalizedUrl.split("/").pop()?.split("?")[0] || "";
    return fileName ? `/uploads/images/entc/activities/${fileName}` : normalizedUrl;
  }

  return normalizedUrl;
};

const normalizeEntcActivity = (activity = {}) => ({
  title: String(activity.title || "").trim(),
  date: String(activity.date || "").trim(),
  participants: String(activity.participants || "").trim(),
  organizer: String(activity.organizer || "").trim(),
  resource: String(activity.resource || "").trim(),
  image: getLocalEntcActivityImageUrl(activity.image),
});

const defaultEntcActivityCards = defaultActivities.map(normalizeEntcActivity);

const formatEntcActivityMarkdownField = (
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

const entcActivitiesToMarkdown = (activities = []) =>
  activities
    .map((activity) => normalizeEntcActivity(activity))
    .filter((activity) => activity.title)
    .map((activity) =>
      [
        `## ${activity.title}`,
        formatEntcActivityMarkdownField("Date", activity.date, true),
        formatEntcActivityMarkdownField(
          "Participants",
          activity.participants,
          true,
        ),
        formatEntcActivityMarkdownField(
          "Organized by",
          activity.organizer,
          true,
        ),
        formatEntcActivityMarkdownField(
          "Resource Person",
          activity.resource,
          true,
        ),
        formatEntcActivityMarkdownField("Image", activity.image, true),
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

const parseEntcActivitiesMarkdown = (markdown = "") => {
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

      return normalizeEntcActivity({
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

export default EnTC;
