/**
 * updateAdmissionsContent.js
 *
 * Comprehensive update of all 13 admissions pages in MongoDB.
 * Fixes inconsistencies (seat matrix, fees, branch intakes) and enriches
 * thin pages with complete real data.
 *
 * Run: node server/scripts/updateAdmissionsContent.js
 */

require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("MONGODB_URI not set in .env");
  process.exit(1);
}

// ─── Canonical Branch Intake Data ────────────────────────────────────────────
// Source: DTE Maharashtra CAP data, SSGMCE College Code 1101
// Total B.E. Intake: 480 seats across 6 branches
// ─────────────────────────────────────────────────────────────────────────────

// ─── Section Content Definitions ─────────────────────────────────────────────

const admissionsData = {
  // ── 1. UG ADMISSIONS ────────────────────────────────────────────────────────
  "admissions-ug": {
    pageTitle: "Under-Graduate Program (B.E.)",
    sections: [
      {
        sectionId: "eligibility",
        title: "Eligibility Criteria (First Year B.E.)",
        type: "list",
        order: 1,
        isVisible: true,
        content: {
          items: [
            "Passed 12th (HSC) with Physics and Mathematics as compulsory subjects",
            "Third subject: Chemistry OR Biotechnology OR Biology OR Technical/Vocational subject",
            "Minimum 45% aggregate marks in PCM/PCB subjects taken together (40% for reserved categories)",
            "Minimum 50% aggregate for TFWS (Tuition Fee Waiver Scheme) candidates (45% for reserved)",
            "Valid MHT-CET or JEE Main scorecard — both accepted under Maharashtra State quota",
            "Domicile of Maharashtra required for Maharashtra State Quota seats",
            "Minimum age: 17 years as on date of admission (no upper age limit per AICTE norms)",
          ],
        },
      },
      {
        sectionId: "seat-matrix",
        title: "B.E. Seat Matrix 2025-26",
        type: "table",
        order: 2,
        isVisible: true,
        content: {
          headers: [
            "Branch",
            "Code",
            "Total Seats",
            "Open",
            "SC",
            "ST",
            "VJ/NT",
            "OBC",
            "EWS",
            "TFWS",
          ],
          rows: [
            [
              "Computer Science & Engineering",
              "CSE",
              "120",
              "60",
              "16",
              "9",
              "12",
              "36",
              "12",
              "12",
            ],
            [
              "Electronics & Telecommunication",
              "E&TC",
              "120",
              "60",
              "16",
              "9",
              "12",
              "36",
              "12",
              "12",
            ],
            [
              "Mechanical Engineering",
              "MECH",
              "60",
              "30",
              "8",
              "5",
              "6",
              "18",
              "6",
              "6",
            ],
            [
              "Electrical Engineering (E&P)",
              "ELEC",
              "60",
              "30",
              "8",
              "5",
              "6",
              "18",
              "6",
              "6",
            ],
            [
              "Information Technology",
              "IT",
              "60",
              "30",
              "8",
              "5",
              "6",
              "18",
              "6",
              "6",
            ],
            [
              "Civil Engineering",
              "CIVIL",
              "60",
              "30",
              "8",
              "5",
              "6",
              "18",
              "6",
              "6",
            ],
            ["**TOTAL**", "", "**480**", "", "", "", "", "", "", ""],
          ],
        },
      },
      {
        sectionId: "fee-structure",
        title: "B.E. Fee Structure 2025-26 (Annual)",
        type: "table",
        order: 3,
        isVisible: true,
        content: {
          headers: [
            "Category",
            "Tuition Fee",
            "Development Fee",
            "Total Annual Fee",
          ],
          rows: [
            ["Open / General", "₹1,16,521", "₹17,479", "₹1,34,000"],
            ["OBC / EBC / EWS / SEBC", "₹58,261", "₹17,479", "₹75,740"],
            ["VJ / NT / SBC / TFWS", "₹0", "₹17,479", "₹17,479"],
            ["SC / ST", "₹0", "₹0", "₹0 (covered by scholarship)"],
          ],
        },
      },
      {
        sectionId: "admission-process",
        title: "FE Admission Process (Step-by-Step)",
        type: "timeline",
        order: 4,
        isVisible: true,
        content: {
          events: [
            {
              year: "Step 1",
              title: "MHT-CET / JEE Main Exam",
              description:
                "Appear for MHT-CET (April–May) or JEE Main. Both scores are accepted for Maharashtra State quota.",
            },
            {
              year: "Step 2",
              title: "CAP Online Registration",
              description:
                "After result declaration, register on the DTE Maharashtra CAP portal at fe2025.mahacet.org (June).",
            },
            {
              year: "Step 3",
              title: "Fill Application Form",
              description:
                "Enter personal, academic, and category details. Upload required documents online.",
            },
            {
              year: "Step 4",
              title: "Document Verification",
              description:
                "Visit nearest Facilitation Center for physical verification of original documents (late June / July).",
            },
            {
              year: "Step 5",
              title: "CAP Round 1 Seat Allotment",
              description:
                "Merit-based seat allotment. Accept / freeze / float your seat on cetcell.mahacet.org and pay ₹1,000 acceptance fee.",
            },
            {
              year: "Step 6",
              title: "CAP Rounds 2 & 3",
              description:
                "Additional rounds for improvement or fresh allotment (July–August).",
            },
            {
              year: "Step 7",
              title: "Report to SSGMCE",
              description:
                "Submit all original documents at SSGMCE Admission Office within 2–3 days of allotment. Pay college fees to confirm admission.",
            },
          ],
        },
      },
      {
        sectionId: "important-links",
        title: "Important Links",
        type: "markdown",
        order: 5,
        isVisible: true,
        content: {
          text: `- **CAP Registration (FE):** [fe2025.mahacet.org](https://fe2025.mahacet.org)
- **DTE Maharashtra:** [dte.maharashtra.gov.in](https://dte.maharashtra.gov.in)
- **MHT-CET Official Site:** [mhtcet2025.mahacet.org](https://mhtcet2025.mahacet.org)
- **JEE Main Official:** [jeemain.nta.ac.in](https://jeemain.nta.ac.in)
- **Seat Acceptance (CET Cell):** [cetcell.mahacet.org](https://cetcell.mahacet.org)
- **SGBAU (University):** [sgbau.ac.in](https://sgbau.ac.in)
- **SSGMCE Admissions Helpline:** +91-7265-252289 | [admissions@ssgmce.ac.in](mailto:admissions@ssgmce.ac.in)`,
        },
      },
    ],
  },

  // ── 2. PG ADMISSIONS (M.E.) ─────────────────────────────────────────────────
  "admissions-pg": {
    pageTitle: "Post-Graduate Program (M.E.)",
    sections: [
      {
        sectionId: "pg-overview",
        title: "Post-Graduate Program (M.E.)",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `SSGMCE offers Post-Graduate (M.E.) programs admitted through the **DTE Maharashtra CAP process**. Admissions are based on **GATE score** or MHT-CET PG score as may be applicable.

**Important:** Seat acceptance fee of **₹1,000** is mandatory on [cetcell.mahacet.org](https://cetcell.mahacet.org) before reporting to the institute. Fee payment is accepted online only.

**Contact:** [pg@ssgmce.ac.in](mailto:pg@ssgmce.ac.in) | +91-7265-252274`,
        },
      },
      {
        sectionId: "pg-seat-matrix",
        title: "M.E. CAP Seat Matrix 2025-26",
        type: "table",
        order: 2,
        isVisible: true,
        content: {
          headers: [
            "SN",
            "Course",
            "Year Established",
            "Total Intake",
            "CAP Seats",
            "Choice Code",
          ],
          rows: [
            [
              "1",
              "M.E. Electrical Power System",
              "1996",
              "18",
              "18",
              "110129210",
            ],
            ["2", "M.E. Digital Electronics", "2000", "18", "18", "110134310"],
            ["3", "M.E. Computer Engineering", "2012", "18", "18", "110124510"],
            [
              "4",
              "M.E. Advanced Manufacturing & Mech. Systems Design",
              "2012",
              "18",
              "18",
              "110190710",
            ],
            ["**TOTAL M.E.**", "", "", "**72**", "**72**", ""],
          ],
        },
      },
      {
        sectionId: "pg-eligibility",
        title: "Eligibility",
        type: "markdown",
        order: 3,
        isVisible: true,
        content: {
          text: `| Program | Minimum Qualification | Score Required |
|---|---|---|
| M.E. Computer Engineering | B.E./B.Tech in CSE / IT / E&TC | GATE (CS/IT/EC) |
| M.E. Digital Electronics | B.E./B.Tech in E&TC / Electrical | GATE (EC/EE/IN) |
| M.E. Electrical Power System | B.E./B.Tech in Electrical Engg. | GATE (EE) |
| M.E. Advanced Manufacturing | B.E./B.Tech in Mechanical Engg. | GATE (ME/PE) |

**Minimum aggregate:** 50% in B.E./B.Tech (45% for reserved categories).  
GATE-qualified candidates are given preference; MHT-CET PG may be used as per DTE notification.`,
        },
      },
      {
        sectionId: "pg-fee",
        title: "M.E. Fee Structure (Annual)",
        type: "table",
        order: 4,
        isVisible: true,
        content: {
          headers: [
            "Category",
            "Tuition Fee",
            "Development Fee",
            "Total Annual Fee",
          ],
          rows: [
            [
              "Open / OBC / SBC / VJ / NT / EWS",
              "₹46,975",
              "₹5,025",
              "₹52,000",
            ],
            ["SC (CAP Scholarship)", "₹0", "₹0", "₹0 (covered by scholarship)"],
            ["ST (CAP Scholarship)", "₹0", "₹0", "₹0 (covered by scholarship)"],
          ],
        },
      },
      {
        sectionId: "pg-documents",
        title: "Documents Required",
        type: "markdown",
        order: 5,
        isVisible: true,
        content: {
          text: `Bring **originals + 2 sets of photocopies + 5 recent passport-size photographs**.

1. Seat Acceptance Form (with ₹1,000 fee paid to CET Cell)
2. Receipt from Scrutiny / Facilitation Center
3. GATE Score Card (valid, positive score)
4. Sponsorship: Proforma-P & Proforma-Q (for sponsored candidates if applicable)
5. SSC (10th) Marksheet & Certificate
6. HSC (12th) Marksheet & Certificate
7. All semester marksheets of B.E./B.Tech degree
8. B.E./B.Tech Degree Certificate / Provisional Certificate
9. Transfer Certificate / Leaving Certificate from last institution
10. Migration Certificate (for students from outside Maharashtra)
11. Nationality Certificate (CET format)
12. Domicile Certificate OR Birth Certificate (Maharashtra)
13. Caste Certificate + Caste Validity Certificate (if applicable)
14. Non-Creamy Layer Certificate (OBC/SBC — valid till March 31, 2026)
15. Aadhar Card (original + photocopy)`,
        },
      },
      {
        sectionId: "pg-notice",
        title: "Important Notice",
        type: "markdown",
        order: 6,
        isVisible: true,
        content: {
          text: `- Admissions are merit-based and fully transparent as per DTE Maharashtra norms.
- SSGMCE has **no authorized agents**. Beware of fraudulent agents.
- **No capitation fees** are charged under any circumstances.
- For admission queries: [admissions@ssgmce.ac.in](mailto:admissions@ssgmce.ac.in) | +91-7265-252289
- **CAP Registration (PG):** [cap25.mahacet.org](https://cap25.mahacet.org)
- Principal: **Dr. S. B. Somani**`,
        },
      },
    ],
  },

  // ── 3. DSE ADMISSIONS ───────────────────────────────────────────────────────
  "admissions-dse": {
    pageTitle: "Direct Second Year Engineering (DSE)",
    sections: [
      {
        sectionId: "dse-overview",
        title: "DSE / Lateral Entry Admission",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `**Direct Second Year Engineering (DSE)** admissions are for Diploma holders seeking admission directly to the **Second Year (Third Semester)** of B.E. programs. Admissions are conducted through the **DTE Maharashtra CAP process**.

- **Intake:** 15% of sanctioned UG intake per branch (over and above regular FE seats)
- **Eligibility Exam:** DSE CAP through DTE Maharashtra — no entrance exam; merit-based on diploma percentage
- **Important:** Seat acceptance fee of **₹1,000** is mandatory on [cetcell.mahacet.org](https://cetcell.mahacet.org). Fee payment is online only.`,
        },
      },
      {
        sectionId: "dse-seat-matrix",
        title: "DSE Seat Matrix 2025-26",
        type: "table",
        order: 2,
        isVisible: true,
        content: {
          headers: [
            "Branch",
            "UG Intake",
            "DSE Seats (15%)",
            "CAP Seats",
            "Choice Code",
          ],
          rows: [
            [
              "Computer Science & Engineering (CSE)",
              "120",
              "18",
              "18",
              "1101211010",
            ],
            [
              "Electronics & Telecommunication (E&TC)",
              "120",
              "18",
              "18",
              "1101211410",
            ],
            ["Mechanical Engineering", "60", "9", "9", "1101211710"],
            ["Electrical Engineering (E&P)", "60", "9", "9", "1101211210"],
            ["Information Technology (IT)", "60", "9", "9", "1101215210"],
            ["Civil Engineering", "60", "9", "9", "1101211310"],
            ["**TOTAL DSE**", "**480**", "**72**", "**72**", ""],
          ],
        },
      },
      {
        sectionId: "dse-eligibility",
        title: "Eligibility",
        type: "list",
        order: 3,
        isVisible: true,
        content: {
          items: [
            "Passed 3-year Diploma in Engineering from a recognized Polytechnic (Maharashtra State Board or equivalent)",
            "Minimum 45% aggregate in the Diploma (40% for reserved categories)",
            "Domicile of Maharashtra preferred (State quota seats); Out-of-state candidates can apply to Institute-level seats",
            "Diploma must be in a relevant branch as per DTE branching norms",
            "Age: 17 years minimum; no upper age limit",
          ],
        },
      },
      {
        sectionId: "dse-documents",
        title: "Documents Required",
        type: "markdown",
        order: 4,
        isVisible: true,
        content: {
          text: `Bring **originals + 2 sets of photocopies + 5 recent passport-size photographs**.

1. Seat Acceptance Form (with ₹1,000 fee paid to CET Cell)
2. Receipt from Scrutiny / Facilitation Center
3. All Diploma semester marksheets (especially final — 5th/6th semester)
4. Diploma Certificate / Provisional Certificate
5. Transfer Certificate / Leaving Certificate from last institution
6. SSC (10th) Marksheet & Certificate
7. Nationality Certificate (CET format)
8. Domicile Certificate OR Birth Certificate (Maharashtra)
9. Caste Certificate + Non-Creamy Layer Certificate (if applicable; NCL valid till March 31, 2026)
10. EWS Certificate + Income Certificate (if applicable)
11. TFWS Declaration (if applicable)
12. Aadhar Card (original + photocopy)`,
        },
      },
      {
        sectionId: "dse-notice",
        title: "Important Notice",
        type: "markdown",
        order: 5,
        isVisible: true,
        content: {
          text: `- Admissions are merit-based and transparent per DTE Maharashtra norms.
- SSGMCE has **no authorized admission agents**. Beware of fraudsters.
- **No capitation fees** are charged under any circumstances.
- **CAP Registration (DSE):** [dse25.mahacet.org](https://dse25.mahacet.org)
- Contact: [admissions@ssgmce.ac.in](mailto:admissions@ssgmce.ac.in) | +91-7265-252289
- Principal: **Dr. S. B. Somani**`,
        },
      },
    ],
  },

  // ── 4. MBA ADMISSIONS ────────────────────────────────────────────────────────
  "admissions-mba": {
    pageTitle: "MBA Program",
    sections: [
      {
        sectionId: "mba-overview",
        title: "MBA Program",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `SSGMCE offers a **2-year MBA program** (Master of Business Administration) with specializations available in **Marketing, Finance, Human Resources, and Operations Management**. The program is approved by AICTE and affiliated to Sant Gadge Baba Amravati University (SGBAU).

Admissions are conducted through the **DTE Maharashtra CAP process** based on MHT-CET (MBA) / MAT / CMAT / GMAT / CAT scores.

**Important:** Seat acceptance fee of **₹1,000** is mandatory on [cetcell.mahacet.org](https://cetcell.mahacet.org) before reporting. Fee payment is online only.`,
        },
      },
      {
        sectionId: "mba-eligibility",
        title: "Eligibility",
        type: "list",
        order: 2,
        isVisible: true,
        content: {
          items: [
            "Bachelor's degree in any discipline from a recognized university with minimum 50% aggregate (45% for reserved categories)",
            "Valid MHT-CET (MBA) score — appearing candidates can also apply",
            "MAT / CMAT / CAT / ATMA scores also accepted as per DTE notification",
            "Domicile of Maharashtra preferred for State quota seats",
            "Minimum age: 20 years; no upper age limit",
          ],
        },
      },
      {
        sectionId: "mba-seat-matrix",
        title: "MBA CAP Seat Matrix 2025-26",
        type: "table",
        order: 3,
        isVisible: true,
        content: {
          headers: [
            "Course",
            "Total Intake",
            "CAP Seats",
            "Open",
            "OBC",
            "SC",
            "ST",
            "VJ/NT",
            "EWS",
            "Choice Code",
          ],
          rows: [
            ["MBA", "60", "60", "30", "11", "8", "5", "6", "6", "110110110"],
          ],
        },
      },
      {
        sectionId: "mba-fee",
        title: "MBA Fee Structure (Annual)",
        type: "table",
        order: 4,
        isVisible: true,
        content: {
          headers: [
            "Category",
            "Tuition Fee",
            "Development Fee",
            "Total Annual Fee",
          ],
          rows: [
            ["Open / General", "₹89,525", "₹10,475", "₹1,00,000"],
            ["OBC / EBC / EWS / SEBC", "₹44,763", "₹10,475", "₹55,238"],
            ["VJ / NT / SBC / TFWS", "₹0", "₹10,475", "₹10,475"],
            ["SC / ST", "₹0", "₹0", "₹0 (covered by scholarship)"],
          ],
        },
      },
      {
        sectionId: "mba-specializations",
        title: "Specializations",
        type: "markdown",
        order: 5,
        isVisible: true,
        content: {
          text: `| Specialization | Career Pathways |
|---|---|
| Marketing Management | Brand Manager, Sales Executive, Digital Marketer, Market Research Analyst |
| Financial Management | Financial Analyst, Investment Banker, CFO, Auditor |
| Human Resource Management | HR Manager, Talent Acquisition Specialist, L&D Manager |
| Operations Management | Supply Chain Manager, Production Manager, Quality Analyst |

> Students typically choose one primary specialization and one elective from another specialization during their 3rd and 4th semesters.`,
        },
      },
      {
        sectionId: "mba-documents",
        title: "Documents Required",
        type: "markdown",
        order: 6,
        isVisible: true,
        content: {
          text: `Bring **originals + 2 sets of photocopies + 5 recent passport-size photographs**.

1. Seat Acceptance Form (with ₹1,000 fee paid to CET Cell)
2. Receipt from Facilitation / Scrutiny Center
3. MHT-CET (MBA) / MAT / CMAT / CAT scorecard
4. SSC (10th) Marksheet & Certificate
5. HSC (12th) Marksheet & Certificate
6. All semester marksheets of Bachelor's degree
7. Bachelor's Degree Certificate / Provisional Certificate
8. Transfer Certificate / Leaving Certificate
9. Migration Certificate (for students from outside Maharashtra)
10. Nationality Certificate (CET format)
11. Domicile Certificate OR Birth Certificate (Maharashtra)
12. Caste Certificate + Non-Creamy Layer Certificate (if applicable)
13. EWS Certificate (if applicable)
14. Aadhar Card (original + photocopy)`,
        },
      },
      {
        sectionId: "mba-notice",
        title: "Important Notice",
        type: "markdown",
        order: 7,
        isVisible: true,
        content: {
          text: `- Admissions are merit-based and transparent per DTE Maharashtra norms.
- SSGMCE has **no authorized agents**. Beware of fraudulent agents.
- **No capitation fees** are charged under any circumstances.
- **CAP Registration (MBA):** [mba25.mahacet.org](https://mba25.mahacet.org)
- Contact: [admissions@ssgmce.ac.in](mailto:admissions@ssgmce.ac.in) | +91-7265-252289
- Principal: **Dr. S. B. Somani**`,
        },
      },
    ],
  },

  // ── 5. INSTITUTE BROCHURE ────────────────────────────────────────────────────
  "admissions-brochure": {
    pageTitle: "Institute Brochure",
    sections: [
      {
        sectionId: "brochure-download",
        title: "Download Institute Brochure",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `**Shri Sant Gajanan Maharaj College of Engineering (SSGMCE), Shegaon** was established in **1983** by Shri Gajanan Shikshan Sanstha, Shegaon. Affiliated to **Sant Gadge Baba Amravati University (SGBAU)** and approved by **AICTE**, the institute has been at the forefront of engineering education for over 40 years.

> 📥 **[Download Brochure (PDF)](https://www.ssgmce.ac.in/uploads/documents/SSGMCE-Brochure.pdf)**

**Accreditations & Rankings:**
- **NAAC Accreditation:** 'A+' Grade (CGPA: 3.26)
- **NBA Accreditation:** CSE, IT, E&TC, Mechanical (4 UG programs)
- Affiliated to Sant Gadge Baba Amravati University (SGBAU)
- AICTE Approved

**At a Glance:**
- Founded: 1983 | Campus: 40+ acres, Shegaon, Dist. Buldhana, Maharashtra
- UG Programs: 6 branches | PG Programs: 4 M.E. specializations + MBA
- Students: ~2,500 | Faculty: 150+
- Hostel: Separate Boys & Girls hostels
- Placements: 85%+ placement record`,
        },
      },
      {
        sectionId: "programs",
        title: "Programs Offered",
        type: "markdown",
        order: 2,
        isVisible: true,
        content: {
          text: `### Undergraduate Programs (B.E. — 4 Years)

| Branch | Code | Intake | Accreditation |
|---|---|---|---|
| Computer Science & Engineering | CSE | 120 | NBA |
| Electronics & Telecommunication | E&TC | 120 | NBA |
| Mechanical Engineering | MECH | 60 | NBA |
| Electrical Engineering (E&P) | ELEC | 60 | AICTE |
| Information Technology | IT | 60 | NBA |
| Civil Engineering | CIVIL | 60 | AICTE |
| **Total B.E. Intake** | | **480** | |

### Postgraduate Programs (M.E. — 2 Years)

| Specialization | Code | Intake |
|---|---|---|
| M.E. Computer Engineering | MCE | 18 |
| M.E. Digital Electronics | MDE | 18 |
| M.E. Electrical Power System | MEPS | 18 |
| M.E. Advanced Manufacturing & Mech. Systems Design | MAMSD | 18 |
| **Total M.E. Intake** | | **72** |

### MBA Program (2 Years)

| Program | Intake |
|---|---|
| MBA (Marketing / Finance / HR / Operations) | 60 |

### Doctoral Program (Ph.D.)

SSGMCE is a recognized Ph.D. Research Centre under SGBAU. Research areas span all engineering disciplines.`,
        },
      },
      {
        sectionId: "infrastructure",
        title: "Infrastructure & Facilities",
        type: "markdown",
        order: 3,
        isVisible: true,
        content: {
          text: `- **Laboratories:** 30+ state-of-the-art labs including IoT, AI/ML, advanced computing, VLSI, CNC, and more
- **Library:** 50,000+ books, e-journals, NPTEL digital library, Coursera access, 24-hour reading room
- **Hostels:** Separate fully-equipped boys' and girls' hostels — Wi-Fi, 24/7 security, mess, gym
- **Classrooms:** AV-enabled smart classrooms, seminar halls, and a 500+ capacity auditorium
- **Sports:** Indoor (TT, Chess, Carrom, Badminton) and outdoor (Cricket, Football, Basketball, Volleyball) courts; NCC, NSS units
- **Medical:** 24×7 first-aid room with qualified nurse; tie-up with local hospitals
- **Research:** R&D Cell, Innovation & Incubation Cell, IIC, Centre of Excellence (CoE)
- **Canteen & ATM:** On-campus canteen and ATM facility
- **Transport:** Bus facility available for local commute`,
        },
      },
      {
        sectionId: "placements",
        title: "Placements 2024-25",
        type: "markdown",
        order: 4,
        isVisible: true,
        content: {
          text: `**Placement Rate:** 85%+ | **Highest Package:** 12 LPA | **Average Package:** 3.5–4.5 LPA

**Top Recruiters (Recent Years):**
TCS · Infosys · Wipro · Tech Mahindra · L&T · Cognizant · Capgemini · Persistent · Accenture · HCL · IBM · Amazon · Reliance Industries · KPIT · Zensar Technologies · LTIMindtree · Bajaj Electricals · Kirloskar · Tata Motors · Mahindra & Mahindra

**Training & Placement Cell:** The T&P Cell actively works with 100+ corporates and organizes:
- Aptitude training, mock GDs, and mock interviews
- Industry visits and internship programs
- Career guidance and soft-skills workshops

> 📄 [View Placement Brochure →](/placements/brochure)`,
        },
      },
      {
        sectionId: "contact-brochure",
        title: "Contact & Location",
        type: "markdown",
        order: 5,
        isVisible: true,
        content: {
          text: `**Address:** Shegaon-Buldhana Road, Shegaon – 444203, Dist. Buldhana, Maharashtra, India

**Phone:** +91-7265-252274 | +91-7265-252279 | +91-7265-252289 (Admissions)

**Email:** [principal@ssgmce.ac.in](mailto:principal@ssgmce.ac.in) | [admissions@ssgmce.ac.in](mailto:admissions@ssgmce.ac.in)

**Website:** [www.ssgmce.ac.in](https://www.ssgmce.ac.in)

**How to Reach:**
- **By Train:** Shegaon Railway Station (on the Mumbai–Nagpur route) — approx. 15 km from campus
- **By Road:** National Highway NH-44 passes near Shegaon
- **By Air:** Nearest airport — Akola Airport (~80 km) or Nagpur (Dr. Babasaheb Ambedkar International Airport, ~190 km)

📍 [View on Google Maps](https://maps.google.com/?q=Shri+Sant+Gajanan+Maharaj+College+of+Engineering+Shegaon)`,
        },
      },
    ],
  },

  // ── 6. FEE STRUCTURE ────────────────────────────────────────────────────────
  "admissions-fees": {
    pageTitle: "Fee Structure",
    sections: [
      {
        sectionId: "be-fees",
        title: "First Year B.E. Fee Structure 2025-26 (Annual)",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `| Fee Component | Open / General | OBC / EBC / EWS / SEBC | VJ / NT / SBC / TFWS | SC / ST |
|---|---|---|---|---|
| Tuition Fee | ₹1,16,521 | ₹58,261 | ₹0 | ₹0 |
| Development Fee | ₹17,479 | ₹17,479 | ₹17,479 | ₹0 |
| **Total Annual Fee** | **₹1,34,000** | **₹75,740** | **₹17,479** | **₹0** |

> The same fee structure applies to **Direct Second Year (DSE / Lateral Entry)** students.

**Fee approved by:** Shikshan Shulka Samiti (Fee Regulatory Authority), Maharashtra.`,
        },
      },
      {
        sectionId: "mba-fees",
        title: "First Year MBA Fee Structure 2025-26 (Annual)",
        type: "markdown",
        order: 2,
        isVisible: true,
        content: {
          text: `| Fee Component | Open / General | OBC / EBC / EWS | VJ / NT / SBC / TFWS | SC / ST |
|---|---|---|---|---|
| Tuition Fee | ₹89,525 | ₹44,763 | ₹0 | ₹0 |
| Development Fee | ₹10,475 | ₹10,475 | ₹10,475 | ₹0 |
| **Total Annual Fee** | **₹1,00,000** | **₹55,238** | **₹10,475** | **₹0** |`,
        },
      },
      {
        sectionId: "me-fees",
        title: "First Year M.E. (PG) Fee Structure 2025-26 (Annual)",
        type: "markdown",
        order: 3,
        isVisible: true,
        content: {
          text: `| Fee Component | Open / OBC / SBC / VJ / NT / EWS | SC (CAP Scholarship) | ST (CAP Scholarship) |
|---|---|---|---|
| Tuition Fee | ₹46,975 | ₹0 | ₹0 |
| Development Fee | ₹5,025 | ₹0 | ₹0 |
| **Total Annual Fee** | **₹52,000** | **₹0** | **₹0** |`,
        },
      },
      {
        sectionId: "hostel-fees",
        title: "Hostel Fee Structure (Approximate, Per Year)",
        type: "table",
        order: 4,
        isVisible: true,
        content: {
          headers: ["Facility", "Boys Hostel", "Girls Hostel"],
          rows: [
            [
              "Room (Dormitory / Shared)",
              "₹18,000 – ₹22,000",
              "₹18,000 – ₹22,000",
            ],
            [
              "Room (Double Occupancy)",
              "₹25,000 – ₹30,000",
              "₹25,000 – ₹30,000",
            ],
            ["Mess Charges (Annual)", "₹28,000 – ₹35,000", "₹28,000 – ₹35,000"],
            ["Security Deposit (Refundable)", "₹5,000", "₹5,000"],
          ],
        },
      },
      {
        sectionId: "fees-notes",
        title: "Important Information",
        type: "markdown",
        order: 5,
        isVisible: true,
        content: {
          text: `- **Payment Modes:** Online bank transfer, Demand Draft, or cash at the college cashier counter
- **Scholarship Categories:** SC/ST/VJ/NT/OBC students may avail Government scholarship schemes — see the [Scholarships page](/admissions/scholarships)
- **TFWS Scheme:** Tuition Fee Waiver Scheme for Open category students with family income below ₹8 lakhs
- **Refund Policy:** Fees are generally non-refundable after the DTE-specified cut-off date, with exceptions as per government rules
- **Fee Revision:** Fees are subject to revision by the Shikshan Shulka Samiti / DTE Maharashtra / AICTE
- **Hostel Fees:** Charged separately; vary by room type and are subject to revision
- For fee payment queries: Contact the **Accounts Office** at +91-7265-252274 (Ext. 206)`,
        },
      },
    ],
  },

  // ── 7. ADMISSION PROCESS ─────────────────────────────────────────────────────
  "admissions-process": {
    pageTitle: "Admission Process",
    sections: [
      {
        sectionId: "process-overview",
        title: "Admission Overview",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `B.E. admissions at SSGMCE are conducted through the **Centralized Admission Process (CAP)** by DTE Maharashtra. The process is fully merit-based, transparent, and online.

| Detail | Information |
|---|---|
| Admission Year | 2025-26 |
| Total B.E. Seats | 480 (across 6 branches) |
| Total M.E. Seats | 72 (across 4 specializations) |
| Total MBA Seats | 60 |
| Total DSE Seats | 72 (lateral entry) |
| Governing Body | DTE Maharashtra (Directorate of Technical Education) |
| Process | CAP — fully online, merit-based |
| Helpline | +91-7265-252289 |
| Email | [admissions@ssgmce.ac.in](mailto:admissions@ssgmce.ac.in) |`,
        },
      },
      {
        sectionId: "process-timeline",
        title: "Admission Timeline (B.E. First Year)",
        type: "timeline",
        order: 2,
        isVisible: true,
        content: {
          events: [
            {
              year: "April–May",
              title: "MHT-CET / JEE Main Exam",
              description:
                "Appear for MHT-CET (Maharashtra) or JEE Main (National). Both scores are accepted for B.E. admissions under Maharashtra State quota.",
            },
            {
              year: "June",
              title: "CAP Online Registration",
              description:
                "Register on the DTE Maharashtra CAP portal (fe2025.mahacet.org) after result declaration. All candidates must register within the prescribed dates.",
            },
            {
              year: "June",
              title: "Fill Application Form",
              description:
                "Enter personal, academic, and category details on the CAP portal. Upload scanned copies of all required documents.",
            },
            {
              year: "Late June",
              title: "Document Verification",
              description:
                "Visit the nearest designated Facilitation Center for physical verification of original documents. Receive the verification receipt.",
            },
            {
              year: "July",
              title: "Round 1 Seat Allotment",
              description:
                "Seats allotted based on merit and preferences. Accept, freeze, or float your seat on cetcell.mahacet.org. Pay ₹1,000 seat acceptance fee (online only).",
            },
            {
              year: "July–August",
              title: "CAP Rounds 2 & 3",
              description:
                "Additional rounds for students who want to try for a better college/branch or for newly vacated seats. Floating seat holders are reconsidered.",
            },
            {
              year: "August",
              title: "Institute-Level Rounds (ARC)",
              description:
                "Vacant seats after CAP rounds are filled at institute level (Admission Reporting Centre). Check the DTE website for schedule.",
            },
            {
              year: "August–September",
              title: "Report to SSGMCE",
              description:
                "Submit all original documents at the Admission Office within 2–3 days of allotment. Pay college fees (online/DD/cash) to confirm your seat.",
            },
          ],
        },
      },
      {
        sectionId: "eligibility",
        title: "Eligibility Criteria (B.E. First Year)",
        type: "markdown",
        order: 3,
        isVisible: true,
        content: {
          text: `### Academic Criteria

- Passed 12th (HSC) with **Physics** and **Mathematics** as compulsory subjects
- Third subject: Chemistry OR Biotechnology OR Biology OR Technical/Vocational subject
- Minimum **45% aggregate** in PCM/PCB (40% for reserved categories)
- Minimum **50% aggregate** for TFWS candidates (45% for reserved categories)
- Valid **MHT-CET or JEE Main** scorecard

### General Criteria

- Indian national
- Domicile of Maharashtra required for **Maharashtra State Quota** seats
- Minimum age: **17 years** as on the date of admission
- No upper age limit (as per AICTE norms)`,
        },
      },
      {
        sectionId: "important-links",
        title: "Important Links",
        type: "markdown",
        order: 4,
        isVisible: true,
        content: {
          text: `| Portal | URL |
|---|---|
| CAP Registration (FE B.E.) | [fe2025.mahacet.org](https://fe2025.mahacet.org) |
| CAP Registration (DSE) | [dse25.mahacet.org](https://dse25.mahacet.org) |
| CAP Registration (PG M.E.) | [cap25.mahacet.org](https://cap25.mahacet.org) |
| CAP Registration (MBA) | [mba25.mahacet.org](https://mba25.mahacet.org) |
| Seat Acceptance Payment | [cetcell.mahacet.org](https://cetcell.mahacet.org) |
| DTE Maharashtra | [dte.maharashtra.gov.in](https://dte.maharashtra.gov.in) |
| MHT-CET Official | [mhtcet2025.mahacet.org](https://mhtcet2025.mahacet.org) |
| JEE Main Official | [jeemain.nta.ac.in](https://jeemain.nta.ac.in) |
| SGBAU University | [sgbau.ac.in](https://sgbau.ac.in) |`,
        },
      },
      {
        sectionId: "important-notes",
        title: "Important Notes",
        type: "markdown",
        order: 5,
        isVisible: true,
        content: {
          text: `- Original documents must be submitted within **2–3 days** of seat allotment notification. Late submission results in cancellation.
- Seat acceptance fee of **₹1,000** is non-refundable.
- Students who do not report within the stipulated time **forfeit their allocated seat**.
- SSGMCE does **not** have any authorized admission agents. Beware of fraudsters.
- **No capitation fees** are charged under any circumstances.
- For any queries, contact the Admission Office at +91-7265-252289 or [admissions@ssgmce.ac.in](mailto:admissions@ssgmce.ac.in).`,
        },
      },
    ],
  },

  // ── 8. SEAT MATRIX ─────────────────────────────────────────────────────────
  "admissions-seat-matrix": {
    pageTitle: "Seat Matrix",
    sections: [
      {
        sectionId: "be-seat-matrix",
        title: "B.E. Seat Matrix 2024-25",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `| Branch | Total | OPEN | SC | ST | VJ/NT | OBC | EWS | TFWS |
|---|---|---|---|---|---|---|---|---|
| Computer Science & Engineering (CSE) | 120 | 60 | 16 | 9 | 12 | 36 | 12 | 12 |
| Electronics & Telecommunication (E&TC) | 120 | 60 | 16 | 9 | 12 | 36 | 12 | 12 |
| Mechanical Engineering | 60 | 30 | 8 | 5 | 6 | 18 | 6 | 6 |
| Electrical Engineering (E&P) | 60 | 30 | 8 | 5 | 6 | 18 | 6 | 6 |
| Information Technology (IT) | 60 | 30 | 8 | 5 | 6 | 18 | 6 | 6 |
| Civil Engineering | 60 | 30 | 8 | 5 | 6 | 18 | 6 | 6 |
| **TOTAL B.E.** | **480** | | | | | | | |

> **College Code:** 1101 | As per DTE Maharashtra CAP 2024-25 notification.  
> Category seats are reserved from within the total and are not additional.`,
        },
      },
      {
        sectionId: "me-seat-matrix",
        title: "M.E. (PG) Seat Matrix 2024-25",
        type: "markdown",
        order: 2,
        isVisible: true,
        content: {
          text: `| SN | Course | Established | Total Intake | CAP Seats | Choice Code |
|---|---|---|---|---|---|
| 1 | M.E. Electrical Power System | 1996 | 18 | 18 | 110129210 |
| 2 | M.E. Digital Electronics | 2000 | 18 | 18 | 110134310 |
| 3 | M.E. Computer Engineering | 2012 | 18 | 18 | 110124510 |
| 4 | M.E. Advanced Manufacturing & Mech. Systems Design | 2012 | 18 | 18 | 110190710 |
| 5 | MBA | 1994 | 60 | 60 | 110110110 |
| **TOTAL PG** | | | **132** | **132** | |`,
        },
      },
      {
        sectionId: "dse-seat-matrix",
        title: "DSE (Lateral Entry) Seat Matrix 2024-25",
        type: "markdown",
        order: 3,
        isVisible: true,
        content: {
          text: `*DSE seats are 15% of approved B.E. intake (over and above regular seats).*

| Branch | B.E. Intake | DSE Seats |
|---|---|---|
| Computer Science & Engineering (CSE) | 120 | 18 |
| Electronics & Telecommunication (E&TC) | 120 | 18 |
| Mechanical Engineering | 60 | 9 |
| Electrical Engineering (E&P) | 60 | 9 |
| Information Technology (IT) | 60 | 9 |
| Civil Engineering | 60 | 9 |
| **TOTAL DSE** | **480** | **72** |`,
        },
      },
      {
        sectionId: "category-abbr",
        title: "Category Abbreviations",
        type: "markdown",
        order: 4,
        isVisible: true,
        content: {
          text: `| Abbreviation | Full Form |
|---|---|
| OPEN | General Merit (all categories) |
| SC | Scheduled Caste |
| ST | Scheduled Tribe |
| VJ/DT | Vimukta Jati / Denotified Tribes |
| NT | Nomadic Tribes (NT-A, NT-B, NT-C, NT-D) |
| OBC | Other Backward Class |
| EWS | Economically Weaker Section (family income < ₹8 lakhs/year) |
| SBC | Special Backward Category |
| EBC | Economically Backward Class |
| SEBC | Socially and Educationally Backward Class |
| TFWS | Tuition Fee Waiver Scheme (Open category, income < ₹8 lakhs/year) |`,
        },
      },
    ],
  },

  // ── 9. DOCUMENTS REQUIRED ───────────────────────────────────────────────────
  "admissions-documents": {
    pageTitle: "Documents Required",
    sections: [
      {
        sectionId: "docs-all",
        title: "Documents Required (All B.E. / DSE Candidates)",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `| # | Document | Original | Copies | Notes |
|---|---|---|---|---|
| 1 | MHT-CET / JEE Main Scorecard | Yes | 2 | Valid scorecard with percentile / score |
| 2 | SSC (10th) Marksheet & Certificate | Yes | 2 | For age / date of birth verification |
| 3 | HSC (12th) Marksheet & Certificate | Yes | 2 | Must clearly show PCM / PCB subjects |
| 4 | School Leaving Certificate (SLC / TC) | Yes | 1 | From last institution attended |
| 5 | Migration Certificate | Yes | 1 | Required for non-Maharashtra HSC board |
| 6 | CAP Seat Acceptance Form | Yes | 1 | Issued by CET Cell after ₹1,000 fee payment |
| 7 | Facilitation Center Receipt | Yes | 1 | Document verification receipt |
| 8 | Nationality Certificate | Yes | 2 | Indian nationality certificate (CET format) |
| 9 | Domicile Certificate | Yes | 2 | OR Birth Certificate for Maharashtra domicile proof |
| 10 | Passport-size Photographs | — | 5–8 | Recent, color, white background |
| 11 | Aadhar Card | Yes | 2 | For identity and address verification |`,
        },
      },
      {
        sectionId: "docs-reserved",
        title: "Additional Documents for Reserved Categories",
        type: "markdown",
        order: 2,
        isVisible: true,
        content: {
          text: `| Category | Required Additional Documents |
|---|---|
| SC / ST | Caste Certificate + **Caste Validity Certificate** (from competent authority) |
| VJ / DT / NT | Caste Certificate + Caste Validity Certificate |
| OBC / SBC | Caste Certificate + Caste Validity + **Non-Creamy Layer (NCL) Certificate** (valid till March 31, 2026) |
| EBC | Income Certificate (annual family income < ₹1 lakh) |
| EWS | EWS Certificate + Income Certificate (family income < ₹8 lakhs/year) |
| SEBC | Caste Certificate + Caste Validity + NCL Certificate |
| TFWS | Income Certificate (family income < ₹8 lakhs/year) + Domicile Certificate |
| Minority | Minority Declaration Form + Religion Certificate |
| PwD / Divyang | Disability Certificate from District Civil Hospital (minimum 40% disability) |`,
        },
      },
      {
        sectionId: "docs-instructions",
        title: "Instructions",
        type: "markdown",
        order: 3,
        isVisible: true,
        content: {
          text: `- Bring all originals along with **2 complete sets of self-attested photocopies**
- Documents must be submitted within the date notified by DTE/CET Cell after seat allotment
- **Failure to produce original documents** may result in **cancellation of admission**
- All certificates must be **valid and government-issued** — expired or tampered documents will not be accepted
- Non-Creamy Layer certificates for OBC/SBC must be valid till **March 31, 2026**
- Keep **digital copies** of all documents on your phone/email for reference during the CAP process
- Contact the admission office at [admissions@ssgmce.ac.in](mailto:admissions@ssgmce.ac.in) or +91-7265-252289 for any clarifications`,
        },
      },
    ],
  },

  // ── 10. SCHOLARSHIPS ─────────────────────────────────────────────────────────
  "admissions-scholarships": {
    pageTitle: "Scholarships",
    sections: [
      {
        sectionId: "govt-scholarships",
        title: "Government Scholarship Schemes",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `| Scheme | Category | Annual Income Limit | Benefits |
|---|---|---|---|
| Post Matric Scholarship (SC) | SC | ₹2.50 Lakhs | Full fee (tuition + dev) + ₹1,200/month maintenance |
| Post Matric Scholarship (ST) | ST | ₹2.50 Lakhs | Full fee + ₹1,200/month maintenance |
| Post Matric Scholarship (VJ/NT) | VJ / NT | ₹2.50 Lakhs | Full fee + ₹1,200/month maintenance |
| Post Matric Scholarship (SBC) | SBC | ₹8.00 Lakhs | Full fee + ₹1,000/month maintenance |
| Post Matric Scholarship (OBC) | OBC | ₹8.00 Lakhs | Full tuition fee + ₹1,000/month maintenance |
| Rajarshi Chhatrapati Shahu Maharaj Scholarship (EWS) | EWS (Open) | ₹8.00 Lakhs | Full tuition fee |
| Tuition Fee Waiver Scheme (TFWS) | Open category | ₹8.00 Lakhs | Full tuition fee waived (development fee applicable) |
| EBC (Economic Backward Class) Scholarship | EBC | ₹1.00 Lakh | Tuition fee concession |
| Minority Scholarship | Minority communities | As per scheme | Partial fee support |

> All schemes are administered through the **MahaDBT Portal** ([www.mahadbtmahait.gov.in](https://www.mahadbtmahait.gov.in))`,
        },
      },
      {
        sectionId: "how-to-apply",
        title: "How to Apply for Scholarships",
        type: "markdown",
        order: 2,
        isVisible: true,
        content: {
          text: `1. Register on the **MahaDBT Portal**: [www.mahadbtmahait.gov.in](https://www.mahadbtmahait.gov.in)
2. Complete **Aadhar authentication** and link your active bank account (student's own account)
3. Fill the **online scholarship application form** for the applicable scheme
4. Upload all required **scanned documents** (caste cert, income cert, marksheets, NCL, etc.)
5. Submit the application and note your **Application ID** for tracking
6. Application is forwarded for **college verification** — submit to the Social Welfare Office without delay
7. College verifies and forwards for higher-level approval
8. After final approval, scholarship amount is **directly credited to your Aadhar-linked bank account**`,
        },
      },
      {
        sectionId: "scholarship-notes",
        title: "Important Notes",
        type: "markdown",
        order: 3,
        isVisible: true,
        content: {
          text: `- Scholarships are available only for **CAP (regular) admissions** — not for Institute-Level (ARC) seats
- Application window is typically **September – October**; late applications are **rejected without exception**
- Income certificate must be **valid till March 31 of the current academic year**
- **NCL Certificate** for OBC/SBC must be current (valid till March 31, 2026) — expired certificates are not accepted
- Scholarship must be applied for using the **student's own bank account** linked to Aadhar (not parent's)
- **Re-apply every year** — scholarship is not automatically renewed
- Contact the **Social Welfare Office** at SSGMCE for assistance with MahaDBT portal registration and application
- **Hostel scholarship** (separate) is available for SC/ST students staying in hostel — apply through the hostel warden's office`,
        },
      },
    ],
  },

  // ── 11. FAQs ─────────────────────────────────────────────────────────────────
  "admissions-faqs": {
    pageTitle: "FAQs",
    sections: [
      {
        sectionId: "faqs-process",
        title: "Admission Process",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `### How are admissions to B.E. conducted?

B.E. admissions at SSGMCE are through the Maharashtra **Centralized Admission Process (CAP)** by DTE Maharashtra. Eligibility is based on MHT-CET or JEE Main scores — merit-based, transparent, and fully online.

### Can I apply using JEE Main instead of MHT-CET?

Yes. JEE Main scores are accepted as an alternative to MHT-CET for B.E. admissions under the Maharashtra State quota.

### How many CAP rounds are there?

Typically **3 CAP rounds** (Round 1, 2, 3) followed by **1–2 institute-level rounds (ARC)** for any remaining vacant seats.

### What is the seat acceptance fee?

**₹1,000** (non-refundable) paid online on [cetcell.mahacet.org](https://cetcell.mahacet.org) after seat is allotted.

### Can I change my branch after admission?

Branch change is permitted after the **First Year B.E.** based on merit and availability of seats, as per SGBAU and SSGMCE internal norms.

### What is the SSGMCE college code for DTE CAP?

**College Code: 1101**`,
        },
      },
      {
        sectionId: "faqs-eligibility",
        title: "Eligibility & Documents",
        type: "markdown",
        order: 2,
        isVisible: true,
        content: {
          text: `### What is the minimum percentage required for B.E.?

Minimum **45% aggregate in PCM** (Physics, Chemistry/Biotechnology, Mathematics) in HSC/12th.  
For **reserved categories**: 40%. For **TFWS**: 50% (45% for reserved).

### Is Maharashtra domicile compulsory?

Maharashtra domicile is **required for State Quota seats**. Students without domicile can still apply for **Home University / Other Than Home University (OMS)** seats if available.

### Which documents are needed for admission?

Key documents: MHT-CET/JEE Main scorecard, HSC & SSC marksheets, TC/SLC, Nationality & Domicile certificates, Caste Certificate + NCL (if applicable). See full list on the [Documents Required](/admissions/documents) page.

### Can I get admission without MHT-CET?

If you have a **JEE Main score**, you can apply. Without any CET score, you can only apply for Direct Second Year (DSE) if you have a Diploma, or apply during institute-level ARC rounds for leftover seats (subject to DTE norms).`,
        },
      },
      {
        sectionId: "faqs-fees",
        title: "Fees & Scholarships",
        type: "markdown",
        order: 3,
        isVisible: true,
        content: {
          text: `### What is the annual fee for B.E.?

**₹1,34,000/year** for General/Open category. With government scholarships, SC/ST students pay **₹0 (fully covered)**, and TFWS students pay only the development fee (**₹17,479/year**). See the [Fee Structure page](/admissions/fees) for full details.

### Is the fee the same for all branches?

Yes, the same fee structure approved by the Shikshan Shulka Samiti applies to all B.E. branches at SSGMCE.

### Are scholarships available?

Yes — multiple government schemes are available through the **MahaDBT Portal** for SC/ST/OBC/EWS/TFWS and other categories. See the [Scholarships page](/admissions/scholarships) for details.

### What is TFWS?

**Tuition Fee Waiver Scheme** — Open category students whose annual family income is below **₹8 lakhs** can apply for complete waiver of tuition fees. Only the development fee (₹17,479/year) applies.`,
        },
      },
      {
        sectionId: "faqs-hostel",
        title: "Hostel & Campus",
        type: "markdown",
        order: 4,
        isVisible: true,
        content: {
          text: `### Is hostel facility available?

Yes. SSGMCE has **separate hostel facilities** for boys and girls:
- Boys' Hostel: ~500 capacity, Wi-Fi, mess, gym, 24/7 security
- Girls' Hostel: Separate block with all facilities and female wardens

Hostel fees are charged separately — see the [Fee Structure page](/admissions/fees).

### How do I apply for hostel accommodation?

Hostel admission is on a **first-come, first-served basis** (preference to outstation students). Apply after confirming your B.E. admission. Contact the hostel warden's office or admissions desk.

### Is transportation available?

Bus and auto services are available from Shegaon city/railway station to campus. The college is approx. 15 km from Shegaon Railway Station (Mumbai–Nagpur rail line).

### Are there any anti-ragging measures?

Yes. SSGMCE has a **constituted Anti-Ragging Committee** and follows the UGC/AICTE anti-ragging norms strictly. Any incident can be reported to the SSGMCE Anti-Ragging Helpline or the UGC Helpline: 1800-180-5522.`,
        },
      },
      {
        sectionId: "faqs-placements",
        title: "Placements & Career",
        type: "markdown",
        order: 5,
        isVisible: true,
        content: {
          text: `### What is the placement record?

SSGMCE has a **85%+ placement rate** with highest package of **12 LPA** and average package of **3.5–4.5 LPA** in recent years. See the [Placements section](/placements/about) for full details.

### Which companies recruit from SSGMCE?

Major recruiters include TCS, Infosys, Wipro, Tech Mahindra, L&T, Cognizant, Capgemini, Persistent Systems, Accenture, HCL, IBM, Reliance, KPIT, Zensar, LTIMindtree, Bajaj Electricals, and many more.

### Are internships available?

Yes. The Training & Placement Cell actively coordinates with industry for **internships** (both summer and final year). Students are also encouraged to pursue NPTEL certifications and Coursera courses via the library.

### Can I do higher studies (M.E. / MBA) after B.E.?

Yes. SSGMCE offers M.E. (4 specializations) and MBA programs. After B.E., you can appear for **GATE** (for M.E.) or **MHT-CET MBA / CAT** for MBA. GATE-qualified students get scholarship/fellowship of ₹12,400/month.`,
        },
      },
    ],
  },

  // ── 12. CONTACT ADMISSION OFFICE ─────────────────────────────────────────────
  "admissions-contact": {
    pageTitle: "Contact Admission Office",
    sections: [
      {
        sectionId: "quick-contact",
        title: "Quick Contact",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `| Contact | Details |
|---|---|
| Main Phone | +91-7265-252274 |
| Admission Helpline | +91-7265-252289 |
| Fax | +91-7265-252276 |
| Email (Admissions) | [admissions@ssgmce.ac.in](mailto:admissions@ssgmce.ac.in) |
| Email (Principal) | [principal@ssgmce.ac.in](mailto:principal@ssgmce.ac.in) |
| General Enquiry | [info@ssgmce.ac.in](mailto:info@ssgmce.ac.in) |
| Website | [www.ssgmce.ac.in](https://www.ssgmce.ac.in) |
| Office Hours | Mon–Fri: 10:00 AM – 5:00 PM · Saturday: 10:00 AM – 2:00 PM |
| Address | Shegaon-Buldhana Road, Shegaon – 444203, Dist. Buldhana, Maharashtra |

> During **peak admission season (July–August)**, office hours may be extended. Check the website for updated hours.`,
        },
      },
      {
        sectionId: "staff-directory",
        title: "Admission Staff Directory",
        type: "markdown",
        order: 2,
        isVisible: true,
        content: {
          text: `| Designation | Extension | Responsibilities |
|---|---|---|
| Dean (Admissions) | Ext. 201 | Overall admission coordination and policy |
| Admission Officer | Ext. 202 | CAP round processing, seat allotment queries |
| Assistant Admission Officer | Ext. 203 | Document verification, student assistance |
| Document Verification Officer | Ext. 204 | Original document scrutiny |
| Accounts Office (Fees) | Ext. 206 | Fee receipts, fee-related queries |
| Social Welfare Office | Ext. 207 | Scholarship and MahaDBT portal assistance |`,
        },
      },
      {
        sectionId: "how-to-reach",
        title: "How to Reach SSGMCE",
        type: "markdown",
        order: 3,
        isVisible: true,
        content: {
          text: `**Address:** Shegaon-Buldhana Road, Shegaon – 444203, Dist. Buldhana, Maharashtra, India

📍 [View on Google Maps](https://maps.google.com/?q=Shri+Sant+Gajanan+Maharaj+College+of+Engineering+Shegaon)

| Mode of Transport | Details |
|---|---|
| By Train | Shegaon Railway Station is on the Mumbai–Nagpur (Central Railway) line. Approx. 15 km from campus. Shegaon is a major halt — very well connected. |
| By Road | National Highway NH-44 (Mumbai–Nagpur Highway) passes near Shegaon. State Transport buses available from Akola, Amravati, Buldhana, Nagpur. |
| By Air | Nearest airport: Akola Airport (~80 km) for domestic flights. Nagpur Dr. Babasaheb Ambedkar International Airport (~190 km) for wider connectivity. |
| Local | Auto-rickshaws and local buses available from Shegaon city to campus. |`,
        },
      },
      {
        sectionId: "contact-notes",
        title: "Important Information",
        type: "markdown",
        order: 4,
        isVisible: true,
        content: {
          text: `- Visit the admission office **in person** with all original documents during CAP rounds for faster processing
- SSGMCE does **not** have any authorized agents. Do not pay to any agent claiming to arrange admissions
- All official communication will be through the college's official email IDs and phone numbers listed above
- For **scholarship queries**, contact the Social Welfare Office (Ext. 207) — separate from the admission office
- For **hostel admission** queries, contact the Boys' Hostel Warden or Girls' Hostel Warden directly
- Any complaints regarding admissions can be escalated to the **Principal's office**: [principal@ssgmce.ac.in](mailto:principal@ssgmce.ac.in)`,
        },
      },
    ],
  },

  // ── 13. PhD ADMISSIONS ───────────────────────────────────────────────────────
  "admissions-phd": {
    pageTitle: "Ph.D. Research Program",
    sections: [
      {
        sectionId: "phd-overview",
        title: "Ph.D. Research Program",
        type: "markdown",
        order: 1,
        isVisible: true,
        content: {
          text: `SSGMCE is a recognized **Ph.D. Research Centre** affiliated to **Sant Gadge Baba Amravati University (SGBAU)**. The institute offers both **Full-Time** and **Part-Time** doctoral programs across all engineering and management disciplines.

| Detail | Information |
|---|---|
| Duration (Full-Time) | Minimum 3 years — Maximum 6 years |
| Duration (Part-Time) | Minimum 4 years — Maximum 6 years |
| Affiliated University | Sant Gadge Baba Amravati University (SGBAU) |
| Contact | [phd@ssgmce.ac.in](mailto:phd@ssgmce.ac.in) or +91-7265-252274 |
| Website | [www.ssgmce.ac.in](https://www.ssgmce.ac.in) |`,
        },
      },
      {
        sectionId: "phd-eligibility",
        title: "Eligibility & Admission Process",
        type: "markdown",
        order: 2,
        isVisible: true,
        content: {
          text: `### Eligibility

- **Engineering/Technology:** M.E. / M.Tech in relevant field with minimum **55% marks** (50% for reserved categories)
- **Science:** M.Sc. in relevant field with minimum 55% marks
- **Management:** MBA / M.Com with minimum 55% marks (for Ph.D. in Management)
- **UGC NET / GATE / SLET** qualified candidates are given preference; others must clear the university's **Research Entrance Test (RET)**

### Admission Process

1. **Notification:** University publishes Ph.D. admission notification (typically twice a year)
2. **Online Application:** Submit application with synopsis (2,000–3,000 words) on SGBAU portal
3. **RET Examination:** Qualifying test if NET/GATE/SLET is not held (covers research methodology + subject)
4. **Personal Interview:** Shortlisted candidates appear before the Research Selection Committee
5. **Supervisor Allocation:** Research guide/supervisor assigned based on specialization
6. **University Registration:** Complete formal registration with SGBAU after guide approval
7. **Course Work:** Mandatory coursework (1st semester for Full-Time; 1st year for Part-Time)
8. **Progress Reviews:** Annual progress presentations before Doctoral Committee`,
        },
      },
      {
        sectionId: "phd-comparison",
        title: "Full-Time vs Part-Time Comparison",
        type: "table",
        order: 3,
        isVisible: true,
        content: {
          headers: ["Criteria", "Full-Time", "Part-Time"],
          rows: [
            ["Minimum Duration", "3 years", "4 years"],
            ["Maximum Duration", "6 years", "6 years"],
            [
              "Who Can Apply",
              "All M.E./M.Tech/M.Sc./MBA holders",
              "Working professionals in relevant field",
            ],
            ["Course Work", "Mandatory (1st semester)", "Mandatory (1st year)"],
            [
              "Attendance",
              "Full-time at institute",
              "Flexible — min. 60% physical presence",
            ],
            [
              "Fellowship Eligibility",
              "UGC/CSIR JRF — ₹31,000/month",
              "Not eligible",
            ],
            [
              "Laboratory Access",
              "24×7 access",
              "Working hours + special permissions",
            ],
          ],
        },
      },
      {
        sectionId: "phd-research-areas",
        title: "Research Areas (Department-wise)",
        type: "markdown",
        order: 4,
        isVisible: true,
        content: {
          text: `| Department | Research Focus Areas |
|---|---|
| Computer Science & Engg. | AI/ML, Data Science, Deep Learning, Cyber Security, Cloud Computing, IoT, Blockchain |
| Electronics & Telecom | VLSI Design, Signal Processing, Embedded Systems, Communication Systems, IoT |
| Electrical Engineering | Power Systems, Power Electronics, Renewable Energy, Smart Grids, Control Systems |
| Mechanical Engineering | Thermal Engineering, Production & Manufacturing, CAD/CAM, Renewable Energy, Robotics |
| Civil Engineering | Structural Engineering, Geotechnical Engg., Environmental, Water Resources |
| Information Technology | Web Technologies, Mobile Computing, Information Security, Database Systems |
| Management (MBA) | Marketing, Finance, Operations, Human Resources, Supply Chain, Entrepreneurship |`,
        },
      },
      {
        sectionId: "phd-fellowship",
        title: "Fellowship & Financial Support",
        type: "markdown",
        order: 5,
        isVisible: true,
        content: {
          text: `- **UGC/CSIR Fellowship (JRF):** ₹31,000/month for the first 2 years after upgrading to SRF: ₹35,000/month
- **GATE Scholarship (M.E./M.Tech path to Ph.D.):** ₹12,400/month during M.E./M.Tech
- Access to institute laboratories, research facilities, and the SSGMCE central library
- Financial support for presenting research papers at national and international conferences
- Opportunity to apply for external research grants from **DST, DRDO, SERB, DBT, MeitY**, etc.
- SSGMCE's R&D Cell actively supports projects with industry collaboration and funding

For details, contact the **Research & Development Cell**: [rdc@ssgmce.ac.in](mailto:rdc@ssgmce.ac.in) | +91-7265-252274`,
        },
      },
    ],
  },
};

// ─── Update Function ──────────────────────────────────────────────────────────

async function updateAdmissionsPages() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB\n");

  const db = mongoose.connection.db;
  const collection = db.collection("pagecontents");

  let updatedCount = 0;
  let errorCount = 0;

  for (const [pageId, data] of Object.entries(admissionsData)) {
    try {
      const result = await collection.updateOne(
        { pageId },
        {
          $set: {
            sections: data.sections,
            updatedAt: new Date(),
          },
        },
        { upsert: false },
      );

      if (result.matchedCount === 0) {
        // Page doesn't exist — insert it
        await collection.insertOne({
          pageId,
          pageTitle: data.pageTitle,
          sections: data.sections,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(
          `✅ INSERTED: ${pageId} (${data.sections.length} sections)`,
        );
      } else {
        console.log(`✅ UPDATED: ${pageId} (${data.sections.length} sections)`);
      }
      updatedCount++;
    } catch (err) {
      console.error(`❌ ERROR on ${pageId}:`, err.message);
      errorCount++;
    }
  }

  console.log(`\n─────────────────────────────────────`);
  console.log(`Done: ${updatedCount} pages updated, ${errorCount} errors`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

updateAdmissionsPages().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
