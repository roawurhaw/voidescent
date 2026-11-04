# Voidescent

A 1:1 copy of the live Shopify store [voidescent.com](https://voidescent.com) in Next.js and TypeScript: same markup,
same CSS, same scripts, same copy and photos, as the starting point for deciding what to keep, change or remove.
Since then: the home page shows the three scents side by side, "How it works" is one step, there are no pill shapes,
the red stars open on click, photos of the bottle in a car are gone, and the animations are lighter.

**Buying is switched off.** Every "Add to cart" and "Checkout" button is there but has no action.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, also type-checks
npm test           # tests for the contact form route
```

## How it's put together

The live theme is a custom Shopify theme where every section carries its own `<style>` and `<script>`. Each
section was ported as it is:

| Live theme                     | Here                                                          |
| ------------------------------ | ------------------------------------------------------------- |
| Section markup (Liquid output) | `components/sections/<Name>.tsx`                              |
| Section `<style>`              | `components/sections/<Name>.css`, next to it                  |
| Section `<script>`             | `public/theme/<name>.js`, loaded by the section with `<Script>` |
| `theme.liquid` base styles     | `app/globals.css`                                             |
| Products, prices               | `lib/catalog.ts`                                              |
| Photos (Shopify files)         | `public/images/` (blog: `public/images/blog/`)                |
| Policies (Shopify admin)       | `app/policies/[slug]/policies.ts`                             |
| Plain pages (Shopify admin)    | `app/pages/[handle]/pages.ts`                                 |
| Blog articles (Shopify admin)  | `content/blog/<handle>.html` + `content/blog/articles.json`   |

To remove a section, delete its line in the page (for example `<Story />` in `app/page.tsx`). To change copy,
edit the section's `.tsx`. Product pages share one template, `ProductMain.tsx`, fed from `lib/catalog.ts`.

Section ids were shortened (`voide-hero-template--31141486756224__voide_hero_CpNJRt` is now `voide-hero`).

Photos are copies of the store's files, so the site doesn't depend on the Shopify store staying open. Pages show
them through Next's image optimizer (`photo()` in `lib/catalog.ts`), which resizes them and serves WebP/AVIF like
Shopify's CDN did. To add or swap a photo, put it in `public/images/` and use its file name. The reviews section
(Judge.me) is a Shopify app and still loads from Shopify.

## The cart (switched off)

The buttons that add to the cart or go to checkout do nothing, and the server parts that added to the cart
(`/cart/add.js`) and handed it to Shopify's checkout are removed. What's left of the cart (`lib/cart.ts`, `/cart.js`,
`/cart/change.js`, `/cart/update`) only reads, changes or empties carts saved earlier, until their cookie expires
(14 days). It still applies the store's two automatic discounts ("Voide Bundle 3+": €5,66 off each bottle from 3;
"3+3 GRATIS": 3 free per 6; the bigger one wins).

To switch buying back on, these pieces (removed on 3 November 2026, before this copy was first committed) have to be
written again: the add-to-cart code in
`public/theme/product.js`, `cart-drawer.js`, `cart-page.js` and `products-grid.js`; `app/cart/add.js/route.ts`;
`checkoutUrl()` in `lib/cart.ts` and the checkout redirect in `app/cart/update/route.ts`; the
`type="submit" name="checkout"` buttons in `CartDrawer.tsx` and `CartPage.tsx`; and the cart count in the header.

## Settings (`.env.local`)

| Variable               | What it does                                                                     |
| ---------------------- | -------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_PREVIEW`  | Anything but `false` keeps this copy out of Google (noindex, blocking robots.txt). |
| `CONTACT_WEBHOOK_URL`  | Where the contact form and newsletter pop-up send their fields (JSON).           |

## Going live on voidescent.com

1. Point `voidescent.com` at this site and set `NEXT_PUBLIC_PREVIEW=false`.
2. Connect `CONTACT_WEBHOOK_URL`, otherwise the forms answer "not connected yet".
3. If buying should come back: switch it on (see above) and give the Shopify store its own domain (for example
   `shop.voidescent.com`) for checkout.

See `NOTES-FOR-OWNER.md` for what isn't copied yet and what's odd on the live site.
