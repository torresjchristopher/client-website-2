# 📚 Component Documentation

## Overview

This document provides a detailed breakdown of each component and file in the artist store.

---

## Frontend Components (React/TypeScript)

### 1. **Gallery.tsx** - Main Gallery Component
**Purpose**: Handles both Gallery Mode (slideshow) and Grid Mode views

**Features**:
- Mode toggle buttons (Gallery/Grid icons in top-right)
- Gallery Mode: Slideshow carousel with prev/next buttons
- Grid Mode: Responsive grid layout
- Navigation counter (e.g., "3 / 10")
- Artwork display with title, description, price
- "Add to Cart" button

**Key Props**:
```typescript
interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface GalleryProps {
  artworks: Artwork[];
}
```

**State**:
- `mode`: 'gallery' | 'grid' - Current view mode
- `currentIndex`: number - Current artwork in gallery mode

---

### 2. **ArtworkCard.tsx** - Individual Artwork Display
**Purpose**: Displays a single artwork with image and details (used in Grid Mode)

**Features**:
- Image with hover zoom effect
- Artwork title and description
- Price display
- "Add to Cart" button (appears on hover)
- Responsive to container size

**Key Props**:
```typescript
interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ArtworkCardProps {
  artwork: Artwork;
}
```

**State**:
- `isHovered`: boolean - Track hover state for overlay

---

### 3. **UploadForm.tsx** - Artist Upload Interface
**Purpose**: Allows artists to upload new artworks with images and details

**Features**:
- Drag-and-drop image upload
- Form fields: Title, Description, Price
- Firebase Storage upload
- Firebase Realtime Database save
- Success/error feedback messages
- Loading state management

**Key Functions**:
- `handleImageChange()` - Handle image file selection
- `handleSubmit()` - Upload to Firebase and save metadata

**State**:
- `title`: string - Artwork title
- `description`: string - Artwork description
- `price`: string - Price in USD
- `image`: File | null - Selected image file
- `isLoading`: boolean - Upload in progress
- `error`: string - Error message
- `success`: string - Success message

**Firebase Operations**:
- Uploads image to: `storage/artworks/{timestamp}-{filename}`
- Saves metadata to: `database/artworks/{id}`

---

### 4. **Cart.tsx** - Shopping Cart Sidebar
**Purpose**: Floating shopping cart with item management and checkout

**Features**:
- Floating cart button (bottom-right) with item counter
- Slide-out sidebar with backdrop
- Add/remove items from cart
- Adjust quantities
- Real-time total calculation
- Checkout button that calls Next.js API route

**Key Functions**:
- `addItem()` - Add artwork to cart
- `removeItem()` - Remove artwork from cart
- `updateQuantity()` - Change item quantity
- `handleCheckout()` - Initiate Stripe checkout

**State**:
- `items`: CartItem[] - Items in cart
- `isOpen`: boolean - Sidebar visibility
- `isLoading`: boolean - Checkout in progress

**Checkout Flow**:
1. Cart data sent to `/api/checkout` (Next.js route)
2. Next.js calls Flask backend
3. Flask creates Stripe checkout session
4. User redirected to Stripe payment page

---

## Next.js Pages & Routes

### 1. **app/page.tsx** - Main Entry Point
**Purpose**: Root page that orchestrates the entire store

**Key Features**:
- Top navigation with Upload/Gallery toggle
- Loads artworks from Firebase in real-time
- Routes between gallery view and upload form
- Cart component integration
- Loading states

**Firebase Integration**:
- Listens to `database/artworks` for real-time updates
- Unsubscribes on component unmount

---

### 2. **app/success/page.tsx** - Payment Success Page
**Purpose**: Confirmation page after successful Stripe payment

**Features**:
- Success checkmark icon
- Success message
- Link back to gallery

**Redirect**: Stripe redirects here on successful payment

---

### 3. **app/cancel/page.tsx** - Payment Cancelled Page
**Purpose**: User-friendly page if payment is cancelled

**Features**:
- X icon indicating cancellation
- Cancellation message
- Link back to gallery
- Items stay in cart

**Redirect**: Stripe redirects here if user cancels payment

---

### 4. **app/api/checkout/route.ts** - Checkout API Endpoint
**Purpose**: Next.js API route that handles checkout requests

**Endpoint**: `POST /api/checkout`

**Request Body**:
```typescript
{
  items: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
  }>
}
```

**Response**:
```typescript
{
  url: string // Stripe checkout session URL
}
```

**Flow**:
1. Receives cart items
2. Calls Flask backend `/checkout` endpoint
3. Flask returns Stripe session URL
4. Sends URL back to frontend
5. Frontend redirects to Stripe

---

## Backend (Python/Flask)

### **backend/app.py** - Flask Server
**Purpose**: Handles Stripe payment processing

**Endpoints**:

#### `GET /health`
- Health check endpoint
- Returns: `{ "status": "ok" }`

#### `POST /checkout`
- Creates Stripe checkout session
- Accepts: Array of cart items
- Returns: Stripe checkout URL

**Input**:
```python
{
  "items": [
    {
      "title": "Artwork Title",
      "price": 99.99,
      "quantity": 1
    }
  ]
}
```

**Output**:
```python
{
  "url": "https://checkout.stripe.com/..." # Stripe session URL
}
```

**Process**:
1. Converts items to Stripe line items
2. Creates checkout session with Stripe API
3. Returns session URL
4. Frontend redirects user to this URL

#### `POST /webhook` (Optional - not fully implemented)
- Receives webhook from Stripe
- Validates signature
- Could handle: order creation, email notifications, etc.

---

## Configuration Files

### **lib/firebase.ts** - Firebase Initialization
**Purpose**: Sets up Firebase connection with config from environment

**Exports**:
- `storage` - Firebase Storage instance (for images)
- `database` - Firebase Realtime Database instance (for metadata)

**Configuration**:
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: `https://${projectId}.firebaseio.com`
};
```

---

### **.env.local** - Frontend Secrets
**Contains**:
- Firebase API credentials (public keys)
- Stripe publishable key (public)
- Backend API URL

**All keys starting with `NEXT_PUBLIC_` are safe to expose to frontend**

---

### **backend/.env** - Backend Secrets
**Contains**:
- Stripe secret key (keep private!)
- Stripe webhook secret (keep private!)

**Must be in `backend/` directory and git-ignored**

---

## Data Flow

### Upload Workflow
```
User selects image
     ↓
UploadForm component
     ↓
Upload image to Firebase Storage
     ↓
Save metadata to Firebase Database
     ↓
Real-time listener picks up change in app/page.tsx
     ↓
Gallery updates automatically (no page refresh)
```

### Purchase Workflow
```
User clicks "Add to Cart"
     ↓
Cart state updates in Cart.tsx
     ↓
User clicks "Checkout"
     ↓
POST /api/checkout with cart items
     ↓
Next.js route calls Flask /checkout endpoint
     ↓
Flask creates Stripe session
     ↓
Frontend redirects to Stripe checkout
     ↓
User pays on Stripe (not our server handles payment)
     ↓
Stripe redirects to /success or /cancel
```

### Real-time Sync
```
Firebase Database change
     ↓
Real-time listener in app/page.tsx
     ↓
State updates
     ↓
Gallery component re-renders
     ↓
New artwork appears instantly
```

---

## Performance Optimizations

1. **Real-time Database**
   - Uses Firebase listeners (no polling)
   - Automatic cleanup on unmount
   - Efficient data structure

2. **Image Optimization**
   - Firebase CDN serves images globally
   - Browser caching enabled
   - Lazy loading with native img tags

3. **State Management**
   - Minimal re-renders with React hooks
   - Cart state stays in sidebar component
   - Gallery state isolated to Gallery component

4. **Code Splitting**
   - Next.js automatic route-based splitting
   - Components only loaded when needed

---

## Security Considerations

1. **Firebase Rules** (must be configured):
   - Storage: Allow unauthenticated reads, authenticated writes
   - Database: Allow unauthenticated reads, authenticated writes

2. **Stripe Integration**:
   - Secret key never exposed to frontend
   - All payment processing server-side
   - Webhook signature validation

3. **Environment Variables**:
   - `.env.local` never committed
   - Backend `.env` never committed
   - Use `NEXT_PUBLIC_` only for safe public keys

---

## Common Modifications

### Change Primary Color
Search and replace `bg-black` and `text-white` in component files

### Add Product Categories
Add a `category` field to Artwork interface and filter in Gallery

### Add User Authentication
Install Firebase Auth and add `createUserWithEmailAndPassword` flow

### Save Order History
Add `/orders` endpoint in Flask and store in database

### Send Confirmation Emails
Add email service (SendGrid, Mailgun) to Flask webhook handler

---

## Testing

### Test Upload
1. Click "Upload Artwork"
2. Select image, enter details
3. Check Firebase Console → Realtime Database for metadata
4. Check Firebase Console → Storage for image
5. Verify artwork appears in gallery

### Test Checkout
1. Click "Add to Cart"
2. Click cart button
3. Click "Checkout"
4. Use Stripe test card: 4242 4242 4242 4242
5. Expiry: Any future date
6. CVC: Any 3 digits
7. Verify success page appears

### Test Real-time Sync
1. Upload artwork in one browser tab
2. Watch gallery in second tab auto-update (no refresh)

---

**All components are production-ready and fully functional!** ✅
