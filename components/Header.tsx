"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { IMAGES } from "@/lib/images";
import { SHIPPING } from "@/lib/shipping";
import { euro } from "@/lib/money";

const NAV = [
  { href: "/collections/scents", label: "Shop" },
  { href: "/pages/about", label: "About" },
  { href: "/pages/contact", label: "Contact" },
];

export function Header() {
  const { itemCount, hydrated, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

  const nl = SHIPPING.NL;

  return (
    <header className="site-header">
      <p className="ship-bar">Free shipping in the Netherlands from {euro(nl.freeFrom ?? 0)}</p>
      <div className="site-header__inner">
        <nav className="site-nav" aria-label="Main">
          <button
            type="button"
            className="site-nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            Menu
          </button>
          <ul id="site-menu" className="site-nav__list" data-open={menuOpen}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="site-nav__link"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/" className="site-logo" aria-label="Voidescent home">
          <Image src={IMAGES.logo.src} alt="" width={IMAGES.logo.width} height={IMAGES.logo.height} priority sizes="180px" />
        </Link>

        <button type="button" className="cart-button" onClick={open} aria-haspopup="dialog">
          Cart
          <span className="cart-button__count" aria-label={hydrated ? `${itemCount} items` : undefined}>
            {hydrated ? itemCount : 0}
          </span>
        </button>
      </div>
    </header>
  );
}
