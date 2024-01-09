import React, { useState } from 'react';
import CsvArrow from '../../../assets/svg/CsvArrow';


const DownloadButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className=" p-2 border border-gray-300 rounded-md cursor-pointer ml-2 mb-4"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CsvArrow />
      </button>
      {isHovered && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mb-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer" onClick={onClick}>
              Download a CSV
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
