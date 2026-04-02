'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientAccessForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/client-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? 'Incorrect password.');
        return;
      }

      setPassword('');
      router.refresh();
    } catch (requestError) {
      console.error(requestError);
      setError('Unable to verify the password right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-[2rem] border border-red-100 bg-white p-8 shadow-sm sm:p-10"
    >
      <div className="space-y-3">
        <p className="text-[0.68rem] uppercase tracking-[0.35em] text-red-600">Client access</p>
        <h2 className="text-3xl font-light tracking-tight text-stone-900">
          Enter the SweetPear client password
        </h2>
        <p className="text-sm leading-relaxed text-stone-600">
          This private tab unlocks the upload studio for adding new artwork to the storefront.
        </p>
      </div>

      {error ? (
        <div className="mt-6 rounded-[1.25rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <label className="mt-8 block space-y-2">
        <span className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-500">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
          autoComplete="current-password"
          className="w-full rounded-full border border-red-100 px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-red-300"
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 inline-flex rounded-full bg-red-600 px-6 py-3 text-[0.72rem] uppercase tracking-[0.3em] text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300"
      >
        {isLoading ? 'Unlocking...' : 'Open client studio'}
      </button>
    </form>
  );
}
