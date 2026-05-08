import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { PARAMETER_INFO } from "./NIRFParameterCard";

// Register Chart.js components
Chart.register(...registerables);

/**
 * NIRFChart Component
 * Bar/Line chart comparing NIRF parameters across years
 */
const NIRFChart = ({ data = [], chartType = "bar" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    // Prepare data
    const labels = data.map(item => item.year);

    const datasets = [
      {
        label: "TLR",
        data: data.map(item => item.parameters?.tlr || 0),
        backgroundColor: PARAMETER_INFO.tlr.color,
        borderColor: PARAMETER_INFO.tlr.color,
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: "RP",
        data: data.map(item => item.parameters?.rp || 0),
        backgroundColor: PARAMETER_INFO.rp.color,
        borderColor: PARAMETER_INFO.rp.color,
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: "GO",
        data: data.map(item => item.parameters?.go || 0),
        backgroundColor: PARAMETER_INFO.go.color,
        borderColor: PARAMETER_INFO.go.color,
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: "OI",
        data: data.map(item => item.parameters?.oi || 0),
        backgroundColor: PARAMETER_INFO.oi.color,
        borderColor: PARAMETER_INFO.oi.color,
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: "PR",
        data: data.map(item => item.parameters?.pr || 0),
        backgroundColor: PARAMETER_INFO.pr.color,
        borderColor: PARAMETER_INFO.pr.color,
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ];

    chartInstance.current = new Chart(ctx, {
      type: chartType,
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              padding: 20,
              font: { size: 12, family: "'Inter', sans-serif" }
            }
          },
          title: {
            display: true,
            text: "NIRF Parameter Trends Over Years",
            font: { size: 16, weight: "bold", family: "'Inter', sans-serif" },
            padding: { bottom: 20 }
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: "rgba(0, 0, 0, 0.05)" },
            ticks: {
              font: { size: 11 },
              callback: (value) => value + ""
            }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 12, weight: "bold" } }
          }
        },
        interaction: {
          intersect: false,
          mode: "index"
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, chartType]);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500">No data available for chart</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default NIRFChart;
