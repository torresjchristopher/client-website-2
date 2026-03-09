'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import BrandWordmark from '@/components/BrandWordmark';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { addItemToWindowCart } from '@/lib/cart';
import { database } from '@/lib/firebase';
import { COLLAGE_ARTWORKS, HANDMADE_ARTWORKS } from '@/lib/siteContent';

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

type CollectionKey = 'artworks' | 'collages';

interface StoreArtwork extends Artwork {
  collection: string;
  href: '/handmade' | '/collages';
  accent: string;
}

const COLLECTION_CONFIG = {
  artworks: {
    collection: 'Handmade Art',
    href: '/handmade' as const,
    accent: 'bg-rose-100 text-rose-700',
    fallback: HANDMADE_ARTWORKS,
  },
  collages: {
    collection: 'Collages',
    href: '/collages' as const,
    accent: 'bg-emerald-100 text-emerald-700',
    fallback: COLLAGE_ARTWORKS,
  },
};

const DESTINATIONS = [
  {
    href: '/blog',
    title: 'Writing',
    description: 'Essays, reflections, and cultural notes that sit beside the shop.',
  },
  {
    href: '/collages',
    title: 'Collages',
    description: 'Poster-ready conceptual collage work available to browse and collect.',
  },
  {
    href: '/documentaries',
    title: 'Documentaries',
    description: 'Blue-toned film entries, stills, and links out to moving-image work.',
  },
  {
    href: '/handmade',
    title: 'Handmade Art',
    description: 'One-of-one handmade pieces presented in a dedicated gallery space.',
  },
];

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

function decorateArtworks(artworks: Artwork[], collectionKey: CollectionKey): StoreArtwork[] {
  const config = COLLECTION_CONFIG[collectionKey];

  return artworks.map((artwork) => ({
    ...artwork,
    collection: config.collection,
    href: config.href,
    accent: config.accent,
  }));
}

export default function Home() {
  const [handmadeArtworks, setHandmadeArtworks] = useState<Artwork[]>([]);
  const [collageArtworks, setCollageArtworks] = useState<Artwork[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const handmadeRef = ref(database, 'artworks');
    const collagesRef = ref(database, 'collages');

    const unsubscribeHandmade = onValue(
      handmadeRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setHandmadeArtworks([]);
          return;
        }

        const data = snapshot.val() as Record<string, Partial<Artwork>>;
        setHandmadeArtworks(normalizeArtworkEntries(data));
      },
      (error) => {
        console.error('Failed to load handmade art:', error);
      },
    );

    const unsubscribeCollages = onValue(
      collagesRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setCollageArtworks([]);
          return;
        }

        const data = snapshot.val() as Record<string, Partial<Artwork>>;
        setCollageArtworks(normalizeArtworkEntries(data));
      },
      (error) => {
        console.error('Failed to load collages:', error);
      },
    );

    return () => {
      unsubscribeHandmade();
      unsubscribeCollages();
    };
  }, []);

  const displayArtworks = useMemo(
    () => [
      ...decorateArtworks(
        handmadeArtworks.length > 0 ? handmadeArtworks : COLLECTION_CONFIG.artworks.fallback,
        'artworks',
      ),
      ...decorateArtworks(
        collageArtworks.length > 0 ? collageArtworks : COLLECTION_CONFIG.collages.fallback,
        'collages',
      ),
    ],
    [collageArtworks, handmadeArtworks],
  );

  const safeCurrentIndex =
    displayArtworks.length > 0 ? Math.min(currentIndex, displayArtworks.length - 1) : 0;
  const current = displayArtworks[safeCurrentIndex] ?? displayArtworks[0];

  if (!current) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((previous) => (previous === 0 ? displayArtworks.length - 1 : previous - 1));
  };

  const handleNext = () => {
    setCurrentIndex((previous) => (previous === displayArtworks.length - 1 ? 0 : previous + 1));
  };

  return (
    <div className="min-h-screen bg-[#f5f3ed] text-stone-900">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setCartOpen(true)} />

      <main className="pb-20 pt-24">
        <section className="relative overflow-hidden border-b border-stone-200 bg-[#0f1712]">
          <div className="absolute inset-0">
            <Image
              src={current.imageUrl}
              alt={current.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07100b]/92 via-[#102019]/72 to-[#102019]/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f3ed]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,231,183,0.25),transparent_35%)]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:px-12 lg:pb-20">
            <div className="pt-8 text-white lg:pt-20">
              <p className="text-[0.7rem] uppercase tracking-[0.38em] text-emerald-200">
                SweetPear storefront
              </p>
              <BrandWordmark className="mt-6 text-[3.4rem] sm:text-[4.6rem] lg:text-[5.8rem]" />
              <h1 className="mt-8 max-w-4xl text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
                A cleaner landing page, built like a gallery for work that is ready to collect.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/78">
                The store now opens on a visual gallery of SweetPear pieces for sale while the same
                four sections stay one click away from the simplified menu.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={current.href}
                  className="rounded-full bg-white px-6 py-3 text-[0.72rem] uppercase tracking-[0.3em] text-[#102019] transition hover:bg-emerald-50"
                >
                  View featured collection
                </Link>
                <button
                  type="button"
                  onClick={() => addItemToWindowCart(current.id, current.title, current.price)}
                  className="rounded-full border border-white/30 px-6 py-3 text-[0.72rem] uppercase tracking-[0.3em] text-white transition hover:border-emerald-300 hover:text-emerald-200"
                >
                  Add featured piece
                </button>
              </div>

              <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-light tracking-tight text-white">{displayArtworks.length}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/65">
                    Pieces on view
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-light tracking-tight text-white">2</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/65">
                    Sale collections
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-light tracking-tight text-white">4</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/65">
                    Menu tabs
                  </p>
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-[2rem] border border-white/15 bg-black/30 p-7 text-white shadow-2xl backdrop-blur-xl lg:mt-14">
              <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.32em] text-emerald-200">
                Now showing
              </p>
              <p className="mt-5 text-[0.68rem] uppercase tracking-[0.32em] text-white/55">
                {current.collection}
              </p>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-white">{current.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{current.description}</p>

              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-sm uppercase tracking-[0.32em] text-emerald-200">
                  ${current.price.toFixed(2)}
                </span>
                <Link
                  href={current.href}
                  className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/80 transition hover:text-emerald-200"
                >
                  Open collection
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/80 transition hover:border-emerald-300 hover:text-emerald-200"
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/80 transition hover:border-emerald-300 hover:text-emerald-200"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.7rem] uppercase tracking-[0.38em] text-emerald-700">
                Landing gallery
              </p>
              <h2 className="mt-4 text-3xl font-light tracking-tight text-stone-900 sm:text-4xl">
                Browse the available work like a gallery wall, then move into each collection.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-600">
                Click any piece below to feature it above. The cart icon stays in the top right so
                checkout is always close by.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/handmade"
                className="rounded-full border border-stone-300 px-5 py-3 text-[0.72rem] uppercase tracking-[0.28em] text-stone-700 transition hover:border-emerald-300 hover:text-emerald-700"
              >
                Shop Handmade
              </Link>
              <Link
                href="/collages"
                className="rounded-full border border-stone-300 px-5 py-3 text-[0.72rem] uppercase tracking-[0.28em] text-stone-700 transition hover:border-emerald-300 hover:text-emerald-700"
              >
                Shop Collages
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {displayArtworks.map((artwork, index) => (
              <button
                key={artwork.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`group overflow-hidden rounded-[1.75rem] border bg-white text-left transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-sm ${
                  index === safeCurrentIndex
                    ? 'border-emerald-500 shadow-lg shadow-emerald-100'
                    : 'border-stone-200'
                }`}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.68rem] uppercase tracking-[0.28em] text-stone-800">
                    {artwork.collection}
                  </span>
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-light tracking-tight text-stone-900">
                      {artwork.title}
                    </h3>
                    <span className="text-[0.72rem] uppercase tracking-[0.25em] text-emerald-700">
                      ${artwork.price.toFixed(0)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-stone-600">{artwork.description}</p>
                  <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.28em]">
                    <span className={`rounded-full px-3 py-1 ${artwork.accent}`}>Feature</span>
                    <span className="text-stone-500 transition group-hover:text-emerald-700">
                      Select
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-6 pt-4 sm:px-8 lg:px-12">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-emerald-700">
              Same tabs, simplified
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-light tracking-tight text-stone-900">
              The landing page now opens like a store gallery, while the full site still branches
              into the same four destinations.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {DESTINATIONS.map((destination) => (
                <Link
                  key={destination.href}
                  href={destination.href}
                  className="group rounded-[1.5rem] border border-stone-200 p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-sm"
                >
                  <h3 className="text-xl font-light tracking-tight text-stone-900">
                    {destination.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    {destination.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.28em] text-stone-500 transition group-hover:text-emerald-700">
                    Open section
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
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
