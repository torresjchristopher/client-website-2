# Quick Start Guide

## 🚀 Get Your Artist Store Running in 5 Minutes

### What You're Getting

A complete artist e-commerce store with:
- **Gallery Mode** - Slideshow carousel for browsing artworks
- **Grid Mode** - Grid view of all artworks  
- **Upload System** - Artists can upload artwork with images, titles, descriptions, and prices
- **Shopping Cart** - Customers can add items and checkout
- **Stripe Payments** - Secure payment processing
- **Firebase Backend** - Real-time database with cloud storage

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Python 3.8+ ([Download](https://www.python.org/))
- A Firebase account ([Create for free](https://firebase.google.com/))
- A Stripe account ([Create for free](https://stripe.com/))

### Step 1: Set Up Firebase (5 min)

1. Go to https://console.firebase.google.com
2. Click "Create a project" and follow the steps
3. In your project:
   - Go to **Realtime Database** → Create Database (start in test mode)
   - Go to **Storage** → Get Started
4. Click ⚙️ → **Project Settings**
5. Copy your config object (you'll need these values next)

### Step 2: Configure Environment Variables (2 min)

Edit `artist-store/.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_apiKey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_projectId
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storageBucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messagingSenderId
NEXT_PUBLIC_FIREBASE_APP_ID=your_appId
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Get your Stripe keys from: https://dashboard.stripe.com/apikeys

### Step 3: Set Up Backend (2 min)

```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install and run
pip install -r requirements.txt
```

Edit `backend/.env`:
```
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_test_YOUR_WEBHOOK
```

Start the backend:
```bash
python app.py
```

You should see: `Running on http://127.0.0.1:5000`

### Step 4: Run Frontend

In a new terminal, from project root:

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

### Test the Store

1. **Upload an artwork**:
   - Click "Upload Artwork" button
   - Select an image
   - Fill in title, description, price
   - Click "Upload Artwork"

2. **Browse in Gallery Mode** (default):
   - Use arrow buttons to navigate
   - Click "Add to Cart"

3. **Switch to Grid Mode**:
   - Click the Grid icon in top right
   - See all artworks at once

4. **Checkout**:
   - Click shopping cart button (bottom right)
   - Use Stripe test card: **4242 4242 4242 4242**
   - Any future expiry date, any CVC

### Folder Structure

```
artist-store/
├── app/              # Frontend pages
├── components/       # Reusable components
│   ├── Gallery.tsx       # Main view
│   ├── ArtworkCard.tsx    # Individual artwork
│   ├── UploadForm.tsx     # Upload interface
│   └── Cart.tsx           # Shopping cart
├── lib/firebase.ts   # Firebase config
├── backend/          # Flask API
│   ├── app.py        # Stripe & checkout
│   └── requirements.txt
└── .env.local        # Your secrets
```

### Troubleshooting

**"Images not loading"**
- Check Firebase Storage rules (should be public in test mode)

**"Checkout button doesn't work"**
- Ensure Flask backend is running on port 5000
- Check browser console for errors

**"Artworks not appearing"**
- Verify Firebase Realtime Database rules allow writes (test mode)
- Check .env.local has correct Firebase config

**"Module not found" errors**
- Run `npm install` in project root

### Next Steps

- **Customize colors**: Edit Tailwind classes in components
- **Deploy frontend**: Run `npx vercel` and connect to Vercel
- **Deploy backend**: Push to Heroku or Railway, set environment variables
- **Use real Stripe keys**: Switch from test keys to live keys when ready

### Key Files to Understand

| File | Purpose |
|------|---------|
| `components/Gallery.tsx` | Handles gallery/grid mode switching |
| `components/UploadForm.tsx` | Uploads images to Firebase Storage and saves metadata |
| `components/Cart.tsx` | Shopping cart with checkout integration |
| `backend/app.py` | Creates Stripe checkout sessions |
| `.env.local` | All your API keys and configuration |

### Support

If something doesn't work:
1. Check the browser console (F12) for JavaScript errors
2. Check the terminal for backend errors
3. Verify all environment variables are set correctly
4. Make sure all services are running (npm dev + Flask)

Happy selling! 🎨
