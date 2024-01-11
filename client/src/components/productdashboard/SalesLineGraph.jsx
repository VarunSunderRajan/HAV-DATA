import React, { useEffect, useState } from 'react';
import { Line, Bar} from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import arrowDownSvg from '../../assets/svg/arrow-down.svg';

const SalesLineGraph = () => {
  const { brandOrProduct } = useParams();
  const [lineData, setLineData] = useState({});
  const [yAxisData, setYAxisData] = useState('grosssales'); // state to track Y-axis data type

  // Function to toggle Y-axis data
  const toggleYAxisData = () => {
    setYAxisData(prevYAxisData => prevYAxisData === 'grosssales' ? 'quantitysold' : 'grosssales');
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3002/api/sales`);
        const data = await response.json();
        const filteredData = data.filter(item => item.productname === brandOrProduct);
        const dates = filteredData.map(d => new Date(d.salesdate));
        const minDate = new Date(Math.min.apply(null, dates));
        const maxDate = new Date(Math.max.apply(null, dates));

        // Add margin to min and max dates
        minDate.setDate(minDate.getDate() - 5); // 5 days before the earliest date
        maxDate.setDate(maxDate.getDate() + 5); // 5 days after the latest date
        
        // Depending on yAxisData state, choose the appropriate data for the Y-axis
        const chartData = {
        labels: filteredData.map(d => new Date(d.salesdate).toLocaleDateString()),
        datasets: [
          {
            label: yAxisData === 'grosssales' ? `Gross Sales` : `Quantity Sold`,
            data: filteredData.map(d => ({
              x: new Date(d.salesdate).toLocaleDateString(),
              y: d[yAxisData],
              location: d.location // Include location
            })),
            fill: false,
            // borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            showLine: false,
            backgroundColor: 'rgb(54, 162, 235)', // Set the background color of the bars to blue
            borderColor: 'rgb(54, 162, 235)', // Set the border color of the bars to blue (if needed)
            borderWidth: 1, // Optional: if you want a border for the bars
          },
        ],
      };
        setLineData(chartData);

        chartOptions.scales.x = {
          type: 'time',
          time: {
            unit: 'day',
            min: minDate.toISOString().split('T')[0], // format as 'YYYY-MM-DD'
            max: maxDate.toISOString().split('T')[0],
          },
          ticks: {
            source: 'auto',
            autoSkip: true,
          },
        };
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
   
    fetchData();
  }, [brandOrProduct, yAxisData]); // Add yAxisData to the dependency array so the effect runs when it changes
  // Options for the chart
  const chartOptions = {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
    },
    tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            if (context.raw.location) {
              label += `\nLocation: ${context.raw.location}`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {},
    },
  };
  return (
    <div className="relative w-full h-full">
      {/* Adjust padding and margins as necessary using Tailwind classes */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg">{yAxisData === 'grosssales' ? 'Gross Sales' : 'Quantity Sold'} Over Time</h2>
        <button
          className="bg-blue-500 p-1 rounded inline-flex items-center justify-center group-hover:bg-blue-600 transition-colors"
          onClick={toggleYAxisData}
        >
          <img src={arrowDownSvg} alt="Toggle Y-Axis" className="w-4 h-4" />
        </button>
      </div>
      <div className="w-full h-full">
        {lineData && lineData.datasets && lineData.datasets.length > 0 ? (
          <Bar data={lineData} options={chartOptions} />
        ) : (
          <p>No data available for the selected brand or product.</p>
        )}
      </div>
    </div>
  );
};

export default SalesLineGraph;