"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { PROMO } from "@/lib/site";

// The live site's easter egg, kept: a red star hidden in the hero sky.
export function RedStar() {
  const { setDiscountCode, state } = useCart();
  const [open, setOpen] = useState(false);
  const applied = state.discountCode === PROMO.code;

  return (
    <div className="red-star">
      <button
        type="button"
        className="red-star__button"
        aria-expanded={open}
        aria-controls="red-star-panel"
        aria-label="A red star"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path d="M12 0c.6 6.4 5 11 12 12-7 .9-11.4 5.6-12 12-.6-6.4-5-11.1-12-12 7-1 11.4-5.6 12-12z" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div id="red-star-panel" className="red-star__panel" role="status">
          <p className="red-star__title">You found a red star.</p>
          <p>
            Use <strong>{PROMO.code}</strong> for {PROMO.percent}% off your order.
          </p>
          {applied ? (
            <p className="red-star__done">Code added. It&rsquo;s applied at checkout.</p>
          ) : (
            <button type="button" className="button button--small" onClick={() => setDiscountCode(PROMO.code)}>
              Add code to cart
            </button>
          )}
        </div>
      )}
    </div>
  );
}
