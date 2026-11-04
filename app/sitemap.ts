import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/blog";
import { PRODUCTS } from "@/lib/catalog";
import { PAGES } from "./pages/[handle]/pages";
import { POLICIES } from "./policies/[slug]/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/collections/scents",
    "/pages/about",
    "/pages/contact",
    ...PRODUCTS.map((p) => `/products/${p.handle}`),
    ...Object.keys(PAGES).map((handle) => `/pages/${handle}`),
    ...Object.keys(POLICIES).map((slug) => `/policies/${slug}`),
    ...ARTICLES.map((a) => `/blogs/nieuws/${a.handle}`),
  ];
  return paths.map((p) => ({ url: `https://voidescent.com${p}` }));
}
