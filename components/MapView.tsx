'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Link from 'next/link';
import type { Spot } from '@/lib/data';
import L from 'leaflet';

// Fix Leaflet's default icon paths when bundled by webpack/turbopack
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Props {
  spots: Spot[];
}

export default function MapView({ spots }: Props) {
  useEffect(() => {
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  return (
    <MapContainer
      center={[37.773, -122.431]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot) => (
        <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={defaultIcon}>
          <Popup>
            <div className="text-sm min-w-[180px]">
              <p className="font-bold text-text-main mb-1">{spot.address}</p>
              <div className="flex gap-1 mb-2">
                <span className="bg-accent text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {spot.neighborhood}
                </span>
                <span className="bg-secondary text-text-muted text-xs font-medium px-2 py-0.5 rounded-full capitalize">
                  {spot.type}
                </span>
              </div>
              <p className="text-text-muted mb-2">
                <span className="font-semibold text-text-main">${spot.pricePerHour}</span> / hr
              </p>
              {spot.available ? (
                <Link
                  href={`/spots/${spot.id}`}
                  className="inline-block bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                >
                  View spot →
                </Link>
              ) : (
                <span className="text-text-muted text-xs">Already booked</span>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
