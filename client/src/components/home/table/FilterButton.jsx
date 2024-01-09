import React, { useState } from 'react';

const FilterButton = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (column) => {
    onSort(column);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-right ml-auto mb-4">
      <button
        type="button"
        className="inline-flex justify-center items-center p-2 border border-gray-300 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Filter
      </button>
      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              onClick={() => handleOptionClick('date')}
            >
              Sort by Date
            </div>
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              onClick={() => handleOptionClick('grosssales')}
            >
              Sort by Gross Sales
            </div>
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              onClick={() => handleOptionClick('quantitysold')}
            >
              Sort by Quantity Sold
            </div>
            {/* Add more options as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
