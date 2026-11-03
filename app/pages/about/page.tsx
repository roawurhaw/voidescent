import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BOTTLE, SCENT_ORDER, SCENTS } from "@/lib/catalog";
import { IMAGES } from "@/lib/images";
import { euro } from "@/lib/money";
import { DISPATCH_DAYS, RETURN_DAYS, SHIPPING } from "@/lib/shipping";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Voidescent is a small Dutch brand from Dordrecht making hanging car fragrances: fragrance oil in a glass bottle with a wooden diffuser cap.",
  alternates: { canonical: "/pages/about" },
};

export default function AboutPage() {
  return (
    <div className="wrap page">
      <h1 className="page__title">About Voidescent</h1>
      <p className="lede page__intro">
        A small Dutch brand from {SITE.address.city}. We make hanging car fragrances: a glass bottle of fragrance oil
        with a wooden diffuser cap, designed to look as good on your mirror as it smells.
      </p>

      <div className="page-grid">
        <div className="prose">
          <h2>What we make</h2>
          <p>
            Every bottle holds {BOTTLE.volume} of fragrance oil and lasts around {BOTTLE.longevity}. Hang it from your
            mirror, tilt it for a few seconds so the wooden cap soaks up the oil, and tilt it again whenever you want the
            scent stronger.
          </p>
          <ul className="scent-list">
            {SCENT_ORDER.map((h) => (
              <li key={h} style={{ ["--oil" as string]: SCENTS[h].oil }}>
                <span className="oil-dot" aria-hidden="true" />
                <span>
                  <Link href={`/products/${h}`}>
                    <strong>{SCENTS[h].name}</strong>
                  </Link>
                  : {SCENTS[h].tagline.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
          <p>Our line says it best: may your space have a scent.</p>

          <h2>How we work</h2>
          <p>
            Every order ships from {SITE.address.city} within {DISPATCH_DAYS.min}–{DISPATCH_DAYS.max} business days, with
            tracking. Shipping is free in the Netherlands from {euro(SHIPPING.NL.freeFrom ?? 0)} and in Belgium from{" "}
            {euro(SHIPPING.BE.freeFrom ?? 0)}. You can return unopened bottles within {RETURN_DAYS} days. The details are
            on our <Link href="/policies/shipping-policy">shipping</Link> and{" "}
            <Link href="/policies/refund-policy">returns</Link> pages.
          </p>

          <h2>Get in touch</h2>
          <p>
            Questions about an order, a scent or anything else? Email us or use the{" "}
            <Link href="/pages/contact">contact form</Link>. We reply {SITE.replyTime}.
          </p>
        </div>

        <aside className="about-aside">
          <div className="story__media">
            <Image
              src={IMAGES.nebulaRoses.src}
              alt={IMAGES.nebulaRoses.alt}
              width={IMAGES.nebulaRoses.width}
              height={IMAGES.nebulaRoses.height}
              sizes="(min-width: 860px) 35vw, 100vw"
            />
          </div>
          <div className="card">
            <h2>Company details</h2>
            <address>
              Voidescent
              <br />
              {SITE.address.street}
              <br />
              {SITE.address.postcode} {SITE.address.city}, {SITE.address.country}
              <br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <br />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              <br />
              KvK {SITE.kvk}
            </address>
          </div>
        </aside>
      </div>
    </div>
  );
}
