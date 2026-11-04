import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSpot } from '@/lib/data';

export default async function SpotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const spot = getSpot(id);
  if (!spot) notFound();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-main mb-2">{spot.address}</h1>
      <div>
        <span className="bg-accent text-white text-xs rounded px-2 py-0.5 mr-2">{spot.neighborhood}</span>
        <span className="bg-secondary text-text-muted text-xs rounded px-2 py-0.5 border">{spot.type}</span>
      </div>
      <p className="text-text-muted text-sm mt-4">{spot.description}</p>
      <p className="text-text-main font-medium mt-2">${spot.pricePerHour}/hr</p>
      {spot.available ? (
        <Link href={`/spots/${spot.id}/book`} className="mt-6 inline-block bg-primary text-white rounded px-6 py-2 font-medium">
          Book this spot
        </Link>
      ) : (
        <p className="mt-6 text-text-muted">Already booked</p>
      )}
    </main>
  );
}
