import { photo } from "@/lib/catalog";
import "./Footer.css";

export default function Footer() {
  return (
    <div id="shopify-section-footer" className="shopify-section">
      <footer id="voide-footer-footer" role="contentinfo">
        <div className="foot__inner">
          <div className="foot__brand">
            <a href="/" className="foot__logo">
              <img src={photo("platinumSCENT_430x_412f7c86-664c-4a2d-a090-b02b4473ba19.webp", 400)} alt="VOIDESCENT" style={{ maxWidth: "140px", height: "auto", display: "block" }} width="430" height="70" loading="lazy" />
            </a>
            <p className="foot__desc">
              Premium car hanger fragrances. Scent inspired by the cosmos, crafted for your world.
            </p>
            <div className="foot__socials" />
            <a href="/pages/contact" className="foot__contact-btn">
              Contact Us{" "}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="foot__col">
            <h4>
              Info
            </h4>
            <ul>
              <li>
                <a href="/pages/about">
                  About
                </a>
              </li>
              <li>
                <a href="/pages/contact">
                  Contact
                </a>
              </li>
              <li>
                <a href="/policies/shipping-policy">
                  Shipping
                </a>
              </li>
              <li>
                <a href="/policies/refund-policy">
                  Returns
                </a>
              </li>
              <li>
                <a href="/policies/privacy-policy">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/policies/terms-of-service">
                  Terms
                </a>
              </li>
              <li>
                <a href="/policies/legal-notice">
                  Legal notice
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot__bottom">
          <span>
            © 2026 VOIDESCENT. All rights reserved.
          </span>
          {" "}
          <span>
            Made for those who move with intention.
          </span>
        </div>
        <p className="foot__legal">
          VOIDESCENT · KvK 42080719 · Romboutslaan 502, 3312 KP Dordrecht, Netherlands ·{" "}
          <a href="mailto:info@voidescent.com">
            info@voidescent.com
          </a>
        </p>
      </footer>
    </div>
  );
}
