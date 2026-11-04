import Link from "next/link";
import type { Spot } from "@/lib/data";

export default function SpotCard({ spot }: { spot: Spot }) {
  return (
    <div className={`relative bg-surface rounded-lg p-4 border border-primary/30${!spot.available ? " opacity-50" : ""}`}>
      {!spot.available && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg">
          <span className="font-bold text-text-muted text-lg">Booked</span>
        </div>
      )}
      <p className="font-bold text-text-main">{spot.address}</p>
      <div className="flex gap-2 mt-1">
        <span className="bg-accent text-white text-xs rounded px-2 py-0.5 font-medium">
          {spot.neighborhood}
        </span>
        <span className="bg-secondary text-text-muted text-xs rounded px-2 py-0.5 border border-primary/30 font-medium capitalize">
          {spot.type}
        </span>
      </div>
      <p className="text-text-muted text-sm mt-2">${spot.pricePerHour}/hr</p>
      <Link href={`/spots/${spot.id}`} className="text-accent text-sm font-medium mt-3 block hover:text-accent2 transition-colors">
        View →
      </Link>
    </div>
  );
}
