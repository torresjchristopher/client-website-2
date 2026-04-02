'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Cart from '@/components/Cart';
import ClientLogoutButton from '@/components/ClientLogoutButton';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import UploadForm from '@/components/UploadForm';

export default function ClientStudio() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <div className="min-h-screen bg-[#fff8f6] text-stone-900">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setCartOpen(true)} />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.32em] text-stone-500 transition hover:text-red-700"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <section className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(420px,1fr)] lg:items-start">
          <div className="max-w-xl space-y-6">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.38em] text-red-600">
                SweetPear / Client
              </p>
              <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">
                Upload new artwork for the storefront gallery.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-stone-600">
                Add an image, title, price, and description here. Each published piece flows into
                the SweetPear landing gallery and the handmade shop collection automatically.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-red-100 bg-white p-6 shadow-sm">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-red-600">
                Private upload tab
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                This section is password-protected for client use. Lock it when you are done so the
                browser returns to the password screen.
              </p>
              <div className="mt-5">
                <ClientLogoutButton />
              </div>
            </div>
          </div>

          <UploadForm mode="art-only" />
        </section>
      </main>

      <Footer />
      <Cart
        isOpen={cartOpen}
        onToggle={() => setCartOpen(false)}
        onItemCountChange={setCartItemCount}
      />
    </div>
  );
}
