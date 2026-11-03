// Content blocks shared by more than one page.
import Link from "next/link";
import { BOTTLE } from "@/lib/catalog";
import { euro } from "@/lib/money";
import { DISPATCH_DAYS, RETURN_DAYS, SHIPPING, ZONES } from "@/lib/shipping";

export function ShippingTable() {
  return (
    <table className="ship-table">
      <caption className="sr-only">Shipping rates by country</caption>
      <thead>
        <tr>
          <th scope="col">Country</th>
          <th scope="col">Shipping</th>
          <th scope="col">Free from</th>
        </tr>
      </thead>
      <tbody>
        {ZONES.map((z) => (
          <tr key={z.code}>
            <th scope="row">{z.name}</th>
            <td>{euro(z.rate)}</td>
            <td>{z.freeFrom === null ? "No free shipping" : euro(z.freeFrom)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ShippingSummary() {
  return (
    <>
      <p>
        Orders ship from Dordrecht within {DISPATCH_DAYS.min}–{DISPATCH_DAYS.max} business days, with tracking.
      </p>
      <ShippingTable />
      <p>
        You can return unopened bottles within {RETURN_DAYS} days. See the{" "}
        <Link href="/policies/refund-policy">returns policy</Link> for details.
      </p>
    </>
  );
}

export const WHY = [
  {
    title: "Glass and wood, not cardboard",
    text: `${BOTTLE.volume} of fragrance oil in a glass bottle with a wooden diffuser cap.`,
  },
  {
    title: `Lasts ${BOTTLE.longevity}`,
    text: "Tilt the bottle to refresh the cap whenever you want it stronger.",
  },
  {
    title: "Free shipping in NL and BE",
    text: `Free from ${euro(SHIPPING.NL.freeFrom ?? 0)} in the Netherlands and ${euro(
      SHIPPING.BE.freeFrom ?? 0,
    )} in Belgium. Ships in ${DISPATCH_DAYS.min}–${DISPATCH_DAYS.max} days.`,
  },
  {
    title: "Designed in the Netherlands",
    text: "A small Dutch brand making car scents that look as good as they smell.",
  },
];

export const COMPARISON: { topic: string; us: string; them: string }[] = [
  { topic: "Scent", us: "Concentrated fragrance oil", them: "Sharp, cheap-smelling scents" },
  { topic: "Build", us: "Glass bottle, wooden diffuser cap", them: "Flimsy throwaway designs" },
  { topic: "Look", us: "Minimal, fits any car", them: "Loud designs that clash" },
  { topic: "Lasts", us: BOTTLE.longevity, them: "Fades fast" },
  { topic: "Label", us: "Scent notes listed upfront", them: "Vague labels and guesswork" },
];

export const STEPS = [
  {
    title: "Choose your scent",
    text: "Soft florals, creamy sandalwood or sweet coffee and vanilla. Pick one, or try all three in the bundle.",
  },
  {
    title: "Open and hang",
    text: "Take off the cap, pull out the plug and put the cap back on. Hang it from your mirror and tilt for 2–3 seconds so the wooden cap soaks up the oil.",
  },
  {
    title: "Enjoy it for weeks",
    text: `Each bottle lasts ${BOTTLE.longevity}. Want it stronger? Tilt it again.`,
  },
];
