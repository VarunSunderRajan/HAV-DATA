import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
// import './SalesMap.css'; // Assuming you have some CSS for the tooltip
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const SalesMap = () => {
  const { brandOrProduct } = useParams();
  const [salesData, setSalesData] = useState([]);
  const [locationData, setLocationData] = useState([]);



  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/sales');
        const data = await response.json();
        const filteredData = data.filter(item => item.productname === brandOrProduct);
        setSalesData(filteredData);
        console.log('Filtered sales data:', filteredData); // Log the filtered sales data
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    const fetchLocationData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/locations');
        const data = await response.json();
        setLocationData(data);
        console.log('Location data:', data); // Log the location data
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };




    fetchSalesData();
    fetchLocationData();
  }, [brandOrProduct]);

// Function to initialize the map
  useEffect(() => {
    if (locationData.length > 0) {
      // Find the midpoint of all locations to set the map center
      const midLat = locationData.reduce((acc, loc) => acc + parseFloat(loc.latitude), 0) / locationData.length;
      const midLon = locationData.reduce((acc, loc) => acc + parseFloat(loc.longitude), 0) / locationData.length;
      // Aggregate sales per location
      const salesPerLocation = locationData.map(location => {
      const salesAtLocation = salesData.filter(sale => sale.locationid === location.locationid);
      const totalSales = salesAtLocation.reduce((acc, curr) => acc + curr.quantitysold, 0);
      return { ...location, totalSales };
      });

      // Initialize the Leaflet map
      const map = L.map('map').setView([midLat, midLon], 13); // Set to the midpoint

      // Correctly setting the Leaflet default icon options
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
      });
      
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      salesPerLocation.forEach((location) => {
      if (location.latitude && location.longitude) {
      const bubbleIcon = L.divIcon({
        className: 'custom-bubble',
        iconSize: L.point(20, 20), // Adjust size as needed
        html: `<div style="width: 20px; height: 20px; background-color: red; border-radius: 50%;"></div>`
      });
    const marker = L.marker([location.latitude, location.longitude], { icon: bubbleIcon }).addTo(map);
    marker.bindTooltip(`Total Sales: ${location.totalSales}`, { permanent: false, offset: L.point(0, -20) });
  }
});

      // Ensure the map shows all markers
      const group = new L.featureGroup(locationData.map((location) => L.marker([location.latitude, location.longitude])));
      map.fitBounds(group.getBounds().pad(0.5)); // Adds padding around the bounds

      // Cleanup function to remove the map when the component unmounts
      return () => {
        map.remove();
      };
    }
  }, [locationData]);

  return <div id="map" className="h-full w-full"></div>;
};

// function addD3Bubbles(map, locationData, salesData, brandOrProduct) {
//   // Calculate total sales per location
//   const salesPerLocation = locationData.map(location => {
//     const salesAtLocation = salesData.filter(sale => sale.locationid === location.locationid);
//     const totalSales = salesAtLocation.reduce((acc, curr) => acc + curr.quantitysold, 0);
//     return { ...location, totalSales };
//   });

//   // Create an SVG overlay
//   const svgLayer = L.svg().addTo(map);
//   const svg = d3.select(svgLayer._container).select('svg');

//   // Create bubbles
//   const bubbles = svg.selectAll('circle')
//     .data(salesPerLocation)
//     .enter()
//     .append('circle')
//     .attr('cx', d => map.latLngToLayerPoint(new L.LatLng(d.latitude, d.longitude)).x)
//     .attr('cy', d => map.latLngToLayerPoint(new L.LatLng(d.latitude, d.longitude)).y)
//     .attr('r', d => Math.sqrt(d.totalSales)) // Adjust this to scale the bubbles appropriately
//     .attr('fill', 'blue') // You can adjust the color
//     .attr('fill-opacity', 0.5)
//     .attr('stroke', 'black')
//     .attr('stroke-width', 1);

//   // Update bubbles on map move
//   map.on('moveend', updateBubbles);
//   function updateBubbles() {
//     bubbles
//       .attr('cx', d => map.latLngToLayerPoint(new L.LatLng(d.latitude, d.longitude)).x)
//       .attr('cy', d => map.latLngToLayerPoint(new L.LatLng(d.latitude, d.longitude)).y);
//   }

//   // Add interactivity (tooltips)
//   bubbles.on('mouseover', (event, d) => {
//     // Logic for showing tooltip (e.g., with total sales info)
//     // You can use D3 or a custom div element for the tooltip
//   })
//   .on('mouseout', (event, d) => {
//     // Logic for hiding tooltip
//   });
// }


export default SalesMap;