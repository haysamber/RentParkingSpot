'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NEIGHBORHOODS = [
  'Mission', 'SoMa', 'Castro', 'Haight', 'Marina',
  'Sunset', 'Richmond', 'NOPA', 'Tenderloin', 'Nob Hill',
];

export default function ListPage() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('Mission');
  const [type, setType] = useState<'driveway' | 'garage'>('driveway');
  const [pricePerHour, setPricePerHour] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, neighborhood, type, pricePerHour: Number(pricePerHour), description, available: true }),
      });
      if (!res.ok) throw new Error();
      router.push('/');
    } catch {
      setError('Could not list spot. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-text-main mb-1">List your spot</h1>
      <p className="text-text-muted text-sm mb-8">Add your driveway or garage to the marketplace.</p>
      <div className="bg-secondary border border-secondary rounded-2xl p-6">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Address</label>
            <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-secondary rounded-lg px-3 py-2.5 text-text-main bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Neighborhood</label>
            <select required value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full border border-secondary rounded-lg px-3 py-2.5 text-text-main bg-white focus:outline-none focus:ring-2 focus:ring-primary">
              {NEIGHBORHOODS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-text-main">
                <input type="radio" name="type" value="driveway" checked={type === 'driveway'} onChange={() => setType('driveway')} /> Driveway
              </label>
              <label className="flex items-center gap-2 text-sm text-text-main">
                <input type="radio" name="type" value="garage" checked={type === 'garage'} onChange={() => setType('garage')} /> Garage
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Price per hour ($)</label>
            <input type="number" min={1} required value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)}
              className="w-full border border-secondary rounded-lg px-3 py-2.5 text-text-main bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Description</label>
            <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-secondary rounded-lg px-3 py-2.5 text-text-main bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="mt-2 bg-primary text-white font-medium px-6 py-3 rounded-lg w-full disabled:opacity-50">
            {loading ? 'Listing...' : 'List my spot'}
          </button>
        </form>
      </div>
    </main>
  );
}
