"use client";

import { useCart } from "./CartProvider";
import type { NewLine } from "@/lib/cart";

type Props = {
  line: NewLine;
  label?: string;
  className?: string;
  /** Accessible name when the visible label is short, e.g. "Add Nebula to cart". */
  ariaLabel?: string;
};

export function AddToCartButton({ line, label = "Add to cart", className = "button", ariaLabel }: Props) {
  const { add } = useCart();
  return (
    <button type="button" className={className} onClick={() => add(line)} aria-label={ariaLabel}>
      {label}
    </button>
  );
}
