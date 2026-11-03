// Shipping rates in one place. Every page, the cart and the shipping policy
// read from this table, so the numbers can't drift apart again.
// TODO(owner): confirm these. The live site disagrees with itself on Belgium
// (€4,95 vs €6,95, free from €25 vs €40). These are the newest values seen.

export type CountryCode = "NL" | "BE" | "DE" | "FR" | "EU";

export type ShippingZone = {
  code: CountryCode;
  name: string;
  /** For sentences: "ships free to the Netherlands". */
  inSentence: string;
  rate: number; // cents
  freeFrom: number | null; // cents, null = never free
};

export const SHIPPING: Record<CountryCode, ShippingZone> = {
  NL: { code: "NL", name: "Netherlands", inSentence: "the Netherlands", rate: 395, freeFrom: 2500 },
  BE: { code: "BE", name: "Belgium", inSentence: "Belgium", rate: 695, freeFrom: 4000 },
  DE: { code: "DE", name: "Germany", inSentence: "Germany", rate: 495, freeFrom: 3500 },
  FR: { code: "FR", name: "France", inSentence: "France", rate: 595, freeFrom: 4000 },
  EU: { code: "EU", name: "Other EU country", inSentence: "other EU countries", rate: 595, freeFrom: null },
};

export const ZONES = Object.values(SHIPPING);
export const DEFAULT_COUNTRY: CountryCode = "NL";

export const DISPATCH_DAYS = { min: 1, max: 2 };
export const RETURN_DAYS = 14;

export function shippingCost(country: CountryCode, subtotal: number): number {
  const zone = SHIPPING[country];
  if (zone.freeFrom !== null && subtotal >= zone.freeFrom) return 0;
  return zone.rate;
}

/** Cents still needed for free shipping, or null if the zone has no free tier. */
export function remainingForFree(country: CountryCode, subtotal: number): number | null {
  const zone = SHIPPING[country];
  if (zone.freeFrom === null) return null;
  return Math.max(0, zone.freeFrom - subtotal);
}

/** Adds business days (Mon–Fri) to a date. */
export function addBusinessDays(from: Date, days: number): Date {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d;
}
