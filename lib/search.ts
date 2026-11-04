import { PAGES } from "@/app/pages/[handle]/pages";
import { ARTICLES, articleHtml, articleImage } from "./blog";
import { money, photo, PRODUCTS } from "./catalog";

export type SearchResult = {
  url: string;
  title: string;
  price?: string;
  image?: { src: (width: number) => string; alt: string; width: number; height: number };
};

const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// Each article's title + first 250 characters, read from disk on the first search only.
let articleText: Promise<string[]> | undefined;
const articleTexts = () =>
  (articleText ??= Promise.all(ARTICLES.map(async (a) => a.title + " " + text(await articleHtml(a.handle)).slice(0, 250))));

// shortcut: plain "every word appears" matching over products, pages and article titles + intros; Shopify's own
// index is a black box. Articles only count their first 250 characters, which gives the same hits as the live store
// for product names (a full-text match lists most of the blog). Upgrade to a real index if search ever matters.
export async function search(q: string): Promise<SearchResult[]> {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const hit = (s: string) => terms.every((t) => s.toLowerCase().includes(t));

  const products = PRODUCTS.filter((p) => hit([p.title, p.tagline, p.family, ...p.notes, p.description].join(" "))).map((p) => ({
    url: `/products/${p.handle}`,
    title: p.title,
    price: `${money(p.price)} EUR`,
    image: { src: (w: number) => photo(p.photos[0].file, w), ...p.photos[0] },
  }));
  const pages = Object.entries(PAGES)
    .filter(([, p]) => hit(p.title + " " + text(p.html)))
    .map(([handle, p]) => ({ url: `/pages/${handle}`, title: p.title }));
  const texts = await articleTexts();
  const articles = ARTICLES.filter((_, i) => hit(texts[i])).map((a): SearchResult => {
    const img = a.image;
    return { url: `/blogs/nieuws/${a.handle}`, title: a.title, image: img ? { src: (w) => articleImage(img.file, w), ...img } : undefined };
  });
  return [...products, ...pages, ...articles];
}
