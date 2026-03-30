import React from 'react'

const DistanceFilter = ({ setDistance }) => {
  return (
    <div className="flex gap-3 mt-3">
      {[10, 30, 50].map((km) => (
        <button
          key={km}
          onClick={() => setDistance(km)}
         className={`px-4 py-1 rounded-full border transition ${
            distance === km
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-green-500 hover:text-white"
          }`}
        >
          {km} KM
        </button>
      ))}
    </div>
  );
};

export default DistanceFilter;