import React from 'react'

const LocationButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
    >
      📍 Use My Location
    </button>
  );
};

export default LocationButton;