import PageHeader from '../components/PageHeader';
import { FaFlask, FaBook, FaAward, FaLightbulb } from 'react-icons/fa';

const Research = () => {
  const researchAreas = [
    { 
      dept: 'Computer Science & IT',
      areas: ['Machine Learning', 'Artificial Intelligence', 'Data Science', 'IoT', 'Cloud Computing', 'Cybersecurity']
    },
    { 
      dept: 'Mechanical Engineering',
      areas: ['Thermal Engineering', 'Manufacturing', 'Robotics', 'CAD/CAM', 'Renewable Energy', 'CFD']
    },
    { 
      dept: 'Civil Engineering',
      areas: ['Structural Engineering', 'Geotechnical', 'Environmental', 'Transportation', 'Construction Management']
    },
    { 
      dept: 'Electrical Engineering',
      areas: ['Power Systems', 'Renewable Energy', 'Control Systems', 'Power Electronics', 'Smart Grid']
    },
    { 
      dept: 'Electronics & Telecommunication',
      areas: ['VLSI', 'Signal Processing', 'Wireless Communication', 'Embedded Systems', '5G Technology']
    },
  ];

  const publications = [
    { year: '2023-24', journals: '45', conferences: '62', patents: '8' },
    { year: '2022-23', journals: '38', conferences: '55', patents: '6' },
    { year: '2021-22', journals: '32', conferences: '48', patents: '5' },
  ];

  return (
    <div className="animation-fade-in">
      <PageHeader 
        title="Research & Development" 
        subtitle="Innovation and Excellence in Research" 
      />

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              SSGMCE is committed to promoting research and innovation among faculty and students. 
              Our research activities span various domains of engineering and technology, contributing 
              to academic knowledge and practical solutions for industry and society.
            </p>
          </div>

          {/* Research Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FaBook, number: '500+', label: 'Publications', color: 'bg-ssgmce-blue' },
              { icon: FaAward, number: '25+', label: 'Patents Filed', color: 'bg-ssgmce-orange' },
              { icon: FaFlask, number: '15+', label: 'Research Projects', color: 'bg-green-600' },
              { icon: FaLightbulb, number: '10+', label: 'Collaborations', color: 'bg-purple-600' },
            ].map((stat, index) => (
              <div key={index} className={`${stat.color} text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300`}>
                <stat.icon className="text-4xl mb-3 mx-auto block" />
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Research Focus Areas</h2>
          <div className="space-y-6">
            {researchAreas.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-ssgmce-orange hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-ssgmce-blue mb-4">{item.dept}</h3>
                <div className="flex flex-wrap gap-3">
                  {item.areas.map((area, idx) => (
                    <span 
                      key={idx}
                      className="bg-ssgmce-light-blue/20 text-ssgmce-dark-blue px-4 py-2 rounded-full text-sm font-semibold hover:bg-ssgmce-light-blue hover:text-white transition-colors duration-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Research Publications</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Academic Year</th>
                  <th className="px-6 py-4 text-center">Journal Papers</th>
                  <th className="px-6 py-4 text-center">Conference Papers</th>
                  <th className="px-6 py-4 text-center">Patents Filed</th>
                </tr>
              </thead>
              <tbody>
                {publications.map((pub, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 font-semibold text-ssgmce-blue">{pub.year}</td>
                    <td className="px-6 py-4 text-center font-bold text-green-600">{pub.journals}</td>
                    <td className="px-6 py-4 text-center font-bold text-blue-600">{pub.conferences}</td>
                    <td className="px-6 py-4 text-center font-bold text-ssgmce-orange">{pub.patents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Research Facilities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Research Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Central Library',
                desc: 'Extensive collection of books, journals, and e-resources for research',
                icon: '📚'
              },
              { 
                title: 'Advanced Labs',
                desc: 'State-of-the-art laboratories with modern equipment and software',
                icon: '🔬'
              },
              { 
                title: 'Computing Resources',
                desc: 'High-performance computing facilities for computational research',
                icon: '💻'
              },
              { 
                title: 'Digital Resources',
                desc: 'Access to IEEE, Springer, Elsevier, and other research databases',
                icon: '🌐'
              },
              { 
                title: 'Research Center',
                desc: 'Dedicated research center for collaborative and interdisciplinary projects',
                icon: '🏢'
              },
              { 
                title: 'Innovation Lab',
                desc: 'Maker space for prototyping and product development',
                icon: '⚙️'
              },
            ].map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-bold text-ssgmce-blue mb-3">{facility.title}</h3>
                <p className="text-gray-600">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding & Grants */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Funding & Collaborations</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-ssgmce-blue">
              <h3 className="text-2xl font-bold text-ssgmce-blue mb-4">Funding Agencies</h3>
              <ul className="space-y-3">
                {[
                  'AICTE - Research Promotion Scheme',
                  'UGC - Major & Minor Projects',
                  'DST - Science & Engineering Research Board',
                  'MHRD - Technical Education Quality Improvement',
                ].map((agency, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-ssgmce-orange mr-3">✓</span>
                    <span className="text-gray-700">{agency}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-ssgmce-orange">
              <h3 className="text-2xl font-bold text-ssgmce-blue mb-4">Industry Partners</h3>
              <ul className="space-y-3">
                {[
                  'TCS - Technology Research',
                  'Infosys - Innovation Labs',
                  'L&T - Engineering Solutions',
                  'BHEL - Industrial Projects',
                ].map((partner, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-ssgmce-orange mr-3">✓</span>
                    <span className="text-gray-700">{partner}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Student Research */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-8">Student Research Opportunities</h2>
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-lg text-gray-700 leading-relaxed">
              We encourage students to actively participate in research through various programs and initiatives.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Final Year Projects', desc: 'Industry-relevant and research-oriented projects under faculty guidance' },
              { title: 'Research Internships', desc: 'Summer internships in research labs and industry R&D centers' },
              { title: 'Paper Publications', desc: 'Support for publishing research papers in conferences and journals' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-ssgmce-orange text-center hover:-translate-y-2 transition-transform duration-300">
                <h4 className="text-xl font-bold text-ssgmce-blue mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Research & Development Cell</h2>
          <p className="text-xl mb-8 text-ssgmce-light-blue">
            For research collaborations and project proposals, contact our R&D Cell
          </p>
          <div className="bg-white/10 backdrop-blur-sm inline-block px-8 py-4 rounded-lg">
            <p className="font-bold text-lg mb-1">Email</p>
            <p className="text-ssgmce-light-blue">research@ssgmce.ac.in</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Research;
