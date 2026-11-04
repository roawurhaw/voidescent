import { cookies } from "next/headers";
import { photo, productByVariant, type Product } from "./catalog";

// The theme's scripts talk to Shopify's Ajax cart API (/cart.js, /cart/change.js, ...). These helpers
// recreate it on a cookie, with the same JSON shape and the store's two automatic discounts, so the
// scripts run unchanged. Buying is switched off: nothing adds to the cart any more (/cart/add.js is gone),
// so these only serve carts saved before that, until their cookie expires.

type Line = [variantId: number, quantity: number]; // newest first, like Shopify
const COOKIE = "cart";
const MAX_QTY = 999;
const SCENT_HANDLES = ["nebula", "heavens", "descent"];

export async function readCart(): Promise<Line[]> {
  try {
    const raw = JSON.parse((await cookies()).get(COOKIE)?.value ?? "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter(
      (l): l is Line => Array.isArray(l) && !!productByVariant(Number(l[0])) && Number.isInteger(l[1]) && l[1] > 0 && l[1] <= MAX_QTY,
    );
  } catch {
    return [];
  }
}

export async function writeCart(lines: Line[]) {
  (await cookies()).set(COOKIE, JSON.stringify(lines.filter(([, q]) => q > 0)), {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 14,
  });
}

export function parseQty(v: unknown, fallback: number): number | null {
  const n = v === undefined || v === null || v === "" ? fallback : Number(v);
  return Number.isInteger(n) && n >= 0 && n <= MAX_QTY ? n : null;
}

export function setLine(lines: Line[], id: number, qty: number): Line[] {
  return lines.map((l): Line => (l[0] === id ? [id, qty] : l)).filter(([, q]) => q > 0);
}

// Live automatic discounts (checked against the store on 2026-11-03), never combined; the bigger one wins:
//   "Voide Bundle 3+": €5,66 off every scent bottle once there are 3 or more.
//   "3+3 GRATIS": for every 6 scent bottles, 3 are free (the oldest lines in the cart get them).
function discounts(lines: Line[]): Map<number, { amount: number; title: string }> {
  const out = new Map<number, { amount: number; title: string }>();
  const scents = lines.filter(([id]) => SCENT_HANDLES.includes(productByVariant(id)!.handle));
  const n = scents.reduce((a, [, q]) => a + q, 0);
  const bundle = n >= 3 ? 566 * n : 0;
  let free = 3 * Math.floor(n / 6);
  const unitPrices = scents.flatMap(([id, q]) => Array(q).fill(productByVariant(id)!.price) as number[]).sort((a, b) => a - b);
  const gratis = unitPrices.slice(0, free).reduce((a, b) => a + b, 0);
  if (gratis > bundle) {
    for (const [id, q] of [...scents].reverse()) {
      const take = Math.min(q, free);
      free -= take;
      if (take) out.set(id, { amount: take * productByVariant(id)!.price, title: "3+3 GRATIS" });
    }
  } else if (bundle) {
    for (const [id, q] of scents) out.set(id, { amount: 566 * q, title: "Voide Bundle 3+" });
  }
  return out;
}

const imageUrl = (p: Product) => photo(p.photos[0].file, 256);

export function lineJson(id: number, quantity: number, discount?: { amount: number; title: string }) {
  const p = productByVariant(id)!;
  const amount = discount?.amount ?? 0;
  const line = p.price * quantity;
  return {
    id,
    variant_id: id,
    key: String(id),
    quantity,
    title: p.title,
    product_title: p.title,
    variant_title: null,
    product_id: p.productId,
    handle: p.handle,
    url: `/products/${p.handle}?variant=${id}`,
    image: imageUrl(p),
    sku: p.sku ?? null,
    properties: {},
    price: p.price,
    original_price: p.price,
    final_price: Math.round((line - amount) / quantity),
    line_price: line - amount,
    original_line_price: line,
    final_line_price: line - amount,
    total_discount: amount,
    discounts: amount ? [{ amount, title: discount!.title }] : [],
    line_level_discount_allocations: amount ? [{ amount, discount_application: { title: discount!.title } }] : [],
    line_level_total_discount: amount,
  };
}

export function cartJson(lines: Line[]) {
  const d = discounts(lines);
  const items = lines.map(([id, q]) => lineJson(id, q, d.get(id)));
  const original = items.reduce((a, i) => a + i.original_line_price, 0);
  const total = items.reduce((a, i) => a + i.final_line_price, 0);
  return {
    items,
    item_count: items.reduce((a, i) => a + i.quantity, 0),
    original_total_price: original,
    total_price: total,
    items_subtotal_price: total,
    total_discount: original - total,
    currency: "EUR",
    requires_shipping: items.length > 0,
  };
}

export const cartError = (description: string, status = 422) =>
  Response.json({ status, message: "Cart Error", description }, { status });
