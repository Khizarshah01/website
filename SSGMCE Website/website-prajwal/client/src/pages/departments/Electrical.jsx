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
import electricalBanner from "../../assets/images/departments/electrical/Electrical Banner.png";
import hodPhoto from "../../assets/images/departments/electrical/HOD_ELECTRICAL.jpg";

// Industrial Visit Photos
import ivAdaniDahanu2025 from "../../assets/images/departments/electrical/industrial-visits/adani_dahanu_2025.png";
import ivApatapaAkola2025 from "../../assets/images/departments/electrical/industrial-visits/apatapa_akola_2025.png";
import ivAvaadaSolar2025 from "../../assets/images/departments/electrical/industrial-visits/avaada_solar_2025.png";
import ivTataPowerShahad2024 from "../../assets/images/departments/electrical/industrial-visits/tata_power_shahad_2024.png";
import ivAdaniDahanu2024 from "../../assets/images/departments/electrical/industrial-visits/adani_dahanu_2024.png";
import ivTataPowerMumbai2023 from "../../assets/images/departments/electrical/industrial-visits/tata_power_mumbai_2023.png";
import ivThermalParas2023 from "../../assets/images/departments/electrical/industrial-visits/thermal_paras_2023.png";
import ivAdaniPowerMumbai from "../../assets/images/departments/electrical/industrial-visits/adani_power_mumbai.png";
import ivThermalParas2022 from "../../assets/images/departments/electrical/industrial-visits/thermal_paras_2022.png";
import ivAbbNashik2018 from "../../assets/images/departments/electrical/industrial-visits/abb_nashik_2018.jpg";
import ivPowerinstNashik2018 from "../../assets/images/departments/electrical/industrial-visits/powerinst_nashik_2018.jpg";
import ivLegrandNashik2018 from "../../assets/images/departments/electrical/industrial-visits/legrand_nashik_2018.jpg";
import ivParasThermal2018 from "../../assets/images/departments/electrical/industrial-visits/paras_thermal_2018.jpg";
import ivVishwajeetNashik from "../../assets/images/departments/electrical/industrial-visits/vishwajeet_nashik.jpg";
import ivAdaniMundra2016 from "../../assets/images/departments/electrical/industrial-visits/adani_mundra_2016.jpg";
import srpPhoto from "../../assets/images/departments/electrical/faculty/SRP.jpg";
import { getPathWithTab, getRequestedTab } from "../../utils/navigation";
import uajPhoto from "../../assets/images/departments/electrical/faculty/UAJ.jpg";
import aujPhoto from "../../assets/images/departments/electrical/faculty/AUJ.jpg";
import ssjPhoto from "../../assets/images/departments/electrical/faculty/SSJ.jpg";
import prbPhoto from "../../assets/images/departments/electrical/faculty/PRB.jpg";
import rskPhoto from "../../assets/images/departments/electrical/faculty/RSKankale.jpg";
import mrcPhoto from "../../assets/images/departments/electrical/faculty/MRC.jpg";
import rkmPhoto from "../../assets/images/departments/electrical/faculty/RKM.jpg";
import gnbPhoto from "../../assets/images/departments/electrical/faculty/GNBonde.jpg";
import vskPhoto from "../../assets/images/departments/electrical/faculty/VSKarale.jpg";
import bsrPhoto from "../../assets/images/departments/electrical/faculty/BSRakhonde.jpg";
import prdPhoto from "../../assets/images/departments/electrical/faculty/PratikDhabe.jpg";
import vanPhoto from "../../assets/images/departments/electrical/faculty/vanagpure.png";
import gdkPhoto from "../../assets/images/departments/electrical/faculty/GDKhadsane.jpg";
import {
  defaultFaculty as ELECTRICAL_DEFAULT_FACULTY,
  defaultActivities,
  defaultNewsletters,
  defaultAchievements,
  defaultElectricalPatents,
  defaultElectricalPublications,
  defaultElectricalCopyrights,
  defaultElectricalBooks,
} from "../../data/electricalDefaults";
import { defaultPlacements } from "../../data/electricalPlacements";
import { defaultElectricalInternships } from "../../data/electricalInternships";
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
  FaMapMarkerAlt,
  FaSearchPlus,
  FaImages,
  FaFileAlt,
  FaPlus,
  FaTrash,
  FaUpload,
} from "react-icons/fa";

// ─── Pride section: markdown converter helpers ─────────────────────────────────

function elecToppersToMarkdown(toppers = []) {
  const rows = toppers.map(
    (s) =>
      `| ${s.year || ""} | ${s.name || ""} | ${s.rank || ""} | ${s.cgpa || ""} |`,
  );
  return [
    "## University Toppers",
    "",
    "| Year | Name of the Student | Univ. Topper Rank | Percentage/CGPA |",
    "|------|---------------------|-------------------|-----------------|",
    ...rows,
  ].join("\n");
}

function elecAlumniToMarkdown(alumni = []) {
  const rows = alumni.map(
    (a) => `| ${a.name || ""} | ${a.position || ""} | ${a.org || ""} |`,
  );
  return [
    "## Top Alumni of Department",
    "",
    "| Names of Alumni | Position | Names of Organisation |",
    "|-----------------|----------|-----------------------|",
    ...rows,
  ].join("\n");
}

function elecGateToMarkdown(gate = []) {
  const rows = gate.map(
    (s) =>
      `| ${s.year || ""} | ${s.sr || ""} | ${s.name || ""} | ${s.score || ""} | ${s.category || ""} |`,
  );
  return [
    "## GATE Qualified Students",
    "",
    "| Year | Sr.No | Name of Student | Valid Score | Category |",
    "|------|-------|-----------------|-------------|----------|",
    ...rows,
  ].join("\n");
}

function electricalInnovativePracticesToMarkdown(practicesData = []) {
  const rows = practicesData.map(
    (p) =>
      `| ${p.sn || ""} | ${p.faculty || ""} | ${p.subject || ""} | ${p.practice || ""} | ${p.link || ""} |`,
  );
  return [
    "## Innovative Practices in Teaching and Learning",
    "",
    "| S.N. | Faculty | Subject | Practice | Link |",
    "|------|---------|---------|----------|------|",
    ...rows,
  ].join("\n");
}

function electricalMarkdownToInnovativePractices(markdown = "") {
  if (!markdown || typeof markdown !== "string") {
    return [];
  }

  const lines = markdown.split("\n");
  const practices = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;

    if (
      !inTable &&
      trimmed.match(/^\|.*\|$/) &&
      !trimmed.match(/^\|[\s-|]+\|$/)
    ) {
      inTable = true;
      continue;
    }

    if (trimmed.match(/^\|[\s-|]+\|$/)) {
      continue;
    }

    if (inTable && trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const cells = trimmed
        .split("|")
        .map((cell) => cell.trim())
        .slice(1, -1);

      if (cells.length >= 5) {
        practices.push({
          sn: cells[0] || "",
          faculty: cells[1] || "",
          subject: cells[2] || "",
          practice: cells[3] || "",
          link: cells[4] || "",
          isExternal:
            (cells[4] || "").includes("http") ||
            (cells[4] || "").includes("youtu"),
        });
      }
    }
  }

  return practices;
}

const defaultElectricalIndustrialVisits = [
  {
    sn: "01",
    industries: ["Adani Dahanu Thermal Power Station, Mumbai"],
    class: "Third Year",
    date: "26/06/2025",
    students: "-",
    report: "",
  },
  {
    sn: "02",
    industries: ["400 KV Transmission Station, APATAPA Akola"],
    class: "Third Year",
    date: "27/03/2025",
    students: "-",
    report: "",
  },
  {
    sn: "03",
    industries: ["Avaada Energy 100 MW Solar Power Plant, Balapur"],
    class: "Third Year",
    date: "27/03/2025",
    students: "-",
    report: "",
  },
  {
    sn: "04",
    industries: ["TATA Power Shahad, Mumbai"],
    class: "Second Year",
    date: "27/11/2024",
    students: "-",
    report: "",
  },
  {
    sn: "05",
    industries: ["Adani Dahanu Thermal Power Station, Mumbai"],
    class: "Third Year",
    date: "08/06/2024",
    students: "-",
    report: "",
  },
  {
    sn: "06",
    industries: ["TATA Power, Mumbai"],
    class: "Third Year",
    date: "11/12/2023",
    students: "-",
    report: "",
  },
  {
    sn: "07",
    industries: ["Thermal Power Station, Paras"],
    class: "Second Year",
    date: "26/10/2023",
    students: "-",
    report: "",
  },
  {
    sn: "08",
    industries: ["Adani Power Station, Mumbai"],
    class: "Third Year",
    date: "2022-23",
    students: "-",
    report: "",
  },
  {
    sn: "09",
    industries: ["Thermal Power Station, Paras"],
    class: "Second Year",
    date: "28/11/2022",
    students: "-",
    report: "",
  },
  {
    sn: "10",
    industries: ["M/s. ABB Ltd., Nashik"],
    class: "Third Year",
    date: "27/08/2018",
    students: "-",
    report: "",
  },
  {
    sn: "11",
    industries: ["M/s. Powerinst Pvt. Ltd., Nashik"],
    class: "Third Year",
    date: "27/08/2018",
    students: "-",
    report: "",
  },
  {
    sn: "12",
    industries: ["M/s Legrand (India) Pvt. Ltd., Nashik"],
    class: "Third Year",
    date: "28/08/2018",
    students: "-",
    report: "",
  },
  {
    sn: "13",
    industries: ["Thermal Power Station, Paras"],
    class: "Second Year",
    date: "12/09/2018",
    students: "-",
    report: "",
  },
  {
    sn: "14",
    industries: ["Vishwajeet Capacitors Pvt Ltd., Nashik"],
    class: "Third Year",
    date: "2017-18",
    students: "-",
    report: "",
  },
  {
    sn: "15",
    industries: ["Adani Power Plant, Mundra, Gujarat"],
    class: "Third Year",
    date: "04-06/03/2016",
    students: "-",
    report: "",
  },
];

const defaultElectricalIndustrialVisitGallery = [
  {
    image: ivAdaniDahanu2025,
    caption:
      "Industrial visit to Adani Dahanu Thermal Power Station, Mumbai on 26 June 2025",
    location: "Mumbai",
    date: "26 June 2025",
  },
  {
    image: ivApatapaAkola2025,
    caption:
      "Industrial visit to 400 KV Transmission Station, APATAPA Akola on 27 March 2025",
    location: "Akola",
    date: "27 March 2025",
  },
  {
    image: ivAvaadaSolar2025,
    caption:
      "Industrial visit to Avaada Energy 100 MW Solar Power Plant, Balapur on 27 March 2025",
    location: "Balapur",
    date: "27 March 2025",
  },
  {
    image: ivTataPowerShahad2024,
    caption:
      "Industrial visit to TATA Power Shahad, Mumbai on 27 November 2024",
    location: "Mumbai",
    date: "27 November 2024",
  },
  {
    image: ivAdaniDahanu2024,
    caption:
      "Industrial visit to Adani Dahanu Thermal Power Station, Mumbai on 8 June 2024",
    location: "Mumbai",
    date: "8 June 2024",
  },
  {
    image: ivTataPowerMumbai2023,
    caption: "Industrial visit to TATA Power, Mumbai on 11 December 2023",
    location: "Mumbai",
    date: "11 December 2023",
  },
  {
    image: ivThermalParas2023,
    caption:
      "Second Year BE Electrical Engineering students visited Thermal Power Station, Paras on 26 October 2023",
    location: "Paras",
    date: "26 October 2023",
  },
  {
    image: ivAdaniPowerMumbai,
    caption: "Industrial visit to Adani Power Station, Mumbai during 2022-23",
    location: "Mumbai",
    date: "2022-23",
  },
  {
    image: ivThermalParas2022,
    caption:
      "Second Year BE Electrical Engineering students visited Thermal Power Station, Paras on 28 November 2022",
    location: "Paras",
    date: "28 November 2022",
  },
  {
    image: ivAbbNashik2018,
    caption:
      "Industrial visit to M/s. ABB Ltd., Nashik on 27 August 2018",
    location: "Nashik",
    date: "27 August 2018",
  },
  {
    image: ivPowerinstNashik2018,
    caption:
      "Industrial visit to M/s. Powerinst Pvt. Ltd., Nashik on 27 August 2018",
    location: "Nashik",
    date: "27 August 2018",
  },
  {
    image: ivLegrandNashik2018,
    caption:
      "Industrial visit to M/s Legrand (India) Pvt. Ltd., Nashik on 28 August 2018",
    location: "Nashik",
    date: "28 August 2018",
  },
  {
    image: ivParasThermal2018,
    caption:
      "Second Year BE Electrical Engineering students visited Thermal Power Station Paras on 12th September 2018",
    location: "Paras",
    date: "12 September 2018",
  },
  {
    image: ivVishwajeetNashik,
    caption:
      "Discussion with Expert from Industries during visit at Vishwajeet Capacitors Pvt Ltd. Nashik",
    location: "Nashik",
    date: "2017-18",
  },
  {
    image: ivAdaniMundra2016,
    caption:
      "Industrial visit at Adani Power Plant, Mundra Gujarat on 4-6 March 2016",
    location: "Mundra, Gujarat",
    date: "4-6 March 2016",
  },
];

const electricalExtractMarkdownLinkHref = (value = "") => {
  const match = String(value || "").match(/\[.*?\]\((.*?)\)/);
  return match?.[1]?.trim?.() || "";
};

const electricalParseMarkdownTableRow = (line = "") =>
  String(line || "")
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const electricalParseIndustrialVisitIndustries = (value = "") =>
  String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .split(/\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);

const electricalIndustrialVisitsToMarkdown = (visits = []) => {
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

const electricalParseIndustrialVisitsMarkdown = (markdown = "") => {
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
    .map((line) => electricalParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 5)
    .map((cells) => {
      const offset = cells.length >= 6 ? 1 : 0;
      return {
        industries: electricalParseIndustrialVisitIndustries(cells[offset] || ""),
        class: cells[offset + 1] || "",
        date: cells[offset + 2] || "",
        students: cells[offset + 3] || "",
        report: electricalExtractMarkdownLinkHref(cells.slice(offset + 4).join(" | ")),
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

const createElectricalIndustrialVisitId = () =>
  `electrical-industrial-visit-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getElectricalIndustrialVisitSignature = (visit = {}) =>
  JSON.stringify({
    industries: (Array.isArray(visit?.industries) ? visit.industries : [])
      .map((item) => String(item || "").trim().toLowerCase())
      .filter(Boolean),
    class: String(visit?.class || "").trim().toLowerCase(),
    date: String(visit?.date || "").trim().toLowerCase(),
    students: String(visit?.students || "").trim().toLowerCase(),
  });

const defaultElectricalMous = [
  { no: "1.", org: "I Robots Innovative Solutions, Pune", date: "05-Apr-2025", report: "/uploads/documents/electrical_mous/MOU_IRobots_Innovative_2025.pdf" },
  { no: "2.", org: "TATA Power Skill Development Institute (TPSDI), Shahad Mumbai", date: "21-Jun-2024", report: "/uploads/documents/electrical_mous/MOU_TPSDI_Mumbai_2024.pdf" },
  { no: "3.", org: "Adani Electricity Mumbai Limited, ADTPS, Dahanu", date: "01-Jun-2024", report: "/uploads/documents/electrical_mous/MOU_Adani_ADTPS_Dahanu_2024.pdf" },
  { no: "4.", org: "Mew Technology, Bengaluru", date: "04-Mar-2024", report: "/uploads/documents/electrical_mous/MOU_Mew_Technology_Bengaluru_2024.pdf" },
  { no: "5.", org: "Samarthan System Private Limited, Pune", date: "10-Jan-2024", report: "/uploads/documents/electrical_mous/MOU_Samarthan_System_Pune_2024.pdf" },
  { no: "6.", org: "SCR Elektronics, Mumbai", date: "08-Feb-2023", report: "/uploads/documents/electrical_mous/MOU_SCR_Elektronics_Mumbai_2023.pdf" },
  { no: "7.", org: "Mitsubishi Electric India Private Limited", date: "06-Jan-2023", report: "/uploads/documents/electrical_mous/MOU_Mitsubishi_Electric_2023.pdf" },
  { no: "8.", org: "Adani Electricity Mumbai Limited, ADTPS, Dahanu", date: "12-Feb-2022", report: "/uploads/documents/electrical_mous/MOU_Adani_ADTPS_Dahanu_2022.pdf" },
  { no: "9.", org: "ISIE INDIA, Noida", date: "18-Jan-2022", report: "/uploads/documents/electrical_mous/MOU_ISIE_India_Noida_2022.pdf" },
  { no: "10.", org: "VI Solutions, Bangalore", date: "28-Jan-2021", report: "/uploads/documents/electrical_mous/MOU_VI_Solutions_Bangalore_2021.pdf" },
  { no: "11.", org: "SCR Elektronics, Mumbai", date: "08-Feb-2020", report: "/uploads/documents/electrical_mous/MOU_SCR_Elektronics_Mumbai_2020.pdf" },
  { no: "12.", org: "TPSDI, Shahad Mumbai", date: "08-Sep-2018", report: "/uploads/documents/electrical_mous/MOU_TPSDI_Mumbai_2018.pdf" },
];

const electricalMousToMarkdown = (mous = []) => {
  const lines = ["## MoUs", "", "| Name of the Organization | MOU Signing Date | MOU Copy / Report |", "|--------------------------|------------------|-------------------|"];
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

const parseElectricalMousMarkdown = (markdown = "") => {
  const text = String(markdown || "").trim();
  if (!text) return [];
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return dataLines
    .map((line) => electricalParseMarkdownTableRow(line))
    .filter((cells) => cells.length >= 3)
    .map((cells) => ({ org: cells[0] || "", date: cells[1] || "", report: electricalExtractMarkdownLinkHref(cells.slice(2).join(" | ")) }))
    .filter((mou) => mou.org || mou.date || mou.report);
};

const createElectricalMouId = () =>
  `electrical-mou-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const getElectricalMouSignature = (mou = {}) =>
  JSON.stringify({ org: String(mou?.org || "").trim().toLowerCase(), date: String(mou?.date || "").trim().toLowerCase() });

const electricalPatentsToMarkdown = (items = [], year = "2024-25") => {
  const lines = [
    `## ${year}`,
    "",
    "| Title of Invention | Status | Application No. | Inventors | Link |",
    "|--------------------|--------|-----------------|-----------|------|",
  ];
  if (!items.length) return [...lines, "| Add invention title | Published | Add application no. | Add inventors | - |"].join("\n");
  items.forEach((item) => {
    lines.push(
      `| ${item?.title || "-"} | ${item?.status || "-"} | ${item?.id || "-"} | ${item?.inventors || "-"} | ${item?.link ? `[Open](${item.link})` : "-"} |`,
    );
  });
  return lines.join("\n");
};

const parseElectricalPatentsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };
  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return {
    year,
    items: dataLines
      .map((line) => electricalParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 5)
      .map((cells) => ({
        title: cells[0] || "",
        status: cells[1] || "",
        id: cells[2] || "",
        inventors: cells[3] || "",
        link: electricalExtractMarkdownLinkHref(cells.slice(4).join(" | ")),
      }))
      .filter((item) => item.title || item.status || item.id || item.inventors || item.link),
  };
};

const electricalPublicationsToMarkdown = (items = [], year = "2024-25") => {
  const lines = [
    `## ${year}`,
    "",
    "| Title of Paper | Authors | Journal Details | Link |",
    "|----------------|---------|-----------------|------|",
  ];
  if (!items.length) return [...lines, "| Add paper title | Add authors | Add journal details | - |"].join("\n");
  items.forEach((item) => {
    lines.push(
      `| ${item?.title || "-"} | ${item?.authors || "-"} | ${item?.journal || "-"} | ${item?.link ? `[View](${item.link})` : "-"} |`,
    );
  });
  return lines.join("\n");
};

const parseElectricalPublicationsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };
  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return {
    year,
    items: dataLines
      .map((line) => electricalParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        title: cells[0] || "",
        authors: cells[1] || "",
        journal: cells[2] || "",
        link: electricalExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.title || item.authors || item.journal || item.link),
  };
};

const electricalCopyrightsToMarkdown = (items = [], year = "2024-25") => {
  const lines = [
    `## ${year}`,
    "",
    "| Name of Faculty | Title of Work | Status | Link |",
    "|-----------------|---------------|--------|------|",
  ];
  if (!items.length) return [...lines, "| Add faculty name | Add title of work | Published | - |"].join("\n");
  items.forEach((item) => {
    lines.push(
      `| ${item?.name || "-"} | ${item?.title || "-"} | ${item?.status || "-"} | ${item?.link ? `[Open](${item.link})` : "-"} |`,
    );
  });
  return lines.join("\n");
};

const parseElectricalCopyrightsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };
  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return {
    year,
    items: dataLines
      .map((line) => electricalParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 4)
      .map((cells) => ({
        name: cells[0] || "",
        title: cells[1] || "",
        status: cells[2] || "",
        link: electricalExtractMarkdownLinkHref(cells.slice(3).join(" | ")),
      }))
      .filter((item) => item.name || item.title || item.status || item.link),
  };
};

const electricalBooksToMarkdown = (items = [], year = "2024-25") => {
  const lines = [
    `## ${year}`,
    "",
    "| Author(s) | Co-Authors | Title | Publisher | ISBN | Link |",
    "|-----------|------------|-------|-----------|------|------|",
  ];
  if (!items.length) return [...lines, "| Add author names | - | Add title | Add publisher | Add ISBN | - |"].join("\n");
  items.forEach((item) => {
    lines.push(
      `| ${item?.name || "-"} | ${item?.coAuthors || "-"} | ${item?.title || "-"} | ${item?.details || "-"} | ${item?.isbn || "-"} | ${item?.link ? `[Open](${item.link})` : "-"} |`,
    );
  });
  return lines.join("\n");
};

const parseElectricalBooksMarkdown = (markdown = "", fallbackYear = "2024-25") => {
  const text = String(markdown || "").trim();
  if (!text) return { year: fallbackYear, items: [] };
  const headingMatch = text.match(/^##\s+(.+)$/m);
  const year = headingMatch?.[1]?.trim() || fallbackYear;
  const tableLines = text.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("|"));
  const dataLines = tableLines.filter((line, index) => index > 1 && !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(line));
  return {
    year,
    items: dataLines
      .map((line) => electricalParseMarkdownTableRow(line))
      .filter((cells) => cells.length >= 6)
      .map((cells) => ({
        name: cells[0] || "",
        coAuthors: cells[1] || "",
        title: cells[2] || "",
        details: cells[3] || "",
        isbn: cells[4] || "",
        link: electricalExtractMarkdownLinkHref(cells.slice(5).join(" | ")),
      }))
      .filter((item) => item.name || item.coAuthors || item.title || item.details || item.isbn || item.link),
  };
};

const ELECTRICAL_RESEARCH_DEFAULTS = {
  patents: defaultElectricalPatents,
  publications: defaultElectricalPublications,
  copyrights: defaultElectricalCopyrights,
  books: defaultElectricalBooks,
};

const ELECTRICAL_RESEARCH_TO_MARKDOWN = {
  patents: electricalPatentsToMarkdown,
  publications: electricalPublicationsToMarkdown,
  copyrights: electricalCopyrightsToMarkdown,
  books: electricalBooksToMarkdown,
};

const ELECTRICAL_RESEARCH_FROM_MARKDOWN = {
  patents: parseElectricalPatentsMarkdown,
  publications: parseElectricalPublicationsMarkdown,
  copyrights: parseElectricalCopyrightsMarkdown,
  books: parseElectricalBooksMarkdown,
};

const ELECTRICAL_RESEARCH_TEMPLATE_URLS = {
  patents: "/uploads/documents/pride_templates/electrical_patents_template.docx",
  publications: "/uploads/documents/pride_templates/electrical_publications_template.docx",
  copyrights: "/uploads/documents/pride_templates/electrical_copyrights_template.docx",
  books: "/uploads/documents/pride_templates/electrical_books_template.docx",
};

const elecPrideTableComponents = {
  table: ({ node, ...props }) => <table className="w-full" {...props} />,
  thead: ({ node, ...props }) => (
    <thead className="bg-gray-50 border-b border-gray-200" {...props} />
  ),
  tbody: ({ node, ...props }) => (
    <tbody className="divide-y divide-gray-100" {...props} />
  ),
  tr: ({ node, ...props }) => (
    <tr className="hover:bg-gray-50 transition-colors" {...props} />
  ),
  th: ({ node, ...props }) => (
    <th
      className="px-6 py-4 text-left text-sm font-bold text-gray-700"
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td className="px-6 py-4 text-sm text-gray-700" {...props} />
  ),
};

const ElecPrideMdView = ({ markdown }) => {
  const lines = markdown.split("\n");
  const sections = [];
  let current = null;
  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      current = { heading: line.slice(3).trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current && current.body.length > 0) sections.push(current);

  if (!sections.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto p-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={elecPrideTableComponents}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {sections.map((section, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="bg-[#003366] text-white px-6 py-4">
            <h4 className="text-lg font-bold">{section.heading}</h4>
          </div>
          <div className="overflow-x-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={elecPrideTableComponents}
            >
              {section.body.join("\n").trim()}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

const Electrical = () => {
  const location = useLocation();
  // Load department data (works in both edit and public view modes)
  const {
    data: contextData,
    loading: dataLoading,
    isEditing,
    updateData,
    removeData,
    t: tBase,
  } = useDepartmentData("departments-electrical");
  const [activeTab, setActiveTab] = useState(() =>
    getRequestedTab(location, "overview")
  );
  const [achievementTab, setAchievementTab] = useState("faculty");
  const [certificateLightbox, setCertificateLightbox] = useState(null);
  const [projectYear, setProjectYear] = useState("2024-25");
  const [showAddUgProjectYear, setShowAddUgProjectYear] = useState(false);
  const [newUgProjectYear, setNewUgProjectYear] = useState("");
  const [ugProjectYearError, setUgProjectYearError] = useState("");
  const [internshipYear, setInternshipYear] = useState("2024-25");
  const [showAddInternshipYear, setShowAddInternshipYear] = useState(false);
  const [newInternshipYear, setNewInternshipYear] = useState("");
  const [internshipYearError, setInternshipYearError] = useState("");

  // State for Curricular Activities section
  const [activitiesVisible, setActivitiesVisible] = useState(6);
  const [lightboxActivity, setLightboxActivity] = useState(null);

  // State for Industrial Visit photo lightbox
  const [ivLightbox, setIvLightbox] = useState(null);

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

  // Helper to access data safely
  const t = (key, defaultVal) => {
    return (
      contextData?.templateData?.[key] ||
      tBase(`templateData.${key}`, defaultVal) ||
      defaultVal
    );
  };

  // Helper to update data
  const updateField = (key, value) => {
    updateData(`templateData.${key}`, value);
  };

  const updateFacultyMember = (index, field, value) => {
    const faculty = JSON.parse(
      JSON.stringify(t("facultyData", defaultFacultyData)),
    );
    faculty[index] = { ...faculty[index], [field]: value };
    updateField("facultyData", faculty);
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

  const electricalInternshipsToMarkdown = (records = [], year = "2024-25") => {
    const lines = [
      `## ${year}`,
      "",
      "| SIS ID | Name of Student | Class | Training / Internship | Name of Company | Duration | Start Date | End Date |",
      "|--------|-----------------|-------|------------------------|-----------------|----------|------------|----------|",
    ];

    if (!records.length) {
      lines.push("| Add SIS ID | Add student name | Add class | Add training type | Add company | Add duration | Add start date | Add end date |");
      return lines.join("\n");
    }

    records.forEach((intern) => {
      lines.push(
        `| ${intern?.sis || "-"} | ${intern?.name || "-"} | ${intern?.class || "-"} | ${intern?.training || "-"} | ${intern?.org || "-"} | ${intern?.duration || "-"} | ${intern?.startDate || "-"} | ${intern?.endDate || "-"} |`,
      );
    });

    return lines.join("\n");
  };

  const parseElectricalInternshipsMarkdown = (markdown = "", fallbackYear = "2024-25") => {
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
        !/^\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|\s*[-: ]+\|?\s*$/.test(
          line,
        ),
    );

    return {
      year,
      records: dataLines
        .map((line) => electricalParseMarkdownTableRow(line))
        .filter((cells) => cells.length >= 8)
        .map((cells, index) => ({
          no: String(index + 1),
          sis: cells[0] || "",
          name: cells[1] || "",
          class: cells[2] || "",
          training: cells[3] || "",
          org: cells[4] || "",
          duration: cells[5] || "",
          startDate: cells[6] || "",
          endDate: cells[7] || "",
        }))
        .filter(
          (intern) =>
            intern.sis ||
            intern.name ||
            intern.class ||
            intern.training ||
            intern.org ||
            intern.duration ||
            intern.startDate ||
            intern.endDate,
        ),
    };
  };

  const getElectricalIndustrialVisits = () =>
    JSON.parse(
      JSON.stringify(
        contextData?.templateData?.industrialVisits?.items ||
          tBase(
            "templateData.industrialVisits.items",
            defaultElectricalIndustrialVisits,
          ) ||
          defaultElectricalIndustrialVisits,
      ),
    ).map((visit) => ({
      ...visit,
      id: String(visit?.id || createElectricalIndustrialVisitId()),
    }));

  const getElectricalIndustrialVisitsMarkdown = (visits) =>
    electricalIndustrialVisitsToMarkdown(visits);

  const persistElectricalIndustrialVisits = (visits) => {
    const normalizedVisits = (Array.isArray(visits) ? visits : []).map((visit) => ({
      id: String(visit?.id || createElectricalIndustrialVisitId()).trim(),
      industries: Array.isArray(visit?.industries)
        ? visit.industries.map((item) => String(item || "").trim()).filter(Boolean)
        : [],
      class: String(visit?.class || "").trim(),
      date: String(visit?.date || "").trim(),
      students: String(visit?.students || "").trim(),
      report: String(visit?.report || "").trim(),
    }));

    updateData("templateData.industrialVisits.items", normalizedVisits);
    updateData(
      "templateData.industrialVisits.markdown",
      electricalIndustrialVisitsToMarkdown(normalizedVisits),
    );
  };

  const handleElectricalIndustrialVisitsMarkdownSave = (markdown) => {
    const parsed = electricalParseIndustrialVisitsMarkdown(markdown);
    const existingVisits = getElectricalIndustrialVisits();
    const signaturePool = new Map();
    existingVisits.forEach((visit) => {
      const signature = getElectricalIndustrialVisitSignature(visit);
      const matches = signaturePool.get(signature) || [];
      matches.push(visit);
      signaturePool.set(signature, matches);
    });
    const usedIds = new Set();
    const mergedVisits = parsed.map((visit, index) => {
      const signature = getElectricalIndustrialVisitSignature(visit);
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
        id: match?.id || createElectricalIndustrialVisitId(),
        industries: visit.industries,
        class: visit.class,
        date: visit.date,
        students: visit.students,
        report: visit.report || match?.report || "",
      };
    });
    persistElectricalIndustrialVisits(mergedVisits);
  };

  const addElectricalIndustrialVisitRowOnTop = () => {
    const visits = getElectricalIndustrialVisits();
    persistElectricalIndustrialVisits([
      {
        id: createElectricalIndustrialVisitId(),
        industries: ["New Industry / Organization"],
        class: "Add class",
        date: "Add date",
        students: "Add students",
        report: "",
      },
      ...visits,
    ]);
  };

  const uploadElectricalIndustrialVisitReport = async (visitId, file) => {
    if (!file) return;

    const uploadKey = `electrical-industrial-visit-${visitId}`;
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

      const visits = getElectricalIndustrialVisits();
      persistElectricalIndustrialVisits(
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
      console.error("Electrical industrial visit report upload failed:", error);
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

  const getElectricalIndustrialVisitGallery = () =>
    JSON.parse(
      JSON.stringify(
        contextData?.templateData?.industrialVisits?.gallery ||
          tBase(
            "templateData.industrialVisits.gallery",
            defaultElectricalIndustrialVisitGallery,
          ) ||
          defaultElectricalIndustrialVisitGallery,
      ),
    );

  const persistElectricalIndustrialVisitGallery = (photos) => {
    const normalizedPhotos = (Array.isArray(photos) ? photos : []).map((photo) => ({
      image: String(photo?.image || "").trim(),
      caption: String(photo?.caption || "").trim(),
      location: String(photo?.location || "").trim(),
      date: String(photo?.date || "").trim(),
    }));

    updateData("templateData.industrialVisits.gallery", normalizedPhotos);
  };

  const addElectricalIndustrialVisitPhoto = () => {
    const photos = getElectricalIndustrialVisitGallery();
    photos.unshift({
      image: "",
      caption: "Add visit photo caption",
      location: "Add location",
      date: "Add date",
    });
    persistElectricalIndustrialVisitGallery(photos);
  };

  const updateElectricalIndustrialVisitPhoto = (index, field, value) => {
    const photos = getElectricalIndustrialVisitGallery();
    photos[index] = {
      ...photos[index],
      [field]: value,
    };
    persistElectricalIndustrialVisitGallery(photos);
  };

  const deleteElectricalIndustrialVisitPhoto = (index) => {
    const photos = getElectricalIndustrialVisitGallery();
    persistElectricalIndustrialVisitGallery(
      photos.filter((_, photoIndex) => photoIndex !== index),
    );
  };

  const uploadElectricalIndustrialVisitPhoto = async (index, file) => {
    if (!file) return;

    const uploadKey = `electrical-gallery-${index}`;
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

      updateElectricalIndustrialVisitPhoto(index, "image", response.data.fileUrl);
    } catch (error) {
      console.error("Electrical industrial visit gallery upload failed:", error);
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

  const getElectricalMous = () =>
    JSON.parse(
      JSON.stringify(
        contextData?.templateData?.mous?.items ||
          tBase("templateData.mous.items", defaultElectricalMous) ||
          defaultElectricalMous,
      ),
    ).map((mou) => ({ ...mou, id: String(mou?.id || createElectricalMouId()) }));

  const getElectricalMousMarkdown = (mous = getElectricalMous()) =>
    electricalMousToMarkdown(mous);

  const persistElectricalMous = (mous) => {
    const normalizedMous = (Array.isArray(mous) ? mous : []).map((mou) => ({
      id: String(mou?.id || createElectricalMouId()).trim(),
      org: String(mou?.org || "").trim(),
      date: String(mou?.date || "").trim(),
      report: String(mou?.report || "").trim(),
    }));
    updateData("templateData.mous.items", normalizedMous);
    updateData("templateData.mous.markdown", electricalMousToMarkdown(normalizedMous));
  };

  const handleElectricalMousMarkdownSave = (markdown) => {
    const parsed = parseElectricalMousMarkdown(markdown);
    const existingMous = getElectricalMous();
    const signaturePool = new Map();
    existingMous.forEach((mou) => {
      const signature = getElectricalMouSignature(mou);
      const matches = signaturePool.get(signature) || [];
      matches.push(mou);
      signaturePool.set(signature, matches);
    });
    const usedIds = new Set();
    const mergedMous = parsed.map((mou, index) => {
      const signature = getElectricalMouSignature(mou);
      let match = (signaturePool.get(signature) || []).find((item) => !usedIds.has(item.id));
      if (!match) {
        const fallback = existingMous[index];
        if (fallback && !usedIds.has(fallback.id)) match = fallback;
      }
      if (match?.id) usedIds.add(match.id);
      return { id: match?.id || createElectricalMouId(), org: mou.org, date: mou.date, report: mou.report || match?.report || "" };
    });
    persistElectricalMous(mergedMous);
  };

  const addElectricalMouRowOnTop = () => {
    const mous = getElectricalMous();
    persistElectricalMous([{ id: createElectricalMouId(), org: "New organization", date: "Add signing date", report: "" }, ...mous]);
  };

  const uploadElectricalMouReport = async (mouId, file) => {
    if (!file) return;
    const uploadKey = `electrical-mou-${mouId}`;
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
        const mous = getElectricalMous();
        persistElectricalMous(mous.map((mou) => (mou.id === mouId ? { ...mou, report: response.data.fileUrl } : mou)));
      }
    } catch (error) {
      console.error("Electrical MOU upload failed:", error);
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

  const [researchTab, setResearchTab] = useState("toppers");
  const [researchYear, setResearchYear] = useState("2024-25");
  const [patentsTab, setPatentsTab] = useState("patents");
  const [patentsYear, setPatentsYear] = useState("2024-25");
  const patentsYears = [
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

  const getElectricalResearchItems = (section, year = patentsYear) =>
    JSON.parse(
      JSON.stringify(
        contextData?.templateData?.research?.[section]?.[year] ||
          tBase(`templateData.research.${section}.${year}`, ELECTRICAL_RESEARCH_DEFAULTS[section]?.[year] || []) ||
          ELECTRICAL_RESEARCH_DEFAULTS[section]?.[year] ||
          [],
      ),
    );

  const getElectricalResearchMarkdownValue = (section, year = patentsYear) => {
    const storedMarkdown =
      contextData?.templateData?.researchMarkdown?.[section]?.[year] ??
      tBase(`templateData.researchMarkdown.${section}.${year}`, null);
    if (typeof storedMarkdown === "string" && storedMarkdown.trim()) {
      return storedMarkdown;
    }
    return ELECTRICAL_RESEARCH_TO_MARKDOWN[section](
      getElectricalResearchItems(section, year),
      year,
    );
  };

  const getElectricalResearchYears = () => {
    const defaultResearchYears = [
      "2024-25",
      "2023-24",
      "2022-23",
      "2021-22",
      "2020-21",
      "2019-20",
      "2018-19",
    ];
    const configuredYears = Array.isArray(tBase("templateData.researchYears", null))
      ? tBase("templateData.researchYears", [])
      : [];
    const storedResearch = contextData?.templateData?.research || tBase("templateData.research", {});
    const storedResearchMarkdown =
      contextData?.templateData?.researchMarkdown || tBase("templateData.researchMarkdown", {});
    const discoveredYears = Object.keys(ELECTRICAL_RESEARCH_DEFAULTS).flatMap((section) => [
      ...Object.keys(ELECTRICAL_RESEARCH_DEFAULTS[section] || {}),
      ...Object.keys(storedResearch?.[section] && typeof storedResearch[section] === "object" ? storedResearch[section] : {}),
      ...Object.keys(
        storedResearchMarkdown?.[section] && typeof storedResearchMarkdown[section] === "object"
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

  const persistElectricalResearchSection = (section, items, year = patentsYear) => {
    const normalizedItems = Array.isArray(items) ? items : [];
    updateData(`templateData.research.${section}.${year}`, normalizedItems);
    updateData(
      `templateData.researchMarkdown.${section}.${year}`,
      ELECTRICAL_RESEARCH_TO_MARKDOWN[section](normalizedItems, year),
    );
  };

  const createEmptyElectricalResearchMarkdown = (section, year) =>
    ELECTRICAL_RESEARCH_TO_MARKDOWN[section]([], year);

  const handleElectricalResearchMarkdownSave = (markdown) => {
    const parser = ELECTRICAL_RESEARCH_FROM_MARKDOWN[patentsTab];
    const parsed = parser(markdown, patentsYear);
    persistElectricalResearchSection(patentsTab, parsed.items || [], patentsYear);
  };

  const addElectricalResearchRowOnTop = (section = patentsTab) => {
    const items = getElectricalResearchItems(section, patentsYear);
    const blankRows = {
      patents: { title: "Add invention title", status: "Published", id: "Add application no.", inventors: "Add inventors", link: "" },
      publications: { title: "Add paper title", authors: "Add authors", journal: "Add journal details", link: "" },
      copyrights: { name: "Add faculty name", title: "Add title of work", status: "Published", link: "" },
      books: { name: "Add author names", coAuthors: "", title: "Add title", details: "Add publisher", isbn: "Add ISBN", link: "" },
    };
    persistElectricalResearchSection(section, [blankRows[section] || {}, ...items], patentsYear);
  };

  const dynamicPatentsYears = getElectricalResearchYears();
  const selectedResearchItems = getElectricalResearchItems(patentsTab, patentsYear);
  const selectedResearchMarkdown = getElectricalResearchMarkdownValue(
    patentsTab,
    patentsYear,
  );

  useEffect(() => {
    if (!dynamicPatentsYears.length) return;
    if (!dynamicPatentsYears.includes(patentsYear)) {
      setPatentsYear(dynamicPatentsYears[0]);
    }
  }, [patentsYear, dynamicPatentsYears]);

  const handleAddResearchYear = () => {
    const normalizedYear = newResearchYear.trim();
    if (!isValidAcademicYear(normalizedYear)) {
      setResearchYearError("Enter a valid academic year like 2025-26.");
      return;
    }
    if (dynamicPatentsYears.includes(normalizedYear)) {
      setResearchYearError("That academic year already exists.");
      return;
    }
    Object.keys(ELECTRICAL_RESEARCH_DEFAULTS).forEach((section) => {
      updateData(`templateData.research.${section}.${normalizedYear}`, []);
      updateData(
        `templateData.researchMarkdown.${section}.${normalizedYear}`,
        createEmptyElectricalResearchMarkdown(section, normalizedYear),
      );
    });
    updateData("templateData.researchYears", [normalizedYear, ...dynamicPatentsYears]);
    setPatentsYear(normalizedYear);
    setNewResearchYear("");
    setResearchYearError("");
    setShowAddResearchYear(false);
  };

  const getElectricalResearchReportUrl = (year) =>
    String(
      (contextData?.templateData?.researchReports?.[year] ??
        tBase(
          `templateData.researchReports.${year}`,
          `/uploads/documents/electrical_publications/Electrical_${year}_Patent_Publication_Data.pdf`,
        )) ||
        "",
    ).trim();

  const uploadElectricalResearchReport = async (year, file) => {
    if (!file || !year) return;
    const uploadKey = `electrical-research-report-${year}`;
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
      updateData(`templateData.researchReports.${year}`, response.data.fileUrl);
    } catch (error) {
      console.error("Electrical research report upload failed:", error);
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

  const electricalUgProjectsToMarkdown = (
    projectsByYear = {},
    preferredYears = [],
  ) => {
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

  const parseElectricalUgProjectsMarkdown = (
    markdown = "",
    fallbackYear = "2024-25",
  ) => {
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

  const getUgProjectRecords = () => {
    const mergedRecords = {
      "2024-25": JSON.parse(
        JSON.stringify(t("ugProjects2425", defaultUgProjects2425)),
      ),
      "2023-24": JSON.parse(
        JSON.stringify(t("ugProjects2324", defaultUgProjects2324)),
      ),
    };

    const unifiedRecords = t("ugProjects", null);
    if (unifiedRecords && typeof unifiedRecords === "object") {
      Object.entries(unifiedRecords).forEach(([year, projects]) => {
        mergedRecords[year] = Array.isArray(projects)
          ? JSON.parse(JSON.stringify(projects))
          : [];
      });
    }

    return mergedRecords;
  };

  const getUgProjectYears = () => {
    const storedYears = Array.isArray(t("ugProjectYears", null))
      ? t("ugProjectYears", [])
      : [];
    const recordYears = Object.keys(getUgProjectRecords() || {});

    return [...new Set([...storedYears, ...recordYears])]
      .filter(Boolean)
      .sort(compareAcademicYearsDesc);
  };

  const getUgProjectMarkdownByYear = () =>
    JSON.parse(JSON.stringify(t("ugProjectsMarkdownByYear", {})));

  const persistUgProjects = (records, years = getUgProjectYears()) => {
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

    const existingMarkdownByYear = getUgProjectMarkdownByYear();
    const markdownByYear = orderedYears.reduce((acc, year) => {
      acc[year] =
        existingMarkdownByYear?.[year] ||
        electricalUgProjectsToMarkdown(
          { [year]: normalizedRecords[year] || [] },
          [year],
        );
      return acc;
    }, {});

    updateData("templateData.ugProjects", normalizedRecords);
    updateData("templateData.ugProjectYears", orderedYears);
    updateData("templateData.ugProjectsMarkdownByYear", markdownByYear);
    updateData(
      "templateData.ugProjects2425",
      normalizedRecords["2024-25"] || [],
    );
    updateData(
      "templateData.ugProjects2324",
      normalizedRecords["2023-24"] || [],
    );
  };

  const handleUgProjectMarkdownSave = (markdown) => {
    const parsed = parseElectricalUgProjectsMarkdown(markdown, projectYear);
    const mergedRecords = {
      ...getUgProjectRecords(),
      [projectYear]: parsed.records[projectYear] || [],
    };
    persistUgProjects(mergedRecords, getUgProjectYears());
    updateData(`templateData.ugProjectsMarkdownByYear.${projectYear}`, markdown);
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
      `templateData.ugProjectsMarkdownByYear.${normalizedYear}`,
      electricalUgProjectsToMarkdown({ [normalizedYear]: [] }, [normalizedYear]),
    );
    setProjectYear(normalizedYear);
    setNewUgProjectYear("");
    setUgProjectYearError("");
    setShowAddUgProjectYear(false);
  };

  const getInternshipYears = () => {
    const storedYears = Array.isArray(t("internshipsYears", null))
      ? t("internshipsYears", [])
      : [];
    const recordYears = Object.keys(
      t("internships", defaultElectricalInternships) || defaultElectricalInternships,
    ).filter(isAcademicYearKey);

    return [...new Set([...storedYears, ...recordYears])]
      .filter(Boolean)
      .sort(compareAcademicYearsDesc);
  };

  const getInternshipRecords = () =>
    JSON.parse(JSON.stringify(t("internships", defaultElectricalInternships)));

  const getInternshipMarkdownByYear = () =>
    JSON.parse(JSON.stringify(t("internshipsMarkdownByYear", {})));

  const createEmptyInternshipMarkdown = (year) =>
    electricalInternshipsToMarkdown([], year);

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
          class: String(intern?.class || "").trim(),
          training: String(intern?.training || "").trim(),
          org: String(intern?.org || "").trim(),
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
        electricalInternshipsToMarkdown(normalizedRecords[year] || [], year);
      return acc;
    }, {});

    updateData("templateData.internships", normalizedRecords);
    updateData("templateData.internshipsYears", orderedYears);
    updateData("templateData.internshipsMarkdownByYear", markdownByYear);
  };

  const internshipYears = getInternshipYears();
  const internshipRecords = getInternshipRecords();
  const internshipMarkdownByYear = getInternshipMarkdownByYear();
  const currentInternships = Array.isArray(internshipRecords?.[internshipYear])
    ? internshipRecords[internshipYear]
    : [];
  const selectedInternshipsMarkdown =
    internshipMarkdownByYear?.[internshipYear] ||
    electricalInternshipsToMarkdown(currentInternships, internshipYear);

  useEffect(() => {
    if (!internshipYears.length) return;
    if (!internshipYears.includes(internshipYear)) {
      setInternshipYear(internshipYears[0]);
    }
  }, [internshipYear, internshipYears]);

  const handleInternshipsMarkdownSave = (markdown) => {
    const parsed = parseElectricalInternshipsMarkdown(markdown, internshipYear);
    const records = {
      ...getInternshipRecords(),
      [internshipYear]: parsed.records || [],
    };
    persistInternships(records, internshipYears);
    updateData(
      `templateData.internshipsMarkdownByYear.${internshipYear}`,
      electricalInternshipsToMarkdown(parsed.records || [], internshipYear),
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
      `templateData.internshipsMarkdownByYear.${normalizedYear}`,
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

    updateData("templateData.placements.years", nextYears);
    updateData(`templateData.placements.details.${normalizedYear}`, "");
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

    updateData("templateData.placements.years", remainingYears);
    removeData(`templateData.placements.details.${year}`);
    removeData(`templateData.placements.markdown.${year}`);
    removeData(`templateData.placements.${year}`);

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
            onSave={(value) =>
              updateData(`templateData.placements.details.${placementYear}`, value)
            }
            showDocImport
            placeholder="Paste or import placement data (Markdown) here..."
          />
        ) : (
          <ElecPrideMdView markdown={markdown} />
        )}
      </div>
    );
  };

  // Curriculum management functions
  const updateCurriculumItem = (section, index, field, value) => {
    const current = JSON.parse(
      JSON.stringify(t("syllabusDocuments", defaultSyllabusDocuments)),
    );
    current[section][index] = { ...current[section][index], [field]: value };
    updateField("syllabusDocuments", current);
  };

  const addCurriculumItem = (section) => {
    const current = JSON.parse(
      JSON.stringify(t("syllabusDocuments", defaultSyllabusDocuments)),
    );
    current[section].push({
      label: "New Syllabus Item",
      link: "#",
      fileName: null,
      fileUrl: null,
    });
    updateField("syllabusDocuments", current);
  };

  const removeCurriculumItem = (section, index) => {
    const current = JSON.parse(
      JSON.stringify(t("syllabusDocuments", defaultSyllabusDocuments)),
    );
    current[section].splice(index, 1);
    updateField("syllabusDocuments", current);
    setSelectedCurriculumItems(
      selectedCurriculumItems.filter((k) => k !== `${section}-${index}`),
    );
  };

  const toggleCurriculumSelection = (section, index) => {
    const key = `${section}-${index}`;
    setSelectedCurriculumItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const deleteSelectedCurriculumItems = (section) => {
    const current = JSON.parse(
      JSON.stringify(t("syllabusDocuments", defaultSyllabusDocuments)),
    );
    const sectionSelected = selectedCurriculumItems
      .filter((k) => k.startsWith(`${section}-`))
      .map((k) => parseInt(k.split("-")[1]));
    current[section] = current[section].filter(
      (_, i) => !sectionSelected.includes(i),
    );
    updateField("syllabusDocuments", current);
    setSelectedCurriculumItems(
      selectedCurriculumItems.filter((k) => !k.startsWith(`${section}-`)),
    );
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
        // Batch all three fields in a single update to avoid stale state race condition
        const current = JSON.parse(
          JSON.stringify(t("syllabusDocuments", defaultSyllabusDocuments)),
        );
        current[section][index] = {
          ...current[section][index],
          fileUrl: response.data.fileUrl,
          fileName: response.data.originalName,
          link: response.data.fileUrl,
        };
        updateField("syllabusDocuments", current);
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

  const updateTable = (key, rowIndex, colIndex, val, defaultData) => {
    const current = t(key, defaultData);
    const newData = JSON.parse(JSON.stringify(current));
    newData[rowIndex][colIndex] = val;
    updateField(key, newData);
  };

  const updateActivity = (idx, field, value) => {
    const storedActivitiesMarkdown = t("activitiesMarkdown", "");
    const parsedActivities = parseElectricalActivitiesMarkdown(
      storedActivitiesMarkdown,
    );
    const sourceActivities = (
      parsedActivities.length
        ? parsedActivities
        : t("activities", defaultElectricalActivityCards)
    ).map(normalizeElectricalActivity);

    if (!sourceActivities[idx]) return;

    const nextActivities = sourceActivities.map((activity, activityIndex) =>
      activityIndex === idx
        ? normalizeElectricalActivity({
            ...activity,
            [field]: value,
          })
        : activity,
    );

    updateField("activities", nextActivities);
    updateField(
      "activitiesMarkdown",
      electricalActivitiesToMarkdown(nextActivities),
    );
  };

  const updateNewsletter = (type, index, field, value) => {
    if (type === "latest") {
      const latest = JSON.parse(
        JSON.stringify(t("newsletters_latest", defaultNewsletters.latest)),
      );
      latest[field] = value;
      updateField("newsletters_latest", latest);
    } else {
      const archives = JSON.parse(
        JSON.stringify(t("newsletters_archives", defaultNewsletters.archives)),
      );
      archives[index][field] = value;
      updateField("newsletters_archives", archives);
    }
  };

  const getStoredElectricalValue = (key) =>
    contextData?.templateData?.[key] ?? contextData?.[key];

  const latestNewsletterData =
    getStoredElectricalValue("newsletters_latest") || defaultNewsletters.latest;
  const newsletterArchivesData =
    getStoredElectricalValue("newsletters_archives") ||
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

    updateField("newsletters_latest", createEmptyLatestNewsletter());
    updateField("newsletters_archives", nextArchives);
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
        updateField("newsletters_latest", createLatestFromArchive(nextLatest));
        updateField("newsletters_archives", remainingArchives);
      } else {
        updateField("newsletters_latest", createEmptyLatestNewsletter());
        updateField("newsletters_archives", []);
      }
      return;
    }

    const currentArchives = JSON.parse(
      JSON.stringify(newsletterArchivesData || defaultNewsletters.archives),
    );
    const archiveToDelete = currentArchives[index];

    await deleteNewsletterFileIfNeeded(archiveToDelete?.link);

    updateField(
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
        updateField("newsletters_latest", {
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
        updateField("newsletters_archives", archives);
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

  const getAchievementItems = (section) =>
    JSON.parse(
      JSON.stringify(
        t(`achievements.${section}`, defaultAchievements[section] || []),
      ),
    );

  const achievementsToMarkdown = (section, items = []) =>
    items
      .map((item) =>
        [
          `## ${item.name || (section === "faculty" ? "Faculty Name" : "Student Name")}`,
          `- Achievement: ${item.achievement || ""}`,
          `- Category: ${item.category || ""}`,
          `- Certificate: ${item.image || ""}`,
          "",
          String(item.description || "").trim(),
        ]
          .filter((line, index, arr) => !(index === arr.length - 1 && !line))
          .join("\n"),
      )
      .join("\n\n");

  const persistAchievementItems = (section, items) => {
    updateField(`achievements.${section}`, items);
    updateField(
      `achievementsMarkdown.${section}`,
      achievementsToMarkdown(section, items),
    );
  };

  const updateAchievementItem = (section, index, field, value) => {
    const items = getAchievementItems(section);
    items[index] = {
      ...items[index],
      [field]: value,
    };
    persistAchievementItems(section, items);
  };

  const addAchievement = (section) => {
    const items = getAchievementItems(section);
    items.unshift({
      name: section === "faculty" ? "Faculty Name" : "Student Name",
      achievement: "New Achievement",
      description: "Add achievement description.",
      category: section === "faculty" ? "Recognition" : "Competition",
      image: "",
    });
    persistAchievementItems(section, items);
  };

  const getAchievementDeletableUploadPath = (link) => {
    if (typeof link !== "string" || !link.startsWith("/uploads/images/")) {
      return null;
    }
    if (link.includes("..")) return null;
    if (!link.startsWith("/uploads/images/image-")) return null;
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
    await deleteAchievementFileIfNeeded(items[index]?.image);
    persistAchievementItems(
      section,
      items.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const getAchievementFileName = (link) => {
    if (!link) return "No certificate uploaded";
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

      updateAchievementItem(section, index, "image", response.data.fileUrl);
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
      setAchievementUploadSuccess((prev) => ({ ...prev, [uploadKey]: "" }));
    } finally {
      setAchievementUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const handleAchievementFileChange = (section, index, event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;
    const isAllowed =
      file.type === "application/pdf" || file.type.startsWith("image/");
    if (!isAllowed) {
      alert("Please select an image or PDF file for the certificate.");
      return;
    }

    uploadAchievementFile(section, index, file);
  };

  const legacyActivities = (
    t("activities", defaultElectricalActivityCards) ||
    defaultElectricalActivityCards
  ).map(normalizeElectricalActivity);
  const storedActivitiesMarkdown = t("activitiesMarkdown", "");
  const parsedActivities = parseElectricalActivitiesMarkdown(
    storedActivitiesMarkdown,
  );
  const activitiesData = parsedActivities.length
    ? parsedActivities
    : legacyActivities;

  const updateActivityList = (updater) => {
    const nextActivities = updater(
      activitiesData.map((activity) => normalizeElectricalActivity(activity)),
    );
    updateField("activities", nextActivities);
    updateField(
      "activitiesMarkdown",
      electricalActivitiesToMarkdown(nextActivities),
    );
  };

  const addActivityCard = () => {
    updateActivityList((items) => [
      {
        title: "New Curricular Activity",
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

  const electricalActivityMarkdownComponents = {
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
          components={electricalActivityMarkdownComponents}
        >
          {trimmedValue}
        </ReactMarkdown>
      </div>
    );
  };

  const defaultBeDetails = [
    ["Degree", "Bachelor of Engineering in Electrical (Electronics & Power)"],
    ["Duration", "4 Year(8 Semesters) (Full time)"],
    ["Intake", "60 Students per year"],
    ["Establishment", "Year: 1983"],
    [
      "NBA Status",
      "Accredited by National Board of Accreditation for 03 years",
    ],
  ];

  const defaultMeDetails = [
    ["Degree", "M.E. (Electrical Power System)"],
    ["Duration", "2 Year(4 Semesters) (Full time)"],
    ["Intake", "18 Students per year"],
    ["Establishment", "Year: 1996"],
  ];

  const defaultPhdDetails = [
    ["Degree", "Ph. D in Electrical Engineering"],
    ["Duration", "3 Years"],
    ["Intake", "20 Students"],
  ];

  const defaultLaboratories = [
    {
      name: "Electrical Machines Laboratory",
      image: "",
      resources:
        "DC Motors & Generators, Induction motors, Synchronous motor, Alternators, Transformers, Special machines, MG Sets",
      facilities:
        "DSO, Rectifier, Resistive/ Inductive Loads, computer system, Measuring Instruments",
    },
    {
      name: "Switchgear and Protection Laboratory",
      image: "",
      resources:
        "Protection setup based on Over Current Relay, Earth fault Relay, Differential relay, Static Relay, Demonstration panel, MCB & RCCB Testing set, Microprocessor based Relay for induction motor Protection",
      facilities: "Relay Testing kit",
    },
    {
      name: "High Voltage Laboratory",
      image: "",
      resources:
        "100 kV AC Testing set, 100 kV DC Testing set,60 kV Automatic oil Testing Kit, vertical-horizontal sphere Gap, Insulator Testing Set",
      facilities: "Impulse Tester",
    },
    {
      name: "Control System Laboratory",
      image: "",
      resources:
        "D.C.M-G set, Synchro-Transmitter & Receiver, Single Phase transformer for scott connection, DSO",
      facilities: "Stepper Motor, Regulated D.C. Power Supply",
    },
    {
      name: "Electrical Measurement Laboratory",
      image: "",
      resources: "Three Phase Induction motor, Regulated D.C. Power Supply",
      facilities:
        "Various types of bridge for measurement of inductance & capacitance",
    },
    {
      name: "Basic Electrical Engineering Laboratory",
      image: "",
      resources:
        "Single Phase transformer, Three Phase Auto Transformer, Regulated D.C. Power Supply",
      facilities: "R-L-C kit, Resistive Load Bank",
    },
    {
      name: "Computer Laboratory",
      image: "",
      resources:
        "20 Desktop Computers, MATLAB, PSCAD, ETAP software's, d-SPACE Hardware kit",
      facilities: "",
    },
    {
      name: "Microprocessor and Microcontroller Laboratory",
      image: "",
      resources: "Microprocessor & Microcontroller Kit with power supply",
      facilities: "",
    },
    {
      name: "PLC & Factory Automation Laboratory",
      image: "",
      resources: "Basic Fabrication Facility, Desktop Computers",
      facilities:
        "MATLAB, PSCAD, ETAP software, Transformer with various toppings, Induction Motor",
    },
    {
      name: "Power Quality Laboratory",
      image: "",
      resources: "Power Quality Analyzer, Data Acquisition System, DSO, etc.",
      facilities:
        "MATLAB, PSCAD, Transformer with various toppings, Induction Motor",
    },
    {
      name: "Electrical Power Research Lab",
      image: "",
      resources:
        "Lab VIEW, Data Acquisition system (NI & AD Link), CT/PT's., Compact-Rio, PCB Design facilities, Desktop Computers",
      facilities: "",
    },
    {
      name: "Centre of Excellence in Electric Vehicle",
      image: "",
      resources:
        "Trainer Kits for BLDC Drive, Simulators, Battery Management Systems, Solar based Charging Station, Conference room, WiFi connectivity",
      facilities: "",
    },
    {
      name: "Center of Excellence in Renewable Energy",
      image: "",
      resources:
        "Solar Research Lab, Sun Simulators, Battery Assembly setup, Solar panel Production facility, Solar Product Display gallery, Solar Radiation measurement facility, etc.",
      facilities: "",
    },
  ];

  // Photo map to resolve string keys from electricalDefaults to actual imports
  const electricalPhotoMap = {
    SRP: srpPhoto,
    UAJ: uajPhoto,
    AUJ: aujPhoto,
    SSJ: ssjPhoto,
    PRB: prbPhoto,
    RSK: rskPhoto,
    MRC: mrcPhoto,
    RKM: rkmPhoto,
    GNB: gnbPhoto,
    VSK: vskPhoto,
    BSR: bsrPhoto,
    PRD: prdPhoto,
    VAN: vanPhoto,
    GDK: gdkPhoto,
  };

  // Resolve photos and build the faculty data from defaults
  const defaultFacultyData = ELECTRICAL_DEFAULT_FACULTY.map((fac) => ({
    ...fac,
    photo: electricalPhotoMap[fac.photo] || fac.photo,
  }));

  const defaultPrideToppers = [
    { year: "2025", name: "Vaishnavi Keshav Pesode", rank: "II", cgpa: "9.28" },
    { year: "2024", name: "Sakshi Raju Sondkar", rank: "I", cgpa: "8.98" },
    {
      year: "2024",
      name: "Chetan Ashokrao Ambalkar",
      rank: "II",
      cgpa: "8.93",
    },
    { year: "2024", name: "Kalyani Dilip Raut", rank: "III", cgpa: "8.90" },
    { year: "2024", name: "Gauri Santosh Murkar", rank: "IV", cgpa: "8.88" },
    {
      year: "2023",
      name: "Harsha Dyaneshwar Lande",
      rank: "III",
      cgpa: "8.97",
    },
    { year: "2023", name: "Pranali Vijay Kharate", rank: "V", cgpa: "8.91" },
    { year: "2023", name: "Tejaswini Sanjay Masane", rank: "VI", cgpa: "8.88" },
    {
      year: "2023",
      name: "Harshal Chakradhar Shegokar",
      rank: "VI",
      cgpa: "8.88",
    },
    {
      year: "2023",
      name: "Prajwal Devndra Thakare",
      rank: "VII",
      cgpa: "8.84",
    },
    { year: "2023", name: "Abhishek Vinode Bathe", rank: "VIII", cgpa: "8.71" },
    {
      year: "2022",
      name: "Ms. Pallavi Dayaram Arbat",
      rank: "I",
      cgpa: "9.79",
    },
    { year: "2022", name: "Mr. Divyanshu Raj", rank: "II", cgpa: "9.64" },
    {
      year: "2022",
      name: "Ms. Manasi Udaysingh Rajput",
      rank: "III",
      cgpa: "9.53",
    },
    {
      year: "2022",
      name: "Ms. Krutika Ganesh Akhare",
      rank: "VI",
      cgpa: "9.38",
    },
    { year: "2022", name: "Mr. Krunal Ajay Rokade", rank: "VII", cgpa: "9.36" },
    {
      year: "2022",
      name: "Ms. Ashwini Prakash Wagh",
      rank: "VIII",
      cgpa: "9.34",
    },
    {
      year: "2022",
      name: "Ms. Shivani Shridhar Manatkar",
      rank: "IX",
      cgpa: "9.30",
    },
    {
      year: "2022",
      name: "Ms. Ashwini Mahadev Rajagur",
      rank: "IX",
      cgpa: "9.30",
    },
    {
      year: "2022",
      name: "Mr. Pradip Samdhan Tayde",
      rank: "IX",
      cgpa: "9.30",
    },
    {
      year: "2022",
      name: "Ms. Neha Rajendra Deshmukh",
      rank: "X",
      cgpa: "9.28",
    },
    {
      year: "2022",
      name: "Mr. Rushikesh Dinesh Bodade",
      rank: "X",
      cgpa: "9.28",
    },
  ];

  const defaultPrideAlumni = [
    {
      name: "Uday Sampat",
      position: "Vice President",
      org: "ABB India Ltd., Nashik",
    },
    {
      name: "Sandeep Narale",
      position: "Vice President",
      org: "Adani Electricity, Mumbai",
    },
    {
      name: "Gajanan Kale",
      position: "Chief Executive Officer",
      org: "Tata Power Western Odisha Distribution Limited, Sambalpur",
    },
    {
      name: "Dhananjay Sambare",
      position: "Director - Commerial",
      org: "DSM Energy, Melbourne, Victoria, Australia",
    },
    {
      name: "Shreerang Deshmukh",
      position: "Electrical Manager",
      org: "Megaplast India Pvt. Ltd., Daman",
    },
    {
      name: "Nitinkumar Gaikwad",
      position: "Business Relationship Manager",
      org: "TCS Ltd, Frankfurt, Hesse, Germany.",
    },
    { name: "Pushpen Chandra", position: "Mejor", org: "Indian Army, Ranchi" },
    {
      name: "Kinnari Mehta",
      position: "Marketing Manager",
      org: "w. r. grace & Conn, Columbia, USA",
    },
    {
      name: "Shivdeep Lande",
      position: "IPS",
      org: "DIG - Kosi Division Bihar",
    },
  ];

  const defaultPrideGate = [
    {
      year: "2022",
      sr: "1",
      name: "Priyatosh Chatterjee",
      score: "32.00",
      category: "OPEN",
    },
    {
      year: "2021",
      sr: "1",
      name: "Mithilesh Sharad Joshi",
      score: "53.33",
      category: "OPEN",
    },
    {
      year: "2021",
      sr: "2",
      name: "Prajwal Balu Range",
      score: "29.00",
      category: "OBC",
    },
    {
      year: "2021",
      sr: "3",
      name: "Dhiraj Mukundrao Gaygol",
      score: "67.00",
      category: "OBC",
    },
    {
      year: "2021",
      sr: "4",
      name: "Akshay Chandrakant Borle",
      score: "37.67",
      category: "OBC",
    },
    {
      year: "2020",
      sr: "1",
      name: "Mr. Ankush Bhople",
      score: "33.67",
      category: "OBC",
    },
    {
      year: "2020",
      sr: "2",
      name: "Mr. Prajwal Sontakke",
      score: "32.00",
      category: "OBC",
    },
    {
      year: "2020",
      sr: "3",
      name: "Mr. Rupesh Bali",
      score: "22.67",
      category: "SC/ST",
    },
    {
      year: "2020",
      sr: "4",
      name: "Jayshree Suresh Mali",
      score: "46.67",
      category: "OBC",
    },
    {
      year: "2020",
      sr: "5",
      name: "Akanksha Vishwadeep Waghmare",
      score: "26.33",
      category: "SC/ST",
    },
    {
      year: "2020",
      sr: "6",
      name: "Neha Pralhad Wawge",
      score: "31.67",
      category: "OBC",
    },
    {
      year: "2020",
      sr: "7",
      name: "Bhumika Arvind Akade",
      score: "32.67",
      category: "OBC",
    },
    {
      year: "2020",
      sr: "8",
      name: "Vaibhav Purushottam Bhutada",
      score: "43.33",
      category: "OPEN",
    },
    {
      year: "2019",
      sr: "1",
      name: "Jayshree Suresh Mali",
      score: "43.67",
      category: "OBC",
    },
    {
      year: "2019",
      sr: "2",
      name: "Kaustubh Suresh Badhe",
      score: "39.33",
      category: "OBC",
    },
    {
      year: "2019",
      sr: "3",
      name: "Krushna Sudhakarrao Kokate",
      score: "35.67",
      category: "OBC",
    },
    {
      year: "2017",
      sr: "1",
      name: "Harshal P. Muley",
      score: "-",
      category: "-",
    },
    {
      year: "2017",
      sr: "2",
      name: "Rohit R. Kulkarni",
      score: "-",
      category: "-",
    },
  ];

  const defaultStudentChapterObjectives = [
    "To Encourage the students to develop their intra-personal & inter-personal skills.",
    "To Develop a healthy competitive spirit by competing with students of other departments & colleges.",
    "To arrange the expert lectures, workshops, Hands on training competitions and carrier guidance programs for the students.",
    "To provide a platform to interact with the eminent personalities from industries and organizations, students from other reputed Engineering Institutes or colleges.",
    "To carry out feedback analysis after execution of the program which helps to improve the execution of further programs.",
  ];

  const defaultUgProjects2425 = [
    {
      no: "1.",
      title:
        "Simulation Evaluation of lightning and non-lightning faults identification of transmission line",
    },
    {
      no: "2.",
      title: "Solar Sea water Desalination Machine with RO UV Purifier",
    },
    {
      no: "3.",
      title:
        "Design and Fabrication of control Panel for multi stack parking system",
    },
    {
      no: "4.",
      title: "Design of Bi-directional DC-DC driver for electric vehicle",
    },
    {
      no: "5.",
      title: "Modeling and fabrication of solar powered smart Air Cooler",
    },
    {
      no: "6.",
      title: "The future of Agriculture: Innovation in Agriculture Technology",
    },
    {
      no: "7.",
      title: "Smart Helmet for Visually impaired people Using Arduino",
    },
    {
      no: "8.",
      title:
        "Automatic Power Factor Correction with all measurements over LORA wireless Communication",
    },
    { no: "9.", title: "IOT based smart Saline Bottle Monitoring System" },
    { no: "10.", title: "Wire-Less Charger for light electric Vehicle" },
    {
      no: "11.",
      title:
        "Smart Solar panel Monitoring using IOT based and Wireless Data Transmission",
    },
    { no: "12.", title: "Indoor navigation system for visually Impaired" },
    {
      no: "13.",
      title:
        "Transmission line faults event reorganization by using optimal machine learning approach",
    },
  ];

  const defaultUgProjects2324 = [
    {
      no: "1.",
      title:
        "Energy Audit case study of tobacco factory collaboration with FASTTRACK PACKERS PVT. LTD.",
    },
    {
      no: "2.",
      title:
        "The Green breathfor survival of mankind in 21st century using sustainable air purifier",
    },
    { no: "3.", title: "Development of Smart Home Automation System." },
    { no: "4.", title: "Fruit Plucking Arm" },
    {
      no: "5.",
      title:
        "Electrical Heavy Vehicle Transportation Highway (By Catenary System)",
    },
    {
      no: "6.",
      title:
        "Discrimination of magnetizing inrush current and internal fault in Transformer.",
    },
    { no: "7.", title: "Development of IOT Based Smart Energy Meter." },
    {
      no: "8.",
      title:
        "Detection and Classification of Underlying Reasons of Power Quality Disturbance Using Signal Processing and Soft Computing Techniques",
    },
  ];

  const defaultPeos = [
    "Expertise and use it for problem solving in analysis & design of electrical system.",
    "Commitment in the engineering profession or other professional careers with high human values.",
    "Lifelong learning and adapting to a constantly changing field through graduate work, professional experience and self-study.",
    "Leadership and initiative to ethically advance professional and organizational goals and facilitate the achievements of others.",
    "Teamwork commitment for working with others of diverse cultural and interdisciplinary backgrounds.",
  ];

  const defaultPsos = [
    "Demonstrate proficiency in the design, analysis, and optimization of Electrical Power Systems, addressing complex engineering challenges and system parameters.",
    "Apply advanced engineering principles, technical knowledge, problem-solving strategies along with modern tools in the development and control of Electrical Machines and systems.",
  ];

  const defaultPos = [
    {
      t: "Engineering knowledge",
      d: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.",
    },
    {
      t: "Problem analysis",
      d: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.",
    },
    {
      t: "Design/development of solutions",
      d: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.",
    },
    {
      t: "Conduct investigations of complex problems",
      d: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.",
    },
    {
      t: "Modern tool usage",
      d: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.",
    },
    {
      t: "The engineer and society",
      d: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.",
    },
    {
      t: "Environment and sustainability",
      d: "Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.",
    },
    {
      t: "Ethics",
      d: "Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.",
    },
    {
      t: "Individual and team work",
      d: "Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.",
    },
    {
      t: "Communication",
      d: "Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.",
    },
    {
      t: "Project management and finance",
      d: "Demonstrate knowledge and understanding of the engineering and management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.",
    },
    {
      t: "Life-long learning",
      d: "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.",
    },
  ];

  // defaultNewsletters is now imported from electricalDefaults.js

  // defaultAchievements is now imported from electricalDefaults.js

  const defaultCourseMaterials = [
    {
      year: "First Year",
      title: "BE First Year",
      link: "https://drive.google.com/drive/folders/13DXjK9HfR3NiKSrnqADVzx4uhPBIcS_5",
    },
    {
      year: "Second Year",
      title: "Third Semester",
      link: "https://drive.google.com/drive/folders/1KzKYf4waSbd062bLD8I2Xo8-mtoK87Dn",
    },
    {
      year: "Second Year",
      title: "Fourth Semester",
      link: "https://drive.google.com/drive/folders/1zCpp_E_N3lODX7aUGIQKmgzkZaSGSIqh",
    },
    {
      year: "Third Year",
      title: "Fifth Semester",
      link: "https://drive.google.com/drive/folders/1cOhiB-ghs-XL4qsCO4yIhDzAczg2oHSl",
    },
    {
      year: "Third Year",
      title: "Sixth Semester",
      link: "https://drive.google.com/drive/folders/11-t6MRGXfGu11Ty6AFi-rgtlDO_hEwmP",
    },
    {
      year: "Final Year",
      title: "Seventh Semester",
      link: "https://drive.google.com/drive/folders/1SR-mGfxTKHc2oZnCs26mt9bboLGL6eA8",
    },
    {
      year: "Final Year",
      title: "Eighth Semester",
      link: "https://drive.google.com/drive/folders/1OR5lp0rL3J6FVbULbcvjn-AB2XD_Iwwf",
    },
  ];

  const getCourseMaterials = () =>
    JSON.parse(JSON.stringify(t("courseMaterials", defaultCourseMaterials)));

  const updateCourseMaterial = (index, field, value) => {
    const items = getCourseMaterials();
    if (!items[index]) return;
    items[index] = { ...items[index], [field]: value };
    updateField("courseMaterials", items);
  };

  const addCourseMaterial = () => {
    const items = getCourseMaterials();
    updateField("courseMaterials", [
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
    updateField(
      "courseMaterials",
      items.filter((_, itemIndex) => itemIndex !== index),
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
    activeTab,
    courseMaterialItems.length,
    isEditing,
    shouldScrollToNewCourseMaterial,
  ]);

  const defaultInnovativePractices = [
    {
      sn: "01",
      faculty: "Dr. S. R. Paraskar",
      subject: "Power System II",
      practice: "Simulation-Based Learning (Matlab)",
      link: "/uploads/documents/electrical_innovative/SRP_PowerSystemII_Simulation.pdf",
    },
    {
      sn: "02",
      faculty: "Dr. A. U. Jawadekar",
      subject: "Signals & Systems",
      practice: "Mindmap",
      link: "/uploads/documents/electrical_innovative/AUJ_Signals_Systems_Mindmap.pdf",
    },
    {
      sn: "",
      faculty: "",
      subject: "Advanced Control System",
      practice: "MATLAB Simulation",
      link: "/uploads/documents/electrical_innovative/AUJ_Advanced_Control_System_Matlab.pdf",
      rowSpanParent: false,
    },
    {
      sn: "",
      faculty: "",
      subject: "Electromagnetic Field",
      practice: "Think Pair and Share",
      link: "/uploads/documents/electrical_innovative/AUJ_Electromagnetic_Field_ThinkPairShare.pdf",
      rowSpanParent: false,
    },
    {
      sn: "04",
      faculty: "Prof. P. R. Bharambe",
      subject: "Power System Protection",
      practice: "You Tube Videos",
      link: "/uploads/documents/electrical_innovative/PRB_PowerSystemProtection_YouTube.pdf",
    },
    {
      sn: "",
      faculty: "",
      subject: "Computer Aided Machine Design",
      practice: "You Tube Videos",
      link: "/uploads/documents/electrical_innovative/PRB_ComputerAidedMachineDesign_YouTube.pdf",
      rowSpanParent: false,
    },
    {
      sn: "05",
      faculty: "Dr. R. S. Kankale",
      subject: "High Voltages- Part-1",
      practice: "You Tube Videos",
      link: "/uploads/documents/electrical_innovative/RSK_HighVoltages_YouTube.pdf",
    },
    {
      sn: "06",
      faculty: "Prof. M.R.Chavan",
      subject: "Energy Resources and Generation",
      practice: "Industrial Visits/Field Work",
      link: "/uploads/documents/electrical_innovative/MRC_EnergyResources_IndustrialVisit.pdf",
    },
    {
      sn: "07",
      faculty: "Prof. R. K. Mankar",
      subject: "Computer Methods in Power System Analysis",
      practice: "Simulation-Based Learning",
      link: "/uploads/documents/electrical_innovative/RKM_ComputerMethods_Simulation.pdf",
    },
    {
      sn: "08",
      faculty: "Prof. G. N. Bonde",
      subject: "Control System",
      practice: "You Tube Videos",
      link: "/uploads/documents/electrical_innovative/GNB_ControlSystem_YouTube.pdf",
    },
    {
      sn: "",
      faculty: "",
      subject: "Electronic Devices & Circuit",
      practice: "Virtual Lab",
      link: "/uploads/documents/electrical_innovative/GNB_ElectronicDevices_VirtualLab.pdf",
      rowSpanParent: false,
    },
    {
      sn: "09",
      faculty: "Prof. B. S. Rakhonde",
      subject: "Electrical Machine-I",
      practice: "You Tube Videos",
      link: "/uploads/documents/electrical_innovative/BSR_ElectricalMachineI_YouTube.pdf",
    },
    {
      sn: "10",
      faculty: "Prof. V.S.Karale",
      subject: "Electric Circuit Analysis",
      practice: "Virtual Lab",
      link: "/uploads/documents/electrical_innovative/VSK_ElectricCircuitAnalysis_VirtualLab.pdf",
    },
    {
      sn: "",
      faculty: "",
      subject: "Power Electronics",
      practice: "Simulation-Based Learning (Matlab)",
      link: "/uploads/documents/electrical_innovative/VSK_PowerElectronics_Simulation.pdf",
      rowSpanParent: false,
    },
    {
      sn: "11",
      faculty: "Prof. P. R. Dhabe",
      subject: "Digital Signal Processing",
      practice: "You Tube Videos",
      link: "/uploads/documents/electrical_innovative/PRD_DigitalSignalProcessing_YouTube.pdf",
    },
    {
      sn: "",
      faculty: "",
      subject: "Power System",
      practice: "You Tube Videos",
      link: "/uploads/documents/electrical_innovative/PRD_PowerSystem_YouTube.pdf",
      rowSpanParent: false,
    },
  ];

  const defaultSyllabusDocuments = {
    be: [
      { label: "NEP Scheme", link: "" },
      { label: "Scheme", link: "" },
      { label: "Syllabus Second Year (3rd Sem)", link: "" },
      { label: "Syllabus Second Year (4th Sem)", link: "" },
      {
        label:
          "Syllabus - (Universal Human Values and Ethics) Common for all branches in. Engg. & Tech.)-Sem. IV -NEP",
        link: "",
      },
      {
        label:
          "Syllabus -(Modern Indian Language) -Common for all branches in Engg. & Tech.-Sem. IV - NEP",
        link: "",
      },
      { label: "Syllabus Third Year (5th & 6th Sem)", link: "" },
      { label: "Syllabus Final Year (7th & 8th Sem)", link: "" },
    ],
    me: [
      {
        label: "Scheme and Syllabus M.E. (1st & 2nd Sem)",
        link: "",
      },
    ],
  };

  const [vmTab, setVmTab] = useState("vision");
  const [poTab, setPoTab] = useState("peo");
  const [showAllPos, setShowAllPos] = useState(false);
  const defaultAcademicsLinks = [
    { id: "overview", label: "Department Overview" },
    { id: "hod", label: "Words from HOD" },
    { id: "vision-mission", label: "Vision, Mission, PEO & PSO" },
    { id: "course-outcomes", label: "Course Outcomes" },
    { id: "curriculum", label: "Schemes and Syllabus" },
    { id: "laboratories", label: "Infrastructure and Laboratories" },
    { id: "pride", label: "Pride of the Department" },
    { id: "placements", label: "Placement Statistics" },
    { id: "activities", label: "Curricular Activities" },
    { id: "student-chapter", label: "Student Chapter (IEI)" },
    { id: "newsletter", label: "Newsletter" },
    { id: "achievements", label: "Achievements" },
    { id: "course-material", label: "Course Material" },
    { id: "projects", label: "UG Projects" },
    { id: "practices", label: "Innovative Practice" },
    { id: "faculty", label: "Faculty Members" },
  ];

  const academicsLinks = t("academicsLinks", defaultAcademicsLinks);

  const defaultIndustryLinks = [
    { id: "industrial-visits", label: "Industrial Visits" },
    { id: "mous", label: "MoUs & Collaborations" },
    { id: "patents", label: "Patents & Publications" },
    { id: "internships", label: "Internship and Training" },
  ];

  const industryLinks = t("industryLinks", defaultIndustryLinks);

  const content = {
    overview: (
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-orange-500 inline-block pb-2 w-fit">
              <EditableText
                value={t("heroTitle", "Department Overview")}
                onSave={(val) => updateField("heroTitle", val)}
              />
            </h3>

            <div className="prose max-w-none text-gray-600 leading-relaxed text-justify text-lg space-y-4">
              <EditableText
                value={t(
                  "overview",
                  "The Department of Electrical Engineering offers a vibrant environment for undergraduate and post graduate education and research in Electrical Engineering. The Department is committed to the advancement of the frontiers of knowledge in electrical engineering and to provide the students with a stimulating and rewarding learning experience.\n\nWe focus on holistic development through innovative teaching-learning processes, industrial training, ongoing projects, and regular interactions with industry experts in the field of power systems, control systems, renewable energy, and smart grid technologies.",
                )}
                onSave={(val) => updateField("overview", val)}
                multiline
                className="whitespace-pre-wrap"
              />
            </div>
          </div>
        </div>

        {/* Courses Section - Minimalistic */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <EditableText
                value={t(
                  "coursesHeaderTitle",
                  "Courses @ Electrical Engineering",
                )}
                onSave={(val) => updateField("coursesHeaderTitle", val)}
              />
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
                          "bachelorEngineeringHeader",
                          "Bachelor of Engineering",
                        )}
                        onSave={(val) =>
                          updateField("bachelorEngineeringHeader", val)
                        }
                      />
                      {isEditing && (
                        <button
                          onClick={() => {
                            const current = t("overview_be", defaultBeDetails);
                            const newData = [
                              ...current,
                              ["New Field", "New Value"],
                            ];
                            updateField("overview_be", newData);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs ml-2"
                        >
                          + Add Row
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {t("overview_be", defaultBeDetails).map(([label, val], i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-bold text-gray-500 w-1/3 border border-gray-200 bg-gray-50/30">
                      <EditableText
                        value={label}
                        onSave={(v) =>
                          updateTable("overview_be", i, 0, v, defaultBeDetails)
                        }
                      />
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 font-medium border border-gray-200">
                      <EditableText
                        value={val}
                        onSave={(v) =>
                          updateTable("overview_be", i, 1, v, defaultBeDetails)
                        }
                      />
                    </td>
                    {isEditing && (
                      <td className="px-6 py-3 text-center border border-gray-200">
                        <button
                          onClick={() => {
                            const updated = t(
                              "overview_be",
                              defaultBeDetails,
                            ).filter((_, idx) => idx !== i);
                            updateField("overview_be", updated);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
                          title="Delete row"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}

                {/* ME */}
                <tr className="bg-white">
                  <td
                    colSpan={isEditing ? 3 : 2}
                    className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200 mt-4"
                  >
                    <div className="flex justify-between items-center">
                      <EditableText
                        value={t(
                          "masterEngineeringHeader",
                          "Master of Engineering",
                        )}
                        onSave={(val) =>
                          updateField("masterEngineeringHeader", val)
                        }
                      />
                      {isEditing && (
                        <button
                          onClick={() => {
                            const current = t("overview_me", defaultMeDetails);
                            const newData = [
                              ...current,
                              ["New Field", "New Value"],
                            ];
                            updateField("overview_me", newData);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs ml-2"
                        >
                          + Add Row
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {t("overview_me", defaultMeDetails).map(([label, val], i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-bold text-gray-500 w-1/3 border border-gray-200 bg-gray-50/30">
                      <EditableText
                        value={label}
                        onSave={(v) =>
                          updateTable("overview_me", i, 0, v, defaultMeDetails)
                        }
                      />
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 font-medium border border-gray-200">
                      <EditableText
                        value={val}
                        onSave={(v) =>
                          updateTable("overview_me", i, 1, v, defaultMeDetails)
                        }
                      />
                    </td>
                    {isEditing && (
                      <td className="px-6 py-3 text-center border border-gray-200">
                        <button
                          onClick={() => {
                            const updated = t(
                              "overview_me",
                              defaultMeDetails,
                            ).filter((_, idx) => idx !== i);
                            updateField("overview_me", updated);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
                          title="Delete row"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}

                {/* PhD */}
                <tr className="bg-white">
                  <td
                    colSpan={isEditing ? 3 : 2}
                    className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <EditableText
                        value={t(
                          "phdEngineeringHeader",
                          "Ph.D in Electrical Engineering",
                        )}
                        onSave={(val) =>
                          updateField("phdEngineeringHeader", val)
                        }
                      />
                      {isEditing && (
                        <button
                          onClick={() => {
                            const current = t(
                              "overview_phd",
                              defaultPhdDetails,
                            );
                            const newData = [
                              ...current,
                              ["New Field", "New Value"],
                            ];
                            updateField("overview_phd", newData);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs ml-2"
                        >
                          + Add Row
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {t("overview_phd", defaultPhdDetails).map(([label, val], i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-bold text-gray-500 w-1/3 border border-gray-200 bg-gray-50/30">
                      <EditableText
                        value={label}
                        onSave={(v) =>
                          updateTable(
                            "overview_phd",
                            i,
                            0,
                            v,
                            defaultPhdDetails,
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 font-medium border border-gray-200">
                      <EditableText
                        value={val}
                        onSave={(v) =>
                          updateTable(
                            "overview_phd",
                            i,
                            1,
                            v,
                            defaultPhdDetails,
                          )
                        }
                      />
                    </td>
                    {isEditing && (
                      <td className="px-6 py-3 text-center border border-gray-200">
                        <button
                          onClick={() => {
                            const updated = t(
                              "overview_phd",
                              defaultPhdDetails,
                            ).filter((_, idx) => idx !== i);
                            updateField("overview_phd", updated);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
                          title="Delete row"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <p className="text-ssgmce-blue font-medium">
              <EditableText
                value={t("coursesSignatureHodName", "Dr. S. R. Paraskar")}
                onSave={(val) => updateField("coursesSignatureHodName", val)}
              />
            </p>
            <p className="text-sm text-gray-500">
              <EditableText
                value={t(
                  "coursesSignatureHodTitle",
                  "Head, Dept. of Electrical Engineering (Electronics & Power)",
                )}
                onSave={(val) => updateField("coursesSignatureHodTitle", val)}
              />
            </p>
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
                {(() => {
                  const v = t("vision");
                  if (Array.isArray(v)) return v;
                  return [
                    "To impart high quality education and excel in research in Electrical Engineering to serve the global society.",
                  ];
                })().map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 text-ssgmce-orange text-2xl flex-shrink-0">
                      ➤
                    </div>
                    <div className="text-lg text-gray-700 leading-relaxed font-medium flex-1">
                      <MarkdownEditor
                        value={item}
                        onSave={(val) => {
                          const defaultVisionArr = [
                            "To impart high quality education and excel in research in Electrical Engineering to serve the global society.",
                          ];
                          const current = Array.isArray(t("vision"))
                            ? [...t("vision")]
                            : defaultVisionArr;
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
                          const defaultVisionArr = [
                            "To impart high quality education and excel in research in Electrical Engineering to serve the global society.",
                          ];
                          const arr = (
                            Array.isArray(t("vision"))
                              ? t("vision")
                              : defaultVisionArr
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
                ))}
                {isEditing && (
                  <button
                    onClick={() => {
                      const defaultVisionArr = [
                        "To impart high quality education and excel in research in Electrical Engineering to serve the global society.",
                      ];
                      const arr = [
                        ...(Array.isArray(t("vision"))
                          ? t("vision")
                          : defaultVisionArr),
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
                {(() => {
                  const m = t("mission");
                  if (Array.isArray(m)) return m;
                  return [
                    "To develop excellent learning center through continuous interaction with Industries, R&D centers and Academia.",
                    "To promote excellence in teaching and research.",
                    "To produce competent, entrepreneurial and committed Electrical Engineers with high human values for professional career and higher studies.",
                  ];
                })().map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 text-ssgmce-orange text-xl">➤</div>
                    <div className="text-gray-700 w-full">
                      <MarkdownEditor
                        value={item}
                        onSave={(val) => {
                          const defaultMission = [
                            "To develop excellent learning center through continuous interaction with Industries, R&D centers and Academia.",
                            "To promote excellence in teaching and research.",
                            "To produce competent, entrepreneurial and committed Electrical Engineers with high human values for professional career and higher studies.",
                          ];
                          const current = Array.isArray(t("mission"))
                            ? [...t("mission")]
                            : defaultMission;
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
                          const defaultMission = [
                            "To develop excellent learning center through continuous interaction with Industries, R&D centers and Academia.",
                            "To promote excellence in teaching and research.",
                            "To produce competent, entrepreneurial and committed Electrical Engineers with high human values for professional career and higher studies.",
                          ];
                          const arr = (
                            Array.isArray(t("mission"))
                              ? t("mission")
                              : defaultMission
                          ).filter((_, idx) => idx !== i);
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
                      const defaultMission = [
                        "To develop excellent learning center through continuous interaction with Industries, R&D centers and Academia.",
                        "To promote excellence in teaching and research.",
                        "To produce competent, entrepreneurial and committed Electrical Engineers with high human values for professional career and higher studies.",
                      ];
                      updateField("mission", [
                        ...(Array.isArray(t("mission"))
                          ? t("mission")
                          : defaultMission),
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
                    value={t(
                      "peosDescription",
                      "Graduates, within five years after graduation, should demonstrate",
                    )}
                    onSave={(val) => updateField("peosDescription", val)}
                  />
                </p>
                {t("peos", defaultPeos).map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 text-ssgmce-orange text-xl">➤</div>
                    <div className="text-gray-700 leading-relaxed font-medium w-full">
                      <MarkdownEditor
                        value={item}
                        onSave={(val) => {
                          const updated = [...t("peos", defaultPeos)];
                          updated[i] = val;
                          updateField("peos", updated);
                        }}
                        placeholder="Click to edit PEO item..."
                        className="w-full"
                      />
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const arr = t("peos", defaultPeos).filter(
                            (_, idx) => idx !== i,
                          );
                          updateField("peos", arr);
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
                      updateField("peos", [
                        ...t("peos", defaultPeos),
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
                {t("psos", defaultPsos).map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 text-ssgmce-orange text-xl">➤</div>
                    <div className="text-gray-700 leading-relaxed font-medium w-full">
                      <MarkdownEditor
                        value={item}
                        onSave={(val) => {
                          const updated = [...t("psos", defaultPsos)];
                          updated[i] = val;
                          updateField("psos", updated);
                        }}
                        placeholder="Click to edit PSO item..."
                        className="w-full"
                      />
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const arr = t("psos", defaultPsos).filter(
                            (_, idx) => idx !== i,
                          );
                          updateField("psos", arr);
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
                      updateField("psos", [
                        ...t("psos", defaultPsos),
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
                  {t("pos", defaultPos)
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
                                    JSON.stringify(t("pos", defaultPos)),
                                  );
                                  updated[i].t = val;
                                  updateField("pos", updated);
                                }}
                              />
                            </strong>
                            <MarkdownEditor
                              value={po.d}
                              onSave={(val) => {
                                const updated = JSON.parse(
                                  JSON.stringify(t("pos", defaultPos)),
                                );
                                updated[i].d = val;
                                updateField("pos", updated);
                              }}
                              placeholder="Click to edit PO description..."
                              className="w-full"
                            />
                          </div>
                          {isEditing && (
                            <button
                              onClick={() => {
                                const arr = t("pos", defaultPos).filter(
                                  (_, idx) => idx !== i,
                                );
                                updateField("pos", arr);
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
                {isEditing && (
                  <button
                    onClick={() => {
                      updateField("pos", [
                        ...t("pos", defaultPos),
                        {
                          t: "New Outcome",
                          d: "Description of the new program outcome.",
                        },
                      ]);
                    }}
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium"
                  >
                    + Add PO Item
                  </button>
                )}
                <button
                  onClick={() => setShowAllPos(!showAllPos)}
                  className="inline-flex items-center text-orange-500 font-bold hover:text-orange-600 transition-colors mt-2"
                >
                  {showAllPos ? "Read Less" : "Read More..."}
                </button>
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
                    src={t("hodPhoto", hodPhoto)}
                    onSave={(url) => updateField("hodPhoto", url)}
                    alt="Dr. S. R. Paraskar - HOD Electrical"
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                <EditableText
                  value={t("hodName", "Dr. S. R. Paraskar")}
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
                    "Department of Electrical Engineering (Electronics & Power)",
                  )}
                  onSave={(val) => updateField("hodDepartmentTitle", val)}
                />
              </p>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaEnvelope className="mr-2 text-ssgmce-orange" />
                  <span>
                    <EditableText
                      value={t("hodEmail1", "hod_elpo@ssgmce.ac.in")}
                      onSave={(val) => updateField("hodEmail1", val)}
                    />
                  </span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center">
                  <span>
                    <EditableText
                      value={t("hodEmail2", "srparaskar@ssgmce.ac.in")}
                      onSave={(val) => updateField("hodEmail2", val)}
                    />
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-ssgmce-blue">
                  <EditableText
                    value={t("hodBadge1", "Professor & Head")}
                    onSave={(val) => updateField("hodBadge1", val)}
                  />
                </span>
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-ssgmce-blue">
                  <EditableText
                    value={t("hodBadge2", "Electrical Engineering")}
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
                  value={t("hodMessageTitle", "Words from HOD")}
                  onSave={(val) => updateField("hodMessageTitle", val)}
                />
              </h3>
              <div className="h-1 w-20 bg-ssgmce-blue mt-2 rounded-full mx-auto"></div>
            </div>

            <div className="space-y-4 text-gray-700 text-base leading-relaxed text-justify">
              <MarkdownEditor
                value={t(
                  "hodMessage",
                  "The Department of Electrical Engineering offers a vibrant environment for undergraduate and post graduate education and research in Electrical Engineering. The Department is committed to the advancement of the frontiers of knowledge in electrical engineering and to provide the students with a stimulating and rewarding learning experience.\n\nThe department admits students for 4 years B.E. Electrical (Electronics & Power) Programme and 2 years M.E. (Electrical Power System) programme. The academic activities are supported by eight well equipped laboratories. All Laboratories are recognized for research work by Sant Gadge Baba Amravati University, Amravati.\n\nThe department admits students for 4 years B.E. Electrical (Electronics & Power) Programme and 2 years M.E. (Electrical Power System) programme. The academic activities are supported by eight well equipped laboratories. All Laboratories are recognized for research work by Sant Gadge Baba Amravati University, Amravati.\n\nThe department has strong industry interaction and has been involved in development of State of art products for Industry, and consultancy projects.\n\nThe department is strong with senior faculty members and experts in various fields of electrical engineering. The broad area of expertise includes Power system restructuring & reforms, Digital Signal Processing, Application of Artificial Intelligence in Electrical Engineering, Power System Deregulation, Power System Transients, Distribution Automation, High Voltage Engineering Power Quality and FACTS devices, condition monitoring of electrical equipment.",
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
                    value={t("hodName", "Dr. S. R. Paraskar")}
                    onSave={(val) => updateField("hodName", val)}
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <EditableText
                    value={t(
                      "hodDesignation",
                      "Head, Dept. of Electrical Engineering",
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

    "course-outcomes": (() => {
      const defaultBeSections = [
        {
          id: "be-sem1",
          label: "B.E. Semester-I",
          content: `### 1A1 ENGINEERING MATHEMATICS - I

After completing this course, student will be able to

1. Find n order derivative of functions and product of functions and expand the function in a power series and evaluation of limits of indeterminate forms.
2. Find the partial derivatives and Jacobian of explicit and implicit functions
3. Obtain maxima and minima of a function with constraints by using Lagrange’s method of undetermined multipliers.
4. Find the powers and roots of complex numbers, separate the complex quantity in real & imaginary parts, and find the logarithms of complex numbers.
5. Able to solve ordinary differential equations of first order and first degree by various methods and apply these to solve problems in engineering fields.
6. Able to solve ordinary differential equations of first order and higher degree by various

### 1A2 ENGINEERING PHYSICS

After completing this course, student will be able to

1. To apply the knowledge of solid-state devices such as semiconductor diode, Zener diode & LED in various Electronics applications.
2. To apply the knowledge of Quantum Mechanics in engineering fields
3. To apply the principles of electron ballistics to demonstrate the functioning of CRO & mass spectrograph.
4. To apply the principles of geometrical optics such as interference & diffraction in various engineering fields
5. To apply the principles of fiber optics, LASER & fundamentals of acoustics, ultrasonics & fluid dynamics in various engineering domains

### 1A3 ENGINEERING MECHANICS

After completing this course, student will be able to

1. Compose and resolve the forces along with its effect.
2. Apply principles of statics to the system of rigid bodies and analyse simple structures.
3. Calculate frictional forces for simple contact, wedges and belt friction.
4. Locate centroid and calculate moment of inertia.
5. Calculate various kinematic quantities.
6. Solve the problems using different kinetic equations related to direct and interconnected
7. Apply principle of conservation of momentum and laws of impact.

### 1A4 COMPUTER PROGRAMMING

After completing this course, student will be able to

1. To explain fundamental concepts of computer and computing.
2. To test and execute the programs and correct syntax and logical errors.
3. To demonstrate various operators and expressions to solve real life problems.
4. To demonstrate various concepts of control structure to solve complex problems
5. To use arrays, strings and structures to formulate algorithms and programs.
6. To demonstrate various concepts of functions, pointers and file handling mechanism.

### 1A5 WORKSHOP PRACTICE

After completing this course, student will be able to

1. Upon completion of this course, the students will gain knowledge of different manufacturing processes which are commonly employed in industry.
2. Upon completion of this course, the students will be able to fabricate the components using various manufacturing techniques.
3. The students will be conversant with the concept of dimensional accuracy and tolerances.`,
        },
        {
          id: "be-sem2",
          label: "B.E. Semester-II",
          content: `### 1B1 ENGINEERING MATHEMATICS – II

After completing this course, student will be able to

1. Use matrices for solving system of simultaneous linear equations, Find Eigen values and Eigen vectors of the matrix. Find inverse of matrix by various methods
2. Find the Fourier expansion of periodic and non-periodic functions
3. Explain curve tracing with justification which are useful in applications of integration. Use technique of Differentiation under integral sign to evaluate integrals. Find Product of
4. Acquire knowledge about Gamma & Beta function, Reduction Formulae and rectification
5. Evaluate double integral and its application to find area
6. Evaluation and application of triple integrals in Engineering problems

### 1B2 ENGINEERING CHEMISTRY

After completing this course, student will be able to

1. Identify the various methods of water softening along with application of water and its quality parameters for the use of water in industry
2. Explain the various types of corrosion, its control methods and battery technology
3. Identify the various materials such as Cement, lubricant, Ceramics, Refractory,
4. used for future technology with their application in day-to-day life
5. Identify the fuel for IC engines and their characteristics with respect to its working
6. To utilize the knowledge about polymer and engineering materials towards different
7. To provide the knowledge about Metallurgy  and analytical techniques

### 1B3 BASIC ELECTRICAL ENGINEERING

After completing this course, student will be able to

1. Solve numerical on basic electric and magnetic circuits.
2. Apply AC fundamentals to analyse single phase & three phase circuits.
3. Explain the operating principles of various electrical machines
4. Explain the working of various measuring instruments and importance of earthing.

### 1B4 ENGINEERING GRAPHICS

After completing this course, student will be able to

1. read/prepare/understand the engineering drawings
2. create the projections and sectional views of 3D objects
3. draw the orthographic and isometric views of 3D objects
4. use graphics software to create Engineering drawings and represent engineering systems

### 1B5 ENGLISH COMMUNICATION SKILLS LABORATORY

After completing this course, student will be able to

1. The learning outcome of students will be assessed through assignments, tests and final exams and most importantly through practical performances.
2. Through these tests, it would be revealed that students are able to reproduce their understanding of concepts/principles of communication in English language.
3. Students can present themselves well in front of large audience on a variety of topics. Moreover, they get the knack for structured conversation to make their point of views clear to the listeners.`,
        },
        {
          id: "be-sem3",
          label: "B.E. Semester-III",
          content: `### 3EP01 ENGINEERING MATHEMATICS – III

After completing this course, student will be able to

1. solve the Linear Differential equations with constant coefficients and apply this knowledge to Electrical circuits
2. analyse Laplace Transform of various types of functions and able to find Laplace Transform of Periodic, Impulse & Unit step function. Use LT to solve LDE
3. apply the knowledge of Laplace Transform to find solution of Linear Differential equations with constant coefficients.
4. find Fourier Transform of various types of functions and apply this knowledge to find Fourier Transform of functions, in their core subjects
5. find Z Transform of various types of functions and apply this knowledge to problems in Electrical Engineering.
6. Differentiate and integrate the vector point functions and apply this knowledge to problems in Electrical Engineering, especially in Electric and Magnetic fields.

### 3EP02 ELECTRICAL CIRCUIT ANALYSIS

After completing this course, student will be able to

1. Analyze electric and magnetic circuits using basic circuital laws
2. Analyze the circuit using Network simplification theorems
3. Solve circuit problems using concepts of electric network topology
4. Evaluate transient response of different circuits using Laplace transform
5. Evaluate two-port network parameters and network functions

### 3EP03 ELECTRICAL MACHINE – I

After completing this course, student will be able to

1. Explain the Construction, working, operation of DC Machines.
2. Determine Performance Parameter of DC machine by conducting various tests on DC
3. Illustrate characteristics, starting, braking of DC Motors
4. Demonstrate the construction, working, types of connection and Application of
5. Determine Performance Parameter of Transformer by conducting various tests on

### 3EP04 ENERGY RESOURCES AND GENERATION

After completing this course, student will be able to

1. Explain the operation of Thermal, Hydro, Nuclear and Diesel power plants
2. Summarize solar energy conversion, solar radiation measuring instruments, wind energy conversion and their applications.
3. Outline the principle and operation of fuel cells, ocean & tidal energy conversion, and other nonconventional energy resources.
4. Determine the various factors and curves related to electrical load & generating plant.

### 3EP05 ELECTRONIC DEVICES & CIRCUITS

After completing this course, student will be able to

1. Demonstrate the knowledge of semiconductor physics and PN Junction Diode
2. Analyze the rectifier and regulator circuits.
3. Analyze the operational parameters of BJT
4. Analyze various multistage amplifier circuits
5. Demonstrate the knowledge of JFET, MOSFET, UJT and their operational parameters`,
        },
        {
          id: "be-sem3-nep",
          label: "B.E. Semester-III(NEP)",
          content: `### 3EP200PC Numerical Methods and Optimization Techniques

After completing this course students will be able to

1. Solve linear and Simultaneous Equations with the help of Numerical Methods.
2. Apply various Numerical methods to fit the curve.
3. Solve Numerical differentiation, integration, and Differential Equations.
4. Solve linear, non-linear and problem by various methods.
5. Determine the optimum scheduling by using CPM and PERT.

### 3EE201PC/3EP201PC Electrical Circuit Analysis

After completing this course student will be able to:

1. Analyze electric circuit using basic circuital laws
2. Analyze the circuit using Network simplification theorems.
3. Solve circuit problems using concepts of electric network topology.
4. Evaluate transient response of different circuits using Laplace transform
5. Evaluate two-port network parameters and network functions.

### 3EE202PC/3EP202PC Electrical Measurements & Instrumentation

A student completing this course will be able to:

1. Explain the various measuring instruments like PMMC, MI, Electrodynamometer, and Induction type instruments.
2. Demonstrate the construction & working of Instrument Transformers and special purpose
3. Analyze various methods for measurement of resistance, inductance, and capacitance using AC/DC bridges.
4. Explain the working of various Digital measuring instruments.
5. Explain the generalized Instrumentation system & working of different transducers.

### 3EE206M/3EP206M Electrical Energy Generation

After successful completion of this course, a student will be able to:

1. Explain the current energy scenario in India and the various load- Generation factors.
2. Illustrate the working of Thermal, Hydro & Nuclear power plants.
3. Explain the working of solar & Wind energy conversion systems.

### 3EE207OE/3EP207OE Power Supply System

After successful completion of this course, a student will be able to:

1. Explain the working of thermal & Hydro-electric power plants.
2. Understand the basics of solar and wind energy and their conversion.
3. Demonstrate the knowledge of various types of substations and distribution systems
4. Demonstrate the knowledge of electrical wiring installation and earthing system.

### 3EE208EM/3EP208EM Entrepreneurship Development

On successful completion of this course, the students will be able to:

1. Explain the fundamentals of entrepreneurship and its role in economic development.
2. Apply innovation and design thinking to develop business ideas.
3. Prepare a feasibility study and basic business plan for entrepreneurial ventures.

### 3EE209VE/3EP209VE Environmental Science

Upon successful completion of the course the students will be able to
1. Understand the  multidisciplinary  nature  of  environment  and  Renewable  and  non-renewable
2. Understand natural environment and its relationship with human activities.
3. Understand the basic concepts and problems and follow sustainable development practices.

### 4EE210PC/4EP210PC Electrical Machine – I

After Completion of this course, students will be able to:

1. Explain the Construction, working operation, of DC Machines.
2. Illustrate the different Characteristics, types, their Application and Parallel Operation of
3. Demonstrate the  various  types  of  DC  motor,  characteristics,  starting  method,  testing method, speed control method and braking operation on DC motors.
4. Explain the  Construction,  working,  types  of Single-Phase Transformer  and testing  of Single-phase transformer.
5. Explain the  Construction,  working,  different  connections,  applications  and  testing  of three phase transformers.

### 4EE211PC/4EP211PC Control System

After completing this course, student will be able to:

1. Demonstrate the fundamental concepts of automatic Control and mathematical modeling
2. Analyze the transfer functions, Signal flow graphs and feedback system for stability and noise reduction.
3. Examine  the  functionality and  applications  of  various  control  system  components  like motors and encoders.
4. Analyze time  response characteristics  of  first  and  second  order  system  with  error
5. Apply stability criteria using Routh-Hurwitz and frequency response methods.
6. Assess  system stability through   Bode  plots,   Nyquist  plots  and   gain/phase  margin

### 4EE212PC/4EP212PC Electromagnetic Fields

At the end of the course the student will be able to:

1. Demonstrate the basic mathematical concepts related to electromagnetic vector fields.
2. Apply the principles of electrostatics to the solutions of problems relating to electric
3. Apply the principles of magneto statics to the solutions of problems relating to
4. Apply Maxwell’s equation in different forms (differential and integral) to diverse engineering problems.

### 4EE215M/4EP215M Electrical Measurements

A student completing this course, should be able to:

1. Classify the various measuring instruments like PMMC, MI, Electrodynamic type.
2. Explain the measurement of power and energy by wattmeter and energy meter.
3. Analyze various methods for measurement of resistance, inductance, and capacitance using

### 4EE217OE/4EP217OE Electrical Drives

After completing this course, Students will be able to:

1. Explain the basic of electrical drives and Power Electronics devices
2. Demonstrate various modern speed control techniques of DC drives
3. Demonstrate various modern speed control techniques of AC drives

### 4EE218EM/4EP218EM Engineering Economics

After successful completion of the course, students will be able to -

1. Apply the concepts economics to assess demand and, including elasticity and laws of
2. Demonstrate the understanding of cost and revenue structures, market types and inflationary trends, and banking principles.
3. Make use of the principles of time value of money, economic equivalence, and depreciation to evaluate engineering projects through various methods.`,
        },
        {
          id: "be-sem4",
          label: "B.E. Semester-IV",
          content: `### 4EP01 ELECTROMAGNETIC FIELD

After completing this course, student will be able to

1. Demonstrate the understanding of  basic mathematical concepts related to electromagnetic vector fields
2. Apply the principles of electrostatics to the solutions of problems relating to electric field
3. Apply the principles of magneto statics to the solutions of problems relating to magnetic
4. Apply  Maxwell’s equation in different forms (differential and integral)  to diverse engineering problems.

### 4EP02 ELECTRICAL MEASUREMENT & INSTRUMENTATION

After completing this course, student will be able to

1. Classify the various measuring instruments like PMMC, MI, Electrodynamometer, and Induction type instruments for measurement of current, voltage, power, and energy.
2. Demonstrate the construction & working of Instrument Transformers and special purpose
3. Analyze various methods for measurement of resistance, inductance, and capacitance using AC/DC bridges.
4. Explain the working of various Digital measuring instruments.
5. Explain the generalized Instrumentation system & working of different transducers.

### 4EP03 CONTROL SYSTEM

After completing this course, student will be able to

1. Demonstrate the fundamental concepts of automatic Control and mathematical modelling
2. Determine the transfer function of control system components
3. Analyze the time response of various systems and performance of controllers
4. Evaluate the stability of linear systems using various methods

### 4EP04 NUMERICAL METHODS & OPTIMIZATION TECHNIQUES

After completing this course, student will be able to

1. Determine solutions for linear and simultaneous equations using numerical methods.
2. Apply various curve fitting techniques.
3. Make use of various numerical methods for solving Numerical differentiation, integration, and Differential Equations.
4. Determine the optimum scheduling by using CPM and PERT.

### 4EP05 ANALOG & DIGITAL CIRCUITS

After completing this course, student will be able to

1. Explain the principles of operational amplifiers, parameters of op-amp
2. Illustrate the linear and nonlinear applications of op-amp
3. Demonstrate the knowledge of Voltage regulator and Timer ICs
4. Describe the working of Logic families and their applications.
5. Demonstrate the knowledge of combinational and sequential circuits and its application`,
        },
        {
          id: "be-sem4-nep",
          label: "B.E. Semester-IV(NEP)",
          content: `### 4EE210PC/4EP210PC Electrical Machine – I

After Completion of this course, students will be able to:

1. Explain the Construction, working operation, of DC Machines.
2. Illustrate the different Characteristics, types, their Application and Parallel Operation of DC Generator.
3. Demonstrate the various types of DC motor, characteristics, starting method, testing method, speed control method and braking operation on DC motors.
4. Explain the Construction, working, types of Single-Phase Transformer and testing of Single-phase transformer.
5. Explain the Construction, working, different  connections, applications and testing of three phase transformers.

### 4EE211PC/4EP211PC Control System

After completing this course, student will be able to:

1. Demonstrate   the   fundamental   concepts   of   automatic   Control   and   mathematical modeling of the Systems.
2. Analyze the  transfer  functions,  Signal  flow  graphs  and  feedback  system  for  stability and noise reduction.
3. Examine the functionality and applications of various control system components like motors and encoders.
4. Analyze time  response characteristics  of  first  and  second  order  system  with  error
5. Apply stability criteria using Routh-Hurwitz and frequency response methods.
6. Assess  system stability through  Bode  plots,  Nyquist  plots  and  gain/phase  margin

### 4EE212PC/4EP212PC Electromagnetic Fields

At the end of the course the student will be able to:

1. Demonstrate the basic mathematical concepts related to electromagnetic vector
2. Apply the principles of electrostatics to the solutions of problems relating to electric field a
3. Apply the principles of magneto statics to the solutions of problems relating to
4. Apply Maxwell’s equation in different forms (differential and integral) to diverse engineering problems.

### 4EE215M/4EP215M Electrical Measurements

A student completing this course, should be able to:

1. Classify the various measuring instruments like PMMC, MI, Electrodynamic type.
2. Explain the measurement of power and energy by wattmeter and energy meter.
3. Analyze various methods for measurement of resistance, inductance, and capacitance using

### 4EE217OE/4EP217OE Electrical Drives

After completing this course, Students will be able to:

1. Explain the basic of electrical drives and Power Electronics devices
2. Demonstrate various modern speed control techniques of DC drives
3. Demonstrate various modern speed control techniques of AC drives

### 4EE218EM/4EP218EM Engineering Economics

After successful completion of the course, students will be able to -

1. Apply the concepts economics to assess demand and, including elasticity and laws of
2. Demonstrate the understanding of cost and revenue structures, market types and inflationary trends, and banking principles.
3. Make use of the principles of time value of money, economic equivalence, and depreciation to evaluate engineering projects through various methods.`,
        },
        {
          id: "be-sem5",
          label: "B.E. Semester-V",
          content: `### 5EP01 POWER SYSTEM – I

After completing this course, student will be able to

1. Analyze the transmission system with respect to various electrical parameters
2. Examine the performance of transmission line
3. Describe transmission lines' voltage control and power factor improvement methods
4. Model power system using single line, impedance and reactance diagrams.
5. Illustrate Corona phenomenon, Ferranti effect, various Insulators, its string efficiency and underground cables

### 5EP02 MICROPROCESSOR & MICROCONTROLLER

After completing this course, student will be able to

1. Identify the architectural and functioning difference between microprocessor 8085,8086 and microcontroller 8051
2. Make use of Assembly Language Programming of Microprocessor 8085
3. Select a peripheral to be interface with microprocessor for control and measurement
4. Experiment with microprocessor 8085 and peripherals for control and measurement of electrical quantities

### 5EP03 ELECTRICAL MACHINE – II

After completing this course, student will be able to

1. Describe the construction, working operation & performance characteristics of three phase Induction Motor
2. Analyze the starting, braking and speed control of three phase induction motors by
3. Describe the construction, working operation & performance characteristics of single- phase Induction Motor
4. Demonstrate the construction, working operation & performance characteristics of synchronous machine
5. Explain the construction & working of special motors like Universal, Reluctance, PMSM

### 5EP04 SIGNAL & SYSTEM (Professional Elective – I)

After completing this course, student will be able to

1. Demonstrate the understanding of continuous-time and discrete-time signals and systems
2. Analyze the continuous-time  and Discrete time   systems using  Fourier transform
3. Apply sampling theorem for different applications
4. Analyze DT systems using Z-transforms

### 5EP04 NETWORK ANALYSIS AND SYNTHESIS (Professional Elective – I)

After completing this course, student will be able to

1. Analyze the transient response of series and parallel A.C. circuits
2. Demonstrate the properties of network functions.
3. Demonstrate the properties of positive Real Functions
4. Synthesize driving point functions of RL, RC and RLC
5. Synthesize two port network functions
6. Design passive filters to meet desired specifications

### 5EP05 POWER SUPPLY SYSTEM (Open Elective – I)

After completing this course, student will be able to

1. Distinguish between construction and working of various power generation plants
2. Describe layout and working of Substations
3. Compare various power distribution system
4. Explain types of wiring, necessity of earthing and safety precautions.

### 5EP05 ELECTRICAL DRIVES (Open Elective – I)

After completing this course, student will be able to

1. Explain the basic Concept of electrical drives
2. Describe Power Electronics devices & their applications
3. Demonstrate various starting, braking and speed control methods of D.C. Motors
4. Demonstrate various starting, braking and speed control methods of three phase Induction
5. Describe the construction, working principle and applications of single-phase Induction Motor special motors.`,
        },
        {
          id: "be-sem6",
          label: "B.E. Semester-VI",
          content: `### 6EP01 POWER ELECTRONICS

After completing this course, student will be able to

1. Explain the   knowledge about fundamental concepts and techniques used in power
2. Analyze various single phase and three phase power converter and Inverter circuits
3. Analyze the operation of DC/DC and  AC/AC converter circuits
4. Implement industrial applications of power electronic circuits.

### 6EP02 ELECTRICAL ENERGY DISTRIBUTION & UTILIZATION

After completing this course, student will be able to

1. Demonstrate the knowledge of distribution substation
2. Compare different power distribution systems
3. Describe elements of distribution Automation system
4. Select proper electrical drive for industrial applications
5. Explain the  working of  electric traction system
6. Design an illumination system  for various locations

### 6EP03 COMPUTER AIDED ELECTRICAL MACHINE DESIGN

After completing this course, student will be able to

1. Apply the suitable method for Computer aided machine design & select the proper
2. Design the single phase & three phase transformer.
3. Evaluate the performance of the transformer from its design data
4. Design the three phase Induction motor
5. Develop the computer program for design of transformer and three phase IM

### 6EP04 ADVANCE CONTROL SYSTEM (Professional Elective – II)

After completing this course, student will be able to

1. Design compensator using time and frequency domain specifications
2. Analyze the  system using state space Model
3. Apply Z Transform to analyse Digital  systems
4. Analyze the Nonlinear systems

### 6EP04 PROCESS CONTROL SYSTEMS (Professional Elective – II)

After completing this course, student will be able to

1. Explain the various Electronic Instruments for measurement of electrical parameters.
2. Analyse the different signals
3. Demonstrate the signal counting, recording and working of digital readout devices.
4. Demonstrate the Various techniques of A/D and D/A conversions.
5. Apply various signal processing tools as per requirement
6. Develop ladder diagrams &programmes for PLC

### 6EP05 ENERGY AUDIT & MANAGEMENT (Open Elective - II)

After completing this course, student will be able to

1. Discuss energy scenario and it’s management.
2. Conduct the energy audit of different systems.
3. Determine the economics of energy conservation
4. Discuss various energy Conservation methods & their case studies
5. Explain fundamentals of Harmonics.

### 6EP05 ELECTRICAL ESTIMATING & COSTING (Open Elective – II)

After completing this course, student will be able to

1. Understand methods of installation and estimation of service connection
2. Decide type of wiring, its estimation and costing for residential building
3. Carry out electrification of commercial complex, factory unit installations
4. Design & estimate for feeders & distributors
5. Understand contract, tendering and work execution process.`,
        },
        {
          id: "be-sem7",
          label: "B.E. Semester-VII",
          content: `### 7EP01 POWER SYSTEM – II

After completing this course, student will be able to

1. Explain the basic Concept of Fault Analysis in Electrical systems.
2. Analyze the different types of symmetrical and Unsymmetrical Fault in Electric Power
3. Explain the concept of Power System Stability and synchronous machine parameter
4. Analyze the steady state stability of system.
5. Assess transient state stability of two-machine system

### 7EP02 DIGITAL SIGNAL PROCESSING

After completing this course, student will be able to

1. Analyze the discrete time signals in time domain
2. Analyze the discrete time  systems using DTFT and DFT
3. Explain  the concept of Bandpass sampling
4. Design the structures of different types of digital filters
5. Analyze the frequency response of various digital filters
6. Apply the knowledge of multi-rate signal processing

### 7EP03 ENTREPRENEURSHIP AND PROJECT MANAGEMENT

After completing this course, student will be able to

1. Understand the concept of entrepreneurship and its role in economic development.
2. Compare the various business model and select the most suitable.
3. Identify & formulate the project report and Source of finance for a project.
4. Estimate the cost, time & resources for the project work.

### 7EP04 POWER SYSTEM OPERATION & CONTROL (Professional Elective-III)

After completing this course, student will be able to

1. Apply the knowledge of preliminaries on power system operation and control.
2. Determine the optimal scheduling of generation for a two-plant system with and without losses for the economic operation of the power system.
3. Develop the mathematical model of the Automatic Voltage Regulator (AVR) loop and the Automatic Load-Frequency Control (ALFC) loop.
4. Build the block diagram of two area system.
5. Explain the role of the power system stabilizer in damping the steady-state oscillations set up in the power system

### 7EP04 WIND AND SOLAR SYSTEMS (Professional Elective-III)

After completing this course, student will be able to

1. Understand the energy scenario and the consequent growth of the power generation from renewable energy sources.
2. Understand the basic physics of wind and solar power generation.
3. Understand the power electronic interfaces for wind and solar generation.
4. Understand the issues related to the grid-integration of solar and wind energy systems.

### 7EP05 ARTIFICIAL INTELLIGENCE (Professional Elective-IV)

After completing this course, student will be able to

1. Build Artificial model of neuron and architectures of neural network
2. Make use of supervised /unsupervised learning methods for training of ANN
3. Apply fuzzy logic for solving engineering problems
4. Utilize genetic algorithm for optimization of engineering problem

### 7EP05 ELECTRICAL DRIVES & CONTROL (Professional Elective-IV)

After completing this course, student will be able to

1. Elaborate the Concept of electrical drives.
2. Demonstrate the knowledge of modern speed and torque control techniques of electrical
3. Elaborate the scalar control strategies of AC drives.
4. Discuss the vector controlled strategies for AC motor drives
5. Explain direct torque & flux control techniques of Electrical drives.`,
        },
        {
          id: "be-sem8",
          label: "B.E. Semester-VIII",
          content: `### 8EP01 POWER SYSTEM PROTECTION

After completing this course, student will be able to

1. Explain the construction, working and characteristics of different types of protective
2. Develop the protection systems for Distribution and transmission line.
3. Develop the protection systems for various elements of a power system like Alternators, Transformers, Motors & Busbar.
4. Explain the construction & working of different types of circuit breakers, MCB, ELCB,

### 8EP02 COMPUTER METHODS IN POWER SYSTEM ANALYSIS

After completing this course, student will be able to

1. Develop mathematical model to represent the power system components
2. Demonstrate the topology of electrical power system.
3. Formulate Bus Impedance & admittance matrices for Power System Network
4. Conduct short circuit studies of electrical power system.
5. Carry out the load flow Analysis of electrical power system.
6. Perform stability study of electrical power system

### 8EP03 HIGH VOLTAGE ENGINEERING (Professional Elective-V)

After completing this course, student will be able to

1. Explain the breakdown mechanism in solid, liquid, and gaseous dielectrics.
2. Select an appropriate protective device to protect the power system against overvoltage’s caused by internal and external causes.
3. Utilize different circuits for the generation of high AC, DC, and impulse voltages.
4. Measure high AC, DC, and impulse voltages.
5. Test the insulation of various high voltage apparatus used in the power system.

### 8EP03 HVDC and FACTS (Professional Elective-V)

After completing this course, student will be able to

1. Discuss different components of HVDC transmission system.
2. Explain the operation and control of HVDC converters.
3. Identify the suitable reactive power compensation technique and filter for HVDC system.
4. Choose proper FACTS controller for the specific application based on system
5. Analyze the circuits of static shunt and static series compensators used for the prevention of voltage instability and improvement of transient stability and power damping
6. Demonstrate the knowledge of Unified power flow controller (UPFC).

### 8EP04 POWER QUALITY (Professional Elective-VI)

After completing this course, student will be able to

1. Illustrate the concept, need, and standards of Power Quality
2. Classify Power quality characteristics
3. Select power conditioning device for mitigation of power quality problem
4. Make use of measurement tools for power quality survey

### 8EP04 ELECTRICAL ENERGY CONSERVATION AND AUDITING

(Professional Elective-VI)
After completing this course, student will be able to

1. Summarize Indian and global energy scenario.
2. Explain types of energy Audit and its procedure.
3. Discuss economics of energy conservation
4. Elaborate the concepts of energy conservation and management.
5. Choose Appropriate energy efficient techniques for energy conservation
6. Apply the understanding of energy conservation and management for industrial`,
        },
      ];

      const defaultMeSections = [
        {
          id: "me-sem1",
          label: "M.E. Semester-I",
          content: `### 1EPS01 Generation Scheduling & Load Dispatch

By the end of this course, students will be able to
1. Understand the fundamentals of various power generation systems and the concepts of energy management and conservation.
2. Develop skills for coordinating and optimizing the operation of different types of
3. Analyze   and   apply   load   forecasting   methodologies   for   effective   energy
4. Evaluate  generation  system  costs  and  conduct  production  analysis  for  different power generation units.
5. Conduct  reliability  analysis  for  generation  systems,  including  isolated  and interconnected systems.
6. Understand  and  apply  principles  of  load  dispatch  and  system  communication  for centralized control of power systems.

### 1EPS02 Power System Modeling and Control

By the end of this course, students will be able to
1. Understand  the concept of  Stability and  modelling of  Power Systems.
2. Understand Mathematical Models of  speed Governing  Systems , Steady state  and Transient State response of  interconnected power systems.
3. Analyze  the  effect  of  power  System  Stabilizers, excitation  control  and  turbine dynamics, multi machine system with constant impedance loads.
4. Develop  skills  in  converting  machine  coordinates  to  a  system  reference  frame  to simplify the analysis of multi-machine interactions.
5. Understand tie-line bias control in interconnected power systems, practical aspects of implementing AGC.
6. : Explain  SCADA and Self-excited electro-mechanical oscillations in power system.

### 1EPS03 Digital Signal Processing & Applications

After successful completion of this course the students will be able to

1. Analyze and design discrete-time signal processing systems using frequency domain analysis, linearity, convolution, time invariance, stability criteria, and solutions to linear difference equations to address practical DSP problems
2. Utilize the FT, DFT, and FFT, along with their properties, to analyze and process discrete-time signals using techniques like circular and linear convolution from DFT.
3. Understand and apply sampling principles, including the sampling theorem, frequency spectrum, aliasing effects, anti-aliasing filters, low-pass filter reconstruction, quantization, and encoding techniques, to effectively sample and reconstruct discrete-
4. Design and implement various FIR and IIR filters using structures and methods like Direct Forms I and II, Cascade, Parallel, Frequency Sampling, and windowing techniques such as Rectangular, Triangular, and Blackman windows.
5. Design and analyze  analog  filters, convert them into IIR digital filters using various transformation methods, and determine filter order based on specified criteria.
6. Perform multi-rate digital signal processing, apply discrete wavelet and Stockwell transforms, and understand DSP applications in power systems using the TMS320 family of processors.

### 1EPS04 High Voltage Transmission System

By the end of this course, students will be able to
1. Compare HVDC and HVAC transmission systems.
2. Evaluate various converter configurations and their characteristics.
3. Design EHV AC transmission lines considering standard voltages, thermal ratings, and insulator configurations.
4. Explain the corona phenomenon and strategies to reduce it.
5. Explain the lightning mechanism, its effects and protection strategies.

### 1EPS05 Research Methodology and IPR

After successfully completing the course, students will be able to:

1. : Identify research problems and formulate research objectives.
2. Conduct literature reviews and ensure research ethics.
3. : Develop technical reports and research proposals.
4. : Understand intellectual property rights and patenting processes.`,
        },
        {
          id: "me-sem2",
          label: "M.E. Semester-II",
          content: `### 2EPS01 Advanced Protection of Power System

After completing this course, student will be able to

1. Understand and apply the fundamental principles of power system protection.
2. Analyze and evaluate static and numerical relay systems for power system protection.
3. Develop skills to set and coordinate relays for efficient power system protection.
4. : Design and implement protection schemes for transmission lines.
5. : Assess and apply protection schemes for synchronous generators.
6. : Examine and implement protection schemes for power transformers.

### 2EPS02 Power System Dynamics

By the end of this course, students will be able to
1. : Develop  mathematical  models  of  synchronous  machines  using  both    a-b-c coordinates and Park's transformation.
2. : Develop    and  analyze    appropriate  state  variables  for  low  and high-order  state models  ,  response  of  a  SMIB  system  to  large  disturbances  ,  mechanical  and  electrical
3. :  Interpret and Apply the Clarke diagram for two-machine systems with lossy and lossless system  to  assess stability under different system conditions.
4. : Understand    and    Examine  the  effect  of    inertia    ,  governor  action  ,saliency, saturation, and  SCR on system stability.
5. : Analyze  and  Examine the effect of Modes of Oscillations in Unregulated Multi- Machine Systems, excitation on generator power limits, transients, and dynamic stability.
6. : Analyze and Examine dynamic stability using Routh’s Criterion , supplementary stabilizing signals , linear analysis of a stabilized generator.

### 2EPS03 Computer Aided Power System Analysis

Upon successful completion of this course, students will be able to:
1. Model  Power  System Components  and  will demonstrate  proficiency  in  modeling single-phase and three-phase power systems, employing matrix representation techniques for various admittance and impedance matrix.
2. : Conduct  Load  Flow  and  Short  Circuit  Analysis  to  formulate  and  solve  load  flow problems using various techniques.
3. : Analyze  Faults and Sequence Networks to identify  and categorize different types of faults,  apply  symmetrical  components  and  sequence  networks  for  balanced  and  unbalanced fault  analysis,  and  implement  computer  programming  approaches  for  large  system  analysis, including sparse matrix techniques and optimal node ordering.
4. : Perform  State  Estimation  and  Network  Observability  for  applying  state  estimation techniques using maximum likelihood concepts and weighted least-squares methods to detect and identify bad measurements.
5. : Allocate  and  Schedule  Reactive  Power  to  understand  and  apply  concepts  related  to reactive power sources and capability curves
6. : Apply  Advanced  Control  and  Scheduling  Techniques  by utilizing  concepts  of  load frequency   control   and   optimal   hydrothermal   scheduling   to   manage   power   systems

### 2EPS04 Artificial Neural Network

By the end of this course, students will be able to
1. : Understand the basic structure and function of biological neurons , various types of learning paradigms and  learning mechanisms in artificial neural networks.
2. : Describe  Architecture  of    a  Single-Layer  ,  Multilayer  Feed  Forward  Neural Network ,  Perceptron  Training  Algorithm,  Backpropagation  Algorithm,  Learning  Rate and Momentum Coefficient.
3. :  Understand  the  Basics  of    Unsupervised  Learning  :  Counter  propagation networks, Hopfield’s networks
4. : Understand  the  Basics  of  Associative  Memory  Network,  Architecture,  Hebb's Rule and Delta Rule for Pattern Association.
5. :  Understand  Probabilistic  Neural  Networks  ,  Boltzmann  Machine  ,  Support
6. : Understanding  of  various  applications  of  ANN  in  power  system  areas  such  as forecasting, classification, planning, operation, control and protection.`,
        },
        {
          id: "me-sem3",
          label: "M.E. Semester-III",
          content: `### 3EPS01 Renewable Energy Systems

After successful completion of this course the students will be able to

1. Explain the Wind and Solar energy conversion
2. Explain the energy through biomass and biogas
3. Illustrate  the geothermal energy and its applications
4. Summarize the application of fuel cell and tidal power
5. Explain the distributed generation and microgrid

### 3EPS02 Waste to Energy

Upon successful completion of this course, students will be able to:
1. Classify  and  Utilize  Waste  as  Fuel: Identify  and  categorize  various  types  of  waste, including agro-based, forest residues, industrial waste, and municipal solid waste (MSW), and understand their application in conversion devices such as incinerators, gasifiers, and digesters.
2. :  Analyze  Biomass  Pyrolysis  Processes: Describe  and  compare  different  types  of pyrolysis (slow and fast), and evaluate methods for the manufacture of charcoal, pyrolytic oils, and gases, including their yields and applications.
3. : Design and Operate Biomass Gasification Systems: Explain the principles and design of various gasifiers (fixed bed, downdraft, updraft, and fluidized bed), and apply knowledge of gasifier operation, including burner arrangements for thermal heating and engine arrangements for power generation, considering equilibrium and kinetics.
4. :  Evaluate  Biomass  Combustion  Technologies: Analyze  and  differentiate  between various  biomass  combustion  systems,  including  improved  chullahs,  fixed  bed  combustors, inclined   grate   combustors,   and   fluidized   bed   combustors,   focusing   on   their   design, construction, and operational principles.
5. :  Assess Biogas Production and Utilization: Understand the properties and composition of biogas, and describe the technology and design features of biogas plants. Examine various biomass conversion processes including anaerobic digestion, and explore applications such as alcohol production, biodiesel production, and urban waste-to-energy conversion.`,
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
              Comprehensive course outcomes for all semesters of B.E. Electrical
              (Electronics &amp; Power) and M.E. (Electrical Power System)
            </p>
          </div>

          {/* B.E. Course Outcomes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#003366] px-6 py-4 text-center">
              <h3 className="text-xl font-bold text-white">
                B.E. Electrical (Electronics &amp; Power) - Course Outcomes
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
                M.E. (Electrical Power System) - Course Outcomes
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
              <h4 className="font-bold text-lg text-gray-800">
                B.E. (Electrical Engineering)
              </h4>
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
                {t("syllabusDocuments.be", defaultSyllabusDocuments.be).map(
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
                                  className="text-xs px-2 py-1 border border-gray-300 rounded w-40"
                                />
                                {item.fileName && (
                                  <span
                                    className="text-xs text-green-600 truncate max-w-[160px]"
                                    title={item.fileName}
                                  >
                                    📎 {item.fileName}
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
                                  id={`elec-file-upload-be-${i}`}
                                />
                                <label
                                  htmlFor={`elec-file-upload-be-${i}`}
                                  className={`flex items-center gap-1 px-2 py-1 text-xs rounded cursor-pointer transition-colors ${
                                    uploadingFiles[`be-${i}`]
                                      ? "bg-gray-300 text-gray-500"
                                      : "bg-blue-500 text-white hover:bg-blue-600"
                                  }`}
                                  title="Upload PDF"
                                >
                                  {uploadingFiles[`be-${i}`] ? (
                                    "Uploading..."
                                  ) : (
                                    <>
                                      <FaUpload /> PDF
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
                              className={`text-xs font-bold uppercase tracking-wide shrink-0 ${
                                item.fileUrl || item.link
                                  ? "text-ssgmce-blue hover:text-ssgmce-orange hover:underline cursor-pointer"
                                  : "text-gray-400 cursor-not-allowed"
                              }`}
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
              <h4 className="font-bold text-lg text-gray-800">
                M.E. (Electrical Power System)
              </h4>
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
                {t("syllabusDocuments.me", defaultSyllabusDocuments.me).map(
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
                                  id={`elec-file-upload-me-${i}`}
                                />
                                <label
                                  htmlFor={`elec-file-upload-me-${i}`}
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
                              className={`text-xs font-bold uppercase tracking-wide shrink-0 ${
                                item.fileUrl || item.link
                                  ? "text-ssgmce-blue hover:text-ssgmce-orange hover:underline cursor-pointer"
                                  : "text-gray-400 cursor-not-allowed"
                              }`}
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
                      <EditableText
                        value={t(
                          "labResourcesLabel",
                          "Lab Resources / Facilities:",
                        )}
                        onSave={(val) => updateField("labResourcesLabel", val)}
                      />
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
                  {(lab.facilities || isEditing) && (
                    <div>
                      {isEditing ? (
                        <MarkdownEditor
                          value={lab.facilities || ""}
                          onSave={(val) => {
                            const updated = [
                              ...t("laboratories", defaultLaboratories),
                            ];
                            updated[index].facilities = val;
                            updateField("laboratories", updated);
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
                      resources: "Lab resources and equipment...",
                      facilities: "Additional facilities...",
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
                "Department of Electrical Engineering (Electronics & Power)",
              )}
              onSave={(val) => updateField("facultySubtitle", val)}
            />
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {t("facultyData", defaultFacultyData).map((fac, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300  flex relative ${
                isEditing && expandedFacultyEditorIndex === i ? "lg:col-span-2" : ""
              }`}
            >
              {/* Delete Button */}
              {isEditing && (
                <button
                  onClick={() => {
                    const updated = t("facultyData", defaultFacultyData).filter(
                      (_, idx) => idx !== i,
                    );
                    updateField("facultyData", updated);
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
                      const updated = [...t("facultyData", defaultFacultyData)];
                      updated[i].photo = url;
                      updateField("facultyData", updated);
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
                            ...t("facultyData", defaultFacultyData),
                          ];
                          updated[i].photo = url;
                          updateField("facultyData", updated);
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
                  <EditableText
                    value={fac.name}
                    onSave={(val) => {
                      const updated = [...t("facultyData", defaultFacultyData)];
                      updated[i].name = val;
                      updateField("facultyData", updated);
                    }}
                  />
                </h4>
                <div className="text-ssgmce-blue font-medium text-sm mb-3 uppercase tracking-wide text-[11px]">
                  <EditableText
                    value={fac.role}
                    onSave={(val) => {
                      const updated = [...t("facultyData", defaultFacultyData)];
                      updated[i].role = val;
                      updateField("facultyData", updated);
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
                            ...t("facultyData", defaultFacultyData),
                          ];
                          // Convert comma-separated string back to array
                          updated[i].area = val.split(",").map((s) => s.trim());
                          updateField("facultyData", updated);
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
                              ...t("facultyData", defaultFacultyData),
                            ];
                            updated[i].email = val;
                            updateField("facultyData", updated);
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
                              ...t("facultyData", defaultFacultyData),
                            ];
                            updated[i].email2 = val;
                            updateField("facultyData", updated);
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
                              ...t("facultyData", defaultFacultyData),
                            ];
                            updated[i].phone = val;
                            updateField("facultyData", updated);
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
                            <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">Profile ID</div>
                            <EditableText
                              value={fac.id || createFacultySlug(fac.name)}
                              onSave={(val) => updateFacultyMember(i, "id", createFacultySlug(val))}
                            />
                          </div>
                          <div>
                            <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">Vidwan ID</div>
                            <EditableText
                              value={fac.vidwanId || ""}
                              onSave={(val) => updateFacultyMember(i, "vidwanId", val)}
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
                              <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">{label}</div>
                              <EditableText
                                value={isList ? (fac[field] || []).join("\n") : fac[field] || ""}
                                onSave={(val) => updateFacultyMember(i, field, isList ? splitFacultyMultiline(val) : val)}
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
                  ...t("facultyData", defaultFacultyData),
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
                updateField("facultyData", updated);
              }}
              className="w-full py-3 px-4 bg-ssgmce-blue text-white rounded-lg hover:bg-ssgmce-dark-blue transition-colors font-medium"
            >
              + Add New Faculty Member
            </button>
          </div>
        )}
      </div>
    ),

    pride: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
          Pride of the Department
        </h3>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          {[
            { id: "toppers", label: "University Toppers" },
            { id: "alumni", label: "Top Alumnis of Department" },
            { id: "gate", label: "GATE Qualified" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setResearchTab(tab.id)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all text-sm ${
                researchTab === tab.id
                  ? "bg-[#003366] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* University Toppers */}
        {researchTab === "toppers" &&
          (() => {
            const md = t(
              "prideToppersMarkdown",
              elecToppersToMarkdown(t("prideToppers", defaultPrideToppers)),
            );
            return isEditing ? (
              <MarkdownEditor
                value={md}
                onSave={(v) => updateField("prideToppersMarkdown", v)}
                showDocImport
                docTemplateUrl="/uploads/documents/pride_templates/electrical_toppers_template.docx"
                docTemplateLabel="Download Toppers Template"
                placeholder="University toppers table (GFM Markdown)..."
              />
            ) : (
              <ElecPrideMdView markdown={md} />
            );
          })()}

        {/* Top Alumnis */}
        {researchTab === "alumni" &&
          (() => {
            const md = t(
              "prideAlumniMarkdown",
              elecAlumniToMarkdown(t("prideAlumni", defaultPrideAlumni)),
            );
            return isEditing ? (
              <MarkdownEditor
                value={md}
                onSave={(v) => updateField("prideAlumniMarkdown", v)}
                showDocImport
                docTemplateUrl="/uploads/documents/pride_templates/electrical_alumni_template.docx"
                docTemplateLabel="Download Alumni Template"
                placeholder="Top alumni table (GFM Markdown)..."
              />
            ) : (
              <ElecPrideMdView markdown={md} />
            );
          })()}

        {/* GATE Qualified */}
        {researchTab === "gate" &&
          (() => {
            const md = t(
              "prideGateMarkdown",
              elecGateToMarkdown(t("prideGate", defaultPrideGate)),
            );
            return isEditing ? (
              <MarkdownEditor
                value={md}
                onSave={(v) => updateField("prideGateMarkdown", v)}
                showDocImport
                docTemplateUrl="/uploads/documents/pride_templates/electrical_gate_template.docx"
                docTemplateLabel="Download GATE Template"
                placeholder="GATE qualified students table (GFM Markdown)..."
              />
            ) : (
              <ElecPrideMdView markdown={md} />
            );
          })()}
      </div>
    ),

    "student-chapter": (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
          <EditableText
            value={t("studentChapterTitle", "Student Chapter (IEI)")}
            onSave={(val) => updateField("studentChapterTitle", val)}
          />
        </h3>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                <EditableText
                  value={t(
                    "studentChapterOrgName",
                    "The Institution of Engineers (India)",
                  )}
                  onSave={(val) => updateField("studentChapterOrgName", val)}
                />
              </h4>
              <h5 className="text-lg font-semibold text-ssgmce-blue mb-4">
                <EditableText
                  value={t(
                    "studentChapterSubTitle",
                    "Department of Electrical Engineering Students' Chapter :",
                  )}
                  onSave={(val) => updateField("studentChapterSubTitle", val)}
                />
              </h5>
            </div>

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <div className="mb-4">
                <EditableText
                  value={t(
                    "studentChapterDesc",
                    "In order to provide a platform to our students to explore their hidden talent & to keep them abreast with the latest technology, The Institution of Engineers (India) - Department of Electrical Engineering Students' Chapter called as IEI - Electrical is formed.",
                  )}
                  onSave={(val) => updateField("studentChapterDesc", val)}
                  multiline
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6 my-6">
                <h5 className="text-red-600 font-bold text-lg mb-3">
                  Objectives :
                </h5>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  {t(
                    "studentChapterObjectives",
                    defaultStudentChapterObjectives,
                  ).map((objective, i) => (
                    <li key={i} className="group relative pr-8">
                      <EditableText
                        value={objective}
                        onSave={(val) => {
                          const updated = [
                            ...t(
                              "studentChapterObjectives",
                              defaultStudentChapterObjectives,
                            ),
                          ];
                          updated[i] = val;
                          updateField("studentChapterObjectives", updated);
                        }}
                      />
                    </li>
                  ))}
                </ul>
                {isEditing && (
                  <button
                    onClick={() => {
                      const updated = [
                        ...t(
                          "studentChapterObjectives",
                          defaultStudentChapterObjectives,
                        ),
                        "New Objective",
                      ];
                      updateField("studentChapterObjectives", updated);
                    }}
                    className="mt-4 px-4 py-2 bg-white text-ssgmce-blue border border-ssgmce-blue rounded hover:bg-ssgmce-blue hover:text-white transition-colors text-sm"
                  >
                    + Add Objective
                  </button>
                )}
              </div>

              <div className="text-center text-lg font-semibold text-ssgmce-blue italic">
                <EditableText
                  value={t(
                    "studentChapterQuote",
                    "IEI - Electrical helps the students to become a Perfect Technocrat with Good Human Values",
                  )}
                  onSave={(val) => updateField("studentChapterQuote", val)}
                  multiline
                />
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex flex-col items-center">
                  <a
                    href={t(
                      "studentChapterLink",
                      "https://www.ssgmce.ac.in/IEI_ELPO/",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-ssgmce-blue text-white font-semibold rounded-lg hover:bg-ssgmce-dark-blue transition-colors shadow-md hover:shadow-lg mb-2"
                  >
                    <EditableText
                      value={t(
                        "studentChapterLinkText",
                        "Visit IEI Web Portal for more details",
                      )}
                      onSave={(val) =>
                        updateField("studentChapterLinkText", val)
                      }
                    />
                    <FaAngleRight className="ml-2" />
                  </a>
                  {isEditing && (
                    <div className="bg-gray-100 p-2 rounded text-xs text-gray-600">
                      Link URL:
                      <EditableText
                        value={t(
                          "studentChapterLink",
                          "https://www.ssgmce.ac.in/IEI_ELPO/",
                        )}
                        onSave={(val) => updateField("studentChapterLink", val)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    projects: (
      <div className="space-y-8">
        {(() => {
          const ugProjectYears = getUgProjectYears();
          const ugProjectRecords = getUgProjectRecords();
          const ugProjectMarkdownByYear = getUgProjectMarkdownByYear();
          const currentUgProjects = Array.isArray(ugProjectRecords?.[projectYear])
            ? ugProjectRecords[projectYear]
            : [];
          const selectedUgProjectsMarkdown =
            ugProjectMarkdownByYear?.[projectYear] ||
            electricalUgProjectsToMarkdown({ [projectYear]: currentUgProjects }, [
              projectYear,
            ]);

          return (
            <>
              <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
                UG Projects
              </h3>

              <div className="flex flex-wrap gap-2 items-center border-b border-gray-200 pb-4">
                {ugProjectYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setProjectYear(year)}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all text-sm ${
                      projectYear === year
                        ? "bg-[#003366] text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    UG Project {year}
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
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#003366] to-[#0b4d91] px-4 py-2 text-xs font-semibold text-white transition-all hover:shadow-lg"
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
                        <th className="px-6 py-4 text-left text-sm font-bold text-ssgmce-blue">
                          <EditableText
                            value={t("projectGroupNoHeader", "Group No.")}
                            onSave={(val) =>
                              updateField("projectGroupNoHeader", val)
                            }
                          />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-ssgmce-blue">
                          <EditableText
                            value={t("projectTitleHeader", "Project Title")}
                            onSave={(val) =>
                              updateField("projectTitleHeader", val)
                            }
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentUgProjects.map((project, i) => (
                        <tr
                          key={i}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                            {project.no || i + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
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
                        here updates the UG Projects table above without
                        changing the current frontend layout.
                      </p>
                    </div>
                    <MarkdownEditor
                      key={projectYear}
                      value={selectedUgProjectsMarkdown}
                      onSave={handleUgProjectMarkdownSave}
                      showDocImport
                      docTemplateUrl="/uploads/documents/pride_templates/electrical_ug_projects_template.docx"
                      docTemplateLabel="Download UG Projects Template"
                      placeholder={`UG projects for ${projectYear} (GFM Markdown)...`}
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
                            <strong>Note:</strong> After adding the session, you
                            will get an empty markdown editor with the same UG
                            Projects table structure and DOCX import support
                            for that session.
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
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-[#003366] to-[#0b4d91] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              onSave={(val) => updateField("activitiesTitle", val)}
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
                      src={getLocalElectricalActivityImageUrl(activity.image)}
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
                  prev >= activitiesData.length
                    ? 6
                    : prev + 6,
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
                  src={
                    getLocalElectricalActivityImageUrl(
                      activitiesData[lightboxActivity]?.image,
                    )
                  }
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
                {lightboxActivity <
                  activitiesData.length - 1 && (
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
              onSave={(val) => updateField("newsletterTitle", val)}
            />
          </h3>
          <div className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            <EditableText
              value={t(
                "newsletterDescription",
                "Stay updated with the latest happenings, student achievements, faculty contributions, and department events through our periodic newsletters.",
              )}
              onSave={(val) => updateField("newsletterDescription", val)}
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
                Department of Electrical Engineering (Electronics &amp; Power)
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
                            "News Letter 2024-25 (Spring Semester)"
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
              Department of Electrical Engineering
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
              value={t("courseMaterialTitle", "Course Material")}
              onSave={(val) => updateField("courseMaterialTitle", val)}
            />
          </h3>
          <div className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            <EditableText
              value={t(
                "courseMaterialDescription",
                "Access comprehensive course materials, lecture notes, assignments, and study resources for all semesters.",
              )}
              onSave={(val) => updateField("courseMaterialDescription", val)}
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
                Department of Electrical Engineering
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
              {courseMaterialItems.map((material, i) => (
                <div
                  key={i}
                  ref={i === courseMaterialItems.length - 1 ? latestCourseMaterialRef : null}
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
                            Year / Semester
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
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-4 font-bold text-center w-20">
                      Sr. No.
                    </th>
                    <th className="px-6 py-4 font-bold">Year / Semester</th>
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
                        <span className="font-bold text-gray-800">
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
                </tbody>
              </table>
            </div>
          )}
          <div className="p-4 text-xs text-gray-400 text-center bg-gray-50 border-t border-gray-100">
            Click on "Access Drive" to view and download course materials from
            the respective semester's shared folder.
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
            electricalInnovativePracticesToMarkdown(defaultPractices);
          const parsedPractices = electricalMarkdownToInnovativePractices(md);
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
                          electricalInnovativePracticesToMarkdown(nextPractices);
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
                      const parsed = electricalMarkdownToInnovativePractices(v);
                      updateData("templateData.innovativePractices.markdown", v);
                      updateData("templateData.innovativePractices.items", parsed);
                      updateData("innovativePractices.markdown", v);
                      updateData("innovativePractices", parsed);
                    }}
                    showDocImport
                    docTemplateUrl="/uploads/documents/innovative_practice_templates/electrical_template.docx"
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
      const industrialVisitPhotos = getElectricalIndustrialVisitGallery();
      const industrialVisitTable = getElectricalIndustrialVisits();
      const industrialVisitsMarkdown = getElectricalIndustrialVisitsMarkdown(
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
              culture through structured visits to leading power sector
              organizations and industries.
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
                    onClick={addElectricalIndustrialVisitPhoto}
                    className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                  >
                    <FaPlus className="text-xs" />
                    Add Photo
                  </button>
                </div>

                <div className="space-y-4">
                  {industrialVisitPhotos.map((photo, idx) => {
                    const uploadKey = `electrical-gallery-${idx}`;
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
                                  if (file) {
                                    uploadElectricalIndustrialVisitPhoto(idx, file);
                                  }
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
                                  updateElectricalIndustrialVisitPhoto(
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
                                    updateElectricalIndustrialVisitPhoto(
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
                                    updateElectricalIndustrialVisitPhoto(
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
                              onClick={() => deleteElectricalIndustrialVisitPhoto(idx)}
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
                            {(Array.isArray(visit.industries)
                              ? visit.industries
                              : [visit.industry]
                            )
                              .filter(Boolean)
                              .map((industry, industryIndex) => (
                                <div
                                  key={`${idx}-${industryIndex}`}
                                  className="text-gray-700"
                                >
                                  {industry}
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
                        onClick={addElectricalIndustrialVisitRowOnTop}
                        className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                      >
                        <FaPlus className="text-xs" />
                        Add New Row On Top
                      </button>
                    </div>
                  </div>
                  <MarkdownEditor
                    value={industrialVisitsMarkdown}
                    onSave={handleElectricalIndustrialVisitsMarkdownSave}
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
                      const uploadKey = `electrical-industrial-visit-${visit.id}`;
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
                                    uploadElectricalIndustrialVisitReport(visit.id, file);
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
          const mous = getElectricalMous();
          const mousMarkdown = getElectricalMousMarkdown(mous);
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
                        <button type="button" onClick={addElectricalMouRowOnTop} className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange">
                          <FaPlus className="text-xs" />
                          Add New Row On Top
                        </button>
                      </div>
                    </div>
                    <MarkdownEditor value={mousMarkdown} onSave={handleElectricalMousMarkdownSave} placeholder="MoUs table without serial-number column (GFM Markdown)..." />
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-gray-800">Upload MoU PDF / Report</h4>
                      <p className="text-sm text-gray-500 mt-1">Upload the PDF only for the row you want to attach a document to.</p>
                    </div>
                    <div className="space-y-3">
                      {mous.map((mou, idx) => {
                        const uploadKey = `electrical-mou-${mou.id}`;
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
                                    if (file) uploadElectricalMouReport(mou.id, file);
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
          {["patents", "publications", "copyrights", "books"].map((tab) => (
            <button
              key={tab}
              onClick={() => setPatentsTab(tab)}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-all capitalize ${patentsTab === tab ? "bg-white text-ssgmce-blue shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab === "copyrights"
                ? "Copyrights"
                : tab === "books"
                  ? "Books"
                  : tab === "patents"
                    ? "Patents"
                    : "Publications"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {patentsTab === "patents" ? (
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
                  Patents Granted &amp; Published
                </h3>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {dynamicPatentsYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setPatentsYear(year)}
                      className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                        patentsYear === year
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
                    No patents recorded for {patentsYear}.
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
          ) : patentsTab === "publications" ? (
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
                  Research Publications
                </h3>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {dynamicPatentsYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setPatentsYear(year)}
                      className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                        patentsYear === year
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
                    No publications recorded for {patentsYear}.
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
                                    —
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
          ) : patentsTab === "copyrights" ? (
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
                  {dynamicPatentsYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setPatentsYear(year)}
                      className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                        patentsYear === year
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
                    No copyrights recorded for {patentsYear}.
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
          ) : patentsTab === "books" ? (
            <motion.div
              key="books"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center mb-2 md:mb-0">
                  <FaProjectDiagram className="text-teal-500 mr-2" />
                  Books &amp; Book Chapters Published
                </h3>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {dynamicPatentsYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setPatentsYear(year)}
                      className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                        patentsYear === year
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
                    No books published for {patentsYear}.
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
                                {book.isbn || "—"}
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
                      Edit {patentsYear} {patentsTab} in Markdown
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Keep the public table layout unchanged while editing this
                      session through markdown, DOCX import, and the matching
                      template.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addElectricalResearchRowOnTop()}
                    className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ssgmce-orange"
                  >
                    <FaPlus className="text-xs" />
                    Add New Row On Top
                  </button>
                </div>
              </div>
              <MarkdownEditor
                key={`${patentsTab}-${patentsYear}`}
                value={selectedResearchMarkdown}
                onSave={handleElectricalResearchMarkdownSave}
                showDocImport
                docTemplateUrl={ELECTRICAL_RESEARCH_TEMPLATE_URLS[patentsTab]}
                docTemplateLabel="Download Template"
                placeholder={`${patentsTab} table for ${patentsYear} (GFM Markdown)...`}
              />
            </div>
          </div>
        )}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="text-sm font-bold text-ssgmce-blue mb-2 flex items-center">
            <FaDownload className="mr-2" /> Year-wise Detailed Reports (PDF)
          </h4>
          <div className="flex flex-wrap gap-2">
            {dynamicPatentsYears.map((year) => (
              <a
                key={year}
                href={getElectricalResearchReportUrl(year)}
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
              {dynamicPatentsYears.map((year) => {
                const uploadKey = `electrical-research-report-${year}`;
                const reportUrl = getElectricalResearchReportUrl(year);
                return (
                  <div
                    key={`electrical-research-report-${year}`}
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
                            if (file) uploadElectricalResearchReport(year, file);
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
            <div className="flex justify-center mb-4">
              <a
                href={
                  internshipYear === "2024-25"
                    ? "/uploads/documents/electrical_internships/Electrical_Internship_2024-25.pdf"
                    : "/uploads/documents/electrical_internships/Electrical_Internship_2023-24.pdf"
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
                      <th className="px-3 py-4 text-left font-bold">Class</th>
                      <th className="px-3 py-4 text-left font-bold">
                        Training / Internship
                      </th>
                      <th className="px-3 py-4 text-left font-bold">
                        Name of Company
                      </th>
                      <th className="px-3 py-4 text-left font-bold">Duration</th>
                      <th className="px-3 py-4 text-left font-bold whitespace-nowrap">
                        Start Date
                      </th>
                      <th className="px-3 py-4 text-left font-bold whitespace-nowrap">
                        End Date
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
                        <td className="px-3 py-3 text-gray-700 text-center whitespace-nowrap">
                          {intern.class}
                        </td>
                        <td className="px-3 py-3 text-gray-700 text-xs">
                          {intern.training}
                        </td>
                        <td className="px-3 py-3 text-gray-700 text-xs">
                          {intern.org}
                        </td>
                        <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                          {intern.duration}
                        </td>
                        <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                          {intern.startDate}
                        </td>
                        <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                          {intern.endDate}
                        </td>
                      </tr>
                    ))}
                    {currentInternships.length === 0 && (
                      <tr>
                        <td
                          colSpan={9}
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
                docTemplateUrl="/uploads/documents/pride_templates/electrical_internships_template.docx"
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

  const SidebarLink = ({ id, label, index, collectionName }) => (
    <div
      className={`relative w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between group overflow-hidden cursor-pointer
        ${
          activeTab === id
            ? "bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white shadow-lg border-l-4 border-ssgmce-orange"
            : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 hover:text-ssgmce-blue hover:shadow-md hover:scale-[1.02]"
        }`}
      onClick={() => setActiveTab(id)}
    >
      <span className="flex items-center relative z-10 w-full">
        <span
          className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${activeTab === id ? "bg-white shadow-md" : "bg-gray-400 group-hover:bg-ssgmce-orange group-hover:shadow-sm"}`}
        ></span>
        <div
          className="flex-1"
          onClick={(e) => {
            if (isEditing) {
              e.stopPropagation();
            }
          }}
        >
          {isEditing ? (
            <EditableText
              value={label}
              onSave={(val) => {
                const defaultLinks =
                  collectionName === "academicsLinks"
                    ? defaultAcademicsLinks
                    : defaultIndustryLinks;
                const links = t(collectionName) || defaultLinks;
                const newLinks = [...links];
                newLinks[index] = { ...newLinks[index], label: val };
                updateField(collectionName, newLinks);
              }}
            />
          ) : (
            label
          )}
        </div>
      </span>
      {activeTab === id && <FaAngleRight className="opacity-90 text-white" />}
    </div>
  );

  return (
    <GenericPage
      title="Electrical Engineering (Electronics & Power)"
      backgroundImage={electricalBanner}
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
                {academicsLinks.map((link, index) => (
                  <SidebarLink
                    key={link.id}
                    {...link}
                    index={index}
                    collectionName="academicsLinks"
                  />
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
                {industryLinks.map((link, index) => (
                  <SidebarLink
                    key={link.id}
                    {...link}
                    index={index}
                    collectionName="industryLinks"
                  />
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
                      patents, publications, copyrights, and books with an empty
                      markdown table plus DOCX import and template download support.
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

const ELECTRICAL_ACTIVITY_REMOTE_IMAGE_PREFIX =
  "https://www.ssgmce.ac.in/images/elect_faculty/";

const getLocalElectricalActivityImageUrl = (imageUrl = "") => {
  const normalizedUrl = String(imageUrl || "").trim();
  if (!normalizedUrl) return "";

  if (
    normalizedUrl
      .toLowerCase()
      .startsWith(ELECTRICAL_ACTIVITY_REMOTE_IMAGE_PREFIX.toLowerCase())
  ) {
    const fileName = normalizedUrl.split("/").pop()?.split("?")[0] || "";
    return fileName
      ? `/uploads/images/electrical/activities/${fileName}`
      : normalizedUrl;
  }

  return normalizedUrl;
};

const normalizeElectricalActivity = (activity = {}) => ({
  title: String(activity.title || "").trim(),
  date: String(activity.date || "").trim(),
  participants: String(activity.participants || "").trim(),
  organizer: String(activity.organizer || "").trim(),
  resource: String(activity.resource || "").trim(),
  image: getLocalElectricalActivityImageUrl(activity.image),
});

const defaultElectricalActivityCards =
  defaultActivities.map(normalizeElectricalActivity);

const formatElectricalActivityMarkdownField = (
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

const electricalActivitiesToMarkdown = (activities = []) =>
  activities
    .map((activity) => normalizeElectricalActivity(activity))
    .filter((activity) => activity.title)
    .map((activity) =>
      [
        `## ${activity.title}`,
        formatElectricalActivityMarkdownField("Date", activity.date, true),
        formatElectricalActivityMarkdownField(
          "Participants",
          activity.participants,
          true,
        ),
        formatElectricalActivityMarkdownField(
          "Organized by",
          activity.organizer,
          true,
        ),
        formatElectricalActivityMarkdownField(
          "Resource Person",
          activity.resource,
          true,
        ),
        formatElectricalActivityMarkdownField("Image", activity.image, true),
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

const parseElectricalActivitiesMarkdown = (markdown = "") => {
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

      return normalizeElectricalActivity({
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

export default Electrical;
