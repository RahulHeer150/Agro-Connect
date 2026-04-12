const FarmerPopup = ({ farmer }) => {
  return (
    <div className="text-sm space-y-1">
      <h3 className="font-semibold text-lg text-green-700">
        {farmer.name}
      </h3>

      <p className="text-gray-600">
        Products: {farmer.products?.length || 0}
      </p>

      {farmer.distance && (
        <p className="text-green-600 font-medium">

            //add location icon here
         {farmer.distance.toFixed(2)} km away
        </p>
      )}
    </div>
  );
};

export default FarmerPopup;

