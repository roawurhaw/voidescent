import { parseQty, readCart, setLine, writeCart } from "@/lib/cart";

// The cart page posts quantity changes here (updates[] in cart order, or updates[<key>]). Checkout is switched off.
export async function POST(request: Request) {
  const form = await request.formData();
  let lines = await readCart();
  const ordered = form.getAll("updates[]");
  const targets = ordered.length
    ? lines.map(([id], i) => [id, ordered[i]] as const)
    : [...form.entries()].flatMap(([k, v]) => {
        const m = k.match(/^updates\[(\d+)\]$/);
        return m ? [[Number(m[1]), v] as const] : [];
      });
  for (const [id, v] of targets) {
    const qty = parseQty(v, 1);
    if (qty !== null) lines = setLine(lines, id, qty);
  }
  await writeCart(lines);
  return Response.redirect(new URL("/cart", request.url), 303);
}
