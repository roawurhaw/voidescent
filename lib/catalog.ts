// Products as they are set up in the live Shopify store (ids, prices in cents). Photos are in public/images.
// The product pages, the cart and checkout all read from here.

// Images are copied from the Shopify store into public/images, so they outlive it. Next's image optimizer
// (/_next/image) resizes them and serves WebP/AVIF; it only accepts its own widths, so round up to one of those.
const WIDTHS = [32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
export const image = (src: string, width: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${WIDTHS.find((w) => w >= width) ?? 3840}&q=75`;
export const photo = (file: string, width: number) => image(`/images/${file}`, width);

export type Photo = { file: string; alt: string; width: number; height: number };

export type Product = {
  handle: string;
  productId: number;
  variantId: number;
  title: string;
  price: number;
  sku?: string;
  tagline: string;
  family: string;
  notes: [top: string, heart: string, base: string];
  defaultPack: "single" | "six";
  photos: Photo[];
  seoTitle: string;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    handle: "nebula",
    productId: 15252642103680,
    variantId: 56292109156736,
    title: "Nebula",
    price: 1499,
    sku: "VS-NEBULA",
    tagline: "Soft, floral and clean.",
    family: "Floral",
    notes: ["Bright and fresh", "Soft florals", "Clean and smooth"],
    defaultPack: "single",
    photos: [
      { file: "nebUntitled.jpg", alt: "Nebula", width: 1122, height: 1402 },
      { file: "nebula3.jpg", alt: "Nebula", width: 1122, height: 1402 },
      { file: "nebula2.jpg", alt: "Nebula", width: 1122, height: 1402 },
    ],
    seoTitle: "Nebula | Floral Car Air Freshener | Voidescent",
    description:
      "Nebula, a soft floral car fragrance by Voidescent. 8 ml fragrance oil in a glass bottle with a wooden cap. Lasts 4–6 weeks. Free shipping NL from €25, BE from €40.",
  },
  {
    handle: "heavens",
    productId: 15255500718464,
    variantId: 56306800001408,
    title: "Heavens",
    price: 1499,
    sku: "VS-HEAVENS",
    tagline: "Creamy sandalwood, calm and warm.",
    family: "Woody",
    notes: ["Soft wood", "Sandalwood", "Creamy and warm"],
    defaultPack: "single",
    photos: [
      { file: "heavensUntitled.jpg", alt: "Heavens", width: 1086, height: 1448 },
      { file: "heavens3.jpg", alt: "Heavens car fragrance bottle with sandalwood, vanilla pods and white flowers", width: 1122, height: 1402 },
      { file: "heavens1.jpg", alt: "Heavens car fragrance bottle among sandalwood pieces and soft smoke", width: 1122, height: 1402 },
    ],
    seoTitle: "Heavens | Sandalwood Car Air Freshener | Voidescent",
    description:
      "Heavens, a creamy sandalwood car fragrance by Voidescent. 8 ml fragrance oil in a glass bottle with a wooden cap. Lasts 4–6 weeks. Free shipping NL from €25, BE from €40.",
  },
  {
    handle: "descent",
    productId: 15255499866496,
    variantId: 56306798756224,
    title: "Descent",
    price: 1499,
    sku: "VS-DESCENT",
    tagline: "Sweet, dark and a little addictive.",
    family: "Sweet and warm",
    notes: ["Coffee", "White flowers", "Vanilla"],
    defaultPack: "single",
    photos: [
      { file: "descentUntitled.jpg", alt: "Descent", width: 1122, height: 1402 },
      { file: "descent2.jpg", alt: "Descent car fragrance bottle with coffee beans, vanilla pods and white flowers", width: 1122, height: 1402 },
      { file: "descent4.jpg", alt: "Descent car fragrance bottle with flying coffee beans, vanilla and white flowers", width: 1122, height: 1402 },
    ],
    seoTitle: "Descent | Coffee & Vanilla Car Air Freshener | Voidescent",
    description:
      "Descent, a sweet coffee-vanilla car fragrance by Voidescent. 8 ml fragrance oil, glass bottle, wooden cap. Lasts 4–6 weeks. Free shipping NL from €25, BE from €40.",
  },
  {
    handle: "scent-maxxing",
    productId: 15316321436032,
    variantId: 56489971220864,
    title: "Voidegrail Bundle — All 3 Scents",
    price: 2799,
    tagline: "All three scents in one box.",
    family: "Floral, woody and sweet",
    notes: ["Nebula: floral", "Heavens: sandalwood", "Descent: coffee and vanilla"],
    defaultPack: "six",
    photos: [{ file: "productpicturepng.jpg", alt: "Voidegrail Bundle — All 3 Scents", width: 1122, height: 1402 }],
    seoTitle: "Voidegrail Bundle — All 3 Scents – VOIDESCENT",
    description:
      "All three scents in one box: Nebula (floral), Heavens (sandalwood) and Descent (coffee and vanilla). Switch with your mood, or keep one in every car. In the box: 3 bottles of 8 ml fragrance oil, each with a wooden diffuser cap and hanging cord Lasts: 4–6 weeks per bottle — months of scent Price: €27,99 for all three (€",
  },
];

// Collection order in Shopify; the box picker lists the current scent first, then these.
export const SCENT_ORDER = ["heavens", "descent", "nebula"];

export const productByHandle = (handle: string) => PRODUCTS.find((p) => p.handle === handle);
export const productByVariant = (id: number) => PRODUCTS.find((p) => p.variantId === id);

// "€14,99", the store's money format (amount_with_comma_separator).
export const money = (cents: number) =>
  "€" + (cents / 100).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
