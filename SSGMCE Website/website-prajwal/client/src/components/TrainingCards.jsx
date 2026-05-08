import React from 'react';
import { FaUserTie, FaBrain, FaLaptopCode, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TrainingCards = () => {
  const programs = [
    {
      title: "Aptitude Training",
      icon: <FaBrain className="text-4xl text-ssgmce-orange" />,
      description: "Rigorous training sessions on Quantitative Aptitude, Logical Reasoning, and Verbal Ability to clear screening tests."
    },
    {
      title: "Technical Preparation",
      icon: <FaLaptopCode className="text-4xl text-blue-500" />,
      description: "Hands-on coding workshops, hackathons, and domain-specific technical training sessions."
    },
    {
      title: "Soft Skills & GDP",
      icon: <FaUserTie className="text-4xl text-green-500" />,
      description: "Group Discussions, Personal Interviews, and communication skills enhancement workshops."
    },
    {
      title: "Industry Readiness",
      icon: <FaHandshake className="text-4xl text-purple-500" />,
      description: "Seminars by industry experts, corporate etiquette training, and mock interview drives."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-ssgmce-blue mb-4">Training Programs</h2>
        <div className="w-24 h-1 bg-ssgmce-orange mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-ssgmce-blue"
            >
              <div className="mb-4 flex justify-center">
                <div className="bg-gray-50 p-4 rounded-full">
                  {program.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-3">{program.title}</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {program.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingCards;
