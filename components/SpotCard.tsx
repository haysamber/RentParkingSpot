import Link from "next/link";
import { Spot } from "@/lib/data";

export default function SpotCard({ spot }: { spot: Spot }) {
  return (
    <div className={`relative bg-secondary rounded-lg p-4${!spot.available ? " opacity-50" : ""}`}>
      {!spot.available && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-text-muted">Booked</span>
        </div>
      )}
      <p className="font-bold text-text-main">{spot.address}</p>
      <div className="flex gap-2 mt-1">
        <span className="bg-accent text-white text-xs rounded px-2 py-0.5">
          {spot.neighborhood}
        </span>
        <span className="bg-white text-text-muted text-xs rounded px-2 py-0.5 border">
          {spot.type}
        </span>
      </div>
      <p className="text-text-muted text-sm mt-2">${spot.pricePerHour}/hr</p>
      <Link href={`/spots/${spot.id}`} className="text-primary text-sm font-medium mt-3 block">
        View
      </Link>
    </div>
  );
}
