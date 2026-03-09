'use client';

import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Navbar from '@/components/Navbar';
import { database } from '@/lib/firebase';
import { COLLAGE_ARTWORKS } from '@/lib/siteContent';

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function CollagesPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const artworksRef = ref(database, 'collages');
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
        console.error('Failed to load collages:', error);
      },
    );
  }, []);

  return (
    <div className="min-h-screen bg-white text-stone-900">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setCartOpen(true)} />

      <main className="pb-12 pt-32">
        <section className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
          <p className="text-[0.7rem] uppercase tracking-[0.38em] text-red-600">SweetPear / Collages</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">
            Conceptual collages, presented on white so the color belongs to the work.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-stone-600">
            Each collage carries a written note about the feeling it holds and is available to
            purchase as a poster or keepsake from the site.
          </p>
        </section>

        <Gallery artworks={artworks} fallbackArtworks={COLLAGE_ARTWORKS} theme="light" />
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
