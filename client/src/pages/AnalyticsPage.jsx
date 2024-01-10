import React from 'react';
import { useParams } from 'react-router-dom';
import TreeMap from '../components/analytics/TreeMap';
import LineGraph from '../components/analytics/LineGraph';
import Table from '../components/home/table/Table';

const AnalyticsPage = () => {
  const { brandOrProduct } = useParams();

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <header className="bg-gray-100 p-4">
        <h1 className="text-center text-xl font-semibold">Dashboard for {brandOrProduct}</h1>
      </header>
      <div className="flex-grow overflow-auto p-4">
        {/* Each child div now takes the full width */}
        <div className="mb-4 bg-white shadow rounded-lg p-4 transition-shadow hover:shadow-xl flex justify-center items-center">
          <TreeMap width={800} height={600} />
        </div>
        <div className="mb-4 bg-white shadow rounded-lg p-4 transition-shadow hover:shadow-xl flex justify-center items-center">
          {/* SalesMap component will go here */}
          <LineGraph width={800} height={600} />
        </div>
        <div className="mb-4 bg-white shadow rounded-lg p-4 transition-shadow hover:shadow-xl flex justify-center items-center">
            <Table/>
        </div>
        <div className="mb-4 bg-white shadow rounded-lg p-4 transition-shadow hover:shadow-xl flex justify-center items-center">
          {/* InformationTable component will go here */}
          <p>InformationTable Placeholder</p>
        </div>
      </div>
    </div>
  );
};


export default AnalyticsPage;