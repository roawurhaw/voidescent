import Script from "next/script";
import "./Announcement.css";

export default function Announcement() {
  return (
    <>
      <div id="shopify-section-announcement_bar" className="shopify-section shopify-section-group-header-group">
        <section id="announce" className="v-ann" data-key="v_ann" hidden>
          <div className="v-ann__inner">
            <div className="v-ann__text" data-marquee="true">
              <p>
                Free shipping in NL from €25
              </p>
            </div>
            <button className="v-ann__close" type="button" aria-label="Close">
              ×
            </button>
          </div>
          {" "}
        </section>
      </div>
      <Script src="/theme/announcement.js" />
    </>
  );
}
