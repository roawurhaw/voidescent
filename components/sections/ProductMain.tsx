import Script from "next/script";
import { money, photo, productByHandle, SCENT_ORDER, type Product } from "@/lib/catalog";
import "./ProductMain.css";

export default function ProductMain({ product }: { product: Product }) {
  const six = product.defaultPack === "six";
  const scents = [product.handle, ...SCENT_ORDER.filter((h) => h !== product.handle)]
    .map((h) => productByHandle(h)!)
    .filter((p) => SCENT_ORDER.includes(p.handle));
  const photos = product.photos;
  return (
    <>
      <section id="shopify-section-voide_main_product" className="shopify-section">
        <section id="voide-pdp" data-default-pack={product.defaultPack} data-variant-id={product.variantId} data-price={product.price}>
          <div className="voide-page-width">
            <nav className="pdp__breadcrumb" aria-label="Breadcrumb">
              <a href="/">
                Home
              </a>
              {" "}&nbsp;/&nbsp;{" "}
              <a href="/collections/scents">
                Shop
              </a>
              {" "}&nbsp;/&nbsp;{" "}
              <span>
                {product.title}
              </span>
            </nav>
            <div className="pdp__grid">
              <div className="gallery" id="voide-gallery">
                <div className="gallery__viewport">
                  <div className="gallery__track" id="voide-track" tabIndex={0} aria-label={product.title}>
                    {photos.map((ph, i) => (
                      <div className="gallery__slide" key={ph.file}>
                        <img
                          src={photo(ph.file, 900)}
                          srcSet={[640, 828, 1080].map((w) => `${photo(ph.file, w)} ${w}w`).join(", ")}
                          sizes="(max-width: 860px) 96vw, 50vw"
                          alt={ph.alt}
                          width={ph.width}
                          height={ph.height}
                          loading={i === 0 ? "eager" : "lazy"}
                          fetchPriority={i === 0 ? "high" : undefined}
                        />
                      </div>
                    ))}
                  </div>
                  {photos.length > 1 && (
                    <div className="gallery__dots" aria-hidden="true">
                      {photos.map((ph, i) => (
                        <span className={i === 0 ? "gallery__dot is-active" : "gallery__dot"} key={ph.file} />
                      ))}
                    </div>
                  )}
                </div>
                {photos.length > 1 && (
                  <div className="gallery__thumbs">
                    {photos.map((ph, i) => (
                      <button className={i === 0 ? "gallery__thumb active" : "gallery__thumb"} type="button" data-index={i} aria-label={`View image ${i + 1}`} key={ph.file}>
                        <img src={photo(ph.file, 160)} alt="" loading="lazy" width="72" height="72" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="info" id="voide-info">
                <p className="info__cat">
                  Car Hanger Fragrance
                </p>
                <h1 className="info__title">
                  {product.title}
                </h1>
                <div className="info__jdgm">
                  <div className="jdgm-widget jdgm-preview-badge" data-id={product.productId}>
                    <div style={{ display: "none" }} className="jdgm-prev-badge" data-average-rating="0.00" data-number-of-reviews="0" data-number-of-questions="0">
                      <span className="jdgm-prev-badge__stars" data-score="0.00" tabIndex={0} aria-label="0.00 stars" role="button">
                        <span className="jdgm-star jdgm--off" />
                        <span className="jdgm-star jdgm--off" />
                        <span className="jdgm-star jdgm--off" />
                        <span className="jdgm-star jdgm--off" />
                        <span className="jdgm-star jdgm--off" />
                      </span>
                      {" "}
                      <span className="jdgm-prev-badge__text">
                        No reviews
                      </span>
                    </div>
                  </div>
                </div>
                <p className="info__tagline">
                  {product.tagline}
                </p>
                <ul className="facts">
                  <li>
                    {product.family}
                  </li>
                  <li>
                    8 ml
                  </li>
                  <li>
                    Lasts 4–6 weeks
                  </li>
                </ul>
                <div className="packs" id="voide-packs">
                  <p className="packs__label" id="voide-packs-label">
                    Choose your pack
                  </p>
                  <div role="radiogroup" aria-labelledby="voide-packs-label" className="packs" style={{ margin: "0" }}>
                    {!six && (
                      <label className="pack is-selected" data-pack="single">
                        <input type="radio" name="pack" value="single" defaultChecked />
                        {" "}
                        <span className="pack__radio" aria-hidden="true" />
                        {" "}
                        <span className="pack__main">
                          <span className="pack__title">
                            1 bottle
                          </span>
                          {" "}
                          <span className="pack__sub">
                            {product.title}
                          </span>
                        </span>
                        {" "}
                        <span className="pack__prices">
                          <span className="pack__price">
                            {money(product.price)}
                          </span>
                        </span>
                      </label>
                    )}
                    <label className="pack pack--bundle" data-pack="bundle">
                      <input type="radio" name="pack" value="bundle" />
                      {" "}
                      <span className="pack__badge pack__badge--soft">
                        Popular
                      </span>
                      {" "}
                      <span className="pack__radio" aria-hidden="true" />
                      {" "}
                      <span className="pack__main">
                        <span className="pack__title">
                          3 bottles · pick your scents
                        </span>
                        {" "}
                        <span className="pack__sub">
                          €9,33 per bottle ·{" "}
                          <span className="pack__save">
                            Save €16,98
                          </span>
                        </span>
                        <span className="pack__ship">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Free shipping
                        </span>
                      </span>
                      {" "}
                      <span className="pack__prices">
                        <span className="pack__price" data-bundle-total="">
                          €27,99
                        </span>
                        {" "}
                        <s className="pack__compare" data-bundle-compare="">
                          €44,97
                        </s>
                      </span>
                    </label>
                    {" "}
                    <label className={six ? "pack pack--bundle pack--six is-selected" : "pack pack--bundle pack--six"} data-pack="six">
                      <input type="radio" name="pack" value="six" defaultChecked={six} />
                      {" "}
                      <span className="pack__badge">
                        Buy 3 get 3 free
                      </span>
                      {" "}
                      <span className="pack__radio" aria-hidden="true" />
                      {" "}
                      <span className="pack__main">
                        <span className="pack__title">
                          6 bottles · pick your scents
                        </span>
                        {" "}
                        <span className="pack__sub">
                          €7,50 per bottle ·{" "}
                          <span className="pack__save">
                            Save €44,97
                          </span>
                        </span>
                        <span className="pack__ship">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Free shipping
                        </span>
                      </span>
                      {" "}
                      <span className="pack__prices">
                        <span className="pack__price" data-six-total="">
                          €44,97
                        </span>
                        {" "}
                        <s className="pack__compare" data-six-compare="">
                          €89,94
                        </s>
                      </span>
                    </label>
                  </div>
                  <div className="picker" id="voide-picker" hidden={!six}>
                    <div className="picker__head">
                      <span className="picker__title">
                        Your box
                      </span>
                      {" "}
                      <span className="picker__slots" aria-hidden="true">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <span className="slot" hidden={!six && i >= 3} key={i} />
                        ))}
                      </span>
                      {" "}
                      <span className="picker__status" data-status="" aria-live="polite" />
                    </div>
                    <ul className="picker__list">
                      {scents.map((p) => (
                        <li className="pk" data-vid={p.variantId} data-price={p.price} data-available="true" data-current={p.handle === product.handle ? "1" : "0"} data-img={photo(p.photos[0].file, 120)} key={p.handle}>
                          <img className="pk__img" src={photo(p.photos[0].file, 120)} alt="" width="48" height="48" loading="lazy" />
                          <span className="pk__info">
                            <span className="pk__name">
                              {p.title}
                            </span>
                            <span className="pk__desc">
                              {p.tagline}
                            </span>
                          </span>
                          <span className="pk__step">
                            <button type="button" className="pk__btn" data-minus="" aria-label={`Remove ${p.title}`}>
                              −
                            </button>
                            {" "}
                            <span className="pk__qty" data-qty="">
                              0
                            </span>
                            {" "}
                            <button type="button" className="pk__btn" data-plus="" aria-label={`Add ${p.title}`}>
                              +
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button type="button" className="btn-atc" id="voide-atc">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  <span data-atc-label="">
                    {six ? "Pick 6 more scents" : `Add to Cart · ${money(product.price)}`}
                  </span>
                </button>
                <ul className="trust">
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    {" "}Free shipping from €25
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M21 8 12 3 3 8v8l9 5 9-5V8z" />
                      <path d="m3 8 9 5 9-5" />
                      <path d="M12 13v8" />
                    </svg>
                    {" "}Ships within 1–2 business days
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 12a9 9 0 1 0 3-6.7" />
                      <polyline points="3 3 3 9 9 9" />
                    </svg>
                    {" "}14-day returns on unopened bottles
                  </li>
                  <li className="trust__eta" data-eta="" hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <span data-eta-text="" />
                  </li>
                </ul>
                <div className="pay">
                  <span className="pay__label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    {" "}Secure checkout
                  </span>
                  <ul className="pay__icons">
                    <li>
                      <svg className="pay__icon" xmlns="http://www.w3.org/2000/svg" aria-labelledby="pi-bancontact" role="img" viewBox="0 0 38 24" width="38" height="24">
                        <title id="pi-bancontact">
                          Bancontact
                        </title>
                        <path fill="#000" opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" />
                        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" />
                        <path d="M4.703 3.077h28.594c.139 0 .276.023.405.068.128.045.244.11.343.194a.9.9 0 0 1 .229.29c.053.107.08.223.08.34V20.03a.829.829 0 0 1-.31.631 1.164 1.164 0 0 1-.747.262H4.703a1.23 1.23 0 0 1-.405-.068 1.09 1.09 0 0 1-.343-.194.9.9 0 0 1-.229-.29.773.773 0 0 1-.08-.34V3.97c0-.118.027-.234.08-.342a.899.899 0 0 1 .23-.29c.098-.082.214-.148.342-.193a1.23 1.23 0 0 1 .405-.068Z" fill="#fff" />
                        <path d="M6.38 18.562v-3.077h1.125c.818 0 1.344.259 1.344.795 0 .304-.167.515-.401.638.338.132.536.387.536.734 0 .62-.536.91-1.37.91H6.38Zm.724-1.798h.537c.328 0 .468-.136.468-.387 0-.268-.255-.356-.599-.356h-.406v.743Zm0 1.262h.448c.438 0 .693-.093.693-.383 0-.286-.219-.404-.63-.404h-.51v.787Zm3.284.589c-.713 0-1.073-.295-1.073-.69 0-.436.422-.69 1.047-.695.156.002.31.014.464.035v-.105c0-.269-.183-.396-.531-.396a2.128 2.128 0 0 0-.688.105l-.13-.474a3.01 3.01 0 0 1 .9-.132c.767 0 1.147.343 1.147.936v1.222c-.214.093-.615.194-1.136.194Zm.438-.497v-.47a2.06 2.06 0 0 0-.37-.036c-.24 0-.427.08-.427.286 0 .185.156.281.432.281a.947.947 0 0 0 .365-.061Zm1.204.444v-2.106a3.699 3.699 0 0 1 1.177-.193c.76 0 1.198.316 1.198.9v1.399h-.719v-1.354c0-.303-.167-.444-.484-.444a1.267 1.267 0 0 0-.459.079v1.719h-.713Zm4.886-2.167-.135.479a1.834 1.834 0 0 0-.588-.11c-.422 0-.652.25-.652.664 0 .453.24.685.688.685.2-.004.397-.043.578-.114l.115.488a2.035 2.035 0 0 1-.75.128c-.865 0-1.365-.453-1.365-1.17 0-.712.495-1.182 1.323-1.182.27-.001.538.043.787.132Zm1.553 2.22c-.802 0-1.302-.47-1.302-1.178 0-.704.5-1.174 1.302-1.174.807 0 1.297.47 1.297 1.173 0 .708-.49 1.179-1.297 1.179Zm0-.502c.37 0 .563-.259.563-.677 0-.413-.193-.672-.563-.672-.364 0-.568.26-.568.672 0 .418.204.677.568.677Zm1.713.449v-2.106a3.699 3.699 0 0 1 1.177-.193c.76 0 1.198.316 1.198.9v1.399h-.719v-1.354c0-.303-.166-.444-.484-.444a1.268 1.268 0 0 0-.459.079v1.719h-.713Zm3.996.053c-.62 0-.938-.286-.938-.866v-.95h-.354v-.484h.355v-.488l.718-.03v.518h.578v.484h-.578v.94c0 .256.125.374.36.374.093 0 .185-.008.276-.026l.036.488c-.149.028-.3.041-.453.04Zm1.814 0c-.713 0-1.073-.295-1.073-.69 0-.436.422-.69 1.047-.695.155.002.31.014.464.035v-.105c0-.269-.183-.396-.532-.396a2.128 2.128 0 0 0-.687.105l-.13-.474a3.01 3.01 0 0 1 .9-.132c.766 0 1.146.343 1.146.936v1.222c-.213.093-.614.194-1.135.194Zm.438-.497v-.47a2.06 2.06 0 0 0-.37-.036c-.24 0-.427.08-.427.286 0 .185.156.281.432.281a.946.946 0 0 0 .365-.061Zm3.157-1.723-.136.479a1.834 1.834 0 0 0-.588-.11c-.422 0-.651.25-.651.664 0 .453.24.685.687.685.2-.004.397-.043.578-.114l.115.488a2.035 2.035 0 0 1-.75.128c-.865 0-1.365-.453-1.365-1.17 0-.712.495-1.182 1.323-1.182.27-.001.538.043.787.132Zm1.58 2.22c-.62 0-.938-.286-.938-.866v-.95h-.354v-.484h.354v-.488l.72-.03v.518h.577v.484h-.578v.94c0 .256.125.374.36.374.092 0 .185-.008.276-.026l.036.488c-.149.028-.3.041-.453.04Z" fill="#1E3764" />
                        <path d="M11.394 13.946c3.803 0 5.705-2.14 7.606-4.28H6.38v4.28h5.014Z" fill="url(#pi-bancontact-a)" />
                        <path d="M26.607 5.385c-3.804 0-5.705 2.14-7.607 4.28h12.62v-4.28h-5.013Z" fill="url(#pi-bancontact-b)" />
                        <defs>
                          <linearGradient id="pi-bancontact-a" x1="8.933" y1="12.003" x2="17.734" y2="8.13" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#005AB9" />
                            <stop offset="1" stopColor="#1E3764" />
                          </linearGradient>
                          <linearGradient id="pi-bancontact-b" x1="19.764" y1="10.037" x2="29.171" y2="6.235" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FBA900" />
                            <stop offset="1" stopColor="#FFD800" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </li>
                    <li>
                      <svg className="pay__icon" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" fill="none" aria-labelledby="pi-visa">
                        <title id="pi-visa">
                          Visa
                        </title>
                        <rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none" />
                        <path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#142FBD" style={{ fill: "color(display-p3 0.0784 0.1843 0.7412)", fillOpacity: "1" }} />
                        <path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="#1532CB" style={{ fill: "color(display-p3 0.0824 0.1961 0.7961)", fillOpacity: "1" }} />
                        <path d="M29.5944 10.2167H29.2778C28.8556 11.2722 28.5389 11.8 28.2222 13.3833H30.2278C29.9111 11.8 29.9111 11.0611 29.5944 10.2167V10.2167ZM32.6556 16.4444H30.8611C30.7556 16.4444 30.7556 16.4444 30.65 16.3389L30.4389 15.3889L30.3333 15.1778H27.8C27.6944 15.1778 27.5889 15.1778 27.5889 15.3889L27.2722 16.3389C27.2722 16.4444 27.1667 16.4444 27.1667 16.4444H24.95L25.1611 15.9167L28.2222 8.73889C28.2222 8.21111 28.5389 8 29.0667 8H30.65C30.7556 8 30.8611 8 30.8611 8.21111L32.3389 15.0722C32.4444 15.4944 32.55 15.8111 32.55 16.2333C32.6556 16.3389 32.6556 16.3389 32.6556 16.4444V16.4444ZM18.5111 16.1278L18.9333 14.2278C19.0389 14.2278 19.1444 14.3333 19.1444 14.3333C19.8833 14.65 20.6222 14.8611 21.3611 14.7556C21.5722 14.7556 21.8889 14.65 22.1 14.5444C22.6278 14.3333 22.6278 13.8056 22.2056 13.3833C21.9944 13.1722 21.6778 13.0667 21.3611 12.8556C20.9389 12.6444 20.5167 12.4333 20.2 12.1167C18.9333 11.0611 19.3556 9.58333 20.0944 8.84444C20.7278 8.42222 21.0444 8 21.8889 8C23.1556 8 24.5278 8 25.1611 8.21111H25.2667C25.1611 8.84444 25.0556 9.37222 24.8444 10.0056C24.3167 9.79444 23.7889 9.58333 23.2611 9.58333C22.9444 9.58333 22.6278 9.58333 22.3111 9.68889C22.1 9.68889 21.9944 9.79444 21.8889 9.9C21.6778 10.1111 21.6778 10.4278 21.8889 10.6389L22.4167 11.0611C22.8389 11.2722 23.2611 11.4833 23.5778 11.6944C24.1056 12.0111 24.6333 12.5389 24.7389 13.1722C24.95 14.1222 24.6333 14.9667 23.7889 15.6C23.2611 16.0222 23.05 16.2333 22.3111 16.2333C20.8333 16.2333 19.6722 16.3389 18.7222 16.0222C18.6167 16.2333 18.6167 16.2333 18.5111 16.1278V16.1278ZM14.8167 16.4444C14.9222 15.7056 14.9222 15.7056 15.0278 15.3889C15.5556 13.0667 16.0833 10.6389 16.5056 8.31667C16.6111 8.10556 16.6111 8 16.8222 8H18.7222C18.5111 9.26667 18.3 10.2167 17.9833 11.3778C17.6667 12.9611 17.35 14.5444 16.9278 16.1278C16.9278 16.3389 16.8222 16.3389 16.6111 16.3389L14.8167 16.4444ZM5 8.21111C5 8.10556 5.21111 8 5.31667 8H8.90556C9.43333 8 9.85556 8.31667 9.96111 8.84444L10.9111 13.4889C10.9111 13.5944 10.9111 13.5944 11.0167 13.7C11.0167 13.5944 11.1222 13.5944 11.1222 13.5944L13.3389 8.21111C13.2333 8.10556 13.3389 8 13.4444 8H15.6611C15.6611 8.10556 15.6611 8.10556 15.5556 8.21111L12.2833 15.9167C12.1778 16.1278 12.1778 16.2333 12.0722 16.3389C11.9667 16.4444 11.7556 16.3389 11.5444 16.3389H9.96111C9.85556 16.3389 9.75 16.3389 9.75 16.1278L8.06111 9.58333C7.85 9.37222 7.53333 9.05556 7.11111 8.95C6.47778 8.63333 5.31667 8.42222 5.10556 8.42222L5 8.21111Z" fill="white" style={{ fill: "white", fillOpacity: "1" }} />
                      </svg>
                    </li>
                    <li>
                      <svg className="pay__icon" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" fill="none" aria-labelledby="pi-master">
                        <title id="pi-master">
                          Mastercard
                        </title>
                        <rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none" />
                        <path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#1C1C1C" style={{ fill: "color(display-p3 0.1098 0.1098 0.1098)", fillOpacity: "1" }} />
                        <path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="#232323" style={{ fill: "color(display-p3 0.1373 0.1373 0.1373)", fillOpacity: "1" }} />
                        <path d="M14.6364 19.2727C18.8538 19.2727 22.2727 15.8538 22.2727 11.6364C22.2727 7.41892 18.8538 4 14.6364 4C10.4189 4 7 7.41892 7 11.6364C7 15.8538 10.4189 19.2727 14.6364 19.2727Z" fill="#EB001B" style={{ fill: "color(display-p3 0.9216 0.0000 0.1059)", fillOpacity: "1" }} />
                        <path d="M23.3637 19.2727C27.5811 19.2727 31 15.8538 31 11.6364C31 7.41892 27.5811 4 23.3637 4C19.1462 4 15.7273 7.41892 15.7273 11.6364C15.7273 15.8538 19.1462 19.2727 23.3637 19.2727Z" fill="#F79E1B" style={{ fill: "color(display-p3 0.9686 0.6196 0.1059)", fillOpacity: "1" }} />
                        <path d="M22.2727 11.6362C22.2727 9.01797 20.9637 6.72706 19 5.41797C17.0364 6.83615 15.7273 9.12706 15.7273 11.6362C15.7273 14.1452 17.0364 16.5452 19 17.8543C20.9637 16.5452 22.2727 14.2543 22.2727 11.6362Z" fill="#FF5F00" style={{ fill: "color(display-p3 1.0000 0.3725 0.0000)", fillOpacity: "1" }} />
                      </svg>
                    </li>
                    <li>
                      <svg className="pay__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" x="0" y="0" width="38" height="24" viewBox="0 0 165.521 105.965" xmlSpace="preserve" aria-labelledby="pi-apple_pay">
                        <title id="pi-apple_pay">
                          Apple Pay
                        </title>
                        <path fill="#000" d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z" />
                        <path fill="#FFF" d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875" />
                        <g>
                          <g>
                            <path fill="#000" d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858" />
                            <path fill="#000" d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048" />
                          </g>
                          <g>
                            <path fill="#000" d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z" />
                            <path fill="#000" d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z" />
                            <path fill="#000" d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z" />
                          </g>
                        </g>
                      </svg>
                    </li>
                    <li>
                      <svg className="pay__icon" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-paypal">
                        <title id="pi-paypal">
                          PayPal
                        </title>
                        <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" />
                        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" />
                        <path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z" />
                        <path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z" />
                        <path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z" />
                      </svg>
                    </li>
                    <li>
                      <svg className="pay__icon" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" viewBox="0 0 38 24" aria-labelledby="pi-klarna" fill="none">
                        <title id="pi-klarna">
                          Klarna
                        </title>
                        <rect width="38" height="24" rx="2" fill="#FFA8CD" />
                        <rect x=".5" y=".5" width="37" height="23" rx="1.5" stroke="#000" strokeOpacity=".07" />
                        <path d="M30.62 14.755c-.662 0-1.179-.554-1.179-1.226 0-.673.517-1.226 1.18-1.226.663 0 1.18.553 1.18 1.226 0 .672-.517 1.226-1.18 1.226zm-.33 1.295c.565 0 1.286-.217 1.686-1.068l.04.02c-.176.465-.176.742-.176.81v.11h1.423v-4.786H31.84v.109c0 .069 0 .346.175.81l-.039.02c-.4-.85-1.121-1.068-1.687-1.068-1.355 0-2.31 1.088-2.31 2.522 0 1.433.955 2.521 2.31 2.521zm-4.788-5.043c-.643 0-1.15.228-1.56 1.068l-.039-.02c.175-.464.175-.741.175-.81v-.11h-1.423v4.787h1.462V13.4c0-.662.38-1.078.995-1.078.614 0 .917.356.917 1.068v2.532h1.462v-3.046c0-1.088-.838-1.869-1.989-1.869zm-4.963 1.068l-.039-.02c.176-.464.176-.741.176-.81v-.11h-1.424v4.787h1.463l.01-2.304c0-.673.35-1.078.926-1.078.156 0 .282.02.429.06v-1.464c-.644-.139-1.22.109-1.54.94zm-4.65 2.68c-.664 0-1.18-.554-1.18-1.226 0-.673.516-1.226 1.18-1.226.662 0 1.179.553 1.179 1.226 0 .672-.517 1.226-1.18 1.226zm-.332 1.295c.565 0 1.287-.217 1.687-1.068l.038.02c-.175.465-.175.742-.175.81v.11h1.424v-4.786h-1.424v.109c0 .069 0 .346.175.81l-.038.02c-.4-.85-1.122-1.068-1.687-1.068-1.356 0-2.311 1.088-2.311 2.522 0 1.433.955 2.521 2.31 2.521zm-4.349-.128h1.463V9h-1.463v6.922zM10.136 9H8.644c0 1.236-.751 2.343-1.892 3.134l-.448.317V9h-1.55v6.922h1.55V12.49l2.564 3.43h1.892L8.293 12.64c1.121-.82 1.852-2.096 1.843-3.639z" fill="#0B051D" />
                      </svg>
                    </li>
                  </ul>
                </div>
                <div className="accordions">
                  <details open>
                    <summary>
                      Fragrance Notes
                    </summary>
                    <div className="acc__body">
                      <div className="pyramid">
                        <div className="pyr-lane">
                          <div className="pyr-lane__label">
                            Top Notes
                          </div>
                          <div className="pyr-lane__notes">
                            <span className="note-chip">
                              {product.notes[0]}
                            </span>
                          </div>
                        </div>
                        <div className="pyr-lane">
                          <div className="pyr-lane__label">
                            Heart Notes
                          </div>
                          <div className="pyr-lane__notes">
                            <span className="note-chip">
                              {product.notes[1]}
                            </span>
                          </div>
                        </div>
                        <div className="pyr-lane">
                          <div className="pyr-lane__label">
                            Base Notes
                          </div>
                          <div className="pyr-lane__notes">
                            <span className="note-chip">
                              {product.notes[2]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                  <details>
                    <summary>
                      Product Details
                    </summary>
                    <div className="acc__body">
                      <dl className="specs">
                        <div>
                          <dt>
                            Type
                          </dt>
                          <dd>
                            Car Hanger Fragrance
                          </dd>
                        </div>
                        <div>
                          <dt>
                            Longevity
                          </dt>
                          <dd>
                            4–6 weeks
                          </dd>
                        </div>
                        <div>
                          <dt>
                            Format
                          </dt>
                          <dd>
                            8 ml glass bottle with wooden diffuser cap
                          </dd>
                        </div>
                        <div>
                          <dt>
                            Fragrance family
                          </dt>
                          <dd>
                            {product.family}
                          </dd>
                        </div>
                        <div>
                          <dt>
                            Use
                          </dt>
                          <dd>
                            Rear-view mirror, visor, anywhere in-car
                          </dd>
                        </div>
                        <div>
                          <dt>
                            Origin
                          </dt>
                          <dd>
                            Designed in the Netherlands
                          </dd>
                        </div>
                        <div className="full">
                          <dt>
                            Ingredients
                          </dt>
                          <dd>
                            Fragrance oil. Keep away from children and pets; avoid contact with dashboard, paint and plastic.
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </details>
                  <details>
                    <summary>
                      How to Use
                    </summary>
                    <div className="acc__body">
                      <p>
                        Take off the cap, pull out the plug and put the cap back on. Hang it from your mirror and tilt the bottle for 2–3 seconds so the wooden cap soaks up the oil. Tilt again whenever you want it stronger. Keep away from children and pets, and don't let the oil touch your dashboard, paint or plastic.
                      </p>
                    </div>
                  </details>
                  <details>
                    <summary>
                      Shipping & Returns
                    </summary>
                    <div className="acc__body">
                      <p>
                        Orders ship within 1–2 business days from the Netherlands, tracked. Netherlands €3,95, free from €25. Belgium €6,95, free from €40. Germany €4,95, free from €35. France €5,95, free from €40. Other EU countries €5,95. You can return unopened bottles within 14 days — see our refund policy for details.
                      </p>
                    </div>
                  </details>
                  <details>
                    <summary>
                      FAQ
                    </summary>
                    <div className="acc__body">
                      <p className="faq__q">
                        How strong is the scent?
                      </p>
                      <p className="faq__a">
                        You control it. Tilt the bottle for 2–3 seconds so the wooden cap soaks up more oil whenever you want it stronger.
                      </p>
                      <p className="faq__q">
                        How long does one bottle last?
                      </p>
                      <p className="faq__a">
                        4–6 weeks, depending on how often you tilt it.
                      </p>
                      <p className="faq__q">
                        Is it safe for my car?
                      </p>
                      <p className="faq__a">
                        Yes, as long as the oil doesn't touch your dashboard, paint or plastic — it can leave marks. Keep it away from children and pets.
                      </p>
                      <p className="faq__q">
                        Which scent should I choose?
                      </p>
                      <p className="faq__a">
                        Nebula is soft and floral, Heavens is creamy sandalwood and Descent is sweet coffee and vanilla. Can't decide? Pick all three in the bundle.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div id="voide-sticky-atc" aria-hidden="true">
          <div className="satc__inner">
            <div className="satc__info">
              <strong>
                {product.title}
              </strong>
              {" "}
              <span data-satc-sub="">
                Car Hanger Fragrance
              </span>
            </div>
            <button className="satc__btn" id="voide-satc-btn" type="button" tabIndex={-1}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span data-satc-label="" />
            </button>
          </div>
        </div>
      </section>
      <Script src="/theme/product.js" />
    </>
  );
}
