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
      <Link href="/" className="inline-flex items-center gap-1 text-text-muted text-sm hover:text-primary">
        ← Back to listings
      </Link>

      <h1 className="text-2xl font-bold text-text-main mt-6 mb-3">{spot.address}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-accent text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
          {spot.neighborhood}
        </span>
        <span className="bg-secondary text-text-muted text-xs font-medium px-2.5 py-0.5 rounded-full capitalize border">
          {spot.type}
        </span>
      </div>

      <p className="text-text-muted text-base mb-6">{spot.description}</p>

      <div className="border-t border-secondary pt-6 mb-8 flex items-center justify-between">
        <div>
          <p className="text-text-muted text-xs uppercase tracking-wide font-medium mb-1">Price</p>
          <p className="text-text-main text-2xl font-bold">${spot.pricePerHour}<span className="text-text-muted font-normal text-base"> / hr</span></p>
        </div>
        {spot.available ? (
          <Link
            href={`/spots/${spot.id}/book`}
            className="inline-block bg-primary text-white font-medium px-8 py-3 rounded-lg"
          >
            Book this spot
          </Link>
        ) : (
          <span className="text-text-muted text-sm border border-secondary rounded-lg px-4 py-3">Already booked</span>
        )}
      </div>
    </main>
  );
}
