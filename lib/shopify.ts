// Server-only Shopify Storefront API helpers.
// Shopify stays the backend: payments, orders, discounts and policies.
// This site only builds the cart and hands it to Shopify's own checkout.
import "server-only";
import { describePicks, type CartLine } from "./cart";
import type { ScentHandle } from "./catalog";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
const version = process.env.SHOPIFY_API_VERSION || "2025-10";

export const shopifyConfigured = Boolean(domain && token);

async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate: number | false = false,
): Promise<T> {
  if (!domain || !token) throw new Error("Shopify is not configured");
  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    ...(revalidate === false ? { cache: "no-store" as const } : { next: { revalidate } }),
  });
  if (!res.ok) throw new Error(`Shopify responded ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data as T;
}

const SCENT_VARIANT_ENV: Record<ScentHandle, string | undefined> = {
  nebula: process.env.SHOPIFY_VARIANT_NEBULA,
  heavens: process.env.SHOPIFY_VARIANT_HEAVENS,
  descent: process.env.SHOPIFY_VARIANT_DESCENT,
};
const PACK_VARIANT_ENV = {
  trio: process.env.SHOPIFY_VARIANT_PACK_TRIO,
  six: process.env.SHOPIFY_VARIANT_PACK_SIX,
};

const toGid = (id: string) => (id.startsWith("gid://") ? id : `gid://shopify/ProductVariant/${id}`);

type CartCreate = {
  cartCreate: {
    cart: { checkoutUrl: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

/** Creates a Shopify cart and returns its checkout URL. */
export async function createCheckout(lines: CartLine[], discountCode: string | null): Promise<string> {
  const shopifyLines = lines.map((line) => {
    const id = line.type === "single" ? SCENT_VARIANT_ENV[line.scent] : PACK_VARIANT_ENV[line.pack];
    if (!id) throw new Error(`Missing Shopify variant ID for ${line.key}`);
    return {
      merchandiseId: toGid(id),
      quantity: line.quantity,
      // Packs carry the chosen scents so the order shows what to put in the box.
      attributes: line.type === "pack" ? [{ key: "Scents", value: describePicks(line.picks) }] : [],
    };
  });

  const data = await storefront<CartCreate>(
    `mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { field message }
      }
    }`,
    { input: { lines: shopifyLines, discountCodes: discountCode ? [discountCode] : [] } },
  );

  const { cart, userErrors } = data.cartCreate;
  if (!cart || userErrors.length) throw new Error(userErrors.map((e) => e.message).join("; ") || "No cart");
  return cart.checkoutUrl;
}

export type PolicySlug = "shipping-policy" | "refund-policy" | "privacy-policy" | "terms-of-service" | "legal-notice";

const POLICY_FIELD: Partial<Record<PolicySlug, string>> = {
  "shipping-policy": "shippingPolicy",
  "refund-policy": "refundPolicy",
  "privacy-policy": "privacyPolicy",
  "terms-of-service": "termsOfService",
};

/** Policy HTML as written in Shopify admin, or null when not available. */
export async function getPolicy(slug: PolicySlug): Promise<{ title: string; body: string } | null> {
  const field = POLICY_FIELD[slug];
  if (!shopifyConfigured || !field) return null;
  try {
    const data = await storefront<{ shop: Record<string, { title: string; body: string } | null> }>(
      `query { shop { ${field} { title body } } }`,
      {},
      3600,
    );
    return data.shop[field] ?? null;
  } catch {
    return null;
  }
}
