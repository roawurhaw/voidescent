import Script from "next/script";
import { photo } from "@/lib/catalog";
import "./EmailPopup.css";

export default function EmailPopup() {
  return (
    <>
      <div id="shopify-section-popup" className="shopify-section">
        <section id="emailpop" className="emailpop" data-mounted="0">
          <button className="ep__reopen" type="button" aria-label="Open newsletter offer" hidden>
            Get notified
          </button>
          <div className="ep__modal" hidden aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="ep-title">
            <div className="ep__backdrop" />
            <div className="ep__panel" role="document">
              <button className="ep__close" type="button" aria-label="Close">
                ×
              </button>
              <div className="ep__media">
                <img src={photo("Untitled_6903cd9a-3940-4461-9f2c-5823ebc36ae4.jpg", 1400)} alt="" loading="lazy" />
                <div className="ep__media-shade" />
              </div>
              <div className="ep__body">
                <img className="ep__logo" src={photo("platinumSCENT_430x_412f7c86-664c-4a2d-a090-b02b4473ba19.webp", 420)} alt="VOIDESCENT" loading="lazy" />
                <p className="ep__eyebrow">
                  Join the orbit
                </p>
                <h3 className="ep__title" id="ep-title">
                  New scents drop here first
                </h3>
                <p className="ep__sub">
                  Get first access to new scents and restocks.
                </p>
                <form method="post" action="/contact#ep-form" id="ep-form" acceptCharset="UTF-8" className="contact-form">
                  <input type="hidden" name="form_type" value="customer" />
                  <input type="hidden" name="utf8" value="✓" />
                  {" "}
                  <input type="hidden" name="contact[tags]" value="newsletter" />
                  {" "}
                  <input type="hidden" name="customer[accepts_marketing]" value="true" />
                  {" "}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", padding: "0", border: "0" }} />
                  <div className="ep__form">
                    <input className="ep__input" type="email" name="contact[email]" required placeholder="you@domain.com" aria-label="Email address" />
                    {" "}
                    <button className="ep__btn" type="submit">
                      Subscribe
                    </button>
                  </div>
                  <p className="ep__fine">
                    Only new scents, restocks and offers. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </div>
          </div>
          {" "}
        </section>
      </div>
      <Script src="/theme/email-popup.js" />
    </>
  );
}
