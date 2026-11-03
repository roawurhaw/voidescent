import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/BuyBox";
import { DeliveryEstimate } from "@/components/DeliveryEstimate";
import { Gallery } from "@/components/Gallery";
import { ScentCard } from "@/components/ProductCard";
import { ShippingSummary } from "@/components/Sections";
import {
  ALL_PRODUCTS,
  BOTTLE,
  BUNDLE,
  FAQ,
  getProduct,
  PACKS,
  SCENT_ORDER,
  SCENTS,
  UNIT_PRICE,
  type Product,
} from "@/lib/catalog";
import { euro } from "@/lib/money";
import { DISPATCH_DAYS, RETURN_DAYS, SHIPPING } from "@/lib/shipping";
import { PAYMENT_METHODS, SITE } from "@/lib/site";

type Params = { handle: string };

export function generateStaticParams(): Params[] {
  return ALL_PRODUCTS.map((p) => ({ handle: p.handle }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return {};
  const image = product.images[0];
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: {
      title: `${product.seo.title} | ${SITE.name}`,
      description: product.seo.description,
      url: `/products/${product.handle}`,
      images: [{ url: `${image.src}&width=1200`, alt: image.alt }],
    },
  };
}

function startingPrice(product: Product) {
  return product.kind === "scent" ? UNIT_PRICE : PACKS[product.packs[0]].price;
}

function jsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.kind === "bundle" ? `${product.name}, all three scents` : `${product.name} car fragrance`,
    description: product.description,
    image: product.images.map((i) => `${i.src}&width=1200`),
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/products/${product.handle}`,
      priceCurrency: "EUR",
      price: (startingPrice(product) / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const oil = product.kind === "scent" ? product.oil : "var(--signal)";
  const others =
    product.kind === "scent" ? SCENT_ORDER.filter((h) => h !== product.handle).map((h) => SCENTS[h]) : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(product)) }} />

      <div className="wrap" style={{ ["--oil" as string]: oil }}>
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/collections/scents">Shop</Link>
            </li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="product">
          <Gallery images={product.images} name={product.name} />

          <div>
            <p className="product__family">
              {product.kind === "scent" ? (
                <span className="oil-dot" aria-hidden="true" />
              ) : (
                <span className="oil-dots" aria-hidden="true">
                  {SCENT_ORDER.map((h) => (
                    <span key={h} className="oil-dot" style={{ background: SCENTS[h].oil }} />
                  ))}
                </span>
              )}
              {product.family} car hanger fragrance
            </p>
            <h1 className="product__name">{product.name}</h1>
            <p className="product__tagline">{product.tagline}</p>
            <p className="product__desc">{product.description}</p>

            <BuyBox product={product} />

            <ul className="assurances">
              <li>
                Ships from Dordrecht in {DISPATCH_DAYS.min}–{DISPATCH_DAYS.max} business days, tracked
              </li>
              <DeliveryEstimate />
              <li>
                Free shipping in the Netherlands from {euro(SHIPPING.NL.freeFrom ?? 0)}, Belgium from{" "}
                {euro(SHIPPING.BE.freeFrom ?? 0)}
              </li>
              <li>{RETURN_DAYS}-day returns on unopened bottles</li>
            </ul>
            <ul className="pay" aria-label="Payment methods">
              {PAYMENT_METHODS.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>

            <div className="product__info">
              <details className="info" open>
                <summary>Fragrance notes</summary>
                <div className="info__body">
                  {product.kind === "scent" ? (
                    <dl className="notes">
                      <div style={{ ["--weight" as string]: "1px" }}>
                        <dt>Top</dt>
                        <dd>{product.notes.top}</dd>
                      </div>
                      <div style={{ ["--weight" as string]: "3px" }}>
                        <dt>Heart</dt>
                        <dd>{product.notes.heart}</dd>
                      </div>
                      <div style={{ ["--weight" as string]: "6px" }}>
                        <dt>Base</dt>
                        <dd>{product.notes.base}</dd>
                      </div>
                    </dl>
                  ) : (
                    <dl className="notes">
                      {SCENT_ORDER.map((h) => (
                        <div key={h} style={{ ["--weight" as string]: "3px", ["--oil" as string]: SCENTS[h].oil }}>
                          <dt>{SCENTS[h].name}</dt>
                          <dd>
                            {SCENTS[h].notes.top}, {SCENTS[h].notes.heart.toLowerCase()},{" "}
                            {SCENTS[h].notes.base.toLowerCase()}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {product.kind === "scent" && <p>Top notes fade first. The base is what lingers for weeks.</p>}
                </div>
              </details>

              <details className="info">
                <summary>Product details</summary>
                <div className="info__body">
                  <dl className="details">
                    <dt>Format</dt>
                    <dd>{product.kind === "bundle" ? `3 × ${BOTTLE.format}` : BOTTLE.format}</dd>
                    <dt>Lasts</dt>
                    <dd>{BOTTLE.longevity} per bottle</dd>
                    <dt>Family</dt>
                    <dd>{product.family}</dd>
                    <dt>Use</dt>
                    <dd>{BOTTLE.use}</dd>
                    <dt>Origin</dt>
                    <dd>{BOTTLE.origin}</dd>
                    <dt>Ingredients</dt>
                    <dd>{BOTTLE.ingredients}</dd>
                  </dl>
                </div>
              </details>

              <details className="info">
                <summary>How to use</summary>
                <div className="info__body">
                  <p>{BOTTLE.howTo}</p>
                  <p>Keep away from children and pets, and don&rsquo;t let the oil touch your dashboard, paint or plastic.</p>
                </div>
              </details>

              <details className="info">
                <summary>Shipping and returns</summary>
                <div className="info__body">
                  <ShippingSummary />
                </div>
              </details>

              <details className="info">
                <summary>Questions</summary>
                <div className="info__body">
                  <dl className="faq">
                    {FAQ.map((f) => (
                      <div key={f.q}>
                        <dt>{f.q}</dt>
                        <dd>{f.a}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <section className="more" aria-labelledby="more-title">
        <div className="wrap">
          <h2 id="more-title" className="section-title">
            {product.kind === "scent" ? "The other two" : "Or pick one"}
          </h2>
          <div className="scents">
            {(product.kind === "scent" ? others : SCENT_ORDER.map((h) => SCENTS[h])).map((s) => (
              <ScentCard key={s.handle} scent={s} />
            ))}
            {product.kind === "scent" && (
              <article className="scent-card">
                <Link href={`/products/${BUNDLE.handle}`} className="scent-card__media" tabIndex={-1} aria-hidden="true">
                  <Image
                    src={BUNDLE.images[0].src}
                    alt=""
                    width={BUNDLE.images[0].width}
                    height={BUNDLE.images[0].height}
                    sizes="(min-width: 960px) 30vw, (min-width: 640px) 45vw, 90vw"
                  />
                </Link>
                <div className="scent-card__body">
                  <p className="scent-card__family">All three scents</p>
                  <h3 className="scent-card__name">
                    <Link href={`/products/${BUNDLE.handle}`}>{BUNDLE.name}</Link>
                  </h3>
                  <p className="scent-card__notes">Floral, woody and sweet in one box.</p>
                  <div className="scent-card__buy">
                    <p className="price">{euro(PACKS.trio.price)}</p>
                    <Link href={`/products/${BUNDLE.handle}`} className="button button--small button--quiet">
                      Build your box
                    </Link>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
