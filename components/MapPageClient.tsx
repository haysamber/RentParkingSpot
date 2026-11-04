'use client';

import dynamic from 'next/dynamic';
import type { Spot } from '@/lib/data';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

interface Props {
  spots: Spot[];
}

export default function MapPageClient({ spots }: Props) {
  return (
    <div style={{ height: 'calc(100vh - 56px)' }}>
      <MapView spots={spots} />
    </div>
  );
}
