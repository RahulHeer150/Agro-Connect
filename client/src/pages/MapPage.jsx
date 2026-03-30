import { useEffect, useState } from "react";
import useUserLocation from "../../hooks/useUserLocation";
import { getNearbyFarmers } from "../../services/mapService";

import MapContainer from "../../components/Map/MapContainer";
import LocationButton from "../../components/Map/LocationButton";
import DistanceFilter from "../../components/Map/DistanceFilter";

const MapPage = () => {
  const { location, getLocation } = useUserLocation();

  const [farmers, setFarmers] = useState([]);
  const [distance, setDistance] = useState(30);
  const [loading, setLoading] = useState(false);

  // Fetch farmers when location or distance changes
  useEffect(() => {
    if (location) {
      fetchFarmers();
    }
  }, [location, distance]);

  const fetchFarmers = async () => {
    try {
      setLoading(true);

      const res = await getNearbyFarmers(
        location.lat,
        location.lng,
        distance
      );

      // assuming backend returns { success, data }
      setFarmers(res.data);
    } catch (error) {
      console.error("Error fetching farmers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        🌾 Nearby Farmers
      </h2>

      {/* Map Section */}
      <div className="relative">
        {/* Map */}
        <MapContainer location={location} farmers={farmers} />

        {/* Floating Control Panel */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl space-y-3 z-[1000] border border-gray-200">
          <LocationButton onClick={getLocation} />
          <DistanceFilter
            distance={distance}
            setDistance={setDistance}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500 mt-4 animate-pulse">
          Fetching nearby farmers...
        </p>
      )}

      {/* Empty State */}
      {!loading && location && farmers.length === 0 && (
        <p className="text-center text-gray-400 mt-4">
          No farmers found in this area 🌍
        </p>
      )}
    </div>
  );
};

export default MapPage;