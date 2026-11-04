import { cartJson, readCart } from "@/lib/cart";

export async function GET() {
  return Response.json(cartJson(await readCart()));
}
