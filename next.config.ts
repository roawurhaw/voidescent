import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The theme scripts in public/theme are plain DOM scripts written for one run per page load.
  reactStrictMode: false,
  agentRules: false,
  // Blog article bodies are read from disk at request time; ship them with the server build.
  outputFileTracingIncludes: { "/blogs/nieuws/[handle]": ["./content/blog/**"], "/search": ["./content/blog/**"] },
  async rewrites() {
    // Shopify also serves every product inside its collection (/collections/scents/products/<handle>); the Shop page links there.
    return [{ source: "/collections/:collection/products/:handle", destination: "/products/:handle" }];
  },
};

export default nextConfig;
