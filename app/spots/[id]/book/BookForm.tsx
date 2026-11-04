'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const inputCls = "w-full bg-surface border border-primary/40 rounded px-3 py-2 text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent mb-4";

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
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-main mb-6">Book this spot</h1>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-text-muted mb-1">Date</label>
        <input type="date" required value={date} onChange={e => setDate(e.target.value)} className={inputCls} />

        <label className="block text-sm font-medium text-text-muted mb-1">Hours (1–8)</label>
        <input type="number" min={1} max={8} required value={hours} onChange={e => setHours(e.target.value)} className={inputCls} />

        <label className="block text-sm font-medium text-text-muted mb-1">Your name</label>
        <input type="text" required value={name} onChange={e => setName(e.target.value)} className={inputCls} />

        <label className="block text-sm font-medium text-text-muted mb-1">Email</label>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />

        <button type="submit" disabled={loading}
          className="bg-primary text-white rounded px-6 py-2 font-medium w-full hover:bg-accent2 transition-colors disabled:opacity-50">
          {loading ? 'Booking...' : 'Book spot'}
        </button>
        {error && <p className="text-accent mt-2 text-sm">{error}</p>}
      </form>
    </main>
  );
}
