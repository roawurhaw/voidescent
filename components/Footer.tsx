import Image from "next/image";
import Link from "next/link";
import { BUNDLE, SCENT_ORDER, SCENTS } from "@/lib/catalog";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

const INFO = [
  { href: "/pages/about", label: "About" },
  { href: "/pages/contact", label: "Contact" },
  { href: "/policies/shipping-policy", label: "Shipping" },
  { href: "/policies/refund-policy", label: "Returns" },
  { href: "/policies/privacy-policy", label: "Privacy" },
  { href: "/policies/terms-of-service", label: "Terms" },
  { href: "/policies/legal-notice", label: "Legal notice" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <Image src={IMAGES.logo.src} alt="Voidescent" width={IMAGES.logo.width} height={IMAGES.logo.height} sizes="200px" />
          <p>Car hanger fragrances from Dordrecht. Scent inspired by the cosmos, made for your car.</p>
        </div>

        <nav aria-label="Shop">
          <h2 className="site-footer__heading">Shop</h2>
          <ul>
            {SCENT_ORDER.map((h) => (
              <li key={h}>
                <Link href={`/products/${h}`}>{SCENTS[h].name}</Link>
              </li>
            ))}
            <li>
              <Link href={`/products/${BUNDLE.handle}`}>{BUNDLE.name}</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Information">
          <h2 className="site-footer__heading">Info</h2>
          <ul>
            {INFO.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__heading">Contact</h2>
          <address>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            <br />
            {SITE.address.street}
            <br />
            {SITE.address.postcode} {SITE.address.city}
          </address>
        </div>
      </div>

      <div className="site-footer__legal">
        <p>
          © {year} Voidescent. KvK {SITE.kvk}.
        </p>
        <p>Made for those who move with intention.</p>
      </div>
    </footer>
  );
}
