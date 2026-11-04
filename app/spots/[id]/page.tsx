import Link from "next/link";
import { notFound } from "next/navigation";
import type { Spot } from "@/lib/data";

export const instant = false;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SpotDetailPage({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/spots/${id}`, { cache: "no-store" });

  if (!res.ok) notFound();

  const spot: Spot = await res.json();

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/" className="text-primary text-sm font-medium hover:underline">
        ← Back to listings
      </Link>

      <h1 className="text-4xl font-bold text-text-main mt-6 mb-2">{spot.address}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-accent text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {spot.neighborhood}
        </span>
        <span className="bg-secondary text-text-muted text-xs font-medium px-2 py-0.5 rounded-full capitalize">
          {spot.type}
        </span>
      </div>

      <p className="text-text-muted text-base mb-4">{spot.description}</p>

      <p className="text-text-main text-lg font-semibold mb-8">
        ${spot.pricePerHour} <span className="text-text-muted font-normal text-base">/ hr</span>
      </p>

      {spot.available ? (
        <Link
          href={`/spots/${spot.id}/book`}
          className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Book this spot
        </Link>
      ) : (
        <p className="text-text-muted">Already booked</p>
      )}
    </main>
  );
}
