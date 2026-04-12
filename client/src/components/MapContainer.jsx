import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FarmerMarker from "./FarmerMarker";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapContainer = ({ location, farmers }) => {
  if (!location || !location.lat || !location.lng) {
    return (
      <p className="text-center mt-10 text-gray-400">
        Please enable location to view map 📍
      </p>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg mt-5">
      <LeafletMap
        center={[location.lat, location.lng]}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {farmers?.map((farmer) => (
          <FarmerMarker key={farmer._id} farmer={farmer} />
        ))}
      </LeafletMap>
    </div>
  );
};

export default MapContainer;