const ADMIN_OFFICE_ROOT_ROUTE = "/facilities/admin-office";
const ADMIN_OFFICE_UPLOAD_ROOT = "/uploads/documents/admin-office";

function routeToAdminOfficePageId(route) {
  return `facilities-admin-office-${route
    .replace(`${ADMIN_OFFICE_ROOT_ROUTE}/`, "")
    .replace(/^\/+/, "")
    .replace(/\//g, "-")
    .toLowerCase()}`;
}

function buildSections({ summary, documentPath, links = [] }) {
  const sections = [
    {
      sectionId: "overview",
      title: "Overview",
      type: "markdown",
      order: 1,
      isVisible: true,
      content: {
        text:
          summary ||
          "This page is managed from the admin panel. Update this section using the markdown editor.",
      },
    },
  ];

  if (links.length) {
    sections.push({
      sectionId: "quick-links",
      title: "Quick Links",
      type: "component",
      order: 2,
      isVisible: true,
      content: {
        component: "link-list",
        items: links,
      },
    });
  }

  if (documentPath) {
    sections.push({
      sectionId: "document",
      title: "Official Document",
      type: "markdown",
      order: 3,
      isVisible: true,
      content: {
        text: `- [Download PDF](${documentPath})`,
      },
    });
  }

  return sections;
}

const topLevelPages = [
  {
    route: "/facilities/admin-office/services-college",
    pageTitle: "Services Offered by College",
    summary:
      "Administrative services offered by Shri Sant Gajanan Maharaj College of Engineering for students, alumni, and stakeholders.",
    documentPath: `${ADMIN_OFFICE_UPLOAD_ROOT}/Services offered by the College.pdf`,
  },
  {
    route: "/facilities/admin-office/services-university",
    pageTitle: "Services Offered by University",
    summary:
      "University services available through the administrative office for examination, migration, transcript, and allied academic workflows.",
    documentPath: `${ADMIN_OFFICE_UPLOAD_ROOT}/Services offered by the University.pdf`,
  },
  {
    route: "/facilities/admin-office/brochure",
    pageTitle: "Information Brochure",
    summary:
      "Institute information brochure containing key academic and institutional details for prospective students and stakeholders.",
    documentPath: `${ADMIN_OFFICE_UPLOAD_ROOT}/Final SSGMCE Brochure2023.pdf`,
  },
  {
    route: "/facilities/admin-office/fee-proposal",
    pageTitle: "Fee Proposal A.Y. 2026-27",
    summary:
      "Fee proposal submitted to the fee regulating authority for Academic Year 2026-27.",
    documentPath: `${ADMIN_OFFICE_UPLOAD_ROOT}/ONLINE PROPOSAL FOR APPROVAL OF FEES FOR A.Y. 2026-27.pdf`,
  },
];

const policies = [
  ["strategic-plan", "Strategic Plan & Deployment", "1_startegic_pan_and _deployment.pdf"],
  ["curriculum", "Curriculum Policy", "2_Curriculam Policy-updated.pdf"],
  ["innovation", "Innovation Practices", "3_Innovation Practices-updated.pdf"],
  ["student-centric", "Student-Centric Methods", "4_2.3.1 Student-centric.pdf"],
  ["examination", "Examination Policy", "5_Exam Policy-rev.pdf"],
  ["mentor", "Mentor Policy", "6_Mentor Policy.pdf"],
  ["slow-advanced-learner", "Slow & Advanced Learner Policy", "7_Slow -Advanced -Learner-Policy-website-.pdf"],
  ["iqac", "IQAC Policy", "8_IQAC Policy.pdf"],
  ["aaa", "AAA Policy", "9_AAA Policy.pdf"],
  ["budget", "Budget Policy", "10_Budget Policy.pdf"],
  ["anti-ragging", "Anti-Ragging Policy", "11_Anti_ragging _policy.pdf"],
  ["anti-sexual-harassment", "Anti-Sexual Harassment Policy", "12_Anti_sexual_harassment _policy.pdf"],
  ["gender-equity", "Gender Equity Policy", "13_Gender Equity Policy.pdf"],
  ["grievance-redressal", "Grievance Redressal Policy", "14_Grievance-Redressal_policy.pdf"],
  ["maintenance", "Maintenance Policy", "15_Maintenance Policy.pdf"],
  ["scholarship", "Scholarship Policy", "16_Scholarship Policy.pdf"],
  ["staff-welfare", "Staff Welfare Policy", "17_Staff Welfare Policy.pdf"],
  ["financial-assistance", "Financial Assistance Policy", "18_Financial Assistant Policy-SSJ.pdf"],
  ["performance-appraisal", "Performance Appraisal", "19_Performance appraisal.pdf"],
  ["ict", "ICT Policy", "20_ICT Policy.pdf"],
  ["green-campus", "Green Campus Policy", "21_Green_campus-policy-rev.pdf"],
  ["energy-conservation", "Energy Conservation", "22_Energy conservation.pdf"],
  ["environment", "Environment Policy", "23_Environment policy.pdf"],
  ["code-of-conduct", "Code of Conduct", "4 Code of Conduct.pdf"],
  ["rules-regulations", "Rules & Regulations", "Rules_Regulations.pdf"],
];

const mandatoryDisclosures = [
  ["2025-26", "Mandatory Disclosure 2025-26", "Mandatory Disclosure_2025-26.pdf"],
  ["2024-25", "Mandatory Disclosure 2024-25", "Mandatory Disclosure_2024-25.pdf"],
  ["2023-24", "Mandatory Disclosure 2023-24", "Revised Mandatory Disclosure_2023-24.pdf"],
  ["2022-23", "Mandatory Disclosure 2022-23", "Mandatory Disclosure_2022-23.pdf"],
  ["2021-22", "Mandatory Disclosure 2021-22", "Mandatory Disclosure_2021-22.pdf"],
];

const aicteApprovals = [
  ["eoa-three-year-2024-25", "EOA Three Year Approval 2024-25", "EOA Three Year Approval along with 2024-25 Approval.pdf"],
  ["eoa-2023-24", "EOA Report 2023-24", "EOA-Report-2023-24.PDF"],
  ["approvals-1992-2022", "AICTE Approvals 1992-2022-23", "AICTE APPROVALS 1992 TO 2022-23.pdf"],
  ["eoa-2010-2021", "EOA 2010-11 to 2021-22", "EOA_2010-11 to 2021-22.pdf"],
];

const financialStatements = [
  ["2024-25", "Balance Sheet 2024-25", "BALANCE SHEET 2024-25.pdf"],
  ["2023-24", "Balance Sheet 2023-24", "BALANCE SHEET 2023-24.pdf"],
  ["2022-23", "Financial Statement 2022-23", "College Financial Statement 2022-23.pdf"],
  ["2021-22", "Financial Statement 2021-22", "College Financial Statement 2021-22.pdf"],
  ["2020-21", "Financial Statement 2020-21", "College Financial Statement 2020-21.pdf"],
  ["2019-20", "Financial Statement 2019-20", "College Financial Statement 2019-20.pdf"],
  ["2018-19", "Financial Statement 2018-19", "College Financial Statement 2018-19.pdf"],
];

function mapDetailPages(baseRoute, entries, baseUploadPath) {
  return entries.map(([slug, pageTitle, fileName]) => ({
    route: `${ADMIN_OFFICE_ROOT_ROUTE}/${baseRoute}/${slug}`,
    pageTitle,
    summary: `${pageTitle} document and related references managed via admin markdown content.`,
    documentPath: `${ADMIN_OFFICE_UPLOAD_ROOT}/${baseUploadPath}/${fileName}`,
  }));
}

const policyDetailPages = mapDetailPages("policies", policies, "policies");
const mandatoryDisclosureDetailPages = mapDetailPages(
  "mandatory-disclosure",
  mandatoryDisclosures,
  "mandatory-disclosure",
);
const aicteApprovalDetailPages = mapDetailPages(
  "aicte-approvals",
  aicteApprovals,
  "aicte-approvals",
);
const financialStatementDetailPages = mapDetailPages(
  "financial-statements",
  financialStatements,
  "financial-statements",
);

const indexPages = [
  {
    route: "/facilities/admin-office/policies",
    pageTitle: "Policies & Procedures",
    summary: "Browse institutional policies and procedures.",
    links: policyDetailPages.map((page) => ({ title: page.pageTitle, route: page.route })),
  },
  {
    route: "/facilities/admin-office/mandatory-disclosure",
    pageTitle: "Mandatory Disclosure",
    summary: "AICTE mandatory disclosure documents year-wise.",
    links: mandatoryDisclosureDetailPages.map((page) => ({
      title: page.pageTitle,
      route: page.route,
    })),
  },
  {
    route: "/facilities/admin-office/aicte-approvals",
    pageTitle: "AICTE Approvals",
    summary: "AICTE approval and EOA reference documents.",
    links: aicteApprovalDetailPages.map((page) => ({ title: page.pageTitle, route: page.route })),
  },
  {
    route: "/facilities/admin-office/financial-statements",
    pageTitle: "Financial Statements",
    summary: "Financial statement and balance sheet documents year-wise.",
    links: financialStatementDetailPages.map((page) => ({
      title: page.pageTitle,
      route: page.route,
    })),
  },
];

const adminOfficePageEntries = [
  ...topLevelPages,
  ...indexPages,
  ...policyDetailPages,
  ...mandatoryDisclosureDetailPages,
  ...aicteApprovalDetailPages,
  ...financialStatementDetailPages,
];

const adminOfficePages = adminOfficePageEntries.map((entry, index) => ({
  pageId: routeToAdminOfficePageId(entry.route),
  pageTitle: entry.pageTitle,
  pageDescription: entry.pageTitle,
  route: entry.route,
  category: "facilities",
  parentMenu: "facilities",
  menuLabel: entry.pageTitle,
  menuOrder: 500 + index,
  showInMenu: false,
  template: "generic",
  isPublished: true,
  sections: buildSections(entry),
}));

module.exports = {
  adminOfficePages,
};
