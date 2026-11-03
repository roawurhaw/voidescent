import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShippingSummary } from "@/components/Sections";
import { getPolicy, type PolicySlug } from "@/lib/shopify";
import { SITE } from "@/lib/site";

const TITLES: Record<PolicySlug, string> = {
  "shipping-policy": "Shipping",
  "refund-policy": "Returns",
  "privacy-policy": "Privacy",
  "terms-of-service": "Terms of service",
  "legal-notice": "Legal notice",
};

type Params = { slug: string };

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return Object.keys(TITLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const title = TITLES[slug as PolicySlug];
  return title ? { title, alternates: { canonical: `/policies/${slug}` } } : {};
}

export default async function PolicyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!(slug in TITLES)) notFound();
  const key = slug as PolicySlug;

  // Policies are written in Shopify admin and pulled in when Shopify is connected.
  const policy = await getPolicy(key);

  return (
    <div className="wrap page">
      <h1 className="page__title">{policy?.title ?? TITLES[key]}</h1>
      <div className="prose policy-body">
        {policy ? (
          <div dangerouslySetInnerHTML={{ __html: policy.body }} />
        ) : key === "shipping-policy" ? (
          <ShippingSummary />
        ) : key === "legal-notice" ? (
          <>
            <p>
              Voidescent, {SITE.address.street}, {SITE.address.postcode} {SITE.address.city}, {SITE.address.country}.
            </p>
            <p>
              Chamber of Commerce (KvK): {SITE.kvk}. Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Phone:{" "}
              {SITE.phone}.
            </p>
          </>
        ) : (
          <p>
            Read the current version at{" "}
            <a href={`${SITE.url}/policies/${key}`}>
              {SITE.url.replace("https://", "")}/policies/{key}
            </a>
            . It will show here once the shop is connected to Shopify.
          </p>
        )}
      </div>
    </div>
  );
}
