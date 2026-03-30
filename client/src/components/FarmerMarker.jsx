import { Marker, Popup } from "react-leaflet";
import FarmerPopup from "./FarmerPopup";

const FarmerMarker = ({ farmer }) => {
  const [lng, lat] = farmer.location.coordinates;

  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <FarmerPopup farmer={farmer} />
      </Popup>
    </Marker>
  );
};

export default FarmerMarker;