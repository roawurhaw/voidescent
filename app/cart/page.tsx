import CartPage from "@/components/sections/CartPage";
import { cartJson, readCart } from "@/lib/cart";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ title: "Your Shopping Cart", path: "/cart" });

export default async function Cart() {
  return <CartPage cart={cartJson(await readCart())} />;
}
