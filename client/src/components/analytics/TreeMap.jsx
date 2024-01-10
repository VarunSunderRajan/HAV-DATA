import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TreeMap = ({ width, height }) => {
  const ref = useRef();
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/sales')
      .then(response => response.json())
      .then(data => {
        setRawData(data);
        const hierarchyData = aggregateData(data);
        createTreeMap(ref.current, hierarchyData, width, height);
      })
      .catch(error => {
        console.error('Error fetching treemap data:', error);
      });
  }, [width, height]);

  const aggregateData = (data) => {
    const hierarchyData = { name: 'root', children: [] };
    const locationMap = new Map();

    data.forEach(d => {
      if (!locationMap.has(d.location)) {
        locationMap.set(d.location, { name: d.location, children: [] });
        hierarchyData.children.push(locationMap.get(d.location));
      }
      const locationNode = locationMap.get(d.location);
      const specCategoryNode = locationNode.children.find(c => c.name === d.speccategory);
      if (specCategoryNode) {
        specCategoryNode.value += parseFloat(d.grosssales);
      } else {
        locationNode.children.push({ name: d.speccategory, value: parseFloat(d.grosssales) });
      }
    });

    return hierarchyData;
  };

  const createTreeMap = (container, data, width, height) => {
    d3.select(container).selectAll("*").remove();

    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    d3.treemap()
      .size([width, height])
      .paddingTop(28)
      .paddingInner(3)
      (root);

    const svg = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height);

    const color = d3.scaleSequentialSqrt([0, d3.max(root.leaves(), d => d.value)], d3.interpolateBlues);

    const locationGroups = svg.selectAll("g")
      .data(root.children)
      .enter()
      .append("g")
      .attr("transform", d => `translate(0,${d.y0})`);

    locationGroups.append("text")
      .attr("x", 5)
      .attr("y", 20)
      .text(d => d.data.name)
      .attr("fill", "black")
      .style("font-size", "20px")
      .style("font-weight", "bold");

    const leaf = locationGroups.selectAll("g")
      .data(d => d.leaves())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x0},${d.y0 - d.parent.y0})`);

    leaf.append('rect')
      .attr('id', d => `leaf-${d.data.name}`)
      .attr('fill', d => color(d.value))
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    leaf.append("text")
      .attr("x", 5)
      .attr("y", 20)
      .text(d => d.data.name)
      .attr("fill", d => d.value > d3.max(root.leaves(), d => d.value) / 2 ? "white" : "black")
      .style("font-size", "12px")
      .style("word-wrap", "break-word");
  };

  const findHighestSaleProduct = (category, location) => {
    const filteredData = rawData.filter(d => d.speccategory === category && d.location === location);
    let maxSale = 0;
    let topProduct = {};

    filteredData.forEach(d => {
      if (d.grosssales > maxSale) {
        maxSale = d.grosssales;
        topProduct = { name: d.productname, value: d.grosssales };
      }
    });

    return topProduct;
  };

  const handleMouseOver = (event) => {
    const rect = d3.select(event.currentTarget).select('rect');
    rect.transition()
      .duration(300)
      .style('transform', 'scale(1.05)')
      .style('stroke-width', '3')
      .style('stroke', 'black');
  };

  const handleMouseOut = (event) => {
    const rect = d3.select(event.currentTarget).select('rect');
    rect.transition()
      .duration(300)
      .style('transform', 'scale(1)')
      .style('stroke-width', '0');
  };

  return <div ref={ref} />;
};





export default TreeMap;
