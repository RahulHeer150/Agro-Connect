import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import FarmerMarker from "./FarmerMarker";

const MapContainer = ({ location, farmers }) => {
  // 🔥 Prevent crash
  if (!location || !location.lat || !location.lng) {
    return (
      <p className="text-center mt-10 text-gray-400">
        Please enable location to view map 
      </p>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg mt-5">
      <LeafletMap
        center={[location.lat, location.lng]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🔥 Safe mapping */}
        {farmers?.length > 0 &&
          farmers.map((farmer) => (
            <FarmerMarker key={farmer._id} farmer={farmer} />
          ))}
      </LeafletMap>
    </div>
  );
};

export default MapContainer;