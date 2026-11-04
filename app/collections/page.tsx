import { DEFAULT_DESCRIPTION, pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ title: "Collections", path: "/collections", description: DEFAULT_DESCRIPTION });

// On the live store this page is empty: the theme has no collections-list template.
export default function CollectionsPage() {
  return null;
}
