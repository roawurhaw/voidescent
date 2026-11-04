import type { MetadataRoute } from "next";

// Stays out of search results until this replaces the Shopify storefront (NEXT_PUBLIC_PREVIEW=false).
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_PREVIEW !== "false") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cart", "/api/"] },
    sitemap: "https://voidescent.com/sitemap.xml",
  };
}
