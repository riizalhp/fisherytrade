'use client';

import { FormEvent, useState } from 'react';
import { Anchor, Loader2, LockKeyhole } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Login gagal.');
      const requested = new URLSearchParams(window.location.search).get('next') || '/';
      const next = requested.startsWith('/') && !requested.startsWith('//') ? requested : '/';
      window.location.replace(next);
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : 'Login gagal. Coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-white shadow-2xl">
        <div className="bg-slate-900 px-7 py-8 text-white">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600"><Anchor className="h-6 w-6" /></div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">FisheryTrade · SAP-Lite</p>
          <h1 className="mt-2 text-2xl font-black">Login Admin</h1>
          <p className="mt-2 text-sm text-slate-300">Masuk untuk mengelola produk, harga, dan stok katalog.</p>
        </div>
        <form onSubmit={submit} className="space-y-4 p-7">
          <label className="block text-sm font-semibold text-slate-700">Username<input required autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:ring-2 focus:ring-blue-500/20" /></label>
          <label className="block text-sm font-semibold text-slate-700">Password<div className="relative mt-1.5"><LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 font-normal outline-none focus:ring-2 focus:ring-blue-500/20" /></div></label>
          {error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60">{loading && <Loader2 className="h-4 w-4 animate-spin" />}Masuk ke Admin</button>
          {process.env.NODE_ENV !== 'production' && <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">Akun demo lokal: <b>admin</b> / <b>fisherytrade-demo</b>. Ganti dengan environment variables sebelum deployment.</p>}
        </form>
      </div>
    </main>
  );
}
