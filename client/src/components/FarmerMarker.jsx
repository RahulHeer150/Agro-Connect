import { Marker, Popup } from "react-leaflet";
import FarmerPopup from "./FarmerPopup";

const farmerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2909/2909768.png",
  iconSize: [35, 35],
});

const FarmerMarker = ({ farmer }) => {
  const [lng, lat] = farmer.location.coordinates;

  return (
    <Marker position={[lat, lng]} icon={farmerIcon}>
      <Popup>
        <FarmerPopup farmer={farmer} />
      </Popup>
    </Marker>
  );
};

export default FarmerMarker;