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
  defaultFaculty as IT_DEFAULTS,
  defaultActivities,
  defaultPrideGate,
  defaultPrideToppersBE,
  defaultPrideAlumni,
  itPrideGateToMarkdown,
  itPrideToppersToMarkdown,
  itPrideAlumniToMarkdown,
  defaultItStudentProjects,
  itStudentProjectsToMarkdown,
  defaultNewsletters,
  defaultAchievements,
  defaultInnovativePractices,
  itInnovativePracticesToMarkdown,
  itMarkdownToInnovativePractices,
  defaultItPatents,
  defaultItPublications,
  defaultItConferences,
  defaultItBooks,
  defaultItCopyrights,
  defaultItUgProjects,
  defaultOverviewTableBE,
  defaultOverviewTableME,
  defaultOverviewTablePhD,
  defaultVision,
  defaultMission,
  defaultPeoDescription,
  defaultPeo,
  defaultPso,
  defaultPo,
} from "../../data/itDefaults";
import { getPathWithTab, getRequestedTab } from "../../utils/navigation";
import { defaultPlacements } from "../../data/itPlacements";
import { defaultItInternships } from "../../data/itInternships";
import itBanner from "../../assets/images/departments/it/IT banner.png";

// Industrial Visit Photos
import ivValueMomentum2025 from "../../assets/images/departments/it/industrial-visits/valuemomentum_pune_2025.png";
import ivHcltech2024 from "../../assets/images/departments/it/industrial-visits/hcltech_nagpur_2024.png";
import ivSaama2024 from "../../assets/images/departments/it/industrial-visits/saama_technologies_pune_2024.png";
import ivValueMomentum2024 from "../../assets/images/departments/it/industrial-visits/valuemomentum_pune_2024.png";
import ivMindscripts2020 from "../../assets/images/departments/it/industrial-visits/mindscripts_pune_2020.jpg";
import ivJadeGlobal2020 from "../../assets/images/departments/it/industrial-visits/jade_global_pune_2020.jpg";
import ivEzest2018 from "../../assets/images/departments/it/industrial-visits/ezest_pune_2018.jpg";
import ivRamakrishna2018 from "../../assets/images/departments/it/industrial-visits/ramakrishna_it_pune_2018.jpg";

// HOD Photo
import hodPhoto from "../../assets/images/departments/it/faculty/SDPadiya.jpg";

// Faculty Photos
import asmPhoto from "../../assets/images/departments/it/faculty/ASM.png";
import pvkPhoto from "../../assets/images/departments/it/faculty/PVK.jpg";
import agsPhoto from "../../assets/images/departments/it/faculty/AGS.jpg";
import fikPhoto from "../../assets/images/departments/it/faculty/FIK.jpg";
import ssmPhoto from "../../assets/images/departments/it/faculty/SSM.jpg";
import ppbPhoto from "../../assets/images/departments/it/faculty/PallaviBute.jpg";
import snkPhoto from "../../assets/images/departments/it/faculty/SNK.jpg";
import nngPhoto from "../../assets/images/departments/it/faculty/NNG.jpg";
import palPhoto from "../../assets/images/departments/it/faculty/PALod.jpeg";
import kpPhoto from "../../assets/images/departments/it/faculty/KP.jpeg";

// Photo map for resolving IT faculty photo string references
const itPhotoMap = {
  SDP: hodPhoto,
  ASM: asmPhoto,
  PVK: pvkPhoto,
  AGS: agsPhoto,
  FIK: fikPhoto,
  SSM: ssmPhoto,
  PPB: ppbPhoto,
  SNK: snkPhoto,
  NNG: nngPhoto,
  PAL: palPhoto,
  KP: kpPhoto,
};

// Resolve IT faculty photos from string references to actual imports
const IT_DEFAULT_FACULTY = IT_DEFAULTS.map((f) => ({
  ...f,
  photo: itPhotoMap[f.photo] || f.photo,
}));

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
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaFileAlt,
  FaImages,
  FaSearchPlus,
  FaMapMarkerAlt,
  FaBook,
  FaUpload,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

// IT_DEFAULT_FACULTY is now imported and resolved above via itDefaults.js + itPhotoMap

// ---- IT Pride Markdown helpers ----
function itParsePrideSections(markdown = "") {
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

const itPrideTableComponents = {
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

function ITPrideMdView({ markdown = "" }) {
  const sections = itParsePrideSections(markdown);
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
              components={itPrideTableComponents}
            >
              {sec.body}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
// ---- End IT Pride Markdown helpers ----

const defaultItIndustrialVisits = [
  {
    sn: "01",
    industries: ["ValueMomentum, Pune"],
    report: "/uploads/documents/it/industrial-visits/it_iv_2024_25.pdf",
    class: "3rd Year IT & CSE",
    date: "19/03/2025 to 22/03/2025",
    students: "62",
  },
  {
    sn: "02",
    industries: ["HCL Technologies Ltd, Nagpur"],
    report: "/uploads/documents/it/industrial-visits/it_iv_hcltech_nagpur.pdf",
    class: "2nd Year IT",
    date: "10/04/2024",
    students: "54",
  },
  {
    sn: "03",
    industries: [
      "Saama Technologies, Hinjewadi, Pune",
      "ValueMomentum, Hinjewadi, Pune",
    ],
    report: "/uploads/documents/it/industrial-visits/it_iv_2023_24.pdf",
    class: "3rd Year IT",
    date: "05/03/2024 to 09/03/2024",
    students: "45",
  },
  {
    sn: "04",
    industries: ["Mindscripts, Pune", "Jade Global, Pune"],
    report: "",
    class: "3rd Year IT",
    date: "25/02/2020 to 26/02/2020",
    students: "--",
  },
  {
    sn: "05",
    industries: [
      "e-Zest Solutions Ltd, Hinjewadi, Pune",
      "Ramakrishna IT Consultancy, Pune",
    ],
    report: "/uploads/documents/it/industrial-visits/it_iv_2018_19.pdf",
    class: "3rd Year IT",
    date: "02/10/2018 to 06/10/2018",
    students: "46",
  },
  {
    sn: "06",
    industries: ["pandayG.com, Hyderabad"],
    report: "/uploads/documents/it/industrial-visits/it_iv_2017_18.pdf",
    class: "3rd Year CSE & IT",
    date: "06/09/2017",
    students: "--",
  },
  {
    sn: "07",
    industries: ["Value Momentum, Hyderabad"],
    report: "/uploads/documents/it/industrial-visits/it_iv_2017_18_vm.pdf",
    class: "3rd Year CSE & IT",
    date: "04/09/2017",
    students: "--",
  },
  {
    sn: "08",
    industries: [
      "I-Medita (Cisco Networking Labs), Pune",
      "Mindscripts, Pune",
    ],
    report: "/uploads/documents/it/industrial-visits/it_iv_2016_17.pdf",
    class: "3rd Year IT",
    date: "15/03/2017 to 18/03/2017",
    students: "33",
  },
];

const defaultItIndustrialVisitGallery = [
  {
    image: ivValueMomentum2025,
    caption:
      "Industry Visit to ValueMomentum, Pune for B.E. 3rd Year IT and CSE Students on 20 March 2025",
    location: "Pune",
    date: "20 March 2025",
  },
  {
    image: ivHcltech2024,
    caption:
      "Industry Visit to HCL Technologies, Nagpur for B.E. 2nd Year Information Technology Students on 10th April 2024",
    location: "Nagpur",
    date: "10 April 2024",
  },
  {
    image: ivSaama2024,
    caption:
      "Industry Visit to Saama Technologies, Hinjewadi Phase-I, Pune for B.E. 3rd Year Information Technology Students on 06th March 2024",
    location: "Pune",
    date: "06 March 2024",
  },
  {
    image: ivValueMomentum2024,
    caption:
      "Industry Visit to ValueMomentum, Hinjewadi Phase-II, Pune for B.E. 3rd Year Information Technology Students on 07th March 2024",
    location: "Pune",
    date: "07 March 2024",
  },
  {
    image: ivMindscripts2020,
    caption:
      "Industrial Visit at Mindscripts, Pune by Prof A G Sharma and Prof. F I Khandwani. Participants: Third Year IT Students",
    location: "Pune",
    date: "25 February 2020",
  },
  {
    image: ivJadeGlobal2020,
    caption:
      "Industrial Visit at Jade Global, Pune by Prof A G Sharma and Prof. F I Khandwani. Participants: Third Year IT Students",
    location: "Pune",
    date: "26 February 2020",
  },
  {
    image: ivEzest2018,
    caption:
      "Industrial Visit at e-Zest Solutions Ltd, Hinjewadi, Pune for B.E. 3rd Year Information Technology Students",
    location: "Pune",
    date: "2018-19",
  },
  {
    image: ivRamakrishna2018,
    caption:
      "Industrial Visit at Ramakrishna IT Services Pvt. Ltd, Pune for B.E. 3rd Year Information Technology Students",
    location: "Pune",
    date: "2018-19",
  },
];

const itExtractMarkdownLinkHref = (value = "") => {
  const match = String(value || "").match(/\[.*?\]\((.*?)\)/);
  return match?.[1]?.trim?.() || "";
};

const itParseMarkdownTableRow = (line = "") =>
  String(line || "")
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const itParseIndustrialVisitIndustries = (value = "") =>
  String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .split(/\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);

const itIndustrialVisitsToMarkdown = (visits = []) => {
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

const parseItIndustrialVisitsMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];

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

  return dataLines
    .map((line) => itParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 5)
    .map((cells) => {
      const offset = cells.length >= 6 ? 1 : 0;
      return {
        industries: itParseIndustrialVisitIndustries(cells[offset] || ""),
        class: cells[offset + 1] || "",
        date: cells[offset + 2] || "",
        students: cells[offset + 3] || "",
        report: itExtractMarkdownLinkHref(cells.slice(offset + 4).join(" | ")),
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

const createItIndustrialVisitId = () =>
  `it-industrial-visit-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getItIndustrialVisitSignature = (visit = {}) =>
  JSON.stringify({
    industries: (Array.isArray(visit?.industries) ? visit.industries : [])
      .map((item) => String(item || "").trim().toLowerCase())
      .filter(Boolean),
    class: String(visit?.class || "").trim().toLowerCase(),
    date: String(visit?.date || "").trim().toLowerCase(),
    students: String(visit?.students || "").trim().toLowerCase(),
  });

const defaultItMous = [
  {
    no: "1.",
    org: "Prodevans Technologies Pvt. Ltd., Bengaluru",
    date: "05-10-2023",
    report: "/uploads/documents/it_mous/MOU_Prodevans_Technologies_2023.pdf",
  },
  {
    no: "2.",
    org: "BridgeLabz Solutions Pvt. Ltd., Mumbai",
    date: "31-01-2023",
    report: "/uploads/documents/it_mous/MOU_BridgeLabz_2023.pdf",
  },
  {
    no: "3.",
    org: "Expert Global Solutions Pvt. Ltd., Sambhajinagar (Aurangabad)",
    date: "24-11-2022",
    report: "/uploads/documents/it_mous/MOU_Expert_Global_Solutions_2022.pdf",
  },
  {
    no: "4.",
    org: "Vnurt, Bengaluru",
    date: "19-01-2019",
    report: "/uploads/documents/it_mous/MOU_Vnurt_2019.pdf",
  },
  {
    no: "5.",
    org: "Renuka Technology, Nagpur",
    date: "19-01-2019",
    report: "/uploads/documents/it_mous/MOU_Renuka_Technology_2019.pdf",
  },
  {
    no: "6.",
    org: "Clubix Technology, Nagpur",
    date: "19-01-2019",
    report: "/uploads/documents/it_mous/MOU_Clubix_Technology_2019.pdf",
  },
  {
    no: "7.",
    org: "Vidharbha Industry Defence Hub, Mihan, Nagpur",
    date: "19-01-2019",
    report: "/uploads/documents/it_mous/MOU_Vidarbha_Defence_Hub_2019.pdf",
  },
  {
    no: "8.",
    org: "JDM Semiconductor, Nagpur",
    date: "19-01-2019",
    report: "/uploads/documents/it_mous/MOU_JDM_Semiconductor_2019.pdf",
  },
  {
    no: "9.",
    org: "Red Hat Academy, Bengaluru",
    date: "11-06-2018",
    report: "/uploads/documents/it_mous/MOU_Red_Hat_Academy_2018.pdf",
  },
];

const itMousToMarkdown = (mous = []) => {
  const lines = [
    "## MoUs",
    "",
    "| Name of the Organization | MOU Signing Date | MOU Copy / Report |",
    "|--------------------------|------------------|-------------------|",
  ];
  if (!mous.length) {
    lines.push("| No MoUs added yet. | - | - |");
    return lines.join("\n");
  }
  mous.forEach((mou) => {
    const reportCell = mou?.report ? `[View Document](${mou.report})` : "-";
    lines.push(`| ${mou?.org || "-"} | ${mou?.date || "-"} | ${reportCell} |`);
  });
  return lines.join("\n");
};

const parseItMousMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];
  const tableLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter(
    (line, index) =>
      index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
  );
  return dataLines
    .map((line) => itParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 3)
    .map((cells) => ({
      org: cells[0] || "",
      date: cells[1] || "",
      report: itExtractMarkdownLinkHref(cells.slice(2).join(" | ")),
    }))
    .filter((mou) => mou.org || mou.date || mou.report);
};

const createItMouId = () =>
  `it-mou-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getItMouSignature = (mou = {}) =>
  JSON.stringify({
    org: String(mou?.org || "").trim().toLowerCase(),
    date: String(mou?.date || "").trim().toLowerCase(),
  });

const itPatentsToMarkdown = (items = [], year = "2024-25") => {
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

const parseItPatentsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
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
      .map((line) => itParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 5)
      .map((cells) => ({
        title: cells[0] || "",
        status: cells[1] || "",
        id: cells[2] || "",
        inventors: cells[3] || "",
        link: itExtractMarkdownLinkHref(cells.slice(4).join(" | ")),
      }))
      .filter(
        (item) =>
          item.title || item.status || item.id || item.inventors || item.link,
      ),
  };
};

const itPublicationsToMarkdown = (items = [], year = "2024-25") => {
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

const parseItPublicationsMarkdown = (
  markdown = "",
  fallbackYear = "2024-25",
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
      .map((line) => itParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        title: cells[0] || "",
        authors: cells[1] || "",
        journal: cells[2] || "",
        link: itExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.title || item.authors || item.journal || item.link),
  };
};

const itConferencesToMarkdown = (items = [], year = "2024-25") => {
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

const parseItConferencesMarkdown = (
  markdown = "",
  fallbackYear = "2024-25",
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
      .map((line) => itParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        title: cells[0] || "",
        authors: cells[1] || "",
        journal: cells[2] || "",
        link: itExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.title || item.authors || item.journal || item.link),
  };
};

const itCopyrightsToMarkdown = (items = [], year = "2024-25") => {
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

const parseItCopyrightsMarkdown = (
  markdown = "",
  fallbackYear = "2024-25",
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
      .map((line) => itParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        name: cells[0] || "",
        title: cells[1] || "",
        status: cells[2] || "",
        link: itExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.name || item.title || item.status || item.link),
  };
};

const itBooksToMarkdown = (items = [], year = "2024-25") => {
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

const parseItBooksMarkdown = (markdown = "", fallbackYear = "2024-25") => {
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
      .map((line) => itParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 6)
      .map((cells) => ({
        name: cells[0] || "",
        coAuthors: cells[1] || "",
        title: cells[2] || "",
        details: cells[3] || "",
        isbn: cells[4] || "",
        link: itExtractMarkdownLinkHref(cells.slice(5).join(" | ")),
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

const IT_RESEARCH_DEFAULTS = {
  patents: defaultItPatents,
  publications: defaultItPublications,
  conferences: defaultItConferences,
  books: defaultItBooks,
  copyrights: defaultItCopyrights,
};

const IT_RESEARCH_TO_MARKDOWN = {
  patents: itPatentsToMarkdown,
  publications: itPublicationsToMarkdown,
  conferences: itConferencesToMarkdown,
  books: itBooksToMarkdown,
  copyrights: itCopyrightsToMarkdown,
};

const IT_RESEARCH_FROM_MARKDOWN = {
  patents: parseItPatentsMarkdown,
  publications: parseItPublicationsMarkdown,
  conferences: parseItConferencesMarkdown,
  books: parseItBooksMarkdown,
  copyrights: parseItCopyrightsMarkdown,
};

const IT_RESEARCH_TEMPLATE_URLS = {
  patents: "/uploads/documents/pride_templates/it_patents_template.docx",
  publications:
    "/uploads/documents/pride_templates/it_publications_template.docx",
  conferences:
    "/uploads/documents/pride_templates/it_conferences_template.docx",
  books: "/uploads/documents/pride_templates/it_books_template.docx",
  copyrights:
    "/uploads/documents/pride_templates/it_copyrights_template.docx",
};

const defaultCourseMaterials = [
  {
    year: "Second Year",
    title: "Second Year IT (2N)",
    link: "https://ssgmceacin-my.sharepoint.com/:f:/g/personal/cse_cm_ssgmce_ac_in/EsMfkpy9SuNMltN9KWdtcX8BkW-mKmRdA-uTh-eFMOFpzA",
  },
  {
    year: "Third Year",
    title: "Third Year IT (3N)",
    link: "https://ssgmceacin-my.sharepoint.com/:f:/g/personal/cse_cm_ssgmce_ac_in/EmEb5ijdZBdGvqT12xXRL_0BChr4yYIEdVyx1JfOPwP5MA",
  },
  {
    year: "Final Year",
    title: "Final Year IT (4N)",
    link: "https://ssgmceacin-my.sharepoint.com/:f:/g/personal/cse_cm_ssgmce_ac_in/Eqo9010PXeVGlakouWUW2n8BAyzRvV0h8AuSVQdTA-9lvw",
  },
];

const IT = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() =>
    getRequestedTab(location, "overview")
  );
  const [vmTab, setVmTab] = useState("vision");
  const [poTab, setPoTab] = useState("peo");
  const [showAllPos, setShowAllPos] = useState(false);
  const [expandedSemester, setExpandedSemester] = useState(null);
  const [prideTab, setPrideTab] = useState("gate");
  const [researchTab, setResearchTab] = useState("projects");
  const [projectYear, setProjectYear] = useState("2024-25");
  const [ugProjectYear, setUgProjectYear] = useState("2024-25");
  const [showAddUgProjectYear, setShowAddUgProjectYear] = useState(false);
  const [newUgProjectYear, setNewUgProjectYear] = useState("");
  const [ugProjectYearError, setUgProjectYearError] = useState("");
  const [showAddInternshipYear, setShowAddInternshipYear] = useState(false);
  const [newInternshipYear, setNewInternshipYear] = useState("");
  const [internshipYearError, setInternshipYearError] = useState("");
  const [researchYear, setResearchYear] = useState("2024-25");
  const [placementYear, setPlacementYear] = useState(null);
  const [showAddPlacementYear, setShowAddPlacementYear] = useState(false);
  const [newPlacementYear, setNewPlacementYear] = useState("");
  const [placementYearError, setPlacementYearError] = useState("");
  const [showAddResearchYear, setShowAddResearchYear] = useState(false);
  const [newResearchYear, setNewResearchYear] = useState("");
  const [researchYearError, setResearchYearError] = useState("");
  const [patentSubTab, setPatentSubTab] = useState("patents");
  const [internshipYear, setInternshipYear] = useState("2024-25");

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

  // State for Industrial Visit lightbox
  const [ivLightbox, setIvLightbox] = useState(null);

  // State for Curricular Activities section
  const [activitiesVisible, setActivitiesVisible] = useState(6);
  const [lightboxActivity, setLightboxActivity] = useState(null);
  const [achievementTab, setAchievementTab] = useState("faculty");
  const [certificateLightbox, setCertificateLightbox] = useState(null);

  // Load department data (works in both edit and public view modes)
  const {
    data: activeData,
    loading: dataLoading,
    isEditing,
    updateData,
    removeData,
    t,
  } = useDepartmentData("departments-it");

  // Helper for array updates
  const updateField = (path, value) => {
    updateData(path, value);
  };

  const itInternshipsToMarkdown = (records = [], year = "2024-25") => {
    const lines = [
      `## ${year}`,
      "",
      "| SIS ID | Name of Intern | Name of Industry / Organization | Class | Duration | Stipend |",
      "|--------|----------------|----------------------------------|-------|----------|---------|",
    ];

    if (!records.length) {
      lines.push("| Add SIS ID | Add intern name | Add organization | Add class | Add duration | Add stipend |");
      return lines.join("\n");
    }

    records.forEach((intern) => {
      lines.push(
        `| ${intern?.sis || "-"} | ${intern?.name || "-"} | ${intern?.org || "-"} | ${intern?.class || "-"} | ${intern?.duration || "-"} | ${intern?.stipend || "-"} |`,
      );
    });

    return lines.join("\n");
  };

  const parseItInternshipsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
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
        .map((line) => itParseMarkdownTableRow(line))
        .filter((cells) => cells.length >= 6)
        .map((cells, index) => ({
          no: String(index + 1),
          sis: cells[0] || "",
          name: cells[1] || "",
          org: cells[2] || "",
          class: cells[3] || "",
          duration: cells[4] || "",
          stipend: cells[5] || "",
        }))
        .filter(
          (intern) =>
            intern.sis ||
            intern.name ||
            intern.org ||
            intern.class ||
            intern.duration ||
            intern.stipend,
        ),
    };
  };

  const getItIndustrialVisits = () =>
    JSON.parse(JSON.stringify(t("industrialVisits.items", defaultItIndustrialVisits))).map((visit) => ({
      ...visit,
      id: String(visit?.id || createItIndustrialVisitId()),
    }));

  const getItIndustrialVisitsMarkdown = (visits = getItIndustrialVisits()) =>
    itIndustrialVisitsToMarkdown(visits);

  const persistItIndustrialVisits = (visits) => {
    const normalizedVisits = (Array.isArray(visits) ? visits : []).map((visit) => ({
      id: String(visit?.id || createItIndustrialVisitId()).trim(),
      industries: Array.isArray(visit?.industries)
        ? visit.industries.map((item) => String(item || "").trim()).filter(Boolean)
        : [],
      class: String(visit?.class || "").trim(),
      date: String(visit?.date || "").trim(),
      students: String(visit?.students || "").trim(),
      report: String(visit?.report || "").trim(),
    }));

    updateData("industrialVisits.items", normalizedVisits);
    updateData(
      "industrialVisits.markdown",
      itIndustrialVisitsToMarkdown(normalizedVisits),
    );
  };

  const handleItIndustrialVisitsMarkdownSave = (markdown) => {
    const parsed = parseItIndustrialVisitsMarkdown(markdown);
    const existingVisits = getItIndustrialVisits();
    const signaturePool = new Map();
    existingVisits.forEach((visit) => {
      const signature = getItIndustrialVisitSignature(visit);
      const matches = signaturePool.get(signature) || [];
      matches.push(visit);
      signaturePool.set(signature, matches);
    });
    const usedIds = new Set();
    const mergedVisits = parsed.map((visit, index) => {
      const signature = getItIndustrialVisitSignature(visit);
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
        id: match?.id || createItIndustrialVisitId(),
        industries: visit.industries,
        class: visit.class,
        date: visit.date,
        students: visit.students,
        report: visit.report || match?.report || "",
      };
    });
    persistItIndustrialVisits(mergedVisits);
  };

  const addItIndustrialVisitRowOnTop = () => {
    const visits = getItIndustrialVisits();
    persistItIndustrialVisits([
      {
        id: createItIndustrialVisitId(),
        industries: ["New Industry / Organization"],
        class: "Add class",
        date: "Add date",
        students: "Add students",
        report: "",
      },
      ...visits,
    ]);
  };

  const uploadItIndustrialVisitReport = async (visitId, file) => {
    if (!file) return;

    const uploadKey = `it-industrial-visit-${visitId}`;
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

      const visits = getItIndustrialVisits();
      persistItIndustrialVisits(
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
      console.error("IT industrial visit report upload failed:", error);
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

  const getItIndustrialVisitGallery = () =>
    JSON.parse(
      JSON.stringify(t("industrialVisits.gallery", defaultItIndustrialVisitGallery)),
    );

  const persistItIndustrialVisitGallery = (photos) => {
    const normalizedPhotos = (Array.isArray(photos) ? photos : []).map((photo) => ({
      image: String(photo?.image || "").trim(),
      caption: String(photo?.caption || "").trim(),
      location: String(photo?.location || "").trim(),
      date: String(photo?.date || "").trim(),
    }));

    updateData("industrialVisits.gallery", normalizedPhotos);
  };

  const addItIndustrialVisitPhoto = () => {
    const photos = getItIndustrialVisitGallery();
    photos.unshift({
      image: "",
      caption: "Add visit photo caption",
      location: "Add location",
      date: "Add date",
    });
    persistItIndustrialVisitGallery(photos);
  };

  const updateItIndustrialVisitPhoto = (index, field, value) => {
    const photos = getItIndustrialVisitGallery();
    photos[index] = {
      ...photos[index],
      [field]: value,
    };
    persistItIndustrialVisitGallery(photos);
  };

  const deleteItIndustrialVisitPhoto = (index) => {
    const photos = getItIndustrialVisitGallery();
    persistItIndustrialVisitGallery(
      photos.filter((_, photoIndex) => photoIndex !== index),
    );
  };

  const uploadItIndustrialVisitPhoto = async (index, file) => {
    if (!file) return;

    const uploadKey = `it-gallery-${index}`;
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

      updateItIndustrialVisitPhoto(index, "image", response.data.fileUrl);
    } catch (error) {
      console.error("IT industrial visit gallery upload failed:", error);
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

  const getItMous = () =>
    JSON.parse(JSON.stringify(t("mous.items", defaultItMous))).map((mou) => ({
      ...mou,
      id: String(mou?.id || createItMouId()),
    }));

  const getItMousMarkdown = (mous = getItMous()) => itMousToMarkdown(mous);

  const persistItMous = (mous) => {
    const normalizedMous = (Array.isArray(mous) ? mous : []).map((mou) => ({
      id: String(mou?.id || createItMouId()).trim(),
      org: String(mou?.org || "").trim(),
      date: String(mou?.date || "").trim(),
      report: String(mou?.report || "").trim(),
    }));
    updateData("mous.items", normalizedMous);
    updateData("mous.markdown", itMousToMarkdown(normalizedMous));
  };

  const handleItMousMarkdownSave = (markdown) => {
    const parsed = parseItMousMarkdown(markdown);
    const existingMous = getItMous();
    const signaturePool = new Map();
    existingMous.forEach((mou) => {
      const signature = getItMouSignature(mou);
      const matches = signaturePool.get(signature) || [];
      matches.push(mou);
      signaturePool.set(signature, matches);
    });
    const usedIds = new Set();
    const mergedMous = parsed.map((mou, index) => {
      const signature = getItMouSignature(mou);
      let match = (signaturePool.get(signature) || []).find(
        (item) => !usedIds.has(item.id),
      );
      if (!match) {
        const fallback = existingMous[index];
        if (fallback && !usedIds.has(fallback.id)) match = fallback;
      }
      if (match?.id) usedIds.add(match.id);
      return {
        id: match?.id || createItMouId(),
        org: mou.org,
        date: mou.date,
        report: mou.report || match?.report || "",
      };
    });
    persistItMous(mergedMous);
  };

  const addItMouRowOnTop = () => {
    const mous = getItMous();
    persistItMous([
      { id: createItMouId(), org: "New organization", date: "Add signing date", report: "" },
      ...mous,
    ]);
  };

  const uploadItMouReport = async (mouId, file) => {
    if (!file) return;
    const uploadKey = `it-mou-${mouId}`;
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
      if (response.data.fileUrl) {
        const mous = getItMous();
        persistItMous(
          mous.map((mou) =>
            mou.id === mouId ? { ...mou, report: response.data.fileUrl } : mou,
          ),
        );
      }
    } catch (error) {
      console.error("IT MOU upload failed:", error);
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

  const getItResearchItems = (section, year = researchYear) =>
    JSON.parse(
      JSON.stringify(
        t(`research.${section}.${year}`, IT_RESEARCH_DEFAULTS[section]?.[year] || []),
      ),
    );

  const getItResearchMarkdownValue = (section, year = researchYear) => {
    const storedMarkdown = t(`researchMarkdown.${section}.${year}`, null);
    if (typeof storedMarkdown === "string" && storedMarkdown.trim()) {
      return storedMarkdown;
    }

    return IT_RESEARCH_TO_MARKDOWN[section](getItResearchItems(section, year), year);
  };

  const getItResearchYears = () => {
    const configuredYears = Array.isArray(t("researchYears", null))
      ? t("researchYears", [])
      : [];
    const storedResearch = t("research", {});
    const storedResearchMarkdown = t("researchMarkdown", {});

    const discoveredYears = Object.keys(IT_RESEARCH_DEFAULTS).flatMap((section) => [
      ...Object.keys(IT_RESEARCH_DEFAULTS[section] || {}),
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
    ]);

    const years = normalizePlacementYears([
      ...defaultResearchYears,
      ...configuredYears,
      ...discoveredYears,
    ]).sort(compareAcademicYearsDesc);

    return years.length ? years : [...defaultResearchYears];
  };

  const persistItResearchSection = (section, items, year = researchYear) => {
    const normalizedItems = Array.isArray(items) ? items : [];
    updateData(`research.${section}.${year}`, normalizedItems);
    updateData(
      `researchMarkdown.${section}.${year}`,
      IT_RESEARCH_TO_MARKDOWN[section](normalizedItems, year),
    );
  };

  const createEmptyItResearchMarkdown = (section, year) =>
    IT_RESEARCH_TO_MARKDOWN[section]([], year);

  const handleItResearchMarkdownSave = (markdown) => {
    const parser = IT_RESEARCH_FROM_MARKDOWN[patentSubTab];
    const parsed = parser(markdown, researchYear);
    persistItResearchSection(patentSubTab, parsed.items || [], researchYear);
  };

  const addItResearchRowOnTop = (section = patentSubTab) => {
    const researchItems = getItResearchItems(section, researchYear);
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

    persistItResearchSection(
      section,
      [blankRows[section] || {}, ...researchItems],
      researchYear,
    );
  };

  const researchYears = getItResearchYears();
  const selectedResearchItems = getItResearchItems(patentSubTab, researchYear);
  const selectedResearchMarkdown = getItResearchMarkdownValue(
    patentSubTab,
    researchYear,
  );

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

    Object.keys(IT_RESEARCH_DEFAULTS).forEach((section) => {
      updateData(`research.${section}.${normalizedYear}`, []);
      updateData(
        `researchMarkdown.${section}.${normalizedYear}`,
        createEmptyItResearchMarkdown(section, normalizedYear),
      );
    });

    updateData("researchYears", [normalizedYear, ...researchYears]);
    setResearchYear(normalizedYear);
    setNewResearchYear("");
    setResearchYearError("");
    setShowAddResearchYear(false);
  };

  const getItResearchReportUrl = (year) =>
    String(
      t(
        `researchReports.${year}`,
        `/uploads/documents/it_publications/IT_publication_${year}.pdf`,
      ) || "",
    ).trim();

  const uploadItResearchReport = async (year, file) => {
    if (!file || !year) return;

    const uploadKey = `it-research-report-${year}`;
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
      console.error("IT research report upload failed:", error);
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

  const extractUgProjectLinkHref = (value = "") => {
    const markdownLinkMatch = String(value || "").match(/\[[^\]]+\]\(([^)]+)\)/);
    if (markdownLinkMatch?.[1]) return markdownLinkMatch[1].trim();
    const trimmed = String(value || "").trim();
    return /^https?:\/\//i.test(trimmed) || trimmed.startsWith("/uploads/")
      ? trimmed
      : "";
  };

  const extractUgProjectLinkLabel = (value = "") => {
    const markdownLinkMatch = String(value || "").match(/\[([^\]]+)\]\(([^)]+)\)/);
    return markdownLinkMatch?.[1]?.trim() || "";
  };

  const itUgProjectsToMarkdown = (projectsByYear = {}, preferredYears = []) => {
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
          "| Group No. | Project Title | Project Report |",
          "|-----------|---------------|----------------|",
        ];

        if (!projects.length) {
          return [...header, "| - | No projects added yet. | - |"].join("\n");
        }

        const rows = projects.map((project) => {
          const label =
            String(project?.fileName || "").trim() ||
            String(project?.report || "").trim().split("/").pop()?.split("?")[0] ||
            "Project Report";
          const reportCell = project?.report
            ? `[${label}](${project.report})`
            : "-";
          return `| ${project?.id || "-"} | ${project?.title || "-"} | ${reportCell} |`;
        });

        return [...header, ...rows].join("\n");
      })
      .join("\n\n");
  };

  const parseItUgProjectsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
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
          index > 1 &&
          !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line),
      );

      records[normalizedYear] = dataLines
        .map((line) => parseUgProjectsTableRow(line))
        .filter((cells) => cells.length >= 3)
        .map((cells) => ({
          id: cells[0] || "",
          title: cells[1] || "",
          report: extractUgProjectLinkHref(cells.slice(2).join(" | ")),
          fileName: extractUgProjectLinkLabel(cells.slice(2).join(" | ")),
        }))
        .filter((project) => project.id || project.title || project.report);

      if (!years.includes(normalizedYear)) years.push(normalizedYear);
    });

    return { years, records };
  };

  const getUgProjectYears = () => {
    const storedYears = Array.isArray(t("ugProjectYears", null))
      ? t("ugProjectYears", [])
      : [];
    const recordYears = Object.keys(t("ugProjects", defaultItUgProjects) || {});
    return [...new Set([...storedYears, ...recordYears])]
      .filter(Boolean)
      .sort(compareAcademicYearsDesc);
  };

  const getUgProjectRecords = () =>
    JSON.parse(JSON.stringify(t("ugProjects", defaultItUgProjects)));

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
            report: String(project?.report || "").trim(),
            fileName: String(project?.fileName || "").trim(),
          }))
        : [];
      return acc;
    }, {});

    const existingMarkdownByYear = getUgProjectMarkdownByYear();
    const markdownByYear = orderedYears.reduce((acc, year) => {
      acc[year] =
        existingMarkdownByYear?.[year] ||
        itUgProjectsToMarkdown({ [year]: normalizedRecords[year] || [] }, [year]);
      return acc;
    }, {});

    updateData("ugProjects", normalizedRecords);
    updateData("ugProjectYears", orderedYears);
    updateData("ugProjectsMarkdownByYear", markdownByYear);
  };

  const handleUgProjectMarkdownSave = (markdown) => {
    const parsed = parseItUgProjectsMarkdown(markdown, ugProjectYear);
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
      itUgProjectsToMarkdown({ [normalizedYear]: [] }, [normalizedYear]),
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
      t("internships", defaultItInternships) || defaultItInternships,
    ).filter(isAcademicYearKey);

    return [...new Set([...storedYears, ...recordYears])]
      .filter(Boolean)
      .sort(compareAcademicYearsDesc);
  };

  const getInternshipRecords = () =>
    JSON.parse(JSON.stringify(t("internships", defaultItInternships)));

  const getInternshipMarkdownByYear = () =>
    JSON.parse(JSON.stringify(t("internshipsMarkdownByYear", {})));

  const createEmptyInternshipMarkdown = (year) =>
    itInternshipsToMarkdown([], year);

  const persistInternships = (records, years = getInternshipYears()) => {
    const orderedYears = [...new Set([...years, ...Object.keys(records || {})])]
      .filter(isAcademicYearKey)
      .sort(compareAcademicYearsDesc);

    const normalizedRecords = orderedYears.reduce((acc, year) => {
      acc[year] = (Array.isArray(records?.[year]) ? records[year] : []).map(
        (intern, index) => ({
          no: String(index + 1),
          sis: String(intern?.sis || "").trim(),
          name: String(intern?.name || "").trim(),
          org: String(intern?.org || "").trim(),
          class: String(intern?.class || "").trim(),
          duration: String(intern?.duration || "").trim(),
          stipend: String(intern?.stipend || "").trim(),
        }),
      );
      return acc;
    }, {});

    const existingMarkdownByYear = getInternshipMarkdownByYear();
    const markdownByYear = orderedYears.reduce((acc, year) => {
      acc[year] =
        existingMarkdownByYear?.[year] ||
        itInternshipsToMarkdown(normalizedRecords[year] || [], year);
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
    itInternshipsToMarkdown(currentInternships, internshipYear);

  useEffect(() => {
    if (!internshipYears.length) return;
    if (!internshipYears.includes(internshipYear)) {
      setInternshipYear(internshipYears[0]);
    }
  }, [internshipYear, internshipYears]);

  const handleInternshipsMarkdownSave = (markdown) => {
    const parsed = parseItInternshipsMarkdown(markdown, internshipYear);
    const records = {
      ...getInternshipRecords(),
      [internshipYear]: parsed.records || [],
    };
    persistInternships(records, internshipYears);
    updateData(
      `internshipsMarkdownByYear.${internshipYear}`,
      itInternshipsToMarkdown(parsed.records || [], internshipYear),
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
            placeholder="Paste or import placement data (Markdown) here..."
          />
        ) : (
          <ITPrideMdView markdown={markdown} />
        )}
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

  const updateActivity = (idx, field, value) => {
    const storedActivitiesMarkdown = t("activitiesMarkdown", "");
    const parsedActivities = parseItActivitiesMarkdown(storedActivitiesMarkdown);
    const sourceActivities = (
      parsedActivities.length
        ? parsedActivities
        : t("activities", defaultItActivityCards)
    ).map(normalizeItActivity);

    if (!sourceActivities[idx]) return;

    const nextActivities = sourceActivities.map((activity, activityIndex) =>
      activityIndex === idx
        ? normalizeItActivity({
            ...activity,
            [field]: value,
          })
        : activity,
    );

    updateData("activities", nextActivities);
    updateData("activitiesMarkdown", itActivitiesToMarkdown(nextActivities));
  };

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

  const getStoredItValue = (key) =>
    activeData?.[key] ?? activeData?.templateData?.[key];

  const latestNewsletterData =
    getStoredItValue("newsletters_latest") || defaultNewsletters.latest;
  const newsletterArchivesData =
    getStoredItValue("newsletters_archives") ||
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
    t("activities", defaultItActivityCards) || defaultItActivityCards
  ).map(normalizeItActivity);
  const storedActivitiesMarkdown = t("activitiesMarkdown", "");
  const parsedActivities = parseItActivitiesMarkdown(storedActivitiesMarkdown);
  const activitiesData = parsedActivities.length
    ? parsedActivities
    : legacyActivities;

  const updateActivityList = (updater) => {
    const nextActivities = updater(
      activitiesData.map((activity) => normalizeItActivity(activity)),
    );
    updateData("activities", nextActivities);
    updateData("activitiesMarkdown", itActivitiesToMarkdown(nextActivities));
  };

  const addActivityCard = () => {
    updateActivityList((items) => [
      {
        title: "New Curricular Activity",
        date: "Add activity date",
        participants: "Add participant details",
        organizer: "IT Department, SSGMCE",
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

  const itActivityMarkdownComponents = {
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
          components={itActivityMarkdownComponents}
        >
          {trimmedValue}
        </ReactMarkdown>
      </div>
    );
  };

  const updateFacultyMember = (index, field, value) => {
    const faculty = JSON.parse(
      JSON.stringify(t("templateData.faculty", IT_DEFAULT_FACULTY)),
    );
    faculty[index] = { ...faculty[index], [field]: value };
    updateField("templateData.faculty", faculty);
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

  // Default curriculum items for Scheme & Syllabus (scraped from source website)
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
    {
      label: "Computer Skill Lab Syllabus",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label: "Revised Syllabus of IT 21 July 2023",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
    {
      label:
        "Revised Syllabus of CSE (5th Sem - 7th Sem) Notification No. 187/2022",
      link: "#",
      fileName: null,
      fileUrl: null,
    },
  ];

  // Curriculum management functions
  const updateCurriculumItem = (section, index, field, value) => {
    const key = `templateData.curriculum.${section}`;
    const defaults = DEFAULT_CURRICULUM_BE;
    const items = JSON.parse(JSON.stringify(t(key, defaults)));
    items[index] = { ...items[index], [field]: value };
    updateField(key, items);
  };

  const addCurriculumItem = (section) => {
    const key = `templateData.curriculum.${section}`;
    const defaults = DEFAULT_CURRICULUM_BE;
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
        const defaults = DEFAULT_CURRICULUM_BE;
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
    const defaults = DEFAULT_CURRICULUM_BE;
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
    const defaults = DEFAULT_CURRICULUM_BE;
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
      name: "Data Engineering Laboratory",
      image: "",
      area: "60 Sq.Mtrs",
      systems: "18 PC",
      resources:
        "COMPUTER SYSTEMS: 18 Nos. HP COMPUTER SYSTEM PCS510 TOWER MODEL GEN6 H110 INTEL i5 PROCESSOR /8 GB RAM/500 GB SATA HDD/20 hp MONITOR/USB WIRED KEYBOARD & OPTICAL MOUSE. NVIDIA TESLA GPU Cards, DICA Kits, XPO 8086 Microprocessor Kits with Study Cards LCD Projector SCANNER Cano Scan LiDE 300 (Canon) UPS: 5 KVA WITH BATTERIES (Two in number)",
    },
    {
      name: "Programming Laboratory",
      image: "",
      area: "75 Sq.Mtrs",
      systems: "19 PC (12 Lenovo + 7 HP)",
      resources:
        "COMPUTER SYSTEMS: 12 Nos. LENOVO COMPUTER SYSTEM PCS510 TOWER MODEL GEN6 H110 INTEL i3 PROCESSOR/4 GB RAM/500 GB SATA HDD/19.5 LED LENOVO MONITOR/USB WIRED KEYBOARD & OPTICAL MOUSE. COMPUTER SYSTEMS: 07 Nos. HP COMPUTER SYSTEM PCS510 TOWER MODEL GEN6 H110 INTEL i5 PROCESSOR /8 GB RAM/500 GB SATA HDD/20 hp MONITOR/USB WIRED KEYBOARD & OPTICAL MOUSE. Oasis Embedded System kits: 08 ARM7, ARM7 Board with Software: 07 LCD Projector UPS: 5 KVA WITH BATTERIES (Two in number)",
    },
    {
      name: "WEBTECH Laboratory",
      image: "",
      area: "65 Sq.Mtrs",
      systems: "17 PC",
      resources:
        'COMPUTER SYSTEMS: 17: HP-280G1 Business Desktop, Intel Core i3-4160, 3.6 GHz, 4 GB DDR3 RAM, 500 GB HDD, HP-Compaq 18" Monitors with USB Keyboards and Mouse PRINTER: DOT MATRIX PRINTER LQ-1150 UPS: 10 KVA WITH BATTERIES (Two in number)',
    },
    {
      name: "AI Laboratory",
      image: "",
      area: "70 Sq.Mtrs",
      systems: "16 PC",
      resources:
        'COMPUTER SYSTEMS: 16 HP-280G1 Business Desktop, Intel Core i3-4160, 3.6 GHz, 4 GB DDR3 RAM, 500 GB HDD, HP-Compaq 18" Monitors with USB Keyboards and Mouse PRINTER: DOT MATRIX PRINTER LQ-1150 UPS: 10 KVA WITH BATTERIES (One in number)',
    },
    {
      name: "Operating System Laboratory",
      image: "",
      area: "68 Sq.Mtrs",
      systems: "15 PC",
      resources:
        'COMPUTER SYSTEMS: 15 Lenovo ThinkCentre model number M72 series, Intel Core i3 2120 processor (2nd Gen), Intel motherboard, USB Keyboard and Mouse, 2GB DDR 3 RAM, 500 GB HDD 7200 RPM, DVD RW, PCI/PCI-E, Tower 4*3, 18.5" TFT Monitor UPS: 10 KVA WITH BATTERIES (One in number)',
    },
    {
      name: "Project Laboratory",
      image: "",
      area: "55 Sq.Mtrs",
      systems: "10 PC",
      resources:
        "COMPUTER SYSTEMS: 10 LENOVO COMPUTER SYSTEM PCS510 TOWER MODEL GEN6 H110 INTEL i3 PROCESSOR/4 GB RAM/500 GB SATA HDD/19.5 LED LENOVO MONITOR/USB WIRED KEYBOARD & OPTICAL MOUSE UPS: 10 KVA WITH BATTERIES (One in number)",
    },
    {
      name: "Departmental Library",
      image: "",
      area: "50 Sq.Mtrs",
      systems: "Reading Area",
      resources:
        "Available for students & Staff. No. of Current Text And Reference Books: 369, Large No. of CBTs: 31, No. of Reference Manuals, Journals, etc: 35",
    },
  ];

  const academicsLinks = [
    { id: "overview", label: "Department Overview" },
    { id: "hod", label: "Words from HOD" },
    { id: "vision-mission", label: "Vision, Mission, PEO & PSO" },
    { id: "course-outcomes", label: "Course Outcomes" },
    { id: "curriculum", label: "Scheme and Syllabus" },
    { id: "laboratories", label: "Infrastructure and Laboratories" },
    { id: "best-projects", label: "Students Best Projects" },
    { id: "pride", label: "Pride of the Department" },
    { id: "placements", label: "Placement Statistics" },
    { id: "activities", label: "Curricular Activities" },
    { id: "newsletter", label: "Newsletter" },
    { id: "achievements", label: "Achievements" },
    { id: "course-material", label: "Course Material" },
    { id: "projects", label: "UG Projects" },
    { id: "services", label: "Services Offered" },
    { id: "practices", label: "Innovative Practice" },
    { id: "faculty", label: "Faculty Members" },
  ];

  const industryLinks = [
    { id: "industrial-visits", label: "Industrial Visits" },
    { id: "mous", label: "MoUs" },
    { id: "patents", label: "Publication" },
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
                    "The Department of Information Technology was established in the year 2001. The department offers B.E. in Information Technology with an intake of 60 students. The department has state-of-the-art computer laboratories with high-speed internet connectivity.",
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
                    "Our mission is to provide quality education in the field of Information Technology and to prepare students for the challenges of the IT industry. We emphasize practical learning, project development, and current technology trends.",
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
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
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
                          "Ph. D in Information Technology",
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
                value={t("hodName", "Dr. S. D. Padiya")}
                onSave={(v) => updateField("hodName", v)}
                placeholder="Click to edit HOD name..."
              />
            </div>
            <div className="text-sm text-gray-500">
              <EditableText
                value={t(
                  "overview.footerDesignation",
                  "Head, Department of Information Technology",
                )}
                onSave={(v) => updateField("overview.footerDesignation", v)}
                placeholder="Click to edit designation..."
              />
            </div>
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
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white group w-72 md:w-80 lg:w-96 h-56 md:h-60 lg:h-64 bg-slate-50 flex items-center justify-center">
                  <EditableImage
                    src={t("hodPhoto", hodPhoto)}
                    onSave={(url) => updateField("hodPhoto", url)}
                    alt="Dr. S. D. Padiya - HOD IT"
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                <EditableText
                  value={t("hodName", "Dr. S. D. Padiya")}
                  onSave={(val) => updateField("hodName", val)}
                />
              </h3>
              <div className="text-ssgmce-blue font-bold text-sm mt-1 uppercase tracking-wide">
                <EditableText
                  value={t("hodDesignation", "Head of Department")}
                  onSave={(val) => updateField("hodDesignation", val)}
                />
              </div>
              <p className="text-gray-600 text-sm mt-1">
                <EditableText
                  value={t(
                    "hodDepartmentTitle",
                    "Department of Information Technology",
                  )}
                  onSave={(val) => updateField("hodDepartmentTitle", val)}
                />
              </p>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaEnvelope className="mr-2 text-ssgmce-orange" />
                  <span>
                    <EditableText
                      value={t("hodEmail1", "sdpadiya@ssgmce.ac.in")}
                      onSave={(val) => updateField("hodEmail1", val)}
                    />
                  </span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center">
                  <FaPhone className="mr-2 text-ssgmce-orange" />
                  <span>
                    <EditableText
                      value={t("hodEmail2", "+91 7588501506")}
                      onSave={(val) => updateField("hodEmail2", val)}
                    />
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-ssgmce-blue">
                  <EditableText
                    value={t("hodBadge1", "Associate Professor")}
                    onSave={(val) => updateField("hodBadge1", val)}
                  />
                </span>
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-ssgmce-blue">
                  <EditableText
                    value={t("hodBadge2", "BLE, WSN, IoT")}
                    onSave={(val) => updateField("hodBadge2", val)}
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
                  value={t("hodMessageTitle", "Message from the HOD")}
                  onSave={(val) => updateField("hodMessageTitle", val)}
                />
              </h3>
              <div className="h-1 w-20 bg-ssgmce-orange mt-2 rounded-full mx-auto"></div>
            </div>

            <div className="space-y-4 text-gray-700 text-base leading-relaxed text-justify">
              <MarkdownEditor
                value={t(
                  "hodMessage",
                  "Dear Friends,\n\nInformation Technology is one of the emerging computing disciplines. Nowadays Computers became essential work tools at every level of most organizations, and networked computer systems became the information backbone of organizations.\n\nInformation technology refers to undergraduate degree programs that prepare students to meet the computer technology needs of business, government, healthcare, schools, and other kinds of organizations.\n\nIT is a new and rapidly growing field that started as a grassroots response to the practical, everyday needs of business and other organizations. Today, organizations of every kind are dependent on information technology. They need to have appropriate systems in place. These systems must work properly, be secure, and upgraded, maintained, and replaced as appropriate. Employees throughout an organization require support from IT staff that understand computer systems and their software and are committed to solving whatever computer-related problems they might have. Graduates of information technology programs address these needs.\n\nDegree programs in information technology arose because degree programs in the other computing disciplines were not producing an adequate supply of graduates capable of handling these very real needs. IT programs exist to produce graduates who possess the right combination of knowledge and practical, hands-on expertise to take care of both an organization's information technology infrastructure and the people who use it. IT specialists assume responsibility for selecting hardware and software products appropriate for an organization, integrating those products with organizational needs and infrastructure, and installing, customizing, and maintaining those applications for the organization's computer users.\n\nInformation technology professionals should be able to work effectively at planning, implementation, configuration, and maintenance of an organization's computing infrastructure.",
                )}
                onSave={(val) => updateField("hodMessage", val)}
                placeholder="Click to edit HOD message (Markdown supported)..."
                className="w-full"
              />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
              <div>
                <div className="font-dancing text-2xl text-ssgmce-blue">
                  <EditableText
                    value={t("hodName", "Dr. S. D. Padiya")}
                    onSave={(val) => updateField("hodName", val)}
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <EditableText
                    value={t(
                      "hodDesignation",
                      "Head, Department of Information Technology",
                    )}
                    onSave={(val) => updateField("hodDesignation", val)}
                  />
                </div>
              </div>
              <div className="text-right text-sm text-gray-400">
                <p>
                  <EditableText
                    value={t(
                      "signatureCollegeName1",
                      "Shri Sant Gajanan Maharaj",
                    )}
                    onSave={(val) => updateField("signatureCollegeName1", val)}
                  />
                </p>
                <p>
                  <EditableText
                    value={t(
                      "signatureCollegeName2",
                      "College of Engineering, Shegaon",
                    )}
                    onSave={(val) => updateField("signatureCollegeName2", val)}
                  />
                </p>
              </div>
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
              { id: "po", label: "Program Outcome" },
              { id: "pso", label: "Program Specific Outcome" },
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
                <p className="text-gray-600 text-sm mb-4 italic">
                  <EditableText
                    value={t("peoDescription", defaultPeoDescription)}
                    onSave={(val) => updateField("peoDescription", val)}
                  />
                </p>
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
                    <div className="text-gray-700 leading-relaxed font-medium w-full">
                      <MarkdownEditor
                        value={item}
                        onSave={(val) => {
                          const updated = [...t("pso", defaultPso)];
                          updated[i] = val;
                          updateField("pso", updated);
                        }}
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
          content: `### 3IT200PC Discrete Structure and Graph Theory

After successful completion of the course, students will be able to:

1. Demonstrate the basic terminologies of mathematical logic, theory of inference and set theory
2. Apply mathematical logic, inference theory and set theory, to solve engineering problems
3. Apply algebraic structures, grammar, polish expressions and lattices to solve the mathematics expressions
4. Apply the lattices for partially ordered relations and Boolean algebraic simplification methods to minimize the Boolean functions
5. Analyze graphs based on various parameters for graph manipulation and storage representation

### 3IT201PC Object Oriented Programming

After successful completion of the course, students will be able to:

1. Apply Java syntax and constructs to implement functional programs
2. Apply the concepts of inheritance, aggregation, method overriding, abstract classes, interfaces, and packages to develop Java programs
3. Apply the concepts of exception handling and file handling to develop robust Java programs
4. Apply the concepts of Java applets to develop interactive graphical programs
5. Apply event-handling concepts to develop interactive Java applications

### 3IT202PC Analog and Digital Electronics

After successful completion of the course, students will be able to:

1. Apply the basic concepts of analog electronics while choosing a transistor as per application
2. Categorize different applications of the operational amplifier
3. Discriminate the working of sinusoidal and non-sinusoidal waveform generators
4. Apply the basic concepts of digital electronics and K-map to simplify logic expressions
5. Analyze combinational and sequential circuits for different applications

### 3IT205MD Introduction to Data Structures

After successful completion of the course, students will be able to:

1. Apply data structure concepts to analyze complexity and perform operations like searching, sorting, insertion, and deletion on linear arrays
2. Apply linked lists, stacks, and queues with basic operations to solve computational problems
3. Implement and analyze tree and graph data structures with traversal, searching, and path- finding algorithms

### 3IT206OE OE-1 Cyber Law

After successful completion of the course, students will be able to:

1. Apply basic computer and internet concepts to analyze their role in digital business and governance
2. Apply knowledge of e-payment systems to select suitable methods for secure online transactions
3. Identify types of cybercrimes and common techniques used by cyber offenders
4. Categorize cybercrimes and relate them to relevant legal provisions
5. Apply sections of the IT Act to given cyber law scenarios
6. Describe ethical and security concerns associated with the use of digital technologies

### 3IT207EM Entrepreneurship Development

After successful completion of the course, students will be able to:

1. Understand the definitions and fundamental concepts of entrepreneurship and start-ups
2. Understand the role of a business plan in guiding the implementation of business ideas
3. Understand the company’s organization structure and its role in effective management. Course Name: Environmental Science Course Code: 3SH208VE
4. Understand the multidisciplinary nature of environment and Renewable and non-renewable resources
5. Understand natural environment and its relationship with human activities
6. Understand the basic concepts and problems and follow sustainable development practices`,
        },
        {
          id: "be-sem4",
          label: "B.E. Semester-IV",
          content: `### 4IT209PC Data Structures

After successful completion of the course, students will be able to:

1. Explain fundamental concepts of data structures and pattern matching algorithms
2. Use linear and multidimensional arrays for problem-solving
3. Construct and manipulate various types of linked lists
4. Apply stack and queue operations in practical problems
5. Use binary trees, BSTs, and heaps to solve problems
6. Design and implement graph traversals and sorting techniques

### 4IT210PC Data Communication & Networking

After successful completion of the course, students will be able to:

1. Describe the fundamental concepts of data communication, including components, types of data flow, and communication systems
2. Compare the OSI and TCP/IP models by analyzing the functionalities and protocols at each layer
3. Apply knowledge of signal conversion methods and apply error detection and correction techniques to ensure reliable communication
4. Analyze IPv4/IPv6 protocols, and packet delivery processes
5. Compare and contrast TCP and UDP features, use cases, and transport layer mechanisms
6. Assess application layer services like DNS and HTTP and troubleshoot networking issues using protocols and addressing schemes

### 4IT211PC Computer Organization & Architecture

After successful completion of the course, students will be able to:

1. Apply the basic knowledge of computers to demonstrate the working of the computer system
2. Analyze the execution of a complete instruction within the processing unit
3. Discover the approaches computers follow to handle input/output operations
4. Choose memory at each level in the computer based on its functionalities
5. Interpret the arithmetic operations done by the computer

### 4IT214MD Introduction to Operating Systems

After successful completion of the course, students will be able to:

1. Explain and apply process scheduling algorithms
2. Apply synchronization and deadlock-related issues
3. Investigate memory management techniques

### 4IT215VS Computer Skills – I

After successful completion of the course, students will be able to:

1. Apply the knowledge of Internet, web protocols, servers and web design principles to develop effective websites
2. Apply the concepts and structure of HTML to create basic web pages
3. Apply HTML elements knowledge to design web pages by working with text, lists, tables, frames, hyperlinks, images, multimedia etc
4. Analyze and implement CSS techniques to create visually appealing and responsive web pages
5. Apply JavaScript concepts to develop interactive and user-friendly web pages
6. Apply your knowledge to build dynamic web applications using PHP by integrating PHP with HTML

### 4IT216OE2 Artificial Intelligence

After successful completion of the course, students will be able to:

1. Explain the Artificial Intelligence concepts. History, types, intelligent agents, and applications of AI
2. Apply problem-solving techniques using uninformed and informed search strategies to solve AI-related problems
3. Analyze knowledge representation methods basic machine learning approaches to design simple AI/ML solutions

### 4IT217EM IT Ethics and Management

After successful completion of the course, students will be able to:

1. Apply Engineering and professional ethics, morals, and laws in day to day life
2. Analyze engineering ethical dilemmas using moral reasoning and professional codes of ethics
3. Analyze computing ethics issues and apply IEEE Codes to privacy, intellectual property, and cyber crimes

### 4SH219VE Universal Human Values and Ethics

After successful completion of the course, students will be able to:

1. Understand the concept of self, differentiate physical and mental needs, and apply human values for personal well-being and ethical awareness in engineering
2. Understand and apply trust, empathy, conflict resolution, and ethical principles in relationships, family, and society
3. Apply professional ethics, promote sustainability in engineering practices, and understand corporate and global ethical responsibilities including CSR`,
        },
        {
          id: "be-sem5",
          label: "B.E. Semester-V",
          content: `### 5IT01 Database Management Systems

After successful completion of the course, students will be able to:

1. Construct ER model with notations and constraints
2. Build relational algebra queries using basic, additional and extended operations
3. Create SQL queries based on the relation schema and tasks
4. Apply concurrency control protocols on schedules and transactions
5. Create roles, grant and revoke the privileges for providing database security

### 5IT02 Theory of Computations

After successful completion of the course, students will be able to:

1. Analyze formal languages with help of fundamental concepts and Finite Automata
2. Create regular expressions and grammars which can be used to represent formal language in different forms
3. Analyze the formal languages, their powers using different forms of grammars and classify them according to Chomsky hierarchy
4. Design Push Down Automata for a Context Free Language along with context sensitive languages
5. Design Turing machine for performing different types for computations
6. Identify the decidability and un-decidability of problems in case of formal languages

### 5IT03 Software Engineering

After successful completion of the course, students will be able to:

1. Demonstrate the Fundamental Concepts of software engineering life cycle
2. Elaborate the software engineering requirements specification and the SRS documents
3. Examine the software engineering layered technology and process framework
4. Illustrate the Use Case diagram, DFD, Sequence diagram, class diagram, Activity diagram and state Transition diagram
5. Demonstrate the competence in communication planning, analysis, design, construction, and development of software as per requirement
6. Develop a basic report on software testing for effectively test, debug, and validate software

### 5IT04 Information Security Systems (PE-1(i))

After successful completion of the course, students will be able to:

1. Apply fundamental information security concepts and the security development life cycle to secure information systems
2. Apply knowledge of threats, attacks, and legal/ethical issues to determine organizational security needs
3. Apply legal and ethical principles to support secure and responsible information security practices
4. Analyze organizational risks using risk identification, assessment, and risk control strategies
5. Apply security planning methods, policies, governance frameworks, and continuity strategies within an organization
6. Analyze cryptographic techniques, algorithms, and secure communication protocols to evaluate their effectiveness

### 5IT04 Data Science & Statistics (PE-1(ii))

After successful completion of the course, students will be able to:

1. Apply Numpy and Pandas Library functions on datasets
2. Analyze data by performing EDA and data visualization by using plots
3. Create hypothesis on data and perform hypothesis testing required
4. Evaluate the Performance of Linear Regression model on dataset
5. Evaluate the Performance of Logistic Regression Measure Decision Tree Algorithm on datasets

### 5IT05 Data Structures and Algorithms (Open Elective)

After successful completion of the course, students will be able to:

1. Summarize the fundamental concepts of Data Structures and algorithms. CO2; Demonstrate the implementation of arrays and linked lists in data structures
2. Illustrate stack and queue operations with real-world examples
3. Explain different binary tree traversal methods with examples
4. Apply graph representation techniques and implement the shortest path algorithm
5. Compare various sorting and searching techniques based on their efficiency

### 5IT09 Computer Skill Lab III

After successful completion of the course, students will be able to:

1. Install and configure Angular CLI to create and run a basic Angular application
2. Design, create, and navigate Angular components and analyze component lifecycle events
3. Implement variables and data binding techniques to connect templates with component logic
4. Apply Angular Signals to manage reactive state and improve application performance
5. Use Angular directives to manipulate DOM elements dynamically
6. Implement control flow statements in Angular templates for conditional rendering and iteration`,
        },
        {
          id: "be-sem6",
          label: "B.E. Semester-VI",
          content: `### 6IT01 Compiler Design

After successful completion of the course, students will be able to:

1. Demonstrate the fundamentals of compilation for designing lexical analyzers by utilizing regular expressions, LEX, YACC, etc. for token specification and recognition
2. Perform syntax analysis using top-down parsing methods such as Back-Tracking, LL(k), etc. for error detection and error recovery in predictive parsing
3. Perform syntax analysis using bottom-up parsing such as Handle Pruning, Shift-Reduce, LR(k), etc. methods for error detection and error recovery in predictive parsing
4. Design and implement syntax-directed translations, using synthesized and inherited attributes with syntax trees, directed acyclic graphs, and evaluate syntax-directed definitions using various methods
5. Demonstrate key concepts in runtime environments, and intermediate code generation for various source language constructs

### 6IT02 Design Analysis & Algorithm

After successful completion of the course, students will be able to:

1. Analyze worst-case running times of algorithms using asymptotic analysis
2. Apply the divide-and-conquer paradigm and examine when an algorithmic design situation calls for it
3. Differentiate the greedy-programming paradigm and solve an algorithmic design situation calls for it
4. Examine the dynamic programming approach and explain when an algorithmic design situation calls for it
5. Differentiate and apply the concept of Backtracking, Polynomial Time & Non Polynomial Time Algorithms

### 6IT03 Artificial Intelligence

After successful completion of the course, students will be able to:

1. Explain concepts of Artificial Intelligence and different types of intelligent agents and their architecture
2. Evaluate different uninformed search algorithms on well formulate problems along with stating valid conclusions that the evaluation supports
3. Design and analyze informed search algorithms on well formulated problems
4. Formulate and solve given problem using Propositional and First order logic
5. Apply reasoning for non-monotonic AI problems
6. Have a basic understanding of some of the more advanced topics of AI such as learning, Understanding, Natural Language Processing

### 6IT04 Cryptography and Network Security (PE-1(i))

After successful completion of the course, students will be able to:

1. Apply fundamental cartographic principles to secure communication
2. Implement encryption and decryption techniques ensuring confusion and diffusion
3. Compare and analyze symmetric and asymmetric encryption method for data security
4. Evaluate the role of network security protocols in securing data transmission
5. Identify network security threats and implement countermeasures
6. Identify different Web and system security solutions

### 6IT04 Big Data Analytics (PE-1(ii))

After successful completion of the course, students will be able to:

1. Illustrate the concepts of big data
2. Apply Hadoop goals and assumptions for choosing the proper component of the Hadoop ecosystem
3. Apply the MapReduce operations based on the tasks
4. Apply stream processing algorithms to data, considering issues in it
5. Identify the big data mining algorithm based on the applications

### 6IT05 Data Communication and Internet (Open Elective)

After successful completion of the course, students will be able to:

1. Explain the fundamental concepts and principles of computer networking
2. Describe the components of data communication systems and the role of various networking protocols
3. Apply networking concepts to demonstrate information sharing mechanisms in computer networks
4. Explain the flow of data, categories of networks, and different network topologies
5. Apply knowledge of signals, transmission media, and error detection and correction techniques in data communication
6. Illustrate the building blocks and functioning of a digital communication system

### 6IT09 Computer Skill Lab – IV

After successful completion of the course, students will be able to:

1. Apply basic Artificial Intelligence concepts and intelligent agent models to identify problem types and working environments
2. Implement and analyze AI problem-solving techniques using uninformed and informed search strategies in Python
3. Develop programs that demonstrate reasoning and decision-making using knowledge representation, game-playing, and uncertainty handling techniques
4. Apply natural language processing techniques to build simple AI applications using appropriate programming tools`,
        },
        {
          id: "be-sem7",
          label: "B.E. Semester-VII",
          content: `### 7IT01 Mobile Computing

After successful completion of the course, students will be able to:

1. Gain knowledge of basic concepts of Mobile Computing and Principals of cellular communication
2. Understand different components, devices for mobile computing and understand wireless application protocol
3. Able to implement different concepts of mobile computing fundamentals using wireless scripting language
4. To develop ability for developing open platform mobile development
5. Explore concepts of distributed mobile computing
6. Identify & understand different security issues in mobile computing

### 7IT02 Embedded System

After successful completion of the course, students will be able to:

1. Demonstrate the basic components (hardware, application software and operating system) required for the development of embedded applications
2. Identify the various components, computing models and communication devices required for the development of an embedded application
3. Apply the programming, data structures and modeling processes for the implementation of network protocols
4. Design the programming models for the analysis of priority based multiprocessing real time embedded systems
5. Analyzed the priority based inter-process communication and synchronization issues and relevant solutions to make embedded applications real time

### 7IT03 Cloud Computing

After successful completion of the course, students will be able to:

1. Describe the fundamental concept, architecture and applications of Cloud Computing
2. Discuss the problems related to cloud deployment model
3. Examine the concept of virtualization
4. Identify the role of network connectivity in the cloud
5. Assess different Cloud service providers
6. Inspect the security issues in cloud service models

### 7IT04 Machine Learning (Prof. Elect.-III) (i)

After successful completion of the course, students will be able to:

1. Understand the concept of Machine Learning
2. Understand how to evaluate models generated from data
3. Implement a variety of algorithms for Supervised Learning
4. Implement a variety of algorithms for Unsupervised Learning
5. Implement a variety of algorithms for Reinforcement Learning
6. Understand the concept of Neural Networks

### 7IT05 Blockchain Fundaments (Prof. Elect.-IV) (i)

After successful completion of the course, students will be able to:

1. Examine the concept of decentralization and its importance in blockchain systems
2. Illustrate the process of Cryptocurrency transactions & role of miner in securing Cryptocurrency networks
3. Evaluate the limitations of Bitcoin and propose alternative solutions for specific use cases
4. Develop and deploy basic smart contracts using the Solidity programming language
5. Utilize development frameworks streamline smart contract deployment and DApp development
6. Evaluate the features and functionality of alternative Blockchains

### 7IT05 Business Intelligence (Prof. Elect.-IV) (ii)

After successful completion of the course, students will be able to:

1. Apply BI and analytics concepts to understand business changes and new technologies
2. Apply data cleaning, modeling, and visualization methods to create clear business reports and dashboards
3. Analyze business data using clustering, regression, time-series, and data mining techniques
4. Analyze data warehouse designs, including schemas, facts, dimensions, and hierarchies
5. Apply ETL processes such as extraction, transformation, loading, and staging for effective data integration
6. Analyze new trends like IoT, cloud analytics, and privacy rules to understand their legal, ethical, and organizational impact`,
        },
        {
          id: "be-sem8",
          label: "B.E. Semester-VIII",
          content: `### 8IT01 Object Oriented Analysis & Design

After successful completion of the course, students will be able to:

1. Explain the concepts of Object-Oriented Modeling in modern software development.
2. Analyze the concepts of Unified Modeling Language (UML) to represent an object-oriented system using class diagrams
3. Develop use case and activity diagrams for different requirement-based system scenarios
4. Analyze the problem domain to identify class models, state models, and interaction models of a system
5. Evaluate and decompose a system into subsystems based on system information and requirements
6. Create and organize a class design using object-oriented principles

### 8IT02 Professional Ethics & Management

After successful completion of the course, students will be able to:

1. Apply Engineering and professional ethics, morals, and laws in day to day life
2. Analyze engineering ethical dilemmas using moral reasoning and professional codes of ethics
3. Analyze computing ethics issues and apply IEEE Codes to privacy, intellectual property, and cyber crimes
4. Analyze intellectual property laws and ethical issues related to patents, trademarks, and copyrights
5. Analyze ethical issues in computers, software, and digital information using professional codes of conduct
6. Apply ethical responsibility in managing safety, risk, and professional relationships in IT practice

### 8IT03 Entrepreneurship & Project Management

After successful completion of the course, students will be able to:

1. Demonstrate the knowledge of entrepreneurship, need, scope, competencies and its types
2. Interpret knowledge on opportunities / ideas screening for entrepreneurship
3. Apply knowledge on basic process of project management to solve real life problem
4. Explain the details of project financing criteria
5. Develop critical thinking skills to solve real life Entrepreneurship and SME problems
6. Develop critical thinking skills on developing a career as entrepreneurs

### 8IT04 Virtual & Augmented Reality (Prof.Elect.-V) (ii)

After successful completion of the course, students will be able to:

1. Interpret the basic concept of VR & AR
2. Identify the Input/output devices for VR
3. Applying the knowledge of rendering pipeline and graphics rendering pipeline in creating VR experience
4. Analyze the hardware & software needed for AR
5. Examine the use of Augmented Reality (AR) applications to identify their benefits, limitations, and emerging trends
6. {item.label} Download`,
        },
      ];

      const beSections = t("courseOutcomes.beSections", defaultBeSections);

      const updateBeSections = (updated) =>
        updateField("courseOutcomes.beSections", updated);

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
              Comprehensive course outcomes for all semesters of B.E.
              Information Technology
            </p>
          </div>

          {/* B.E. Course Outcomes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#003366] px-6 py-4 text-center">
              <h3 className="text-xl font-bold text-white">
                B.E. Information Technology - Course Outcomes
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
                  B.E. (Information Technology)
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
                <div className="mt-2 text-center space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Lab Area:</span>{" "}
                    <EditableText
                      value={lab.area || ""}
                      onSave={(val) => {
                        const updated = [
                          ...t("laboratories", defaultLaboratories),
                        ];
                        updated[index].area = val;
                        updateField("laboratories", updated);
                      }}
                    />
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Computer Systems:</span>{" "}
                    <EditableText
                      value={lab.systems || ""}
                      onSave={(val) => {
                        const updated = [
                          ...t("laboratories", defaultLaboratories),
                        ];
                        updated[index].systems = val;
                        updateField("laboratories", updated);
                      }}
                    />
                  </p>
                </div>
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
                      area: "",
                      systems: "",
                      resources:
                        "Computer systems and configuration details...",
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

    "best-projects": (() => {
      const md = t(
        "studentProjects.markdown",
        itStudentProjectsToMarkdown(defaultItStudentProjects),
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
              docTemplateUrl="/uploads/documents/pride_templates/it_projects_template.docx"
              docTemplateLabel="Download Projects Template"
              placeholder="Student projects tables by year (GFM Markdown)..."
            />
          ) : (
            <ITPrideMdView markdown={md} />
          )}
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
                itPrideGateToMarkdown(t("pride.gate", defaultPrideGate)),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.gateMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/it_gate_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <ITPrideMdView markdown={md} />
              );
            })()}

          {/* University Toppers */}
          {prideTab === "toppers" &&
            (() => {
              const md = t(
                "pride.toppersMarkdown",
                itPrideToppersToMarkdown({
                  be: t("pride.toppers.be", defaultPrideToppersBE),
                }),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.toppersMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/it_toppers_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <ITPrideMdView markdown={md} />
              );
            })()}

          {/* Top Alumni */}
          {prideTab === "alumni" &&
            (() => {
              const md = t(
                "pride.alumniMarkdown",
                itPrideAlumniToMarkdown(
                  t("pride.alumni", defaultPrideAlumni),
                  t("pride.alumniTitle", "Top Alumnis of Department"),
                ),
              );
              return isEditing ? (
                <MarkdownEditor
                  value={md}
                  onSave={(v) => updateData("pride.alumniMarkdown", v)}
                  showDocImport
                  docTemplateUrl="/uploads/documents/pride_templates/it_alumni_template.docx"
                  docTemplateLabel="Download Template"
                />
              ) : (
                <ITPrideMdView markdown={md} />
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
                      src={getLocalItActivityImageUrl(activity.image)}
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
                  src={getLocalItActivityImageUrl(
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

    faculty: (
      <div className="space-y-10">
        <div className="text-center border-b border-gray-200 pb-6 mb-8">
          <h3 className="text-3xl font-bold text-gray-900">Our Faculty</h3>
          <p className="text-gray-500 mt-2">
            Department of Information Technology
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {t("templateData.faculty", IT_DEFAULT_FACULTY).map((fac, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex ${
                isEditing && expandedFacultyEditorIndex === i ? "lg:col-span-2" : ""
              }`}
            >
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
                        onSave={(val) => updateFacultyMember(i, "name", val)}
                      />
                    </Link>
                  ) : (
                    <EditableText
                      value={fac.name}
                      onSave={(val) => updateFacultyMember(i, "name", val)}
                    />
                  )}
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
                  ...t("templateData.faculty", IT_DEFAULT_FACULTY),
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
                    department: "it",
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
                Department of Information Technology
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
                          value={latestNewsletterData.title || "Newsletter 2024-25"}
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

    achievements: (() => {
      const facultyAchievements = t(
        "achievements.faculty",
        defaultAchievements.faculty,
      );
      const studentAchievements = t(
        "achievements.students",
        defaultAchievements.students,
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
              Department of Information Technology
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
                Department of Information Technology
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
            storedMarkdown || itInnovativePracticesToMarkdown(defaultPractices);

          // Prefer saved CMS data and only fall back to bundled defaults
          // when neither markdown nor stored structured data is available.
          const parsedPractices = itMarkdownToInnovativePractices(md);
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
                          itInnovativePracticesToMarkdown(nextPractices);
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
                      const parsed = itMarkdownToInnovativePractices(v);
                      updateData("templateData.innovativePractices.markdown", v);
                      updateData("templateData.innovativePractices.items", parsed);
                      updateData("innovativePractices.markdown", v);
                      updateData("innovativePractices", parsed);
                    }}
                    showDocImport
                    docTemplateUrl="/uploads/documents/innovative_practice_templates/it_template.docx"
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

    "industrial-visits": (() => {
      const industrialVisitPhotos = getItIndustrialVisitGallery();
      const industrialVisitTable = getItIndustrialVisits();
      const industrialVisitsMarkdown = getItIndustrialVisitsMarkdown(
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
              The department regularly organizes industrial visits to provide
              students with hands-on exposure to industry practices, emerging
              technologies, and professional work culture.
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
                    onClick={addItIndustrialVisitPhoto}
                    className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                  >
                    <FaPlus className="text-xs" />
                    Add Photo
                  </button>
                </div>

                <div className="space-y-4">
                  {industrialVisitPhotos.map((photo, idx) => {
                    const uploadKey = `it-gallery-${idx}`;
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
                                  if (file) uploadItIndustrialVisitPhoto(idx, file);
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
                                  updateItIndustrialVisitPhoto(
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
                                    updateItIndustrialVisitPhoto(
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
                                    updateItIndustrialVisitPhoto(
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
                              onClick={() => deleteItIndustrialVisitPhoto(idx)}
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
                            {visit.industries.map((ind, i) => (
                              <div key={i} className="text-gray-700">
                                {ind}
                              </div>
                            ))}
                            {visit.report && (
                              <a
                                href={visit.report}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-ssgmce-blue hover:text-ssgmce-orange font-semibold text-xs mt-2"
                              >
                                <FaFileAlt className="text-xs" />
                                Detailed Report
                              </a>
                            )}
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
                        onClick={addItIndustrialVisitRowOnTop}
                        className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                      >
                        <FaPlus className="text-xs" />
                        Add New Row On Top
                      </button>
                    </div>
                  </div>
                  <MarkdownEditor
                    value={industrialVisitsMarkdown}
                    onSave={handleItIndustrialVisitsMarkdownSave}
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
                      const uploadKey = `it-industrial-visit-${visit.id}`;
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
                                    uploadItIndustrialVisitReport(visit.id, file);
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

    mous: (
      <div className="space-y-8">
        {(() => {
          const mous = getItMous();
          const mousMarkdown = getItMousMarkdown(mous);
          return (
            <>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">MoUs</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Strategic partnerships with industry leaders to enhance learning
                  outcomes and provide students with real-world exposure.
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
                        <button type="button" onClick={addItMouRowOnTop} className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange">
                          <FaPlus className="text-xs" />
                          Add New Row On Top
                        </button>
                      </div>
                    </div>
                    <MarkdownEditor value={mousMarkdown} onSave={handleItMousMarkdownSave} placeholder="MoUs table without serial-number column (GFM Markdown)..." />
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-gray-800">Upload MoU PDF / Report</h4>
                      <p className="text-sm text-gray-500 mt-1">Upload the PDF only for the row you want to attach a document to.</p>
                    </div>
                    <div className="space-y-3">
                      {mous.map((mou, idx) => {
                        const uploadKey = `it-mou-${mou.id}`;
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
                                    if (file) uploadItMouReport(mou.id, file);
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
                                  className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${pat.status === "Granted" ? "bg-green-100 text-green-700" : pat.status === "Registered" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}
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
                        {selectedResearchItems.map((book, i) => (
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
                        ))}
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
                      Keep the current public table layout while editing this
                      session through markdown, DOCX import, and the matching
                      template.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItResearchRowOnTop()}
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
                onSave={handleItResearchMarkdownSave}
                showDocImport
                docTemplateUrl={IT_RESEARCH_TEMPLATE_URLS[patentSubTab]}
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
                href={getItResearchReportUrl(year)}
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
                const uploadKey = `it-research-report-${year}`;
                const reportUrl = getItResearchReportUrl(year);
                return (
                  <div
                    key={`it-research-report-${year}`}
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
                              uploadItResearchReport(year, file);
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
                        Name of Intern
                      </th>
                      <th className="px-3 py-4 text-left font-bold">
                        Name of Industry / Organization
                      </th>
                      <th className="px-3 py-4 text-left font-bold">Class</th>
                      <th className="px-3 py-4 text-left font-bold">Duration</th>
                      <th className="px-3 py-4 text-left font-bold">Stipend</th>
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
                          {intern.duration}
                        </td>
                        <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                          {intern.stipend}
                        </td>
                      </tr>
                    ))}
                    {currentInternships.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
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
                docTemplateUrl="/uploads/documents/pride_templates/it_internships_template.docx"
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

    projects: (
      <div className="space-y-8">
        {(() => {
          const ugProjectYears = getUgProjectYears();
          const ugProjectRecords = t("ugProjects", defaultItUgProjects);
          const ugProjectMarkdownByYear = t("ugProjectsMarkdownByYear", {});
          const currentUgProjects = Array.isArray(ugProjectRecords?.[ugProjectYear])
            ? ugProjectRecords[ugProjectYear]
            : [];
          const selectedUgProjectsMarkdown =
            ugProjectMarkdownByYear?.[ugProjectYear] ||
            itUgProjectsToMarkdown({ [ugProjectYear]: currentUgProjects }, [
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
                  {currentUgProjects.some((p) => p.report) && (
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border border-gray-200 w-32">
                      Project Report
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUgProjects.map((project, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500 font-medium border border-gray-200 text-center">
                      {project.id || i + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                      {project.title}
                    </td>
                    {currentUgProjects.some((p) => p.report) && (
                      <td className="px-4 py-3 text-sm border border-gray-200 text-center">
                        {project.report ? (
                          <a
                            href={project.report}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-ssgmce-blue hover:text-ssgmce-orange font-medium text-xs"
                          >
                            <FaExternalLinkAlt className="text-xs" /> View
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                    )}
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
                  current frontend layout or using row-by-row project editing.
                </p>
              </div>
              <MarkdownEditor
                key={ugProjectYear}
                value={selectedUgProjectsMarkdown}
                onSave={handleUgProjectMarkdownSave}
                showDocImport
                docTemplateUrl="/uploads/documents/pride_templates/cse_ug_projects_template.docx"
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
                      table structure, plus DOCX import and template download
                      support for that session.
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

    services: (
      <div className="space-y-8">
        {/* Header */}
        <div className="max-w-4xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            Services Offered
          </h3>
          <p className="text-gray-600 leading-relaxed">
            The Department of Information Technology, SSGMCE, Shegaon is
            offering the following services to government organizations,
            research organizations, industries, and society, etc. under Research
            &amp; Development Policy, Industry-Interaction Policy, Consultancy
            Policy, Sponsored Project Policy, Community Development &amp;
            Extension Services, etc.
          </p>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div
            className="px-6 py-4 text-white flex items-center gap-3"
            style={{ backgroundColor: "#003366" }}
          >
            <FaLaptopCode className="text-2xl text-orange-400" />
            <h4 className="text-xl font-bold">
              Services Offered by the Department
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-sm font-bold text-gray-600 border border-gray-200 w-20">
                    Sr. No.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">
                    Service
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  "Basic Website Development (Static and Dynamic) using HTML",
                  "Advanced Website Development using PHP, JS, Python, etc.",
                  "Advanced Website Development with Features using ML, AI, DS, etc.",
                  "Software Development (ERP)",
                  "Customized Software Development",
                  "Android Application Development",
                  "E-Commerce Platform Development",
                  "Customized IoT Development",
                  "Workshops on Recent Technologies",
                  "Training Related to Accreditation (NAAC, NBA, ISO, etc.)",
                  "Mentor or Auditor for Accreditation (NAAC, NBA, ISO, etc.)",
                  "Training on IPR, Article Writing, etc.",
                  "Consultancy Services for IPR, Book Writing, etc.",
                  "Software / Hardware Testing Training and Consultancy Services",
                  "Cloud / Hosting Related Services",
                  "Academic Services (Paper Setting, External Examiner, etc.)",
                  "Computer Networking Related Services",
                ].map((service, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-center font-semibold text-gray-700 border border-gray-200">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-700 border border-gray-200">
                      {service}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PDF Download Link */}
        <div className="flex items-center gap-4">
          <a
            href="/uploads/documents/it_services/IT_Services_Offered.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm"
          >
            <FaFileAlt />
            View Original Document
          </a>
        </div>
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
      className={`relative w-full text-left px-4 py-2.5 rounded-lg text-[13px] transition-all duration-300 flex items-center justify-between group overflow-hidden
        ${
          activeTab === id
            ? "bg-[#003366] text-white shadow-md font-semibold"
            : "text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-700"
        }`}
    >
      <span className="flex items-center relative z-10">
        <span
          className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 ${activeTab === id ? "bg-white" : "bg-gray-300 group-hover:bg-[#FF6B00]"}`}
        ></span>
        {label}
      </span>
      {activeTab === id && <FaAngleRight className="text-white text-sm" />}
    </button>
  );

  return (
    <GenericPage title="Information Technology" backgroundImage={itBanner}>
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
              <div className="bg-[#FF6B00] p-4">
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
                        if (researchYearError) setResearchYearError("");
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

const IT_ACTIVITY_REMOTE_IMAGE_PREFIX =
  "https://www.ssgmce.ac.in/images/it_faculty/";

const getLocalItActivityImageUrl = (imageUrl = "") => {
  const normalizedUrl = String(imageUrl || "").trim();
  if (!normalizedUrl) return "";

  if (
    normalizedUrl
      .toLowerCase()
      .startsWith(IT_ACTIVITY_REMOTE_IMAGE_PREFIX.toLowerCase())
  ) {
    const fileName = normalizedUrl.split("/").pop()?.split("?")[0] || "";
    return fileName ? `/uploads/images/it/activities/${fileName}` : normalizedUrl;
  }

  return normalizedUrl;
};

const normalizeItActivity = (activity = {}) => ({
  title: String(activity.title || "").trim(),
  date: String(activity.date || "").trim(),
  participants: String(activity.participants || "").trim(),
  organizer: String(activity.organizer || "").trim(),
  resource: String(activity.resource || "").trim(),
  image: getLocalItActivityImageUrl(activity.image),
});

const defaultItActivityCards = defaultActivities.map(normalizeItActivity);

const formatItActivityMarkdownField = (label, value, includeEmpty = false) => {
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

const itActivitiesToMarkdown = (activities = []) =>
  activities
    .map((activity) => normalizeItActivity(activity))
    .filter((activity) => activity.title)
    .map((activity) =>
      [
        `## ${activity.title}`,
        formatItActivityMarkdownField("Date", activity.date, true),
        formatItActivityMarkdownField(
          "Participants",
          activity.participants,
          true,
        ),
        formatItActivityMarkdownField(
          "Organized by",
          activity.organizer,
          true,
        ),
        formatItActivityMarkdownField(
          "Resource Person",
          activity.resource,
          true,
        ),
        formatItActivityMarkdownField("Image", activity.image, true),
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

const parseItActivitiesMarkdown = (markdown = "") => {
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

      return normalizeItActivity({
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

export default IT;
