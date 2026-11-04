import "./Contact.css";

// posted: Shopify redirects back with ?contact_posted=true after a successful send; app/contact/route.ts does the same.
export default function Contact({ posted }: { posted: boolean }) {
  return (
    <section id="shopify-section-voide_contact" className="shopify-section">
      <section id="voide-contact">
        <div className="voide-page-width">
          <div className="contact__inner">
            <div className="contact__header">
              <h1 className="contact__title">
                Get in touch
              </h1>
              <p className="contact__sub">
                Have a question about your order or our fragrances? Drop us a message below and our team will get back to you within 24 hours.
              </p>
            </div>
            <form method="post" action="/contact#voide-contact-form" id="voide-contact-form" acceptCharset="UTF-8" className="contact__form">
              <input type="hidden" name="form_type" value="contact" />
              <input type="hidden" name="utf8" value="✓" />
              {/* Spam trap: bots fill it, people never see it (app/contact/route.ts drops those posts). */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", padding: "0", border: "0" }} />
              {posted && (
                <div className="form__status form__status--success">
                  Thanks for contacting us. We&apos;ll get back to you as soon as possible.
                </div>
              )}
              <div className="form__row">
                <div className="form__field">
                  <label htmlFor="ContactForm-name">
                    Name
                  </label>
                  {" "}
                  <input autoComplete="name" type="text" id="ContactForm-name" name="contact[Translation missing: en.templates.contact.form.name]" defaultValue="" placeholder="John Doe" />
                </div>
                <div className="form__field">
                  <label htmlFor="ContactForm-email">
                    Email{" "}
                    <span aria-hidden="true">
                      *
                    </span>
                  </label>
                  {" "}
                  <input autoComplete="email" type="email" id="ContactForm-email" name="contact[email]" spellCheck="false" autoCapitalize="off" defaultValue="" aria-required="true" placeholder="hello@example.com" required />
                </div>
              </div>
              <div className="form__field">
                <label htmlFor="ContactForm-order">
                  Order Number (Optional)
                </label>
                {" "}
                <input type="text" id="ContactForm-order" name="contact[Order Number]" placeholder="#10293" />
              </div>
              <div className="form__field">
                <label htmlFor="ContactForm-body">
                  Message{" "}
                  <span aria-hidden="true">
                    *
                  </span>
                </label>
                {" "}
                <textarea rows={5} id="ContactForm-body" name="contact[Translation missing: en.templates.contact.form.comment]" placeholder="How can we help?" required />
              </div>
              <button type="submit" className="form__submit">
                Send Message
              </button>
            </form>
            <div className="contact__details">
              <p className="contact__details-title">
                VOIDESCENT
              </p>
              <p>
                Romboutslaan 502
                <br />
                3312 KP Dordrecht
                <br />
                Netherlands
              </p>
              <p>
                <a href="mailto:info@voidescent.com">
                  info@voidescent.com
                </a>
                <br />
                <a href="tel:+31618996571">
                  +31 6 18996571
                </a>
              </p>
              <p>
                KvK 42080719
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
