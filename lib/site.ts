// Company details and site-wide settings. Change them here, nowhere else.

export const SITE = {
  name: "Voidescent",
  url: "https://voidescent.com",
  tagline: "May your space have a scent",
  description:
    "Car hanger fragrances from Dordrecht: 8 ml fragrance oil in a glass bottle with a wooden diffuser cap. Lasts 4–6 weeks.",
  email: "info@voidescent.com",
  phone: "+31 6 18996571",
  address: {
    street: "Romboutslaan 502",
    postcode: "3312 KP",
    city: "Dordrecht",
    country: "Netherlands",
  },
  kvk: "42080719",
  replyTime: "within 24 hours",
} as const;

// The hidden red star in the hero hands out this code.
export const PROMO = { code: "STAR-25", percent: 25 } as const;

export const PAYMENT_METHODS = [
  "iDEAL | Wero",
  "Bancontact",
  "Visa",
  "Mastercard",
  "Apple Pay",
  "PayPal",
  "Klarna",
] as const;

// Preview mode: shows the redesign bar and keeps this deployment out of search
// results so it never competes with the live shop. Off only when NEXT_PUBLIC_PREVIEW=false.
export const IS_PREVIEW = process.env.NEXT_PUBLIC_PREVIEW !== "false";
