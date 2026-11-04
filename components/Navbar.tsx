import Link from "next/link";

function ParkSpotLogo() {
  return (
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Meter head — rounded rect */}
      <rect x="4" y="1" width="24" height="20" rx="5" fill="#fb8b24" stroke="white" strokeWidth="1.5"/>
      {/* P letter inside meter head */}
      <text
        x="16" y="16"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="14"
        fill="white"
      >P</text>
      {/* Narrow neck below head */}
      <rect x="13" y="20" width="6" height="4" fill="#fb8b24" stroke="white" strokeWidth="1"/>
      {/* Pole */}
      <rect x="14" y="23" width="4" height="14" rx="2" fill="#fb8b24" stroke="white" strokeWidth="1.5"/>
      {/* Base */}
      <rect x="8" y="35" width="16" height="4" rx="2" fill="#fb8b24" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-secondary border-b border-primary">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <ParkSpotLogo />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-text-muted font-medium hover:text-text-main transition-colors">Sign in</Link>
          <Link href="/list" className="bg-primary text-white rounded px-4 py-2 text-sm font-medium hover:bg-accent2 transition-colors">
            List your spot
          </Link>
        </div>
      </div>
    </nav>
  );
}
