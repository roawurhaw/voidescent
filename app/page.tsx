import CtaBanner from "@/components/sections/CtaBanner";
import EmailPopup from "@/components/sections/EmailPopup";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import ProductsGrid from "@/components/sections/ProductsGrid";
import Story from "@/components/sections/Story";
import WhyUs from "@/components/sections/WhyUs";
import { DEFAULT_DESCRIPTION, pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ title: "Voidescent - The ever lingering scent", absolute: true, path: "/", description: DEFAULT_DESCRIPTION });

const WEBSITE = { "@context": "https://schema.org", "@type": "WebSite", name: "Voidescent", url: "https://voidescent.com/" };

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE) }} />
      <Hero />
      <ProductsGrid />
      <WhyUs />
      <HowItWorks />
      <Story />
      <CtaBanner />
      <EmailPopup />
    </>
  );
}
