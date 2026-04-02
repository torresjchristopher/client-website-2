'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientLogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/client-auth', { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to clear client access.');
      }

      router.refresh();
    } catch (logoutError) {
      console.error(logoutError);
      window.alert('Unable to lock the client page right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="inline-flex rounded-full border border-red-200 px-5 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-red-700 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? 'Locking...' : 'Lock client tab'}
    </button>
  );
}
