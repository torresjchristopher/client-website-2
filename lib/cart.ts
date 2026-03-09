export const CART_STORAGE_KEY = "sweetpear-cart";
export const CART_EVENT = "sweetpear-cart-updated";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export type CartAddItem = (id: string, title: string, price: number) => void;

export interface CartWindow extends Window {
  cartAddItem?: CartAddItem;
}

function canUseWindow() {
  return typeof window !== "undefined";
}

export function readCart(): CartItem[] {
  if (!canUseWindow()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number",
    );
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  if (!canUseWindow()) {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function addCartItem(items: CartItem[], id: string, title: string, price: number) {
  const existing = items.find((item) => item.id === id);

  if (!existing) {
    return [...items, { id, title, price, quantity: 1 }];
  }

  return items.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
  );
}

export function updateCartItemQuantity(items: CartItem[], id: string, quantity: number) {
  if (quantity <= 0) {
    return items.filter((item) => item.id !== id);
  }

  return items.map((item) => (item.id === id ? { ...item, quantity } : item));
}

export function removeCartItem(items: CartItem[], id: string) {
  return items.filter((item) => item.id !== id);
}

export function addItemToWindowCart(id: string, title: string, price: number) {
  if (!canUseWindow()) {
    return;
  }

  (window as CartWindow).cartAddItem?.(id, title, price);
}
