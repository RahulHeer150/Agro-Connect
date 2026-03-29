import React from "react";

const Loader = ({ size = "medium" }) => {
  const sizes = {
    small: "w-5 h-5 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4",
  };

  return (
    <div className="flex justify-center items-center py-6">
      <div
        className={`animate-spin rounded-full border-green-700 border-t-transparent ${sizes[size]}`}
      ></div>
    </div>
  );
};

export default Loader;