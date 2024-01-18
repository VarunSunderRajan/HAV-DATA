import React from 'react';
import Header from '../components/home/Header';
import { format } from 'date-fns';

const Reports = () => {
  const handleDownloadReport = () => {
    // Calculate the date range for the report
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Assuming you want the report for the last 7 days

    // Format dates to DD/MM/YYYY
    const formattedStartDate = format(startDate, 'dd/MM/yyyy');
    const formattedEndDate = format(endDate, 'dd/MM/yyyy');

    // Create the download link
    const link = document.createElement('a');
    link.href = '/Template report.pdf'; // Update the path if necessary
    link.download = `Report for: ${formattedStartDate} - ${formattedEndDate}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Header />
      <div className='flex justify-center items-center h-screen'>
        <button
          onClick={handleDownloadReport}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Download Report for: {format(new Date(), 'dd/MM/yyyy')} - {format(new Date(), 'dd/MM/yyyy')}
        </button>
      </div>
    </div>
  );
};

export default Reports;
