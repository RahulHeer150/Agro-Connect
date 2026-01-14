import React from "react";

const EarningsCard = ({ label, amount }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-green-700 mt-2">₹{amount}</p>
    </div>
  );
};

export default EarningsCard;
