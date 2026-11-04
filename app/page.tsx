import { getSpots } from '@/lib/data';
import MapPageClient from '@/components/MapPageClient';

export const dynamic = 'force-dynamic';

export default function Home() {
  const spots = getSpots();
  return <MapPageClient spots={spots} />;
}
