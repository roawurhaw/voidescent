import "./About.css";

export default function About() {
  return (
    <div id="shopify-section-main" className="shopify-section">
      <h1>
        About Voidescent
      </h1>
      <div className="vd-page">
        <p className="vd-lead">
          Voidescent is a small Dutch brand from Dordrecht. We make hanging car fragrances: a glass bottle of fragrance oil with a wooden diffuser cap, designed to look as good on your mirror as it smells.
        </p>
        <h2>
          What we make
        </h2>
        <p>
          Every bottle holds 8 ml of fragrance oil and lasts around 4–6 weeks. Hang it from your mirror, tilt it for a few seconds so the wooden cap soaks up the oil, and tilt it again whenever you want the scent stronger.
        </p>
        <ul>
          <li>
            <strong>
              Nebula
            </strong>
            {" "}– soft florals, bright and clean
          </li>
          <li>
            <strong>
              Heavens
            </strong>
            {" "}– creamy sandalwood, calm and warm
          </li>
          <li>
            <strong>
              Descent
            </strong>
            {" "}– coffee and vanilla around white flowers
          </li>
        </ul>
        <p>
          Our line says it best:{" "}
          <em>
            May your space have a scent.
          </em>
        </p>
        <h2>
          How we work
        </h2>
        <p>
          Every order ships from Dordrecht within 1–2 business days, with tracking. Shipping is free in the Netherlands from €25 and in Belgium from €40. You can return unopened bottles within 14 days. All details are on our{" "}
          <a href="/policies/shipping-policy">
            shipping
          </a>
          {" "}and{" "}
          <a href="/policies/refund-policy">
            returns
          </a>
          {" "}pages.
        </p>
        <h2>
          Get in touch
        </h2>
        <p>
          Questions about an order, a scent or anything else? Email us or use our{" "}
          <a href="/pages/contact">
            contact form
          </a>
          . We reply within 24 hours.
        </p>
        <div className="vd-card">
          <p>
            <strong>
              VOIDESCENT
            </strong>
          </p>
          <p>
            Romboutslaan 502, 3312 KP Dordrecht, Netherlands
          </p>
          <p>
            Email:{" "}
            <a href="mailto:info@voidescent.com">
              info@voidescent.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+31618996571">
              +31 6 18996571
            </a>
          </p>
          <p>
            Chamber of Commerce (KvK): 42080719
          </p>
        </div>
      </div>
    </div>
  );
}
