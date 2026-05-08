import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./contexts/ThemeContext";

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Admissions = lazy(() => import("./pages/Admissions"));
const Faculty = lazy(() => import("./pages/Faculty"));
const Placements = lazy(() => import("./pages/Placements"));
const Research = lazy(() => import("./pages/Research"));
const Facilities = lazy(() => import("./pages/Facilities"));
const News = lazy(() => import("./pages/News"));
const Events = lazy(() => import("./pages/Events"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NIRFRanking = lazy(() => import("./pages/NIRFRanking"));
const FacultyDetail = lazy(() => import("./pages/FacultyDetail"));

const AtGlance = lazy(() => import("./pages/about/AtGlance"));
const BoardOfDirectors = lazy(() => import("./pages/about/BoardOfDirectors"));
const Committees = lazy(() => import("./pages/about/Committees"));
const GoverningBody = lazy(() => import("./pages/about/GoverningBody"));
const Inspiration = lazy(() => import("./pages/about/Inspiration"));
const Organization = lazy(() => import("./pages/about/Organization"));
const PrincipalMsg = lazy(() => import("./pages/about/PrincipalMsg"));
const VisionMission = lazy(() => import("./pages/about/VisionMission"));

const AcademicPlanner = lazy(() => import("./pages/academics/AcademicPlanner"));
const AnnualReports = lazy(() => import("./pages/academics/AnnualReports"));
const IncentiveMarks = lazy(() => import("./pages/academics/IncentiveMarks"));
const InnovativePractices = lazy(
  () => import("./pages/academics/InnovativePractices"),
);
const Rubrics = lazy(() => import("./pages/academics/Rubrics"));
const RulesRegulations = lazy(
  () => import("./pages/academics/RulesRegulations"),
);
const SessionalMarks = lazy(() => import("./pages/academics/SessionalMarks"));
const StudentNotices = lazy(() => import("./pages/academics/StudentNotices"));
const Syllabus = lazy(() => import("./pages/academics/Syllabus"));
const TeachingLearning = lazy(
  () => import("./pages/academics/TeachingLearning"),
);
const TimeTable = lazy(() => import("./pages/academics/TimeTable"));

const ACM = lazy(() => import("./pages/activities/ACM"));
const CSESA = lazy(() => import("./pages/activities/CSESA"));
const Cultural = lazy(() => import("./pages/activities/Cultural"));
const DroneClub = lazy(() => import("./pages/activities/DroneClub"));
const ECell = lazy(() => import("./pages/activities/ECell"));
const ESSA = lazy(() => import("./pages/activities/ESSA"));
const GDG = lazy(() => import("./pages/activities/GDG"));
const IEEE = lazy(() => import("./pages/activities/IEEE"));
const IEIElpo = lazy(() => import("./pages/activities/IEIElpo"));
const IEIMech = lazy(() => import("./pages/activities/IEIMech"));
const Innovo = lazy(() => import("./pages/activities/Innovo"));
const ISTE = lazy(() => import("./pages/activities/ISTE"));
const ITSA = lazy(() => import("./pages/activities/ITSA"));
const MESA = lazy(() => import("./pages/activities/MESA"));
const Mozilla = lazy(() => import("./pages/activities/Mozilla"));
const NSS = lazy(() => import("./pages/activities/NSS"));
const Parishkriti = lazy(() => import("./pages/activities/Parishkriti"));
const Pursuit = lazy(() => import("./pages/activities/Pursuit"));
const SAE = lazy(() => import("./pages/activities/SAE"));
const SocialMedia = lazy(() => import("./pages/activities/SocialMedia"));
const UBA = lazy(() => import("./pages/activities/UBA"));
const Xtreme = lazy(() => import("./pages/activities/Xtreme"));

const AdmissionProcess = lazy(
  () => import("./pages/admissions/AdmissionProcess"),
);
const AdmissionsFAQs = lazy(() => import("./pages/admissions/AdmissionsFAQs"));
const ContactAdminOffice = lazy(
  () => import("./pages/admissions/ContactAdminOffice"),
);
const DocumentsRequired = lazy(
  () => import("./pages/admissions/DocumentsRequired"),
);
const DSEAdmissions = lazy(() => import("./pages/admissions/DSEAdmissions"));
const FeeStructure = lazy(() => import("./pages/admissions/FeeStructure"));
const InstituteBrochure = lazy(
  () => import("./pages/admissions/InstituteBrochure"),
);
const MBAAdmissions = lazy(() => import("./pages/admissions/MBAAdmissions"));
const PGAdmissions = lazy(() => import("./pages/admissions/PGAdmissions"));
const PhDAdmissions = lazy(() => import("./pages/admissions/PhDAdmissions"));
const Scholarships = lazy(() => import("./pages/admissions/Scholarships"));
const SeatMatrix = lazy(() => import("./pages/admissions/SeatMatrix"));
const UGAdmissions = lazy(() => import("./pages/admissions/UGAdmissions"));

const AppliedSciences = lazy(
  () => import("./pages/departments/AppliedSciences"),
);
const CSE = lazy(() => import("./pages/departments/CSE"));
const Electrical = lazy(() => import("./pages/departments/Electrical"));
const EnTC = lazy(() => import("./pages/departments/EnTC"));
const IT = lazy(() => import("./pages/departments/IT"));
const MBA = lazy(() => import("./pages/departments/MBA"));
const Mechanical = lazy(() => import("./pages/departments/Mechanical"));

const AICTE = lazy(() => import("./pages/documents/AICTE"));
const Audit = lazy(() => import("./pages/documents/Audit"));
const Financial = lazy(() => import("./pages/documents/Financial"));
const ISO = lazy(() => import("./pages/documents/ISO"));
const MandatoryDisclosure = lazy(
  () => import("./pages/documents/MandatoryDisclosure"),
);
const NAAC = lazy(() => import("./pages/documents/NAAC"));
const NBA = lazy(() => import("./pages/documents/NBA"));
const Newsletter = lazy(() => import("./pages/documents/Newsletter"));
const NIRF = lazy(() => import("./pages/documents/NIRF"));
const StudentForms = lazy(() => import("./pages/documents/StudentForms"));
const Policies = lazy(() => import("./pages/documents/Policies"));
const Tattwadarshi = lazy(() => import("./pages/documents/Tattwadarshi"));

const AdministrativeOffice = lazy(
  () => import("./pages/facilities/AdministrativeOffice"),
);
const CentralLibrary = lazy(() => import("./pages/facilities/CentralLibrary"));
const ComputingFacility = lazy(
  () => import("./pages/facilities/ComputingFacility"),
);
const Hostels = lazy(() => import("./pages/facilities/Hostels"));
const OtherFacilities = lazy(
  () => import("./pages/facilities/OtherFacilities"),
);
const Sports = lazy(() => import("./pages/facilities/Sports"));
const FacilitiesContentRouter = lazy(
  () => import("./pages/facilities/FacilitiesContentRouter"),
);
const AICTELetters = lazy(
  () => import("./pages/facilities/hostel/AICTELetters"),
);
const AntiRaggingCommittee = lazy(
  () => import("./pages/facilities/hostel/AntiRaggingCommittee"),
);
const AntiRaggingNotices = lazy(
  () => import("./pages/facilities/hostel/AntiRaggingNotices"),
);
const AntiRaggingPosters = lazy(
  () => import("./pages/facilities/hostel/AntiRaggingPosters"),
);
const AntiRaggingReports = lazy(
  () => import("./pages/facilities/hostel/AntiRaggingReports"),
);
const HostelAccommodation = lazy(
  () => import("./pages/facilities/hostel/HostelAccommodation"),
);
const HostelAdmissionForm = lazy(
  () => import("./pages/facilities/hostel/HostelAdmissionForm"),
);
const HostelBrochure = lazy(
  () => import("./pages/facilities/hostel/HostelBrochure"),
);
const HostelCommittee = lazy(
  () => import("./pages/facilities/hostel/HostelCommittee"),
);
const HostelFeeStructure = lazy(
  () => import("./pages/facilities/hostel/HostelFeeStructure"),
);
const HostelFeedback = lazy(
  () => import("./pages/facilities/hostel/HostelFeedback"),
);
const HostelPolicy = lazy(
  () => import("./pages/facilities/hostel/HostelPolicy"),
);
const MinutesOfMeeting = lazy(
  () => import("./pages/facilities/hostel/MinutesOfMeeting"),
);
const AboutLibrary = lazy(
  () => import("./pages/facilities/library/AboutLibrary"),
);
const BookDetails = lazy(
  () => import("./pages/facilities/library/BookDetails"),
);
const Coursera = lazy(() => import("./pages/facilities/library/Coursera"));
const LibraryFacilities = lazy(
  () => import("./pages/facilities/library/LibraryFacilities"),
);
const LibraryRules = lazy(
  () => import("./pages/facilities/library/LibraryRules"),
);
const LibraryServices = lazy(
  () => import("./pages/facilities/library/LibraryServices"),
);
const LibraryStaff = lazy(
  () => import("./pages/facilities/library/LibraryStaff"),
);
const NPTEL = lazy(() => import("./pages/facilities/library/NPTEL"));
const NPTELFacultyAchievers = lazy(
  () => import("./pages/facilities/library/NPTELFacultyAchievers"),
);
const NPTELStudentAchievers = lazy(
  () => import("./pages/facilities/library/NPTELStudentAchievers"),
);
const WorkingHours = lazy(
  () => import("./pages/facilities/library/WorkingHours"),
);
const AboutSportDepartment = lazy(
  () => import("./pages/facilities/sports/AboutSportDepartment"),
);
const IndoorSportFacility = lazy(
  () => import("./pages/facilities/sports/IndoorSportFacility"),
);
const OutdoorSportFacility = lazy(
  () => import("./pages/facilities/sports/OutdoorSportFacility"),
);
const SportStaff = lazy(() => import("./pages/facilities/sports/SportStaff"));
const SportStatistics = lazy(
  () => import("./pages/facilities/sports/SportStatistics"),
);
const SportsAchievements = lazy(
  () => import("./pages/facilities/sports/SportsAchievements"),
);
const SportsCouncil = lazy(
  () => import("./pages/facilities/sports/SportsCouncil"),
);

// Other Facilities pages
const Transportation = lazy(
  () => import("./pages/facilities/other/Transportation"),
);
const MedicalCenter = lazy(
  () => import("./pages/facilities/other/MedicalCenter"),
);
const DiningCafeteria = lazy(
  () => import("./pages/facilities/other/DiningCafeteria"),
);
const OtherServices = lazy(
  () => import("./pages/facilities/other/OtherServices"),
);

// Computing Facility pages
const ComputerLabs = lazy(
  () => import("./pages/facilities/computing/ComputerLabs"),
);
const SoftwareTools = lazy(
  () => import("./pages/facilities/computing/SoftwareTools"),
);
const NetworkInfrastructure = lazy(
  () => import("./pages/facilities/computing/NetworkInfrastructure"),
);
const SupportPolicies = lazy(
  () => import("./pages/facilities/computing/SupportPolicies"),
);

// Admin Office pages
const AdminOfficeServicesCollege = lazy(
  () => import("./pages/facilities/admin-office/ServicesCollege"),
);
const AdminOfficeServicesUniversity = lazy(
  () => import("./pages/facilities/admin-office/ServicesUniversity"),
);
const AdminOfficeBrochure = lazy(
  () => import("./pages/facilities/admin-office/InformationBrochure"),
);
const AdminOfficeFeeProposal = lazy(
  () => import("./pages/facilities/admin-office/FeeProposal"),
);
// Admin Office - Index Pages
const PoliciesIndex = lazy(
  () => import("./pages/facilities/admin-office/policies/PoliciesIndex"),
);
const MandatoryDisclosureIndex = lazy(
  () => import("./pages/facilities/admin-office/mandatory-disclosure/MandatoryDisclosureIndex"),
);
const AICTEApprovalsIndex = lazy(
  () => import("./pages/facilities/admin-office/aicte-approvals/AICTEApprovalsIndex"),
);
const FinancialStatementsIndex = lazy(
  () => import("./pages/facilities/admin-office/financial-statements/FinancialStatementsIndex"),
);
// Admin Office - Policies
const PolicyStrategicPlan = lazy(
  () => import("./pages/facilities/admin-office/policies/StrategicPlan"),
);
const PolicyCurriculum = lazy(
  () => import("./pages/facilities/admin-office/policies/CurriculumPolicy"),
);
const PolicyInnovation = lazy(
  () => import("./pages/facilities/admin-office/policies/InnovationPractices"),
);
const PolicyStudentCentric = lazy(
  () => import("./pages/facilities/admin-office/policies/StudentCentric"),
);
const PolicyExamination = lazy(
  () => import("./pages/facilities/admin-office/policies/ExaminationPolicy"),
);
const PolicyMentor = lazy(
  () => import("./pages/facilities/admin-office/policies/MentorPolicy"),
);
const PolicySlowAdvancedLearner = lazy(
  () => import("./pages/facilities/admin-office/policies/SlowAdvancedLearner"),
);
const PolicyIQAC = lazy(
  () => import("./pages/facilities/admin-office/policies/IQACPolicy"),
);
const PolicyAAA = lazy(
  () => import("./pages/facilities/admin-office/policies/AAAPolicy"),
);
const PolicyBudget = lazy(
  () => import("./pages/facilities/admin-office/policies/BudgetPolicy"),
);
const PolicyAntiRagging = lazy(
  () => import("./pages/facilities/admin-office/policies/AntiRaggingPolicy"),
);
const PolicyAntiSexualHarassment = lazy(
  () => import("./pages/facilities/admin-office/policies/AntiSexualHarassmentPolicy"),
);
const PolicyGenderEquity = lazy(
  () => import("./pages/facilities/admin-office/policies/GenderEquityPolicy"),
);
const PolicyGrievanceRedressal = lazy(
  () => import("./pages/facilities/admin-office/policies/GrievanceRedressalPolicy"),
);
const PolicyMaintenance = lazy(
  () => import("./pages/facilities/admin-office/policies/MaintenancePolicy"),
);
const PolicyScholarship = lazy(
  () => import("./pages/facilities/admin-office/policies/ScholarshipPolicy"),
);
const PolicyStaffWelfare = lazy(
  () => import("./pages/facilities/admin-office/policies/StaffWelfarePolicy"),
);
const PolicyFinancialAssistance = lazy(
  () => import("./pages/facilities/admin-office/policies/FinancialAssistancePolicy"),
);
const PolicyPerformanceAppraisal = lazy(
  () => import("./pages/facilities/admin-office/policies/PerformanceAppraisal"),
);
const PolicyICT = lazy(
  () => import("./pages/facilities/admin-office/policies/ICTPolicy"),
);
const PolicyGreenCampus = lazy(
  () => import("./pages/facilities/admin-office/policies/GreenCampusPolicy"),
);
const PolicyEnergyConservation = lazy(
  () => import("./pages/facilities/admin-office/policies/EnergyConservation"),
);
const PolicyEnvironment = lazy(
  () => import("./pages/facilities/admin-office/policies/EnvironmentPolicy"),
);
const PolicyCodeOfConduct = lazy(
  () => import("./pages/facilities/admin-office/policies/CodeOfConduct"),
);
const PolicyRulesRegulations = lazy(
  () => import("./pages/facilities/admin-office/policies/RulesRegulations"),
);
// Admin Office - Mandatory Disclosure
const MandatoryDisclosure202526 = lazy(
  () => import("./pages/facilities/admin-office/mandatory-disclosure/MandatoryDisclosure202526"),
);
const MandatoryDisclosure202425 = lazy(
  () => import("./pages/facilities/admin-office/mandatory-disclosure/MandatoryDisclosure202425"),
);
const MandatoryDisclosure202324 = lazy(
  () => import("./pages/facilities/admin-office/mandatory-disclosure/MandatoryDisclosure202324"),
);
const MandatoryDisclosure202223 = lazy(
  () => import("./pages/facilities/admin-office/mandatory-disclosure/MandatoryDisclosure202223"),
);
const MandatoryDisclosure202122 = lazy(
  () => import("./pages/facilities/admin-office/mandatory-disclosure/MandatoryDisclosure202122"),
);
// Admin Office - AICTE Approvals
const AICTEEOAThreeYear202425 = lazy(
  () => import("./pages/facilities/admin-office/aicte-approvals/EOAThreeYear202425"),
);
const AICTEEOA202324 = lazy(
  () => import("./pages/facilities/admin-office/aicte-approvals/EOA202324"),
);
const AICTEApprovals19922022 = lazy(
  () => import("./pages/facilities/admin-office/aicte-approvals/AICTEApprovals19922022"),
);
const AICTEEOA20102021 = lazy(
  () => import("./pages/facilities/admin-office/aicte-approvals/EOA20102021"),
);
// Admin Office - Financial Statements
const FinancialStatement202425 = lazy(
  () => import("./pages/facilities/admin-office/financial-statements/FinancialStatement202425"),
);
const FinancialStatement202324 = lazy(
  () => import("./pages/facilities/admin-office/financial-statements/FinancialStatement202324"),
);
const FinancialStatement202223 = lazy(
  () => import("./pages/facilities/admin-office/financial-statements/FinancialStatement202223"),
);
const FinancialStatement202122 = lazy(
  () => import("./pages/facilities/admin-office/financial-statements/FinancialStatement202122"),
);
const FinancialStatement202021 = lazy(
  () => import("./pages/facilities/admin-office/financial-statements/FinancialStatement202021"),
);
const FinancialStatement201920 = lazy(
  () => import("./pages/facilities/admin-office/financial-statements/FinancialStatement201920"),
);
const FinancialStatement201819 = lazy(
  () => import("./pages/facilities/admin-office/financial-statements/FinancialStatement201819"),
);

const AQAR = lazy(() => import("./pages/iqac/AQAR"));
const BestPractices = lazy(() => import("./pages/iqac/BestPractices"));
const Composition = lazy(() => import("./pages/iqac/Composition"));
const Distinctiveness = lazy(() => import("./pages/iqac/Distinctiveness"));
const EContent = lazy(() => import("./pages/iqac/EContent"));
const EContentFacility = lazy(() => import("./pages/iqac/EContentFacility"));
const FeedbackAnalysis = lazy(() => import("./pages/iqac/FeedbackAnalysis"));
const FeedbackReport = lazy(() => import("./pages/iqac/FeedbackReport"));
const GenderEquity = lazy(() => import("./pages/iqac/GenderEquity"));
const GenderPlan = lazy(() => import("./pages/iqac/GenderPlan"));
const IQACVision = lazy(() => import("./pages/iqac/IQACVision"));
const Minutes = lazy(() => import("./pages/iqac/Minutes"));
const NAACSSR = lazy(() => import("./pages/iqac/NAACSSR"));
const StudentSurvey = lazy(() => import("./pages/iqac/StudentSurvey"));

const AboutTP = lazy(() => import("./pages/placements/AboutTP"));
const Activities = lazy(() => import("./pages/placements/Activities"));
const AlumniRegistration = lazy(
  () => import("./pages/placements/AlumniRegistration"),
);
const CareerGuidance = lazy(() => import("./pages/placements/CareerGuidance"));
const Coordinators = lazy(() => import("./pages/placements/Coordinators"));
const Goals = lazy(() => import("./pages/placements/Goals"));
const Internship = lazy(() => import("./pages/placements/Internship"));
const Objectives = lazy(() => import("./pages/placements/Objectives"));
const PlacementBrochure = lazy(
  () => import("./pages/placements/PlacementBrochure"),
);
const PlacementContact = lazy(
  () => import("./pages/placements/PlacementContact"),
);
const PlacementStats = lazy(() => import("./pages/placements/PlacementStats"));
const Recruiters = lazy(() => import("./pages/placements/Recruiters"));

const COE = lazy(() => import("./pages/research/COE"));
const Collaboration = lazy(() => import("./pages/research/Collaboration"));
const FundedProjects = lazy(() => import("./pages/research/FundedProjects"));
const IIC = lazy(() => import("./pages/research/IIC"));
const InnovationCell = lazy(() => import("./pages/research/InnovationCell"));
const IPR = lazy(() => import("./pages/research/IPR"));
const NISP = lazy(() => import("./pages/research/NISP"));
const PatentsIP = lazy(() => import("./pages/research/PatentsIP"));
const PhdCentre = lazy(() => import("./pages/research/PhdCentre"));
const Publications = lazy(() => import("./pages/research/Publications"));
const RDCell = lazy(() => import("./pages/research/RDCell"));
const ResearchOverview = lazy(
  () => import("./pages/research/ResearchOverview"),
);
const ResearchPolicy = lazy(() => import("./pages/research/ResearchPolicy"));
const Sabbatical = lazy(() => import("./pages/research/Sabbatical"));
const UGProjects = lazy(() => import("./pages/research/UGProjects"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminPages = lazy(() => import("./pages/admin/AdminPages"));
const AdminFaculty = lazy(() => import("./pages/admin/AdminFaculty"));
const AdminResearch = lazy(() => import("./pages/admin/AdminResearch"));
const AdminDepartments = lazy(() => import("./pages/admin/AdminDepartments"));
const AdminCoordinators = lazy(() => import("./pages/admin/AdminCoordinators"));
const AdminEditLogs = lazy(() => import("./pages/admin/AdminEditLogs"));
const AdminMenuManager = lazy(() => import("./pages/admin/AdminMenuManager"));
const AdminPopupBanner = lazy(() => import("./pages/admin/AdminPopupBanner"));
const VisualPageEditor = lazy(() => import("./pages/admin/VisualPageEditor"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminNews = lazy(() => import("./pages/admin/AdminNews"));
const AdminNotices = lazy(() => import("./pages/admin/AdminNotices"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AdminDocuments = lazy(() => import("./pages/admin/AdminDocuments"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminIQAC = lazy(() => import("./pages/admin/AdminIQAC"));
const AdminPlacements = lazy(() => import("./pages/admin/AdminPlacements"));
const AdminAcademics = lazy(() => import("./pages/admin/AdminAcademics"));
const AdminRecruiters = lazy(() => import("./pages/admin/AdminRecruiters"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminNIRF = lazy(() => import("./pages/admin/AdminNIRF"));

// ─── Page loading fallback ────────────────────────────────────────────────────
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
      <Router
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Admin Login - Public Route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin Routes - Protected (require authentication) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/pages"
                element={
                  <ProtectedRoute>
                    <AdminPages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/pages/editor/:pageId"
                element={
                  <ProtectedRoute>
                    <VisualPageEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/visual/:pageId"
                element={
                  <ProtectedRoute>
                    <VisualPageEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/faculty"
                element={
                  <ProtectedRoute>
                    <AdminFaculty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/research"
                element={
                  <ProtectedRoute>
                    <AdminResearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/departments"
                element={
                  <ProtectedRoute>
                    <AdminDepartments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/coordinators"
                element={
                  <ProtectedRoute>
                    <AdminCoordinators />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/logs"
                element={
                  <ProtectedRoute>
                    <AdminEditLogs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/activity-log"
                element={
                  <ProtectedRoute>
                    <AdminEditLogs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/menu"
                element={
                  <ProtectedRoute>
                    <AdminMenuManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/menu-manager"
                element={
                  <ProtectedRoute>
                    <AdminMenuManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/popup-banner"
                element={
                  <ProtectedRoute>
                    <AdminPopupBanner />
                  </ProtectedRoute>
                }
              />
              {/* Content Management Routes */}
              <Route
                path="/admin/news"
                element={
                  <ProtectedRoute>
                    <AdminNews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/notices"
                element={
                  <ProtectedRoute>
                    <AdminNotices />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/events"
                element={
                  <ProtectedRoute>
                    <AdminEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/documents"
                element={
                  <ProtectedRoute>
                    <AdminDocuments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/iqac"
                element={
                  <ProtectedRoute>
                    <AdminIQAC />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/placements"
                element={
                  <ProtectedRoute>
                    <AdminPlacements />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/academics"
                element={
                  <ProtectedRoute>
                    <AdminAcademics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/recruiters"
                element={
                  <ProtectedRoute>
                    <AdminRecruiters />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/testimonials"
                element={
                  <ProtectedRoute>
                    <AdminTestimonials />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/nirf"
                element={
                  <ProtectedRoute>
                    <AdminNIRF />
                  </ProtectedRoute>
                }
              />
              {/* System Routes */}
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute>
                    <AdminAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />

              {/* Public Website Routes - With Layout (includes navbar & header) */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/about"
                element={
                  <Layout>
                    <About />
                  </Layout>
                }
              />
              <Route
                path="/departments"
                element={
                  <Layout>
                    <Navigate to="/departments/applied-sciences" replace />
                  </Layout>
                }
              />
              <Route
                path="/admissions"
                element={
                  <Layout>
                    <Admissions />
                  </Layout>
                }
              />
              <Route
                path="/faculty"
                element={
                  <Layout>
                    <Faculty />
                  </Layout>
                }
              />
              <Route
                path="/faculty/:facultyId"
                element={
                  <Layout>
                    <FacultyDetail />
                  </Layout>
                }
              />
              <Route
                path="/placements"
                element={
                  <Layout>
                    <Placements />
                  </Layout>
                }
              />
              <Route
                path="/nirf"
                element={
                  <Layout>
                    <NIRFRanking />
                  </Layout>
                }
              />
              <Route
                path="/research"
                element={
                  <Layout>
                    <Research />
                  </Layout>
                }
              />
              <Route
                path="/news"
                element={
                  <Layout>
                    <News />
                  </Layout>
                }
              />
              <Route
                path="/events"
                element={
                  <Layout>
                    <Events />
                  </Layout>
                }
              />
              <Route
                path="/facilities"
                element={
                  <Layout>
                    <Facilities />
                  </Layout>
                }
              />
              <Route
                path="/gallery"
                element={
                  <Layout>
                    <Gallery />
                  </Layout>
                }
              />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <Contact />
                  </Layout>
                }
              />
              <Route
                path="/about/glance"
                element={
                  <Layout>
                    <AtGlance />
                  </Layout>
                }
              />
              <Route
                path="/about/directors"
                element={
                  <Layout>
                    <BoardOfDirectors />
                  </Layout>
                }
              />
              <Route
                path="/about/committees"
                element={
                  <Layout>
                    <Committees />
                  </Layout>
                }
              />
              <Route
                path="/about/governing"
                element={
                  <Layout>
                    <GoverningBody />
                  </Layout>
                }
              />
              <Route
                path="/about/inspiration"
                element={
                  <Layout>
                    <Inspiration />
                  </Layout>
                }
              />
              <Route
                path="/about/structure"
                element={
                  <Layout>
                    <Organization />
                  </Layout>
                }
              />
              <Route
                path="/about/principal"
                element={
                  <Layout>
                    <PrincipalMsg />
                  </Layout>
                }
              />
              <Route
                path="/about/vision"
                element={
                  <Layout>
                    <VisionMission />
                  </Layout>
                }
              />
              <Route
                path="/academics/planner"
                element={
                  <Layout>
                    <AcademicPlanner />
                  </Layout>
                }
              />
              <Route
                path="/academics/reports"
                element={
                  <Layout>
                    <AnnualReports />
                  </Layout>
                }
              />
              <Route
                path="/academics/incentive"
                element={
                  <Layout>
                    <IncentiveMarks />
                  </Layout>
                }
              />
              <Route
                path="/academics/innovative"
                element={
                  <Layout>
                    <InnovativePractices />
                  </Layout>
                }
              />
              <Route
                path="/academics/rubrics"
                element={
                  <Layout>
                    <Rubrics />
                  </Layout>
                }
              />
              <Route
                path="/academics/rules"
                element={
                  <Layout>
                    <RulesRegulations />
                  </Layout>
                }
              />
              <Route
                path="/academics/marks"
                element={
                  <Layout>
                    <SessionalMarks />
                  </Layout>
                }
              />
              <Route
                path="/academics/notices"
                element={
                  <Layout>
                    <StudentNotices />
                  </Layout>
                }
              />
              <Route
                path="/academics/syllabus"
                element={
                  <Layout>
                    <Syllabus />
                  </Layout>
                }
              />
              <Route
                path="/academics/teaching"
                element={
                  <Layout>
                    <TeachingLearning />
                  </Layout>
                }
              />
              <Route
                path="/academics/timetable"
                element={
                  <Layout>
                    <TimeTable />
                  </Layout>
                }
              />
              <Route
                path="/activities/acm"
                element={
                  <Layout>
                    <ACM />
                  </Layout>
                }
              />
              <Route
                path="/activities/cultural"
                element={
                  <Layout>
                    <Cultural />
                  </Layout>
                }
              />
              <Route
                path="/activities/drone"
                element={
                  <Layout>
                    <DroneClub />
                  </Layout>
                }
              />
              <Route
                path="/activities/ecell"
                element={
                  <Layout>
                    <ECell />
                  </Layout>
                }
              />
              <Route
                path="/activities/essa"
                element={
                  <Layout>
                    <ESSA />
                  </Layout>
                }
              />
              <Route
                path="/activities/gdg"
                element={
                  <Layout>
                    <GDG />
                  </Layout>
                }
              />
              <Route
                path="/activities/ieee"
                element={
                  <Layout>
                    <IEEE />
                  </Layout>
                }
              />
              <Route
                path="/activities/iei-elpo"
                element={
                  <Layout>
                    <IEIElpo />
                  </Layout>
                }
              />
              <Route
                path="/activities/iei-mech"
                element={
                  <Layout>
                    <IEIMech />
                  </Layout>
                }
              />
              <Route
                path="/activities/innovo"
                element={
                  <Layout>
                    <Innovo />
                  </Layout>
                }
              />
              <Route
                path="/activities/iste"
                element={
                  <Layout>
                    <ISTE />
                  </Layout>
                }
              />
              <Route
                path="/activities/mesa"
                element={
                  <Layout>
                    <MESA />
                  </Layout>
                }
              />
              <Route
                path="/activities/parishkriti"
                element={
                  <Layout>
                    <Parishkriti />
                  </Layout>
                }
              />
              <Route
                path="/activities/pursuit"
                element={
                  <Layout>
                    <Pursuit />
                  </Layout>
                }
              />
              <Route
                path="/activities/sae"
                element={
                  <Layout>
                    <SAE />
                  </Layout>
                }
              />
              <Route
                path="/activities/social"
                element={
                  <Layout>
                    <SocialMedia />
                  </Layout>
                }
              />
              <Route
                path="/activities/xtreme"
                element={
                  <Layout>
                    <Xtreme />
                  </Layout>
                }
              />
              <Route
                path="/activities/csesa"
                element={
                  <Layout>
                    <CSESA />
                  </Layout>
                }
              />
              <Route
                path="/activities/itsa"
                element={
                  <Layout>
                    <ITSA />
                  </Layout>
                }
              />
              <Route
                path="/activities/mozilla"
                element={
                  <Layout>
                    <Mozilla />
                  </Layout>
                }
              />
              <Route
                path="/activities/nss"
                element={
                  <Layout>
                    <NSS />
                  </Layout>
                }
              />
              <Route
                path="/activities/uba"
                element={
                  <Layout>
                    <UBA />
                  </Layout>
                }
              />
              <Route
                path="/admissions/dse"
                element={
                  <Layout>
                    <DSEAdmissions />
                  </Layout>
                }
              />
              <Route
                path="/admissions/fees"
                element={
                  <Layout>
                    <FeeStructure />
                  </Layout>
                }
              />
              <Route
                path="/admissions/brochure"
                element={
                  <Layout>
                    <InstituteBrochure />
                  </Layout>
                }
              />
              <Route
                path="/admissions/mba"
                element={
                  <Layout>
                    <MBAAdmissions />
                  </Layout>
                }
              />
              <Route
                path="/admissions/pg"
                element={
                  <Layout>
                    <PGAdmissions />
                  </Layout>
                }
              />
              <Route
                path="/admissions/phd"
                element={
                  <Layout>
                    <PhDAdmissions />
                  </Layout>
                }
              />
              <Route
                path="/admissions/ug"
                element={
                  <Layout>
                    <UGAdmissions />
                  </Layout>
                }
              />
              <Route
                path="/admissions/process"
                element={
                  <Layout>
                    <AdmissionProcess />
                  </Layout>
                }
              />
              <Route
                path="/admissions/faqs"
                element={
                  <Layout>
                    <AdmissionsFAQs />
                  </Layout>
                }
              />
              <Route
                path="/admissions/contact"
                element={
                  <Layout>
                    <ContactAdminOffice />
                  </Layout>
                }
              />
              <Route
                path="/admissions/documents"
                element={
                  <Layout>
                    <DocumentsRequired />
                  </Layout>
                }
              />
              <Route
                path="/admissions/scholarships"
                element={
                  <Layout>
                    <Scholarships />
                  </Layout>
                }
              />
              <Route
                path="/admissions/seat-matrix"
                element={
                  <Layout>
                    <SeatMatrix />
                  </Layout>
                }
              />

              <Route
                path="/departments/applied-sciences"
                element={
                  <Layout>
                    <AppliedSciences />
                  </Layout>
                }
              />
              <Route
                path="/departments/cse"
                element={
                  <Layout>
                    <CSE />
                  </Layout>
                }
              />
              <Route
                path="/departments/electrical"
                element={
                  <Layout>
                    <Electrical />
                  </Layout>
                }
              />
              <Route
                path="/departments/entc"
                element={
                  <Layout>
                    <EnTC />
                  </Layout>
                }
              />
              <Route
                path="/departments/it"
                element={
                  <Layout>
                    <IT />
                  </Layout>
                }
              />
              <Route
                path="/departments/mba"
                element={
                  <Layout>
                    <MBA />
                  </Layout>
                }
              />
              <Route
                path="/departments/mechanical"
                element={
                  <Layout>
                    <Mechanical />
                  </Layout>
                }
              />
              <Route
                path="/documents/aicte"
                element={
                  <Layout>
                    <AICTE />
                  </Layout>
                }
              />
              <Route
                path="/documents/audit"
                element={
                  <Layout>
                    <Audit />
                  </Layout>
                }
              />
              <Route
                path="/documents/financial"
                element={
                  <Layout>
                    <Financial />
                  </Layout>
                }
              />
              <Route
                path="/documents/iso"
                element={
                  <Layout>
                    <ISO />
                  </Layout>
                }
              />
              <Route
                path="/documents/disclosure"
                element={
                  <Layout>
                    <MandatoryDisclosure />
                  </Layout>
                }
              />
              <Route
                path="/documents/naac"
                element={
                  <Layout>
                    <NAAC />
                  </Layout>
                }
              />
              <Route
                path="/documents/nba"
                element={
                  <Layout>
                    <NBA />
                  </Layout>
                }
              />
              <Route
                path="/documents/newsletter"
                element={
                  <Layout>
                    <Newsletter />
                  </Layout>
                }
              />
              <Route
                path="/documents/nirf"
                element={
                  <Layout>
                    <NIRF />
                  </Layout>
                }
              />
              <Route
                path="/documents/student-forms"
                element={
                  <Layout>
                    <StudentForms />
                  </Layout>
                }
              />
              <Route
                path="/documents/policies"
                element={
                  <Layout>
                    <Policies />
                  </Layout>
                }
              />
              <Route
                path="/documents/tattwadarshi"
                element={
                  <Layout>
                    <Tattwadarshi />
                  </Layout>
                }
              />
              <Route
                path="/facilities/administrative-office"
                element={
                  <Layout>
                    <AdministrativeOffice />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin"
                element={
                  <Layout>
                    <AdministrativeOffice />
                  </Layout>
                }
              />
              <Route
                path="/facilities/*"
                element={
                  <Layout>
                    <FacilitiesContentRouter />
                  </Layout>
                }
              />

              {/* Admin Office Routes */}
              <Route
                path="/facilities/admin-office/services-college"
                element={
                  <Layout>
                    <AdminOfficeServicesCollege />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/services-university"
                element={
                  <Layout>
                    <AdminOfficeServicesUniversity />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/brochure"
                element={
                  <Layout>
                    <AdminOfficeBrochure />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/fee-proposal"
                element={
                  <Layout>
                    <AdminOfficeFeeProposal />
                  </Layout>
                }
              />
              {/* Admin Office - Index Pages */}
              <Route
                path="/facilities/admin-office/policies"
                element={
                  <Layout>
                    <PoliciesIndex />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/mandatory-disclosure"
                element={
                  <Layout>
                    <MandatoryDisclosureIndex />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/aicte-approvals"
                element={
                  <Layout>
                    <AICTEApprovalsIndex />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/financial-statements"
                element={
                  <Layout>
                    <FinancialStatementsIndex />
                  </Layout>
                }
              />
              {/* Admin Office - Policies */}
              <Route
                path="/facilities/admin-office/policies/strategic-plan"
                element={
                  <Layout>
                    <PolicyStrategicPlan />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/curriculum"
                element={
                  <Layout>
                    <PolicyCurriculum />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/innovation"
                element={
                  <Layout>
                    <PolicyInnovation />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/student-centric"
                element={
                  <Layout>
                    <PolicyStudentCentric />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/examination"
                element={
                  <Layout>
                    <PolicyExamination />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/mentor"
                element={
                  <Layout>
                    <PolicyMentor />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/slow-advanced-learner"
                element={
                  <Layout>
                    <PolicySlowAdvancedLearner />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/iqac"
                element={
                  <Layout>
                    <PolicyIQAC />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/aaa"
                element={
                  <Layout>
                    <PolicyAAA />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/budget"
                element={
                  <Layout>
                    <PolicyBudget />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/anti-ragging"
                element={
                  <Layout>
                    <PolicyAntiRagging />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/anti-sexual-harassment"
                element={
                  <Layout>
                    <PolicyAntiSexualHarassment />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/gender-equity"
                element={
                  <Layout>
                    <PolicyGenderEquity />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/grievance-redressal"
                element={
                  <Layout>
                    <PolicyGrievanceRedressal />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/maintenance"
                element={
                  <Layout>
                    <PolicyMaintenance />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/scholarship"
                element={
                  <Layout>
                    <PolicyScholarship />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/staff-welfare"
                element={
                  <Layout>
                    <PolicyStaffWelfare />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/financial-assistance"
                element={
                  <Layout>
                    <PolicyFinancialAssistance />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/performance-appraisal"
                element={
                  <Layout>
                    <PolicyPerformanceAppraisal />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/ict"
                element={
                  <Layout>
                    <PolicyICT />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/green-campus"
                element={
                  <Layout>
                    <PolicyGreenCampus />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/energy-conservation"
                element={
                  <Layout>
                    <PolicyEnergyConservation />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/environment"
                element={
                  <Layout>
                    <PolicyEnvironment />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/code-of-conduct"
                element={
                  <Layout>
                    <PolicyCodeOfConduct />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/policies/rules-regulations"
                element={
                  <Layout>
                    <PolicyRulesRegulations />
                  </Layout>
                }
              />
              {/* Admin Office - Mandatory Disclosure */}
              <Route
                path="/facilities/admin-office/mandatory-disclosure/2025-26"
                element={
                  <Layout>
                    <MandatoryDisclosure202526 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/mandatory-disclosure/2024-25"
                element={
                  <Layout>
                    <MandatoryDisclosure202425 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/mandatory-disclosure/2023-24"
                element={
                  <Layout>
                    <MandatoryDisclosure202324 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/mandatory-disclosure/2022-23"
                element={
                  <Layout>
                    <MandatoryDisclosure202223 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/mandatory-disclosure/2021-22"
                element={
                  <Layout>
                    <MandatoryDisclosure202122 />
                  </Layout>
                }
              />
              {/* Admin Office - AICTE Approvals */}
              <Route
                path="/facilities/admin-office/aicte-approvals/eoa-three-year-2024-25"
                element={
                  <Layout>
                    <AICTEEOAThreeYear202425 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/aicte-approvals/eoa-2023-24"
                element={
                  <Layout>
                    <AICTEEOA202324 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/aicte-approvals/approvals-1992-2022"
                element={
                  <Layout>
                    <AICTEApprovals19922022 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/aicte-approvals/eoa-2010-2021"
                element={
                  <Layout>
                    <AICTEEOA20102021 />
                  </Layout>
                }
              />
              {/* Admin Office - Financial Statements */}
              <Route
                path="/facilities/admin-office/financial-statements/2024-25"
                element={
                  <Layout>
                    <FinancialStatement202425 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/financial-statements/2023-24"
                element={
                  <Layout>
                    <FinancialStatement202324 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/financial-statements/2022-23"
                element={
                  <Layout>
                    <FinancialStatement202223 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/financial-statements/2021-22"
                element={
                  <Layout>
                    <FinancialStatement202122 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/financial-statements/2020-21"
                element={
                  <Layout>
                    <FinancialStatement202021 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/financial-statements/2019-20"
                element={
                  <Layout>
                    <FinancialStatement201920 />
                  </Layout>
                }
              />
              <Route
                path="/facilities/admin-office/financial-statements/2018-19"
                element={
                  <Layout>
                    <FinancialStatement201819 />
                  </Layout>
                }
              />

              <Route
                path="/iqac/aqar"
                element={
                  <Layout>
                    <AQAR />
                  </Layout>
                }
              />
              <Route
                path="/iqac/practices"
                element={
                  <Layout>
                    <BestPractices />
                  </Layout>
                }
              />
              <Route
                path="/iqac/composition"
                element={
                  <Layout>
                    <Composition />
                  </Layout>
                }
              />
              <Route
                path="/iqac/distinctiveness"
                element={
                  <Layout>
                    <Distinctiveness />
                  </Layout>
                }
              />
              <Route
                path="/iqac/econtent"
                element={
                  <Layout>
                    <EContent />
                  </Layout>
                }
              />
              <Route
                path="/iqac/econtent-facility"
                element={
                  <Layout>
                    <EContentFacility />
                  </Layout>
                }
              />
              <Route
                path="/iqac/analysis"
                element={
                  <Layout>
                    <FeedbackAnalysis />
                  </Layout>
                }
              />
              <Route
                path="/iqac/feedback"
                element={
                  <Layout>
                    <FeedbackReport />
                  </Layout>
                }
              />
              <Route
                path="/iqac/equity"
                element={
                  <Layout>
                    <GenderEquity />
                  </Layout>
                }
              />
              <Route
                path="/iqac/gender"
                element={
                  <Layout>
                    <GenderPlan />
                  </Layout>
                }
              />
              <Route
                path="/iqac/vision"
                element={
                  <Layout>
                    <IQACVision />
                  </Layout>
                }
              />
              <Route
                path="/iqac/minutes"
                element={
                  <Layout>
                    <Minutes />
                  </Layout>
                }
              />
              <Route
                path="/iqac/naac"
                element={
                  <Layout>
                    <NAACSSR />
                  </Layout>
                }
              />
              <Route
                path="/iqac/survey"
                element={
                  <Layout>
                    <StudentSurvey />
                  </Layout>
                }
              />
              <Route
                path="/placements/about"
                element={
                  <Layout>
                    <AboutTP />
                  </Layout>
                }
              />
              <Route
                path="/placements/activities"
                element={
                  <Layout>
                    <Activities />
                  </Layout>
                }
              />
              <Route
                path="/placements/alumni"
                element={
                  <Layout>
                    <AlumniRegistration />
                  </Layout>
                }
              />
              <Route
                path="/placements/career"
                element={
                  <Layout>
                    <CareerGuidance />
                  </Layout>
                }
              />
              <Route
                path="/placements/coordinators"
                element={
                  <Layout>
                    <Coordinators />
                  </Layout>
                }
              />
              <Route
                path="/placements/goals"
                element={
                  <Layout>
                    <Goals />
                  </Layout>
                }
              />
              <Route
                path="/placements/internship"
                element={
                  <Layout>
                    <Internship />
                  </Layout>
                }
              />
              <Route
                path="/placements/objectives"
                element={
                  <Layout>
                    <Objectives />
                  </Layout>
                }
              />
              <Route
                path="/placements/brochure"
                element={
                  <Layout>
                    <PlacementBrochure />
                  </Layout>
                }
              />
              <Route
                path="/placements/statistics"
                element={
                  <Layout>
                    <PlacementStats />
                  </Layout>
                }
              />
              <Route
                path="/placements/recruiters"
                element={
                  <Layout>
                    <Recruiters />
                  </Layout>
                }
              />
              <Route
                path="/placements/contact"
                element={
                  <Layout>
                    <PlacementContact />
                  </Layout>
                }
              />
              <Route
                path="/research/coe"
                element={
                  <Layout>
                    <COE />
                  </Layout>
                }
              />
              <Route
                path="/research/collaboration"
                element={
                  <Layout>
                    <Collaboration />
                  </Layout>
                }
              />
              <Route
                path="/research/iic"
                element={
                  <Layout>
                    <IIC />
                  </Layout>
                }
              />
              <Route
                path="/research/ipr"
                element={
                  <Layout>
                    <IPR />
                  </Layout>
                }
              />
              <Route
                path="/research/nisp"
                element={
                  <Layout>
                    <NISP />
                  </Layout>
                }
              />
              <Route
                path="/research/phd"
                element={
                  <Layout>
                    <PhdCentre />
                  </Layout>
                }
              />
              <Route
                path="/research/publications"
                element={
                  <Layout>
                    <Publications />
                  </Layout>
                }
              />
              <Route
                path="/research/rdc"
                element={
                  <Layout>
                    <RDCell />
                  </Layout>
                }
              />
              <Route
                path="/research/policy"
                element={
                  <Layout>
                    <ResearchPolicy />
                  </Layout>
                }
              />
              <Route
                path="/research/sabbatical"
                element={
                  <Layout>
                    <Sabbatical />
                  </Layout>
                }
              />
              <Route
                path="/research/ug-projects"
                element={
                  <Layout>
                    <UGProjects />
                  </Layout>
                }
              />
              <Route
                path="/research/funded-projects"
                element={
                  <Layout>
                    <FundedProjects />
                  </Layout>
                }
              />
              <Route
                path="/research/innovation-cell"
                element={
                  <Layout>
                    <InnovationCell />
                  </Layout>
                }
              />
              <Route
                path="/research/patents"
                element={
                  <Layout>
                    <PatentsIP />
                  </Layout>
                }
              />
              <Route
                path="/research/overview"
                element={
                  <Layout>
                    <ResearchOverview />
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
