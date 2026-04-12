import { MapPin } from "lucide-react";

const FarmerPopup = ({ farmer }) => {
  return (
    <div className="text-sm space-y-1 min-w-[160px]">
      <h3 className="font-semibold text-lg text-green-700">
        {farmer.name}
      </h3>

      <p className="text-gray-600">
        Products: {farmer.products?.length || 0}
      </p>

      {farmer.distance && (
        <p className="flex items-center gap-1 text-green-600 font-medium">
          <MapPin size={14} />
          {farmer.distance.toFixed(2)} km away
        </p>
      )}
    </div>
  );
};

export default FarmerPopup;