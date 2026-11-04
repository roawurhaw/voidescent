import type { Metadata, Viewport } from "next";
import Announcement from "@/components/sections/Announcement";
import CartDrawer from "@/components/sections/CartDrawer";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Stars from "@/components/sections/Stars";
import { SHARE_IMAGE } from "@/lib/meta";
import "./globals.css";

const FAVICON = "/images/voidescent-favicon.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://voidescent.com"),
  title: { default: "VOIDESCENT", template: "%s – VOIDESCENT" },
  icons: { icon: { url: FAVICON, type: "image/png", sizes: "480x480" }, apple: FAVICON },
  openGraph: { siteName: "VOIDESCENT", type: "website", images: SHARE_IMAGE },
  other: { "facebook-domain-verification": "l1yctsy6hqoosiubg6jppzmwtqlp8j" },
  // Keep this copy out of Google until it replaces the Shopify storefront (set NEXT_PUBLIC_PREVIEW=false then).
  robots: process.env.NEXT_PUBLIC_PREVIEW === "false" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#08090b" };

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VOIDESCENT",
  url: "https://voidescent.com",
  sameAs: ["https://www.instagram.com/voidescent", "https://www.tiktok.com/@voidescent"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }} />
        {/* The theme scripts expect Shopify's globals; the cart endpoints they call live in app/cart*. */}
        <script dangerouslySetInnerHTML={{ __html: "window.Shopify=window.Shopify||{};Shopify.shop='ae5vcp-db.myshopify.com';Shopify.locale='en';Shopify.currency={active:'EUR',rate:'1.0'};Shopify.country='NL';Shopify.routes={root:'/'};" }} />
      </head>
      <body>
        <CartDrawer />
        <Stars />
        <Announcement />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <div id="cart-notification" hidden aria-live="assertive" />
      </body>
    </html>
  );
}
