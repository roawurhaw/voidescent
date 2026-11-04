import type { CSSProperties } from "react";
import Script from "next/script";
import { photo } from "@/lib/catalog";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div id="shopify-section-header" className="shopify-section shopify-section-group-header-group voide-header-section">
        <header id="voide-header" role="banner" style={{ "--logo-width": "230px" } as CSSProperties}>
          <div className="h__inner">
            <div className="h__left">
              <a href="/collections/scents" className="h__link desktop-only">
                Our Products
              </a>
              {" "}
              <button className="h__dropdown-toggle" aria-expanded="false" aria-label="Menu">
                Menu{" "}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <nav className="h__dropdown-menu">
                <a href="/collections/scents">
                  Our Products
                </a>
                {" "}
                <a href="/pages/contact">
                  Contact
                </a>
              </nav>
            </div>
            <a href="/" className="h__logo" aria-label="VOIDESCENT">
              <img src={photo("pinkescent_c83bb00e-a390-4d8c-ba63-753871e835cb.png", 400)} alt="VOIDESCENT" width="3388" height="548" loading="eager" />
            </a>
            <div className="h__right">
              <a href="/cart" className="h__cart" aria-label="Cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                <span className="h__cart-text">
                  Cart
                </span>
              </a>
            </div>
          </div>
        </header>
      </div>
      <Script src="/theme/header.js" />
    </>
  );
}
