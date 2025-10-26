import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceTrendChart = ({ priceData, predictions }) => {
  const { t } = useTranslation();

  if (!priceData || priceData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const labels = priceData.map(item => 
    new Date(item.date).toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric' 
    })
  );

  const nizamabadData = priceData.map(item => item.nizamabad);
  const hyderabadData = priceData.map(item => item.hyderabad);
  const mumbaiData = priceData.map(item => item.mumbai);

  // Add prediction data if available
  let predictionLabels = [];
  let predictionData = [];
  if (predictions && predictions.length > 0) {
    predictionLabels = predictions.map(item => 
      new Date(item.date).toLocaleDateString('en-IN', { 
        month: 'short', 
        day: 'numeric' 
      })
    );
    predictionData = predictions.map(item => item.predictedPrice);
  }

  const data = {
    labels: [...labels, ...predictionLabels],
    datasets: [
      {
        label: 'Nizamabad',
        data: [...nizamabadData, ...predictionData],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Hyderabad',
        data: [...hyderabadData, ...new Array(predictionData.length).fill(null)],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Mumbai',
        data: [...mumbaiData, ...new Array(predictionData.length).fill(null)],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: t('priceTrend'),
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}/kg`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          },
          callback: function(value) {
            return `₹${value.toLocaleString()}`;
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      point: {
        hoverBackgroundColor: 'white',
        hoverBorderWidth: 2
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
      
      {predictions && predictions.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-blue-700 font-medium">
              AI Prediction (Next 7 Days)
            </span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Based on historical data and market trends
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceTrendChart;
