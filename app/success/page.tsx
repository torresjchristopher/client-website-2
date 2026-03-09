'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6fffb] px-6">
      <div className="max-w-xl rounded-[2rem] border border-emerald-100 bg-white p-10 text-center shadow-sm">
        <CheckCircle size={60} className="mx-auto text-emerald-600" />
        <p className="mt-6 text-[0.7rem] uppercase tracking-[0.35em] text-emerald-600">SweetPear</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight text-stone-900">Payment successful.</h1>
        <p className="mt-4 text-base leading-relaxed text-stone-600">
          Thank you for supporting SweetPear. Your order has been received.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-red-600 px-6 py-3 text-[0.72rem] uppercase tracking-[0.3em] text-white transition hover:bg-red-500"
        >
          Return to SweetPear
        </Link>
      </div>
    </div>
  );
}
