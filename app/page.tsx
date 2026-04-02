'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import BrandWordmark from '@/components/BrandWordmark';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import { addItemToWindowCart } from '@/lib/cart';
import { database } from '@/lib/firebase';
import { HANDMADE_ARTWORKS } from '@/lib/siteContent';

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

function normalizeArtworkEntries(data: Record<string, Partial<Artwork>>): Artwork[] {
  return Object.entries(data)
    .map(([id, value]) => ({
      id,
      title: typeof value.title === 'string' ? value.title : 'Untitled Piece',
      description:
        typeof value.description === 'string'
          ? value.description
          : 'Available now in the SweetPear storefront.',
      price: typeof value.price === 'number' ? value.price : Number.NaN,
      imageUrl: typeof value.imageUrl === 'string' ? value.imageUrl : '',
    }))
    .filter((item) => Number.isFinite(item.price) && item.imageUrl.length > 0);
}

export default function Home() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (!database) return;
    const artRef = ref(database, 'artworks');
    const unsub = onValue(artRef, (snapshot) => {
      if (!snapshot.exists()) { setArtworks([]); return; }
      setArtworks(normalizeArtworkEntries(snapshot.val() as Record<string, Partial<Artwork>>));
    });
    return () => unsub();
  }, []);

  const displayArtworks = artworks.length > 0 ? artworks : HANDMADE_ARTWORKS;

  return (
    <div className="min-h-screen bg-[#fff8f6] text-stone-900">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setCartOpen(true)} />

      <main className="pt-28 pb-20">
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-14 text-center">
          <BrandWordmark className="text-[3.2rem] sm:text-[5rem] lg:text-[6.5rem]" variant="hero" />
          <p className="mt-6 text-base leading-relaxed text-stone-500 max-w-xl mx-auto">
            Original art — available to collect.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {displayArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group overflow-hidden rounded-[1.75rem] border border-red-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-light tracking-tight text-stone-900">{artwork.title}</h2>
                    <span className="text-[0.72rem] uppercase tracking-[0.25em] text-red-600">
                      ${artwork.price.toFixed(0)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-stone-500">{artwork.description}</p>
                  <button
                    type="button"
                    onClick={() => addItemToWindowCart(artwork.id, artwork.title, artwork.price)}
                    className="mt-2 w-full rounded-full bg-red-600 px-5 py-3 text-[0.72rem] uppercase tracking-[0.3em] text-white transition hover:bg-red-500"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Cart
        isOpen={cartOpen}
        onToggle={() => setCartOpen(false)}
        onItemCountChange={setCartItemCount}
      />
    </div>
  );
}
