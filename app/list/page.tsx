"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const NEIGHBORHOODS = [
  "Mission", "SoMa", "Castro", "Haight", "Marina",
  "Sunset", "Richmond", "NOPA", "Tenderloin", "Nob Hill",
];

export default function ListPage() {
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS[0]);
  const [type, setType] = useState<"driveway" | "garage">("driveway");
  const [pricePerHour, setPricePerHour] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          neighborhood,
          type,
          pricePerHour: Number(pricePerHour),
          description,
          available: true,
        }),
      });

      if (!res.ok) throw new Error();
      router.push("/");
    } catch {
      setError("Could not list spot. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-text-main mb-8">List your spot</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-main">Address</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-secondary rounded-lg px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-main">Neighborhood</label>
          <select
            required
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="border border-secondary rounded-lg px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-main">Type</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-text-main">
              <input
                type="radio"
                name="type"
                value="driveway"
                checked={type === "driveway"}
                onChange={() => setType("driveway")}
              />
              Driveway
            </label>
            <label className="flex items-center gap-2 text-sm text-text-main">
              <input
                type="radio"
                name="type"
                value="garage"
                checked={type === "garage"}
                onChange={() => setType("garage")}
              />
              Garage
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-main">Price per hour ($)</label>
          <input
            type="number"
            min={1}
            required
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            className="border border-secondary rounded-lg px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-main">Description</label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-secondary rounded-lg px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Listing…" : "List my spot"}
        </button>
      </form>
    </main>
  );
}
