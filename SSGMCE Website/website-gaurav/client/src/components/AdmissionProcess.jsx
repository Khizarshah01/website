import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AdmissionProcess Component
 * Displays admission process steps in an accordion format
 */
const AdmissionProcess = ({ steps, title, timeline = true }) => {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">
          Click on each step to view detailed information
        </p>
      </div>

      {/* Steps List */}
      <div className="p-6 space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-ssgmce-orange transition-all duration-300"
          >
            {/* Step Header - Always Visible */}
            <div
              onClick={() => toggleStep(index)}
              className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Step Number */}
                <div className="w-12 h-12 bg-gradient-to-br from-ssgmce-blue to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                  {step.step}
                </div>

                {/* Step Title */}
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-ssgmce-blue">
                    {step.title}
                  </h4>
                  {timeline && step.timeline && (
                    <p className="text-xs text-ssgmce-orange font-semibold mt-1">
                      ⏱ {step.timeline}
                    </p>
                  )}
                </div>
              </div>

              {/* Expand/Collapse Icon */}
              <div className="flex-shrink-0 text-ssgmce-blue">
                {expandedStep === index ? (
                  <FaChevronUp className="text-xl" />
                ) : (
                  <FaChevronDown className="text-xl" />
                )}
              </div>
            </div>

            {/* Step Content - Collapsible */}
            <AnimatePresence>
              {expandedStep === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-white border-t-2 border-gray-200">
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Timeline Visual (Optional Bottom Section) */}
      {timeline && (
        <div className="bg-blue-50 p-6 border-t-2 border-ssgmce-blue">
          <p className="text-sm text-gray-700 text-center">
            <strong className="text-ssgmce-blue">Important:</strong> Please
            follow all steps carefully and adhere to the timelines mentioned.
            Late submissions may not be accepted.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdmissionProcess;
