import { getSpots } from '@/lib/data';
import SpotCard from '@/components/SpotCard';

export default function Home() {
  const spots = getSpots();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-main mb-6">
        Parking spots in San Francisco
      </h1>
      {spots.length === 0 ? (
        <p className="text-text-muted">No spots listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {spots.map((spot) => (
            <SpotCard spot={spot} key={spot.id} />
          ))}
        </div>
      )}
    </main>
  );
}
