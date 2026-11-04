import type { Metadata } from "next";
import { photo } from "./catalog";

export const SHARE_IMAGE = photo("0a778f50-d044-4ee7-a439-bf98c6487a46.jpg", 1200);
export const DEFAULT_DESCRIPTION =
  "Voidescent car scent hangers: 8 ml fragrance oil in a glass bottle with a wooden diffuser cap. Lasts 4–6 weeks. Free shipping in NL from €25, BE from €40.";

// Same tags Shopify printed: "<title> – VOIDESCENT" unless the page has its own SEO title (absolute),
// og:title without the suffix, canonical URL, and the store's share image unless the page has one.
export function pageMeta(o: { title: string; absolute?: boolean; path: string; description?: string; image?: string }): Metadata {
  return {
    title: o.absolute ? { absolute: o.title } : o.title,
    description: o.description,
    alternates: { canonical: o.path },
    openGraph: { siteName: "VOIDESCENT", type: "website", title: o.title, url: o.path, description: o.description, images: o.image ?? SHARE_IMAGE },
  };
}
