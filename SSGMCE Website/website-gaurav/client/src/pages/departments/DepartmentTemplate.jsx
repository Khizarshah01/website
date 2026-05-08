import React, { useState, useEffect } from 'react';
import GenericPage from '../../components/GenericPage';
// import deptBanner from '../../assets/images/departments/[dept-folder]/[dept]-banner.png';
import { FaLaptopCode, FaBullseye, FaUserTie, FaFlask, FaAward, FaAngleRight, FaIndustry, FaUniversity, FaQuoteLeft, FaEnvelope, FaPhone, FaIdCard, FaTrophy, FaChartLine, FaLightbulb, FaProjectDiagram, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const DepartmentTemplate = () => {
  // Department Page
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for Vision/Mission/PEO section tabs
  const [vmTab, setVmTab] = useState('vision');
  const [poTab, setPoTab] = useState('peo');
  const [showAllPos, setShowAllPos] = useState(false);
  const [researchTab, setResearchTab] = useState('patents');
  const [projectYear, setProjectYear] = useState('2024-25');
  const [researchYear, setResearchYear] = useState('2024-25');
  const [placementYear, setPlacementYear] = useState(null); // null shows summary, string shows specific year details

  // Reset project year when switching to student-projects tab
  useEffect(() => {
    if (activeTab === 'student-projects') {
      window.scrollTo(0, 0);
      setProjectYear('2024-25');
    }
  }, [activeTab]);

  const academicsLinks = [
    { id: 'overview', label: 'Department Overview' },
    { id: 'hod', label: 'Words from HOD' },
    { id: 'vision-mission', label: 'Vision, Mission, PEO & PSO' },
    { id: 'faculty', label: 'Faculty Members' },
    { id: 'laboratories', label: 'Infrastructure and Laboratories' },
    { id: 'curriculum', label: 'Curriculum & Structure' },
    { id: 'student-activities', label: 'Student Activities & Chapters' },
    { id: 'student-projects', label: 'Student Projects' },
    { id: 'achievements', label: 'Achievements & Recognition' },
    { id: 'placements', label: 'Placement Statistics' },
    { id: 'practices', label: 'Innovative Best Practice' },
    { id: 'newsletter', label: 'Newsletter' },
  ];

  const industryLinks = [
    { id: 'visits', label: 'Industrial Visits' },
    { id: 'mous', label: 'MoUs' },
    { id: 'patents', label: 'Patent & Publication' },
    { id: 'internships', label: 'Internship and Training' },
  ];

  const content = {
    overview: (
      <div className="space-y-10">
        <div className="space-y-6">
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-orange-500 inline-block pb-2 w-fit">
                  Department Overview
              </h3>
              
              {/* Featured Video - Larger & Cinematic */}
              <div className="w-full rounded-2xl overflow-hidden shadow-xl bg-black aspect-video group relative">
                  <iframe 
                      className="w-full h-full"
                      src="" 
                      title="Department Video"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                  ></iframe>
              </div>

              <div className="prose max-w-none text-gray-600 leading-relaxed text-justify text-lg space-y-4">
                  <p>
                      [Department Overview Paragraph 1]
                  </p>
                  <p>
                      [Department Overview Paragraph 2]
                  </p>
              </div>
            </div>
        </div>

        {/* Courses Section - Minimalistic */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 p-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    Courses @ Department
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">Course</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 border border-gray-200">Course Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {/* BE */}
                        <tr className="bg-white">
                            <td colSpan="2" className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200">Bachelor of Engineering</td>
                        </tr>
                        {[ 
                            ['Degree', '[B.E. Degree Full Name]'],
                            ['Duration', '[Duration Details]'],
                            ['Intake', '[Number] Students per year'],
                            ['Establishment', 'Year: [Year]'],
                            ['NBA Status', '[NBA Accreditation Status]'],
                        ].map(([label, val], i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-3 text-sm font-bold text-gray-500 w-1/3 border border-gray-200 bg-gray-50/30">{label}</td>
                                <td className="px-6 py-3 text-sm text-gray-700 font-medium border border-gray-200">{val}</td>
                            </tr>
                        ))}

                         {/* ME */}
                         <tr className="bg-white">
                            <td colSpan="2" className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200 mt-4">Master of Engineering</td>
                        </tr>
                        {[ 
                            ['Specialization', '[M.E. Specialization Name]'],
                            ['Duration', '[Duration Details]'],
                            ['Intake', '[Number] Students per year'],
                            ['Establishment', 'Year: [Year]'],
                        ].map(([label, val], i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-3 text-sm font-bold text-gray-500 w-1/3 border border-gray-200 bg-gray-50/30">{label}</td>
                                <td className="px-6 py-3 text-sm text-gray-700 font-medium border border-gray-200">{val}</td>
                            </tr>
                        ))}

                        {/* PhD */}
                         <tr className="bg-white">
                            <td colSpan="2" className="px-6 py-3 font-bold text-ssgmce-blue text-base border border-gray-200">Ph. D Program</td>
                        </tr>
                         {[ 
                            ['Duration', '[Duration Details]'],
                            ['Intake', '[Number] Students'],
                        ].map(([label, val], i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-3 text-sm font-bold text-gray-500 w-1/3 border border-gray-200 bg-gray-50/30">{label}</td>
                                <td className="px-6 py-3 text-sm text-gray-700 font-medium border border-gray-200">{val}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
             <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-ssgmce-blue font-medium">[HOD Name]</p>
                <p className="text-sm text-gray-500">Head, Department of [Department Name]</p>
             </div>
        </div>
      </div>
    ),
    'vision-mission': (
      <div className="space-y-10">
        
        {/* Top Section: Vision & Mission Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="flex border-b border-gray-200 bg-gray-50/50">
                 {['vision', 'mission'].map(tab => (
                     <button
                        key={tab}
                        onClick={() => setVmTab(tab)}
                        className={`px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all relative ${
                            vmTab === tab 
                            ? 'text-ssgmce-blue bg-white' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                     >
                                                <span className="inline-flex items-center gap-2">
                                                    {tab === 'vision' ? (
                                                        <FaBullseye className="text-xs" />
                                                    ) : (
                                                        <FaAward className="text-xs" />
                                                    )}
                                                    <span>{tab}</span>
                                                </span>
                        {vmTab === tab && <div className="absolute top-0 left-0 w-full h-1 bg-ssgmce-blue"></div>}
                     </button>
                 ))}
             </div>
             <div className="p-8 min-h-[160px] flex items-center">
                 {vmTab === 'vision' && (
                     <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex items-start gap-4"
                     >
                        <div className="mt-1 text-ssgmce-orange text-2xl">➤</div>
                        <p className="text-lg text-gray-700 leading-relaxed font-medium">
                            [Vision Statement]
                        </p>
                     </motion.div>
                 )}
                 {vmTab === 'mission' && (
                     <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="space-y-4 w-full"
                     >
                        {[
                            "[Mission Point 1]",
                            "[Mission Point 2]",
                            "[Mission Point 3]"
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="mt-1 text-ssgmce-orange text-xl">➤</div>
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                     </motion.div>
                 )}
             </div>
        </div>

        {/* Bottom Section: PEO, PO, PSO Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50">
                 {[
                    { id: 'peo', label: 'Program Educational Objectives' },
                    { id: 'po', label: 'Program Outcomes' },
                    { id: 'pso', label: 'Program Specific Objectives' }
                 ].map(tab => (
                     <button
                        key={tab.id}
                        onClick={() => setPoTab(tab.id)}
                        className={`px-6 py-4 font-bold text-sm transition-all relative whitespace-nowrap ${
                            poTab === tab.id 
                            ? 'text-white bg-gray-500' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                     >
                        {tab.label}
                     </button>
                 ))}
             </div>
             
             <div className="p-8">
                 {poTab === 'peo' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {[
                            "[PEO 1]",
                            "[PEO 2]",
                            "[PEO 3]"
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="mt-1 text-blue-900 text-xl">➤</div>
                                <p className="text-gray-700 leading-relaxed font-medium">{item}</p>
                            </div>
                        ))}
                     </motion.div>
                 )}

                 {poTab === 'pso' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                         {[
                            "[PSO 1]",
                            "[PSO 2]",
                            "[PSO 3]"
                         ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="mt-1 text-blue-900 text-xl">➤</div>
                                <p className="text-gray-700 leading-relaxed font-medium">{item}</p>
                            </div>
                         ))}
                     </motion.div>
                 )}

                {poTab === 'po' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="space-y-4">
                            {[
                                { t: "Engineering knowledge", d: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems." },
                                { t: "Problem analysis", d: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences." },
                                { t: "Design/development of solutions", d: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations." },
                                { t: "Conduct investigations of complex problems", d: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions." },
                                ...(showAllPos ? [
                                    { t: "Modern tool usage", d: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations." },
                                    { t: "The engineer and society", d: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice." },
                                    { t: "Environment and sustainability", d: "Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development." },
                                    { t: "Ethics", d: "Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice." },
                                    { t: "Individual and team work", d: "Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings." },
                                    { t: "Communication", d: "Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions." },
                                    { t: "Project management and finance", d: "Demonstrate knowledge and understanding of the engineering and management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments." },
                                    { t: "Life-long learning", d: "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change." }
                                ] : [])
                            ].map((po, i) => (
                                <div key={i} className="text-gray-700 leading-relaxed text-sm">
                                    <strong className="text-gray-900 block mb-1 text-base">{po.t}:</strong>
                                    {po.d}
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            onClick={() => setShowAllPos(!showAllPos)}
                            className="inline-flex items-center text-orange-500 font-bold hover:text-orange-600 transition-colors mt-2"
                        >
                            {showAllPos ? 'Read Less' : 'Read More...'}
                        </button>
                     </motion.div>
                 )}
             </div>
        </div>
      </div>
    ),
    hod: (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
         <div className="flex flex-col md:flex-row">
             {/* Left: Profile Section */}
             <div className="md:w-1/3 bg-gray-50 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100">
                 <div className="w-48 h-48 bg-white rounded-full mb-6 flex items-center justify-center shadow-lg border-4 border-white overflow-hidden relative group">
                    <FaUserTie className="text-6xl text-gray-300" />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 text-center">[HOD Name]</h3>
                 <p className="text-ssgmce-blue font-medium text-sm mt-2 uppercase tracking-wide">Head of Department</p>
                 <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-500">[Qualification 1]</span>
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-500">[Qualification 2]</span>
                 </div>
             </div>
             
             {/* Right: Message Section */}
             <div className="md:w-2/3 p-8 md:p-12 relative bg-white">
                 <FaQuoteLeft className="absolute top-8 left-8 text-6xl text-gray-100 -z-0" />
                 
                 <div className="relative z-10">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">Message from the HOD</h3>
                        <div className="h-1 w-20 bg-orange-500 mt-2 rounded-full"></div>
                    </div>
                    
                    <div className="space-y-4 text-gray-600 text-lg leading-relaxed text-justify">
                        <p>
                            [HOD Message Paragraph 1]
                        </p>
                        <p>
                            [HOD Message Paragraph 2]
                        </p>
                        <p>
                            [HOD Message Paragraph 3]
                        </p>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                        <div className="text-right">
                            <p className="font-dancing text-2xl text-gray-400 signatures">[HOD Name]</p>
                        </div>
                    </div>
                 </div>
             </div>
         </div>
      </div>
    ),
    laboratories: (
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">State-of-the-Art Infrastructure</h3>
            <p className="text-gray-600">Our well-equipped laboratories feature high-end configurations to support advanced curriculum requirements and research initiatives.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
            {[ 
                { name: '[Lab Name 1]', feat: '[Lab Features]', icon: '💻' },
                { name: '[Lab Name 2]', feat: '[Lab Features]', icon: '🗄️' },
                { name: '[Lab Name 3]', feat: '[Lab Features]', icon: '🤖' },
                { name: '[Lab Name 4]', feat: '[Lab Features]', icon: '📡' },
                { name: '[Lab Name 5]', feat: '[Lab Features]', icon: '⚙️' },
                { name: '[Lab Name 6]', feat: '[Lab Features]', icon: '🛡️' },
                { name: '[Lab Name 7]', feat: '[Lab Features]', icon: '🌐' },
                { name: '[Lab Name 8]', feat: '[Lab Features]', icon: '💡' }
            ].map((lab, index) => (
                <motion.div 
                    key={index} 
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex items-start group"
                >
                    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4 group-hover:bg-ssgmce-blue group-hover:text-white transition-colors">
                        {lab.icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-gray-800 group-hover:text-ssgmce-blue transition-colors">{lab.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{lab.feat}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    ),
    faculty: (
      <div className="space-y-10">
         <div className="text-center border-b border-gray-200 pb-6 mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Our Faculty</h3>
            <p className="text-gray-500 mt-2">Department of [Department Name]</p>
         </div>

         <div className="grid gap-6 lg:grid-cols-2">
            {[
                { name: "[Faculty Name]", role: "[Designation]", area: ["[Specialization 1]", "[Specialization 2]"], email: "[email]", phone: "[phone]" },
            ].map((fac, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex"
                >
                    <div className="w-32 sm:w-40 bg-gray-50 flex-shrink-0 relative flex items-center justify-center border-r border-gray-100">
                         <FaUserTie className="text-5xl text-gray-300 transition-transform group-hover:scale-110 duration-500" />
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-center">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-ssgmce-blue transition-colors">
                            {fac.name}
                        </h4>
                        <p className="text-ssgmce-blue font-medium text-sm mb-3 uppercase tracking-wide text-[11px]">{fac.role}</p>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                             {fac.area && (
                                <p className="line-clamp-2 text-xs">
                                    <span className="font-bold text-gray-700">Area: </span>
                                    {fac.area.join(', ')}
                                </p>
                             )}
                             
                             <div className="pt-2 flex flex-col gap-1">
                                {fac.email && (
                                    <a href={`mailto:${fac.email}`} className="flex items-center hover:text-ssgmce-blue transition-colors truncate text-xs">
                                        <FaEnvelope className="mr-2 text-gray-400" /> {fac.email}
                                    </a>
                                )}
                                {fac.phone && (
                                    <span className="flex items-center text-xs">
                                        <FaPhone className="mr-2 text-gray-400" /> {fac.phone}
                                    </span>
                                )}
                             </div>
                             
                             <a href="#" className="inline-flex items-center text-[10px] font-bold text-ssgmce-blue mt-2 hover:underline uppercase tracking-wide">
                                View Profile <FaAngleRight className="ml-1" />
                             </a>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </div>
    ),
    curriculum: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
            Scheme and Syllabus
        </h3>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             {/* B.E. Section */}
            <div className="grid md:grid-cols-12 border-b border-gray-200">
                <div className="md:col-span-4 bg-gray-50/50 p-6 flex items-center border-r border-gray-100">
                    <h4 className="font-bold text-lg text-gray-800">
                        B.E. ([Department Name])
                    </h4>
                </div>
                <div className="md:col-span-8 p-6">
                    <ul className="space-y-4">
                        {[
                            { label: "[Syllabus Document Name 1]", link: "#" },
                            { label: "[Syllabus Document Name 2]", link: "#" },
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 group">
                                <span className="w-2 h-2 rounded-full bg-ssgmce-orange mt-2 block group-hover:bg-ssgmce-blue transition-colors"></span>
                                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-2">
                                    <span className="text-gray-700 text-sm font-medium">{item.label}</span>
                                    <button className="text-xs font-bold text-ssgmce-blue hover:text-ssgmce-orange hover:underline uppercase tracking-wide shrink-0">
                                        Download
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* M.E. Section */}
            <div className="grid md:grid-cols-12 bg-gray-50/30">
                <div className="md:col-span-4 bg-gray-50/50 p-6 flex items-center border-r border-gray-100">
                     <h4 className="font-bold text-lg text-gray-800">
                        M.E. ([Specialization])
                    </h4>
                </div>
                <div className="md:col-span-8 p-6">
                     <ul className="space-y-4">
                        <li className="flex items-start gap-3 group">
                             <span className="w-2 h-2 rounded-full bg-ssgmce-orange mt-2 block group-hover:bg-ssgmce-blue transition-colors"></span>
                             <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <span className="text-gray-700 text-sm font-medium">[M.E. Syllabus Document]</span>
                                <button className="text-xs font-bold text-ssgmce-blue hover:text-ssgmce-orange hover:underline uppercase tracking-wide shrink-0">
                                    Download
                                </button>
                             </div>
                        </li>
                     </ul>
                </div>
            </div>
        </div>
      </div>
    ),
    'student-activities': (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-3">Student Activities & Chapters</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our department actively promotes student participation in various technical and professional chapters, fostering leadership, innovation, and collaborative learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Activity Card Template */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all group"
          >
            <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center text-2xl mb-4">
              <FaAward />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">[Activity/Chapter Name]</h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              [Activity Description]
            </p>
            <span className="inline-flex items-center text-xs font-medium text-gray-400">
              Coming Soon
            </span>
          </motion.div>
        </div>
      </div>
    ),
    'student-projects': (
      <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center mb-2 md:mb-0">
                    <FaProjectDiagram className="text-orange-500 mr-2" /> Student Projects (UG)
                </h3>
                    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                        {['2024-25', '2023-24', '2022-23'].map((year) => (
                            <button
                                key={year}
                                onClick={() => setProjectYear(year)}
                                className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                                    projectYear === year
                                        ? 'bg-ssgmce-blue text-white shadow-md'
                                        : 'bg-white text-gray-500 hover:text-ssgmce-blue border border-gray-200'
                                }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-black tracking-wider w-16 text-center">Group No.</th>
                                <th className="px-6 py-4 font-black tracking-wider">Project Title</th>
                                <th className="px-6 py-4 font-black tracking-wider text-right">Project Report</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {(projectYear === '2024-25' ? [
                                { id: 1, title: "[Project Title 1]" },
                                { id: 2, title: "[Project Title 2]" },
                            ] : projectYear === '2023-24' ? [
                                { id: 1, title: "[Project Title 1]" },
                                { id: 2, title: "[Project Title 2]" },
                            ] : [
                                { id: 1, title: "[Project Title 1]" },
                                { id: 2, title: "[Project Title 2]" },
                            ]).map((project, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-center font-mono text-gray-400 text-xs">{project.id}</td>
                                    <td className="px-6 py-4 font-bold text-gray-800">{project.title}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs font-bold bg-blue-50 text-ssgmce-blue px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors border border-gray-200">
                                        View report 
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
      </div>
    ),
    achievements: (
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
            <h3 className="text-3xl font-bold text-gray-800 flex items-center">
                <FaTrophy className="text-yellow-500 mr-3" /> Achievements & Recognition
            </h3>
        </div>

        <div className="space-y-8">
            <div className="relative pl-8 border-l-2 border-orange-100 space-y-10">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-white"></div>
                
                <div>
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full mb-4">
                        2024-25
                    </span>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "[Achievement Title]",
                                desc: "[Achievement Description]",
                                icon: <FaAward />
                            },
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <div className="text-6xl text-blue-900 transform rotate-12">
                                        {item.icon}
                                    </div>
                                </div>

                                <div className="w-12 h-12 bg-blue-50 text-ssgmce-blue rounded-lg flex items-center justify-center text-xl mb-4 group-hover:bg-ssgmce-blue group-hover:text-white transition-colors">
                                    {item.icon}
                                </div>
                                
                                <h4 className="font-bold text-gray-800 mb-2 group-hover:text-ssgmce-blue transition-colors line-clamp-2">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    ),

    placements: (
      <div className="space-y-8">
        <AnimatePresence mode="wait">
        {!placementYear ? (
           <motion.div 
             key="summary"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
             className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
           >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Placement Statistics</h3>
                    <p className="text-sm text-gray-500 mt-1">Year-wise breakdown of student placements</p>
                  </div>
                  <FaChartLine className="text-4xl text-blue-100" />
              </div>
              
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                      <thead>
                          <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider border-b border-gray-200">
                              <th className="px-6 py-4 font-bold text-center w-20">Sr. No.</th>
                              <th className="px-6 py-4 font-bold text-center">Academic Year</th>
                              <th className="px-6 py-4 font-bold text-center">No. of Students Placed</th>
                              <th className="px-6 py-4 font-bold text-center">Details Report</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                          {[
                              { year: '2024-25', count: '[Number]*', id: '2024-25' },
                              { year: '2023-24', count: '[Number]', id: '2023-24' },
                          ].map((row, index) => (
                              <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                                  <td className="px-6 py-4 text-center font-mono text-gray-400">{index + 1}</td>
                                  <td className="px-6 py-4 text-center font-bold text-gray-700">{row.year}</td>
                                  <td className="px-6 py-4 text-center font-bold text-ssgmce-blue text-lg">{row.count}</td>
                                  <td className="px-6 py-4 text-center">
                                      <button 
                                        onClick={() => setPlacementYear(row.id)}
                                        className="text-ssgmce-blue hover:text-ssgmce-orange font-medium text-xs border border-gray-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all"
                                      >
                                          View Details
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
              <div className="p-4 text-xs text-gray-400 text-center bg-gray-50 border-t border-gray-100">
                  * Placements still in progress for the current academic year.
              </div>
           </motion.div>
        ) : (
           <motion.div 
             key="detail"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
           >
              <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={() => setPlacementYear(null)}
                    className="flex items-center text-gray-600 hover:text-ssgmce-blue font-medium transition-colors"
                  >
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-sm group-hover:bg-blue-100">
                        <FaAngleRight className="transform rotate-180" />
                      </span>
                      Back to Statistics
                  </button>
                  <div className="text-right">
                      <h3 className="text-xl font-bold text-gray-800">Placement Record</h3>
                      <p className="text-sm text-ssgmce-blue font-bold">Session: {placementYear}</p>
                  </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-800 text-white uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold text-center w-16">Sr. No.</th>
                                <th className="px-6 py-4 font-bold">Name of Student</th>
                                <th className="px-6 py-4 font-bold">Company Name</th>
                                <th className="px-6 py-4 font-bold text-right">CTC</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { name: "[Student Name]", company: "[Company Name]", ctc: "[CTC]" },
                            ].map((student, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-center font-mono text-gray-400 text-xs">{i+1}</td>
                                    <td className="px-6 py-4 font-bold text-gray-800">{student.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{student.company}</td>
                                    <td className="px-6 py-4 text-right font-bold text-green-600 bg-green-50/50">{student.ctc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
                </div>
           </motion.div>
        )}
        </AnimatePresence>
      </div>
    ),
    practices: (
      <div className="space-y-8">
         <div className="max-w-3xl">
             <h3 className="text-3xl font-bold text-gray-800 mb-4">Innovative Best Practices</h3>
             <p className="text-gray-600 text-lg">
                We believe in going beyond the syllabus to ensure holistic development. Our best practices are designed to bridge the gap between academia and industry.
             </p>
         </div>

         <div className="grid gap-6">
            <motion.div whileHover={{ scale: 1.01 }} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    <FaLaptopCode />
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">[Practice Title 1]</h4>
                    <p className="text-gray-600 leading-relaxed">
                        [Practice Description 1]
                    </p>
                </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    <FaIndustry />
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">[Practice Title 2]</h4>
                    <p className="text-gray-600 leading-relaxed">
                        [Practice Description 2]
                    </p>
                </div>
            </motion.div>
         </div>
      </div>
    ),
    visits: (
      <div className="space-y-8">
         <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-2xl font-bold text-gray-800">Industrial Visits</h3>
            <span className="text-sm font-medium text-ssgmce-blue bg-blue-50 px-3 py-1 rounded-full">Experiential Learning</span>
         </div>
         
         <div className="relative border-l-2 border-gray-200 ml-4 space-y-10">
            {[
                { company: "[Company Name]", loc: "[Location]", date: "[Date]", desc: "[Visit Description]" },
            ].map((visit, i) => (
                <div key={i} className="relative pl-8 group">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-400 group-hover:border-ssgmce-orange transition-colors"></span>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                             <h4 className="font-bold text-lg text-gray-800">{visit.company}</h4>
                             <div className="flex items-center text-sm text-gray-500 font-medium mt-1 sm:mt-0">
                                <FaCalendarAlt className="mr-2 text-gray-400" /> {visit.date} <span className="mx-2">•</span> {visit.loc}
                             </div>
                        </div>
                        <p className="text-gray-600 text-sm">{visit.desc}</p>
                    </div>
                </div>
            ))}
         </div>
      </div>
    ),
    mous: (
      <div className="space-y-10">
        <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800">Memorandum of Understanding</h3>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Collaboration with industry leaders to bridge the gap between academic curriculum and industrial requirements.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { name: "[Partner Name 1]", scope: "[Collaboration Scope]", year: "Active since [Year]" },
            ].map((mou, i) => (
                 <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:border-blue-100 transition-colors"
                 >
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-2xl text-gray-400 mb-4 border border-gray-100">
                        <FaIndustry />
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{mou.name}</h4>
                    <span className="text-xs font-bold text-ssgmce-blue bg-blue-50 px-2 py-1 rounded inline-block mb-3">{mou.scope}</span>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{mou.year}</p>
                 </motion.div>
            ))}
        </div>
      </div>
    ),
    patents: (
      <div className="space-y-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
           <button 
             onClick={() => setResearchTab('patents')}
             className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${researchTab === 'patents' ? 'bg-white text-ssgmce-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
             Patents
           </button>
           <button 
             onClick={() => setResearchTab('publications')}
             className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${researchTab === 'publications' ? 'bg-white text-ssgmce-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
             Publications
           </button>
        </div>

        <AnimatePresence mode="wait">
          {researchTab === 'patents' ? (
             <motion.div key="patents" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center mb-2 md:mb-0">
                        <FaLightbulb className="text-yellow-500 mr-2" /> Patents Granted & Published
                    </h3>
                    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                          {['2024-25', '2023-24'].map((year) => (
                              <button
                                  key={year}
                                  onClick={() => setResearchYear(year)}
                                  className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                                      researchYear === year
                                          ? 'bg-ssgmce-blue text-white shadow-md'
                                          : 'bg-white text-gray-500 hover:text-ssgmce-blue border border-gray-200'
                                  }`}
                              >
                                  {year}
                              </button>
                          ))}
                    </div>
                 </div>
                 <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                           <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                               <tr>
                                   <th className="px-6 py-4 font-black tracking-wider w-12 text-center">#</th>
                                   <th className="px-6 py-4 font-black tracking-wider w-1/3">Title of Invention</th>
                                   <th className="px-6 py-4 font-black tracking-wider text-right">Application No.</th>
                                   <th className="px-6 py-4 font-black tracking-wider text-right">Inventors</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-100">
                    {[
                        { title: "[Patent Title]", status: "Published", id: "[Application No.]", inventors: "[Inventor Names]", date: "[Year]" },
                    ].map((pat, i) => (
                        <tr key={i} className="hover:bg-green-50/30 transition-colors group">
                           <td className="px-6 py-4 text-center font-mono text-xs text-gray-400 group-hover:text-green-600">{i+1}</td>
                           <td className="px-6 py-4 font-medium text-gray-800">
                                {pat.title}
                                <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${pat.status === 'Granted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {pat.status}
                                </span>
                           </td>
                           <td className="px-6 py-4 font-mono text-xs text-gray-500 whitespace-nowrap text-right">{pat.id}</td>
                           <td className="px-6 py-4 text-gray-500 italic text-right">{pat.inventors}</td>
                        </tr>
                    ))}
                           </tbody>
                        </table>
                    </div>
                 </div>
             </motion.div>
          ) : (
             <motion.div key="publications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center mb-2 md:mb-0">
                        <FaChartLine className="text-ssgmce-orange mr-2" /> Research Publications
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="mr-4 flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
                              {['2024-25', '2023-24'].map((year) => (
                                  <button
                                      key={year}
                                      onClick={() => setResearchYear(year)}
                                      className={`px-3 py-1 text-xs font-bold whitespace-nowrap rounded-full transition-all ${
                                          researchYear === year
                                              ? 'bg-ssgmce-blue text-white shadow-md'
                                              : 'bg-white text-gray-500 hover:text-ssgmce-blue border border-gray-200'
                                      }`}
                                  >
                                      {year}
                                  </button>
                              ))}
                        </div>
                    </div>
                 </div>

                 <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                           <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                               <tr>
                                   <th className="px-6 py-4 font-black tracking-wider w-12 text-center">#</th>
                                   <th className="px-6 py-4 font-black tracking-wider">Title of Paper</th>
                                   <th className="px-6 py-4 font-black tracking-wider">Authors</th>
                                   <th className="px-6 py-4 font-black tracking-wider">Journal/Conference</th>
                                   <th className="px-6 py-4 font-black tracking-wider text-right">Link</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-100">
                               {[
                                   { title: "[Publication Title]", authors: "[Author Names]", journal: "[Journal/Conference Name]", link: "#" },
                               ].map((pub, i) => (
                                   <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                                       <td className="px-6 py-4 text-center font-mono text-xs text-gray-400 group-hover:text-ssgmce-orange">{i+1}</td>
                                       <td className="px-6 py-4 font-medium text-gray-800">{pub.title}</td>
                                       <td className="px-6 py-4 text-gray-500 italic">{pub.authors}</td>
                                       <td className="px-6 py-4 text-ssgmce-blue font-medium text-xs">{pub.journal}</td>
                                       <td className="px-6 py-4 text-right font-mono text-gray-500 text-xs">
                                          <a href={pub.link} target="_blank" className="text-ssgmce-blue hover:text-ssgmce-orange">View</a>
                                       </td>
                                   </tr>
                               ))}
                           </tbody>
                        </table>
                    </div>
                 </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    ),
    internships: (
      <div className="space-y-10">
         <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Internship Statistics 2023-24</h3>
                <p className="text-blue-100 opacity-90 max-w-lg">Mandatory internships provide industry exposure. Our students work with leading companies.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-center min-w-[150px]">
                <div className="text-5xl font-black mb-1">[%]</div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-80">Students Interned</div>
            </div>
         </div>
      </div>
    ),
    newsletter: (
      <div className="space-y-12">
          <div className="text-center">
             <div className="w-16 h-16 bg-blue-50 text-ssgmce-blue rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm">
                <FaBullseye />
             </div>
             <h3 className="text-3xl font-bold text-gray-800 mb-4">Department Newsletters</h3>
             <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Stay updated with the latest happenings, student achievements, faculty contributions, and department events through our periodic newsletters.
             </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/3 aspect-[3/4] bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-orange-300 transition-colors">
                      <FaAward className="text-5xl text-gray-300 mb-4 group-hover:text-orange-400 transition-colors" />
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Cover Page</span>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-ssgmce-blue font-bold text-xs uppercase tracking-wider rounded-full mb-4">
                          Latest Release
                      </span>
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">
                          Volume I: 2025-26 (Term I)
                      </h4>
                      <p className="text-gray-500 mb-6">
                          [Newsletter description]
                      </p>
                      
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                          <a 
                             href="#" 
                             className="flex items-center px-6 py-3 bg-ssgmce-blue text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-ssgmce-dark-blue hover:shadow-xl transition-all"
                          >
                              <FaDownload className="mr-2" /> Download Newsletter
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    ),
  };

  const renderContent = () => {
    const activeLabel = academicsLinks.find(l=>l.id===activeTab)?.label || industryLinks.find(l=>l.id===activeTab)?.label;
    
    return content[activeTab] || (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-blue-50 text-ssgmce-orange rounded-full flex items-center justify-center mb-6 relative">
                 <FaLaptopCode className="text-4xl relative z-10" />
                 <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
            </div>
            
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Coming Soon
            </span>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {activeLabel}
            </h3>
            
            <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                We are currently crafting this section to provide you with comprehensive insights. This content is in the pipeline and will be available shortly.
            </p>

            <button 
                onClick={() => setActiveTab('overview')}
                className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-sm shadow-lg shadow-gray-200"
            >
                Back to Overview
            </button>
        </div>
    );
  }

  const SidebarLink = ({ id, label, icon: Icon }) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between group
            ${activeTab === id 
                ? 'bg-ssgmce-blue text-white shadow-md transform translate-x-1' 
                : 'text-gray-600 hover:bg-blue-50 hover:text-ssgmce-blue'}`}
    >
        <span className="flex items-center">
            <span className={`w-1.5 h-1.5 rounded-full mr-3 ${activeTab === id ? 'bg-white' : 'bg-gray-300 group-hover:bg-ssgmce-orange'}`}></span>
            {label}
        </span>
        {activeTab === id && <FaAngleRight className="opacity-80" />}
    </button>
  );

  return (
    <GenericPage title="[Department Full Name]" backgroundImage={""}>
      <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
        
        {/* Sidebar Navigation (Left Side) */}
        <div className="lg:w-1/4 order-1 lg:order-1">
             <div className="space-y-4 pb-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2 lg:space-y-6 lg:pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                 {/* Academics Section */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b border-gray-100 pb-3">
                        <FaUniversity className="text-ssgmce-blue mr-2" /> Academics
                    </h3>
                    <div className="space-y-1">
                        {academicsLinks.map((link) => (
                            <SidebarLink key={link.id} {...link} />
                        ))}
                    </div>
                 </div>

                 {/* Industry Interaction Section */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b border-gray-100 pb-3">
                        <FaIndustry className="text-orange-500 mr-2" /> Industry Relation
                    </h3>
                    <div className="space-y-1">
                        {industryLinks.map((link) => (
                            <SidebarLink key={link.id} {...link} />
                        ))}
                    </div>
                 </div>
             </div>
        </div>

        {/* Main Content Area (Right Side) */}
        <div className="lg:w-3/4 order-2 lg:order-2 min-h-[600px]">
             <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderContent()}
                </motion.div>
             </AnimatePresence>
        </div>

      </div>
    </GenericPage>
  );
};

export default DepartmentTemplate;


