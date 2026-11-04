'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ListPage() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('Mission');
  const [type, setType] = useState('driveway');
  const [pricePerHour, setPricePerHour] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address,
        neighborhood,
        type,
        pricePerHour: Number(pricePerHour),
        description,
      }),
    });
    if (res.ok) {
      router.push('/');
    } else {
      setError('Could not list spot. Please try again.');
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-main mb-6">List your spot</h1>
      <form onSubmit={onSubmit}>
        <label className="block text-sm font-medium text-text-main mb-1">
          Address
        </label>
        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-secondary rounded px-3 py-2 text-text-main mb-4"
        />

        <label className="block text-sm font-medium text-text-main mb-1">
          Neighborhood
        </label>
        <select
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="w-full border border-secondary rounded px-3 py-2 text-text-main mb-4"
        >
          {['Mission', 'SoMa', 'Castro', 'Haight', 'Marina', 'Sunset', 'Richmond', 'NOPA', 'Tenderloin', 'Nob Hill'].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label className="block text-sm font-medium text-text-main mb-1">
          Type
        </label>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 text-text-main">
            <input
              type="radio"
              value="driveway"
              checked={type === 'driveway'}
              onChange={() => setType('driveway')}
            />
            Driveway
          </label>
          <label className="flex items-center gap-2 text-text-main">
            <input
              type="radio"
              value="garage"
              checked={type === 'garage'}
              onChange={() => setType('garage')}
            />
            Garage
          </label>
        </div>

        <label className="block text-sm font-medium text-text-main mb-1">
          Price per hour ($)
        </label>
        <input
          type="number"
          min={1}
          required
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
          className="w-full border border-secondary rounded px-3 py-2 text-text-main mb-4"
        />

        <label className="block text-sm font-medium text-text-main mb-1">
          Description
        </label>
        <textarea
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-secondary rounded px-3 py-2 text-text-main mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white rounded px-6 py-2 font-medium w-full mt-2"
        >
          {loading ? 'Listing...' : 'List spot'}
        </button>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </main>
  );
}
