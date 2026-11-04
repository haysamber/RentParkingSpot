import Link from "next/link";

function ParkSpotLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rounded square with white outline */}
      <rect x="1" y="1" width="34" height="34" rx="7" fill="#fb8b24" stroke="white" strokeWidth="1.5"/>
      {/* Bold P */}
      <text
        x="18"
        y="26"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="22"
        fill="white"
      >P</text>
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
