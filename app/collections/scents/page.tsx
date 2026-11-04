import Collection from "@/components/sections/Collection";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Scents",
  path: "/collections/scents",
  description:
    "Three car scents in one collection: Nebula (soft florals), Heavens (creamy sandalwood) and Descent (coffee and vanilla). Each bottle holds 8 ml of fragrance oil in glass with a wooden diffuser cap and lasts 4–6 weeks.",
});

export default function ScentsPage() {
  return <Collection />;
}
