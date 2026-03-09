'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff8f8] px-6">
      <div className="max-w-xl rounded-[2rem] border border-red-100 bg-white p-10 text-center shadow-sm">
        <XCircle size={60} className="mx-auto text-red-600" />
        <p className="mt-6 text-[0.7rem] uppercase tracking-[0.35em] text-red-600">SweetPear</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight text-stone-900">Payment cancelled.</h1>
        <p className="mt-4 text-base leading-relaxed text-stone-600">
          Your cart is still saved, so you can return whenever you are ready.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-red-100 px-6 py-3 text-[0.72rem] uppercase tracking-[0.3em] text-red-700 transition hover:border-red-200 hover:bg-red-50"
        >
          Return to SweetPear
        </Link>
      </div>
    </div>
  );
}
