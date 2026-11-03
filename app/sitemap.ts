import type { MetadataRoute } from "next";
import { ALL_PRODUCTS } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/collections/scents", "/pages/about", "/pages/contact"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}` })),
    ...ALL_PRODUCTS.map((p) => ({ url: `${SITE.url}/products/${p.handle}` })),
  ];
}
