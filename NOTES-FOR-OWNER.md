# Notes for the owner

What I found on voidescent.com while rebuilding it (checked 3 November 2026), what the rebuild does about
each one, and a few things only you can decide.

## Things on the live site that disagree with each other

1. **Bottle price.** Heavens and Descent product pages say €13,99. The home page, the shop page and Nebula say
   €14,99. The rebuild uses €14,99 everywhere.
2. **Bundle "was" price.** €44,97 on the home page and the Nebula pack picker, €41,97 on the bundle page and in
   its search description. Savings show as €16,98 in one place and €13,98 in the other. The rebuild computes
   both from the bottle price (3 × €14,99 = €44,97, so you save €16,98).
3. **Belgium shipping.** Home, Nebula and About say €6,95, free from €40. Heavens, Descent and the bundle say
   €4,95, free from €25, and the Heavens/Descent trust badge says "Free shipping €40+". The rebuild uses
   €6,95 / free from €40. **Please confirm.**
4. **"Free shipping" on the 3-pack.** At €27,99 it ships free in the Netherlands, but not to Belgium (€40),
   Germany (€35) or France (€40). The rebuild says "ships free to ..." based on the shopper's chosen country.
5. **Reviews.** Heavens and Descent show five stars and "12 reviews". Nebula shows "No reviews", and the review
   widget shows zero everywhere. If those 12 reviews don't exist, they should come down: under EU consumer law
   (the Omnibus rules, enforced in NL by the ACM) showing reviews you can't back up counts as misleading. The
   rebuild shows no ratings until there are real ones.
6. **Two product page templates.** Nebula and the bundle have the newer page (pack picker, FAQ, 4 photos).
   Heavens and Descent still use the old one: single bottle only, no FAQ, one photo. The rebuild gives every
   product the same page.

## Broken or missing

7. **Footer logo** doesn't load on any page (the `.avif` file). The rebuild uses the header logo.
8. **Share images are the wrong products.** When someone shares the Heavens page, the preview shows a light-blue
   "sea salt + citrus + driftwood" bottle; Descent shows a pink "vanilla + floral" bottle. Fixed in the rebuild.
9. **Bundle is missing from the Shop page** (`/collections/scents`). Added.
10. **Home page product row is cut off** on a normal laptop screen (1440 px): the fourth card, Descent, is
    clipped at the right edge, which reads as a mistake even if it's meant to scroll. The rebuild shows the
    three scents in a row and the bundle as its own wide block.
11. **"Our philosophy" has an empty right half.** The rebuild puts the trio photo there.
12. **Breadcrumbs** link "Shop" to `/collections` on some pages and `/collections/scents` on others. Both now go
    to the same place.
13. **Footer** is missing the About link on Heavens and Descent.
14. **iDEAL | Wero** appears on the bundle page but not on Nebula. For a Dutch shop it should be everywhere, and
    first.

## Smaller things

15. **Bundle fragrance notes** list Nebula as "top", Heavens as "heart" and Descent as "base". Those words
    describe layers of one scent, so the rebuild lists each scent's own notes instead.
16. **Page titles repeat the brand**, e.g. "Heavens | Sandalwood Car Air Freshener | Voidescent – VOIDESCENT".
17. **Image file names** like `ChatGPTImageMay13_2026...png` and `nebUntitled.png`, and empty alt text on
    thumbnails. Renaming files and writing alt text helps Google Images and screen readers. The rebuild writes
    alt text for every photo.
18. **The hero headline** is an outlined script that's hard to read, especially on phones.

## What else the rebuild adds

- One source of truth for prices and shipping, so 1–4 can't happen again.
- Pick-your-scents boxes on every product page, pre-filled one of each, with "Pick 1 more" until the box is full.
- A cart drawer with a free-shipping meter per country, a country selector and a discount code field.
- An estimated delivery date on product pages.
- A sticky "Add" bar on phones once you scroll past the main button.
- Product structured data for Google (price, availability, brand). No star ratings until reviews are real.
- The newsletter sign-up as a section on the page instead of a pop-up.
- Same URLs as the current shop, so links and rankings carry over.

## Questions for you

- Are €14,99 / €27,99 / €44,97 the right prices?
- Which Belgium shipping rate is right?
- How are the 3 and 6 boxes set up in Shopify: variants on the bundle product, or a bundle app?
- Is "voide" (on the bottles) the product line and "Voidescent" the company, or should one name win?
- Do you want to keep the fonts the rebuild uses (Bodoni Moda + Jost), or go back to the current ones?
- Which tool do you use, or want, for the newsletter and for reviews?
