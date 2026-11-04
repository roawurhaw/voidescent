import { readFile } from "node:fs/promises";
import path from "node:path";
import articles from "@/content/blog/articles.json";
import { image } from "./catalog";

// Blog "Nieuws" as published on the live store: metadata in content/blog/articles.json,
// each article's body (the Shopify rich text) in content/blog/<handle>.html.
export type Article = {
  handle: string;
  title: string;
  published: string;
  author: string;
  image: { file: string; alt: string; width: number; height: number } | null;
  seoTitle: string;
  description: string;
};

export const ARTICLES: Article[] = articles;

export const articleByHandle = (handle: string) => ARTICLES.find((a) => a.handle === handle);

export const articleImage = (file: string, width: number) => image(`/images/blog/${file}`, width);

export const articleHtml = (handle: string) => readFile(path.join(process.cwd(), "content/blog", `${handle}.html`), "utf8");
