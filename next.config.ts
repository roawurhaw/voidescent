import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photos stay on the Shopify CDN. Shopify resizes them itself
    // (via ?width=), so we don't need Next's image optimizer at all.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  async redirects() {
    // Shopify served the shop under a few URLs. Keep them all working.
    return [
      { source: "/collections", destination: "/collections/scents", permanent: true },
      { source: "/collections/all", destination: "/collections/scents", permanent: true },
      { source: "/products/voidegrail-bundle", destination: "/products/scent-maxxing", permanent: false },
    ];
  },
};

export default nextConfig;
