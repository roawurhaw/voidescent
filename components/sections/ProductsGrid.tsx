import Script from "next/script";
import { money, photo, productByHandle } from "@/lib/catalog";
import "./ProductsGrid.css";

// Left to right, all the same size.
const ROW = ["nebula", "heavens", "descent"].map((h) => productByHandle(h)!);

export default function ProductsGrid() {
  return (
    <>
      <section id="shopify-section-voide_products_grid" className="shopify-section">
        <section id="voide-products">
          <div id="shop-products" style={{ position: "absolute", top: "-50px" }} />
          <div className="voide-page-width">
            <div className="prod__head">
              <p className="voide-section-label">
                The Collection
              </p>
              <h2 className="voide-section-title">
                Elevate your drive
              </h2>
            </div>
            <div className="prod__row">
              {ROW.map((p) => (
                <div className="pcard" key={p.handle}>
                  <a href={`/products/${p.handle}`} className="pcard__media" tabIndex={-1} aria-hidden="true">
                    <img src={photo(p.photos[0].file, 828)} alt={p.title} loading="lazy" width={p.photos[0].width} height={p.photos[0].height} />
                  </a>
                  <div className="pcard__box">
                    <div className="pcard__top">
                      <h3 className="pcard__name">
                        <a href={`/products/${p.handle}`}>{p.title}</a>
                      </h3>
                      <span className="pcard__price">{money(p.price)}</span>
                    </div>
                    <p className="pcard__desc">{p.tagline}</p>
                    {/* Buying is switched off on this copy: the button has no action. */}
                    <button type="button" className="pcard__cta">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
      <Script src="/theme/products-grid.js" />
    </>
  );
}
