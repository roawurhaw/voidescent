# Voidescent

A from-scratch rebuild of [voidescent.com](https://voidescent.com) in Next.js and TypeScript.
Shopify stays the backend: it still takes payments, holds orders, applies discount codes and stores the
policies. This site is the storefront in front of it (a "headless" Shopify setup).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, also type-checks
```

Node 20 or newer.

## Where things live

| You want to change...                  | Edit                         |
| -------------------------------------- | ---------------------------- |
| Prices, packs, scent copy, notes, FAQ  | `lib/catalog.ts`             |
| Shipping rates and free-shipping tiers | `lib/shipping.ts`            |
| Address, email, KvK, promo code        | `lib/site.ts`                |
| Product photos                         | `lib/images.ts`              |
| Colours, fonts, spacing                | top of `app/globals.css`     |
| Home page sections                     | `app/page.tsx`               |
| Product page                           | `app/products/[handle]/page.tsx` and `components/BuyBox.tsx` |

Every price, saving, per-bottle amount and shipping line on the site is computed from `lib/catalog.ts`
and `lib/shipping.ts`. Change a number once and every page, the cart and the structured data follow.

## How the cart works

- The cart lives in the browser (`components/CartProvider.tsx`, saved in `localStorage`).
- A line is either one bottle, or a box of 3 or 6 with the chosen scents.
- **Check out** posts the cart to `app/api/checkout/route.ts`, which re-validates it, creates a Shopify cart
  through the Storefront API and sends the shopper to Shopify's own checkout. Box contents travel as a line
  attribute ("Scents: Nebula ×2, Heavens ×1"), so they show on the order.
- Discount codes (including the red-star `STAR-25`) are passed to Shopify, which decides if they're valid.

## Connect Shopify

1. Shopify admin → Settings → Apps and sales channels → Develop apps → Create an app.
2. Give it Storefront API access with the checkout, product and content permissions, and install it.
3. Copy `.env.example` to `.env.local` and fill in the store domain, the Storefront token and the variant IDs.
4. Packs expect the bundle product to have a "3 bottles" and a "6 bottles" variant. If the shop uses a
   bundle app instead, `createCheckout` in `lib/shopify.ts` is the one place to adapt.

Until those are set, **Check out** shows "Checkout isn't connected in this preview yet" and policies link to the
live site.

## Newsletter

`app/api/newsletter/route.ts` forwards `{ email }` to `NEWSLETTER_WEBHOOK_URL` (Klaviyo, Shopify Flow, Zapier...).

## Preview mode

`NEXT_PUBLIC_PREVIEW` is on unless set to `false`. In preview mode the site:

- shows a bar saying it's a redesign preview and linking to the real shop,
- sends `noindex` and a blocking `robots.txt`, so a preview deployment never competes with voidescent.com in Google.

Turn it off only on the production domain, at launch.

## Deploy

Any Next.js host works. On Vercel: import the repo, add the env vars, deploy.

To go live: first give Shopify its own subdomain (for example `shop.voidescent.com`) as its primary domain, so
checkout links keep pointing at Shopify. Then point `voidescent.com` at the new host and set
`NEXT_PUBLIC_PREVIEW=false`.

URLs match the Shopify ones (`/products/nebula`, `/collections/scents`, `/pages/about`, `/policies/...`), and
`/collections` redirects to the shop page, so existing links and search rankings carry over.

## Design notes

- Palette: blue-black "cabin" background, the logo's crimson for actions, and each scent's oil colour
  (Nebula red, Heavens amber, Descent blue) wherever the site needs to say which scent you're looking at.
- Type: Bodoni Moda for names and headlines, Jost for everything else. A Didone with a Futura-style sans is a
  classic perfume-label pairing, and Jost sits close to the logo's geometric letters. To go back to the current
  site's fonts, swap them in `app/layout.tsx`.
- The one moment of motion: the hero bottle hangs from the top of the page, swings, settles and keeps a slow
  sway. It stops for anyone who has reduced motion turned on.
- The red-star easter egg from the live site is kept, hidden among the hero's stars.

See `NOTES-FOR-OWNER.md` for what was found on the live site and what changed.
