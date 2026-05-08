// Mechanical Engineering Department - Faculty Defaults Data
// Rich faculty data with Vidwan IDs and detailed profiles

export const defaultVision = [
  "To develop quality mechanical engineers, researchers and entrepreneurs with commitment for excellence, learning enthusiasm, ethical behavior and serving the society.",
];

export const defaultMission = [
  "To impart fundamental knowledge of Mechanical Engineering to the students through excellent/best Teaching learning experience and provide a platform for Higher Education.",
  "To offer Industry Institute interface, interdisciplinary knowledge, and value-based education for the overall development of students.",
  "To enhance research, next-gen skills, and entrepreneurship abilities of the students to solve social problems.",
];

export const defaultPeo = [
  "Engage in creating, designing, manufacturing, analyzing, testing, and maintaining the systems of Mechanical Engineering and allied branches of engineering.",
  "Solve the problems of societal importance by applying fundamentals of Mechanical engineering & pursue higher education, research in the domain of Mechanical.",
  "Imbibe ethical values & skills for lifelong learning to work effectively as a part of a team member, leading a team in a multidisciplinary setup.",
];

export const defaultPso = [
  {
    t: "PSO1: Manufacturing Engineering",
    d: "An ability to apply the principles of manufacturing engineering and technology to develop techno commercial skills.",
  },
  {
    t: "PSO2: Thermal Engineering",
    d: "An ability to apply fundamentals to design and analyze the thermo-hydraulic systems.",
  },
  {
    t: "PSO3: Design Engineering",
    d: "An ability to design and analyze mechanical components and processes to predict the behavior of engineering systems.",
  },
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

export const defaultOverviewTableBE = [
  ["Degree", "Bachelor of Engineering (Mechanical Engineering)"],
  ["Duration", "4 Year(8 Semesters) (Full time)"],
  ["Intake", "60 Students per year"],
  ["Establishment", "Year: 1993"],
  ["NBA Status", "Five Time Accredited & Valid upto 2025."],
];

export const defaultOverviewTableME = [
  [
    "Specialization",
    "M. E. Advanced Manufacturing & Mechanical Systems Design",
  ],
  ["Duration", "2 Year(4 Semesters) (Full time)"],
  ["Intake", "24 Students per year"],
  ["Establishment", "Year: 2012"],
];

export const defaultOverviewTablePhD = [
  ["Duration", "3 Years"],
  ["Intake", "05 Students"],
];

export const defaultFaculty = [
  {
    id: "spt",
    name: "Dr. S. P. Trikal",
    role: "Professor & Head",
    area: ["Manufacturing"],
    email: "hod_mech@ssgmce.ac.in",
    phone: "",
    photo: "SPT",
    vidwanId: "499723",
    qualification: "Ph.D., M.E. (Manufacturing), B.E.",
    experience: "Teaching: 20 Years | Industry: 3 Years",
    coursesTaught: [
      "Manufacturing Processes",
      "Manufacturing Engineering",
      "Mechanics of Materials",
      "Machine Tool Engineering",
      "Machining Science",
      "Rapid & Virtual Prototyping",
      "Metal Forming & Powder Metallurgy",
    ],
    scholarIds: "",
    membership: ["MASSIA", "VIA"],
    publications: [
      "Performance comparison of un-coated and PVD coated carbide inserts during turning of AISI 4340 steel – International Journal",
      "Experimental investigation and parametric optimization of machining parameters using Taguchi approach – International Journal",
      "Comparative study of cutting forces in conventional and CNC turning of AISI 4340 steel",
      "Optimization of process parameters for turning of AISI 4340 steel using coated carbide tools",
      "Study of surface roughness in CNC turning using different tool geometries",
    ],
    research:
      "Industrial solutions: Beetle Nut Cutter Machine (Shri Vaishnavi Industries, Shegaon) | Auto Chamfering Machine for Hindustan Unilever Ltd. | Mechanical Press Machine for ZEN Enterprises, Shegaon | Research on machining of hardened steels using coated carbide tools",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "vkt",
    name: "Dr. V.K. Thute",
    role: "Associate Professor",
    area: ["Mechanical System Design"],
    email: "vinaythute@ssgmce.ac.in",
    phone: "",
    photo: "VKT",
    vidwanId: "424628",
    qualification: "Ph.D., M.Tech., B.E.",
    experience: "Teaching: 23 Years | Industry: 1 Year",
    coursesTaught: [
      "Theory of Machines",
      "Kinematics of Machinery",
      "Dynamics of Machinery",
      "Mechatronics",
      "Machine Design-I",
      "Machine Design-II",
    ],
    scholarIds: "",
    membership: ["Indian Society for Technical Education (ISTE)"],
    publications: [
      "Fault detection in ball bearings using ANN-based vibration analysis",
      "ANN-based fault diagnosis of rolling element bearing using time-domain features",
      "Condition monitoring of rotating machinery using vibration analysis and artificial neural networks",
    ],
    research:
      "Fault Detection in Ball Bearings using ANN | Vibration analysis and condition monitoring of rotating machinery | Design and development of mechatronic systems",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "jgk",
    name: "Dr. J. G. Khan",
    role: "Associate Professor",
    area: ["Lean Manufacturing"],
    email: "javed.khan@ssgmce.ac.in",
    phone: "",
    photo: "JGK",
    vidwanId: "277433",
    qualification: "Ph.D., M.E., B.E., D.M.E.",
    experience: "Teaching: 14 Years | Industry: 3 Years | Research: 3 Years",
    coursesTaught: [
      "Theory of Machines-I & II",
      "Dynamics of Machinery",
      "Machine Design-I & II",
      "Finite Element Analysis (FEA)",
      "Mechatronics",
      "Automation & Machine Learning",
    ],
    scholarIds: "",
    membership: [
      "Institution of Engineers (IE), India",
      "Indian Society for Technical Education (ISTE)",
      "Society of Automotive Engineers (SAE)",
      "International Association of Advanced Materials (IAAM)",
    ],
    publications: [
      "Research papers on lean manufacturing practices in Indian SMEs – International Journals",
      "Studies on automation and Industry 4.0 implementation in manufacturing sectors",
      "Papers on application of FEA in mechanical component design optimization",
      "Research on agile manufacturing and supply chain optimization",
    ],
    research:
      "Lean Manufacturing in Indian SMEs | Industry 4.0 and Automation | FEA-based design optimization | Agile Manufacturing systems",
    fdp: "",
    fellowship: [
      "Session Chair at IEEE International Conference INOCON-2022",
      "Reviewer for international Automation and Manufacturing journals",
    ],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "mbb",
    name: "Mr. M. B. Bhambere",
    role: "Assistant Professor",
    area: ["Thermal Engineering", "Computational Fluid Dynamics (CFD)"],
    email: "mbbhambere@ssgmce.ac.in",
    phone: "",
    photo: "MBB",
    vidwanId: "499725",
    qualification: "B.E., M.Tech. [Ph.D. Pursuing]",
    experience: "Teaching: 16 Years 11 Months",
    coursesTaught: [
      "Thermodynamics",
      "Heat Transfer",
      "Fluid Mechanics",
      "Refrigeration & Air Conditioning (RAC)",
    ],
    scholarIds: "",
    membership: [
      "Indian Society for Technical Education (ISTE)",
      "Society of Automotive Engineers (SAE)",
      "Indian Society for Heat and Mass Transfer (ISHMT)",
    ],
    publications: [
      "CFD analysis of flow over aerofoil blades for wind turbine application",
      "Computational study of aerodynamic characteristics of wind turbine blade profiles",
      "Numerical simulation of airflow patterns over NACA aerofoil sections",
    ],
    research:
      "CFD Analysis of Wind Turbine Blades | Thermal performance optimization | Computational Fluid Dynamics simulations for renewable energy applications",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "cvp",
    name: "Mr. C. V. Patil",
    role: "Assistant Professor",
    area: ["Computer Aided Design and Manufacturing"],
    email: "cvpatil@ssgmce.ac.in",
    phone: "",
    photo: "CVP",
    vidwanId: "499700",
    qualification: "M.E., B.E.",
    experience: "Teaching: 10 Years | Industry: 1 Year",
    coursesTaught: ["CAD-CAM", "Computer Graphics", "Mechanical System Design"],
    scholarIds: "",
    membership: [],
    publications: [
      "Application of 3D scanning technology in reverse engineering and manufacturing",
      "Study on integration of CAD/CAM systems in modern manufacturing",
    ],
    research:
      "3D Scanning and Reverse Engineering | CAD/CAM integration in manufacturing | Computer-aided design optimization",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "asb",
    name: "Mr. A. S. Bharule",
    role: "Assistant Professor",
    area: ["Machine Design & Analysis"],
    email: "asbharule@ssgmce.ac.in",
    phone: "",
    photo: "ASB",
    vidwanId: "261207",
    qualification: "B.E., M.Tech. [Ph.D. Pursuing]",
    experience: "Teaching: 13 Years | Industry: 2 Years",
    coursesTaught: [
      "Machine Design-I",
      "Machine Design-II",
      "Strength of Materials",
    ],
    scholarIds: "",
    membership: [
      "Indian Society for Technical Education (ISTE)",
      "Institution of Engineers (IE), India",
    ],
    publications: [
      "Stress analysis of mechanical components using FEA-based approaches",
      "Design optimization and failure analysis of machine elements",
    ],
    research:
      "Stress Analysis and Machine Design | FEA-based structural analysis | Design optimization of machine components",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "nbb",
    name: "Mr. N. B. Borkar",
    role: "Assistant Professor",
    area: ["Production"],
    email: "nbborkar@ssgmce.ac.in",
    phone: "",
    photo: "NBB",
    vidwanId: "499697",
    qualification: "B.E., M.Tech. [Ph.D. Pursuing]",
    experience: "Teaching: 11 Years",
    coursesTaught: [
      "Production Processes",
      "Metallurgy",
      "Manufacturing Technology",
    ],
    scholarIds: "",
    membership: [],
    publications: [
      "Optimization of turning process parameters using Taguchi method",
      "Experimental investigation of friction stir welding parameters on mechanical properties",
      "Study of surface roughness optimization in CNC machining",
    ],
    research:
      "Turning process optimization | Friction stir welding | CNC machining parameter optimization",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "nhk",
    name: "Dr. N. H. Khandare",
    role: "Associate Professor",
    area: [
      "Lean and Agile Manufacturing",
      "Production & Manufacturing Engineering",
    ],
    email: "nhkhandare@ssgmce.ac.in",
    phone: "",
    photo: "NHK",
    vidwanId: "499640",
    qualification: "Ph.D., M.E., B.E., D.M.E.",
    experience: "Teaching: 12.3 Years | Industry: 4.8 Years",
    coursesTaught: [
      "CNC Programming & Machining",
      "Lean Manufacturing",
      "Agile Manufacturing",
      "Robotics",
      "Industrial Engineering",
    ],
    scholarIds: "",
    membership: [
      "Confederation of Indian Industry (CII)",
      "Indian Society for Technical Education (ISTE)",
    ],
    publications: [
      "Research papers on lean manufacturing implementation in industries",
      "Studies on agile manufacturing strategies and their impact on productivity",
      "Papers on integration of lean and agile paradigms in manufacturing",
    ],
    research:
      "Lean and Agile Manufacturing | R&D funded research projects | Production system optimization | Industry-academia collaboration projects",
    fdp: "",
    fellowship: ["Innovative Young Researcher Award"],
    achievements: [
      "Received R&D funding for manufacturing research",
      "Recognized as Innovative Young Researcher",
    ],
    department: "mechanical",
  },
  {
    id: "sqs",
    name: "Mr. S. Q. Syed",
    role: "Assistant Professor",
    area: ["Thermal"],
    email: "sqsyed@ssgmce.ac.in",
    phone: "",
    photo: "SQS",
    vidwanId: "499708",
    qualification: "B.E., M.Tech.",
    experience: "Teaching: 10 Years | Industry: 1 Year",
    coursesTaught: [
      "Engineering Thermodynamics",
      "Fluid Mechanics",
      "Refrigeration & Air Conditioning (RAC)",
    ],
    scholarIds: "",
    membership: ["Indian Society for Technical Education (ISTE)"],
    publications: [
      "Experimental studies on pulsating heat pipe thermal performance",
      "Investigation of heat transfer characteristics in oscillating heat pipes",
    ],
    research:
      "Pulsating Heat Pipe technology | Oscillating heat pipe thermal performance | Heat transfer augmentation techniques",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "ptp",
    name: "Mr. P. T. Patokar",
    role: "Assistant Professor",
    area: ["Manufacturing Engineering"],
    email: "ptpatokar@ssgmce.ac.in",
    phone: "",
    photo: "PTP",
    vidwanId: "499695",
    qualification: "M.E. (Manufacturing), B.E.",
    experience: "Teaching: 12 Years",
    coursesTaught: [
      "Workshop Practice",
      "Manufacturing Processes",
      "Production Technology",
    ],
    scholarIds: "",
    membership: [],
    publications: [
      "Studies on 3D scanning technology for quality inspection in production",
      "Research on advanced manufacturing process optimization",
    ],
    research:
      "3D Scanning technology in manufacturing | Quality inspection and reverse engineering | Production process optimization",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "kvc",
    name: "Dr. K. V. Chandan",
    role: "Assistant Professor",
    area: ["Design and Development of Composite Materials"],
    email: "kvchandan@ssgmce.ac.in",
    phone: "",
    photo: "KVC",
    vidwanId: "235473",
    qualification: "Ph.D.",
    experience: "",
    coursesTaught: [],
    scholarIds: "",
    membership: [],
    publications: [],
    research:
      "Design and Development of Composite Materials | Advanced material characterization",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "pd",
    name: "Dr. Piyush Dalke",
    role: "Assistant Professor",
    area: ["Hybrid Nano-fluids", "Manufacturing Engineering"],
    email: "padalke@ssgmce.ac.in",
    phone: "",
    photo: "PD",
    vidwanId: "499809",
    qualification: "B.E., M.Tech., Ph.D.",
    experience: "Teaching: 5 Years",
    coursesTaught: [
      "Robotics",
      "Industrial Organization and Management",
      "Manufacturing Engineering",
    ],
    scholarIds: "",
    membership: [
      "Australian Society for Operations Research (ASOR)",
      "American Society of Mechanical Engineers (ASME)",
    ],
    publications: [
      "Research papers on hybrid nano-fluids and their thermal applications",
      "Studies on advanced manufacturing techniques and process optimization",
      "Publications in international journals on nano-fluid heat transfer enhancement",
    ],
    research:
      "Hybrid Nano-fluids for thermal applications | Manufacturing process optimization | Nano-fluid heat transfer enhancement",
    fdp: "",
    fellowship: [
      "Award from IIT Bombay for research excellence",
      "Multiple awards for academic and research contributions at IIT Bombay",
    ],
    achievements: [
      "Recognized by IIT Bombay for outstanding research contributions",
    ],
    department: "mechanical",
  },
  {
    id: "krd",
    name: "Mr. K. R. Dudhe",
    role: "Assistant Professor",
    area: ["Thermal Engineering", "Pillow Plate Heat Exchanger"],
    email: "krdudhe@ssgmce.ac.in",
    phone: "",
    photo: "KRD",
    vidwanId: "499696",
    qualification: "D.M.E., B.E., M.E. [Ph.D. Pursuing]",
    experience: "Teaching: 3 Years",
    coursesTaught: ["Fluid Mechanics", "Engineering Graphics"],
    scholarIds: "",
    membership: [],
    publications: [
      "Studies on injection moulding process parameter optimization",
      "Research on pillow plate heat exchanger thermal performance",
    ],
    research:
      "Pillow Plate Heat Exchanger design | Injection moulding optimization | Thermal engineering applications",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "spj",
    name: "Dr. S. P. Joshi",
    role: "Assistant Professor",
    area: [
      "Thermal Engineering",
      "Energy Management",
      "Heat Transfer Augmentation",
    ],
    email: "spjoshi@ssgmce.ac.in",
    phone: "",
    photo: "SPJ",
    vidwanId: "390498",
    qualification: "B.E., M.Tech., Ph.D.",
    experience: "Teaching: 6.3 Years",
    coursesTaught: [
      "Engineering Thermodynamics",
      "Fluid Mechanics",
      "Energy Conversion",
      "Heat Transfer",
    ],
    scholarIds: "",
    membership: ["Indian Society for Technical Education (ISTE)"],
    publications: [
      "Scopus-indexed research papers on energy-efficient cookware design",
      "Studies on heat transfer augmentation in thermal systems",
      "Research on energy management and renewable energy applications",
    ],
    research:
      "Energy-efficient cookware design | Heat transfer augmentation | Renewable energy systems | Thermal energy management",
    fdp: "",
    fellowship: [],
    achievements: [
      "International Patent (German) for energy-related innovation",
      "Indian Patent for thermal engineering application",
    ],
    department: "mechanical",
  },
  {
    id: "gsw",
    name: "Mr. G. S. Wahile",
    role: "Assistant Professor",
    area: ["Thermal Engineering", "Mechatronics", "IoT", "Photovoltaic Panel"],
    email: "gswahile@ssgmce.ac.in",
    phone: "",
    photo: "GSW",
    vidwanId: "499571",
    qualification: "M.E., B.E. [Ph.D. Pursuing]",
    experience: "Teaching: 8 Years",
    coursesTaught: [
      "Mechatronics",
      "Automation & Machine Learning",
      "Thermodynamics",
      "Heat Transfer",
      "Material Technology",
      "Production Processes-I",
    ],
    scholarIds: "Google Scholar",
    membership: ["Indian Society for Technical Education (ISTE) – LM100239"],
    publications: [
      "U. Aswalekar, G. Wahile, T. Udeshi, M. Vartak and R. Jadhav. CFD Analysis of Absorber Tube Using Phase Change Materials, Materials Today Proceeding, 2022, ISSN 1369-7021",
      "G. Wahile, P. Malwe and A. Kolhe, Waste heat recovery from exhaust gas of an engine by using a phase change material, Materials Today Proceeding, Volume 28, Part 4, 2020, Pages 2101-2107",
      "P. Malwe, P. Gawali, G. Wahile. Exergy Analysis of a four Stroke Diesel Engine, Springer",
    ],
    research:
      "Phase Change Materials for thermal storage | Waste heat recovery from engines | Development and Contribution in Mechatronics Lab at KITS Ramtek | IoT Lab developed at VCET Vasai, Mumbai",
    fdp: "",
    fellowship: [],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "vtm",
    name: "Mr. V. T. Mhaske",
    role: "Assistant Professor",
    area: ["Cryogenics Engineering", "Heat & Power"],
    email: "vtmhaske@ssgmce.ac.in",
    phone: "",
    photo: "VTM",
    vidwanId: "499715",
    qualification: "M.E., B.E. [Ph.D. Pursuing]",
    experience: "Teaching: 4 Years",
    coursesTaught: [
      "Engineering Thermodynamics",
      "IC Engine",
      "Refrigeration & Air Conditioning (RAC)",
      "Manufacturing Processes",
    ],
    scholarIds: "Google Scholar",
    membership: ["Indian Society for Technical Education (ISTE) – LM100239"],
    publications: [
      "Review on cryogenic machining of AISI 52100 steel in comparison with dry, MQL and Flood machining. International Journal of Research in Science and Engineering, Volume 2, e-ISSN: 2394-8299",
      "Experimental investigation of temperature and hardness during cryogenic machining of 52100 bearing steel in comparison with dry machining. International Conference on Recent Trends in Engineering & Technology, Vishvcon, VIT Pune",
    ],
    research:
      "Cryogenic machining of hardened steels | Comparison of machining techniques (dry, MQL, flood, cryogenic)",
    fdp: "",
    fellowship: ["Best Paper Award at International Conference, VIT Pune"],
    achievements: [],
    department: "mechanical",
  },
  {
    id: "pj",
    name: "Mr. Parag Jadhav",
    role: "Professor of Practice",
    area: [
      "Global Process Improvement",
      "Six Sigma & Lean Manufacturing",
      "Project Management",
    ],
    email: "paragjadhav10@gmail.com",
    phone: "+91-9860575313",
    photo: "PJ",
    vidwanId: "",
    qualification:
      "B.E. (Polymer) – Amaravati University, 2010 | Diploma in Plastic Engineering – Mumbai University, 2007 | Lean Six Sigma Black Belt (KPMG, 2017) | Lean Six Sigma Green Belt (KPMG, 2016) | Internal Auditor ISO 9001:2015 (BVS Quality Systems, 2018)",
    experience:
      "Industry: 12+ Years | Lead – Global Quality Process Improvement, Hyster-Yale Group (Aug 2021 – Present) | Business Excellence Manager, Aesseal India Pvt. Ltd., Pune (June 2016 – Aug 2021) | Operations Manager, Aesseal India Pvt. Ltd., Pune (April 2013 – June 2016) | Project Engineer, Jayashree Polymers Pvt. Ltd., Pune (Aug 2011 – April 2013)",
    coursesTaught: [
      "Six Sigma (DMAIC, DFSS Methods)",
      "Lean Manufacturing",
      "Kaizen & 6S",
      "ISO & Quality Management System",
      "Visual Management",
    ],
    scholarIds: "",
    membership: [],
    publications: [],
    research:
      "Delivered 50+ Six Sigma trainings to local and global teams | 500+ employees trained in Six Sigma methodologies | Successfully executed 100+ Six Sigma projects across Supply Chain, Manufacturing, IT, Accounts & Finance, Product Quality, International Operations Support, Product Development, and HR",
    fdp: "",
    fellowship: [
      "Hyster-Yale On Spot Awards – 2022 & 2023",
      "AESSEAL India Performance Excellence Award – Gold Award Winner 2014, 2016 & 2019",
    ],
    achievements: [
      "Lean Six Sigma Black Belt certified (KPMG, Pune)",
      "Internal Auditor for ISO 9001:2015",
      "Continuous Improvement Champion",
      "Trainer & Mentor for Six Sigma & Lean Manufacturing globally",
    ],
    department: "mechanical",
    isIndustry: true,
  },
];

// Pride of the Department - GATE Qualified Students (scraped from ssgmce.ac.in)
export const defaultPrideGate = [
  {
    year: "2024",
    title: "List of GATE Qualified Students 2024",
    students: [["1", "Yogesh R Nehate", "4M", "70.67", "OBC"]],
  },
  {
    year: "2023",
    title: "List of GATE Qualified Students 2023",
    students: [
      ["1", "Abhishek V Tiwari", "4M", "42.00", "Open"],
      ["2", "Krushna S Thakare", "4M", "26.33", "OBC"],
    ],
  },
  {
    year: "2022",
    title: "List of GATE Qualified Students 2022",
    students: [
      ["1", "Shubham Vasantrao Gawande", "4M", "25.36", "NT"],
      ["2", "Abhishek Sanjay Wankhade", "4M", "21.52", "SC"],
    ],
  },
  {
    year: "2021",
    title: "List of GATE Qualified Students 2021",
    students: [
      ["1", "Swapnil Jadhav", "4M", "33.39", "OBC"],
      ["2", "Shubham Tayde", "4M", "22.81", "SC"],
    ],
  },
  {
    year: "2019",
    title: "List of GATE Qualified Students 2019",
    students: [
      ["1", "Saurabh Satish Kulkarni", "4M", "63.49", "OPEN"],
      ["2", "Shantanu Prakshrao Taywade", "4M", "44.12", "OBC"],
      ["3", "Pankaj Shankarrao Bhoyar", "4M", "42.00", "OBC"],
      ["4", "Vaibhav Rameshwar Nakat", "4M", "41.74", "OBC"],
      ["5", "Devanshish Punjaram Makode", "4M", "39.05", "OBC"],
      ["6", "Rushikesh Vinodrao Deshmukh", "4M", "34.15", "OBC"],
      ["7", "Chetan Ashokrao Ingle", "4M", "26.63", "SC"],
    ],
  },
];

// Pride of the Department - B.E. University Rank Holders
export const defaultPrideToppersBE = [
  {
    year: "2023-24",
    records: [
      { name: "Nayan Ganeshrao Chandankhede", rank: "5", score: "8.69 CGPA" },
      { name: "Ankush Santosh Gawande", rank: "7", score: "8.57 CGPA" },
    ],
  },
  {
    year: "2022-23",
    records: [{ name: "Abhishekh V Tiwari", rank: "2", score: "9.15 CGPA" }],
  },
  {
    year: "2021-22",
    records: [
      { name: "Ritik Barwad", rank: "2", score: "9.70 CGPA" },
      { name: "Ku. Anjali Bal", rank: "6", score: "9.61 CGPA" },
      { name: "Ku. Ruchi Joshi", rank: "7", score: "9.60 CGPA" },
      { name: "Ku. Sakshi Kale", rank: "10", score: "9.56 CGPA" },
    ],
  },
  {
    year: "2020-21",
    records: [
      { name: "Yogesh Nehate", rank: "1", score: "10 CGPA" },
      { name: "Ajinkya Gawande", rank: "4", score: "9.95 CGPA" },
      { name: "Parag Chopade", rank: "4", score: "9.95 CGPA" },
      { name: "Aniket Basode", rank: "6", score: "9.91 CGPA" },
      { name: "Ku Vaishanvi Lande", rank: "7", score: "9.89 CGPA" },
      { name: "Sarvesh Kulkarni", rank: "7", score: "9.89 CGPA" },
      { name: "Kushal Nagmote", rank: "8", score: "9.87 CGPA" },
      { name: "Akshay Kalore", rank: "8", score: "9.87 CGPA" },
      { name: "Linendra Bidkar", rank: "10", score: "9.85 CGPA" },
      { name: "Aditya Daroli", rank: "10", score: "9.85 CGPA" },
    ],
  },
  {
    year: "2014-15",
    records: [{ name: "Nisarkhan G. Pathan", rank: "4", score: "9.37 CGPA" }],
  },
  {
    year: "2013-14",
    records: [
      { name: "Smrutik Kumar Ghate", rank: "1", score: "1202/1400" },
      { name: "Pratik S. Shirbhate", rank: "4", score: "1192/1400" },
      { name: "Abhishek C. Vyas", rank: "5", score: "1169/1400" },
    ],
  },
];

// Pride of the Department - Top Alumni
export const defaultPrideAlumni = [
  ["Vivek Bodade", "Global Head Procurement", "Piramal Pharma Ltd"],
  [
    "Rahul Bhandarwar",
    "General Manager",
    "Hyster Yale India Lift Trucks Pvt Ltd",
  ],
  ["Vivek Dahake", "General Manager, Ops", "Cummins"],
  ["Ashish Hadole", "Sr. Manager", "Tata Passenger Electric Mobility"],
  ["Shailesh Deshmukh", "Depty. Manager", "Siemens Energy"],
  [
    "Gajanan Gawhale",
    "Manager, Global Supply Chain Services",
    "Hyster Yale India Lift Trucks Pvt Ltd",
  ],
  ["Ankush Banait", "Lead Engineer", "John Deere India Pvt Ltd"],
  ["Pavan Sharma", "Additional Vice President", "Adani Electricity"],
  [
    "Sanjay Ganorkar",
    "Head Quality Assurance",
    "Honeywell Automation India Ltd",
  ],
  [
    "Parag Patil",
    "Head of Digital Products",
    "GF Machining Solutions, Biel, Berne, Switzerland",
  ],
  ["Abhishek Channewar", "Engineer", "Lenovo USA"],
  ["Nitin Metange", "Manager", "Hindustan Aeronautical Ltd, Nashik"],
  ["Parikshit Jain", "Director", "Arona Trading LLC"],
  [
    "Tulsidas Choudhary",
    "AGM (VRV Business Head Pune Region)",
    "Daikin Airconditioning India Pvt. Ltd.",
  ],
  ["Rushikesh Bakal", "Flying Officer", "IAF"],
  ["Parshant Jagtap", "AGM", "Bosch Ltd, Nashik"],
  ["Pratik Shirbhate", "", "Jet2 Travel Technologies Pvt Ltd, Pune"],
  [
    "Sandeep Tompe",
    "DGM (Operations, Manufacturing, Engineering, Quality)",
    "Bosch Limited",
  ],
];

// ---------- Pride section Markdown converters ----------

export function mechPrideGateToMarkdown(gateData = []) {
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

export function mechPrideToppersToMarkdown({ be = [] } = {}) {
  const header = `## B.E. UNIVERSITY RANK HOLDERS\n\n| Year | Name of the Student | University Rank | CGPA/Percentage |\n|------|---------------------|-----------------|-----------------|`;
  if (!be || be.length === 0) {
    return `${header}\n| — | No records | — | — |`;
  }
  const rows = be
    .flatMap((yearGroup) =>
      yearGroup.records.map(
        (r, i) =>
          `| ${i === 0 ? yearGroup.year : ""} | ${r.name} | ${r.rank} | ${r.score} |`,
      ),
    )
    .join("\n");
  return `${header}\n${rows}`;
}

export function mechPrideAlumniToMarkdown(
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

// Curricular Activities (scraped from ssgmce.ac.in/page_details.php?page_id=105&department_id=6)
export const defaultActivities = [
  {
    title:
      "Expert Lecture on Improving Teaching-Learning & Assessment Outcome through ICT Intervention",
    date: "27/07/2024",
    participants: "SSGMCE Faculties",
    organizer: "SSGMCE, Shegaon",
    resource: "Dr. Atul Wadegaonkar, Ex. MD, RKCL, Jaipur",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_27072024.jpeg",
  },
  {
    title: "Guest Lecture on Faculty Interaction - Workplace Happiness",
    date: "13/03/2024",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource:
      "Dr. Shrikant Kallurkar, Ex. Principal, Founder HoD SGGS, Nanded, Research Advisor",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_130324.png",
  },
  {
    title: "RC CAR RACING Competition",
    date: "15-16/03/2024",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_1510324.png",
  },
  {
    title: "Workshop on SAP Security",
    date: "15-16/03/2024",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Mr. Pratik Harne, Associate System Engineer, IBM, Pune",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_150324.png",
  },
  {
    title:
      "Guest Lecture on FOOD STORY - Success Journey of Curry Leaves Founder",
    date: "25/01/2024",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Mr. Vikram Ugale, Founder of Curry Leaves - Food Chain Industry",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_2510124.png",
  },
  {
    title: "Guest Lecture on Opportunities of Education Abroad for Dream Jobs",
    date: "25/01/2024",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Mr. Siddesh Jejurkar, Mechanical Engg, MS @ MIT, New York, USA",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_250124.png",
  },
  {
    title:
      "Faculty Development Program Innovate 360 - Hands-on Workshop on Fusion 360 (Autodesk CAD Software)",
    date: "26-30/12/2023",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Mr. Pratik Deshmukh, Training Manager, SWS, Pune",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_301223.png",
  },
  {
    title: "Guest Lecture on Current Trends in Thermo-Fluids",
    date: "27-28/10/2023",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Dr. B S Gawali, Professor, Walchand College of Engg., Sangli",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_271023.png",
  },
  {
    title: "Engineer's Day",
    date: "15/09/2023",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Mr. Atul Sakalkale, Manager @ Hindustan Unilever, India",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_150923.png",
  },
  {
    title: "Teachers Day & IEI Student Induction",
    date: "05/09/2023",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Mr. Kalpesh Beldar, Cyber Security @ NIA, India",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_050923.png",
  },
  {
    title: "Webinar on Boundary Layer Theory",
    date: "04/01/2023",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource:
      "Dr. Sagar Agnihotri, Post Doc Research Fellow at Uppsala University, Sweden",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_04012023.jpg",
  },
  {
    title: "Expert Talk on Expectation of Engineers from Industry",
    date: "03/01/2023",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Jagdish Wadhokar & Mr. Parsnis",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_03012023.jpg",
  },
  {
    title: "Hands-on Workshop on Fusion 360 for 3D Printing",
    date: "26-27/11/2022 to 03-12/12/2022",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Prof. K V Chandan & Prof. N G More",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_26092022.jpg",
  },
  {
    title: "Two Days Hands-on Workshop on Web Development",
    date: "01-02/10/2022",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "IEI Mechanical Engineering Student Chapter",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_01102022.jpg",
  },
  {
    title: "Expert Talk on GATE Exam: Awareness & Preparation Strategy Program",
    date: "30/09/2022",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Prof. K V Chandan, SSGMCE, Shegaon",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_30092022.jpg",
  },
  {
    title: "Expert Talk on Journey through Einstein's Brain",
    date: "15/09/2022",
    participants: "2nd, 3rd MECH Students",
    organizer: "IEI Mechanical Engineering Student Chapter",
    resource: "Dr. Mukund Mohariron",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_15092022.jpg",
  },
  {
    title: "Inauguration of Dr. Georg H Endress LAB",
    date: "19/08/2022",
    participants: "Faculty & Students",
    organizer: "Department of Mechanical Engineering, SSGMCE, Shegaon",
    resource:
      "Shriram Narayanan, Chairman CII MH State Council, MD - Endress+Hauser Automation Pvt. Ltd.",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_19082022.jpg",
  },
  {
    title: "Inauguration of IC Engine LAB",
    date: "19/08/2022",
    participants: "Faculty & Students",
    organizer: "Department of Mechanical Engineering, SSGMCE, Shegaon",
    resource:
      "Shriram Narayanan, Chairman CII MH State Council, MD - Endress+Hauser Automation Pvt. Ltd. (Lab sanctioned under MODROB AICTE, New Delhi)",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_labinogration.JPG",
  },
  {
    title: "Tree Plantation Drive",
    date: "15/08/2022",
    participants: "Mechanical Engineering Students",
    organizer:
      "Mechanical Engineering Student Chapter, SSGMCE in association with Shegaon Municipal Corporation and Go Green Foundation, Shegaon",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_15082022.jpg",
  },
  {
    title:
      "Online AICTE-ISTE Sponsored Refresher Faculty Development Program on Advance Material and Manufacturing for Industry 4.0",
    date: "22-28/02/2022",
    participants: "Faculty Members",
    organizer: "Department of Mechanical Engineering, SSGMCE, Shegaon",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_22022022.jpg",
  },
  {
    title: "One Week Hands-on Workshop on IoT and Robotics using Arduino",
    date: "29/11/2021 - 04/12/2021",
    participants: "MECH Students",
    organizer:
      "IEI Mechanical Engg Student Chapter, Department of Mechanical Engineering, SSGMCE, Shegaon",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_04122021.jpg",
  },
  {
    title: "SAE Chapter Team Xtreme - E-Campus Utility Vehicle Build",
    date: "2021-22",
    participants: "MECH Students (Team Xtreme)",
    organizer:
      "SAE Student Chapter, Department of Mechanical Engineering, SSGMCE, Shegaon",
    resource: "",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_UtilityVehicle.jpg",
  },
  {
    title: "Opening of IEI Mechanical Student Chapter",
    date: "2021-22",
    participants: "MECH Students & Faculty",
    organizer: "Department of Mechanical Engineering, SSGMCE, Shegaon",
    resource: "",
    image: "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity_IEI.jpg",
  },
  {
    title: "Guest Lecture on Journey from Innovator to Entrepreneur",
    date: "08/01/2022",
    participants: "MECH Students",
    organizer: "Department of Mechanical Engineering, SSGMCE, Shegaon",
    resource: "Mr. D N Dharurkar",
    image:
      "https://www.ssgmce.ac.in/images/mech_faculty/MECH_Activity08012022.jpeg",
  },
  {
    title: "Guest Lecture on Career in CAD",
    date: "06/01/2022",
    participants: "MECH Students",
    organizer: "Department of Mechanical Engineering, SSGMCE, Shegaon",
    resource: "Mr. Tejas Pitale (Broadspectrum, Australia)",
    image: "https://www.ssgmce.ac.in/images/mech_faculty/Tejas Pitale.jpg",
  },
  {
    title:
      "Inauguration of Electric Vehicle by Honorable Director Shrikantdada Patil",
    date: "21/12/2021",
    participants: "MECH Students & Faculty",
    organizer:
      "Team Xtreme, Department of Mechanical Engineering, SSGMCE, Shegaon",
    resource: "Honorable Director Shrikantdada Patil",
    image: "https://www.ssgmce.ac.in/images/mech_faculty/EV Inauguration.JPG",
  },
];

export const defaultNewsletters = {
  latest: {
    title: "Newsletter 2025-26 (Autumn)",
    description:
      "Stay updated with the latest happenings, student achievements, faculty contributions, and department events.",
    link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWSLETTER_ AUTUMN25_26.pdf",
  },
  archives: [
    {
      date: "2024-25",
      vol: "Newsletter 2024-25 (Spring / Volume II)",
      term: "Spring",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/News Letter 2024-25 SPRING SEM Volume II.pdf",
    },
    {
      date: "2024-25",
      vol: "NewsLetter 2024-25 (Autumn / Volume I)",
      term: "Autumn",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER_ AUTUMN_24_25.pdf",
    },
    {
      date: "2023-24",
      vol: "NewsLetter 2023-24 (Spring / Volume II)",
      term: "Spring",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER_ SPRING_23_24 .pdf",
    },
    {
      date: "2023-24",
      vol: "NewsLetter 2023-24 (Autumn / Volume I)",
      term: "Autumn",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER_ AUTUMN_23_24.pdf",
    },
    {
      date: "2022-23",
      vol: "NewsLetter 2022-23 (Spring / Volume II)",
      term: "Spring",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER_ SPRING_22_23 .pdf",
    },
    {
      date: "2022-23",
      vol: "NewsLetter 2022-23 (Autumn / Volume I)",
      term: "Autumn",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER_ AUTUMN_22_23.pdf",
    },
    {
      date: "2021-22",
      vol: "NewsLetter 2021-22 (Spring / Volume II)",
      term: "Spring",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER_ SPRING_20_21 .pdf",
    },
    {
      date: "2021-22",
      vol: "NewsLetter 2021-22 (Autumn / Volume I)",
      term: "Autumn",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER_ AUTUMN_21-22.pdf",
    },
    {
      date: "2020-21",
      vol: "NewsLetter 2020-21 (Spring / Volume II)",
      term: "Spring",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER_ SPRING_21_22.pdf",
    },
    {
      date: "2020-21",
      vol: "NewsLetter 2020-21 (Autumn / Volume I)",
      term: "Autumn",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER_ AUTUMN_20_21.pdf",
    },
    {
      date: "2019-20",
      vol: "NewsLetter 2019-20 (Autumn / Volume I)",
      term: "Autumn",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER__AUTUMN__19_20.pdf",
    },
    {
      date: "2019-20",
      vol: "NewsLetter 2019-20 (Spring / Volume II)",
      term: "Spring",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS_LETTER__SPRING__19_20.pdf",
    },
    {
      date: "2018-19",
      vol: "NewsLetter 2018-19 (Volume I)",
      term: "Volume I",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/newsletters/NEWS LETTER 18_19_NEW_1.pdf",
    },
    {
      date: "2018-19",
      vol: "NewsLetter 2018-19 (Volume II)",
      term: "Volume II",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/NEWS LETTER 18_19_NEW_2.pdf",
    },
    {
      date: "2017-18",
      vol: "NewsLetter 2017-18 (Volume I)",
      term: "Volume I",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/NEWS_LETTER_Autumn_2017-18.pdf",
    },
    {
      date: "2017-18",
      vol: "NewsLetter 2017-18 (Volume II)",
      term: "Volume II",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/NEWS_LETTER__Spring_2017-18.pdf",
    },
    {
      date: "2016-17",
      vol: "NewsLetter 2016-17 (Volume I)",
      term: "Volume I",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/NEWS_LETTER_Autumn_2016-17.pdf",
    },
    {
      date: "2016-17",
      vol: "NewsLetter 2016-17 (Volume II)",
      term: "Volume II",
      link: "https://www.ssgmce.ac.in/images/mech_faculty/NEWS_LETTER_Spring_2016-17.pdf",
    },
  ],
};

export const defaultAchievements = {
  faculty: [
    {
      name: "Dr. Piyush A. Dalke",
      achievement: "Best Innovation Ambassador Award",
      description:
        "Dr. Piyush A. Dalke was awarded the Best Innovation Ambassador at the IIC Regional Meet 2025 on 28th November 2025 at Yashwantrao Chavan College of Engineering, Nagpur. The award was presented by the Innovation Cell, AICTE — Ministry of Education.",
      category: "Innovation",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_1_Dr_Piyush_A_Dalke.jpeg",
    },
    {
      name: "Dr. V. K. Thute",
      achievement: "Best Paper Award",
      description:
        "Dr. V. K. Thute received second Best Paper Award for paper during 5th International Conference on Machine Learning and Big Data Analytics, ICS Global, held at Kerala, India.",
      category: "Best Paper",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_2_Dr_V_K_Thute.jpeg",
    },
    {
      name: "Prof. M. B. Bhambere",
      achievement: "Best Paper Award",
      description:
        "Prof. M. B. Bhambere received Best Paper Award during International Conference on AI Driven Engineering & Technology AIDCon_2025, Dec 2025.",
      category: "Best Paper",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_3_Prof_M_B_Bhambere.jpeg",
    },
    {
      name: "Dr. Piyush Dalke",
      achievement: "AVISHKAR 2024 — Health Innovation",
      description:
        "Dr. Piyush Dalke and Mr. Vinit S. Atkare bagged 3rd place for Non-contact Glucose Detection Using Optical and Analytical Techniques at AVISHKAR 2024.",
      category: "Innovation",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_4_Dr_Piyush_Dalke.jpeg",
    },
    {
      name: "Prof. Piyush Dalke",
      achievement: "Best Innovator Award — IIT Ropar & SPPU",
      description:
        "Prof. Piyush Dalke was awarded the Best Innovator Award by IIT Ropar & SPPU Research Park in the presence of Shri Amitabh Nag (CEO Bhashini MeiTY Govt. of India) and Dr. Parag Kalkar (Pro-Vice-Chancellor of Savitribai Phule Pune University, Pune).",
      category: "Innovation",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_5_Prof_Piyush_Dalke.jpeg",
    },
    {
      name: "Prof. Piyush Dalke",
      achievement: "YUKTI-NIR 2023 — Ministry of Education",
      description:
        "Prof. Piyush Dalke was appreciated at YUKTI-NIR, Ministry of Education, Innovation Cell-AICTE, GOI by Prof. Rajendra Kakade and Mr. Dipan Sahu.",
      category: "Recognition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_6_Prof_Piyush_Dalke.jpeg",
    },
    {
      name: "Prof. Piyush Dalke",
      achievement: "Int. Conference, HISTE 2024 — First Prize",
      description:
        "Prof. Piyush Dalke and students of Mechanical Dept. received first prize for poster presentation at KVVDM, Karad.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_7_Prof_Piyush_Dalke.jpeg",
    },
    {
      name: "Prof. Piyush Dalke",
      achievement: "TechFest 2K24 — First Prize",
      description:
        "Prof. Piyush Dalke with students won the first prize at Siddhivinak Tech Campus for project.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_8_Prof_Piyush_Dalke.jpeg",
    },
    {
      name: "Prof. Piyush Dalke",
      achievement: "IMPPACT CONCLAVE 3 — Second Prize at IIT Ropar",
      description:
        "Prof. Piyush Dalke with students won the second prize at IIT Ropar for Technical project.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_9_Prof_Piyush_Dalke.jpeg",
    },
    {
      name: "Dr. S. P. Trikal",
      achievement: "RGST Grant for Research Projects",
      description:
        "Dr. S. P. Trikal, Dr. N. H. Khandare, and Prof. N. B. Borkar received RGST grant for the research projects.",
      category: "Research",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_10_Dr_S_P_Trikal.jpeg",
    },
    {
      name: "Prof. K. D. Gadgil",
      achievement: "Second Prize — Honeycomb Heat Exchanger Project",
      description:
        "Prof. K. D. Gadgil and 4M students received Second Prize for the project: Optimization of Heat Transfer Rate in Honeycomb Heat Exchanger.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_11_Prof_K_D_Gadgil.jpeg",
    },
    {
      name: "Prof. Piyush Dalke",
      achievement: "Best Start-Up Project — SGBAU",
      description:
        "Prof. Piyush Dalke was honored with Best Start-Up Project under SGBAU, Consolation Industrial LOI.",
      category: "Recognition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_12_Prof_Piyush_Dalke.jpeg",
    },
    {
      name: "Department of Mechanical Engineering",
      achievement: "IMPAC Conclave 2.0 — Accolades",
      description:
        "Department and faculties supported the ideas of students and received accolades by delegates at IMPAC Conclave 2.0 at Pune University Campus, hosted and conceptualized by Krishna Institute of Medical Science and Government Ecosystem of Maharashtra State Innovation Society on 07/10/2022.",
      category: "Recognition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_13_Department.jpeg",
    },
    {
      name: "Prof. Piyush Dalke",
      achievement: "Best Ergonomic Device Award — MEDIC 2022, IIT Mumbai",
      description:
        "Prof. Piyush Dalke, Dept of Mechanical Engg., received the Best Ergonomic Device Award for Xerostomia Estimator Device at MEDIC 2022 held by IIT Mumbai on 01/10/2022.",
      category: "Award",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_14_Prof_Piyush_Dalke.jpeg",
    },
    {
      name: "Prof. N. H. Khandare",
      achievement: "First Prize — EV Acceleration Hazards Project",
      description:
        "Prof. N. H. Khandare and 4M students received First Prize for the project: Prevention of Acceleration Hazards in EVs.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_15_Prof_N_H_Khandare.jpeg",
    },
    {
      name: "Prof. N. H. Khandare",
      achievement: "Third Prize — Vandal Proof Air Valve Project",
      description:
        "Prof. N. H. Khandare and 4M students received Third Prize for the project: Design and Fabrication of Vandal Proof Air Valve.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Faculty_16_Prof_N_H_Khandare.jpeg",
    },
  ],
  students: [
    {
      name: "Team X-Treme",
      achievement: "2nd Runner-Up — HFKC National Championship",
      description:
        "Team X-Treme, Dept. of Mechanical Engineering, SSGMCE secured remarkable success as 2nd Runner-Up among all participating teams across the nation at the prestigious National Level Hindustan Formula Karting Championship (HFKC), held at IES University, Bhopal, from 01–04 October 2025.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Student_17_Team_X_Treme.jpeg",
    },
    {
      name: "Mr. Atharv Bochare",
      achievement: "3rd Position — International Conference",
      description:
        "Mr. Atharv Bochare bagged 3rd position in International Conference on Emerging Trends in Physical Sciences held on 12th March 2025 at Shankarlal Khandelwal Arts, Science, and Commerce College, Akola.",
      category: "Conference",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Student_18_Mr_Atharv_Bochare.jpeg",
    },
    {
      name: "Abhijeet Nanotkar & Team",
      achievement: "Consolation Prize — ABB Ltd. Nashik",
      description:
        "Abhijeet Nanotkar and Team won the consolation prize at ABB Limited Nashik's event Collaboration Journey 2024.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Student_19_Abhijeet_Nanotkar_Team.jpeg",
    },
    {
      name: "ELYSIUM 2K-23 Team",
      achievement: "3rd Prize — Auto-Mech Event, VPKBIET Baramati",
      description:
        "ELYSIUM 2K-23 Team secured third prize in Auto-Mech event organised by VPKBIET, Baramati.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Student_20_ELYSIUM_2K_23_Team.jpeg",
    },
    {
      name: "Student Team",
      achievement: "Second Winner — Medical Device Hackathon",
      description:
        "Secured second winner in Medical Device Hackathon held during 20–27 May 2023 at BETIC GHRCE Nagpur & IIT Bombay.",
      category: "Hackathon",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Student_21_Student_Team.jpeg",
    },
    {
      name: "Mr. Deep Goje",
      achievement: "Second Prize — DRONATHON, GCOE Jalgaon 2024",
      description:
        "Mr. Deep Goje with Tejas Kale, student of SSGMCE, received Second Prize in National Drone Racing Competition at Govt. College Jalgaon.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Student_22_Mr_Deep_Goje.jpeg",
    },
    {
      name: "Mr. Amol Kulat & Gaurav Wasu",
      achievement: "First Prize — INNOVA 2024 National Hackathon",
      description:
        "Mr. Amol Kulat & Gaurav Wasu won first prize for outstanding innovation at National Level Hackathon INNOVA 2024 at SSGMCE.",
      category: "Hackathon",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Student_23_Mr_Amol_Kulat_Gaurav_Wasu.jpeg",
    },
    {
      name: "Mr. Deep Goje",
      achievement: "Second Prize — TechKriti 24, IIT Kanpur",
      description:
        "Deep Goje and students of SSGMCE bagged second prize at IIT Kanpur in drone competition TechKriti 24.",
      category: "Competition",
      image:
        "/uploads/images/achievements/mechanical/Mech_Achievement_Student_24_Mr_Deep_Goje.jpeg",
    },
  ],
};

export const defaultInnovativePractices = [
  {
    sn: "01",
    faculty: "Dr. S. P. Trikal",
    subject: "Manufacturing Technology",
    practice: "Educational Videos",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EbwtrO9N6uZFtcRSFKPLXxoBxI-fzLuMYLxp1DYaTb6m2w?e=G6Z9zm",
    isExternal: true,
  },
  {
    sn: "02",
    faculty: "Dr. V. K. Thute",
    subject: "Dynamics of Machines",
    practice: "Mini Project",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EYMIFk1zcrJLk0UdjU4h-IYB_IMA3pwUoujLQhaTczb2QA?e=oeycWI",
    isExternal: true,
  },
  {
    sn: "03",
    faculty: "Prof. M. B. Bhambere",
    subject: "Hydraulic and Pneumatic Systems",
    practice: "Multimedia, Quizzes",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EY942ZMPklBFtV69v-HkwSQBDjjnPHxJI57IpaywiAMxgg?e=ObRF3E",
    isExternal: true,
  },
  {
    sn: "03",
    faculty: "Prof. M. B. Bhambere",
    subject: "Heat Transfer",
    practice: "Animations, PPT, Quizzes",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/Ef2uMLTcY8tGncUOR7VRSAoB8TSCfIhZS_lzn2OrjWlN-w?e=tFVRVj",
    isExternal: true,
  },
  {
    sn: "04",
    faculty: "Prof. C. V. Patil",
    subject: "Engineering Mechanics",
    practice: "Think-Pair-Share",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EWIXl4TAOtpHlLCvBhDfqT0Bbq9yAYDqd7e7Fn7JzUfhBA?e=4J0ppr",
    isExternal: true,
  },
  {
    sn: "05",
    faculty: "Dr. J. G. Khan",
    subject: "Automobile Engineering",
    practice: "Quizzes",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EcKxBDp5JVJImbUJpAdU_6YB4m7wU4CblZxFqRbir6Yfbg?e=LPKp9y",
    isExternal: true,
  },
  {
    sn: "05",
    faculty: "Dr. J. G. Khan",
    subject: "Production Planning and Control",
    practice: "PPTs",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EcKxBDp5JVJImbUJpAdU_6YB4m7wU4CblZxFqRbir6Yfbg?e=LPKp9y",
    isExternal: true,
  },
  {
    sn: "06",
    faculty: "Prof. A. S. Bharule",
    subject: "Mechanics of Materials",
    practice: "PPTs, Virtual Labs",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/ETIuPLgjIuRDsCSS7-x93JcBm5dAXDm0pY05etI46IsK_w?e=vj14r9",
    isExternal: true,
  },
  {
    sn: "06",
    faculty: "Prof. A. S. Bharule",
    subject: "Design of Machine Elements",
    practice: "PPTs, Educational Videos",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EdMBffNLanFBvhbC48OPk-sBfg8yIdo3-miQCB_LhWkmFg?e=YdeWEC",
    isExternal: true,
  },
  {
    sn: "07",
    faculty: "Dr. N. H. Khandare",
    subject: "Robotics & Ind. Application",
    practice: "Industrial Visit, PPTs",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EQ2Gf9ZH2CVOrEdUPh2g_wUBtbj87L-bxyFoVNA24WM5gQ?e=2TmbQ2",
    isExternal: true,
  },
  {
    sn: "07",
    faculty: "Dr. N. H. Khandare",
    subject: "Metrology & Qual. Control",
    practice: "PPTs",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EQ2Gf9ZH2CVOrEdUPh2g_wUBtbj87L-bxyFoVNA24WM5gQ?e=2TmbQ2",
    isExternal: true,
  },
  {
    sn: "08",
    faculty: "Prof. N. B. Borkar",
    subject: "Engineering Graphics",
    practice: "Multimedia",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EROnHPqrV8ZJo2M5bseaLA0BdPd5sHdeYTV_1F5C4YTJMA?e=oKPZEc",
    isExternal: true,
  },
  {
    sn: "09",
    faculty: "Prof. S. Q. Syed",
    subject: "Engineering Thermodynamics",
    practice: "Quiz",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EVhJFQO2kX9JnXA0YYRkVXYBaF98s2ShVclXWJebDpUv7A?e=pGqcBf",
    isExternal: true,
  },
  {
    sn: "10",
    faculty: "Dr. K. V. Chandan",
    subject: "Fluid Mechanics",
    practice: "Think Pair and Share",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/ES087m8-X1VDta_sbsFolo8BDvQtIIVB1mRSzNfII1_Wgw?e=0CDUUL",
    isExternal: true,
  },
  {
    sn: "11",
    faculty: "Dr. P. A. Dalke",
    subject: "Automobile Engg. & Electric Vehicles",
    practice: "Power Point Presentation",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EU_levUPzD5LoK6Ju-LJbBYBesO_jOlsbBOEndgEwfP5SA?e=G6hDk3",
    isExternal: true,
  },
  {
    sn: "12",
    faculty: "Dr. S. P. Joshi",
    subject: "Material Science",
    practice: "Power Point Presentation",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EfCYnSOv5LJIrOhTC9pUKkkB2Po1xls0gkStTKIFRCa7yw?e=lKBcD1",
    isExternal: true,
  },
  {
    sn: "13",
    faculty: "Prof. K. R. Dudhe",
    subject: "Engg Graphics",
    practice: "Quizzes",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EfJd8tnp-ERKvyiXjIj0MmYBnQyen2ZENhr6WtxmCQzpxQ?e=2hfc6f",
    isExternal: true,
  },
  {
    sn: "13",
    faculty: "Prof. K. R. Dudhe",
    subject: "Operation Research Techniques",
    practice: "PPTs",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EQB4CMSH8jZPix5zsHEipw8B9v0cwcJWUJgNL0VFKEwCoQ?e=Anlt8b",
    isExternal: true,
  },
  {
    sn: "14",
    faculty: "Prof. V. T. Mhaske",
    subject: "Material Science",
    practice: "Industrial Visits",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EU7t3Bs6IKBFsoAmJsJlHkcBDlL7nhx4iCvY3SUINEborw?e=LqpzAP",
    isExternal: true,
  },
  {
    sn: "14",
    faculty: "Prof. V. T. Mhaske",
    subject: "Kinematics of Machine",
    practice: "PPTs and Simulations Video",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/EQPANUGNs2xKvOUKw5do_3oBU6U2KagYwssIHRa5V2RYCQ?e=zzpPaX",
    isExternal: true,
  },
  {
    sn: "15",
    faculty: "Prof. G. S. Wahile",
    subject: "Industrial Robotics and Applications",
    practice: "Simulation Based Learning",
    link: "https://ssgmceacin-my.sharepoint.com/:b:/g/personal/accreditation_co_mech_ssgmce_ac_in/ESbCB-MfoEVIkO-Dv20ftCABCv5evYzAqLrqChmCJJDlqQ?e=m4XBKf",
    isExternal: true,
  },
];

// ─── Innovative Practices: Markdown converter helpers ─────────────────────────

export function mechInnovativePracticesToMarkdown(practicesData = []) {
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

export function mechMarkdownToInnovativePractices(markdown = "") {
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

export const defaultMechInnovativePracticesMarkdown = mechInnovativePracticesToMarkdown(
  defaultInnovativePractices,
);

// ===================== PATENTS =====================
export const defaultMechPatents = {
  "2024-25": [
    {
      title: "IOT enabled waste segregation and disposition machine",
      status: "Granted",
      id: "442409-001",
      inventors: "Dr. Saurabh Joshi",
    },
    {
      title: "Geothermal heat pump",
      status: "Granted",
      id: "424670-001",
      inventors: "Dr. Saurabh Joshi",
    },
  ],
  "2023-24": [
    {
      title:
        "Endodontic File To Avoid Fracture In Root Canal during Root Canal Therapy Using Machine Learning",
      status: "Published",
      id: "20222100376",
      inventors: "Prof. P A Dalke",
    },
    {
      title: "A Seeding Device for an Unmanned Arial Vehicle",
      status: "Published",
      id: "TEMP/E-1/38041/2024-MUM",
      inventors: "Dr. V. K. Thute",
    },
    {
      title:
        "Alkali Activated Soil Stabilization composition utilization Rice Husk ash and Sugarcane Bagasses Ash for Infrastructure development",
      status: "Published",
      id: "202121009581 A",
      inventors: "Dr. S B Somani",
    },
  ],
  "2022-23": [
    {
      title: "Development of Lean Manufacturing Implementation Model",
      status: "Published",
      id: "L-117468/2022",
      inventors: "Dr. J G Khan",
    },
    {
      title: "Design of Dual Axis Solar Tracker",
      status: "Published",
      id: "L-118120/2022",
      inventors: "Dr. S P Trikal",
    },
    {
      title: "Design of Centrifugal Dryer",
      status: "Granted",
      id: "337538-001",
      inventors: "Prof. P A Dalke",
    },
  ],
  "2021-22": [],
  "2020-21": [],
  "2019-20": [],
  "2018-19": [
    {
      title:
        "Throughput Time and Productivity Optimization in propeller shaft assembly",
      status: "Published",
      id: "L-81955/2019",
      inventors: "Dr. N H Khandare",
    },
  ],
};

// ===================== INSTITUTE-LEVEL PATENTS (from patent.php) =====================
export const defaultMechInstitutePatents = [
  {
    title:
      "Endodontic file to avoid fracture in root canal therapy using machine learning",
    id: "20221003764",
    filingDate: "23/01/2022",
    status: "Application published",
  },
  {
    title: "A Solar Operable System for Cooking and Water Purification",
    id: "202021001375",
    filingDate: "13/01/2020",
    status: "Application published",
  },
  {
    title:
      "An Internet of Things (IOT) Autonomous Based Sewer Pipe Cleaning Robot",
    id: "201721026894",
    filingDate: "28/07/2017",
    status: "Awaiting Request for Examination",
  },
  {
    title: "Automated Vehicle Verification & Monitoring System",
    id: "201621041558",
    filingDate: "05/12/2016",
    status: "Application referred u/s 12 for examination",
  },
  {
    title: "Hybrid Solar Energy Storage Device",
    id: "201621000237",
    filingDate: "05/01/2016",
    status: "Application Published",
  },
  {
    title: "An optical feedback system for halbach array motor",
    id: "129/MUM/2015",
    filingDate: "13/01/2015",
    status: "Application Published",
  },
  {
    title: "Composition for cataract and method of preparation",
    id: "2810/MUM/2010",
    filingDate: "11/10/2010",
    status: "Application Published",
  },
  {
    title: "A Polyhouse",
    id: "1963/MUM/2010 (325321)",
    filingDate: "09/07/2010",
    status: "Granted",
  },
  {
    title: "Phaco Tip for/and phaco emulsification technique",
    id: "1965/MUM/2010",
    filingDate: "09/07/2010",
    status: "Application Published",
  },
  {
    title: "Multipurpose and Multifunctional Stool",
    id: "1964/MUM/2010",
    filingDate: "09/07/2010",
    status: "Application Published",
  },
  {
    title: "Intelligent Electricity Metering System",
    id: "1966/MUM/2010",
    filingDate: "09/07/2010",
    status: "View Examination Report (S)",
  },
  {
    title: "A Solar lantern with an improved power control circuit",
    id: "1270/MUM/2009",
    filingDate: "20/05/2009",
    status: "Application Refused U/S 15",
  },
  {
    title: "A cost-effective process for Bio-diesel extraction",
    id: "25/MUM/2009",
    filingDate: "05/01/2009",
    status: "View Examination Report (S)",
  },
  {
    title: "An improved solar power street lighting system",
    id: "416/MUM/2008",
    filingDate: "29/02/2008",
    status: "Application Refused U/S 15",
  },
  {
    title: "All in one shaving tool",
    id: "415/MUM/2008 (261018)",
    filingDate: "29/02/2008",
    status: "Granted on 30/05/2014",
  },
  {
    title: "An Improved Lead Acid battery for solar power system",
    id: "2275/MUM/2007 (259072)",
    filingDate: "19/11/2007",
    status: "Granted on 24/02/2014",
  },
  {
    title: "A static cooling device for vehicle interior",
    id: "2274/MUM/2007",
    filingDate: "19/11/2007",
    status: "View Examination Report (S)",
  },
  {
    title: "A solar based alternating current generator and booster",
    id: "2273/MUM/2007",
    filingDate: "19/11/2007",
    status: "View Examination Report (S)",
  },
  {
    title: "Printed circuit board based single phase power transformer",
    id: "2272/MUM/2007",
    filingDate: "19/11/2007",
    status: "View Examination Report (S)",
  },
  {
    title: "A Bio-gas generation system",
    id: "2271/MUM/2007",
    filingDate: "19/11/2007",
    status: "View Examination Report (S)",
  },
  {
    title:
      "Stand alone on line production efficiency monitor using system on-chip with in-built serially arranged easy for reconfiguration measurement device",
    id: "2270/MUM/2007",
    filingDate: "19/11/2007",
    status: "View Examination Report (S)",
  },
  {
    title: "A Pneumatic Air Rotor Driven Water Pump",
    id: "2269/MUM/2007 (256824)",
    filingDate: "19/11/2007",
    status: "Granted on 31/07/2013",
  },
  {
    title: "A Power system for current balancing under unbalanced conditions",
    id: "1927/MUM/2007",
    filingDate: "28/09/2007",
    status: "View Examination Report (S)",
  },
];

// ===================== PUBLICATIONS =====================
export const defaultMechPublications = {
  "2024-25": [
    {
      title: "Sustainable Cooling with Clay Tubes in Honeycomb Structures",
      authors: "Dr S.P.Trikal, Prof. K. R. Dudhe",
      journal:
        "Journal of Propulsion Technology, Vol. 45 No. 3(2024), ISSN: 1001-4055, SCOPUS",
      link: "https://drive.google.com/open?id=1EbixXyWkfbpyYc8EzVbReZ2IkfVbuzOx",
    },
    {
      title: "Critical Analysis of the supply chain management of pulses",
      authors: "Dr S.P.Trikal, Yogesh Biyani",
      journal:
        "International Journal of Innovative Research in Technology, Volume 11 Issue 5, ISSN: 2349-6002, UGC Approved",
      link: "https://ijirt.org/Article?manuscript=168676",
    },
    {
      title:
        "Design and Fabrication of AI adaptive solar panel cleaning mechanism",
      authors: "Dr. N.H.Khandare, Dr. S. P. Joshi",
      journal: "Goya Journal, Volume 17, Issue 08, ISSN: 0017-2715, SCOPUS",
      link: "https://goyajournal.com/index.php/volume-17-issue-08-2024/",
    },
    {
      title:
        "Design and Development of IOT enabled Electronic Circuit for Solar Arrays Cleaning Mechanism",
      authors: "Dr. N.H.Khandare, Dr. S. P. Joshi",
      journal:
        "Journal of Propulsion Technology, Vol. 45 No. 03(2024), ISSN: 1001-4055, SCOPUS",
      link: "https://propulsiontechjournal.com/index.php/journal/article/view/7704",
    },
    {
      title:
        "Multi response optimization of process parameters in titanium alloy minimum quantity lubrication drilling operation",
      authors: "Dr Piyush A Dalke",
      journal:
        "Engineering Research Express, ISSN: 2631-8695, SCOPUS, DOI: 10.1088/2631-8695/ad7cc7",
      link: "",
    },
    {
      title:
        "A Review: Nanofluids in Machining for Performance and Sustainability",
      authors: "Dr Piyush A Dalke",
      journal:
        "Journal of Physics, ISSN: 1742-6596, SCOPUS, DOI:10.1088/1742-6596/2763/1/012012",
      link: "",
    },
    {
      title:
        "Investigation on Enhancing Heat Transfer Properties Experimentally Using Grooved Tube",
      authors: "Dr. S.P. Joshi, Prof. S.Q. Syed, Dr J.G. Khan",
      journal:
        "Journal of Propulsion Technology, Vol. 45, ISSN: 1001-4055, SCOPUS",
      link: "",
    },
    {
      title:
        "An Alternative Energy Integration In Four-Stroke ICE Using Thermo-Electric Materials",
      authors: "Dr. S.P. Joshi, Prof. K.V.Chandan",
      journal:
        "Energy Sources, Part A: Recovery, Utilization, and Environmental Effects, SCI (Q2)",
      link: "https://drive.google.com/open?id=1EbixXyWkfbpyYc8EzVbReZ2IkfVbuzOx",
    },
    {
      title:
        "A Review on Mechanical and Vibrational Characteristics of Natural Fiber Reinforced Composite Materials",
      authors: "Dipak Nikam, Dr.K.V.Chandan, Atul Shinde",
      journal:
        "Journal of Materials Science Research, Volume 8 Issue 2, ISSN: 134195, Referred/Review",
      link: "https://www.journaljmsrr.com/index.php/JMSRR/article/view/408/865",
    },
    {
      title:
        "Design and Development of Solar Light Tube for Multilayer Farming",
      authors: "Dr S P Joshi",
      journal:
        "Journal of Information Systems Engineering and Management, ISSN: 2468-5376, SCOPUS",
      link: "https://jisem-journal.com/index.php/journal/article/view/10308",
    },
    {
      title:
        "A hybrid approach to optimize engine performance and emission control in internal combustion engines using graphene quantum dots-enhanced biodiesel-diesel blends",
      authors: "Dr S P Joshi",
      journal: "Applied Thermal Engineering, ISSN: 1359-4311, SCI",
      link: "https://www.sciencedirect.com/science/article/abs/pii/S1359431125014334",
    },
    {
      title:
        "Diagnosis of Bearing and inter turn fault in induction motor using Analysis and ANN",
      authors: "Dr. V.K.Thute",
      journal:
        "National Conference on Condition Monitoring, Held at VNIT Nagpur, National",
      link: "",
    },
    {
      title:
        "Experimental study on evaporative cooling of photovoltaic panel using cotton wick",
      authors: "Prof. Ganesh Wahile",
      journal:
        "International Conference on Environmental Science and Technology, Held at SVNIT Surat, SCOPUS",
      link: "https://www.tandfonline.com/doi/abs/10.1080/15567036.2025.2498670",
    },
    {
      title:
        "A Skeptical Demeanor Revelation System Fused with Machine Learning Civil Cyber Security",
      authors: "Dr S P Joshi",
      journal:
        "2024 International Conference on Advances in Computing, Communication and Materials (ICACCM), DOI: 10.1109/ICACCM61117.2024, International",
      link: "",
    },
    {
      title:
        "A Solar Tracking Feasibility Study for Developments in Solar Tracking Systems",
      authors: "Dr. K V Chandan, N G More",
      journal:
        "Advances in Clean Energy Technologies (ICET 2023), ISBN: 978-981-97-6548-5, SCOPUS",
      link: "https://link.springer.com/chapter/10.1007/978-981-97-6548-5_6",
    },
    {
      title:
        "Performance improvement of photovoltaic panel using cotton wick structure: An evaporative cooling",
      authors: "Prof. Ganesh Wahile",
      journal:
        "International Conference on Advanced Material and Technologies (ICAMT-2025), MANIT Bhopal, SCOPUS",
      link: "",
    },
    {
      title:
        "Advancements and Challenges in Pillow Plate Heat Exchangers: A Comprehensive Review",
      authors: "Prof. K.R.Dudhe",
      journal:
        "3rd International Conference on Innovations in Clean Energy Technologies (ICET 2025), SCOPUS",
      link: "",
    },
    {
      title:
        "Increased Technical Efficiency of Various Renewable Energy Resources in Smart Grids and Power System",
      authors: "Dr. S.P.Joshi",
      journal:
        "2025 First International Conference on Advances in Computer Science, Electrical, Electronics, and Communication Technologies (CE2CT), IEEE Xplore/SCOPUS",
      link: "https://ieeexplore.ieee.org/document/10939526",
    },
    {
      title: "Exploring IoT Applications in Digital Hospital Systems",
      authors: "Dr P A Dalke",
      journal:
        "National Conference on Innovation in Engineering and Technology, UGC Care, National",
      link: "",
    },
    {
      title:
        "Analysis and optimization of effect of liquid nitrogen on 52100 bearing steel material during Cryogenic Machining in comparison with dry machining",
      authors: "V. T. Mhaske",
      journal:
        "International Conference on Advanced Materials and Technologies (ICAMT 2025), SCOPUS",
      link: "",
    },
  ],
  "2023-24": [
    {
      title: "Design and Development modified seed sowing machine",
      authors: "Prof. N. B Borkar, Prof. C. V. Patil",
      journal:
        "GOYA Journal, ISSN: 0017-2715, Vol 17, Issue 3, pp 80-90, March-24, Scopus/UGC CARE Group-II",
      link: "https://goyajournal.com/index.php/volume-17-issue-03-2024/",
    },
    {
      title:
        "Review on design and fabrication of solar panel cleaning mechanism",
      authors: "Dr. Nilesh Khandare",
      journal:
        "International Journal of Scientific Research in Engineering and Management, ISSN: 2582-3930, Vol 8, Issue 5, Impact Factor 8.448",
      link: "https://ijsrem.com/download/review-on-design-and-fabrication-of-solar-panel-cleaning-mechanism/",
    },
    {
      title: "CFD Analysis and Validation of Axial Compressor Rotor Blade",
      authors: "Prof. S. Q. Syed",
      journal:
        "IJARSCT, ISSN: 2581-9429, Volume 4, Issue 7, April 2024, Impact Factor 7.301",
      link: "https://ijarsct.co.in/A17859.pdf",
    },
    {
      title: "Review on Sanitary Waste Management with the Help of Incinerator",
      authors: "Prof. K. V. Chandan",
      journal:
        "International Journal of Scientific Research in Engineering and Management, ISSN: 2582-3930, Volume 08 Issue 01, SJIF Rating: 8.176",
      link: "https://ijsrem.com/download/review-on-sanitary-waste-management-with-the-help-of-incinerator/",
    },
    {
      title:
        "Performance analysis of photovoltaic panel using machine learning method",
      authors: "Prof. G. S. Wahile, Dr. S. P Trikal",
      journal:
        "The Indonesian Journal of Electrical Engineering and Computer Science (IJEECS), ISSN: 2502-4752, Vol.34, No.1, April 2024, Scopus 2.9",
      link: "https://ijeecs.iaescore.com/index.php/IJEECS/article/view/35818",
    },
  ],
  "2022-23": [
    {
      title:
        "Effect of Rectangular Fins on Heat Transfer Characteristics of Domestic Cookware",
      authors: "Prof. S.P.Joshi",
      journal:
        "International Journal of Heat and Technology, ISSN: 0392-8764, Vol. 40, Issue 4, pp. 987-992, Web of Science/Scopus",
      link: "https://www.researchgate.net/publication/364076634_Effect_of_Rectangular_Fins_on_Heat_Transfer_Characteristics_of_Domestic_Cookware",
    },
    {
      title: "Design and development of Multipurpose Agriculture Equipment",
      authors: "Prof. N.B.Borkar",
      journal:
        "IJARSCT, ISSN: 2581-9429, Volume 3, May 2023, Impact Factor 7.301",
      link: "https://ijarsct.co.in/A10880.pdf",
    },
    {
      title:
        "Design and Development of Variable Flow of Pesticide Sprayer for Agriculture Purpose",
      authors: "Prof C V Patil",
      journal:
        "IJARSCT, ISSN: 2581-9429, Volume 3, Issue 14, May 2023, Impact Factor 7.301",
      link: "https://ijarsct.co.in/Paper10806.pdf",
    },
    {
      title:
        "Comparative review on conventional and recently developed perforated fins for heat transfer enhancement",
      authors: "Prof. M.B. Bhambere",
      journal:
        "AIP Conference Proceedings, ISBN: 978-0-7354-4213-9, Volume 2653, Issue 1, SCOPUS",
      link: "https://doi.org/10.1063/5.0110878",
    },
    {
      title:
        "A Solar Tracking Feasibility Study for Developments in Solar Tracking System",
      authors: "Prof K.V.Chandan",
      journal:
        "International Conference on Innovations in Clean Energy Technologies, MNIT Bhopal, ISSN: 2352-2542, SCI",
      link: "https://doi.org/10.1007/978-981-16-0235-1",
    },
  ],
  "2021-22": [
    {
      title:
        "Development of Mechanical Fuel Injector Testing Machine in Cost Effective Manner",
      authors: "Dr.V.K.Thute",
      journal: "IJARSCT, ISSN: 2581-9429, International Journal",
      link: "https://ijarsct.co.in/Paper4530.pdf",
    },
    {
      title: "Fabrication of Robot to Assist the Firefighter",
      authors: "Dr.J.G.Khan",
      journal: "IJARSCT, ISSN: 2581-9429, International Journal",
      link: "https://ijarsct.co.in/Paper4058.pdf",
    },
    {
      title: "Development of low maintenance desert cooler",
      authors: "Prof C.V.Patil",
      journal: "IJARSCT, ISSN: 2581-9429, International Journal",
      link: "https://ijarsct.co.in/Paper4529.pdf",
    },
    {
      title: "Design and Development of Puncture Kit",
      authors: "Prof. N. B. Borkar",
      journal: "IJARSCT, ISSN: 2581-9429, International Journal",
      link: "https://ijarsct.co.in/A4515.pdf",
    },
    {
      title: "Design and fabrication of IoT enabled air purification system",
      authors: "Prof. Pradip Patokar",
      journal: "IJARSCT, ISSN: 2581-9429, International Journal",
      link: "https://ijarsct.co.in/Paper4093.pdf",
    },
    {
      title:
        "Design and Fabrication of Portable and Foldable Sand Filter Machine",
      authors: "Prof R. V. Rajkolhe",
      journal: "IJARSCT, ISSN: 2581-9429, International Journal",
      link: "https://ijarsct.co.in/Paper4283.pdf",
    },
    {
      title:
        "Design and Development of a Portable Thermo-Electric cooler Bottle",
      authors: "Prof. N. G. More",
      journal: "IJARSCT, ISSN: 2581-9429, International Journal",
      link: "https://ijarsct.co.in/Paper4213.pdf",
    },
    {
      title:
        "Recent design of fins for heat transfer enhancement of thermal system - A review",
      authors: "Prof M.B. Bhambere",
      journal: "Proceedings of PDCUBE-2021, ISBN: 978-0-7354-4213-9",
      link: "https://scholar.google.co.in/citations?view_op=view_citation&hl=en&user=GTzgrbMAAAAJ&citation_for_view=GTzgrbMAAAAJ:zYLM7Y9cAGgC",
    },
    {
      title:
        "Numerical analysis of heat transfer from perforated fins of an induction motor housing",
      authors: "Prof M.B. Bhambere",
      journal:
        "IOP Conference Series: Materials Science and Engineering, ISBN: 10.1088/1757-899, Scopus",
      link: "https://iopscience.iop.org/article/10.1088/1757-899X/1259/1/012011/meta",
    },
    {
      title:
        "Experimental Investigation of Hybrid Nanofluids Characteristics in Ti6Al4V Drilling Using Minimum Quantity Lubrication Technique",
      authors: "Prof. P.A.Dalke",
      journal:
        "Springer Proceedings in Energy, ISBN: 978-981-16-6874-6, Scopus",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=g9Xz6v4AAAAJ&citation_for_view=g9Xz6v4AAAAJ:2osOgNQ5qMEC",
    },
  ],
  "2020-21": [
    {
      title:
        "Potential use of the passive cooling technique in evaporative cooler",
      authors: "Prof. Kunal D Gadgil",
      journal: "IJERT, Volume 2 Issue 10, ISSN: 2278-0181, International",
      link: "",
    },
    {
      title:
        "Synthesis and characterization of Aluminum silicon oxide hybrid Nano fluid",
      authors: "Prof. P.A.Dalke",
      journal:
        "International Journal of Mechanical Engineering, ISSN: 0974-5823, Vol. 6 No. 2, Q4 Scopus",
      link: "",
    },
  ],
  "2019-20": [
    {
      title:
        "Qualitative And Quantitative Analysis Of Friction Stir Welding Of 6111-T4 Alloy Joint With Preheating",
      authors: "Prof. Nitin B Borkar",
      journal: "International Journal, ISSN: 2249-8001/2249-6890, UGC CARE",
      link: "http://www.tjprc.org/publishpapers/2-67-1587790838-11IJMPERDJUN202011.pdf",
    },
    {
      title: "Design and development of low-cost orange sorter",
      authors: "Prof P.T.Patokar",
      journal: "International Journal, ISSN: 2321-0613, UGC CARE",
      link: "https://www.ijsrd.com/articles/IJSRDV8I30986.pdf",
    },
    {
      title:
        "Determination of important parameters in Lean implementation in plastic pipe industries by factor analysis",
      authors: "Dr. J.G.Khan",
      journal: "International Conference, ISBN: 978-1-7281-1901-4, Scopus",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=efXhz_0AAAAJ&citation_for_view=efXhz_0AAAAJ:d1gkVwhDpl0C",
    },
    {
      title:
        "Review on Design and heat transfer analysis of solid and perforated fins for the enhancement of thermal performance of heat sinks",
      authors: "Prof. M.B. Bhambere",
      journal: "International Conference, ISBN: 978-1-7281-1901-4, Scopus",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=GTzgrbMAAAAJ&citation_for_view=GTzgrbMAAAAJ:u-x6o8ySG0sC",
    },
    {
      title:
        "NOx Reduction with Coherence of Particulate Matter for Single-Cylinder Diesel Engine Using Proportional EGR Technique",
      authors: "Prof. K.V.Chandan",
      journal: "International Conference, ISBN: 978-981-15-2662-6, Scopus",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=_Po_0agAAAAJ&citation_for_view=_Po_0agAAAAJ:9yKSN-GCB0IC",
    },
  ],
  "2018-19": [
    {
      title: "Implementation of 5S methodology at spectrum electricals limited",
      authors: "Dr. Javed Khan",
      journal: "International Journal, ISSN: 2349-5162",
      link: "https://www.jetir.org/view?paper=JETIR1905531",
    },
    {
      title:
        "Productivity Improvement with the help of value stream mapping by reducing mould changeover time",
      authors: "Dr. Javed Khan",
      journal: "International Journal, ISSN: 2349-5162",
      link: "https://www.jetir.org/view?paper=JETIR1906G69",
    },
    {
      title: "Validation and performance of pin Fins using CFD",
      authors: "Prof M.B.Bhambere",
      journal: "International Journal, ISSN: 2456-3239",
      link: "http://www.oaijse.com/VolumeArticles/FullTextPDF/344_1.VALIDATION_AND_PERFORMANCE_OF_PIN_FINS_USING_CFD.pdf",
    },
    {
      title: "Design and Development of Manually Operated Cotton Seed Planter",
      authors: "Prof. C V Patil",
      journal: "International Journal, ISSN: 2349-5162",
      link: "https://www.jetir.org/view?paper=JETIR1904G89",
    },
    {
      title: "Structural analysis of ground nut oil extraction machine",
      authors: "Prof. A.S.Bharule",
      journal: "International Journal, ISSN: 2349-5162",
      link: "https://www.jetir.org/papers/JETIR1905C88.pdf",
    },
    {
      title: "Quantitative analysis of FSW weld joints",
      authors: "Prof. N B Borkar",
      journal: "International Journal, ISSN: 2349-5162",
      link: "https://www.jetir.org/papers/JETIR1906853.pdf",
    },
    {
      title:
        "Elimination type of Pokayoke - a game changer tool in propeller shaft assembly",
      authors: "Prof. Nilesh H. Khandare",
      journal: "International Journal, ISSN: 2249-6890",
      link: "https://www.academia.edu/51369953/An_Elimination_Type_of_Pokayoke_A_Game_Changer_Tool_in_the_Propeller_Shaft_Assembly",
    },
    {
      title:
        "Productivity Optimization: a tailored Lean and Agile approach for Automotive Propeller Shaft Assembly",
      authors: "Prof. Nilesh H. Khandare",
      journal: "International Journal, E-ISSN: 2321-9637",
      link: "https://ijrat.org/downloads/Vol-6/july-2018/paper%20ID-67201891.pdf",
    },
    {
      title:
        "Paint Peel off - A Nuisance in Automotive Propeller Shaft Assembly",
      authors: "Prof. Nilesh H. Khandare",
      journal: "International Journal, ISSN (E): 2249-8001, Scopus",
      link: "https://www.academia.edu/38100177/PAINT_PEEL_OFF-A_NUISANCE_IN_AUTOMOTIVE_PROPELLER_SHAFT_ASSEMBLY",
    },
    {
      title:
        "Bearing Cup Grease Metering for EOHS Fulfilment – An obligatory in Propeller Shaft Assembly",
      authors: "Prof. Nilesh H. Khandare",
      journal: "International Journal, ISSN: 2278-0181",
      link: "https://www.ijert.org/bearing-cup-grease-metering-for-eohs-fulfilment-an-obligatory-in-propeller-shaft-assembly",
    },
    {
      title:
        "Numerical and experimental investigation of dual purpose solar collector",
      authors: "Prof. N. G. More",
      journal: "International Journal, ISSN: 2278-0181",
      link: "https://www.ijert.org/numerical-and-experimental-investigation-of-dual-purpose-solar-collector",
    },
  ],
};

// ===================== COPYRIGHTS =====================
export const defaultMechCopyrights = {
  "2024-25": [
    {
      name: "Dr P A Dalke",
      title:
        "Using AI In Biomedical Translational Research To Improve Patient Care",
      status: "Published",
    },
  ],
  "2023-24": [
    {
      name: "Dr. S P Trikal",
      title: "Tractor based Battery operated Cost effective Spraying System",
      status: "Published",
    },
    {
      name: "Prof. P A Dalke",
      title: "NACA-0008 Airfoil: CFD Simulation with ANSYS Fluent",
      status: "Published",
    },
  ],
  "2022-23": [
    {
      name: "Dr. J G Khan",
      title: "Development of Lean Manufacturing Implementation Model",
      status: "Published",
    },
    {
      name: "Dr. S P Trikal",
      title: "Design of Dual Axis Solar Tracker",
      status: "Published",
    },
  ],
  "2021-22": [],
  "2020-21": [],
  "2019-20": [],
  "2018-19": [
    {
      name: "Dr. N H Khandare",
      title:
        "Throughput Time and Productivity Optimization in propeller shaft assembly",
      status: "Published",
    },
  ],
};

export const defaultLearningResources = [
  {
    year: "Second Year",
    title: "2M (Second Year Mechanical)",
    syllabusLink: "https://mega.nz/folder/dqYXCLrZ#xVT5-kLn-Kc7g--f0qi6bg",
    resourceLink: "https://mega.nz/folder/F2Q0lRBI#_5KhJ7KJYiU8vz2Y-xD5cA",
  },
  {
    year: "Third Year",
    title: "3M (Third Year Mechanical)",
    syllabusLink: "https://mega.nz/folder/dqYXCLrZ#xVT5-kLn-Kc7g--f0qi6bg",
    resourceLink: "https://mega.nz/folder/xnQBEJbK#L0UmOIuttcG2gSO_2gMfzA",
  },
  {
    year: "Final Year",
    title: "4M (Final Year Mechanical)",
    syllabusLink: "https://mega.nz/folder/dqYXCLrZ#xVT5-kLn-Kc7g--f0qi6bg",
    resourceLink1: "https://mega.nz/folder/Y6p1UDhJ#1hNZbfGYB60n9hSMQiJlVQ",
    resourceLink2: "https://mega.nz/folder/prJDgQTZ#aZ3ZQrG520-wyshUuGwQFQ",
    resourceLink: "https://mega.nz/folder/Y6p1UDhJ#1hNZbfGYB60n9hSMQiJlVQ",
  },
];

export const defaultNBAResources = {
  driveLink:
    "https://drive.google.com/drive/u/2/folders/1yhHUH2Kf8Yd4JQ9hUMwVy1SHELS8_Tng",
  driveLinkText: "Click Here for Mechanical Department NBA Details",
  videos: [
    {
      title: "NBA Resource Video 1",
      embedUrl: "https://www.youtube.com/embed/dorWp_u_P3A",
    },
    {
      title: "NBA Resource Video 2",
      embedUrl: "https://www.youtube.com/embed/LHoIofdIeCc",
    },
    {
      title: "NBA Resource Video 3",
      embedUrl:
        "https://www.youtube.com/embed/MyFuge7hwww?list=PLgMDNELGJ1CaLCcyj81544Mfwpt61K5_o",
    },
    {
      title: "NBA Resource Video 4",
      embedUrl: "https://www.youtube.com/embed/oOEsvwxlpVs",
    },
    {
      title: "NBA Resource Video 5",
      embedUrl: "https://www.youtube.com/embed/LutjGfABs2c",
    },
    {
      title: "NBA Resource Video 6",
      embedUrl: "https://www.youtube.com/embed/0flnAoX9QEw",
    },
  ],
};

export const defaultMechStudentProjects = {
  "2024-25": [
    {
      id: 1,
      title: "Design and Development of Solar Powered Water Pumping System",
    },
    { id: 2, title: "Automated Seed Sowing Machine with IoT Integration" },
    { id: 3, title: "Design of Hybrid Electric Vehicle Charging Station" },
    {
      id: 4,
      title: "Development of Low-Cost CNC Machine for Educational Purpose",
    },
    { id: 5, title: "Smart Energy Meter Using IoT" },
    {
      id: 6,
      title: "Design and Fabrication of Automatic Wall Painting Machine",
    },
    { id: 7, title: "Development of Portable Water Purification System" },
    { id: 8, title: "Design of Multi-Purpose Agricultural Equipment" },
    { id: 9, title: "Automatic Gear Shifting System for Two-Wheeler" },
    { id: 10, title: "Design and Development of Wind Turbine for Rural Areas" },
    { id: 11, title: "Smart Waste Segregation System Using Machine Learning" },
    { id: 12, title: "Design of Eco-Friendly Refrigeration System" },
    {
      id: 13,
      title: "Development of Automatic Braking System for Heavy Vehicles",
    },
    { id: 14, title: "Design and Fabrication of Hydraulic Jack" },
    { id: 15, title: "Solar Powered Irrigation System with Moisture Sensor" },
  ],
  "2023-24": [
    {
      id: 1,
      title: "Design and Development of Automatic Floor Cleaning Robot",
    },
    { id: 2, title: "Fabrication of Pedal Operated Washing Machine" },
    { id: 3, title: "Design of Low-Cost Ventilator for Emergency Use" },
    { id: 4, title: "Development of Automatic Coconut Dehusking Machine" },
    { id: 5, title: "Design and Fabrication of Paper Recycling Machine" },
    { id: 6, title: "Automatic Material Handling System Using PLC" },
    { id: 7, title: "Design of Electric Bicycle with Pedal Assistance" },
    { id: 8, title: "Development of Multi-Crop Harvester" },
    { id: 9, title: "Design and Fabrication of Hydraulic Scissor Lift" },
    { id: 10, title: "Smart Parking System Using IoT" },
    { id: 11, title: "Design of Portable Concrete Mixer" },
    {
      id: 12,
      title: "Development of Automatic Fire Detection and Extinguishing System",
    },
    {
      id: 13,
      title:
        "Design and Fabrication of Air Conditioning System Using Exhaust Heat",
    },
    { id: 14, title: "Automatic Irrigation System Based on Soil Moisture" },
    { id: 15, title: "Design of Friction Stir Welding Setup" },
  ],
  "2022-23": [
    {
      id: 1,
      title: "Design and Development of Pneumatic Sheet Metal Bending Machine",
    },
    { id: 2, title: "Fabrication of Multipurpose Workshop Machine" },
    { id: 3, title: "Design of Solar Water Heater with Phase Change Material" },
    { id: 4, title: "Development of Automatic Glass Cutting Machine" },
    { id: 5, title: "Design and Fabrication of Pneumatic Punching Machine" },
    { id: 6, title: "Automatic Street Light Control System Using LDR" },
    { id: 7, title: "Design of Portable Grass Cutting Machine" },
    { id: 8, title: "Development of Hydraulic Pipe Bending Machine" },
    { id: 9, title: "Design and Fabrication of Pedal Powered Flour Mill" },
    { id: 10, title: "Smart Home Automation System" },
    { id: 11, title: "Design of Low-Cost Lathe Machine" },
    { id: 12, title: "Development of Automatic Bottle Filling Machine" },
    { id: 13, title: "Design and Fabrication of Pneumatic Bumper Jack" },
    { id: 14, title: "Automatic Railway Gate Control System" },
    { id: 15, title: "Design of Vehicle Tracking System Using GPS" },
  ],
};

export function mechStudentProjectsToMarkdown(projectsData = {}) {
  return Object.keys(projectsData)
    .sort()
    .reverse()
    .map((year) => {
      const header = `## ${year}\n\n| Group No. | Project Title |\n|-----------|--------------|`;
      const projects = projectsData[year] || [];
      if (!projects.length) return `${header}\n| \u2014 | No records |`;
      const rows = projects.map((p) => `| ${p.id} | ${p.title} |`).join("\n");
      return `${header}\n${rows}`;
    })
    .join("\n\n");
}
