import Script from "next/script";
import "./CtaBanner.css";

export default function CtaBanner() {
  return (
    <>
      <section id="shopify-section-voide_cta_banner" className="shopify-section">
        <section id="voide-cta">
          <div className="voide-page-width cta__inner">
            <p className="voide-section-label">
              Ready to elevate?
            </p>
            <h2 className="voide-section-title">
              Your journey starts with a scent
            </h2>
            <p className="cta__sub">
              Pick one scent for €14,99, get all three for €27,99, or buy 3 and get 3 free. Free shipping in NL from €25, Belgium from €40.
            </p>
            <div className="cta__actions">
              <a href="#shop-products" className="voide-btn-primary">
                Shop now — from €14,99{" "}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </section>
      <Script src="/theme/cta-banner.js" />
    </>
  );
}
