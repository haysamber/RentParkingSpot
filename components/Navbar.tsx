import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-secondary">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-primary">ParkSpot</Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-text-muted font-medium">Sign in</Link>
          <Link href="/list" className="bg-primary text-white rounded px-4 py-2 text-sm font-medium">
            List your spot
          </Link>
        </div>
      </div>
    </nav>
  );
}
