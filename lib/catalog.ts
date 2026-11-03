// The catalogue: every product, price and pack in one typed file.
// Prices, savings and per-bottle amounts are all computed from here.
import { IMAGES, type Img } from "./images";

export type ScentHandle = "nebula" | "heavens" | "descent";
export const SCENT_ORDER: ScentHandle[] = ["nebula", "heavens", "descent"];

export type PackId = "single" | "trio" | "six";

export type Pack = {
  id: PackId;
  label: string;
  size: number;
  price: number; // cents
  badge?: string;
};

/** Price of one bottle, in cents. */
export const UNIT_PRICE = 1499;

export const PACKS: Record<PackId, Pack> = {
  single: { id: "single", label: "1 bottle", size: 1, price: UNIT_PRICE },
  trio: { id: "trio", label: "3 bottles", size: 3, price: 2799, badge: "Popular" },
  six: { id: "six", label: "6 bottles", size: 6, price: 4497, badge: "Buy 3, get 3 free" },
};

export const packFullPrice = (p: Pack) => p.size * UNIT_PRICE;
export const packSavings = (p: Pack) => packFullPrice(p) - p.price;
export const packPerBottle = (p: Pack) => Math.round(p.price / p.size);

export type FragranceNotes = { top: string; heart: string; base: string };

export type Scent = {
  kind: "scent";
  handle: ScentHandle;
  name: string;
  family: string;
  /** One line, shown under the name. */
  tagline: string;
  description: string;
  notes: FragranceNotes;
  /** CSS colour of the oil in the bottle. Used for swatches and accents. */
  oil: string;
  images: Img[];
  seo: { title: string; description: string };
};

export type Bundle = {
  kind: "bundle";
  handle: "scent-maxxing";
  name: string;
  family: string;
  tagline: string;
  description: string;
  packs: PackId[];
  images: Img[];
  seo: { title: string; description: string };
};

export type Product = Scent | Bundle;

export const SCENTS: Record<ScentHandle, Scent> = {
  nebula: {
    kind: "scent",
    handle: "nebula",
    name: "Nebula",
    family: "Floral",
    tagline: "Soft, floral and clean.",
    description:
      "Nebula is our floral. Soft petals with a clean, bright edge: light enough for every day, present enough to notice when you get in.",
    notes: { top: "Bright and fresh", heart: "Soft florals", base: "Clean and smooth" },
    oil: "var(--oil-nebula)",
    images: [IMAGES.nebulaCard, IMAGES.nebulaCar, IMAGES.nebulaMarble, IMAGES.nebulaRoses],
    seo: {
      title: "Nebula, floral car fragrance",
      description:
        "Nebula, a soft floral car fragrance. 8 ml fragrance oil in a glass bottle with a wooden cap. Lasts 4–6 weeks.",
    },
  },
  heavens: {
    kind: "scent",
    handle: "heavens",
    name: "Heavens",
    family: "Woody",
    tagline: "Creamy sandalwood, calm and warm.",
    description:
      "Heavens is our woody one. Creamy sandalwood, smooth and warm, calm like a clear night sky.",
    notes: { top: "Soft wood", heart: "Sandalwood", base: "Creamy and warm" },
    oil: "var(--oil-heavens)",
    images: [IMAGES.heavensCard],
    seo: {
      title: "Heavens, sandalwood car fragrance",
      description:
        "Heavens, a creamy sandalwood car fragrance. 8 ml fragrance oil in a glass bottle with a wooden cap. Lasts 4–6 weeks.",
    },
  },
  descent: {
    kind: "scent",
    handle: "descent",
    name: "Descent",
    family: "Sweet and warm",
    tagline: "Sweet, dark and a little addictive.",
    description:
      "Descent is the dark one. Coffee and vanilla wrapped around white flowers: sweet, warm and a little addictive.",
    notes: { top: "Coffee", heart: "White flowers", base: "Vanilla" },
    oil: "var(--oil-descent)",
    images: [IMAGES.descentCard],
    seo: {
      title: "Descent, coffee and vanilla car fragrance",
      description:
        "Descent, a sweet coffee and vanilla car fragrance. 8 ml fragrance oil in a glass bottle with a wooden cap. Lasts 4–6 weeks.",
    },
  },
};

export const BUNDLE: Bundle = {
  kind: "bundle",
  // Kept for SEO: this is the URL Shopify already serves.
  handle: "scent-maxxing",
  name: "Voidegrail Bundle",
  family: "Floral, woody and sweet",
  tagline: "All three scents in one box.",
  description:
    "Nebula, Heavens and Descent together. Switch with your mood, or keep one in every car. Each bottle comes with its wooden diffuser cap and hanging cord.",
  packs: ["trio", "six"],
  images: [IMAGES.bundleOrbit, IMAGES.trio, IMAGES.trioTop],
  seo: {
    title: "Voidegrail Bundle, all three car fragrances",
    description:
      "All three Voidescent car fragrances in one box: Nebula, Heavens and Descent. 3 × 8 ml fragrance oil, each lasting 4–6 weeks.",
  },
};

export const ALL_PRODUCTS: Product[] = [...SCENT_ORDER.map((h) => SCENTS[h]), BUNDLE];

export function getProduct(handle: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.handle === handle);
}

export function isScentHandle(value: string): value is ScentHandle {
  return (SCENT_ORDER as string[]).includes(value);
}

/** Facts that are the same for every bottle. */
export const BOTTLE = {
  volume: "8 ml",
  format: "8 ml glass bottle with wooden diffuser cap",
  longevity: "4–6 weeks",
  use: "Rear-view mirror, visor, anywhere in the car",
  origin: "Designed in the Netherlands",
  ingredients: "Fragrance oil. Keep away from children and pets. Keep the oil off your dashboard, paint and plastic.",
  howTo:
    "Take off the cap, pull out the plug and put the cap back on. Hang it from your mirror and tilt the bottle for 2–3 seconds so the wooden cap soaks up the oil. Tilt again whenever you want it stronger.",
} as const;

export const FAQ: { q: string; a: string }[] = [
  {
    q: "How strong is the scent?",
    a: "You control it. Tilt the bottle for 2–3 seconds so the wooden cap soaks up more oil whenever you want it stronger.",
  },
  { q: "How long does one bottle last?", a: "4–6 weeks, depending on how often you tilt it." },
  {
    q: "Is it safe for my car?",
    a: "Yes, as long as the oil doesn't touch your dashboard, paint or plastic, because it can leave marks. Keep it away from children and pets.",
  },
  {
    q: "Which scent should I choose?",
    a: "Nebula is soft and floral, Heavens is creamy sandalwood and Descent is sweet coffee and vanilla. Can't decide? Get all three in the bundle.",
  },
];
