# Quick Start Guide

## 1. Install

```bash
npm install
```

## 2. Add Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
STRIPE_SECRET_KEY=sk_test_...
CLIENT_PORTAL_PASSWORD=Martini
```

## 3. Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## 4. Upload Art

1. Open `/client`
2. Enter the password from `CLIENT_PORTAL_PASSWORD`
3. Upload an image, title, price, and description
4. Publish the piece to the storefront gallery

## 5. Test Checkout

- Add an item to cart
- Start checkout
- Use Stripe test card `4242 4242 4242 4242`

## 6. Deploy From GitHub

1. Push `main` to GitHub
2. Import the repo into Netlify
3. Build command: `npm run build`
4. Add the same environment variables in Netlify

## DNS

- `www` -> `CNAME` -> `your-site-name.netlify.app`
- `@` -> `A` -> `75.2.60.5`
- Optional root alternative: `@` -> `ALIAS/ANAME` -> `apex-loadbalancer.netlify.com`
