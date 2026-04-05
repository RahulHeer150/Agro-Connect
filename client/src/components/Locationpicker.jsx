import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

const LocationMarker = ({ setPosition }) => {
  const [position, setLocalPosition] = useState(null);

  useMapEvents({
    click(e) {
      setLocalPosition(e.latlng);
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const Locationpicker = ({ onSelect }) => {
  const [position, setPosition] = useState(null);

  return (
    <div className="w-full h-[400px]">
      <MapContainer
        center={[30.7333, 76.7794]} // default (can improve later)
        zoom={13}
        className="w-full h-full rounded-lg"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker setPosition={setPosition} />
      </MapContainer>

      {position && (
        <button
          onClick={() => onSelect(position)}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Save Selected Location
        </button>
      )}
    </div>
  );
};

export default Locationpicker;