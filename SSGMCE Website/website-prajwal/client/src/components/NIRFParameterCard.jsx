import { useState } from "react";
import CircularProgress from "./CircularProgress";
import { FaInfoCircle } from "react-icons/fa";

// Parameter definitions with colors and descriptions
const PARAMETER_INFO = {
  tlr: {
    name: "TLR",
    fullName: "Teaching, Learning & Resources",
    color: "#3b82f6",
    description: "Measures student strength, faculty quality, financial resources, and learning environment"
  },
  rp: {
    name: "RP",
    fullName: "Research & Professional Practice",
    color: "#8b5cf6",
    description: "Evaluates research publications, IPR, patents, and funded projects"
  },
  go: {
    name: "GO",
    fullName: "Graduation Outcomes",
    color: "#22c55e",
    description: "Measures placement rates, higher studies enrollment, and median salary"
  },
  oi: {
    name: "OI",
    fullName: "Outreach & Inclusivity",
    color: "#f97316",
    description: "Assesses regional diversity, women participation, and economically backward students"
  },
  pr: {
    name: "PR",
    fullName: "Perception",
    color: "#ef4444",
    description: "Based on peer perception, employer perception, and academic reputation"
  }
};

/**
 * NIRFParameterCard Component
 * Card with circular progress, parameter name, and tooltip
 */
const NIRFParameterCard = ({ paramCode, score, maxScore = 100 }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const param = PARAMETER_INFO[paramCode] || {
    name: paramCode.toUpperCase(),
    fullName: paramCode,
    color: "#6b7280",
    description: "NIRF Parameter"
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-10">
          <p className="font-semibold mb-1">{param.fullName}</p>
          <p className="text-gray-300">{param.description}</p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-3 h-3 bg-gray-900 rotate-45"></div>
        </div>
      )}

      {/* Circular Progress */}
      <div className="mb-4 flex justify-center">
        <CircularProgress
          value={score}
          maxValue={maxScore}
          size={100}
          strokeWidth={8}
          color={param.color}
          label="/ 100"
        />
      </div>

      {/* Parameter Name */}
      <h3 className="text-lg font-bold text-gray-800 flex items-center justify-center gap-2">
        {param.name}
        <FaInfoCircle className="text-gray-400 text-sm cursor-help" />
      </h3>
      <p className="text-sm text-gray-500 mt-1">{param.fullName}</p>
    </div>
  );
};

export default NIRFParameterCard;
export { PARAMETER_INFO };
