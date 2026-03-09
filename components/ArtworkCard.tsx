'use client';

import Image from 'next/image';
import { useState } from 'react';
import { addItemToWindowCart } from '@/lib/cart';

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ArtworkCardProps {
  artwork: Artwork;
  theme?: 'light' | 'dark';
}

export default function ArtworkCard({
  artwork,
  theme = 'light',
}: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === 'dark';

  return (
    <article
      className={[
        'overflow-hidden rounded-[1.75rem] border transition duration-300',
        isDark
          ? 'border-white/10 bg-white/10 backdrop-blur-sm'
          : 'border-stone-200/80 bg-white shadow-sm',
      ].join(' ')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={[
          'relative aspect-[4/5] overflow-hidden',
          isDark ? 'bg-white/5' : 'bg-[#faf7f4]',
        ].join(' ')}
      >
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />

        <div
          className={`absolute inset-0 flex items-end bg-gradient-to-t ${
            isHovered ? 'from-black/65 via-black/10 to-transparent' : 'from-black/0 to-transparent'
          } p-6 transition`}
        >
          <button
            onClick={() => addItemToWindowCart(artwork.id, artwork.title, artwork.price)}
            className={[
              'border-b pb-1 text-[0.72rem] uppercase tracking-[0.28em] transition',
              isDark
                ? 'border-white text-white hover:text-rose-100 hover:border-rose-100'
                : 'border-white text-white hover:text-red-100 hover:border-red-100',
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="space-y-3 p-6">
        <h3 className={`text-xl font-light tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
          {artwork.title}
        </h3>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-white/75' : 'text-stone-600'}`}>
          {artwork.description}
        </p>
        <p className={`text-base uppercase tracking-[0.25em] ${isDark ? 'text-rose-100' : 'text-red-700'}`}>
          ${artwork.price.toFixed(2)}
        </p>
      </div>
    </article>
  );
}
