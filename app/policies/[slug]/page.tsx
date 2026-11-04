import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/meta";
import { POLICIES } from "./policies";
import "./policy.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return pageMeta({ title: POLICIES[slug].title, path: `/policies/${slug}` });
}

// Shopify renders policies with its own minimal template; the theme adds no styles to it.
export default async function PolicyPage({ params }: Props) {
  const policy = POLICIES[(await params).slug];
  if (!policy) notFound();
  return (
    <div className="shopify-policy__container">
      <div className="shopify-policy__title">
        <h1>{policy.title}</h1>
      </div>
      <div className="shopify-policy__body">
        <div className="rte" dangerouslySetInnerHTML={{ __html: policy.html }} />
      </div>
    </div>
  );
}
