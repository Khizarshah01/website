// Comprehensive Admissions Data for SSGMCE

export const admissionsData = {
  academicYear: "2024-25",
  lastUpdated: "January 2025",

  // Seat Matrix for all programs
  seatMatrix: {
    undergraduate: [
      {
        branch: "Computer Science & Engineering",
        code: "CSE",
        intake: 120,
        openCategory: 72,
        ews: 12,
        obc: 32,
        sc: 18,
        st: 9,
        vjnt: 6,
        sbc: 2,
        orphan: 1,
      },
      {
        branch: "Information Technology",
        code: "IT",
        intake: 60,
        openCategory: 36,
        ews: 6,
        obc: 16,
        sc: 9,
        st: 5,
        vjnt: 3,
        sbc: 1,
        orphan: 1,
      },
      {
        branch: "Mechanical Engineering",
        code: "MECHANICAL",
        intake: 120,
        openCategory: 72,
        ews: 12,
        obc: 32,
        sc: 18,
        st: 9,
        vjnt: 6,
        sbc: 2,
        orphan: 1,
      },
      {
        branch: "Electrical Engineering (E&P)",
        code: "ELECTRICAL",
        intake: 60,
        openCategory: 36,
        ews: 6,
        obc: 16,
        sc: 9,
        st: 5,
        vjnt: 3,
        sbc: 1,
        orphan: 1,
      },
      {
        branch: "Electronics & Telecommunication",
        code: "ENTC",
        intake: 60,
        openCategory: 36,
        ews: 6,
        obc: 16,
        sc: 9,
        st: 5,
        vjnt: 3,
        sbc: 1,
        orphan: 1,
      },
      {
        branch: "Civil Engineering",
        code: "CIVIL",
        intake: 60,
        openCategory: 36,
        ews: 6,
        obc: 16,
        sc: 9,
        st: 5,
        vjnt: 3,
        sbc: 1,
        orphan: 1,
      },
    ],
    postgraduate: [
      {
        branch: "M.E. Computer Science & Engineering",
        code: "ME-CSE",
        intake: 18,
        openCategory: 11,
        ews: 2,
        obc: 5,
        sc: 3,
        st: 2,
        vjnt: 1,
        orphan: 0,
      },
      {
        branch: "M.E. Heat Power Engineering",
        code: "ME-HPE",
        intake: 18,
        openCategory: 11,
        ews: 2,
        obc: 5,
        sc: 3,
        st: 2,
        vjnt: 1,
        orphan: 0,
      },
      {
        branch: "M.E. Structural Engineering",
        code: "ME-SE",
        intake: 18,
        openCategory: 11,
        ews: 2,
        obc: 5,
        sc: 3,
        st: 2,
        vjnt: 1,
        orphan: 0,
      },
    ],
    mba: {
      branch: "MBA (Master of Business Administration)",
      code: "MBA",
      intake: 60,
      openCategory: 36,
      ews: 6,
      obc: 16,
      sc: 9,
      st: 5,
      vjnt: 3,
      orphan: 1,
    },
  },

  // Fee Structure
  feeStructure: {
    undergraduate: {
      general: {
        tuitionFee: 83000,
        developmentFee: 5000,
        otherFees: 2000,
        total: 90000,
        category: "General/Open/EWS",
      },
      tfws: {
        tuitionFee: 0,
        developmentFee: 5000,
        otherFees: 2000,
        total: 7000,
        category: "TFWS (Tuition Fee Waiver Scheme)",
      },
      reserved: {
        tuitionFee: 5000,
        developmentFee: 5000,
        otherFees: 2000,
        total: 12000,
        category: "SC/ST/VJ/NT/OBC/SBC",
      },
    },
    postgraduate: {
      general: {
        tuitionFee: 75000,
        developmentFee: 5000,
        otherFees: 2000,
        total: 82000,
        category: "General/Open/EWS",
      },
      reserved: {
        tuitionFee: 5000,
        developmentFee: 5000,
        otherFees: 2000,
        total: 12000,
        category: "SC/ST/VJ/NT/OBC/SBC",
      },
    },
    mba: {
      general: {
        tuitionFee: 60000,
        developmentFee: 5000,
        otherFees: 2000,
        total: 67000,
        category: "General/Open/EWS",
      },
      reserved: {
        tuitionFee: 5000,
        developmentFee: 5000,
        otherFees: 2000,
        total: 12000,
        category: "SC/ST/VJ/NT/OBC/SBC",
      },
    },
  },

  // Eligibility Criteria
  eligibility: {
    undergraduate: {
      feAdmission: {
        title: "First Year Engineering (FE) Admission",
        criteria: [
          "Passed 12th/HSC examination with Physics and Mathematics as compulsory subjects",
          "Third subject: Chemistry OR Biotechnology OR Biology OR Technical Vocational subject",
          "Obtained at least 45% marks (40% for reserved category) in PCM/PCB subjects taken together",
          "Obtained at least 50% marks (45% for reserved category) for TFWS candidates",
          "Valid MHT-CET or JEE Main score",
          "Domicile of Maharashtra (for Maharashtra State Quota)",
          "Age: No upper age limit as per AICTE norms",
        ],
      },
      dseAdmission: {
        title: "Direct Second Year (DSE/Lateral Entry) Admission",
        criteria: [
          "Passed 3-year Diploma in relevant branch from MSBTE with minimum 45% marks (40% for reserved)",
          "OR Passed B.Sc. degree with Mathematics as one of the subjects with minimum 45% marks",
          "Valid MHT-CET (PCM) or JEE Main score for DSE",
          "Domicile of Maharashtra for State Quota seats",
        ],
      },
    },
    postgraduate: {
      title: "M.E. Admission",
      criteria: [
        "Bachelor's degree (B.E./B.Tech) in relevant engineering discipline",
        "Minimum 50% marks (45% for reserved categories) in aggregate",
        "Valid GATE score (preferred but not mandatory for some colleges)",
        "Candidates without GATE score can apply through entrance exam conducted by DTE Maharashtra",
        "Final year engineering students are eligible to apply (admission subject to passing)",
        "Relevant work experience (if any) will be an advantage",
      ],
    },
    mba: {
      title: "MBA Admission",
      criteria: [
        "Bachelor's degree (any discipline) from a recognized university",
        "Minimum 50% marks (45% for reserved categories)",
        "Valid MAH-CET (DTE) or CAT/MAT/CMAT/XAT/ATMA score",
        "Final year degree students can apply (admission subject to result declaration)",
        "No work experience required for fresh graduates",
      ],
    },
  },

  // Admission Process Steps
  admissionProcess: {
    undergraduate: {
      feProcess: [
        {
          step: 1,
          title: "Register for MHT-CET/JEE Main",
          description:
            "Appear for MHT-CET (conducted by State CET Cell) or JEE Main examination",
          timeline: "April - May",
        },
        {
          step: 2,
          title: "CAP Round Registration",
          description:
            "Register for Centralized Admission Process (CAP) on DTE Maharashtra portal",
          timeline: "After CET results",
        },
        {
          step: 3,
          title: "Fill Preferences",
          description:
            "Fill college and branch preferences in order of priority on the CAP portal",
          timeline: "During CAP rounds",
        },
        {
          step: 4,
          title: "CAP Rounds (3 Rounds)",
          description:
            "Participate in CAP round 1, 2, and 3. Seat allotment based on merit and preferences",
          timeline: "July - August",
        },
        {
          step: 5,
          title: "Document Verification",
          description:
            "Report to SSGMCE with original documents for verification after seat allotment",
          timeline: "Within 2-3 days of allotment",
        },
        {
          step: 6,
          title: "Fee Payment",
          description:
            "Pay admission fees online or at the college to confirm your seat",
          timeline: "Within specified deadline",
        },
        {
          step: 7,
          title: "Admission Confirmation",
          description:
            "Submit all documents, receive admission confirmation and begin classes",
          timeline: "August - September",
        },
      ],
      dseProcess: [
        {
          step: 1,
          title: "Register for MHT-CET",
          description:
            "Diploma/B.Sc. students register for MHT-CET for Direct Second Year Entry",
          timeline: "March - April",
        },
        {
          step: 2,
          title: "CAP Registration",
          description: "Register on DTE portal for DSE CAP rounds",
          timeline: "After results",
        },
        {
          step: 3,
          title: "Choice Filling",
          description: "Select preferred colleges and branches",
          timeline: "CAP window period",
        },
        {
          step: 4,
          title: "Seat Allotment",
          description: "Check seat allotment results after each CAP round",
          timeline: "July - August",
        },
        {
          step: 5,
          title: "Document Verification & Fee Payment",
          description: "Visit SSGMCE for document verification and pay fees",
          timeline: "Within 2 days of allotment",
        },
      ],
    },
    postgraduate: {
      title: "M.E. Admission Process",
      steps: [
        {
          step: 1,
          title: "GATE Exam (Optional)",
          description:
            "Appear for GATE examination (preferred for better scholarships and opportunities)",
          timeline: "February",
        },
        {
          step: 2,
          title: "Register on DTE Portal",
          description:
            "Register for M.E. admissions on the DTE Maharashtra website",
          timeline: "After GATE results",
        },
        {
          step: 3,
          title: "Document Upload",
          description:
            "Upload scanned copies of all required documents (degree, marksheets, certificates)",
          timeline: "During registration",
        },
        {
          step: 4,
          title: "CAP Rounds",
          description:
            "Participate in CAP rounds, fill college and specialization preferences",
          timeline: "June - July",
        },
        {
          step: 5,
          title: "Seat Allotment",
          description: "Check your seat allotment status on DTE portal",
          timeline: "After each round",
        },
        {
          step: 6,
          title: "Report to College",
          description:
            "Visit SSGMCE for document verification and admission formalities",
          timeline: "Within 3 days",
        },
        {
          step: 7,
          title: "Fee Payment & Confirmation",
          description: "Pay fees and complete admission process",
          timeline: "As per schedule",
        },
      ],
    },
  },

  // Required Documents
  documentsRequired: {
    common: [
      "SSC/10th Standard Mark Sheet and Passing Certificate",
      "HSC/12th Standard Mark Sheet and Passing Certificate",
      "School/College Leaving Certificate (TC)",
      "Migration Certificate (if from another university/board)",
      "Nationality Certificate",
      "Domicile Certificate of Maharashtra (for state quota)",
      "Aadhar Card",
      "PAN Card (optional but recommended)",
      "Passport size photographs (6-8 recent)",
      "Gap Certificate (if applicable)",
      "Non-Creamy Layer Certificate (for OBC candidates)",
      "Caste Certificate (SC/ST/VJ/NT/SBC/OBC/EWS) - if applicable",
      "Caste Validity Certificate (for reserved category)",
      "Income Certificate (for EWS/TFWS)",
      "Physical Disability Certificate (if applicable)",
      "Orphan Certificate (if applicable)",
      "Anti-Ragging Affidavit (to be submitted at college)",
    ],
    undergraduate: [
      "MHT-CET/JEE Main Score Card",
      "CAP Allotment Letter from DTE Maharashtra",
    ],
    dse: [
      "Diploma Mark Sheets (All Semesters)",
      "Diploma Passing Certificate",
      "OR B.Sc. Degree and Marksheets",
      "MHT-CET Score Card for DSE",
    ],
    postgraduate: [
      "B.E./B.Tech Degree Certificate",
      "B.E./B.Tech All Semester Marksheets",
      "Provisional/Final Degree Certificate",
      "GATE Score Card (if applicable)",
      "Work Experience Certificate (if any)",
    ],
    mba: [
      "Bachelor's Degree Certificate (any stream)",
      "All Semester/Year Marksheets",
      "MAH-CET/CAT/MAT/CMAT Score Card",
    ],
  },

  // Important Dates (Template - Update annually)
  importantDates: [
    {
      event: "Online Application Start",
      ugDate: "May 2024",
      pgDate: "May 2024",
    },
    {
      event: "Last Date to Apply",
      ugDate: "June 2024",
      pgDate: "June 2024",
    },
    {
      event: "CAP Round 1",
      ugDate: "July 2024",
      pgDate: "June 2024",
    },
    {
      event: "CAP Round 2",
      ugDate: "July 2024",
      pgDate: "July 2024",
    },
    {
      event: "CAP Round 3",
      ugDate: "August 2024",
      pgDate: "July 2024",
    },
    {
      event: "Document Verification",
      ugDate: "After each round",
      pgDate: "After each round",
    },
    {
      event: "Classes Commence",
      ugDate: "August 2024",
      pgDate: "July 2024",
    },
  ],

  // FAQ
  faq: [
    {
      question: "What is the admission procedure for B.E. at SSGMCE?",
      answer:
        "Admissions to B.E. programs are done through DTE Maharashtra's Centralized Admission Process (CAP) based on MHT-CET or JEE Main scores. Students must register on the DTE portal, fill preferences, and participate in CAP rounds.",
    },
    {
      question: "Is GATE compulsory for M.E. admission?",
      answer:
        "GATE is not compulsory for M.E. admission at SSGMCE. However, GATE-qualified candidates get preference and are eligible for MHRD scholarships. Non-GATE candidates can apply through the DTE entrance exam.",
    },
    {
      question: "What are the reservation categories available?",
      answer:
        "Reservations are available for SC, ST, VJ/NT, OBC, SBC, EWS, TFWS, Orphan, and Persons with Disabilities (PwD) as per Maharashtra State Government norms.",
    },
    {
      question: "Can I get admission through management quota?",
      answer:
        "SSGMCE is a government-aided institution and follows only DTE Maharashtra CAP process. There is no management quota or direct admission. All seats are filled through merit-based CAP rounds.",
    },
    {
      question: "What is TFWS (Tuition Fee Waiver Scheme)?",
      answer:
        "TFWS provides complete tuition fee waiver for economically weaker students who score above 50% in qualifying exams. The annual family income should be less than ₹8 lakhs. Students pay only development and other fees.",
    },
    {
      question: "Is hostel facility available?",
      answer:
        "Yes, SSGMCE provides separate hostel facilities for boys and girls with adequate amenities. Hostel admission is subject to availability and is done after academic admission confirmation.",
    },
    {
      question: "Can final year students apply for M.E.?",
      answer:
        "Yes, final year B.E./B.Tech students can apply for M.E. programs. However, admission will be confirmed only after submitting the final degree and marksheets before the specified deadline.",
    },
    {
      question: "What documents are needed at the time of admission?",
      answer:
        "You need to bring original + photocopies of 10th, 12th marksheets, leaving certificate, domicile certificate, caste certificate (if applicable), nationality certificate, Aadhar card, MHT-CET/JEE score card, CAP allotment letter, and passport photos.",
    },
    {
      question: "Are there any scholarships available?",
      answer:
        "Yes, various scholarships are available including: Government of Maharashtra Post-Matric Scholarship, EBC Scholarship, Minority Scholarship, GATE Scholarship for M.E., and merit-based institutional scholarships.",
    },
    {
      question: "What is Direct Second Year (DSE) admission?",
      answer:
        "DSE or Lateral Entry allows diploma holders or B.Sc. graduates to take direct admission into the second year of engineering. They need to appear for MHT-CET and participate in the DSE CAP process.",
    },
  ],

  // Contact Information
  contactInfo: {
    admissionOffice: {
      phone: "+91-7265-252274",
      email: "admission@ssgmce.ac.in",
      timings: "10:00 AM - 5:00 PM (Mon-Sat)",
    },
    helpdesk: {
      phone: "+91-7265-252279",
      email: "info@ssgmce.ac.in",
    },
    address: {
      line1: "Shri Sant Gajanan Maharaj College of Engineering",
      line2: "Shegaon - 444203",
      line3: "Dist. Buldhana, Maharashtra, India",
    },
  },

  // Download Links (Update with actual URLs)
  downloads: {
    brochure: "/documents/ssgmce-brochure-2024-25.pdf",
    feeStructure: "/documents/fee-structure-2024-25.pdf",
    seatMatrix: "/documents/seat-matrix-2024-25.pdf",
    documentChecklist: "/documents/admission-document-checklist.pdf",
    antiRaggingAffidavit: "/documents/anti-ragging-affidavit.pdf",
    prospectus: "/documents/prospectus-2024-25.pdf",
  },
};

export default admissionsData;
