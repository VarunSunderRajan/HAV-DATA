import React from 'react';

const HoverDataDisplay = ({ hoverData }) => {
  if (!hoverData) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/4 mx-auto">
      <p>{hoverData.name}</p>
      <p>{hoverData.value}</p>
      <p>{hoverData.insight}</p>
      {/* Add more details to this card as needed */}
    </div>
  );
};

export default HoverDataDisplay;
