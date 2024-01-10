import React from 'react';
import { useParams } from 'react-router-dom';
import LineGraph from '../components/productdashboard/SalesLineGraph';
import SalesMap from '../components/productdashboard/SalesMap';
import ComparisonChart from '../components/productdashboard/ComparisonChart';
// Uncomment these imports if the components are ready
import InformationTable from '../components/productdashboard/InformationTable';

import Header from '../components/home/Header';


const ProductDashboard = () => {
  const { brandOrProduct } = useParams();
  console.log('Received brandOrProduct:', brandOrProduct);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <Header/>
      <div className="bg-gray-100 p-4">
        <h1 className="text-center text-xl font-semibold">Dashboard for {brandOrProduct}</h1>
      </div>
      <div className="flex-grow overflow-auto">
        {/* Divide the remaining space into four equal quadrants */}
        <div className="flex flex-wrap w-full h-full">
          <div className="w-full md:w-1/2 p-4 flex flex-col">
            <div className="flex-grow group bg-white shadow rounded-lg p-4 transition-shadow hover:shadow-xl flex justify-center items-center">
              <LineGraph />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 flex flex-col">
            <div className="flex-grow group bg-white shadow rounded-lg p-4 transition-shadow hover:shadow-xl flex justify-center items-center">
              <SalesMap />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 flex flex-col">
            <div className="flex-grow group bg-white shadow rounded-lg p-4 transition-shadow hover:shadow-xl flex justify-center items-center">
              <ComparisonChart />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 flex flex-col">
            <div className="flex-grow group bg-white shadow rounded-lg p-4 transition-shadow hover:shadow-xl flex justify-center items-center">
              <InformationTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;