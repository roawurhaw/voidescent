import Contact from "@/components/sections/Contact";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ title: "Contact", path: "/pages/contact" });

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ contact_posted?: string }> }) {
  return <Contact posted={(await searchParams).contact_posted === "true"} />;
}
