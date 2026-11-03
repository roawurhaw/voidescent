import type { MetadataRoute } from "next";
import { IS_PREVIEW, SITE } from "@/lib/site";

// Preview deployments stay out of search results so they never compete with the live shop.
export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cart", "/api/"] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
