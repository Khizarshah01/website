import React from "react";
import { Link } from "react-router-dom";
import { FaFileAlt, FaChevronRight } from "react-icons/fa";
import AdminOfficePageLayout from "../../../../components/AdminOfficePageLayout";

const policiesList = [
  { title: "Strategic Plan & Deployment", path: "/facilities/admin-office/policies/strategic-plan", description: "Institution's vision, mission and strategic goals" },
  { title: "Curriculum Policy", path: "/facilities/admin-office/policies/curriculum", description: "Guidelines for curriculum development and updates" },
  { title: "Innovation Practices", path: "/facilities/admin-office/policies/innovation", description: "Fostering innovation and creativity" },
  { title: "Student-Centric Methods", path: "/facilities/admin-office/policies/student-centric", description: "Teaching-learning methodologies focused on students" },
  { title: "Examination Policy", path: "/facilities/admin-office/policies/examination", description: "Rules and procedures for examinations" },
  { title: "Mentor Policy", path: "/facilities/admin-office/policies/mentor", description: "Mentoring framework for students" },
  { title: "Slow & Advanced Learner Policy", path: "/facilities/admin-office/policies/slow-advanced-learner", description: "Supporting diverse learning needs" },
  { title: "IQAC Policy", path: "/facilities/admin-office/policies/iqac", description: "Internal Quality Assurance Cell guidelines" },
  { title: "AAA Policy", path: "/facilities/admin-office/policies/aaa", description: "Academic and Administrative Audit" },
  { title: "Budget Policy", path: "/facilities/admin-office/policies/budget", description: "Financial planning and budget allocation" },
  { title: "Anti-Ragging Policy", path: "/facilities/admin-office/policies/anti-ragging", description: "Zero tolerance against ragging" },
  { title: "Anti-Sexual Harassment Policy", path: "/facilities/admin-office/policies/anti-sexual-harassment", description: "Safe campus environment guidelines" },
  { title: "Gender Equity Policy", path: "/facilities/admin-office/policies/gender-equity", description: "Promoting gender equality" },
  { title: "Grievance Redressal Policy", path: "/facilities/admin-office/policies/grievance-redressal", description: "Addressing stakeholder grievances" },
  { title: "Maintenance Policy", path: "/facilities/admin-office/policies/maintenance", description: "Infrastructure maintenance guidelines" },
  { title: "Scholarship Policy", path: "/facilities/admin-office/policies/scholarship", description: "Scholarship eligibility and procedures" },
  { title: "Staff Welfare Policy", path: "/facilities/admin-office/policies/staff-welfare", description: "Employee welfare measures" },
  { title: "Financial Assistance Policy", path: "/facilities/admin-office/policies/financial-assistance", description: "Financial support for students" },
  { title: "Performance Appraisal", path: "/facilities/admin-office/policies/performance-appraisal", description: "Staff performance evaluation system" },
  { title: "ICT Policy", path: "/facilities/admin-office/policies/ict", description: "Information & Communication Technology usage" },
  { title: "Green Campus Policy", path: "/facilities/admin-office/policies/green-campus", description: "Environmental sustainability initiatives" },
  { title: "Energy Conservation", path: "/facilities/admin-office/policies/energy-conservation", description: "Energy saving practices" },
  { title: "Environment Policy", path: "/facilities/admin-office/policies/environment", description: "Environmental protection guidelines" },
  { title: "Code of Conduct", path: "/facilities/admin-office/policies/code-of-conduct", description: "Behavioral standards for all stakeholders" },
  { title: "Rules & Regulations", path: "/facilities/admin-office/policies/rules-regulations", description: "General institutional rules" },
];

const PoliciesIndex = () => {
  return (
    <AdminOfficePageLayout title="Policies & Procedures">
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Institutional Policies & Procedures
          </h2>
          <p className="mt-2 text-gray-600">
            Browse all policies and procedures governing the institution. Click on any policy to view its details.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {policiesList.map((policy, index) => (
            <Link
              key={index}
              to={policy.path}
              className="group flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-ssgmce-blue hover:shadow-md"
            >
              <div className="rounded-lg bg-ssgmce-blue/10 p-2.5 transition-colors group-hover:bg-ssgmce-blue">
                <FaFileAlt className="h-5 w-5 text-ssgmce-blue transition-colors group-hover:text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-ssgmce-blue">
                  {policy.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {policy.description}
                </p>
              </div>
              <FaChevronRight className="mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-ssgmce-blue" />
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-blue-50 p-4 text-center">
          <p className="text-sm text-blue-800">
            <strong>{policiesList.length}</strong> policies available for reference
          </p>
        </div>
      </div>
    </AdminOfficePageLayout>
  );
};

export default PoliciesIndex;
