const createDocument = (title, href, date, description) => ({
  title,
  href,
  date,
  description,
  type: "PDF",
});

const policiesBase =
  "/documents/institution/administration/policies-and-procedure";
const mandatoryBase =
  "/documents/institution/administration/mandatory-disclosure";
const aicteBase =
  "/documents/institution/administration/aicte-approval";
const financialBase =
  "/documents/institution/administration/financial-statements";
const officeBase =
  "/documents/institution/administration/office-documents";
const naacBase = "/documents/institution/iqac/naac";
const nbaBase = "/documents/institution/iqac/nba";
const isoBase = "/documents/institution/iqac/iso";
const auditBase = "/documents/institution/iqac/sustainable-audit";
const nirfBase = "/documents/institution/academics/nirf";
const newslettersBase = "/documents/institution/others/newsletters";
const tattwadarshiBase =
  "/documents/institution/others/e-tattwadarshi";

export const DOCUMENT_SECTION_ALIASES = {
  aicte: "aicte",
  audit: "audit",
  disclosure: "mandatory",
  documents: "all",
  financial: "financial",
  iso: "iso",
  mandatory: "mandatory",
  naac: "naac",
  nba: "nba",
  newsletter: "newsletter",
  nirf: "nirf",
  policies: "policies",
  "student-forms": "office",
  tattwadarshi: "tattwadarshi",
};

export const DOCUMENT_CATEGORIES = [
  {
    id: "academics",
    label: "Academics",
    description:
      "Ranking and academic reference documents arranged year-wise for quick access.",
    sections: [
      {
        id: "nirf",
        label: "NIRF",
        summary:
          "National Institutional Ranking Framework submissions across engineering, management, innovation, and overall categories.",
        documents: [
          createDocument(
            "NIRF 2025-26 Overall",
            `${nirfBase}/NIRF_2025-26_Overall.pdf`,
            "2025-26",
            "Overall institutional submission."
          ),
          createDocument(
            "NIRF 2025-26 Management",
            `${nirfBase}/NIRF_2025-26_Management.pdf`,
            "2025-26",
            "Management category submission."
          ),
          createDocument(
            "NIRF 2025-26 Innovation",
            `${nirfBase}/NIRF_2025-26-Innovation.pdf`,
            "2025-26",
            "Innovation category submission."
          ),
          createDocument(
            "NIRF 2024-25 Overall",
            `${nirfBase}/NIRF_2024-25_Overall.pdf`,
            "2024-25"
          ),
          createDocument(
            "NIRF 2024-25 Engineering",
            `${nirfBase}/NIRF_2024-25-ENGINEERING.pdf`,
            "2024-25"
          ),
          createDocument(
            "NIRF 2024-25 Innovation",
            `${nirfBase}/NIRF_2024-25-Innovation.pdf`,
            "2024-25"
          ),
          createDocument(
            "NIRF 2023-24 Overall",
            `${nirfBase}/NIRF_2023-24_Overall.pdf`,
            "2023-24"
          ),
          createDocument(
            "NIRF 2023-24 Engineering",
            `${nirfBase}/NIRF_2023-24-ENGINEERING.pdf`,
            "2023-24"
          ),
          createDocument(
            "NIRF 2023-24 Management",
            `${nirfBase}/NIRF_2023-24_Management.pdf`,
            "2023-24"
          ),
          createDocument(
            "NIRF 2023-24 Innovation",
            `${nirfBase}/NIRF_2023-24-Innovation.pdf`,
            "2023-24"
          ),
          createDocument(
            "NIRF 2022-23 Overall",
            `${nirfBase}/NIRF_2022-23_Overall.pdf`,
            "2022-23"
          ),
          createDocument(
            "NIRF 2022-23 Engineering",
            `${nirfBase}/NIRF_2022-23_Engineering.pdf`,
            "2022-23"
          ),
          createDocument(
            "NIRF 2022-23 Management",
            `${nirfBase}/NIRF_2022-23_Management.pdf`,
            "2022-23"
          ),
          createDocument(
            "NIRF 2021 Submission",
            `${nirfBase}/NIRF 2021 SSGMCE.pdf`,
            "2021"
          ),
        ],
      },
    ],
  },
  {
    id: "iqac",
    label: "IQAC",
    description:
      "Quality assurance, accreditation, certification, and audit records grouped under one section.",
    sections: [
      {
        id: "naac",
        label: "NAAC",
        summary:
          "NAAC certificates and peer team reports from multiple accreditation cycles.",
        documents: [
          createDocument(
            "NAAC Certificate A+",
            `${naacBase}/NAAC Certificate A+ 2024.pdf`,
            "2024",
            "Latest NAAC accreditation certificate."
          ),
          createDocument(
            "Peer Team Report - Cycle II",
            `${naacBase}/cycle-2--PEER Team Report 2010.pdf`,
            "2010"
          ),
          createDocument(
            "NAAC Certificate - Cycle II",
            `${naacBase}/NAAC CERTIFICATE 2010.pdf`,
            "2010"
          ),
          createDocument(
            "Peer Team Report - Cycle I",
            `${naacBase}/cycle-I_report_Nov_2002.pdf`,
            "2002"
          ),
          createDocument(
            "NAAC Certificate - Cycle I",
            `${naacBase}/NAAC CERTIFICATE - 2003.pdf`,
            "2003"
          ),
        ],
      },
      {
        id: "nba",
        label: "NBA",
        summary:
          "Program accreditation records across branches and accreditation periods.",
        documents: [
          createDocument(
            "NBA Accreditation 2022-23 to 2025",
            `${nbaBase}/NBA ACCREDITATION 2022-23 TO 2025.pdf`,
            "2022-25"
          ),
          createDocument(
            "NBA Accreditation 2020",
            `${nbaBase}/Accredation20.01.20.pdf`,
            "2020"
          ),
          createDocument(
            "NBA Accreditation 2013",
            `${nbaBase}/Accredation16.08.13.pdf`,
            "2013"
          ),
          createDocument(
            "NBA Accreditation 2013 - Department Summary",
            `${nbaBase}/2013 ELPO EXTC MECH.pdf`,
            "2013"
          ),
          createDocument(
            "NBA Accreditation 2012",
            `${nbaBase}/Accredation18.12.12.pdf`,
            "2012"
          ),
          createDocument(
            "NBA Accreditation 2009",
            `${nbaBase}/2009 EXTC ELPO MECH.pdf`,
            "2009"
          ),
          createDocument(
            "NBA Accreditation 2007",
            `${nbaBase}/Accredation18.05.2007.pdf`,
            "2007"
          ),
          createDocument(
            "NBA Accreditation 2007 Copy",
            `${nbaBase}/Accredation18.05.2007 (1).pdf`,
            "2007"
          ),
          createDocument(
            "NBA Accreditation 2005",
            `${nbaBase}/2005 MECH EXTC ELPO.pdf`,
            "2005"
          ),
          createDocument(
            "NBA Accreditation 2002",
            `${nbaBase}/Accredation13.05.2002.pdf`,
            "2002"
          ),
          createDocument(
            "NBA Accreditation 2002 Copy",
            `${nbaBase}/Accredation13.05.2002 (1).pdf`,
            "2002"
          ),
          createDocument(
            "NBA Accreditation 2001",
            `${nbaBase}/2001 NBA EXTC ELPO CSE MECH.pdf`,
            "2001"
          ),
          createDocument(
            "NBA Accreditation Archive 2000-2008",
            `${nbaBase}/2000-2008.pdf`,
            "2000-08"
          ),
        ],
      },
      {
        id: "iso",
        label: "ISO",
        summary:
          "ISO quality committee, manual, and certification records.",
        documents: [
          createDocument(
            "ISO 9001-2015 Certificate",
            `${isoBase}/ISO-9001-2015-Certificate-SSGMCE.pdf`,
            "ISO 9001:2015"
          ),
          createDocument(
            "ISO Apex Quality Manual",
            `${isoBase}/ISO 9001-2015 Corrected Apex Quality Manual.pdf`,
            "Manual"
          ),
          createDocument(
            "ISO Cell Committee",
            `${isoBase}/ISO -Cell-Committe.pdf`,
            "Committee"
          ),
        ],
      },
      {
        id: "audit",
        label: "Sustainable Audit",
        summary:
          "Environmental, green, and energy audit documents aligned with institutional quality efforts.",
        documents: [
          createDocument(
            "Energy Audit 2023-24",
            `${auditBase}/Energy_audit202324.pdf`,
            "2023-24"
          ),
          createDocument(
            "Environmental Audit 2023-24",
            `${auditBase}/environmental_ audit _23-24.pdf`,
            "2023-24"
          ),
          createDocument(
            "Green Audit 2023-24",
            `${auditBase}/Green_audit_23_24.pdf`,
            "2023-24"
          ),
        ],
      },
    ],
  },
  {
    id: "administration",
    label: "Administration",
    description:
      "Compliance, policy, office, and financial records required for public access and governance.",
    sections: [
      {
        id: "policies",
        label: "Policies and Procedure",
        summary:
          "Institutional policies, procedure manuals, and governing documents.",
        documents: [
          createDocument(
            "Strategic Plan and Deployment",
            `${policiesBase}/1_startegic_pan_and _deployment.pdf`
          ),
          createDocument(
            "Curriculum Policy",
            `${policiesBase}/2_Curriculam Policy-updated.pdf`
          ),
          createDocument(
            "Innovation Practices",
            `${policiesBase}/3_Innovation Practices-updated.pdf`
          ),
          createDocument(
            "Code of Conduct",
            `${policiesBase}/4 Code of Conduct.pdf`
          ),
          createDocument(
            "Student-Centric Policy",
            `${policiesBase}/4_2.3.1 Student-centric.pdf`
          ),
          createDocument(
            "Examination Policy",
            `${policiesBase}/5_Exam Policy-rev.pdf`
          ),
          createDocument(
            "Mentor Policy",
            `${policiesBase}/6_Mentor Policy.pdf`
          ),
          createDocument(
            "Slow and Advanced Learner Policy",
            `${policiesBase}/7_Slow -Advanced -Learner-Policy-website-.pdf`
          ),
          createDocument(
            "IQAC Policy",
            `${policiesBase}/8_IQAC Policy.pdf`
          ),
          createDocument(
            "AAA Policy",
            `${policiesBase}/9_AAA Policy.pdf`
          ),
          createDocument(
            "Budget Policy",
            `${policiesBase}/10_Budget Policy.pdf`
          ),
          createDocument(
            "Anti-Ragging Policy",
            `${policiesBase}/11_Anti_ragging _policy.pdf`
          ),
          createDocument(
            "Anti-Sexual Harassment Policy",
            `${policiesBase}/12_Anti_sexual_harassment _policy.pdf`
          ),
          createDocument(
            "Gender Equity Policy",
            `${policiesBase}/13_Gender Equity Policy.pdf`
          ),
          createDocument(
            "Grievance Redressal Policy",
            `${policiesBase}/14_Grievance-Redressal_policy.pdf`
          ),
          createDocument(
            "Maintenance Policy",
            `${policiesBase}/15_Maintenance Policy.pdf`
          ),
          createDocument(
            "Scholarship Policy",
            `${policiesBase}/16_Scholarship Policy.pdf`
          ),
          createDocument(
            "Staff Welfare Policy",
            `${policiesBase}/17_Staff Welfare Policy.pdf`
          ),
          createDocument(
            "Financial Assistance Policy",
            `${policiesBase}/18_Financial Assistant Policy-SSJ.pdf`
          ),
          createDocument(
            "Performance Appraisal",
            `${policiesBase}/19_Performance appraisal.pdf`
          ),
          createDocument(
            "ICT Policy",
            `${policiesBase}/20_ICT Policy.pdf`
          ),
          createDocument(
            "Green Campus Policy",
            `${policiesBase}/21_Green_campus-policy-rev.pdf`
          ),
          createDocument(
            "Energy Conservation Policy",
            `${policiesBase}/22_Energy conservation.pdf`
          ),
          createDocument(
            "Environment Policy",
            `${policiesBase}/23_Environment policy.pdf`
          ),
          createDocument(
            "Rules and Regulations",
            `${policiesBase}/Rules_Regulations.pdf`
          ),
          createDocument(
            "Strategic Plan with Signature 2023-28",
            `${policiesBase}/Strategic Plan with sign 23-28.pdf`
          ),
        ],
      },
      {
        id: "mandatory",
        label: "Mandatory Disclosure",
        summary:
          "AICTE mandatory disclosure reports published for public compliance year by year.",
        documents: [
          createDocument(
            "Mandatory Disclosure 2025-26",
            `${mandatoryBase}/Mandatory Disclosure_2025-26.pdf`,
            "2025-26"
          ),
          createDocument(
            "Mandatory Disclosure 2024-25",
            `${mandatoryBase}/Mandatory Disclosure_2024-25.pdf`,
            "2024-25"
          ),
          createDocument(
            "Revised Mandatory Disclosure 2023-24",
            `${mandatoryBase}/Revised Mandatory Disclosure_2023-24.pdf`,
            "2023-24"
          ),
          createDocument(
            "Mandatory Disclosure 2022-23",
            `${mandatoryBase}/Mandatory Disclosure_2022-23.pdf`,
            "2022-23"
          ),
          createDocument(
            "Mandatory Disclosure 2021-22",
            `${mandatoryBase}/Mandatory Disclosure_2021-22.pdf`,
            "2021-22"
          ),
        ],
      },
      {
        id: "aicte",
        label: "AICTE Approval",
        summary:
          "AICTE approval history and extension of approval records.",
        documents: [
          createDocument(
            "EOA Three Year Approval with 2024-25 Approval",
            `${aicteBase}/EOA Three Year Approval along with 2024-25 Approval.pdf`,
            "2024-25 to 2026-27"
          ),
          createDocument(
            "EOA Report 2023-24",
            `${aicteBase}/EOA-Report-2023-24.PDF`,
            "2023-24"
          ),
          createDocument(
            "EOA 2010-11 to 2021-22",
            `${aicteBase}/EOA_2010-11 to 2021-22.pdf`,
            "2010-22"
          ),
          createDocument(
            "AICTE Approvals 1992 to 2022-23",
            `${aicteBase}/AICTE APPROVALS 1992 TO 2022-23.pdf`,
            "1992-2023"
          ),
        ],
      },
      {
        id: "financial",
        label: "Financial Statements",
        summary:
          "Audited balance sheets and annual financial statements.",
        documents: [
          createDocument(
            "Balance Sheet 2024-25",
            `${financialBase}/BALANCE SHEET 2024-25.pdf`,
            "2024-25"
          ),
          createDocument(
            "Balance Sheet 2023-24",
            `${financialBase}/BALANCE SHEET 2023-24.pdf`,
            "2023-24"
          ),
          createDocument(
            "College Financial Statement 2022-23",
            `${financialBase}/College Financial Statement 2022-23.pdf`,
            "2022-23"
          ),
          createDocument(
            "College Financial Statement 2021-22",
            `${financialBase}/College Financial Statement 2021-22.pdf`,
            "2021-22"
          ),
          createDocument(
            "College Financial Statement 2020-21",
            `${financialBase}/College Financial Statement 2020-21.pdf`,
            "2020-21"
          ),
          createDocument(
            "College Financial Statement 2019-20",
            `${financialBase}/College Financial Statement 2019-20.pdf`,
            "2019-20"
          ),
          createDocument(
            "College Financial Statement 2018-19",
            `${financialBase}/College Financial Statement 2018-19.pdf`,
            "2018-19"
          ),
        ],
      },
      {
        id: "office",
        label: "Office Documents",
        summary:
          "General office references, service information, and institutional downloads.",
        documents: [
          createDocument(
            "Online Proposal for Approval of Fees 2026-27",
            `${officeBase}/ONLINE PROPOSAL FOR APPROVAL OF FEES FOR A.Y. 2026-27.pdf`,
            "2026-27"
          ),
          createDocument(
            "Institute Brochure",
            `${officeBase}/Final SSGMCE Brochure2023.pdf`,
            "Brochure"
          ),
          createDocument(
            "Services Offered by the College",
            `${officeBase}/Services offered by the College.pdf`,
            "Office"
          ),
          createDocument(
            "Services Offered by the University",
            `${officeBase}/Services offered by the University.pdf`,
            "Office"
          ),
        ],
      },
    ],
  },
  {
    id: "others",
    label: "Others",
    description:
      "Institutional publications and archives for newsletters and e-magazines.",
    sections: [
      {
        id: "newsletter",
        label: "News Letters",
        summary:
          "Official newsletters published across recent academic years.",
        documents: [
          createDocument(
            "SSGMCE Newsletter 2025",
            `${newslettersBase}/SSGMCE Newsletter 2025.pdf`,
            "2025"
          ),
          createDocument(
            "SSGMCE Newsletter 2024",
            `${newslettersBase}/SSGMCE Newsletter 2024.pdf`,
            "2024"
          ),
          createDocument(
            "Newsletter 2022",
            `${newslettersBase}/Newsletter2022.pdf`,
            "2022"
          ),
          createDocument(
            "Newsletter 2021",
            `${newslettersBase}/Newsletter2021.pdf`,
            "2021"
          ),
          createDocument(
            "Newsletter 2020",
            `${newslettersBase}/Newsletter2020.pdf`,
            "2020"
          ),
          createDocument(
            "Newsletter Archive 2023",
            `${newslettersBase}/Tattwadarshi 2023.pdf`,
            "2023",
            "Publication archive shared under newsletters."
          ),
        ],
      },
      {
        id: "tattwadarshi",
        label: "e-Tattwadarshi",
        summary:
          "Year-wise e-Tattwadarshi institutional publication archive.",
        documents: [
          createDocument(
            "e-Tattwadarshi 2025",
            `${tattwadarshiBase}/Tattwadarshi 2025.pdf`,
            "2025"
          ),
          createDocument(
            "e-Tattwadarshi 2024",
            `${tattwadarshiBase}/Tattwadarshi 2024.pdf`,
            "2024"
          ),
          createDocument(
            "e-Tattwadarshi 2023",
            `${tattwadarshiBase}/Tattwadarshi 2023.pdf`,
            "2023"
          ),
          createDocument(
            "e-Tattwadarshi 2022",
            `${tattwadarshiBase}/Tattwadarshi 2022.pdf`,
            "2022"
          ),
          createDocument(
            "e-Tattwadarshi 2021",
            `${tattwadarshiBase}/Tattwadarshi 2021.pdf`,
            "2021"
          ),
          createDocument(
            "e-Tattwadarshi 2020",
            `${tattwadarshiBase}/Tattwadarshi 2020.pdf`,
            "2020"
          ),
          createDocument(
            "e-Tattwadarshi 2019",
            `${tattwadarshiBase}/Tattwadarshi 2019.pdf`,
            "2019"
          ),
          createDocument(
            "e-Tattwadarshi 2018",
            `${tattwadarshiBase}/Tattwadarshi 2018.pdf`,
            "2018"
          ),
        ],
      },
    ],
  },
];

export const DOCUMENT_SECTIONS = DOCUMENT_CATEGORIES.flatMap((category) =>
  category.sections.map((section) => ({
    ...section,
    categoryId: category.id,
    categoryLabel: category.label,
    route: `/documents/${section.id}`,
  }))
);

export const getDocumentSection = (sectionKey) => {
  const resolvedKey = DOCUMENT_SECTION_ALIASES[sectionKey] || null;
  if (!resolvedKey || resolvedKey === "all") return null;
  return DOCUMENT_SECTIONS.find((section) => section.id === resolvedKey) || null;
};

export const getDocumentCategory = (categoryId) =>
  DOCUMENT_CATEGORIES.find((category) => category.id === categoryId) || null;
