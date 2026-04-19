import { MapPin, Sprout, ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";


const FarmerPopup = ({ farmer }) => {

  const navigate = useNavigate();
  return (
    <div className="text-sm space-y-2 min-w-[180px]">

      {/* Farmer name */}
      <h3
  onClick={() => navigate(`/farmer/${farmer._id}`)}
  className="cursor-pointer text-green-700 font-bold"
>
  {farmer.name}
</h3>

      {/* Farm name if available */}
      {farmer.farmDetails?.farmName && (
        <p className="flex items-center gap-1 text-green-500 text-xs">
          <Sprout size={12} />
          {farmer.farmDetails.farmName}
        </p>
      )}

      {/* Product count */}
      <p className="flex items-center gap-1 text-gray-600">
        <ShoppingBasket size={13} />
        {farmer.productCount ?? 0} product
        {farmer.productCount !== 1 ? "s" : ""} available
      </p>

      {/* Product list (up to 3) */}
      {farmer.products?.length > 0 && (
        <ul className="text-xs text-gray-500 space-y-0.5 pl-1">
          {farmer.products.slice(0, 3).map((p) => (
            <li key={p._id} className="flex justify-between gap-2">
              <span>• {p.name}</span>
              <span className="text-green-600 font-medium">
                ₹{p.price}/{p.unit}
              </span>
            </li>
          ))}
          {farmer.products.length > 3 && (
            <li className="text-gray-400 italic">
              +{farmer.products.length - 3} more...
            </li>
          )}
        </ul>
      )}

      {/* Distance */}
      {farmer.distance != null && (
        <p className="flex items-center gap-1 text-green-600 font-medium pt-1
                      border-t border-gray-100">
          <MapPin size={13} />
          {farmer.distance.toFixed(2)} km away
        </p>
      )}
    </div>
  );
};

export default FarmerPopup;