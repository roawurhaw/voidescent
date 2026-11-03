"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import {
  packFullPrice,
  packPerBottle,
  PACKS,
  packSavings,
  SCENT_ORDER,
  SCENTS,
  type PackId,
  type Product,
} from "@/lib/catalog";
import { emptyPicks, picksTotal, type Picks } from "@/lib/cart";
import { euro } from "@/lib/money";
import { SHIPPING, shippingCost } from "@/lib/shipping";

function evenPicks(size: number): Picks {
  const p = emptyPicks();
  for (let i = 0; i < size; i++) p[SCENT_ORDER[i % SCENT_ORDER.length]]++;
  return p;
}

export function BuyBox({ product }: { product: Product }) {
  const { add, state } = useCart();
  const packIds: PackId[] = product.kind === "scent" ? ["single", "trio", "six"] : product.packs;
  const [packId, setPackId] = useState<PackId>(packIds[0]);
  const [picks, setPicks] = useState<Picks>(() => evenPicks(PACKS[packIds[0]].size));
  const pack = PACKS[packId];
  const total = picksTotal(picks);
  const isBox = pack.size > 1;
  const boxReady = !isBox || total === pack.size;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;
    // Stretching the viewport far downwards makes "intersecting" mean "not yet
    // scrolled past", so the bar shows only once the main button is above the screen.
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), {
      rootMargin: "0px 0px 100000px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function choosePack(id: PackId) {
    setPackId(id);
    setPicks(evenPicks(PACKS[id].size));
  }

  function change(handle: keyof Picks, delta: number) {
    setPicks((p) => ({ ...p, [handle]: Math.max(0, p[handle] + delta) }));
  }

  function addToCart() {
    if (!boxReady) return;
    if (packId === "single" && product.kind === "scent") {
      add({ type: "single", scent: product.handle });
    } else if (packId !== "single") {
      add({ type: "pack", pack: packId, picks });
    }
  }

  const zone = SHIPPING[state.country];
  const freeShip = shippingCost(state.country, pack.price) === 0;
  const remaining = pack.size - total;

  return (
    <div className="buybox">
      <fieldset className="packs">
        <legend className="packs__legend">Choose your pack</legend>
        {packIds.map((id) => {
          const p = PACKS[id];
          const label =
            id === "single" && product.kind === "scent" ? `1 bottle of ${product.name}` : `${p.label}, pick your scents`;
          return (
            <label key={id} className="pack" data-selected={id === packId}>
              <input
                type="radio"
                name="pack"
                value={id}
                checked={id === packId}
                onChange={() => choosePack(id)}
                className="pack__radio"
              />
              <span className="pack__text">
                <span className="pack__label">{label}</span>
                {p.size > 1 && (
                  <span className="pack__detail">
                    {euro(packPerBottle(p))} per bottle, save {euro(packSavings(p))}
                  </span>
                )}
              </span>
              <span className="pack__price">
                {euro(p.price)}
                {p.size > 1 && <s>{euro(packFullPrice(p))}</s>}
              </span>
              {p.badge && <span className="pack__badge">{p.badge}</span>}
            </label>
          );
        })}
      </fieldset>

      {isBox && (
        <div className="picker">
          <div className="picker__head">
            <p className="picker__title">Your box</p>
            <p className="picker__status" aria-live="polite">
              {remaining > 0 ? `Pick ${remaining} more` : remaining === 0 ? "Your box is full" : ""}
            </p>
          </div>
          <ul className="picker__list">
            {SCENT_ORDER.map((h) => {
              const s = SCENTS[h];
              return (
                <li key={h} className="picker__row" style={{ ["--oil" as string]: s.oil }}>
                  <Image src={s.images[0].src} alt="" width={s.images[0].width} height={s.images[0].height} sizes="48px" />
                  <span className="picker__name">
                    {s.name}
                    <span>{s.tagline}</span>
                  </span>
                  <span className="stepper">
                    <button
                      type="button"
                      onClick={() => change(h, -1)}
                      disabled={picks[h] === 0}
                      aria-label={`One less ${s.name}`}
                    >
                      −
                    </button>
                    <output aria-label={`${s.name} bottles`}>{picks[h]}</output>
                    <button
                      type="button"
                      onClick={() => change(h, 1)}
                      disabled={total >= pack.size}
                      aria-label={`One more ${s.name}`}
                    >
                      +
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button ref={buttonRef} type="button" className="button button--wide" onClick={addToCart} disabled={!boxReady}>
        {boxReady ? `Add to cart, ${euro(pack.price)}` : `Pick ${remaining} more to add`}
      </button>
      {freeShip && <p className="buybox__free">This pack ships free to {zone.inSentence}.</p>}

      <div className="sticky-buy" data-visible={showSticky} inert={!showSticky}>
        <p className="sticky-buy__name">
          {product.name}
          <span>{pack.size > 1 ? pack.label : "1 bottle"}</span>
        </p>
        <button type="button" className="button button--small" onClick={addToCart} disabled={!boxReady}>
          Add, {euro(pack.price)}
        </button>
      </div>
    </div>
  );
}
