import { cartError, cartJson, parseQty, readCart, setLine, writeCart } from "@/lib/cart";

// Shopify's /cart/change.js: {id: key or variant id, quantity} or {line: 1-based index, quantity}.
export async function POST(request: Request) {
  let body: { id?: unknown; line?: unknown; quantity?: unknown };
  try {
    body = await request.json();
  } catch {
    return cartError("Bad request", 400);
  }
  const lines = await readCart();
  const id = body.line !== undefined ? lines[Number(body.line) - 1]?.[0] : Number(body.id);
  const qty = parseQty(body.quantity, 1);
  if (!lines.some(([v]) => v === id)) return cartError("Cannot find line item", 400);
  if (qty === null) return cartError("Invalid quantity", 400);
  const next = setLine(lines, id!, qty);
  await writeCart(next);
  return Response.json(cartJson(next));
}
