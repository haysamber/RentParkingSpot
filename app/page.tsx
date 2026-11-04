import { getSpots } from '@/lib/data';
import SpotCard from '@/components/SpotCard';

export const instant = false;

export default function Home() {
  const spots = getSpots();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-text-main mb-8">
        Parking spots in San Francisco
      </h1>

      {spots.length === 0 ? (
        <p className="text-text-muted">No spots listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spots.map((spot) => (
            <SpotCard spot={spot} key={spot.id} />
          ))}
        </div>
      )}
    </main>
  );
}
