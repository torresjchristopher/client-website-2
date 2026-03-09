'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import {
  addCartItem,
  CART_EVENT,
  type CartItem,
  type CartWindow,
  getCartCount,
  getCartTotal,
  readCart,
  removeCartItem,
  updateCartItemQuantity,
  writeCart,
} from '@/lib/cart';

interface CartProps {
  isOpen: boolean;
  onToggle: () => void;
  onItemCountChange?: (count: number) => void;
}

export default function Cart({ isOpen, onToggle, onItemCountChange }: CartProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const syncItems = () => {
      setItems(readCart());
    };

    syncItems();

    const cartWindow = window as CartWindow;
    cartWindow.cartAddItem = (id: string, title: string, price: number) => {
      const nextItems = addCartItem(readCart(), id, title, price);
      writeCart(nextItems);
      setItems(nextItems);
    };

    window.addEventListener(CART_EVENT, syncItems);
    window.addEventListener('storage', syncItems);

    return () => {
      window.removeEventListener(CART_EVENT, syncItems);
      window.removeEventListener('storage', syncItems);
      delete cartWindow.cartAddItem;
    };
  }, []);

  useEffect(() => {
    onItemCountChange?.(getCartCount(items));
  }, [items, onItemCountChange]);

  const updateItems = (nextItems: CartItem[]) => {
    setItems(nextItems);
    writeCart(nextItems);
  };

  const total = getCartTotal(items);

  const handleCheckout = async () => {
    if (items.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Checkout request failed.');
      }

      const data = (await response.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      window.alert('Unable to start checkout right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <button
            aria-label="Close cart"
            className="flex-1 bg-black/35"
            onClick={onToggle}
          />

          <aside className="flex w-full max-w-md flex-col border-l border-red-100 bg-white">
            <div className="flex items-center justify-between border-b border-red-100 px-8 py-7">
              <div className="flex items-center gap-3">
                <ShoppingCart size={18} className="text-red-600" />
                <h2 className="text-2xl font-light tracking-tight text-stone-900">Checkout</h2>
              </div>
              <button
                onClick={onToggle}
                className="rounded-full p-2 text-stone-500 transition hover:bg-red-50 hover:text-red-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-8 py-8">
              {items.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-red-100 px-6 py-10 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="border-b border-red-100 pb-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <h3 className="text-lg font-light tracking-tight text-stone-900">
                          {item.title}
                        </h3>
                        <p className="text-[0.72rem] uppercase tracking-[0.25em] text-stone-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <button
                        onClick={() => updateItems(removeCartItem(items, item.id))}
                        className="text-stone-400 transition hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateItems(updateCartItemQuantity(items, item.id, item.quantity - 1))
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-100 text-stone-600 transition hover:border-red-200 hover:text-red-700"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm uppercase tracking-[0.2em] text-stone-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateItems(updateCartItemQuantity(items, item.id, item.quantity + 1))
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-100 text-stone-600 transition hover:border-red-200 hover:text-red-700"
                      >
                        +
                      </button>
                      <span className="ml-auto text-[0.75rem] uppercase tracking-[0.25em] text-red-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-red-100 px-8 py-7">
                <div className="flex items-center justify-between">
                  <span className="text-[0.72rem] uppercase tracking-[0.3em] text-stone-500">
                    Total
                  </span>
                  <span className="text-xl font-light tracking-tight text-red-700">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="mt-6 w-full rounded-full bg-red-600 px-5 py-3 text-[0.72rem] uppercase tracking-[0.28em] text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300"
                >
                  {isLoading ? 'Processing...' : 'Proceed to Stripe'}
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
