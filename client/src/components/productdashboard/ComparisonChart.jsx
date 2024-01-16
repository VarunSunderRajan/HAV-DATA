import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as d3 from 'd3';
import arrowDownSvg from '../../assets/svg/arrow-down.svg';

const ComparisonChart = () => {
  const { brandOrProduct } = useParams();
  const [pieData, setPieData] = useState([]);
  const [displayData, setDisplayData] = useState('grosssales'); // New state to track display data type
  const [hoverData, setHoverData] = useState(null);
  
// Function to generate insights based on hover data
  const generateInsights = (name, percentage) => {
    let insight;
    if (name === 'Selected Product') {
      insight = `This product has a ${percentage.toFixed(2)}% share of the market.`;
    } else {
      insight = `All other products combined have a ${percentage.toFixed(2)}% share of the market.`;
    }
    return insight;
  };

  // Function to toggle display data
  const toggleDisplayData = () => {
    setDisplayData(prevDisplayData => prevDisplayData === 'grosssales' ? 'quantitysold' : 'grosssales');
  };

  useEffect(() => {
  async function fetchData() {
    try {
      const salesResponse = await fetch(`http://localhost:3001/api/allsales`);
      const salesData = await salesResponse.json();
      const productData = salesData.find(item => item.productname === brandOrProduct);

      if (!productData) {
        console.error('Product not found');
        return;
      }

      const productClassification = productData.speccategory;
      const filteredData = salesData.filter(item => item.speccategory === productClassification);

      // Decide which metric to use for the pie chart (gross sales or quantity sold)
      const metric = displayData === 'grosssales' ? 'grosssales' : 'quantitysold';

      // Calculate the total for the selected metric
      const totalMarketMetric = filteredData.reduce((acc, curr) => acc + parseFloat(curr[metric]), 0);
      const productMetric = filteredData.filter(item => item.productname === brandOrProduct)
                                         .reduce((acc, curr) => acc + parseFloat(curr[metric]), 0);

      // Prepare pie chart data
      setPieData([
        { name: 'Selected Product', value: productMetric },
        { name: 'Other Products', value: totalMarketMetric - productMetric },
      ]);
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
    }
  }

  fetchData();
}, [brandOrProduct, displayData]);


  useEffect(() => {
  if (pieData.length > 0) {
    const chart = d3.select("#pie-chart");
    chart.selectAll("*").remove(); // Clear any existing content

    const width = 450;
    const height = 450;
    const radius = Math.min(width, height) / 2;

    const svg = chart
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(["#4e79a7", "#f28e2c"]); // Aesthetic color palette

    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(pieData);

    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius); // Slightly smaller inner radius for aesthetic donut shape

    const arcHover = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 1.1); // Larger outer radius on hover

    // Tooltips
    const tooltip = d3.select("body").append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "10px")
      .style("background", "rgba(255, 255, 255, 0.9)")
      .style("border-radius", "4px")
      .style("color", "#000")
      .text("");
    const totalValue = pieData.reduce((acc, entry) => acc + entry.value, 0); // Calculate the total value once for use in percentage calculations
    // Append arcs with updated onMouseover event
      const slices = svg.selectAll('path')
        .data(pie(pieData))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.name))
        .style("opacity", 0.7)
        .on("mouseover", (event, d) => {
          d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .attr("d", arcHover);

          const percentage = ((d.data.value / totalValue) * 100).toFixed(2); // Correct percentage calculation

          setHoverData({
            name: d.data.name,
            value: displayData === 'grosssales' ? `$${d.data.value.toFixed(2)}` : d.data.value.toString(),
            insight: `${d.data.name}: ${percentage}% of the market.`
          });

        //   tooltip.text(`${d.data.name}: ${displayData === 'grosssales' ? `$${d.data.value.toFixed(2)}` : d.data.value} (${percentage}%)`);
        //   return tooltip.style("visibility", "visible");
        })
        
      .on("mousemove", (event) => {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", (event, d) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr("d", arc);
        // return tooltip.style("visibility", "hidden");
        setHoverData(null);
      });

    // Add labels or additional features here if needed
  }
}, [pieData, displayData]);



  return (
    <div className="relative w-full h-full">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg">{displayData === 'grosssales' ? 'Gross Sales' : 'Quantity Sold'} Comparison</h2>
        <button
          className="bg-blue-500 p-1 rounded inline-flex items-center justify-center group-hover:bg-blue-600 transition-colors"
          onClick={toggleDisplayData}
        >
          <img src={arrowDownSvg} alt="Toggle Data Display" className="w-4 h-4" />
        </button>
      </div>
      <div id="pie-chart" className="w-full style={{ height: '50%' }}"></div>
      {hoverData && (
        <div className="absolute top-[5rem] left-0 right-0 mx-auto bg-white p-4 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/4">
          <p>{hoverData.name}</p>
          <p>{hoverData.value}</p>
          <p>{hoverData.insight}</p>
          {/* Add more details to this card as needed */}
        </div>
      )}
    </div>
  );
};

export default ComparisonChart;
