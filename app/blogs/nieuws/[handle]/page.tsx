import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Article from "@/components/sections/Article";
import { ARTICLES, articleByHandle, articleHtml, articleImage } from "@/lib/blog";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ handle: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ handle: a.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = articleByHandle((await params).handle);
  if (!a) return {};
  return pageMeta({
    title: a.seoTitle,
    path: `/blogs/nieuws/${a.handle}`,
    description: a.description,
    image: a.image ? articleImage(a.image.file, 1200) : undefined,
  });
}

export default async function ArticlePage({ params }: Props) {
  const a = articleByHandle((await params).handle);
  if (!a) notFound();
  return <Article article={a} html={await articleHtml(a.handle)} />;
}
