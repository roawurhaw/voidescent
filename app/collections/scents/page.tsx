import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ScentCard } from "@/components/ProductCard";
import { BOTTLE, BUNDLE, packFullPrice, PACKS, packSavings, SCENT_ORDER, SCENTS } from "@/lib/catalog";
import { IMAGES } from "@/lib/images";
import { euro } from "@/lib/money";

export const metadata: Metadata = {
  title: "Shop the scents",
  description:
    "Three car fragrances: Nebula (soft florals), Heavens (creamy sandalwood) and Descent (coffee and vanilla). 8 ml fragrance oil, lasts 4–6 weeks.",
  alternates: { canonical: "/collections/scents" },
};

export default function ScentsPage() {
  const trio = PACKS.trio;
  return (
    <div className="wrap page">
      <div className="section-head">
        <h1 className="page__title">Scents</h1>
        <p>
          Each bottle holds {BOTTLE.volume} of fragrance oil in glass, with a wooden diffuser cap. It lasts{" "}
          {BOTTLE.longevity}.
        </p>
      </div>

      <div className="scents">
        {SCENT_ORDER.map((h, i) => (
          <ScentCard key={h} scent={SCENTS[h]} priority={i === 0} />
        ))}
      </div>

      {/* The live shop leaves the bundle out of this page. It belongs here. */}
      <article className="bundle" aria-labelledby="bundle-title">
        <Link href={`/products/${BUNDLE.handle}`} className="bundle__media" tabIndex={-1} aria-hidden="true">
          <Image
            src={IMAGES.trioTop.src}
            alt=""
            width={IMAGES.trioTop.width}
            height={IMAGES.trioTop.height}
            sizes="(min-width: 760px) 40vw, 90vw"
          />
        </Link>
        <div className="bundle__body">
          <h2 id="bundle-title" className="bundle__name">
            <Link href={`/products/${BUNDLE.handle}`}>{BUNDLE.name}</Link>
          </h2>
          <p className="bundle__tagline">{BUNDLE.tagline}</p>
          <p className="bundle__price">
            <strong>{euro(trio.price)}</strong>
            <s>{euro(packFullPrice(trio))}</s>
            <span className="bundle__save">You save {euro(packSavings(trio))}</span>
          </p>
          <div className="bundle__actions">
            <AddToCartButton
              line={{ type: "pack", pack: "trio", picks: { nebula: 1, heavens: 1, descent: 1 } }}
              label="Add all three to cart"
            />
            <Link href={`/products/${BUNDLE.handle}`} className="button button--quiet">
              Build a box of six
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
