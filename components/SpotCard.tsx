import Link from "next/link";
import type { Spot } from "@/lib/data";

export default function SpotCard({ spot }: { spot: Spot }) {
  return (
    <div className={`relative bg-secondary border border-secondary rounded-xl p-5 flex flex-col gap-3${!spot.available ? " opacity-50" : ""}`}>
      {!spot.available && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/60">
          <span className="font-bold text-text-muted text-sm uppercase tracking-wide">Booked</span>
        </div>
      )}
      <div>
        <p className="font-bold text-text-main text-base leading-snug">{spot.address}</p>
        <div className="flex gap-2 mt-2">
          <span className="bg-accent text-white text-xs font-medium rounded-full px-2.5 py-0.5">
            {spot.neighborhood}
          </span>
          <span className="bg-white text-text-muted text-xs font-medium rounded-full px-2.5 py-0.5 border capitalize">
            {spot.type}
          </span>
        </div>
      </div>
      <p className="text-text-main font-semibold text-lg">${spot.pricePerHour}<span className="text-text-muted font-normal text-sm"> / hr</span></p>
      <Link
        href={`/spots/${spot.id}`}
        className="mt-auto block text-center bg-primary text-white text-sm font-medium rounded-lg px-4 py-2"
      >
        View spot →
      </Link>
    </div>
  );
}
