import { photo } from "@/lib/catalog";
import "./WhyUs.css";

export default function WhyUs() {
  return (
    <section id="shopify-section-y_us" className="shopify-section">
      <section id="voide-why">
        <div className="voide-page-width">
          <div className="features__header">
            <h2 className="features__title">
              Why Voidescent?
            </h2>
          </div>
          <div className="features__grid">
            <div className="feature__item">
              <div className="feature__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="feature__text">
                <h3>
                  Glass + wood, not cardboard
                </h3>
                <p>
                  8 ml fragrance oil in a glass bottle with a wooden diffuser cap.
                </p>
              </div>
            </div>
            <div className="feature__item">
              <div className="feature__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="feature__text">
                <h3>
                  Lasts 4–6 weeks
                </h3>
                <p>
                  Tilt the bottle to refresh the cap whenever you want it stronger.
                </p>
              </div>
            </div>
            <div className="feature__item">
              <div className="feature__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="feature__text">
                <h3>
                  Free shipping NL & BE
                </h3>
                <p>
                  Free from €25 in NL and €40 in Belgium, ships from the Netherlands in 1–2 days.
                </p>
              </div>
            </div>
            <div className="feature__item">
              <div className="feature__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="feature__text">
                <h3>
                  Designed in the Netherlands
                </h3>
                <p>
                  A small Dutch brand making car scents that look as good as they smell.
                </p>
              </div>
            </div>
          </div>
          <div className="features__header">
            <h2 className="features__title">
              Why we are the best choice
            </h2>
          </div>
          <div className="compare__grid">
            <div className="compare__card card--us">
              <div className="card__title">
                <img src={photo("pinkescent_c83bb00e-a390-4d8c-ba63-753871e835cb.png", 400)} alt="Voidescent" style={{ maxWidth: "150px", height: "auto", display: "block", margin: "0 auto" }} width="3388" height="548" loading="lazy" />
              </div>
              <ul className="card__list">
                <li>
                  <svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {" "}Concentrated fragrance oil
                </li>
                <li>
                  <svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {" "}Glass bottle, wooden diffuser cap
                </li>
                <li>
                  <svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {" "}Minimal look that fits any car
                </li>
                <li>
                  <svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {" "}Lasts 4–6 weeks
                </li>
                <li>
                  <svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {" "}Scent notes listed upfront
                </li>
              </ul>
            </div>
            <div className="compare__card card--them">
              <div className="card__title">
                Other Brands
              </div>
              <ul className="card__list">
                <li>
                  <svg className="icon-cross" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {" "}Sharp, cheap-smelling scents
                </li>
                <li>
                  <svg className="icon-cross" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {" "}Flimsy throwaway designs
                </li>
                <li>
                  <svg className="icon-cross" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {" "}Loud designs that clash
                </li>
                <li>
                  <svg className="icon-cross" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {" "}Fades fast
                </li>
                <li>
                  <svg className="icon-cross" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {" "}Vague labels and guesswork
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
