import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSpot } from '@/lib/data';

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SpotDetailPage({ params }: Props) {
  const { id } = await params;
  const spot = getSpot(id);

  if (!spot) notFound();

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/" className="text-accent text-sm font-medium hover:text-accent2 transition-colors">
        ← Back to map
      </Link>

      <h1 className="text-4xl font-bold text-text-main mt-6 mb-2">{spot.address}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
          {spot.neighborhood}
        </span>
        <span className="bg-secondary text-text-muted text-xs font-medium px-3 py-1 rounded-full border border-primary/30 capitalize">
          {spot.type}
        </span>
        {spot.pricingStatus === 'sale' && (
          <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: '#15803d', color: '#fff' }}>
            Sale
          </span>
        )}
        {spot.pricingStatus === 'surge' && (
          <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: '#d97706', color: '#fff' }}>
            Surge pricing
          </span>
        )}
      </div>

      <p className="text-text-muted text-base mb-4">{spot.description}</p>

      <p className="text-text-main text-lg font-semibold mb-2">
        ${spot.pricePerHour} <span className="text-text-muted font-normal text-base">/ hr</span>
      </p>
      <p className="text-text-muted text-xs mb-8">Price set by AI based on neighborhood demand</p>

      {spot.available ? (
        <Link
          href={`/spots/${spot.id}/book`}
          className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-accent2 transition-colors"
        >
          Book this spot
        </Link>
      ) : (
        <div className="mt-2">
          <p className="text-text-muted text-sm">This spot is currently booked.</p>
          {spot.freeAt && (
            <p className="text-text-main text-sm font-medium mt-1">
              Free from{' '}
              {new Date(spot.freeAt).toLocaleString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric',
                hour: 'numeric', minute: '2-digit',
              })}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
