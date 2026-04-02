# SweetPear Storefront - Ready To Deploy

The app is now set up around a single Next.js deployment:

- Stripe checkout runs through `app/api/checkout/route.ts`
- The private client upload page lives at `/client`
- Firebase powers the gallery content
- The homepage uses SweetPear branding with the red rotating wordmark

## Required Environment Variables

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

## Local Run

```bash
npm install
npm run dev
```

## GitHub -> Netlify Deploy

1. Push `main` to GitHub
2. Import `torresjchristopher/client-website-2` into Netlify
3. Set build command to `npm run build`
4. Add the environment variables above
5. Add the custom domain in Netlify

## DNS Records

- `www` -> `CNAME` -> `your-site-name.netlify.app`
- `@` -> `A` -> `75.2.60.5`
- Optional ALIAS/ANAME for root -> `apex-loadbalancer.netlify.com`

## Important Files

- `app/api/checkout/route.ts` - Stripe checkout
- `app/api/client-auth/route.ts` - client password auth
- `app/client/page.tsx` - client upload entry page
- `components/UploadForm.tsx` - publishing artwork
- `lib/firebase.ts` - Firebase bootstrapping
