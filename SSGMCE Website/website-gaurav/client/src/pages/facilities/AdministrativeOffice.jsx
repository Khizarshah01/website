import React from "react";
import AdminOfficePageLayout from "../../components/AdminOfficePageLayout";

const AdministrativeOffice = () => {
  return (
    <AdminOfficePageLayout title="Administrative Office">
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="mb-4 text-[clamp(1.2rem,2.8vw,1.5rem)] font-bold text-gray-900">
            About Administrative Office
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Administrative Office at SSGMCE serves as the backbone of all academic and
            non-academic operations. Our dedicated team ensures smooth functioning of admissions,
            examinations, accounts, student services, and general administration.
          </p>
        </section>

        {/* Administrative Departments */}
        <section>
          <h2 className="mb-4 text-[clamp(1.2rem,2.8vw,1.5rem)] font-bold text-gray-900">
            Administrative Departments & Services
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-4 xs:p-5 sm:p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-900">
                Academic Administration
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Admissions & Student Registration</li>
                <li>• Examination Department</li>
                <li>• Academic Records & Transcripts</li>
                <li>• Course Registration</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 p-4 xs:p-5 sm:p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-900">
                Student Services
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Student ID Cards & Certificates</li>
                <li>• Fee Collection & Financial Aid</li>
                <li>• Hostel Administration</li>
                <li>• Student Grievance Cell</li>
              </ul>
            </div>

            <div className="rounded-lg bg-orange-50 p-4 xs:p-5 sm:p-6">
              <h3 className="mb-3 text-lg font-semibold text-orange-900">
                General Administration
              </h3>
              <ul className="space-y-2 text-sm text-orange-800">
                <li>• HR & Staff Management</li>
                <li>• Accounts & Finance</li>
                <li>• Legal & Compliance</li>
                <li>• Infrastructure Management</li>
              </ul>
            </div>

            <div className="rounded-lg bg-purple-50 p-4 xs:p-5 sm:p-6">
              <h3 className="mb-3 text-lg font-semibold text-purple-900">
                External Affairs
              </h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• University Liaison</li>
                <li>• AICTE & Regulatory Affairs</li>
                <li>• Industry Partnerships</li>
                <li>• Alumni Relations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Services */}
        <section>
          <h2 className="mb-4 text-[clamp(1.2rem,2.8vw,1.5rem)] font-bold text-gray-900">
            Key Services for Students
          </h2>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-ssgmce-blue">📋</div>
                <h4 className="font-semibold text-gray-900">Document Services</h4>
                <p className="text-sm text-gray-600">Certificates, transcripts, and official documents</p>
              </div>

              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-ssgmce-blue">💳</div>
                <h4 className="font-semibold text-gray-900">Fee Management</h4>
                <p className="text-sm text-gray-600">Fee payment, receipts, and financial assistance</p>
              </div>

              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-ssgmce-blue">🎓</div>
                <h4 className="font-semibold text-gray-900">Academic Support</h4>
                <p className="text-sm text-gray-600">Registration, examination, and academic queries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="rounded-lg bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-6 text-white">
          <h2 className="mb-4 text-xl font-bold">Contact Administrative Office</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Office Hours:</h3>
              <p className="text-sm text-blue-100">Monday to Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-sm text-blue-100">Saturday: 9:00 AM - 1:00 PM</p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Contact Details:</h3>
              <p className="text-sm text-blue-100">📞 07152-241602</p>
              <p className="text-sm text-blue-100">📧 admin@ssgmce.ac.in</p>
            </div>
          </div>
        </section>
      </div>
    </AdminOfficePageLayout>
  );
};

export default AdministrativeOffice;
