import "./Story.css";

export default function Story() {
  return (
    <section id="shopify-section-voide_story" className="shopify-section">
      <section id="voide-story">
        <div id="story" style={{ position: "absolute", top: "-50px" }} />
        <div className="voide-page-width">
          <div className="story__inner">
            <div className="story__content">
              <p className="voide-section-label">
                Our Philosophy
              </p>
              <h2 className="voide-section-title">
                The ever lingering scent
              </h2>
              <p>
                VOIDESCENT was born from a single belief: your car is an extension of your identity. The music you play, the route you take — all of it tells a story. The scent you choose should too.
              </p>
              <p>
                We make car hanger fragrances with concentrated fragrance oil, inspired by the mystery and beauty of the cosmos. Each bottle is a small scent experience — clean, lingering and easy to love.
              </p>
              <p>
                Three scents, three moods: Nebula is soft and floral, Heavens is creamy sandalwood, and Descent is sweet coffee and vanilla. Pick the one that fits you — or get all three in the bundle.
              </p>
              <div className="story__chips">
                <span className="voide-chip">
                  ✦ Soft florals
                </span>
                <span className="voide-chip">
                  ✦ Creamy sandalwood
                </span>
                <span className="voide-chip">
                  ✦ Coffee & vanilla
                </span>
                <span className="voide-chip">
                  ✦ 4–6 week longevity
                </span>
                <span className="voide-chip">
                  ✦ Fragrance oil formula
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
