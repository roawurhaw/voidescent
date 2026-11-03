"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "./CartProvider";
import { BUNDLE, packFullPrice, PACKS, SCENT_ORDER, SCENTS } from "@/lib/catalog";
import { describePicks, lineTitle, lineTotal, MAX_QUANTITY, subtotal, type CartLine } from "@/lib/cart";
import { euro } from "@/lib/money";
import { remainingForFree, SHIPPING, shippingCost, ZONES, type CountryCode } from "@/lib/shipping";

function LineImage({ line }: { line: CartLine }) {
  const img = line.type === "single" ? SCENTS[line.scent].images[0] : BUNDLE.images[0];
  return (
    <div className="line__img">
      <Image src={img.src} alt="" width={img.width} height={img.height} sizes="72px" />
    </div>
  );
}

function OilDots({ line }: { line: CartLine }) {
  const scents = line.type === "single" ? [line.scent] : SCENT_ORDER.filter((h) => line.picks[h] > 0);
  return (
    <span className="oil-dots" aria-hidden="true">
      {scents.map((h) => (
        <span key={h} className="oil-dot" style={{ background: SCENTS[h].oil }} />
      ))}
    </span>
  );
}

function ShippingMeter({ country, amount }: { country: CountryCode; amount: number }) {
  const zone = SHIPPING[country];
  const remaining = remainingForFree(country, amount);
  if (remaining === null) {
    return <p className="meter__text">Shipping to {zone.inSentence} is {euro(zone.rate)}.</p>;
  }
  const progress = zone.freeFrom ? Math.min(1, amount / zone.freeFrom) : 1;
  return (
    <div className="meter">
      <p className="meter__text">
        {remaining === 0 ? (
          <>Your order ships free to {zone.inSentence}.</>
        ) : (
          <>
            Add <strong>{euro(remaining)}</strong> for free shipping to {zone.inSentence}.
          </>
        )}
      </p>
      <div className="meter__track" aria-hidden="true">
        <div className="meter__fill" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}

export function CartContents({ onNavigate }: { onNavigate?: () => void }) {
  const { state, hydrated, setQuantity, remove, setCountry, setDiscountCode } = useCart();
  const [code, setCode] = useState("");
  const [checkout, setCheckout] = useState<{ status: "idle" | "loading" | "error"; message?: string }>({
    status: "idle",
  });

  if (!hydrated) return <div className="cart__loading">Loading your cart</div>;

  if (state.lines.length === 0) {
    return (
      <div className="cart__empty">
        <p>Your cart is empty.</p>
        <Link href="/collections/scents" className="button" onClick={onNavigate}>
          Shop the scents
        </Link>
      </div>
    );
  }

  const sub = subtotal(state.lines);
  const ship = shippingCost(state.country, sub);

  function applyCode(e: FormEvent) {
    e.preventDefault();
    if (code.trim()) setDiscountCode(code);
    setCode("");
  }

  async function goToCheckout() {
    setCheckout({ status: "loading" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: state.lines, discountCode: state.discountCode }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      setCheckout({ status: "error", message: data.error ?? "Checkout failed. Try again in a moment." });
    } catch {
      setCheckout({ status: "error", message: "Couldn't reach checkout. Check your connection and try again." });
    }
  }

  return (
    <div className="cart">
      <ShippingMeter country={state.country} amount={sub} />

      <ul className="cart__lines">
        {state.lines.map((line) => {
          const href = line.type === "single" ? `/products/${line.scent}` : `/products/${BUNDLE.handle}`;
          return (
            <li key={line.key} className="line">
              <LineImage line={line} />
              <div className="line__body">
                <Link href={href} className="line__title" onClick={onNavigate}>
                  {lineTitle(line)}
                </Link>
                <p className="line__meta">
                  <OilDots line={line} />
                  {line.type === "single" ? SCENTS[line.scent].family : describePicks(line.picks)}
                </p>
                <div className="line__controls">
                  <div className="stepper stepper--small">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.key, line.quantity - 1)}
                      aria-label={`One less ${lineTitle(line)}`}
                    >
                      −
                    </button>
                    <span aria-live="polite" aria-label={`Quantity ${line.quantity}`}>
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.key, line.quantity + 1)}
                      disabled={line.quantity >= MAX_QUANTITY}
                      aria-label={`One more ${lineTitle(line)}`}
                    >
                      +
                    </button>
                  </div>
                  <button type="button" className="link-button" onClick={() => remove(line.key)}>
                    Remove
                  </button>
                </div>
              </div>
              <p className="line__price">
                {euro(lineTotal(line))}
                {line.type === "pack" && (
                  <s className="line__was">{euro(packFullPrice(PACKS[line.pack]) * line.quantity)}</s>
                )}
              </p>
            </li>
          );
        })}
      </ul>

      <dl className="summary">
        <div className="summary__row">
          <dt>Subtotal</dt>
          <dd>{euro(sub)}</dd>
        </div>
        <div className="summary__row">
          <dt>
            <label htmlFor="ship-country">Shipping to</label>{" "}
            <select
              id="ship-country"
              className="select"
              value={state.country}
              onChange={(e) => setCountry(e.target.value as CountryCode)}
            >
              {ZONES.map((z) => (
                <option key={z.code} value={z.code}>
                  {z.name}
                </option>
              ))}
            </select>
          </dt>
          <dd>{ship === 0 ? "Free" : euro(ship)}</dd>
        </div>
        <div className="summary__row summary__row--code">
          <dt>Discount code</dt>
          <dd>
            {state.discountCode ? (
              <span className="code-chip">
                {state.discountCode}
                <button type="button" className="link-button" onClick={() => setDiscountCode(null)}>
                  Remove
                </button>
              </span>
            ) : (
              <form className="code-form" onSubmit={applyCode}>
                <label htmlFor="discount" className="sr-only">
                  Discount code
                </label>
                <input
                  id="discount"
                  className="input input--small"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Code"
                  autoComplete="off"
                />
                <button type="submit" className="button button--quiet button--small">
                  Apply
                </button>
              </form>
            )}
          </dd>
        </div>
        <div className="summary__row summary__row--total">
          <dt>Total</dt>
          <dd>{euro(sub + ship)}</dd>
        </div>
      </dl>
      {state.discountCode && <p className="cart__note">Your code is checked and applied at checkout.</p>}

      <button
        type="button"
        className="button button--wide"
        onClick={goToCheckout}
        disabled={checkout.status === "loading"}
      >
        {checkout.status === "loading" ? "Opening checkout" : "Check out"}
      </button>
      {checkout.status === "error" && (
        <p className="cart__error" role="alert">
          {checkout.message}
        </p>
      )}
      <p className="cart__note">Shipping and taxes are confirmed at checkout.</p>
    </div>
  );
}
