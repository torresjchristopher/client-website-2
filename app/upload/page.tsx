'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import UploadForm from '@/components/UploadForm';

export default function UploadPage() {
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
          <div className="max-w-xl">
            <p className="text-[0.7rem] uppercase tracking-[0.38em] text-red-600">SweetPear / Upload</p>
            <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">
              Add writing support material, collages, documentary stills, or handmade work.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-stone-600">
              Use clear descriptions for every upload so the site keeps your voice beside the image.
              Documentary entries can also store a video link for YouTube or another platform.
            </p>
          </div>

          <UploadForm />
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
