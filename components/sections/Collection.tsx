import { photo } from "@/lib/catalog";
import "./Collection.css";

export default function Collection() {
  return (
    <section id="shopify-section-main" className="shopify-section">
      <section id="voide-collection">
        <div className="voide-page-width">
          <div className="coll__header">
            <h1 className="coll__title">
              Scents
            </h1>
            <div className="coll__desc">
              <p>
                Three car scents in one collection: Nebula (soft florals), Heavens (creamy sandalwood) and Descent (coffee and vanilla). Each bottle holds 8 ml of fragrance oil in glass with a wooden diffuser cap and lasts 4–6 weeks.
              </p>
            </div>
          </div>
          <div className="prod__grid">
            <div className="pcard">
              <a href="/collections/scents/products/heavens" className="pcard__media" tabIndex={-1} aria-hidden="true">
                <img src={photo("heavensUntitled.jpg", 600)} alt="Heavens" loading="lazy" />
              </a>
              <div className="pcard__body">
                <p className="pcard__type">
                  Car Fragrance
                </p>
                <h3 className="pcard__name">
                  <a href="/collections/scents/products/heavens" style={{ textDecoration: "none", color: "inherit" }}>
                    Heavens
                  </a>
                </h3>
                <div className="pcard__price-row">
                  <span className="pcard__price">
                    €14,99
                  </span>
                </div>
                <a href="/collections/scents/products/heavens" className="pcard__cta">
                  Shop Now
                </a>
              </div>
            </div>
            <div className="pcard">
              <a href="/collections/scents/products/descent" className="pcard__media" tabIndex={-1} aria-hidden="true">
                <img src={photo("descentUntitled.jpg", 600)} alt="Descent" loading="lazy" />
              </a>
              <div className="pcard__body">
                <p className="pcard__type">
                  Car Fragrance
                </p>
                <h3 className="pcard__name">
                  <a href="/collections/scents/products/descent" style={{ textDecoration: "none", color: "inherit" }}>
                    Descent
                  </a>
                </h3>
                <div className="pcard__price-row">
                  <span className="pcard__price">
                    €14,99
                  </span>
                </div>
                <a href="/collections/scents/products/descent" className="pcard__cta">
                  Shop Now
                </a>
              </div>
            </div>
            <div className="pcard">
              <a href="/collections/scents/products/nebula" className="pcard__media" tabIndex={-1} aria-hidden="true">
                <img src={photo("nebUntitled.jpg", 600)} alt="Nebula" loading="lazy" />
              </a>
              <div className="pcard__body">
                <p className="pcard__type">
                  Car Fragrance
                </p>
                <h3 className="pcard__name">
                  <a href="/collections/scents/products/nebula" style={{ textDecoration: "none", color: "inherit" }}>
                    Nebula
                  </a>
                </h3>
                <div className="pcard__price-row">
                  <span className="pcard__price">
                    €14,99
                  </span>
                </div>
                <a href="/collections/scents/products/nebula" className="pcard__cta">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
