'use client';

import { useState } from 'react';
import { BLOG_POSTS } from '@/lib/siteContent';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function BlogPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <div className="min-h-screen bg-[#184937] text-white">
      <Navbar
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
        isDark
      />

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <section className="max-w-3xl">
          <p className="text-[0.7rem] uppercase tracking-[0.38em] text-emerald-200">
            SweetPear / Writing
          </p>
          <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">
            Blog posts and writing, styled like a quiet editorial journal.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-emerald-50/80">
            This green backdrop gives SweetPear a Substack-like calm while keeping the work
            spacious, readable, and ready for a lot of content.
          </p>
        </section>

        <section className="mt-16 space-y-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur-xl"
            >
              <div className="flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-emerald-100/70">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-5 text-3xl font-light tracking-tight">{post.title}</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-emerald-50/80">
                {post.excerpt}
              </p>
              <div className="mt-6 space-y-4 border-t border-white/10 pt-6 text-sm leading-relaxed text-emerald-50/78">
                {post.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
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
