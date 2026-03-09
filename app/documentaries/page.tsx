'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { database } from '@/lib/firebase';
import { DOCUMENTARY_ENTRIES } from '@/lib/siteContent';

interface DocumentaryEntry {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration?: string;
  year?: string;
  videoUrl?: string;
}

export default function DocumentariesPage() {
  const [entries, setEntries] = useState<DocumentaryEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const documentariesRef = ref(database, 'documentaries');
    return onValue(
      documentariesRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setEntries([]);
          return;
        }

        const data = snapshot.val() as Record<string, Omit<DocumentaryEntry, 'id'>>;
        setEntries(Object.entries(data).map(([id, value]) => ({ id, ...value })));
      },
      (error) => {
        console.error('Failed to load documentaries:', error);
      },
    );
  }, []);

  const displayEntries = entries.length > 0 ? entries : DOCUMENTARY_ENTRIES;

  return (
    <div className="min-h-screen bg-[#183a67] text-white">
      <Navbar
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
        isDark
      />

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[0.7rem] uppercase tracking-[0.38em] text-blue-100/80">
              SweetPear / Documentaries
            </p>
            <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">
              Cinematic vlogs and documentaries with a distinct blue backdrop.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-blue-50/78">
              This section is made for moving-image work: uploaded stills, documentary notes,
              and a clear path out to your YouTube archive when you are ready.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-blue-100/70">
              Publishing next
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-5 py-3 text-center text-[0.72rem] uppercase tracking-[0.28em] text-[#183a67] transition hover:bg-blue-50"
              >
                Visit YouTube
              </a>
              <Link
                href="/upload"
                className="rounded-full border border-white/20 px-5 py-3 text-center text-[0.72rem] uppercase tracking-[0.28em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Upload Documentary Entry
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-3">
          {displayEntries.map((entry) => (
            <article
              key={entry.id}
              className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                <Image
                  src={entry.imageUrl}
                  alt={entry.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-blue-100/70">
                  {entry.year ? <span>{entry.year}</span> : null}
                  {entry.duration ? <span>{entry.duration}</span> : null}
                </div>
                <h2 className="text-2xl font-light tracking-tight">{entry.title}</h2>
                <p className="text-sm leading-relaxed text-blue-50/78">{entry.description}</p>
                <a
                  href={entry.videoUrl ?? 'https://www.youtube.com/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border-b border-white pb-1 text-[0.72rem] uppercase tracking-[0.28em] text-white transition hover:text-blue-100 hover:border-blue-100"
                >
                  Watch / View Link
                </a>
              </div>
            </article>
          ))}
        </section>
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
