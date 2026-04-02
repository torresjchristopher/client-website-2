import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

interface CheckoutItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

function isCheckoutItem(value: unknown): value is CheckoutItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Partial<CheckoutItem>;

  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    Number.isFinite(item.price) &&
    typeof item.price === 'number' &&
    item.price > 0 &&
    Number.isInteger(item.quantity) &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  );
}

function getBaseUrl(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin) {
    return origin;
  }

  const forwardedHost = request.headers.get('x-forwarded-host');
  if (forwardedHost) {
    const forwardedProtocol = request.headers.get('x-forwarded-proto') ?? 'https';
    return `${forwardedProtocol}://${forwardedHost}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}

export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY is not configured.' },
      { status: 500 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof payload !== 'object' || payload === null || !('items' in payload)) {
    return NextResponse.json({ error: 'No items in cart.' }, { status: 400 });
  }

  const { items } = payload as { items?: unknown };

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'No items in cart.' }, { status: 400 });
  }

  if (!items.every(isCheckoutItem)) {
    return NextResponse.json({ error: 'Cart items are invalid.' }, { status: 400 });
  }

  const stripe = new Stripe(stripeSecretKey);
  const baseUrl = getBaseUrl(request);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        storefront: 'sweetpear',
        itemCount: String(items.length),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a checkout URL.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (checkoutError) {
    console.error('Stripe checkout failed:', checkoutError);
    return NextResponse.json(
      { error: 'Unable to start Stripe checkout right now.' },
      { status: 500 },
    );
  }
}
