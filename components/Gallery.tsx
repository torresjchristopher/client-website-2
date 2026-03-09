'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ArtworkCard from './ArtworkCard';
import { addItemToWindowCart } from '@/lib/cart';
import { MOCK_ARTWORKS } from '@/lib/mockData';

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface GalleryProps {
  artworks?: Artwork[];
  fallbackArtworks?: Artwork[];
  theme?: 'light' | 'dark';
}

const THEMES = {
  light: {
    toggleShell: 'border border-red-100 bg-white/95 shadow-sm',
    toggleActive: 'bg-red-600 text-white',
    toggleInactive: 'text-stone-500 hover:text-red-700',
    frame: 'border-stone-200 bg-white shadow-sm',
    imageBackdrop: 'bg-[#faf7f4]',
    panel: 'border-stone-200 bg-white/95 shadow-sm',
    eyebrow: 'text-red-600',
    heading: 'text-stone-900',
    body: 'text-stone-600',
    price: 'text-red-700',
    action: 'text-red-700 border-red-600 hover:text-red-800 hover:border-red-700',
    nav: 'text-stone-500 hover:text-red-700',
    emptyBg: 'bg-white',
    emptyText: 'text-stone-500',
  },
  dark: {
    toggleShell: 'border border-white/15 bg-white/10 backdrop-blur-xl',
    toggleActive: 'bg-white text-[#521a27]',
    toggleInactive: 'text-white/65 hover:text-white',
    frame: 'border-white/10 bg-white/5 backdrop-blur-xl',
    imageBackdrop: 'bg-white/5',
    panel: 'border-white/10 bg-white/10 backdrop-blur-xl',
    eyebrow: 'text-rose-100',
    heading: 'text-white',
    body: 'text-white/78',
    price: 'text-rose-100',
    action: 'text-rose-100 border-rose-100 hover:text-white hover:border-white',
    nav: 'text-white/70 hover:text-white',
    emptyBg: 'bg-transparent',
    emptyText: 'text-white/70',
  },
} as const;

export default function Gallery({
  artworks = [],
  fallbackArtworks = [],
  theme = 'light',
}: GalleryProps) {
  const [mode, setMode] = useState<'gallery' | 'grid'>('gallery');
  const [currentIndex, setCurrentIndex] = useState(0);
  const styles = THEMES[theme];

  const displayArtworks =
    artworks.length > 0
      ? artworks
      : fallbackArtworks.length > 0
        ? fallbackArtworks
        : MOCK_ARTWORKS;

  if (displayArtworks.length === 0) {
    return (
      <div className={`flex min-h-[50vh] items-center justify-center ${styles.emptyBg}`}>
        <p className={`text-lg font-light ${styles.emptyText}`}>No artworks available yet.</p>
      </div>
    );
  }

  const current = displayArtworks[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayArtworks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayArtworks.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-24 z-20 flex justify-end px-6 pt-2 sm:px-8 lg:px-12">
        <div className={`inline-flex items-center gap-2 rounded-full px-2 py-2 ${styles.toggleShell}`}>
          <button
            onClick={() => setMode('gallery')}
            className={`rounded-full px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] transition ${mode === 'gallery' ? styles.toggleActive : styles.toggleInactive}`}
          >
            Gallery
          </button>
          <button
            onClick={() => setMode('grid')}
            className={`rounded-full px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] transition ${mode === 'grid' ? styles.toggleActive : styles.toggleInactive}`}
          >
            Grid
          </button>
        </div>
      </div>

      {mode === 'gallery' && (
        <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-12">
          <div className={`overflow-hidden rounded-[2rem] border ${styles.frame}`}>
            <div className={`relative aspect-[4/5] w-full ${styles.imageBackdrop}`}>
              <Image
                src={current.imageUrl}
                alt={current.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <aside className={`flex h-fit flex-col rounded-[2rem] border p-8 ${styles.panel}`}>
            <p className={`text-[0.68rem] uppercase tracking-[0.35em] ${styles.eyebrow}`}>
              Featured piece
            </p>
            <h2 className={`mt-4 text-4xl font-light tracking-tight ${styles.heading}`}>
              {current.title}
            </h2>
            <p className={`mt-4 text-base leading-relaxed ${styles.body}`}>
              {current.description}
            </p>
            <p className={`mt-8 text-sm uppercase tracking-[0.32em] ${styles.price}`}>
              ${current.price.toFixed(2)}
            </p>
            <button
              onClick={() => addItemToWindowCart(current.id, current.title, current.price)}
              className={`mt-6 w-fit border-b pb-1 text-[0.72rem] uppercase tracking-[0.3em] transition ${styles.action}`}
            >
              Add to Cart
            </button>

            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={handlePrev}
                className={`inline-flex items-center gap-2 text-sm transition ${styles.nav}`}
              >
                <ChevronLeft size={18} />
                Prev
              </button>
              <span className={`text-[0.68rem] uppercase tracking-[0.28em] ${styles.body}`}>
                {currentIndex + 1} / {displayArtworks.length}
              </span>
              <button
                onClick={handleNext}
                className={`inline-flex items-center gap-2 text-sm transition ${styles.nav}`}
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </aside>
        </div>
      )}

      {mode === 'grid' && (
        <div className="px-6 pb-20 pt-10 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {displayArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} theme={theme} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
