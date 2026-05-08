// Default data for EnTC Department
// These are fallback values when database data is not available

import dspLabImg from "../assets/images/departments/electronics/labs/DSP_LAB.JPG";
import micLabImg from "../assets/images/departments/electronics/labs/MIC_LAB.JPG";
import peLabImg from "../assets/images/departments/electronics/labs/PE_LAB.JPG";
import analogDicLabImg from "../assets/images/departments/electronics/labs/Analog_and_digital_IC_laboratory.jpg";
import edcLabImg from "../assets/images/departments/electronics/labs/Electronics_and_devices_circuit_lab.jpg";
import commLabImg from "../assets/images/departments/electronics/labs/Communication_Engineering_lab.jpg";
import workshopLabImg from "../assets/images/departments/electronics/labs/Workshop_Lab.jpg";
import projectLabImg from "../assets/images/departments/electronics/labs/Project_LAB.JPG";
import vlsiLabImg from "../assets/images/departments/electronics/labs/EXTC_Lab_Cadence.jpg";
import pgLabImg from "../assets/images/departments/electronics/labs/me_VLSI__ESD_lab.jpg";
import aimlLabImg from "../assets/images/departments/electronics/labs/EXTC_AIMLLAB.jpg";

export const defaultVision = [
  "To impart quality education and excel in Electronics and Telecommunication Engineering research to serve the global society.",
];

export const defaultMission = [
  "To produce Electronics & Telecommunication engineers with a strong foundation of Mathematics, Science and Technology to fulfill needs of society.",
  "To enable students to innovate design, simulate, develop, analyze and test hardware and software components for offering solutions to real life situations using state-of-the-art infrastructure and R&D facilities.",
  "To nurture students with professional attitude, leadership, entrepreneurship, effective communication, teamwork & multi-disciplinary approach to serve in national and multinational organizations.",
  "To inculcate ethical, moral and environment friendly values in students.",
];

export const defaultPeo = [
  "To produce Electronics & Telecommunication engineers with a strong foundation of Mathematics, Science and Technology to fulfill needs of society.",
  "To enable students to innovate design, simulate, develop, analyze and test hardware and software components for offering solutions to real life situations using state-of-the-art infrastructure and R&D facilities.",
  "To nurture students with professional attitude, leadership, entrepreneurship, effective communication, teamwork & multi-disciplinary approach to serve in national and multinational organizations.",
  "To inculcate ethical, moral and environment friendly values in students.",
];

export const defaultPso = [
  "Ability to design and analyze electronic circuits, communication systems and signal processing algorithms.",
  "Ability to use modern EDA tools, communication equipment and embedded systems for solving real-world problems.",
];

export const defaultPo = [
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

export const defaultHodMessage = {
  name: "Dr. D. D. Nawgaje",
  designation: "Head of Department",
  department: "Electronics and Telecommunication Engineering",
  role: "Head, Dept. of Electronics and Telecommunication Engineering",
  email: "hod_extc@ssgmce.ac.in",
  phone: "+91 9423415901",
  specialization: "Digital Electronics",
  qualification: "Associate Professor",
  photo: "",
  message1:
    "The Department of Electronics and Telecommunication Engineering is one of the major departments of SSGMCE, Shegaon established in **1983** offering programs: **Under Graduate, Post Graduate and Ph.D.** It is affiliated to Sant Gadge Baba Amravati University, Amravati, recognized by AICTE, New Delhi and approved by DTE, Maharashtra.",
  message2:
    "The Undergraduate program of the Department of Electronics and Telecommunication Engineering has the recognition of being accredited **05 times by NBA, AICTE, New Delhi**. The post graduate program was also accredited once by NBA, AICTE, New Delhi. This achievement reflects our commitment to maintaining the highest standards of education and continuous improvement.",
  message3:
    "All the laboratories in the department are **well equipped** to run the program specific curriculum prescribed by the University. All laboratories are recognized and approved as research laboratories for Ph.D. work by SGB Amravati University. The department is having **qualified and experienced faculty members** dedicated to imparting quality education and fostering innovation among students.",
  signatureName: "Dr. D. D. Nawgaje",
  signatureTitle:
    "Head, Dept. of Electronics and Telecommunication Engineering",
  collegeNameLine1: "Shri Sant Gajanan Maharaj",
  collegeNameLine2: "College of Engineering, Shegaon",
  message: [
    "The Department of Electronics and Telecommunication Engineering is one of the major departments of SSGMCE, Shegaon established in 1983 offering programs: Under Graduate, Post Graduate and Ph.D. It is affiliated to Sant Gadge Baba Amravati University, Amravati, recognized by AICTE, New Delhi and approved by DTE, Maharashtra. The Undergraduate program of the Department of Electronics and Telecommunication Engineering has the recognition of being accredited 05 times by NBA, AICTE, New Delhi. The post graduate program was also accredited once by NBA, AICTE, New Delhi.",
    "All the laboratories in the department are well equipped to run the program specific curriculum prescribed by the University. All laboratories are recognized and approved as research laboratories for Ph.D. work by SGB Amravati University.",
  ],
};

export const defaultLabs = [
  {
    name: "Digital Signal Processing Laboratory",
    image: dspLabImg,
    resources:
      "Universal trainer kit for CPLD/FPGA, TK based universal programmer, DM 642 EVM Based Board for DSP, IBM e-server 226, DSO 60 MHz, arbitrary waveform generator, TMS 320C6711, 320C6713 DSP kit and ADC THS 1206 EVM, TMS DSP processor kits, PMOD WiFi I/F Card, Nexys 3 Spartan Board, Cranes MSP Starter Kit, Virtex II xilinx Board with Xilinx & Sysgen Software, Fingerprint Daughter Card, Dskeye Module, PMOD DA2 I/F Card, PMOD A2D I/F Card, PMOD Stepper Motor I/F Card.",
    facilities: "Area: 65.45 Sq.Mtrs | Systems: 22 PC | UPS: 10 KVA",
  },
  {
    name: "Microprocessor & Microcontroller Laboratory",
    image: micLabImg,
    resources:
      "Virtex II board with Xilinx and sysgen, SP3, SP6 software, ARM processor titan board, ARM processor metis board, ARM processor explorer board, ARM processor voyager board, atmega 16 board, 8085 and 8051 development boards.",
    facilities: "Area: 99.255 Sq.Mtrs | Systems: 22 PC | UPS: 5 KVA",
  },
  {
    name: "Power Electronics / Instrumentation Laboratory",
    image: peLabImg,
    resources:
      "AC and DC drives, inverters, converters, cyclo converter, chopper, drives, UPS, different power electronics kits, PC based instrumentation trainer, educational PLCs, DSP kit TMS320, CRO 60 MHz, PCB machine, MCK 28335 pro-SCIM, 3 phase converter (6 SCR), 3 phase induction motor control, 3 phase thyristor bridge and SCR firing unit.",
    facilities: "Area: 84.23 Sq.Mtrs | Systems: 05 PC | UPS: 3 KVA",
  },
  {
    name: "Analog and Digital IC Laboratory",
    image: analogDicLabImg,
    resources:
      "Digital CRO, function generator, IC tester, CD system, multimeter, Analog & Digital Ckt. Devp. Platform, Analog & Digital Trainer, CRO 30MHZ, LCRQ Meter, Digital Nanometer, Power Supply, IC Tester (Digital), Dimmerstat, power supply, UPS and computer.",
    facilities: "Area: 90.168 Sq.Mtrs | Systems: 05 PC | UPS: 5 KVA",
  },
  {
    name: "Electronic Device and Circuit Laboratory",
    image: edcLabImg,
    resources:
      "Digital CRO, function generator, multimeters, IC tester, CD system, Analog & Digital Ckt. Devp. Platform, Analog & Digital Trainer, CRO 30MHZ, Digital Nanometer, Power Supply, IC Tester (Digital), Dimmerstat, Digital Storage Oscilloscope 100 MHz, LCR Meter, Phase Lock Loop Trainer Kit, Adv. Digital Trainer Kit, Curve Tracer Kit, Linear Op-Amp Trainer Kit, Transistor Ckt. Trainer Kit, Pulse Generator, Frequency Counter.",
    facilities: "Area: 60.48 Sq.Mtrs | Systems: 05 PC | UPS: 5 KVA",
  },
  {
    name: "Communication Engineering Laboratory",
    image: commLabImg,
    resources:
      "Spectrum analyzer, signal generator, synthesized function generator, fiber optic trainer, antenna trainer unit, GSM evaluation kit, satellite communication trainer, CDMA direct sequence spread spectrum, EPABX m/c with UPS, microstrip trainer, microwave training system, wave and Propagation Trainer, CA System, Microwave bench, Fiber Optic Connectorization Kit, CRO 100MHz and 60MHz, Vector Network Analyser.",
    facilities: "Area: 90.168 Sq.Mtrs | Systems: 12 PC | UPS: 10 KVA",
  },
  {
    name: "Electronics Workshop Laboratory",
    image: workshopLabImg,
    resources:
      "LCD projector (NEC), Discrete component tester, PCB prototype machine (EP-2002), Power Drill Machine with stand, Dual Power supply, LCR meter, IC Tester (Linear), Digital IC Tester, Diode and Transistor Tester, Soldering & Desoldering Practice Trainer, Analog Multimeter, Digital Multimeter, Digital/Analog Ckt Trainer, Oscilloscope 30MHz 2-channel.",
    facilities: "Area: 70.7 Sq.Mtrs | Systems: 05 PC | UPS: 5 KVA",
  },
  {
    name: "Project Laboratory",
    image: projectLabImg,
    resources:
      "Function generator, digital CRO, CD system, multimeters, lux meter, tachometers, thermometers, ARM Processor Embedded Development system, CRO 20 MHz, CRO with Digital Voltmeter & Function Generator, Conductivity measurement trainer, Digital Storage Type CRO, Educational PLC, Fuzzy logic kit, Frequency counter, Magnetic amplifier, Pulse generator.",
    facilities: "Area: 84.23 Sq.Mtrs | Systems: 16 PC | UPS: 10 KVA",
  },
  {
    name: "VLSI & Embedded System Design Center",
    image: vlsiLabImg,
    resources:
      'Complete Cadence Suite with Synopsis Tools. PC with LED monitor 17" and Intel i3 processor with 4GB RAM. Cadence IC 6.14, analog/RF/digital mixed signal EDA tools, virtuoso ADE verifier, virtuoso analog design environment, virtuoso space-based router.',
    facilities:
      "Systems: 20 PC | High-Performance Computing Environment | UPS: 20 KVA",
  },
  {
    name: "PG Laboratory I",
    image: pgLabImg,
    resources:
      "Universal trainer kit for CPLD/FPGA, TK based TMS 320C6713 DSP starter kit, Cranes MSP-430 starter kit, Xilinx 13.4 and sysgen software.",
    facilities: "Area: 65.45 Sq.Mtrs | Systems: 14 PC | UPS: 10 KVA",
  },
  {
    name: "YOGI-DIGI AIML Laboratory",
    image: aimlLabImg,
    resources:
      "Server with 5th Generation Intel Xeon Scalable Processors, one compute node and one master node. Compute Node: Total Cores 32, Total Threads 64, Intel UPI Speed 20 GT/s, Processor Base Frequency 2.1 GHz. Master Node: Total Cores 12, Total Threads 24, Intel UPI Speed 16 GT/s, Processor Base Frequency 2.40 GHz. Smart Board, Jupyter Notebook Software.",
    facilities:
      "Area: 800 sq. ft. | Systems: 35 PC | High-Performance GPU Server | UPS: 25 KVA",
  },
];

export const defaultPrideGate = [
  {
    year: "2024",
    title: "GATE Qualified Students 2024",
    students: [
      ["1", "Rajat Kiran Patil", "4U1", "27", "OBC"],
      ["2", "Vaishnavi Prashant Asole", "4U1", "25.33", "OPEN"],
      ["3", "Abhishek Anand Dhote", "4U1", "25.67", "OBC"],
      ["4", "Tarun Dhote", "4U1", "18", "SC"],
      ["5", "Sahil Mathrukar", "3U2", "23", "OBC"],
    ],
  },
  {
    year: "2023",
    title: "GATE Qualified Students 2023",
    students: [],
  },
  {
    year: "2022",
    title: "GATE Qualified Students 2022",
    students: [["1", "Anup Dnyaneshwar Dongre", "4U", "27.67", "SC"]],
  },
  {
    year: "2021",
    title: "GATE Qualified Students 2021",
    students: [],
  },
  {
    year: "2020",
    title: "GATE Qualified Students 2020",
    students: [],
  },
  {
    year: "2019",
    title: "GATE Qualified Students 2019",
    students: [["1", "Pranit Sanjayrao Vithalkar", "4U", "24.00", "OBC"]],
  },
  {
    year: "2018",
    title: "GATE Qualified Students 2018",
    students: [["1", "Bhushan Rajendra Dhawane", "4U", "16.67", "SC"]],
  },
  {
    year: "2017",
    title: "GATE Qualified Students 2017",
    students: [],
  },
  {
    year: "2016",
    title: "GATE Qualified Students 2016",
    students: [
      ["1", "Tawari Ghanshyam Kamalkishor", "4U", "26.82", "OPEN"],
      ["2", "Mahi Agrawal", "4U", "25.01", "OPEN"],
      ["3", "Pooja Rajmal Varma", "4U", "24.98", "OBC"],
      ["4", "Gaurav Nandkishor Kohale", "4U", "23.32", "OBC"],
      ["5", "Vurewar Tushar Dinesh", "4U", "22.23", "SC"],
      ["6", "Pravin Kisanrao Nagrale", "4U", "18.88", "SC"],
      ["7", "Manisha Onkar Meshram", "4U", "17.95", "SC"],
      ["8", "Sumedh Narendra Wakode", "4U", "17.28", "SC"],
    ],
  },
];

export const defaultPrideToppersBE = [
  {
    year: "2025",
    records: [
      { name: "Dhanshri Anil Wade", rank: "V", score: "9.00 CGPA" },
      { name: "Nivedita Vivekanand Sugandhi", rank: "VII", score: "8.90 CGPA" },
      { name: "Atharva Gajalan Raut", rank: "IX", score: "8.81 CGPA" },
    ],
  },
  {
    year: "2024",
    records: [
      { name: "Ku. Aditi Manoj Deshmukh", rank: "II", score: "9.28 CGPA" },
      { name: "Ku. Unnati Kiranrao Kharate", rank: "V", score: "9.12 CGPA" },
      { name: "Ku. Pooja Pramod Masne", rank: "VI", score: "9.07 CGPA" },
      { name: "Ku. Sayali Vijay Katole", rank: "VI", score: "9.00 CGPA" },
      { name: "Ku. Neha Ashok Bedare", rank: "VII", score: "9.00 CGPA" },
      { name: "Ku. Sakshi Pramod Patil", rank: "VIII", score: "8.98 CGPA" },
      {
        name: "Ku. Kshitija Girish Deshmukh",
        rank: "VIII",
        score: "8.98 CGPA",
      },
      { name: "Ku. Sarla Vijay Paraskar", rank: "IX", score: "8.93 CGPA" },
    ],
  },
  {
    year: "2023",
    records: [
      { name: "Ku. Manasi R. More", rank: "IV", score: "9.15 CGPA" },
      { name: "Ku. Priyanka U. Ughade", rank: "V", score: "9.14 CGPA" },
      { name: "Ku. Amruta A. Bobade", rank: "VII", score: "9.00 CGPA" },
      { name: "Ku. Stuti S. Bokey", rank: "VII", score: "9.00 CGPA" },
      { name: "Mr. Lalit B. Pathade", rank: "X", score: "8.86 CGPA" },
    ],
  },
  {
    year: "2022",
    records: [
      { name: "Ku. Priyanka Ganesh Chavan", rank: "I", score: "9.65 CGPA" },
      { name: "Ku. Gatha Ravindra Bhusari", rank: "II", score: "9.53 CGPA" },
      {
        name: "Ku. Prajakta Janardhan Sangle",
        rank: "IV",
        score: "9.37 CGPA",
      },
      { name: "Ku. Aditi Ganesh Khandare", rank: "V", score: "9.35 CGPA" },
      { name: "Ku. Pallavi Anil Bharsakle", rank: "VII", score: "9.18 CGPA" },
      {
        name: "Ku. Vaishnavi Devidas Lahare",
        rank: "IX",
        score: "9.14 CGPA",
      },
    ],
  },
  {
    year: "2020",
    records: [
      { name: "Pankaj Devidas Wagh", rank: "III", score: "9.31 CGPA" },
      { name: "Ku. Vaishnavi Rangdale", rank: "IV", score: "9.24 CGPA" },
    ],
  },
  {
    year: "2019",
    records: [
      {
        name: "Ku. Swati Chandrashekhar Bobade",
        rank: "II",
        score: "9.00 CGPA",
      },
      {
        name: "Ku. Mitheela Sunilrao Ghawade",
        rank: "III",
        score: "8.98 CGPA",
      },
      {
        name: "Ku. Punam Marotrao Raghtate",
        rank: "V",
        score: "8.88 CGPA",
      },
      { name: "Chaitanya Ajay Jain", rank: "VI", score: "8.86 CGPA" },
      { name: "Ku. Pragati Mahadeo Sonone", rank: "VIII", score: "8.82 CGPA" },
      {
        name: "Ku. Manisha Bhudhiwanta Khade",
        rank: "IX",
        score: "8.72 CGPA",
      },
      { name: "Ku. Bhagyashri Sunil Wani", rank: "X", score: "8.67 CGPA" },
    ],
  },
  {
    year: "2018",
    records: [
      { name: "Ku. Rupali S. Khodke", rank: "III", score: "8.98 CGPA" },
    ],
  },
  {
    year: "2017",
    records: [
      {
        name: "Ku. Aditi Subodh Patwardhan",
        rank: "II",
        score: "9.07 CGPA",
      },
      { name: "Ku. Payal Dilip Agrawal", rank: "VIII", score: "8.84 CGPA" },
    ],
  },
  {
    year: "2016",
    records: [
      { name: "Ku. Shweta Bhaskar Barabde", rank: "I", score: "9.42 CGPA" },
      { name: "Ku. Mahi Rajendra Agrawal", rank: "VI", score: "9.12 CGPA" },
      {
        name: "Ghanshyam Kamalkishor Tawari",
        rank: "IX",
        score: "9.06 CGPA",
      },
    ],
  },
  {
    year: "2015",
    records: [{ name: "Ku. Himanshu S. Sharma", rank: "-", score: "-" }],
  },
  {
    year: "2014",
    records: [
      { name: "Ku. Shweta G. Golamwar", rank: "III", score: "9.25 CGPA" },
      { name: "Mr. Shyam A. Dharaskar", rank: "V", score: "9.14 CGPA" },
      { name: "Ku. Smita S. Olambe", rank: "VI", score: "9.09 CGPA" },
      { name: "Ku. Shilpa S. Vinchankar", rank: "VIII", score: "9.05 CGPA" },
    ],
  },
];
export const defaultPrideToppersME = [
  {
    year: "2017",
    records: [
      { name: "Ku. Komal Mahavir Thanvi", rank: "I", score: "8.96 CGPA" },
    ],
  },
  {
    year: "2016",
    records: [
      {
        name: "Ku. Kimaya Subhashrao Mesharam",
        rank: "II",
        score: "8.73 CGPA",
      },
    ],
  },
  {
    year: "2015",
    records: [
      { name: "Ku. Smitatai S. Metkar", rank: "II", score: "8.41 CGPA" },
    ],
  },
  {
    year: "2014",
    records: [
      { name: "Ku. Sharvari Mukund Waikar", rank: "II", score: "8.61 CGPA" },
      { name: "Ku. Ruchi Kadwane", rank: "III", score: "8.49 CGPA" },
    ],
  },
];
export const defaultPrideAlumni = [
  ["Abhay Wagh", "Director, DTE", "Mumbai"],
  ["Krishna Reddy", "Professor", "IIIT, Hyderabad"],
  ["Umesh B. Kaul", "General Manager", "IBM (I) Pvt. Ltd, Pune"],
  [
    "Ashutosh Deuskar",
    "Director",
    "Enhanced Software Solution Pvt. Ltd., Baner, Pune",
  ],
  [
    "Mahendra Kr. Kewalchandji Jain",
    "General Manager",
    "Sharp India Limited, Pune (MNC)",
  ],
  ["Prashant Karmarkar", "Vice President", "ACCENTURE Ltd, Thane"],
  ["Anurag M. Vashistha", "Sr. Vice President", "GTL Ltd, Navi Mumbai"],
  ["Rajendra S. Kute", "General Manager", "Areva TQP India Ltd, Mumbai"],
  ["Deepak Jalan", "Director", "SISPL Ltd, Jaipur"],
  ["Mr. Navneet Singh Gill", "Managing Director", "YOGIJI DIGI, Faridabad"],
  ["Mr. Sameer Bansal", "Director", "YOGIJI DIGI, Faridabad"],
  [
    "Dr. Pramod Chopde",
    "Regional Head (South) and General Manager",
    "JioFiber",
  ],
];

// ---------- Pride section Markdown converters ----------

export function entcPrideGateToMarkdown(gateData = []) {
  if (!Array.isArray(gateData) || gateData.length === 0) return "";
  return gateData
    .map((yearGroup) => {
      const title =
        yearGroup.title || `GATE Qualified Students ${yearGroup.year}`;
      const header = `## ${title}\n\n| Sr. No. | Name of Student | Class | Valid Score | Category |\n|---------|-----------------|-------|-------------|----------|`;
      if (!yearGroup.students || yearGroup.students.length === 0) {
        return `${header}\n| — | No records | — | — | — |`;
      }
      const rows = yearGroup.students
        .map((s) => `| ${s[0]} | ${s[1]} | ${s[2]} | ${s[3]} | ${s[4]} |`)
        .join("\n");
      return `${header}\n${rows}`;
    })
    .join("\n\n");
}

export function entcPrideToppersToMarkdown({ be = [], me = [] } = {}) {
  const renderSection = (label, data) => {
    const header = `## ${label}\n\n| Year | Name of the Student | University Rank | CGPA/Percentage |\n|------|---------------------|-----------------|-----------------|`;
    if (!data || data.length === 0) {
      return `${header}\n| — | No records | — | — |`;
    }
    const rows = data
      .flatMap((yearGroup) =>
        yearGroup.records.map(
          (r, i) =>
            `| ${i === 0 ? yearGroup.year : ""} | ${r.name} | ${r.rank} | ${r.score} |`,
        ),
      )
      .join("\n");
    return `${header}\n${rows}`;
  };
  return (
    renderSection("B.E. UNIVERSITY RANK HOLDERS", be) +
    "\n\n" +
    renderSection("M.E. UNIVERSITY RANK HOLDERS", me)
  );
}

export function entcPrideAlumniToMarkdown(
  alumniData = [],
  title = "Top Alumnis of Department",
) {
  const header = `## ${title}\n\n| S. N. | Names of Alumni | Position | Names of Organisation |\n|-------|-----------------|----------|----------------------|`;
  if (!alumniData || alumniData.length === 0) {
    return `${header}\n| — | No records | — | — |`;
  }
  const rows = alumniData
    .map((a, i) => `| ${i + 1}. | ${a[0]} | ${a[1]} | ${a[2]} |`)
    .join("\n");
  return `${header}\n${rows}`;
}

export function entcStudentProjectsToMarkdown(projectsData = {}) {
  return Object.keys(projectsData)
    .sort()
    .reverse()
    .map((year) => {
      const header = `## ${year}\n\n| Sr. No | Title of Project | Guided By | Award/Reward |\n|--------|-----------------|-----------|--------------|`;
      const projects = projectsData[year] || [];
      if (!projects.length)
        return `${header}\n| \u2014 | No records | \u2014 | \u2014 |`;
      const rows = projects
        .map((p) => `| ${p.no} | ${p.title} | ${p.guide} | ${p.award} |`)
        .join("\n");
      return `${header}\n${rows}`;
    })
    .join("\n\n");
}

export const defaultStudentProjects = {
  "2024-25": [
    {
      no: 1,
      title: "Child Vaccination and Reminder",
      guide: "Mr. V. K. Bhangdiya",
      award: "1st Rank",
    },
    {
      no: 2,
      title:
        "Design & Analysis of Microstrip Patch Antenna for C-Band and X-Band",
      guide: "Dr. D. P. Tulaskar",
      award: "1st Rank",
    },
    {
      no: 3,
      title: "Smart Neonatal Incubator for Temperature and Humidity Regulation",
      guide: "Mr. V. M. Umale",
      award: "2nd Rank",
    },
    {
      no: 4,
      title:
        "Design of Electronic module for fitness, health and safety in smart shoes",
      guide: "Dr. S B. Patil",
      award: "2nd Rank",
    },
  ],
  "2023-24": [
    {
      no: 1,
      title: "Design and Implementation of smart Spectacle for blind People",
      guide: "Dr. S B. Patil",
      award: "1st Rank",
    },
    {
      no: 2,
      title:
        "Design and development of seed/granule spreader mechanism for unmanned aerial vehicle (UAV)",
      guide: "Mr. V. S. Ingole",
      award: "1st Rank",
    },
    {
      no: 3,
      title: "E-notice board",
      guide: "Dr. M. N. Tibdewal",
      award: "2nd Rank",
    },
    {
      no: 4,
      title:
        "Design And Implementation of An Integrated Automation System for Organic Fertilizer",
      guide: "Mr. S. P. Badar",
      award: "2nd Rank",
    },
  ],
  "2022-23": [
    {
      no: 1,
      title: "Smart safety Jacket",
      guide: "Prof. A. N. Dolas",
      award: "1st Rank",
    },
    {
      no: 2,
      title: "Brain tumor detection using ML",
      guide: "Dr. P. R. Wankhede",
      award: "1st Rank",
    },
    {
      no: 3,
      title: "Design and development of water ionizer",
      guide: "Prof. V. M. Umale",
      award: "2nd Rank",
    },
    {
      no: 4,
      title: "Design and analysis of multiband micro strip patch antenna",
      guide: "Dr. S. B. Patil",
      award: "2nd Rank",
    },
  ],
  "2021-22": [
    {
      no: 1,
      title: "An automatic vacuum cleaning and swiping Robot",
      guide: "Dr R.S. Dhekekar",
      award: "1st Rank",
    },
    {
      no: 2,
      title: "Pneumonia Detection Techniques Through X-ray Imaging",
      guide: "Dr. M.N. Tibdewal",
      award: "1st Rank",
    },
    {
      no: 3,
      title: "The IOT Based Exercise Cycle",
      guide: "Prof. K.T. Kahar",
      award: "2nd Rank",
    },
    {
      no: 4,
      title: "Robotic Vehicle Surveillance System",
      guide: "Prof. V. S. Ingole",
      award: "2nd Rank",
    },
  ],
  "2020-21": [
    {
      no: 1,
      title: "IOT Based Smart Waste Management System",
      guide: "Dr. K. B. Khanchandani",
      award: "1st Rank",
    },
    {
      no: 2,
      title: "Smart Energy System with Paperless Billing",
      guide: "Dr. D. D. Nawgaje",
      award: "1st Rank",
    },
    {
      no: 3,
      title: "Medicaso- The online Medical Consultation",
      guide: "Prof. B. P. Harne",
      award: "2nd Rank",
    },
    {
      no: 4,
      title: "Designing Smart Card Interface IC 8024",
      guide: "Prof. V.K. Bhangdiya",
      award: "2nd Rank",
    },
  ],
  "2019-20": [
    {
      no: 1,
      title:
        "Spatio-temporal low frequency ambient noise mapping in indian ocean region using AIS data for marine conservation efforts to counter acoustic habitat degradation",
      guide: "Dr. G.S. Gawande",
      award: "1st Rank",
    },
    {
      no: 2,
      title: "Efficient E-Vehicle For Personal Transportation",
      guide: "Dr. R.S. Dhekekar",
      award: "1st Rank",
    },
    {
      no: 3,
      title:
        "Design & implement control system for net shade and polyhouse using IOT",
      guide: "Prof. V. M. Umale",
      award: "2nd Rank",
    },
    {
      no: 4,
      title: "Smart Agriculture System",
      guide: "Prof. V.K. Bhangdiya",
      award: "2nd Rank",
    },
  ],
};

export const defaultActivities = [
  {
    title: "Workshop on Design-Fabricate-programming of Microcontroller Board",
    date: "22nd to 25th March 2025",
    participants: "",
    organizer: "EXTC Department, SSGMCE",
    resource: "Prof. V.S. Ingole",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_25032025.jpg",
  },
  {
    title: "JUNOON",
    date: "08/03/2025",
    participants: "",
    organizer: "EXTC Department, SSGMCE",
    resource: "Bipin Mahore, Tanvi Kakad, Rajat Wankhede",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_08032025.jpg",
  },
  {
    title: "ASYLUM",
    date: "07/03/2025",
    participants: "80 Students",
    organizer: "EXTC Department, SSGMCE",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_07032025.jpg",
  },
  {
    title: "Alumni Faculty Student Interaction",
    date: "25/01/2025",
    participants: "",
    organizer: "EXTC Department, SSGMCE",
    resource: "Alumni's of SSGMCE EXTC branch",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_25012025.jpg",
  },
  {
    title: "Expert Talk on Carrier Guidance",
    date: "28/12/2024",
    participants: "",
    organizer: "EXTC Department, SSGMCE",
    resource: "Milind Mohite",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_28122024.jpg",
  },
  {
    title: "Know your Department for 1st year students",
    date: "24/09/2024",
    participants: "",
    organizer: "EXTC Department, SSGMCE",
    resource: "Dr. M. N. Tibdewal, Dr. K. T. Kahar, Mrs. K. S. Vyas",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_24092024.jpg",
  },
  {
    title:
      "Hands on Skill Development Program on Automation and Robotics (HMI, Drone Technologies, etc.)",
    date: "29th-30th Aug 2024 & 26th-27th Sept. 2024",
    participants: "",
    organizer: "EXTC Department, SSGMCE",
    resource: "Dr. R. S. Mahamune",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_29082024.jpeg",
  },
  {
    title: "Workshop on Electronics Component Testing and Verification",
    date: "22nd Aug 2024",
    participants: "",
    organizer: "EXTC Department & ISTE Student Chapter, SSGMCE",
    resource: "Mr. H. B. Patil and Mr. S. P. Satal",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_22082024.jpeg",
  },
  {
    title: "Workshop on Placement Strategies and Career Opportunities",
    date: "3rd Aug 2024",
    participants: "46 Students",
    organizer: "ISTE Student Chapter, SSGMCE",
    resource: "Mrs. A. A. Deshmukh",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_030820241.jpeg",
  },
  {
    title: "Workshop on Canva",
    date: "3rd Aug 2024",
    participants: "26 Students",
    organizer: "IEEE Student Chapter, SSGMCE",
    resource: "Mr. V. K. Bhangdiya",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_03082024.jpg",
  },
  {
    title:
      "Workshop on Design, Fabricate & Program an ESP 8266 Microcontroller board",
    date: "8th March to 11th March 2024",
    participants: "68 Students",
    organizer: "Prof. V. S. Ingole, FABLAB SSGMCE",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_11032024.png",
  },
  {
    title: "Workshop on Arduino Mastery",
    date: "13-14/03/2024",
    participants: "18 students",
    organizer:
      "ESSA Student Branch in association with IEEE Comsoc and IEEE WIE, SSGMCE",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_140324.png",
  },
  {
    title: "Workshop on ELECTROFIESTA",
    date: "15/03/2024",
    participants: "18 students",
    organizer:
      "ESSA Student Branch in association with IEEE Comsoc and IEEE WIE, SSGMCE",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_150324.png",
  },
  {
    title: "Workshop on Secret of Canva 2.0",
    date: "08th October 2023",
    participants: "29 students",
    organizer: "IEEE Student Branch, SSGMCE",
    resource: "ESSA Student Branch",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_081023.jpg.png",
  },
  {
    title: "Workshop on Robotics",
    date: "20-22nd October 2023",
    participants: "74 students",
    organizer: "IEEE Student Branch, SSGMCE",
    resource: "Mr. Shrikant Shitre",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_22102023.jpg",
  },
  {
    title: "Workshop on LATEX Software",
    date: "16 & 17 September 2023",
    participants: "22 students",
    organizer: "Ms. A. A. Deshmukh, ISTE Student chapter",
    resource:
      "Dr. N. S. Dharmale, Mr. R. S. Mahamune, EXTC Dept., SSGMCE, Shegaon",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_17092023.jpg",
  },
  {
    title: "Engineer's Day Celebration",
    date: "15 Sept. 2023",
    participants: "53 students",
    organizer:
      "ISTE Student chapter, Department Of Electronics And Telecommunication Engineering",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_15092023.png",
  },
  {
    title: "Orientation Program 1st year electronics engineering students",
    date: "25 August 2023",
    participants: "80 students",
    organizer:
      "ESSA Student Branch, Department Of Electronics And Telecommunication Engineering",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_250823.jpg.png",
  },
  {
    title: "Workshop on Microcontroller board Designing",
    date: "19th March to 22nd March 2023",
    participants: "10 Teams (3-4 members per Team)",
    organizer: "Prof. V. S. Ingole, FABLAB SSGMCE",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_22032023.jpg",
  },
  {
    title:
      "Three Days Hands-on Workshop on Basics of CMOS Design using Cadence",
    date: "6th to 8th January 2023 / 24th to 26th March 2023",
    participants: "38 students",
    organizer:
      "Department of Electronics and Telecommunication Engineering, SSGMCE, Shegaon",
    resource: "Mr. S. P. Badar",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_250323.jpg",
  },
  {
    title: "Project Exhibition",
    date: "7th Jan 2023",
    participants: "45 student Groups",
    organizer:
      "Department of Electronics and Telecommunication Engineering, SSGMCE, Shegaon",
    resource: "ISTE Student chapter",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_070012023.png",
  },
  {
    title: "Two Days Hands-on Workshop on CMOS Digital Circuit Design",
    date: "3rd – 4th December 2022",
    participants: "32 students",
    organizer:
      "Department of Electronics and Telecommunication Engineering, SSGMCE, Shegaon",
    resource: "Mr. S. P. Badar",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_04122022.jpg",
  },
  {
    title:
      "Three Days Hands-on Workshop on Verilog – Hardware Description Language",
    date: "4th to 6th March 2022",
    participants: "11 students",
    organizer:
      "Department of Electronics and Telecommunication Engineering, SSGMCE, Shegaon",
    resource: "Mr. S. P. Badar",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_04032022.jpg",
  },
  {
    title:
      "Guest Lecture on Industrial Approach in Electronics & Arduino Programing",
    date: "14th Mar. 2022",
    participants: "All EXTC students",
    organizer:
      "Prof. A.A. Deshmukh, Dept. of EXTC & ISTE Student chapter, SSGMCE, Shegaon",
    resource:
      "Mr. Sanjay A. Choudhary, Director Electronic Study Center, Nashik",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_14032022.jpg",
  },
  {
    title:
      "Best Practices in the Department - Skill Development Programs for Students and Staff",
    date: "",
    participants: "",
    organizer:
      "Department of Electronics and Telecommunication Engineering, SSGMCE, Shegaon",
    resource: "",
    image: "https://www.ssgmce.ac.in/images/extc_faculty/Skill-Development.jpg",
  },
  {
    title: "One Week online Workshop on CMOS Digital Circuit Design",
    date: "8th to 12th February 2021",
    participants: "Faculty Members and Students from Outside SSGMCE",
    organizer: "Dept. of EXTC and IEEE Students Branch SSGMCE, Shegaon",
    resource: "Prof. S.P.Badar",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_12Feb20211.jpg",
  },
  {
    title:
      "Two Week Online Hands-On Training Programme on RF Circuits and Antennas",
    date: "01-12 February, 2021",
    participants: "Faculty Members and Students from Outside SSGMCE",
    organizer: "Dept. of EXTC, SSGMCE, Shegaon",
    resource: "Dr. P. R. Wankhede and Prof. V. V. Ratnaparkhi",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_12Feb2021.jpg",
  },
  {
    title: "Webinar on Role of Electronics Engineer in Industry",
    date: "27th Oct. 2020",
    participants: "All EXTC students",
    organizer: "Dr. D. P. Tulaskar, Dept. of EXTC, SSGMCE, Shegaon",
    resource:
      "Mr. Sanjay A. Choudhary, Director Electronic Study Center, Nashik",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/Webinar_on_role_of_electronics_engineer.jpg",
  },
  {
    title:
      "AICTE-ATAL sponsored Five days FDP on Internet of Things for Agriculture",
    date: "5th to 9th October 2020",
    participants: "200 students",
    organizer: "Dept. of EXTC, SSGMCE, Shegaon",
    resource: "Dr. P.R.Wankhede",
    image: "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_python.jpg",
  },
  {
    title: "International Webinar on Wireless Communication(6G) and IoT",
    date: "12 August 2020",
    participants: "1860 Students/Faculty All over the World",
    organizer: "Dept. of EXTC, SSGMCE, Shegaon",
    resource:
      "Dr Anand Nayyar, Researcher and Scientist, Duy Tan University, Da Nang, Vietnam",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_Int_webinar.jpg",
  },
  {
    title:
      "One Week Online Hands-on Workshop on Wire Antennas: Design, Analysis and Optimization using 4nEC2X",
    date: "03-07 August 2020",
    participants: "Faculty Members and Students from Outside SSGMCE",
    organizer: "Department of EXTC, SSGMCE and SublunarCo, Pune",
    resource: "Prof. V. V. Ratnaparkhi",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_07Aug2020.jpg",
  },
  {
    title:
      "One Day Community Development program (CDP) on Electronic Engineering Equipments and Their Applications",
    date: "3rd January 2020",
    participants: "32 students of Jr. College Shegaon",
    organizer: "EXTC department, SSGMCE, Shegaon",
    resource: "Prof V.N.Bhonge and Dr.D.P.Tulaskar",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_01012020.jpg",
  },
  {
    title:
      "Faculty Development Programme on Robotics and Artificial Intelligence",
    date: "24th June to 28th June 2019",
    participants: "24 faculty members across the country",
    organizer:
      "EXTC department, SSGMCE, Shegaon (Remote Center) and E & ICT Academy, IIITDM Jabalpur",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_FDPJune19.jpg",
  },
  {
    title: "Two Week Summer School on CMOS VLSI Circuit Design using Cadence",
    date: "17th June – 29th June 2019",
    participants: "17 participated",
    organizer:
      "Department of Electronics and Telecommunication, SSGMCE, Shegaon",
    resource: "Dr. K. B. Khanchandani, Prof. S. P. Badar",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_VLSI.jpg",
  },
  {
    title: "Two Week Summer School on Smart Systems and Internet of Things",
    date: "17th June – 29th June 2019",
    participants: "15 participated",
    organizer: "EXTC Department, SSGMCE, Shegaon",
    resource: "Dr. K. B. Khanchandani, Prof. P. R. Wankhede",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_SSIoT.jpg",
  },
  {
    title: "Two Days Workshop on Hands on VLSI Circuit Design using Cadence",
    date: "2nd-3rd March 2019 and 16th-17th March 2019",
    participants: "42 participated",
    organizer: "EXTC Department, SSGMCE, Shegaon",
    resource: "Prof. S. P. Badar",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_march2019.png",
  },
  {
    title:
      "Faculty Development Programme on Computer Vision and Machine Learning",
    date: "03-07 Dec 2018",
    participants: "48 faculty members across the country",
    organizer: "EXTC Department, SSGMCE, Shegaon",
    resource: "Prof. Vikas. K. Bhangdiya",
    image: "https://www.ssgmce.ac.in/images/extc_faculty/FDP_VKB.jpg",
  },
  {
    title: "Three Days Workshop on Hands on Digital VLSI Design using Xilinx",
    date: "8th-10th September 2018 and 21st-23rd September 2018",
    participants: "35 Students",
    organizer: "EXTC Department, SSGMCE, Shegaon",
    resource: "Prof. S. P. Badar",
    image:
      "https://www.ssgmce.ac.in/images/extc_faculty/EXTC_Activity_Sept2018.png",
  },
];

export const defaultPlacements = {
  summary: [
    { year: "2024-25", count: "25*", id: "2024-25" },
    { year: "2023-24", count: "72", id: "2023-24" },
    { year: "2022-23", count: "73", id: "2022-23" },
    { year: "2021-22", count: "73", id: "2021-22" },
    { year: "2020-21", count: "106", id: "2020-21" },
    { year: "2019-20", count: "61", id: "2019-20" },
    { year: "2018-19", count: "54", id: "2018-19" },
  ],
  details: {
    "2024-25": [
      {
        name: "Niharika Dagaonkar",
        company: "Bristlecone India Limited, Mumbai",
        ctc: "4.25 LPA",
      },
      {
        name: "Swapnil Tathe",
        company: "Bristlecone India Limited, Mumbai",
        ctc: "4.25 LPA",
      },
      {
        name: "Samiksha Wagh",
        company: "Fox Solutions Pvt. Ltd., Nashik",
        ctc: "3.6 LPA",
      },
      {
        name: "Sanchit Thakare",
        company: "Cadence India Limited, Pune",
        ctc: "6 LPA",
      },
      {
        name: "Shradha Gawande",
        company: "Cadence India Limited, Pune",
        ctc: "6 LPA",
      },
      {
        name: "Amit Risodkar",
        company: "SCOPE T&M Pvt. Ltd., Pune",
        ctc: "4.5 LPA",
      },
      {
        name: "Rutvij Hiwrale",
        company: "SCOPE T&M Pvt. Ltd., Pune",
        ctc: "4.5 LPA",
      },
      {
        name: "Vishad Pandav",
        company: "SCOPE T&M Pvt. Ltd., Pune",
        ctc: "4.5 LPA",
      },
      {
        name: "Yash Dalal",
        company: "SCOPE T&M Pvt. Ltd., Pune",
        ctc: "4.5 LPA",
      },
      {
        name: "Abhay Sharma",
        company: "SM Technologies Pvt. Ltd., Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Anuja Lande",
        company: "SM Technologies Pvt. Ltd., Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Shreyash Warganttiwar",
        company: "Zoho Corporation, Nagpur",
        ctc: "6 LPA",
      },
      {
        name: "Prajwal Dabre",
        company: "KI-Tech Pvt. Ltd., Hyderabad",
        ctc: "5 LPA",
      },
      {
        name: "Sakshi Dandale",
        company: "KI-Tech Pvt. Ltd., Hyderabad",
        ctc: "5 LPA",
      },
      {
        name: "Bhakti Bal",
        company: "PHN Technology Pvt. Ltd., Pune",
        ctc: "5.6 LPA",
      },
      {
        name: "Shweta Chaudhari",
        company: "PHN Technology Pvt. Ltd., Pune",
        ctc: "5.6 LPA",
      },
      {
        name: "Akanksha Tale",
        company: "PHN Technology Pvt. Ltd., Pune",
        ctc: "5.6 LPA",
      },
      {
        name: "Prasad Deshmukh",
        company: "CANPACK India Pvt. Ltd., Chh.Sambhajinagar",
        ctc: "4 LPA",
      },
      { name: "Ashish Lichode", company: "PRS Group Chennai", ctc: "3.8 LPA" },
      {
        name: "Jatin Soni",
        company: "Micron Semiconductor Technology India, Ahmedabad, Gujarat",
        ctc: "9 LPA",
      },
      {
        name: "Jay Oak",
        company: "Micron Semiconductor Technology India, Ahmedabad, Gujarat",
        ctc: "9 LPA",
      },
      {
        name: "Mayur Borle",
        company: "Micron Semiconductor Technology India, Ahmedabad, Gujarat",
        ctc: "9 LPA",
      },
      {
        name: "Prajwal Dabre",
        company: "Micron Semiconductor Technology India, Ahmedabad, Gujarat",
        ctc: "9 LPA",
      },
      {
        name: "Tejas Kale",
        company: "Idea Forge Limited Mumbai",
        ctc: "7 LPA",
      },
      {
        name: "Sahil Mathurkar",
        company: "Idea Forge Limited Mumbai",
        ctc: "7 LPA",
      },
    ],
    "2023-24": [
      {
        name: "Sharayu Lavhale",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Tanvi Jeurkar",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Toshalkumar Ravindra Narkhede",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Yash Vilas Hiwanj",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Bhavana Vikram Fuse",
        company: "Varroc Polymer, Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Janhavi Gajanan Mudholkar",
        company: "Varroc Polymer, Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Janhvee Pradip Mahajan",
        company: "Varroc Polymer, Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Payal Sanjay Talmale",
        company: "Varroc Polymer, Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Pooja Anilkumar Tawari",
        company: "Capgemini Technology Services India Ltd., Navi Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Shivani Shyam More",
        company:
          "YRC Software India LLP, Pune / ESAF Small Finance Bank, Thrissur, Kerala",
        ctc: "3.5 LPA",
      },
      {
        name: "Gaurav Dudhkohale",
        company: "Zoho Corporation Pvt. Ltd., Nagpur",
        ctc: "6 LPA",
      },
      {
        name: "Gauri Vijay Jalamkar",
        company: "Zoho Corporation Pvt. Ltd., Nagpur",
        ctc: "6 LPA",
      },
      {
        name: "Kartik Eknath",
        company: "Zoho Corporation Pvt. Ltd., Nagpur",
        ctc: "6 LPA",
      },
      {
        name: "Divya Sonar",
        company: "FACE Prep., Coimbatore",
        ctc: "3.5 LPA",
      },
      { name: "Ram Ingle", company: "Bitwise, Pune", ctc: "4 LPA" },
      {
        name: "Anantkumar Patil",
        company: "SISL Infotech Pvt. Ltd., New Delhi",
        ctc: "4.5 LPA",
      },
      {
        name: "Krishna Shende",
        company: "Bharat Forge Ltd., Pune",
        ctc: "5 LPA",
      },
      {
        name: "Kirti Arun Raut",
        company: "Bristlecone India Limited, Mumbai",
        ctc: "4.25 LPA",
      },
      {
        name: "Unnati Kiranrao Kharate",
        company: "Bristlecone India Limited, Mumbai",
        ctc: "4.25 LPA",
      },
      {
        name: "Pooja Pramod Masne",
        company: "Varroc Polymer, Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Shruti Ingale",
        company: "Batterfly Next, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Manali Arun Patil",
        company: "Capgemini Technology Services India Ltd., Navi Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Nikita Eknath Jadhav",
        company: "Capgemini Technology Services India Ltd., Navi Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Sejal Raju Shripat",
        company: "Capgemini Technology Services India Ltd., Navi Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Mrunal Wanraj Pimpalkr",
        company: "COREFLEX., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Anand Shantaram Sardar",
        company: "ESAF Small Finance Bank, Thrissur, Kerala",
        ctc: "3.5 LPA",
      },
      {
        name: "Mrunal Kishor Patil",
        company: "ESAF Small Finance Bank, Thrissur, Kerala",
        ctc: "3.5 LPA",
      },
      {
        name: "Pawan Bhikaji Bhagat",
        company: "ESAF Small Finance Bank, Thrissur, Kerala",
        ctc: "3.5 LPA",
      },
      {
        name: "Rajat Kiran Patil",
        company: "Fox Solutions Pvt Ltd., Nashik",
        ctc: "3.6 LPA",
      },
      {
        name: "Shivam Devidas Kale",
        company: "General Industrial Contols Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Shivam Sawale",
        company: "General Industrial Contols Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Yash Shrihari Khond",
        company: "General Industrial Contols Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Rishav Rajesh Chandravanshi",
        company: "Genpact India Pvt. Ltd., Pune",
        ctc: "4.5 LPA",
      },
      {
        name: "Atharv Ravindra Bokade",
        company: "IRIS Business Services Ltd., Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Rupali Abhimanyu Khond",
        company: "Legrand India Pvt. Ltd., Jalgaon",
        ctc: "4 LPA",
      },
      {
        name: "Mayur Omprakash Amodkar",
        company: "Lions Crew, Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Lokesh Milind Hiwarkar",
        company: "Maksenta Engineering Resource Pvt. Ltd., Nagpur",
        ctc: "4 LPA",
      },
      {
        name: "Hussain Murtaza Darbar",
        company: "Micropro Software Solutions Limited, Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Sakshi Pramod Patil",
        company: "Micropro Software Solutions Limited, Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Tejas Arvind Harshe",
        company: "Micropro Software Solutions Limited, Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Yukta Pradip Morey",
        company: "Micropro Software Solutions Limited, Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Arya Rajesh Chaudhawanshi",
        company: "Quality Kiosk, Mumbai",
        ctc: "4.5 LPA",
      },
      {
        name: "Vaishnavi Pradeep Gawande",
        company: "Renishaw Metrology Systems Limited, Pune",
        ctc: "5 LPA",
      },
      {
        name: "Abhishek Sunil Bawane",
        company: "SN Hifi Consulting Engineers Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Neha Bedare",
        company: "SS Natu P&M Pvt. Ltd., Thane",
        ctc: "3.5 LPA",
      },
      {
        name: "Sakshi Pimparkar",
        company: "SS Natu P&M Pvt. Ltd., Thane",
        ctc: "3.5 LPA",
      },
      { name: "Krunal Bobade", company: "TCS Limited, Pune", ctc: "3.36 LPA" },
      {
        name: "Pratik Dnyaneshwar Kolaskar",
        company: "TCS Limited, Pune/Nagpur",
        ctc: "3.36 LPA",
      },
      {
        name: "Aditi M. Deshmukh",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Chetan Pramod Duratkar",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Gaurav Ghogle",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Isha Kulkarni",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Ravi Sunilkumar Rathi",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Mrudula Rajesh Agrawal",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Prasad Gajanan Unone",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Pratham Chandrakant Dhobe",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Rajat Suresh Chavan",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Aditya Fundkar",
        company: "Akiti Technologies Pvt.Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Sarla Paraskar",
        company: "Adolf Solutions(OPC) Pvt. Ltd., Pune",
        ctc: "3.5 LPA",
      },
      { name: "Shreyash Uttamrao Gohad", company: "CDAC Pune", ctc: "4.5 LPA" },
      {
        name: "Manan Goel",
        company: "Indian Naval Academy",
        ctc: "Officer Grade",
      },
      {
        name: "Prasad Anil Telkar",
        company: "Intelux Electronics Pvt.Ltd, Pune",
        ctc: "4 LPA",
      },
      {
        name: "Saumitra Shardul Digambar",
        company: "Intelux Electronics Pvt.Ltd, Pune",
        ctc: "4 LPA",
      },
      {
        name: "Shreyash Dharashivkar",
        company: "IG Drives and System, Pune",
        ctc: "4 LPA",
      },
      {
        name: "Saurabh Chavhan",
        company: "Cognizant Technology Solutions India Private Limited, Pune",
        ctc: "4 LPA",
      },
      {
        name: "Shantanu Kishor Patil",
        company: "Nuagecx Consultants Pune",
        ctc: "4 LPA",
      },
      {
        name: "Prathamesh Dinesh Gattani",
        company: "Dreamz Technology Pune",
        ctc: "4 LPA",
      },
    ],
    "2022-23": [
      {
        name: "Abhijeet Patil",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Aman Raut",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Aniruddha Deshmukh",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Ashita Tikhe",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Hrituja Chandel",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Manasi More",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Prajwal Falake",
        company: "Tata Consultancy Servies Ltd., Pune / Expleo group, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Priti Mankar",
        company:
          "Tata Consultancy Servies Ltd., Pune / MarquarDT India Pvt. Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Rahul Patil",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Sejal Ganesh",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Shrawani Rele",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Stuti Bokey",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Tushar Nagre",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Vaibhav Deshmukh",
        company: "Tata Consultancy Servies Ltd., Pune",
        ctc: "3.36 LPA",
      },
      { name: "Yash Saiwal", company: "Adani group, Thane", ctc: "4 LPA" },
      {
        name: "Abhay Tiwari",
        company: "Hexaware Technologies, Pune",
        ctc: "4 LPA",
      },
      {
        name: "Bhushan Nemade",
        company: "Hexaware Technologies, Pune",
        ctc: "4 LPA",
      },
      {
        name: "Om Nalamwar",
        company: "Tech Mahindra Ltd., Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Tejas Chavhan",
        company: "Tech Mahindra Ltd., Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Tejas Shivrame",
        company: "Tech Mahindra Ltd., Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Vaibhav Mhasal",
        company: "SankeBusiness solutions, Pvt. Ltd., Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Yash Khandare",
        company: "Sanket Business solutions, Pvt. Ltd., Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Pallavi Navghare",
        company: "Expleo group, Pune / Adani group, Thane",
        ctc: "4 LPA",
      },
      { name: "Shreya Gaikwad", company: "Expleo group, Pune", ctc: "4 LPA" },
      { name: "Suchitra Nair", company: "Expleo group, Pune", ctc: "4 LPA" },
      {
        name: "Kalyani Bhagwat",
        company: "ABB Limited, Nashik",
        ctc: "4.5 LPA",
      },
      {
        name: "Shwetatai Bhagat",
        company:
          "ABB Limited, Nashik / Trimasys Control Solutions Pvt. Ltd., Pune",
        ctc: "4.5 LPA",
      },
      {
        name: "Aniruddha Wankhade",
        company: "Recknosys Tech Labs Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      { name: "Sumit Bhute", company: "Adani group, Thane", ctc: "4 LPA" },
      {
        name: "Gayatri Kungade",
        company: "Planet Spark, Gurgaon / Clariant Power Systems Limited, Pune",
        ctc: "4 LPA",
      },
      { name: "Janhavi Saoji", company: "Planet Spark, Gurgaon", ctc: "4 LPA" },
      {
        name: "Disha Nagpal",
        company: "Pregrad, Noida / BYJU's, Bangalore",
        ctc: "3.5 LPA",
      },
      { name: "Hardik Mofghare", company: "Pregrad, Noida", ctc: "3.5 LPA" },
      { name: "Harshita Wankhade", company: "Pregrad, Noida", ctc: "3.5 LPA" },
      { name: "Namrata Kherde", company: "Pregrad, Noida", ctc: "3.5 LPA" },
      {
        name: "Vaishnavi Gawande",
        company:
          "Pregrad, Noida / Micropro Software Solutions Pvt. Ltd., Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Anupriya Vijay Lohkar",
        company: "FACE Prep., Coimbatore",
        ctc: "3.5 LPA",
      },
      {
        name: "Aishwarya Dhongdi",
        company: "FACE Prep., Coimbatore",
        ctc: "3.5 LPA",
      },
      {
        name: "Dnyaneshwari Khade",
        company:
          "Trimasys Control Solutions Pvt. Ltd., Pune / SCOPE T&M Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Gaurav Chavhan",
        company: "Trimasys Control Solutions Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Kartik Bhuibhar",
        company: "Trimasys Control Solutions Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Mitali Shegokar",
        company: "Trimasys Control Solutions Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Prasad Shingnapure",
        company:
          "Trimasys Control Solutions Pvt. Ltd., Pune / ApexiqA Technologies Pvt. Ltd., Delhi",
        ctc: "4 LPA",
      },
      {
        name: "Pratik Hage",
        company:
          "Trimasys Control Solutions Pvt. Ltd., Pune / Clariant Power Systems Limited, Pune",
        ctc: "4 LPA",
      },
      {
        name: "Gaurav Bandhaokar",
        company: "Collabera Services Pvt. Ltd., Vadodara",
        ctc: "4 LPA",
      },
      {
        name: "Vidhi Parashar",
        company: "MarquarDT India Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Lalit Pathade",
        company: "SCOPE T&M Pvt. Ltd., Pune",
        ctc: "4.5 LPA",
      },
      {
        name: "Radhika Mirge",
        company: "SCOPE T&M Pvt. Ltd., Pune",
        ctc: "4.5 LPA",
      },
      {
        name: "Vaishnavi Chavan",
        company: "SCOPE T&M Pvt. Ltd., Pune",
        ctc: "4.5 LPA",
      },
      {
        name: "Prem Prakash Hargunai",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Rohit Narayan Nirgudwar",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Dipak Prakash Deshmukh",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Ankita Uddhav Sonone",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Nitin Fokmare",
        company: "Metalman Autocomp Pvt. Ltd., Aurangabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Tanavi Borse",
        company: "Metalman Autocomp Pvt. Ltd., Aurangabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Sejal Vijay Kurhade",
        company: "Umasons Auto Pvt. Ltd., Aurangabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Shraddha Bhore",
        company: "Umasons Auto Pvt. Ltd., Aurangabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Ashutosh Kurhade",
        company: "Micropro Software Solutions Pvt. Ltd., Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Bhargavi Deshmukh",
        company: "Micropro Software Solutions Pvt. Ltd., Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Dnyaneshwari Nare",
        company: "Micropro Software Solutions Pvt. Ltd., Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Rutuja Modak",
        company: "Micropro Software Solutions Pvt. Ltd., Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Shruti Jumale",
        company: "Micropro Software Solutions Pvt. Ltd., Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Tejal Chandure",
        company: "Micropro Software Solutions Pvt. Ltd., Nagpur",
        ctc: "3.5 LPA",
      },
      {
        name: "Vaishnavi Kharche",
        company: "Micropro Software Solutions Pvt. Ltd., Nagpur",
        ctc: "3.5 LPA",
      },
      { name: "Ravi Aswar", company: "ShellCode, Pune", ctc: "4 LPA" },
      { name: "Mayuri Torankar", company: "ShellCode, Pune", ctc: "4 LPA" },
      { name: "Shreya Pande", company: "BYJU's, Bangalore", ctc: "4 LPA" },
      {
        name: "Vaishnavi Rakhonde",
        company: "BYJU's, Bangalore / Mechatronics System Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Pallavi Diware",
        company: "Mechatronics System Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Prajakta Gotpagar",
        company: "Mechatronics System Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Sumedh Mankar",
        company: "Mechatronics System Pvt. Ltd., Pune",
        ctc: "4 LPA",
      },
      {
        name: "Anant Gabhane",
        company: "ApexiqA Technologies Pvt. Ltd., Delhi",
        ctc: "4 LPA",
      },
      {
        name: "Ashwini Kharode",
        company: "Metalman Autocomp Pvt. Ltd., Aurangabad",
        ctc: "3.5 LPA",
      },
    ],
    "2021-22": [
      {
        name: "Ashwini Sangle",
        company: "Adani Enterprises Limited",
        ctc: "6 LPA",
      },
      {
        name: "Komal Nemade",
        company: "Birlasoft (India) Limited",
        ctc: "4 LPA",
      },
      {
        name: "Gauri Jadhav",
        company: "Bizsense Solutions Pvt Ltd",
        ctc: "4.8 LPA",
      },
      {
        name: "Yogesh Kathale",
        company: "Bizsense Solutions Pvt Ltd",
        ctc: "4.8 LPA",
      },
      { name: "Nimmish Hatwar", company: "BYJUS", ctc: "6 LPA" },
      {
        name: "Adhiraj Sapkal",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Aditi Khandare",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Ashwini Sonone",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Dhiraj Thate",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Gayatri Dhote",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Hariom Modokar",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Kshitij Mowar",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Mansi Kulkarnatni",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Pradnya More",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Rutika Deshmukh",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Shubhada Ingle",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Vaishnavi Gulwe",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Vishakha Darshanala",
        company: "Capgemini Technology Services India Ltd, Mumbai",
        ctc: "4 LPA",
      },
      {
        name: "Ankush Bharambe",
        company: "Coditas Solutions LLP, Pune",
        ctc: "6 LPA",
      },
      {
        name: "Abhijeet Jawanjalkar",
        company: "Cognitive Design Technology Pvt.Ltd, Bangalore",
        ctc: "5 LPA",
      },
      {
        name: "Rohit Dodke",
        company: "Evosys Global Ahmedabad",
        ctc: "3.6 LPA",
      },
      {
        name: "Sameer Zopate",
        company: "Evosys Global Ahmedabad",
        ctc: "3.6 LPA",
      },
      {
        name: "Anmol Soni",
        company: "Global Logic India Pvt Ltd, Nagpur",
        ctc: "5.5 LPA",
      },
      { name: "Omkar Kulkarni", company: "HDFC Bank, Mumbai", ctc: "8.00 LPA" },
      {
        name: "Anurag Deshmukh",
        company: "HDFC Life Insurance Company, Mumbai",
        ctc: "6.5 LPA",
      },
      {
        name: "Milind Sultane",
        company: "HDFC Life Insurance Company, Mumbai",
        ctc: "6.5 LPA",
      },
      {
        name: "Moh Rahil",
        company: "HDFC Life Insurance Company, Mumbai",
        ctc: "6.5 LPA",
      },
      {
        name: "Pranav Bhople",
        company: "Hexaware Technologies, Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Piyush Bhiwalwar",
        company: "InfoCepts Technology, Nagpur",
        ctc: "3.62 LPA",
      },
      {
        name: "Purva Ambadkar",
        company: "InfoCepts Technology, Nagpur",
        ctc: "3.62 LPA",
      },
      {
        name: "Riya Rathod",
        company: "InfoCepts Technology, Nagpur",
        ctc: "3.62 LPA",
      },
      {
        name: "Aysha Hattel",
        company: "Infosys Ltd, Bangalore",
        ctc: "3.6 LPA",
      },
      {
        name: "Srishti Thorat",
        company: "Infosys Ltd, Bangalore",
        ctc: "3.6 LPA",
      },
      {
        name: "Abhinav Sawarkar",
        company: "Persistent SystemsPvt Ltd Nagpur",
        ctc: "4.71 LPA",
      },
      {
        name: "Himal Wankhade",
        company: "Persistent SystemsPvt Ltd Nagpur",
        ctc: "4.71 LPA",
      },
      {
        name: "Mandeepsingh Bagga",
        company: "Persistent SystemsPvt Ltd Nagpur",
        ctc: "4.71 LPA",
      },
      {
        name: "Pranjali Amalkar",
        company: "Persistent SystemsPvt Ltd Nagpur",
        ctc: "4.71 LPA",
      },
      {
        name: "Rushikesh Yelane",
        company: "Persistent SystemsPvt Ltd Nagpur",
        ctc: "4.71 LPA",
      },
      {
        name: "Sudarshan Vaidya",
        company: "Persistent SystemsPvt Ltd Nagpur",
        ctc: "4.71 LPA",
      },
      {
        name: "Vedant Khandokar",
        company: "Persistent SystemsPvt Ltd Nagpur",
        ctc: "4.71 LPA",
      },
      {
        name: "Yash Kulthe",
        company: "Persistent SystemsPvt Ltd Nagpur",
        ctc: "4.71 LPA",
      },
      {
        name: "Ayahi Raut",
        company: "Synedyne Systems Pvt. Ltd., Bengaluru",
        ctc: "3.71 LPA",
      },
      {
        name: "Aditya Kathane",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Akash Chandere",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Dnyaneshwari Dhage",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Jagruti Bisen",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Laxmi Harne",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Pallavi Bharsakale",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Prajakta Sangle",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Pratishu Kharde",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Sanika Deshmukh",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Shailesh Gawande",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Vaishnavi Tawale",
        company: "Tata Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Ashutosh Bhelonde",
        company: "TietoEVRY India, Pune (through firstnaukri.com)",
        ctc: "4.5 LPA",
      },
      {
        name: "Gatha Bhusari",
        company: "TietoEVRY India, Pune (through firstnaukri.com)",
        ctc: "4.5 LPA",
      },
      {
        name: "Murees Shaikh",
        company: "TietoEVRY India, Pune (through firstnaukri.com)",
        ctc: "4.5 LPA",
      },
      {
        name: "Riddhi Jain",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Sandesh Mishra",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Vaishnavi Vyawahare",
        company: "ValueMomentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "4 LPA",
      },
      {
        name: "Pratik Bhusari",
        company: "Virtusa Consulting Services Pvt. Ltd., Pune",
        ctc: "6.50 LPA",
      },
      {
        name: "Aakanksha Darvankar",
        company: "Wipro Limited, Pune",
        ctc: "3.50 LPA",
      },
      {
        name: "Akash Parmeshwar",
        company: "Wipro Limited, Pune",
        ctc: "3.50 LPA",
      },
      { name: "Omkar Bodhe", company: "Wipro Limited, Pune", ctc: "3.50 LPA" },
      {
        name: "Priyanka Chavan",
        company: "Wipro Limited, Pune",
        ctc: "3.50 LPA",
      },
      {
        name: "Sakshi Huddar",
        company: "Wipro Limited, Pune",
        ctc: "3.50 LPA",
      },
      {
        name: "Sharwari Borgainwar",
        company: "Wipro Limited, Pune",
        ctc: "3.50 LPA",
      },
      {
        name: "Shraddha Khatri",
        company: "Wipro Limited, Pune",
        ctc: "3.50 LPA",
      },
      {
        name: "Sumit Kulwant",
        company: "Wipro Limited, Pune",
        ctc: "3.50 LPA",
      },
      {
        name: "Akshay Nutiwar",
        company: "Zensar Technologies, Pune",
        ctc: "4 LPA",
      },
      {
        name: "Divya Wagh",
        company: "Zensar Technologies, Pune",
        ctc: "4 LPA",
      },
      {
        name: "Karamvir Chandel",
        company: "Zensar Technologies, Pune",
        ctc: "4 LPA",
      },
      {
        name: "Shraddha Bhambere",
        company: "Zensar Technologies, Pune",
        ctc: "4 LPA",
      },
    ],
    "2020-21": [
      { name: "Aachal Mishra", company: "Accenture Limited", ctc: "4.5 LPA" },
      { name: "Harshada Babar", company: "Accenture Limited", ctc: "4.5 LPA" },
      { name: "Harshada Saraf", company: "Accenture Limited", ctc: "4.5 LPA" },
      { name: "Manish Tinkhede", company: "Accenture Limited", ctc: "4.5 LPA" },
      { name: "Mohit Vyas", company: "Accenture Limited", ctc: "4.5 LPA" },
      {
        name: "Rushikesh Londhe",
        company: "Accenture Limited",
        ctc: "4.5 LPA",
      },
      {
        name: "Sharvari Bhojane",
        company: "Accenture Limited",
        ctc: "4.5 LPA",
      },
      { name: "Swati Bajode", company: "Accenture Limited", ctc: "4.5 LPA" },
      {
        name: "Gauri Barhe",
        company: "Atos Global IT Solutions and Services pvt Ltd., Pune",
        ctc: "3.10 LPA",
      },
      {
        name: "Sakshi Arewar",
        company: "Atos Global IT Solutions and Services pvt Ltd., Pune",
        ctc: "3.10 LPA",
      },
      {
        name: "Sakshi Bobade",
        company: "Atos Global IT Solutions and Services pvt Ltd., Pune",
        ctc: "3.10 LPA",
      },
      {
        name: "Vedika Khade",
        company: "Atos Global IT Solutions and Services pvt Ltd., Pune",
        ctc: "3.10 LPA",
      },
      {
        name: "Lokesh Jadhav",
        company: "Benchmark IT Solutions (I) pvt. Ltd",
        ctc: "4.5 LPA",
      },
      { name: "Kaushik Vora", company: "BYJU's, Mumbai", ctc: "7 LPA" },
      { name: "Piyush Bhomale", company: "BYJU's, Mumbai", ctc: "7 LPA" },
      {
        name: "Avinash Burkule",
        company: "Capgemini Technology Services India Limited, Navi Mumbai",
        ctc: "3 LPA",
      },
      {
        name: "Janhvi Wanjari",
        company: "Capgemini Technology Services India Limited, Navi Mumbai",
        ctc: "3 LPA",
      },
      {
        name: "Kirti Untwal",
        company: "Capgemini Technology Services India Limited, Navi Mumbai",
        ctc: "3 LPA",
      },
      {
        name: "Abhishek Atant",
        company:
          "Cognizant Technology Solutions India Private Limited, Chennai",
        ctc: "4.01 LPA",
      },
      {
        name: "Abhishek Thakur",
        company:
          "Cognizant Technology Solutions India Private Limited, Chennai",
        ctc: "4.01 LPA",
      },
      {
        name: "Pragati Wankhade",
        company:
          "Cognizant Technology Solutions India Private Limited, Chennai",
        ctc: "4.01 LPA",
      },
      {
        name: "Prasad Dhokane",
        company:
          "Cognizant Technology Solutions India Private Limited, Chennai",
        ctc: "4.01 LPA",
      },
      {
        name: "Sayali Kulkarni",
        company:
          "Cognizant Technology Solutions India Private Limited, Chennai",
        ctc: "4.01 LPA",
      },
      {
        name: "Sanket Devghare",
        company: "Dassault Systems Solutions Lab Pvt. Ltd.,Pune",
        ctc: "5.50 LPA",
      },
      {
        name: "Ajinkya Joshi",
        company: "eInfochips Pvt Ltd., Ahmedabad",
        ctc: "3.60 LPA",
      },
      {
        name: "Asmita Unhale",
        company: "eInfochips Pvt Ltd., Ahmedabad",
        ctc: "3.60 LPA",
      },
      {
        name: "Shreyash Pole",
        company: "eInfochips Pvt Ltd., Ahmedabad",
        ctc: "3.60 LPA",
      },
      { name: "Amruta Zanjad", company: "FACE Prep", ctc: "3.06 LPA" },
      {
        name: "Swapnil Rathod",
        company: "FECUND Software Services Pvt. Ltd.",
        ctc: "3.50 LPA",
      },
      {
        name: "Gita Atkare",
        company: "Infosys Limited, Bangalore",
        ctc: "3 LPA",
      },
      {
        name: "Samiksha Kadu",
        company: "Infosys Limited, Bangalore",
        ctc: "3 LPA",
      },
      {
        name: "Varshnavi Tilokar",
        company: "Infosys Limited, Bangalore",
        ctc: "3 LPA",
      },
      {
        name: "Rahul Khoriya",
        company: "InfovisionVision Labs India Pvt. Ltd., Pune",
        ctc: "3.5 LPA",
      },
      {
        name: "Aksharay Hingne",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Chandan Pote",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Dhananjay Ghiye",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Himani Zandani",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Prathamesh Edne",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Premkumar Chandak",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Rushikesh Balapure",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Sejal Khadse",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Shreya Gawande",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Shriya Waderkar",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Vaishnavi Chandak",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      {
        name: "Vishal Rathod",
        company: "Jio Platforms Limited, Ahmedabad",
        ctc: "3.5 LPA",
      },
      { name: "Ekta Paldiwal", company: "Mphasis, Pune", ctc: "2.5 LPA" },
      {
        name: "Divya Gulhane",
        company: "SAAMA Technologies, Pune",
        ctc: "3.4 LPA",
      },
      {
        name: "Vaishnavi Helode",
        company: "SAAMA Technologies, Pune",
        ctc: "3.4 LPA",
      },
      {
        name: "Janhvi Bhimjiyani",
        company: "TATA Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Jitendra Balwat",
        company: "TATA Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Ketan Kshirsagar",
        company: "TATA Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Pratik Awachar",
        company: "TATA Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Rutuja Kaikade",
        company: "TATA Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Sakshi Chaudhari",
        company: "TATA Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Sanjana Kumbkar",
        company: "TATA Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Tushar Dasare",
        company: "TATA Consultancy Services Limited, Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Devashri Gote",
        company: "Vyom Labs Pvt. Ltd., Pune",
        ctc: "3.1 LPA",
      },
      { name: "Neha Mitkari", company: "Wipro Limited, Pune", ctc: "3.25 LPA" },
      { name: "Vedant Joshi", company: "Wipro Limited, Pune", ctc: "3.25 LPA" },
      {
        name: "Rutuja Kadu",
        company: "YRC Software India LLP, Pune",
        ctc: "5.5 LPA",
      },
      {
        name: "Niranjan Darade",
        company: "IoGenies Solutions LLP, Pune",
        ctc: "4.59 LPA",
      },
    ],
    "2019-20": [
      {
        name: "Prajakta Kale",
        company: "Bajaj Electricals Limited, Aurangabad",
        ctc: "1.80 LPA",
      },
      {
        name: "Pratiksha Kale",
        company: "Bajaj Electricals Limited, Aurangabad",
        ctc: "1.80 LPA",
      },
      {
        name: "Ajay Thakur",
        company: "BYJUs the Learning App, Bangalore",
        ctc: "10.00 LPA",
      },
      {
        name: "Anand Kharat",
        company: "BYJUs the Learning App, Bangalore",
        ctc: "10.00 LPA",
      },
      {
        name: "Atmānand Gore",
        company: "BYJUs the Learning App, Bangalore",
        ctc: "10.00 LPA",
      },
      {
        name: "Prateemesh Dharamthok",
        company: "BYJUs the Learning App, Bangalore",
        ctc: "10.00 LPA",
      },
      {
        name: "Swapnil Sangle",
        company: "BYJUs the Learning App, Bangalore",
        ctc: "10.00 LPA",
      },
      {
        name: "Aditi Khandelwal",
        company: "Capgemini Technology Services India Limited",
        ctc: "3.00 LPA",
      },
      {
        name: "Kiran Adirao",
        company: "Capgemini Technology Services India Limited",
        ctc: "3.00 LPA",
      },
      {
        name: "Sayali Malode",
        company: "Capgemini Technology Services India Limited",
        ctc: "3.00 LPA",
      },
      {
        name: "Vaishnavi Jahagirdar",
        company: "Capgemini Technology Services India Limited",
        ctc: "3.00 LPA",
      },
      {
        name: "Atharv Shastri",
        company: "CMS IT Services, Nagpur",
        ctc: "2.50 LPA",
      },
      {
        name: "Abhishek Dongare",
        company: "Cognizant Technology Solutions India Pvt. Ltd.,Pune",
        ctc: "4.00 LPA",
      },
      {
        name: "Anand Pawar",
        company: "Cognizant Technology Solutions India Pvt. Ltd.,Pune",
        ctc: "4.00 LPA",
      },
      {
        name: "Apeksha Deshmukh",
        company: "Cognizant Technology Solutions India Pvt. Ltd.,Pune",
        ctc: "4.00 LPA",
      },
      {
        name: "Neha Singh",
        company: "Cognizant Technology Solutions India Pvt. Ltd.,Pune",
        ctc: "4.00 LPA",
      },
      {
        name: "Rushikesh More",
        company: "Cognizant Technology Solutions India Pvt. Ltd.,Pune",
        ctc: "4.00 LPA",
      },
      {
        name: "Saurabh Gawali",
        company: "Cognizant Technology Solutions India Pvt. Ltd.,Pune",
        ctc: "4.00 LPA",
      },
      {
        name: "Kiran Nikhade",
        company: "Infosys Limited, Bangalore",
        ctc: "3.60 LPA",
      },
      {
        name: "Pooja Unhale",
        company: "Infosys Limited, Bangalore",
        ctc: "3.60 LPA",
      },
      {
        name: "Ankita Pachkhede",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Ashwini Borkar",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Krutika Bhusari",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Mukul Dubey",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Pranav Mishra",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Rishikesh Rathi",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Srushti Wadaskar",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Vaishnavi Patil",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Vinaya Mahajan",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Vishakha Parnate",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Yash Pethe",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Bidchan Bose",
        company: "Value Momentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "3.60 LPA",
      },
      {
        name: "Gaurav Bajaj",
        company: "Value Momentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "3.60 LPA",
      },
      {
        name: "Isha Sayani",
        company: "Value Momentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "3.60 LPA",
      },
      {
        name: "Jahnavi Mangle",
        company: "Value Momentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "3.60 LPA",
      },
      {
        name: "Pratik Chinchanikar",
        company: "Value Momentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "3.60 LPA",
      },
      {
        name: "Sayli Pusegaonkar",
        company: "Value Momentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "3.60 LPA",
      },
      {
        name: "Shantanu Gawande",
        company: "Value Momentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "3.60 LPA",
      },
      {
        name: "Soniya Berojya",
        company: "Value Momentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "3.60 LPA",
      },
      {
        name: "Md Maroof Ahmed",
        company: "Wipro Limited, Bangalore",
        ctc: "3.50 LPA",
      },
      {
        name: "Dinesh Ajay Fukate",
        company: "BOSCH Ltd, Bengaluru",
        ctc: "4.00 LPA",
      },
      {
        name: "Manisha Keshav Masne",
        company: "Tech Mahindra, Mumbai",
        ctc: "3.25 LPA",
      },
      {
        name: "Shubhashri Prabhakarrao Darekar",
        company: "Tech Mahindra, Mumbai",
        ctc: "3.25 LPA",
      },
      {
        name: "Rushikesh Chandrashekhar Deshmukh",
        company: "Tech Mahindra, Mumbai",
        ctc: "3.25 LPA",
      },
      {
        name: "Mansi Deepak Jadhao",
        company: "Tech Mahindra, Mumbai",
        ctc: "3.25 LPA",
      },
      {
        name: "Aanchal Hansraj Wankar",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Radha Anilrao Kotgirwar",
        company: "Capgemini Technology Services India Limited",
        ctc: "3.00 LPA",
      },
      {
        name: "Pankaj Gajanan Parve",
        company: "Mphasis Ltd, Pune",
        ctc: "3.25 LPA",
      },
      {
        name: "Sanket Vitthal Rahod",
        company: "Woyee Technologies, Pune",
        ctc: "3.60 LPA",
      },
      {
        name: "Mayuri Ramrao Chavan",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Aniket Sunil Fasate",
        company: "IRCC, IIT Bombay",
        ctc: "3.60 LPA",
      },
      {
        name: "Sanjivani Ramesh Khandare",
        company: "Tech Mahindra, Mumbai",
        ctc: "3.25 LPA",
      },
      {
        name: "Nikita Gajanan Ghule",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Shreyash Rameshwar Dhore",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Vaishnavi Ajay Kangdale",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Priyanka Dinkar Mangde",
        company: "IBM India Pvt. Ltd, Bangalore",
        ctc: "4.25 LPA",
      },
      {
        name: "Shraddha Vilas Nagose",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Neha Rajendra Chandak",
        company: "Capgemini Technology Services India Limited",
        ctc: "3.00 LPA",
      },
      {
        name: "Karishma Deepak Kachulla",
        company: "HiRankers, Nagpur",
        ctc: "1.44 LPA",
      },
      {
        name: "Shruti Narendra Borikar",
        company: "Adroitec Systems Pvt. Ltd, Banglore",
        ctc: "3.00 LPA",
      },
      {
        name: "Jyoti Vasatkar",
        company: "Nettur Technical Training Foundation, Bengaluru",
        ctc: "2.88 LPA",
      },
    ],
    "2018-19": [
      {
        name: "Diksha Kale",
        company: "Accenture Limited, Bangalore",
        ctc: "3.75 LPA",
      },
      {
        name: "Harshal Jaiswal",
        company: "Capgemini Technology Services India Limited, Navi Mumbai",
        ctc: "3.00 LPA",
      },
      {
        name: "Chaitali Hedau",
        company: "CMS IT Services Pvt Ltd., Nagpur",
        ctc: "1.80 LPA",
      },
      {
        name: "Pallavi Ingale",
        company: "CMS IT Services Pvt Ltd., Nagpur",
        ctc: "1.80 LPA",
      },
      {
        name: "Vishal Magar",
        company: "CMS IT Services Pvt Ltd., Nagpur",
        ctc: "1.80 LPA",
      },
      {
        name: "Aniket Kadukar",
        company: "Cognizant Solutions India Limited, Pune",
        ctc: "3.83 LPA",
      },
      {
        name: "Arati Tawari",
        company: "Cognizant Solutions India Limited, Pune",
        ctc: "3.83 LPA",
      },
      {
        name: "Darshan Patil",
        company: "Cognizant Solutions India Limited, Pune",
        ctc: "3.83 LPA",
      },
      {
        name: "Gaurav Burrewar",
        company: "Cognizant Solutions India Limited, Pune",
        ctc: "3.83 LPA",
      },
      {
        name: "Prajkta Yawle",
        company: "Cognizant Solutions India Limited, Pune",
        ctc: "3.83 LPA",
      },
      {
        name: "Sapana Gavande",
        company: "Cognizant Solutions India Limited, Pune",
        ctc: "3.83 LPA",
      },
      {
        name: "Snehal Deshmukh",
        company: "Cognizant Solutions India Limited, Pune",
        ctc: "3.83 LPA",
      },
      {
        name: "Chaitanya Jain",
        company: "Collabera Technologies Pvt. Ltd., Vadodara",
        ctc: "4.50 LPA",
      },
      {
        name: "Pooja Dabhade",
        company: "Collabera Technologies Pvt. Ltd., Vadodara",
        ctc: "4.50 LPA",
      },
      {
        name: "Sayali Karale",
        company: "Collabera Technologies Pvt. Ltd., Vadodara",
        ctc: "4.50 LPA",
      },
      {
        name: "Varada Kolhe",
        company: "Collabera Technologies Pvt. Ltd., Vadodara",
        ctc: "4.50 LPA",
      },
      {
        name: "Ansoli Vibhute",
        company: "India First Robotics",
        ctc: "1.44 LPA",
      },
      {
        name: "Jayashri Ingole",
        company: "India First Robotics",
        ctc: "1.44 LPA",
      },
      {
        name: "Gaurav Makde",
        company: "KPIT Engineering Limited, Pune",
        ctc: "3.39 LPA",
      },
      {
        name: "Nitesh Pidurkar",
        company: "KPIT Engineering Limited, Pune",
        ctc: "3.39 LPA",
      },
      {
        name: "Arti Gohaire",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Hardik Sangneria",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Manisha Vadode",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Mitheela Gawande",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Namrata Patil",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Payal Kale",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Radhesharn Rathi",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Sakshi Bhise",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Sanket Turiley",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Shreya Bharapte",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Swati Bobade",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Vaishnavi Vyawahare",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Sandhya Solanke",
        company: "Tech Mahindra Limited, Pune",
        ctc: "3.25 LPA",
      },
      {
        name: "Suraj Potekar",
        company: "Tech Mahindra Limited, Pune",
        ctc: "3.25 LPA",
      },
      {
        name: "Vinayak Boratwar",
        company: "THREEH SYSTEMS Pvt. Ltd., Nagpur",
        ctc: "2.00 LPA",
      },
      {
        name: "Kartik Agrawal",
        company: "Tudip Technologies Pvt. Ltd., Pune",
        ctc: "3.00 LPA",
      },
      {
        name: "Mansi Dabhade",
        company: "Tudip Technologies Pvt. Ltd., Pune",
        ctc: "3.00 LPA",
      },
      {
        name: "Pranti Vilhalkar",
        company: "Value Momentum Software Services Pvt. Ltd., Hyderabad",
        ctc: "3.30 LPA",
      },
      {
        name: "Prashik Anilrao Tidake",
        company: "Tech Mahindra Limited, Pune",
        ctc: "3.25 LPA",
      },
      {
        name: "Shrutika Avinash Naphade",
        company: "Tech Mahindra Limited, Pune",
        ctc: "3.25 LPA",
      },
      {
        name: "Manasi Arun Sarnaik",
        company: "CYBAGE Software PVT Ltd, Pune",
        ctc: "4.5 LPA",
      },
      {
        name: "Yash Shrivas",
        company: "Capgemini Technology Services India Limited, Navi Mumbai",
        ctc: "3 LPA",
      },
      {
        name: "Bharat Dhabekar",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Vaibhav Gajanan Dixit",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Akash Madhukar Kolse",
        company: "Infosys Limited, Bangalore",
        ctc: "3.6 LPA",
      },
      {
        name: "Sushil Mahesh Tiwari",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Shivani Anil Nema",
        company: "Tech Mahindra Limited, Pune",
        ctc: "3.25 LPA",
      },
      {
        name: "Sakshi Manoj Malviya",
        company: "Tata Consultancy Services Ltd., Pune",
        ctc: "3.36 LPA",
      },
      {
        name: "Monali Suresh Nibude",
        company: "IBM India Pvt. Ltd, Bangalore",
        ctc: "4.25 LPA",
      },
      {
        name: "Pragati Dhairaj Langote",
        company: "Cognizant Solutions India Limited, Pune",
        ctc: "7.19 LPA",
      },
      {
        name: "Dilip Vilas Patil",
        company: "Synechron Pvt Ltd., Pune",
        ctc: "16.53 LPA",
      },
      {
        name: "Kunal Gopalrao Isal",
        company: "The Great Easteren Shippping Company, Mumbai",
        ctc: "3.00 LPA",
      },
      {
        name: "Ranajit Biswajit Choudhur",
        company: "RLABS Enterprise Service Ltd., Bengaluru",
        ctc: "1.92 LPA",
      },
      {
        name: "Kiran Bhagat",
        company: "Claro Software Solutions Pvt. Ltd., Hyderabad",
        ctc: "1.8 LPA",
      },
    ],
  },
};

export const defaultNewsletters = {
  latest: {
    title: "News Letter 2024-25 (Volume II)",
    description:
      "Stay updated with the latest happenings, student achievements, faculty contributions, and department events.",
    link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/Newsletter24-25vol2.pdf",
  },
  archives: [
    {
      date: "2024-25",
      vol: "News Letter 2024-25 (Volume I)",
      term: "Term I",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/Newsletter24-25vol1.pdf",
    },
    {
      date: "2023-24",
      vol: "News Letter 2023-24",
      term: "Full Year",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/extc_newsletter_23-24.pdf",
    },
    {
      date: "2022-23",
      vol: "News Letter 2022-23",
      term: "Full Year",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/NEWSLETTER 2022-23.pdf",
    },
    {
      date: "2021-22",
      vol: "News Letter 2021-22",
      term: "Full Year",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/NEWSLETTER 2021-22.pdf",
    },
    {
      date: "2020-21",
      vol: "News Letter 2020-21",
      term: "Full Year",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/NEWSLETTER 2020-21.pdf",
    },
    {
      date: "2019-20",
      vol: "News Letter 2019-20",
      term: "Full Year",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/NEWSLETTER 2019-20.pdf",
    },
    {
      date: "2018-19",
      vol: "Edition 4 Volume 1 (2018-19)",
      term: "Term I",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/edition4_volume1.pdf",
    },
    {
      date: "2018-19",
      vol: "Edition 4 Volume 2 (2018-19)",
      term: "Term II",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/edition4_volume2.pdf",
    },
    {
      date: "2017-18",
      vol: "Edition 3 Volume 1 (2017-18)",
      term: "Term I",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/edition3_volume1.pdf",
    },
    {
      date: "2017-18",
      vol: "Edition 3 Volume 2 (2017-18)",
      term: "Term II",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/edition3_volume2.pdf",
    },
    {
      date: "2016-17",
      vol: "Edition 2 Volume 1 (2016-17)",
      term: "Term I",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/edition2_volume1.pdf",
    },
    {
      date: "2016-17",
      vol: "Edition 2 Volume 2 (2016-17)",
      term: "Term II",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/edition2_volume2.pdf",
    },
    {
      date: "2015-16",
      vol: "Edition 1 Volume 1 (2015-16)",
      term: "Term I",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/edition1_volume1.pdf",
    },
    {
      date: "2015-16",
      vol: "Edition 1 Volume 2 (2015-16)",
      term: "Term II",
      link: "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/edition1_volume2.pdf",
    },
  ],
};

export const defaultAchievements = {
  faculty: [
    {
      name: "Prof. Mrs. Komal Vyas",
      achievement: "Topper in NPTEL Research Methodology Course",
      description:
        "Prof. Mrs. Komal Vyas achieved the top rank in the NPTEL Research Methodology course.",
      category: "Certification",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Faculty_1_Prof_Mrs_Komal_Vyas.png",
    },
    {
      name: "Ms. Komal Vyas (Thanvi)",
      achievement: "WIE Volunteer of the Year – IEEE Bombay Section 2023",
      description:
        "Ms Komal Vyas (Thanvi) received award and certificate under category WIE VOLUNTEER OF THE YEAR by IEEE Bombay Section.",
      category: "Award",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Faculty_2_Department.png",
    },
    {
      name: "Mr. Swapnil P. Badar",
      achievement: "Best Paper Award – NIT Jalandhar 2023",
      description:
        "Mr. Swapnil P. Badar received Best Paper Award for a paper titled 'Efficient Implementation of Polar Decoder: Design and Performance Analysis' presented in 3rd International Conference on Computational Electronics for Wireless Communications (December 22-23, 2023) hosted by the Department of Electronics & Communication Engineering, Dr B R Ambedkar National Institute of Technology Jalandhar, India.",
      category: "Award",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Faculty_3_Mr_Swapnil_P_Badar.png",
    },
    {
      name: "Mr. Swapnil P. Badar",
      achievement:
        "NPTEL Elite Certificate with Silver Medal – VLSI Design Flow",
      description:
        "Mr. Swapnil P. Badar received Elite Certificate with Silver Medal for NPTEL Online Certificate course on VLSI Design Flow: RTL to GDS.",
      category: "Certification",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Faculty_4_Mr_Swapnil_P_Badar.png",
    },
    {
      name: "Mr. Swapnil P. Badar",
      achievement: "Best Paper Award – IEEE ICORT-2021, DRDO Chandipur",
      description:
        "Mr. Swapnil P. Badar received Best Paper award for the paper 'Implementation of Combinational Logic for Polar Decoder' at 2nd IEEE International Conference on Range Technology (ICORT-2021) during 5th-6th August 2021, organized by Integrated Test Range, DRDO Chandipur.",
      category: "Award",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Faculty_5_Mr_Swapnil_P_Badar.png",
    },
  ],
  students: [
    {
      name: "Mr. Tejas Santosh Kale & Mr. Sahil Mathurkar",
      achievement: "Second Prize – Aavishkar 2024 (UG Level)",
      description:
        "Tejas Santosh Kale & Sahil Mathurkar participated in university level competition Aavishkar 2024 and got second prize at UG level.",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_6_Sahil_Mathurkar.png",
    },
    {
      name: "Ms. Shubhrata Mishra, Ms. Neha Bhut & Ms. Sakshi Bhojane",
      achievement: "Winners – Chess (Women), SGBAU Intercollegiate Tournament",
      description:
        "Shubhrata Mishra, Neha Bhut, Sakshi Bhojane are Winners in Chess (Women) at SGBAU Intercollegiate Tournament.",
      category: "Sports",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_7_Sakshi_Bhojane.png",
    },
    {
      name: "Ms. Samiksha Daberao",
      achievement: "Third Rank – Boxing, SGBAU Intercollegiate Tournament",
      description:
        "Samiksha Daberao got Third Rank in Boxing at SGBAU Intercollegiate Tournament.",
      category: "Sports",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_8_Tournament_Samiksha_Daberao.png",
    },
    {
      name: "Mr. Rudresh Latare",
      achievement: "University Colour Coat – Badminton, SGBAU",
      description:
        "Rudresh Latare received University Colour Coat in Badminton at SGBAU Intercollegiate Tournament.",
      category: "Sports",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_9_Tournament_Rudresh_Latare.png",
    },
    {
      name: "Mr. Atharva Tayade",
      achievement: "Second Winner – Quiz, Youth Fest 2025",
      description:
        "Atharva Tayade is Second Winner in Quiz at Youth Fest 2025.",
      category: "Cultural",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_10_Atharva_Tayade.png",
    },
    {
      name: "Ms. Roshni Borle",
      achievement: "Gunwant Kalakar Puraskar – Youth Fest 2025 (Theatre)",
      description:
        "Roshni Borle received Gunwant Kalakar Puraskar and Rs 10,000 cash prize in Theatre at Youth Fest 2025.",
      category: "Award",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_11_Roshni_Borle.png",
    },
    {
      name: "Ms. Roshni Borle & Ms. Ankita More",
      achievement: "Third Rank – Fine Art (Installation), Youth Fest 2025",
      description:
        "Roshni Borle and Ankita More achieved Third Rank in Fine Art (Installation) at Youth Fest 2025.",
      category: "Cultural",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_12_Ankita_More.png",
    },
    {
      name: "Mr. Deep Sunil Rathod",
      achievement:
        "Winner – Table Tennis (Men), University Inter College Tournament",
      description:
        "Deep Sunil Rathod is Winner in Table Tennis (Men) at University Inter College Tournament.",
      category: "Sports",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_13_Deep_Sunil_Rathod.png",
    },
    {
      name: "Mr. Pranav Harne, Mr. Vaibhav Udapure, Mr. Nivrutti Raut & Mr. Rushikesh Payghan",
      achievement: "Runner Up – Project Expo 2025",
      description:
        "Pranav Harne, Vaibhav Udapure, Nivrutti Raut and Rushikesh Payghan are Runner up in project competition at Project Expo 2025.",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_14_Rushikesh_Payghan.png",
    },
    {
      name: "Mr. Tejas Kale",
      achievement: "First Winner & Colour Coat Holder – Avishkar 2024",
      description:
        "Tejas Kale is First Winner and Colour Coat holder at Avishkar 2024.",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_15_Tejas_Kale.png",
    },
    {
      name: "Mr. Sahil Mathurkar, Mr. Shubham Suradkar, Mr. Hrishikesh Kakade & Mr. Yash Raut",
      achievement:
        "First Prize – TechFestC 2025, Siddhivinayak Technical Campus",
      description:
        "Sahil Mathurkar, Shubham Suradkar, Hrishikesh Kakade and Yash Raut won First Prize and a Cash reward of Rs 10,000 at the ISTE-Approved State-Level Project Exhibition TechFestC 2025 at Siddhivinayak Technical Campus.",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_16_Department.jpg",
    },
    {
      name: "Mr. Rajat Kiran Patil & Ms. Janhavi Ghamsham Patil",
      achievement: "First Prize (Software) – Technovation-24",
      description:
        "Mr. Rajat Kiran Patil and Miss. Janhavi Ghamsham Patil received First Prize and certificate under the category of Software in Technovation-24 organized by Godavari College of Engineering Jalgaon Amravati (3rd April 2024).",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_17_Mr_Rajat_Kiran_Patil.png",
    },
    {
      name: "Ms. Aarya Chandrawanshi & Ms. Sarla Paraskar",
      achievement: "Second Prize – SGBAU Avishkar 2023",
      description:
        "Miss. Aarya Chandrawanshi and Miss. Sarla Paraskar received Second Prize and certificate under the category of Pharmacy and Medicine in Avishkar 2023 organized by SGBAU Amravati (26-27 Dec 2023).",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_18_Miss_Aarya_Chandrawanshi.png",
    },
    {
      name: "Mr. Tejas Kale & Team",
      achievement: "Second Prize – Techkriti 2024, IIT Kanpur",
      description:
        "Mr. Tejas Kale along with other dept. students clinched the second prize at Techkriti 2024, hosted by IIT Kanpur. Their exceptional drone operation skills earned praise for dedication and innovation, reflecting both the club's talent and SSGMCE's commitment to cultivating excellence among its students.",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_19_Mr_Tejas_Kale.png",
    },
    {
      name: "Ms. Roshni Borle",
      achievement: "Second Prize – Mime Competition, Indradhanushya 2023-24",
      description:
        "Miss Roshni Borle won second prize during Indradhanushya 2023-24. She was a part of SGBAU, Amravati Team participating in the State Level Inter-University Youth Festival held at Dr. Babasaheb Ambedkar Marathwada University (Bamu), Chhatrapati Sambhaji Nagar.",
      category: "Cultural",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_20_Miss_Roshni_Borle.png",
    },
    {
      name: "Mr. Bhushan Hazare & Mr. Sumit Bhute",
      achievement: "First Prize – SGBAU Aavishkar 2022",
      description:
        "Mr. Bhushan Hazare and Mr. Sumit Bhute participated in University level competition Aavishkar 2022 and awarded First prize under the guidance of Prof. K. T. Kahar.",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_21_Mr_Mr_Bhushan_Hazare.jpg",
    },
    {
      name: "Team EnTC – Hackathon",
      achievement: "First & Second Runner-Up – Adani Electricity Hackathon",
      description:
        "Team Hackathon won the first runner-up prize of Rs 1,00,000 and second runner-up prize of Rs 50,000 in Project Hackathon organized by Adani Electricity on 15th Dec 2021.",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_22_Team_EnTC.jpg",
    },
    {
      name: "Team EnTC",
      achievement: "Ignited Innovators of India (I2I) Project Competition",
      description:
        "Team EnTC participated in the Ignited Innovators of India (I2I) project competition.",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_23_Team_EnTC.jpg",
    },
    {
      name: "Department of EnTC",
      achievement: "Second Prize – SGBAU Start-up Fest",
      description: "Won 2nd Prize at SGBAU Start-up Fest, SGBAU Amravati.",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_24_Department.jpg",
    },
    {
      name: "Department of EnTC",
      achievement:
        "2nd Rank at National Level – 13th Cadence Design Contest 2018",
      description:
        "Won 2nd Rank at National Level in the 13th Cadence Design Contest 2018.",
      category: "Competition",
      image:
        "/uploads/images/achievements/entc/EnTC_Achievement_Student_25_Department.jpg",
    },
  ],
};

export const defaultDepartmentalCommittee = [
  {
    name: "Academic Monitoring Committee",
    link: "https://www.ssgmce.ac.in/images/extc_faculty/AMC%202025.pdf",
  },
  {
    name: "Departmental Coordination Committee",
    link: "https://www.ssgmce.ac.in/images/extc_faculty/DCC%202025.pdf",
  },
  {
    name: "Department Advisory Committee",
    link: "https://www.ssgmce.ac.in/images/extc_faculty/DAC%202025.pdf",
  },
];

export const defaultServicesExtended = [
  {
    lab: "Departmental Library",
    facility: "Books and Journals",
    details:
      "Available List of Research Journal at Departmental Library. Available List of Books at Departmental Library.",
    image: "",
  },
  {
    lab: "Communication Engineering Laboratory",
    facility: "Antenna Testing service on a Vector Network Analyzer (VNA)",
    details:
      "Device Name: RODHE & SCHWARZ ZVL Vector Network Analyzer. Frequency Range: 9 KHz to 13.6 GHz.",
    image: "",
  },
  {
    lab: "Analog and Digital Circuit Laboratory",
    facility: "IC testing, Component testing, Electronic test instruments",
    details: "Device Name: Digital IC Tester, LCR meter, Digital IC Tester.",
    image: "",
  },
];

export const defaultUgProjects = {
  "2024-25": [
    { id: "1", title: "Power efficient ventilator" },
    { id: "2", title: "Land Mine Detector Rover" },
    { id: "3", title: "Smart Liquid Level Monitoring" },
    { id: "4", title: "Skin disease detection" },
    { id: "5", title: "Diagnostic system for breast cancer classification" },
    { id: "6", title: "Saline Monitoring System" },
    { id: "7", title: "Solar Tree" },
    {
      id: "8",
      title:
        "Design of Electronic module for fitness, health and safety in smart shoes",
    },
    {
      id: "9",
      title: "Cloud Enabled Biometric door access system With Mobile Control",
    },
    { id: "10", title: "Smart infant Incubator" },
    { id: "11", title: "IOT Based Blood Bank System" },
    {
      id: "12",
      title:
        "Gesture Recognition Based Security Alert System using Raspberry-Pi-5",
    },
    { id: "13", title: "Wi-Fi Controlled Robot" },
    { id: "14", title: "Application based Home Automation system" },
    { id: "15", title: "Firefighting Robot Solution using ESP 32 Module" },
    {
      id: "16",
      title:
        "Wireless EV charging vehicle station with QR Code for live charging status",
    },
    { id: "17", title: "Detection of Hand-drawn circuit" },
    {
      id: "18",
      title:
        "Design & Analysis of Microstrip Patch Antenna for C-Band and X-Band",
    },
    {
      id: "19",
      title: "Design & Analysis of Microstrip Patch Antenna for 5G Application",
    },
    {
      id: "20",
      title: "Atrial Fibrillation detection using neuro-symbolic AI",
    },
    { id: "21", title: "Child Vaccination and Reminder" },
    {
      id: "22",
      title:
        "Simulation of 32 bit floating point Vedic multiplier using Urdhva Triyakbhyam sutra",
    },
    {
      id: "23",
      title:
        "Drone Based Dam Inspection and Analysis for Enhancing Infrastructure Monitoring & Resilience",
    },
    {
      id: "24",
      title: "Face Detection and Recognition Student Attendance System",
    },
    {
      id: "25",
      title:
        "Medical Report Management and Distribution System Using Block chain technology",
    },
    {
      id: "26",
      title: "Water level detection and monitoring for domestic use",
    },
    {
      id: "27",
      title:
        "An Ergolift pro: ergonomic and adjustable laptop lift with health monitoring system",
    },
    { id: "28", title: "Autonomous Navigation Rover using SLAM Algorithm" },
    {
      id: "29",
      title: "To design a system for rotten onion detection and sorting",
    },
    { id: "30", title: "Crop yield disease detection using deep learning" },
    { id: "31", title: "Portable smart electronic measuring device" },
    { id: "32", title: "Automatic Medicine Dispenser" },
    {
      id: "33",
      title: "Indoor Navigation system for visionary impaired person",
    },
    {
      id: "34",
      title:
        "Classification of EMG Based hand gestures using Time & Frequency Domain Features",
    },
    { id: "35", title: "Contactless Heartbeat Monitoring using rPPG" },
    {
      id: "36",
      title: "Automated Malaria Disease Detection using Deep Learning",
    },
    { id: "37", title: "Cotton Plant Disease Predictor using AI & ML" },
  ],
  "2023-24": [
    {
      id: "1",
      title: "ECG future Analysis for automatic detection of cardiac diseases",
    },
    { id: "2", title: "E-notice board" },
    {
      id: "3",
      title:
        "Design and Implementation of heart sound signal analysis and disease detection system-A low cost approach",
    },
    { id: "4", title: "Design of control unit for fertilizer decomposition" },
    {
      id: "5",
      title: "Development of decomposition unit for agriculture waste",
    },
    {
      id: "6",
      title: "Design and development of Waste Segregation using sensor",
    },
    { id: "7", title: "Cleaning Robot" },
    {
      id: "8",
      title: "Design and implementation of smart Spectacle for blind People",
    },
    { id: "9", title: "Design and implementation of virtual primary clinic" },
    { id: "10", title: "Virtual primary clinic" },
    { id: "11", title: "Car Accident Detection and Alert System" },
    { id: "12", title: "IOT Virtual Doctor Robot" },
    { id: "13", title: "Diagnosis of pneumonia by CNN classifier" },
    { id: "14", title: "AI-guided diagnosis (Medibot)" },
    { id: "15", title: "Enabling telemedicine through IOT" },
    {
      id: "16",
      title:
        "IOT based flammable gas and fire accident avoider system with home safety",
    },
    { id: "17", title: "Smart Ventilator" },
    { id: "18", title: "Smart food adviser" },
    { id: "19", title: "Reducing death crises of animal on Railway track" },
    { id: "20", title: "Crop disease detection and diagnosis" },
    { id: "21", title: "Hand talk assisting system for deaf and dump people" },
    {
      id: "22",
      title:
        "Bridging Agriculture communities: A digital platform for machinery access and Collaboration",
    },
    {
      id: "23",
      title: "Elevating Canteen Management with a Modern Web Solution",
    },
    {
      id: "24",
      title: "Design of decomposition unit for fertilizer independence",
    },
    { id: "25", title: "Water trash collector" },
    { id: "26", title: "E-voting system using Blockchain Technology" },
    { id: "27", title: "Control Unit Design for fertilizer decomposition" },
    { id: "28", title: "Hydroponics Farming Automation" },
    { id: "29", title: "Industrial Robotic arm system" },
    { id: "30", title: "Assistive Navigation Stick" },
    {
      id: "31",
      title:
        "Classification of EMG Signals Using Convolutional Neural Networks",
    },
    { id: "32", title: "Brain tumour detection using Image processing" },
    { id: "33", title: "Implementation of Seed grading system" },
    {
      id: "34",
      title:
        "Design And Implementation of An Integrated Automation System for Organic Fertilizer",
    },
    { id: "35", title: "Student Information system Android application" },
    {
      id: "36",
      title: "Design and development of seed germination system using IOT",
    },
    { id: "37", title: "Research on soyabean seed grading" },
    {
      id: "38",
      title:
        "Design and development of seed/granule spreader mechanism for unmanned aerial vehicle (UAV)",
    },
    { id: "39", title: "Web based Application for Agriculture" },
  ],
};

export const defaultSchemeAndSyllabus = [
  {
    course: "B.E. (Electronics and Telecommunication Engineering)",
    items: [
      { label: "NEP Scheme", link: "" },
      { label: "Scheme", link: "" },
      {
        label:
          "Notification letter - Revised Scheme only for open Elective subject",
        link: "",
      },
      { label: "Syllabus Second Year (3rd Sem)", link: "" },
      { label: "Syllabus Second Year (4th Sem)", link: "" },
      {
        label:
          "Syllabus - (Universal Human Values and Ethics) Common for all branches",
        link: "",
      },
      {
        label: "Syllabus -(Modern Indian Language) Common for all branches",
        link: "",
      },
      { label: "Syllabus Third Year (5th & 6th Sem)", link: "" },
      {
        label: "Revised Syllabus for Open Elective Third Year (5th & 6th Sem)",
        link: "",
      },
      { label: "Syllabus Final Year (7th & 8th Sem)", link: "" },
      {
        label: "Revised Syllabus for Open Elective Final Year (7th & 8th Sem)",
        link: "",
      },
    ],
  },
  {
    course: "M.E. (Digital Electronics)",
    items: [{ label: "Scheme and Syllabus M.E.", link: "" }],
  },
];

export const defaultFaculty = [
  {
    id: "ddn",
    name: "Dr. D. D. Nawgaje",
    role: "Associate Professor & Head, Electronics and Telecommunication Engineering",
    area: ["Fuzzy Logic and Neural Network"],
    email: "hod_extc@ssgmce.ac.in, ddnawgaje@ssgmce.ac.in",
    phone: "+91 9422119515",
    photo: "DN",
    vidwanId: "427285",
    qualification:
      "Ph.D. (Electronics Engineering), M.E. (Digital Electronics), B.E. (Industrial Electronics)",
    experience: "Teaching: 24 Years",
    coursesTaught: [
      "Artificial Intelligence System",
      "Digital Electronics",
      "Microcontroller Applications",
      "Microprocessor and Microcontroller",
      "Switching Theory and Logic Devices",
    ],
    scholarIds: "",
    membership: [
      "Life time membership of Indian Society for Technical Education (ISTE), New Delhi",
    ],
    publications: [
      "International Conference: Multiple papers on Fuzzy Logic, Neural Networks, and Cancer Detection",
      "Research on Neuro-Fuzzy Model of Switched Reluctance Motor",
      "Modelling of Switched Reluctance motor using Adaptive Neuro-Fuzzy Inference System",
      "Fuzzy Logic Based Detection of Suspicious Masses in Mammograms",
    ],
    research:
      "M.E. Guidance: 06 students. Projects: On-line Software for Nagar Palica Nandura, Software for Restaurant and Adat",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "entc",
  },
  {
    id: "kbk",
    name: "Dr. K. B. Khanchandani",
    role: "Professor",
    area: ["Signal and Image Processing"],
    email: "kbkhanchandani@ssgmce.ac.in",
    phone: "+91 9028751325",
    photo: "KBK",
    vidwanId: "427380",
    qualification:
      "Ph.D. (Electronics Engg.), M.E. (Electronics Engg.), B.E. (Electronics Engg.)",
    experience:
      "Teaching UG: 30 Years, Teaching PG: 19 Years, Research: 25 Years, HOD: 11 Semesters, Dean (R&D): 4 Years",
    coursesTaught: [
      "Digital Signal Processing (UG)",
      "Electronic Circuit Design (UG)",
      "Power Electronics (UG)",
      "VLSI Design (PG)",
      "Advanced Digital Signal Processing (PG)",
      "Modern Electronics Design Techniques (PG)",
      "CMOS VLSI Analog Design",
    ],
    scholarIds: "",
    membership: ["IETE-Fellow (F-223217)", "ISTE-Life Member (LM15015)"],
    publications: [
      "International Journal: 55 (SCI, Scopus & UGC Approved)",
      "International Conference: 45 (IEEE and Springer)",
      "National Conference: 36 (AICTE Approved)",
    ],
    research:
      "12 Sponsored R&D Projects (AICTE, TIFR, NCL, Tata Motors, V-chip Design)",
    fdp: "",
    fellowship: [
      "Excellence in Teaching Award by SSGMCE Shegaon (2012)",
      "Nominated as International Man of the Year (2000-2001) by International Biographical Center, London",
      "Won 2nd prize at National Level Cadence System Design Contest, Bangalore 2019",
      "Won 2nd prize at International Student Project Competition by IEEMA (2008)",
    ],
    achievements: [],
    department: "entc",
  },
  {
    id: "rsd",
    name: "Dr. R. S. Dhekekar",
    role: "Professor",
    area: ["Power Electronics & FACTS"],
    email: "rsdhekekar@ssgmce.ac.in",
    phone: "+91 9130678066",
    photo: "RSD",
    vidwanId: "427339",
    qualification:
      "Ph.D. (NIT Warangal, 2014), M.E. (Industrial Electronics, MSU Baroda), B.E. (Industrial Electronics, Amravati University, 1989)",
    experience: "Teaching: 29 Years at SSGMCE Shegaon",
    coursesTaught: [
      "Control System",
      "Power Electronics",
      "Microprocessors 8085, 8086",
      "Microcontroller",
      "Instrumentation",
      "Instrumentation and Drives",
      "Electronics Circuit Design and VLSI Design",
      "Computer Organization",
      "Electronics Workshop",
      "Industrial Electronics I and II",
      "MEDT (ME-1 Digital Electronics)",
      "Power Semiconductor Devices",
      "Device Technology",
    ],
    scholarIds: "",
    membership: [
      "Life Member ISTE",
      "Student Member IEEE (Research Scholar 2007-2010)",
    ],
    publications: [
      "Multiple publications on SVC, Fuzzy Control, Power Systems",
      "Papers in IEEE, Springer International Conferences",
      "Research on Dynamic Stability Enhancement using PID damped Fuzzy SVC",
    ],
    research: "Electric Vehicle, E-Gun",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "entc",
  },
  {
    id: "mnt",
    name: "Dr. M. N. Tibdewal",
    role: "Professor",
    area: [
      "Signal Processing",
      "Biomedical Signal and Image Processing",
      "Biomedical Instrumentation",
    ],
    email: "mntibdewal@ssgmce.ac.in",
    phone: "+91 9423144228",
    photo: "MNT",
    vidwanId: "504594",
    qualification:
      "Ph.D. (IIT Kharagpur, 2016-17), M.E. (Electronics Engg., SGBAU Amravati, 2001-02), B.E. (Industrial Electronics Engg., SGBAU Amravati, 1990)",
    experience:
      "Teaching: 33 Years at SSGMCE Shegaon, Research: 10 Years, Industrial: 1 Year at ROHA DYE-CHEM LTD Mumbai",
    coursesTaught: [
      "Analog and Digital Signal Processing",
      "Microprocessors",
      "Microcontrollers and Embedded Systems",
      "Control Systems",
      "Network Analysis",
      "Digital Image Processing",
      "Biomedical Signal and Image Processing",
      "MATLAB",
      "ALP",
      "C++",
      "Python Programming",
      "Basic and Advance Electronics Devices and Circuits",
      "Digital ICs and Digital System Design",
    ],
    scholarIds: "Google Scholar: Available",
    membership: [
      "Senior Member of IEEE (92477209)",
      "Life Member of ISTE (LM15013)",
      "Life Member of IETE (219018)",
      "Executive member of IETE - Amravati Region (2010-12)",
    ],
    publications: [
      "51 Research Papers in SCI, SCIE, SCOPUS, IEEE, Elsevier, Springer, Science Direct journals and conferences",
      "International Journals: 17 (SCI/SCIE/SCOPUS)",
      "International Conference: 32 (IEEE/Springer)",
      "Book Chapter Review: 01",
      "Invited Talks Delivered: 09",
    ],
    research:
      "Ph.D. Guidance: 1 Completed, 2 Ongoing. 22 ME Projects. 60+ BE Final Year Projects guided.",
    fdp: "Attended approx. 51 Workshops/Conferences/Seminars (Total ~45 weeks)",
    fellowship: [
      "Received Grant for ATAL FDP (Dec 2024)",
      "Awarded Senior Member of IEEE",
      "Reviewer of Springer Nature, Elsevier, IEEE Journals/Transactions",
    ],
    achievements: [],
    department: "entc",
  },
  {
    id: "sbp",
    name: "Dr. S. B. Patil",
    role: "Professor",
    area: ["VLSI-Analog/RF/Mixed Signal", "Embedded System"],
    email: "sbpatil@ssgmce.ac.in",
    phone: "+91 7020799970",
    photo: "SBP",
    vidwanId: "506185",
    qualification: "B.E., M.E., MBA, Ph.D. (VLSI - Electronics Engineering)",
    experience: "Teaching: 17 Years, Industrial: 02 Years",
    coursesTaught: [
      "VLSI Digital System Design",
      "Electronics Devices and Circuits",
      "Analog & Digital Integrated Circuits",
      "Microcontroller Applications",
    ],
    scholarIds: "",
    membership: ["IEEE", "IETE", "ISTE"],
    publications: [
      "Multiple publications on VLSI, Iris Recognition, Machine Vision, Vehicle Protection",
      "Papers in IRJET, IJIRSET and other international journals",
    ],
    research:
      "Automatic Fault Detection for Bhogle Automotive, Aurangabad. Transceiver IF IC Development for 5G mm Wave Radio using UMC 180nm Technology for SM Technologies Pvt. Ltd Pune. M.E. Guidance: 15+ students",
    fdp: "",
    fellowship: [
      "Winner of first ever National Level Cadence India Design Contest - Won Rs. 1.5 Lakh cash prize at CDNLive! India 2006, Bangalore",
    ],
    achievements: [],
    department: "entc",
  },
  {
    id: "vmu",
    name: "Mr. V. M. Umale",
    role: "Associate Professor & Dean Exam",
    area: ["Biomedical Instrumentation"],
    email: "vmumale@ssgmce.ac.in",
    phone: "+91 9421394912",
    photo: "VMU",
    vidwanId: "427415",
    qualification:
      "B.E. (Industrial Electronics), M.Tech (Instrumentation, IIT Kharagpur)",
    experience: "Teaching: 30 Years",
    coursesTaught: [
      "Digital Instrumentation (PG)",
      "Data Communication Network",
      "Biomedical Engineering",
      "Digital Integrated Circuits",
      "Linear Integrated Circuits",
      "Electronics Devices and Circuit-I & II",
      "Advance Electronics Devices and Circuit",
      "Analog and Digital Circuits",
      "Process Control and Instrumentation",
      "Industrial Electronics-I & II",
      "Analog and Digital Integrated Circuits",
    ],
    scholarIds: "",
    membership: ["Member of IETE, New Delhi", "Member of ISTE, New Delhi"],
    publications: [
      "Multiple papers on ZigBee, Wi-Fi safety systems, Wireless surveillance, Raspberry Pi applications",
      "Papers in IJRASET, IJMTER, ICECS and other international publications",
    ],
    research:
      "Multiple industry-sponsored projects: Teleconference facility (VSNL), Wire Drawing Machine Automation (Tata SSL), SCADA System for Sugar Industries, PLC based ratio controller (Reliance Industries)",
    fdp: "",
    fellowship: ["QIP Fellowship"],
    achievements: [],
    department: "entc",
  },
  {
    id: "dlb",
    name: "Mr. D. L. Bhombe",
    role: "Associate Professor & Dean Academics",
    area: ["Fuzzy Logic and Artificial Neural Networks"],
    email: "dlbhombe@ssgmce.ac.in",
    phone: "+91 9422881796",
    photo: "DLB",
    vidwanId: "504769",
    qualification:
      "M.S. (Electronics & Control Engineering), B.E. (Industrial Electronics)",
    experience: "Teaching: 31 Years",
    coursesTaught: [
      "Digital Communication",
      "Digital Communication Technique",
      "Communication Engineering",
      "Linear Integrated Circuits",
      "Artificial Intelligence System",
      "Control System Engineering",
      "Biomedical Engineering",
    ],
    scholarIds: "",
    membership: ["Life Member of ISTE (LM15018)", "Member of IETE"],
    publications: [
      "National Conference: 09",
      "International Conference: 02",
      "International Journal: 20",
    ],
    research: "M.E. Guidance: 20 students",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "entc",
  },
  {
    id: "bph",
    name: "Dr. B. P. Harane",
    role: "Assistant Professor",
    area: ["Digital Signal Processing (DSP)", "EEG Signal Processing"],
    email: "bpharne@ssgmce.ac.in",
    phone: "+91 7030696867",
    photo: "BPH",
    vidwanId: "426532",
    qualification:
      "Ph.D. (Electronics and Telecommunication Engg.), M.Tech (Electronic System and Communication), B.E. (Electronics & Telecommunication)",
    experience: "Teaching: 15 Years",
    coursesTaught: [
      "Network Analysis",
      "Electromagnetic Field",
      "Control System Engineering",
      "Object Oriented Programming",
      "Computer Programming Application",
      "Electronics Design Circuit-1",
      "Analog and Digital Circuits",
      "Switching Theory and Logic Design",
      "8086 and 80386 Programming",
      "Digital Integrated Design",
      "Parallel Computing",
    ],
    scholarIds: "",
    membership: [],
    publications: [
      "Higuchi Fractal Dimension Analysis of EEG Signal (IJECE, 2014)",
      "EEG Spectral Analysis on OM Mantra Meditation (Applied Psychophysiology and Biofeedback, 2018)",
      "Survey on Om meditation: Its effects on the human body (Psychological Thought, 2019)",
      "Fractal Dimension Analysis of EEG Signal (ICVSP Conference, 2014)",
    ],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "entc",
  },
  {
    id: "dpt",
    name: "Dr. D. P. Tulaskar",
    role: "Associate Professor",
    area: ["VLSI Communication & DSP"],
    email: "dhirajtulaskar@ssgmce.ac.in",
    phone: "+91 9422182801",
    photo: "DPT",
    vidwanId: "428082",
    qualification:
      "Ph.D. (Electronics and Telecommunication Engg.), M.E. (Digital Electronics), B.E. (Electronics & Telecommunication)",
    experience: "Teaching: 10 Years",
    coursesTaught: [
      "Satellite Communication",
      "Communication Engineering-I",
      "Communication Engineering-II",
      "Wireless Communication",
      "Digital Signal Processing",
    ],
    scholarIds: "",
    membership: ["Life time membership of ISTE, New Delhi"],
    publications: [
      "Papers on AI Foil IDE Electrode based Ambient Harvester, Energy Harvesting Systems, IoT Agriculture Monitoring, Wide Band Antenna Design",
      "Publications in IJIREEICE, IRJET, International Conferences",
    ],
    research: "M.E. Guidance: 02, B.E. Projects: 10",
    fdp: "",
    fellowship: [],
    achievements: [
      "Faculty Advisor ESSA",
      "Member Secretary of Internal Complaint Committee (ICC) for SC/ST",
      "Communication Engineering Laboratory In-charge",
      "Warden of Sant Kabir Hostel",
      "GATE Classes Coordinator",
      "T and P Co-coordinator",
    ],
    department: "entc",
  },
  {
    id: "and",
    name: "Mr. A. N. Dolas",
    role: "Assistant Professor",
    area: [
      "Analog & Digital Electronics",
      "Robotics & Automation",
      "Computer Networking",
      "Control System Engineering",
    ],
    email: "amit.dolas@ssgmce.ac.in",
    phone: "+91 9822271066",
    photo: "AND",
    vidwanId: "427230",
    qualification:
      "M.E. (Digital Electronics, 2010), B.E. (Electronics & Telecommunication, 2006)",
    experience: "Teaching: 13 Years, Corporate: 02 Years",
    coursesTaught: [
      "Electronics Devices and Circuits",
      "Analog and Digital Circuits",
      "VLSI Design",
      "Linear Integrated Circuits",
      "Computer Networking",
      "Control System Design",
    ],
    scholarIds: "",
    membership: ["ISTE LM"],
    publications: [
      "Efficient Implementation of G.726 Speech Codec using MATLAB Simulink (ICCIA-10)",
      "Reduced Bit rate & Delay Free G.726 Speech Codec (RTSCIT-09, IJCEIT)",
    ],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "entc",
  },
  {
    id: "vkb",
    name: "Mr. V. K. Bhangdiya",
    role: "Assistant Professor",
    area: ["Machine Learning", "Artificial Intelligence"],
    email: "vkbhangdiya@ssgmce.ac.in",
    phone: "+91 9823936821",
    photo: "VKB",
    vidwanId: "427028",
    qualification:
      "Ph.D. (Ongoing), M.Tech (Electronics), PG Diploma (VLSI), B.E. (Industrial Electronics)",
    experience: "Teaching: 10.5 Years, Industrial: 1.5 Years",
    coursesTaught: [
      "Digital Image Processing",
      "Digital System Design",
      "Signal and System",
      "Embedded System Design (ME)",
      "AVR Microcontroller and Application",
    ],
    scholarIds: "",
    membership: ["ISTE Life Member", "Member of IETE"],
    publications: ["International Journal: 02", "International Conference: 01"],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [
      "Received grant of ~2 Lakhs for FDP on Computer Vision and Machine Learning from Dept. of E&ICT Delhi",
    ],
    department: "entc",
  },
  {
    id: "ktk",
    name: "Dr. K. T. Kahar",
    role: "Assistant Professor",
    area: [
      "Micro-electromechanical Systems (MEMS)",
      "Power Electronics",
      "Digital Communication",
    ],
    email: "ktkahar@ssgmce.ac.in",
    phone: "+91 8087103768",
    photo: "KTK",
    vidwanId: "426786",
    qualification: "Ph.D., M.Tech (Digital Communication)",
    experience: "Academic: 13 Years, Research: 03 Years",
    coursesTaught: [
      "Introduction to MEMS",
      "Power Electronics",
      "Instrumentation & Sensors",
      "Communication Engineering I & II",
      "Linear Electronic Devices",
      "Digital Communication",
      "Electronic Devices & Circuits",
    ],
    scholarIds: "",
    membership: [
      "Life Member of ISTE (LM-79524)",
      "Life Member of REST Society for Research International (LM-AA0348)",
    ],
    publications: [
      "MEMS based energy scavenger with interdigitated electrodes (Materials Today, Elsevier, 2022)",
      "MEMS-based energy scavengers: journey and future (Microsystem Technologies, Springer, 2022)",
      "Influence of circular patched EBG substrate on SAR (IEEE Conference)",
    ],
    research: "Working on MEMS based Energy Scavengers",
    fdp: "",
    fellowship: [],
    achievements: [
      "Coordinator for 2nd National Conference RTITRD'10",
      "Lab In-Charge (PE & Inst Lab)",
      "Project Coordinator",
      "Faculty Advisor: ESSA 2011-2015, ITSA 2010-11",
    ],
    department: "entc",
  },
  {
    id: "ksv",
    name: "Ms. K. S. Vyas",
    role: "Assistant Professor",
    area: ["Digital Image Processing", "Digital Electronics", "Communication"],
    email: "komalthanvi@ssgmce.ac.in",
    phone: "+91 9405456382",
    photo: "KSV",
    vidwanId: "426586",
    qualification:
      "M.E. (Digital Electronics), B.E. (Electronics and Telecommunication Engineering), Diploma (Electronics and Communication Engg.)",
    experience: "Teaching: 10 Years",
    coursesTaught: [
      "Data Communication Network",
      "Digital Communication",
      "Introduction to Wireless Technologies",
      "Satellite and Optical Fiber Communication",
      "Skill Development Lab",
      "Optical Fiber Communication",
      "Wireless Communication",
      "Communication Engineering",
      "Data Computer Networks",
      "Cryptography and Network Security",
    ],
    scholarIds:
      "Vidwan: 426586 | ORCID: 0009-0008-5196-6223 | Web of Science: AEX-1623-2022 | Google Scholar: 7lmWqNsAAAAJ",
    membership: ["Yearly Membership of IEEE"],
    publications: [
      "Identification of Plant Species Based on Leaf Images (IJIFR, 2017)",
      "IOT based home automation and Security using ESP 32 (JICS, 2022)",
      "Door Security for home monitoring Based on Arduino UNO (JICS, 2022)",
      "Survey on Blockchain Technology and Consensus Algorithms (ICETET-SIP, 2023)",
      "Implementation of Secure E-voting System (IJSREM, 2023)",
    ],
    research: "",
    fdp: "FDP Attended: 11, STTP Attended: 04, Workshops Attended: 12, Workshops Organized: 21",
    fellowship: ["WIE Volunteer of the Year Award (2023)"],
    achievements: [
      "Faculty Adviser for IEEE WIE SB",
      "Departmental WDC Coordinator",
      "Departmental CDES Coordinator",
      "Faculty Adviser for ESSA",
    ],
    department: "entc",
  },
  {
    id: "spb",
    name: "Dr. S. P. Badar",
    role: "Assistant Professor",
    area: ["VLSI Design"],
    email: "spbadar@ssgmce.ac.in",
    phone: "+91 9503733768",
    photo: "SPB",
    vidwanId: "426810",
    qualification:
      "Ph.D., M.E. (Electronics Engineering), B.E. (Electronics & Telecommunication Engg.)",
    experience: "Teaching: 13 Years, Industrial: 1.5 Years",
    coursesTaught: [
      "VLSI Design",
      "CMOS Design",
      "Network Analysis / Network Theory",
      "Digital Electronics",
      "Electronics Devices & Circuits",
      "Electronics Devices & Components",
    ],
    scholarIds: "",
    membership: [
      "IEEE Graduate Student Member (97548153)",
      "IEEE Young Professionals",
      "IEEE Robotics and Automation Society",
      "IEEE SIGHT",
    ],
    publications: [
      "Papers on Successive Cancellation Polar Decoder in SSGM Journal, IEEE PCEMS 2023, IEEE TENSYMP 2022, IEEE ICORT 2021",
      "Research on fast polar code decoder for 5G wireless applications",
    ],
    research:
      "Design and implement fast polar code decoder for 5G wireless application. 1024 bit Fast Simplified Successive Cancellation Polar Decoder designed.",
    fdp: "",
    fellowship: [
      "Summer Faculty Research Fellowship at IIT Delhi (May-July 2023)",
      "Best Paper Award at 2nd IEEE ICORT-2021",
      "TRIAC-EDM Certification by NIELIT India and III Taiwan (2020-21)",
      "Summer Faculty Research Fellowship (Online) at IIT Delhi (June-July 2020)",
      "2nd Rank at National Level Cadence Design Contest, Bangalore (Jan 2019)",
    ],
    achievements: [],
    department: "entc",
  },
  {
    id: "tpm",
    name: "Mr. T. P. Marode",
    role: "Assistant Professor",
    area: ["Parallel Computing", "Computer Programming and Networking"],
    email: "tpmarode@ssgmce.ac.in",
    phone: "+91 8983286054",
    photo: "TPM",
    vidwanId: "427858",
    qualification:
      "M.E. (Digital Electronics), B.E. (Electronics and Telecommunication Engg.)",
    experience: "Teaching: 08 Years, Administrative: 16 Years",
    coursesTaught: [
      "Web Development",
      "Instrumentation",
      "Object Oriented Programming",
      "Introduction to Java",
      "Introduction to Python",
      "Cryptography and Network Security",
    ],
    scholarIds: "Vidwan: 427858",
    membership: [],
    publications: [
      "Multiple papers on Digital Filter Design, MAC Unit Optimization, SAP Dashboard, Nutritionist App, Education Advancement",
      "Publications in IJCCR, IJRITCC, IJARSCT and other journals",
    ],
    research:
      "Developed 300+ report programs in SAP ECC 6.0 (ABAP). Developed 70+ SAPSCRIPT Forms and 60+ SMARTFORMS in SAP.",
    fdp: "Multiple FDPs on IoT, Cloud Computing, Python, AI/ML, VLSI Design, Data Analytics",
    fellowship: [],
    achievements: [],
    department: "entc",
  },
  {
    id: "sgn",
    name: "Mr. S. G. Nemane",
    role: "Assistant Professor",
    area: ["Power Electronics", "Digital Communication"],
    email: "shonnemane@ssgmce.ac.in",
    phone: "+91 9822924801",
    photo: "SGN",
    vidwanId: "504773",
    qualification:
      "M.E. (Digital Electronics), B.E. (Electronics and Telecommunication Engg.)",
    experience: "Teaching: 10 Years",
    coursesTaught: [
      "Electronics Circuit Design",
      "Power Electronics",
      "Digital Electronics",
      "Analog and Digital Electronics",
      "Satellite Communication",
      "Electronic Devices and Circuit",
      "Communication Engineering",
      "Analog and Digital Circuits",
    ],
    scholarIds: "",
    membership: ["Member-IEEE Robotics and Automation Society"],
    publications: [
      "Efficient Antenna Design For RF Front End Transceiver For Wi-Max Application (IJRITCC)",
      "Design of MPA for RF Front-end Transceivers Operating at 3.5GHz (IARJSET)",
      "Papers on Alcohol detection, Automated warehouse management",
    ],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [
      "Main Faculty Coordinator of ETSA",
      "Centralized Store In-charge",
      "College Campaigning In-charge",
      "Industrial Visit Coordinator",
      "Virtual Lab Coordinator",
      "Time Table Coordinator",
      "Project Coordinator",
    ],
    department: "entc",
  },
  {
    id: "vsi",
    name: "Mr. V. S. Ingole",
    role: "Assistant Professor",
    area: ["Digital Electronics & VLSI"],
    email: "vikramingole@ssgmce.ac.in",
    phone: "+91 8380008509",
    photo: "VSI",
    vidwanId: "427400",
    qualification:
      "M.E. (Digital Electronics), B.E. (Electronics and Telecommunication Engg.)",
    experience: "Teaching: 11 Years",
    coursesTaught: [
      "Microprocessor",
      "Microcontroller",
      "Control System Engineering",
      "Network Analysis",
      "Electronic Circuits Design",
    ],
    scholarIds: "",
    membership: ["Associate Member of IETE", "Life Time Member of ISTE"],
    publications: [
      "Design of Multiplexer using CMOS TERNARY LOGIC (IJERA, 2012)",
      "Design of CMOS INVERTER based on TERNARY LOGIC (IC-BEST, 2012)",
      "Design of Ternary NAND Gates Using Ternary Transmission Gates (IJPARET, 2014)",
      "Design and implementation of low power ternary decoder",
    ],
    research:
      "Design Ternary Based Arithmetic and Logical Unit. Design Ternary to Binary / Binary to Ternary Converter.",
    fdp: "",
    fellowship: [
      "Awarded Best Paper in International Conference at BDCOE Sevagram",
    ],
    achievements: [],
    department: "entc",
  },
  {
    id: "aad",
    name: "Mrs. A. A. Deshmukh",
    role: "Assistant Professor",
    area: ["Analog and Digital Communication"],
    email: "ashwini.deshmukh@ssgmce.ac.in",
    phone: "+91 9764355531",
    photo: "AAD",
    vidwanId: "426534",
    qualification:
      "M.E. (Digital Electronics), B.E. (Electronics & Telecommunication)",
    experience: "Teaching: 06 Years",
    coursesTaught: [
      "Mobile Communication and Network",
      "Engineering Economics",
      "Introduction to Wireless Technology",
      "Digital Communication",
      "Fiber Optics",
    ],
    scholarIds:
      "Google Scholar: yn81OwoAAAAJ | Vidwan: 426534 | ORCID: 0009-0006-6954-7647 | Web of Science: JDM-2921-2023",
    membership: [],
    publications: [
      "Design & Development Of Intelligent Lighting System For Smart Houses (IJESRT)",
      "Intelligent Household Led Lighting System For Energy Saving (IOSR JVSP)",
      "Survey on Blockchain Technology and Consensus Algorithm (ICETET-SIP, 2023)",
    ],
    research: "",
    fdp: "Multiple FDPs and Workshops on IoT, AI, ML, 5G Communications, NEP 2020",
    fellowship: [],
    achievements: [
      "Dept Coordinator Cultural Council",
      "ISTE Faculty & Student Chapter Coordinator",
      "Class Test Coordinator",
      "Admission Committee Member",
    ],
    department: "entc",
  },
  {
    id: "hbp",
    name: "Mr. H. B. Patil",
    role: "Assistant Professor",
    area: ["Digital and Analog Electronics"],
    email: "hbpatil@ssgmce.ac.in",
    phone: "+91 9763296843",
    photo: "HBP",
    vidwanId: "426742",
    qualification:
      "M.E. (Digital Electronics, SGBAU Amravati, 2013-15), B.E. (Electronics and Telecommunication Eng., SGBAU Amravati, 2009-13)",
    experience: "Teaching: 9 Years",
    coursesTaught: [
      "Digital System Design",
      "Network Theory",
      "Electronic Devices and Circuit",
      "Control System Engineering",
      "Analog and Digital Electronics",
      "Wireless Sensor Network",
    ],
    scholarIds:
      "ORCID: 0009-0006-0161-2860 | Researcher ID: JDM-5628-2023 | Vidwan: 426742 | Google Scholar: X1AeS4sAAAAJ",
    membership: ["Life member of ISTE (LM126123)"],
    publications: [
      "IEEE Conference on Canteen Management Web Solution (Feb 2024)",
      "Wireless Biomedical Parameter Monitoring System (IJERA, 2015)",
      "Design and Performance Analysis of 2.4GHz Power Amplifier for WSN (IEEE ICISC-2018)",
      "International Journals: 05, International Conferences: 02 (IEEE)",
    ],
    research:
      "B.E. Projects Guided: 10+ projects on various fields of Electronics Engineering",
    fdp: "AICTE ATAL FDPs on IoT, NEP Orientation, Moral Values, ICT for Education (IIT Bombay), NPTEL Digital Circuits",
    fellowship: [],
    achievements: [],
    department: "entc",
  },
  {
    id: "rsm",
    name: "Dr. R. S. Mahamune",
    role: "Assistant Professor",
    area: [
      "Biomedical Signal and Image Processing",
      "VLSI",
      "Signal Processing",
    ],
    email: "rsmahamune@ssgmce.ac.in",
    phone: "+91 7898046095",
    photo: "RSM",
    vidwanId: "385005",
    qualification:
      "Ph.D., M.Tech (VLSI), B.E. (Electronics and Telecommunication Eng.)",
    experience: "Teaching: 12 Years, Research: 5 Years",
    coursesTaught: [
      "Electromagnetic Wave",
      "Industrial Instrumentation",
      "Embedded System",
      "Microcontroller",
      "Microprocessor",
      "Object Oriented Programming",
    ],
    scholarIds: "",
    membership: ["Associate member of IETE"],
    publications: [
      "Classification of motor imagery signals using CWT filter bank-based 2D images (IJIST, 2021)",
      "Automatic channel selection based on standard deviation of wavelet coefficients (IJIST, 2022)",
      "CWT Based transfer learning for motor imagery classification (Journal of Neuroscience Methods, 2020)",
    ],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "entc",
  },
  {
    id: "nsd",
    name: "Dr. N. S. Dharmale",
    role: "Assistant Professor",
    area: [
      "Material Science",
      "Device Simulation",
      "VLSI",
      "Signal Processing",
    ],
    email: "nsdharmale@ssgmce.ac.in",
    phone: "+91 7898046032",
    photo: "NSD",
    vidwanId: "431261",
    qualification:
      "Ph.D. (NIT Silchar, Assam), M.Tech (VLSI), B.E. (Electronics and Telecommunication Eng.)",
    experience: "Teaching: 6 Years, Research: 5 Years",
    coursesTaught: [
      "Electronic Device and Circuits",
      "Digital System Design",
      "Computer Architecture",
      "Digital Signal Processing",
      "Signal and System",
      "Industrial Instrumentation",
    ],
    scholarIds: "",
    membership: ["Life member of ISTE (LM 83179)", "Associate member of IETE"],
    publications: [
      "Comparative study on TiO2 structural, electronic, optical and mechanical properties (Materials Research Express, 2020)",
      "Investigating TiO2 Electronic and Optical Properties using OLCAO-MGGA-TBO9 (Modelling and Simulation, 2020)",
      "Multiple publications on DFT study of TiO2 polymorphs",
    ],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "entc",
  },
  {
    id: "mbd",
    name: "Mr. M. B. Dhamande",
    role: "Assistant Professor",
    area: ["Analog & Digital Electronics", "Instrumentation"],
    email: "mbdhamande@gmail.com",
    phone: "+91 9284799343",
    photo: "MBD",
    vidwanId: "",
    qualification:
      "M.E. (Digital Electronics), AMIETE (Electronics & Telecommunication)",
    experience:
      "Teaching: 1.5 Years EDC/ADC (Practicals), Lab Assistant: 32 Years",
    coursesTaught: [],
    scholarIds: "",
    membership: ["Life Membership of IETE"],
    publications: [],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [
      "Maintenance of EPABX Machine for Shri Gajanan Maharaj Sansthan and SSGMCE",
    ],
    department: "entc",
  },
  {
    id: "sps",
    name: "Mr. S. P. Satal",
    role: "Assistant Professor",
    area: ["Power Electronics", "Instrumentation"],
    email: "sanjaysatal@gmail.com",
    phone: "+91 9422182608",
    photo: "SPS",
    vidwanId: "",
    qualification:
      "M.E. (Digital Electronics), AMIETE (Electronics & Telecommunication)",
    experience: "Lab Assistant: 30 Years, Teaching: 1.5 Years PE (Practicals)",
    coursesTaught: [],
    scholarIds: "",
    membership: ["Life Member of IETE"],
    publications: [],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "entc",
  },
  {
    id: "gk",
    name: "Mr. Girish Kangane",
    role: "Professor of Practice",
    area: [],
    email: "",
    phone: "",
    photo: "GK",
    vidwanId: "",
    qualification: "",
    experience: "",
    coursesTaught: [],
    scholarIds: "",
    membership: [],
    publications: [],
    research: "",
    fdp: "",
    fellowship: [],
    achievements: [],
    isIndustry: true,
    department: "entc",
  },
];

export const defaultStaff = [
  { name: "Mrs. V. G. Payghan", role: "Office Assistant", photo: "VGP" },
  { name: "Mr. M. Y. Kashikar", role: "Lab Assistant", photo: "MYK" },
  { name: "Mr. Saleem Ahmad", role: "Lab Assistant", photo: "SAA" },
  { name: "Mr. A. S. Akotkar", role: "Lab Assistant", photo: "ASA" },
  { name: "Mr. S. B. Sonawane", role: "Lab Assistant", photo: "SBS" },
  { name: "Mr. J. S. Kolhe", role: "Lab Assistant", photo: "JSK" },
  { name: "Mr. K. K. Thakur", role: "Lab Attendant", photo: "KKT" },
  { name: "Mr. G. O. Tayde", role: "Lab Attendant", photo: "GOT" },
  { name: "Mr. A. L. Nemade", role: "Lab Attendant", photo: "ALN" },
  { name: "Mr. S. A. Raut", role: "Lab Attendant", photo: "SAR" },
  { name: "Mr. P. B. Bule", role: "Peon", photo: "PBB" },
  { name: "Mr. K. R. Khatri", role: "Lab Attendant", photo: "KRK" },
  { name: "Mr. D. B. Barabde", role: "Lab Attendant", photo: "DBB" },
  { name: "Mr. M. U. Sable", role: "Peon", photo: "MUS" },
];

export const defaultCourseMaterials = [
  {
    year: "1",
    title:
      "Dr. M. N. Tibdewal - Digital Image and Video Processing, Signal and System",
    link: "https://ssgmcefablab.in/faculty/ManishTibdewal/",
  },
  {
    year: "2",
    title: "Dr. K. B. Khanchandani - Digital Signal Processing",
    link: "https://ssgmcefablab.in/faculty/KamleshKhanchandani/",
  },
  {
    year: "3",
    title: "Dr. R. S. Dhekekar - Control System, Power Electronics",
    link: "https://ssgmcefablab.in/faculty/RamDhekekar/",
  },
  {
    year: "4",
    title: "Mr. V. M. Umale - Electronics Devices and Circuits, DCN, BME",
    link: "https://ssgmcefablab.in/faculty/VinayakUmale/",
  },
  {
    year: "5",
    title:
      "Mr. D. L. Bhombe - Project Management and Entrepreneurship",
    link: "https://ssgmcefablab.in/faculty/DinkarBhombe/",
  },
  {
    year: "6",
    title: "Dr. S. B. Patil - Object Oriented Programming, Microcontroller",
    link: "https://ssgmcefablab.in/faculty/SantoshPatil/",
  },
  {
    year: "7",
    title: "Dr. D. D. Nawgaje - Microprocessor and Microcontroller",
    link: "https://ssgmcefablab.in/faculty/DeveshNawgaje/",
  },
  {
    year: "8",
    title: "Dr. Ms. B. P. Harane - Electromagnetic Fields, Network Theory",
    link: "https://ssgmcefablab.in/faculty/BhavanaHarne/",
  },
  {
    year: "9",
    title: "Dr. D. P. Tulaskar - Wireless Communication",
    link: "https://ssgmcefablab.in/faculty/DhirajTulaskar/",
  },
  {
    year: "10",
    title: "Mr. A. N. Dolas - SDL, EDC",
    link: "https://ssgmcefablab.in/faculty/AmitDolas/",
  },
  {
    year: "11",
    title: "Mr. V. K. Bhangdiya - Digital System Design",
    link: "https://ssgmcefablab.in/faculty/VikasBhangdiya/",
  },
  {
    year: "12",
    title: "Dr. K. T. Kahar - Analog and Digital Communication",
    link: "https://ssgmcefablab.in/faculty/KamleshKahar/",
  },
  {
    year: "13",
    title:
      "Ms. K. S. Vyas - Cryptography and Network Security, Wireless Communication",
    link: "https://ssgmcefablab.in/faculty/KomalThanvi/",
  },
  {
    year: "14",
    title: "Mr. S. P. Badar - Network Security and VLSI",
    link: "https://ssgmcefablab.in/faculty/SwapnilBadar/",
  },
  {
    year: "15",
    title: "Mr. T. P. Marode - Python, Java CNS",
    link: "https://ssgmcefablab.in/faculty/TejraoMarode/",
  },
  {
    year: "16",
    title: "Mr. S. G. Nemane - ADC",
    link: "https://ssgmcefablab.in/faculty/ShonNemane/",
  },
  {
    year: "17",
    title:
      "Mr. V. S. Ingole - Object Oriented Programming, Microcontroller",
    link: "https://ssgmcefablab.in/faculty/vikramingole/",
  },
  {
    year: "18",
    title: "Mrs. Ashwini Deshmukh - Mobile Communication",
    link: "https://ssgmcefablab.in/faculty/AshwiniDeshmukh/",
  },
  {
    year: "19",
    title: "Dr. Rupesh Mahamune - Sensors and Transducer",
    link: "http://sunl.li/gdhpgw",
  },
  {
    year: "20",
    title:
      "Dr. Neerja Dharmale - Digital Image and Video Processing, Digital Signal Processing",
    link: "https://rb.gy/vy9v8a",
  },
  {
    year: "21",
    title: "Mr. H. B. Patil - ADE, DSD",
    link: "https://shorturl.at/CE3wu",
  },
];
export const defaultInnovativePractices = [
  {
    sn: "01",
    faculty: "Dr. K. B. Khanchandani",
    subject: "Embedded Systems",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/Dr_KBK_Sample_PPT_ES.pdf",
  },
  {
    sn: "",
    faculty: "",
    subject: "Embedded Systems",
    practice: "Project Based Learning & Simulations",
    link: "/uploads/documents/entc_innovative/Dr_KBK_Sample_PBL_ES.pdf",
    rowSpanParent: false,
  },
  {
    sn: "",
    faculty: "",
    subject: "Digital Signal Processing",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/Dr_KBK_Simulations_DSP.pdf",
    rowSpanParent: false,
  },
  {
    sn: "02",
    faculty: "Dr. M. N. Tibdewal",
    subject: "Signals & Systems",
    practice: "Google Form Created for the Quiz",
    link: "/uploads/documents/entc_innovative/MNT_Quiz_Assignments_SS.pdf",
  },
  {
    sn: "",
    faculty: "",
    subject: "Digital Image Processing",
    practice: "Video Lecture Created",
    link: "/uploads/documents/entc_innovative/MNT_Videos_Lecture_DIP.pdf",
    rowSpanParent: false,
  },
  {
    sn: "03",
    faculty: "Dr. S. B. Patil",
    subject: "Analog Circuits",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/Dr_SBP_PPT_Sample_AnalogCircuits.pdf",
  },
  {
    sn: "04",
    faculty: "Mr. D. L. Bhombe",
    subject: "Project Management and Entrepreneurship",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/DLB_Quiz_Assignments_PME.pdf",
  },
  {
    sn: "",
    faculty: "",
    subject: "Wireless Sensor Network",
    practice: "NPTEL Video",
    link: "/uploads/documents/entc_innovative/DLB_Sample_Videos_WSN.pdf",
    rowSpanParent: false,
  },
  {
    sn: "05",
    faculty: "Dr. B. P. Harne",
    subject: "Electromagnetic Waves",
    practice: "Power Point Presentation with Animations",
    link: "/uploads/documents/entc_innovative/Dr_BPH_Sample_PPTs_EW.pdf",
  },
  {
    sn: "06",
    faculty: "Dr. D. P. Tulaskar",
    subject: "Analog and Digital Communication",
    practice: "YouTube Video",
    link: "/uploads/documents/entc_innovative/Dr_DPT_Sample_Video_ADC.pdf",
  },
  {
    sn: "07",
    faculty: "Mr. V. K. Bhangdiya",
    subject: "Digital System Design",
    practice: "YouTube Video",
    link: "/uploads/documents/entc_innovative/VKB_Video_Feedback_DSD.pdf",
  },
  {
    sn: "08",
    faculty: "Dr. K. T. Kahar",
    subject: "Analog and Digital Communication",
    practice: "YouTube Video",
    link: "/uploads/documents/entc_innovative/Dr_KTK_Sample_Videos_ADC.pdf",
  },
  {
    sn: "09",
    faculty: "Miss. K. S. Vyas",
    subject: "Cryptography and Network Security",
    practice: "YouTube Video",
    link: "/uploads/documents/entc_innovative/KSV_Sample_Videos_CNS.pdf",
  },
  {
    sn: "",
    faculty: "",
    subject: "Cryptography and Network Security",
    practice: "Virtual Lab: IIT Bombay",
    link: "/uploads/documents/entc_innovative/KSV_Virtual_Lab_Feedback_CNS.pdf",
    rowSpanParent: false,
  },
  {
    sn: "10",
    faculty: "Dr. S. P. Badar",
    subject: "Network Theory",
    practice: "YouTube Video",
    link: "/uploads/documents/entc_innovative/Dr_SPB_Sample_Videos_NT.pdf",
  },
  {
    sn: "11",
    faculty: "Mr. T. P. Marode",
    subject: "Cryptography and Network Security",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/TPM_CNS_PPT_Sample.pdf",
  },
  {
    sn: "",
    faculty: "",
    subject: "Cryptography and Network Security",
    practice: "Virtual Lab: IIT Bombay",
    link: "/uploads/documents/entc_innovative/TPM_CNS_Virtual_Lab.pdf",
    rowSpanParent: false,
  },
  {
    sn: "12",
    faculty: "Mr. S. G. Nemane",
    subject: "Satellite Communication",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/SGN_SatCom_PPT.pdf",
  },
  {
    sn: "13",
    faculty: "Miss. A. A. Deshmukh",
    subject: "Analog and Digital Communication",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/AAD_PPT_Sample_ADC.pdf",
  },
  {
    sn: "",
    faculty: "",
    subject: "Engineering Economics",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/AAD_PPT_Sample_EE.pdf",
    rowSpanParent: false,
  },
  {
    sn: "",
    faculty: "",
    subject: "Mobile Communication",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/AAD_PPT_Sample_MCN.pdf",
    rowSpanParent: false,
  },
  {
    sn: "14",
    faculty: "Mr. H. B. Patil",
    subject: "Digital System Design",
    practice: "NPTEL Video",
    link: "/uploads/documents/entc_innovative/HBP_Sample_Videos_DSD.pdf",
  },
  {
    sn: "15",
    faculty: "Dr. Mrs. N. S. Dharmale",
    subject: "Digital Image & Video Processing",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/Dr_NSD_PPT_Sample_DIVP.pdf",
  },
  {
    sn: "",
    faculty: "",
    subject: "Digital Signal Processing",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/Dr_NSD_PPT_Sample_DSP.pdf",
    rowSpanParent: false,
  },
  {
    sn: "",
    faculty: "",
    subject: "Microwave Theory & Techniques",
    practice: "Power Point Presentation",
    link: "/uploads/documents/entc_innovative/Dr_NSD_PPT_Sample_MTT.pdf",
    rowSpanParent: false,
  },
  {
    sn: "16",
    faculty: "Dr. R. S. Mahamune",
    subject: "Sensors and Transducers",
    practice: "Power Point Presentation",
    link: null,
  },
];

// ─── Innovative Practices: Markdown converter helpers ─────────────────────────

export function entcInnovativePracticesToMarkdown(practicesData = []) {
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

export function entcMarkdownToInnovativePractices(markdown = "") {
  if (!markdown || typeof markdown !== "string") {
    return [];
  }

  const lines = markdown.split("\n");
  const practices = [];

  let inTable = false;
  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) continue;

    // Skip markdown headers
    if (trimmed.startsWith("#")) {
      continue;
    }

    // Detect the table header row once and start parsing from the next rows.
    if (
      !inTable &&
      trimmed.match(/^\|.*\|$/) &&
      !trimmed.match(/^\|[\s-|]+\|$/)
    ) {
      inTable = true;
      continue;
    }

    // Skip separator rows (all dashes and pipes)
    if (trimmed.match(/^\|[\s-|]+\|$/)) {
      continue;
    }

    // Parse data rows (only if we're in table mode)
    if (inTable && trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const cells = trimmed
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell.length > 0);

      // Only add valid rows (must have sn) and skip header rows
      if (cells.length >= 5 && cells[0] && cells[0].length > 0 && cells[0] !== "S.N") {
        practices.push({
          sn: cells[0],
          faculty: cells[1] || "",
          subject: cells[2] || "",
          practice: cells[3] || "",
          link: cells[4] || "",
          isExternal: (cells[4] || "").includes("http") || (cells[4] || "").includes("youtu"),
        });
      }
    }
  }

  return practices;
}

export const defaultEntcInnovativePracticesMarkdown = entcInnovativePracticesToMarkdown(
  defaultInnovativePractices,
);

export const defaultOverview = {
  degrees: {
    be: {
      title: "UG: B.E. Electronics and Telecommunication Engineering",
      degree: "B.E.",
      duration: "4 Years",
      intake: "60",
      establishment: "1983",
      nba: "Accredited 05 times by NBA, AICTE, New Delhi",
    },
    me: {
      title: "PG: M.E. Digital Electronics",
      degree: "M.E.",
      duration: "2 Years",
      intake: "18",
      establishment: "",
      nba: "Accredited once by NBA, AICTE, New Delhi",
    },
    phd: {
      title: "Ph.D. in Electronics and Telecommunication Engineering",
      degree: "Ph.D.",
      duration: "3-5 Years",
      intake: "",
      establishment: "",
      nba: "",
    },
  },
};

export const defaultEntcPatents = {
  "2024-25": [
    {
      title: "A Data Analytics Configuration for an Unmanned Aerial Vehicle",
      status: "Published",
      id: "202421043408A",
      inventors: "Dr. Kamlesh Kahar, Dr. Santosh Patil",
    },
    {
      title: "An Unmanned Aerial Vehicle",
      status: "Published",
      id: "202521000170A",
      inventors: "Dr. Kamlesh Kahar, Dr. Santosh Patil",
    },
  ],
  "2023-24": [
    {
      title: "A Seeding Device For An Unmanned Aerial Vehicle",
      status: "Filed",
      id: "202421032258",
      inventors: "Dr. Santosh B. Patil and Others",
    },
    {
      title: "Emotional Insight Monitoring Wearable Device",
      status: "Published (Design Patent)",
      id: "418067-001",
      inventors: "Dr. Rupesh Mahamune, Dr. Neerja Dharmale",
    },
  ],
  "2022-23": [
    {
      title:
        "Endodontic file to avoid fracture in root canal during root canal therapy using machine learning",
      status: "Published",
      id: "202221003764",
      inventors: "Dr. S. B. Patil",
    },
  ],
  "2021-22": [
    {
      title:
        "Denoising of motion artifacts induced MRI scans using deep learning techniques: modified restricted Boltzmann machine (MRBM) and conditional generative adversarial network (CGAN)",
      status: "Published (Copyright)",
      id: "L-107828/2021",
      inventors: "Dr. M. N. Tibdewal",
    },
    {
      title:
        "Mobile communication prank calls avoidance by prefixes and number formats",
      status: "Published",
      id: "202121023739",
      inventors: "Dr. S. B. Patil",
    },
  ],
  "2020-21": [],
  "2019-20": [],
  "2018-19": [],
};

export const defaultEntcPublications = {
  "2024-25": [
    {
      title:
        "Design of a model for multistage classification of diabetic retinopathy and glaucoma",
      authors: "Dr. Devesh D. Nawgaje",
      journal:
        "International Journal of Informatics and Communication Technology (IJ-ICT), Vol. 13, No. 2, August 2024, ISSN: 2252-8776, Scopus",
      link: "https://ijict.iaescore.com/index.php/IJICT/article/view/20799",
    },
    {
      title:
        "Detection and Analysis of Plant Leaf Disease Using Artificial Intelligence",
      authors: "Dr. D. D. Nawgaje",
      journal:
        "International Research Journal of Modernization in Engineering Technology and Science (IRJMETS), Vol. 06, Issue 07, July 2024, e-ISSN: 2582-5208, Google Scholar",
      link: "https://www.irjmets.com",
    },
    {
      title: "Blockchain Technology in Healthcare Applications",
      authors: "Ashwini Deshmukh, Komal Vyas",
      journal:
        "The Indian Journal of Technical Education, Vol. 48, Special Issue, No. 1, February 2025, ISSN: 0971-3034, UGC Care",
      link: "https://www.isteonline.in",
    },
    {
      title:
        "Design and Analysis of Optimized Multiband Microstrip Planar Patch Antenna for Wireless Applications",
      authors: "Dr. S. B. Patil, Dr. D. P. Tulaskar, S. G. Nemane",
      journal:
        "The Indian Journal of Technical Education, Vol. 48, February 2025, Special Issue, No. 1, ISSN: 0971-3034, UGC Care",
      link: "https://www.isteonline.in",
    },
    {
      title:
        "Design of an Iterative Model Integrating Bacterial Foraging Optimizer and Q-Learning for Enhanced Congestion Management in Wireless Networks",
      authors: "Manish N. Tibdewal",
      journal:
        "Frontiers in Health Informatics, ISSN Online: 2676-7104, UGC Care and Scopus Indexed",
      link: "https://healthinformaticsjournal.com/index.php/IJMI/article/download/171/170/281",
    },
    {
      title:
        "A Compact Arrowhead-Shaped Feed Circular Metallic Microstrip Patch Triple-Band Antenna for Multi-Standard Wireless Communication Services",
      authors: "S. B. Patil, D. P. Tulaskar",
      journal: "Informatics Journal (JMMF), Scopus",
      link: "https://www.informaticsjournals.co.in/index.php/jmmf/article/view/49192",
    },
    {
      title:
        "Recent Advances in Design and Optimization of Low Noise Amplifiers for Multistandard Receivers",
      authors: "D. P. Tulaskar, S. G. Nemane",
      journal:
        "Indian Journal of Technical Education (IJTE), UGC Care (Accepted)",
      link: "",
    },
    {
      title:
        "Design of electronic module for fitness, health and safety in smart shoes",
      authors: "Dr. S. B. Patil",
      journal: "IRJMETS, Volume 7, Issue 4, April 2025, Peer Reviewed",
      link: "https://www.irjmets.com",
    },
    {
      title: "IoT based smart blood bank system",
      authors: "Mr. V. M. Umale",
      journal:
        "IJRTI, Volume 10, Issue 4, April 2025, ISSN: 2456-3315, Peer Reviewed",
      link: "https://www.ijrti.org/papers/IJRTI2504173.pdf",
    },
    {
      title:
        "Gesture recognition-based security alert system using raspberry pi and YOLOv5",
      authors: "Mr. D. L. Bhombe",
      journal: "IRJMETS, Peer Reviewed",
      link: "https://www.irjmets.com",
    },
    {
      title:
        "A hybrid model for soybean yield prediction integrating CNN, RNN, GCN",
      authors: "Mr. V. S. Ingole",
      journal: "Computation 2025, 13(1), 4, Scopus",
      link: "https://www.mdpi.com/2079-3197/13/1/4",
    },
    {
      title: "EOG signal analysis for efficient human computer interaction",
      authors: "Mr. S. P. Satal",
      journal:
        "Journal of Advances in Electronics Signal Processing, Vol. 1, Issue 2, August 2024, Peer Reviewed",
      link: "https://matjournals.net/engineering/index.php/JoAESP/article/view/763",
    },
    {
      title: "Fire Fighting robot car solution",
      authors: "Dr. Devesh D. Nawgaje",
      journal:
        "IRJMETS, e-ISSN: 2582-5208, Volume 7, Issue 3, March 2025, Peer Reviewed",
      link: "https://www.irjmets.com",
    },
  ],
  "2023-24": [
    {
      title:
        "A survey on Motion Artifact Correction in Magnetic Resonance Imaging for Improved Diagnostics",
      authors: "M. N. Tibdewal",
      journal:
        "SCI, Scopus, ACM Digital Library, Google Scholar Indexed, Feb 2024",
      link: "https://link.springer.com/article/10.1007/s42979-023-02596-1#citeas",
    },
    {
      title: "Analyzing Polar Decoding Approaches: A Comparative Study",
      authors: "Mr. S. P. Badar, Dr. K. Khanchandani",
      journal:
        "Journal of VLSI Design and Signal Processing, 9(3), 2023, e-ISSN: 2581-8449, Google Scholar",
      link: "https://drive.google.com/file/d/14ljjM1_bCB_a6p7_fsh2v7XGx7tGX7lL/view",
    },
    {
      title:
        "Performance Analysis of Un-doped and Doped Titania (TiO2) as an Electron Transport Layer (ETL) for Perovskite Solar Cells",
      authors: "Dr. Neerja Dharmale",
      journal:
        "Vol. 30, No. 5, DOI: 10.1007/s00894-024-05943-y, Year 2024, SCI, Scopus",
      link: "https://link.springer.com/article/10.1007/s00894-024-05943-y",
    },
    {
      title:
        "Evaluating the Effect of Metal, Nonmetal, and Co-doping on Brookite TiO2",
      authors: "Dr. Neerja Dharmale",
      journal: "Year 2024, DOI: 10.1142/S1793292024500425, SCI, Scopus",
      link: "https://worldscientific.com/doi/10.1142/S1793292024500425",
    },
    {
      title: "Optimizing Brain Tumor Detection using Machine Learning",
      authors: "Dr. Neerja Dharmale",
      journal: "Year 2024, Vol. 2, Issue 1, Google Scholar, Referred Journal",
      link: "https://ssgmjournal.in/index.php/ssgm/article/view/100",
    },
    {
      title:
        "A powerful method for interactive content-based image retrieval by variable compressed convolutional info neural networks",
      authors: "Dr. Santosh B. Patil",
      journal: "DOI: 10.1007/s00371-023-03104-5, 01 Oct 2023, SCI Journal",
      link: "https://www.researchgate.net/publication/374369027",
    },
    {
      title:
        "Bridging Agricultural Communities: A Digital Platform for Machinery",
      authors: "Mr. Vikram Ingole",
      journal: "Volume 12, Issue 4, April 2024, ISSN: 2320-2882, UGC CARE",
      link: "http://ijcrt.org/viewfull.php?&p_id=IJCRT24A4228",
    },
    {
      title:
        "Design And Development Of Seed/Granule Spreader Mechanism For Unmanned Aerial Vehicle (UAV)",
      authors: "Vikram Ingole",
      journal: "Volume 12, Issue 4, April 2024, ISSN: 2320-2882, UGC CARE",
      link: "https://ijcrt.org/viewfull.php?&p_id=IJCRT24A4427",
    },
    {
      title: "Research on Soyabean Seed Grading",
      authors: "Ms. Ashwini A. Deshmukh and Others",
      journal: "AJANTA, ISSN 2277-5730, Referred Journal",
      link: "https://drive.google.com/file/d/1Fge8uvSfsZLN_Hro3hq_0DGn2RlMOWv8/view",
    },
    {
      title: "Design and Development of Seed Germination using IOT",
      authors: "Prof. S. G. Nemane, Dr. D. P. Tulaskar and Others",
      journal:
        "Volume 15, Issue 2, ISSN Print: 0976-6480, ISSN Online: 0976-6499, Google Scholar, SCOPE Database Indexed",
      link: "https://iaeme.com/Home/article_id/IJARET_15_02_003",
    },
    {
      title: "Industrial Robotic Arm System",
      authors: "Dr. Kamlesh Kahar and Others",
      journal: "Year 2024, Vol. 2, Issue 1, Google Scholar",
      link: "https://ssgmjournal.in/index.php/ssgm/article/view/101",
    },
    {
      title: "Assistive Navigational Stick",
      authors: "Dr. Kamlesh Kahar and Others",
      journal: "Year 2024, Vol. 2, Issue 1, Google Scholar",
      link: "https://ssgmjournal.in/index.php/ssgm/article/view/102",
    },
    {
      title:
        "Efficient Content Based Image Retrieval System Based on Early and Late Fusion Technique",
      authors:
        "Mr. Pranav Lod, Mr. V. S. Mahalle, Mr. N. M. Kandoi, Dr. S. B. Patil",
      journal:
        "Volume 18, Issue 5, PP 1205-1224, ISSN: 1001-2400, May 2024, Scopus",
      link: "https://zenodo.org/records/11299605",
    },
    {
      title:
        "Optimization of MEMS-based Energy Scavengers and output prediction with machine learning and synthetic data approach",
      authors: "Dr. Kamlesh Kahar, Dr. Ram Dhekekar",
      journal:
        "Volume 358, 16 August 2023, 114429, DOI: 10.1016/j.sna.2023.114429, SCI",
      link: "https://www.sciencedirect.com/science/article/pii/S0924424723002789",
    },
    {
      title:
        "Statistical Analysis of Retinal Image Processing Techniques from an Empirical Perspective",
      authors: "Dr. D. D. Nawgaje",
      journal:
        "The Indian Journal of Technical Education, September 2023, Volume 46, pp. 196-204, UGC Care",
      link: "https://www.isteonline.in",
    },
    {
      title:
        "U-Net-based gannet sine cosine algorithm enabled lesion segmentation and deep CNN for diabetic retinopathy classification",
      authors: "Dr. D. D. Nawgaje",
      journal:
        "Computer Methods in Biomechanics and Biomedical Engineering: Imaging & Visualization, Scopus",
      link: "https://www.tandfonline.com/doi/abs/10.1080/21681163.2023.2236233",
    },
    {
      title: "Vehicle safety system for blind spot and Hilly areas",
      authors: "Dr. Kamlesh Kahar",
      journal: "SSGMJSE, Google Scholar",
      link: "https://www.researchgate.net/profile/Kamlesh_Kahar",
    },
    {
      title:
        "Micro Scale Energy Scavengers for low power applications in Rural Areas",
      authors: "Dr. Kamlesh Kahar",
      journal: "SSGMJSE, Google Scholar",
      link: "https://ssgmjournal.in/index.php/ssgm/article/view/41",
    },
    {
      title:
        "Design of a model for multistage classification of diabetic retinopathy and glaucoma",
      authors: "Dr. D. D. Nawgaje",
      journal:
        "International Journal of Informatics and Communication Technology (IJ-ICT), DOI: 10.11591/ijict.v13i2.pp214-222, Scopus",
      link: "https://ijict.iaescore.com/index.php/IJICT/article/viewFile/20799/13044",
    },
  ],
  "2022-23": [
    {
      title: "MEMS based energy scavenger with inter digitated electrodes",
      authors: "Dr. K. T. Kahar, Dr. R. S. Dhekekar",
      journal:
        "Volume 72, Part 1, 2023, Pages 350-360, DOI: 10.1016/j.matpr.2022.08.106, Scopus",
      link: "https://www.sciencedirect.com/science/article/abs/pii/S2214785322052622",
    },
    {
      title: "MEMS-based energy scavengers: journey and future",
      authors: "Dr. K. T. Kahar, Dr. R. S. Dhekekar",
      journal:
        "Volume 28, pp. 1971-1993, 2022, ISSN: 0946-7076/1432-1858, DOI: 10.1007/s00542-022-05356-y, SCIE",
      link: "https://link.springer.com/article/10.1007/s00542-022-05356-y",
    },
    {
      title:
        "Modified restricted Boltzmann machine (mRBM) for denoising of motion artifact-induced MRI scans",
      authors: "Dr. M. N. Tibdewal",
      journal:
        "Volume 39, pp. 73-83, 2023, DOI: 10.1007/s42600-022-00252-w, Scopus + ESCI",
      link: "https://link.springer.com/article/10.1007/s42600-022-00252-w",
    },
  ],
  "2021-22": [
    {
      title:
        "Multi-Feature Extraction, Analysis and Classification for Control and Meditators' Electroencephalogram",
      authors: "Dr. M. N. Tibdewal",
      journal: "Volume 16, Issue 8, SCI Indexed Journal",
      link: "https://link.springer.com/article/10.1007/s11760-022-02191-6",
    },
    {
      title:
        "Deep Learning Models for Classification of Cotton Crop Disease Detection",
      authors: "Dr. M. N. Tibdewal",
      journal: "ISSN: 0932-4747, 2022, Google Scholar, UGC CARE",
      link: "https://drive.google.com/file/d/1u7dCR_y68lGqM_0g8ReJ1p7vLBywihWZ/view",
    },
    {
      title:
        "Pneumonia Analysis, Detection, and Classification through Various Classifiers",
      authors: "Dr. M. N. Tibdewal",
      journal:
        "Volume 11, Issue 05, May 2022, Print ISSN: 2277-8160, Peer Reviewed",
      link: "https://www.worldwidejournals.com/global-journal-for-research-analysis-GJRA/fileview/pneumonia-analysis-detection-and-classification-through-various-classifiers_May_2022_6532336113_0908889.pdf",
    },
    {
      title:
        "A Methodology for evolution of diabetic retinopathy from digital fundus Image",
      authors: "Dr. D. D. Nawgaje",
      journal: "Volume 3, Issue 7, July 2021, ISSN: 2395-5252, Peer Reviewed",
      link: "https://ijaem.net/issue_dcp/A%20Methodology%20for%20evaluation%20of%20Diabetic%20Retinopathy%20from%20Digital%20Fundus%20Images.pdf",
    },
    {
      title:
        "Smart Wheelchair with safety, security and health monitoring system",
      authors: "Dr. K. B. Khanchandani",
      journal: "ISSN: 0932-4747, Google Scholar, UGC CARE",
      link: "https://drive.google.com/file/d/1xikKvR3N2J5TJkd6APO_qYw--cHH_QPL/view",
    },
    {
      title: "Smart IOT Energy Meter with Theft Protection",
      authors: "Dr. K. B. Khanchandani",
      journal: "ISSN: 0932-4747, Google Scholar, UGC CARE",
      link: "https://drive.google.com/file/d/1fDHendbfuXvEkqqrm-PTbFP_13dDrqfe/view",
    },
    {
      title: "Small Size Digital Oscilloscope Using ARM Processor",
      authors: "V. M. Umale",
      journal:
        "ISSN: 2321-9653, IC Value: 45.98, Volume 9, Issue VII, July 2021, Peer Reviewed",
      link: "https://www.ijraset.com/fileserve.php?FID=36151",
    },
    {
      title:
        "IoT Based Remote Health Monitoring System with Electrocardiograph",
      authors: "V. M. Umale",
      journal:
        "ISSN (Online) 2581-9429, Volume 2, Issue 1, June 2022, Peer Reviewed",
      link: "https://ijarsct.co.in/Paper4620.pdf",
    },
    {
      title:
        "Design and development of warehouse management system for prevention from hazards",
      authors: "Dr. D. P. Tulaskar, S. G. Nemane",
      journal:
        "Volume 10, Issue 4, eISSN: 2320-2084, pISSN: 2321-2950, Peer Reviewed",
      link: "https://iraj.in/journal/IJEEDC//paper_detail.php?paper_id=18554",
    },
    {
      title: "Student Performance Evaluation System Web Application",
      authors: "V. S. Ingole",
      journal:
        "ISSN (Online) 2581-9429, Volume 2, Issue 6, May 2022, Peer Reviewed",
      link: "https://ijarsct.co.in/Paper4269.pdf",
    },
    {
      title: "IOT based home automation and security using ESP 32",
      authors: "K. S. Vyas",
      journal: "ISSN: 1548-7741, Volume 12, Issue 5, 2022, Peer Reviewed",
      link: "https://drive.google.com/file/d/1OE4MkEbnfXigfxGHHG8bM15pWQrZD1-I/view",
    },
    {
      title: "Door Security System for Home Monitoring based on Arduino UNo",
      authors: "K. S. Vyas",
      journal: "ISSN: 1548-7741, Peer Reviewed",
      link: "https://drive.google.com/file/d/1Zk1QgdqmZemSsWVqaNq_dUMIvygSDdyh/view",
    },
    {
      title: "The IoT Based Exercise Cycle",
      authors: "Dr. K. T. Kahar",
      journal: "ISSN (Online) 2581-9429, Google Scholar",
      link: "https://ijarsct.co.in/Paper3668.pdf",
    },
  ],
  "2020-21": [
    {
      title:
        "A Review Paper on Human Visualization Diagnosis for Retinal Disease Using Soft Computing Techniques",
      authors: "D. R. Bhatkar, Dr. D. D. Nawgaje",
      journal:
        "ISSN: 2455-6211, May 2021, International Journal, Google Scholar",
      link: "http://www.ijaresm.com",
    },
    {
      title:
        "Increased theta activity after Om mantra meditation with Fourier and wavelet transform",
      authors: "Dr. Bhavna P. Harne, Dr. Anil S. Hiwale",
      journal:
        "ISSN: 2052-8477, eISSN: 2052-8485, May 2021, DOI: 10.1504/IJISDC.2020.115166, Scopus",
      link: "https://www.inderscienceonline.com/doi/abs/10.1504/IJISDC.2020.115166",
    },
  ],
  "2019-20": [
    {
      title:
        "Automated e-billing and power control system through power line communication",
      authors: "Mr. D. L. Bhombe, Dr. D. D. Nawgaje",
      journal:
        "ISSN 2348-8034, DOI: 10.5281/zenodo.1495055, International Journal",
      link: "https://zenodo.org/record/1548587/files/26.docx?download=1",
    },
    {
      title:
        "Explore the Effect of Om Mantra Meditation on Brain with Wavelet Analysis",
      authors: "Dr. Bhavna Harne",
      journal:
        "E-ISSN: 2224-3488, Vol. 15, PP 13-15, December 2019, Google Scholar",
      link: "https://www.wseas.org/multimedia/journals/signal/2019/a105114-685.pdf",
    },
    {
      title:
        "Design of Vehicle Protection and Tracking System Using Face Recognition",
      authors: "Dr. S. B. Patil, Dr. P. R. Wankhede",
      journal: "e-ISSN 2455-2585, International Journal",
      link: "https://www.ijtimes.com",
    },
    {
      title:
        "Automated Micro-aneurysms Detection using Pixel Intensity Rank Transform",
      authors: "Dr. Pravin Wankhede, Dr. Kamlesh Khanchandani",
      journal: "DOI: 10.13005/bpj/1859, Vol. 13, Issue 1, Scopus",
      link: "https://biomedpharmajournal.org/vol13no1/automated-microaneurysms-detection-from-retinal-fundus-images-using-pixel-intensity-rank-transform/",
    },
    {
      title: "Feature Extraction in Retinal Images using Automated Methods",
      authors: "Dr. Pravin Wankhede, Dr. Kamlesh Khanchandani",
      journal: "Vol. 9, Issue 3, March 2020, Scopus",
      link: "http://www.ijstr.org/final-print/mar2020/Feature-Extraction-In-Retinal-Images-Using-Automated-Methods.pdf",
    },
    {
      title:
        "200W Ku band GaN HEMT Power Amplifier for Satellite Communication",
      authors: "Dr. Vivek V. Ratnaparkhi",
      journal: "Vol. 08, International Journal, Scopus",
      link: "http://www.ijstr.org/final-print/sep2019/200w-Ku-band-Gan-Hemt-Power-Amplifier-For-Satellite-Communication.pdf",
    },
    {
      title:
        "Review of GaN HEMT High Power Amplifiers for Microwave Applications",
      authors: "Dr. Vivek V. Ratnaparkhi",
      journal: "Vol. 29, 2020, International Journal, Scopus",
      link: "https://www.researchgate.net/profile/Vivek-Ratnaparkhi/publication/342513679",
    },
    {
      title: "Creation of Dashboard for Financial Accounting in SAP",
      authors: "Mr. T. P. Marode",
      journal: "Vol. 3, May 2020, ISSN: 2544-6491, Google Scholar",
      link: "https://drive.google.com/file/d/1jMI8CPKR3M3-cN5PhA5FqP5J2zMgiq4e/view",
    },
    {
      title:
        "A novel hybrid atlas-free hierarchical graph-based segmentation of newborn brain MRI using wavelet filter banks",
      authors: "Mr. Kamlesh Kahar, Dr. K. B. Khanchandani",
      journal:
        "ISSN: 0020-7454, eISSN: 1563-5279, December 2019, DOI: 10.1080/00207454.2019.1695609, SCI",
      link: "https://www.tandfonline.com/doi/full/10.1080/00207454.2019.1695609",
    },
  ],
  "2018-19": [
    {
      title:
        "Automated e-billing & Power control system through power line communication",
      authors: "Mr. D. L. Bhombe, Dr. D. D. Nawgaje",
      journal: "ISSN 2348-8034, International Journal",
      link: "http://www.gjesr.com",
    },
    {
      title: "A survey on parallel imaging in magnetic Resonance imaging",
      authors: "Dr. K. B. Khanchandani, Mr. V. K. Bhangdiya",
      journal: "May 2019, Volume 6, Issue 5, ISSN: 2349-5162, UGC CARE",
      link: "https://www.jetir.org/papers/JETIR1905N86.pdf",
    },
    {
      title:
        "IOT Based Smart Wireless Sensor Network for Industrial Automation: A Review",
      authors: "Mr. V. N. Bhonge",
      journal:
        "ISSN (Print): 2320-3765, ISSN (Online): 2278-8875, September 2018",
      link: "http://www.ijareeie.com/upload/2018/september/7_IOT.pdf",
    },
    {
      title:
        "IOT Based Smart Wireless Sensor Network for Industrial Automation",
      authors: "Mr. V. N. Bhonge",
      journal:
        "ISSN (Online): 2320-9801, ISSN (Print): 2320-9798, Vol. 6, Issue 10, October 2018",
      link: "http://ijircce.com",
    },
    {
      title: "A Wireless IOT System for GAIT Detection in stroke Patent",
      authors: "Mr. V. N. Bhonge",
      journal: "May 2019, Volume 6, Issue 5, ISSN: 2349-5162",
      link: "https://www.jetir.org/papers/JETIR1905G51.pdf",
    },
    {
      title: "EEG Spectral Analysis on OM Mantra Meditation: A Pilot Study",
      authors: "Dr. B. P. Harne",
      journal: "Volume 43, 18 May 2018, Scopus",
      link: "https://link.springer.com/article/10.1007/s10484-018-9391-7",
    },
    {
      title:
        "Explore the effect of Om mantra meditation on brain with wavelet analysis",
      authors: "Dr. B. P. Harne",
      journal: "E-ISSN: 2224-3488, 2019",
      link: "https://www.wseas.org/multimedia/journals/signal/2019/a105114-685.pdf",
    },
    {
      title:
        "Survey on Om Meditation: Its Effects on the Human Body and Om Meditation as a Tool for Stress Management",
      authors: "Dr. B. P. Harne",
      journal: "ISSN: 2193-7281, 2019",
      link: "https://research.mitwpu.edu.in",
    },
  ],
};

export const defaultEntcConferences = {
  "2024-25": [
    {
      title:
        "Precision Cotton Health Classification: A Deep Learning Approach for Disease Detection",
      authors: "Dr. Neerja Dharmale, Dr. Rupesh Mahamune",
      journal:
        "ANRF Sponsored ICET 2025 Conference, 21-22 February, ENERGY CENTRE, MANIT, Scopus",
      link: "",
    },
    {
      title:
        "Early Detection of Bollworm Infestation in Cotton Plants Using Convolutional Neural Networks",
      authors:
        "Dr. Neerja Dharmale, Ashwini Pohare, Dipali Thokal, Nisha Pimple, Anuja Lande",
      journal:
        "ANRF Sponsored ICET 2025 Conference, 21-22 February, ENERGY CENTRE, MANIT, Scopus",
      link: "",
    },
    {
      title:
        "Drone-Based Weirs Inspection and Analysis for Enhancing Infrastructure Monitoring of Water Resources in Smart Cities",
      authors: "Dr. K. T. Kahar, Tejas Kale, Sahil Mathurkar, Pratham Kale",
      journal:
        "ANRF Sponsored ICET 2025 Conference, 21-22 February, ENERGY CENTRE, MANIT, Scopus",
      link: "",
    },
    {
      title:
        "Classification of EMG-based Hand Gestures using Time and Frequency Domain Features",
      authors:
        "R. S. Mahamune, Pravara Nemade, Sakshi Suradkar, Sakshi Dandale, Srushti Naphade, Mruti Gangane",
      journal:
        "International Conference on Emerging Smart Computing & Informatics 2025 (5-7 March 2025), IEEE, Scopus",
      link: "",
    },
    {
      title:
        "Integrated AI and 6G Driven e-Health: Enabling Design, Challenges, and Future Prospects",
      authors: "Amit N. Dolas",
      journal:
        "2024 IEEE Conference on Standards for Communications and Networking (CSCN 2024), Belgrade, Serbia, 25-27 November 2024, DOI: 10.1109/CSCN63874.2024.10849692, Scopus",
      link: "https://ieeexplore.ieee.org/document/10849692",
    },
    {
      title:
        "Exploring the role of Machine learning in Advancing Crop Disease Detection",
      authors: "Ashwini Deshmukh, Dr. Devesh Nawgaje, Komal Vyas",
      journal:
        "The 3rd International Conference on Futuristic Technologies (INCOFT), 22-23 February 2025, Scopus",
      link: "",
    },
    {
      title:
        "Exploring the potential of Artificial Intelligence in Oral Diseases",
      authors: "Komal Vyas, Dr. Devesh Nawgaje, Ashwini Deshmukh",
      journal:
        "The 3rd International Conference on Futuristic Technologies (INCOFT), 22-23 February 2025, Scopus",
      link: "",
    },
    {
      title:
        "Indoor Navigation System For Visually Impaired Using Beacon Technology",
      authors: "Harshavardhan B. Patil",
      journal:
        "ANRF Sponsored ICET 2025 Conference, 21-22 February, ENERGY CENTRE, MANIT, Scopus",
      link: "",
    },
    {
      title: "Smart Water Level Monitoring and Controlling System",
      authors: "Harshavardhan B. Patil, Dr. M. N. Tibdewal",
      journal:
        "IEEE Technicoknocdown-2025 (TKD-25) National Level Student Conference",
      link: "",
    },
    {
      title:
        "Classification of heart Sound signals using spectral features for diagnosis of heart abnormality",
      authors: "Dr. Manish Tibdewal, Dr. Rupesh Mahamune",
      journal:
        "International Conference on Futuristic Trends in Engineering, Science & Technology ICFTEST-2024, Scopus",
      link: "https://link.springer.com/chapter/10.1007/978-3-031-90580-3_16",
    },
    {
      title: "Deep learning for soybean disease detection with VGG-16 MODEL",
      authors: "Mr. V. K. Ingole",
      journal:
        "IEEE Technicoknocdown-2025 (TKD-25) National Level Student Conference",
      link: "",
    },
    {
      title: "Crop yield disease detection using deep learning",
      authors: "Mr. V. K. Ingole",
      journal:
        "IEEE Technicoknocdown-2025 (TKD-25) National Level Student Conference",
      link: "",
    },
    {
      title:
        "Design and implementation an IoT solution to address the challenges of remote patient monitoring and improve healthcare",
      authors: "Dr. M. N. Tibdewal",
      journal:
        "4th Biennial International Conference on future Learning Aspects of Mechanical Engineering (FLAME-2024), Scopus",
      link: "https://link.springer.com/chapter/10.1007/978-981-96-7214-1_4",
    },
    {
      title:
        "Priority based congestion controlling mechanism for wireless sensor network: A Survey",
      authors: "Dr. M. N. Tibdewal",
      journal:
        "4th Biennial International Conference on future Learning Aspects of Mechanical Engineering (FLAME-2024), Scopus",
      link: "https://link.springer.com/chapter/10.1007/978-981-96-7214-1_21",
    },
  ],
  "2023-24": [
    {
      title:
        "Application of OLCAO-GGA and OLCAO-MGGA Techniques for investigating properties of TiO2",
      authors: "Dr. Neerja Dharmale, Dr. Rupesh Mahamune",
      journal:
        "3rd International Conference on Emerging Electronics and Automation (E2A-2023), NIT Silchar, 15-17 December 2023, Scopus",
      link: "https://doi.org/10.1007/978-981-97-6802-8_27",
    },
    {
      title:
        "The multi-scale wavelet approach for the removal of eye-blink artifact from EEG Signals",
      authors: "Dr. Rupesh Mahamune, Dr. N. S. Dharmale",
      journal:
        "3rd International Conference on Emerging Electronics and Automation (E2A-2023), NIT Silchar, 15-17 December 2023, Scopus (Springer Lecture Notes)",
      link: "https://doi.org/10.1007/978-981-97-6802-8_27",
    },
    {
      title: "Elevating Canteen Management with a Modern Web Solution",
      authors: "Mr. Harshwardhan Patil, Dr. Neerja Dharmale",
      journal:
        "2024 IEEE International Students' Conference on Electrical, Electronics and Computer Science, IEEE Scopus",
      link: "",
    },
    {
      title:
        "Efficient Implementation of Polar Decoder: Design and Performance Analysis",
      authors: "Mr. S. P. Badar, Dr. K. Khanchandani",
      journal:
        '3rd International Conference on "Computational Electronics for Wireless Communications" NIT Jalandhar, December 22-23, 2023, Scopus',
      link: "",
    },
    {
      title:
        "MDLGO: Integrated Multimodal Deep Learning Framework for Enhanced Precision in Glaucoma Diagnosis Using OCT A-scans",
      authors: "Dr. D. D. Nawgaje",
      journal:
        "International Conference on Emerging Smart Computing & Informatics 2024, Scopus",
      link: "",
    },
    {
      title:
        "Microelectromechanical System (MEMS) based Energy Scavengers for low power applications",
      authors: "Dr. R. S. Dhekekar, Dr. Kamlesh T. Kahar",
      journal:
        "International Conference on Sustainable Multidisciplinary Advances in Research and Technology (SMART-2023)",
      link: "",
    },
    {
      title:
        "Smart LPG Gas Level Monitoring and leakage Detection System using IoT",
      authors: "Mr. V. M. Umale",
      journal: "SSGMJSE, Google Scholar",
      link: "https://ssgmjournal.in/index.php/ssgm/article/view/53",
    },
    {
      title: "Design and Development of Water Ionizer",
      authors: "Mr. V. M. Umale",
      journal:
        "IEEE INSCIRD-2023, SSGMCE Shegaon, 20-21 April 2023, Google Scholar",
      link: "https://ssgmjournal.in/index.php/ssgm/article/view/55",
    },
  ],
  "2022-23": [
    {
      title:
        "Comparison of different denoising networks on motion Artifacted MRI scans",
      authors: "Dr. M. N. Tibdewal",
      journal:
        "Print ISBN: 978-981-99-0084-8, Online ISBN: 978-981-99-0085-5, Springer Link, Scopus",
      link: "https://link.springer.com/chapter/10.1007/978-981-99-0085-5_25",
    },
    {
      title:
        "Successive Cancellation Polar Decoder Implementation using Processing Elements",
      authors: "Mr. S. P. Badar, Dr. K. B. Khanchandani",
      journal: "Electronic ISBN: 978-1-6654-6658-5, IEEE XPLORE, Scopus",
      link: "https://ieeexplore.ieee.org/document/9864529",
    },
  ],
  "2021-22": [
    {
      title:
        "Application of Modified Restricted Boltzmann Machine (mRBM) for denoising of motion-Artifacted MRI scans",
      authors: "Dr. M. N. Tibdewal",
      journal: "Electronic ISBN: 978-1-6654-6741-4, 15 June 2022, IEEE, Scopus",
      link: "https://ieeexplore.ieee.org/document/9791510",
    },
    {
      title: "Fast Polar Decoder Implementation using Special Nodes",
      authors: "Mr. S. P. Badar, Dr. K. B. Khanchandani",
      journal:
        "Electronic ISBN: 979-8-3503-1071-9, 02 June 2023, DOI: 10.1109/PCEMS58491.2023.10136054, Scopus",
      link: "https://ieeexplore.ieee.org/document/10136054",
    },
  ],
  "2020-21": [],
  "2019-20": [
    {
      title:
        "Study and analysis of Low Power Dynamic Comparator for IOT Application",
      authors: "Ms. L. Samal",
      journal:
        "Electronic ISBN: 978-1-5386-7401-7, 30 Jan 2020, DOI: 10.1109/IBSSC47189.2019.8973040, IEEE/Scopus",
      link: "https://ieeexplore.ieee.org/document/8973040",
    },
    {
      title:
        "Application Specific Instruction Set Processor Design for Embedded Application Using The CoWare Tool",
      authors: "Ms. L. Samal",
      journal:
        "Electronic ISBN: 978-1-7281-1901-4, 18 August 2020, DOI: 10.1109/ICITAET47105.2019.9170210, IEEE/Scopus",
      link: "https://ieeexplore.ieee.org/document/9170210",
    },
    {
      title:
        "Analysis of Electroencephalogram for Cognitive Effects of Human Being Before and After Meditation",
      authors: "Dr. M. N. Tibdewal",
      journal:
        "Electronic ISBN: 978-1-7281-5003-1, 28 May 2020, DOI: 10.1109/I4Tech48345.2020.9102705, Scopus",
      link: "https://ieeexplore.ieee.org/document/9102705",
    },
  ],
  "2018-19": [
    {
      title:
        "Retinal Blood Vessel Segmentation in Fundus Images using Improved Graph Cut Method",
      authors: "Dr. P. R. Wankhede, Dr. K. B. Khanchandani",
      journal:
        "Electronic ISBN: 978-1-5386-5873-4, 01 July 2019, DOI: 10.1109/ICSSIT.2018.8748531, IEEE/Scopus",
      link: "https://ieeexplore.ieee.org/document/8748531",
    },
    {
      title:
        "Design and analysis of Planar wideband Antenna for RF front End multi standard Transceivers",
      authors: "D. P. Tulaskar, Dr. K. B. Khanchandani",
      journal:
        "Electronic ISBN: 978-1-5386-5873-4, DOI: 10.1109/ICSSIT.2018.8748694, 01 July 2019, IEEE/Scopus",
      link: "https://ieeexplore.ieee.org/document/8748694",
    },
    {
      title:
        "ANN Based Automatic detection and classifications of OA and NON artifacts EEG",
      authors: "Dr. M. N. Tibdewal",
      journal:
        "Electronic ISBN: 978-1-5386-2842-3, DOI: 10.1109/ICCONS.2018.8663157, 10 March 2019, IEEE/Scopus",
      link: "https://ieeexplore.ieee.org/document/8663157",
    },
    {
      title:
        "Face Authentication and Auto Sharing Using Deep Learning Algorithm",
      authors: "Mr. V. N. Bhonge",
      journal:
        "Electronic ISBN: 978-1-5386-5257-2, DOI: 10.1109/ICCUBEA.2018.8697649, 25 April 2019, IEEE/Scopus",
      link: "https://ieeexplore.ieee.org/document/8697649",
    },
    {
      title: "SVM classifier approach to explore effect of OM mantra on brain",
      authors: "Dr. R. S. Dhekekar",
      journal:
        "Electronic ISSN: 2325-9418, DOI: 10.1109/INDICON47234.2019.9030339, 12 March 2020, IEEE/Scopus",
      link: "https://ieeexplore.ieee.org/abstract/document/9030339",
    },
  ],
};

export const defaultEntcBooks = {
  "2024-25": [
    {
      name: "R. S. Mahamune, N. S. Dharmale",
      title:
        "The Multi-scale Wavelet Approach to Remove the Eyeblink Artifacts from EEG Signals",
      details:
        "Lecture Notes in Electrical Engineering, vol 1237, Springer, 06 February 2025",
      isbn: "978-981-97-6801-1",
      coAuthors: "",
    },
    {
      name: "N. S. Dharmale, R. S. Mahamune, S. Chaudhury",
      title:
        "Application of OLCAO-GGA and OLCAO-MGGA Techniques for Investigating Properties of TiO2",
      details:
        "Lecture Notes in Electrical Engineering (LNEE, Volume 1202), Springer, 13 February 2025",
      isbn: "Online: 978-981-97-3090-2",
      coAuthors: "",
    },
    {
      name: "Dr. S. P. Badar, Dr. K. B. Khanchandani",
      title:
        "Efficient Implementation of Polar Decoder: Design and Performance Analysis",
      details:
        "Lecture Notes in Networks and Systems (LNNS, Volume 959), Springer Nature Singapore, 01 December 2024",
      isbn: "",
      coAuthors: "",
    },
  ],
  "2023-24": [
    {
      name: "Dr. Santosh B. Patil",
      title:
        "Transfer Learning by Fine-Tuning Pre-trained Convolutional Neural Network Architectures for Image Recognition",
      details: "Data-Intensive Research, Proceedings of IDBA 2023, Springer",
      isbn: "978-981-99-9179-2",
      coAuthors: "",
    },
    {
      name: "Dr. Santosh B. Patil",
      title:
        "Enhancing Efficiency in Content Based Image Retrieval System Using Pre-trained Convolutional Neural Network Models",
      details: "Bentham Book, May 2024",
      isbn: "978-981-5179-61-3",
      coAuthors: "",
    },
  ],
  "2022-23": [],
  "2021-22": [],
  "2020-21": [],
  "2019-20": [],
  "2018-19": [],
};

export const defaultEntcCopyrights = {
  "2024-25": [],
  "2023-24": [],
  "2022-23": [],
  "2021-22": [
    {
      name: "Dr. M. N. Tibdewal",
      title:
        "Denoising of motion artifacts induced MRI scans using deep learning techniques: modified restricted Boltzmann machine (MRBM) and conditional generative adversarial network (CGAN)",
      status: "Published",
    },
  ],
  "2020-21": [],
  "2019-20": [],
  "2018-19": [],
};

export const defaultInternships = {
  "2024-25": [
    {
      no: "1",
      name: "Rutuja Makrant Dalal",
      class: "3U1",
      company: "Hindustan Unilever Limited, Khamgaon",
      duration: "1 Month",
      startDate: "24/06/2024",
      endDate: "23/07/2024",
    },
    {
      no: "2",
      name: "Neha Shivlal Tayade",
      class: "3U2",
      company: "Kirdak Autocom Pvt. Ltd. Aurangabad",
      duration: "15 Days",
      startDate: "01/07/2024",
      endDate: "15/07/2024",
    },
    {
      no: "3",
      name: "Omika Pradeep Chaudhary",
      class: "3U2",
      company: "Kirdak Autocom Pvt. Ltd. Aurangabad",
      duration: "15 Days",
      startDate: "01/07/2024",
      endDate: "15/07/2024",
    },
    {
      no: "4",
      name: "Vidhi Bhade",
      class: "3U2",
      company: "Kirdak Aotucom Pvt. ltd",
      duration: "15 Days",
      startDate: "07/01/2024",
      endDate: "07/12/2024",
    },
    {
      no: "5",
      name: "Akshay Santosh Pahurkar",
      class: "3U2",
      company: "Kirdak Autocom Pvt Lmt",
      duration: "15 Days",
      startDate: "01/07/2024",
      endDate: "15/07/2024",
    },
    {
      no: "6",
      name: "Pratik Sunil Tayde",
      class: "3U2",
      company: "Kridak Autocom Pvt Ltd",
      duration: "15 Days",
      startDate: "01/07/2024",
      endDate: "15/07/2024",
    },
    {
      no: "7",
      name: "Rohan Raut",
      class: "3U2",
      company: "Kirdak Autocom Pvt. ltd",
      duration: "15 Days",
      startDate: "01/07/2024",
      endDate: "15/07/2024",
    },
    {
      no: "8",
      name: "Saurabh Khushal Gaikwad",
      class: "3U2",
      company: "Kirdak Autocom Pvt Ltd",
      duration: "15 Days",
      startDate: "01/07/2024",
      endDate: "15/07/2024",
    },
    {
      no: "9",
      name: "Shripad Gajanan Ingle",
      class: "3U2",
      company: "Kirdak Autocom, Waluj, Chh. Sambajinagar",
      duration: "15 Days",
      startDate: "01/07/2024",
      endDate: "15/07/2024",
    },
    {
      no: "10",
      name: "Divya Devendrarao Somvanshi",
      class: "4U1",
      company: "Dhoot Transmission Pvt. Ltd.",
      duration: "45 Days",
      startDate: "20/05/2024",
      endDate: "09/07/2024",
    },
    {
      no: "11",
      name: "Divya Pradip Wadhe",
      class: "4U1",
      company: "Circuit Vision Pcb Designing Center, Pune",
      duration: "3 Months",
      startDate: "01/06/2024",
      endDate: "25/08/2024",
    },
    {
      no: "12",
      name: "Niharika Dagaonkar",
      class: "4U1",
      company: "SSG Embedded Solutions, Nagpur",
      duration: "1 Month",
      startDate: "25/05/2024",
      endDate: "25/06/2024",
    },
    {
      no: "13",
      name: "Ruchita Ritesh Agrawal",
      class: "4U1",
      company: "Dhoot Transmission Pvt. LTD.",
      duration: "1 Month",
      startDate: "20/05/2024",
      endDate: "09/07/2024",
    },
    {
      no: "14",
      name: "Sanchita Ingle",
      class: "4U1",
      company: "Suzlon Gobal Services Ltd., Dhule (Nandurbar)",
      duration: "20 Days",
      startDate: "19/06/2024",
      endDate: "10/07/2024",
    },
    {
      no: "15",
      name: "Shradha Santosh Gawande",
      class: "4U1",
      company: "SSG Embedded Solutions Nagpur",
      duration: "1 Month",
      startDate: "25/05/2024",
      endDate: "25/06/2024",
    },
    {
      no: "16",
      name: "Anurag Kailash Biyani",
      class: "4U1",
      company: "Makxenia Engineering Resource Pvt. Ltd.",
      duration: "3 Months",
      startDate: "03/06/2024",
      endDate: "27/08/2024",
    },
    {
      no: "17",
      name: "Ashish Lichode",
      class: "4U1",
      company: "Makxenia Engineering Resource Pvt. Ltd.",
      duration: "3 Months",
      startDate: "03/06/2024",
      endDate: "27/08/2024",
    },
    {
      no: "18",
      name: "Jay Ashutosh Oak",
      class: "4U1",
      company: "Circuit Vision",
      duration: "3 Months",
      startDate: "01/06/2024",
      endDate: "25/08/2024",
    },
    {
      no: "19",
      name: "Prajwal Suresh Dabre",
      class: "4U1",
      company: "Dhoot Transmission Pvt. Ltd.",
      duration: "45 Days",
      startDate: "20/05/2024",
      endDate: "09/07/2024",
    },
    {
      no: "20",
      name: "Samrat Bhairulal Rathi",
      class: "4U1",
      company: "SSG Embedded Solutions, Nagpur",
      duration: "1 Month",
      startDate: "25/05/2024",
      endDate: "25/06/2024",
    },
    {
      no: "21",
      name: "Sanchit Balu Thakare",
      class: "4U1",
      company: "Dhoot Transmission",
      duration: "45 Days",
      startDate: "20/05/2024",
      endDate: "09/07/2024",
    },
    {
      no: "22",
      name: "Shailesh Vijayrao Deshmukh",
      class: "4U1",
      company: "Dhoot Transmission Pvt. Ltd.",
      duration: "45 Days",
      startDate: "20/05/2024",
      endDate: "09/07/2024",
    },
    {
      no: "23",
      name: "Ankita Arjun Navghare",
      class: "4U2",
      company: "Dhoot Transmission Pvt. ltd.",
      duration: "45 Days",
      startDate: "20/05/2024",
      endDate: "07/09/2024",
    },
  ],
  "2023-24": [
    {
      no: "1",
      name: "Neha Ashok Bedare",
      class: "4U1",
      company: "Lanjulkar Electricals and Engineering Works",
      startDate: "05/06/2023",
      endDate: "05/07/2023",
    },
    {
      no: "2",
      name: "Arya Rajesh Chandrawanshi",
      class: "4U2",
      company: "Regional Reference Standard Laboratory",
      startDate: "06/06/2023",
      endDate: "15/07/2023",
    },
    {
      no: "3",
      name: "Shivam Sawale",
      class: "4U2",
      company: "Regional Reference Standard Laboratory",
      startDate: "07/06/2023",
      endDate: "15/07/2023",
    },
    {
      no: "4",
      name: "Anitkumar Patil",
      class: "4U2",
      company: "RRSL Ahmedabad",
      startDate: "07/06/2023",
      endDate: "15/07/2023",
    },
    {
      no: "5",
      name: "Kartik Shingade",
      class: "4U1",
      company: "Vigyan Ashram",
      startDate: "10/06/2023",
      endDate: "10/08/2023",
    },
    {
      no: "6",
      name: "Pooja Anilkumar Tawri",
      class: "4U1",
      company: "Borgward Technology Private Limited",
      startDate: "14/06/2023",
      endDate: "01/09/2023",
    },
    {
      no: "7",
      name: "Uday Ravindra Deshmukh",
      class: "4U1",
      company: "Borgward Technology India Private Limited",
      startDate: "14/06/2023",
      endDate: "01/09/2023",
    },
    {
      no: "8",
      name: "Rishav Sajan Pandey",
      class: "4U1",
      company: "Upskill Campus",
      startDate: "15/06/2023",
      endDate: "20/07/2023",
    },
    {
      no: "9",
      name: "Kunal Chaudhan",
      class: "4U2",
      company: "Clustor Computing",
      startDate: "16/06/2023",
      endDate: "16/12/2023",
    },
    {
      no: "10",
      name: "Pooja Pramod Masne",
      class: "4U1",
      company: "M D B Electrosoft",
      startDate: "19/06/2023",
      endDate: "19/07/2023",
    },
    {
      no: "11",
      name: "Vishakha Gajanan Wankhade",
      class: "4U1",
      company: "Capable",
      startDate: "20/06/2023",
      endDate: "20/07/2023",
    },
    {
      no: "12",
      name: "Yash Shrihari Khond",
      class: "4U1",
      company: "Capable",
      startDate: "20/06/2023",
      endDate: "20/07/2023",
    },
    {
      no: "13",
      name: "Bhavana Fuse",
      class: "4U1",
      company: "Eastro Control System Pvt. Ltd.",
      startDate: "21/06/2023",
      endDate: "12/07/2023",
    },
    {
      no: "14",
      name: "Priyanka Dadarao Bodade",
      class: "4U1",
      company: "Eastro Control System",
      startDate: "21/06/2023",
      endDate: "05/07/2023",
    },
    {
      no: "15",
      name: "Rupali Abhimanyu Khond",
      class: "4U1",
      company: "Suven Consultants and Technology Pvt. Ltd.",
      startDate: "23/06/2023",
      endDate: "24/07/2023",
    },
    {
      no: "16",
      name: "Unnati Kiranrao Kharate",
      class: "4U1",
      company: "Capabl",
      startDate: "30/06/2023",
      endDate: "31/07/2023",
    },
    {
      no: "17",
      name: "Rajat Patil",
      class: "4U1",
      company: "YBI Foundation",
      startDate: "04/07/2023",
      endDate: "04/08/2023",
    },
    {
      no: "18",
      name: "Atharv Ravindra Bokade",
      class: "4U1",
      company: "Interncrowd",
      startDate: "05/07/2023",
      endDate: "05/08/2023",
    },
    {
      no: "19",
      name: "Prasad Anil Telkar",
      class: "4U2",
      company: "Pantech Solutions",
      startDate: "09/07/2023",
      endDate: "07/08/2023",
    },
    {
      no: "20",
      name: "Akanksha Senad",
      class: "4U1",
      company: "Internpe",
      startDate: "10/07/2023",
      endDate: "06/08/2023",
    },
    {
      no: "21",
      name: "Payal Sanjay Talmale",
      class: "4U1",
      company: "InternPE",
      startDate: "10/07/2023",
      endDate: "06/08/2023",
    },
    {
      no: "22",
      name: "Saurabh Khushal Gaikwad",
      class: "2U2",
      company: "OneSmarter Inc. USA",
      startDate: "15/07/2023",
      endDate: "30/04/2024",
    },
    {
      no: "23",
      name: "Aryavart Nilesh Dahenkar",
      class: "3U1",
      company: "Mountreach Solution Pvt Ltd",
      startDate: "04/08/2023",
      endDate: "30/09/2023",
    },
    {
      no: "24",
      name: "Pratik Dnyaneshwar Kolaskar",
      class: "4U1",
      company: "TechnoHacks EduTech",
      startDate: "10/08/2023",
      endDate: "09/09/2023",
    },
    {
      no: "25",
      name: "Rupali Abhimanyu Khond",
      class: "4U1",
      company: "Emertxe Technologies Bangalore",
      startDate: "17/08/2023",
      endDate: "18/10/2023",
    },
    {
      no: "26",
      name: "Manan Goel",
      class: "4U2",
      company: "HAL (Hindustan Aeronautics Limited)",
      startDate: "22/08/2023",
      endDate: "22/09/2023",
    },
    {
      no: "27",
      name: "Mohit Rathi",
      class: "4U1",
      company: "Kirabiz Technology Pvt Ltd",
      startDate: "02/10/2023",
      endDate: "02/12/2023",
    },
    {
      no: "28",
      name: "Prajwal Janardan Sangle",
      class: "2U1",
      company: "CodSoft",
      startDate: "15/10/2023",
      endDate: "15/11/2023",
    },
    {
      no: "29",
      name: "Shreya Tayade",
      class: "2U2",
      company: "Codsoft",
      startDate: "01/11/2023",
      endDate: "30/11/2023",
    },
    {
      no: "30",
      name: "Rohan Raut",
      class: "2U2",
      company: "Codesoft",
      startDate: "10/11/2023",
      endDate: "10/12/2023",
    },
    {
      no: "31",
      name: "Tejas Santosh Kale",
      class: "3U2",
      company: "Adolf Solution Pune",
      startDate: "11/12/2023",
      endDate: "10/01/2024",
    },
    {
      no: "32",
      name: "Atharva Gajanan Raut",
      class: "3U2",
      company: "Marquardt India Pvt Ltd",
      startDate: "18/12/2023",
      endDate: "12/01/2024",
    },
    {
      no: "33",
      name: "Shreyash Uttamrao Golam",
      class: "4U2",
      company: "Zoho Corporation LLP Nagpur",
      startDate: "03/01/2024",
      endDate: "31/03/2024",
    },
    {
      no: "34",
      name: "Kartik Shingade",
      class: "4U1",
      company: "Zoho Business Service LLP",
      startDate: "03/01/2024",
      endDate: "29/03/2024",
    },
    {
      no: "35",
      name: "Rajat Patil",
      class: "4U1",
      company: "Fox Solutions Pvt. Ltd",
      startDate: "03/01/2024",
      endDate: "15/03/2024",
    },
    {
      no: "36",
      name: "Gauri Vijay Jalamkar",
      class: "4U1",
      company: "Zoho Corporation LLP Nagpur",
      startDate: "03/01/2024",
      endDate: "01/04/2024",
    },
    {
      no: "37",
      name: "Atharv Ravindra Bokade",
      class: "4U1",
      company: "Iris Business Services, Mumbai",
      startDate: "08/01/2024",
      endDate: "05/04/2024",
    },
    {
      no: "38",
      name: "Om Anil Dhage",
      class: "2U1",
      company: "Samarthan Systems Pvt Ltd Pune",
      startDate: "12/01/2024",
      endDate: "22/01/2024",
    },
    {
      no: "39",
      name: "Janhvi Jayant Kokwar",
      class: "2U2",
      company: "Eartkey Innovations",
      startDate: "15/01/2024",
      endDate: "15/02/2024",
    },
    {
      no: "40",
      name: "Soham Abhay Bhole",
      class: "2U2",
      company: "E-Artkey Innovation Pvt Ltd",
      startDate: "15/01/2024",
      endDate: "16/02/2024",
    },
    {
      no: "41",
      name: "Prasad Gajanan Unone",
      class: "4U1",
      company: "Psyliq",
      startDate: "19/01/2024",
      endDate: "28/02/2024",
    },
    {
      no: "42",
      name: "Swapnil Vinod Tathe",
      class: "3U2",
      company: "Apexaiq",
      startDate: "01/02/2024",
      endDate: "29/02/2024",
    },
    {
      no: "43",
      name: "Yash Shrihari Khond",
      class: "4U1",
      company: "Emertxe",
      startDate: "09/02/2024",
      endDate: "18/04/2024",
    },
    {
      no: "44",
      name: "Neha Ashok Bedare",
      class: "4U1",
      company: "Emertxe",
      startDate: "09/02/2024",
      endDate: "18/04/2024",
    },
    {
      no: "45",
      name: "Vaishnavi Kailas Borde",
      class: "4U1",
      company: "Emertxe",
      startDate: "09/02/2024",
      endDate: "16/04/2024",
    },
    {
      no: "46",
      name: "Uday Ravindra Deshmukh",
      class: "4U2",
      company: "Codsoft",
      startDate: "10/02/2024",
      endDate: "10/03/2024",
    },
    {
      no: "47",
      name: "Niharika Dagaonkar",
      class: "3U1",
      company: "Internpe",
      startDate: "20/07/2024",
      endDate: "20/08/2024",
    },
    {
      no: "48",
      name: "Kshitija Girish Deshmukh",
      class: "4U1",
      company: "Zoho Business Services LLP Nagpur",
      startDate: "03/01/2024",
      endDate: "29/03/2024",
    },
  ],
};

export const defaultMagazines = {
  latest: {
    title: "Srujjan Magazine 2024-25",
    description:
      "Srujjan - the department magazine featuring student creativity, technical articles, achievements, and department highlights.",
    link: "/uploads/documents/entc/magazines/srujjan_magazine_2024_25.pdf",
    sourceUrl:
      "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/Srujjan Magazine 2024-25.pdf",
  },
  archives: [
    {
      year: "2023-24",
      title: "Srujjan Magazine 2023-24",
      link: "/uploads/documents/entc/magazines/srujjan_magazine_2023_24.pdf",
      sourceUrl:
        "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/Srujjan Magazine 2023-24.pdf",
    },
    {
      year: "2022-23",
      title: "Srujjan Magazine 2022-23",
      link: "/uploads/documents/entc/magazines/srujjan_magazine_2022_23.pdf",
      sourceUrl:
        "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/Srujjan Magazine 2022-23.pdf",
    },
    {
      year: "2021-22",
      title: "Srujjan Magazine 2021-22",
      link: "/uploads/documents/entc/magazines/srujjan_magazine_2021_22.pdf",
      sourceUrl:
        "https://www.ssgmce.ac.in/images/extc_faculty/newsletters/Srujjan Magazine 2021-22.pdf",
    },
  ],
};
