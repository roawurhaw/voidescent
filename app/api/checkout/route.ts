import { NextResponse } from "next/server";
import { sanitizeLines } from "@/lib/cart";
import { createCheckout, shopifyConfigured } from "@/lib/shopify";

// Turns the browser cart into a Shopify cart and returns Shopify's checkout URL.
// Payment, tax and the discount code are all handled by Shopify.
export async function POST(request: Request) {
  let body: { lines?: unknown; discountCode?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The cart couldn't be read. Refresh the page and try again." }, { status: 400 });
  }

  const lines = sanitizeLines(body.lines);
  if (lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  if (!shopifyConfigured) {
    return NextResponse.json(
      { error: "Checkout isn't connected in this preview yet. Orders go through voidescent.com for now." },
      { status: 501 },
    );
  }

  const code =
    typeof body.discountCode === "string" && /^[A-Z0-9-]{2,32}$/i.test(body.discountCode)
      ? body.discountCode.toUpperCase()
      : null;

  try {
    const url = await createCheckout(lines, code);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "Checkout failed. Try again in a moment." }, { status: 502 });
  }
}
