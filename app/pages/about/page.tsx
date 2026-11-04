import About from "@/components/sections/About";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "About Voidescent",
  absolute: true,
  path: "/pages/about",
  description:
    "Voidescent is a small Dutch brand from Dordrecht. We make hanging car fragrances: a glass bottle of fragrance oil with a wooden diffuser cap, designed to look as good on your mirror as it smells. What we make Every bottle holds 8 ml of fragrance oil and lasts around 4–6 weeks. Hang it from your mirror, tilt it for a fe",
});

export default function AboutPage() {
  return <About />;
}
