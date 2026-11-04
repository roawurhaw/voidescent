import { parseQty, readCart, setLine, writeCart } from "@/lib/cart";

// The cart page's "Remove" link: /cart/change?id=<key>&quantity=0
export async function GET(request: Request) {
  const url = new URL(request.url);
  const qty = parseQty(url.searchParams.get("quantity"), 1);
  if (qty !== null) await writeCart(setLine(await readCart(), Number(url.searchParams.get("id")), qty));
  return Response.redirect(new URL("/cart", url), 303);
}
