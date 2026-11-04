import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HowItWorks from "@/components/sections/HowItWorks";
import ProductMain from "@/components/sections/ProductMain";
import Reviews from "@/components/sections/Reviews";
import WhyUs from "@/components/sections/WhyUs";
import { photo, PRODUCTS, productByHandle } from "@/lib/catalog";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = productByHandle((await params).handle);
  if (!p) return {};
  return pageMeta({ title: p.seoTitle, absolute: true, path: `/products/${p.handle}`, description: p.description, image: photo(p.photos[0].file, 1200) });
}

export default async function ProductPage({ params }: Props) {
  const p = productByHandle((await params).handle);
  if (!p) notFound();
  const ld = {
    "@context": "http://schema.org/",
    "@id": `/products/${p.handle}#product`,
    "@type": "Product",
    brand: { "@type": "Brand", name: "VOIDESCENT" },
    category: "Vehicle Air Fresheners",
    image: `https://voidescent.com${photo(p.photos[0].file, 1920)}`,
    name: p.title,
    offers: {
      "@id": `/products/${p.handle}?variant=${p.variantId}#offer`,
      "@type": "Offer",
      availability: "http://schema.org/InStock",
      price: (p.price / 100).toFixed(2),
      priceCurrency: "EUR",
      url: `https://voidescent.com/products/${p.handle}?variant=${p.variantId}`,
    },
    sku: p.sku,
    url: `https://voidescent.com/products/${p.handle}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ProductMain product={p} />
      <WhyUs />
      <HowItWorks />
      <Reviews product={p} />
    </>
  );
}
