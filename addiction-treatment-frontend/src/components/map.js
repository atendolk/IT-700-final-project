// map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ centers }) => {
  return (
    <div className="map-container mb-6">
      <MapContainer
        center={[37.7749, -122.4194]} // Default center (San Francisco)
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {centers.map((center, idx) => (
          <Marker key={idx} position={[center.lat, center.lng]}>
            <Popup>
              <strong>{center.name}</strong>
              <br />
              {center.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
