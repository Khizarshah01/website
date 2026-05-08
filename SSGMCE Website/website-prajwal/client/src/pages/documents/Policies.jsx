import EnhancedDocumentsLayout from "../../components/EnhancedDocumentsLayout";

const policyDocuments = [
  {
    title: "Strategic Plan and Deployment (2018-19 To 2022-23)",
    summary: "Comprehensive strategic plan outlining the institution's vision, mission, and deployment strategies for the period 2018-19 to 2022-23. This document details the key initiatives, objectives, and implementation roadmap for academic and administrative excellence.",
    pdfUrl: "/uploads/documents/policies/01_Strategic_Plan_2018-2023.pdf",
    fileSize: "2.1 MB",
    year: "2018-23",
  },
  {
    title: "Strategic Plan and Deployment (2023-24 To 2027-28)",
    summary: "Updated strategic plan for 2023-24 to 2027-28 period, encompassing institutional growth, academic innovations, research initiatives, and infrastructure development. Signed and approved by institutional leadership.",
    pdfUrl: "/uploads/documents/policies/02_Strategic_Plan_2023-2028.pdf",
    fileSize: "2.3 MB",
    year: "2023-28",
  },
  {
    title: "Curriculum Policy",
    summary: "Curriculum policy document detailing course design, learning outcomes, syllabus structure, and pedagogical approaches. Ensures alignment with national standards, industry requirements, and student-centric learning methodologies.",
    pdfUrl: "/uploads/documents/policies/03_Curriculum_Policy.pdf",
    fileSize: "1.8 MB",
    year: "2024",
  },
  {
    title: "Innovation Practices",
    summary: "Policy governing innovative teaching and learning practices at SSGMCE. Encourages faculty to implement new pedagogical methods, technology-enabled learning, and research-based innovations in the classroom.",
    pdfUrl: "/uploads/documents/policies/04_Innovation_Practices.pdf",
    fileSize: "1.6 MB",
    year: "2024",
  },
  {
    title: "Student Centric Policies",
    summary: "Framework ensuring student-centered education. Focuses on individual learning needs, student engagement, mentoring, co-curricular activities, and holistic development of students at SSGMCE.",
    pdfUrl: "/uploads/documents/policies/05_Student_Centric.pdf",
    fileSize: "1.4 MB",
    year: "2024",
  },
  {
    title: "Examination Policy",
    summary: "Comprehensive examination and evaluation policy outlining examination schedules, internal assessment procedures, external examination guidelines, and academic integrity standards for all academic programs.",
    pdfUrl: "/uploads/documents/policies/06_Exam_Policy.pdf",
    fileSize: "1.2 MB",
    year: "2024",
  },
  {
    title: "Mentor Policy",
    summary: "Mentoring policy establishing a framework for faculty mentors to guide and support students throughout their academic journey, addressing academic, personal, and professional development needs.",
    pdfUrl: "/uploads/documents/policies/07_Mentor_Policy.pdf",
    fileSize: "1.1 MB",
    year: "2024",
  },
  {
    title: "Slow & Advanced Learner Policy",
    summary: "Support policy designed to cater to students with diverse learning capabilities. Provides additional resources, tutoring, and alternative learning pathways for slow learners while challenging advanced learners.",
    pdfUrl: "/uploads/documents/policies/08_Slow_Advanced_Learner_Policy.pdf",
    fileSize: "1.3 MB",
    year: "2024",
  },
  {
    title: "IQAC Policy",
    summary: "Internal Quality Assurance Cell (IQAC) policy establishing mechanisms for continuous quality improvement, institutional assessment, and academic excellence at SSGMCE.",
    pdfUrl: "/uploads/documents/policies/09_IQAC_Policy.pdf",
    fileSize: "1.5 MB",
    year: "2024",
  },
  {
    title: "Assessment Accreditation and Assurance (AAA) Policy",
    summary: "Framework for continuous assessment, accreditation standards compliance, and quality assurance across all academic and administrative functions of the institution.",
    pdfUrl: "/uploads/documents/policies/10_AAA_Policy.pdf",
    fileSize: "1.4 MB",
    year: "2024",
  },
  {
    title: "Budget Policy",
    summary: "Financial management and budgeting policy governing fund allocation, expenditure control, resource optimization, and financial accountability across all departments and units.",
    pdfUrl: "/uploads/documents/policies/11_Budget_Policy.pdf",
    fileSize: "1.2 MB",
    year: "2024",
  },
  {
    title: "Anti-Ragging Policy",
    summary: "SSGMCE maintains a strict anti-ragging policy in compliance with UGC regulations and Maharashtra Prohibition of Ragging Act. Establishes zero-tolerance approach, complaint mechanisms, and disciplinary actions.",
    pdfUrl: "/uploads/documents/policies/12_Anti_Ragging_Policy.pdf",
    fileSize: "1.0 MB",
    year: "2024",
  },
  {
    title: "Anti-Sexual Harassment Policy",
    summary: "Policy ensuring safe and respectful workplace and campus environment. Addresses sexual harassment complaints, establishes internal committees, defines prohibited conduct, and provides remedial measures.",
    pdfUrl: "/uploads/documents/policies/13_Anti_Sexual_Harassment_Policy.pdf",
    fileSize: "0.9 MB",
    year: "2024",
  },
  {
    title: "Gender Equity Policy",
    summary: "Comprehensive policy promoting gender equality, women empowerment, and inclusive campus culture. Addresses safety, representation, career development, and support for all genders.",
    pdfUrl: "/uploads/documents/policies/14_Gender_Equity_Policy.pdf",
    fileSize: "1.1 MB",
    year: "2024",
  },
  {
    title: "Grievance Redressal Policy",
    summary: "Framework for addressing student, faculty, and staff grievances. Establishes formal procedures, grievance cells, timelines for resolution, and appeal mechanisms for fair and transparent grievance handling.",
    pdfUrl: "/uploads/documents/policies/15_Grievance_Redressal_Policy.pdf",
    fileSize: "1.3 MB",
    year: "2024",
  },
  {
    title: "Maintenance Policy",
    summary: "Infrastructure and facilities maintenance policy ensuring proper upkeep of buildings, equipment, utilities, and grounds. Defines maintenance schedules, responsibilities, and resource allocation.",
    pdfUrl: "/uploads/documents/policies/16_Maintenance_Policy.pdf",
    fileSize: "1.0 MB",
    year: "2024",
  },
  {
    title: "Scholarship Policy",
    summary: "Policy governing merit-based, need-based, and special scholarship schemes. Details eligibility criteria, application procedures, disbursal mechanisms, and accountability for scholarship funds.",
    pdfUrl: "/uploads/documents/policies/17_Scholarship_Policy.pdf",
    fileSize: "1.4 MB",
    year: "2024",
  },
  {
    title: "Staff Welfare Policy",
    summary: "Comprehensive welfare policy covering faculty and staff benefits, leave provisions, health insurance, professional development, and employee wellbeing initiatives at SSGMCE.",
    pdfUrl: "/uploads/documents/policies/18_Staff_Welfare_Policy.pdf",
    fileSize: "1.2 MB",
    year: "2024",
  },
  {
    title: "Financial Assistance Policy",
    summary: "Policy establishing financial aid mechanisms for students facing economic hardship. Covers refund policies, installment options, emergency financial support, and loan assistance programs.",
    pdfUrl: "/uploads/documents/policies/19_Financial_Assistance_Policy.pdf",
    fileSize: "1.1 MB",
    year: "2024",
  },
  {
    title: "Performance Appraisal Policy",
    summary: "Systematic policy for evaluating faculty and staff performance. Defines appraisal criteria, evaluation processes, feedback mechanisms, and performance-linked incentives.",
    pdfUrl: "/uploads/documents/policies/20_Performance_Appraisal.pdf",
    fileSize: "1.0 MB",
    year: "2024",
  },
  {
    title: "Information & Communication Technology (ICT) Policy",
    summary: "Policy governing IT infrastructure, cybersecurity, data protection, acceptable use of technology, and digital transformation initiatives across the institution.",
    pdfUrl: "/uploads/documents/policies/21_ICT_Policy.pdf",
    fileSize: "1.5 MB",
    year: "2024",
  },
  {
    title: "Green Campus Policy",
    summary: "Environmental sustainability policy promoting greenery, biodiversity, waste management, energy efficiency, and sustainable practices on campus to create an eco-friendly institution.",
    pdfUrl: "/uploads/documents/policies/22_Green_Campus_Policy.pdf",
    fileSize: "1.3 MB",
    year: "2024",
  },
  {
    title: "Energy Conservation Policy",
    summary: "Policy focused on reducing energy consumption, promoting renewable energy use, and implementing energy-efficient practices across all institutional facilities.",
    pdfUrl: "/uploads/documents/policies/23_Energy_Conservation.pdf",
    fileSize: "0.8 MB",
    year: "2024",
  },
  {
    title: "Environment Policy",
    summary: "Comprehensive environmental policy addressing pollution control, waste management, water conservation, air quality, and environmental compliance across the institution.",
    pdfUrl: "/uploads/documents/policies/24_Environment_Policy.pdf",
    fileSize: "1.2 MB",
    year: "2024",
  },
  {
    title: "Code of Conduct",
    summary: "Establishes behavioral expectations, academic integrity standards, and disciplinary guidelines for all students. Covers attendance, examinations, library usage, hostel regulations, and consequences for violations.",
    pdfUrl: "/uploads/documents/policies/25_Code_of_Conduct.pdf",
    fileSize: "1.0 MB",
    year: "2024",
  },
  {
    title: "Rules and Regulations",
    summary: "Comprehensive documentation of all institutional rules, academic regulations, administrative procedures, and operational guidelines governing student life and academic programs at SSGMCE.",
    pdfUrl: "/uploads/documents/policies/26_Rules_and_Regulations.pdf",
    fileSize: "1.8 MB",
    year: "2024",
  },
];

const Policies = () => {
  return (
    <EnhancedDocumentsLayout
      pageTitle="Policies & Procedures"
      subtitle="Institute Rules, Regulations & Guidelines"
      category="policies"
      description="Official policies and procedures governing the academic, administrative, and operational activities at SSGMCE, Shegaon. These documents outline the institution's commitment to quality education, student welfare, environmental sustainability, and regulatory compliance."
      staticDocuments={policyDocuments}
      showGrid={false}
    />
  );
};

export default Policies;
