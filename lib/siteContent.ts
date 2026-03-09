export interface ShopArtwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string[];
}

export interface DocumentaryEntry {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  year: string;
  videoUrl: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "the-room-a-collage-makes",
    title: "The Room a Collage Makes",
    date: "March 2026",
    readTime: "4 min read",
    excerpt:
      "A short reflection on how fragments, scraps, and memory can hold a complete emotional world when they are arranged with care.",
    body: [
      "A collage can feel like a private room built from public materials. A clipping, a photograph, a color field, and a sentence become a new atmosphere once they are placed beside each other.",
      "That is what interests me most about making culture from fragments. We do not always need a loud statement. Sometimes we need a patient arrangement that lets emotion arrive slowly.",
      "SweetPear is meant to hold that kind of work: writing that lingers, images that build their own language, and handmade pieces that keep the evidence of touch.",
    ],
  },
  {
    id: "notes-on-soft-archives",
    title: "Notes on Soft Archives",
    date: "February 2026",
    readTime: "5 min read",
    excerpt:
      "What I save, what I reframe, and why tenderness belongs inside editorial spaces as much as critique does.",
    body: [
      "A soft archive is not disorganized. It is intimate. It keeps traces of the ordinary and treats them like evidence that a life was fully felt.",
      "I want my practice to preserve those traces without sanding them down into something too polished to recognize. Writing can do that. So can film. So can an object made by hand.",
      "The site is designed to stay quiet enough for the work to breathe. Minimal structure makes room for layered content.",
    ],
  },
  {
    id: "why-handmade-still-matters",
    title: "Why Handmade Still Matters",
    date: "January 2026",
    readTime: "6 min read",
    excerpt:
      "A note on slowness, texture, and why physical art still changes the feeling of a room in ways a feed cannot.",
    body: [
      "Handmade work carries decisions that cannot be fully flattened into an image. Scale, surface, weight, and imperfection all become part of the meaning.",
      "That is why the shop side of SweetPear needs to remain simple. The art should feel close and legible, not crowded by interface noise.",
      "The goal is a space where cultural writing, conceptual work, and purchasable pieces can live beside each other without competing for attention.",
    ],
  },
];

export const COLLAGE_ARTWORKS: ShopArtwork[] = [
  {
    id: "collage-soft-archive",
    title: "Soft Archive",
    description:
      "A conceptual collage about tenderness, memory, and the way a room keeps the feeling of the people who passed through it. Available as a poster or keepsake print.",
    price: 68,
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "collage-red-thread",
    title: "Red Thread Study",
    description:
      "Built around rhythm and return, this piece imagines connection as something quiet but impossible to ignore. A souvenir print from the SweetPear archive.",
    price: 72,
    imageUrl:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "collage-sidewalk-prayer",
    title: "Sidewalk Prayer",
    description:
      "An arrangement of urban fragments, handwritten texture, and devotional color. It speaks to what people carry home from the street and from themselves.",
    price: 64,
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "collage-after-rain",
    title: "After Rain",
    description:
      "A poster-sized collage for the feeling that follows release: reflective, softened, and newly aware of color.",
    price: 70,
    imageUrl:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80",
  },
];

export const HANDMADE_ARTWORKS: ShopArtwork[] = [
  {
    id: "handmade-velvet-study",
    title: "Velvet Study I",
    description:
      "A handmade piece shaped by layered pigment and soft red tones, created to bring a warm, intimate focal point into a room.",
    price: 180,
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "handmade-gold-hours",
    title: "Gold Hours",
    description:
      "Textural handmade art that moves between calm and glow, with a finish meant to reward close looking.",
    price: 220,
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "handmade-house-song",
    title: "House Song",
    description:
      "A physical piece about domestic ritual and softness, designed to feel collected rather than mass-produced.",
    price: 195,
    imageUrl:
      "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "handmade-night-bloom",
    title: "Night Bloom",
    description:
      "A richer, darker composition with floral movement and hand-finished detail, created for collectors who want texture and atmosphere.",
    price: 235,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
  },
];

export const DOCUMENTARY_ENTRIES: DocumentaryEntry[] = [
  {
    id: "documentary-city-quiet",
    title: "City Quiet",
    description:
      "A cinematic vignette about softness inside urban motion, filmed as a meditation on color, pacing, and observation.",
    imageUrl:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    duration: "08:14",
    year: "2026",
    videoUrl: "https://www.youtube.com/",
  },
  {
    id: "documentary-kitchen-light",
    title: "Kitchen Light",
    description:
      "A short documentary experiment that treats ordinary domestic space as cinema, memory, and visual essay.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    duration: "06:27",
    year: "2026",
    videoUrl: "https://www.youtube.com/",
  },
  {
    id: "documentary-diary-of-color",
    title: "Diary of Color",
    description:
      "A moving-image journal about tone, weather, and presence, intended to live between vlog, documentary, and art film.",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    duration: "09:03",
    year: "2025",
    videoUrl: "https://www.youtube.com/",
  },
];
