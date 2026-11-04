'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NEIGHBORHOODS = [
  'Mission', 'SoMa', 'Castro', 'Haight', 'Marina',
  'Sunset', 'Richmond', 'NOPA', 'Tenderloin', 'Nob Hill',
];

const inputCls = "w-full bg-surface border border-primary/40 rounded-lg px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-accent";

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
      <h1 className="text-3xl font-bold text-text-main mb-8">List your spot</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-muted">Address</label>
          <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-muted">Neighborhood</label>
          <select required value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className={inputCls}>
            {NEIGHBORHOODS.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-muted">Type</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-text-main cursor-pointer">
              <input type="radio" name="type" value="driveway" checked={type === 'driveway'} onChange={() => setType('driveway')} className="accent-accent" /> Driveway
            </label>
            <label className="flex items-center gap-2 text-sm text-text-main cursor-pointer">
              <input type="radio" name="type" value="garage" checked={type === 'garage'} onChange={() => setType('garage')} className="accent-accent" /> Garage
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-muted">Price per hour ($)</label>
          <input type="number" min={1} required value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)} className={inputCls} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-muted">Description</label>
          <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputCls} resize-none`} />
        </div>
        {error && <p className="text-accent text-sm">{error}</p>}
        <button type="submit" disabled={loading}
          className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-accent2 transition-colors disabled:opacity-50">
          {loading ? 'Listing...' : 'List my spot'}
        </button>
      </form>
    </main>
  );
}
