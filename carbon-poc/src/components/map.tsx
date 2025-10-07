import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import { Sidebar } from './sideBar';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 }); // smooth pan
  }, [map, center]);
  return null;
}

export function Map() {
  const [position, setPosition] = useState<[number, number] | null>(null);

  // Get user location or fallback to New Zealand
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => setPosition([-36.8485, 174.7633]) // Auckland, New Zealand fallback
      );
    } else {
      setPosition([-36.8485, 174.7633]);
    }
  }, []);

  // Handle search from sidebar - this will be called when user selects a location
  const handleSearch = (lat: string, lon: string, display_name: string) => {
    console.log('Moving to:', display_name, 'at coordinates:', lat, lon);
    setPosition([parseFloat(lat), parseFloat(lon)]);
  };

  if (!position) return null;

  return (
    <>
      <Sidebar onSearch={handleSearch} />
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}
        zoomControl={false}
      >
        <MapUpdater center={position} />
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <Marker position={position}>
          <Popup>Selected location</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
