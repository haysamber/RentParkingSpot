t>import Link from "next/link";
import type { Spot } from "@/lib/data";

export default function SpotCard({ id, address, neighborhood, type, pricePerHour, available }: Spot) {
  return (
    <div className={`relative rounded-xl border border-secondary bg-background p-5 flex flex-col gap-3 ${!available ? "opacity-50" : ""}`}>
      {!available && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
          <span className="text-text-muted font-semibold text-lg tracking-wide">Booked</span>
        </div>
      )}

      <p className="font-bold text-text-main text-base">{address}</p>

      <div className="flex flex-wrap gap-2">
        <span className="bg-accent text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {neighborhood}
        </span>
        <span className="bg-secondary text-text-muted text-xs font-medium px-2 py-0.5 rounded-full capitalize">
          {type}
        </span>
      </div>

      <p className="text-text-muted text-sm">
        <span className="font-semibold text-text-main">${pricePerHour}</span> / hr
      </p>

      <Link
        href={`/spots/${id}`}
        className="mt-auto self-start text-primary text-sm font-medium hover:underline"
      >
        View →
      </Link>
    </div>
  );
}
