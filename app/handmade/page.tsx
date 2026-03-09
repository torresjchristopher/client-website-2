'use client';

import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Navbar from '@/components/Navbar';
import { database } from '@/lib/firebase';
import { HANDMADE_ARTWORKS } from '@/lib/siteContent';

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function HandmadePage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const artworksRef = ref(database, 'artworks');
    return onValue(
      artworksRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setArtworks([]);
          return;
        }

        const data = snapshot.val() as Record<string, Omit<Artwork, 'id'>>;
        setArtworks(
          Object.entries(data)
            .map(([id, value]) => ({ id, ...value }))
            .filter((item) => typeof item.price === 'number'),
        );
      },
      (error) => {
        console.error('Failed to load handmade art:', error);
      },
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#521a27] text-white">
      <Navbar
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
        isDark
      />

      <main className="pb-12 pt-32">
        <section className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
          <p className="text-[0.7rem] uppercase tracking-[0.38em] text-rose-100/80">
            SweetPear / Handmade Art
          </p>
          <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">
            Handmade art for purchase, presented as a simple immersive gallery.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-rose-50/78">
            This section leans into the velvet-red world of SweetPear while keeping checkout,
            browsing, and product storytelling ultra-simple.
          </p>
        </section>

        <Gallery artworks={artworks} fallbackArtworks={HANDMADE_ARTWORKS} theme="dark" />
      </main>

      <Footer isDark />
      <Cart
        isOpen={cartOpen}
        onToggle={() => setCartOpen(false)}
        onItemCountChange={setCartItemCount}
      />
    </div>
  );
}
