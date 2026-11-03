// Cart types and pricing. Shared by the browser cart and the checkout route,
// so the server re-checks exactly what the browser shows.
import { PACKS, SCENT_ORDER, SCENTS, UNIT_PRICE, type PackId, type ScentHandle } from "./catalog";
import type { CountryCode } from "./shipping";

export type Picks = Record<ScentHandle, number>;

export type SingleLine = { key: string; type: "single"; scent: ScentHandle; quantity: number };
export type PackLine = { key: string; type: "pack"; pack: Exclude<PackId, "single">; picks: Picks; quantity: number };
export type CartLine = SingleLine | PackLine;
/** A line before it has a key and quantity: what "add to cart" takes. */
export type NewLine = Omit<SingleLine, "key" | "quantity"> | Omit<PackLine, "key" | "quantity">;

export type CartState = {
  lines: CartLine[];
  country: CountryCode;
  discountCode: string | null;
};

export const MAX_QUANTITY = 20;

export const emptyPicks = (): Picks => ({ nebula: 0, heavens: 0, descent: 0 });

export const picksTotal = (p: Picks) => SCENT_ORDER.reduce((sum, h) => sum + (p[h] ?? 0), 0);

/** Same box contents = same line, so adding twice bumps the quantity. */
export function lineKey(line: NewLine): string {
  if (line.type === "single") return `single:${line.scent}`;
  return `pack:${line.pack}:${SCENT_ORDER.map((h) => line.picks[h]).join("-")}`;
}

export function unitPrice(line: CartLine): number {
  return line.type === "single" ? UNIT_PRICE : PACKS[line.pack].price;
}

export const lineTotal = (line: CartLine) => unitPrice(line) * line.quantity;
export const subtotal = (lines: CartLine[]) => lines.reduce((s, l) => s + lineTotal(l), 0);
export const bottleCount = (lines: CartLine[]) =>
  lines.reduce((s, l) => s + (l.type === "single" ? 1 : PACKS[l.pack].size) * l.quantity, 0);

export function lineTitle(line: CartLine): string {
  if (line.type === "single") return SCENTS[line.scent].name;
  return line.pack === "trio" ? "Box of 3" : "Box of 6";
}

/** "Nebula ×2, Heavens ×1" */
export function describePicks(picks: Picks): string {
  return SCENT_ORDER.filter((h) => picks[h] > 0)
    .map((h) => `${SCENTS[h].name} ×${picks[h]}`)
    .join(", ");
}

/** Validates untrusted cart lines (localStorage or a request body). */
export function sanitizeLines(input: unknown): CartLine[] {
  if (!Array.isArray(input)) return [];
  const out: CartLine[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const quantity = Number(r.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) continue;

    if (r.type === "single" && typeof r.scent === "string" && SCENT_ORDER.includes(r.scent as ScentHandle)) {
      const base = { type: "single" as const, scent: r.scent as ScentHandle };
      out.push({ ...base, key: lineKey(base), quantity });
    } else if (r.type === "pack" && (r.pack === "trio" || r.pack === "six") && r.picks && typeof r.picks === "object") {
      const pack: "trio" | "six" = r.pack;
      const p = r.picks as Record<string, unknown>;
      const picks = emptyPicks();
      for (const h of SCENT_ORDER) {
        const n = Number(p[h] ?? 0);
        picks[h] = Number.isInteger(n) && n >= 0 ? n : -1;
      }
      if (SCENT_ORDER.some((h) => picks[h] < 0)) continue;
      if (picksTotal(picks) !== PACKS[pack].size) continue;
      const base = { type: "pack" as const, pack, picks };
      out.push({ ...base, key: lineKey(base), quantity });
    }
  }
  return out;
}
