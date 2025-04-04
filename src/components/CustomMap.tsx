import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define custom marker icon
const customIcon = new L.Icon({
  iconUrl: "/crane2.png", // Red dot icon
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -24],
});

const hazardZones = [
  { lat: 30.76926, lng: 76.57642, radius: 200 },
];

const CustomMap = () => {
  return (
    <MapContainer
      center={[30.76926, 76.57642]}
      zoom={16}
      style={{ height: "100%", width: "100%", borderRadius: "10px", }}
      
    >
      {/* OpenStreetMap Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
      />

      {/* Custom Marker */}
      <Marker position={[30.76926, 76.57642]} icon={customIcon}>
        <Popup>Construction Site</Popup>
      </Marker>

      {/* Red Hazard Zones */}
      {hazardZones.map((zone, index) => (
        <Circle
          key={index}
          center={[zone.lat, zone.lng]}
          radius={zone.radius}
          pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.3 }}
        />
      ))}
    </MapContainer>
  );
};

export default CustomMap;
