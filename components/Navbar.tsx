import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-secondary">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <span className="font-bold text-primary">ParkSpot</span>
        <Link href="/list" className="bg-primary text-white rounded px-4 py-2">
          List your spot
        </Link>
      </div>
    </nav>
  );
}
