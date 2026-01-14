import React from "react";

const EmptyState = ({ message }) => {
  return (
    <div className="bg-white p-10 rounded-xl shadow-sm text-center">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;
