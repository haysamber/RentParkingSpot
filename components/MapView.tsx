'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Link from 'next/link';
import type { Spot } from '@/lib/data';
import L from 'leaflet';

// Price-label DivIcon — sale=green, normal=white, booked=grey
function makePriceIcon(price: number, available: boolean, pricingStatus: string) {
  const isNormal = available && pricingStatus === 'normal';
  const bg = !available ? '#6b7280'
    : pricingStatus === 'sale' ? '#15803d'
    : '#ffffff';
  const color = isNormal ? '#111827' : '#fff';
  const border = isNormal ? 'border:1.5px solid #d1d5db;' : '';
  const label = pricingStatus === 'sale'
    ? '<div style="font-size:9px;font-weight:800;letter-spacing:0.08em;opacity:0.9;line-height:1;margin-top:1px;">SALE</div>'
    : '';
  const html = `
    <div style="
      background:${bg};
      color:${color};
      ${border}
      font-family:system-ui,sans-serif;
      font-size:13px;
      font-weight:700;
      padding:4px 8px 3px;
      border-radius:6px;
      white-space:nowrap;
      box-shadow:0 2px 6px rgba(0,0,0,0.35);
      position:relative;
      line-height:1.2;
      text-align:center;
    ">
      $${price}/hr
      ${label}
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
  const tall = pricingStatus === 'sale';
  return L.divIcon({
    html,
    className: '',
    iconSize: [64, tall ? 44 : 34],
    iconAnchor: [32, tall ? 50 : 40],
    popupAnchor: [0, tall ? -52 : -42],
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
          icon={makePriceIcon(spot.pricePerHour, spot.available, spot.pricingStatus)}
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
                <div>
                  <span style={bookedStyle}>Currently booked</span>
                  {spot.freeAt && (
                    <p style={{ fontSize: '11px', color: '#0f4c5c', marginTop: '4px' }}>
                      Free {new Date(spot.freeAt).toLocaleString('en-US', {
                        weekday: 'short', month: 'short', day: 'numeric',
                        hour: 'numeric', minute: '2-digit',
                      })}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
