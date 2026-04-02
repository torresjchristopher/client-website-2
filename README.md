# SweetPear Storefront

A SweetPear storefront for artwork, collages, writing, and documentaries with a private client upload tab, Firebase-backed gallery updates, and Stripe Checkout.

## Features

- Main storefront gallery with SweetPear branding and rotating red wordmark treatment
- Firebase-powered artwork, collage, and documentary content
- Password-protected client upload tab at `/client`
- Stripe Checkout created through Next.js API routes
- Separate success and cancel purchase pages
- GitHub-to-Netlify deployment path

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Firebase Realtime Database + Storage
- Stripe Checkout

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with:

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

3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Main Routes

- `/` - storefront landing gallery
- `/handmade` - handmade art gallery
- `/collages` - collage collection
- `/documentaries` - documentary entries
- `/blog` - writing section
- `/client` - password-protected client upload page
- `/success` - Stripe success page
- `/cancel` - Stripe cancel page

## Stripe

Stripe checkout sessions are created in `app/api/checkout/route.ts`.

Use test card `4242 4242 4242 4242` with any future expiry and any CVC.

## Deployment From GitHub

Use Netlify:

1. Push `main` to GitHub.
2. In Netlify, choose **Add new site** -> **Import from Git**.
3. Select `torresjchristopher/client-website-2`.
4. Build command: `npm run build`
5. Netlify will detect the Next.js app automatically.
6. Add the Firebase variables, `STRIPE_SECRET_KEY`, and `CLIENT_PORTAL_PASSWORD=Martini` in Netlify.

## DNS For `sweetpear.org`

- `www` -> `CNAME` -> `your-site-name.netlify.app`
- `@` -> `A` -> `75.2.60.5`

If your DNS provider supports ALIAS or ANAME, you can use:

- `@` -> `ALIAS/ANAME` -> `apex-loadbalancer.netlify.com`

## Notes

- The `backend/` folder is legacy and is not required for the current deployment flow.
- Firebase rules must allow reads and writes for the content you want to publish.
