'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import BrandWordmark from './BrandWordmark';
import { CART_EVENT, getCartCount, readCart } from '@/lib/cart';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  isDark?: boolean;
}

const MENU_ITEMS = [
  { href: '/client', label: 'Client' },
];

export default function Navbar({
  cartItemCount,
  onCartClick,
  isDark = false,
}: NavbarProps) {
  const [storedCount, setStoredCount] = useState(0);

  useEffect(() => {
    const syncCount = () => {
      setStoredCount(getCartCount(readCart()));
    };

    syncCount();
    window.addEventListener(CART_EVENT, syncCount);
    window.addEventListener('storage', syncCount);

    return () => {
      window.removeEventListener(CART_EVENT, syncCount);
      window.removeEventListener('storage', syncCount);
    };
  }, []);

  const displayCount = Math.max(cartItemCount, storedCount);
  const shellClass = isDark
    ? 'border-white/10 bg-black/35 text-white backdrop-blur-xl'
    : 'border-stone-200/70 bg-white/88 text-stone-800 backdrop-blur-xl';
  const mutedTextClass = isDark
    ? 'text-white/70 hover:text-rose-200'
    : 'text-stone-500 hover:text-red-600';

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 border-b ${shellClass}`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-4 px-6 py-4 sm:px-8">
        <Link href="/" className="flex min-w-0 flex-col gap-2">
          <span
            className={`text-[0.65rem] uppercase tracking-[0.4em] ${isDark ? 'text-white/60' : 'text-stone-500'}`}
          >
            SweetPear
          </span>
          <BrandWordmark className="text-[1.9rem] sm:text-[2.3rem]" subtle variant="header" />
        </Link>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] uppercase tracking-[0.3em] sm:order-2 sm:w-auto sm:flex-1 sm:justify-center sm:gap-x-6 lg:gap-x-8">
          {MENU_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={`transition ${mutedTextClass}`}>
              {item.label}
            </Link>
          ))}
        </div>

        <button
          onClick={onCartClick}
          aria-label={`Open checkout cart${displayCount > 0 ? `, ${displayCount} items` : ''}`}
          className={`relative order-2 ml-auto inline-flex h-10 w-10 items-center justify-center transition sm:order-3 ${mutedTextClass}`}
        >
          <ShoppingCart size={18} />
          <span className="sr-only">Checkout</span>
          {displayCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex min-w-5 justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-[0.62rem] font-semibold tracking-normal text-white">
              {displayCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
