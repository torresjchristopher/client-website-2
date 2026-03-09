# Artist Store with Stripe Integration

A simple, elegant online store for artists to sell their work with real-time uploads, gallery/grid viewing modes, and Stripe payment processing.

## Features

- ✨ **Gallery Mode** - Slideshow view for browsing artworks one at a time
- 📊 **Grid Mode** - View all artworks in a responsive grid layout
- 📤 **Upload Management** - Upload new artworks with images, titles, descriptions, and prices
- 🛒 **Shopping Cart** - Add artworks to cart with quantity management
- 💳 **Stripe Integration** - Secure payment processing
- 🔥 **Firebase Backend** - Real-time database and cloud storage

## Tech Stack

- **Frontend**: Next.js 16+ (TypeScript, Tailwind CSS)
- **Backend**: Python Flask with Stripe
- **Database**: Firebase Realtime Database
- **Storage**: Firebase Cloud Storage
- **Payments**: Stripe

## Setup Instructions

### Prerequisites

- Node.js 18+
- Python 3.8+
- Firebase project (https://firebase.google.com)
- Stripe account (https://stripe.com)

### 1. Firebase Setup

1. Create a new Firebase project at https://console.firebase.google.com
2. Enable **Realtime Database** and **Cloud Storage**
3. Go to Project Settings → Service Accounts → Generate new private key (for backend)
4. Copy your Firebase configuration

### 2. Stripe Setup

1. Get your API keys from https://dashboard.stripe.com/apikeys
2. Create a webhook endpoint and get your webhook secret

### 3. Frontend Setup

```bash
# Update .env.local with your credentials
# Edit .env.local and fill in your Firebase and Stripe keys
```

### 4. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Update .env with your Stripe keys
# Run Flask server
python app.py
```

The Flask server will start on http://localhost:5000

### 5. Run the Application

```bash
# In project root
npm run dev
```

Visit http://localhost:3000

## Usage

### For Artists
1. Click "Upload Artwork" button
2. Fill in details (image, title, description, price)
3. Click "Upload Artwork"

### For Customers
1. **Gallery Mode** (default) - Browse artworks one at a time with prev/next buttons
2. Click the **Grid icon** (top right) to switch to Grid Mode - See all artworks in a grid
3. Hover over artworks to add to cart
4. Click cart button (bottom right) to checkout

## Project Structure

```
artist-store/
├── app/                      # Next.js pages
│   ├── page.tsx             # Main gallery
│   ├── success/page.tsx      # Payment success
│   ├── cancel/page.tsx       # Payment cancelled
│   └── api/checkout/route.ts # Checkout endpoint
├── components/              # React components
│   ├── Gallery.tsx          # Gallery/grid switcher
│   ├── ArtworkCard.tsx       # Artwork card
│   ├── UploadForm.tsx        # Upload form
│   └── Cart.tsx              # Shopping cart
├── lib/firebase.ts          # Firebase config
├── backend/                 # Flask API
│   ├── app.py               # Stripe & checkout
│   └── requirements.txt
└── .env.local               # Environment variables
```

## Key Features Explained

### Gallery Mode
- Slideshow carousel of artworks
- Left/right navigation buttons
- Shows current position (e.g., "3 / 10")
- Large image display with title, description, and price
- Quick "Add to Cart" button

### Grid Mode
- Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
- Hover effects with image zoom
- "Add to Cart" button appears on hover
- Better for browsing entire collection

### Upload Form
- Drag-and-drop image upload
- Real-time validation
- Success/error messages
- Images stored in Firebase Storage
- Metadata in Firebase Realtime Database

### Shopping Cart
- Floating cart button with item counter
- Slide-out cart sidebar
- Adjust quantities in-cart
- Real-time total calculation
- Stripe checkout integration

## Environment Variables

### .env.local (Frontend)
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### backend/.env
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Testing Stripe

Use test card: **4242 4242 4242 4242** with any future expiry and any CVC.

## Deployment

### Frontend (Vercel)
```bash
npx vercel
# Configure environment variables in Vercel dashboard
```

### Backend (Heroku/Railway)
Push to your platform and set environment variables for Stripe keys.

Update `NEXT_PUBLIC_API_URL` to your deployed backend URL.

## Customization

- **Colors**: Edit Tailwind classes in components
- **Styling**: Modify component CSS in component files
- **Database**: Firebase Realtime Database structure is stored under `/artworks`

## Troubleshooting

- **Images not loading**: Check Firebase Storage permissions
- **Checkout fails**: Ensure Flask is running and CORS enabled
- **Artworks not saving**: Verify Firebase rules allow writes

Happy selling! 🎨
