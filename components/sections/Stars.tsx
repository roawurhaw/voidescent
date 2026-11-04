import Script from "next/script";

export default function Stars() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div id="voide-stars" aria-hidden="true" />
      <div id="voide-redstars" aria-hidden="true" />
      <div id="voide-blackhole" aria-hidden="true">
        <div className="bh__visual">
          <div className="bh__ring" />
          <div className="bh__accretion" />
        </div>
        <div className="bh__code">
          <p>
            You found a red star
          </p>
          <strong>
            STAR-25
          </strong>
          {" "}
          <small>
            25% off your order
          </small>
        </div>
      </div>
      <Script src="/theme/stars.js" />
    </>
  );
}
