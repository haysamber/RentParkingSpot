'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Link from 'next/link';
import type { Spot } from '@/lib/data';
import L from 'leaflet';

// Custom branded marker icon using Princeton Orange
const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41" width="25" height="41">
  <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z" fill="#fb8b24" stroke="#5f0f40" stroke-width="2"/>
  <circle cx="12.5" cy="12.5" r="5" fill="#5f0f40"/>
</svg>`;

const markerUrl = `data:image/svg+xml;base64,${btoa(markerSvg)}`;

const brandedIcon = L.icon({
  iconUrl: markerUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Popup inline styles (Leaflet popups are outside the React tree, Tailwind doesn't reach them)
const popupStyle: React.CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  minWidth: '190px',
};
const addressStyle: React.CSSProperties = { fontWeight: 700, color: '#0f4c5c', marginBottom: '6px', fontSize: '14px' };
const badgeRowStyle: React.CSSProperties = { display: 'flex', gap: '6px', marginBottom: '8px' };
const badgeAccentStyle: React.CSSProperties = { background: '#fb8b24', color: '#fff', borderRadius: '999px', padding: '2px 8px', fontSize: '11px', fontWeight: 600 };
const badgeTypeStyle: React.CSSProperties = { background: '#5f0f40', color: '#c8dfe5', borderRadius: '999px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize' };
const priceStyle: React.CSSProperties = { color: '#6B7280', fontSize: '13px', marginBottom: '10px' };
const priceAmountStyle: React.CSSProperties = { fontWeight: 700, color: '#0f4c5c' };
const btnStyle: React.CSSProperties = { display: 'inline-block', background: '#9a031e', color: '#fff', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', fontWeight: 600, textDecoration: 'none' };
const bookedStyle: React.CSSProperties = { color: '#9a031e', fontSize: '12px', fontWeight: 600 };

interface Props {
  spots: Spot[];
}

export default function MapView({ spots }: Props) {
  useEffect(() => {
    L.Marker.prototype.options.icon = brandedIcon;
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
        className="map-tiles"
      />
      {spots.map((spot) => (
        <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={brandedIcon}>
          <Popup>
            <div style={popupStyle}>
              <p style={addressStyle}>{spot.address}</p>
              <div style={badgeRowStyle}>
                <span style={badgeAccentStyle}>{spot.neighborhood}</span>
                <span style={badgeTypeStyle}>{spot.type}</span>
              </div>
              <p style={priceStyle}>
                <span style={priceAmountStyle}>${spot.pricePerHour}</span> / hr
              </p>
              {spot.available ? (
                <Link href={`/spots/${spot.id}`} style={btnStyle}>View spot →</Link>
              ) : (
                <span style={bookedStyle}>Already booked</span>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
