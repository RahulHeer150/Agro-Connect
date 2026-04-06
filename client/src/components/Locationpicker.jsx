import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";

// 🌾 Custom Marker Icon
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

// 📍 Component to handle map click
const MapClickHandler = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
};

const LocationPicker = ({ onSelect }) => {
  const [position, setPosition] = useState(null);
  const [center, setCenter] = useState([30.7333, 76.7794]); // default

  // 🔥 Auto-detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCenter([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          console.log("Location permission denied");
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-[400px]">
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full rounded-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler setPosition={setPosition} />

        {position && (
          <Marker
            position={position}
            icon={markerIcon}
            draggable={true} // ✅ draggable marker
            eventHandlers={{
              dragend: (e) => {
                const newPos = e.target.getLatLng();
                setPosition(newPos);
              },
            }}
          />
        )}
      </MapContainer>

      {position && (
        <button
          onClick={() => onSelect(position)}
          className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Save Selected Location
        </button>
      )}
    </div>
  );
};

export default LocationPicker;