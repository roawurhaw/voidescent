import type { Metadata } from "next";
import { CartContents } from "@/components/CartContents";

export const metadata: Metadata = { title: "Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="wrap page">
      <div className="cart-page">
        <h1>Your cart</h1>
        <CartContents />
      </div>
    </div>
  );
}
