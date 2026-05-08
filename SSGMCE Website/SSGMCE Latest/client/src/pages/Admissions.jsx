import PageHeader from '../components/PageHeader';
import { FaCheckCircle, FaFileAlt, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';

const Admissions = () => {
  return (
    <div className="animation-fade-in">
      <PageHeader 
        title="Admissions 2024-25" 
        subtitle="Join the SSGMCE Family" 
      />

      {/* Important Notice */}
      <section className="py-12 bg-gradient-to-r from-ssgmce-orange to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <FaGraduationCap className="text-6xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">Admissions Open for Academic Year 2024-25</h2>
            <p className="text-xl mb-6">Apply now for B.E. and M.E. programs</p>
            <button className="bg-white text-ssgmce-orange px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300">
              Apply Online Now
            </button>
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Programs Offered</h2>
          
          {/* UG Programs */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-ssgmce-dark-blue mb-6 border-b-4 border-ssgmce-orange inline-block pb-2">
              Undergraduate Programs (B.E.)
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {[
                { name: 'Computer Science & Engineering', duration: '4 Years', intake: '120' },
                { name: 'Mechanical Engineering', duration: '4 Years', intake: '60' },
                { name: 'Civil Engineering', duration: '4 Years', intake: '60' },
                { name: 'Electrical Engineering', duration: '4 Years', intake: '60' },
                { name: 'Electronics & Telecommunication', duration: '4 Years', intake: '60' },
                { name: 'Information Technology', duration: '4 Years', intake: '60' },
              ].map((program, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-ssgmce-orange transition-all duration-300">
                  <h4 className="font-bold text-lg text-ssgmce-blue mb-3">{program.name}</h4>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span><FaCalendarAlt className="inline mr-2 text-ssgmce-orange" />Duration: {program.duration}</span>
                    <span><FaGraduationCap className="inline mr-2 text-ssgmce-orange" />Intake: {program.intake}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PG Programs */}
          <div>
            <h3 className="text-2xl font-bold text-ssgmce-dark-blue mb-6 border-b-4 border-ssgmce-orange inline-block pb-2">
              Postgraduate Programs (M.E.)
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {[
                { name: 'Computer Science & Engineering', duration: '2 Years', intake: '18' },
                { name: 'Heat Power Engineering', duration: '2 Years', intake: '18' },
                { name: 'Structural Engineering', duration: '2 Years', intake: '18' },
              ].map((program, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-ssgmce-orange transition-all duration-300">
                  <h4 className="font-bold text-lg text-ssgmce-blue mb-3">{program.name}</h4>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span><FaCalendarAlt className="inline mr-2 text-ssgmce-orange" />Duration: {program.duration}</span>
                    <span><FaGraduationCap className="inline mr-2 text-ssgmce-orange" />Intake: {program.intake}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Eligibility Criteria</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-ssgmce-blue">
              <h3 className="text-2xl font-bold text-ssgmce-blue mb-4">For B.E. Programs</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Passed 12th/HSC with Physics, Mathematics, and Chemistry/Biology/Biotechnology</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Minimum 45% marks (40% for reserved categories)</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Valid JEE Main / MHT-CET score</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-ssgmce-orange">
              <h3 className="text-2xl font-bold text-ssgmce-blue mb-4">For M.E. Programs</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Bachelor's degree in relevant engineering branch</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Minimum 50% marks (45% for reserved categories)</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Valid GATE score (Preferred but not mandatory)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Admission Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {[
                { step: '1', title: 'Fill Online Application', desc: 'Complete the online application form with accurate details' },
                { step: '2', title: 'Submit Documents', desc: 'Upload required documents and pay application fee' },
                { step: '3', title: 'Merit List', desc: 'Check the merit list published on our website' },
                { step: '4', title: 'Document Verification', desc: 'Attend document verification on scheduled date' },
                { step: '5', title: 'Fee Payment', desc: 'Pay admission fee to confirm your seat' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-ssgmce-blue to-ssgmce-dark-blue rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border-l-4 border-ssgmce-orange">
                    <h4 className="text-xl font-bold text-ssgmce-blue mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Documents Required</h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <ul className="grid md:grid-cols-2 gap-4">
              {[
                '10th Mark Sheet',
                '12th Mark Sheet',
                'Leaving Certificate',
                'Nationality Certificate',
                'Caste Certificate (if applicable)',
                'Domicile Certificate',
                'Aadhar Card',
                'Passport Size Photographs',
                'JEE/CET Score Card',
                'Migration Certificate',
              ].map((doc, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FaFileAlt className="text-ssgmce-orange flex-shrink-0" />
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact for Admission */}
      <section className="py-16 bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Help with Admissions?</h2>
          <p className="text-xl mb-8 text-ssgmce-light-blue">Contact our admission office for any queries</p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
              <p className="font-bold text-lg">Phone</p>
              <p className="text-ssgmce-light-blue">+91-7265-252274</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
              <p className="font-bold text-lg">Email</p>
              <p className="text-ssgmce-light-blue">admission@ssgmce.ac.in</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
