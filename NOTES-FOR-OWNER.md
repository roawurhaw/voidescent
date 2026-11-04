# Notes for the owner

This repo started as a 1:1 copy of voidescent.com as it was on 3 November 2026 (checked in screenshots against the
live site at desktop and phone width).

## Changed since the copy

- **Buying is switched off.** "Add to cart" and "Checkout" buttons are there but do nothing.
- **Home page:** the bundle card is gone; the three scents sit side by side, all the same size, each with a small
  box underneath (name, price, scent profile, add to cart). "How it works" is now a single step ending in
  "It's that easy." The newsletter button that appears after closing the pop-up is now a vertical "Get notified" box on
  the left edge.
- **Product pages:** choosing the 3- or 6-bottle pack no longer picks scents for you. The three photos of a bottle
  hanging in a car are removed (Nebula, Heavens, Descent).
- **No pill shapes:** tags and note chips are plain text; badges and buttons have square-ish corners.
- **Red stars:** hovering one (on a computer) makes it glow; clicking it stops it and opens the red star with the
  STAR-25 text, which stays until you click somewhere else.
- **Speed:** the hero glow, the red stars and the title shimmer now run on the graphics card instead of being
  redrawn by script every frame, and invisible background blurs were removed.
- **Fix:** the Shop page's product links (`/collections/scents/products/...`) gave "page not found"; they work now.
- **Photos are copied into this repo** (`public/images/`), so closing the Shopify store won't take them down. Only
  the Judge.me reviews section still depends on Shopify (it is a Shopify app).
- **Pages are ready-made:** nothing on a page depends on the visitor any more (the cart number is gone), so pages
  are built once and served as files instead of being rebuilt for every visit.
- **Contact form spam trap:** the contact form now has the same hidden bot trap as the newsletter pop-up.

## What's copied

- Home, Shop (`/collections/scents`), the four product pages, About, Contact, the cart page, search, 404, the six
  policies, `/pages/scents`, `/pages/legal-notice` and the blog articles.
- The cart drawer (empty, since buying is off), bundle tip, free-shipping bar, upsell, pack picker (1, 3 or 6 bottles), sticky add-to-cart bar,
  delivery estimate, announcement bar, newsletter pop-up, the hero animation and the red-star easter egg.
- The Judge.me review widget, which still loads from Judge.me.
- The store's two automatic discounts in the cart code (unused while buying is off).

## Works differently, because Shopify isn't behind the pages any more

- **Contact form and newsletter pop-up** send their fields to `CONTACT_WEBHOOK_URL`. Before, Shopify emailed you
  contact messages and saved newsletter sign-ups as customers with marketing consent. Until the webhook is set,
  both forms answer "not connected yet".
- **The message after a contact form is sent** uses Shopify's standard wording. The live one couldn't be checked
  without sending you a real message.
- **Search** uses simple word matching over products, pages and article titles and intros. Searching a scent
  name gives the same results as the live store; other searches can differ, because Shopify's search engine
  can't be copied.

## Not copied yet

- **Dutch, German and French.** The live store also exists at `/nl`, `/de` and `/fr` (Shopify Translate &
  Adapt). Only the English site is copied. Adding the three languages means translated copy for every section
  plus language routing.
- **Shopify platform extras:** analytics and pixels, Shop Pay / Shop app sign-in, `agents.md` and the store's
  AI-shopping endpoint (UCP). These are Shopify features, not theme features.

## Odd things on the live site (copied as they are)

1. `/collections` is an empty page: the theme has no template for a list of collections.
2. The contact form's name and message fields are called `contact[Translation missing: en.templates.contact.form.name]`
   and `...form.comment]`. Those names show up as labels in the messages you receive.
3. The hero bottle photo's alt text is HTML code: `<p>May <em>your</em> space have a scent</p>`.
4. The blog has no index page: `/blogs/nieuws` returns "page not found". Articles are reachable only through search,
   the sitemap and Google.
