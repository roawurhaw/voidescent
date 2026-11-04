import Script from "next/script";

// Distant spiral galaxies in the sky (public/images/galaxy-*.svg): centre (% of the screen), width (px), tilt (deg),
// how flat it looks from here (1 = face-on), and seconds per turn.
const GALAXIES = [
  { x: 87, y: 20, size: 250, tilt: -25, flat: 0.42, file: "galaxy-red.svg", lap: 360 },
  { x: 5, y: 50, size: 190, tilt: 30, flat: 0.55, file: "galaxy-white.svg", lap: 300 },
  { x: 54, y: 92, size: 120, tilt: -8, flat: 0.34, file: "galaxy-white.svg", lap: 240 },
];

export default function Stars() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div id="voide-stars" aria-hidden="true">
        {GALAXIES.map((g) => (
          <div key={g.x} className="gx" style={{ left: `${g.x}%`, top: `${g.y}%`, width: g.size, height: g.size, transform: `translate(-50%, -50%) rotate(${g.tilt}deg) scaleY(${g.flat})` }}>
            <i style={{ backgroundImage: `url(/images/${g.file})`, animationDuration: `${g.lap}s` }} />
          </div>
        ))}
      </div>
      <div id="voide-nebula" aria-hidden="true" />
      <div id="voide-redstars" aria-hidden="true" />
      <div id="voide-blackhole" aria-hidden="true">
        <div className="bh__visual">
          <div className="bh__disk">
            <i />
          </div>
          <div className="bh__hole" />
          <div className="bh__disk bh__disk--front">
            <i />
          </div>
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
