/*
 * Generates Markdown-backed seed sections for the Research & Innovation pages
 * from the current client-side source data.
 *
 * Run with:
 *   node server/scripts/generateResearchMarkdownContent.js
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const RESEARCH_SOURCE_DIR = path.join(ROOT, "..", "client", "src", "pages", "research");
const OUTPUT_FILE = path.join(ROOT, "data", "researchMarkdownContent.js");

const normalizeText = (value) =>
  String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...")
    .replace(/â€“|â€”|â€‘/g, "-")
    .replace(/â€˜|â€™/g, "'")
    .replace(/â€œ|â€/g, '"')
    .replace(/â€¢/g, "-")
    .replace(/â€º/g, ">")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

const slugify = (value) =>
  normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const escapeTableCell = (value) =>
  normalizeText(value).replace(/\|/g, "\\|").replace(/\n/g, "<br />");

const markdownTable = (headers, rows) => {
  const head = `| ${headers.map(escapeTableCell).join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.map(escapeTableCell).join(" | ")} |`).join("\n");
  return [head, divider, body].filter(Boolean).join("\n");
};

const readSource = (fileName) =>
  fs.readFileSync(path.join(RESEARCH_SOURCE_DIR, fileName), "utf8");

const extractArrayLiteral = (fileName, constName) => {
  const source = readSource(fileName);
  const pattern = new RegExp(`const\\s+${constName}\\s*=\\s*(\\[[\\s\\S]*?\\]);`);
  const match = source.match(pattern);

  if (!match) {
    throw new Error(`Unable to find array "${constName}" in ${fileName}`);
  }

  return match[1].replace(/icon:\s*([A-Za-z0-9_]+)/g, "icon: '$1'");
};

const loadArray = (fileName, constName) =>
  vm.runInNewContext(extractArrayLiteral(fileName, constName), {});

const section = (sectionId, title, text, order) => ({
  sectionId,
  title,
  type: "markdown",
  order,
  isVisible: true,
  content: {
    text: normalizeText(text),
  },
});

const bulletList = (items) => items.map((item) => `- ${normalizeText(item)}`).join("\n");

const numberedEntries = (items, renderEntry) =>
  items.map((item, index) => `${index + 1}. ${renderEntry(item)}`).join("\n\n");

const yearlyLinks = (years, labelSuffix = "Report") =>
  years
    .map((entry) => `- [${normalizeText(entry.year)} ${labelSuffix}](${entry.pdfUrl})`)
    .join("\n");

const withDepartmentTab = (route, tab) => {
  const normalizedRoute = normalizeText(route);
  if (!normalizedRoute || !tab) return normalizedRoute;

  const separator = normalizedRoute.includes("?") ? "&" : "?";
  return `${normalizedRoute}${separator}tab=${encodeURIComponent(tab)}`;
};

const UG_PROJECTS_DEPARTMENT_TABS = {
  "/departments/cse": "ug-projects",
  "/departments/electrical": "projects",
  "/departments/entc": "projects",
  "/departments/it": "projects",
  "/departments/mechanical": "student-projects",
  "/departments/mba": "projects",
};

const withUgProjectsDepartmentTab = (route) =>
  withDepartmentTab(route, UG_PROJECTS_DEPARTMENT_TABS[normalizeText(route)] || "projects");

const NISP_DOCUMENT_URLS = {
  policy: "/documents/research/nisp/sgiarc-tbi-nisp.pdf",
  mhrdPolicy: "/documents/research/nisp/mhrd-nisp-policy.pdf",
  expertCommittee: "/documents/research/nisp/nisp-expert-committee.pdf",
  firstMeeting: "/documents/research/nisp/nisp-1st-meeting-policy.pdf",
  secondMeeting: "/documents/research/nisp/nisp-2nd-meeting-policy.pdf",
};

const publicationEntry = (publication) =>
  [
    `**${normalizeText(publication.year)} - ${normalizeText(publication.title)}**`,
    `   - Authors: ${normalizeText(publication.authors)}`,
    publication.journal
      ? `   - Journal / Venue: ${normalizeText(publication.journal)}`
      : null,
    publication.indexing
      ? `   - Indexing: ${normalizeText(publication.indexing)}`
      : null,
    publication.type ? `   - Type: ${normalizeText(publication.type)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

const iprPatentEntry = (record) =>
  [
    `**${normalizeText(record.year)} - ${normalizeText(record.title)}**`,
    `   - Inventor(s): ${normalizeText(record.inventor)}`,
    `   - Application No.: ${normalizeText(record.appNo)}`,
    `   - Status: ${normalizeText(record.status)}`,
  ].join("\n");

const copyrightEntry = (record) =>
  [
    `**${normalizeText(record.year)} - ${normalizeText(record.title)}**`,
    `   - Faculty: ${normalizeText(record.faculty)}`,
    `   - Status: ${normalizeText(record.status)}`,
  ].join("\n");

const scholarEntry = (record) =>
  [
    `**${normalizeText(record.scholar)}**`,
    `   - Supervisor: ${normalizeText(record.supervisor)}`,
    record.regNo ? `   - Registration No.: ${normalizeText(record.regNo)}` : null,
    record.date ? `   - W.e.f.: ${normalizeText(record.date)}` : null,
    `   - Research Topic: ${normalizeText(record.topic)}`,
    `   - Status: ${normalizeText(record.status)}`,
  ]
    .filter(Boolean)
    .join("\n");

const contactEntry = (record) =>
  [
    `- **${normalizeText(record.name)}** - ${normalizeText(record.role)}`,
    `  - Email: [${normalizeText(record.email)}](mailto:${record.email})`,
    `  - Phone: ${normalizeText(record.phone)}`,
  ].join("\n");

const policyDocuments = [
  {
    title: "Research & Development Policy",
    description:
      "Comprehensive R&D policy document of SSGMCE covering objectives, scope, guidelines, and framework for research activities.",
    url: "/documents/research/policy/rd-policy-ssgmce.pdf",
  },
  {
    title: "Research & Development Policy - Annexure",
    description:
      "Supporting annexures including project definition formats, evaluation criteria, phase-wise guidelines, and assessment forms.",
    url: "/documents/research/policy/rd-policy-annex.pdf",
  },
];

const annexureHighlights = [
  {
    title: "Annexure I - Interdisciplinary Project Definition",
    description:
      "Format for Interdisciplinary Projects Special Focus Group (IPRG) including project modules, work packages, deliverables, and task breakdown.",
  },
  {
    title: "Annexure II - Project Phases & Evaluation",
    description:
      "Detailed phase-wise project guidelines - Phase I (Project guide details, identification, proposed titles), Phase II (Patent search, literature review), Phase III (Work plan, budget, timeline), and evaluation rubrics.",
  },
  {
    title: "Prior Art & Patent Search",
    description:
      "Guidelines for conducting patent searches via IPINDIA.GOV.IN and USPTO.GOV.IN, along with literature review methodology for finalizing projects.",
  },
  {
    title: "Project Identification Process",
    description:
      "Systematic process covering emerging trends (IoT, Industry 4.0), commercial products, agriculture, medical sciences, and societal solutions with references to research institutes, incubation centers, and funding agencies.",
  },
  {
    title: "Resource & Infrastructure Planning",
    description:
      "Guidelines for resource capacity analysis, make/buy decisions, infrastructure identification, concept trials, industry-academia collaboration with IITs, NITs, and consultancy firms.",
  },
  {
    title: "Assessment & Deliverables",
    description:
      "Comprehensive evaluation framework including project milestones, deliverable tracking, faculty-student collaboration models, and project award/reward criteria.",
  },
];

const facilities = [
  {
    name: "Cadence Center",
    department: "Electronics & Telecommunication",
    description:
      "Cadence VLSI and Embedded System Design Centre equipped with industry-standard Cadence EDA tools for VLSI design, simulation, and verification. Supports research and training in semiconductor design and embedded systems.",
    reportUrl:
      "/documents/research/coe/cadence-vlsi-embedded-system-design-centre.pdf",
    image: "https://www.ssgmce.ac.in/images/blog/cadence-img.jpg",
  },
  {
    name: "Electric Vehicle Lab",
    department: "Electrical Engineering",
    description:
      "State-of-the-art Electric Vehicle Laboratory for research and development in EV technology, battery management systems, motor controllers, and sustainable transportation solutions.",
    reportUrl: "/documents/research/coe/electric-vehicle-lab-report.pdf",
    image: "https://www.ssgmce.ac.in/images/blog/EV-Lab-1.webp",
  },
  {
    name: "FAB Lab",
    department: "Mechanical Engineering",
    description:
      "Fabrication Laboratory (FAB Lab) providing hands-on access to modern fabrication tools including 3D printers, laser cutters, CNC machines, and prototyping equipment for innovation and product development.",
    reportUrl: "/documents/research/coe/fab-lab-annual-report-2023-24.pdf",
    image: "https://www.ssgmce.ac.in/images/blog/Fab-Lab.png",
  },
  {
    name: "Solar Production Center",
    department: "Electrical Engineering",
    description:
      "Center of Excellence in Solar Energy featuring solar panel production facility, sun simulators, battery assembly setup, solar product display gallery, and solar radiation measurement equipment for renewable energy research.",
    reportUrl: "/documents/research/coe/solar-center-report.pdf",
    image: "https://www.ssgmce.ac.in/images/blog/solar_production.webp",
  },
  {
    name: "PLC Automation Lab",
    department: "Electrical Engineering",
    description:
      "PLC and Factory Automation Laboratory equipped with programmable logic controllers, SCADA systems, and industrial automation hardware for training and research in Industry 4.0 technologies.",
    reportUrl:
      "https://www.ssgmce.ac.in/uploads/Report_Training%20Program%20Conducted_PLC%20and%20Factory%20Automation%20Lab%20(1).pdf",
    image: "https://www.ssgmce.ac.in/images/blog/PLC_Automation_lab.PNG",
  },
  {
    name: "SAP ERP Center",
    department: "MBA",
    description:
      "SAP ERP (Enterprise Resource Planning) Center providing hands-on experience with SAP modules for students. Covers business process management, supply chain, finance, and human resource management using SAP software.",
    reportUrl: "/documents/research/coe/sap-erp-center-overview.pdf",
    image: "https://www.ssgmce.ac.in/images/blog/sap_erp.jfif",
  },
  {
    name: "Dr. Georg H Endress Laboratory",
    department: "Electronics & Telecommunication",
    description:
      "Advanced instrumentation and process automation laboratory established in collaboration with Endress+Hauser. Equipped with cutting-edge measurement and control instruments for flow, level, pressure, and temperature measurement.",
    reportUrl:
      "/documents/research/coe/dr-georg-h-endress-laboratory-report.pdf",
    image: "https://www.ssgmce.ac.in/images/blog/Endress_Laboratory.PNG",
  },
  {
    name: "YOGI-DIGI AIML Laboratory",
    department: "Electronics & Telecommunication",
    description:
      "High-performance AI/ML research laboratory equipped with 5th Generation Intel Xeon Scalable Processors featuring a compute node (32 Cores, 64 Threads, 20 GT/s UPI, 2.1 GHz) and a master node (12 Cores, 24 Threads, 16 GT/s UPI, 2.40 GHz). Includes Smart Board and Jupyter Notebook Software for hands-on research and training in artificial intelligence and machine learning.\n\n- **Area:** 800 sq. ft.\n- **Systems:** 35 PCs\n- **Infrastructure:** High-Performance GPU Server | UPS: 25 KVA",
    image: "/uploads/images/EXTC_AIMLLAB.jpg",
  },
];

const createResearchMarkdownPages = () => {
  const rdcMembers = loadArray("RDCell.jsx", "rdcMembers");
  const publications = loadArray("Publications.jsx", "departmentData");
  const institutePatents = loadArray("IPR.jsx", "institutePatents");
  const iprDepartments = loadArray("IPR.jsx", "departmentData");
  const ugDepartments = loadArray("UGProjects.jsx", "departments");
  const enrollmentSummary = loadArray("PhdCentre.jsx", "enrollmentSummary");
  const phdDepartments = loadArray("PhdCentre.jsx", "departments");
  const collaborationDepartments = loadArray("Collaboration.jsx", "departments");
  const iicTeam = loadArray("IIC.jsx", "iicTeam");
  const iicActivities = loadArray("IIC.jsx", "iicActivities");
  const contactDetails = loadArray("IIC.jsx", "contactDetails");
  const howIICWorks = loadArray("IIC.jsx", "howIICWorks");
  const policyDocs = loadArray("NISP.jsx", "policyDocs");
  const meetings = loadArray("NISP.jsx", "meetings");
  const objectives = loadArray("NISP.jsx", "objectives");
  const trainingData = loadArray("Sabbatical.jsx", "trainingData");

  const totalPublications = publications.reduce(
    (sum, department) => sum + department.publications.length,
    0,
  );
  const indexedPublicationCount = publications.reduce(
    (sum, department) =>
      sum +
      department.publications.filter((publication) => {
        const indexing = normalizeText(publication.indexing).toLowerCase();
        return (
          indexing.includes("scopus") ||
          indexing.includes("sci") ||
          indexing.includes("ieee")
        );
      }).length,
    0,
  );
  const bookCount = publications.reduce(
    (sum, department) =>
      sum +
      department.publications.filter((publication) =>
        ["Book", "Book Chapter"].includes(publication.type),
      ).length,
    0,
  );
  const totalDeptPatents = iprDepartments.reduce(
    (sum, department) => sum + department.patents.length,
    0,
  );
  const totalCopyrights = iprDepartments.reduce(
    (sum, department) => sum + department.copyrights.length,
    0,
  );
  const grantedInstitutePatents = institutePatents.filter(
    (record) => normalizeText(record.status) === "Granted",
  ).length;
  const totalProjects = ugDepartments.reduce(
    (sum, department) =>
      sum +
      department.batches.reduce(
        (batchSum, batch) => batchSum + batch.projects.length,
        0,
      ),
    0,
  );
  const totalScholars = enrollmentSummary.reduce(
    (sum, item) => sum + item.registered,
    0,
  );
  const totalSeats = enrollmentSummary.reduce((sum, item) => sum + item.seats, 0);
  const totalMoUs = collaborationDepartments.reduce(
    (sum, department) => sum + department.mous.length,
    0,
  );
  const uniqueTrainingPartners = new Set(
    trainingData.map((item) => normalizeText(item.institution)),
  ).size;
  const trainingYears = trainingData
    .map((item) => normalizeText(item.duration).match(/(20\d{2})/g) || [])
    .flat()
    .map(Number)
    .sort((a, b) => a - b);
  const trainingPeriod =
    trainingYears.length > 0
      ? `${trainingYears[0]}-${trainingYears[trainingYears.length - 1]}`
      : "N/A";

  const researchMarkdownPages = {
    "research-rdc": [
      section(
        "rdc-overview",
        "Overview",
        `
SSGMCE's Research and Development Cell promotes innovation, facilitates grants from agencies such as AICTE and DST, and supports patent filing for faculty and students.

The R&D Cell nurtures a multidisciplinary research culture by encouraging faculty and students to pursue emerging research themes, publish in reputed journals, build socially relevant solutions, and collaborate with industry as well as research organizations.

## Objectives
- Promote innovation and research culture among faculty and students.
- Strengthen interaction and collaboration with industry and research organizations.
- Improve the quality of research publications and encourage patent filing.
- Facilitate sponsored projects and research grants from government and non-government agencies.
        `,
        1,
      ),
      section(
        "rdc-members",
        "RDC Members",
        `
${markdownTable(
  ["Sr. No.", "Name of Member", "Designation", "Role"],
  rdcMembers.map((member) => [
    member.srNo,
    member.name,
    member.designation,
    member.role,
  ]),
)}
        `,
        2,
      ),
    ],
    "research-policy": [
      section(
        "policy-overview",
        "Overview",
        `
Guidelines and ethical standards for conducting research at SSGMCE. The Research and Development Policy outlines the institute's commitment to fostering innovation, facilitating grants, and supporting faculty and students in their research endeavors.

The policy framework covers institutional support, project planning, interdisciplinary research, prior-art search, evaluation stages, resource planning, and assessment of outcomes.
        `,
        1,
      ),
      section(
        "policy-documents",
        "Policy Documents",
        `
${policyDocuments
  .map(
    (document) =>
      `- **${normalizeText(document.title)}**: ${normalizeText(document.description)} [View document](${document.url})`,
  )
  .join("\n")}
        `,
        2,
      ),
      section(
        "policy-annexure",
        "Annexure Highlights",
        `
${annexureHighlights
  .map(
    (item) =>
      `- **${normalizeText(item.title)}**: ${normalizeText(item.description)}`,
  )
  .join("\n")}
        `,
        3,
      ),
    ],
    "research-coe": [
      section(
        "coe-overview",
        "Overview",
        `
SSGMCE houses multiple Centers of Excellence and advanced research facilities dedicated to fostering innovation, hands-on learning, and industry-relevant research across engineering and management disciplines.

These facilities give students and faculty access to state-of-the-art infrastructure for prototyping, experimentation, automation, renewable energy research, enterprise systems, and applied instrumentation.
        `,
        1,
      ),
      section(
        "coe-facilities",
        "Centres and Facilities",
        `
${facilities
  .map(
    (facility) => `### ${normalizeText(facility.name)}

**Department:** ${normalizeText(facility.department)}

${normalizeText(facility.description)}

- [View Detailed Report](${facility.reportUrl})
- [Reference Image](${facility.image})
`,
  )
  .join("\n")}
        `,
        2,
      ),
    ],
    "research-publications": [
      section(
        "publications-overview",
        "Overview",
        `
SSGMCE research output spans **${publications.length} departments** with **${totalPublications} highlighted publications**, including **${indexedPublicationCount} Scopus / SCI / IEEE indexed outputs** and **${bookCount} books or book chapters**.

This page showcases highlighted publications. For yearly reports, use the department publication sections linked below.
        `,
        1,
      ),
      ...publications.map((department, index) =>
        section(
          slugify(`publications-${department.short}`),
          normalizeText(department.name),
          `
**Department Page:** [View ${normalizeText(
  department.shortName || department.short || department.name,
)} Department Publications](${withDepartmentTab(department.route, "publications")})

## Highlighted Publications
${numberedEntries(department.publications, publicationEntry)}
          `,
          index + 2,
        ),
      ),
    ],
    "research-ipr": [
      section(
        "ipr-overview",
        "Overview",
        `
SSGMCE's intellectual property portfolio includes **${institutePatents.length} institute-level patent records**, **${grantedInstitutePatents} granted institute patents**, and **${totalDeptPatents + totalCopyrights} department-level patents and copyrights** across **${iprDepartments.length} departments**.

Use the sections below for the institute patent portfolio, department-wise IPR details, and year-wise PDF reports.
        `,
        1,
      ),
      section(
        "institute-patents",
        "Institute Patents",
        `
${markdownTable(
  ["Sr.", "Title of Invention", "Application No.", "Filing Date", "Status"],
  institutePatents.map((record) => [
    record.sr,
    record.title,
    record.appNo,
    record.date,
    record.status,
  ]),
)}

        `,
        2,
      ),
      ...iprDepartments.map((department, index) => {
        const patentBlock = department.patents.length
          ? `## Patents\n${numberedEntries(department.patents, iprPatentEntry)}`
          : "## Patents\n- Patent details are available in the yearly PDF reports listed below.";
        const copyrightBlock = department.copyrights.length
          ? `## Copyrights\n${numberedEntries(
              department.copyrights,
              copyrightEntry,
            )}`
          : "## Copyrights\n- No specific copyright records are listed here. Refer to the yearly PDF reports below if required.";

        return section(
          slugify(`ipr-${department.short}`),
          normalizeText(department.name),
          `
## Yearly Reports
${yearlyLinks(department.years, "Patent / Publication Report")}

${patentBlock}

${copyrightBlock}
          `,
          index + 3,
        );
      }),
    ],
    "research-ug-projects": [
      section(
        "ug-projects-overview",
        "Overview",
        `
This section showcases innovative final-year undergraduate projects across **${ugDepartments.length} departments**, covering **3 academic years** and **${totalProjects} project titles** in total.

The projects reflect the application of engineering principles and emerging technologies to solve real-world problems in areas such as AI, IoT, healthcare, renewable energy, agriculture, automation, and manufacturing.
        `,
        1,
      ),
      ...ugDepartments.map((department, index) =>
        section(
          slugify(`ug-projects-${department.shortName}`),
          normalizeText(department.name),
          `
**Department Page:** [View ${normalizeText(department.shortName)} Department](${withUgProjectsDepartmentTab(department.route)})

${department.batches
  .map(
    (batch) => `## ${normalizeText(batch.year)}

${batch.projects
  .map((project, projectIndex) => `${projectIndex + 1}. ${normalizeText(project)}`)
  .join("\n")}`,
  )
  .join("\n\n")}
          `,
          index + 2,
        ),
      ),
    ],
    "research-phd": [
      section(
        "phd-overview",
        "Overview",
        `
Shri Sant Gajanan Maharaj College of Engineering, Shegaon is a recognized research centre affiliated with Sant Gadge Baba Amravati University (SGBAU). The institute facilitates Ph.D. programmes across engineering and management disciplines with experienced supervisors guiding scholars in advanced research areas.

- Departments with approved Ph.D. intake: **${enrollmentSummary.length}**
- Registered scholars: **${totalScholars}**
- Total seats: **${totalSeats}**
- Vacant seats: **${totalSeats - totalScholars}**
- [Download Detailed Ph.D. Enrollment PDF](/documents/research/phd/phd-enrollment-in-research-centres-updated-aug-24.pdf)
        `,
        1,
      ),
      section(
        "phd-enrollment-summary",
        "Enrollment Summary",
        `
${markdownTable(
  ["Sr.", "Department", "Total Seats", "Registered Scholars", "Vacancy"],
  enrollmentSummary.map((item, index) => [
    index + 1,
    item.dept,
    item.seats,
    item.registered,
    item.seats - item.registered,
  ]),
)}
        `,
        2,
      ),
      ...phdDepartments.map((department, index) =>
        section(
          slugify(`phd-${department.shortName}`),
          normalizeText(department.name),
          numberedEntries(department.scholars, scholarEntry),
          index + 3,
        ),
      ),
    ],
    "research-collaboration": [
      section(
        "collaboration-overview",
        "Overview",
        `
SSGMCE has established Memoranda of Understanding (MoUs) with industries, universities, and research organizations to strengthen academic excellence, joint research, skill development, internships, and placements.

- Departments represented: **${collaborationDepartments.length}**
- Total listed MoUs: **${totalMoUs}**
        `,
        1,
      ),
      ...collaborationDepartments.map((department, index) =>
        section(
          slugify(`collaboration-${department.shortName}`),
          normalizeText(department.name),
          `
**Department Page:** [View ${normalizeText(department.shortName)} Department](${withDepartmentTab(department.route, "mous")})

${numberedEntries(
  department.mous,
  (record) =>
    `**${normalizeText(record.org)}**\n   - Date: ${normalizeText(record.date)}`,
)}
          `,
          index + 2,
        ),
      ),
    ],
    "research-iic": [
      section(
        "iic-overview",
        "About IIC",
        `
Ministry of Education, Government of India established the Innovation Cell to systematically foster the culture of innovation in higher education institutions. The goal is to create an ecosystem that supports idea generation, pre-incubation, incubation, and the graduation of successful start-ups.

MoE's Innovation Cell works closely with higher education institutions to encourage the creative energy of students and faculty, helping them build new ideas, innovation projects, start-ups, and entrepreneurial ventures.

## Vision
To provide the needs of students as well as faculty entrepreneurs with innovative ideas of social relevance, thereby disseminating a culture of entrepreneurship in the college that contributes to national economic and social development.

## Mission
To build a system with the required infrastructure that enables students and faculty to innovate and prototype ideas with industrial standards, supported by government, industry, and reputed academic institutions.

## Objectives
${bulletList([
  "Students and faculty associated with IICs get opportunities to participate in innovation initiatives and competitions from institute level to international level.",
  "Win exciting prizes and certifications every year.",
  "Meet and interact with business leaders and leading academicians.",
  "Receive mentoring from industry professionals.",
  "Visit new places and experience new cultures.",
])}

## How IIC Works in SSGMCE
${howIICWorks
  .map(
    (item) => `### ${normalizeText(item.title)}
${bulletList(item.points)}`,
  )
  .join("\n\n")}
        `,
        1,
      ),
      section(
        "iic-team",
        "IIC Team",
        `
${markdownTable(
  ["S.No.", "Name of Member", "Member Type", "Key Role / Position"],
  iicTeam.map((member) => [
    member.srNo,
    member.name,
    member.type,
    member.role,
  ]),
)}
        `,
        2,
      ),
      section(
        "iic-activities",
        "IIC Activities",
        `
${iicActivities
  .map(
    (activity) =>
      `- **${normalizeText(activity.year)}**: [View activities report](${activity.url})`,
  )
  .join("\n")}
        `,
        3,
      ),
      section(
        "iic-contact",
        "Contact Us",
        `
${contactDetails.map(contactEntry).join("\n\n")}
        `,
        4,
      ),
    ],
    "research-nisp": [
      section(
        "nisp-overview",
        "Overview",
        `
In alignment with the Ministry of Education's National Innovation and Startup Policy, SSGMCE has established a framework to nurture creativity, innovation, and entrepreneurship through SGIARC-TBI (Technology Business Incubator).

The policy supports student and faculty-led start-ups, incubation, mentoring, innovation culture, and institutional alignment with the National Innovation and Startup Policy.

## Key Objectives
${objectives
  .map((objective) => `- ${normalizeText(objective.text)}`)
  .join("\n")}
        `,
        1,
      ),
      section(
        "nisp-documents",
        "Policy Documents",
        `
- **NISP Policy and Procedures**: SGIARC-TBI - Institute-level innovation & startup policy framework [View PDF](${NISP_DOCUMENT_URLS.policy})
- **MHRD NISP Policy**: Ministry of Education - National Innovation and Startup Policy document [View PDF](${NISP_DOCUMENT_URLS.mhrdPolicy})
- **NISP Expert Committee**: Composition and details of the NISP Expert Committee [View PDF](${NISP_DOCUMENT_URLS.expertCommittee})
        `,
        2,
      ),
      section(
        "nisp-meetings",
        "Meeting Minutes",
        `
- **1st NISP Meeting**: [View PDF](${NISP_DOCUMENT_URLS.firstMeeting})
- **2nd NISP Meeting**: [View PDF](${NISP_DOCUMENT_URLS.secondMeeting})
        `,
        3,
      ),
    ],
    "research-sabbatical": [
      section(
        "sabbatical-overview",
        "Overview",
        `
SSGMCE encourages faculty members to undertake sabbatical training at industries, research organizations, and academic institutions to strengthen teaching quality and bring current practice into the classroom.

- Faculty members listed: **${trainingData.length}**
- Partner organizations listed: **${uniqueTrainingPartners}**
- Active period covered: **${trainingPeriod}**
- [Download Signed Sabbatical Training Document](https://www.ssgmce.ac.in/uploads/pdf/Sabbatical-Training-Deatils_Signed.pdf)
        `,
        1,
      ),
      section(
        "sabbatical-training-details",
        "Training Details",
        `
${markdownTable(
  ["Sr.", "Faculty", "Institution", "Area", "Duration"],
  trainingData.map((record) => [
    record.sr,
    record.name,
    record.institution,
    record.area,
    record.duration,
  ]),
)}
        `,
        2,
      ),
    ],
  };

  return researchMarkdownPages;
};

const researchMarkdownPages = createResearchMarkdownPages();
const fileContents = `// Generated by server/scripts/generateResearchMarkdownContent.js
// Do not edit by hand unless you also update the generator.

const researchMarkdownPages = ${JSON.stringify(researchMarkdownPages, null, 2)};
const RESEARCH_MARKDOWN_PAGE_IDS = Object.freeze(Object.keys(researchMarkdownPages));

module.exports = {
  researchMarkdownPages,
  RESEARCH_MARKDOWN_PAGE_IDS,
};
`;

fs.writeFileSync(OUTPUT_FILE, fileContents, "utf8");
console.log(`Generated ${path.relative(process.cwd(), OUTPUT_FILE)}`);
