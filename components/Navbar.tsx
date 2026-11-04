import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-secondary">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-primary font-bold text-xl">
          ParkSpot
        </Link>
        <Link
          href="/list"
          className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          List your spot
        </Link>
      </div>
    </nav>
  );
}
