// Next.js custom image loader for the Shopify CDN.
// Shopify resizes on the fly when you pass ?width=, so each <Image> srcset
// entry becomes a properly sized file without a Next image server.
export default function shopifyLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("http")) return src;
  const url = new URL(src);
  url.searchParams.set("width", String(width));
  return url.toString();
}
