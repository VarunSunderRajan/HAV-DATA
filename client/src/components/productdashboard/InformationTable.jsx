// InformationTable.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const InformationTable = () => {
  const { brandOrProduct } = useParams();
  const [salesData, setSalesData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [mostSoldLocation, setMostSoldLocation] = useState('');

  useEffect(() => {
    async function fetchSalesAndLocationData() {
      try {
        // Fetch sales data
        const salesResponse = await fetch(`http://localhost:3002/api/sales`);
        const sales = await salesResponse.json();
        const productSales = sales.filter(item => item.productname === brandOrProduct);
        setSalesData(productSales);

        // Fetch location data
        const locationsResponse = await fetch(`http://localhost:3002/api/locations`);
        const locations = await locationsResponse.json();
        setLocationData(locations);

        // Calculate the most sold location
        const salesByLocation = productSales.reduce((acc, sale) => {
          acc[sale.locationid] = (acc[sale.locationid] || 0) + parseInt(sale.quantitysold, 10);
          return acc;
        }, {});

        const mostSoldLocationId = Object.keys(salesByLocation).reduce((a, b) => salesByLocation[a] > salesByLocation[b] ? a : b);
        const mostSoldLocationName = locations.find(loc => loc.locationid.toString() === mostSoldLocationId).locationname;
        setMostSoldLocation(mostSoldLocationName);

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchSalesAndLocationData();
  }, [brandOrProduct]);

  return (
    <div className="w-full h-full overflow-x-auto relative shadow-md sm:rounded-lg">
      {salesData.length > 0 ? (
        <table className="min-w-full text-sm text-left text-gray-500">
          <tbody>
            <tr className="bg-white border-b">
              <th className="py-4 px-6 bg-gray-50">Product Name</th>
              <td className="py-4 px-6">{salesData[0].productname}</td>
            </tr>
            <tr className="bg-white border-b">
              <th className="py-4 px-6 bg-gray-50">Brand</th>
              <td className="py-4 px-6">{salesData[0].brand}</td>
            </tr>
            <tr className="bg-white border-b">
              <th className="py-4 px-6 bg-gray-50">Gross Sales</th>
              <td className="py-4 px-6">{salesData[0].grosssales}</td>
            </tr>
            <tr className="bg-white border-b">
              <th className="py-4 px-6 bg-gray-50">Category</th>
              <td className="py-4 px-6">{salesData[0].classification}</td>
            </tr>
            <tr className="bg-white border-b">
              <th className="py-4 px-6 bg-gray-50">SKU</th>
              <td className="py-4 px-6">{salesData[0].sku}</td>
            </tr>
            <tr className="bg-white border-b">
              <th className="py-4 px-6 bg-gray-50">Most Sold At</th>
              <td className="py-4 px-6">{mostSoldLocation}</td>
            </tr>
            <tr className="bg-white border-b">
              <th className="py-4 px-6 bg-gray-50">Sales Date</th>
              <td className="py-4 px-6">{new Date(salesData[0].salesdate).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-center py-4">No sales data available.</p>
      )}
    </div>
  );
};


export default InformationTable;
