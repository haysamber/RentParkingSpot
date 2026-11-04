'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate a short network delay
    await new Promise(r => setTimeout(r, 600));
    router.push('/');
  }

  return (
    <main className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-text-main mb-8">Sign in to ParkSpot</h1>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-text-main mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-secondary rounded px-3 py-2 text-text-main mb-4"
        />
        <label className="block text-sm font-medium text-text-main mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border border-secondary rounded px-3 py-2 text-text-main mb-6"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white rounded px-6 py-2 font-medium w-full"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
