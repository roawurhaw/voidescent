import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/meta";
import { PAGES } from "./pages";

type Props = { params: Promise<{ handle: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(PAGES).map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const page = PAGES[handle];
  return pageMeta({ title: page.title, path: `/pages/${handle}`, description: page.description });
}

// The theme's plain page template: a heading and the page body, unstyled.
export default async function Page({ params }: Props) {
  const handle = (await params).handle;
  const page = PAGES[handle];
  if (!page) notFound();
  return (
    <div id="shopify-section-main" className="shopify-section">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  );
}
