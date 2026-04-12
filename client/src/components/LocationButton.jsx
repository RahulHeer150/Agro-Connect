import { Locate } from "lucide-react";

const LocationButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700
                 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
    >
      <Locate size={16} />
      Use My Location
    </button>
  );
};

export default LocationButton;