import Search from "@/components/sections/Search";
import { DEFAULT_DESCRIPTION, pageMeta } from "@/lib/meta";
import { search } from "@/lib/search";

export const metadata = pageMeta({ title: "Search", path: "/search", description: DEFAULT_DESCRIPTION });

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? "").trim();
  return <Search q={q} results={q ? await search(q) : undefined} />;
}
