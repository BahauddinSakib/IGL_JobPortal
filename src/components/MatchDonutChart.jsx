// src/components/MatchDonutChart.jsx
'use client';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const MatchDonutChart = ({ score = 0, size = 80 }) => {
  // Ensure score is between 0-100
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  const remaining = 100 - normalizedScore;

  const chartData = {
    datasets: [
      {
        data: [normalizedScore, remaining],
        backgroundColor: [
          getScoreColor(normalizedScore),
          '#f3f4f6'
        ],
        borderWidth: 0,
        cutout: '70%'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    cutout: '70%'
  };

  // Get color based on score
  function getScoreColor(score) {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#3b82f6'; // Blue
    if (score >= 40) return '#f59e0b'; // Yellow
    if (score > 0) return '#ef4444';   // Red
    return '#6b7280'; // Gray for 0%
  }

  return (
    <div className="position-relative" style={{ width: size, height: size }}>
      <Doughnut data={chartData} options={chartOptions} />
      
      {/* Center percentage */}
      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <div 
          className="fw-bold" 
          style={{ 
            color: getScoreColor(normalizedScore),
            fontSize: size * 0.2,
            lineHeight: 1
          }}
        >
          {normalizedScore}%
        </div>
      </div>
    </div>
  );
};

export default MatchDonutChart;