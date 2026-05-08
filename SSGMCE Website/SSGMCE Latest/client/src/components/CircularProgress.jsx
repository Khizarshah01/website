/**
 * CircularProgress Component
 * SVG-based circular progress with percentage display
 */
const CircularProgress = ({
  value = 0,
  maxValue = 100,
  size = 120,
  strokeWidth = 10,
  color = "#f97316",
  bgColor = "#e5e7eb",
  showLabel = true,
  label = ""
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">
            {value.toFixed(1)}
          </span>
          {label && (
            <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
