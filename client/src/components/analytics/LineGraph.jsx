import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { getAuth } from 'firebase/auth';

const LineGraph = ({ width, height }) => {
  const [lineData, setLineData] = useState({});
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchData() {
      try {
        const encodedUsername = encodeURIComponent(user.email);
        const response = await fetch(`http://localhost:3001/api/sales?username=${encodedUsername}`);
        const salesData = await response.json();

        // Group sales data by location
        const dataByLocation = salesData.reduce((acc, item) => {
          const location = item.location;
          const date = item.salesdate.split('T')[0]; // Use only date part

          if (!acc[location]) {
            acc[location] = {};
          }
          if (!acc[location][date]) {
            acc[location][date] = 0;
          }
          acc[location][date] += parseFloat(item.grosssales);

          return acc;
        }, {});

        // Generate labels (unique dates)
        const labels = Array.from(new Set(salesData.map(s => s.salesdate.split('T')[0]))).sort();

        // Prepare datasets
        const datasets = Object.keys(dataByLocation).map(location => {
          const color = getRandomColor();
          return {
            label: location,
            data: labels.map(date => dataByLocation[location][date] || 0),
            fill: false,
            borderColor: color,
            backgroundColor: color,
          };
        });

        setLineData({
          labels,
          datasets
        });

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  // Random color generator for the line graph
  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Options for the chart
  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: width, height: height }}>
      {lineData && lineData.datasets && lineData.datasets.length > 0 ? (
        <Line data={lineData} options={chartOptions} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default LineGraph;
