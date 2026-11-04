'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Link from 'next/link';
import type { Spot } from '@/lib/data';
import L from 'leaflet';

// Price-label DivIcon — shows "$12" on the pin, no click needed
function makePriceIcon(price: number, available: boolean) {
  const bg = available ? '#9a031e' : '#6b7280';
  const html = `
    <div style="
      background:${bg};
      color:#fff;
      font-family:system-ui,sans-serif;
      font-size:13px;
      font-weight:700;
      padding:4px 8px;
      border-radius:6px;
      white-space:nowrap;
      box-shadow:0 2px 6px rgba(0,0,0,0.35);
      position:relative;
      line-height:1.2;
    ">
      $${price}/hr
      <div style="
        position:absolute;
        bottom:-6px;
        left:50%;
        transform:translateX(-50%);
        width:0;height:0;
        border-left:6px solid transparent;
        border-right:6px solid transparent;
        border-top:6px solid ${bg};
      "></div>
    </div>`;
  return L.divIcon({
    html,
    className: '',
    iconSize: [64, 34],
    iconAnchor: [32, 40],
    popupAnchor: [0, -42],
  });
}

// Popup inline styles (Leaflet popups are outside React tree, Tailwind doesn't reach them)
const popupStyle: React.CSSProperties = { fontFamily: 'system-ui, sans-serif', minWidth: '190px' };
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
    // no global icon override needed — each marker uses its own DivIcon
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
        <Marker
          key={spot.id}
          position={[spot.lat, spot.lng]}
          icon={makePriceIcon(spot.pricePerHour, spot.available)}
        >
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
