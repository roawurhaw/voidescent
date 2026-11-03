import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PreviewBar } from "@/components/PreviewBar";
import { IMAGES } from "@/lib/images";
import { IS_PREVIEW, SITE } from "@/lib/site";
import "./globals.css";

// Perfume-label pairing: a Didone for names and headlines, a geometric sans
// (Futura's family, close to the logo) for everything you read or press.
const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});
const body = Jost({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}, car hanger fragrances`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    type: "website",
    images: [{ url: `${IMAGES.trio.src}&width=1200`, width: 1200, height: 1500 }],
  },
  robots: IS_PREVIEW ? { index: false, follow: false } : undefined,
  other: { "facebook-domain-verification": "l1yctsy6hqoosiubg6jppzmwtqlp8j" },
};

export const viewport: Viewport = { themeColor: "#07080c", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <PreviewBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
