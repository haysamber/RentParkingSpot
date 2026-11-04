'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookForm({ id }: { id: string }) {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spotId: id, renterName: name, renterEmail: email, date, hours: Number(hours) }),
      });
      if (res.ok) {
        router.push('/');
      } else {
        setError('Booking failed. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Booking failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-text-main mb-1">Book this spot</h1>
      <p className="text-text-muted text-sm mb-8">Fill in your details to confirm the reservation.</p>
      <div className="bg-secondary border border-secondary rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-secondary rounded-lg px-3 py-2.5 text-text-main bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Hours (1–8)</label>
            <input
              type="number"
              min={1}
              max={8}
              required
              value={hours}
              onChange={e => setHours(e.target.value)}
              className="w-full border border-secondary rounded-lg px-3 py-2.5 text-text-main bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Your name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-secondary rounded-lg px-3 py-2.5 text-text-main bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-secondary rounded-lg px-3 py-2.5 text-text-main bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-primary text-white rounded-lg px-6 py-3 font-medium w-full disabled:opacity-60"
          >
            {loading ? 'Booking...' : 'Confirm booking'}
          </button>
        </form>
      </div>
    </main>
  );
}
