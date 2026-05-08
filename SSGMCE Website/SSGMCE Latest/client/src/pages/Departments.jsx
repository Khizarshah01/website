import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DepartmentCard from '../components/DepartmentCard';
import useFetch from '../hooks/useFetch';

const Departments = () => {
  const { data: departmentsData, loading } = useFetch('/api/departments');
  const [selectedDept, setSelectedDept] = useState(null);

  const departments = departmentsData || [
    {
      _id: '1',
      name: 'Computer Science & Engineering',
      code: 'CSE',
      description: 'The department focuses on software development, algorithms, data structures, and emerging technologies.',
      programs: ['B.E. Computer Science & Engineering', 'M.E. Computer Science & Engineering'],
    },
    {
      _id: '2',
      name: 'Mechanical Engineering',
      code: 'MECH',
      description: 'Deals with design, manufacturing, and maintenance of mechanical systems.',
      programs: ['B.E. Mechanical Engineering', 'M.E. Heat Power Engineering'],
    },
    {
      _id: '3',
      name: 'Civil Engineering',
      code: 'CIVIL',
      description: 'Focuses on infrastructure development, construction, and structural engineering.',
      programs: ['B.E. Civil Engineering', 'M.E. Structural Engineering'],
    },
    {
      _id: '4',
      name: 'Electrical Engineering',
      code: 'EE',
      description: 'Studies electrical systems, power generation, and distribution.',
      programs: ['B.E. Electrical Engineering'],
    },
    {
      _id: '5',
      name: 'Electronics & Telecommunication',
      code: 'ENTC',
      description: 'Covers electronic devices, communication systems, and signal processing.',
      programs: ['B.E. Electronics & Telecommunication'],
    },
    {
      _id: '6',
      name: 'Information Technology',
      code: 'IT',
      description: 'Specializes in information systems, networking, and web technologies.',
      programs: ['B.E. Information Technology'],
    },
  ];

  return (
    <div className="animation-fade-in">
      <PageHeader 
        title="Academic Departments" 
        subtitle="Explore Our Engineering Programs" 
      />

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              SSGMCE offers various undergraduate and postgraduate programs in engineering disciplines. 
              All our programs are affiliated to Sant Gadge Baba Amravati University and approved by AICTE. 
              Our departments are equipped with state-of-the-art laboratories and experienced faculty members.
            </p>
          </div>

          {/* Department Cards */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-ssgmce-blue"></div>
              <p className="mt-4 text-gray-600">Loading departments...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <DepartmentCard 
                  key={dept._id}
                  name={dept.name}
                  code={dept.code}
                  description={dept.description}
                  programs={dept.programs}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Department Facilities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Department Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🔬', title: 'Modern Laboratories', desc: 'Well-equipped labs with latest equipment' },
              { icon: '👨‍🏫', title: 'Qualified Faculty', desc: 'Experienced and dedicated teaching staff' },
              { icon: '📚', title: 'Digital Library', desc: 'Access to online journals and resources' },
              { icon: '💼', title: 'Industry Connect', desc: 'Internships and placement opportunities' },
            ].map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-3">{facility.icon}</div>
                <h3 className="text-lg font-bold text-ssgmce-blue mb-2">{facility.title}</h3>
                <p className="text-gray-600 text-sm">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white p-10 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Accreditation & Affiliation</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-5xl mb-3">✅</div>
                <h4 className="font-bold text-xl mb-2">AICTE Approved</h4>
                <p className="text-ssgmce-light-blue">All India Council for Technical Education</p>
              </div>
              <div>
                <div className="text-5xl mb-3">🎓</div>
                <h4 className="font-bold text-xl mb-2">University Affiliated</h4>
                <p className="text-ssgmce-light-blue">Sant Gadge Baba Amravati University</p>
              </div>
              <div>
                <div className="text-5xl mb-3">🏆</div>
                <h4 className="font-bold text-xl mb-2">NAAC Accredited</h4>
                <p className="text-ssgmce-light-blue">National Assessment and Accreditation Council</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Departments;
